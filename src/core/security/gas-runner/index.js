/**
 * GasRunner - Advanced Gas Optimization System for Web3 Applications
 *
 * A comprehensive toolkit for analyzing, optimizing, and benchmarking gas usage
 * across different networks and contract types.
 */

const GasHistoricalAnalyzer = require('./historical-analyzer');
const OptimalFeeCalculator = require('./optimal-fee-calculator');
const DeploymentOptimizer = require('./deployment-optimizer');
const BatchingOptimizer = require('./transaction-batcher');
const PriorityFeeOptimizer = require('./priority-fee-optimizer');
const GasPricePredictor = require('./gas-price-predictor');
const optimizationStrategies = require('./optimization-strategies');
const GasBenchmarker = require('./benchmarking');
const EIP1559Optimizer = require('./eip1559-strategies');

class GasRunner {
  constructor(config = {}) {
    this.config = {
      dataStoragePath: config.dataStoragePath || './data/gas-data',
      networks: config.networks || ['mainnet', 'arbitrum', 'optimism', 'polygon', 'base'],
      historicalDataWindow: config.historicalDataWindow || '30d', // 30 days of historical data
      defaultNetwork: config.defaultNetwork || 'mainnet',
      rpcProviders: config.rpcProviders || {},
      ...config,
    };

    // Initialize components
    this.historicalAnalyzer = new GasHistoricalAnalyzer({
      dataStoragePath: this.config.dataStoragePath,
      networks: this.config.networks,
      dataWindow: this.config.historicalDataWindow,
      rpcProviders: this.config.rpcProviders,
    });

    this.feeCalculator = new OptimalFeeCalculator({
      historicalAnalyzer: this.historicalAnalyzer,
      networks: this.config.networks,
    });

    this.deploymentOptimizer = new DeploymentOptimizer({
      historicalAnalyzer: this.historicalAnalyzer,
      feeCalculator: this.feeCalculator,
    });

    this.batchingOptimizer = new BatchingOptimizer();

    this.priorityFeeOptimizer = new PriorityFeeOptimizer({
      historicalAnalyzer: this.historicalAnalyzer,
      networks: this.config.networks,
    });

    this.gasPricePredictor = new GasPricePredictor({
      historicalAnalyzer: this.historicalAnalyzer,
    });

    this.benchmarker = new GasBenchmarker({
      baselinePath: `${this.config.dataStoragePath}/gas-baselines.json`,
      networks: this.config.networks,
    });

    this.eip1559Optimizer = new EIP1559Optimizer({
      historicalDataPath: `${this.config.dataStoragePath}/gas-history.json`,
      historicalAnalyzer: this.historicalAnalyzer,
    });

    this.optimizationStrategies = optimizationStrategies;
  }

  /**
   * Analyze historical gas prices for a specific network
   * @param {string} network - The network to analyze
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} Analysis results
   */
  async analyzeHistoricalGasPrices(network = this.config.defaultNetwork, options = {}) {
    return this.historicalAnalyzer.analyzeGasPrices(network, options);
  }

  /**
   * Calculate optimal transaction fees
   * @param {string} network - Target network
   * @param {string} urgency - Transaction urgency (low, medium, high)
   * @returns {Promise<Object>} Optimal fee parameters
   */
  async calculateOptimalFees(network = this.config.defaultNetwork, urgency = 'medium') {
    return this.feeCalculator.calculateOptimalFees(network, urgency);
  }

  /**
   * Find optimal deployment time
   * @param {Object} options - Deployment options
   * @returns {Promise<Object>} Optimal deployment time and fee recommendations
   */
  async optimizeDeploymentTiming(options = {}) {
    return this.deploymentOptimizer.findOptimalDeploymentTime(options);
  }

  /**
   * Optimize transaction batching
   * @param {Array} transactions - List of transactions to batch
   * @param {Object} options - Batching options
   * @returns {Promise<Object>} Optimized batching strategy
   */
  async optimizeTransactionBatching(transactions, options = {}) {
    return this.batchingOptimizer.optimizeBatching(transactions, options);
  }

  /**
   * Calculate optimal priority fee
   * @param {string} network - Target network
   * @param {Object} options - Priority fee options
   * @returns {Promise<Object>} Optimal priority fee
   */
  async optimizePriorityFee(network = this.config.defaultNetwork, options = {}) {
    return this.priorityFeeOptimizer.calculateOptimalPriorityFee(network, options);
  }

  /**
   * Predict future gas prices
   * @param {string} network - Target network
   * @param {Object} options - Prediction options
   * @returns {Promise<Object>} Gas price predictions
   */
  async predictGasPrices(network = this.config.defaultNetwork, options = {}) {
    return this.gasPricePredictor.predictPrices(network, options);
  }

  /**
   * Run optimization strategies on a contract
   * @param {string} contractPath - Path to contract file
   * @param {Array} strategies - List of optimization strategies to apply
   * @returns {Promise<Object>} Optimization results
   */
  async optimizeContract(contractPath, strategies = []) {
    const results = {};
    const allStrategies =
      strategies.length > 0 ? strategies : Object.keys(this.optimizationStrategies);

    for (const strategy of allStrategies) {
      if (this.optimizationStrategies[strategy]) {
        results[strategy] = await this.optimizationStrategies[strategy](contractPath);
      }
    }

    return results;
  }

  /**
   * Benchmark contract gas usage
   * @param {string} contractPath - Path to contract file
   * @param {Object} options - Benchmarking options
   * @returns {Promise<Object>} Benchmark results
   */
  async benchmarkContract(contractPath, options = {}) {
    const optimizationResults =
      options.optimizationResults || (await this.optimizeContract(contractPath));

    return this.benchmarker.benchmarkAgainstBaseline(contractPath, optimizationResults);
  }

  /**
   * Optimize EIP-1559 transaction parameters
   * @param {string} urgency - Transaction urgency
   * @returns {Promise<Object>} Optimized EIP-1559 parameters
   */
  async optimizeEIP1559Parameters(urgency = 'medium') {
    return this.eip1559Optimizer.suggestOptimalFees(urgency);
  }
}

module.exports = GasRunner;
