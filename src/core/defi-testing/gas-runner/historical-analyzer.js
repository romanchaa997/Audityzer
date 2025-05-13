/**
 * Gas Historical Analyzer
 *
 * Analyzes historical gas prices across different networks to identify patterns
 * and trends for optimizing transaction timing and fee strategies.
 */

const fs = require('fs-extra');
const path = require('path');
const { ethers } = require('ethers');
const moment = require('moment');

class GasHistoricalAnalyzer {
  constructor(config = {}) {
    this.config = {
      dataStoragePath: config.dataStoragePath || './data/gas-data',
      networks: config.networks || ['mainnet', 'arbitrum', 'optimism', 'polygon', 'base'],
      dataWindow: config.dataWindow || '30d',
      fetchInterval: config.fetchInterval || 60 * 60 * 1000, // 1 hour
      rpcProviders: config.rpcProviders || {},
      defaultRpcUrls: {
        mainnet: 'https://eth-mainnet.alchemyapi.io/v2/demo',
        arbitrum: 'https://arb1.arbitrum.io/rpc',
        optimism: 'https://mainnet.optimism.io',
        polygon: 'https://polygon-rpc.com',
        base: 'https://mainnet.base.org',
      },
      ...config,
    };

    // Create storage directory if it doesn't exist
    fs.ensureDirSync(this.config.dataStoragePath);

    // Initialize providers for each network
    this.providers = {};
    for (const network of this.config.networks) {
      const rpcUrl = this.config.rpcProviders[network] || this.config.defaultRpcUrls[network];
      if (rpcUrl) {
        this.providers[network] = new ethers.providers.JsonRpcProvider(rpcUrl);
      }
    }

    // Cache for historical data
    this.gasDataCache = {};
  }

  /**
   * Get the file path for a network's historical data
   * @param {string} network - The network name
   * @returns {string} File path
   */
  getDataFilePath(network) {
    return path.join(this.config.dataStoragePath, `${network}-gas-history.json`);
  }

  /**
   * Load historical gas data for a network
   * @param {string} network - The network name
   * @returns {Array} Historical gas data
   */
  loadHistoricalData(network) {
    const filePath = this.getDataFilePath(network);

    if (fs.existsSync(filePath)) {
      try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
      } catch (error) {
        console.error(`Error loading gas data for ${network}:`, error);
        return [];
      }
    }

