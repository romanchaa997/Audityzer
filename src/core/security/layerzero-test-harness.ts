/**
 * LayerZero Bridge Test Harness
 *
 * A minimal test harness for simulating and testing LayerZero bridge operations.
 * Supports basic message passing and token bridging on testnets.
 */

import { Page } from '@playwright/test';
import { WalletAdapter } from '../wallet-adapter';

// LayerZero Chain IDs - These are protocol specific and different from EVM chain IDs
export enum LayerZeroChainId {
  ETHEREUM = 1,
  OPTIMISM = 2,
  BSC = 3,
  ARBITRUM = 4,
  POLYGON = 5,
  AVALANCHE = 6,
  FANTOM = 7,
  GOERLI = 10001, // Testnet
  MUMBAI = 10009, // Testnet
  ARBITRUM_TESTNET = 10011, // Testnet
  OPTIMISM_TESTNET = 10012, // Testnet
}

export interface LayerZeroBridgeOptions {
  srcChainId: number; // EVM chain ID (e.g., 1 for Ethereum)
  dstChainId: number; // EVM chain ID
  srcLayerZeroId: LayerZeroChainId; // LayerZero protocol chain ID
  dstLayerZeroId: LayerZeroChainId; // LayerZero protocol chain ID
  token?: string; // Token address to bridge, if applicable
  amount?: string; // Amount to bridge, if applicable
  minGas?: string; // Minimum gas for destination chain message execution
  useAdapterParams?: boolean; // Whether to use adapter params (for token transfers)
}

export interface LayerZeroMessageOptions {
  payload: string; // Message payload (hex string)
  gasLimit?: string; // Gas limit for destination execution
  adapterParams?: string; // Custom adapter parameters
}

export interface LayerZeroBridgeResult {
  success: boolean;
  srcTxHash?: string;
  dstTxHash?: string;
  status: 'pending' | 'completed' | 'failed';
  error?: string;
  srcChainId: number;
  dstChainId: number;
  token?: string;
  amount?: string;
  timestamp: number;
  messageNonce?: string;
  estimatedTime?: number; // Estimated time to finality in seconds
}

/**
 * LayerZero Test Harness
 *
 * Provides methods to test LayerZero bridge functionality including:
 * - Message passing between chains
 * - Token transfers
 * - Handling of failed messages
 * - Retry/recover mechanisms
 */
export class LayerZeroTestHarness {
  private wallet: WalletAdapter;
  private basePath: string;
  private endpoints: Record<number, string> = {
    1: '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675', // Ethereum mainnet
    10: '0x3c2269811836af69497E5F486A85D7316753cf62', // Optimism
    42161: '0x3c2269811836af69497E5F486A85D7316753cf62', // Arbitrum
    137: '0x3c2269811836af69497E5F486A85D7316753cf62', // Polygon
    // Testnets
    5: '0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23', // Goerli testnet
    420: '0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1', // Optimism Goerli
    421613: '0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab', // Arbitrum Goerli
    80001: '0xf69186dfBa60DdB133E91E9A4B5673624293d8F8', // Mumbai testnet
  };

  constructor(wallet: WalletAdapter, basePath: string = 'https://layerzero-testnet.api.com') {
    this.wallet = wallet;
    this.basePath = basePath;
  }

  /**
   * Initialize the test harness on the page
   */
  async initialize(page: Page): Promise<void> {
    await page.evaluate(endpoints => {
      // Create LayerZero test harness in the browser context
      window.layerZeroHarness = {
        endpoints,
        messages: [],
        transfers: [],

        // Mock the message nonce counter
        currentNonce: 0,

        // Get a new mock message nonce
        getNextNonce: function () {
          return '0x' + (++this.currentNonce).toString(16).padStart(64, '0');
        },
      };
    }, this.endpoints);
  }

