/**
 * Trading Strategy Analyzer
 *
 * This module provides advanced analysis of DeFi trading strategies to identify
 * potential security vulnerabilities and attack vectors.
 */

const ethers = require('ethers');
const fs = require('fs-extra');
const path = require('path');
// Simple console colors fallback (chalk v5+ is ES module only)
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};

// Vulnerability definitions
const VULNERABILITIES = {
  PRICE_MANIPULATION: {
    id: 'PRICE_MANIPULATION',
    name: 'Price Manipulation Vulnerability',
    description: 'The strategy is vulnerable to price manipulation attacks',
    severity: 'HIGH',
    remediation:
      'Use time-weighted average prices (TWAPs) or implement circuit breakers to detect sudden price changes.',
  },
  SANDWICH_ATTACK: {
    id: 'SANDWICH_ATTACK',
    name: 'Sandwich Attack Vulnerability',
    description: 'The strategy is vulnerable to sandwich attacks (front/back-running)',
    severity: 'HIGH',
    remediation:
      'Use strict slippage parameters and consider private transactions via flashbots or similar services.',
  },
  FLASH_LOAN_ATTACK: {
    id: 'FLASH_LOAN_ATTACK',
    name: 'Flash Loan Attack Vulnerability',
    description: 'The strategy is vulnerable to flash loan attacks',
    severity: 'CRITICAL',
    remediation:
      'Implement proper access controls and use secure price oracles that cannot be manipulated in a single transaction.',
  },
  ORACLE_MANIPULATION: {
    id: 'ORACLE_MANIPULATION',
    name: 'Oracle Manipulation',
    description: 'The strategy relies on oracles that can be manipulated',
    severity: 'HIGH',
    remediation:
      'Use decentralized oracles with multiple data sources and implement circuit breakers for suspicious price movements.',
  },
  IMPERMANENT_LOSS: {
    id: 'IMPERMANENT_LOSS',
    name: 'High Impermanent Loss Risk',
    description: 'The strategy has high exposure to impermanent loss',
    severity: 'MEDIUM',
    remediation:
      'Consider concentrated liquidity positions or use stablecoin pairs to minimize impermanent loss.',
  },
  RUGPULL: {
    id: 'RUGPULL',
    name: 'Rug Pull Risk',
    description: 'The strategy involves tokens with high rug pull potential',
    severity: 'HIGH',
    remediation:
      "Avoid tokens with centralized admin controls or tokens that haven't been audited.",
  },
  SMART_CONTRACT_RISK: {
    id: 'SMART_CONTRACT_RISK',
    name: 'Unaudited Smart Contract Risk',
    description: 'The strategy interacts with unaudited or high-risk smart contracts',
    severity: 'HIGH',
    remediation:
      'Only interact with audited protocols and implement transaction limits to minimize exposure.',
  },
  MEV_EXPLOITATION: {
    id: 'MEV_EXPLOITATION',
    name: 'MEV Exploitation Risk',
    description: 'The strategy is susceptible to MEV extraction',
    severity: 'MEDIUM',
    remediation:
      'Use private transaction pools like Flashbots, implement small transaction sizes, or add randomness to execution timing.',
  },
  INSUFFICIENT_SLIPPAGE: {
    id: 'INSUFFICIENT_SLIPPAGE',
    name: 'Insufficient Slippage Protection',
    description: 'The strategy does not implement proper slippage controls',
    severity: 'MEDIUM',
    remediation: 'Implement proper slippage parameters based on token volatility and liquidity.',
  },
  UNLIMITED_APPROVALS: {
    id: 'UNLIMITED_APPROVALS',
    name: 'Unlimited Token Approvals',
    description: 'The strategy uses unlimited token approvals',
    severity: 'MEDIUM',
    remediation: 'Use exact approvals for the amount needed rather than unlimited approvals.',
  },
};

/**
 * Trading Strategy Analyzer class
 */
