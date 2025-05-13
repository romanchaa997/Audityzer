/**
 * Gas Price Predictor
 *
 * Provides predictive models for gas prices across different networks,
 * using historical data analysis and machine learning techniques to
 * forecast short and medium-term gas price movements.
 */

const moment = require('moment');

class GasPricePredictor {
  constructor(config = {}) {
    this.config = {
      predictionWindows: {
        short: '1h', // Short-term: next hour
        medium: '12h', // Medium-term: next 12 hours
        long: '24h', // Long-term: next 24 hours
      },
      confidenceIntervals: [80, 95], // Confidence intervals to calculate
      minimumDataPoints: 100, // Minimum data points required for reliable prediction
      smoothingFactor: 0.3, // Exponential smoothing factor
      volatilityThreshold: 20, // Volatility threshold in percentage
      ...config,
    };

    // Store reference to historical analyzer
    this.historicalAnalyzer = config.historicalAnalyzer;

    if (!this.historicalAnalyzer) {
      throw new Error('GasPricePredictor requires a historical analyzer instance');
    }

    // Cache for predictions to avoid redundant calculations
    this.predictionCache = new Map();
    this.cacheTTL = 15 * 60 * 1000; // 15 minutes cache TTL

    // Initialize prediction models for each network
    this.models = new Map();
  }

  /**
   * Generate a cache key for predictions
   * @param {string} network - Network name
   * @param {string} window - Prediction window
   * @param {string} timestamp - Timestamp for invalidation
   * @returns {string} Cache key
   */
  getCacheKey(network, window, timestamp) {
    return `${network}-${window}-${timestamp}`;
  }

  /**
   * Check if a cached prediction is still valid
   * @param {Object} cachedPrediction - Cached prediction
   * @returns {boolean} Whether the cache is still valid
   */
  isCacheValid(cachedPrediction) {
    if (!cachedPrediction) return false;

    const now = Date.now();
    return now - cachedPrediction.timestamp < this.cacheTTL;
  }

  /**
   * Predict gas prices for a specific network and time window
   * @param {string} network - Target network
   * @param {Object} options - Prediction options
   * @returns {Promise<Object>} Gas price predictions
   */
  async predictPrices(network, options = {}) {
    const {
      window = 'medium',
      includeVolatility = true,
      includeConfidenceIntervals = true,
      historicalWindow = '7d',
    } = options;

    // Validate prediction window
    const predictionWindow =
      this.config.predictionWindows[window] || this.config.predictionWindows.medium;

    // Check if we have a valid cached prediction
    const cacheKey = this.getCacheKey(
      network,
      predictionWindow,
      Math.floor(Date.now() / this.cacheTTL)
    );

    const cachedPrediction = this.predictionCache.get(cacheKey);

    if (this.isCacheValid(cachedPrediction)) {
      return cachedPrediction.prediction;
    }

    // Get historical data for analysis
    const historicalData = await this.historicalAnalyzer.getHistoricalData(network);

    if (historicalData.length < this.config.minimumDataPoints) {
      throw new Error(
        `Insufficient data for reliable prediction. Found ${historicalData.length} data points, ` +
          `but need at least ${this.config.minimumDataPoints}.`
      );
    }

    // Filter data based on historical window
    const filteredData = this.filterHistoricalData(historicalData, historicalWindow);

    // Generate prediction
    const prediction = this.generatePrediction(filteredData, predictionWindow, network, options);

    // Add metadata
    prediction.network = network;
    prediction.predictionWindow = predictionWindow;
    prediction.generatedAt = new Date().toISOString();
    prediction.basedOn = {
      dataPoints: filteredData.length,
      fromDate: new Date(filteredData[0].timestamp).toISOString(),
      toDate: new Date(filteredData[filteredData.length - 1].timestamp).toISOString(),
    };

    // Cache prediction
    this.predictionCache.set(cacheKey, {
      timestamp: Date.now(),
      prediction,
    });

    return prediction;
  }

  /**
   * Filter historical data based on time window
   * @param {Array} historicalData - Raw historical data
   * @param {string} timeWindow - Time window to filter
   * @returns {Array} Filtered historical data
   */
  filterHistoricalData(historicalData, timeWindow) {
    // Parse time window to milliseconds
    const windowMs = this.parseTimeWindow(timeWindow);
    const cutoffTime = Date.now() - windowMs;

    // Filter data
    return historicalData.filter(entry => entry.timestamp > cutoffTime);
  }

