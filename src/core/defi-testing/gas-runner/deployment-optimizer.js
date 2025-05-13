/**
 * Deployment Optimizer
 *
 * Analyzes historical gas price patterns to recommend optimal contract
 * deployment timing to minimize gas costs.
 */

const moment = require('moment');

class DeploymentOptimizer {
  constructor(config = {}) {
    this.config = {
      forecastHours: 24, // Forecast window in hours
      minimumDataPoints: 48, // Minimum data points required for reliable forecasting
      gasLimitMultiplier: 1.1, // Add 10% to estimated gas limit
      confidenceScoreThresholds: {
        high: 0.8,
        medium: 0.6,
        low: 0.4,
      },
      urgencyLevel: 'medium', // Default urgency level for fee calculation
      deploymentTimeWindows: [
        { name: 'immediate', hoursAhead: 0 },
        { name: 'today', hoursAhead: 12 },
        { name: 'tomorrow', hoursAhead: 36 },
        { name: 'week', hoursAhead: 168 }, // 7 days
      ],
      ...config,
    };

    // Store references to required components
    this.historicalAnalyzer = config.historicalAnalyzer;
    this.feeCalculator = config.feeCalculator;

    if (!this.historicalAnalyzer) {
      throw new Error('DeploymentOptimizer requires a historical analyzer instance');
    }

    if (!this.feeCalculator) {
      throw new Error('DeploymentOptimizer requires a fee calculator instance');
    }
  }

  /**
   * Find optimal deployment time within a specified window
   * @param {Object} options - Deployment options
   * @returns {Promise<Object>} Optimal deployment recommendations
   */
  async findOptimalDeploymentTime(options = {}) {
    const {
      network = 'mainnet',
      estimatedGasLimit = 3000000, // Default for complex contract deployment
      deploymentWindows = this.config.deploymentTimeWindows,
      urgencyLevel = this.config.urgencyLevel,
      timeZone = 'UTC',
      additionalCostFactors = {},
      maxAcceptableGasPrice = null,
      predictUtilization = true,
    } = options;

    // Get historical gas price data for analysis
    const historicalData = await this.historicalAnalyzer.analyzeGasPrices(network, {
      timeWindow: '7d', // Use 7 days of data for better pattern detection
      includeTimeOfDay: true,
      includeDayOfWeek: true,
    });

    if (historicalData.dataPoints < this.config.minimumDataPoints) {
      throw new Error(
        `Insufficient historical data points (${historicalData.dataPoints}) for reliable forecasting`
      );
    }

    // Calculate adjusted gas limit with safety margin
    const adjustedGasLimit = Math.ceil(estimatedGasLimit * this.config.gasLimitMultiplier);

    // Analyze patterns to identify optimal deployment windows
    const hourlyPatterns = this.analyzeHourlyPatterns(historicalData);
    const dailyPatterns = this.analyzeDailyPatterns(historicalData);

    // Generate recommendations for different time windows
    const recommendations = await this.generateDeploymentRecommendations(
      network,
      hourlyPatterns,
      dailyPatterns,
      deploymentWindows,
      urgencyLevel,
      adjustedGasLimit,
      timeZone,
      additionalCostFactors,
      maxAcceptableGasPrice
    );

    // Find optimal recommendation
    const optimalRecommendation = this.findOptimalRecommendation(recommendations);

    return {
      network,
      timestamp: Date.now(),
      estimatedGasLimit,
      adjustedGasLimit,
      recommendations,
      optimalRecommendation,
      patterns: {
        hourly: hourlyPatterns,
        daily: dailyPatterns,
      },
      timeZone,
    };
  }