class TradingStrategyAnalyzer {
  /**
   * Create a new Trading Strategy Analyzer
   * @param {Object} config Configuration options
   */
  constructor(config = {}) {
    this.config = {
      outputDir: path.join(process.cwd(), 'reports', 'defi', 'trading-security'),
      provider: null,
      networkId: 1,
      simulationRuns: 10,
      detectionThreshold: 0.7, // Confidence threshold for vulnerability detection
      ...config,
    };

    // Ensure output directory exists
    fs.ensureDirSync(this.config.outputDir);

    // Initialize provider if not provided
    if (!this.config.provider) {
      if (this.config.rpcUrl) {
        this.config.provider = new ethers.providers.JsonRpcProvider(this.config.rpcUrl);
      } else {
        throw new Error('Either provider or rpcUrl must be provided in the configuration');
      }
    }
  }

  /**
   * Analyze a trading strategy for security vulnerabilities
   * @param {Object} strategy Trading strategy configuration
   * @returns {Promise<Object>} Analysis results
   */
  async analyzeStrategy(strategy) {
    console.log(
      chalk.blue(`Analyzing strategy: ${strategy.name || strategy.id || 'Unnamed Strategy'}`)
    );

    const startTime = Date.now();
    const results = {
      strategy: {
        id: strategy.id || `strategy-${Date.now()}`,
        name: strategy.name || `Strategy ${Date.now()}`,
        type: strategy.type || 'UNKNOWN',
        description: strategy.description || '',
      },
      vulnerabilities: [],
      riskScore: 0,
      analysisTime: 0,
      timestamp: new Date().toISOString(),
      recommendations: [],
    };

    try {
      // Run all vulnerability checks
      await this.runVulnerabilityChecks(strategy, results);

      // Calculate overall risk score
      results.riskScore = this.calculateRiskScore(results.vulnerabilities);

      // Generate recommendations
      results.recommendations = this.generateRecommendations(results.vulnerabilities);

      // Record analysis time
      results.analysisTime = Date.now() - startTime;

      // Save analysis report
      this.saveAnalysisReport(results);

      return results;
    } catch (error) {
      console.error(chalk.red(`Error analyzing strategy: ${error.message}`));
      throw error;
    }
  }

  /**
   * Run all vulnerability checks on the strategy
   * @param {Object} strategy Trading strategy
   * @param {Object} results Results object to populate
   */
  async runVulnerabilityChecks(strategy, results) {
    // Run checks in parallel
    const checkResults = await Promise.all([
      this.checkPriceManipulation(strategy),
      this.checkSandwichAttack(strategy),
      this.checkFlashLoanAttack(strategy),
      this.checkOracleManipulation(strategy),
      this.checkImpermanentLossRisk(strategy),
      this.checkRugPullRisk(strategy),
      this.checkSmartContractRisk(strategy),
      this.checkMEVExploitation(strategy),
      this.checkSlippageProtection(strategy),
      this.checkUnlimitedApprovals(strategy),
    ]);

    // Collect detected vulnerabilities
    checkResults.forEach(result => {
      if (result && result.detected) {
        results.vulnerabilities.push(result);
      }
    });
  }

  /**
   * Check for price manipulation vulnerability
   * @param {Object} strategy Trading strategy
   * @returns {Promise<Object|null>} Vulnerability details if detected
   */
  async checkPriceManipulation(strategy) {
    // Check if the strategy uses single-block price references
    const usesSingleBlockPrices = this.detectSingleBlockPrices(strategy);

    // Check if strategy trades in low liquidity pools
    const usesLowLiquidityPools = await this.detectLowLiquidityPools(strategy);

    // Check if strategy uses multiple sources for price
    const usesDiversePriceSources = this.detectMultiplePriceSources(strategy);

    let confidence = 0;
    if (usesSingleBlockPrices) confidence += 0.4;
    if (usesLowLiquidityPools) confidence += 0.4;
    if (!usesDiversePriceSources) confidence += 0.2;

    if (confidence >= this.config.detectionThreshold) {
      return {
        ...VULNERABILITIES.PRICE_MANIPULATION,
        detected: true,
        confidence,
        details: {
          usesSingleBlockPrices,
          usesLowLiquidityPools,
          usesDiversePriceSources,
        },
      };
    }

    return null;
  }

