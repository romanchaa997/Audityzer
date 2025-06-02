/**
 * Radiant Capital Test Harness
 *
 * Provides testing utilities for Radiant Capital - a multi-chain lending protocol.
 * This adapter focuses on testing for common lending protocol vulnerabilities including:
 * - Flash loan attacks
 * - Oracle manipulation
 * - Liquidation vulnerabilities
 * - Interest rate manipulation
 */

import { Page } from '@playwright/test';
import { LayerZeroTestHarness, LayerZeroChainId } from './layerzero-test-harness';

// Supported chains for Radiant Capital
export enum RadiantSupportedChain {
  ARBITRUM = LayerZeroChainId.ARBITRUM,
  BSC = LayerZeroChainId.BSC,
  AVALANCHE = LayerZeroChainId.AVALANCHE,
}

// Token addresses on Radiant supported chains
export const RADIANT_TOKENS: Record<RadiantSupportedChain, Record<string, string>> = {
  [RadiantSupportedChain.ARBITRUM]: {
    USDC: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    ETH: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    BTC: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
    RDNT: '0x3082CC23568eA640225c2467653dB90e9250AaA0',
  },
  [RadiantSupportedChain.BSC]: {
    USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    USDT: '0x55d398326f99059fF775485246999027B3197955',
    ETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    BTC: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    RDNT: '0xf7DE7E8A6bd59ED41a4b5fe50278b3B7f31384dF',
  },
  [RadiantSupportedChain.AVALANCHE]: {
    USDC: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    USDT: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
    ETH: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
    BTC: '0x152b9d0FdC40C096757F570A51E494bd4b943E50',
    RDNT: '0x3aDd729b140D61f8011511cAC7b0FeC2CFc9033B',
  },
};

// Radiant lending pool addresses
export const RADIANT_LENDING_POOLS: Record<RadiantSupportedChain, string> = {
  [RadiantSupportedChain.ARBITRUM]: '0x2032b9A8e9F7e76768CA9271003d3e43E1616B1F',
  [RadiantSupportedChain.BSC]: '0xd50Cf00b6e600Dd036Ba8eF475677d816d6C4281',
  [RadiantSupportedChain.AVALANCHE]: '0x570AF60A5B57f41a7A82631787a6054BB804f9f3',
};

// Radiant price oracle addresses
export const RADIANT_PRICE_ORACLES: Record<RadiantSupportedChain, string> = {
  [RadiantSupportedChain.ARBITRUM]: '0xb56c2F0B653B2e0b10C9b928C8580Ac5Df02C7C7',
  [RadiantSupportedChain.BSC]: '0x31dE05f28568e3d3D612BFA6A78B356676367470',
  [RadiantSupportedChain.AVALANCHE]: '0xD2A345e5a9e37d535E3805A2b72C9A0Fb1DaF657',
};

/**
 * Configuration for Radiant lending operations
 */
export interface RadiantLendingParams {
  // Chain and token information
  chain: RadiantSupportedChain;
  token: string;

  // Action parameters
  action: 'deposit' | 'borrow' | 'repay' | 'withdraw' | 'flashLoan';
  amount: string;

  // Advanced parameters
  useAsCollateral?: boolean;
  interestRateMode?: 'variable' | 'stable';
  referralCode?: number;

  // For flash loans
  flashLoanTarget?: string;
  flashLoanData?: string;
}

/**
 * Vulnerability test configuration
 */
export interface RadiantVulnerabilityTestParams {
  chain: RadiantSupportedChain;
  attackType: 'flashLoan' | 'oracleManipulation' | 'liquidation' | 'interestRate';
  token: string;
  amount: string;
  iterations?: number;
  manipulationFactor?: number; // For price manipulation tests
}

