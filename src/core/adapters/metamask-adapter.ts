/**
 * MetaMask Wallet Adapter
 *
 * Provides a standardized interface for interacting with MetaMask wallet,
 * implementing the WalletAdapter interface.
 */

import { Page } from '@playwright/test';
import {
  WalletAdapter,
  WalletAdapterOptions,
  WalletConnection,
  TransactionOptions,
  SignOptions,
  NetworkOptions,
} from '../../types/provider';

/**
 * Utility function to get network name from chain ID
 */
function getNetworkName(chainId: string): string {
  switch (chainId) {
    case '0x1':
      return 'Ethereum Mainnet';
    case '0x5':
      return 'Goerli Testnet';
    case '0xaa36a7':
      return 'Sepolia Testnet';
    case '0x89':
      return 'Polygon Mainnet';
    case '0xa4b1':
      return 'Arbitrum One';
    case '0xa':
      return 'Optimism';
    default:
      return `Chain ID: ${chainId}`;
  }
}

/**
 * MetaMask Wallet Adapter Implementation
 * Provides a standardized way to interact with MetaMask wallet
 */
export class MetaMaskAdapter implements WalletAdapter {
  readonly name = 'MetaMask';
  private options: WalletAdapterOptions;

  /**
   * Create a new MetaMask adapter instance
   * @param options Configuration options
   */
  constructor(options?: WalletAdapterOptions) {
    this.options = {
      autoApprove: true,
      delayMs: 500,
      ...options,
    };
  }

  /**
   * Initialize the adapter with the given options
   * @param page Playwright page
   * @param options Additional options to override the constructor options
   */
  async initialize(page: Page, options?: WalletAdapterOptions): Promise<void> {
    if (options) {
      this.options = { ...this.options, ...options };
    }

    await page.evaluate(opts => {
      window.localStorage.setItem('metamask-adapter-options', JSON.stringify(opts));
    }, this.options);
  }

  /**
   * Connect to the MetaMask wallet
   * @param page Playwright page
   * @returns WalletConnection information
   */
  async connect(page: Page): Promise<WalletConnection> {
    const connection = await page.evaluate(async () => {
      try {
        // Request accounts from MetaMask
        const accounts = await (window.ethereum as any)
          .request({ method: 'eth_requestAccounts' })
          .catch((error: any) => {
            console.error('Error requesting accounts:', error);
            return [];
          });

        const chainId = await (window.ethereum as any)
          .request({ method: 'eth_chainId' })
          .catch((error: any) => {
            console.error('Error fetching chain ID:', error);
            return '0x0'; // Default to an unknown chain ID
          });

        const networkVersion = await (window.ethereum as any)
          .request({ method: 'net_version' })
          .catch((error: any) => {
            console.error('Error fetching network version:', error);
            return '0'; // Default to an unknown network version
          });

        // Map chainId to network name
        let networkName: string = '';
        switch (chainId) {
          case '0x1':
            networkName = 'Ethereum Mainnet';
            break;
          case '0x5':
            networkName = 'Goerli Testnet';
            break;
          case '0xaa36a7':
            networkName = 'Sepolia Testnet';
            break;
          case '0x89':
            networkName = 'Polygon Mainnet';
            break;
          case '0xa4b1':
            networkName = 'Arbitrum One';
            break;
          case '0xa':
            networkName = 'Optimism';
            break;
          default:
            networkName = `Chain ID: ${chainId}`;
        }

        return {
          address: accounts[0] || '',
          chainId: chainId || '0x0',
          networkName,
          isConnected: accounts.length > 0,
        };
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        return {
          address: '',
          chainId: '0x0',
          networkName: 'Connection Failed',
          isConnected: false,
        };
      }
    });

    return connection;
  }

  /**
   * Disconnect from the MetaMask wallet
   * @param page Playwright page
   * @returns Success status
   */
  async disconnect(page: Page): Promise<boolean> {
    return await page.evaluate(async () => {
      try {
        // For MetaMask, you typically can't programmatically disconnect
        // But we can simulate it by clearing the connection state
        window.localStorage.setItem('metamask-connected', 'false');
        return true;
      } catch (e) {
        console.error('Failed to disconnect from MetaMask:', e);
        return false;
      }
    });
  }