  /**
   * Parse time window string to milliseconds
   * @param {string} window - Time window string (e.g., '7d', '12h')
   * @returns {number} Time window in milliseconds
   */
  parseTimeWindow(window) {
    const value = parseInt(window);
    const unit = window.slice(-1).toLowerCase();

    switch (unit) {
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      case 'h':
        return value * 60 * 60 * 1000;
      case 'm':
        return value * 60 * 1000;
      default:
        return 7 * 24 * 60 * 60 * 1000; // Default to 7 days
    }
  }

  /**
   * Generate gas price prediction
   * @param {Array} data - Historical gas data
   * @param {string} predictionWindow - Time window to predict
   * @param {string} network - Target network
   * @param {Object} options - Prediction options
   * @returns {Object} Prediction results
   */
  generatePrediction(data, predictionWindow, network, options) {
    // Extract timestamps and gas prices
    const timePoints = data.map(entry => entry.timestamp);
    const gasPrices = data
      .map(entry => (entry.gasPrice ? parseInt(entry.gasPrice) / 1e9 : null))
      .filter((price, index) => price !== null && timePoints[index] !== undefined);

    // Check for EIP-1559 support
    const hasEIP1559 = data.some(entry => entry.baseFeePerGas && entry.maxPriorityFeePerGas);

    // Initialize prediction result
    const prediction = {
      type: hasEIP1559 ? 'eip1559' : 'legacy',
      window: predictionWindow,
    };

    // Add time series models
    prediction.models = this.applyTimeSeries(timePoints, gasPrices, predictionWindow);

    // Add base fee and priority fee predictions for EIP-1559 networks
    if (hasEIP1559) {
      const baseFees = data
        .map(entry => (entry.baseFeePerGas ? parseInt(entry.baseFeePerGas) / 1e9 : null))
        .filter(fee => fee !== null);

      const priorityFees = data
        .map(entry =>
          entry.maxPriorityFeePerGas ? parseInt(entry.maxPriorityFeePerGas) / 1e9 : null
        )
        .filter(fee => fee !== null);

      prediction.baseFee = this.predictEIP1559Component(baseFees, 'baseFee', predictionWindow);
      prediction.priorityFee = this.predictEIP1559Component(
        priorityFees,
        'priorityFee',
        predictionWindow
      );
    }

    // Calculate prediction intervals if requested
    if (options.includeConfidenceIntervals) {
      prediction.confidenceIntervals = this.calculateConfidenceIntervals(
        gasPrices,
        prediction.models.trend.slope,
        this.config.confidenceIntervals
      );
    }

    // Add volatility analysis if requested
    if (options.includeVolatility) {
      prediction.volatility = this.analyzeVolatility(gasPrices);
    }

    // Add hourly predictions
    prediction.hourlyPredictions = this.generateHourlyPredictions(
      gasPrices,
      prediction.models,
      this.parseTimeWindow(predictionWindow) / (60 * 60 * 1000)
    );

    // Generate recommended fee strategy
    prediction.recommendedFees = this.generateFeeRecommendations(prediction, hasEIP1559, network);

    return prediction;
  }

  /**
   * Apply time series models to historical data
   * @param {Array} timePoints - Array of timestamps
   * @param {Array} gasPrices - Array of gas prices
   * @param {string} predictionWindow - Time window to predict
   * @returns {Object} Time series model results
   */
  applyTimeSeries(timePoints, gasPrices, predictionWindow) {
    // Calculate trend using linear regression
    const trend = this.calculateLinearTrend(timePoints, gasPrices);

    // Calculate moving averages
    const movingAverages = this.calculateMovingAverages(gasPrices);

    // Apply exponential smoothing
    const smoothed = this.applyExponentialSmoothing(gasPrices, this.config.smoothingFactor);

    // Extrapolate future values
    const horizon = this.parseTimeWindow(predictionWindow);
    const futureHours = horizon / (60 * 60 * 1000);
    const predictions = {
      trend: trend.intercept + trend.slope * (Date.now() + horizon),
      exponential: smoothed.nextValue,
    };

    return {
      trend,
      movingAverages,
      smoothed,
      predictions,
      forecastHorizon: futureHours,
    };
  }

