/**
 * Web3 Provider Types
 *
 * Centralized type definitions for all provider interfaces used in the application.
 * This ensures consistency across all files that interact with wallet providers.
 */

import { Page } from '@playwright/test';

/**
 * Standard Ethereum Provider Interface
 * Following EIP-1193 specification
 */
export interface EthereumProvider {
  request(args: { method: string; params?: any[] }): Promise<any>;
  on(eventName: string, listener: (...args: any[]) => void): void;
  removeListener(eventName: string, listener: (...args: any[]) => void): void;
  isConnected?(): boolean;
  selectedAddress?: string | null;
  chainId?: string;
  networkVersion?: string;
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isPhantom?: boolean;
  isRabby?: boolean;
  isWalletConnect?: boolean;
  close?(): Promise<void>;
  disconnect?(): Promise<void>;
}

/**
 * Stargate-specific extensions to the window object
 */
export interface StargateWindow extends Window {
  stargate?: {
    routerAbi: string[];
    swap: (params: any) => Promise<any>;
    getRouterAddress: (chainId: number) => string;
    getPoolTokenAddress: (chainId: number, poolId: number) => string;
    estimateFees: (params: any) => any;
    getSwapStatus: (txHash: string) => any;
  };
  STARGATE_ROUTER?: Record<number, string>;
  SUPPORTED_POOLS?: any;
  stargateSwaps?: Array<{
    timestamp: number;
    params: any;
    txHash: string;
    fees: any;
    status: string;
    error?: string | null;
  }>;
  ethereum?: EthereumProvider;
  close: () => void;
  layerZeroHarness?: {
    endpoints: Record<number, string>;
    messages: any[];
    transfers: any[];
    currentNonce: number;
    getNextNonce: () => string;
  };
}

/**
 * Wallet Connection Interface
 */
export interface WalletConnection {
  address: string;
  chainId: string;
  networkName: string;
  isConnected: boolean;
}

/**
 * Transaction Options Interface
 */
export interface TransactionOptions {
  to: string;
  value?: string;
  data?: string;
  gasLimit?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
}

/**
 * Signing Options Interface
 */
export interface SignOptions {
  message: string;
  address?: string;
}

/**
 * Network Options Interface for switching networks
 */
export interface NetworkOptions {
  chainId: string;
  networkName?: string;
  rpcUrl?: string;
  blockExplorerUrl?: string;
  currencySymbol?: string;
}

/**
 * Wallet Adapter Configuration Options
 */
export interface WalletAdapterOptions {
  autoApprove?: boolean;
  delayMs?: number;
  mockAddress?: string;
  chainId?: string;
}

/**
 * Common interface for all wallet adapters
 */
export interface WalletAdapter {
  /**
   * Name of the wallet provider
   */
  readonly name: string;

  /**
   * Initialize the wallet adapter
   */
  initialize(page: Page, options?: WalletAdapterOptions): Promise<void>;

  /**
   * Connect to the wallet
   */
  connect(page: Page): Promise<WalletConnection>;

  /**
   * Disconnect from the wallet
   */
  disconnect(page: Page): Promise<boolean>;

  /**
   * Sign a transaction
   */
  signTransaction(page: Page, options: TransactionOptions): Promise<string>;

  /**
   * Send a transaction
   */
  sendTransaction(page: Page, options: TransactionOptions): Promise<string>;

  /**
   * Sign a message
   */
  signMessage(page: Page, options: SignOptions): Promise<string>;

  /**
   * Switch to a different network
   */
  switchNetwork(page: Page, options: NetworkOptions): Promise<boolean>;

  /**
   * Get the current wallet state
   */
  getState(page: Page): Promise<WalletConnection>;

  /**
   * Save wallet state (for test snapshots)
   */
  saveState(page: Page): Promise<any>;

  /**
   * Restore wallet state (for test snapshots)
   */
  restoreState(page: Page, state: any): Promise<boolean>;
}
