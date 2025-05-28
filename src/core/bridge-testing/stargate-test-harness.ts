/**
 * Stargate Finance Test Harness
 *
 * Provides testing utilities for Stargate Finance - a popular cross-chain bridge built on LayerZero.
 * This adapter extends the LayerZero test harness with Stargate-specific functionality.
 */

import { Page } from '@playwright/test';
import { LayerZeroTestHarness, LayerZeroChainId } from './layerzero-test-harness.js';

// Define the EthereumProvider interface
interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (eventName: string, callback: (...args: any[]) => void) => void;
  removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
  isConnected: () => boolean;
}

// Extend LayerZeroChainId with Stargate-specific chain IDs
export enum StargateChainId {
  BSC_TESTNET = 10002,
  FUJI = 10006,
  MUMBAI = 10009,
}

// Combined chain IDs for Stargate
export type CombinedLayerZeroChainId = LayerZeroChainId | StargateChainId;

// Stargate pool IDs by chain
export enum StargatePoolId {
  ETH = 13,
  USDC = 1,
  USDT = 2,
  DAI = 3,
  FRAX = 7,
  USDD = 11,
  sUSD = 14,
  LUSD = 15,
  MAI = 16,
  METIS = 17,
  metisUSDT = 19,
}

// Stargate swap types
export enum StargateSwapType {
  SWAP_REMOTE = 1, // standard cross-chain swap
  SWAP_REMOTE_AND_CALL = 2, // cross-chain swap and call a contract on destination
  ADD_LIQUIDITY = 3, // add liquidity to a Stargate pool
  REDEEM_LOCAL_CALL_BACK = 4, // redeem locally and call back
  REDEEM_LOCAL = 5, // standard local redemption
}

// Stargate router addresses by chain
export const STARGATE_ROUTER: Record<number, string> = {
  [LayerZeroChainId.ETHEREUM]: '0x8731d54E9D02c286767d56ac03e8037C07e01e98',
  [LayerZeroChainId.BSC]: '0x4a364f8c717cAAD9A442737Eb7b8A55cc6cf18D8',
  [LayerZeroChainId.AVALANCHE]: '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
  [LayerZeroChainId.POLYGON]: '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
  [LayerZeroChainId.ARBITRUM]: '0x53Bf833A5d6c4ddA888F69c22C88C9f356a41614',
  [LayerZeroChainId.OPTIMISM]: '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b',
  [LayerZeroChainId.FANTOM]: '0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6',
  // Add testnet addresses
  [LayerZeroChainId.GOERLI]: '0x7612aE2a34E5A363E137De748801FB4c86499152',
  [StargateChainId.BSC_TESTNET]: '0xbB0f1be1E9CE9cB27EA5b0c3a85B7cc3381d8176',
  [StargateChainId.FUJI]: '0x13093E05Eb890dfA6DacecBdE51d467Fa7495E4D',
  [StargateChainId.MUMBAI]: '0x817436a076060D158204d955E5403b6Ed0A5fac0',
  [LayerZeroChainId.ARBITRUM_TESTNET]: '0xb1Ca7a4387cb1dB2a43351B41A1A33A821eA1a9E',
  [LayerZeroChainId.OPTIMISM_TESTNET]: '0xa321448d90d4e5b0A732867c18eA198e75CAC48E',
};

// Create a partial type for Ethereum chain pools
type PartialPoolRecord = Partial<Record<number, string>>;

// Supported token/pool IDs on each chain
export const SUPPORTED_POOLS: Record<number, PartialPoolRecord> = {
  [LayerZeroChainId.ETHEREUM]: {
    [StargatePoolId.USDC]: '0xdf0770dF86a8034b3EFEf0A1Bb3c889B8332FF56',
    [StargatePoolId.USDT]: '0x38EA452219524Bb87e18dE1C24D3bB59510BD783',
    [StargatePoolId.ETH]: '0x101816545F6bd2b1076434B54383a1E633390A2E',
    // Add other pools as needed
  },
  // Add pools for other chains
};

/**
 * Configuration for a Stargate Finance bridge operation
 */
