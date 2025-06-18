// @ts-nocheck
const { test, expect } = require('@playwright/test');

/**
 * Security Test: Account Abstraction ERC-4337 Bundler Queue Poisoning
 * 
 * This test targets ERC-4337 bundler implementations, checking how they handle
 * potential queue poisoning attacks and DoS vectors. It focuses on bundler queue
 * management, prioritization, and resource handling.
 * 
 * Vulnerabilities targeted:
 * - Spam UserOps with valid but non-executable data
 * - Delay propagation of valid ops using priority flood
 * - Mimic replay of old UserOps
 * - Measures how many cycles bundler needed to clear queue under spam
 */

// Mock Ethereum address values
const MOCK_ADDRESSES = {
  sender: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  entryPoint: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
  bundler: '0x3456789012345678901234567890123456789012',
  beneficiary: '0x2345678901234567890123456789012345678901',
  attacker: '0xd4C94252d97B6Cc89dF9E5F7C6ABbEb585C3f565',
};

// Default UserOperation structure
const DEFAULT_USER_OP = {
  sender: MOCK_ADDRESSES.sender,
  nonce: '0x01',
  initCode: '0x',
  callData: '0x3c5088ea00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
  callGasLimit: '0x58a83',
  verificationGasLimit: '0x186a0',
  preVerificationGas: '0x5208',
  maxFeePerGas: '0x59682f00',
  maxPriorityFeePerGas: '0x59682f00',
  paymasterAndData: '0x',
  signature: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b00',
};

// Helper function to create a UserOperation
function createUserOp(overrides = {}) {
  return {
    ...DEFAULT_USER_OP,
    ...overrides,
  };
}

// Enhanced mock bundler for queue poisoning tests
class EnhancedMockBundler {
  constructor(options = {}) {
    this.queue = [];
    this.priorityQueue = [];
    this.processingQueue = [];
    this.processedOps = [];
    this.rejectedOps = [];
    this.maxQueueSize = options.maxQueueSize || 1000;
    this.maxBundleSize = options.maxBundleSize || 10;
    this.minPriorityFeePerGas = options.minPriorityFeePerGas || 1000000000; // 1 gwei
    this.executionDelayMs = options.executionDelayMs || 100; // Simulated execution delay
    this.entryPoint = options.entryPoint || MOCK_ADDRESSES.entryPoint;
    
    // Stats for queue analysis
    this.stats = {
      cyclesRequired: 0,
      totalTimeMs: 0,
      peakQueueSize: 0,
      totalOpsProcessed: 0,
      totalOpsRejected: 0,
      opsByPriority: {
        high: 0,
        medium: 0,
        low: 0,
      },
    };
    
    // Bundler reputation system - track senders and monitor behavior
    this.reputation = {
      senderStats: {},
      bannedSenders: new Set(),
      minReputationScore: -10,
      penaltyForRejection: -1,
      rewardForSuccess: 0.5,
    };
  }
  
  // Add user operation to the queue
  async addUserOp(userOp) {
    // Basic validation
    if (!this.validateUserOp(userOp)) {
      this.rejectedOps.push({ userOp, reason: 'Invalid UserOp' });
      this.stats.totalOpsRejected++;
      this.penalizeAddress(userOp.sender);
      return { success: false, error: 'Invalid UserOp' };
    }
    
    // Check sender reputation
    if (this.reputation.bannedSenders.has(userOp.sender)) {
      this.rejectedOps.push({ userOp, reason: 'Sender banned' });
      this.stats.totalOpsRejected++;
      return { success: false, error: 'Sender banned from submitting ops' };
    }
    
    // Check queue size limits
    if (this.queue.length >= this.maxQueueSize) {
      // If queue is full, check if this op has higher priority than lowest priority in queue
      const lowestPriorityOp = this.findLowestPriorityOp();
      if (lowestPriorityOp && this.getPriority(userOp) <= this.getPriority(lowestPriorityOp)) {
        this.rejectedOps.push({ userOp, reason: 'Queue full, priority too low' });
        this.stats.totalOpsRejected++;
        return { success: false, error: 'Queue full and priority too low' };
      }
      
      // Remove the lowest priority op to make room
      this.removeFromQueue(lowestPriorityOp);
    }
    
    // Add timestamp for queueing analysis
    const enhancedUserOp = {
      ...userOp,
      queuedAt: Date.now(),
      priority: this.getPriority(userOp),
    };
    
    // Add to queue based on priority
    if (enhancedUserOp.priority === 'high') {
      this.priorityQueue.push(enhancedUserOp);
      this.stats.opsByPriority.high++;
    } else {
      this.queue.push(enhancedUserOp);
      if (enhancedUserOp.priority === 'medium') {
        this.stats.opsByPriority.medium++;
      } else {
        this.stats.opsByPriority.low++;
      }
    }
    
    // Update peak queue size stat
    const totalQueueSize = this.queue.length + this.priorityQueue.length;
    if (totalQueueSize > this.stats.peakQueueSize) {
      this.stats.peakQueueSize = totalQueueSize;
    }
    
    return { success: true, queuePosition: totalQueueSize };
  }
  
