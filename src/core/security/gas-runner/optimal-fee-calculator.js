/**
 * Optimal Fee Calculator
 *
 * Calculates optimal transaction fees based on historical data analysis
 * and network conditions to optimize for cost, confirmation time, and reliability.
 */

class OptimalFeeCalculator {
  constructor(config = {}) {
    this.config = {
      networks: config.networks || ['mainnet', 'arbitrum', 'optimism', 'polygon', 'base'],
      urgencyLevels: {
        low: {
          maxDelayBlocks: 20,
          percentiles: { gasPrice: 25, baseFee: 25, priorityFee: 20 },
          multiplier: 1.0,
        },
        medium: {
          maxDelayBlocks: 6,
          percentiles: { gasPrice: 60, baseFee: 50, priorityFee: 60 },
          multiplier: 1.1,
        },
        high: {
          maxDelayBlocks: 2,
          percentiles: { gasPrice: 90, baseFee: 75, priorityFee: 90 },
          multiplier: 1.25,
        },
        urgent: {
          maxDelayBlocks: 1,
          percentiles: { gasPrice: 99, baseFee: 95, priorityFee: 99 },
          multiplier: 1.5,
        },
      },
      safetyPercentage: 10, // Add 10% buffer to calculations
      minPriorityFeeGwei: 1.0, // Minimum priority fee in Gwei
      historicalWindow: '3h', // Use 3 hours of historical data by default
      ...config,
    };

    // Store reference to historical analyzer
    this.historicalAnalyzer = config.historicalAnalyzer;

    if (!this.historicalAnalyzer) {
      throw new Error('OptimalFeeCalculator requires a historical analyzer instance');
    }

    // Cache for fee calculations to avoid redundant processing
    this.feeCache = new Map();
    this.cacheTTL = 5 * 60 * 1000; // 5 minutes cache TTL
  }

  /**
   * Generate a cache key for fee calculations
   * @param {string} network - Network name
   * @param {string} urgency - Urgency level
   * @param {string} timestamp - Timestamp for invalidation
   * @returns {string} Cache key
   */
  getCacheKey(network, urgency, timestamp) {
    return `${network}-${urgency}-${timestamp}`;
  }

  /**
   * Check if a cached result is still valid
   * @param {Object} cachedResult - Cached calculation result
   * @returns {boolean} Whether the cache is still valid
   */
  isCacheValid(cachedResult) {
    if (!cachedResult) return false;

    const now = Date.now();
    return now - cachedResult.timestamp < this.cacheTTL;
  }

  /**
   * Calculate optimal transaction fees for a network
   * @param {string} network - Target network
   * @param {string} urgency - Transaction urgency (low, medium, high, urgent)
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} Optimal fee parameters
   */
  async calculateOptimalFees(network, urgency = 'medium', options = {}) {
    // Check if the requested urgency level is supported
    if (!this.config.urgencyLevels[urgency]) {
      throw new Error(`Unsupported urgency level: ${urgency}`);
    }

    // Check if we have a valid cached result
    const cacheKey = this.getCacheKey(network, urgency, Math.floor(Date.now() / this.cacheTTL));
    const cachedResult = this.feeCache.get(cacheKey);

    if (this.isCacheValid(cachedResult)) {
      return cachedResult.result;
    }

    // Get historical data for the network
    const analysisOptions = {
      timeWindow: options.historicalWindow || this.config.historicalWindow,
      includeTimeOfDay: true,
      includeDayOfWeek: false,
      includeUtilization: true,
    };

    const historicalData = await this.historicalAnalyzer.analyzeGasPrices(network, analysisOptions);

    // Get urgency configuration
    const urgencyConfig = this.config.urgencyLevels[urgency];

    // Calculate optimal fees based on network type and EIP-1559 support
    let feeRecommendation;

    if (historicalData.baseFee && historicalData.priorityFee) {
      // Network supports EIP-1559
      feeRecommendation = this.calculateEIP1559Fees(historicalData, urgencyConfig, options);
    } else {
      // Legacy gas price network
      feeRecommendation = this.calculateLegacyFees(historicalData, urgencyConfig, options);
    }

    // Add time-based adjustment if time of day data is available
    if (historicalData.timeOfDay) {
      const timeAdjustment = this.calculateTimeBasedAdjustment(historicalData, options);
      feeRecommendation.timeMultiplier = timeAdjustment.multiplier;

      // Apply time-based adjustment to fees
      if (feeRecommendation.maxFeePerGas) {
        feeRecommendation.maxFeePerGas *= timeAdjustment.multiplier;
      }

      if (feeRecommendation.maxPriorityFeePerGas) {
        feeRecommendation.maxPriorityFeePerGas *= timeAdjustment.multiplier;
      }

      if (feeRecommendation.gasPrice) {
        feeRecommendation.gasPrice *= timeAdjustment.multiplier;
      }

      feeRecommendation.timeBasedAdjustment = timeAdjustment;
    }

    // Add utilization-based adjustment if utilization data is available
    if (historicalData.utilization) {
      const utilizationAdjustment = this.calculateUtilizationAdjustment(historicalData);
      feeRecommendation.utilizationMultiplier = utilizationAdjustment.multiplier;

      // Apply utilization adjustment to fees
      if (feeRecommendation.maxFeePerGas) {
        feeRecommendation.maxFeePerGas *= utilizationAdjustment.multiplier;
      }

      if (feeRecommendation.maxPriorityFeePerGas) {
        feeRecommendation.maxPriorityFeePerGas *= utilizationAdjustment.multiplier;
      }

      if (feeRecommendation.gasPrice) {
        feeRecommendation.gasPrice *= utilizationAdjustment.multiplier;
      }

      feeRecommendation.utilizationAdjustment = utilizationAdjustment;
    }

    // Round values to reasonable precision (3 decimal places for Gwei)
    this.roundFeeValues(feeRecommendation);

    // Add metadata to the recommendation
    feeRecommendation.network = network;
    feeRecommendation.urgency = urgency;
    feeRecommendation.timestamp = Date.now();
    feeRecommendation.dataPoints = historicalData.dataPoints;
    feeRecommendation.basedOn = {
      timeWindow: historicalData.timeWindow,
      dataPoints: historicalData.dataPoints,
    };

    // Cache the result
    this.feeCache.set(cacheKey, {
      timestamp: Date.now(),
      result: feeRecommendation,
    });

    return feeRecommendation;
  }

