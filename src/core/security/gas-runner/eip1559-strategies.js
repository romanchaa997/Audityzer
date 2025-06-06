/**
 * EIP-1559 Optimization Strategies
 *
 * Advanced strategies for optimizing transaction fees on EIP-1559 compatible networks,
 * focusing on base fee and priority fee management for different transaction types.
 */

const fs = require('fs-extra');
const path = require('path');

class EIP1559Optimizer {
  constructor(config = {}) {
    this.config = {
      historicalDataPath: config.historicalDataPath || './data/gas-history.json',
      maxBaseFeeIncrease: 12.5, // 12.5% max increase per block
      priorityFeeLevels: {
        low: { percentile: 10, multiplier: 0.8, maxWaitBlocks: 10 },
        medium: { percentile: 50, multiplier: 1.0, maxWaitBlocks: 3 },
        high: { percentile: 80, multiplier: 1.3, maxWaitBlocks: 1 },
        urgent: { percentile: 95, multiplier: 2.0, maxWaitBlocks: 0 },
      },
      strategySensitivity: {
        conservative: 0.5, // Prioritize predictability
        balanced: 1.0, // Default balance
        aggressive: 1.5, // Prioritize savings
      },
      ...config,
    };

    // Store reference to historical analyzer
    this.historicalAnalyzer = config.historicalAnalyzer;

    // Load historical data
    this.loadHistoricalData();
  }

  /**
   * Load historical gas data
   */
  loadHistoricalData() {
    try {
      if (fs.existsSync(this.config.historicalDataPath)) {
        const data = fs.readFileSync(this.config.historicalDataPath, 'utf8');
        this.historicalData = JSON.parse(data);
      } else {
        this.historicalData = { networks: {} };
      }
    } catch (error) {
      console.error('Error loading historical gas data:', error);
      this.historicalData = { networks: {} };
    }
  }

  /**
   * Suggest optimal fee parameters for a transaction
   * @param {string} urgency - Desired urgency level (low, medium, high, urgent)
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} Optimal fee parameters
   */
  async suggestOptimalFees(urgency = 'medium', options = {}) {
    const {
      network = 'mainnet',
      strategy = 'balanced',
      maxFeeLimit = null,
      baseFeeMultiplier = null,
      timePreference = null,
    } = options;

    // Get latest gas data
    let gasData;
    if (this.historicalAnalyzer) {
      // Use historical analyzer if available
      gasData = await this.historicalAnalyzer.analyzeGasPrices(network, {
        timeWindow: '1h',
        includeTimeOfDay: true,
      });
    } else {
      // Use stored historical data
      gasData = this.getNetworkData(network);
    }

    if (!gasData || !gasData.baseFee) {
      throw new Error(`No gas data available for network: ${network}`);
    }

    // Get urgency level configuration
    const urgencyConfig =
      this.config.priorityFeeLevels[urgency] || this.config.priorityFeeLevels.medium;

    // Get strategy sensitivity
    const strategySensitivity =
      this.config.strategySensitivity[strategy] || this.config.strategySensitivity.balanced;

    // Calculate the optimal fee parameters
    const params = this.calculateOptimalParameters(
      gasData,
      urgencyConfig,
      strategySensitivity,
      options
    );

    // Apply caps if specified
    if (maxFeeLimit && params.maxFeePerGas > maxFeeLimit) {
      params.maxFeePerGas = maxFeeLimit;
    }

    // Adjust base fee expectation based on time preference if specified
    if (timePreference) {
      params.baseFeeEstimate = this.adjustForTimePreference(
        params.baseFeeEstimate,
        timePreference,
        gasData
      );

      // Update max fee calculation accordingly
      params.maxFeePerGas = Math.max(
        params.maxFeePerGas,
        params.baseFeeEstimate + params.maxPriorityFeePerGas
      );
    }

    // Add metadata
    params.network = network;
    params.urgency = urgency;
    params.strategy = strategy;
    params.timestamp = Date.now();
    params.estimatedWaitBlocks = urgencyConfig.maxWaitBlocks;
    params.estimatedWaitTime = this.estimateWaitTime(network, urgencyConfig.maxWaitBlocks);

    return params;
  }

