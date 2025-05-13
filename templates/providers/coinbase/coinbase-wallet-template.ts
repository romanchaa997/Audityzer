/**
 * Coinbase Wallet Template for Web3 Security Testing
 * 
 * This template provides functions for integrating with Coinbase Wallet
 * in security testing scenarios.
 */

import { Page } from '@playwright/test';

/**
 * Configuration interface for Coinbase Wallet connection
 */
export interface CoinbaseWalletConfig {
  timeout?: number;
  chainId?: string;
  autoApprove?: boolean;
  mockAddress?: string;
}

/**
 * Default configuration for Coinbase Wallet connection
 */
const DEFAULT_CONFIG: CoinbaseWalletConfig = {
  timeout: 10000,
  chainId: '0x1',
  autoApprove: true,
};

/**
 * Connect to Coinbase Wallet
 * @param page - Playwright page object
 * @param config - Configuration options
 * @returns Promise resolving to connected address
 */
export async function connectCoinbaseWallet(page: Page, config: CoinbaseWalletConfig = {}): Promise<string> {
  const options = { ...DEFAULT_CONFIG, ...config };

  // Check if we're in mock or live mode
  const isMockMode = process.env.MOCK_MODE === 'true';
  
  if (isMockMode) {
    return mockCoinbaseWalletConnection(page, options);
  } else {
    return handleLiveCoinbaseWalletConnection(page, options);
  }
}

/**
 * Mock a Coinbase Wallet connection
 * @param page - Playwright page object
 * @param config - Configuration options
 * @returns Promise resolving to mocked address
 */
async function mockCoinbaseWalletConnection(page: Page, config: CoinbaseWalletConfig): Promise<string> {
  const mockAddress = config.mockAddress || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
  
  // Inject mock provider
  await page.evaluate(({ address, chainId }) => {
    // Create mock Coinbase Wallet provider
    const mockProvider = {
      isCoinbaseWallet: true,
      isConnected: true,
      selectedAddress: address,
      chainId: chainId,
      isMetaMask: false,
      
      request: async (params: any) => {
        console.log('Mock Coinbase Wallet request:', params);
        
        switch (params.method) {
          case 'eth_requestAccounts':
          case 'eth_accounts':
            return [address];
          case 'eth_chainId':
            return chainId;
          case 'wallet_switchEthereumChain':
            console.log('Mock switching chain to:', params.params[0].chainId);
            mockProvider.chainId = params.params[0].chainId;
            return null;
          case 'eth_sendTransaction':
            // Return mock transaction hash
            return '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
          case 'eth_signTypedData_v4':
          case 'personal_sign':
          case 'eth_sign':
            // Return mock signature
            return '0x' + Array(130).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
          default:
            throw new Error(`Mock Coinbase Wallet: Unhandled method ${params.method}`);
        }
      },
      
      on: (event: string, callback: Function) => {
        console.log(`Mock Coinbase Wallet event listener registered: ${event}`);
      },
      
      removeListener: (event: string, callback: Function) => {
        console.log(`Mock Coinbase Wallet event listener removed: ${event}`);
      }
    };
  
    // Add provider to window
    window.ethereum = mockProvider;
    
    // Also add coinbaseWalletExtension for detection
    window.coinbaseWalletExtension = mockProvider;
    
    console.log('Mock Coinbase Wallet injected:', address);
  }, { address: mockAddress, chainId: config.chainId });
  
  return mockAddress;
}

/**
 * Handle live connection with Coinbase Wallet
 * @param page - Playwright page object
 * @param config - Configuration options
 * @returns Promise resolving to connected address
 */
async function handleLiveCoinbaseWalletConnection(page: Page, config: CoinbaseWalletConfig): Promise<string> {
  // Wait for Coinbase Wallet to be installed/available
  await page.waitForFunction(() => window.coinbaseWalletExtension || window.ethereum?.isCoinbaseWallet, { timeout: config.timeout });
  
  // Request accounts
  const accounts = await page.evaluate(async () => {
    const provider = window.coinbaseWalletExtension || window.ethereum;
    try {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      return accounts;
    } catch (error) {
      console.error('Failed to get accounts from Coinbase Wallet:', error);
      return [];
    }
  });
  
  if (!accounts || accounts.length === 0) {
    throw new Error('Failed to connect to Coinbase Wallet or no accounts available');
  }
  
  // Auto-approve connection requests if configured
  if (config.autoApprove) {
    // Switch chain if needed
    if (config.chainId) {
      await page.evaluate(async (chainId) => {
        const provider = window.coinbaseWalletExtension || window.ethereum;
        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }],
          });
        } catch (error) {
          console.error('Failed to switch chain:', error);
        }
      }, config.chainId);
    }
  }
  
  return accounts[0];
}

/**
 * Sign a message with Coinbase Wallet
 * @param page - Playwright page object
 * @param message - The message to sign
 * @param address - The address to sign with
 * @returns Promise resolving to signature
 */
export async function signMessageWithCoinbaseWallet(page: Page, message: string, address?: string): Promise<string> {
  const signature = await page.evaluate(async ({ msg, addr }) => {
    const provider = window.coinbaseWalletExtension || window.ethereum;
    
    // Get the first account if address not provided
    const signingAddress = addr || (await provider.request({ method: 'eth_accounts' }))[0];
    
    if (!signingAddress) {
      throw new Error('No address available for signing');
    }
    
    // Convert message to hex if it's not already
    const hexMessage = msg.startsWith('0x') 
      ? msg 
      : '0x' + Buffer.from(msg).toString('hex');
    
    // Sign the message
    try {
      const signature = await provider.request({
        method: 'personal_sign',
        params: [hexMessage, signingAddress],
      });
      return signature;
    } catch (error) {
      console.error('Failed to sign message:', error);
      throw error;
    }
  }, { msg: message, addr: address });
  
  return signature;
}

/**
 * Disconnect from Coinbase Wallet
 * @param page - Playwright page object
 * @returns Promise resolving when disconnected
 */
export async function disconnectCoinbaseWallet(page: Page): Promise<void> {
  await page.evaluate(() => {
    // In a real-world scenario, we would clean up event listeners
    // For mock mode, just clear the provider
    if (window.ethereum && window.ethereum.isCoinbaseWallet) {
      console.log('Disconnecting Coinbase Wallet');
      // There's no standard disconnect method, but some cleanup can be done
      window.ethereum.removeAllListeners?.();
    }
  });
}

/**
 * Send a transaction with Coinbase Wallet
 * @param page - Playwright page object
 * @param transaction - The transaction object
 * @returns Promise resolving to transaction hash
 */
export async function sendTransactionWithCoinbaseWallet(
  page: Page, 
  transaction: {
    to: string;
    value?: string;
    data?: string;
    gas?: string;
    gasPrice?: string;
  }
): Promise<string> {
  const txHash = await page.evaluate(async (tx) => {
    const provider = window.coinbaseWalletExtension || window.ethereum;
    
    // Get the first account
    const accounts = await provider.request({ method: 'eth_accounts' });
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts available');
    }
    
    // Prepare transaction
    const txParams = {
      from: accounts[0],
      to: tx.to,
      value: tx.value || '0x0',
      data: tx.data || '0x',
      gas: tx.gas,
      gasPrice: tx.gasPrice,
    };
    
    // Remove undefined values
    Object.keys(txParams).forEach(key => {
      if (txParams[key] === undefined) {
        delete txParams[key];
      }
    });
    
    // Send transaction
    try {
      const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [txParams],
      });
      return txHash;
    } catch (error) {
      console.error('Failed to send transaction:', error);
      throw error;
    }
  }, transaction);
  
  return txHash;
} 