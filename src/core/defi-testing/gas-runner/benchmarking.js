/**
 * Gas Benchmarker
 *
 * Provides tools for benchmarking gas usage of contracts and transactions,
 * comparing against baselines, and tracking optimization improvements.
 */

const fs = require('fs-extra');
const path = require('path');
const { ethers } = require('ethers');

class GasBenchmarker {
  constructor(config = {}) {
    this.config = {
      baselinePath: config.baselinePath || './data/gas-baselines.json',
      networks: config.networks || ['mainnet', 'arbitrum', 'optimism', 'polygon', 'base'],
      providers: config.providers || {},
      defaultRpcUrls: {
        mainnet: 'https://eth-mainnet.alchemyapi.io/v2/demo',
        arbitrum: 'https://arb1.arbitrum.io/rpc',
        optimism: 'https://mainnet.optimism.io',
        polygon: 'https://polygon-rpc.com',
        base: 'https://mainnet.base.org',
      },
      percentileThresholds: {
        excellent: 20, // Better than 80% of similar contracts
        good: 40, // Better than 60% of similar contracts
        average: 60, // Better than 40% of similar contracts
        poor: 80, // Better than 20% of similar contracts
        terrible: 100, // Worse than 80% of similar contracts
      },
      ...config,
    };

    // Initialize providers
    this.providers = {};
    for (const network of this.config.networks) {
      const rpcUrl = this.config.providers[network] || this.config.defaultRpcUrls[network];
      if (rpcUrl) {
        this.providers[network] = new ethers.providers.JsonRpcProvider(rpcUrl);
      }
    }

    // Load or initialize baseline data
    this.loadBaselines();
  }

  /**
   * Load baseline data from file
   */
  loadBaselines() {
    try {
      // Ensure the directory exists
      const baselineDir = path.dirname(this.config.baselinePath);
      fs.ensureDirSync(baselineDir);

      if (fs.existsSync(this.config.baselinePath)) {
        const data = fs.readFileSync(this.config.baselinePath, 'utf8');
        this.baselines = JSON.parse(data);
      } else {
        this.baselines = this.initializeBaselines();
        this.saveBaselines();
      }
    } catch (error) {
      console.error('Error loading gas baselines:', error);
      this.baselines = this.initializeBaselines();
    }
  }

  /**
   * Initialize default baseline data
   * @returns {Object} Default baseline data
   */
  initializeBaselines() {
    return {
      version: 1,
      lastUpdated: new Date().toISOString(),
      networks: {},
      contractTypes: {
        erc20: {
          transfer: { p25: 45000, p50: 52000, p75: 58000 },
          approve: { p25: 42000, p50: 46000, p75: 52000 },
        },
        erc721: {
          transfer: { p25: 65000, p50: 75000, p75: 85000 },
          approve: { p25: 42000, p50: 48000, p75: 54000 },
          mint: { p25: 90000, p50: 120000, p75: 150000 },
        },
        swap: {
          simpleSwap: { p25: 120000, p50: 150000, p75: 180000 },
          complexSwap: { p25: 180000, p50: 240000, p75: 300000 },
        },
        bridge: {
          deposit: { p25: 150000, p50: 180000, p75: 210000 },
          withdraw: { p25: 170000, p50: 200000, p75: 230000 },
        },
      },
    };
  }

  /**
   * Save baseline data to file
   */
  saveBaselines() {
    try {
      this.baselines.lastUpdated = new Date().toISOString();
      fs.writeFileSync(this.config.baselinePath, JSON.stringify(this.baselines, null, 2));
    } catch (error) {
      console.error('Error saving gas baselines:', error);
    }
  }

  /**
   * Benchmark a contract against baseline values
   * @param {string} contractPath - Path to contract file
   * @param {Object} optimizationResults - Results from optimization strategies
   * @returns {Promise<Object>} Benchmark results
   */
  async benchmarkAgainstBaseline(contractPath, optimizationResults = {}) {
    // Extract contract type from file content or path
    const contractType = this.determineContractType(contractPath);

    // Analyze contract function gas usage
    const gasUsage = await this.analyzeContractGasUsage(contractPath);

    // Compare against baselines
    const comparisonResults = this.compareWithBaselines(contractType, gasUsage);

    // Calculate optimization improvements
    const improvements = this.calculateImprovements(gasUsage, optimizationResults);

    return {
      contractType,
      gasUsage,
      comparisonResults,
      improvements,
      summary: this.generateBenchmarkSummary(comparisonResults, improvements),
    };
  }

