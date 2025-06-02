/* global describe, it, expect, beforeEach, afterEach, jest */
/**
 * Composable Cross-Chain Test Generator
 *
 * This module generates specialized test cases for composable
 * cross-chain applications spanning multiple blockchain networks.
 */

const fs = require('fs-extra');
const path = require('path');
const { template } = require('lodash');

// Test categories for cross-chain applications
const TEST_CATEGORIES = {
  MESSAGING: 'cross-chain-messaging',
  ASSETS: 'cross-chain-assets',
  LIQUIDITY: 'cross-chain-liquidity',
  GOVERNANCE: 'cross-chain-governance',
  EXECUTION: 'cross-chain-execution',
};

// Test templates for different categories
const TEST_TEMPLATES = {
  [TEST_CATEGORIES.MESSAGING]: `
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { simulateCrossChainMessage } = require('../helpers/cross-chain-helpers');

describe('Cross-Chain Messaging Tests for {{ appName }}', function() {
  let sourceChain, targetChain, messageSender, messageReceiver;
  
  before(async function() {
    // Connect to source chain
    sourceChain = await ethers.getContractAt('{{ sourceContractName }}', '{{ sourceContractAddress }}');
    
    // Connect to target chain (in a real test, this would be on a different network)
    targetChain = await ethers.getContractAt('{{ targetContractName }}', '{{ targetContractAddress }}');
    
    // Set up signers
    [messageSender, messageReceiver] = await ethers.getSigners();
  });
  
  it('should send and receive cross-chain messages', async function() {
    // Prepare test message
    const testMessage = ethers.utils.formatBytes32String("TEST_MESSAGE");
    
    // Send message from source chain
    const tx = await sourceChain.sendMessage(
      {{ targetChainId }}, 
      '{{ targetContractAddress }}',
      testMessage,
      { value: ethers.utils.parseEther("0.01") }
    );
    
    // Wait for transaction to be mined
    await tx.wait();
    
    // Simulate message delivery to target chain
    await simulateCrossChainMessage(tx, {{ sourceChainId }}, {{ targetChainId }});
    
    // Verify message was received on target chain
    const receivedMessage = await targetChain.getLastReceivedMessage();
    expect(receivedMessage).to.equal(testMessage);
  });
  
  it('should reject messages from unauthorized sources', async function() {
    // Prepare test message
    const testMessage = ethers.utils.formatBytes32String("UNAUTHORIZED_MESSAGE");
    
    // Attempt to directly send message to target without going through proper channels
    await expect(
      targetChain.receiveMessage({{ sourceChainId }}, testMessage)
    ).to.be.revertedWith("Unauthorized source");
  });
  
  it('should prevent message replay attacks', async function() {
    // Prepare test message
    const testMessage = ethers.utils.formatBytes32String("REPLAY_TEST");
    
    // Send message from source chain
    const tx = await sourceChain.sendMessage(
      {{ targetChainId }}, 
      '{{ targetContractAddress }}',
      testMessage,
      { value: ethers.utils.parseEther("0.01") }
    );
    
    // Wait for transaction to be mined
    await tx.wait();
    
    // Simulate message delivery to target chain
    await simulateCrossChainMessage(tx, {{ sourceChainId }}, {{ targetChainId }});
    
    // Try to replay the same message
    await expect(
      simulateCrossChainMessage(tx, {{ sourceChainId }}, {{ targetChainId }})
    ).to.be.revertedWith("Message already processed");
  });
});`,

  [TEST_CATEGORIES.ASSETS]: `
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { simulateCrossChainMessage } = require('../helpers/cross-chain-helpers');

describe('Cross-Chain Asset Transfer Tests for {{ appName }}', function() {
  let sourceChain, targetChain, tokenOwner, recipient;
  
  before(async function() {
    // Connect to source chain
    sourceChain = await ethers.getContractAt('{{ sourceContractName }}', '{{ sourceContractAddress }}');
    
    // Connect to target chain (in a real test, this would be on a different network)
    targetChain = await ethers.getContractAt('{{ targetContractName }}', '{{ targetContractAddress }}');
    
    // Connect to tokens
    sourceToken = await ethers.getContractAt('{{ sourceTokenName }}', '{{ sourceTokenAddress }}');
    targetToken = await ethers.getContractAt('{{ targetTokenName }}', '{{ targetTokenAddress }}');
    
    // Set up signers
    [tokenOwner, recipient] = await ethers.getSigners();
    
    // Approve tokens for transfer
    await sourceToken.approve('{{ sourceContractAddress }}', ethers.constants.MaxUint256);
  });
  
  it('should bridge tokens from source to target chain', async function() {
    // Initial balances
    const initialSourceBalance = await sourceToken.balanceOf(tokenOwner.address);
    const initialTargetBalance = await targetToken.balanceOf(recipient.address);
    
    // Amount to transfer
    const transferAmount = ethers.utils.parseUnits("10", 18);
    
    // Bridge tokens from source to target
    const tx = await sourceChain.bridgeTokens(
      {{ targetChainId }}, 
      recipient.address,
      transferAmount,
      { value: ethers.utils.parseEther("0.01") }
    );
    
    // Wait for transaction to be mined
    await tx.wait();
    
    // Simulate message delivery to target chain
    await simulateCrossChainMessage(tx, {{ sourceChainId }}, {{ targetChainId }});
    
    // Check source balance decreased
    const finalSourceBalance = await sourceToken.balanceOf(tokenOwner.address);
    expect(finalSourceBalance).to.equal(initialSourceBalance.sub(transferAmount));
    
    // Check target balance increased
    const finalTargetBalance = await targetToken.balanceOf(recipient.address);
    expect(finalTargetBalance).to.equal(initialTargetBalance.add(transferAmount));
  });
  
  it('should handle failed transfers properly', async function() {
    // Transfer amount larger than balance
    const excessiveAmount = ethers.utils.parseUnits("1000000", 18);
    
    // Attempt to bridge tokens with insufficient balance
    await expect(
      sourceChain.bridgeTokens(
        {{ targetChainId }}, 
        recipient.address,
        excessiveAmount,
        { value: ethers.utils.parseEther("0.01") }
      )
    ).to.be.revertedWith("Insufficient balance");
  });
});`,

  [TEST_CATEGORIES.LIQUIDITY]: `
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { simulateCrossChainMessage } = require('../helpers/cross-chain-helpers');

describe('Cross-Chain Liquidity Tests for {{ appName }}', function() {
  let sourceChain, targetChain, liquidityProvider, user;
  
  before(async function() {
    // Connect to source chain
    sourceChain = await ethers.getContractAt('{{ sourceContractName }}', '{{ sourceContractAddress }}');
    
    // Connect to target chain (in a real test, this would be on a different network)
    targetChain = await ethers.getContractAt('{{ targetContractName }}', '{{ targetContractAddress }}');
    
    // Connect to tokens
    sourceToken = await ethers.getContractAt('{{ sourceTokenName }}', '{{ sourceTokenAddress }}');
    targetToken = await ethers.getContractAt('{{ targetTokenName }}', '{{ targetTokenAddress }}');
    
    // Set up signers
    [liquidityProvider, user] = await ethers.getSigners();
    
    // Approve tokens for liquidity provision
    await sourceToken.approve('{{ sourceContractAddress }}', ethers.constants.MaxUint256);
    await targetToken.approve('{{ targetContractAddress }}', ethers.constants.MaxUint256);
  });
  
  it('should provide and sync liquidity across chains', async function() {
    // Initial liquidity
    const liquidityAmount = ethers.utils.parseUnits("100", 18);
    
    // Add liquidity on source chain
    const txSource = await sourceChain.addLiquidity(
      liquidityAmount,
      { value: ethers.utils.parseEther("0.01") }
    );
    await txSource.wait();
    
    // Add liquidity on target chain
    const txTarget = await targetChain.addLiquidity(
      liquidityAmount,
      { value: ethers.utils.parseEther("0.01") }
    );
    await txTarget.wait();
    
    // Sync liquidity information across chains
    const syncTx = await sourceChain.syncLiquidity(
      {{ targetChainId }},
      { value: ethers.utils.parseEther("0.01") }
    );
    await syncTx.wait();
    
    // Simulate message delivery to target chain
    await simulateCrossChainMessage(syncTx, {{ sourceChainId }}, {{ targetChainId }});
    
    // Verify liquidity is correctly reported on both chains
    const sourceLiquidity = await sourceChain.getTotalLiquidity();
    const targetLiquidity = await targetChain.getTotalLiquidity();
    
    expect(sourceLiquidity).to.equal(targetLiquidity);
    expect(sourceLiquidity).to.equal(liquidityAmount.mul(2));
  });
  
  it('should maintain consistent exchange rates across chains', async function() {
    // Get exchange rates from both chains
    const sourceRate = await sourceChain.getCurrentExchangeRate();
    const targetRate = await targetChain.getCurrentExchangeRate();
    
    // Exchange rates should be within 1% of each other
    const rateRatio = sourceRate.mul(100).div(targetRate);
    expect(rateRatio).to.be.gte(99);
    expect(rateRatio).to.be.lte(101);
  });
});`,

  [TEST_CATEGORIES.GOVERNANCE]: `
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { simulateCrossChainMessage } = require('../helpers/cross-chain-helpers');

describe('Cross-Chain Governance Tests for {{ appName }}', function() {
  let sourceChain, targetChain, governor, user;
  
  before(async function() {
    // Connect to source chain governance
    sourceChain = await ethers.getContractAt('{{ sourceContractName }}', '{{ sourceContractAddress }}');
    
    // Connect to target chain governance
    targetChain = await ethers.getContractAt('{{ targetContractName }}', '{{ targetContractAddress }}');
    
    // Set up signers
    [governor, user] = await ethers.getSigners();
  });
  
  it('should propagate governance proposals across chains', async function() {
    // Create proposal on source chain
    const proposalDescription = "Test cross-chain parameter update";
    const proposalData = ethers.utils.defaultAbiCoder.encode(
      ['uint256'], 
      [ethers.utils.parseUnits("0.5", 18)]
    );
    
    const tx = await sourceChain.createProposal(
      proposalDescription,
      proposalData,
      {{ targetChainId }},
      { value: ethers.utils.parseEther("0.01") }
    );
    await tx.wait();
    
    // Get proposal ID
    const proposalId = await sourceChain.getLastProposalId();
    
    // Simulate message delivery to target chain
    await simulateCrossChainMessage(tx, {{ sourceChainId }}, {{ targetChainId }});
    
    // Check proposal was created on target chain
    const targetProposal = await targetChain.getProposal(proposalId);
    expect(targetProposal.description).to.equal(proposalDescription);
  });
  
  it('should only allow authorized governors to execute proposals', async function() {
    // Create proposal
    const proposalDescription = "Test governance authorization";
    const proposalData = ethers.utils.defaultAbiCoder.encode(
      ['uint256'], 
      [ethers.utils.parseUnits("0.5", 18)]
    );
    
    const tx = await sourceChain.createProposal(
      proposalDescription,
      proposalData,
      {{ targetChainId }},
      { value: ethers.utils.parseEther("0.01") }
    );
    await tx.wait();
    
    // Get proposal ID
    const proposalId = await sourceChain.getLastProposalId();
    
    // Simulate message delivery to target chain
    await simulateCrossChainMessage(tx, {{ sourceChainId }}, {{ targetChainId }});
    
    // Try to execute proposal with non-governor account
    await expect(
      targetChain.connect(user).executeProposal(proposalId)
    ).to.be.revertedWith("Not authorized");
    
    // Execute proposal with governor account
    await targetChain.connect(governor).executeProposal(proposalId);
    
    // Check proposal was executed
    const targetProposal = await targetChain.getProposal(proposalId);
    expect(targetProposal.executed).to.be.true;
  });
});`,

  [TEST_CATEGORIES.EXECUTION]: `
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { simulateCrossChainMessage } = require('../helpers/cross-chain-helpers');

describe('Cross-Chain Execution Tests for {{ appName }}', function() {
  let sourceChain, targetChain, deployer, user;
  
  before(async function() {
    // Connect to source chain executor
    sourceChain = await ethers.getContractAt('{{ sourceContractName }}', '{{ sourceContractAddress }}');
    
    // Connect to target chain executor
    targetChain = await ethers.getContractAt('{{ targetContractName }}', '{{ targetContractAddress }}');
    
    // Set up signers
    [deployer, user] = await ethers.getSigners();
  });
  
  it('should execute cross-chain function calls', async function() {
    // Function signature and parameters to execute on target chain
    const functionSelector = targetChain.interface.getSighash('setParameter(uint256)');
    const paramValue = 12345;
    const callData = ethers.utils.defaultAbiCoder.encode(['uint256'], [paramValue]);
    
    // Execute cross-chain call
    const tx = await sourceChain.executeRemote(
      {{ targetChainId }},
      '{{ targetContractAddress }}',
      functionSelector,
      callData,
      { value: ethers.utils.parseEther("0.01") }
    );
    await tx.wait();
    
    // Simulate message delivery to target chain
    await simulateCrossChainMessage(tx, {{ sourceChainId }}, {{ targetChainId }});
    
    // Verify the parameter was updated on target chain
    const newParam = await targetChain.getParameter();
    expect(newParam).to.equal(paramValue);
  });
  
  it('should enforce permissions for cross-chain execution', async function() {
    // Function signature and parameters to execute on target chain
    const functionSelector = targetChain.interface.getSighash('setParameter(uint256)');
    const paramValue = 54321;
    const callData = ethers.utils.defaultAbiCoder.encode(['uint256'], [paramValue]);
    
    // Try to execute from non-authorized account
    await expect(
      sourceChain.connect(user).executeRemote(
        {{ targetChainId }},
        '{{ targetContractAddress }}',
        functionSelector,
        callData,
        { value: ethers.utils.parseEther("0.01") }
      )
    ).to.be.revertedWith("Not authorized");
  });
  
  it('should handle execution failures correctly', async function() {
    // Invalid function selector to trigger execution failure
    const functionSelector = '0x12345678';
    const callData = '0x';
    
    // Execute cross-chain call
    const tx = await sourceChain.executeRemote(
      {{ targetChainId }},
      '{{ targetContractAddress }}',
      functionSelector,
      callData,
      { value: ethers.utils.parseEther("0.01") }
    );
    await tx.wait();
    
    // Simulate message delivery to target chain
    await simulateCrossChainMessage(tx, {{ sourceChainId }}, {{ targetChainId }});
    
    // Verify execution failure was recorded
    const latestExecution = await targetChain.getLatestExecution();
    expect(latestExecution.success).to.be.false;
  });
});`,
};

