/**
 * @fileoverview Headless wallet testing for CI environments
 *
 * This module provides functionality for wallet testing in headless CI environments
 * where browser UI interactions are not possible.
 */

const { chromium } = require('@playwright/test');

class HeadlessWalletTesting {
  constructor(config = {}) {
    this.config = {
      chainId: config.chainId || '0x1',
      networkName: config.networkName || 'Ethereum Mainnet',
      rpcUrl: config.rpcUrl || 'http://localhost:8545',
      privateKey: config.privateKey || '',
      accounts: config.accounts || [],
      walletType: config.walletType || 'metamask',
      ...config,
    };

    this.browser = null;
    this.page = null;
    this.wallet = null;
    this.mockResponses = [];
  }

  /**
   * Setup headless browser and page
   * @returns {Promise<Object>} The browser and page objects
   */
  async setupBrowser() {
    // Launch browser in headless mode
    this.browser = await chromium.launch({ headless: true });

    // Create browser context
    const context = await this.browser.newContext({
      viewport: { width: 1280, height: 800 },
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    });

    // Create page
    this.page = await context.newPage();

    return { browser: this.browser, page: this.page };
  }

  /**
   * Setup mock wallet provider for Ethereum
   * @returns {Promise<void>}
   */
  async setupMockProvider() {
    // Inject mock ethereum provider into page
    await this.page.addInitScript(() => {
      const mockEthereum = {
        isMetaMask: true,
        isConnected: () => true,
        _metamask: {
          isUnlocked: () => Promise.resolve(true),
        },
        on: (eventName, callback) => {
          console.log(`Registered event handler for: ${eventName}`);
          // Immediately trigger connect event with chainId
          if (eventName === 'connect') {
            callback({ chainId: window._mockChainId || '0x1' });
          }
        },
        removeListener: () => {},
        // Mock request method that will be overridden with specific implementations
        request: async args => {
          console.log('Mock ethereum.request called with:', args);

          // Default mock responses
          if (args.method === 'eth_accounts' || args.method === 'eth_requestAccounts') {
            return window._mockAccounts || ['0x1234567890123456789012345678901234567890'];
          }

          if (args.method === 'eth_chainId') {
            return window._mockChainId || '0x1';
          }

          return null;
        },
        // Expose variables that can be modified by test scripts
        _setMockData: data => {
          window._mockAccounts = data.accounts;
          window._mockChainId = data.chainId;
          window._mockResponses = data.mockResponses || {};
        },
      };

      // Assign to window.ethereum
      window.ethereum = mockEthereum;

      // Also provide a MockWalletProvider for testing custom wallets
      window.MockWalletProvider = mockEthereum;

      console.log('Mock Ethereum provider injected');
    });

    // Configure the mock provider with test data
    await this.page.evaluate(config => {
      window.ethereum._setMockData({
        accounts: config.accounts || ['0x1234567890123456789012345678901234567890'],
        chainId: config.chainId || '0x1',
        mockResponses: config.mockResponses || {},
      });
    }, this.config);

    console.log('Mock provider configured with test accounts and chain ID');
  }

  /**
   * Configure mock responses for specific RPC methods
   * @param {Array} mockResponses - Array of mock response configurations
   * @returns {Promise<void>}
   */
  async configureMockResponses(mockResponses) {
    this.mockResponses = mockResponses || [];

    if (!this.page) {
      throw new Error('Browser page not initialized. Call setupBrowser() first.');
    }

    await this.page.evaluate(responses => {
      // Create a map of method -> response for easy lookup
      const responseMap = {};
      responses.forEach(response => {
        responseMap[response.method] = response.response;
      });

      // Override the request method to use our custom responses
      const originalRequest = window.ethereum.request;
      window.ethereum.request = async args => {
        console.log(`Mock ethereum.request called with method: ${args.method}`);

        // Check if we have a mock response for this method
        if (responseMap[args.method]) {
          console.log(`Using mock response for method: ${args.method}`);

          // If the mock response is a function, call it with the args
          if (typeof responseMap[args.method] === 'function') {
            return responseMap[args.method](args);
          }

          // Otherwise, return the static response
          return responseMap[args.method];
        }

        // Fall back to default behavior
        return originalRequest(args);
      };

      console.log('Mock responses configured');
    }, this.mockResponses);
  }

  /**
   * Simulate a wallet connection in headless mode
   * @param {string} dAppUrl - URL of the dApp to connect to
   * @returns {Promise<boolean>} Whether connection was successful
   */
  async simulateWalletConnection(dAppUrl) {
    if (!this.page) {
      await this.setupBrowser();
    }

    if (!this.wallet) {
      await this.setupMockProvider();
    }

    try {
      // Navigate to the dApp
      await this.page.goto(dAppUrl, { waitUntil: 'networkidle' });
      console.log(`Navigated to dApp: ${dAppUrl}`);

      // Configure wallet for automatic connection
      await this.configureMockResponses([
        {
          method: 'eth_requestAccounts',
          response: this.config.accounts || ['0x1234567890123456789012345678901234567890'],
        },
        {
          method: 'eth_accounts',
          response: this.config.accounts || ['0x1234567890123456789012345678901234567890'],
        },
        {
          method: 'eth_chainId',
          response: this.config.chainId || '0x1',
        },
      ]);

      // Take a screenshot for debugging
      await this.page.screenshot({ path: './test-results/headless-wallet-connection.png' });

      console.log('Wallet connection simulated successfully');
      return true;
    } catch (error) {
      console.error('Error simulating wallet connection:', error);
      return false;
    }
  }