  /**
   * Get historical gas data for a network
   * @param {string} network - Network name
   * @returns {Object} Gas data
   */
  getNetworkData(network) {
    return this.historicalData.networks[network] || null;
  }

  /**
   * Calculate optimal EIP-1559 fee parameters
   * @param {Object} gasData - Gas data
   * @param {Object} urgencyConfig - Urgency configuration
   * @param {number} strategySensitivity - Strategy sensitivity factor
   * @param {Object} options - Additional options
   * @returns {Object} Optimal fee parameters
   */
  calculateOptimalParameters(gasData, urgencyConfig, strategySensitivity, options) {
    // Extract current base fee and priority fee data
    const currentBaseFee = gasData.baseFee.mean;
    const priorityFeePercentile = `p${urgencyConfig.percentile}`;
    const priorityFeeData = gasData.priorityFee;

    // Calculate priority fee
    const priorityFeePercentileValue = priorityFeeData[priorityFeePercentile];
    const basePriorityFee = priorityFeePercentileValue * urgencyConfig.multiplier;

    // Apply strategy sensitivity to priority fee
    const adjustedPriorityFee = basePriorityFee * strategySensitivity;

    // Calculate expected base fee range for next blocks
    const maxWaitBlocks = urgencyConfig.maxWaitBlocks;
    const baseFeeEstimate = this.estimateBaseFee(currentBaseFee, maxWaitBlocks, gasData);

    // Calculate max fee
    let maxFeePerGas;

    if (options.baseFeeMultiplier) {
      // User provided explicit multiplier
      maxFeePerGas = baseFeeEstimate * options.baseFeeMultiplier + adjustedPriorityFee;
    } else {
      // Calculate based on expected base fee increase and priority fee
      const baseFeeMultiplier = this.calculateBaseFeeMultiplier(maxWaitBlocks, strategySensitivity);
      maxFeePerGas = baseFeeEstimate * baseFeeMultiplier + adjustedPriorityFee;
    }

    // Round to reasonable precision (3 decimal places for Gwei)
    const roundToGwei = value => Math.round(value * 1000) / 1000;

    return {
      maxFeePerGas: roundToGwei(maxFeePerGas),
      maxPriorityFeePerGas: roundToGwei(adjustedPriorityFee),
      baseFeeEstimate: roundToGwei(baseFeeEstimate),
      currentBaseFee: roundToGwei(currentBaseFee),
    };
  }

  /**
   * Estimate base fee after a number of blocks
   * @param {number} currentBaseFee - Current base fee
   * @param {number} blocks - Number of blocks to look ahead
   * @param {Object} gasData - Gas data for trend analysis
   * @returns {number} Estimated base fee
   */
  estimateBaseFee(currentBaseFee, blocks, gasData) {
    if (blocks === 0) {
      return currentBaseFee;
    }

    // Get recent trend from historical data
    let recentTrend = 0;

    if (gasData.trends && gasData.trends.slope) {
      recentTrend = gasData.trends.slope;
    }

    // Calculate multiplier based on trend and EIP-1559 base fee adjustment rules
    let multiplier = 1.0;

    if (recentTrend > 0) {
      // Upward trend - assume continued increase
      // Each block can increase by up to 12.5%
      multiplier = Math.pow(1.125, Math.min(blocks, 3));
    } else if (recentTrend < 0) {
      // Downward trend - assume continued decrease but more conservatively
      // Each block can decrease by up to 12.5%
      multiplier = Math.pow(0.9, Math.min(blocks, 2));
    }

    return currentBaseFee * multiplier;
  }

  /**
   * Calculate base fee multiplier based on wait blocks and strategy
   * @param {number} maxWaitBlocks - Maximum blocks to wait
   * @param {number} strategySensitivity - Strategy sensitivity
   * @returns {number} Base fee multiplier
   */
  calculateBaseFeeMultiplier(maxWaitBlocks, strategySensitivity) {
    // Conservative approach: assume max possible base fee increases
    // Each block can increase by up to 12.5%
    const maxIncrease = Math.pow(1.125, maxWaitBlocks);

    // Adjust based on strategy sensitivity
    // More conservative strategy = higher multiplier
    // More aggressive strategy = lower multiplier
    if (strategySensitivity < 1) {
      // Conservative: closer to max increase
      return 1.0 + (maxIncrease - 1.0) * (1.5 - strategySensitivity);
    } else if (strategySensitivity > 1) {
      // Aggressive: closer to no increase
      return 1.0 + (maxIncrease - 1.0) / strategySensitivity;
    }

    // Balanced: reasonable middle ground
    return 1.0 + (maxIncrease - 1.0) * 0.8;
  }