  /**
   * Determine contract type based on file content
   * @param {string} contractPath - Path to contract file
   * @returns {string} Contract type
   */
  determineContractType(contractPath) {
    try {
      const content = fs.readFileSync(contractPath, 'utf8');

      // Check for common interfaces
      if (content.includes('ERC20') || content.includes('IERC20')) {
        return 'erc20';
      } else if (content.includes('ERC721') || content.includes('IERC721')) {
        return 'erc721';
      } else if (content.includes('ERC1155') || content.includes('IERC1155')) {
        return 'erc1155';
      } else if (
        (content.includes('swap') || content.includes('Swap')) &&
        (content.includes('exchange') || content.includes('Exchange'))
      ) {
        return 'swap';
      } else if (
        content.includes('bridge') ||
        content.includes('Bridge') ||
        (content.includes('deposit') && content.includes('withdraw'))
      ) {
        return 'bridge';
      }

      // Fall back to generic type
      return 'generic';
    } catch (error) {
      console.error('Error determining contract type:', error);
      return 'generic';
    }
  }

  /**
   * Analyze gas usage of contract functions
   * @param {string} contractPath - Path to contract file
   * @returns {Promise<Object>} Gas usage analysis
   */
  async analyzeContractGasUsage(contractPath) {
    try {
      const content = fs.readFileSync(contractPath, 'utf8');

      // Extract function names
      const functionMatches = content.match(/function\s+(\w+)/g) || [];
      const functionNames = functionMatches
        .map(match => {
          const nameMatch = match.match(/function\s+(\w+)/);
          return nameMatch ? nameMatch[1] : null;
        })
        .filter(name => name !== null);

      // Estimate gas usage for each function (simplified)
      const gasUsage = {};

      for (const funcName of functionNames) {
        // Simplified static analysis of gas usage based on function content
        const funcRegex = new RegExp(`function\\s+${funcName}[^{]*{([^}]*)}`, 's');
        const funcMatch = content.match(funcRegex);

        if (funcMatch && funcMatch[1]) {
          const funcBody = funcMatch[1];

          // Count storage operations as a rough estimate of gas usage
          const storageWrites = (funcBody.match(/\w+\s*=\s*[^;]+;/g) || []).length;
          const storageReads = (funcBody.match(/\w+\.\w+/g) || []).length;
          const externalCalls = (funcBody.match(/\w+\([^)]*\)/g) || []).length;
          const loops = (funcBody.match(/for\s*\([^)]+\)/g) || []).length;

          // Rough gas estimate
          const baseGas = 21000; // Base transaction cost
          const writeGas = storageWrites * 20000; // ~20k gas per SSTORE
          const readGas = storageReads * 2100; // ~2.1k gas per SLOAD
          const callGas = externalCalls * 2500; // ~2.5k gas per external call
          const loopGas = loops * 5000; // Estimate for loop overhead

          const total = baseGas + writeGas + readGas + callGas + loopGas;

          gasUsage[funcName] = {
            estimated: total,
            breakdown: {
              base: baseGas,
              storageWrites: writeGas,
              storageReads: readGas,
              externalCalls: callGas,
              loops: loopGas,
            },
            complexity: this.assessFunctionComplexity(funcBody),
          };
        }
      }

