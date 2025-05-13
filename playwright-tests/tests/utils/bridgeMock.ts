// bridgeMock.ts
import { Page } from '@playwright/test';
import { getWalletState } from './walletMock';

// Interface definitions
export interface BridgeTransferOptions {
  bridge: 'layerzero' | 'wormhole';
  fromChain: string;
  toChain: string;
  token: string;
  amount: number;
  simulateFailure?: boolean;
  failureReason?: string;
  gasOptions?: {
    lowGas?: boolean;
    maxGas?: string;
  };
}

export interface BridgeTransferResult {
  success: boolean;
  transactionHash?: string;
  fromChain: string;
  toChain: string;
  token: string;
  amount: number;
  confirmations?: number;
  error?: string;
  senderAddress?: string;
  receiverAddress?: string;
  gasUsed?: number;
  timestamp?: number;
}

export interface BridgeHistoryItem extends BridgeTransferResult {
  id: string;
  status: 'completed' | 'pending' | 'failed';
}

/**
 * Sets up bridge providers on the page
 */
export async function setupBridgeProviders(page: Page): Promise<void> {
  await page.evaluate(() => {
    // Create LayerZero mock
    window.layerZeroProvider = {
      version: '1.0.0',
      bridge: async params => {
        console.log('LayerZero bridge called with params:', params);
        return {
          success: true,
          transactionHash:
            '0x' +
            Array(64)
              .fill(0)
              .map(() => Math.floor(Math.random() * 16).toString(16))
              .join(''),
          status: 'confirmed',
        };
      },
      getHistory: () => {
        return window.bridgeHistory || [];
      },
    };

    // Create Wormhole mock
    window.wormholeProvider = {
      version: '2.5.0',
      transfer: async params => {
        console.log('Wormhole transfer called with params:', params);
        return {
          success: true,
          txHash:
            '0x' +
            Array(64)
              .fill(0)
              .map(() => Math.floor(Math.random() * 16).toString(16))
              .join(''),
          receipt: {
            status: 1,
            gasUsed: 150000 + Math.floor(Math.random() * 50000),
          },
        };
      },
      getTransfers: () => {
        return window.bridgeHistory || [];
      },
    };

    // Initialize bridge history array if it doesn't exist
    if (!window.bridgeHistory) {
      window.bridgeHistory = [];
    }
  });
}

/**
 * Simulates a cross-chain bridge transfer
 */
export async function simulateBridgeTransfer(
  page: Page,
  options: BridgeTransferOptions
): Promise<BridgeTransferResult> {
  const bridge = options.bridge;
  const fromChain = options.fromChain;
  const toChain = options.toChain;
  const token = options.token;
  const amount = options.amount;
  const simulateFailure = options.simulateFailure || false;
  const failureReason = options.failureReason || 'Unknown error';
  const gasOptions = options.gasOptions || {};

  // Get current wallet state to use the connected address
  const walletState = await getWalletState(page);
  const senderAddress = walletState.address || '0x0000000000000000000000000000000000000000';

  if (simulateFailure) {
    return await page.evaluate(
      async ({ failureReason, fromChain, toChain, token, amount }) => {
        return {
          success: false,
          error: failureReason,
          fromChain,
          toChain,
          token,
          amount,
          timestamp: Date.now(),
        };
      },
      { failureReason, fromChain, toChain, token, amount }
    );
  }

  if (bridge === 'layerzero') {
    return await page.evaluate(
      async ({ fromChain, toChain, token, amount, senderAddress, gasOptions }) => {
        // Create a random receiver address (usually the same as sender in most bridges)
        const receiverAddress = senderAddress;

        // Mock the gas used
        let gasUsed = 150000;
        if (gasOptions.lowGas) {
          gasUsed = 75000;
        }

        // Check if max gas is specified and honor it
        if (gasOptions.maxGas) {
          gasUsed = Math.min(gasUsed, parseInt(gasOptions.maxGas));
        }

        // Generate unique transaction hash
        const transactionHash =
          '0x' +
          Array(64)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join('');

        // Create transfer result
        const result: any = {
          success: true,
          transactionHash,
          fromChain,
          toChain,
          token,
          amount,
          confirmations: 1 + Math.floor(Math.random() * 15), // Random number of confirmations
          senderAddress,
          receiverAddress,
          gasUsed,
          timestamp: Date.now(),
        };

        // Add to history
        if (window.bridgeHistory) {
          window.bridgeHistory.unshift({
            ...result,
            id: 'lz-' + Date.now(),
            status: 'completed',
          });
        }

        return result;
      },
      { fromChain, toChain, token, amount, senderAddress, gasOptions }
    );
  } else if (bridge === 'wormhole') {
    return await page.evaluate(
      async ({ fromChain, toChain, token, amount, senderAddress }) => {
        // Create a random receiver address (usually the same as sender in most bridges)
        const receiverAddress = senderAddress;

        // Generate unique transaction hash
        const transactionHash =
          '0x' +
          Array(64)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join('');

        // Create transfer result
        const result: any = {
          success: true,
          transactionHash,
          fromChain,
          toChain,
          token,
          amount,
          confirmations: 1 + Math.floor(Math.random() * 10), // Random number of confirmations
          senderAddress,
          receiverAddress,
          gasUsed: 200000 + Math.floor(Math.random() * 100000), // Random gas used
          timestamp: Date.now(),
        };

        // Add to history
        if (window.bridgeHistory) {
          window.bridgeHistory.unshift({
            ...result,
            id: 'wh-' + Date.now(),
            status: 'completed',
          });
        }

        return result;
      },
      { fromChain, toChain, token, amount, senderAddress }
    );
  } else {
    throw new Error(`Unsupported bridge: ${bridge}`);
  }
}

/**
 * Gets the bridge transfer history from the page
 */
export async function getBridgeHistory(page: Page): Promise<BridgeHistoryItem[]> {
  return await page.evaluate(() => {
    return window.bridgeHistory || [];
  });
}

/**
 * Clears the bridge transfer history
 */
export async function clearBridgeHistory(page: Page): Promise<void> {
  await page.evaluate(() => {
    window.bridgeHistory = [];
  });
}

/**
 * Gets information about a specific bridge provider
 */
export async function getBridgeProviderInfo(
  page: Page,
  bridge: 'layerzero' | 'wormhole'
): Promise<{ version: string; isAvailable: boolean }> {
  return await page.evaluate(bridgeName => {
    if (bridgeName === 'layerzero') {
      return {
        version: window.layerZeroProvider?.version || 'not installed',
        isAvailable: !!window.layerZeroProvider,
      };
    } else if (bridgeName === 'wormhole') {
      return {
        version: window.wormholeProvider?.version || 'not installed',
        isAvailable: !!window.wormholeProvider,
      };
    }
    return { version: 'unknown', isAvailable: false };
  }, bridge);
}