  /**
   * Check for sandwich attack vulnerability
   * @param {Object} strategy Trading strategy
   * @returns {Promise<Object|null>} Vulnerability details if detected
   */
  async checkSandwichAttack(strategy) {
    // Check if strategy uses large swaps
    const usesLargeSwaps = this.detectLargeSwaps(strategy);

    // Check if strategy uses loose slippage tolerances
    const hasLooseSlippage = this.detectLooseSlippage(strategy);

    // Check if strategy trades on public mempool
    const usesPublicMempool = !this.detectPrivateTransactions(strategy);

    let confidence = 0;
    if (usesLargeSwaps) confidence += 0.3;
    if (hasLooseSlippage) confidence += 0.4;
    if (usesPublicMempool) confidence += 0.3;

    if (confidence >= this.config.detectionThreshold) {
      return {
        ...VULNERABILITIES.SANDWICH_ATTACK,
        detected: true,
        confidence,
        details: {
          usesLargeSwaps,
          hasLooseSlippage,
          usesPublicMempool,
        },
      };
    }

    return null;
  }

  /**
   * Check for flash loan attack vulnerability
   * @param {Object} strategy Trading strategy
   * @returns {Promise<Object|null>} Vulnerability details if detected
   */
  async checkFlashLoanAttack(strategy) {
    // Check if strategy relies on on-chain price oracles that can be manipulated
    const usesManipulableOracles = this.detectManipulableOracles(strategy);

    // Check if strategy has weak access controls
    const hasWeakAccessControls = this.detectWeakAccessControls(strategy);

    // Check if strategy uses atomic transactions that change state based on price
    const usesAtomicPriceBasedLogic = this.detectAtomicPriceBasedLogic(strategy);

    let confidence = 0;
    if (usesManipulableOracles) confidence += 0.4;
    if (hasWeakAccessControls) confidence += 0.3;
    if (usesAtomicPriceBasedLogic) confidence += 0.3;

    if (confidence >= this.config.detectionThreshold) {
      return {
        ...VULNERABILITIES.FLASH_LOAN_ATTACK,
        detected: true,
        confidence,
        details: {
          usesManipulableOracles,
          hasWeakAccessControls,
          usesAtomicPriceBasedLogic,
        },
      };
    }

    return null;
  }

  /**
   * Check for oracle manipulation vulnerability
   * @param {Object} strategy Trading strategy
   * @returns {Promise<Object|null>} Vulnerability details if detected
   */
  async checkOracleManipulation(strategy) {
    // Check if strategy uses centralized oracles
    const usesCentralizedOracles = this.detectCentralizedOracles(strategy);

    // Check if strategy uses single-source oracles
    const usesSingleSourceOracles = this.detectSingleSourceOracles(strategy);

    // Check if strategy lacks oracle security modules
    const lacksOracleSecurityModules = this.detectLackOfOracleSecurityModules(strategy);

    let confidence = 0;
    if (usesCentralizedOracles) confidence += 0.3;
    if (usesSingleSourceOracles) confidence += 0.4;
    if (lacksOracleSecurityModules) confidence += 0.3;

    if (confidence >= this.config.detectionThreshold) {
      return {
        ...VULNERABILITIES.ORACLE_MANIPULATION,
        detected: true,
        confidence,
        details: {
          usesCentralizedOracles,
          usesSingleSourceOracles,
          lacksOracleSecurityModules,
        },
      };
    }

    return null;
  }

  /**
   * Check for impermanent loss risk
   * @param {Object} strategy Trading strategy
   * @returns {Promise<Object|null>} Vulnerability details if detected
   */
  async checkImpermanentLossRisk(strategy) {
    // Check if strategy provides liquidity to volatile pairs
    const providesLiquidityToVolatilePairs = this.detectVolatilePairs(strategy);

    // Check if strategy uses standard liquidity positions (vs. concentrated liquidity)
    const usesStandardLiquidityPositions = this.detectStandardLiquidityPositions(strategy);

    // Check if strategy has a high proportion of assets in LP positions
    const hasHighLPExposure = this.detectHighLPExposure(strategy);

    let confidence = 0;
    if (providesLiquidityToVolatilePairs) confidence += 0.4;
    if (usesStandardLiquidityPositions) confidence += 0.3;
    if (hasHighLPExposure) confidence += 0.3;

    if (confidence >= this.config.detectionThreshold) {
      return {
        ...VULNERABILITIES.IMPERMANENT_LOSS,
        detected: true,
        confidence,
        details: {
          providesLiquidityToVolatilePairs,
          usesStandardLiquidityPositions,
          hasHighLPExposure,
        },
      };
    }

    return null;
  }