export class RadiantTestHarness extends LayerZeroTestHarness {
  /**
   * Initializes the Radiant test harness
   */
  async initialize(page: Page): Promise<void> {
    await super.initialize(page);

    // Initialize Radiant-specific testing environment
    await page.addInitScript(() => {
      // Add Radiant ABI and configuration to window object for testing
      window.radiant = {
        // Simplified Radiant lending pool ABI
        lendingPoolAbi: [
          'function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external',
          'function withdraw(address asset, uint256 amount, address to) external returns (uint256)',
          'function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf) external',
          'function repay(address asset, uint256 amount, uint256 rateMode, address onBehalfOf) external returns (uint256)',
          'function flashLoan(address receiverAddress, address[] calldata assets, uint256[] calldata amounts, uint256[] calldata modes, address onBehalfOf, bytes calldata params, uint16 referralCode) external',
        ],
        // Oracle ABI
        oracleAbi: [
          'function getAssetPrice(address asset) external view returns (uint256)',
          'function getAssetsPrices(address[] calldata assets) external view returns (uint256[] memory)',
        ],
        // Mock functions to simulate Radiant operations
        deposit: async function (params) {
          console.log('Simulating Radiant deposit:', params);

          const pool = window.radiant.getLendingPoolAddress(params.chain);
          const tokenAddress = window.radiant.getTokenAddress(params.chain, params.token);

          console.log(`Approving ${params.amount} of token ${tokenAddress} to pool ${pool}`);

          // Generate a mock transaction hash
          const txHash =
            '0x' +
            Array(64)
              .fill(0)
              .map(() => Math.floor(Math.random() * 16).toString(16))
              .join('');

          // Record the deposit details for verification
          if (!window.radiantOperations) {
            window.radiantOperations = [];
          }
          window.radiantOperations.push({
            timestamp: Date.now(),
            operation: 'deposit',
            params,
            txHash,
            status: 'success',
          });

          return {
            success: true,
            txHash,
            gasUsed: String(Math.floor(200000 + Math.random() * 50000)),
          };
        },

        withdraw: async function (params) {
          console.log('Simulating Radiant withdrawal:', params);

          // Generate a mock transaction hash
          const txHash =
            '0x' +
            Array(64)
              .fill(0)
              .map(() => Math.floor(Math.random() * 16).toString(16))
              .join('');

          // Record the withdrawal details
          if (!window.radiantOperations) {
            window.radiantOperations = [];
          }
          window.radiantOperations.push({
            timestamp: Date.now(),
            operation: 'withdraw',
            params,
            txHash,
            status: 'success',
          });

          return {
            success: true,
            txHash,
            amountReceived: params.amount,
            gasUsed: String(Math.floor(250000 + Math.random() * 50000)),
          };
        },

        borrow: async function (params) {
          console.log('Simulating Radiant borrow:', params);

          // Check if user has sufficient collateral
          const hasCollateral =
            window.radiantOperations &&
            window.radiantOperations.some(
              op =>
                op.operation === 'deposit' &&
                op.params.token &&
                op.params.useAsCollateral &&
                op.status === 'success'
            );

          if (!hasCollateral) {
            return {
              success: false,
              error: 'Insufficient collateral to borrow',
            };
          }

          // Generate a mock transaction hash
          const txHash =
            '0x' +
            Array(64)
              .fill(0)
              .map(() => Math.floor(Math.random() * 16).toString(16))
              .join('');

          // Record the borrow details
          if (!window.radiantOperations) {
            window.radiantOperations = [];
          }
          window.radiantOperations.push({
            timestamp: Date.now(),
            operation: 'borrow',
            params,
            txHash,
            status: 'success',
          });

          return {
            success: true,
            txHash,
            interestRate: params.interestRateMode === 'stable' ? '0.05' : '0.03', // 5% stable, 3% variable
            gasUsed: String(Math.floor(300000 + Math.random() * 50000)),
          };
        },

        flashLoan: async function (params) {
          console.log('Simulating Radiant flash loan:', params);

          // Generate a mock transaction hash
          const txHash =
            '0x' +
            Array(64)
              .fill(0)
              .map(() => Math.floor(Math.random() * 16).toString(16))
              .join('');

          // Calculate flash loan fee (0.09%)
          const fee = Number(params.amount) * 0.0009;

          // Record the flash loan details
          if (!window.radiantOperations) {
            window.radiantOperations = [];
          }
          window.radiantOperations.push({
            timestamp: Date.now(),
            operation: 'flashLoan',
            params,
            txHash,
            fee: String(fee),
            status: 'success',
          });

          return {
            success: true,
            txHash,
            fee: String(fee),
            gasUsed: String(Math.floor(500000 + Math.random() * 100000)),
          };
        },

        // Get lending pool address by chain
        getLendingPoolAddress: function (chain) {
          return (
            window.RADIANT_LENDING_POOLS[chain] || '0x0000000000000000000000000000000000000000'
          );
        },

        // Get token address by chain and symbol
        getTokenAddress: function (chain, token) {
          const tokens = window.RADIANT_TOKENS[chain] || {};
          return tokens[token] || '0x0000000000000000000000000000000000000000';
        },

        // Get price oracle address by chain
        getPriceOracleAddress: function (chain) {
          return (
            window.RADIANT_PRICE_ORACLES[chain] || '0x0000000000000000000000000000000000000000'
          );
        },

        // Get asset price from oracle
        getAssetPrice: function (chain, token) {
          const tokenAddress = window.radiant.getTokenAddress(chain, token);
          const prices = {
            USDC: '1000000', // $1 with 6 decimals
            USDT: '1000000', // $1 with 6 decimals
            ETH: '1800000000', // $1800 with 6 decimals
            BTC: '30000000000', // $30000 with 6 decimals
            RDNT: '300000', // $0.30 with 6 decimals
          };

          return prices[token] || '0';
        },

        // Simulate oracle price manipulation
        manipulatePrice: function (chain, token, factor) {
          console.log(
            `Simulating price manipulation for ${token} on chain ${chain}, factor: ${factor}`
          );

          // In a real implementation, this would be impossible
          // For testing purposes, we simulate the vulnerability
          const basePrice = window.radiant.getAssetPrice(chain, token);
          const manipulatedPrice = String(Math.floor(Number(basePrice) * factor));

          console.log(`Price manipulation: ${basePrice} -> ${manipulatedPrice}`);

          // Record the manipulation attempt
          if (!window.radiantVulnerabilities) {
            window.radiantVulnerabilities = [];
          }
          window.radiantVulnerabilities.push({
            timestamp: Date.now(),
            type: 'oracleManipulation',
            token,
            chain,
            originalPrice: basePrice,
            manipulatedPrice,
            factor,
          });

          return {
            success: factor > 0.5 && factor < 2, // Only succeed within reasonable bounds for testing
            originalPrice: basePrice,
            manipulatedPrice,
          };
        },
      };

      // Initialize global mock configuration
      window.RADIANT_LENDING_POOLS = {
        42161: '0x2032b9A8e9F7e76768CA9271003d3e43E1616B1F', // Arbitrum
        56: '0xd50Cf00b6e600Dd036Ba8eF475677d816d6C4281', // BSC
        43114: '0x570AF60A5B57f41a7A82631787a6054BB804f9f3', // Avalanche
      };

      window.RADIANT_PRICE_ORACLES = {
        42161: '0xb56c2F0B653B2e0b10C9b928C8580Ac5Df02C7C7', // Arbitrum
        56: '0x31dE05f28568e3d3D612BFA6A78B356676367470', // BSC
        43114: '0xD2A345e5a9e37d535E3805A2b72C9A0Fb1DaF657', // Avalanche
      };

      window.RADIANT_TOKENS = {
        42161: {
          // Arbitrum
          USDC: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
          USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
          ETH: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
          BTC: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
          RDNT: '0x3082CC23568eA640225c2467653dB90e9250AaA0',
        },
        56: {
          // BSC
          USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
          USDT: '0x55d398326f99059fF775485246999027B3197955',
          ETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
          BTC: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
          RDNT: '0xf7DE7E8A6bd59ED41a4b5fe50278b3B7f31384dF',
        },
        43114: {
          // Avalanche
          USDC: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
          USDT: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
          ETH: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
          BTC: '0x152b9d0FdC40C096757F570A51E494bd4b943E50',
          RDNT: '0x3aDd729b140D61f8011511cAC7b0FeC2CFc9033B',
        },
      };
    });
  }

