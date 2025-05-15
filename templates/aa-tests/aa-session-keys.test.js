/**
 * ERC-4337 Session Key Tests
 * Tests for session key functionality in Account Abstraction wallets
 */

const { expect } = require('chai');
const { ethers } = require('hardhat');
const { UserOperationBuilder } = require('../../utils/userOperationBuilder');
const { createEntryPoint, deployWallet } = require('../../utils/aaTestHelpers');

describe('AA Session Key Tests', function () {
  let entryPoint;
  let smartWallet;
  let owner;
  let sessionKey;
  let beneficiary;
  let attacker;
  
  // Session key parameters
  const SESSION_DURATION = 60 * 60; // 1 hour in seconds
  const SESSION_NONCE_KEY = 'session_1';
  const MAX_SESSION_AMOUNT = ethers.utils.parseEther('0.5'); // 0.5 ETH max per session
  
  beforeEach(async function () {
    [owner, sessionKey, beneficiary, attacker, ...signers] = await ethers.getSigners();
    
    // Deploy entry point
    entryPoint = await createEntryPoint();
    
    // Deploy session-enabled wallet
    const SessionWalletFactory = await ethers.getContractFactory('SessionWallet');
    smartWallet = await SessionWalletFactory.deploy(entryPoint.address, owner.address);
    
    // Fund wallet
    await owner.sendTransaction({
      to: smartWallet.address,
      value: ethers.utils.parseEther('1.0')
    });
  });

  describe('Session Key Management', function () {
    it('should allow owner to register a session key', async function () {
      const now = Math.floor(Date.now() / 1000);
      const validUntil = now + SESSION_DURATION;
      
      // Create UserOp to register session key
      const sessionParams = {
        sessionKey: sessionKey.address,
        validUntil: validUntil,
        validAfter: now,
        permissions: '0x123456', // Example permission bitmask
        nonceKey: ethers.utils.keccak256(ethers.utils.toUtf8Bytes(SESSION_NONCE_KEY)),
        maxAmount: MAX_SESSION_AMOUNT
      };
      
      const registerOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('registerSessionKey', [
            sessionParams.sessionKey,
            sessionParams.validUntil,
            sessionParams.validAfter,
            sessionParams.permissions,
            sessionParams.nonceKey,
            sessionParams.maxAmount
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await owner.signMessage(ethers.utils.arrayify(await smartWallet.getUserOpHash())))
        .build();
      
      await entryPoint.handleOps([registerOp], beneficiary.address);
      
      // Verify session key was registered
      const sessionKeyInfo = await smartWallet.getSessionKeyInfo(sessionKey.address, sessionParams.nonceKey);
      
      expect(sessionKeyInfo.validUntil).to.equal(validUntil);
      expect(sessionKeyInfo.validAfter).to.equal(now);
      expect(sessionKeyInfo.permissions).to.equal(sessionParams.permissions);
      expect(sessionKeyInfo.maxAmount).to.equal(MAX_SESSION_AMOUNT);
    });
    
    it('should allow owner to revoke a session key', async function () {
      const now = Math.floor(Date.now() / 1000);
      const validUntil = now + SESSION_DURATION;
      const nonceKey = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(SESSION_NONCE_KEY));
      
      // First register a session key
      await smartWallet.connect(owner).registerSessionKey(
        sessionKey.address,
        validUntil,
        now,
        '0x123456',
        nonceKey,
        MAX_SESSION_AMOUNT
      );
      
      // Create UserOp to revoke session key
      const revokeOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('revokeSessionKey', [
            sessionKey.address,
            nonceKey
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await owner.signMessage(ethers.utils.arrayify(await smartWallet.getUserOpHash())))
        .build();
      
      await entryPoint.handleOps([revokeOp], beneficiary.address);
      
      // Verify session key was revoked
      const sessionKeyInfo = await smartWallet.getSessionKeyInfo(sessionKey.address, nonceKey);
      expect(sessionKeyInfo.validUntil).to.equal(0); // Revoked keys have validUntil set to 0
    });
    
    it('should prevent non-owners from registering session keys', async function () {
      const now = Math.floor(Date.now() / 1000);
      const validUntil = now + SESSION_DURATION;
      const nonceKey = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(SESSION_NONCE_KEY));
      
      // Create UserOp to register session key signed by attacker
      const registerOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('registerSessionKey', [
            sessionKey.address,
            validUntil,
            now,
            '0x123456',
            nonceKey,
            MAX_SESSION_AMOUNT
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await attacker.signMessage(ethers.utils.arrayify("0x1234"))) // Attacker's signature
        .build();
      
      // Should fail
      await expect(entryPoint.handleOps([registerOp], beneficiary.address)).to.be.reverted;
    });
  });
  
  describe('Session Key Operations', function () {
    let sessionParams;
    let nonceKey;
    
    beforeEach(async function () {
      // Register a session key for tests
      const now = Math.floor(Date.now() / 1000);
      const validUntil = now + SESSION_DURATION;
      nonceKey = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(SESSION_NONCE_KEY));
      
      sessionParams = {
        sessionKey: sessionKey.address,
        validUntil: validUntil,
        validAfter: now,
        permissions: '0xFFFFFFFF', // All permissions
        nonceKey: nonceKey,
        maxAmount: MAX_SESSION_AMOUNT
      };
      
      await smartWallet.connect(owner).registerSessionKey(
        sessionParams.sessionKey,
        sessionParams.validUntil,
        sessionParams.validAfter,
        sessionParams.permissions,
        sessionParams.nonceKey,
        sessionParams.maxAmount
      );
    });
    
    it('should execute transactions using session key signature', async function () {
      // Create simple ETH transfer
      const transferAmount = ethers.utils.parseEther('0.1');
      const transferCallData = smartWallet.interface.encodeFunctionData('execute', [
        beneficiary.address, 
        transferAmount, 
        '0x' // Empty calldata for simple ETH transfer
      ]);
      
      // Create UserOp with session key signature
      const sessionUserOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(transferCallData)
        .withSessionInfo(nonceKey, 0) // Session nonce starts at 0
        .withEntryPoint(entryPoint.address)
        .withSignature(await sessionKey.signMessage(ethers.utils.arrayify("0x5678"))) // Placeholder
        .build();
      
      // Get session UserOpHash and sign with session key
      const sessionOpHash = await smartWallet.getSessionOpHash(sessionUserOp, nonceKey);
      sessionUserOp.signature = await sessionKey.signMessage(ethers.utils.arrayify(sessionOpHash));
      
      // Execute via entryPoint
      await entryPoint.handleOps([sessionUserOp], beneficiary.address);
      
      // Verify transfer was successful
      const beneficiaryBalance = await ethers.provider.getBalance(beneficiary.address);
      expect(beneficiaryBalance).to.be.gte(transferAmount);
    });
    
    it('should increment session nonce after operation', async function () {
      // Get initial session nonce
      const initialNonce = await smartWallet.getSessionNonce(nonceKey);
      
      // Create simple ETH transfer
      const transferAmount = ethers.utils.parseEther('0.1');
      const transferCallData = smartWallet.interface.encodeFunctionData('execute', [
        beneficiary.address, 
        transferAmount, 
        '0x'
      ]);
      
      // Create and execute UserOp with session key
      const sessionUserOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(transferCallData)
        .withSessionInfo(nonceKey, initialNonce)
        .withEntryPoint(entryPoint.address)
        .withSignature(await sessionKey.signMessage(ethers.utils.arrayify("0x5678"))) // Placeholder
        .build();
      
      const sessionOpHash = await smartWallet.getSessionOpHash(sessionUserOp, nonceKey);
      sessionUserOp.signature = await sessionKey.signMessage(ethers.utils.arrayify(sessionOpHash));
      
      await entryPoint.handleOps([sessionUserOp], beneficiary.address);
      
      // Check nonce was incremented
      const newNonce = await smartWallet.getSessionNonce(nonceKey);
      expect(newNonce).to.equal(initialNonce.add(1));
    });
    
    it('should reject operation exceeding max amount', async function () {
      // Attempt transfer exceeding max amount
      const excessiveAmount = MAX_SESSION_AMOUNT.add(ethers.utils.parseEther('0.1'));
      const transferCallData = smartWallet.interface.encodeFunctionData('execute', [
        beneficiary.address, 
        excessiveAmount, 
        '0x'
      ]);
      
      // Create UserOp with session key
      const sessionUserOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(transferCallData)
        .withSessionInfo(nonceKey, 0)
        .withEntryPoint(entryPoint.address)
        .withSignature(await sessionKey.signMessage(ethers.utils.arrayify("0x5678"))) // Placeholder
        .build();
      
      const sessionOpHash = await smartWallet.getSessionOpHash(sessionUserOp, nonceKey);
      sessionUserOp.signature = await sessionKey.signMessage(ethers.utils.arrayify(sessionOpHash));
      
      // Should fail due to amount restriction
      await expect(entryPoint.handleOps([sessionUserOp], beneficiary.address)).to.be.reverted;
    });
  });
  
  describe('Session Key Expiration', function () {
    it('should reject operations with expired session keys', async function () {
      // Register a session key that's already expired
      const now = Math.floor(Date.now() / 1000);
      const expiredTime = now - 3600; // Expired 1 hour ago
      const nonceKey = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(SESSION_NONCE_KEY));
      
      await smartWallet.connect(owner).registerSessionKey(
        sessionKey.address,
        expiredTime, // validUntil is in the past
        now - 7200, // validAfter is also in the past
        '0xFFFFFFFF',
        nonceKey,
        MAX_SESSION_AMOUNT
      );
      
      // Try to use expired session key
      const transferCallData = smartWallet.interface.encodeFunctionData('execute', [
        beneficiary.address, 
        ethers.utils.parseEther('0.1'), 
        '0x'
      ]);
      
      const sessionUserOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(transferCallData)
        .withSessionInfo(nonceKey, 0)
        .withEntryPoint(entryPoint.address)
        .withSignature(await sessionKey.signMessage(ethers.utils.arrayify("0x5678"))) // Placeholder
        .build();
      
      const sessionOpHash = await smartWallet.getSessionOpHash(sessionUserOp, nonceKey);
      sessionUserOp.signature = await sessionKey.signMessage(ethers.utils.arrayify(sessionOpHash));
      
      // Should fail because session is expired
      await expect(entryPoint.handleOps([sessionUserOp], beneficiary.address)).to.be.reverted;
    });
    
    it('should reject operations before session becomes valid', async function () {
      // Register a session key that's not yet valid
      const now = Math.floor(Date.now() / 1000);
      const futureTime = now + 3600; // Valid 1 hour from now
      const nonceKey = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(SESSION_NONCE_KEY));
      
      await smartWallet.connect(owner).registerSessionKey(
        sessionKey.address,
        futureTime + 3600, // Valid for 1 hour after it starts
        futureTime, // Not valid until future time
        '0xFFFFFFFF',
        nonceKey,
        MAX_SESSION_AMOUNT
      );
      
      // Try to use not-yet-valid session key
      const transferCallData = smartWallet.interface.encodeFunctionData('execute', [
        beneficiary.address, 
        ethers.utils.parseEther('0.1'), 
        '0x'
      ]);
      
      const sessionUserOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(transferCallData)
        .withSessionInfo(nonceKey, 0)
        .withEntryPoint(entryPoint.address)
        .withSignature(await sessionKey.signMessage(ethers.utils.arrayify("0x5678"))) // Placeholder
        .build();
      
      const sessionOpHash = await smartWallet.getSessionOpHash(sessionUserOp, nonceKey);
      sessionUserOp.signature = await sessionKey.signMessage(ethers.utils.arrayify(sessionOpHash));
      
      // Should fail because session is not yet valid
      await expect(entryPoint.handleOps([sessionUserOp], beneficiary.address)).to.be.reverted;
    });
  });
  
  describe('Session Key Security', function () {
    let nonceKey;
    
    beforeEach(async function () {
      // Register a valid session key
      const now = Math.floor(Date.now() / 1000);
      const validUntil = now + SESSION_DURATION;
      nonceKey = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(SESSION_NONCE_KEY));
      
      await smartWallet.connect(owner).registerSessionKey(
        sessionKey.address,
        validUntil,
        now,
        '0xFFFFFFFF', // All permissions
        nonceKey,
        MAX_SESSION_AMOUNT
      );
    });
    
    it('should reject operations signed by unregistered keys', async function () {
      // Try to use an unregistered key (attacker)
      const transferCallData = smartWallet.interface.encodeFunctionData('execute', [
        attacker.address, 
        ethers.utils.parseEther('0.1'), 
        '0x'
      ]);
      
      const attackerOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(transferCallData)
        .withSessionInfo(nonceKey, 0)
        .withEntryPoint(entryPoint.address)
        .withSignature(await attacker.signMessage(ethers.utils.arrayify("0x5678"))) // Attacker signature
        .build();
      
      // Even with correct structure, attacker's signature should fail
      const sessionOpHash = await smartWallet.getSessionOpHash(attackerOp, nonceKey);
      attackerOp.signature = await attacker.signMessage(ethers.utils.arrayify(sessionOpHash));
      
      await expect(entryPoint.handleOps([attackerOp], beneficiary.address)).to.be.reverted;
    });
    
    it('should reject replay attacks with nonce reuse', async function () {
      // First valid operation
      const transferCallData = smartWallet.interface.encodeFunctionData('execute', [
        beneficiary.address, 
        ethers.utils.parseEther('0.1'), 
        '0x'
      ]);
      
      const sessionUserOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(transferCallData)
        .withSessionInfo(nonceKey, 0) // Nonce 0
        .withEntryPoint(entryPoint.address)
        .withSignature(await sessionKey.signMessage(ethers.utils.arrayify("0x5678")))
        .build();
      
      const sessionOpHash = await smartWallet.getSessionOpHash(sessionUserOp, nonceKey);
      sessionUserOp.signature = await sessionKey.signMessage(ethers.utils.arrayify(sessionOpHash));
      
      // Execute first operation
      await entryPoint.handleOps([sessionUserOp], beneficiary.address);
      
      // Try to replay the same operation (same nonce)
      await expect(entryPoint.handleOps([sessionUserOp], beneficiary.address)).to.be.reverted;
    });
    
    it('should limit session key to permitted operations', async function () {
      // Register a session key with limited permissions (just for example)
      const now = Math.floor(Date.now() / 1000);
      const validUntil = now + SESSION_DURATION;
      const limitedNonceKey = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('limited_session'));
      const limitedPermissions = '0x00000001'; // Only permission bit 0 is set
      
      await smartWallet.connect(owner).registerSessionKey(
        sessionKey.address,
        validUntil,
        now,
        limitedPermissions,
        limitedNonceKey,
        MAX_SESSION_AMOUNT
      );
      
      // Try operation requiring higher permissions
      const unpermittedCallData = smartWallet.interface.encodeFunctionData('executeWithPermission', [
        beneficiary.address, 
        ethers.utils.parseEther('0.1'), 
        '0x',
        '0x00000002' // Requires permission bit 1
      ]);
      
      const limitedSessionOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(unpermittedCallData)
        .withSessionInfo(limitedNonceKey, 0)
        .withEntryPoint(entryPoint.address)
        .withSignature(await sessionKey.signMessage(ethers.utils.arrayify("0x5678")))
        .build();
      
      const sessionOpHash = await smartWallet.getSessionOpHash(limitedSessionOp, limitedNonceKey);
      limitedSessionOp.signature = await sessionKey.signMessage(ethers.utils.arrayify(sessionOpHash));
      
      // Should fail due to insufficient permissions
      await expect(entryPoint.handleOps([limitedSessionOp], beneficiary.address)).to.be.reverted;
    });
  });
}); 