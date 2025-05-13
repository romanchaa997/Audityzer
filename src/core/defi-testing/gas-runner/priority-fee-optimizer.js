/**
 * Priority Fee Optimizer
 *
 * Advanced optimization for EIP-1559 priority fees, dynamically adjusting
 * based on network conditions, transaction urgency, and inclusion probability.
 */

class PriorityFeeOptimizer {
  constructor(config = {}) {
    this.config = {
      networks: config.networks || ['mainnet', 'arbitrum', 'optimism', 'polygon', 'base'],
      minPriorityFeeGwei: {
        mainnet: 1.0,
        arbitrum: 0.1,
        optimism: 0.01,
        polygon: 30.0,
        base: 0.01,
      },
      defaultUrgencyLevels: {
        low: {
          percentile: 10,
          multiplier: 0.8,
          maxWaitBlocks: 10,
          inclusionProbability: 0.7,
        },
        medium: {
          percentile: 50,
          multiplier: 1.0,
          maxWaitBlocks: 3,
          inclusionProbability: 0.9,
        },
        high: {
          percentile: 80,
          multiplier: 1.3,
          maxWaitBlocks: 1,
          inclusionProbability: 0.95,
        },
        urgent: {
          percentile: 95,
          multiplier: 2.0,
          maxWaitBlocks: 0,
          inclusionProbability: 0.99,
        },
      },
      networkCongestionLevels: {
        low: { multiplier: 0.8 },
        moderate: { multiplier: 1.0 },
        high: { multiplier: 1.5 },
        extreme: { multiplier: 2.5 },
      },
      blockProducerSensitivity: {
        mainnet: 0.7, // Higher sensitivity means producers more likely to prioritize by tip
        arbitrum: 0.5,
        optimism: 0.3,
        polygon: 0.9,
        base: 0.4,
      },
      historicalWindow: '1h',
      ...config,
    };

    // Store reference to historical analyzer
    this.historicalAnalyzer = config.historicalAnalyzer;

    if (!this.historicalAnalyzer) {
      throw new Error('PriorityFeeOptimizer requires a historical analyzer instance');
    }

    // Cache for network congestion state
    this.congestionCache = new Map();
    this.cacheTTL = 5 * 60 * 1000; // 5 minutes cache TTL
  }

  /**
   * Calculate optimal priority fee for a transaction
   * @param {string} network - Target network
   * @param {Object} options - Priority fee options
   * @returns {Promise<Object>} Optimal priority fee
   */
  async calculateOptimalPriorityFee(network, options = {}) {
    const {
      urgency = 'medium',
      txType = 'standard',
      inclusionDeadline = null,
      maxPriorityFee = null,
      customMultiplier = null,
    } = options;

    // Validate network
    if (!this.config.networks.includes(network)) {
      throw new Error(`Unsupported network: ${network}`);
    }

    // Get current network congestion level
    const congestion = await this.getNetworkCongestion(network);

    // Get historical priority fee data
    const historicalData = await this.historicalAnalyzer.analyzeGasPrices(network, {
      timeWindow: this.config.historicalWindow,
      includeTimeOfDay: true,
    });

    // Get urgency level configuration
    const urgencyConfig =
      this.config.defaultUrgencyLevels[urgency] || this.config.defaultUrgencyLevels.medium;

    // Get transaction type modifier
    const txTypeModifier = this.getTransactionTypeModifier(txType);

    // Calculate optimal priority fee
    const priorityFee = this.calculatePriorityFee(
      network,
      historicalData,
      urgencyConfig,
      congestion,
      txTypeModifier,
      options
    );

    // Apply custom multiplier if provided
    if (customMultiplier) {
      priorityFee.maxPriorityFeePerGas *= customMultiplier;
    }

    // Apply maximum cap if provided
    if (maxPriorityFee && priorityFee.maxPriorityFeePerGas > maxPriorityFee) {
      priorityFee.maxPriorityFeePerGas = maxPriorityFee;
    }

    // Ensure minimum network-specific priority fee
    const minFee = this.config.minPriorityFeeGwei[network] || 1.0;
    priorityFee.maxPriorityFeePerGas = Math.max(priorityFee.maxPriorityFeePerGas, minFee);

    // Calculate inclusion probability
    const inclusionProbability = this.calculateInclusionProbability(
      priorityFee.maxPriorityFeePerGas,
      historicalData,
      congestion,
      network
    );

    // Round to reasonable precision (3 decimal places for Gwei)
    priorityFee.maxPriorityFeePerGas = Math.round(priorityFee.maxPriorityFeePerGas * 1000) / 1000;

    // Add metadata
    return {
      network,
      maxPriorityFeePerGas: priorityFee.maxPriorityFeePerGas,
      urgency,
      txType,
      congestionLevel: congestion.level,
      inclusionProbability,
      estimatedWaitBlocks: this.calculateWaitBlocks(inclusionProbability, urgencyConfig),
      estimatedWaitTime: this.calculateWaitTime(
        network,
        this.calculateWaitBlocks(inclusionProbability, urgencyConfig)
      ),
      basedOn: {
        historicalPercentile: priorityFee.percentileValue,
        congestionMultiplier: congestion.multiplier,
        txTypeModifier,
        timeBasedAdjustment: priorityFee.timeAdjustment,
      },
    };
  }