  /**
   * Calculate EIP-1559 fee parameters
   * @param {Object} historicalData - Historical gas data analysis
   * @param {Object} urgencyConfig - Urgency level configuration
   * @param {Object} options - Additional options
   * @returns {Object} EIP-1559 fee parameters
   */
  calculateEIP1559Fees(historicalData, urgencyConfig, options = {}) {
    // Extract base fee and priority fee percentiles
    const baseFeePercentile = urgencyConfig.percentiles.baseFee;
    const priorityFeePercentile = urgencyConfig.percentiles.priorityFee;

    // Get base fee value from percentile
    const baseFee = historicalData.baseFee[`p${baseFeePercentile}`];

    // Get priority fee value from percentile
    let priorityFee = historicalData.priorityFee[`p${priorityFeePercentile}`];

    // Ensure minimum priority fee
    priorityFee = Math.max(priorityFee, this.config.minPriorityFeeGwei);

    // Apply urgency multiplier
    const adjustedBaseFee = baseFee * urgencyConfig.multiplier;
    const adjustedPriorityFee = priorityFee * urgencyConfig.multiplier;

    // Calculate max fee (base fee + priority fee with safety margin)
    const safetyMultiplier = 1 + this.config.safetyPercentage / 100;
    const maxFeePerGas = (adjustedBaseFee + adjustedPriorityFee) * safetyMultiplier;

    return {
      type: 'eip1559',
      maxFeePerGas,
      maxPriorityFeePerGas: adjustedPriorityFee,
      estimatedBaseFee: baseFee,
      urgencyMultiplier: urgencyConfig.multiplier,
      safetyMultiplier,
    };
  }

  /**
   * Calculate legacy gas price parameters
   * @param {Object} historicalData - Historical gas data analysis
   * @param {Object} urgencyConfig - Urgency level configuration
   * @param {Object} options - Additional options
   * @returns {Object} Legacy gas price parameters
   */
  calculateLegacyFees(historicalData, urgencyConfig, options = {}) {
    // Extract gas price percentile
    const gasPricePercentile = urgencyConfig.percentiles.gasPrice;

    // Get gas price value from percentile
    const gasPrice = historicalData.gasPrice[`p${gasPricePercentile}`];

    // Apply urgency multiplier
    const adjustedGasPrice = gasPrice * urgencyConfig.multiplier;

    // Apply safety margin
    const safetyMultiplier = 1 + this.config.safetyPercentage / 100;
    const finalGasPrice = adjustedGasPrice * safetyMultiplier;

    return {
      type: 'legacy',
      gasPrice: finalGasPrice,
      urgencyMultiplier: urgencyConfig.multiplier,
      safetyMultiplier,
    };
  }