  /**
   * Calculate linear trend using linear regression
   * @param {Array} timePoints - Array of timestamps
   * @param {Array} gasPrices - Array of gas prices
   * @returns {Object} Linear regression results
   */
  calculateLinearTrend(timePoints, gasPrices) {
    const n = timePoints.length;

    // Normalize timestamps to make calculations more numerically stable
    const normalizedTimes = timePoints.map(t => (t - timePoints[0]) / (60 * 60 * 1000)); // in hours

    // Calculate means
    const meanX = normalizedTimes.reduce((sum, x) => sum + x, 0) / n;
    const meanY = gasPrices.reduce((sum, y) => sum + y, 0) / n;

    // Calculate slope and intercept
    let numerator = 0;
    let denominator = 0;

    for (let i = 0; i < n; i++) {
      numerator += (normalizedTimes[i] - meanX) * (gasPrices[i] - meanY);
      denominator += Math.pow(normalizedTimes[i] - meanX, 2);
    }

    const slope = denominator !== 0 ? numerator / denominator : 0;
    const intercept = meanY - slope * meanX;

    // Calculate R-squared
    let totalVariation = 0;
    let explainedVariation = 0;

    for (let i = 0; i < n; i++) {
      const predicted = intercept + slope * normalizedTimes[i];
      totalVariation += Math.pow(gasPrices[i] - meanY, 2);
      explainedVariation += Math.pow(predicted - meanY, 2);
    }

    const rSquared = totalVariation !== 0 ? explainedVariation / totalVariation : 0;

    // Convert slope to Gwei per hour
    const slopeGweiPerHour = slope;

    // Determine trend direction and strength
    let trendDirection;
    if (Math.abs(slope) < 0.1) {
      trendDirection = 'stable';
    } else if (slope > 0) {
      trendDirection = 'increasing';
    } else {
      trendDirection = 'decreasing';
    }

    let trendStrength;
    if (rSquared < 0.3) {
      trendStrength = 'weak';
    } else if (rSquared < 0.7) {
      trendStrength = 'moderate';
    } else {
      trendStrength = 'strong';
    }

    return {
      slope: slopeGweiPerHour,
      intercept,
      rSquared,
      direction: trendDirection,
      strength: trendStrength,
      confidence: Math.min(rSquared * 100, 100).toFixed(2),
    };
  }

  /**
   * Calculate moving averages for gas prices
   * @param {Array} gasPrices - Array of gas prices
   * @returns {Object} Moving average results
   */
  calculateMovingAverages(gasPrices) {
    // Define window sizes
    const windows = [6, 12, 24, 48];
    const result = {};

    for (const window of windows) {
      if (gasPrices.length < window) {
        result[`ma${window}`] = null;
        continue;
      }

      // Calculate simple moving average
      const values = gasPrices.slice(-window);
      const sum = values.reduce((acc, val) => acc + val, 0);
      const average = sum / values.length;

      result[`ma${window}`] = average;
    }

    return result;
  }

  /**
   * Apply exponential smoothing to gas prices
   * @param {Array} gasPrices - Array of gas prices
   * @param {number} alpha - Smoothing factor
   * @returns {Object} Exponential smoothing results
   */
  applyExponentialSmoothing(gasPrices, alpha) {
    if (gasPrices.length === 0) {
      return { values: [], nextValue: null };
    }

    const smoothed = [gasPrices[0]];

    for (let i = 1; i < gasPrices.length; i++) {
      const value = alpha * gasPrices[i] + (1 - alpha) * smoothed[i - 1];
      smoothed.push(value);
    }

    // Predict next value
    const nextValue =
      alpha * gasPrices[gasPrices.length - 1] + (1 - alpha) * smoothed[smoothed.length - 1];

    return {
      values: smoothed,
      alpha,
      lastValue: smoothed[smoothed.length - 1],
      nextValue,
    };
  }

  /**
   * Predict EIP-1559 component (base fee or priority fee)
   * @param {Array} values - Array of component values
   * @param {string} component - Component name
   * @param {string} predictionWindow - Time window to predict
   * @returns {Object} Component prediction
   */
  predictEIP1559Component(values, component, predictionWindow) {
    if (values.length === 0) {
      return null;
    }

    // Apply exponential smoothing
    const smoothed = this.applyExponentialSmoothing(
      values,
      component === 'baseFee' ? 0.4 : 0.3 // Different smoothing for base fee vs priority fee
    );

    // Calculate percentiles
    const sorted = [...values].sort((a, b) => a - b);
    const percentiles = {};

    for (const p of [10, 25, 50, 75, 90]) {
      const index = Math.floor((p / 100) * sorted.length);
      percentiles[`p${p}`] = sorted[index];
    }

    // Calculate volatility
    const volatility = this.calculateVolatility(values);

    // Generate prediction
    const prediction = smoothed.nextValue;

    // For base fees, incorporate trend
    let trendPrediction = prediction;
    if (component === 'baseFee' && values.length > 24) {
      const recentValues = values.slice(-24);
      const timePoints = Array.from(
        { length: 24 },
        (_, i) => Date.now() - (23 - i) * 60 * 60 * 1000
      );
      const trend = this.calculateLinearTrend(timePoints, recentValues);

      // Blend trend and smoothing predictions based on R-squared
      const trendWeight = Math.min(trend.rSquared, 0.7);
      const horizon = this.parseTimeWindow(predictionWindow);
      const trendValue = trend.intercept + trend.slope * (Date.now() + horizon);

      trendPrediction = trendWeight * trendValue + (1 - trendWeight) * prediction;
    }

    return {
      current: values[values.length - 1],
      predicted: trendPrediction,
      smoothed: smoothed.lastValue,
      percentiles,
      volatility,
    };
  }

