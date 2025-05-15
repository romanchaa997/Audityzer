/**
 * Pimlico API Integration Module for Account Abstraction
 *
 * Implements functionality for fetching live gas fee suggestions and EntryPoint metadata
 * from the Pimlico bundler API.
 */

const axios = require('axios');
const { ethers } = require('ethers');

// Constants
const PIMLICO_BASE_URL = 'https://api.pimlico.io/v1';
const SUPPORTED_CHAINS = {
  'ethereum': '1',
  'goerli': '5',
  'sepolia': '11155111',
  'base': '8453',
  'base-goerli': '84531',
  'polygon': '137',
  'mumbai': '80001',
  'optimism': '10',
  'optimism-goerli': '420',
  'arbitrum': '42161',
  'arbitrum-goerli': '421613',
  'base-sepolia': '84532'
};

/**
 * Pimlico API Client for Account Abstraction
 */
class PimlicoApiClient {
  /**
   * @param {Object} options Configuration options
   * @param {string} options.apiKey Pimlico API key
   * @param {string} options.chain Chain to use (e.g., 'ethereum', 'goerli', etc.)
   * @param {string} options.entryPointAddress EntryPoint contract address, defaults to the standard one
   */
  constructor(options = {}) {
    this.apiKey = options.apiKey;
    this.chain = options.chain || 'ethereum';
    this.chainId = SUPPORTED_CHAINS[this.chain] || '1';
    this.entryPointAddress = options.entryPointAddress || '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';
    this.logger = options.logger || console;
    this.timeout = options.timeout || 10000; // ms
  }

  /**
   * Get the base URL for API requests
   * @returns {string} The base URL
   */
  getBaseUrl() {
    return `${PIMLICO_BASE_URL}/${this.chainId}`;
  }

