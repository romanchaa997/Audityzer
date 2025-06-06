/**
 * Transaction Pattern Collector
 *
 * Collects and analyzes transaction patterns from blockchain data
 * to identify potential security vulnerabilities and patterns.
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

// Default configuration
let config = {
  dataStoragePath: null,
  patternStoragePath: null,
  networkConfigurations: {
    ethereum: {
      enabled: true,
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
      batchSize: 100,
      maxTransactions: 10000,
    },
    polygon: {
      enabled: true,
      rpcUrl: 'https://polygon-rpc.com',
      batchSize: 100,
      maxTransactions: 10000,
    },
    optimism: {
      enabled: false,
      rpcUrl: 'https://mainnet.optimism.io',
      batchSize: 100,
      maxTransactions: 5000,
    },
    arbitrum: {
      enabled: false,
      rpcUrl: 'https://arb1.arbitrum.io/rpc',
      batchSize: 100,
      maxTransactions: 5000,
    },
  },
  vulnerabilityPatterns: [
    {
      name: 'high-value-transfer',
      description: 'Transactions with unusually high value transfers',
      detector: 'valueThresholdDetector',
      params: {
        thresholdEth: 10,
      },
      category: 'front-running',
      severity: 'medium',
    },
    {
      name: 'flash-loan-pattern',
      description: 'Flash loan patterns that might indicate potential attacks',
      detector: 'flashLoanDetector',
      params: {
        knownFlashLoanAddresses: [
          '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9', // Aave
          '0x398ec7346dcd622edc5ae82352f02be94c62d119', // dYdX
        ],
      },
      category: 'flash-loan-attack',
      severity: 'high',
    },
    {
      name: 'multiple-swaps',
      description: 'Multiple rapid swaps that might indicate arbitrage or manipulation',
      detector: 'multiSwapDetector',
      params: {
        minSwapCount: 3,
        timeWindowSeconds: 60,
      },
      category: 'market-manipulation',
      severity: 'medium',
    },
    {
      name: 'gas-price-anomaly',
      description: 'Transactions with unusually high gas prices',
      detector: 'gasPriceDetector',
      params: {
        percentileThreshold: 95,
      },
      category: 'front-running',
      severity: 'medium',
    },
    {
      name: 'contract-self-destruction',
      description: 'Contract self-destruct patterns',
      detector: 'selfDestructDetector',
      params: {},
      category: 'access-control',
      severity: 'critical',
    },
  ],
};

// Track initialization state
let initialized = false;

/**
 * Initialize the transaction pattern collector
 * @param {Object} userConfig - Configuration options
 * @returns {Promise<boolean>} Success status
 */
async function initialize(userConfig = {}) {
  try {
    // Update configuration with user settings
    config = {
      ...config,
      ...userConfig,
      patternStoragePath:
        userConfig.patternStoragePath ||
        path.join(userConfig.dataStoragePath || '', 'transaction-patterns'),
    };

    // Ensure required directories exist
    await fs.ensureDir(config.patternStoragePath);
    await fs.ensureDir(path.join(config.patternStoragePath, 'raw'));
    await fs.ensureDir(path.join(config.patternStoragePath, 'processed'));
    await fs.ensureDir(path.join(config.patternStoragePath, 'detected-patterns'));

    // Merge network configurations if provided
    if (userConfig.networkConfigurations) {
      for (const [network, networkConfig] of Object.entries(userConfig.networkConfigurations)) {
        if (config.networkConfigurations[network]) {
          config.networkConfigurations[network] = {
            ...config.networkConfigurations[network],
            ...networkConfig,
          };
        } else {
          config.networkConfigurations[network] = networkConfig;
        }
      }
    }

    // Merge vulnerability patterns if provided
    if (userConfig.vulnerabilityPatterns) {
      config.vulnerabilityPatterns = [
        ...config.vulnerabilityPatterns,
        ...userConfig.vulnerabilityPatterns.filter(
          pattern => !config.vulnerabilityPatterns.some(p => p.name === pattern.name)
        ),
      ];
    }

    initialized = true;
    return true;
  } catch (error) {
    console.error('Failed to initialize transaction pattern collector:', error);
    return false;
  }
}

/**
 * Collect transaction patterns from blockchain networks
 * @param {Object} options - Collection options
 * @returns {Promise<Object>} Collection results
 */