// Helper templates
const HELPER_TEMPLATES = {
  'cross-chain-helpers.js': `
/**
 * Cross-chain testing helpers
 */
const { ethers } = require('hardhat');

/**
 * Simulates cross-chain message passing in a test environment
 * @param {Object} sourceTx - Source transaction that initiated the cross-chain message
 * @param {number} sourceChainId - ID of the source chain
 * @param {number} targetChainId - ID of the target chain
 */
async function simulateCrossChainMessage(sourceTx, sourceChainId, targetChainId) {
  // In a real test environment, this would use actual bridge infrastructure
  // For testing, we extract message data from the transaction logs
  
  const receipt = await ethers.provider.getTransactionReceipt(sourceTx.hash);
  
  // Find the message sent event - this is protocol-specific
  // For this example, we assume LayerZero or similar protocol with a MessageSent event
  const messageSentInterface = new ethers.utils.Interface([
    "event MessageSent(uint16 dstChainId, bytes destination, bytes payload)"
  ]);
  
  // Parse logs to find message data
  let messageData = null;
  for (const log of receipt.logs) {
    try {
      const parsedLog = messageSentInterface.parseLog(log);
      if (parsedLog.name === 'MessageSent' && 
          parsedLog.args.dstChainId.toString() === targetChainId.toString()) {
        messageData = {
          dstChainId: parsedLog.args.dstChainId,
          destination: parsedLog.args.destination,
          payload: parsedLog.args.payload
        };
        break;
      }
    } catch (e) {
      // Not the log we're looking for
      continue;
    }
  }
  
  if (!messageData) {
    throw new Error("No cross-chain message found in transaction logs");
  }
  
  // Simulate delivery by directly calling the target contract
  // Get the target contract instance
  const targetAddress = ethers.utils.hexDataSlice(messageData.destination, 0, 20);
  const targetInterface = new ethers.utils.Interface([
    "function lzReceive(uint16 srcChainId, bytes srcAddress, uint64 nonce, bytes payload) external"
  ]);
  
  // Create mock source address (20 bytes for address)
  const sourceBridgeAddress = ethers.utils.hexZeroPad(sourceTx.to, 20);
  
  // Mock nonce - in real implementation this would be tracked
  const nonce = ethers.BigNumber.from(Date.now());
  
  // Create a contract instance to call lzReceive
  const targetContract = new ethers.Contract(
    targetAddress,
    targetInterface,
    ethers.provider.getSigner()
  );
  
  // Call lzReceive to simulate message delivery
  const deliveryTx = await targetContract.lzReceive(
    sourceChainId,
    sourceBridgeAddress,
    nonce,
    messageData.payload
  );
  
  return deliveryTx;
}

/**
 * Gets the current gas price for a specific chain
 * @param {number} chainId - Chain ID to get gas price for
 * @returns {Promise<BigNumber>} - Current gas price
 */
async function getChainGasPrice(chainId) {
  // In real tests, this would use RPC for the specific chain
  return ethers.provider.getGasPrice();
}

module.exports = {
  simulateCrossChainMessage,
  getChainGasPrice
};
`,
};