  /**
   * Calculate confidence intervals for predictions
   * @param {Array} gasPrices - Array of gas prices
   * @param {number} slope - Trend slope
   * @param {Array} intervals - Confidence interval percentages
   * @returns {Object} Confidence intervals
   */
  calculateConfidenceIntervals(gasPrices, slope, intervals) {
    if (gasPrices.length < 30) {
      return null; // Need enough data for reliable intervals
    }

    // Calculate standard deviation of gas prices
    const mean = gasPrices.reduce((sum, price) => sum + price, 0) / gasPrices.length;
    const squaredDiffs = gasPrices.map(price => Math.pow(price - mean, 2));
    const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / gasPrices.length;
    const stdDev = Math.sqrt(variance);

    // Calculate residual standard error
    const residualStdError = stdDev * Math.sqrt(1 - 0.5); // Approximate

    // Calculate z-scores for confidence intervals
    const zScores = {
      80: 1.282,
      90: 1.645,
      95: 1.96,
      99: 2.576,
    };

    const result = {};

    for (const interval of intervals) {
      const z = zScores[interval] || zScores[95];
      const marginOfError = z * residualStdError;

      result[interval] = {
        lower: Math.max(0, mean + slope - marginOfError),
        upper: mean + slope + marginOfError,
        margin: marginOfError,
      };
    }

    return result;
  }

  /**
   * Analyze gas price volatility
   * @param {Array} gasPrices - Array of gas prices
   * @returns {Object} Volatility analysis
   */
  analyzeVolatility(gasPrices) {
    if (gasPrices.length < 2) {
      return null;
    }

    // Calculate percentage changes
    const percentChanges = [];
    for (let i = 1; i < gasPrices.length; i++) {
      const change = ((gasPrices[i] - gasPrices[i - 1]) / gasPrices[i - 1]) * 100;
      percentChanges.push(change);
    }

    // Calculate volatility (standard deviation of percentage changes)
    const meanChange =
      percentChanges.reduce((sum, change) => sum + change, 0) / percentChanges.length;
    const squaredDiffs = percentChanges.map(change => Math.pow(change - meanChange, 2));
    const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / percentChanges.length;
    const volatility = Math.sqrt(variance);

    // Categorize volatility
    let volatilityCategory;
    if (volatility < 5) {
      volatilityCategory = 'low';
    } else if (volatility < 15) {
      volatilityCategory = 'moderate';
    } else if (volatility < 30) {
      volatilityCategory = 'high';
    } else {
      volatilityCategory = 'extreme';
    }

    // Determine if current volatility is above threshold
    const isVolatile = volatility > this.config.volatilityThreshold;

    return {
      value: volatility,
      category: volatilityCategory,
      isVolatile,
      meanChange,
      maxPositiveChange: Math.max(...percentChanges),
      maxNegativeChange: Math.min(...percentChanges),
      threshold: this.config.volatilityThreshold,
    };
  }

  /**
   * Generate hourly predictions
   * @param {Array} gasPrices - Array of gas prices
   * @param {Object} models - Prediction models
   * @param {number} hours - Number of hours to predict
   * @returns {Array} Hourly predictions
   */
  generateHourlyPredictions(gasPrices, models, hours) {
    const predictions = [];
    const now = Date.now();

    // Get the last price
    const lastPrice = gasPrices[gasPrices.length - 1];

    // Get trend slope in Gwei per hour
    const slope = models.trend.slope;

    // Get exponential smoothing parameters
    const alpha = models.smoothed.alpha;
    let smoothedValue = models.smoothed.lastValue;

    for (let hour = 1; hour <= hours; hour++) {
      // Calculate timestamp for this hour
      const timestamp = now + hour * 60 * 60 * 1000;
      const date = new Date(timestamp);

      // Calculate trend-based prediction
      const trendPrediction = models.trend.intercept + slope * timestamp;

      // Update exponential smoothing
      smoothedValue = alpha * trendPrediction + (1 - alpha) * smoothedValue;

      // Blend models based on trend confidence
      const trendConfidence = parseFloat(models.trend.confidence) / 100;
      const blendedPrediction =
        trendPrediction * trendConfidence + smoothedValue * (1 - trendConfidence);

      // Add time-of-day adjustment factor (simplified)
      const hourOfDay = date.getUTCHours();
      let timeAdjustment = 1.0;

      // Simple time-of-day pattern: higher during business hours, lower at night
      // This is a simplified approach - in a real implementation, this would be learned from the data
      if (hourOfDay >= 8 && hourOfDay <= 17) {
        timeAdjustment = 1.1; // 10% higher during business hours
      } else if (hourOfDay >= 0 && hourOfDay <= 5) {
        timeAdjustment = 0.9; // 10% lower during night hours
      }

      const finalPrediction = Math.max(0.1, blendedPrediction * timeAdjustment);

      predictions.push({
        hour,
        timestamp,
        date: date.toISOString(),
        prediction: finalPrediction,
        trend: trendPrediction,
        smoothed: smoothedValue,
        timeAdjustment,
      });
    }

    return predictions;
  }