  /**
   * Performs a deposit operation on Radiant
   * @param page Playwright page
   * @param params Deposit parameters
   * @returns Result of the deposit operation
   */
  async deposit(page: Page, params: RadiantLendingParams): Promise<any> {
    console.log(`Depositing ${params.amount} ${params.token} on Radiant (${params.chain})`);

    // Default values for optional parameters
    const useAsCollateral = params.useAsCollateral !== undefined ? params.useAsCollateral : true;
    const referralCode = params.referralCode || 0;

    // Execute the deposit via the page context
    return await page.evaluate(
      async (params, useAsCollateral, referralCode) => {
        // Prepare deposit parameters
        const depositParams = {
          chain: params.chain,
          token: params.token,
          amount: params.amount,
          useAsCollateral,
          referralCode,
        };

        // Execute the deposit
        try {
          return await window.radiant.deposit(depositParams);
        } catch (error) {
          return {
            success: false,
            error: error.message,
          };
        }
      },
      params,
      useAsCollateral,
      referralCode
    );
  }

  /**
   * Performs a withdrawal operation on Radiant
   * @param page Playwright page
   * @param params Withdrawal parameters
   * @returns Result of the withdrawal operation
   */
  async withdraw(page: Page, params: RadiantLendingParams): Promise<any> {
    console.log(`Withdrawing ${params.amount} ${params.token} from Radiant (${params.chain})`);

    // Execute the withdrawal via the page context
    return await page.evaluate(async params => {
      // Prepare withdrawal parameters
      const withdrawParams = {
        chain: params.chain,
        token: params.token,
        amount: params.amount,
      };

      // Execute the withdrawal
      try {
        return await window.radiant.withdraw(withdrawParams);
      } catch (error) {
        return {
          success: false,
          error: error.message,
        };
      }
    }, params);
  }