  // Simulate full bundler execution cycle
  async processQueueCycle() {
    this.stats.cyclesRequired++;
    const startTime = Date.now();
    
    // Prepare bundle from priority queue first, then regular queue
    const bundle = [];
    
    // First take from priority queue
    while (bundle.length < this.maxBundleSize && this.priorityQueue.length > 0) {
      bundle.push(this.priorityQueue.shift());
    }
    
    // Then fill from regular queue if needed
    while (bundle.length < this.maxBundleSize && this.queue.length > 0) {
      bundle.push(this.queue.shift());
    }
    
    if (bundle.length === 0) {
      return { success: true, processed: 0, message: 'No operations in queue' };
    }
    
    // Process the bundle
    const results = await this.executeBundle(bundle);
    
    // Update stats
    const endTime = Date.now();
    this.stats.totalTimeMs += (endTime - startTime);
    
    return {
      success: true,
      processed: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      remainingInQueue: this.queue.length + this.priorityQueue.length,
    };
  }
  
  // Process the entire queue until empty
  async processEntireQueue() {
    let cycles = 0;
    let totalProcessed = 0;
    
    while (this.queue.length > 0 || this.priorityQueue.length > 0) {
      const result = await this.processQueueCycle();
      cycles++;
      totalProcessed += result.processed;
      
      // Simulate delay between cycles (like waiting for a new block)
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return {
      cycles,
      totalProcessed,
      stats: this.stats,
    };
  }
  
  // Execute a bundle of UserOps
  async executeBundle(bundle) {
    const results = [];
    
    // Set all ops to processing state
    this.processingQueue = [...bundle];
    
    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, this.executionDelayMs));
    
    for (const userOp of bundle) {
      try {
        // Simulate bundle execution - in a real implementation this would call the EntryPoint
        const success = Math.random() > 0.1; // 90% success rate for simulation
        
        if (success) {
          this.processedOps.push(userOp);
          this.stats.totalOpsProcessed++;
          this.rewardAddress(userOp.sender);
          results.push({ userOp, success: true });
        } else {
          this.rejectedOps.push({ userOp, reason: 'Execution failed' });
          this.stats.totalOpsRejected++;
          this.penalizeAddress(userOp.sender);
          results.push({ userOp, success: false, error: 'Execution failed' });
        }
      } catch (error) {
        this.rejectedOps.push({ userOp, reason: error.message });
        this.stats.totalOpsRejected++;
        this.penalizeAddress(userOp.sender);
        results.push({ userOp, success: false, error: error.message });
      }
    }
    
    // Clear processing queue
    this.processingQueue = [];
    
    return results;
  }
  
  // Basic validation of UserOp format
  validateUserOp(userOp) {
    if (!userOp.sender || !userOp.signature) {
      return false;
    }
    
    // Check minimum gas values
    if (parseInt(userOp.callGasLimit, 16) < 21000) {
      return false;
    }
    
    // Check maximum gas values (prevent DoS)
    if (parseInt(userOp.callGasLimit, 16) > 10000000) {
      return false;
    }
    
    // Check gas price
    if (parseInt(userOp.maxFeePerGas, 16) < this.minPriorityFeePerGas) {
      return false;
    }
    
    return true;
  }
  
  // Calculate operation priority
  getPriority(userOp) {
    const maxPriorityFee = parseInt(userOp.maxPriorityFeePerGas, 16);
    
    if (maxPriorityFee > 5000000000) { // 5 gwei
      return 'high';
    } else if (maxPriorityFee > 2000000000) { // 2 gwei
      return 'medium';
    } else {
      return 'low';
    }
  }
  
  // Find the lowest priority op in the queue
  findLowestPriorityOp() {
    if (this.queue.length === 0) {
      return null;
    }
    
    let lowestPriorityOp = this.queue[0];
    let lowestPriorityFee = parseInt(lowestPriorityOp.maxPriorityFeePerGas, 16);
    
    for (let i = 1; i < this.queue.length; i++) {
      const op = this.queue[i];
      const fee = parseInt(op.maxPriorityFeePerGas, 16);
      
      if (fee < lowestPriorityFee) {
        lowestPriorityOp = op;
        lowestPriorityFee = fee;
      }
    }
    
    return lowestPriorityOp;
  }
  
  // Remove an operation from the queue
  removeFromQueue(userOp) {
    const index = this.queue.findIndex(op => 
      op.sender === userOp.sender && 
      op.nonce === userOp.nonce
    );
    
    if (index !== -1) {
      this.queue.splice(index, 1);
      return true;
    }
    
    return false;
  }
  
  // Update reputation for an address
  penalizeAddress(address) {
    if (!this.reputation.senderStats[address]) {
      this.reputation.senderStats[address] = { score: 0, submissions: 0, rejections: 0 };
    }
    
    const stats = this.reputation.senderStats[address];
    stats.rejections++;
    stats.submissions++;
    stats.score += this.reputation.penaltyForRejection;
    
    // Ban if score goes below threshold
    if (stats.score < this.reputation.minReputationScore) {
      this.reputation.bannedSenders.add(address);
    }
  }
  
  // Reward address for successful operations
  rewardAddress(address) {
    if (!this.reputation.senderStats[address]) {
      this.reputation.senderStats[address] = { score: 0, submissions: 0, rejections: 0 };
    }
    
    const stats = this.reputation.senderStats[address];
    stats.submissions++;
    stats.score += this.reputation.rewardForSuccess;
  }
  
  // Get the current reputation stats for analysis
  getReputationStats() {
    return {
      totalSenders: Object.keys(this.reputation.senderStats).length,
      bannedSenders: this.reputation.bannedSenders.size,
      senderStats: this.reputation.senderStats,
    };
  }
}