  /**
   * Sign a transaction with MetaMask
   * @param page Playwright page
   * @param options Transaction options
   * @returns Signature
   */
  async signTransaction(page: Page, options: TransactionOptions): Promise<string> {
    const signature = await page.evaluate(async txOptions => {
      try {
        const params = [
          {
            from: (window.ethereum as any).selectedAddress,
            to: txOptions.to,
            value: txOptions.value || '0x0',
            data: txOptions.data || '0x',
            gas: txOptions.gasLimit ? `0x${parseInt(txOptions.gasLimit).toString(16)}` : undefined,
            maxFeePerGas: txOptions.maxFeePerGas
              ? `0x${parseInt(txOptions.maxFeePerGas).toString(16)}`
              : undefined,
            maxPriorityFeePerGas: txOptions.maxPriorityFeePerGas
              ? `0x${parseInt(txOptions.maxPriorityFeePerGas).toString(16)}`
              : undefined,
          },
        ];

        // eth_signTransaction doesn't actually send the transaction
        const signature = await (window.ethereum as any).request({
          method: 'eth_signTransaction',
          params,
        });

        return signature;
      } catch (e) {
        console.error('Failed to sign transaction with MetaMask:', e);
        throw e;
      }
    }, options);

    return signature as string;
  }

  /**
   * Send a transaction with MetaMask
   * @param page Playwright page
   * @param options Transaction options
   * @returns Transaction hash
   */
  async sendTransaction(page: Page, options: TransactionOptions): Promise<string> {
    const txHash = await page.evaluate(async txOptions => {
      try {
        const params = [
          {
            from: (window.ethereum as any).selectedAddress,
            to: txOptions.to,
            value: txOptions.value || '0x0',
            data: txOptions.data || '0x',
            gas: txOptions.gasLimit ? `0x${parseInt(txOptions.gasLimit).toString(16)}` : undefined,
            maxFeePerGas: txOptions.maxFeePerGas
              ? `0x${parseInt(txOptions.maxFeePerGas).toString(16)}`
              : undefined,
            maxPriorityFeePerGas: txOptions.maxPriorityFeePerGas
              ? `0x${parseInt(txOptions.maxPriorityFeePerGas).toString(16)}`
              : undefined,
          },
        ];

        const txHash = await (window.ethereum as any).request({
          method: 'eth_sendTransaction',
          params,
        });

        return txHash;
      } catch (e) {
        console.error('Failed to send transaction with MetaMask:', e);
        throw e;
      }
    }, options);

    return txHash as string;
  }

  /**
   * Sign a message with MetaMask
   * @param page Playwright page
   * @param options Signing options
   * @returns Signature
   */
  async signMessage(page: Page, options: SignOptions): Promise<string> {
    const signature = await page.evaluate(async signOptions => {
      try {
        const address = signOptions.address || (window.ethereum as any).selectedAddress;
        const message = signOptions.message;

        if (!address) {
          throw new Error('No address provided for signing');
        }

        // Convert message to hex
        const msgHex = '0x' + Buffer.from(message).toString('hex');

        // Use personal_sign for more secure signing
        const signature = await (window.ethereum as any).request({
          method: 'personal_sign',
          params: [msgHex, address],
        });

        return signature;
      } catch (e) {
        console.error('Failed to sign message with MetaMask:', e);
        throw e;
      }
    }, options);

    return signature as string;
  }