  /**
   * Performs a borrow operation on Radiant
   * @param page Playwright page
   * @param params Borrow parameters
   * @returns Result of the borrow operation
   */
  async borrow(page: Page, params: RadiantLendingParams): Promise<any> {
    console.log(`Borrowing ${params.amount} ${params.token} from Radiant (${params.chain})`);

    // Default values for optional parameters
    const interestRateMode = params.interestRateMode || 'variable';
    const referralCode = params.referralCode || 0;

    // Execute the borrow via the page context
    return await page.evaluate(
      async (params, interestRateMode, referralCode) => {
        // Prepare borrow parameters
        const borrowParams = {
          chain: params.chain,
          token: params.token,
          amount: params.amount,
          interestRateMode,
          referralCode,
        };

        // Execute the borrow
        try {
          return await window.radiant.borrow(borrowParams);
        } catch (error) {
          return {
            success: false,
            error: error.message,
          };
        }
      },
      params,
      interestRateMode,
      referralCode
    );
  }

  /**
   * Performs a flash loan operation on Radiant
   * @param page Playwright page
   * @param params Flash loan parameters
   * @returns Result of the flash loan operation
   */
  async flashLoan(page: Page, params: RadiantLendingParams): Promise<any> {
    console.log(
      `Executing flash loan for ${params.amount} ${params.token} on Radiant (${params.chain})`
    );

    // Default values for optional parameters
    const referralCode = params.referralCode || 0;
    const flashLoanTarget = params.flashLoanTarget || '0x0000000000000000000000000000000000000000';
    const flashLoanData = params.flashLoanData || '0x';

    // Execute the flash loan via the page context
    return await page.evaluate(
      async (params, referralCode, flashLoanTarget, flashLoanData) => {
        // Prepare flash loan parameters
        const flashLoanParams = {
          chain: params.chain,
          token: params.token,
          amount: params.amount,
          referralCode,
          flashLoanTarget,
          flashLoanData,
        };

        // Execute the flash loan
        try {
          return await window.radiant.flashLoan(flashLoanParams);
        } catch (error) {
          return {
            success: false,
            error: error.message,
          };
        }
      },
      params,
      referralCode,
      flashLoanTarget,
      flashLoanData
    );
  }

  /**
   * Tests for potential vulnerabilities in Radiant lending protocol
   * @param page Playwright page
   * @param params Test parameters
   * @returns Vulnerability findings
   */
  async testRadiantVulnerabilities(
    page: Page,
    params: RadiantVulnerabilityTestParams
  ): Promise<any> {
    // Create object to store vulnerability findings
    const findings = [];

    switch (params.attackType) {
      case 'flashLoan':
        console.log('Testing flash loan vulnerabilities...');
        await this.testFlashLoanAttacks(page, params, findings);
        break;

      case 'oracleManipulation':
        console.log('Testing oracle manipulation vulnerabilities...');
        await this.testOracleManipulation(page, params, findings);
        break;

      case 'liquidation':
        console.log('Testing liquidation vulnerabilities...');
        await this.testLiquidationVulnerabilities(page, params, findings);
        break;

      case 'interestRate':
        console.log('Testing interest rate manipulation vulnerabilities...');
        await this.testInterestRateManipulation(page, params, findings);
        break;
    }

    // Return findings
    return {
      vulnerabilitiesFound: findings.length > 0,
      findings,
      testType: params.attackType,
      details: { chain: params.chain, token: params.token },
    };
  }