class ComposableTestGenerator {
  constructor(config = {}) {
    this.config = {
      outputDir: config.outputDir || './test/cross-chain',
      helpersDir: config.helpersDir || './test/helpers',
      templateData: config.templateData || {},
      ...config,
    };
  }

  /**
   * Generate test files for cross-chain application
   * @param {Object} appConfig - Application configuration
   * @returns {Object} - Generated file paths
   */
  generateTests(appConfig) {
    console.log(`Generating cross-chain tests for ${appConfig.name}`);

    // Create output directories
    fs.ensureDirSync(this.config.outputDir);
    fs.ensureDirSync(this.config.helpersDir);

    // Generate helper files
    this.generateHelpers();

    // Prepare application-specific template data
    const templateData = {
      ...this.config.templateData,
      ...appConfig,
      appName: appConfig.name,
    };

    // Generate test files for each category
    const generatedFiles = {
      helpers: [],
      tests: [],
    };

    for (const [category, templateContent] of Object.entries(TEST_TEMPLATES)) {
      const fileName = `${appConfig.name.toLowerCase().replace(/\s+/g, '-')}-${category}.test.js`;
      const filePath = path.join(this.config.outputDir, fileName);

      try {
        // Compile template with data
        const compiledTemplate = template(templateContent);
        const fileContent = compiledTemplate(templateData);

        // Write to file
        fs.writeFileSync(filePath, fileContent);
        console.log(`Generated test file: ${filePath}`);

        generatedFiles.tests.push(filePath);
      } catch (error) {
        console.error(`Error generating test file ${fileName}: ${error.message}`);
      }
    }

    return generatedFiles;
  }