  /**
   * Check for rug pull risk
   * @param {Object} strategy Trading strategy
   * @returns {Promise<Object|null>} Vulnerability details if detected
   */
  async checkRugPullRisk(strategy) {
    // Check if strategy uses tokens with centralized control
    const usesCentralizedTokens = await this.detectCentralizedTokens(strategy);

    // Check if strategy uses new/unaudited tokens
    const usesUnauditedTokens = await this.detectUnauditedTokens(strategy);

    // Check if strategy allocates high percentage to risky tokens
    const hasHighRiskyAllocation = this.detectHighRiskyAllocation(strategy);

    let confidence = 0;
    if (usesCentralizedTokens) confidence += 0.4;
    if (usesUnauditedTokens) confidence += 0.4;
    if (hasHighRiskyAllocation) confidence += 0.2;

    if (confidence >= this.config.detectionThreshold) {
      return {
        ...VULNERABILITIES.RUGPULL,
        detected: true,
        confidence,
        details: {
          usesCentralizedTokens,
          usesUnauditedTokens,
          hasHighRiskyAllocation,
        },
      };
    }

    return null;
  }

  /**
   * Check for smart contract risk
   * @param {Object} strategy Trading strategy
   * @returns {Promise<Object|null>} Vulnerability details if detected
   */
  async checkSmartContractRisk(strategy) {
    // Check if strategy interacts with unaudited protocols
    const usesUnauditedProtocols = await this.detectUnauditedProtocols(strategy);

    // Check if strategy interacts with recently deployed contracts
    const usesNewContracts = await this.detectNewContracts(strategy);

    // Check if strategy lacks transaction value limits
    const lacksTransactionLimits = this.detectLackOfTransactionLimits(strategy);

    let confidence = 0;
    if (usesUnauditedProtocols) confidence += 0.4;
    if (usesNewContracts) confidence += 0.3;
    if (lacksTransactionLimits) confidence += 0.3;

    if (confidence >= this.config.detectionThreshold) {
      return {
        ...VULNERABILITIES.SMART_CONTRACT_RISK,
        detected: true,
        confidence,
        details: {
          usesUnauditedProtocols,
          usesNewContracts,
          lacksTransactionLimits,
        },
      };
    }

    return null;
  }

  /**
   * Check for MEV exploitation risk
   * @param {Object} strategy Trading strategy
   * @returns {Promise<Object|null>} Vulnerability details if detected
   */
  async checkMEVExploitation(strategy) {
    // Check if strategy uses public transactions
    const usesPublicTransactions = !this.detectPrivateTransactions(strategy);

    // Check if strategy uses predictable execution patterns
    const usesPredictablePatterns = this.detectPredictablePatterns(strategy);

    // Check if strategy executes large transactions
    const executesLargeTransactions = this.detectLargeTransactions(strategy);

    let confidence = 0;
    if (usesPublicTransactions) confidence += 0.3;
    if (usesPredictablePatterns) confidence += 0.4;
    if (executesLargeTransactions) confidence += 0.3;

    if (confidence >= this.config.detectionThreshold) {
      return {
        ...VULNERABILITIES.MEV_EXPLOITATION,
        detected: true,
        confidence,
        details: {
          usesPublicTransactions,
          usesPredictablePatterns,
          executesLargeTransactions,
        },
      };
    }

    return null;
  }

  /**
   * Check for insufficient slippage protection
   * @param {Object} strategy Trading strategy
   * @returns {Promise<Object|null>} Vulnerability details if detected
   */
  async checkSlippageProtection(strategy) {
    // Check if strategy uses high slippage tolerance
    const usesHighSlippageTolerance = this.detectHighSlippageTolerance(strategy);

    // Check if strategy lacks slippage checks
    const lacksSlippageChecks = this.detectLackOfSlippageChecks(strategy);

    // Check if strategy uses static slippage across different tokens
    const usesStaticSlippage = this.detectStaticSlippage(strategy);

    let confidence = 0;
    if (usesHighSlippageTolerance) confidence += 0.4;
    if (lacksSlippageChecks) confidence += 0.4;
    if (usesStaticSlippage) confidence += 0.2;

    if (confidence >= this.config.detectionThreshold) {
      return {
        ...VULNERABILITIES.INSUFFICIENT_SLIPPAGE,
        detected: true,
        confidence,
        details: {
          usesHighSlippageTolerance,
          lacksSlippageChecks,
          usesStaticSlippage,
        },
      };
    }

    return null;
  }