  /**
   * Create axios instance with default configuration
   * @returns {Object} Configured axios instance
   */
  createClient() {
    return axios.create({
      baseURL: this.getBaseUrl(),
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey
      }
    });
  }

  /**
   * Get current gas prices
   * @returns {Promise<Object>} Gas price data
   */
  async getGasPrices() {
    try {
      const client = this.createClient();
      const response = await client.get('/gas-prices');
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching gas prices: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get UserOperation gas price suggestion
   * @returns {Promise<Object>} UserOperation gas price suggestion
   */
  async getUserOperationGasPrice() {
    try {
      const client = this.createClient();
      const response = await client.get('/gas-prices/userOperation');
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching UserOperation gas price: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get EntryPoint state
   * @returns {Promise<Object>} EntryPoint state
   */
  async getEntryPointState() {
    try {
      const client = this.createClient();
      const response = await client.get(`/entrypoint/${this.entryPointAddress}/state`);
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching EntryPoint state: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get bundler supported entry points
   * @returns {Promise<Array>} List of supported EntryPoint addresses
   */
  async getSupportedEntryPoints() {
    try {
      const client = this.createClient();
      const response = await client.get('/supported-entry-points');
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching supported EntryPoints: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get UserOperation status
   * @param {string} userOpHash Hash of the UserOperation
   * @returns {Promise<Object>} UserOperation status
   */
  async getUserOperationStatus(userOpHash) {
    try {
      const client = this.createClient();
      const response = await client.get(`/user-operation/${userOpHash}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching UserOperation status: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get UserOperation receipt
   * @param {string} userOpHash Hash of the UserOperation
   * @returns {Promise<Object>} UserOperation receipt
   */
  async getUserOperationReceipt(userOpHash) {
    try {
      const client = this.createClient();
      const response = await client.get(`/user-operation/${userOpHash}/receipt`);
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching UserOperation receipt: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get chain-specific configuration
   * @returns {Promise<Object>} Chain configuration
   */
  async getChainConfig() {
    try {
      const client = this.createClient();
      const response = await client.get('/chain-config');
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching chain configuration: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get recommended gas settings for a UserOperation
   * @param {string} speed Speed level (fast, medium, slow)
   * @returns {Promise<Object>} Gas settings
   */
  async getRecommendedGasSettings(speed = 'fast') {
    try {
      const gasData = await this.getUserOperationGasPrice();
      
      let settings;
      switch (speed.toLowerCase()) {
        case 'slow':
          settings = gasData.slow;
          break;
        case 'medium':
          settings = gasData.standard;
          break;
        case 'fast':
        default:
          settings = gasData.fast;
      }
      
      return {
        maxFeePerGas: ethers.BigNumber.from(settings.maxFeePerGas),
        maxPriorityFeePerGas: ethers.BigNumber.from(settings.maxPriorityFeePerGas)
      };
    } catch (error) {
      this.logger.error(`Error getting recommended gas settings: ${error.message}`);
      throw error;
    }
  }

  /**
   * Format UserOperation gas settings based on current gas prices
   * @param {Object} userOp UserOperation to update with gas settings
   * @param {string} speed Speed level (fast, medium, slow)
   * @returns {Promise<Object>} Updated UserOperation with gas settings
   */
  async formatUserOpWithGasSettings(userOp, speed = 'fast') {
    const gasSettings = await this.getRecommendedGasSettings(speed);
    
    return {
      ...userOp,
      maxFeePerGas: gasSettings.maxFeePerGas.toString(),
      maxPriorityFeePerGas: gasSettings.maxPriorityFeePerGas.toString()
    };
  }
}

/**
 * Create test report for Pimlico API integration
 * @param {PimlicoApiClient} client Pimlico API client
 * @returns {Promise<Object>} Test report
 */
async function createPimlicoIntegrationReport(client) {
  const report = {
    timestamp: new Date().toISOString(),
    chain: client.chain,
    chainId: client.chainId,
    tests: {},
    summary: {
      pass: 0,
      fail: 0,
      total: 0
    }
  };
  
  try {
    // Test gas prices
    try {
      report.tests.gasPrices = {
        status: 'running'
      };
      
      const gasPrices = await client.getGasPrices();
      report.tests.gasPrices = {
        status: 'pass',
        data: gasPrices
      };
      report.summary.pass++;
    } catch (error) {
      report.tests.gasPrices = {
        status: 'fail',
        error: error.message
      };
      report.summary.fail++;
    }
    
    // Test UserOperation gas prices
    try {
      report.tests.userOpGasPrices = {
        status: 'running'
      };
      
      const userOpGasPrices = await client.getUserOperationGasPrice();
      report.tests.userOpGasPrices = {
        status: 'pass',
        data: userOpGasPrices
      };
      report.summary.pass++;
    } catch (error) {
      report.tests.userOpGasPrices = {
        status: 'fail',
        error: error.message
      };
      report.summary.fail++;
    }
    
    // Test EntryPoint state
    try {
      report.tests.entryPointState = {
        status: 'running'
      };
      
      const entryPointState = await client.getEntryPointState();
      report.tests.entryPointState = {
        status: 'pass',
        data: entryPointState
      };
      report.summary.pass++;
    } catch (error) {
      report.tests.entryPointState = {
        status: 'fail',
        error: error.message
      };
      report.summary.fail++;
    }
    
    // Test supported EntryPoints
    try {
      report.tests.supportedEntryPoints = {
        status: 'running'
      };
      
      const supportedEntryPoints = await client.getSupportedEntryPoints();
      report.tests.supportedEntryPoints = {
        status: 'pass',
        data: supportedEntryPoints
      };
      report.summary.pass++;
    } catch (error) {
      report.tests.supportedEntryPoints = {
        status: 'fail',
        error: error.message
      };
      report.summary.fail++;
    }
    
    // Test chain config
    try {
      report.tests.chainConfig = {
        status: 'running'
      };
      
      const chainConfig = await client.getChainConfig();
      report.tests.chainConfig = {
        status: 'pass',
        data: chainConfig
      };
      report.summary.pass++;
    } catch (error) {
      report.tests.chainConfig = {
        status: 'fail',
        error: error.message
      };
      report.summary.fail++;
    }
    
    // Update summary
    report.summary.total = report.summary.pass + report.summary.fail;
    report.summary.passRate = `${Math.round((report.summary.pass / report.summary.total) * 100)}%`;
    
    return report;
  } catch (error) {
    return {
      timestamp: new Date().toISOString(),
      error: error.message,
      summary: {
        pass: 0,
        fail: 1,
        total: 1,
        passRate: '0%'
      }
    };
  }
}

module.exports = {
  PimlicoApiClient,
  createPimlicoIntegrationReport,
  SUPPORTED_CHAINS
}; 