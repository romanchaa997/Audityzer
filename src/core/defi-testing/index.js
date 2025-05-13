/**
 * DeFi Protocol Testing Module
 *
 * This module provides comprehensive testing utilities for various DeFi protocols,
 * including lending platforms, AMMs, and staking solutions.
 */

const fs = require('fs');
const path = require('path');

// Add a helper function to check for missing dependencies
const checkDependencies = () => {
  const missingDeps = [];

  try {
    require('ethers');
  } catch (error) {
    missingDeps.push('ethers');
  }

  return missingDeps;
};

// Attempt to load ethers
let ethers;
try {
  ethers = require('ethers');
} catch (error) {
  console.error('Error loading ethers module. Make sure it is installed.');
  console.error('Run: npm install ethers@5.7.2 --legacy-peer-deps');
  console.error('Original error:', error.message);
}

// Protocol-specific test adapters
const lendingProtocols = require('./lending-protocols');
const ammProtocols = require('./amm-protocols');
const stakingProtocols = require('./staking-protocols');

// Common protocol interfaces - ABIs for standard functions across protocols
const interfaces = {
  erc20: require('../common/abis/erc20.json'),
  lending: {
    supply: require('./abis/lending/supply.json'),
    borrow: require('./abis/lending/borrow.json'),
    repay: require('./abis/lending/repay.json'),
    withdraw: require('./abis/lending/withdraw.json'),
  },
  amm: {
    swap: require('./abis/amm/swap.json'),
    addLiquidity: require('./abis/amm/add-liquidity.json'),
    removeLiquidity: require('./abis/amm/remove-liquidity.json'),
  },
  staking: {
    stake: require('./abis/staking/stake.json'),
    unstake: require('./abis/staking/unstake.json'),
    claim: require('./abis/staking/claim.json'),
  },
};

/**
 * DeFi Protocol Test Framework
 * Main class for testing DeFi protocols
 */
class DeFiProtocolTester {
  /**
   * Create a new DeFi Protocol Tester
   * @param {Object} config - Tester configuration
   */
  constructor(config = {}) {
    // Check if ethers is available
    if (!ethers) {
      throw new Error(
        'The ethers library is required but could not be loaded. Please install it with: npm install ethers@5.7.2 --legacy-peer-deps'
      );
    }

    this.config = {
      provider: null,
      signer: null,
      networkId: 1, // Default to Ethereum mainnet
      gasPriceMultiplier: 1.1,
      maxGasLimit: 8000000,
      defaultProtocolTimeoutMs: 60000, // 1 minute
      outputDir: './test-results/defi',
      ...config,
    };

    // Initialize provider if not provided
    if (!this.config.provider) {
      if (this.config.rpcUrl) {
        this.config.provider = new ethers.providers.JsonRpcProvider(this.config.rpcUrl);
      } else {
        throw new Error('Either provider or rpcUrl must be provided in the configuration');
      }
    }

    // Initialize signer if not provided
    if (!this.config.signer) {
      if (this.config.privateKey) {
        this.config.signer = new ethers.Wallet(this.config.privateKey, this.config.provider);
      } else if (this.config.mnemonic) {
        this.config.signer = ethers.Wallet.fromMnemonic(this.config.mnemonic).connect(
          this.config.provider
        );
      }
      // If still no signer, tests will be read-only
    }

    // Initialize protocol adapters
    this.lendingAdapter = lendingProtocols.createAdapter(this.config);
    this.ammAdapter = ammProtocols.createAdapter(this.config);
    this.stakingAdapter = stakingProtocols.createAdapter(this.config);

    // Set up output directory
    if (!fs.existsSync(this.config.outputDir)) {
      fs.mkdirSync(this.config.outputDir, { recursive: true });
    }

    // Test results storage
    this.testResults = [];
  }