  /**
   * Simulate a transaction in headless mode
   * @param {Object} txParams - Transaction parameters
   * @returns {Promise<Object>} Transaction result
   */
  async simulateTransaction(txParams = {}) {
    if (!this.page) {
      throw new Error('Browser page not initialized. Call setupBrowser() first.');
    }

    const defaultTxParams = {
      to: '0x2222222222222222222222222222222222222222',
      from: this.config.accounts?.[0] || '0x1234567890123456789012345678901234567890',
      value: '0x0',
      gas: '0x5208', // 21000
      gasPrice: '0x3b9aca00', // 1 Gwei
      data: '0x',
      ...txParams,
    };

    try {
      // Configure mock response for eth_sendTransaction
      await this.configureMockResponses([
        {
          method: 'eth_sendTransaction',
          response: args => {
            console.log('Mock eth_sendTransaction called with params:', args.params[0]);
            // Return a fake transaction hash
            return '0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234';
          },
        },
      ]);

      // Execute the transaction on the page
      const txHash = await this.page.evaluate(async params => {
        try {
          const result = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [params],
          });
          return result;
        } catch (error) {
          console.error('Error in eth_sendTransaction:', error);
          return null;
        }
      }, defaultTxParams);

      console.log(`Transaction simulated with hash: ${txHash}`);

      // Take a screenshot for debugging
      await this.page.screenshot({ path: './test-results/headless-wallet-transaction.png' });

      return {
        success: !!txHash,
        txHash,
        params: defaultTxParams,
      };
    } catch (error) {
      console.error('Error simulating transaction:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Simulate signing a message in headless mode
   * @param {string} message - Message to sign
   * @param {string} account - Account to sign with
   * @returns {Promise<Object>} Signature result
   */
  async simulateSignMessage(message, account) {
    if (!this.page) {
      throw new Error('Browser page not initialized. Call setupBrowser() first.');
    }

    const signingAccount =
      account || this.config.accounts?.[0] || '0x1234567890123456789012345678901234567890';

    try {
      // Configure mock response for personal_sign
      await this.configureMockResponses([
        {
          method: 'personal_sign',
          response: () => {
            // Return a fake signature
            return '0xabcdef123456789abcdef123456789abcdef123456789abcdef123456789abcdef123456789abcdef123456789abcdef123456789abcdef123456789abcdef1c';
          },
        },
      ]);

      // Execute the signing on the page
      const signature = await this.page.evaluate(
        async (msg, addr) => {
          try {
            const result = await window.ethereum.request({
              method: 'personal_sign',
              params: [msg, addr],
            });
            return result;
          } catch (error) {
            console.error('Error in personal_sign:', error);
            return null;
          }
        },
        message,
        signingAccount
      );

      console.log(`Message signed with signature: ${signature}`);

      // Take a screenshot for debugging
      await this.page.screenshot({ path: './test-results/headless-wallet-signing.png' });

      return {
        success: !!signature,
        signature,
        message,
        account: signingAccount,
      };
    } catch (error) {
      console.error('Error simulating message signing:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Simulate switching networks in headless mode
   * @param {string} chainId - Chain ID to switch to
   * @returns {Promise<boolean>} Whether network switch was successful
   */
  async simulateSwitchNetwork(chainId) {
    if (!this.page) {
      throw new Error('Browser page not initialized. Call setupBrowser() first.');
    }

    const targetChainId = chainId || '0x3'; // Default to Ropsten testnet

    try {
      // Configure mock response for wallet_switchEthereumChain
      await this.configureMockResponses([
        {
          method: 'wallet_switchEthereumChain',
          response: async args => {
            console.log(
              `Mock wallet_switchEthereumChain called with chainId: ${args.params[0].chainId}`
            );

            // Update the mock chain ID
            await this.page.evaluate(newChainId => {
              window._mockChainId = newChainId;
            }, targetChainId);

            // Return null for success
            return null;
          },
        },
      ]);

      // Execute the network switch on the page
      const success = await this.page.evaluate(async targetChainId => {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetChainId }],
          });

          // Verify the chain ID changed
          const newChainId = await window.ethereum.request({ method: 'eth_chainId' });
          return newChainId === targetChainId;
        } catch (error) {
          console.error('Error in wallet_switchEthereumChain:', error);
          return false;
        }
      }, targetChainId);

      console.log(`Network switch simulated: ${success ? 'successful' : 'failed'}`);

      // Take a screenshot for debugging
      await this.page.screenshot({ path: './test-results/headless-wallet-network-switch.png' });

      return success;
    } catch (error) {
      console.error('Error simulating network switch:', error);
      return false;
    }
  }

  /**
   * Close browser and clean up resources
   * @returns {Promise<void>}
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
      this.wallet = null;
    }
  }
}

module.exports = HeadlessWalletTesting;
