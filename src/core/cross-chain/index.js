/**
 * Cross-Chain Testing Framework
 *
 * This module provides testing capabilities for L2 networks and cross-chain transactions,
 * supporting emerging L2 solutions like zkSync Era, Linea, Base, and Polygon zkEVM.
 */

const fs = require('fs');
const path = require('path');
const ethers = require('ethers');

// Import validators
const ZkSyncValidator = require('./zksync-validator');
const LineaValidator = require('./linea-validator');
const BaseValidator = require('./base-validator');
const PolygonZkEVMValidator = require('./polygon-zkevm-validator');
const OptimismValidator = require('./optimism-validator');
const ArbitrumValidator = require('./arbitrum-validator');
const MessageTracer = require('./message-tracer');
const ComposableTestGenerator = require('./composable-test-generator');
const OmnichainValidator = require('./omnichain-validator');
const BridgeTesting = require('./bridge-testing');

// Chain IDs for all supported networks
const CHAIN_IDS = {
  // Ethereum
  ETHEREUM: 1,
  GOERLI: 5,
  SEPOLIA: 11155111,

  // L2 Networks
  ARBITRUM: 42161,
  ARBITRUM_NOVA: 42170,
  ARBITRUM_GOERLI: 421613,

  OPTIMISM: 10,
  OPTIMISM_GOERLI: 420,

  POLYGON: 137,
  POLYGON_MUMBAI: 80001,

  // New L2 Networks
  ZKSYNC_ERA: 324,
  ZKSYNC_ERA_TESTNET: 280,

  LINEA: 59144,
  LINEA_TESTNET: 59140,

  BASE: 8453,
  BASE_TESTNET: 84531,

  POLYGON_ZKEVM: 1101,
  POLYGON_ZKEVM_TESTNET: 1442,
};

// L2 Network Configurations
const networks = {
  // zkSync Era
  zkSyncEra: {
    name: 'zkSync Era',
    chainId: CHAIN_IDS.ZKSYNC_ERA,
    rpcUrl: process.env.ZKSYNC_ERA_RPC_URL || 'https://mainnet.era.zksync.io',
    testnetRpcUrl: process.env.ZKSYNC_ERA_TESTNET_RPC_URL || 'https://testnet.era.zksync.dev',
    blockExplorer: 'https://explorer.zksync.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    bridgeUrl: 'https://bridge.zksync.io/',
    documentation: 'https://docs.zksync.io/',
    validatorLib: 'zksync-web3',
  },

  // Linea
  linea: {
    name: 'Linea',
    chainId: CHAIN_IDS.LINEA,
    rpcUrl: process.env.LINEA_RPC_URL || 'https://rpc.linea.build',
    testnetRpcUrl: process.env.LINEA_TESTNET_RPC_URL || 'https://rpc.goerli.linea.build',
    blockExplorer: 'https://explorer.linea.build',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    bridgeUrl: 'https://bridge.linea.build/',
    documentation: 'https://docs.linea.build/',
    validatorLib: 'ethers',
  },

  // Base
  base: {
    name: 'Base',
    chainId: CHAIN_IDS.BASE,
    rpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    testnetRpcUrl: process.env.BASE_TESTNET_RPC_URL || 'https://goerli.base.org',
    blockExplorer: 'https://basescan.org',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    bridgeUrl: 'https://bridge.base.org/',
    documentation: 'https://docs.base.org/',
    validatorLib: 'ethers',
  },

  // Polygon zkEVM
  polygonZkEvm: {
    name: 'Polygon zkEVM',
    chainId: CHAIN_IDS.POLYGON_ZKEVM,
    rpcUrl: process.env.POLYGON_ZKEVM_RPC_URL || 'https://zkevm-rpc.com',
    testnetRpcUrl: process.env.POLYGON_ZKEVM_TESTNET_RPC_URL || 'https://rpc.public.zkevm-test.net',
    blockExplorer: 'https://zkevm.polygonscan.com',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    bridgeUrl: 'https://bridge.zkevm-rpc.com',
    documentation: 'https://wiki.polygon.technology/docs/zkEVM/',
    validatorLib: 'ethers',
  },
};

