/**
 * Pimlico API Service
 * Utility for fetching gas fee suggestions and EntryPoint metadata from Pimlico API
 */

const axios = require('axios');

class PimlicoService {
  /**
   * Creates a new PimlicoService instance
   * @param {Object} options Configuration options
   * @param {string} options.apiKey Pimlico API key
   * @param {string} options.chainId Chain ID (e.g., '1' for Ethereum mainnet)
   * @param {string} options.entryPointAddress The EntryPoint contract address
   * @param {boolean} options.debug Whether to enable debug logging
   */
  constructor(options = {}) {
    this.apiKey = options.apiKey || process.env.PIMLICO_API_KEY;
    this.chainId = options.chainId || '1';
    this.entryPointAddress = options.entryPointAddress || '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';
    this.debug = options.debug || false;
    
    // Base URL for Pimlico API
    this.baseUrl = `https://api.pimlico.io/v1/${this.chainId}`;
    
    // Set up axios instance with headers
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey
      }
    });
    
    this._log('PimlicoService initialized', { chainId: this.chainId, entryPoint: this.entryPointAddress });
  }
  
  /**
   * Fetch gas prices and EIP-1559 fee data
   * @returns {Promise<Object>} Gas price data
   */
  async getGasPrices() {
    try {
      const response = await this.client.get('/gas-prices');
      this._log('Fetched gas prices', response.data);
      return response.data;
    } catch (error) {
      this._handleError('Failed to fetch gas prices', error);
      throw error;
    }
  }
  
  /**
   * Get suggested UserOperation gas parameters
   * @returns {Promise<Object>} Suggested gas parameters
   */
  async getUserOperationGasParams() {
    try {
      const response = await this.client.get('/gas/userOperationGasParams');
      this._log('Fetched UserOperation gas params', response.data);
      return response.data;
    } catch (error) {
      this._handleError('Failed to fetch UserOperation gas params', error);
      throw error;
    }
  }
  
  /**
   * Fetch EntryPoint metadata including stake status, unstake delay,
   * supported bundlers, and other configuration
   * @returns {Promise<Object>} EntryPoint metadata
   */
  async getEntryPointMetadata() {
    try {
      const response = await this.client.get(`/entryPoint/${this.entryPointAddress}/metadata`);
      this._log('Fetched EntryPoint metadata', response.data);
      return response.data;
    } catch (error) {
      this._handleError('Failed to fetch EntryPoint metadata', error);
      throw error;
    }
  }
  
  /**
   * Get bundler addresses and their staking status
   * @returns {Promise<Array>} List of bundlers and their status
   */
  async getActiveBundlers() {
    try {
      const response = await this.client.get(`/entryPoint/${this.entryPointAddress}/bundlers`);
      this._log('Fetched active bundlers', response.data);
      return response.data;
    } catch (error) {
      this._handleError('Failed to fetch active bundlers', error);
      throw error;
    }
  }
  
  /**
   * Get information about a specific paymaster
   * @param {string} paymasterAddress Address of the paymaster
   * @returns {Promise<Object>} Paymaster details
   */
  async getPaymasterInfo(paymasterAddress) {
    try {
      const response = await this.client.get(`/entryPoint/${this.entryPointAddress}/paymaster/${paymasterAddress}`);
      this._log('Fetched paymaster info', response.data);
      return response.data;
    } catch (error) {
      this._handleError(`Failed to fetch paymaster info for ${paymasterAddress}`, error);
      throw error;
    }
  }
  
  /**
   * Get a list of recent UserOperations sent through Pimlico
   * @param {number} limit Number of operations to fetch (default 10)
   * @returns {Promise<Array>} Recent UserOperations
   */
  async getRecentUserOperations(limit = 10) {
    try {
      const response = await this.client.get(`/userOperations/recent?limit=${limit}`);
      this._log(`Fetched ${limit} recent UserOperations`, response.data);
      return response.data;
    } catch (error) {
      this._handleError('Failed to fetch recent UserOperations', error);
      throw error;
    }
  }
  
  /**
   * Estimate gas for a UserOperation
   * @param {Object} userOp UserOperation object
   * @returns {Promise<Object>} Gas estimation result
   */
  async estimateUserOperationGas(userOp) {
    try {
      const response = await this.client.post('/estimate', {
        userOperation: userOp,
        entryPoint: this.entryPointAddress
      });
      this._log('Estimated UserOperation gas', response.data);
      return response.data;
    } catch (error) {
      this._handleError('Failed to estimate UserOperation gas', error);
      throw error;
    }
  }
  
  /**
   * Fill in gas parameters for a UserOperation using Pimlico's suggested values
   * @param {Object} userOp UserOperation object (without gas parameters)
   * @returns {Promise<Object>} UserOperation with gas parameters filled in
   */
  async fillGasParameters(userOp) {
    try {
      // Get base UserOperation gas parameters
      const gasParams = await this.getUserOperationGasParams();
      
      // Create a copy of the original UserOp
      const filledUserOp = { ...userOp };
      
      // Fill in gas parameters
      filledUserOp.callGasLimit = gasParams.callGasLimit || "0x200000";
      filledUserOp.verificationGasLimit = gasParams.verificationGasLimit || "0x100000";
      filledUserOp.preVerificationGas = gasParams.preVerificationGas || "0x60000";
      filledUserOp.maxFeePerGas = gasParams.maxFeePerGas || "0x11dbd30bda";
      filledUserOp.maxPriorityFeePerGas = gasParams.maxPriorityFeePerGas || "0x11dbd30bd2";
      
      this._log('Filled gas parameters for UserOperation', filledUserOp);
      return filledUserOp;
    } catch (error) {
      this._handleError('Failed to fill gas parameters', error);
      throw error;
    }
  }
  
  /**
   * Get supported paymasters by type
   * @param {string} type Paymaster type (e.g., 'verifying', 'token', 'custom')
   * @returns {Promise<Array>} List of paymasters
   */
  async getSupportedPaymasters(type = 'verifying') {
    try {
      const response = await this.client.get(`/paymasters?type=${type}`);
      this._log(`Fetched ${type} paymasters`, response.data);
      return response.data;
    } catch (error) {
      this._handleError(`Failed to fetch ${type} paymasters`, error);
      throw error;
    }
  }
  
  /**
   * Generate JSON report with key Pimlico metrics for EntryPoint on this chain
   * @returns {Promise<Object>} Metrics report
   */
  async generateMetricsReport() {
    try {
      // Collect data from multiple endpoints
      const [
        gasParams, 
        entryPointMetadata, 
        bundlers, 
        recentOps
      ] = await Promise.all([
        this.getUserOperationGasParams(),
        this.getEntryPointMetadata(),
        this.getActiveBundlers(),
        this.getRecentUserOperations(5)
      ]);
      
      // Prepare report object
      const report = {
        timestamp: new Date().toISOString(),
        chainId: this.chainId,
        entryPoint: this.entryPointAddress,
        gasParameters: gasParams,
        entryPointMetadata,
        activeBundlersCount: bundlers.length,
        recentOperationsCount: recentOps.length,
        averageGasUsed: recentOps.length > 0 
          ? recentOps.reduce((sum, op) => sum + parseInt(op.actualGasUsed || 0), 0) / recentOps.length 
          : 0
      };
      
      this._log('Generated metrics report', report);
      return report;
    } catch (error) {
      this._handleError('Failed to generate metrics report', error);
      throw error;
    }
  }
  
  /**
   * Private logging utility
   * @private
   * @param {string} message Log message
   * @param {Object} data Optional data to log
   */
  _log(message, data) {
    if (this.debug) {
      console.log(`[PimlicoService] ${message}`, data || '');
    }
  }
  
  /**
   * Private error handler
   * @private
   * @param {string} message Error message
   * @param {Error} error Error object
   */
  _handleError(message, error) {
    const errorMessage = error.response?.data?.message || error.message;
    const status = error.response?.status || 'unknown';
    
    console.error(`[PimlicoService] ${message}: (${status}) ${errorMessage}`);
    
    if (this.debug && error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

module.exports = PimlicoService; 