export interface StargateParams {
  // Source and destination chain information
  srcChainId: number;
  dstChainId: number;
  srcLayerZeroId: CombinedLayerZeroChainId;
  dstLayerZeroId: CombinedLayerZeroChainId;

  // Pool and token information
  poolId: StargatePoolId;
  amount: string;

  // Optional parameters
  swapType?: StargateSwapType;
  slippage?: number; // Basis points (e.g., 30 = 0.3%)
  dstGasForCall?: string;
  refundAddress?: string;
  callbackAddress?: string; // For swap and call
  callbackPayload?: string; // For swap and call
  customLayerZeroParams?: string; // Adapter params
}

// Extend the Window interface to include our custom global objects
declare global {
  interface Window {
    stargate?: {
      routerAbi: string[];
      swap: (params: any) => Promise<any>;
      getRouterAddress: (chainId: number) => string;
      getPoolTokenAddress: (chainId: number, poolId: number) => string;
      estimateFees: (params: any) => any;
      getSwapStatus: (txHash: string) => any;
    };
    STARGATE_ROUTER?: Record<number, string>;
    SUPPORTED_POOLS?: Record<number, PartialPoolRecord>;
    stargateSwaps?: Array<{
      timestamp: number;
      params: any;
      txHash: string;
      fees: any;
      status: string;
      error?: string | null; // Allowing for null as a valid state
    }>;
    ethereum?: any; // Using any for consistency
    close: () => void;
    layerZeroHarness?: {
      endpoints: Record<number, string>;
      messages: any[];
      transfers: any[];
      currentNonce: number;
      getNextNonce: () => string;
    };
  }
}

/**
 * Stargate Finance Test Harness
 *
 * Extends the LayerZero test harness with Stargate-specific bridge functionality.
 */
