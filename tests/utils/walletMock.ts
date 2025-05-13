// walletMock.ts
import { Page } from '@playwright/test';

// Interface definitions
export interface WalletState {
  connected: boolean;
  address: string | null;
  provider: string | null;
  chainId: string;
  networkName: string;
  balance: string;
}

export interface ConnectWalletOptions {
  provider: 'metamask' | 'walletconnect' | 'coinbase';
  address?: string;
  chainId?: string;
  balance?: string;
}

export interface SwitchWalletOptions {
  provider: 'metamask' | 'walletconnect' | 'coinbase';
  address?: string;
  chainId?: string;
}

export interface SwitchNetworkOptions {
  chainId: string;
  expectError?: boolean;
}

export interface TransactionOptions {
  to: string;
  value: string;
  gasLimit?: string;
  simulateRejection?: boolean;
  simulateFailure?: boolean;
  failureReason?: string;
}

export interface TransactionResult {
  success: boolean;
  hash?: string;
  confirmations?: number;
  error?: string;
}

// Ethereum request types
interface EthereumRequest {
  method: string;
  params?: any[];
}

// Event listener type
type EventCallback = (data: any) => void;

// Network names type
interface NetworkNames {
  [key: string]: string;
}

// Mock Ethereum provider interface
interface MockEthereumProvider {
  isMetaMask: boolean;
  isCoinbaseWallet: boolean;
  isWalletConnect: boolean;
  selectedAddress: string;
  chainId: string;
  networkVersion: string;
  _events: Record<string, EventCallback[]>;
  request: (req: EthereumRequest) => Promise<any>;
  on: (eventName: string, callback: EventCallback) => MockEthereumProvider;
  removeListener: (eventName: string, callback: EventCallback) => MockEthereumProvider;
  [key: string]: any;
}

// Augment Window interface
declare global {
  interface Window {
    ethereum?: MockEthereumProvider;
  }
}

/**
 * Connects the specified wallet provider to the dApp
 */
export async function connectWallet(page: Page, options: ConnectWalletOptions): Promise<void> {
  const provider = options.provider || 'metamask';
  const address = options.address || `0x${generateRandomHex(40)}`;
  const chainId = options.chainId || '0x1'; // Default to Ethereum Mainnet
  const balance = options.balance || '10000000000000000000'; // 10 ETH

  // Create the provider mock on the page
  await page.evaluate(
    ({ provider, address, chainId, balance }) => {
      // Create mock provider
      window.ethereum = {
        isMetaMask: provider === 'metamask',
        isCoinbaseWallet: provider === 'coinbase',
        isWalletConnect: provider === 'walletconnect',
        selectedAddress: address,
        chainId,
        networkVersion: parseInt(chainId, 16).toString(),
        _events: {},

        // Mock request method
        request: async ({ method, params = [] }: EthereumRequest) => {
          console.log(`Mock ${provider}: ${method} called with params:`, params);

          switch (method) {
            case 'eth_requestAccounts':
              return [address];

            case 'eth_accounts':
              return [address];

            case 'eth_chainId':
              return chainId;

            case 'eth_getBalance':
              return balance;

            default:
              console.warn(`Unhandled method: ${method}`);
              return null;
          }
        },

        // Event handling
        on: (eventName: string, callback: EventCallback) => {
          if (!window.ethereum!._events[eventName]) {
            window.ethereum!._events[eventName] = [];
          }
          window.ethereum!._events[eventName].push(callback);
          return window.ethereum!;
        },

        removeListener: (eventName: string, callback: EventCallback) => {
          if (window.ethereum!._events[eventName]) {
            window.ethereum!._events[eventName] = window.ethereum!._events[eventName].filter(
              (cb: EventCallback) => cb !== callback
            );
          }
          return window.ethereum!;
        },
      };

      // Dispatch connection event if applicable
      if (provider === 'metamask') {
        window.dispatchEvent(new Event('ethereum#initialized'));
      }

      // Add UI elements for connected wallet if they don't exist
      if (!document.getElementById('wallet-info')) {
        const walletInfo = document.createElement('div');
        walletInfo.id = 'wallet-info';
        walletInfo.innerHTML = `
          <div>Provider: <span id="wallet-provider">${provider}</span></div>
          <div>Address: <span class="wallet-address">${address}</span></div>
          <div>Network: <span id="network-name">${getNetworkName(chainId)}</span></div>
        `;
        document.body.appendChild(walletInfo);
      } else {
        // Update existing UI
        const walletProviderEl = document.getElementById('wallet-provider');
        const walletAddressEl = document.querySelector('.wallet-address');
        const networkNameEl = document.getElementById('network-name');
        
        if (walletProviderEl) walletProviderEl.textContent = provider;
        if (walletAddressEl) walletAddressEl.textContent = address;
        if (networkNameEl) networkNameEl.textContent = getNetworkName(chainId);
      }

      // Helper to get network name from chainId
      function getNetworkName(chainId: string): string {
        const networks: NetworkNames = {
          '0x1': 'Ethereum Mainnet',
          '0x5': 'Goerli Testnet',
          '0x89': 'Polygon Mainnet',
          '0xa4b1': 'Arbitrum One',
          '0xa': 'Optimism',
        };
        return networks[chainId as keyof typeof networks] || `Chain ID: ${chainId}`;
      }
    },
    { provider, address, chainId, balance }
  );

  // Click the connect button on the page (if it exists)
  try {
    await page.click('#connect-button, #connect-wallet, button:has-text("Connect")');
  } catch (e) {
    // Connect button might not exist, which is fine for mock setup
    console.log('Could not find connect button, proceeding with mock setup anyway');
  }

  // Wait for the UI to update
  await page.waitForTimeout(100);
}

