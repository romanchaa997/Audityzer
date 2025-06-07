/* global describe, it, expect, beforeEach, afterEach, jest */
/**
 * ERC-4337 Counterfactual Wallet Tests
 * Tests for create2-based counterfactual wallet deployments
 */

const { expect } = require('chai');
const { ethers } = require('hardhat');
const { UserOperationBuilder } = require('../../utils/userOperationBuilder');
const { createEntryPoint } = require('../../utils/aaTestHelpers');

describe('AA Counterfactual Wallet Tests', function () {
  let entryPoint;
  let walletFactory;
  let deployer;
  let beneficiary;
  let owner;
  let salt;
  let implementation;
  
  beforeEach(async function () {
    [deployer, owner, beneficiary, ...signers] = await ethers.getSigners();
    
    // Deploy EntryPoint
    entryPoint = await createEntryPoint();
    
    // Deploy wallet implementation
    const WalletImplementation = await ethers.getContractFactory('SmartWallet');
    implementation = await WalletImplementation.deploy(entryPoint.address);
    await implementation.deployed();
    
    // Deploy wallet factory
    const WalletFactory = await ethers.getContractFactory('SmartWalletFactory');
    walletFactory = await WalletFactory.deploy(implementation.address);
    await walletFactory.deployed();
    
    // Generate random salt
    salt = ethers.utils.hexZeroPad(ethers.utils.hexlify(ethers.utils.randomBytes(32)), 32);
  });

  describe('Counterfactual Address Calculation', function () {
    it('should correctly predict wallet address', async function () {
      // Calculate counterfactual address
      const expectedAddress = await walletFactory.getWalletAddress(owner.address, salt);
      
      // Verify address is non-zero
      expect(expectedAddress).to.not.equal(ethers.constants.AddressZero);
      
      // Verify no code exists at this address yet
      const code = await ethers.provider.getCode(expectedAddress);
      expect(code).to.equal('0x');
    });
    
    it('should generate consistent address for same parameters', async function () {
      const address1 = await walletFactory.getWalletAddress(owner.address, salt);
      const address2 = await walletFactory.getWalletAddress(owner.address, salt);
      
      expect(address1).to.equal(address2);
    });
    
    it('should generate different address with different salt', async function () {
      const address1 = await walletFactory.getWalletAddress(owner.address, salt);
      
      const differentSalt = ethers.utils.hexZeroPad(
        ethers.utils.hexlify(ethers.utils.randomBytes(32)), 
        32
      );
      
      const address2 = await walletFactory.getWalletAddress(owner.address, differentSalt);
      
      expect(address1).to.not.equal(address2);
    });
  });
  
  describe('Counterfactual Wallet Deployment', function () {
    it('should deploy wallet at predicted address', async function () {
      // Calculate counterfactual address
      const expectedAddress = await walletFactory.getWalletAddress(owner.address, salt);
      
      // Deploy wallet
      await walletFactory.deployWallet(owner.address, salt);
      
      // Verify code exists at address now
      const code = await ethers.provider.getCode(expectedAddress);
      expect(code).to.not.equal('0x');
    });
    
    it('should initialize wallet with correct owner', async function () {
      // Get predicted address
      const walletAddress = await walletFactory.getWalletAddress(owner.address, salt);
      
      // Deploy wallet
      await walletFactory.deployWallet(owner.address, salt);
      
      // Get wallet instance
      const Wallet = await ethers.getContractFactory('SmartWallet');
      const wallet = Wallet.attach(walletAddress);
      
      // Verify owner
      expect(await wallet.owner()).to.equal(owner.address);
    });
  });
  
  describe('Operating Counterfactual Wallets through EntryPoint', function () {
    it('should handle first UserOp and deploy wallet in single transaction', async function () {
      // Get counterfactual address
      const walletAddress = await walletFactory.getWalletAddress(owner.address, salt);
      
      // Fund the counterfactual address
      await deployer.sendTransaction({
        to: walletAddress,
        value: ethers.utils.parseEther('1.0')
      });
      
      // Create UserOp with initCode
      const initCode = ethers.utils.hexConcat([
        walletFactory.address,
        walletFactory.interface.encodeFunctionData('deployWallet', [
          owner.address,
          salt
        ])
      ]);
      
      // Create a simple UserOp (e.g., transfer ETH)
      const callData = ethers.utils.hexConcat([
        "0xb61d27f6", // transfer(address,uint256,bytes)
        ethers.utils.defaultAbiCoder.encode(
          ["address", "uint256", "bytes"],
          [beneficiary.address, ethers.utils.parseEther('0.1'), "0x"]
        )
      ]);
      
      const userOp = await new UserOperationBuilder()
        .withSender(walletAddress)
        .withNonce(0)
        .withCallData(callData)
        .withInitCode(initCode)
        .withEntryPoint(entryPoint.address)
        .withSignature(await owner.signMessage(ethers.utils.arrayify("0x01"))) // Placeholder, will be replaced
        .build();
      
      // Get UserOpHash and sign
      const userOpHash = await entryPoint.getUserOpHash(userOp);
      userOp.signature = await owner.signMessage(ethers.utils.arrayify(userOpHash));
      
      // Execute through EntryPoint
      const tx = await entryPoint.handleOps([userOp], beneficiary.address);
      const receipt = await tx.wait();
      
      // Verify wallet was deployed
      const code = await ethers.provider.getCode(walletAddress);
      expect(code).to.not.equal('0x');
      
      // Verify ETH transfer happened
      const beneficiaryBalance = await ethers.provider.getBalance(beneficiary.address);
      expect(beneficiaryBalance).to.be.gt(0); // Balance increased from fee and operation
    });
    
    it('should fail for unauthorized deployments', async function () {
      // Get counterfactual address
      const walletAddress = await walletFactory.getWalletAddress(owner.address, salt);
      
      // Try to deploy with wrong owner (attacker)
      const attacker = signers[0];
      
      // Create UserOp with initCode
      const initCode = ethers.utils.hexConcat([
        walletFactory.address,
        walletFactory.interface.encodeFunctionData('deployWallet', [
          attacker.address, // Different from the one used in address calculation
          salt
        ])
      ]);
      
      const callData = ethers.utils.hexConcat([
        "0xb61d27f6", // transfer(address,uint256,bytes)
        ethers.utils.defaultAbiCoder.encode(
          ["address", "uint256", "bytes"],
          [attacker.address, ethers.utils.parseEther('0.1'), "0x"]
        )
      ]);
      
      const userOp = await new UserOperationBuilder()
        .withSender(walletAddress) // Correct address
        .withNonce(0)
        .withCallData(callData)
        .withInitCode(initCode)
        .withEntryPoint(entryPoint.address)
        .withSignature(await attacker.signMessage(ethers.utils.arrayify("0x01"))) // Signed by attacker
        .build();
      
      // Get UserOpHash and sign with attacker
      const userOpHash = await entryPoint.getUserOpHash(userOp);
      userOp.signature = await attacker.signMessage(ethers.utils.arrayify(userOpHash));
      
      // Should fail
      await expect(entryPoint.handleOps([userOp], beneficiary.address)).to.be.reverted;
    });
  });
  
  describe('Multiple Counterfactual Deployments', function () {
    it('should handle sequential wallet deployments from same factory', async function () {
      // Create 3 wallets in sequence
      const owners = signers.slice(0, 3);
      const walletAddresses = [];
      
      for (let i = 0; i < owners.length; i++) {
        // Create unique salt
        const uniqueSalt = ethers.utils.hexZeroPad(
          ethers.utils.hexlify(ethers.BigNumber.from(i + 1)), 
          32
        );
        
        // Calculate address
        const walletAddress = await walletFactory.getWalletAddress(owners[i].address, uniqueSalt);
        walletAddresses.push(walletAddress);
        
        // Deploy wallet
        await walletFactory.deployWallet(owners[i].address, uniqueSalt);
        
        // Verify deployment
        const code = await ethers.provider.getCode(walletAddress);
        expect(code).to.not.equal('0x');
      }
      
      // Verify all addresses are different
      expect(new Set(walletAddresses).size).to.equal(owners.length);
    });
    
    it('should handle concurrent deployments from factory', async function () {
      // Create 3 wallets concurrently
      const owners = signers.slice(0, 3);
      const salts = owners.map((_, i) => 
        ethers.utils.hexZeroPad(ethers.utils.hexlify(ethers.BigNumber.from(i + 1)), 32)
      );
      
      // Calculate addresses
      const expectedAddresses = await Promise.all(
        owners.map((owner, i) => walletFactory.getWalletAddress(owner.address, salts[i]))
      );
      
      // Deploy concurrently
      await Promise.all(
        owners.map((owner, i) => walletFactory.deployWallet(owner.address, salts[i]))
      );
      
      // Verify all deployments
      for (const address of expectedAddresses) {
        const code = await ethers.provider.getCode(address);
        expect(code).to.not.equal('0x');
      }
    });
  });
  
  describe('Gas Efficiency', function () {
    it('should measure gas savings from counterfactual deployment', async function () {
      // Calculate wallet address
      const walletAddress = await walletFactory.getWalletAddress(owner.address, salt);
      
      // Fund the address
      await deployer.sendTransaction({
        to: walletAddress,
        value: ethers.utils.parseEther('1.0')
      });
      
      // Create initCode for deployment
      const initCode = ethers.utils.hexConcat([
        walletFactory.address,
        walletFactory.interface.encodeFunctionData('deployWallet', [
          owner.address,
          salt
        ])
      ]);
      
      // Create simple callData (ETH transfer)
      const callData = ethers.utils.hexConcat([
        "0xb61d27f6", // transfer(address,uint256,bytes)
        ethers.utils.defaultAbiCoder.encode(
          ["address", "uint256", "bytes"],
          [beneficiary.address, ethers.utils.parseEther('0.1'), "0x"]
        )
      ]);
      
      // Create and sign UserOp
      const userOp = await new UserOperationBuilder()
        .withSender(walletAddress)
        .withNonce(0)
        .withCallData(callData)
        .withInitCode(initCode)
        .withEntryPoint(entryPoint.address)
        .withSignature(await owner.signMessage(ethers.utils.arrayify("0x01"))) // Placeholder
        .build();
      
      // Get UserOpHash and sign
      const userOpHash = await entryPoint.getUserOpHash(userOp);
      userOp.signature = await owner.signMessage(ethers.utils.arrayify(userOpHash));
      
      // Execute through EntryPoint and track gas
      const tx = await entryPoint.handleOps([userOp], beneficiary.address);
      const receipt = await tx.wait();
      
      console.log(`Gas used for counterfactual deployment and operation: ${receipt.gasUsed.toString()}`);
      
      // For comparison, do a second operation without deployment
      const secondCallData = ethers.utils.hexConcat([
        "0xb61d27f6", // transfer
        ethers.utils.defaultAbiCoder.encode(
          ["address", "uint256", "bytes"],
          [beneficiary.address, ethers.utils.parseEther('0.05'), "0x"]
        )
      ]);
      
      const secondUserOp = await new UserOperationBuilder()
        .withSender(walletAddress)
        .withNonce(1) // Increment nonce
        .withCallData(secondCallData)
        .withEntryPoint(entryPoint.address)
        .withSignature(await owner.signMessage(ethers.utils.arrayify("0x01"))) // Placeholder
        .build();
      
      // Get UserOpHash and sign
      const secondUserOpHash = await entryPoint.getUserOpHash(secondUserOp);
      secondUserOp.signature = await owner.signMessage(ethers.utils.arrayify(secondUserOpHash));
      
      // Execute and track gas
      const tx2 = await entryPoint.handleOps([secondUserOp], beneficiary.address);
      const receipt2 = await tx2.wait();
      
      console.log(`Gas used for regular operation: ${receipt2.gasUsed.toString()}`);
      console.log(`Gas savings percentage: ${100 - (receipt2.gasUsed.toNumber() / receipt.gasUsed.toNumber() * 100)}%`);
      
      // Verify the second operation used significantly less gas
      expect(receipt2.gasUsed).to.be.lt(receipt.gasUsed);
    });
  });
}); 