  /**
   * Get current network congestion level
   * @param {string} network - Target network
   * @returns {Promise<Object>} Network congestion data
   */
  async getNetworkCongestion(network) {
    // Check cache first
    const cacheKey = `${network}-congestion`;
    const cachedCongestion = this.congestionCache.get(cacheKey);

    if (cachedCongestion && Date.now() - cachedCongestion.timestamp < this.cacheTTL) {
      return cachedCongestion.data;
    }

    try {
      // Get recent block data for congestion analysis
      const historicalData = await this.historicalAnalyzer.analyzeGasPrices(network, {
        timeWindow: '15m',
        includeUtilization: true,
      });

      if (!historicalData || historicalData.length === 0) {
        return { level: 'moderate', multiplier: 1.0, confidence: 'low' };
      }

      // Get the most recent blocks (last 10 blocks or fewer)
      const recentBlocks = historicalData.slice(-Math.min(10, historicalData.length));

      // Calculate average utilization
      let totalUtilization = 0;
      let count = 0;

      for (const block of recentBlocks) {
        if (block.utilization) {
          totalUtilization += parseFloat(block.utilization);
          count++;
        }
      }

      const avgUtilization = count > 0 ? totalUtilization / count : 50;

      // Determine congestion level
      let level, multiplier;

      if (avgUtilization < 40) {
        level = 'low';
        multiplier = this.config.networkCongestionLevels.low.multiplier;
      } else if (avgUtilization < 70) {
        level = 'moderate';
        multiplier = this.config.networkCongestionLevels.moderate.multiplier;
      } else if (avgUtilization < 90) {
        level = 'high';
        multiplier = this.config.networkCongestionLevels.high.multiplier;
      } else {
        level = 'extreme';
        multiplier = this.config.networkCongestionLevels.extreme.multiplier;
      }

      // Calculate recent priority fee trend
      const priorityFeeTrend = this.calculatePriorityFeeTrend(recentBlocks);

      const result = {
        level,
        multiplier,
        utilization: avgUtilization,
        priorityFeeTrend,
        confidence: count >= 5 ? 'high' : 'medium',
        blockCount: count,
      };

      // Cache the result
      this.congestionCache.set(cacheKey, {
        timestamp: Date.now(),
        data: result,
      });

      return result;
    } catch (error) {
      console.error(`Error getting network congestion for ${network}:`, error);
      return { level: 'moderate', multiplier: 1.0, confidence: 'low' };
    }
  }

  /**
   * Calculate priority fee trend
   * @param {Array} recentBlocks - Recent block data
   * @returns {Object} Priority fee trend
   */
  calculatePriorityFeeTrend(recentBlocks) {
    if (recentBlocks.length < 2) {
      return { direction: 'stable', magnitude: 0 };
    }

    // Extract priority fees
    const priorityFees = recentBlocks
      .filter(block => block.maxPriorityFeePerGas)
      .map(block => parseInt(block.maxPriorityFeePerGas) / 1e9);

    if (priorityFees.length < 2) {
      return { direction: 'stable', magnitude: 0 };
    }

    // Calculate average change
    let totalChange = 0;
    for (let i = 1; i < priorityFees.length; i++) {
      totalChange += (priorityFees[i] - priorityFees[i - 1]) / priorityFees[i - 1];
    }

    const avgChange = totalChange / (priorityFees.length - 1);

    // Determine trend direction and magnitude
    let direction;
    if (Math.abs(avgChange) < 0.05) {
      direction = 'stable';
    } else if (avgChange > 0) {
      direction = 'increasing';
    } else {
      direction = 'decreasing';
    }

    return {
      direction,
      magnitude: Math.abs(avgChange),
      avgChangePercent: avgChange * 100,
    };
  }