/**
 * Gets the current wallet state from the page
 */
export async function getWalletState(page: Page): Promise<WalletState> {
  return await page.evaluate(() => {
    if (!window.ethereum) {
      return {
        connected: false,
        address: null,
        provider: null,
        chainId: '0x0',
        networkName: 'Not Connected',
        balance: '0',
      };
    }

    const networkNames = {
      '0x1': 'Ethereum Mainnet',
      '0x5': 'Goerli Testnet',
      '0x89': 'Polygon Mainnet',
      '0xa4b1': 'Arbitrum One',
      '0xa': 'Optimism',
    };

    let provider = 'unknown';
    if (window.ethereum.isMetaMask) provider = 'metamask';
    if (window.ethereum.isWalletConnect) provider = 'walletconnect';
    if (window.ethereum.isCoinbaseWallet) provider = 'coinbase';

    const chainId = window.ethereum.chainId || '0x0';

    return {
      connected: !!window.ethereum.selectedAddress,
      address: window.ethereum.selectedAddress,
      provider,
      chainId,
      networkName: networkNames[chainId] || `Chain ID: ${chainId}`,
      balance: window.ethereum._balance || '0',
    };
  });
}

/**
 * Switches to a different wallet provider
 */
export async function switchWallet(page: Page, options: SwitchWalletOptions): Promise<void> {
  const provider = options.provider;
  const address = options.address || `0x${generateRandomHex(40)}`;
  const chainId = options.chainId || (await getWalletState(page)).chainId;

  await page.evaluate(
    ({ provider, address, chainId }) => {
      // Save the old events
      const oldEvents = window.ethereum?._events || {};

      // Create new provider
      window.ethereum = {
        isMetaMask: provider === 'metamask',
        isCoinbaseWallet: provider === 'coinbase',
        isWalletConnect: provider === 'walletconnect',
        selectedAddress: address,
        chainId,
        networkVersion: parseInt(chainId, 16).toString(),
        _events: oldEvents, // Keep old event listeners

        // Mock request method
        request: async ({ method, params = [] }: EthereumRequest) => {
          console.log(`Mock ${provider}: ${method} called with params:`, params);

          switch (method) {
            case 'eth_requestAccounts':
              return [address];

            case 'eth_accounts':
              return [address];

            case 'eth_chainId':
              return chainId;

            default:
              console.warn(`Unhandled method: ${method}`);
              return null;
          }
        },

        // Event handling
        on: (eventName: string, callback: EventCallback) => {
          if (!window.ethereum._events[eventName]) {
            window.ethereum._events[eventName] = [];
          }
          window.ethereum._events[eventName].push(callback);
          return window.ethereum;
        },

        removeListener: (eventName: string, callback: EventCallback) => {
          if (window.ethereum._events[eventName]) {
            window.ethereum._events[eventName] = window.ethereum._events[eventName].filter(
              (cb: EventCallback) => cb !== callback
            );
          }
          return window.ethereum;
        },
      };

      // Update UI
      if (document.getElementById('wallet-provider')) {
        document.getElementById('wallet-provider').textContent = provider;
      }
      if (document.querySelector('.wallet-address')) {
        document.querySelector('.wallet-address').textContent = address;
      }

      // Emit events
      const accountsChangedListeners = oldEvents.accountsChanged || [];
      accountsChangedListeners.forEach(listener => {
        try {
          listener([address]);
        } catch (e) {
          console.error('Error in accountsChanged listener:', e);
        }
      });
    },
    { provider, address, chainId }
  );

  // Wait for the UI to update
  await page.waitForTimeout(100);
}