  /**
   * Calculate time-based fee adjustment based on time of day
   * @param {Object} historicalData - Historical gas data analysis
   * @param {Object} options - Additional options
   * @returns {Object} Time-based adjustment factors
   */
  calculateTimeBasedAdjustment(historicalData, options = {}) {
    const now = new Date();
    const currentHour = options.hour !== undefined ? options.hour : now.getUTCHours();
    const currentHourStr = `${currentHour}`.padStart(2, '0');

    // Get current hour stats
    const currentHourStats = historicalData.timeOfDay[currentHourStr];

    if (!currentHourStats) {
      return { multiplier: 1.0, reason: 'no time data' };
    }

    // Compare current hour to overall average
    const hourlyMean = currentHourStats.mean;
    const overallMean = historicalData.gasPrice.mean;

    // Calculate ratio of current hour to overall
    const ratio = hourlyMean / overallMean;

    // Apply time-based multiplier (max ±20% adjustment)
    const multiplier = Math.max(0.8, Math.min(1.2, ratio));

    return {
      multiplier,
      currentHour,
      hourlyMean,
      overallMean,
      ratio,
      isBelowAverage: ratio < 1.0,
      isAboveAverage: ratio > 1.0,
    };
  }

  /**
   * Calculate utilization-based fee adjustment
   * @param {Object} historicalData - Historical gas data analysis
   * @returns {Object} Utilization-based adjustment factors
   */
  calculateUtilizationAdjustment(historicalData) {
    // Get current utilization stats
    const utilizationStats = historicalData.utilization.stats;

    if (!utilizationStats || !utilizationStats.mean) {
      return { multiplier: 1.0, reason: 'no utilization data' };
    }

    // Get correlation between utilization and gas price
    const correlation = historicalData.utilization.correlation || 0;
    const impact = historicalData.utilization.impact || 'unknown';

    // Calculate utilization-based multiplier
    let multiplier = 1.0;

    // Only apply adjustment if correlation is significant
    if (Math.abs(correlation) >= 0.4) {
      // Calculate utilization pressure (0-1 scale)
      const utilizationPressure = Math.min(1.0, utilizationStats.mean / 100);

      // Apply non-linear scaling to utilization pressure
      // Higher utilization has exponentially higher impact
      const pressureImpact = Math.pow(utilizationPressure, 1.5);

      // Scale impact based on correlation strength (max ±15% adjustment)
      const correlationStrength = Math.min(1.0, Math.abs(correlation));
      const maxAdjustment = 0.15 * correlationStrength;

      if (correlation > 0) {
        // Positive correlation: higher utilization = higher fees
        multiplier = 1.0 + maxAdjustment * pressureImpact;
      } else {
        // Negative correlation (unusual): higher utilization = lower fees
        multiplier = 1.0 - maxAdjustment * pressureImpact;
      }
    }

    return {
      multiplier,
      correlation,
      impact,
      utilizationMean: utilizationStats.mean,
      reason: impact !== 'unknown' ? `${impact} correlation with fees` : 'insufficient data',
    };
  }

  /**
   * Round fee values to reasonable precision
   * @param {Object} feeRecommendation - Fee recommendation object
   */
  roundFeeValues(feeRecommendation) {
    // Round to 3 decimal places for Gwei values
    const round = value => Math.round(value * 1000) / 1000;

    if (feeRecommendation.maxFeePerGas) {
      feeRecommendation.maxFeePerGas = round(feeRecommendation.maxFeePerGas);
    }

    if (feeRecommendation.maxPriorityFeePerGas) {
      feeRecommendation.maxPriorityFeePerGas = round(feeRecommendation.maxPriorityFeePerGas);
    }

    if (feeRecommendation.gasPrice) {
      feeRecommendation.gasPrice = round(feeRecommendation.gasPrice);
    }

    if (feeRecommendation.estimatedBaseFee) {
      feeRecommendation.estimatedBaseFee = round(feeRecommendation.estimatedBaseFee);
    }
  }

  /**
   * Get optimal fee suggestions for all urgency levels
   * @param {string} network - Target network
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} Fee suggestions for all urgency levels
   */
  async getAllUrgencyLevels(network, options = {}) {
    const urgencyLevels = Object.keys(this.config.urgencyLevels);
    const results = {};

    for (const urgency of urgencyLevels) {
      results[urgency] = await this.calculateOptimalFees(network, urgency, options);
    }

    return {
      network,
      timestamp: Date.now(),
      recommendations: results,
    };
  }

  /**
   * Clear fee calculation cache
   * @param {string} network - Optional network to clear (all if not specified)
   */
  clearCache(network = null) {
    if (network) {
      // Clear only for specified network
      for (const key of this.feeCache.keys()) {
        if (key.startsWith(network)) {
          this.feeCache.delete(key);
        }
      }
    } else {
      // Clear entire cache
      this.feeCache.clear();
    }
  }
}

module.exports = OptimalFeeCalculator;