  /**
   * Analyze hourly gas price patterns
   * @param {Object} historicalData - Historical gas data analysis
   * @returns {Object} Hourly pattern analysis
   */
  analyzeHourlyPatterns(historicalData) {
    const hourlyData = historicalData.timeOfDay;
    if (!hourlyData) return null;

    // Find hours with lowest and highest gas prices
    const hourlyEntries = Object.entries(hourlyData).map(([hour, stats]) => ({
      hour: parseInt(hour),
      mean: stats.mean,
      median: stats.median,
      stdDev: stats.stdDev,
    }));

    // Sort by average gas price
    const sortedHours = [...hourlyEntries].sort((a, b) => a.mean - b.mean);

    // Calculate relative cost for each hour (lowest = 1.0)
    const lowestPrice = sortedHours[0].mean;
    const hourlyPatterns = sortedHours.map(entry => ({
      ...entry,
      relativeCost: entry.mean / lowestPrice,
      costCategory: this.categorizeCost(entry.mean / lowestPrice),
    }));

    // Find optimal hours (lowest 25% of prices)
    const optimalHours = hourlyPatterns
      .filter((_, index) => index < hourlyPatterns.length * 0.25)
      .map(entry => entry.hour);

    // Find high-cost hours (highest 25% of prices)
    const highCostHours = hourlyPatterns
      .filter((_, index) => index >= hourlyPatterns.length * 0.75)
      .map(entry => entry.hour);

    // Calculate hourly volatility (variation from hour to hour)
    let hourlyVolatility = 0;
    for (let i = 1; i < 24; i++) {
      const prevHour =
        hourlyEntries.find(e => e.hour === i - 1) || hourlyEntries.find(e => e.hour === 23);
      const currHour = hourlyEntries.find(e => e.hour === i);

      if (prevHour && currHour) {
        const hourlyChange = Math.abs(currHour.mean - prevHour.mean) / prevHour.mean;
        hourlyVolatility += hourlyChange;
      }
    }
    hourlyVolatility /= 23; // Average volatility

    return {
      hourlyData: hourlyPatterns,
      optimalHours,
      highCostHours,
      hourlyVolatility,
      volatilityCategory: this.categorizeVolatility(hourlyVolatility),
      lowestHour: sortedHours[0].hour,
      lowestPrice: sortedHours[0].mean,
      highestHour: sortedHours[sortedHours.length - 1].hour,
      highestPrice: sortedHours[sortedHours.length - 1].mean,
      priceRatio: sortedHours[sortedHours.length - 1].mean / sortedHours[0].mean,
    };
  }

  /**
   * Analyze daily gas price patterns
   * @param {Object} historicalData - Historical gas data analysis
   * @returns {Object} Daily pattern analysis
   */
  analyzeDailyPatterns(historicalData) {
    const dailyData = historicalData.dayOfWeek;
    if (!dailyData) return null;

    // Find days with lowest and highest gas prices
    const dailyEntries = Object.entries(dailyData).map(([day, stats]) => ({
      day,
      dayIndex: this.getDayIndex(day),
      mean: stats.mean,
      median: stats.median,
      stdDev: stats.stdDev,
    }));

    // Sort by average gas price
    const sortedDays = [...dailyEntries].sort((a, b) => a.mean - b.mean);

    // Calculate relative cost for each day (lowest = 1.0)
    const lowestPrice = sortedDays[0].mean;
    const dailyPatterns = sortedDays.map(entry => ({
      ...entry,
      relativeCost: entry.mean / lowestPrice,
      costCategory: this.categorizeCost(entry.mean / lowestPrice),
    }));

    // Find optimal days (lowest 40% of prices)
    const optimalDays = dailyPatterns
      .filter((_, index) => index < Math.ceil(dailyPatterns.length * 0.4))
      .map(entry => entry.day);

    // Find high-cost days (highest 40% of prices)
    const highCostDays = dailyPatterns
      .filter((_, index) => index >= Math.floor(dailyPatterns.length * 0.6))
      .map(entry => entry.day);

    return {
      dailyData: dailyPatterns,
      optimalDays,
      highCostDays,
      lowestDay: sortedDays[0].day,
      lowestPrice: sortedDays[0].mean,
      highestDay: sortedDays[sortedDays.length - 1].day,
      highestPrice: sortedDays[sortedDays.length - 1].mean,
      priceRatio: sortedDays[sortedDays.length - 1].mean / sortedDays[0].mean,
    };
  }

