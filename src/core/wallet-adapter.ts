/**
 * Unified Wallet Adapter Interface
 *
 * This module provides a standardized interface for interacting with different
 * wallet providers (MetaMask, WalletConnect, Coinbase Wallet) using a common API.
 */

import { MetaMaskAdapter } from './adapters/metamask-adapter.js';
import { WalletAdapter, WalletAdapterOptions } from '../types/provider.js';

// We'll implement these adapters separately
// Placeholder imports for future implementation
// import { WalletConnectAdapter } from './adapters/walletconnect-adapter';
// import { CoinbaseWalletAdapter } from './adapters/coinbase-adapter';

/**
 * Factory function to create the appropriate wallet adapter
 *
 * @param type Type of wallet to create an adapter for
 * @param options Configuration options for the adapter
 * @returns An initialized wallet adapter instance
 * @throws Error if the wallet type is not supported
 */
export function createWalletAdapter(
  type: 'metamask' | 'walletconnect' | 'coinbase',
  options?: WalletAdapterOptions
): WalletAdapter {
  switch (type) {
    case 'metamask':
      return new MetaMaskAdapter(options);
    case 'walletconnect':
      // Temporary implementation until WalletConnectAdapter is properly implemented
      console.warn(
        'WalletConnect adapter is not fully implemented yet. Using MetaMask adapter as a fallback.'
      );
      return new MetaMaskAdapter({
        ...options,
        mockAddress: options?.mockAddress || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      });
    case 'coinbase':
      // Temporary implementation until CoinbaseWalletAdapter is properly implemented
      console.warn(
        'Coinbase adapter is not fully implemented yet. Using MetaMask adapter as a fallback.'
      );
      return new MetaMaskAdapter({
        ...options,
        mockAddress: options?.mockAddress || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      });
    default:
      throw new Error(`Unsupported wallet type: ${type}`);
  }
}

/**
 * Unified export of all adapter types for convenience
 */
export { MetaMaskAdapter };

// Once implemented, export these as well
// export { WalletConnectAdapter };
// export { CoinbaseWalletAdapter };