  /**
   * Run a test for a specific protocol
   * @param {string} protocolType - Protocol type (lending, amm, staking)
   * @param {string} protocolName - Protocol name (e.g., "Aave", "Uniswap")
   * @param {string} testName - Test name
   * @param {Function} testFunction - Async test function
   * @returns {Promise<Object>} - Test result
   */
  async runTest(protocolType, protocolName, testName, testFunction) {
    const startTime = Date.now();

    const testContext = {
      provider: this.config.provider,
      signer: this.config.signer,
      protocolType,
      protocolName,
      startTime,
      testName,
      interfaces,
    };

    let success = false;
    let error = null;
    let result = null;

    try {
      // Run the test function with context
      result = await testFunction(testContext);
      success = true;
    } catch (e) {
      error = {
        message: e.message,
        stack: e.stack,
      };
      success = false;
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Create and store test result
    const testResult = {
      protocolType,
      protocolName,
      testName,
      success,
      duration,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      error,
      result,
    };

    this.testResults.push(testResult);

    // Save result to file
    const resultFileName = `${protocolType}_${protocolName.toLowerCase()}_${testName.toLowerCase().replace(/\s+/g, '_')}.json`;
    const resultFilePath = path.join(this.config.outputDir, resultFileName);

    fs.writeFileSync(resultFilePath, JSON.stringify(testResult, null, 2));

    return testResult;
  }

  /**
   * Run a lending protocol test
   * @param {string} protocolName - Protocol name (e.g., "Aave", "Compound")
   * @param {string} testName - Test name
   * @param {Object} params - Test parameters
   * @returns {Promise<Object>} - Test result
   */
  async testLendingProtocol(protocolName, testName, params = {}) {
    const lendingTestMap = {
      supply: this.lendingAdapter.testSupply.bind(this.lendingAdapter),
      borrow: this.lendingAdapter.testBorrow.bind(this.lendingAdapter),
      repay: this.lendingAdapter.testRepay.bind(this.lendingAdapter),
      withdraw: this.lendingAdapter.testWithdraw.bind(this.lendingAdapter),
      liquidation_protection: this.lendingAdapter.testLiquidationProtection.bind(
        this.lendingAdapter
      ),
      interest_accrual: this.lendingAdapter.testInterestAccrual.bind(this.lendingAdapter),
      collateral_factor: this.lendingAdapter.testCollateralFactor.bind(this.lendingAdapter),
    };

    if (!lendingTestMap[testName]) {
      throw new Error(`Unknown lending protocol test: ${testName}`);
    }

    return this.runTest('lending', protocolName, testName, async context => {
      return await lendingTestMap[testName](context, params);
    });
  }

  /**
   * Run an AMM protocol test
   * @param {string} protocolName - Protocol name (e.g., "Uniswap", "SushiSwap")
   * @param {string} testName - Test name
   * @param {Object} params - Test parameters
   * @returns {Promise<Object>} - Test result
   */
  async testAmmProtocol(protocolName, testName, params = {}) {
    const ammTestMap = {
      swap: this.ammAdapter.testSwap.bind(this.ammAdapter),
      add_liquidity: this.ammAdapter.testAddLiquidity.bind(this.ammAdapter),
      remove_liquidity: this.ammAdapter.testRemoveLiquidity.bind(this.ammAdapter),
      price_impact: this.ammAdapter.testPriceImpact.bind(this.ammAdapter),
      slippage_protection: this.ammAdapter.testSlippageProtection.bind(this.ammAdapter),
      fee_calculation: this.ammAdapter.testFeeCalculation.bind(this.ammAdapter),
      concentrated_liquidity: this.ammAdapter.testConcentratedLiquidity.bind(this.ammAdapter),
    };

    if (!ammTestMap[testName]) {
      throw new Error(`Unknown AMM protocol test: ${testName}`);
    }

    return this.runTest('amm', protocolName, testName, async context => {
      return await ammTestMap[testName](context, params);
    });
  }

  /**
   * Run a staking protocol test
   * @param {string} protocolName - Protocol name (e.g., "Lido", "Rocket Pool")
   * @param {string} testName - Test name
   * @param {Object} params - Test parameters
   * @returns {Promise<Object>} - Test result
   */
  async testStakingProtocol(protocolName, testName, params = {}) {
    const stakingTestMap = {
      stake: this.stakingAdapter.testStake.bind(this.stakingAdapter),
      unstake: this.stakingAdapter.testUnstake.bind(this.stakingAdapter),
      claim_rewards: this.stakingAdapter.testClaimRewards.bind(this.stakingAdapter),
      cooldown_period: this.stakingAdapter.testCooldownPeriod.bind(this.stakingAdapter),
      reward_calculation: this.stakingAdapter.testRewardCalculation.bind(this.stakingAdapter),
    };

    if (!stakingTestMap[testName]) {
      throw new Error(`Unknown staking protocol test: ${testName}`);
    }

    return this.runTest('staking', protocolName, testName, async context => {
      return await stakingTestMap[testName](context, params);
    });
  }

  /**
   * Run comprehensive test suite for a lending protocol
   * @param {string} protocolName - Protocol name
   * @param {Object} params - Test parameters
   * @returns {Promise<Object>} - Test results
   */
  async runLendingTestSuite(protocolName, params = {}) {
    const results = {};

    // Basic operations
    results.supply = await this.testLendingProtocol(protocolName, 'supply', params);
    results.borrow = await this.testLendingProtocol(protocolName, 'borrow', params);
    results.repay = await this.testLendingProtocol(protocolName, 'repay', params);
    results.withdraw = await this.testLendingProtocol(protocolName, 'withdraw', params);

    // Advanced features
    if (params.runAdvancedTests) {
      results.liquidationProtection = await this.testLendingProtocol(
        protocolName,
        'liquidation_protection',
        params
      );
      results.interestAccrual = await this.testLendingProtocol(
        protocolName,
        'interest_accrual',
        params
      );
      results.collateralFactor = await this.testLendingProtocol(
        protocolName,
        'collateral_factor',
        params
      );
    }

    return {
      protocolType: 'lending',
      protocolName,
      tests: results,
      summary: this.summarizeResults(Object.values(results)),
    };
  }

  /**
   * Run comprehensive test suite for an AMM protocol
   * @param {string} protocolName - Protocol name
   * @param {Object} params - Test parameters
   * @returns {Promise<Object>} - Test results
   */
  async runAmmTestSuite(protocolName, params = {}) {
    const results = {};

    // Basic operations
    results.swap = await this.testAmmProtocol(protocolName, 'swap', params);
    results.addLiquidity = await this.testAmmProtocol(protocolName, 'add_liquidity', params);
    results.removeLiquidity = await this.testAmmProtocol(protocolName, 'remove_liquidity', params);

    // Advanced features
    if (params.runAdvancedTests) {
      results.priceImpact = await this.testAmmProtocol(protocolName, 'price_impact', params);
      results.slippageProtection = await this.testAmmProtocol(
        protocolName,
        'slippage_protection',
        params
      );
      results.feeCalculation = await this.testAmmProtocol(protocolName, 'fee_calculation', params);

      if (params.isUniswapV3Compatible) {
        results.concentratedLiquidity = await this.testAmmProtocol(
          protocolName,
          'concentrated_liquidity',
          params
        );
      }
    }

    return {
      protocolType: 'amm',
      protocolName,
      tests: results,
      summary: this.summarizeResults(Object.values(results)),
    };
  }

  /**
   * Run comprehensive test suite for a staking protocol
   * @param {string} protocolName - Protocol name
   * @param {Object} params - Test parameters
   * @returns {Promise<Object>} - Test results
   */
  async runStakingTestSuite(protocolName, params = {}) {
    const results = {};

    // Basic operations
    results.stake = await this.testStakingProtocol(protocolName, 'stake', params);
    results.unstake = await this.testStakingProtocol(protocolName, 'unstake', params);
    results.claimRewards = await this.testStakingProtocol(protocolName, 'claim_rewards', params);

    // Advanced features
    if (params.runAdvancedTests) {
      results.cooldownPeriod = await this.testStakingProtocol(
        protocolName,
        'cooldown_period',
        params
      );
      results.rewardCalculation = await this.testStakingProtocol(
        protocolName,
        'reward_calculation',
        params
      );
    }

    return {
      protocolType: 'staking',
      protocolName,
      tests: results,
      summary: this.summarizeResults(Object.values(results)),
    };
  }

  /**
   * Summarize test results
   * @param {Array<Object>} results - Array of test results
   * @returns {Object} - Summary statistics
   */
  summarizeResults(results) {
    const total = results.length;
    const passed = results.filter(r => r.success).length;
    const failed = total - passed;
    const successRate = total > 0 ? (passed / total) * 100 : 0;

    let totalDuration = 0;
    results.forEach(r => {
      totalDuration += r.duration;
    });

    return {
      total,
      passed,
      failed,
      successRate: `${successRate.toFixed(2)}%`,
      totalDuration,
      averageDuration: total > 0 ? totalDuration / total : 0,
    };
  }

  /**
   * Generate a comprehensive report of all test results
   * @returns {Object} - Test report
   */
  generateReport() {
    const reportFileName = `defi_test_report_${new Date().toISOString().replace(/:/g, '-')}.json`;
    const reportFilePath = path.join(this.config.outputDir, reportFileName);

    // Summarize by protocol type
    const protocolTypes = [...new Set(this.testResults.map(r => r.protocolType))];
    const protocolSummaries = {};

    protocolTypes.forEach(type => {
      const resultsForType = this.testResults.filter(r => r.protocolType === type);
      protocolSummaries[type] = this.summarizeResults(resultsForType);

      // Add protocol-specific summaries
      protocolSummaries[type].protocols = {};

      const protocols = [...new Set(resultsForType.map(r => r.protocolName))];
      protocols.forEach(protocol => {
        const resultsForProtocol = resultsForType.filter(r => r.protocolName === protocol);
        protocolSummaries[type].protocols[protocol] = this.summarizeResults(resultsForProtocol);
      });
    });

    // Create overall report
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.summarizeResults(this.testResults),
      protocolSummaries,
      results: this.testResults,
    };

    // Save report to file
    fs.writeFileSync(reportFilePath, JSON.stringify(report, null, 2));

    return {
      report,
      filePath: reportFilePath,
    };
  }
}