  /**
   * Categorize cost level
   * @param {number} relativeCost - Relative cost ratio
   * @returns {string} Cost category
   */
  categorizeCost(relativeCost) {
    if (relativeCost < 1.1) return 'optimal';
    if (relativeCost < 1.3) return 'low';
    if (relativeCost < 1.6) return 'medium';
    if (relativeCost < 2.0) return 'high';
    return 'very high';
  }

  /**
   * Categorize volatility level
   * @param {number} volatility - Volatility value
   * @returns {string} Volatility category
   */
  categorizeVolatility(volatility) {
    if (volatility < 0.05) return 'very low';
    if (volatility < 0.1) return 'low';
    if (volatility < 0.2) return 'medium';
    if (volatility < 0.3) return 'high';
    return 'very high';
  }

  /**
   * Get day index for sorting
   * @param {string} day - Day name
   * @returns {number} Day index (0-6)
   */
  getDayIndex(day) {
    const days = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };
    return days[day.toLowerCase()] || 0;
  }

  /**
   * Generate deployment recommendations for different time windows
   * @param {string} network - Network name
   * @param {Object} hourlyPatterns - Hourly pattern analysis
   * @param {Object} dailyPatterns - Daily pattern analysis
   * @param {Array} deploymentWindows - Deployment time windows to consider
   * @param {string} urgencyLevel - Urgency level for fee calculation
   * @param {number} adjustedGasLimit - Adjusted gas limit
   * @param {string} timeZone - Time zone for timestamps
   * @param {Object} additionalCostFactors - Additional cost factors to consider
   * @param {number} maxAcceptableGasPrice - Maximum acceptable gas price
   * @returns {Promise<Array>} Deployment recommendations
   */
  async generateDeploymentRecommendations(
    network,
    hourlyPatterns,
    dailyPatterns,
    deploymentWindows,
    urgencyLevel,
    adjustedGasLimit,
    timeZone,
    additionalCostFactors,
    maxAcceptableGasPrice
  ) {
    const now = new Date();
    const recommendations = [];

    for (const window of deploymentWindows) {
      // Target timestamp for this window
      const targetTime = new Date(now.getTime() + window.hoursAhead * 60 * 60 * 1000);

      // Get fee estimates for the target time
      const optimalFees = await this.predictFeesForTargetTime(
        network,
        targetTime,
        hourlyPatterns,
        dailyPatterns,
        urgencyLevel
      );

      // Skip if gas price exceeds maximum acceptable price
      if (maxAcceptableGasPrice !== null) {
        const gasPrice = optimalFees.maxFeePerGas || optimalFees.gasPrice;
        if (gasPrice > maxAcceptableGasPrice) {
          continue;
        }
      }

      // Calculate total cost
      const totalCost = this.calculateDeploymentCost(
        optimalFees,
        adjustedGasLimit,
        additionalCostFactors
      );

      // Calculate confidence score for this recommendation
      const confidenceScore = this.calculateConfidenceScore(
        hourlyPatterns,
        dailyPatterns,
        targetTime,
        optimalFees
      );

      // Format target time
      const formattedTime = moment(targetTime).format('YYYY-MM-DD HH:mm:ss');
      const formattedLocalTime =
        timeZone === 'UTC'
          ? formattedTime
          : moment(targetTime).tz(timeZone).format('YYYY-MM-DD HH:mm:ss');

      // Create recommendation
      recommendations.push({
        window: window.name,
        timestamp: targetTime.getTime(),
        formattedTime,
        formattedLocalTime,
        timeZone,
        fees: optimalFees,
        totalCost,
        costETH: totalCost / 1e9, // Convert Gwei to ETH
        confidenceScore,
        confidenceLevel: this.getConfidenceLevel(confidenceScore),
        hourOfDay: targetTime.getUTCHours(),
        dayOfWeek: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][
          targetTime.getUTCDay()
        ],
      });
    }

    // Sort recommendations by total cost
    return recommendations.sort((a, b) => a.totalCost - b.totalCost);
  }

  /**
   * Predict gas fees for a target time
   * @param {string} network - Network name
   * @param {Date} targetTime - Target deployment time
   * @param {Object} hourlyPatterns - Hourly pattern analysis
   * @param {Object} dailyPatterns - Daily pattern analysis
   * @param {string} urgencyLevel - Urgency level for fee calculation
   * @returns {Promise<Object>} Predicted fee parameters
   */
  async predictFeesForTargetTime(network, targetTime, hourlyPatterns, dailyPatterns, urgencyLevel) {
    // Get current fee estimates
    const currentFees = await this.feeCalculator.calculateOptimalFees(network, urgencyLevel);

    // If no pattern data available, just return current fees
    if (!hourlyPatterns || !dailyPatterns) {
      return currentFees;
    }

    // Get target hour and day
    const targetHour = targetTime.getUTCHours();
    const targetDay = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ][targetTime.getUTCDay()];

    // Find hourly adjustment factor
    const hourlyPattern = hourlyPatterns.hourlyData.find(h => h.hour === targetHour);
    const hourlyFactor = hourlyPattern ? hourlyPattern.relativeCost : 1.0;

    // Find daily adjustment factor
    const dailyPattern = dailyPatterns.dailyData.find(d => d.day === targetDay);
    const dailyFactor = dailyPattern ? dailyPattern.relativeCost : 1.0;

    // Calculate combined adjustment factor
    // We give more weight to hourly patterns (70%) than daily patterns (30%)
    const combinedFactor = hourlyFactor * 0.7 + dailyFactor * 0.3;

    // Clone current fees and adjust based on factors
    const predictedFees = { ...currentFees };

    if (predictedFees.maxFeePerGas) {
      predictedFees.maxFeePerGas *= combinedFactor;
    }

    if (predictedFees.maxPriorityFeePerGas) {
      predictedFees.maxPriorityFeePerGas *= combinedFactor;
    }

    if (predictedFees.gasPrice) {
      predictedFees.gasPrice *= combinedFactor;
    }

    if (predictedFees.estimatedBaseFee) {
      predictedFees.estimatedBaseFee *= combinedFactor;
    }

    // Round values and add prediction metadata
    this.feeCalculator.roundFeeValues(predictedFees);

    predictedFees.prediction = {
      targetHour,
      targetDay,
      hourlyFactor,
      dailyFactor,
      combinedFactor,
      basedOn: currentFees,
    };

    return predictedFees;
  }

  /**
   * Calculate total deployment cost
   * @param {Object} fees - Fee parameters
   * @param {number} gasLimit - Gas limit
   * @param {Object} additionalCostFactors - Additional cost factors
   * @returns {number} Total cost in Gwei
   */
  calculateDeploymentCost(fees, gasLimit, additionalCostFactors = {}) {
    // Determine gas price to use
    let gasPrice;

    if (fees.maxFeePerGas) {
      // For EIP-1559 transactions, use maxFeePerGas for worst-case cost estimation
      gasPrice = fees.maxFeePerGas;
    } else {
      // For legacy transactions, use gasPrice
      gasPrice = fees.gasPrice;
    }

    // Calculate base cost
    let totalCost = gasPrice * gasLimit;

    // Add additional cost factors
    const { callDataCost = 0, storageCost = 0, riskPremium = 0 } = additionalCostFactors;

    totalCost += callDataCost + storageCost + riskPremium;

    return totalCost;
  }

  /**
   * Calculate confidence score for a recommendation
   * @param {Object} hourlyPatterns - Hourly pattern analysis
   * @param {Object} dailyPatterns - Daily pattern analysis
   * @param {Date} targetTime - Target deployment time
   * @param {Object} fees - Fee parameters
   * @returns {number} Confidence score (0-1)
   */
  calculateConfidenceScore(hourlyPatterns, dailyPatterns, targetTime, fees) {
    // If no pattern data, use low confidence
    if (!hourlyPatterns || !dailyPatterns) {
      return 0.3;
    }

    // Calculate time-based confidence
    const hoursAhead = (targetTime.getTime() - Date.now()) / (60 * 60 * 1000);

    // Confidence decreases with time into the future
    // Highest confidence (1.0) for immediate, lowest (0.3) for a week ahead
    const timeConfidence = Math.max(0.3, 1.0 - (hoursAhead / 168) * 0.7);

    // Calculate pattern-based confidence
    const targetHour = targetTime.getUTCHours();
    const targetDay = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ][targetTime.getUTCDay()];

    // Check if target time is in optimal hours
    const isOptimalHour = hourlyPatterns.optimalHours.includes(targetHour);

    // Check if target day is in optimal days
    const isOptimalDay = dailyPatterns.optimalDays.includes(targetDay);

    // Higher confidence if both day and hour are optimal
    let patternConfidence = 0.5; // Base confidence

    if (isOptimalHour && isOptimalDay) {
      patternConfidence = 0.9;
    } else if (isOptimalHour) {
      patternConfidence = 0.8;
    } else if (isOptimalDay) {
      patternConfidence = 0.7;
    }

    // Adjust for volatility
    // Lower confidence with higher volatility
    let volatilityAdjustment = 1.0;

    if (hourlyPatterns.volatilityCategory === 'very high') {
      volatilityAdjustment = 0.7;
    } else if (hourlyPatterns.volatilityCategory === 'high') {
      volatilityAdjustment = 0.8;
    } else if (hourlyPatterns.volatilityCategory === 'medium') {
      volatilityAdjustment = 0.9;
    }

    // Combine factors (time confidence is weighted higher)
    const combinedScore = timeConfidence * 0.6 + patternConfidence * 0.4;

    // Apply volatility adjustment
    return combinedScore * volatilityAdjustment;
  }

  /**
   * Get confidence level from confidence score
   * @param {number} score - Confidence score
   * @returns {string} Confidence level
   */
  getConfidenceLevel(score) {
    const { high, medium, low } = this.config.confidenceScoreThresholds;

    if (score >= high) return 'high';
    if (score >= medium) return 'medium';
    if (score >= low) return 'low';
    return 'very low';
  }

  /**
   * Find optimal recommendation among candidates
   * @param {Array} recommendations - List of recommendations
   * @returns {Object} Optimal recommendation
   */
  findOptimalRecommendation(recommendations) {
    if (recommendations.length === 0) {
      return null;
    }

    // Sort by cost first, then by confidence
    const sortedByValue = [...recommendations].sort((a, b) => {
      // Primary sort by cost
      const costDiff = a.totalCost - b.totalCost;

      if (costDiff !== 0) {
        return costDiff;
      }

      // Secondary sort by confidence (higher is better)
      return b.confidenceScore - a.confidenceScore;
    });

    // Sort by a combined score of cost and confidence
    const combinedSorted = [...recommendations].sort((a, b) => {
      // Normalize cost (lower is better)
      const maxCost = Math.max(...recommendations.map(r => r.totalCost));
      const minCost = Math.min(...recommendations.map(r => r.totalCost));
      const costRange = maxCost - minCost;

      const aNormalizedCost = costRange === 0 ? 1 : 1 - (a.totalCost - minCost) / costRange;
      const bNormalizedCost = costRange === 0 ? 1 : 1 - (b.totalCost - minCost) / costRange;

      // Combined score (70% cost, 30% confidence)
      const aScore = aNormalizedCost * 0.7 + a.confidenceScore * 0.3;
      const bScore = bNormalizedCost * 0.7 + b.confidenceScore * 0.3;

      return bScore - aScore;
    });

    // Return the recommendation with the best combined score
    return {
      bestValue: sortedByValue[0],
      bestCombined: combinedSorted[0],
      recommended: combinedSorted[0],
    };
  }
}

module.exports = DeploymentOptimizer;