  /**
   * Switch to a different network with MetaMask
   * @param page Playwright page
   * @param options Network options
   * @returns Success status
   */
  async switchNetwork(page: Page, options: NetworkOptions): Promise<boolean> {
    return (await page.evaluate(async networkOptions => {
      try {
        // First, try to switch to the network
        try {
          await (window.ethereum as any).request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: networkOptions.chainId }],
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            // If we have the network details, try to add it
            if (networkOptions.networkName && networkOptions.rpcUrl) {
              await (window.ethereum as any).request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: networkOptions.chainId,
                    chainName: networkOptions.networkName,
                    nativeCurrency: {
                      name: networkOptions.currencySymbol || 'ETH',
                      symbol: networkOptions.currencySymbol || 'ETH',
                      decimals: 18,
                    },
                    rpcUrls: [networkOptions.rpcUrl],
                    blockExplorerUrls: networkOptions.blockExplorerUrl
                      ? [networkOptions.blockExplorerUrl]
                      : undefined,
                  },
                ],
              });
            } else {
              throw new Error('Network not added to MetaMask and missing details to add it');
            }
          } else {
            throw switchError;
          }
        }

        // Verify that we successfully switched networks
        const chainId = await (window.ethereum as any).request({ method: 'eth_chainId' });
        return chainId === networkOptions.chainId;
      } catch (e) {
        console.error('Failed to switch networks with MetaMask:', e);
        return false;
      }
    }, options)) as boolean;
  }

  /**
   * Get the current state of the MetaMask wallet
   * @param page Playwright page
   * @returns Current wallet connection state
   */
  async getState(page: Page): Promise<WalletConnection> {
    return await page.evaluate(async () => {
      try {
        // Check if wallet is connected
        const accounts = await (window.ethereum as any).request({ method: 'eth_accounts' });
        const chainId = await (window.ethereum as any).request({ method: 'eth_chainId' });

        // Map chainId to network name
        let networkName = 'Unknown Network';
        switch (chainId) {
          case '0x1':
            networkName = 'Ethereum Mainnet';
            break;
          case '0x5':
            networkName = 'Goerli Testnet';
            break;
          case '0xaa36a7':
            networkName = 'Sepolia Testnet';
            break;
          case '0x89':
            networkName = 'Polygon Mainnet';
            break;
          case '0xa4b1':
            networkName = 'Arbitrum One';
            break;
          case '0xa':
            networkName = 'Optimism';
            break;
          default:
            networkName = `Chain ID: ${chainId}`;
        }

        return {
          address: accounts.length > 0 ? accounts[0] : '',
          chainId,
          networkName,
          isConnected: accounts.length > 0,
        };
      } catch (e) {
        console.error('Failed to get state from MetaMask:', e);
        return {
          address: '',
          chainId: '0x0',
          networkName: 'Not Connected',
          isConnected: false,
        };
      }
    });
  }

  /**
   * Save the current state of the MetaMask wallet for later restoration
   * @param page Playwright page
   * @returns State object
   */
  async saveState(page: Page): Promise<any> {
    return await page.evaluate(async () => {
      try {
        const state = {
          selectedAddress: (window.ethereum as any).selectedAddress,
          chainId: await (window.ethereum as any).request({ method: 'eth_chainId' }),
          accounts: await (window.ethereum as any).request({ method: 'eth_accounts' }),
        };

        return state;
      } catch (e) {
        console.error('Failed to save state from MetaMask:', e);
        return {};
      }
    });
  }

  /**
   * Restore a previously saved state to the MetaMask wallet
   * @param page Playwright page
   * @param state Previously saved state
   * @returns Success status
   */
  async restoreState(page: Page, state: any): Promise<boolean> {
    return await page.evaluate(async savedState => {
      try {
        // For MetaMask, we can't directly restore state, but we can simulate it
        if (savedState.selectedAddress) {
          (window.ethereum as any).selectedAddress = savedState.selectedAddress;
        }

        // Attempt to switch to the saved chainId if provided
        if (savedState.chainId) {
          try {
            await (window.ethereum as any).request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: savedState.chainId }],
            });
          } catch (e) {
            console.error('Failed to switch networks during restore:', e);
          }
        }

        return true;
      } catch (e) {
        console.error('Failed to restore state to MetaMask:', e);
        return false;
      }
    }, state);
  }
}