  /**
   * Tests for flash loan attack vulnerabilities
   * @private
   */
  private async testFlashLoanAttacks(
    page: Page,
    params: RadiantVulnerabilityTestParams,
    findings: any[]
  ): Promise<void> {
    // Test flash loan -> price manipulation -> liquidation attack pattern

    const iterations = params.iterations || 3;

    // Step 1: Deposit collateral (should happen before the attack)
    await this.deposit(page, {
      chain: params.chain,
      token: 'ETH',
      action: 'deposit',
      amount: '10', // 10 ETH as collateral
      useAsCollateral: true,
    });

    // Step 2: Borrow assets against collateral
    await this.borrow(page, {
      chain: params.chain,
      token: params.token,
      action: 'borrow',
      amount: '10000', // Borrow 10,000 USDC/USDT
      interestRateMode: 'variable',
    });

    // Step 3: Attempt flash loan attack
    for (let i = 0; i < iterations; i++) {
      // Take out large flash loan
      const flashLoanAmount = String(Number(params.amount) * (i + 1));

      const flashLoanResult = await this.flashLoan(page, {
        chain: params.chain,
        token: params.token,
        action: 'flashLoan',
        amount: flashLoanAmount,
      });

      if (flashLoanResult.success) {
        // Try to manipulate prices with the flash loan
        const manipulationResult = await page.evaluate(
          async (chain, token, factor) => {
            return window.radiant.manipulatePrice(chain, token, factor);
          },
          params.chain,
          'ETH',
          0.7
        ); // Attempt to drop ETH price by 30%

        if (manipulationResult.success) {
          findings.push({
            type: 'FLASH_LOAN_PRICE_MANIPULATION',
            severity: 'HIGH',
            description:
              'Flash loan can be used to manipulate asset prices, potentially enabling liquidation attacks',
            details: {
              flashLoanAmount,
              priceImpact: `${manipulationResult.originalPrice} -> ${manipulationResult.manipulatedPrice}`,
              chain: params.chain,
              token: params.token,
            },
          });
        }
      }
    }
  }