/**
 * Create a provider for a specific L2 network
 * @param {string} network - Network identifier (zkSyncEra, linea, base, polygonZkEvm)
 * @param {boolean} useTestnet - Whether to use testnet instead of mainnet
 * @returns {Object} Provider object for the specified network
 */
function createProvider(network, useTestnet = true) {
  if (!networks[network]) {
    throw new Error(`Unsupported network: ${network}`);
  }

  const networkConfig = networks[network];
  const rpcUrl = useTestnet ? networkConfig.testnetRpcUrl : networkConfig.rpcUrl;

  // Load appropriate library based on network
  if (network === 'zkSyncEra') {
    try {
      const { Provider } = require('zksync-web3');
      return new Provider(rpcUrl);
    } catch (error) {
      console.warn('zksync-web3 not installed, falling back to ethers provider');
      return new ethers.providers.JsonRpcProvider(rpcUrl);
    }
  } else {
    return new ethers.providers.JsonRpcProvider(rpcUrl);
  }
}

/**
 * Create a wallet for a specific L2 network
 * @param {string} network - Network identifier
 * @param {string} privateKey - Private key to use (or create random if not provided)
 * @param {boolean} useTestnet - Whether to use testnet instead of mainnet
 * @returns {Object} Wallet object for the specified network
 */
function createWallet(network, privateKey, useTestnet = true) {
  if (!networks[network]) {
    throw new Error(`Unsupported network: ${network}`);
  }

  const provider = createProvider(network, useTestnet);

  // Create or use private key
  const wallet = privateKey
    ? new ethers.Wallet(privateKey, provider)
    : ethers.Wallet.createRandom().connect(provider);

  // Special handling for zkSync Era
  if (network === 'zkSyncEra') {
    try {
      const { Wallet } = require('zksync-web3');
      return new Wallet(wallet.privateKey, provider);
    } catch (error) {
      console.warn('zksync-web3 not installed, using ethers wallet');
      return wallet;
    }
  }

  return wallet;
}

/**
 * Check if an L2 network is properly configured
 * @param {string} network - Network identifier
 * @returns {Promise<Object>} Network status information
 */
async function checkNetworkStatus(network) {
  if (!networks[network]) {
    throw new Error(`Unsupported network: ${network}`);
  }

  try {
    const provider = createProvider(network, true);
    const networkInfo = await provider.getNetwork();
    const blockNumber = await provider.getBlockNumber();
    const gasPrice = await provider.getGasPrice();

    return {
      success: true,
      name: networks[network].name,
      chainId: networkInfo.chainId,
      currentBlock: blockNumber,
      gasPrice: ethers.utils.formatUnits(gasPrice, 'gwei') + ' gwei',
      isConnected: true,
    };
  } catch (error) {
    return {
      success: false,
      name: networks[network].name,
      error: error.message,
      isConnected: false,
    };
  }
}

/**
 * Execute a test transaction on an L2 network
 * @param {string} network - Network identifier
 * @param {Object} options - Transaction options
 * @returns {Promise<Object>} Transaction result
 */