  /**
   * Adjust base fee estimate based on time preference
   * @param {number} baseFeeEstimate - Base fee estimate
   * @param {string} timePreference - Time preference (now, soon, flexible)
   * @param {Object} gasData - Gas data
   * @returns {number} Adjusted base fee estimate
   */
  adjustForTimePreference(baseFeeEstimate, timePreference, gasData) {
    switch (timePreference) {
      case 'now':
        // Need immediate confirmation - be more conservative
        return baseFeeEstimate * 1.2;

      case 'soon':
        // Need confirmation within a few blocks - use standard estimate
        return baseFeeEstimate;

      case 'flexible':
        // Can wait for lower fees - look for time-of-day patterns
        if (gasData.timeOfDay) {
          // Find minimum fee period in next 6 hours
          const now = new Date();
          const currentHour = now.getUTCHours();
          let minFeeMultiplier = 1.0;

          // Check next 6 hours for lower fees
          for (let i = 1; i <= 6; i++) {
            const futureHour = (currentHour + i) % 24;
            const hourStr = `${futureHour}`.padStart(2, '0');

            if (
              gasData.timeOfDay[hourStr] &&
              gasData.timeOfDay[hourStr].mean < gasData.baseFee.mean * minFeeMultiplier
            ) {
              minFeeMultiplier = gasData.timeOfDay[hourStr].mean / gasData.baseFee.mean;
            }
          }

          // Apply at most 30% reduction
          return baseFeeEstimate * Math.max(0.7, minFeeMultiplier);
        }

        // Default to slight reduction if no time data available
        return baseFeeEstimate * 0.9;

      default:
        return baseFeeEstimate;
    }
  }

  /**
   * Estimate wait time in seconds
   * @param {string} network - Network name
   * @param {number} blocks - Number of blocks to wait
   * @returns {number} Estimated wait time in seconds
   */
  estimateWaitTime(network, blocks) {
    // Average block times for different networks
    const blockTimes = {
      mainnet: 12,
      optimism: 2,
      arbitrum: 0.25,
      polygon: 2,
      base: 2,
    };

    const blockTime = blockTimes[network] || 12;
    return blocks * blockTime;
  }

  /**
   * Compare EIP-1559 and legacy fee strategies
   * @param {string} network - Network name
   * @param {string} urgency - Urgency level
   * @returns {Promise<Object>} Comparison results
   */
  async compareStrategies(network, urgency = 'medium') {
    // Get EIP-1559 fee suggestion
    const eip1559Params = await this.suggestOptimalFees(urgency, { network });

    // Calculate equivalent legacy gas price
    // Legacy gas price = base fee + priority fee with buffer
    const legacyGasPrice = eip1559Params.baseFeeEstimate + eip1559Params.maxPriorityFeePerGas * 1.5;

    // Calculate potential savings
    const savingsGwei =
      legacyGasPrice - (eip1559Params.baseFeeEstimate + eip1559Params.maxPriorityFeePerGas);
    const savingsPercent = (savingsGwei / legacyGasPrice) * 100;

    return {
      network,
      urgency,
      eip1559: {
        maxFeePerGas: eip1559Params.maxFeePerGas,
        maxPriorityFeePerGas: eip1559Params.maxPriorityFeePerGas,
        expectedTotalFee: eip1559Params.baseFeeEstimate + eip1559Params.maxPriorityFeePerGas,
      },
      legacy: {
        gasPrice: legacyGasPrice,
      },
      savings: {
        gwei: savingsGwei,
        percent: savingsPercent.toFixed(2),
      },
      recommendation: savingsPercent > 5 ? 'Use EIP-1559' : 'Either strategy is acceptable',
    };
  }