    return [];
  }

  /**
   * Save historical gas data for a network
   * @param {string} network - The network name
   * @param {Array} data - Historical gas data
   */
  saveHistoricalData(network, data) {
    const filePath = this.getDataFilePath(network);

    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error(`Error saving gas data for ${network}:`, error);
    }
  }

  /**
   * Fetch current gas prices for a network
   * @param {string} network - The network name
   * @returns {Promise<Object>} Current gas prices
   */
  async fetchCurrentGasPrices(network) {
    const provider = this.providers[network];

    if (!provider) {
      throw new Error(`No provider available for network: ${network}`);
    }

    try {
      // Fetch latest block
      const block = await provider.getBlock('latest');

      // Get fee data
      let feeData;
      try {
        feeData = await provider.getFeeData();
      } catch (error) {
        // For networks that don't support getFeeData
        const gasPrice = await provider.getGasPrice();
        feeData = {
          gasPrice,
          maxFeePerGas: null,
          maxPriorityFeePerGas: null,
        };
      }

      // Calculate average gas used in block
      let avgGasUsed = 0;
      if (block.transactions.length > 0) {
        // For simplicity, use block gas used divided by transaction count
        avgGasUsed = Math.floor(block.gasUsed.toNumber() / block.transactions.length);
      }

      return {
        timestamp: block.timestamp * 1000, // Convert to milliseconds
        blockNumber: block.number,
        blockTimestamp: block.timestamp,
        baseFeePerGas: block.baseFeePerGas ? block.baseFeePerGas.toString() : null,
        gasPrice: feeData.gasPrice ? feeData.gasPrice.toString() : null,
        maxFeePerGas: feeData.maxFeePerGas ? feeData.maxFeePerGas.toString() : null,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
          ? feeData.maxPriorityFeePerGas.toString()
          : null,
        gasLimit: block.gasLimit.toString(),
        gasUsed: block.gasUsed.toString(),
        avgGasUsed: avgGasUsed.toString(),
        utilization: ((block.gasUsed.toNumber() / block.gasLimit.toNumber()) * 100).toFixed(2),
      };
    } catch (error) {
      console.error(`Error fetching gas prices for ${network}:`, error);
      throw error;
    }
  }

  /**
   * Update historical data with the latest gas prices
   * @param {string} network - The network name
   * @returns {Promise<Array>} Updated historical data
   */
  async updateHistoricalData(network) {
    const historicalData = this.loadHistoricalData(network);

    try {
      const currentPrices = await this.fetchCurrentGasPrices(network);

      // Add current prices to historical data
      historicalData.push(currentPrices);

      // Trim data based on configured window
      const windowMs = this.parseTimeWindow(this.config.dataWindow);
      const cutoffTime = Date.now() - windowMs;

      const trimmedData = historicalData.filter(entry => entry.timestamp > cutoffTime);

      // Save updated data
      this.saveHistoricalData(network, trimmedData);

      // Update cache
      this.gasDataCache[network] = trimmedData;

      return trimmedData;
    } catch (error) {
      console.error(`Error updating historical data for ${network}:`, error);

      // Return existing data if update fails
      this.gasDataCache[network] = historicalData;
      return historicalData;
    }
  }

  /**
   * Parse time window string to milliseconds
   * @param {string} window - Time window string (e.g., '30d', '12h')
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
        return 30 * 24 * 60 * 60 * 1000; // Default to 30 days
    }
  }

  /**
   * Get historical gas data for a network
   * @param {string} network - The network name
   * @param {boolean} forceUpdate - Force update from RPC
   * @returns {Promise<Array>} Historical gas data
   */
  async getHistoricalData(network, forceUpdate = false) {
    // Return cached data if available and not forcing update
    if (!forceUpdate && this.gasDataCache[network]) {
      return this.gasDataCache[network];
    }

    // Check if we need to update based on most recent entry
    const historicalData = this.loadHistoricalData(network);

    if (historicalData.length > 0) {
      const lastUpdate = historicalData[historicalData.length - 1].timestamp;
      const timeSinceUpdate = Date.now() - lastUpdate;

      if (timeSinceUpdate > this.config.fetchInterval || forceUpdate) {
        return this.updateHistoricalData(network);
      }

      // Use existing data if recently updated
      this.gasDataCache[network] = historicalData;
      return historicalData;
    }

    // No existing data, perform update
    return this.updateHistoricalData(network);
  }

  /**
   * Analyze gas prices for a network
   * @param {string} network - The network name
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} Analysis results
   */
  async analyzeGasPrices(network, options = {}) {
    const {
      timeWindow = this.config.dataWindow,
      percentiles = [10, 25, 50, 75, 90, 99],
      includeTimeOfDay = true,
      includeDayOfWeek = true,
      includeUtilization = true,
    } = options;

    // Get historical data
    const historicalData = await this.getHistoricalData(network);

    if (historicalData.length === 0) {
      throw new Error(`No historical data available for network: ${network}`);
    }

    // Filter data based on time window
    const windowMs = this.parseTimeWindow(timeWindow);
    const cutoffTime = Date.now() - windowMs;
    const filteredData = historicalData.filter(entry => entry.timestamp > cutoffTime);

    // Extract gas prices and convert to numbers
    const gasPrices = filteredData
      .map(entry => (entry.gasPrice ? parseInt(entry.gasPrice) / 1e9 : null))
      .filter(price => price !== null);

    const baseFees = filteredData
      .map(entry => (entry.baseFeePerGas ? parseInt(entry.baseFeePerGas) / 1e9 : null))
      .filter(fee => fee !== null);

    const priorityFees = filteredData
      .map(entry =>
        entry.maxPriorityFeePerGas ? parseInt(entry.maxPriorityFeePerGas) / 1e9 : null
      )
      .filter(fee => fee !== null);

    // Calculate statistics
    const stats = {
      network,
      timeWindow,
      dataPoints: filteredData.length,
      startTime: new Date(filteredData[0]?.timestamp).toISOString(),
      endTime: new Date(filteredData[filteredData.length - 1]?.timestamp).toISOString(),
      gasPrice: this.calculateStats(gasPrices, percentiles),
      baseFee: baseFees.length > 0 ? this.calculateStats(baseFees, percentiles) : null,
      priorityFee: priorityFees.length > 0 ? this.calculateStats(priorityFees, percentiles) : null,
      trends: this.analyzeTrends(filteredData),
    };

    // Add time of day analysis if requested
    if (includeTimeOfDay) {
      stats.timeOfDay = this.analyzeTimeOfDay(filteredData);
    }

    // Add day of week analysis if requested
    if (includeDayOfWeek) {
      stats.dayOfWeek = this.analyzeDayOfWeek(filteredData);
    }

    // Add utilization analysis if requested
    if (includeUtilization) {
      stats.utilization = this.analyzeUtilization(filteredData);
    }

    return stats;
  }

  /**
   * Calculate statistics for an array of values
   * @param {Array<number>} values - Array of values
   * @param {Array<number>} percentiles - Percentiles to calculate
   * @returns {Object} Statistics
   */
  calculateStats(values, percentiles) {
    if (values.length === 0) return null;

    // Sort values for percentile calculation
    const sortedValues = [...values].sort((a, b) => a - b);

    // Calculate percentiles
    const percentileResults = {};
    for (const p of percentiles) {
      const index = Math.floor((p / 100) * sortedValues.length);
      percentileResults[`p${p}`] = sortedValues[index];
    }

    // Calculate mean
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / values.length;

    // Calculate standard deviation
    const squareDiffs = values.map(value => (value - mean) ** 2);
    const avgSquareDiff = squareDiffs.reduce((acc, val) => acc + val, 0) / squareDiffs.length;
    const stdDev = Math.sqrt(avgSquareDiff);

    return {
      min: sortedValues[0],
      max: sortedValues[sortedValues.length - 1],
      mean,
      median: percentileResults.p50,
      stdDev,
      ...percentileResults,
    };
  }

  /**
   * Analyze gas price trends
   * @param {Array<Object>} data - Historical gas data
   * @returns {Object} Trend analysis
   */
  analyzeTrends(data) {
    if (data.length < 2) return null;

    // Extract timestamps and gas prices
    const timestamps = data.map(entry => entry.timestamp);
    const gasPrices = data
      .map(entry => (entry.gasPrice ? parseInt(entry.gasPrice) / 1e9 : null))
      .filter((price, index) => price !== null && timestamps[index] !== undefined);

    // Calculate simple linear regression
    const n = gasPrices.length;
    const xSum = timestamps.reduce((acc, val) => acc + val, 0);
    const ySum = gasPrices.reduce((acc, val) => acc + val, 0);
    const xySum = timestamps.reduce((acc, val, i) => acc + val * gasPrices[i], 0);
    const x2Sum = timestamps.reduce((acc, val) => acc + val * val, 0);

    const slope = (n * xySum - xSum * ySum) / (n * x2Sum - xSum * xSum);
    const intercept = (ySum - slope * xSum) / n;

    // Calculate 24 hour change
    const last24Hours = data.filter(entry => Date.now() - entry.timestamp < 24 * 60 * 60 * 1000);

    let change24h = null;
    if (last24Hours.length >= 2) {
      const oldestPrice = parseInt(last24Hours[0].gasPrice) / 1e9;
      const newestPrice = parseInt(last24Hours[last24Hours.length - 1].gasPrice) / 1e9;
      change24h = ((newestPrice - oldestPrice) / oldestPrice) * 100;
    }

    // Calculate volatility (standard deviation of percentage changes)
    const percentChanges = [];
    for (let i = 1; i < gasPrices.length; i++) {
      const change = ((gasPrices[i] - gasPrices[i - 1]) / gasPrices[i - 1]) * 100;
      percentChanges.push(change);
    }

    const volatility = this.calculateStats(percentChanges, [50]).stdDev;

    return {
      slope,
      intercept,
      trend: slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable',
      change24h,
      volatility,
    };
  }

  /**
   * Analyze gas prices by time of day
   * @param {Array<Object>} data - Historical gas data
   * @returns {Object} Time of day analysis
   */
  analyzeTimeOfDay(data) {
    const hourlyData = Array(24)
      .fill()
      .map(() => []);

    // Group data by hour
    for (const entry of data) {
      const date = new Date(entry.timestamp);
      const hour = date.getUTCHours();

      if (entry.gasPrice) {
        hourlyData[hour].push(parseInt(entry.gasPrice) / 1e9);
      }
    }

    // Calculate statistics for each hour
    const result = {};
    for (let hour = 0; hour < 24; hour++) {
      if (hourlyData[hour].length > 0) {
        result[`${hour}`.padStart(2, '0')] = this.calculateStats(hourlyData[hour], [50]);
      }
    }

    return result;
  }

  /**
   * Analyze gas prices by day of week
   * @param {Array<Object>} data - Historical gas data
   * @returns {Object} Day of week analysis
   */
  analyzeDayOfWeek(data) {
    const dailyData = Array(7)
      .fill()
      .map(() => []);

    // Group data by day of week (0 = Sunday, 6 = Saturday)
    for (const entry of data) {
      const date = new Date(entry.timestamp);
      const dayOfWeek = date.getUTCDay();

      if (entry.gasPrice) {
        dailyData[dayOfWeek].push(parseInt(entry.gasPrice) / 1e9);
      }
    }

    // Calculate statistics for each day
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const result = {};

    for (let day = 0; day < 7; day++) {
      if (dailyData[day].length > 0) {
        result[days[day]] = this.calculateStats(dailyData[day], [50]);
      }
    }

    return result;
  }

  /**
   * Analyze block utilization
   * @param {Array<Object>} data - Historical gas data
   * @returns {Object} Utilization analysis
   */
  analyzeUtilization(data) {
    // Extract utilization percentages
    const utilization = data
      .map(entry => (entry.utilization ? parseFloat(entry.utilization) : null))
      .filter(util => util !== null);

    // Calculate correlation between utilization and gas price
    const gasUtilPairs = data
      .filter(entry => entry.gasPrice && entry.utilization)
      .map(entry => ({
        gasPrice: parseInt(entry.gasPrice) / 1e9,
        utilization: parseFloat(entry.utilization),
      }));

    let correlation = null;
    if (gasUtilPairs.length > 1) {
      correlation = this.calculateCorrelation(
        gasUtilPairs.map(pair => pair.gasPrice),
        gasUtilPairs.map(pair => pair.utilization)
      );
    }

    return {
      stats: this.calculateStats(utilization, [25, 50, 75, 90]),
      correlation,
      impact: this.categorizeCorrelation(correlation),
    };
  }

  /**
   * Calculate correlation between two arrays
   * @param {Array<number>} x - First array
   * @param {Array<number>} y - Second array
   * @returns {number} Correlation coefficient
   */
  calculateCorrelation(x, y) {
    const n = x.length;
    if (n !== y.length || n === 0) return null;

    const xMean = x.reduce((acc, val) => acc + val, 0) / n;
    const yMean = y.reduce((acc, val) => acc + val, 0) / n;

    let numerator = 0;
    let xDenominator = 0;
    let yDenominator = 0;

    for (let i = 0; i < n; i++) {
      const xDiff = x[i] - xMean;
      const yDiff = y[i] - yMean;

      numerator += xDiff * yDiff;
      xDenominator += xDiff ** 2;
      yDenominator += yDiff ** 2;
    }

    if (xDenominator === 0 || yDenominator === 0) return 0;

    return numerator / Math.sqrt(xDenominator * yDenominator);
  }

  /**
   * Categorize correlation coefficient
   * @param {number} correlation - Correlation coefficient
   * @returns {string} Correlation category
   */
  categorizeCorrelation(correlation) {
    if (correlation === null) return 'unknown';

    const abs = Math.abs(correlation);

    if (abs < 0.2) return 'negligible';
    if (abs < 0.4) return 'weak';
    if (abs < 0.6) return 'moderate';
    if (abs < 0.8) return 'strong';
    return 'very strong';
  }
}

module.exports = GasHistoricalAnalyzer;