  /**
   * Generate helper files for cross-chain tests
   * @returns {Array} - Generated helper file paths
   */
  generateHelpers() {
    const generatedHelpers = [];

    for (const [helperName, helperContent] of Object.entries(HELPER_TEMPLATES)) {
      const filePath = path.join(this.config.helpersDir, helperName);

      try {
        // Check if helper already exists
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, helperContent);
          console.log(`Generated helper file: ${filePath}`);
        } else {
          console.log(`Helper file already exists: ${filePath}`);
        }

        generatedHelpers.push(filePath);
      } catch (error) {
        console.error(`Error generating helper file ${helperName}: ${error.message}`);
      }
    }

    return generatedHelpers;
  }

  /**
   * Generate specialized tests for a particular bridge
   * @param {Object} bridgeConfig - Bridge configuration
   * @returns {Object} - Generated file paths
   */
  generateBridgeTests(bridgeConfig) {
    console.log(`Generating tests for bridge ${bridgeConfig.name}`);

    // Create output directories
    fs.ensureDirSync(this.config.outputDir);

    // Prepare bridge-specific template data
    const templateData = {
      ...this.config.templateData,
      ...bridgeConfig,
      appName: bridgeConfig.name,
      sourceContractName: bridgeConfig.sourceBridgeName || 'Bridge',
      sourceContractAddress: bridgeConfig.sourceBridgeAddress,
      targetContractName: bridgeConfig.targetBridgeName || 'Bridge',
      targetContractAddress: bridgeConfig.targetBridgeAddress,
      sourceChainId: bridgeConfig.sourceChain,
      targetChainId: bridgeConfig.targetChain,
    };

    // Generate asset transfer tests by default for bridges
    const fileName = `${bridgeConfig.name.toLowerCase().replace(/\s+/g, '-')}-bridge.test.js`;
    const filePath = path.join(this.config.outputDir, fileName);

    try {
      // Compile template with data
      const compiledTemplate = template(TEST_TEMPLATES[TEST_CATEGORIES.ASSETS]);
      const fileContent = compiledTemplate(templateData);

      // Write to file
      fs.writeFileSync(filePath, fileContent);
      console.log(`Generated bridge test file: ${filePath}`);

      return { tests: [filePath] };
    } catch (error) {
      console.error(`Error generating bridge test file ${fileName}: ${error.message}`);
      return { tests: [] };
    }
  }

  /**
   * Generate a customized test using a specific template
   * @param {string} category - Test category
   * @param {Object} customData - Custom template data
   * @returns {string} - Generated test content
   */
  generateCustomTest(category, customData) {
    // Get template for category
    const templateContent = TEST_TEMPLATES[category];
    if (!templateContent) {
      throw new Error(`No template found for category ${category}`);
    }

    // Compile template with custom data
    const compiledTemplate = template(templateContent);
    return compiledTemplate({
      ...this.config.templateData,
      ...customData,
    });
  }
}

module.exports = ComposableTestGenerator;
