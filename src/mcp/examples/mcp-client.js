/**
 * MCP Client Example
 * 
 * This example demonstrates how to use the MCP API from a client application.
 */

import axios from 'axios';

// MCP server configuration
const MCP_CONFIG = {
  BASE_URL: 'http://localhost:8078',
  API_KEY: process.env.MCP_API_KEY || 'your-api-key-here',
  TIMEOUT: 30000 // 30 seconds
};

/**
 * MCP Client class for interacting with the MCP API
 */
class McpClient {
  constructor (config = {}) {
    this.config = {
      ...MCP_CONFIG,
      ...config
    };

    this.token = null;
    this.tokenExpiry = null;

    // Create axios instance
    this.api = axios.create({
      baseURL: this.config.BASE_URL,
      timeout: this.config.TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add request interceptor for authentication
    this.api.interceptors.request.use(async (config) => {
      // Skip authentication for login endpoint
      if (config.url === '/api/v1/auth/login') {
        return config;
      }

      // Check if token is expired or not set
      if (!this.token || this.isTokenExpired()) {
        await this.login();
      }

      // Add token to request headers
      config.headers.Authorization = `Bearer ${this.token}`;

      return config;
    });
  }

  /**
   * Check if the token is expired
   * @returns {boolean} - Whether the token is expired
   */
  isTokenExpired() {
    if (!this.tokenExpiry) return true;

    // Consider token expired 5 minutes before actual expiry
    const expiryBuffer = 5 * 60 * 1000; // 5 minutes in milliseconds
    return Date.now() >= (this.tokenExpiry - expiryBuffer);
  }

  /**
   * Login to the MCP API
   * @returns {Promise<string>} - JWT token
   */
  async login() {
    try {
      const response = await this.api.post('/api/v1/auth/login', {
        apiKey: this.config.API_KEY
      });

      this.token = response.data.token;
      this.tokenExpiry = Date.now() + (response.data.expiresIn * 1000);

      return this.token;
    } catch (error) {
      console.error('MCP login failed:', error.message);
      throw new Error(`MCP authentication failed: ${error.message}`);
    }
  }

  /**
   * Get server status
   * @returns {Promise<Object>} - Server status information
   */
  async getStatus() {
    try {
      const response = await this.api.get('/status');
      return response.data;
    } catch (error) {
      console.error('Failed to get MCP status:', error.message);
      throw error;
    }
  }

  /**
   * List available files
   * @returns {Promise<Array>} - List of files
   */
  async listFiles() {
    try {
      const response = await this.api.get('/api/v1/files');
      return response.data.files;
    } catch (error) {
      console.error('Failed to list files:', error.message);
      throw error;
    }
  }

  /**
   * Upload a file
   * @param {File|Buffer} file - File to upload
   * @param {string} filename - Name of the file
   * @returns {Promise<Object>} - Upload result
   */
  async uploadFile(file, filename) {
    try {
      const formData = new FormData();
      formData.append('file', file, filename);

      const response = await this.api.post('/api/v1/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Failed to upload file:', error.message);
      throw error;
    }
  }

  /**
   * Analyze a smart contract
   * @param {Object} options - Analysis options
   * @param {string} options.address - Contract address
   * @param {string} options.source - Contract source code
   * @param {string} options.bytecode - Contract bytecode
   * @returns {Promise<Object>} - Analysis result
   */
  async analyzeContract(options) {
    try {
      const response = await this.api.post('/api/v1/contracts/analyze', options);
      return response.data;
    } catch (error) {
      console.error('Failed to analyze contract:', error.message);
      throw error;
    }
  }

  /**
   * Scan for vulnerabilities
   * @param {string} target - Target to scan
   * @param {string} scanType - Type of scan
   * @param {Object} options - Scan options
   * @returns {Promise<Object>} - Scan result
   */
  async scanVulnerabilities(target, scanType = 'comprehensive', options = {}) {
    try {
      const response = await this.api.post('/api/v1/vulnerabilities', {
        target,
        scanType,
        options
      });

      return response.data;
    } catch (error) {
      console.error('Failed to scan vulnerabilities:', error.message);
      throw error;
    }
  }

  /**
   * Generate code fixes for a vulnerability
   * @param {string} vulnerabilityId - Vulnerability ID
   * @param {string} code - Vulnerable code
   * @param {string} language - Code language
   * @returns {Promise<Object>} - Generated fixes
   */
  async generateFixes(vulnerabilityId, code, language = 'javascript') {
    try {
      const response = await this.api.post('/api/v1/generate/fixes', {
        vulnerabilityId,
        code,
        language
      });

      return response.data;
    } catch (error) {
      console.error('Failed to generate fixes:', error.message);
      throw error;
    }
  }
}

// Example usage
const runExample = async () => {
  try {
    // Create MCP client
    const mcpClient = new McpClient();

    // Get server status
    console.log('Getting MCP server status...');
    const status = await mcpClient.getStatus();
    console.log('Server status:', status);

    // List files
    console.log('\nListing files...');
    const files = await mcpClient.listFiles();
    console.log('Files:', files);

    // Analyze a contract
    console.log('\nAnalyzing contract...');
    const analysisResult = await mcpClient.analyzeContract({
      address: '0x1234567890123456789012345678901234567890'
    });
    console.log('Analysis result:', analysisResult);

    // Scan for vulnerabilities
    console.log('\nScanning for vulnerabilities...');
    const scanResult = await mcpClient.scanVulnerabilities('https://example.com');
    console.log('Scan result:', scanResult);

    // Generate fixes
    console.log('\nGenerating fixes...');
    const fixResult = await mcpClient.generateFixes(
      'VULN-001',
      'user.find({ id: req.params.id })',
      'javascript'
    );
    console.log('Fix result:', fixResult);

    console.log('\nAll operations completed successfully!');
  } catch (error) {
    console.error('Example failed:', error.message);
  }
};

// Run the example if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runExample();
}

export default McpClient;