  /**
   * Check for unlimited approvals
   * @param {Object} strategy Trading strategy
   * @returns {Promise<Object|null>} Vulnerability details if detected
   */
  async checkUnlimitedApprovals(strategy) {
    // Check if strategy uses unlimited token approvals
    const usesUnlimitedApprovals = this.detectUnlimitedApprovals(strategy);

    // Check if strategy doesn't revoke approvals after use
    const doesntRevokeApprovals = this.detectNoApprovalRevocation(strategy);

    // Check if strategy approves multiple spenders
    const approvesMultipleSpenders = this.detectMultipleApprovedSpenders(strategy);

    let confidence = 0;
    if (usesUnlimitedApprovals) confidence += 0.5;
    if (doesntRevokeApprovals) confidence += 0.3;
    if (approvesMultipleSpenders) confidence += 0.2;

    if (confidence >= this.config.detectionThreshold) {
      return {
        ...VULNERABILITIES.UNLIMITED_APPROVALS,
        detected: true,
        confidence,
        details: {
          usesUnlimitedApprovals,
          doesntRevokeApprovals,
          approvesMultipleSpenders,
        },
      };
    }

    return null;
  }

  // Utility detection methods
  detectSingleBlockPrices(strategy) {
    // Implementation details here
    return (
      strategy.usesOnChainPriceFeeds === true ||
      (strategy.params && strategy.params.priceAveraging === false)
    );
  }

  async detectLowLiquidityPools(strategy) {
    // Implementation details here
    return strategy.tradedPools && strategy.tradedPools.some(pool => pool.liquidity < 500000);
  }

  detectMultiplePriceSources(strategy) {
    // Implementation details here
    return strategy.priceFeeds && strategy.priceFeeds.length > 1;
  }

  detectLargeSwaps(strategy) {
    // Implementation details here
    return strategy.params && strategy.params.swapSize === 'large';
  }

  detectLooseSlippage(strategy) {
    // Implementation details here
    return strategy.params && strategy.params.slippageTolerance > 1.0;
  }

  detectPrivateTransactions(strategy) {
    // Implementation details here
    return (
      strategy.params &&
      (strategy.params.useFlashbots === true || strategy.params.privateTransactions === true)
    );
  }

  detectManipulableOracles(strategy) {
    // Implementation details here
    return (
      strategy.priceFeeds &&
      (strategy.priceFeeds.includes('single-dex') ||
        strategy.priceFeeds.includes('last-trade-price'))
    );
  }

  detectWeakAccessControls(strategy) {
    // Implementation details here
    return strategy.accessControls === 'minimal' || !strategy.accessControls;
  }

  detectAtomicPriceBasedLogic(strategy) {
    // Implementation details here
    return strategy.usesAtomicTransactions === true;
  }

  detectCentralizedOracles(strategy) {
    // Implementation details here
    return (
      strategy.priceFeeds &&
      strategy.priceFeeds.some(feed => feed.type === 'centralized' || feed.includes('centralized'))
    );
  }

  detectSingleSourceOracles(strategy) {
    // Implementation details here
    return strategy.priceFeeds && strategy.priceFeeds.length === 1;
  }

  detectLackOfOracleSecurityModules(strategy) {
    // Implementation details here
    return !strategy.oracleSecurityModules || strategy.oracleSecurityModules.length === 0;
  }

  detectVolatilePairs(strategy) {
    // Implementation details here
    if (!strategy.liquidityPairs) return false;
    return strategy.liquidityPairs.some(
      pair => pair.includes('memecoin') || pair.volatility === 'high'
    );
  }

  detectStandardLiquidityPositions(strategy) {
    // Implementation details here
    return strategy.liquidityType === 'standard' || !strategy.liquidityType;
  }

  detectHighLPExposure(strategy) {
    // Implementation details here
    return strategy.lpExposure > 0.5; // More than 50% in LP positions
  }

  async detectCentralizedTokens(strategy) {
    // Implementation details here
    if (!strategy.tokens) return false;
    return strategy.tokens.some(token => token.centralized === true);
  }

  async detectUnauditedTokens(strategy) {
    // Implementation details here
    if (!strategy.tokens) return false;
    return strategy.tokens.some(token => token.audited === false);
  }

