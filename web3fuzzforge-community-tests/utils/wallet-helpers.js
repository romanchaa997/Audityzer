/**
 * Wallet interaction helper functions for Web3FuzzForge community tests
 * These utilities help simulate and interact with various wallet providers
 */

/**
 * Connects a wallet to the dApp
 * @param {Page} page - Playwright page object
 * @param {string} walletType - Type of wallet to connect ('metamask', 'walletconnect', etc.)
 * @returns {Promise<string>} Connected wallet address
 */
async function connectWallet(page, walletType = 'metamask') {
  console.log(`Connecting ${walletType} wallet...`);

  // Handle different wallet types
  switch (walletType.toLowerCase()) {
    case 'metamask':
      return await connectMetaMask(page);
    case 'walletconnect':
      return await connectWalletConnect(page);
    default:
      throw new Error(`Unsupported wallet type: ${walletType}`);
  }
}

/**
 * Connect MetaMask wallet to the dApp
 * @param {Page} page - Playwright page object
 * @returns {Promise<string>} Connected wallet address
 */
async function connectMetaMask(page) {
  // This is a simplified mock implementation
  // In actual tests, you would use dappeteer or similar libraries

  // Simulate MetaMask being injected
  await page.evaluate(() => {
    if (!window.ethereum) {
      window.ethereum = {
        isMetaMask: true,
        selectedAddress: null,
        chainId: '0x1',
        request: async ({ method, params }) => {
          if (method === 'eth_requestAccounts' || method === 'eth_accounts') {
            window.ethereum.selectedAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
            return ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'];
          }
          if (method === 'eth_chainId') {
            return window.ethereum.chainId;
          }
          console.log(`MetaMask mock: Method ${method} not implemented`);
          return null;
        },
        on: (eventName, callback) => {
          console.log(`Registered event listener for ${eventName}`);
        },
      };

      // Dispatch ethereum#initialized event
      const event = new Event('ethereum#initialized');
      window.dispatchEvent(event);
    }
  });

  // Return the mock address
  return '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
}

/**
 * Connect WalletConnect to the dApp
 * @param {Page} page - Playwright page object
 * @returns {Promise<string>} Connected wallet address
 */
async function connectWalletConnect(page) {
  // Mock implementation for WalletConnect
  // In real tests, this would handle the WalletConnect protocol

  await page.evaluate(() => {
    if (!window.ethereum) {
      window.ethereum = {
        isWalletConnect: true,
        selectedAddress: null,
        chainId: '0x1',
        request: async ({ method, params }) => {
          if (method === 'eth_requestAccounts' || method === 'eth_accounts') {
            window.ethereum.selectedAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
            return ['0x71C7656EC7ab88b098defB751B7401B5f6d8976F'];
          }
          if (method === 'eth_chainId') {
            return window.ethereum.chainId;
          }
          console.log(`WalletConnect mock: Method ${method} not implemented`);
          return null;
        },
      };
    }
  });

  // Return the mock address
  return '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
}

/**
 * Sets up wallet state for testing
 * @param {Page} page - Playwright page object
 * @param {Object} options - Wallet state options
 * @returns {Promise<Object>} Wallet state
 */
async function setupWalletState(page, options = {}) {
  const defaultOptions = {
    chainId: '0x1',
    networkName: 'Ethereum Mainnet',
    locked: false,
    accounts: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
  };

  const config = { ...defaultOptions, ...options };

  // Setup the wallet state in the page
  await page.evaluate(config => {
    if (!window.ethereum) {
      window.ethereum = {
        isMetaMask: true,
        selectedAddress: config.locked ? null : config.accounts[0],
        chainId: config.chainId,
        networkVersion: parseInt(config.chainId, 16).toString(),
        request: async ({ method, params }) => {
          if (config.locked && (method === 'eth_requestAccounts' || method === 'eth_accounts')) {
            throw new Error('MetaMask is locked');
          }

          if (method === 'eth_requestAccounts' || method === 'eth_accounts') {
            window.ethereum.selectedAddress = config.accounts[0];
            return config.accounts;
          }

          if (method === 'eth_chainId') {
            return config.chainId;
          }

          if (method === 'wallet_switchEthereumChain') {
            window.ethereum.chainId = params[0].chainId;
            window.ethereum.networkVersion = parseInt(params[0].chainId, 16).toString();
            return null;
          }

          console.log(`Method ${method} not implemented in mock`);
          return null;
        },
        on: (eventName, callback) => {
          console.log(`Registered event listener for ${eventName}`);
        },
        _eventsLog: [],
      };

      // Track connection attempts
      window._connectionAttempts = 0;

      // Override request to track connection attempts
      const originalRequest = window.ethereum.request;
      window.ethereum.request = async args => {
        if (args.method === 'eth_requestAccounts') {
          window._connectionAttempts++;
        }
        window.ethereum._eventsLog.push({
          timestamp: new Date().toISOString(),
          method: args.method,
          params: args.params,
        });
        return originalRequest.call(window.ethereum, args);
      };
    }
  }, config);

  return config;
}

/**
 * Saves current wallet state for later restoration
 * @param {Page} page - Playwright page object
 * @param {Object} customData - Additional data to save with the state
 * @returns {Promise<Object>} Saved wallet state
 */
async function saveWalletState(page, customData = {}) {
  const state = await page.evaluate(() => {
    if (!window.ethereum) {
      return null;
    }

    return {
      selectedAddress: window.ethereum.selectedAddress,
      chainId: window.ethereum.chainId,
      networkVersion: window.ethereum.networkVersion,
      eventsLog: window.ethereum._eventsLog || [],
      connectionAttempts: window._connectionAttempts || 0,
    };
  });

  return { ...state, ...customData };
}

/**
 * Restores a previously saved wallet state
 * @param {Page} page - Playwright page object
 * @param {Object} state - Previously saved wallet state
 * @returns {Promise<void>}
 */
async function restoreWalletState(page, state) {
  if (!state) {
    throw new Error('Invalid wallet state provided');
  }

  await page.evaluate(state => {
    if (!window.ethereum) {
      console.error('Cannot restore state: window.ethereum not found');
      return;
    }

    window.ethereum.selectedAddress = state.selectedAddress;
    window.ethereum.chainId = state.chainId;
    window.ethereum.networkVersion = state.networkVersion;
    window.ethereum._eventsLog = state.eventsLog || [];
    window._connectionAttempts = state.connectionAttempts || 0;

    // Dispatch events for state change
    if (window.ethereum.emit) {
      if (state.selectedAddress) {
        window.ethereum.emit('accountsChanged', [state.selectedAddress]);
      }
      window.ethereum.emit('chainChanged', state.chainId);
    }
  }, state);
}

module.exports = {
  connectWallet,
  connectMetaMask,
  connectWalletConnect,
  setupWalletState,
  saveWalletState,
  restoreWalletState,
};
