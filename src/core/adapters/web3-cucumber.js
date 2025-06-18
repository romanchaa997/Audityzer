/**
 * Web3Cucumber - BDD testing framework for Web3 applications
 * Enables behavior-driven development for blockchain applications with easy-to-read scenarios
 */

const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { ethers } = require('ethers');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Wallet and provider management
let currentWallet = null;
let provider = null;
let currentContract = null;
let txReceipt = null;
let messageSignature = null;
let currentErrorMessage = null;
let networks = {};
let contracts = {};

/**
 * Initialize Web3Cucumber with configuration
 */
function initialize(config) {
  // Set up networks configuration
  networks = config.networks || {
    mainnet: { url: 'https://mainnet.infura.io/v3/your-api-key', chainId: 1 },
    goerli: { url: 'https://goerli.infura.io/v3/your-api-key', chainId: 5 },
    localhost: { url: 'http://localhost:8545', chainId: 31337 },
  };

  // Set up contracts
  contracts = config.contracts || {};

  // Register steps
  registerSteps();

  return {
    networks,
    contracts,
    currentWallet,
    provider,
  };
}

/**
 * Get a provider for the specified network
 */
function getProvider(networkName) {
  const network = networks[networkName];
  if (!network) {
    throw new Error(`Network "${networkName}" not configured`);
  }
  return new ethers.providers.JsonRpcProvider(network.url);
}

/**
 * Register all Cucumber step definitions
 */