async function collectPatterns(options = {}) {
  if (!initialized) {
    throw new Error('Transaction pattern collector has not been initialized');
  }

  const collectionId = `tx-patterns-${crypto.randomBytes(4).toString('hex')}`;
  const timestamp = new Date().toISOString();

  const networks =
    options.networks ||
    Object.keys(config.networkConfigurations).filter(
      net => config.networkConfigurations[net].enabled
    );

  const results = {
    collectionId,
    timestamp,
    networks: [],
    count: 0,
    items: [],
    vulnerabilitiesByCategory: {},
    vulnerabilitiesBySeverity: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      info: 0,
    },
  };

  try {
    for (const network of networks) {
      const networkConfig = config.networkConfigurations[network];

      if (!networkConfig || !networkConfig.enabled) {
        console.log(`Skipping disabled network: ${network}`);
        continue;
      }

      console.log(`Collecting transaction patterns from ${network}...`);

      // In a real implementation, this would connect to the blockchain RPC
      // For now, we simulate the collection with generated data
      const networkPatterns = await simulatePatternCollection(network, networkConfig);

      // Save raw transaction data
      const rawDataPath = path.join(
        config.patternStoragePath,
        'raw',
        `${network}-${timestamp}.json`
      );
      await fs.writeJson(
        rawDataPath,
        {
          network,
          timestamp,
          transactionCount: networkPatterns.transactionCount,
          blockRange: networkPatterns.blockRange,
          transactions: networkPatterns.transactions,
        },
        { spaces: 2 }
      );

      // Process patterns and detect vulnerabilities
      const detectedPatterns = detectVulnerabilityPatterns(networkPatterns.transactions);

      // Save processed pattern data
      const processedDataPath = path.join(
        config.patternStoragePath,
        'detected-patterns',
        `${network}-${timestamp}.json`
      );

      await fs.writeJson(
        processedDataPath,
        {
          network,
          timestamp,
          patternCount: detectedPatterns.count,
          patterns: detectedPatterns.items,
        },
        { spaces: 2 }
      );

      // Update results
      results.networks.push({
        name: network,
        transactionCount: networkPatterns.transactionCount,
        patternCount: detectedPatterns.count,
        blockRange: networkPatterns.blockRange,
      });

      results.count += detectedPatterns.count;
      results.items.push(...detectedPatterns.items);

      // Update category and severity counts
      detectedPatterns.items.forEach(pattern => {
        // Update by category
        if (!results.vulnerabilitiesByCategory[pattern.category]) {
          results.vulnerabilitiesByCategory[pattern.category] = 0;
        }
        results.vulnerabilitiesByCategory[pattern.category]++;

        // Update by severity
        if (pattern.severity) {
          results.vulnerabilitiesBySeverity[pattern.severity]++;
        }
      });
    }

    // Save overall collection results
    const collectionResultsPath = path.join(
      config.patternStoragePath,
      'collection-results',
      `${collectionId}.json`
    );

    await fs.ensureDir(path.dirname(collectionResultsPath));
    await fs.writeJson(collectionResultsPath, results, { spaces: 2 });

    return results;
  } catch (error) {
    console.error('Error collecting transaction patterns:', error);
    return {
      ...results,
      status: 'error',
      error: error.message,
    };
  }
}

/**
 * Simulate transaction pattern collection (for development without blockchain connection)
 * @param {string} network - Blockchain network name
 * @param {Object} networkConfig - Network configuration
 * @returns {Promise<Object>} Simulated collection data
 */
