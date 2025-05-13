#!/usr/bin/env node

/**
 * DeFi Trading Strategy Analyzer Example
 *
 * This script demonstrates how to use the trading strategy analyzer
 * to check DeFi trading strategies for security vulnerabilities.
 */

const chalk = require('chalk');
const path = require('path');
const { spawn } = require('child_process');

// Check for required dependencies before loading modules
function checkDependencies() {
  const missingDeps = [];

  try {
    require('ethers');
  } catch (error) {
    missingDeps.push('ethers');
  }

  return missingDeps;
}

// Run dependency installation script
async function installDependencies(packages) {
  return new Promise((resolve, reject) => {
    console.log(chalk.yellow(`Installing missing dependencies: ${packages.join(', ')}`));

    const args = ['run', `install:${packages[0]}`];
    const npmProcess = spawn('npm', args, { stdio: 'inherit' });

    npmProcess.on('close', code => {
      if (code === 0) {
        console.log(chalk.green('Successfully installed dependencies'));
        resolve(true);
      } else {
        console.error(chalk.red(`Failed to install dependencies (exit code: ${code})`));
        reject(new Error(`npm run install:${packages[0]} exited with code ${code}`));
      }
    });

    npmProcess.on('error', error => {
      console.error(chalk.red(`Error spawning npm process: ${error.message}`));
      reject(error);
    });
  });
}