function registerSteps() {
  // Background steps
  Before(async function () {
    // Reset state between scenarios
    currentWallet = null;
    provider = null;
    currentContract = null;
    txReceipt = null;
    messageSignature = null;
    currentErrorMessage = null;
  });

  // Wallet steps
  Given('I have a wallet with {string} private key', function (privateKeyEnvVar) {
    const privateKey = process.env[privateKeyEnvVar];
    if (!privateKey) {
      throw new Error(`Environment variable ${privateKeyEnvVar} not set`);
    }
    currentWallet = new ethers.Wallet(privateKey);
  });

  Given('I have a test wallet with {float} ETH', async function (ethAmount) {
    // Create a random wallet for testing
    currentWallet = ethers.Wallet.createRandom();
    // console.log(`Created test wallet: ${currentWallet.address}`);

    // If we're on a test network, we could try to get ETH from a faucet
    // For now, just log that this would need to be funded
    // console.log(`Note: Wallet needs to be funded with ${ethAmount} ETH`);
  });

  // Network connections
  Given('I connect to the {string} network', async function (networkName) {
    provider = getProvider(networkName);

    if (currentWallet) {
      currentWallet = currentWallet.connect(provider);
    }

    // Verify connection
    try {
      await provider.getBlockNumber();
    } catch (error) {
      throw new Error(`Failed to connect to ${networkName}: ${error.message}`);
    }
  });

  // Contract interactions
  Given('I have the {string} contract at address {string}', async function (contractName, address) {
    if (!provider) {
      throw new Error('Provider not initialized. Connect to a network first.');
    }

    const contractDef = contracts[contractName];
    if (!contractDef) {
      throw new Error(`Contract "${contractName}" not found in configuration`);
    }

    // Connect to the contract
    currentContract = new ethers.Contract(address, contractDef.abi, currentWallet || provider);

    // Verify contract connection
    try {
      // Try to call a read method if available to verify connection
      const fragments = currentContract.interface.fragments.filter(
        f => f.type === 'function' && (f.stateMutability === 'view' || f.stateMutability === 'pure')
      );

      if (fragments.length > 0) {
        const method = fragments[0].name;
        await currentContract[method]();
      }
    } catch (error) {
      // console.log(`Warning: Could not verify contract connection: ${error.message}`);
    }
  });

  When('I call {string} with {string}', async function (method, argsJson) {
    if (!currentContract) {
      throw new Error('Contract not initialized');
    }

    try {
      const args = JSON.parse(argsJson);
      const result = await currentContract[method](...args);

      if (result.wait && typeof result.wait === 'function') {
        // This is a transaction
        txReceipt = await result.wait();
      } else {
        // This is a call result
        this.callResult = result;
      }
    } catch (error) {
      currentErrorMessage = error.message;
      throw error;
    }
  });

  // Transaction validation
  Then('the transaction should succeed', function () {
    assert.ok(txReceipt, 'No transaction receipt available');
    assert.strictEqual(txReceipt.status, 1, 'Transaction failed');
  });

  Then('the transaction should emit a {string} event', function (eventName) {
    assert.ok(txReceipt, 'No transaction receipt available');

    const event = txReceipt.events.find(e => e.event === eventName);
    assert.ok(event, `Event ${eventName} not found in transaction receipt`);
  });

  Then('the transaction should use less than {int} gas', function (gasLimit) {
    assert.ok(txReceipt, 'No transaction receipt available');
    assert.ok(
      txReceipt.gasUsed.toNumber() < gasLimit,
      `Gas used (${txReceipt.gasUsed.toNumber()}) exceeds limit (${gasLimit})`
    );
  });

  // Balance checking
  Then('the wallet balance should be at least {float} ETH', async function (minBalance) {
    if (!currentWallet) {
      throw new Error('Wallet not initialized');
    }

    const balance = await provider.getBalance(currentWallet.address);
    const balanceInEth = parseFloat(ethers.utils.formatEther(balance));

    assert.ok(
      balanceInEth >= minBalance,
      `Wallet balance (${balanceInEth} ETH) is less than required (${minBalance} ETH)`
    );
  });

  // Token interactions
  Given('I have an ERC20 token {string} at address {string}', async function (symbol, address) {
    if (!provider) {
      throw new Error('Provider not initialized. Connect to a network first.');
    }

    // ERC20 minimal ABI
    const abi = [
      'function balanceOf(address) view returns (uint256)',
      'function transfer(address to, uint256 amount) returns (bool)',
      'function approve(address spender, uint256 amount) returns (bool)',
      'function allowance(address owner, address spender) view returns (uint256)',
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
    ];

    currentContract = new ethers.Contract(address, abi, currentWallet || provider);

    // Verify it's an ERC20 token
    try {
      const tokenSymbol = await currentContract.symbol();
      assert.strictEqual(
        tokenSymbol.toLowerCase(),
        symbol.toLowerCase(),
        `Token symbol mismatch: expected ${symbol}, got ${tokenSymbol}`
      );
    } catch (error) {
      throw new Error(`Failed to verify ERC20 token: ${error.message}`);
    }
  });

  Then('I should have at least {float} {string} tokens', async function (minAmount, symbol) {
    if (!currentContract) {
      throw new Error('Token contract not initialized');
    }

    if (!currentWallet) {
      throw new Error('Wallet not initialized');
    }

    const decimals = await currentContract.decimals();
    const balance = await currentContract.balanceOf(currentWallet.address);
    const balanceInTokens = parseFloat(ethers.utils.formatUnits(balance, decimals));

    assert.ok(
      balanceInTokens >= minAmount,
      `Token balance (${balanceInTokens} ${symbol}) is less than required (${minAmount} ${symbol})`
    );
  });

  // Message signing
  When('I sign message {string}', async function (message) {
    if (!currentWallet) {
      throw new Error('Wallet not initialized');
    }

    try {
      messageSignature = await currentWallet.signMessage(message);
    } catch (error) {
      currentErrorMessage = error.message;
      throw error;
    }
  });

  Then('the signature should be valid for address {string}', function (address) {
    assert.ok(messageSignature, 'No message signature available');

    const recoveredAddress = ethers.utils.verifyMessage(this.message, messageSignature);
    assert.strictEqual(
      recoveredAddress.toLowerCase(),
      address.toLowerCase(),
      'Signature verification failed'
    );
  });

  // Error handling
  Then('I should get an error containing {string}', function (errorText) {
    assert.ok(currentErrorMessage, 'No error was thrown');

    assert.ok(
      currentErrorMessage.includes(errorText),
      `Error message "${currentErrorMessage}" does not contain "${errorText}"`
    );
  });

  // Blockchain state
  Then('the block number should be greater than {int}', async function (minBlockNumber) {
    if (!provider) {
      throw new Error('Provider not initialized');
    }

    const blockNumber = await provider.getBlockNumber();
    assert.ok(
      blockNumber > minBlockNumber,
      `Current block number (${blockNumber}) is not greater than ${minBlockNumber}`
    );
  });

  // Contract state validation
  Then('the result should equal {string}', function (expectedJson) {
    const expected = JSON.parse(expectedJson);

    // Handle BigNumber values
    const normalizeValue = value => {
      if (ethers.BigNumber.isBigNumber(value)) {
        return value.toString();
      } else if (Array.isArray(value)) {
        return value.map(normalizeValue);
      } else if (typeof value === 'object' && value !== null) {
        const result = {};
        for (const key in value) {
          result[key] = normalizeValue(value[key]);
        }
        return result;
      }
      return value;
    };

    const normalizedResult = normalizeValue(this.callResult);
    const normalizedExpected = normalizeValue(expected);

    assert.deepStrictEqual(
      normalizedResult,
      normalizedExpected,
      'Result does not match expected value'
    );
  });

  // Cleanup
  After(async function () {
    // Any cleanup needed
    currentWallet = null;
    provider = null;
    currentContract = null;
    txReceipt = null;
    messageSignature = null;
    currentErrorMessage = null;
  });
}