  /**
   * Generate fee recommendations based on predictions
   * @param {Object} prediction - Price prediction data
   * @param {boolean} isEIP1559 - Whether the network supports EIP-1559
   * @param {string} network - Target network
   * @returns {Object} Fee recommendations
   */
  generateFeeRecommendations(prediction, isEIP1559, network) {
    const recommendations = {
      network,
      timestamp: Date.now(),
    };

    if (isEIP1559) {
      // EIP-1559 recommendations
      recommendations.type = 'eip1559';

      // Get predicted base fee and priority fee
      const predictedBaseFee = prediction.baseFee ? prediction.baseFee.predicted : null;
      const predictedPriorityFee = prediction.priorityFee ? prediction.priorityFee.predicted : null;

      if (predictedBaseFee && predictedPriorityFee) {
        // Define urgency levels
        const urgencyLevels = ['low', 'medium', 'high', 'urgent'];
        const multipliers = {
          low: 1.0,
          medium: 1.2,
          high: 1.5,
          urgent: 2.0,
        };

        const priorityMultipliers = {
          low: 0.8,
          medium: 1.0,
          high: 1.5,
          urgent: 2.5,
        };

        // Generate recommendations for each urgency level
        recommendations.urgencyLevels = {};

        for (const urgency of urgencyLevels) {
          const multiplier = multipliers[urgency];
          const priorityMultiplier = priorityMultipliers[urgency];

          const maxFeePerGas =
            predictedBaseFee * multiplier + predictedPriorityFee * priorityMultiplier;

          const maxPriorityFeePerGas = predictedPriorityFee * priorityMultiplier;

          recommendations.urgencyLevels[urgency] = {
            maxFeePerGas: Math.max(0.1, maxFeePerGas),
            maxPriorityFeePerGas: Math.max(0.1, maxPriorityFeePerGas),
            estimatedBaseFee: predictedBaseFee,
            confidence: prediction.models.trend.confidence,
          };
        }
      }
    } else {
      // Legacy gas price recommendations
      recommendations.type = 'legacy';

      // Get predicted gas price
      const predictedGasPrice = prediction.models.predictions.exponential;

      if (predictedGasPrice) {
        // Define urgency levels
        const urgencyLevels = ['low', 'medium', 'high', 'urgent'];
        const multipliers = {
          low: 0.8,
          medium: 1.0,
          high: 1.3,
          urgent: 1.8,
        };

        // Generate recommendations for each urgency level
        recommendations.urgencyLevels = {};

        for (const urgency of urgencyLevels) {
          const multiplier = multipliers[urgency];
          const gasPrice = predictedGasPrice * multiplier;

          recommendations.urgencyLevels[urgency] = {
            gasPrice: Math.max(0.1, gasPrice),
            confidence: prediction.models.trend.confidence,
          };
        }
      }
    }

    return recommendations;
  }

  /**
   * Calculate volatility
   * @param {Array} values - Array of values
   * @returns {number} Volatility value
   */
  calculateVolatility(values) {
    if (values.length < 2) {
      return 0;
    }

    // Calculate percentage changes
    const percentChanges = [];
    for (let i = 1; i < values.length; i++) {
      const change = ((values[i] - values[i - 1]) / values[i - 1]) * 100;
      percentChanges.push(change);
    }

    // Calculate standard deviation
    const mean = percentChanges.reduce((sum, change) => sum + change, 0) / percentChanges.length;
    const squaredDiffs = percentChanges.map(change => Math.pow(change - mean, 2));
    const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / percentChanges.length;

    return Math.sqrt(variance);
  }
}

module.exports = GasPricePredictor;
