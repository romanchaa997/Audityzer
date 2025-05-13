/**
 * Web3FuzzForge Wallet Helper Functions
 *
 * Utility functions for wallet interactions in testing.
 */

/**
 * Setup a wallet state for testing
 * @param {Object} page - Playwright page object
 * @param {Object} options - Wallet state configuration
 * @param {string} options.chainId - Chain ID (hex string)
 * @param {string} options.networkName - Network name
 * @param {string[]} options.accounts - Array of account addresses
 * @param {string} options.balance - Account balance (in wei)
 * @returns {Promise<void>}
 */
async function setupWalletState(page, options = {}) {
  const defaultOptions = {
    chainId: '0x1',
    networkName: 'Ethereum Mainnet',
    accounts: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
    balance: '100000000000000000000', // 100 ETH
  };

  const config = { ...defaultOptions, ...options };

  // Set up a mock Ethereum provider for testing
  await page.addInitScript(walletConfig => {
    // Mock ethereum provider
    window.ethereum = {
      isMetaMask: true,
      selectedAddress: walletConfig.accounts[0],
      chainId: walletConfig.chainId,
      networkVersion: parseInt(walletConfig.chainId, 16).toString(),

      // Method to request accounts
      request: async function (args) {
        if (args.method === 'eth_requestAccounts' || args.method === 'eth_accounts') {
          return walletConfig.accounts;
        }
        if (args.method === 'eth_chainId') {
          return walletConfig.chainId;
        }
        if (args.method === 'net_version') {
          return parseInt(walletConfig.chainId, 16).toString();
        }
        if (args.method === 'eth_getBalance') {
          return walletConfig.balance;
        }
        if (args.method === 'eth_sendTransaction') {
          // Mock transaction hash
          return (
            '0x' +
            Array(64)
              .fill(0)
              .map(() => Math.floor(Math.random() * 16).toString(16))
              .join('')
          );
        }
        // Return empty result for other requests
        return null;
      },

      // Legacy API support
      enable: async function () {
        return walletConfig.accounts;
      },

      // Event handlers
      on: function (eventName, callback) {
        // Store callback for future use
        if (!window._ethereumEventHandlers) {
          window._ethereumEventHandlers = {};
        }
        if (!window._ethereumEventHandlers[eventName]) {
          window._ethereumEventHandlers[eventName] = [];
        }
        window._ethereumEventHandlers[eventName].push(callback);
      },

      // Remove event handlers
      removeListener: function (eventName, callback) {
        if (window._ethereumEventHandlers && window._ethereumEventHandlers[eventName]) {
          const index = window._ethereumEventHandlers[eventName].indexOf(callback);
          if (index > -1) {
            window._ethereumEventHandlers[eventName].splice(index, 1);
          }
        }
      },
    };

    // Store the original ethereum to restore later if needed
    window._originalEthereum = window.ethereum;

    console.log('Mock wallet injected with config:', walletConfig);
  }, config);

  console.log('Wallet state set up with config:', config);
}

/**
 * Connect wallet to the dApp
 * @param {Object} page - Playwright page object
 * @returns {Promise<void>}
 */
async function connectWallet(page) {
  // Simulate a wallet connection
  await page.evaluate(async () => {
    // If the dApp has a specific connection flow, we would simulate that here
    // For testing purposes, we'll just simulate a successful connection

    // Trigger a connection event in case any handlers are listening
    if (window._ethereumEventHandlers && window._ethereumEventHandlers.connect) {
      window._ethereumEventHandlers.connect.forEach(cb => {
        cb({ chainId: window.ethereum.chainId });
      });
    }

    // Trigger an accounts changed event
    if (window._ethereumEventHandlers && window._ethereumEventHandlers.accountsChanged) {
      window._ethereumEventHandlers.accountsChanged.forEach(cb => {
        cb([window.ethereum.selectedAddress]);
      });
    }

    console.log('Wallet connected with address:', window.ethereum.selectedAddress);
    return { connected: true, address: window.ethereum.selectedAddress };
  });

  console.log('Wallet connection simulated');
}

// Export the functions
module.exports = {
  setupWalletState,
  connectWallet,
};
