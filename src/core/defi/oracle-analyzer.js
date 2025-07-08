
/**
 * DeFi Oracle Vulnerability Analyzer
 * Implements oracle manipulation detection from security research
 * 
 * Detects:
 * - Single-source oracle vulnerabilities
 * - Price manipulation attack vectors
 * - Missing TWAP/VWAP implementations
 * - Inadequate oracle validation
 */

class OracleAnalyzer {
  constructor() {
    this.oraclePatterns = this.initializeOraclePatterns();
    this.priceManipulationPatterns = this.initializePricePatterns();
  }

  initializeOraclePatterns() {
    return {
      // Single source oracle usage (vulnerable)
      singleSourceOracle: [
        /\.getPrice\s*\(\s*\)(?!\s*.*(?:twap|vwap|chainlink|aggregator))/gi,
        /\.latestRoundData\s*\(\s*\)(?!\s*.*(?:staleness|heartbeat|validation))/g,
        /balanceOf\s*\([^)]*\)\s*\/\s*totalSupply(?!\s*.*(?:twap|average))/g
      ],

      // Missing oracle validation
      missingValidation: [
        /\.latestRoundData\s*\(\s*\)(?!\s*.*require)/g,
        /\.getPrice\s*\(\s*\)(?!\s*.*require)/g,
        /price\s*=\s*[^;]*(?!\s*.*(?:require|assert|revert))/g
      ],

      // Unsafe price calculations
      unsafePriceCalc: [
        /price\s*=\s*token0\.balanceOf\s*\([^)]*\)\s*\/\s*token1\.balanceOf/g,
        /getAmountOut\s*\([^)]*\)(?!\s*.*(?:slippage|minimum))/g,
        /reserve0\s*\*\s*reserve1(?!\s*.*(?:k|constant|invariant))/g
      ]
    };
  }

  initializePricePatterns() {
    return {
      // Flash loan + price manipulation patterns
      flashLoanManipulation: [
        /flashLoan\s*\([^)]*\).*getPrice/gs,
        /borrow\s*\([^)]*\).*swap.*getPrice/gs,
        /\.call\s*\([^)]*\).*balanceOf.*totalSupply/gs
      ],

      // MEV vulnerable patterns
      mevVulnerable: [
        /function\s+swap\s*\([^)]*\)(?!\s*.*(?:deadline|slippage))/g,
        /getAmountOut\s*\([^)]*\)(?!\s*.*(?:minimum|slippage))/g,
        /addLiquidity\s*\([^)]*\)(?!\s*.*deadline)/g
      ],

      // Sandwich attack vectors
      sandwichVulnerable: [
        /swap\s*\([^)]*\)(?!\s*.*(?:private|commit|reveal))/g,
        /function\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\([^)]*\)\s+public(?!\s+.*(?:onlyOwner|onlyRole))/g
      ]
    };
  }

  /**
   * Analyze contract for oracle manipulation vulnerabilities
   */
  async analyzeOracleVulnerabilities(contractCode, contractName = 'Unknown') {
    const findings = [];

    try {
      // Check for single-source oracle usage
      const singleSourceFindings = this.detectSingleSourceOracles(contractCode);
      findings.push(...singleSourceFindings);

      // Check for missing oracle validation
      const validationFindings = this.detectMissingValidation(contractCode);
      findings.push(...validationFindings);

      // Check for unsafe price calculations
      const priceCalcFindings = this.detectUnsafePriceCalculations(contractCode);
      findings.push(...priceCalcFindings);

      // Check for flash loan manipulation vectors
      const flashLoanFindings = this.detectFlashLoanManipulation(contractCode);
      findings.push(...flashLoanFindings);

      // Check for MEV vulnerabilities
      const mevFindings = this.detectMEVVulnerabilities(contractCode);
      findings.push(...mevFindings);

      // Generate recommendations
      const recommendations = this.generateOracleRecommendations(findings);

      return {
        contractName,
        timestamp: new Date().toISOString(),
        oracleVulnerabilities: findings,
        riskLevel: this.calculateOracleRiskLevel(findings),
        recommendations,
        summary: this.generateOracleSummary(findings)
      };

    } catch (error) {
      console.error('Error analyzing oracle vulnerabilities:', error);
      return {
        contractName,
        error: error.message,
        oracleVulnerabilities: [],
        riskLevel: 'UNKNOWN'
      };
    }
  }

  detectSingleSourceOracles(code) {
    const findings = [];
    
    this.oraclePatterns.singleSourceOracle.forEach((pattern, index) => {
      let match;
      while ((match = pattern.exec(code)) !== null) {
        findings.push({
          type: 'single_source_oracle',
          category: 'ORACLE_MANIPULATION',
          severity: 'HIGH',
          description: 'Contract relies on single oracle source without validation or aggregation',
          location: this.getCodeLocation(code, match.index),
          code: match[0],
          mitigation: 'Implement TWAP, use multiple oracle sources, or integrate Chainlink price feeds',
          confidence: 0.85,
          impact: 'Price manipulation attacks, flash loan exploits, economic loss'
        });
      }
    });

    return findings;
  }

  detectMissingValidation(code) {
    const findings = [];
    
    this.oraclePatterns.missingValidation.forEach((pattern, index) => {
      let match;
      while ((match = pattern.exec(code)) !== null) {
        findings.push({
          type: 'missing_oracle_validation',
          category: 'ORACLE_MANIPULATION',
          severity: 'MEDIUM',
          description: 'Oracle data used without proper validation (staleness, bounds, sanity checks)',
          location: this.getCodeLocation(code, match.index),
          code: match[0],
          mitigation: 'Add staleness checks, price bounds validation, and heartbeat monitoring',
          confidence: 0.75,
          impact: 'Stale or manipulated price data usage'
        });
      }
    });

    return findings;
  }

  detectUnsafePriceCalculations(code) {
    const findings = [];
    
    this.oraclePatterns.unsafePriceCalc.forEach((pattern, index) => {
      let match;
      while ((match = pattern.exec(code)) !== null) {
        findings.push({
          type: 'unsafe_price_calculation',
          category: 'ORACLE_MANIPULATION',
          severity: 'HIGH',
          description: 'Price calculated from easily manipulable on-chain data (reserves, balances)',
          location: this.getCodeLocation(code, match.index),
          code: match[0],
          mitigation: 'Use time-weighted average prices (TWAP) or external price oracles',
          confidence: 0.9,
          impact: 'Price manipulation through large trades or flash loans'
        });
      }
    });

    return findings;
  }

  detectFlashLoanManipulation(code) {
    const findings = [];
    
    this.priceManipulationPatterns.flashLoanManipulation.forEach((pattern, index) => {
      let match;
      while ((match = pattern.exec(code)) !== null) {
        findings.push({
          type: 'flash_loan_price_manipulation',
          category: 'FLASH_LOAN_ATTACK',
          severity: 'CRITICAL',
          description: 'Potential flash loan attack vector for price manipulation',
          location: this.getCodeLocation(code, match.index),
          code: match[0],
          mitigation: 'Implement reentrancy guards, use TWAP, add flash loan detection',
          confidence: 0.8,
          impact: 'Complete protocol drainage through price manipulation'
        });
      }
    });

    return findings;
  }

  detectMEVVulnerabilities(code) {
    const findings = [];
    
    this.priceManipulationPatterns.mevVulnerable.forEach((pattern, index) => {
      let match;
      while ((match = pattern.exec(code)) !== null) {
        findings.push({
          type: 'mev_vulnerable_function',
          category: 'MEV_EXTRACTION',
          severity: 'MEDIUM',
          description: 'Function vulnerable to MEV extraction (front-running, sandwich attacks)',
          location: this.getCodeLocation(code, match.index),
          code: match[0],
          mitigation: 'Add slippage protection, deadlines, or use commit-reveal schemes',
          confidence: 0.7,
          impact: 'Value extraction through transaction ordering manipulation'
        });
      }
    });

    return findings;
  }

  calculateOracleRiskLevel(findings) {
    if (findings.some(f => f.severity === 'CRITICAL')) return 'CRITICAL';
    if (findings.some(f => f.severity === 'HIGH')) return 'HIGH';
    if (findings.some(f => f.severity === 'MEDIUM')) return 'MEDIUM';
    if (findings.length > 0) return 'LOW';
    return 'SECURE';
  }

  generateOracleRecommendations(findings) {
    const recommendations = new Set();

    findings.forEach(finding => {
      switch (finding.type) {
        case 'single_source_oracle':
          recommendations.add('Implement Chainlink Price Feeds for decentralized price data');
          recommendations.add('Use Time-Weighted Average Price (TWAP) for manipulation resistance');
          recommendations.add('Add multiple oracle sources with price deviation checks');
          break;
        
        case 'missing_oracle_validation':
          recommendations.add('Add staleness checks for oracle data (heartbeat monitoring)');
          recommendations.add('Implement price bounds validation (min/max reasonable prices)');
          recommendations.add('Add circuit breakers for extreme price movements');
          break;
        
        case 'unsafe_price_calculation':
          recommendations.add('Replace spot price calculations with TWAP implementations');
          recommendations.add('Use external price oracles instead of on-chain reserve ratios');
          recommendations.add('Implement price impact limits for large transactions');
          break;
        
        case 'flash_loan_price_manipulation':
          recommendations.add('Add reentrancy protection for all price-sensitive functions');
          recommendations.add('Implement flash loan detection and blocking mechanisms');
          recommendations.add('Use commit-reveal schemes for sensitive operations');
          break;
        
        case 'mev_vulnerable_function':
          recommendations.add('Add slippage protection with user-defined minimums');
          recommendations.add('Implement transaction deadlines to prevent stale executions');
          recommendations.add('Consider using private mempools (Flashbots) for sensitive transactions');
          break;
      }
    });

    return Array.from(recommendations);
  }

  generateOracleSummary(findings) {
    const severityCounts = findings.reduce((acc, finding) => {
      acc[finding.severity] = (acc[finding.severity] || 0) + 1;
      return acc;
    }, {});

    const totalFindings = findings.length;
    const criticalFindings = severityCounts.CRITICAL || 0;
    const highFindings = severityCounts.HIGH || 0;

    return {
      totalFindings,
      severityBreakdown: severityCounts,
      riskAssessment: criticalFindings > 0 ? 'Immediate attention required' :
                     highFindings > 0 ? 'High priority fixes needed' :
                     totalFindings > 0 ? 'Medium priority improvements' :
                     'No oracle vulnerabilities detected',
      primaryConcerns: this.identifyPrimaryConcerns(findings)
    };
  }

  identifyPrimaryConcerns(findings) {
    const concerns = [];
    
    if (findings.some(f => f.type === 'single_source_oracle')) {
      concerns.push('Single point of failure in price data');
    }
    
    if (findings.some(f => f.type === 'flash_loan_price_manipulation')) {
      concerns.push('Critical flash loan attack vectors');
    }
    
    if (findings.some(f => f.type === 'unsafe_price_calculation')) {
      concerns.push('Manipulable price calculation methods');
    }
    
    if (findings.some(f => f.type === 'missing_oracle_validation')) {
      concerns.push('Insufficient oracle data validation');
    }

    return concerns;
  }

  // Utility method to get code location information
  getCodeLocation(code, index) {
    const lines = code.substring(0, index).split('\n');
    const lineNumber = lines.length;
    const columnNumber = lines[lines.length - 1].length;
    
    return {
      line: lineNumber,
      column: columnNumber,
      context: this.getCodeContext(code, index)
    };
  }

  getCodeContext(code, index, contextLines = 2) {
    const lines = code.split('\n');
    const lineNumber = this.getLineNumber(code, index) - 1;
    const start = Math.max(0, lineNumber - contextLines);
    const end = Math.min(lines.length, lineNumber + contextLines + 1);
    
    return {
      before: lines.slice(start, lineNumber),
      current: lines[lineNumber],
      after: lines.slice(lineNumber + 1, end)
    };
  }

  getLineNumber(code, index) {
    return code.substring(0, index).split('\n').length;
  }
}

module.exports = {
  OracleAnalyzer
};