async function executeTestTransaction(network, options = {}) {
  if (!networks[network]) {
    throw new Error(`Unsupported network: ${network}`);
  }

  try {
    const { privateKey, recipient, amount, data, gasLimit } = options;
    const useTestnet = options.useTestnet !== false;

    const wallet = createWallet(network, privateKey, useTestnet);
    const provider = wallet.provider;

    // Get current gas price
    const gasPrice = options.gasPrice || (await provider.getGasPrice());

    // Get current nonce
    const nonce = options.nonce || (await provider.getTransactionCount(wallet.address));

    // Create transaction
    const tx = {
      to: recipient || ethers.Wallet.createRandom().address,
      value: ethers.utils.parseEther(amount?.toString() || '0.0001'),
      gasPrice,
      nonce,
      data: data || '0x',
      chainId: networks[network].chainId,
    };

    if (gasLimit) {
      tx.gasLimit = gasLimit;
    }

    // Sign and send transaction
    const signedTx = await wallet.signTransaction(tx);
    const txResponse = await provider.sendTransaction(signedTx);
    const receipt = await txResponse.wait();

    return {
      success: true,
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      effectiveGasPrice: receipt.effectiveGasPrice.toString(),
      receipt,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Test cross-chain bridge functionality
 * @param {string} sourceNetwork - Source network identifier
 * @param {string} targetNetwork - Target network identifier
 * @param {Object} options - Bridge test options
 * @returns {Promise<Object>} Bridge test result
 */
async function testBridgeTransaction(sourceNetwork, targetNetwork, options = {}) {
  // This is a simulation of bridge testing since actual bridge transactions
  // require complex setup and are network-specific

  try {
    // Check both networks
    const sourceStatus = await checkNetworkStatus(sourceNetwork);
    const targetStatus = await checkNetworkStatus(targetNetwork);

    if (!sourceStatus.success || !targetStatus.success) {
      throw new Error('One or both networks are not available');
    }

    // Perform checks only, actual bridge would require different implementation
    return {
      success: true,
      source: {
        network: networks[sourceNetwork].name,
        chainId: networks[sourceNetwork].chainId,
        bridgeUrl: networks[sourceNetwork].bridgeUrl,
      },
      target: {
        network: networks[targetNetwork].name,
        chainId: networks[targetNetwork].chainId,
        bridgeUrl: networks[targetNetwork].bridgeUrl,
      },
      estimatedTime: '10-30 minutes',
      fee: '0.001 ETH (estimated)',
      message:
        'Bridge simulation completed. In a real implementation, this would initiate actual bridge transactions.',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Generate configuration for testing against L2 networks
 * @param {Array<string>} selectedNetworks - Array of network identifiers to include
 * @returns {Object} Test configuration for the selected networks
 */
function generateTestConfig(selectedNetworks = Object.keys(networks)) {
  const config = {};

  selectedNetworks.forEach(network => {
    if (networks[network]) {
      config[network] = {
        ...networks[network],
        testConfig: {
          testEnabled: true,
          maxGasPrice: '50', // gwei
          maxTransactionValue: '0.01', // ETH
          timeoutSeconds: 60,
          retries: 3,
        },
      };
    }
  });

  return config;
}

/**
 * Get a validator for a specific L2 network
 * @param {string} network - Network identifier (zkSyncEra, linea, base, polygonZkEvm)
 * @param {Object} config - Validator configuration
 * @returns {Object} Validator instance for the specified network
 */
function getValidator(network, config = {}) {
  if (!networks[network]) {
    throw new Error(`Unsupported network: ${network}`);
  }

  // Default to testnet for safety
  const useTestnet = config.useTestnet !== false;

  switch (network) {
    case 'zkSyncEra':
      return new ZkSyncValidator({
        ...config,
        useTestnet,
      });
    case 'linea':
      return new LineaValidator({
        ...config,
        useTestnet,
      });
    case 'base':
      return new BaseValidator({
        ...config,
        useTestnet,
      });
    case 'polygonZkEvm':
      return new PolygonZkEVMValidator({
        ...config,
        useTestnet,
      });
    default:
      throw new Error(`No validator available for network: ${network}`);
  }
}

// Export the module functionality
module.exports = {
  networks,
  CHAIN_IDS,
  createProvider,
  createWallet,
  checkNetworkStatus,
  executeTestTransaction,
  testBridgeTransaction,
  generateTestConfig,
  getValidator,
  // Export validators
  ZkSyncValidator,
  LineaValidator,
  BaseValidator,
  PolygonZkEVMValidator,
  OptimismValidator,
  ArbitrumValidator,
  MessageTracer,
  ComposableTestGenerator,
  OmnichainValidator,
  BridgeTesting,

  // High-level functions that combine multiple steps
  runNetworkHealthCheck: async function (selectedNetworks = Object.keys(networks)) {
    const results = {};

    for (const network of selectedNetworks) {
      if (networks[network]) {
        results[network] = await checkNetworkStatus(network);
      }
    }

    return results;
  },

  generateNetworkReport: async function (selectedNetworks = Object.keys(networks)) {
    const healthResults = await this.runNetworkHealthCheck(selectedNetworks);

    return {
      timestamp: new Date().toISOString(),
      networks: healthResults,
      summary: {
        total: selectedNetworks.length,
        available: Object.values(healthResults).filter(r => r.success).length,
        unavailable: Object.values(healthResults).filter(r => !r.success).length,
      },
    };
  },
};