// Main function with dependency check
async function runWithDependencyCheck() {
  // Check and install missing dependencies if needed
  const missingDependencies = checkDependencies();
  if (missingDependencies.length > 0) {
    console.error(chalk.red('Missing required dependencies: ' + missingDependencies.join(', ')));

    try {
      // Try to install dependencies automatically
      await installDependencies(missingDependencies);

      // Re-run this script after installing dependencies
      console.log(chalk.green('Dependencies installed. Restarting script...'));
      process.exit(0); // Exit with success code to indicate restart needed
    } catch (error) {
      console.error(chalk.red('Failed to install dependencies automatically.'));
      console.error(chalk.yellow('Please run manually:'));
      console.error(chalk.blue('npm run install:deps'));
      process.exit(1);
    }
    return;
  }

  // Now that we've checked dependencies, load the DeFi testing module
  let defiTesting;
  try {
    defiTesting = require('../src/core/defi-testing');
  } catch (error) {
    console.error(chalk.red('Error loading DeFi testing module:'));
    console.error(error);
    process.exit(1);
  }

  // Available strategy types from trading-strategies.js
  const STRATEGY_TYPES = defiTesting.tradingStrategies.STRATEGY_TYPES;

  // Configuration for the analyzer
  const analyzerConfig = {
    outputDir: path.join(process.cwd(), 'reports', 'defi-analyzer-example'),
    detectionThreshold: 0.7, // Default confidence threshold
  };

  // Create a trading strategy analyzer
  const analyzer = defiTesting.tradingStrategyAnalyzer.createAnalyzer(analyzerConfig);

  // Define strategies to analyze
  const strategies = [
    {
      name: 'High Risk Arbitrage',
      type: STRATEGY_TYPES.ARBITRAGE,
      params: {
        slippageTolerance: 5.0, // Very high slippage - clear vulnerability
        swapSize: 'large',
        priceFeeds: ['single-dex'], // Single price source - clear vulnerability
        useFlashbots: false, // Not using private tx - clear vulnerability
        approvalType: 'unlimited', // Unlimited approvals - clear vulnerability
      },
    },
    {
      name: 'Medium Risk Flash Loan',
      type: STRATEGY_TYPES.FLASH_LOAN,
      params: {
        slippageTolerance: 1.0, // Moderate slippage
        swapSize: 'medium',
        priceFeeds: ['chainlink', 'uniswap-twap'], // Multiple price sources
        useFlashbots: false, // Not using private tx
        approvalType: 'unlimited', // Unlimited approvals
      },
    },
    {
      name: 'Low Risk DCA',
      type: STRATEGY_TYPES.DOLLAR_COST_AVERAGING,
      params: {
        slippageTolerance: 0.1, // Low slippage
        swapSize: 'small',
        priceFeeds: ['chainlink', 'uniswap-twap', 'coinbase'], // Multiple price sources
        useFlashbots: true, // Using private transactions
        privateTransactions: true,
        approvalType: 'exact', // Exact approvals
        dynamicSlippage: true,
        priceAveraging: true,
        randomizedTiming: true,
      },
    },
  ];

  /**
   * Analyze a trading strategy and print results
   */
  async function analyzeStrategy(strategyConfig) {
    console.log(
      chalk.blue(`\nAnalyzing strategy: ${strategyConfig.name} (${strategyConfig.type})`)
    );
    console.log(chalk.blue('='.repeat(60)));

    try {
      // Create strategy
      const strategy = defiTesting.tradingStrategies.createStrategy(
        strategyConfig.type,
        strategyConfig.params
      );

      // Add simulated transaction history
      await strategy.simulate(5);

      // Prepare strategy data for analysis
      const strategyData = {
        id: strategy.id,
        name: strategyConfig.name,
        type: strategyConfig.type,
        description: `Example ${strategyConfig.type} strategy`,
        // Add strategy params
        usesOnChainPriceFeeds: strategyConfig.params.priceFeeds?.includes('single-dex'),
        priceFeeds: strategyConfig.params.priceFeeds || ['single-dex'],
        slippageTolerance: strategyConfig.params.slippageTolerance || 0.5,
        approvalType: strategyConfig.params.approvalType || 'unlimited',
        params: strategyConfig.params,
        // Add simulated strategy data
        transactions: strategy.getTransactions(),
        swaps: strategy.getSwaps(),
      };

      // Analyze strategy
      const results = await analyzer.analyzeStrategy(strategyData);

      // Print results
      console.log(chalk.yellow('Results Summary:'));
      console.log(chalk.cyan(`Risk Score: ${results.riskScore}/100`));

      // Print risk level
      if (results.riskScore >= 75) {
        console.log(chalk.red('Risk Level: HIGH'));
      } else if (results.riskScore >= 40) {
        console.log(chalk.yellow('Risk Level: MEDIUM'));
      } else {
        console.log(chalk.green('Risk Level: LOW'));
      }

      // Print vulnerabilities
      if (results.vulnerabilities.length === 0) {
        console.log(chalk.green('\nNo vulnerabilities detected!'));
      } else {
        console.log(chalk.red(`\nDetected ${results.vulnerabilities.length} vulnerabilities:`));

        results.vulnerabilities.forEach((vuln, index) => {
          console.log(chalk.red(`\n${index + 1}. ${vuln.name} (${vuln.severity})`));
          console.log(chalk.yellow(`   Description: ${vuln.description}`));
          console.log(chalk.green(`   Remediation: ${vuln.remediation}`));
          console.log(chalk.gray(`   Confidence: ${Math.round(vuln.confidence * 100)}%`));
        });
      }

      console.log(chalk.blue('\nRecommendations:'));
      if (results.recommendations.length === 0) {
        console.log(chalk.green('No recommendations needed.'));
      } else {
        results.recommendations.forEach((rec, index) => {
          const priorityColor =
            rec.priority === 'IMMEDIATE'
              ? chalk.red
              : rec.priority === 'HIGH'
                ? chalk.yellow
                : chalk.cyan;

          console.log(priorityColor(`${index + 1}. ${rec.title} (${rec.priority})`));
          console.log(chalk.gray(`   ${rec.description}`));
        });
      }

      return results;
    } catch (error) {
      console.error(chalk.red(`Error analyzing strategy: ${error.message}`));
      console.error(error.stack);
    }
  }

  /**
   * Main function
   */
  async function main() {
    console.log(chalk.green('DeFi Trading Strategy Analyzer Example'));
    console.log(chalk.green('======================================'));

    // Analyze all strategies and collect results
    const results = [];

    for (const strategy of strategies) {
      const result = await analyzeStrategy(strategy);
      if (result) {
        results.push({
          name: strategy.name,
          type: strategy.type,
          riskScore: result.riskScore,
          vulnerabilityCount: result.vulnerabilities.length,
        });
      }
    }

    // Print comparison table
    console.log(chalk.green('\nStrategy Comparison:'));
    console.log(chalk.green('==================='));

    console.log(
      '\n' +
        chalk.bold(
          'Name'.padEnd(25) + 'Type'.padEnd(20) + 'Risk Score'.padEnd(15) + 'Vulnerabilities'
        )
    );
    console.log('-'.repeat(75));

    results.forEach(result => {
      const scoreColor =
        result.riskScore >= 75 ? chalk.red : result.riskScore >= 40 ? chalk.yellow : chalk.green;

      console.log(
        chalk.white(result.name.padEnd(25)) +
          chalk.cyan(result.type.padEnd(20)) +
          scoreColor(result.riskScore.toString().padEnd(15)) +
          (result.vulnerabilityCount > 0
            ? chalk.red(result.vulnerabilityCount.toString())
            : chalk.green('0'))
      );
    });

    console.log('\n' + chalk.blue('Analysis completed!'));
  }

  // Run the example
  main().catch(error => {
    console.error(chalk.red('Error running example:'));
    console.error(error);
  });
}

// Start the script with dependency checking
runWithDependencyCheck().catch(error => {
  console.error(chalk.red('Fatal error:'));
  console.error(error);
  process.exit(1);
});