export class StargateTestHarness extends LayerZeroTestHarness {
  /**
   * Initializes the Stargate test harness
   */
  async initialize(page: Page): Promise<void> {
    await super.initialize(page);
    // Initialize Stargate-specific testing environment
    await page.addInitScript(() => {
      const ROUTER = {
        1: '0x8731d54E9D02c286767d56ac03e8037C07e01e98',
        2: '0x4a364f8c717cAAD9A442737Eb7b8A55cc6cf18D8',
        6: '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
        9: '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
        10: '0x53Bf833A5d6c4ddA888F69c22C88C9f356a41614',
        11: '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b',
        12: '0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6',
        10001: '0x7612aE2a34E5A363E137De748801FB4c86499152',
        10002: '0xbB0f1be1E9CE9cB27EA5b0c3a85B7cc3381d8176',
        10006: '0x13093E05Eb890dfA6DacecBdE51d467Fa7495E4D',
        10009: '0x817436a076060D158204d955E5403b6Ed0A5fac0',
        10011: '0xb1Ca7a4387cb1dB2a43351B41A1A33A821eA1a9E',
        10012: '0xa321448d90d4e5b0A732867c18eA198e75CAC48E',
      };

      const POOLS = {
        1: {
          1: '0xdf0770dF86a8034b3EFEf0A1Bb3c889B8332FF56',
          2: '0x38EA452219524Bb87e18dE1C24D3bB59510BD783',
          13: '0x101816545F6bd2b1076434B54383a1E633390A2E',
        },
      };

      // Add Stargate ABI and configuration to window object for testing
      window.STARGATE_ROUTER = ROUTER;
      window.SUPPORTED_POOLS = POOLS;
      window.stargate = {
        // Simplified Stargate router ABI
        routerAbi: [
          // Swap function for cross-chain token transfers
          'function swap(uint16 _dstChainId, uint256 _srcPoolId, uint256 _dstPoolId, address _refundAddress, uint256 _amountLD, uint256 _minAmountLD, lzTxObj memory _lzTxParams, bytes calldata _to, bytes calldata _payload) external payable',
          // Add liquidity function
          'function addLiquidity(uint256 _poolId, uint256 _amountLD, address _to) external',
          // Quote function for fee estimation
          'function quoteLayerZeroFee(uint16 _dstChainId, uint8 _functionType, bytes calldata _toAddress, bytes calldata _transferAndCallPayload, lzTxObj memory _lzTxParams) external view returns (uint256, uint256)',
        ],
        // Mock function to simulate a Stargate swap
        swap: async function (params) {
          console.log('Simulating Stargate swap:', params);

          // In a real implementation, this would interact with the Stargate router
          // For testing, we simulate the main steps and return test data
          const srcRouter = window.stargate?.getRouterAddress(params.srcLayerZeroId) || '';
          const dstRouter = window.stargate?.getRouterAddress(params.dstLayerZeroId) || '';

          // Simulate approving token spend
          const tokenAddress =
            window.stargate?.getPoolTokenAddress(params.srcLayerZeroId, params.poolId) || '';
          console.log(`Approving ${params.amount} of token ${tokenAddress} to router ${srcRouter}`);

          // Calculate estimated fees (simplified for testing)
          const fees = window.stargate?.estimateFees(params) || {
            nativeFee: '0',
            tokenFee: '0',
            total: '0',
          };

          // Generate a mock transaction hash
          const txHash =
            '0x' +
            Array(64)
              .fill(0)
              .map(() => Math.floor(Math.random() * 16).toString(16))
              .join('');

          // Record the swap details for verification
          if (!window.stargateSwaps) {
            window.stargateSwaps = [];
          }
          window.stargateSwaps.push({
            timestamp: Date.now(),
            params,
            txHash,
            fees,
            status: 'pending',
          });

          return {
            success: true,
            txHash,
            fees,
            estimated: {
              amountReceived: String(Number(params.amount) * 0.995), // Simulating 0.5% fee/slippage
              gasCost: fees.nativeFee,
            },
          };
        },

        // Get router address by chain ID
        getRouterAddress: function (chainId) {
          if (!window.STARGATE_ROUTER) return '0x0000000000000000000000000000000000000000';
          return window.STARGATE_ROUTER[chainId] || '0x0000000000000000000000000000000000000000';
        },

        // Get pool token address
        getPoolTokenAddress: function (chainId, poolId) {
          if (!window.SUPPORTED_POOLS) return '0x0000000000000000000000000000000000000000';
          const pools = window.SUPPORTED_POOLS[chainId];
          if (!pools) return '0x0000000000000000000000000000000000000000';
          return pools[poolId] || '0x0000000000000000000000000000000000000000';
        },

        // Estimate fees for a Stargate operation
        estimateFees: function (params) {
          // Simplified fee calculation for testing purposes
          const baseFee = 0.001 * 10 ** 18; // 0.001 ETH
          const tokenFee = Number(params.amount) * 0.003; // 0.3% of the amount

          return {
            nativeFee: String(baseFee + Math.floor(Math.random() * 10 ** 15)), // Add some randomness
            tokenFee: String(tokenFee),
            total: String(baseFee + tokenFee),
          };
        },

        // Check the status of a swap
        getSwapStatus: function (txHash) {
          if (!window.stargateSwaps) return { found: false };

          const swap = window.stargateSwaps.find(s => s.txHash === txHash);
          if (!swap) return { found: false };

          // Randomly simulate success or specific failure for testing
          const rand = Math.random();
          if (rand > 0.9) {
            swap.status = 'failed';
            swap.error = 'Insufficient liquidity in destination pool';
          } else if (rand > 0.8) {
            swap.status = 'failed';
            swap.error = 'Slippage exceeded';
          } else {
            swap.status = 'completed';
          }

          return {
            found: true,
            status: swap.status,
            error: swap.error,
            details: swap,
          };
        },
      };
    });
  }

  /**
   * Performs a cross-chain swap via Stargate Finance
   * @param page Playwright page
   * @param params Stargate swap parameters
   * @returns Result of the swap operation
   */
  async bridgeTokenViaStargate(page: Page, params: StargateParams): Promise<any> {
    // Make sure poolId is a StargatePoolId enum value
    const poolId = Number(params.poolId);

    // Convert params to the format expected by stargate.swap()
    const swapParams = {
      srcChainId: params.srcChainId,
      dstChainId: params.dstChainId,
      srcLayerZeroId: params.srcLayerZeroId,
      dstLayerZeroId: params.dstLayerZeroId,
      poolId,
      amount: params.amount,
      slippage: params.slippage || 30, // Default 0.3%
      dstGasForCall: params.dstGasForCall || '0',
      refundAddress: params.refundAddress || '0x0000000000000000000000000000000000000000',
      swapType: params.swapType || StargateSwapType.SWAP_REMOTE,
    };

    return await page.evaluate(async swapParams => {
      if (!window.stargate) {
        throw new Error('Stargate not initialized');
      }

      return await window.stargate.swap(swapParams);
    }, swapParams);
  }