/**
 * Switches the connected wallet to a different network
 */
export async function switchNetwork(page: Page, options: SwitchNetworkOptions): Promise<void> {
  const chainId = options.chainId;
  const expectError = options.expectError || false;

  if (expectError) {
    // If we expect an error, we'll simulate it
    await page.evaluate(
      ({ chainId }) => {
        if (window.ethereum && window.ethereum.request) {
          // Override request method to throw for this call
          const originalRequest = window.ethereum.request;
          window.ethereum.request = async args => {
            if (
              args.method === 'wallet_switchEthereumChain' &&
              args.params &&
              args.params[0] &&
              args.params[0].chainId === chainId
            ) {
              throw new Error(`Cannot switch to unknown network with chainId: ${chainId}`);
            }
            return originalRequest(args);
          };
        }
      },
      { chainId }
    );

    // Now throw the error
    await page
      .evaluate(
        async ({ chainId }) => {
          if (!window.ethereum) throw new Error('No ethereum provider');

          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }],
          });
        },
        { chainId }
      )
      .catch(error => {
        // Re-throw the error so it can be caught by the test
        throw new Error(`Network switching error: ${error.message}`);
      });
  } else {
    // Normal network switching behavior
    await page.evaluate(
      async ({ chainId }) => {
        const networkNames = {
          '0x1': 'Ethereum Mainnet',
          '0x5': 'Goerli Testnet',
          '0x89': 'Polygon Mainnet',
          '0xa4b1': 'Arbitrum One',
          '0xa': 'Optimism',
        };

        if (!window.ethereum) throw new Error('No ethereum provider');

        // Update ethereum object
        window.ethereum.chainId = chainId;
        window.ethereum.networkVersion = parseInt(chainId, 16).toString();

        // Update UI
        if (document.getElementById('network-name')) {
          document.getElementById('network-name').textContent =
            networkNames[chainId] || `Chain ID: ${chainId}`;
        }

        // Emit chainChanged event
        const chainChangedListeners = window.ethereum._events.chainChanged || [];
        chainChangedListeners.forEach(listener => {
          try {
            listener(chainId);
          } catch (e) {
            console.error('Error in chainChanged listener:', e);
          }
        });

        return chainId;
      },
      { chainId }
    );
  }

  // Wait for the UI to update
  await page.waitForTimeout(100);
}

/**
 * Disconnects the currently connected wallet
 */
export async function disconnectWallet(page: Page): Promise<void> {
  await page.evaluate(() => {
    if (window.ethereum) {
      const oldEvents = window.ethereum._events || {};
      window.ethereum.selectedAddress = null;

      // Emit disconnect event
      const disconnectListeners = oldEvents.disconnect || [];
      disconnectListeners.forEach(listener => {
        try {
          listener();
        } catch (e) {
          console.error('Error in disconnect listener:', e);
        }
      });

      // Hide wallet info in UI
      if (document.getElementById('wallet-info')) {
        document.getElementById('wallet-info').style.display = 'none';
      }
    }
  });

  // Wait for the UI to update
  await page.waitForTimeout(100);
}

/**
 * Simulates sending a transaction through the connected wallet
 */
export async function sendTransaction(
  page: Page,
  options: TransactionOptions
): Promise<TransactionResult> {
  const to = options.to;
  const value = options.value;
  const gasLimit = options.gasLimit || '21000';
  const simulateRejection = options.simulateRejection || false;
  const simulateFailure = options.simulateFailure || false;
  const failureReason = options.failureReason || 'transaction failed';

  if (simulateRejection) {
    return await page.evaluate(async () => {
      return {
        success: false,
        error: 'Transaction was rejected by user',
      };
    });
  }

  if (simulateFailure) {
    return await page.evaluate(
      async ({ failureReason }) => {
        return {
          success: false,
          error: failureReason,
        };
      },
      { failureReason }
    );
  }

  return await page.evaluate(
    async ({ to, value, gasLimit }) => {
      // Generate a random transaction hash
      const txHash =
        '0x' +
        Array(64)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join('');

      // Simulate the transaction result
      return {
        success: true,
        hash: txHash,
        confirmations: 1,
      };
    },
    { to, value, gasLimit }
  );
}

/**
 * Utility function to generate random hex string of specified length
 */
function generateRandomHex(length: number): string {
  return Array(length)
    .fill(0)
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
}