/**
 * Generate a feature file template for a given contract
 */
function generateFeatureFile(contractName, outputPath) {
  const contractDef = contracts[contractName];
  if (!contractDef) {
    throw new Error(`Contract "${contractName}" not found in configuration`);
  }

  const { abi } = contractDef;

  // Extract writable functions
  const writeFunctions = abi.filter(
    item =>
      item.type === 'function' &&
      !item.constant &&
      item.stateMutability !== 'view' &&
      item.stateMutability !== 'pure'
  );

  // Extract view functions
  const viewFunctions = abi.filter(
    item =>
      item.type === 'function' &&
      (item.constant || item.stateMutability === 'view' || item.stateMutability === 'pure')
  );

  // Generate feature file content
  let content = `Feature: ${contractName} Contract Testing\n\n`;

  content += '  Background:\n';
  content += '    Given I have a test wallet with 1.0 ETH\n';
  content += '    And I connect to the "localhost" network\n';
  content += `    And I have the "${contractName}" contract at address "CONTRACT_ADDRESS"\n\n`;

  // Generate scenarios for view functions
  for (const func of viewFunctions) {
    content += `  Scenario: Call ${func.name}\n`;

    // Generate parameter placeholders
    const paramList = func.inputs.map(input => `<${input.name || 'param'}>`).join(', ');
    const paramsJson = JSON.stringify(func.inputs.map(input => null));

    content += `    When I call "${func.name}" with '${paramsJson}'\n`;
    content += "    Then the result should equal 'EXPECTED_RESULT'\n\n";
  }

  // Generate scenarios for state-changing functions
  for (const func of writeFunctions) {
    content += `  Scenario: Execute ${func.name}\n`;

    // Generate parameter placeholders
    const paramList = func.inputs.map(input => `<${input.name || 'param'}>`).join(', ');
    const paramsJson = JSON.stringify(func.inputs.map(input => null));

    content += `    When I call "${func.name}" with '${paramsJson}'\n`;
    content += '    Then the transaction should succeed\n';
    content += '    And the transaction should use less than 200000 gas\n';

    if (func.name.startsWith('transfer') || func.name === 'mint' || func.name === 'burn') {
      content += '    And the transaction should emit a "Transfer" event\n';
    } else if (func.name.startsWith('approve')) {
      content += '    And the transaction should emit a "Approval" event\n';
    }

    content += '\n';
  }

  // Write the feature file to the specified path
  fs.writeFileSync(outputPath, content);

  return {
    path: outputPath,
    content,
  };
}

module.exports = {
  initialize,
  registerSteps,
  generateFeatureFile,
};