async function simulatePatternCollection(network, networkConfig) {
  // This function simulates blockchain data collection
  // In a real implementation, this would connect to an RPC node

  const transactionCount = Math.min(
    networkConfig.maxTransactions,
    Math.floor(Math.random() * 1000) + 500
  );

  const latestBlock = 10000000 + Math.floor(Math.random() * 1000000);
  const blockRange = {
    startBlock: latestBlock - 1000,
    endBlock: latestBlock,
  };

  // Generate simulated transactions
  const transactions = [];
  const addresses = generateRandomAddresses(50);
  const contractAddresses = addresses.slice(0, 20);

  for (let i = 0; i < transactionCount; i++) {
    const isContractInteraction = Math.random() > 0.3;
    const txType = selectRandomTxType();

    const tx = {
      hash: `0x${crypto.randomBytes(32).toString('hex')}`,
      blockNumber: blockRange.startBlock + Math.floor(Math.random() * 1000),
      from: addresses[Math.floor(Math.random() * addresses.length)],
      to: isContractInteraction
        ? contractAddresses[Math.floor(Math.random() * contractAddresses.length)]
        : addresses[Math.floor(Math.random() * addresses.length)],
      value: generateRandomValue(),
      gasPrice: generateRandomGasPrice(),
      gasUsed: Math.floor(Math.random() * 3000000) + 21000,
      timestamp: Date.now() - Math.floor(Math.random() * 86400000),
      success: Math.random() > 0.1,
      type: txType,
      methodName: isContractInteraction ? generateMethodName(txType) : null,
      methodArgs: isContractInteraction ? generateMethodArgs(txType) : null,
    };

    transactions.push(tx);
  }

  // Sort by timestamp
  transactions.sort((a, b) => a.timestamp - b.timestamp);

  return {
    network,
    transactionCount,
    blockRange,
    transactions,
  };
}

/**
 * Generate random Ethereum addresses for simulation
 * @param {number} count - Number of addresses to generate
 * @returns {Array<string>} Generated addresses
 */
function generateRandomAddresses(count) {
  const addresses = [];
  for (let i = 0; i < count; i++) {
    addresses.push(`0x${crypto.randomBytes(20).toString('hex')}`);
  }
  return addresses;
}

/**
 * Generate random transaction value in wei
 * @returns {string} Random transaction value
 */
function generateRandomValue() {
  // 90% of transactions have low value
  if (Math.random() < 0.9) {
    return (Math.random() * 1e18).toString(); // 0-1 ETH
  } else {
    // 10% high value transactions
    return (Math.random() * 1e20 + 1e19).toString(); // 10-110 ETH
  }
}

/**
 * Generate random gas price
 * @returns {string} Random gas price in wei
 */
function generateRandomGasPrice() {
  // Normal distribution of gas prices
  if (Math.random() < 0.95) {
    return (Math.random() * 50e9 + 1e9).toString(); // 1-51 gwei
  } else {
    // 5% have very high gas price (potential front-running)
    return (Math.random() * 500e9 + 100e9).toString(); // 100-600 gwei
  }
}

/**
 * Select random transaction type for simulation
 * @returns {string} Transaction type
 */
function selectRandomTxType() {
  const types = [
    'transfer',
    'swap',
    'liquidity',
    'flashLoan',
    'mint',
    'governance',
    'borrow',
    'repay',
    'stake',
    'unstake',
  ];

  // Flash loans and swaps are less common
  const weights = [
    0.3, // transfer
    0.15, // swap
    0.1, // liquidity
    0.05, // flashLoan
    0.1, // mint
    0.05, // governance
    0.08, // borrow
    0.07, // repay
    0.05, // stake
    0.05, // unstake
  ];

  // Weighted random selection
  const rand = Math.random();
  let cumulativeWeight = 0;

  for (let i = 0; i < types.length; i++) {
    cumulativeWeight += weights[i];
    if (rand < cumulativeWeight) {
      return types[i];
    }
  }

  return types[0]; // Fallback
}

/**
 * Generate method name based on transaction type
 * @param {string} txType - Transaction type
 * @returns {string} Method name
 */
function generateMethodName(txType) {
  const methodNames = {
    transfer: ['transfer', 'transferFrom', 'send'],
    swap: ['swapExactTokensForTokens', 'swapTokensForExactTokens', 'swap'],
    liquidity: ['addLiquidity', 'removeLiquidity', 'join', 'exit'],
    flashLoan: ['flashLoan', 'flash', 'flashBorrow'],
    mint: ['mint', 'create'],
    governance: ['vote', 'propose', 'castVote'],
    borrow: ['borrow', 'borrowFrom'],
    repay: ['repay', 'repayBorrow'],
    stake: ['stake', 'deposit'],
    unstake: ['unstake', 'withdraw'],
  };

  const names = methodNames[txType] || ['fallback'];
  return names[Math.floor(Math.random() * names.length)];
}

/**
 * Generate method arguments based on transaction type
 * @param {string} txType - Transaction type
 * @returns {Object} Method arguments
 */
