/**
 * ERC-4337 Token Gating Tests
 * Tests for token-gated operations in Account Abstraction wallets
 */

const { expect } = require('chai');
const { ethers } = require('hardhat');
const { UserOperationBuilder } = require('../../utils/userOperationBuilder');
const { createEntryPoint, deployWallet } = require('../../utils/aaTestHelpers');

describe('AA Token Gating Tests', function () {
  let entryPoint;
  let smartWallet;
  let owner;
  let beneficiary;
  let tokenContract;
  let nonTokenHolder;
  
  // Token parameters
  const TOKEN_NAME = "Test Token";
  const TOKEN_SYMBOL = "TEST";
  const TOKEN_SUPPLY = ethers.utils.parseEther("1000000");
  const THRESHOLD_AMOUNT = ethers.utils.parseEther("100");
  
  beforeEach(async function () {
    [owner, beneficiary, nonTokenHolder, ...signers] = await ethers.getSigners();
    
    // Deploy entry point
    entryPoint = await createEntryPoint();
    
    // Deploy ERC20 token
    const TokenFactory = await ethers.getContractFactory("TestToken");
    tokenContract = await TokenFactory.deploy(
      TOKEN_NAME,
      TOKEN_SYMBOL,
      TOKEN_SUPPLY
    );
    await tokenContract.deployed();
    
    // Transfer tokens to owner and beneficiary (but not to nonTokenHolder)
    await tokenContract.transfer(beneficiary.address, THRESHOLD_AMOUNT.mul(2));
    
    // Deploy token-gated wallet
    const TokenGatedWalletFactory = await ethers.getContractFactory("TokenGatedWallet");
    smartWallet = await TokenGatedWalletFactory.deploy(
      entryPoint.address,
      owner.address,
      tokenContract.address,
      THRESHOLD_AMOUNT
    );
    
    // Fund wallet
    await owner.sendTransaction({
      to: smartWallet.address,
      value: ethers.utils.parseEther("1.0")
    });
  });

  describe('Token Gating Configuration', function () {
    it('should correctly initialize with token requirements', async function () {
      // Verify token contract address
      expect(await smartWallet.tokenContract()).to.equal(tokenContract.address);
      
      // Verify threshold amount
      expect(await smartWallet.tokenThreshold()).to.equal(THRESHOLD_AMOUNT);
    });
    
    it('should allow owner to change token threshold', async function () {
      const newThreshold = THRESHOLD_AMOUNT.div(2);
      
      const updateThresholdOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('setTokenThreshold', [newThreshold])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await owner.signMessage(ethers.utils.arrayify(await smartWallet.getUserOpHash())))
        .build();
      
      await entryPoint.handleOps([updateThresholdOp], beneficiary.address);
      
      // Verify threshold was updated
      expect(await smartWallet.tokenThreshold()).to.equal(newThreshold);
    });
    
    it('should allow owner to change token contract', async function () {
      // Deploy a new token contract
      const NewTokenFactory = await ethers.getContractFactory("TestToken");
      const newTokenContract = await NewTokenFactory.deploy(
        "New Token",
        "NEW",
        TOKEN_SUPPLY
      );
      await newTokenContract.deployed();
      
      const updateTokenContractOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('setTokenContract', [newTokenContract.address])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await owner.signMessage(ethers.utils.arrayify(await smartWallet.getUserOpHash())))
        .build();
      
      await entryPoint.handleOps([updateTokenContractOp], beneficiary.address);
      
      // Verify token contract was updated
      expect(await smartWallet.tokenContract()).to.equal(newTokenContract.address);
    });
  });
  
  describe('Token-Gated Operations', function () {
    it('should allow operations by accounts with sufficient tokens', async function () {
      // Beneficiary has tokens > threshold
      const transferAmount = ethers.utils.parseEther("0.1");
      
      const transferOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('tokenGatedExecute', [
            beneficiary.address, // Target to send ETH
            transferAmount, // Amount to send
            '0x', // Empty calldata for simple transfer
            beneficiary.address // Token holder authenticating the operation
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await beneficiary.signMessage(ethers.utils.arrayify(await smartWallet.getTokenGatedOpHash(beneficiary.address))))
        .build();
      
      // Operation should succeed
      await entryPoint.handleOps([transferOp], beneficiary.address);
      
      // Verify transfer happened
      const balance = await ethers.provider.getBalance(beneficiary.address);
      expect(balance).to.be.gt(0);
    });
    
    it('should reject operations by accounts without sufficient tokens', async function () {
      // nonTokenHolder has 0 tokens < threshold
      const transferAmount = ethers.utils.parseEther("0.1");
      
      const transferOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('tokenGatedExecute', [
            nonTokenHolder.address, // Target
            transferAmount, // Amount
            '0x', // Empty calldata
            nonTokenHolder.address // Non-token holder trying to authenticate
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await nonTokenHolder.signMessage(ethers.utils.arrayify(await smartWallet.getTokenGatedOpHash(nonTokenHolder.address))))
        .build();
      
      // Operation should fail due to insufficient tokens
      await expect(entryPoint.handleOps([transferOp], beneficiary.address)).to.be.reverted;
    });
    
    it('should handle token balance changes that cross the threshold', async function () {
      // Initially beneficiary has tokens > threshold
      // First operation should succeed
      const transferAmount = ethers.utils.parseEther("0.1");
      
      const firstTransferOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('tokenGatedExecute', [
            beneficiary.address,
            transferAmount,
            '0x',
            beneficiary.address
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await beneficiary.signMessage(ethers.utils.arrayify(await smartWallet.getTokenGatedOpHash(beneficiary.address))))
        .build();
      
      await entryPoint.handleOps([firstTransferOp], beneficiary.address);
      
      // Now transfer tokens away from beneficiary so they're below threshold
      await tokenContract.connect(beneficiary).transfer(
        owner.address, 
        THRESHOLD_AMOUNT.mul(2) // Transfer all tokens away
      );
      
      // Second operation should fail due to now-insufficient tokens
      const secondTransferOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('tokenGatedExecute', [
            beneficiary.address,
            transferAmount,
            '0x',
            beneficiary.address
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await beneficiary.signMessage(ethers.utils.arrayify(await smartWallet.getTokenGatedOpHash(beneficiary.address))))
        .build();
      
      await expect(entryPoint.handleOps([secondTransferOp], beneficiary.address)).to.be.reverted;
    });
  });
  
  describe('NFT-Based Token Gating', function () {
    let nftContract;
    let nftHolder;
    let nonNftHolder;
    
    beforeEach(async function () {
      nftHolder = signers[0];
      nonNftHolder = signers[1];
      
      // Deploy NFT contract
      const NFTFactory = await ethers.getContractFactory("TestNFT");
      nftContract = await NFTFactory.deploy("Test NFT", "TNFT");
      await nftContract.deployed();
      
      // Mint NFT to nftHolder
      await nftContract.mint(nftHolder.address, 1);
      
      // Deploy NFT-gated wallet
      const NFTGatedWalletFactory = await ethers.getContractFactory("NFTGatedWallet");
      smartWallet = await NFTGatedWalletFactory.deploy(
        entryPoint.address,
        owner.address,
        nftContract.address,
        1 // Token ID required
      );
      
      // Fund wallet
      await owner.sendTransaction({
        to: smartWallet.address,
        value: ethers.utils.parseEther("1.0")
      });
    });
    
    it('should allow operations by NFT holder', async function () {
      const transferAmount = ethers.utils.parseEther("0.1");
      
      const transferOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('nftGatedExecute', [
            nftHolder.address,
            transferAmount,
            '0x',
            nftHolder.address
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await nftHolder.signMessage(ethers.utils.arrayify(await smartWallet.getNFTGatedOpHash(nftHolder.address))))
        .build();
      
      // Operation should succeed
      await entryPoint.handleOps([transferOp], beneficiary.address);
      
      // Verify transfer happened
      const balance = await ethers.provider.getBalance(nftHolder.address);
      expect(balance).to.be.gt(0);
    });
    
    it('should reject operations by non-NFT holder', async function () {
      const transferAmount = ethers.utils.parseEther("0.1");
      
      const transferOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('nftGatedExecute', [
            nonNftHolder.address,
            transferAmount,
            '0x',
            nonNftHolder.address
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await nonNftHolder.signMessage(ethers.utils.arrayify(await smartWallet.getNFTGatedOpHash(nonNftHolder.address))))
        .build();
      
      // Operation should fail due to not owning the required NFT
      await expect(entryPoint.handleOps([transferOp], beneficiary.address)).to.be.reverted;
    });
    
    it('should handle NFT transfers correctly', async function () {
      // NFT transfer from nftHolder to nonNftHolder
      await nftContract.connect(nftHolder).transferFrom(
        nftHolder.address,
        nonNftHolder.address,
        1
      );
      
      // Now nonNftHolder should be able to execute operations
      const transferAmount = ethers.utils.parseEther("0.1");
      
      const transferOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('nftGatedExecute', [
            nonNftHolder.address,
            transferAmount,
            '0x',
            nonNftHolder.address
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await nonNftHolder.signMessage(ethers.utils.arrayify(await smartWallet.getNFTGatedOpHash(nonNftHolder.address))))
        .build();
      
      // Operation should now succeed
      await entryPoint.handleOps([transferOp], beneficiary.address);
      
      // And the original holder should no longer be able to execute operations
      const failedTransferOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('nftGatedExecute', [
            nftHolder.address,
            transferAmount,
            '0x',
            nftHolder.address
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await nftHolder.signMessage(ethers.utils.arrayify(await smartWallet.getNFTGatedOpHash(nftHolder.address))))
        .build();
      
      // Operation should fail as nftHolder no longer owns the NFT
      await expect(entryPoint.handleOps([failedTransferOp], beneficiary.address)).to.be.reverted;
    });
  });
  
  describe('Multi-Token Gating', function () {
    let tokenContract2;
    let multiTokenUser;
    let singleTokenUser;
    
    beforeEach(async function () {
      multiTokenUser = signers[0];
      singleTokenUser = signers[1];
      
      // Deploy a second token
      const TokenFactory = await ethers.getContractFactory("TestToken");
      tokenContract2 = await TokenFactory.deploy(
        "Second Token",
        "TKN2",
        TOKEN_SUPPLY
      );
      await tokenContract2.deployed();
      
      // Transfer both tokens to multiTokenUser
      await tokenContract.transfer(multiTokenUser.address, THRESHOLD_AMOUNT.mul(2));
      await tokenContract2.transfer(multiTokenUser.address, THRESHOLD_AMOUNT.mul(2));
      
      // Transfer only first token to singleTokenUser
      await tokenContract.transfer(singleTokenUser.address, THRESHOLD_AMOUNT.mul(2));
      
      // Deploy multi-token gated wallet
      const MultiTokenWalletFactory = await ethers.getContractFactory("MultiTokenGatedWallet");
      smartWallet = await MultiTokenWalletFactory.deploy(
        entryPoint.address,
        owner.address,
        [tokenContract.address, tokenContract2.address],
        [THRESHOLD_AMOUNT, THRESHOLD_AMOUNT]
      );
      
      // Fund wallet
      await owner.sendTransaction({
        to: smartWallet.address,
        value: ethers.utils.parseEther("1.0")
      });
    });
    
    it('should allow operations by holders of all required tokens', async function () {
      const transferAmount = ethers.utils.parseEther("0.1");
      
      const transferOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('multiTokenGatedExecute', [
            multiTokenUser.address,
            transferAmount,
            '0x',
            multiTokenUser.address
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await multiTokenUser.signMessage(ethers.utils.arrayify(await smartWallet.getMultiTokenOpHash(multiTokenUser.address))))
        .build();
      
      // Operation should succeed
      await entryPoint.handleOps([transferOp], beneficiary.address);
      
      // Verify transfer happened
      const balance = await ethers.provider.getBalance(multiTokenUser.address);
      expect(balance).to.be.gt(0);
    });
    
    it('should reject operations by holders of only some tokens', async function () {
      const transferAmount = ethers.utils.parseEther("0.1");
      
      const transferOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('multiTokenGatedExecute', [
            singleTokenUser.address,
            transferAmount,
            '0x',
            singleTokenUser.address
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await singleTokenUser.signMessage(ethers.utils.arrayify(await smartWallet.getMultiTokenOpHash(singleTokenUser.address))))
        .build();
      
      // Operation should fail due to missing second token
      await expect(entryPoint.handleOps([transferOp], beneficiary.address)).to.be.reverted;
    });
  });
  
  describe('Token-Based Access Control', function () {
    let role1User; // Has >= 100 tokens (basic access)
    let role2User; // Has >= 1000 tokens (premium access)
    let role3User; // Has >= 10000 tokens (admin access)
    
    const ROLE1_THRESHOLD = THRESHOLD_AMOUNT; // 100 tokens
    const ROLE2_THRESHOLD = THRESHOLD_AMOUNT.mul(10); // 1000 tokens
    const ROLE3_THRESHOLD = THRESHOLD_AMOUNT.mul(100); // 10000 tokens
    
    beforeEach(async function () {
      [role1User, role2User, role3User] = signers;
      
      // Transfer tokens according to roles
      await tokenContract.transfer(role1User.address, ROLE1_THRESHOLD);
      await tokenContract.transfer(role2User.address, ROLE2_THRESHOLD);
      await tokenContract.transfer(role3User.address, ROLE3_THRESHOLD);
      
      // Deploy tiered access wallet
      const TieredAccessWalletFactory = await ethers.getContractFactory("TokenTieredAccessWallet");
      smartWallet = await TieredAccessWalletFactory.deploy(
        entryPoint.address,
        owner.address,
        tokenContract.address,
        [ROLE1_THRESHOLD, ROLE2_THRESHOLD, ROLE3_THRESHOLD]
      );
      
      // Fund wallet
      await owner.sendTransaction({
        to: smartWallet.address,
        value: ethers.utils.parseEther("1.0")
      });
    });
    
    it('should enforce correct access tiers based on token balance', async function () {
      // Role 1 user should be able to execute basic operations
      const basicOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('executeBasicOperation', [
            role1User.address,
            ethers.utils.parseEther("0.01"),
            '0x',
            role1User.address
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await role1User.signMessage(ethers.utils.arrayify(await smartWallet.getBasicOpHash(role1User.address))))
        .build();
      
      await entryPoint.handleOps([basicOp], beneficiary.address);
      
      // Role 1 user should NOT be able to execute premium operations
      const premiumOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('executePremiumOperation', [
            role1User.address,
            ethers.utils.parseEther("0.1"),
            '0x',
            role1User.address
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await role1User.signMessage(ethers.utils.arrayify(await smartWallet.getPremiumOpHash(role1User.address))))
        .build();
      
      await expect(entryPoint.handleOps([premiumOp], beneficiary.address)).to.be.reverted;
      
      // Role 2 user should be able to execute premium operations
      const premiumOpRole2 = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('executePremiumOperation', [
            role2User.address,
            ethers.utils.parseEther("0.1"),
            '0x',
            role2User.address
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await role2User.signMessage(ethers.utils.arrayify(await smartWallet.getPremiumOpHash(role2User.address))))
        .build();
      
      await entryPoint.handleOps([premiumOpRole2], beneficiary.address);
      
      // Only role 3 user should be able to execute admin operations
      const adminOp = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('executeAdminOperation', [
            role3User.address,
            ethers.utils.parseEther("0.5"),
            '0x',
            role3User.address
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await role3User.signMessage(ethers.utils.arrayify(await smartWallet.getAdminOpHash(role3User.address))))
        .build();
      
      await entryPoint.handleOps([adminOp], beneficiary.address);
      
      // Role 2 user should NOT be able to execute admin operations
      const adminOpRole2 = await new UserOperationBuilder()
        .withSender(smartWallet.address)
        .withCallData(
          smartWallet.interface.encodeFunctionData('executeAdminOperation', [
            role2User.address,
            ethers.utils.parseEther("0.5"),
            '0x',
            role2User.address
          ])
        )
        .withEntryPoint(entryPoint.address)
        .withSignature(await role2User.signMessage(ethers.utils.arrayify(await smartWallet.getAdminOpHash(role2User.address))))
        .build();
      
      await expect(entryPoint.handleOps([adminOpRole2], beneficiary.address)).to.be.reverted;
    });
  });
}); 