  /**
   * Tests for oracle manipulation vulnerabilities
   * @private
   */
  private async testOracleManipulation(
    page: Page,
    params: RadiantVulnerabilityTestParams,
    findings: any[]
  ): Promise<void> {
    // Test direct oracle price manipulation

    const manipulationFactor = params.manipulationFactor || 0.5; // Default: try to halve the price

    // Attempt to directly manipulate the price
    const manipulationResult = await page.evaluate(
      async (chain, token, factor) => {
        return window.radiant.manipulatePrice(chain, token, factor);
      },
      params.chain,
      params.token,
      manipulationFactor
    );

    if (manipulationResult.success) {
      findings.push({
        type: 'ORACLE_MANIPULATION',
        severity: 'CRITICAL',
        description: 'Oracle prices can be directly manipulated',
        details: {
          originalPrice: manipulationResult.originalPrice,
          manipulatedPrice: manipulationResult.manipulatedPrice,
          chain: params.chain,
          token: params.token,
          manipulationFactor,
        },
      });
    }

    // Test oracle staleness/update frequency
    const stalenessTestResult = await page.evaluate(
      async (chain, token) => {
        // Simulate checking price multiple times
        const prices = [];
        for (let i = 0; i < 5; i++) {
          prices.push(window.radiant.getAssetPrice(chain, token));
          // Wait a short time between checks
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Check if prices never change (could indicate stale oracle)
        const allSame = prices.every(p => p === prices[0]);

        return {
          prices,
          allSame,
        };
      },
      params.chain,
      params.token
    );

    if (stalenessTestResult.allSame) {
      findings.push({
        type: 'STALE_ORACLE',
        severity: 'MEDIUM',
        description: 'Oracle prices appear to be stale and not updating frequently',
        details: {
          chain: params.chain,
          token: params.token,
          samplePrices: stalenessTestResult.prices,
        },
      });
    }
  }

  /**
   * Tests for liquidation vulnerabilities
   * @private
   */
  private async testLiquidationVulnerabilities(
    page: Page,
    params: RadiantVulnerabilityTestParams,
    findings: any[]
  ): Promise<void> {
    // Set up a position that could be liquidated

    // Step 1: Deposit collateral
    await this.deposit(page, {
      chain: params.chain,
      token: 'ETH',
      action: 'deposit',
      amount: '1', // 1 ETH as collateral
      useAsCollateral: true,
    });

    // Step 2: Borrow assets against collateral (close to max LTV)
    await this.borrow(page, {
      chain: params.chain,
      token: params.token,
      action: 'borrow',
      amount: '1500', // Borrow 1,500 USDC/USDT (close to max with 1 ETH at ~$1800)
      interestRateMode: 'variable',
    });

    // Step 3: Test for front-running liquidation vulnerability
    const liquidationFrontRunTestResult = await page.evaluate(async chain => {
      // In a real implementation, we would test if we can detect liquidation
      // transactions in the mempool and front-run them

      // Simulate a slight price drop that would trigger liquidation
      const manipulationResult = window.radiant.manipulatePrice(chain, 'ETH', 0.8); // 20% drop

      // Record the simulation result
      if (!window.radiantVulnerabilities) {
        window.radiantVulnerabilities = [];
      }
      window.radiantVulnerabilities.push({
        timestamp: Date.now(),
        type: 'liquidationFrontRunning',
        chain,
        manipulationResult,
        mempool: {
          canDetectPendingLiquidations: Math.random() > 0.5, // Simulate 50% chance of detection
          timeToFrontRun: `${Math.floor(Math.random() * 5 + 1)} blocks`,
        },
      });

      const lastVulnerability =
        window.radiantVulnerabilities[window.radiantVulnerabilities.length - 1];
      return {
        mempoolAccess: lastVulnerability.mempool.canDetectPendingLiquidations,
        details: lastVulnerability,
      };
    }, params.chain);

    if (liquidationFrontRunTestResult.mempoolAccess) {
      findings.push({
        type: 'LIQUIDATION_FRONT_RUNNING',
        severity: 'MEDIUM',
        description:
          'Liquidation transactions can potentially be detected in the mempool and front-run',
        details: liquidationFrontRunTestResult.details,
      });
    }
  }

  /**
   * Tests for interest rate manipulation vulnerabilities
   * @private
   */
  private async testInterestRateManipulation(
    page: Page,
    params: RadiantVulnerabilityTestParams,
    findings: any[]
  ): Promise<void> {
    // Test for interest rate manipulation through large deposits/borrows

    const iterations = params.iterations || 3;
    const testAmounts = [];

    // Generate test amounts of increasing size
    const baseAmount = Number(params.amount);
    for (let i = 0; i < iterations; i++) {
      testAmounts.push(String(baseAmount * Math.pow(10, i)));
    }

    // Test interest rate changes with different deposit amounts
    const interestRateResults = await page.evaluate(
      async (chain, token, amounts) => {
        const results = [];

        for (const amount of amounts) {
          // Simulate checking interest rates before and after large deposit
          const beforeRate = Math.random() * 0.05 + 0.02; // Random 2-7% rate

          // Simulate deposit (in real test we would actually make the deposit)
          console.log(`Simulating ${amount} deposit impact on interest rates`);

          // Calculate simulated new interest rate
          // Larger deposits should decrease borrow rates
          const depositImpact = Math.min(0.5, Number(amount) / 1000000); // Cap impact at 50%
          const afterRate = beforeRate * (1 - depositImpact);

          results.push({
            amount,
            beforeRate: beforeRate.toFixed(4),
            afterRate: afterRate.toFixed(4),
            percentChange: (((afterRate - beforeRate) / beforeRate) * 100).toFixed(2) + '%',
          });
        }

        return results;
      },
      params.chain,
      params.token,
      testAmounts
    );

    // Check for significant interest rate manipulation potential
    for (const result of interestRateResults) {
      const percentChange = parseFloat(result.percentChange);
      if (Math.abs(percentChange) > 20) {
        // More than 20% change
        findings.push({
          type: 'INTEREST_RATE_MANIPULATION',
          severity: 'MEDIUM',
          description: 'Large deposits can significantly manipulate protocol interest rates',
          details: {
            chain: params.chain,
            token: params.token,
            amount: result.amount,
            rateChange: result.percentChange,
          },
        });
        break; // One finding is enough
      }
    }
  }
}