function generateMethodArgs(txType) {
  // Simplified simulation of method args
  const args = {
    recipient: `0x${crypto.randomBytes(20).toString('hex')}`,
    amount: (Math.random() * 1e18).toString(),
  };

  switch (txType) {
    case 'swap':
      args.amountIn = (Math.random() * 1e18).toString();
      args.amountOutMin = (Math.random() * 1e18 * 0.95).toString();
      args.path = [
        `0x${crypto.randomBytes(20).toString('hex')}`,
        `0x${crypto.randomBytes(20).toString('hex')}`,
      ];
      args.deadline = (Date.now() + 3600000).toString();
      break;

    case 'flashLoan':
      args.assets = [`0x${crypto.randomBytes(20).toString('hex')}`];
      args.amounts = [(Math.random() * 1e22).toString()];
      args.modes = [0];
      break;

    case 'liquidity':
      args.tokenA = `0x${crypto.randomBytes(20).toString('hex')}`;
      args.tokenB = `0x${crypto.randomBytes(20).toString('hex')}`;
      args.amountA = (Math.random() * 1e18).toString();
      args.amountB = (Math.random() * 1e18).toString();
      break;
  }

  return args;
}

/**
 * Detect vulnerability patterns in transaction data
 * @param {Array} transactions - Transaction data
 * @returns {Object} Detected patterns
 */
function detectVulnerabilityPatterns(transactions) {
  const patterns = [];

  // Detect patterns using configured pattern detectors
  for (const patternDef of config.vulnerabilityPatterns) {
    try {
      const detectorFn = patternDetectors[patternDef.detector];

      if (!detectorFn) {
        console.warn(`Pattern detector ${patternDef.detector} not found, skipping`);
        continue;
      }

      const detected = detectorFn(transactions, patternDef.params);

      // Format detected patterns with metadata
      const formattedPatterns = detected.map(item => ({
        id: `pattern-${crypto.randomBytes(4).toString('hex')}`,
        name: patternDef.name,
        description: patternDef.description,
        category: patternDef.category,
        severity: patternDef.severity,
        detectedAt: new Date().toISOString(),
        data: item,
      }));

      patterns.push(...formattedPatterns);
    } catch (error) {
      console.error(`Error detecting pattern ${patternDef.name}:`, error);
    }
  }

  return {
    count: patterns.length,
    items: patterns,
  };
}

/**
 * Pattern detector implementations
 */