  /**
   * Calculate optimal EIP-1559 parameters for contract deployment
   * @param {Object} options - Deployment options
   * @returns {Promise<Object>} Optimal deployment parameters
   */
  async optimizeDeployment(options = {}) {
    const {
      network = 'mainnet',
      timeWindow = '24h',
      strategy = 'balanced',
      gasLimit = 4000000, // Default gas limit for contract deployment
    } = options;

    // Get extended gas data for time analysis
    let gasData;
    if (this.historicalAnalyzer) {
      gasData = await this.historicalAnalyzer.analyzeGasPrices(network, {
        timeWindow,
        includeTimeOfDay: true,
        includeDayOfWeek: true,
      });
    } else {
      gasData = this.getNetworkData(network);
    }

    if (!gasData || !gasData.baseFee) {
      throw new Error(`No gas data available for network: ${network}`);
    }

    // Find optimal time of day
    const optimalTimeDetails = this.findOptimalDeploymentTime(gasData);

    // Get fee parameters for that time
    const feeParams = await this.suggestOptimalFees('medium', {
      network,
      strategy,
      timePreference: 'flexible',
    });

    // Calculate cost estimation
    const gasLimitBN = BigInt(gasLimit);
    const maxFeePerGasBN = BigInt(Math.round(feeParams.maxFeePerGas * 1e9));
    const baseFeeEstimateBN = BigInt(Math.round(feeParams.baseFeeEstimate * 1e9));
    const priorityFeeBN = BigInt(Math.round(feeParams.maxPriorityFeePerGas * 1e9));

    const maxCostWei = gasLimitBN * maxFeePerGasBN;
    const expectedCostWei = gasLimitBN * (baseFeeEstimateBN + priorityFeeBN);

    // Convert to ETH
    const maxCostETH = Number(maxCostWei) / 1e18;
    const expectedCostETH = Number(expectedCostWei) / 1e18;

    return {
      network,
      gasLimit,
      feeParameters: feeParams,
      optimalTime: optimalTimeDetails,
      costEstimate: {
        maxCostETH,
        expectedCostETH,
        savingsOverCurrentTime: optimalTimeDetails.savingsPercent,
      },
      recommendation: `Deploy contract during ${optimalTimeDetails.timeDescription} using the provided fee parameters for optimal gas costs.`,
    };
  }

  /**
   * Find optimal time for contract deployment
   * @param {Object} gasData - Gas data
   * @returns {Object} Optimal deployment time details
   */
  findOptimalDeploymentTime(gasData) {
    if (!gasData.timeOfDay) {
      return {
        timeDescription: 'any time',
        hourOfDay: null,
        dayOfWeek: null,
        confidence: 'low',
        savingsPercent: 0,
      };
    }

    // Analyze by hour of day
    let minHour = 0;
    let minHourFee = Number.MAX_VALUE;

    for (let hour = 0; hour < 24; hour++) {
      const hourStr = `${hour}`.padStart(2, '0');

      if (gasData.timeOfDay[hourStr] && gasData.timeOfDay[hourStr].mean < minHourFee) {
        minHourFee = gasData.timeOfDay[hourStr].mean;
        minHour = hour;
      }
    }

    // Find day of week if available
    let minDay = null;
    let minDayFee = Number.MAX_VALUE;

    if (gasData.dayOfWeek) {
      for (const [day, stats] of Object.entries(gasData.dayOfWeek)) {
        if (stats.mean < minDayFee) {
          minDayFee = stats.mean;
          minDay = day;
        }
      }
    }

    // Calculate savings percentage
    const avgFee = gasData.baseFee.mean;
    const savingsPercent = (((avgFee - minHourFee) / avgFee) * 100).toFixed(2);

    // Determine confidence based on data consistency
    let confidence = 'medium';

    if (gasData.timeOfDay[`${minHour}`.padStart(2, '0')].stdDev / minHourFee < 0.2) {
      confidence = 'high';
    }

    // Format time description
    const hourFormatted = `${minHour}:00-${minHour}:59 UTC`;
    const timeDescription = minDay ? `${minDay} at ${hourFormatted}` : hourFormatted;

    return {
      timeDescription,
      hourOfDay: minHour,
      dayOfWeek: minDay,
      confidence,
      savingsPercent,
      avgFee,
      minTimeFee: minHourFee,
    };
  }
}

module.exports = EIP1559Optimizer;