// Test Suite
test.describe('ERC-4337 Bundler Queue Poisoning', () => {
  test('Spam UserOps with valid but non-executable data', async () => {
    // Create enhanced bundler with options
    const bundler = new EnhancedMockBundler({
      maxQueueSize: 100,
      maxBundleSize: 10,
      executionDelayMs: 50, // Fast simulation
    });
    
    // Create a batch of valid-looking but non-executable operations
    const userOps = [];
    
    // Add some legitimate user ops first
    for (let i = 0; i < 10; i++) {
      userOps.push(createUserOp({
        sender: MOCK_ADDRESSES.sender,
        nonce: '0x' + i.toString(16),
        maxPriorityFeePerGas: '0x59682f00', // High priority
      }));
    }
    
    // Add spam ops that look valid but have issues
    for (let i = 0; i < 50; i++) {
      userOps.push(createUserOp({
        sender: MOCK_ADDRESSES.attacker,
        nonce: '0x' + i.toString(16),
        // Valid-looking calldata that will fail during execution
        callData: '0xdeadbeef' + '00'.repeat(32),
        maxPriorityFeePerGas: '0x77359400', // Extra high priority to get in queue
      }));
    }
    
    // Shuffle array to mix legit and spam ops
    userOps.sort(() => Math.random() - 0.5);
    
    // Submit all ops to the bundler
    for (const userOp of userOps) {
      await bundler.addUserOp(userOp);
    }
    
    // Process the entire queue and measure stats
    const result = await bundler.processEntireQueue();
    
    
    // Check if reputation system identified the attacker
    const reputationStats = bundler.getReputationStats();
    
    // Verify that the attacker was eventually banned
    expect(bundler.reputation.bannedSenders.has(MOCK_ADDRESSES.attacker)).toBe(true);
  });
  
  test('Delay propagation of valid ops using priority flood', async () => {
    // Create enhanced bundler with options
    const bundler = new EnhancedMockBundler({
      maxQueueSize: 50, // Smaller queue to make attack more effective
      maxBundleSize: 5,
      executionDelayMs: 50,
    });
    
    // Create legitimate user ops with normal priority
    const legitimateOps = [];
    for (let i = 0; i < 20; i++) {
      legitimateOps.push(createUserOp({
        sender: MOCK_ADDRESSES.sender,
        nonce: '0x' + i.toString(16),
        maxPriorityFeePerGas: '0x3B9ACA00', // 1 gwei - normal priority
      }));
    }
    
    // Create attacker ops with very high priority but invalid signature to force eventual failure
    const attackerOps = [];
    for (let i = 0; i < 40; i++) {
      attackerOps.push(createUserOp({
        sender: MOCK_ADDRESSES.attacker,
        nonce: '0x' + i.toString(16),
        maxPriorityFeePerGas: '0x77359400', // 2 gwei - higher priority
        signature: '0x1234', // Invalid, will be accepted in queue but fail in execution
      }));
    }
    
    // First submit half of the attack ops to fill the queue
    for (let i = 0; i < 20; i++) {
      await bundler.addUserOp(attackerOps[i]);
    }
    
    // Then submit legitimate ops (some will be rejected due to queue size)
    const legitimateResults = [];
    for (const userOp of legitimateOps) {
      const result = await bundler.addUserOp(userOp);
      legitimateResults.push(result);
    }
    
    // Finally submit the remaining attack ops
    for (let i = 20; i < attackerOps.length; i++) {
      await bundler.addUserOp(attackerOps[i]);
    }
    
    // Process the entire queue and measure stats
    const result = await bundler.processEntireQueue();
    
    // Count how many legitimate ops were accepted vs rejected
    const acceptedLegitimateOps = legitimateResults.filter(r => r.success).length;
    const rejectedLegitimateOps = legitimateResults.filter(r => !r.success).length;
    
    
    // The vulnerability is demonstrated if a significant number of legitimate ops were rejected
    expect(rejectedLegitimateOps).toBeGreaterThan(0);
  });
  
  test('Mimic replay of old UserOps', async () => {
    // Create enhanced bundler with options
    const bundler = new EnhancedMockBundler({
      maxQueueSize: 100,
      maxBundleSize: 10,
      executionDelayMs: 50,
    });
    
    // Create an array to track nonces we've used
    const usedNonces = new Set();
    
    // Create a batch of valid operations
    const validUserOps = [];
    for (let i = 0; i < 10; i++) {
      const nonce = '0x' + i.toString(16);
      usedNonces.add(nonce);
      validUserOps.push(createUserOp({
        sender: MOCK_ADDRESSES.sender,
        nonce,
      }));
    }
    
    // Submit the valid ops
    for (const userOp of validUserOps) {
      await bundler.addUserOp(userOp);
    }
    
    // Process the queue
    await bundler.processQueueCycle();
    
    // Now create replay ops with same nonces but slightly modified to avoid exact duplication
    const replayOps = [];
    for (const nonce of usedNonces) {
      replayOps.push(createUserOp({
        sender: MOCK_ADDRESSES.sender,
        nonce,
        // Change gas price slightly to make it look different
        maxFeePerGas: '0x59682f01',
        signature: '0x' + '11'.repeat(64), // Different signature
      }));
    }
    
    // Submit the replay ops
    const replayResults = [];
    for (const userOp of replayOps) {
      const result = await bundler.addUserOp(userOp);
      replayResults.push(result);
    }
    
    // Process the queue again
    await bundler.processQueueCycle();
    
    // In a real implementation with proper nonce tracking, replays should be rejected
    
    // Demonstrate bundler behavior with replays (in a proper implementation these would be rejected)
  });
  
  test('Log how many cycles bundler needed to clear queue under spam', async () => {
    // Create enhanced bundler with realistic settings
    const bundler = new EnhancedMockBundler({
      maxQueueSize: 500,
      maxBundleSize: 10,
      executionDelayMs: 10, // Fast simulation
    });
    
    // Track timing
    const startTime = Date.now();
    
    // Create a large number of operations (both legitimate and spam)
    const operations = [];
    
    // 20% legitimate ops
    for (let i = 0; i < 100; i++) {
      operations.push(createUserOp({
        sender: `0x742d35Cc6634C0532925a3b844Bc454e4438f${i.toString(16).padStart(3, '0')}`,
        nonce: '0x01',
        maxPriorityFeePerGas: '0x59682f00', // Normal priority
      }));
    }
    
    // 80% spam/attack ops
    for (let i = 0; i < 400; i++) {
      operations.push(createUserOp({
        sender: `0xd4C94252d97B6Cc89dF9E5F7C6ABbEb585C3f${i.toString(16).padStart(3, '0')}`,
        nonce: '0x01',
        maxPriorityFeePerGas: '0x' + Math.floor(Math.random() * 5000000000).toString(16), // Random priority
        callGasLimit: '0x' + Math.floor(21000 + Math.random() * 1000000).toString(16), // Random gas limit
      }));
    }
    
    // Shuffle array to simulate random arrival order
    operations.sort(() => Math.random() - 0.5);
    
    // Submit in batches to simulate realistic load
    let submittedCount = 0;
    const batchSize = 20;
    
    for (let i = 0; i < operations.length; i += batchSize) {
      const batch = operations.slice(i, i + batchSize);
      
      // Submit batch
      for (const userOp of batch) {
        const result = await bundler.addUserOp(userOp);
        if (result.success) {
          submittedCount++;
        }
      }
      
      // Process one cycle after each batch
      await bundler.processQueueCycle();
    }
    
    // Process remaining queue
    const result = await bundler.processEntireQueue();
    
    // Compute metrics
    const endTime = Date.now();
    const totalTimeMs = endTime - startTime;
    const opsPerSecond = bundler.stats.totalOpsProcessed / (totalTimeMs / 1000);
    
    
    // Validate that bundler was able to process a significant portion of operations
    expect(bundler.stats.totalOpsProcessed).toBeGreaterThan(operations.length * 0.5);
  });
}); 