const patternDetectors = {
  /**
   * Detect transactions with values above a threshold
   * @param {Array} transactions - Transaction data
   * @param {Object} params - Detector parameters
   * @returns {Array} Detected patterns
   */
  valueThresholdDetector: (transactions, params) => {
    const thresholdWei = params.thresholdEth * 1e18;
    return transactions
      .filter(tx => BigInt(tx.value) > BigInt(thresholdWei))
      .map(tx => ({
        transaction: tx.hash,
        value: tx.value,
        from: tx.from,
        to: tx.to,
        timestamp: tx.timestamp,
        valueInEth: (BigInt(tx.value) / BigInt(1e18)).toString(),
      }));
  },

  /**
   * Detect flash loan patterns
   * @param {Array} transactions - Transaction data
   * @param {Object} params - Detector parameters
   * @returns {Array} Detected patterns
   */
  flashLoanDetector: (transactions, params) => {
    const patterns = [];
    const knownFlashLoanAddresses = new Set(
      params.knownFlashLoanAddresses.map(a => a.toLowerCase())
    );

    // Find flash loan transactions
    const flashLoanTxs = transactions.filter(
      tx =>
        tx.type === 'flashLoan' ||
        (tx.methodName && tx.methodName.toLowerCase().includes('flash')) ||
        (tx.to && knownFlashLoanAddresses.has(tx.to.toLowerCase()))
    );

    // Group by sender address to find patterns
    const txsByAddress = {};
    flashLoanTxs.forEach(tx => {
      if (!txsByAddress[tx.from]) {
        txsByAddress[tx.from] = [];
      }
      txsByAddress[tx.from].push(tx);
    });

    // Look for addresses with multiple flash loans
    for (const [address, txs] of Object.entries(txsByAddress)) {
      if (txs.length > 1) {
        patterns.push({
          address,
          transactionCount: txs.length,
          transactions: txs.map(tx => tx.hash),
          timestamps: txs.map(tx => tx.timestamp),
          totalBorrowed: txs
            .reduce((sum, tx) => {
              const amount = tx.methodArgs?.amounts?.[0] || '0';
              return BigInt(sum) + BigInt(amount);
            }, BigInt(0))
            .toString(),
        });
      }
    }

    return patterns;
  },

  /**
   * Detect multiple rapid swap patterns
   * @param {Array} transactions - Transaction data
   * @param {Object} params - Detector parameters
   * @returns {Array} Detected patterns
   */
  multiSwapDetector: (transactions, params) => {
    const patterns = [];
    const minSwapCount = params.minSwapCount || 3;
    const timeWindowMs = (params.timeWindowSeconds || 60) * 1000;

    // Sort transactions by timestamp
    const sortedTxs = [...transactions].sort((a, b) => a.timestamp - b.timestamp);

    // Find swap transactions
    const swapTxs = sortedTxs.filter(
      tx => tx.type === 'swap' || (tx.methodName && tx.methodName.toLowerCase().includes('swap'))
    );

    // Group by sender address
    const txsByAddress = {};
    swapTxs.forEach(tx => {
      if (!txsByAddress[tx.from]) {
        txsByAddress[tx.from] = [];
      }
      txsByAddress[tx.from].push(tx);
    });

    // Look for rapid sequences of swaps
    for (const [address, txs] of Object.entries(txsByAddress)) {
      // Need at least minimum number of swaps to consider
      if (txs.length < minSwapCount) continue;

      for (let i = 0; i <= txs.length - minSwapCount; i++) {
        const window = txs.slice(i, i + minSwapCount);
        const windowStart = window[0].timestamp;
        const windowEnd = window[window.length - 1].timestamp;

        if (windowEnd - windowStart <= timeWindowMs) {
          patterns.push({
            address,
            transactionCount: window.length,
            transactions: window.map(tx => tx.hash),
            timestamps: window.map(tx => tx.timestamp),
            timeWindowMs: windowEnd - windowStart,
            averageTimeBetweenTxsMs: (windowEnd - windowStart) / (window.length - 1),
          });

          // Skip ahead to avoid overlapping patterns
          i += minSwapCount - 1;
        }
      }
    }

    return patterns;
  },

  /**
   * Detect gas price anomalies
   * @param {Array} transactions - Transaction data
   * @param {Object} params - Detector parameters
   * @returns {Array} Detected patterns
   */
  gasPriceDetector: (transactions, params) => {
    const percentileThreshold = params.percentileThreshold || 95;

    // Extract all gas prices
    const gasPrices = transactions
      .map(tx => BigInt(tx.gasPrice))
      .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));

    if (gasPrices.length === 0) return [];

    // Calculate percentile threshold
    const thresholdIndex = Math.floor((gasPrices.length * percentileThreshold) / 100);
    const thresholdGasPrice = gasPrices[thresholdIndex];

    // Find transactions above threshold
    return transactions
      .filter(tx => BigInt(tx.gasPrice) >= thresholdGasPrice)
      .map(tx => ({
        transaction: tx.hash,
        gasPrice: tx.gasPrice,
        from: tx.from,
        to: tx.to,
        timestamp: tx.timestamp,
        gasPriceGwei: (BigInt(tx.gasPrice) / BigInt(1e9)).toString(),
        percentileRank: percentileThreshold,
      }));
  },

  /**
   * Detect self-destruct patterns
   * @param {Array} transactions - Transaction data
   * @param {Object} params - Detector parameters
   * @returns {Array} Detected patterns
   */
  selfDestructDetector: (transactions, params) => {
    // In a real implementation, this would analyze contract interactions
    // For simulation, we'll just randomly flag some contract interactions

    const contractInteractions = transactions.filter(tx => tx.methodName && tx.success);

    // Randomly select a small percentage as potential self-destruct
    return contractInteractions
      .filter(() => Math.random() < 0.02) // 2% chance
      .map(tx => ({
        transaction: tx.hash,
        contract: tx.to,
        from: tx.from,
        timestamp: tx.timestamp,
        methodName: tx.methodName,
        confidence: 'medium',
        notes: 'Potential self-destruct or contract destruction pattern',
      }));
  },
};

module.exports = {
  initialize,
  collectPatterns,
};