  detectHighRiskyAllocation(strategy) {
    // Implementation details here
    if (!strategy.allocation) return false;
    return strategy.allocation.riskyTokens > 0.3; // More than 30% in risky tokens
  }

  async detectUnauditedProtocols(strategy) {
    // Implementation details here
    if (!strategy.protocols) return false;
    return strategy.protocols.some(protocol => protocol.audited === false);
  }

  async detectNewContracts(strategy) {
    // Implementation details here
    if (!strategy.contracts) return false;

    const currentTime = Date.now();
    const oneMonthMs = 30 * 24 * 60 * 60 * 1000;

    return strategy.contracts.some(contract => currentTime - contract.deploymentTime < oneMonthMs);
  }

  detectLackOfTransactionLimits(strategy) {
    // Implementation details here
    return !strategy.transactionLimits || strategy.transactionLimits.enabled === false;
  }

  detectPredictablePatterns(strategy) {
    // Implementation details here
    return (
      strategy.executionSchedule === 'fixed' ||
      (strategy.params && strategy.params.randomizedTiming === false)
    );
  }

  detectLargeTransactions(strategy) {
    // Implementation details here
    return (
      strategy.txSize === 'large' ||
      (strategy.params && strategy.params.transactionSize === 'large')
    );
  }

  detectHighSlippageTolerance(strategy) {
    // Implementation details here
    return strategy.slippageTolerance > 1.0;
  }

  detectLackOfSlippageChecks(strategy) {
    // Implementation details here
    return !strategy.slippageChecks || strategy.slippageChecks === false;
  }

  detectStaticSlippage(strategy) {
    // Implementation details here
    return strategy.params && strategy.params.dynamicSlippage === false;
  }

  detectUnlimitedApprovals(strategy) {
    // Implementation details here
    return (
      strategy.approvalType === 'unlimited' ||
      (strategy.params && strategy.params.unlimitedApprovals === true)
    );
  }

  detectNoApprovalRevocation(strategy) {
    // Implementation details here
    return strategy.revokeApprovals === false;
  }

  detectMultipleApprovedSpenders(strategy) {
    // Implementation details here
    return strategy.approvedSpenders && strategy.approvedSpenders.length > 2;
  }

  /**
   * Calculate overall risk score based on detected vulnerabilities
   * @param {Array} vulnerabilities List of detected vulnerabilities
   * @returns {Number} Risk score from 0-100
   */
  calculateRiskScore(vulnerabilities) {
    if (!vulnerabilities.length) return 0;

    // Define severity weights
    const severityWeights = {
      CRITICAL: 10,
      HIGH: 7,
      MEDIUM: 4,
      LOW: 1,
    };

    // Calculate weighted sum of vulnerabilities
    let weightedSum = 0;
    let maxPossibleScore = 0;

    vulnerabilities.forEach(vuln => {
      const weight = severityWeights[vuln.severity] || 1;
      weightedSum += weight * vuln.confidence;
      maxPossibleScore += weight;
    });

    // Calculate final score (0-100)
    const rawScore = (weightedSum / maxPossibleScore) * 100;
    return Math.min(100, Math.max(0, Math.round(rawScore)));
  }

  /**
   * Generate recommendations based on detected vulnerabilities
   * @param {Array} vulnerabilities List of detected vulnerabilities
   * @returns {Array} List of recommendations
   */
  generateRecommendations(vulnerabilities) {
    const recommendations = [];

    vulnerabilities.forEach(vuln => {
      recommendations.push({
        vulnerabilityId: vuln.id,
        title: `Fix ${vuln.name}`,
        description: vuln.remediation,
        priority:
          vuln.severity === 'CRITICAL' ? 'IMMEDIATE' : vuln.severity === 'HIGH' ? 'HIGH' : 'MEDIUM',
      });
    });

    return recommendations;
  }

  /**
   * Save analysis report to file
   * @param {Object} results Analysis results
   */
  saveAnalysisReport(results) {
    const filename = `strategy-analysis-${results.strategy.id}-${Date.now()}.json`;
    const filePath = path.join(this.config.outputDir, filename);

    fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
    console.log(chalk.green(`Saved analysis report to ${filePath}`));
  }
}

module.exports = {
  TradingStrategyAnalyzer,
  VULNERABILITIES,
};