/**
 * Create a new DeFi protocol tester
 * @param {Object} config - Tester configuration
 * @returns {DeFiProtocolTester} - The configured tester
 */
function createTester(config = {}) {
  return new DeFiProtocolTester(config);
}

/**
 * Run a predefined test suite for a specific protocol
 * @param {string} protocolType - Protocol type (lending, amm, staking)
 * @param {string} protocolName - Protocol name
 * @param {Object} config - Test configuration
 * @returns {Promise<Object>} - Test results
 */
async function runPredefinedTestSuite(protocolType, protocolName, config = {}) {
  const tester = createTester(config);

  switch (protocolType.toLowerCase()) {
    case 'lending':
      return await tester.runLendingTestSuite(protocolName, config);
    case 'amm':
      return await tester.runAmmTestSuite(protocolName, config);
    case 'staking':
      return await tester.runStakingTestSuite(protocolName, config);
    default:
      throw new Error(`Unknown protocol type: ${protocolType}`);
  }
}

// Import trading strategy modules
const tradingStrategies = require('./trading-strategies');
const { TradingStrategyAnalyzer, VULNERABILITIES } = require('./trading-strategy-analyzer');

// Export the module's functionality
module.exports = {
  createTester,
  runPredefinedTestSuite,
  DeFiProtocolTester,

  // Protocol adapters
  lendingProtocols,
  ammProtocols,
  stakingProtocols,

  // Protocol-specific test functions
  testLendingProtocol: async (protocolName, testName, config = {}) => {
    const tester = createTester(config);
    return await tester.testLendingProtocol(protocolName, testName, config);
  },

  testAmmProtocol: async (protocolName, testName, config = {}) => {
    const tester = createTester(config);
    return await tester.testAmmProtocol(protocolName, testName, config);
  },

  testStakingProtocol: async (protocolName, testName, config = {}) => {
    const tester = createTester(config);
    return await tester.testStakingProtocol(protocolName, testName, config);
  },

  // Trading strategies module
  tradingStrategies: {
    createStrategy: tradingStrategies.createStrategy,
    initialize: tradingStrategies.initialize,
    STRATEGY_TYPES: tradingStrategies.STRATEGY_TYPES,
  },

  // Trading strategy security analyzer
  tradingStrategyAnalyzer: {
    createAnalyzer: config => new TradingStrategyAnalyzer(config),
    analyzeStrategy: async (strategy, config) => {
      const analyzer = new TradingStrategyAnalyzer(config);
      return await analyzer.analyzeStrategy(strategy);
    },
    VULNERABILITIES,
  },
};
