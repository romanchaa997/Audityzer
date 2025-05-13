/**
 * Mock implementation of LayerZero test harness for Playwright tests
 */

// Enum for LayerZero chain IDs
const LayerZeroChainId = {
  ETHEREUM: 1,
  BINANCE: 2,
  AVALANCHE: 6,
  POLYGON: 9,
  ARBITRUM: 10,
  OPTIMISM: 11,
  FANTOM: 12,
};

/**
 * Mock LayerZero test harness class
 */
class LayerZeroTestHarness {
  constructor(config = {}) {
    this.config = {
      mockMode: true,
      sourceChainId: LayerZeroChainId.ETHEREUM,
      destinationChainId: LayerZeroChainId.POLYGON,
      ...config
    };
    console.log('Initializing mock LayerZero Test Harness');
  }

  /**
   * Initialize the test harness
   */
  async initialize() {
    console.log('Mock LayerZero Test Harness initialized');
    return true;
  }

  /**
   * Simulate bridge transaction
   */
  async simulateBridgeTransaction(params) {
    console.log('Simulating bridge transaction', params);
    return {
      success: true,
      txHash: '0x' + Math.random().toString(16).substr(2, 40),
      gasUsed: Math.floor(Math.random() * 1000000),
      messageSize: Math.floor(Math.random() * 1000),
    };
  }

  /**
   * Verify message delivery
   */
  async verifyMessageDelivery(txHash) {
    console.log('Verifying message delivery for tx', txHash);
    return {
      delivered: true,
      confirmations: 12,
      timeInSeconds: Math.floor(Math.random() * 60),
    };
  }
}

module.exports = {
  LayerZeroTestHarness,
  LayerZeroChainId
}; 