      return gasUsage;
    } catch (error) {
      console.error('Error analyzing contract gas usage:', error);
      return {};
    }
  }

  /**
   * Assess function complexity
   * @param {string} funcBody - Function body text
   * @returns {string} Complexity assessment
   */
  assessFunctionComplexity(funcBody) {
    const lines = funcBody.split('\n').length;
    const conditionals = (funcBody.match(/if\s*\([^)]+\)/g) || []).length;
    const loops =
      (funcBody.match(/for\s*\([^)]+\)/g) || []).length +
      (funcBody.match(/while\s*\([^)]+\)/g) || []).length;

    const complexityScore = lines + conditionals * 3 + loops * 5;

    if (complexityScore < 15) return 'simple';
    if (complexityScore < 30) return 'moderate';
    if (complexityScore < 50) return 'complex';
    return 'very complex';
  }

  /**
   * Compare contract gas usage with baselines
   * @param {string} contractType - Contract type
   * @param {Object} gasUsage - Gas usage analysis
   * @returns {Object} Comparison results
   */
  compareWithBaselines(contractType, gasUsage) {
    const results = {
      overall: {
        rating: 'unknown',
        percentile: null,
        gasUsed: 0,
        baselineMedian: 0,
      },
      functions: {},
    };

    // Get baseline for this contract type
    const baseline = this.baselines.contractTypes[contractType];

    if (!baseline) {
      results.overall.rating = 'no baseline';
      return results;
    }

    let totalGasUsed = 0;
    let totalBaselineMedian = 0;
    let functionCount = 0;

    // Compare each function
    for (const [funcName, funcStats] of Object.entries(gasUsage)) {
      // Match function to baseline function type
      let baselineFunction = null;

      if (funcName.toLowerCase().includes('transfer')) {
        baselineFunction = baseline.transfer;
      } else if (funcName.toLowerCase().includes('approve')) {
        baselineFunction = baseline.approve;
      } else if (funcName.toLowerCase().includes('mint')) {
        baselineFunction = baseline.mint;
      } else if (
        funcName.toLowerCase().includes('swap') ||
        funcName.toLowerCase().includes('exchange')
      ) {
        baselineFunction = baseline.simpleSwap;
      } else if (
        funcName.toLowerCase().includes('deposit') ||
        funcName.toLowerCase().includes('withdraw')
      ) {
        baselineFunction =
          contractType === 'bridge'
            ? funcName.toLowerCase().includes('deposit')
              ? baseline.deposit
              : baseline.withdraw
            : null;
      }

      if (baselineFunction) {
        const gasUsed = funcStats.estimated;
        const p25 = baselineFunction.p25;
        const p50 = baselineFunction.p50;
        const p75 = baselineFunction.p75;

        // Determine percentile
        let percentile;
        let rating;

        if (gasUsed <= p25) {
          percentile = 25;
          rating = 'excellent';
        } else if (gasUsed <= p50) {
          percentile = 50;
          rating = 'good';
        } else if (gasUsed <= p75) {
          percentile = 75;
          rating = 'average';
        } else {
          percentile = 90;
          rating = 'poor';
        }

        results.functions[funcName] = {
          rating,
          percentile,
          gasUsed,
          baselineP50: p50,
          difference: p50 - gasUsed,
          percentDifference: (((p50 - gasUsed) / p50) * 100).toFixed(2),
        };

        totalGasUsed += gasUsed;
        totalBaselineMedian += p50;
        functionCount++;
      } else {
        results.functions[funcName] = {
          rating: 'no baseline',
          gasUsed: funcStats.estimated,
        };
      }
    }

    // Calculate overall rating
    if (functionCount > 0) {
      const avgGasUsed = totalGasUsed / functionCount;
      const avgBaselineMedian = totalBaselineMedian / functionCount;
      const percentDifference = ((avgBaselineMedian - avgGasUsed) / avgBaselineMedian) * 100;

      results.overall.gasUsed = avgGasUsed;
      results.overall.baselineMedian = avgBaselineMedian;
      results.overall.percentDifference = percentDifference.toFixed(2);

      // Determine overall rating
      if (percentDifference >= 20) {
        results.overall.rating = 'excellent';
        results.overall.percentile = 20;
      } else if (percentDifference >= 5) {
        results.overall.rating = 'good';
        results.overall.percentile = 40;
      } else if (percentDifference >= -5) {
        results.overall.rating = 'average';
        results.overall.percentile = 60;
      } else if (percentDifference >= -20) {
        results.overall.rating = 'poor';
        results.overall.percentile = 80;
      } else {
        results.overall.rating = 'terrible';
        results.overall.percentile = 100;
      }
    }

    return results;
  }

  /**
   * Calculate improvements from optimization results
   * @param {Object} gasUsage - Gas usage analysis
   * @param {Object} optimizationResults - Results from optimization strategies
   * @returns {Object} Improvement metrics
   */
  calculateImprovements(gasUsage, optimizationResults) {
    const improvements = {
      totalEstimatedSavings: 0,
      percentageImprovement: 0,
      functionsImproved: 0,
      optimizationsTried: 0,
      strategies: {},
    };

    // Calculate total current gas usage
    const totalGasUsage = Object.values(gasUsage).reduce((sum, func) => sum + func.estimated, 0);

    // Sum up all estimated savings from optimization strategies
    for (const [strategy, result] of Object.entries(optimizationResults)) {
      if (result && result.estimatedSavings) {
        improvements.totalEstimatedSavings += result.estimatedSavings;
        improvements.optimizationsTried++;

        improvements.strategies[strategy] = {
          estimatedSavings: result.estimatedSavings,
          findingsCount: result.findings ? result.findings.length : 0,
        };
      }
    }

    // Calculate percentage improvement
    if (totalGasUsage > 0) {
      improvements.percentageImprovement = (
        (improvements.totalEstimatedSavings / totalGasUsage) *
        100
      ).toFixed(2);
    }

    return improvements;
  }

  /**
   * Generate a summary of benchmark results
   * @param {Object} comparisonResults - Comparison with baselines
   * @param {Object} improvements - Improvement metrics
   * @returns {Object} Benchmark summary
   */
  generateBenchmarkSummary(comparisonResults, improvements) {
    const summary = {
      rating: comparisonResults.overall.rating,
      gasUsage: comparisonResults.overall.gasUsed,
      percentilePlacement: comparisonResults.overall.percentile,
      totalSavingsPotential: improvements.totalEstimatedSavings,
      improvementPercentage: improvements.percentageImprovement,
      recommendations: [],
    };

    // Generate recommendations based on ratings
    const poorFunctions = Object.entries(comparisonResults.functions)
      .filter(([_, stats]) => stats.rating === 'poor' || stats.rating === 'terrible')
      .map(([name, _]) => name);

    if (poorFunctions.length > 0) {
      summary.recommendations.push(
        `Focus optimization efforts on these functions: ${poorFunctions.join(', ')}`
      );
    }

    // Add recommendation based on overall rating
    if (summary.rating === 'poor' || summary.rating === 'terrible') {
      summary.recommendations.push('Contract needs significant gas optimization');
    } else if (summary.rating === 'average') {
      summary.recommendations.push(
        'Contract gas usage is average; moderate optimization recommended'
      );
    } else if (summary.rating === 'good' || summary.rating === 'excellent') {
      summary.recommendations.push(
        'Contract gas usage is already optimized; focus on other aspects'
      );
    }

    // Add recommendation based on improvement potential
    if (improvements.percentageImprovement > 20) {
      summary.recommendations.push(
        `High potential for gas savings: ~${improvements.percentageImprovement}% reduction possible`
      );
    }

    return summary;
  }

  /**
   * Record actual transaction gas usage for baseline improvement
   * @param {string} contractType - Contract type
   * @param {string} functionType - Function type
   * @param {number} gasUsed - Actual gas used
   */
  recordTransactionGasUsage(contractType, functionType, gasUsed) {
    // Initialize data structures if needed
    if (!this.baselines.contractTypes[contractType]) {
      this.baselines.contractTypes[contractType] = {};
    }

    if (!this.baselines.contractTypes[contractType][functionType]) {
      this.baselines.contractTypes[contractType][functionType] = {
        p25: 0,
        p50: 0,
        p75: 0,
        samples: [],
      };
    }

    // Add sample
    const functionData = this.baselines.contractTypes[contractType][functionType];
    if (!functionData.samples) {
      functionData.samples = [];
    }

    functionData.samples.push(gasUsed);

    // Recalculate percentiles if we have enough data
    if (functionData.samples.length >= 5) {
      const sortedSamples = [...functionData.samples].sort((a, b) => a - b);

      functionData.p25 = sortedSamples[Math.floor(sortedSamples.length * 0.25)];
      functionData.p50 = sortedSamples[Math.floor(sortedSamples.length * 0.5)];
      functionData.p75 = sortedSamples[Math.floor(sortedSamples.length * 0.75)];
    }

    // Save updated baselines
    this.saveBaselines();
  }
}

module.exports = GasBenchmarker;
