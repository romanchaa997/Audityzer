/**
 * Trading Strategy Analyzer Tests
 *
 * This file contains tests for the trading strategy analyzer component
 */

const { TradingStrategyAnalyzer, VULNERABILITIES } = require('./trading-strategy-analyzer');
const tradingStrategies = require('./trading-strategies');
const path = require('path');
const fs = require('fs-extra');
const { ethers } = require('ethers');

// Configure a test output directory
const TEST_OUTPUT_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'test-output',
  'defi',
  'trading-analyzer'
);
fs.ensureDirSync(TEST_OUTPUT_DIR);

describe('Trading Strategy Analyzer', () => {
  let analyzer;

  beforeEach(() => {
    // Create a mock provider for testing
    const mockProvider = {
      getNetwork: jest.fn().mockResolvedValue({ chainId: 1 }),
      getGasPrice: jest.fn().mockResolvedValue(ethers.utils.parseUnits('50', 'gwei')),
      getBalance: jest.fn().mockResolvedValue(ethers.utils.parseEther('100')),
      getLogs: jest.fn().mockResolvedValue([]),
      getTransactionCount: jest.fn().mockResolvedValue(0),
      call: jest.fn().mockResolvedValue('0x'),
      estimateGas: jest.fn().mockResolvedValue(ethers.BigNumber.from(21000)),
    };

    // Initialize analyzer with test configuration and mock provider
    analyzer = new TradingStrategyAnalyzer({
      outputDir: TEST_OUTPUT_DIR,
      detectionThreshold: 0.5, // Lower threshold for testing purposes
      provider: mockProvider, // Provide the mock provider
    });
  });

  describe('Vulnerability Detection', () => {
    test('Should detect price manipulation vulnerability', async () => {
      // Mock a strategy with price manipulation risk
      const strategy = {
        id: 'test-strategy-price-manipulation',
        name: 'Test Strategy - Price Manipulation',
        type: 'arbitrage',
        usesOnChainPriceFeeds: true,
        tradedPools: [
          { id: 'pool1', liquidity: 100000 }, // Low liquidity pool
          { id: 'pool2', liquidity: 200000 },
        ],
        priceFeeds: ['single-dex'], // Single source of price data
      };

      // Override detection methods for testing
      analyzer.detectSingleBlockPrices = jest.fn().mockReturnValue(true);
      analyzer.detectLowLiquidityPools = jest.fn().mockResolvedValue(true);
      analyzer.detectMultiplePriceSources = jest.fn().mockReturnValue(false);

      const result = await analyzer.checkPriceManipulation(strategy);

      expect(result).not.toBeNull();
      expect(result.id).toBe('PRICE_MANIPULATION');
      expect(result.detected).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0.5);
    });

    test('Should detect sandwich attack vulnerability', async () => {
      // Mock a strategy with sandwich attack risk
      const strategy = {
        id: 'test-strategy-sandwich',
        name: 'Test Strategy - Sandwich Attack',
        type: 'trading',
        params: {
          swapSize: 'large',
          slippageTolerance: 5.0, // High slippage tolerance
          useFlashbots: false,
        },
      };

      // Override detection methods for testing
      analyzer.detectLargeSwaps = jest.fn().mockReturnValue(true);
      analyzer.detectLooseSlippage = jest.fn().mockReturnValue(true);
      analyzer.detectPrivateTransactions = jest.fn().mockReturnValue(false);

      const result = await analyzer.checkSandwichAttack(strategy);

      expect(result).not.toBeNull();
      expect(result.id).toBe('SANDWICH_ATTACK');
      expect(result.detected).toBe(true);
      expect(result.confidence).toBeGreaterThanOrEqual(0.5);
    });

    test('Should not detect vulnerabilities in safe strategy', async () => {
      // Mock a strategy with good security practices
      const strategy = {
        id: 'test-strategy-safe',
        name: 'Test Strategy - Safe',
        type: 'dollar_cost_averaging',
        usesOnChainPriceFeeds: false,
        tradedPools: [
          { id: 'pool1', liquidity: 10000000 }, // High liquidity pool
          { id: 'pool2', liquidity: 20000000 },
        ],
        priceFeeds: ['chainlink', 'uniswap-twap'], // Multiple price sources
        params: {
          swapSize: 'small',
          slippageTolerance: 0.1, // Low slippage tolerance
          useFlashbots: true,
          privateTransactions: true,
          priceAveraging: true,
          dynamicSlippage: true,
        },
        accessControls: 'strict',
        usesAtomicTransactions: false,
        oracleSecurityModules: ['circuit-breaker', 'multi-source-validation'],
        transactionLimits: {
          enabled: true,
          maxAmount: '1000000',
        },
        approvalType: 'exact',
        revokeApprovals: true,
      };

      // Override all detection methods to return safe values
      const mockFalseFn = jest.fn().mockReturnValue(false);
      const mockTrueFn = jest.fn().mockReturnValue(true);
      const mockAsyncFalseFn = jest.fn().mockResolvedValue(false);
      const mockAsyncTrueFn = jest.fn().mockResolvedValue(true);

      analyzer.detectSingleBlockPrices = mockFalseFn;
      analyzer.detectLowLiquidityPools = mockAsyncFalseFn;
      analyzer.detectMultiplePriceSources = mockTrueFn;
      analyzer.detectLargeSwaps = mockFalseFn;
      analyzer.detectLooseSlippage = mockFalseFn;
      analyzer.detectPrivateTransactions = mockTrueFn;
      analyzer.detectManipulableOracles = mockFalseFn;
      analyzer.detectWeakAccessControls = mockFalseFn;
      analyzer.detectAtomicPriceBasedLogic = mockFalseFn;
      analyzer.detectCentralizedOracles = mockFalseFn;
      analyzer.detectSingleSourceOracles = mockFalseFn;
      analyzer.detectLackOfOracleSecurityModules = mockFalseFn;
      analyzer.detectVolatilePairs = mockFalseFn;
      analyzer.detectStandardLiquidityPositions = mockFalseFn;
      analyzer.detectHighLPExposure = mockFalseFn;
      analyzer.detectCentralizedTokens = mockAsyncFalseFn;
      analyzer.detectUnauditedTokens = mockAsyncFalseFn;
      analyzer.detectHighRiskyAllocation = mockFalseFn;
      analyzer.detectUnauditedProtocols = mockAsyncFalseFn;
      analyzer.detectNewContracts = mockAsyncFalseFn;
      analyzer.detectLackOfTransactionLimits = mockFalseFn;
      analyzer.detectPredictablePatterns = mockFalseFn;
      analyzer.detectLargeTransactions = mockFalseFn;
      analyzer.detectHighSlippageTolerance = mockFalseFn;
      analyzer.detectLackOfSlippageChecks = mockFalseFn;
      analyzer.detectStaticSlippage = mockFalseFn;
      analyzer.detectUnlimitedApprovals = mockFalseFn;
      analyzer.detectNoApprovalRevocation = mockFalseFn;
      analyzer.detectMultipleApprovedSpenders = mockFalseFn;

      // Run all vulnerability checks
      const results = { vulnerabilities: [] };
      await analyzer.runVulnerabilityChecks(strategy, results);

      expect(results.vulnerabilities.length).toBe(0);
    });
  });

  describe('Risk Scoring', () => {
    test('Should calculate appropriate risk scores', () => {
      const noVulnerabilities = [];
      expect(analyzer.calculateRiskScore(noVulnerabilities)).toBe(0);

      const lowRiskVulnerabilities = [
        {
          severity: 'LOW',
          confidence: 0.7,
        },
      ];
      const lowScore = analyzer.calculateRiskScore(lowRiskVulnerabilities);
      expect(lowScore).toBeGreaterThan(0);
      expect(lowScore).toBeLessThan(80);

      const highRiskVulnerabilities = [
        {
          severity: 'CRITICAL',
          confidence: 0.9,
        },
        {
          severity: 'HIGH',
          confidence: 0.8,
        },
      ];
      const highScore = analyzer.calculateRiskScore(highRiskVulnerabilities);
      expect(highScore).toBeGreaterThan(70);
    });
  });

  describe('Recommendation Generation', () => {
    test('Should generate appropriate recommendations', () => {
      const vulnerabilities = [
        {
          id: 'PRICE_MANIPULATION',
          name: 'Price Manipulation Vulnerability',
          severity: 'HIGH',
          remediation: 'Use time-weighted average prices',
        },
        {
          id: 'FLASH_LOAN_ATTACK',
          name: 'Flash Loan Attack Vulnerability',
          severity: 'CRITICAL',
          remediation: 'Implement proper access controls',
        },
      ];

      const recommendations = analyzer.generateRecommendations(vulnerabilities);

      expect(recommendations.length).toBe(2);
      expect(recommendations[0].vulnerabilityId).toBe('PRICE_MANIPULATION');
      expect(recommendations[0].priority).toBe('HIGH');
      expect(recommendations[1].vulnerabilityId).toBe('FLASH_LOAN_ATTACK');
      expect(recommendations[1].priority).toBe('IMMEDIATE');
    });
  });

  describe('Integration with Trading Strategies', () => {
    test('Should analyze arbitrage strategy', async () => {
      // Mock the trading strategies module
      // Instead of using tradingStrategies.createStrategy, create a strategy object directly
      const strategy = {
        id: 'test-arbitrage-strategy',
        name: 'Test Arbitrage Strategy',
        type: 'arbitrage',
        slippageTolerance: 2.0, // High slippage tolerance - should trigger alert
        priceFeeds: ['single-dex'], // Only one price source - should trigger alert
        useFlashbots: false, // Not using private transactions - should trigger alert
        swapSize: 'large', // Large swaps - should trigger alert
        transactions: [
          {
            type: 'swap',
            fromToken: 'ETH',
            toToken: 'DAI',
            amount: '10.0',
            expectedOutput: '20000',
            slippage: 2.0,
          },
        ]
      };

      // Override detection methods to ensure we get expected results
      analyzer.detectSingleBlockPrices = jest.fn().mockReturnValue(true);
      analyzer.detectLowLiquidityPools = jest.fn().mockResolvedValue(true);
      analyzer.detectMultiplePriceSources = jest.fn().mockReturnValue(false);
      analyzer.detectLargeSwaps = jest.fn().mockReturnValue(true);
      analyzer.detectLooseSlippage = jest.fn().mockReturnValue(true);
      analyzer.detectPrivateTransactions = jest.fn().mockReturnValue(false);
      analyzer.detectUnlimitedApprovals = jest.fn().mockReturnValue(true);

      // Run the analysis
      const results = await analyzer.analyzeStrategy(strategy);

      // Verify the results
      expect(results).toBeDefined();
      expect(results.vulnerabilities.length).toBeGreaterThan(0);
      expect(results.riskScore).toBeGreaterThan(0);
      expect(results.recommendations.length).toBeGreaterThan(0);
    });
  });
});