  /**
   * Verify that a cross-chain swap completed successfully
   * @param page Playwright page
   * @param txHash Transaction hash of the swap
   * @returns Status and details of the swap
   */
  async verifyStargateSwap(page: Page, txHash: string): Promise<any> {
    return await page.evaluate(async txHash => {
      if (!window.stargate) {
        throw new Error('Stargate not initialized');
      }

      // Get initial status
      const statusCheck = await window.stargate.getSwapStatus(txHash);

      // Find the swap in our records
      const swapIndex = window.stargateSwaps
        ? window.stargateSwaps.findIndex(swap => swap.txHash === txHash)
        : -1;

      // If it's pending, let's simulate the completion
      if (statusCheck.status === 'pending') {
        // Wait for random time to simulate network delay
        await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));

        // Randomly determine success or failure (90% success)
        if (Math.random() > 0.1) {
          if (swapIndex !== -1 && window.stargateSwaps) {
            const swap = window.stargateSwaps[swapIndex];
            swap.status = Math.random() > 0.1 ? 'completed' : 'failed';
            if (swap.status === 'failed') {
              swap.error = 'Simulation failed on destination chain';
            }
          }
          // Check status again
          return await window.stargate.getSwapStatus(txHash);
        }
      }

      return statusCheck;
    }, txHash);
  }

  /**
   * Tests malicious input to Stargate swap to check for security vulnerabilities
   * @param page Playwright page
   * @param params Base swap parameters to fuzz
   * @returns Results of security tests
   */
  async fuzzStargateSwap(page: Page, params: StargateParams): Promise<any> {
    const testResults = {
      vulnerabilitiesFound: 0,
      passedTests: 0,
      failedTests: 0,
      securityIssues: [] as any[],
      details: [] as any[],
    };

    // Test 1: Try extremely large amount
    try {
      const largeAmountParams = {
        ...params,
        amount: '1000000000000000000000000000000', // Very large number
      };

      const result = await this.bridgeTokenViaStargate(page, largeAmountParams);
      testResults.details.push({
        test: 'Extremely large amount',
        result,
        status: 'passed',
      });
      testResults.passedTests++;
    } catch (error: any) {
      testResults.details.push({
        test: 'Extremely large amount',
        error: error.message,
        status: 'failed',
      });
      testResults.failedTests++;
    }

    // Test 2: Try invalid destination chain
    try {
      const invalidChainParams = {
        ...params,
        dstChainId: 999999,
        dstLayerZeroId: 999999 as CombinedLayerZeroChainId,
      };

      const result = await this.bridgeTokenViaStargate(page, invalidChainParams);

      // This should fail - if it succeeds, that's a vulnerability
      testResults.vulnerabilitiesFound++;
      testResults.securityIssues.push({
        issue: 'Accepted invalid destination chain',
        severity: 'high',
        details: 'The system accepted an invalid destination chain ID without validation',
      });

      testResults.details.push({
        test: 'Invalid destination chain',
        result,
        status: 'vulnerability_found',
      });
    } catch (error: any) {
      // Expected behavior
      testResults.details.push({
        test: 'Invalid destination chain',
        error: error.message,
        status: 'passed', // Test passes because error was thrown correctly
      });
      testResults.passedTests++;
    }

    // Test 3: Try with malformed pool ID
    try {
      const result = await page.evaluate(async baseParams => {
        if (!window.stargate) {
          throw new Error('Stargate not initialized');
        }

        // Create params with an invalid pool ID (string instead of number)
        const malformedParams = {
          ...baseParams,
          poolId: 'MALFORMED', // This should cause a type error
        };

        return await window.stargate.swap(malformedParams);
      }, params);

      // If we got here, there's a potential issue
      testResults.vulnerabilitiesFound++;
      testResults.securityIssues.push({
        issue: 'Accepted malformed pool ID',
        severity: 'medium',
        details: 'The system accepted a string pool ID instead of a number',
      });

      testResults.details.push({
        test: 'Malformed pool ID',
        result,
        status: 'vulnerability_found',
      });
    } catch (error: any) {
      // Expected behavior
      testResults.details.push({
        test: 'Malformed pool ID',
        error: error.message,
        status: 'passed', // Test passes because error was thrown correctly
      });
      testResults.passedTests++;
    }

    // Specific tests for SwapAndCall functionality
    if (params.swapType === StargateSwapType.SWAP_REMOTE_AND_CALL) {
      // Test 4: Try with malicious callback payload
      try {
        const maliciousPayloadParams = {
          ...params,
          callbackPayload: '0x1234deadbeef' + '0'.repeat(1000), // Overly large payload
        };

        const result = await this.bridgeTokenViaStargate(page, maliciousPayloadParams);

        // Check if this was accepted without validation
        const isValidated = result.validated === true;

        if (!isValidated) {
          testResults.vulnerabilitiesFound++;
          testResults.securityIssues.push({
            issue: 'No validation on callback payload',
            severity: 'critical',
            details: 'The system accepted an oversized or potentially malicious callback payload',
          });

          testResults.details.push({
            test: 'Malicious callback payload',
            result,
            status: 'vulnerability_found',
          });
        } else {
          testResults.details.push({
            test: 'Malicious callback payload',
            result,
            status: 'passed',
          });
          testResults.passedTests++;
        }
      } catch (error: any) {
        // If validation happens in try block, this is also good
        testResults.details.push({
          test: 'Malicious callback payload',
          error: error.message,
          status: 'passed',
        });
        testResults.passedTests++;
      }
    }

    // Test 5: Try standard path but with negative slippage
    try {
      const negativeSlippageParams = {
        ...params,
        slippage: -50, // Negative slippage (should be rejected)
      };

      const result = await this.bridgeTokenViaStargate(page, negativeSlippageParams);

      // If accepted, that's a potential issue
      if (!result.error) {
        testResults.vulnerabilitiesFound++;
        testResults.securityIssues.push({
          issue: 'Accepted negative slippage',
          severity: 'medium',
          details: 'The system accepted a negative slippage value, which could be exploited',
        });

        testResults.details.push({
          test: 'Negative slippage',
          result,
          status: 'vulnerability_found',
        });
      } else {
        testResults.details.push({
          test: 'Negative slippage',
          result,
          status: 'passed',
        });
        testResults.passedTests++;
      }
    } catch (error: any) {
      // Expected behavior
      testResults.details.push({
        test: 'Negative slippage',
        error: error.message,
        status: 'passed',
      });
      testResults.passedTests++;
    }

    // Test 6: Try with extremely high slippage
    try {
      const highSlippageParams = {
        ...params,
        slippage: 10000, // 100% slippage (should raise warnings)
      };

      const result = await this.bridgeTokenViaStargate(page, highSlippageParams);

      // Check if warnings were raised
      const warningRaised = result.warnings && result.warnings.length > 0;

      if (!warningRaised) {
        testResults.vulnerabilitiesFound++;
        testResults.securityIssues.push({
          issue: 'No warning for high slippage',
          severity: 'low',
          details: 'The system accepted a very high slippage (100%) without warnings',
        });

        testResults.details.push({
          test: 'High slippage',
          result,
          status: 'vulnerability_found',
        });
      } else {
        testResults.details.push({
          test: 'High slippage',
          result,
          status: 'passed',
        });
        testResults.passedTests++;
      }
    } catch (error: any) {
      testResults.details.push({
        test: 'High slippage',
        error: error.message,
        status: 'failed',
      });
      testResults.failedTests++;
    }

    return testResults;
  }
}

/**
 * Utility function to calculate variance in a set of numbers
 * Used for detecting fee manipulation across multiple swap attempts
 */
function calculateVariance(numbers: number[]): number {
  if (numbers.length === 0) return 0;

  const mean = numbers.reduce((sum, val) => sum + val, 0) / numbers.length;
  const squaredDiffs = numbers.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / numbers.length;

  return variance;
}