  /**
   * Get transaction type modifier
   * @param {string} txType - Transaction type
   * @returns {number} Transaction type modifier
   */
  getTransactionTypeModifier(txType) {
    const modifiers = {
      standard: 1.0,
      contract_deployment: 1.2,
      contract_interaction: 1.1,
      defi_swap: 1.15,
      nft_mint: 1.2,
      nft_transfer: 1.05,
      bridge_deposit: 1.1,
      bridge_withdrawal: 1.15,
    };

    return modifiers[txType] || 1.0;
  }

  /**
   * Calculate optimal priority fee
   * @param {string} network - Target network
   * @param {Object} historicalData - Historical gas data
   * @param {Object} urgencyConfig - Urgency configuration
   * @param {Object} congestion - Network congestion data
   * @param {number} txTypeModifier - Transaction type modifier
   * @param {Object} options - Additional options
   * @returns {Object} Priority fee calculation
   */
  calculatePriorityFee(
    network,
    historicalData,
    urgencyConfig,
    congestion,
    txTypeModifier,
    options
  ) {
    // Extract priority fee percentile
    const percentile = urgencyConfig.percentile;
    const percentileKey = `p${percentile}`;

    if (!historicalData.priorityFee || !historicalData.priorityFee[percentileKey]) {
      throw new Error(`Priority fee data not available for percentile: ${percentile}`);
    }

    const percentileValue = historicalData.priorityFee[percentileKey];

    // Apply urgency multiplier
    let priorityFee = percentileValue * urgencyConfig.multiplier;

    // Apply congestion multiplier
    priorityFee *= congestion.multiplier;

    // Apply transaction type modifier
    priorityFee *= txTypeModifier;

    // Apply network-specific block producer sensitivity
    const sensitivity = this.config.blockProducerSensitivity[network] || 0.5;
    if (sensitivity > 0.6 && urgencyConfig.inclusionProbability > 0.9) {
      // For high sensitivity networks, increase priority fee to ensure inclusion
      priorityFee *= 1 + (sensitivity - 0.6) * 2;
    }

    // Apply time-based adjustment if available
    let timeAdjustment = 1.0;
    if (historicalData.timeOfDay) {
      timeAdjustment = this.calculateTimeBasedAdjustment(historicalData);
      priorityFee *= timeAdjustment;
    }

    // Apply inclusion deadline adjustment if specified
    if (options.inclusionDeadline) {
      const deadlineAdjustment = this.calculateDeadlineAdjustment(
        options.inclusionDeadline,
        network
      );
      priorityFee *= deadlineAdjustment.multiplier;
    }

    return {
      maxPriorityFeePerGas: priorityFee,
      percentileValue,
      timeAdjustment,
    };
  }

  /**
   * Calculate time-based adjustment factor
   * @param {Object} historicalData - Historical gas data
   * @returns {number} Time adjustment factor
   */
  calculateTimeBasedAdjustment(historicalData) {
    const now = new Date();
    const currentHour = now.getUTCHours();
    const currentHourStr = `${currentHour}`.padStart(2, '0');

    // Get current hour stats
    const currentHourStats = historicalData.timeOfDay[currentHourStr];

    if (!currentHourStats) {
      return 1.0;
    }

    // Compare current hour to overall average
    const hourlyMean = currentHourStats.mean;
    const overallMean = historicalData.priorityFee.mean;

    // Calculate ratio of current hour to overall
    const ratio = hourlyMean / overallMean;

    // Apply time-based multiplier (max ±20% adjustment)
    return Math.max(0.8, Math.min(1.2, ratio));
  }

  /**
   * Calculate deadline-based adjustment
   * @param {Date|number} deadline - Inclusion deadline
   * @param {string} network - Target network
   * @returns {Object} Deadline adjustment
   */
  calculateDeadlineAdjustment(deadline, network) {
    const now = Date.now();
    let deadlineMs;

    if (deadline instanceof Date) {
      deadlineMs = deadline.getTime();
    } else if (typeof deadline === 'number') {
      deadlineMs = deadline;
    } else {
      return { multiplier: 1.0, reason: 'invalid deadline' };
    }

    // Calculate time until deadline
    const timeUntilDeadline = deadlineMs - now;

    if (timeUntilDeadline <= 0) {
      // Already past deadline, use maximum urgency
      return { multiplier: 3.0, reason: 'past deadline' };
    }

    // Get block time for network
    const blockTimeSeconds = this.getNetworkBlockTime(network);
    const blockTimeMs = blockTimeSeconds * 1000;

    // Calculate blocks until deadline
    const blocksUntilDeadline = timeUntilDeadline / blockTimeMs;

    // Adjust multiplier based on blocks until deadline
    if (blocksUntilDeadline < 1) {
      return { multiplier: 2.5, reason: 'immediate (next block)' };
    } else if (blocksUntilDeadline < 3) {
      return { multiplier: 2.0, reason: 'very urgent (< 3 blocks)' };
    } else if (blocksUntilDeadline < 10) {
      return { multiplier: 1.5, reason: 'urgent (< 10 blocks)' };
    } else if (blocksUntilDeadline < 20) {
      return { multiplier: 1.2, reason: 'soon (< 20 blocks)' };
    } else {
      return { multiplier: 1.0, reason: 'sufficient time' };
    }
  }