  /**
   * Send a cross-chain message via LayerZero
   */
  async sendMessage(
    page: Page,
    options: LayerZeroBridgeOptions,
    messageOptions: LayerZeroMessageOptions
  ): Promise<LayerZeroBridgeResult> {
    return await page.evaluate(
      async (bridgeOpts, msgOpts) => {
        try {
          if (!window.layerZeroHarness) {
            throw new Error('LayerZero harness not initialized');
          }

          if (!window.ethereum) {
            throw new Error('Ethereum provider not available');
          }

          const srcEndpoint = window.layerZeroHarness.endpoints[bridgeOpts.srcChainId];
          const dstEndpoint = window.layerZeroHarness.endpoints[bridgeOpts.dstChainId];

          if (!srcEndpoint || !dstEndpoint) {
            throw new Error(
              `Endpoint not configured for chain ${!srcEndpoint ? bridgeOpts.srcChainId : bridgeOpts.dstChainId}`
            );
          }

          // Simulate sending a message (in real testing this would actually call the LZ endpoint contract)
          // Mock the tx hash for source chain
          const srcTxHash =
            '0x' +
            Array(64)
              .fill(0)
              .map(() => Math.floor(Math.random() * 16).toString(16))
              .join('');

          // Generate a message nonce
          const messageNonce = window.layerZeroHarness.getNextNonce();

          // Add message to the pending queue
          const message = {
            srcChainId: bridgeOpts.srcChainId,
            dstChainId: bridgeOpts.dstChainId,
            srcLayerZeroId: bridgeOpts.srcLayerZeroId,
            dstLayerZeroId: bridgeOpts.dstLayerZeroId,
            nonce: messageNonce,
            srcTxHash,
            payload: msgOpts.payload,
            status: 'pending',
            timestamp: Date.now(),
            estimatedTime: 30 + Math.floor(Math.random() * 90), // Random time between 30-120 seconds
          };

          window.layerZeroHarness.messages.push(message);

          // Simulate message delivery after a delay (would be handled by relayers in real scenario)
          setTimeout(() => {
            // 95% success rate for test simulation
            const success = Math.random() > 0.05;

            if (success) {
              // Create destination tx hash
              const dstTxHash =
                '0x' +
                Array(64)
                  .fill(0)
                  .map(() => Math.floor(Math.random() * 16).toString(16))
                  .join('');

              // Update message status
              const messageIndex = window.layerZeroHarness.messages.findIndex(
                m => m.nonce === messageNonce
              );

              if (messageIndex !== -1) {
                window.layerZeroHarness.messages[messageIndex].status = 'completed';
                window.layerZeroHarness.messages[messageIndex].dstTxHash = dstTxHash;
              }
            } else {
              // Message failed
              const messageIndex = window.layerZeroHarness.messages.findIndex(
                m => m.nonce === messageNonce
              );

              if (messageIndex !== -1) {
                window.layerZeroHarness.messages[messageIndex].status = 'failed';
                window.layerZeroHarness.messages[messageIndex].error =
                  'Destination execution failed';
              }
            }
          }, 2000); // 2 second delay for testing

          return {
            success: true,
            srcTxHash,
            status: 'pending',
            srcChainId: bridgeOpts.srcChainId,
            dstChainId: bridgeOpts.dstChainId,
            timestamp: Date.now(),
            messageNonce,
            estimatedTime: message.estimatedTime,
          };
        } catch (e) {
          console.error('LayerZero message sending failed:', e);
          return {
            success: false,
            status: 'failed',
            error: e.message,
            srcChainId: bridgeOpts.srcChainId,
            dstChainId: bridgeOpts.dstChainId,
            timestamp: Date.now(),
          };
        }
      },
      options,
      messageOptions
    );
  }