  /**
   * Calculate inclusion probability for a priority fee
   * @param {number} priorityFee - Priority fee in Gwei
   * @param {Object} historicalData - Historical gas data
   * @param {Object} congestion - Network congestion data
   * @param {string} network - Target network
   * @returns {number} Inclusion probability (0-1)
   */
  calculateInclusionProbability(priorityFee, historicalData, congestion, network) {
    // Get percentiles for reference
    const p10 = historicalData.priorityFee.p10 || 0;
    const p50 = historicalData.priorityFee.p50 || 0;
    const p90 = historicalData.priorityFee.p90 || p50 * 2;

    // Base probability calculation
    let probability;

    if (priorityFee <= p10) {
      // Below p10, low probability
      probability = 0.5 * (priorityFee / p10);
    } else if (priorityFee <= p50) {
      // Between p10 and p50
      probability = 0.5 + 0.4 * ((priorityFee - p10) / (p50 - p10));
    } else if (priorityFee <= p90) {
      // Between p50 and p90
      probability = 0.9 + 0.09 * ((priorityFee - p50) / (p90 - p50));
    } else {
      // Above p90, very high probability
      probability = 0.99 + 0.01 * Math.min(1, (priorityFee - p90) / p90);
    }

    // Adjust for congestion
    if (congestion.level === 'high') {
      probability *= 0.9;
    } else if (congestion.level === 'extreme') {
      probability *= 0.7;
    }

    // Adjust for network sensitivity
    const sensitivity = this.config.blockProducerSensitivity[network] || 0.5;
    if (sensitivity < 0.5) {
      // Lower sensitivity means less predictable inclusion by priority fee
      probability = 0.5 + (probability - 0.5) * (sensitivity * 2);
    }

    // Ensure probability is between 0 and 1
    return Math.max(0, Math.min(1, probability));
  }

  /**
   * Calculate expected blocks to wait for inclusion
   * @param {number} probability - Inclusion probability
   * @param {Object} urgencyConfig - Urgency configuration
   * @returns {number} Expected blocks to wait
   */
  calculateWaitBlocks(probability, urgencyConfig) {
    if (probability >= 0.98) return 0;
    if (probability >= 0.9) return 1;
    if (probability >= 0.8) return 2;
    if (probability >= 0.7) return 3;
    if (probability >= 0.5) return 5;
    return urgencyConfig.maxWaitBlocks;
  }

  /**
   * Get block time for network in seconds
   * @param {string} network - Network name
   * @returns {number} Block time in seconds
   */
  getNetworkBlockTime(network) {
    const blockTimes = {
      mainnet: 12,
      arbitrum: 0.25,
      optimism: 2,
      polygon: 2,
      base: 2,
    };

    return blockTimes[network] || 12;
  }

  /**
   * Calculate wait time in seconds
   * @param {string} network - Network name
   * @param {number} blocks - Blocks to wait
   * @returns {number} Wait time in seconds
   */
  calculateWaitTime(network, blocks) {
    const blockTime = this.getNetworkBlockTime(network);
    return blockTime * blocks;
  }

  /**
   * Get all priority fee recommendations for different urgency levels
   * @param {string} network - Target network
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} Priority fee recommendations
   */
  async getAllUrgencyLevels(network, options = {}) {
    const urgencyLevels = Object.keys(this.config.defaultUrgencyLevels);
    const results = {};

    for (const urgency of urgencyLevels) {
      results[urgency] = await this.calculateOptimalPriorityFee(network, { ...options, urgency });
    }

    return {
      network,
      timestamp: Date.now(),
      congestionLevel: results[urgencyLevels[0]].congestionLevel,
      recommendations: results,
    };
  }
}

module.exports = PriorityFeeOptimizer;