  /**
   * Bridge tokens via LayerZero (simulates OFT/ONFT token bridge)
   */
  async bridgeTokens(page: Page, options: LayerZeroBridgeOptions): Promise<LayerZeroBridgeResult> {
    if (!options.token || !options.amount) {
      throw new Error('Token and amount must be specified for token bridging');
    }

    // Token bridging is essentially a message with special payload + adapter params
    const tokenPayload = await page.evaluate(
      (token, amount) => {
        // Create a simple token transfer payload
        // In a real implementation, this would encode the token transfer details according to OFT standard
        const encoder = new TextEncoder();
        const data = encoder.encode(
          JSON.stringify({
            action: 'transfer',
            token,
            amount,
            to: window.ethereum?.selectedAddress || '0x0000000000000000000000000000000000000000',
          })
        );

        // Convert to hex
        return (
          '0x' +
          Array.from(data)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
        );
      },
      options.token,
      options.amount
    );

    // Use standard message sending with token-specific payload
    return await this.sendMessage(page, options, {
      payload: tokenPayload,
      gasLimit: options.minGas,
      adapterParams: options.useAdapterParams
        ? '0x000100000000000000000000000000000000000000000000000000000000000F4240'
        : undefined,
    });
  }

  /**
   * Get the status of a LayerZero message
   */
  async getMessageStatus(page: Page, messageNonce: string): Promise<any> {
    return await page.evaluate(nonce => {
      if (!window.layerZeroHarness) {
        throw new Error('LayerZero harness not initialized');
      }

      const message = window.layerZeroHarness.messages.find(m => m.nonce === nonce);
      if (!message) {
        return { found: false, error: 'Message not found' };
      }

      return {
        found: true,
        status: message.status,
        srcChainId: message.srcChainId,
        dstChainId: message.dstChainId,
        srcTxHash: message.srcTxHash,
        dstTxHash: message.dstTxHash,
        timestamp: message.timestamp,
        error: message.error,
      };
    }, messageNonce);
  }

  /**
   * Retry a failed message
   */
  async retryMessage(page: Page, messageNonce: string): Promise<boolean> {
    return await page.evaluate(nonce => {
      if (!window.layerZeroHarness) {
        throw new Error('LayerZero harness not initialized');
      }

      const messageIndex = window.layerZeroHarness.messages.findIndex(m => m.nonce === nonce);
      if (messageIndex === -1) {
        return false;
      }

      const message = window.layerZeroHarness.messages[messageIndex];

      // Can only retry failed messages
      if (message.status !== 'failed') {
        return false;
      }

      // 80% success rate for retries
      const success = Math.random() > 0.2;

      if (success) {
        // Create destination tx hash for the retry
        const dstTxHash =
          '0x' +
          Array(64)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join('');

        // Update message status
        window.layerZeroHarness.messages[messageIndex].status = 'completed';
        window.layerZeroHarness.messages[messageIndex].dstTxHash = dstTxHash;
        window.layerZeroHarness.messages[messageIndex].error = undefined;
      }

      return success;
    }, messageNonce);
  }

  /**
   * Simulate a relay attack (attempting to replay a message)
   */
  async simulateRelayAttack(page: Page, messageNonce: string): Promise<any> {
    return await page.evaluate(nonce => {
      if (!window.layerZeroHarness) {
        throw new Error('LayerZero harness not initialized');
      }

      const message = window.layerZeroHarness.messages.find(m => m.nonce === nonce);
      if (!message) {
        return {
          success: false,
          error: 'Message not found',
        };
      }

      // Simulate attack attempt (should always fail due to nonce checking)
      return {
        success: false, // Replay attacks should fail in a proper implementation
        error: 'Nonce already used',
        detail: 'LayerZero prevents replay attacks using message nonces',
        messageNonce: nonce,
        originalMessage: {
          srcChainId: message.srcChainId,
          dstChainId: message.dstChainId,
          timestamp: message.timestamp,
        },
      };
    }, messageNonce);
  }

  /**
   * Clear all test data
   */
  async reset(page: Page): Promise<void> {
    await page.evaluate(() => {
      if (window.layerZeroHarness) {
        window.layerZeroHarness.messages = [];
        window.layerZeroHarness.transfers = [];
        window.layerZeroHarness.currentNonce = 0;
      }
    });
  }
}

// Type definition for browser context
declare global {
  interface Window {
    layerZeroHarness?: {
      endpoints: Record<number, string>;
      messages: any[];
      transfers: any[];
      currentNonce: number;
      getNextNonce: () => string;
    };
    ethereum?: any;
  }
}
