#!/usr/bin/env node

/**
 * DeFi & NFT Testing CLI
 *
 * Command-line interface for running comprehensive tests on DeFi protocols
 * and NFT marketplaces.
 */

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const chalk = require('chalk');
const { ethers } = require('ethers');
const dotenv = require('dotenv');
const { TradingStrategyAnalyzer } = require('./trading-strategy-analyzer');
const tradingStrategies = require('./trading-strategies');

// Load environment variables
dotenv.config();

// Import testing modules
const defiTesting = require('./index');
const nftMarketplace = require('./nft-marketplace');
const crossChain = require('../cross-chain');

// Default configuration
const DEFAULT_OUTPUT_DIR = path.join(process.cwd(), 'test-results');
const DEFAULT_CONFIG_PATH = path.join(process.cwd(), '.defi-test-config.json');

// Default provider config - can be overridden via CLI args or config file
const providerConfig = {
  rpcUrl: process.env.RPC_URL || 'https://eth-mainnet.alchemyapi.io/v2/your-api-key',
  privateKey: process.env.PRIVATE_KEY,
  networkId: parseInt(process.env.NETWORK_ID || '1'),
};

// Load config file if it exists
function loadConfig(configPath = DEFAULT_CONFIG_PATH) {
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      console.log(chalk.blue(`Loaded config from ${configPath}`));
      return config;
    } catch (error) {
      console.error(chalk.red(`Error loading config: ${error.message}`));
      return {};
    }
  }
  return {};
}

// Save config to file
function saveConfig(config, configPath = DEFAULT_CONFIG_PATH) {
  // Don't save sensitive data
  const safeConfig = { ...config };
  delete safeConfig.privateKey;

  try {
    fs.writeFileSync(configPath, JSON.stringify(safeConfig, null, 2));
    console.log(chalk.green(`Config saved to ${configPath}`));
  } catch (error) {
    console.error(chalk.red(`Error saving config: ${error.message}`));
  }
}

// Initialize provider and signer
function initializeProvider(config) {
  let provider;

  if (config.rpcUrl) {
    provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  } else {
    throw new Error('RPC URL required');
  }

  let signer = null;
  if (config.privateKey) {
    signer = new ethers.Wallet(config.privateKey, provider);
  }

  return { provider, signer };
}

// Format test result for display
function formatTestResult(result) {
  const status = result.success ? chalk.green('✓ PASS') : chalk.red('✗ FAIL');

  const duration = chalk.gray(`(${result.duration}ms)`);

  const resultOutput = [`${status} ${result.testName} ${duration}`];

  if (!result.success && result.error) {
    resultOutput.push(chalk.red(`  Error: ${result.error.message}`));
  }

  if (result.result) {
    if (typeof result.result === 'object') {
      // Show only key info in summary
      const keyInfo = Object.entries(result.result)
        .filter(([key]) => ['success', 'status', 'message'].includes(key))
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');

      if (keyInfo) {
        resultOutput.push(chalk.cyan(`  ${keyInfo}`));
      }
    } else {
      resultOutput.push(chalk.cyan(`  ${result.result}`));
    }
  }

  return resultOutput.join('\n');
}

// Command handlers
async function handleLendingTest(protocol, test, options) {
  const config = {
    ...providerConfig,
    ...loadConfig(options.config),
    ...options,
  };

  const { provider, signer } = initializeProvider(config);

  console.log(chalk.blue(`Running lending protocol test: ${protocol} - ${test}`));

  try {
    const result = await defiTesting.testLendingProtocol(protocol, test, {
      provider,
      signer,
      outputDir: options.output || DEFAULT_OUTPUT_DIR,
      // Protocol-specific parameters
      token: options.token,
      amount: options.amount,
      targetHealthFactor: options.healthFactor,
    });

    console.log(formatTestResult(result));
    console.log(
      chalk.green(`Test result saved to ${result.outputFile || 'test results directory'}`)
    );

    return result;
  } catch (error) {
    console.error(chalk.red(`Test failed: ${error.message}`));
    return { success: false, error };
  }
}

async function handleAmmTest(protocol, test, options) {
  const config = {
    ...providerConfig,
    ...loadConfig(options.config),
    ...options,
  };

  const { provider, signer } = initializeProvider(config);

  console.log(chalk.blue(`Running AMM protocol test: ${protocol} - ${test}`));

  try {
    const result = await defiTesting.testAmmProtocol(protocol, test, {
      provider,
      signer,
      outputDir: options.output || DEFAULT_OUTPUT_DIR,
      // Protocol-specific parameters
      tokenA: options.tokenA,
      tokenB: options.tokenB,
      amount: options.amount,
      slippage: options.slippage,
    });

    console.log(formatTestResult(result));
    console.log(
      chalk.green(`Test result saved to ${result.outputFile || 'test results directory'}`)
    );

    return result;
  } catch (error) {
    console.error(chalk.red(`Test failed: ${error.message}`));
    return { success: false, error };
  }
}

async function handleStakingTest(protocol, test, options) {
  const config = {
    ...providerConfig,
    ...loadConfig(options.config),
    ...options,
  };

  const { provider, signer } = initializeProvider(config);

  console.log(chalk.blue(`Running staking protocol test: ${protocol} - ${test}`));

  try {
    const result = await defiTesting.testStakingProtocol(protocol, test, {
      provider,
      signer,
      outputDir: options.output || DEFAULT_OUTPUT_DIR,
      // Protocol-specific parameters
      token: options.token,
      amount: options.amount,
      duration: options.duration,
    });

    console.log(formatTestResult(result));
    console.log(
      chalk.green(`Test result saved to ${result.outputFile || 'test results directory'}`)
    );

    return result;
  } catch (error) {
    console.error(chalk.red(`Test failed: ${error.message}`));
    return { success: false, error };
  }
}

async function handleNftTest(marketplace, test, options) {
  const config = {
    ...providerConfig,
    ...loadConfig(options.config),
    ...options,
  };

  const { provider, signer } = initializeProvider(config);

  console.log(chalk.blue(`Running NFT marketplace test: ${marketplace} - ${test}`));

  try {
    // Determine which test function to call
    let testFunction;
    switch (test) {
      case 'royalty':
        testFunction = nftMarketplace.testRoyaltyEnforcement;
        break;
      case 'transfer':
        testFunction = nftMarketplace.testTransferRestrictions;
        break;
      case 'listing':
        testFunction = nftMarketplace.testNftListing;
        break;
      case 'purchase':
        testFunction = nftMarketplace.testNftPurchase;
        break;
      default:
        throw new Error(`Unknown NFT test: ${test}`);
    }

    const result = await testFunction(marketplace, {
      provider,
      signer,
      outputDir: options.output || path.join(DEFAULT_OUTPUT_DIR, 'nft'),
      // NFT-specific parameters
      collectionAddress: options.collection,
      tokenId: options.tokenId,
      expectedRoyaltyBps: options.royaltyBps,
    });

    console.log(formatTestResult(result));
    console.log(
      chalk.green(`Test result saved to ${result.outputFile || 'test results directory'}`)
    );

    return result;
  } catch (error) {
    console.error(chalk.red(`Test failed: ${error.message}`));
    return { success: false, error };
  }
}

async function handleL2Test(network, options) {
  const config = {
    ...providerConfig,
    ...loadConfig(options.config),
    ...options,
  };

  console.log(chalk.blue(`Running L2 network test: ${network}`));

  try {
    // Check if network is supported
    if (!crossChain.networks[network]) {
      throw new Error(`Unsupported L2 network: ${network}`);
    }

    // Run network health check
    const statusResult = await crossChain.checkNetworkStatus(network);

    console.log(chalk.blue(`Network status for ${network}:`));
    if (statusResult.success) {
      console.log(chalk.green(`✓ Connected to ${statusResult.name}`));
      console.log(chalk.cyan(`  Chain ID: ${statusResult.chainId}`));
      console.log(chalk.cyan(`  Current block: ${statusResult.currentBlock}`));
      console.log(chalk.cyan(`  Gas price: ${statusResult.gasPrice}`));
    } else {
      console.log(chalk.red(`✗ Connection failed to ${statusResult.name}`));
      console.log(chalk.red(`  Error: ${statusResult.error}`));
    }

    // If a transaction test was requested and we have a signer
    if (options.txTest && config.privateKey) {
      console.log(chalk.blue(`\nRunning test transaction on ${network}...`));

      const { provider, signer } = initializeProvider({
        ...config,
        rpcUrl: crossChain.networks[network].testnetRpcUrl,
      });

      const txResult = await crossChain.executeTestTransaction(network, {
        privateKey: config.privateKey,
        useTestnet: true, // Always use testnet for CLI tests
        amount: '0.0001', // Small test amount
      });

      if (txResult.success) {
        console.log(chalk.green('✓ Test transaction successful!'));
        console.log(chalk.cyan(`  Transaction hash: ${txResult.transactionHash}`));
        console.log(chalk.cyan(`  Block number: ${txResult.blockNumber}`));
        console.log(chalk.cyan(`  Gas used: ${txResult.gasUsed}`));
      } else {
        console.log(chalk.red('✗ Test transaction failed!'));
        console.log(chalk.red(`  Error: ${txResult.error}`));
      }
    }

    // Save results to file
    const resultFileName = `l2_test_${network}_${new Date().toISOString().replace(/:/g, '-')}.json`;
    const resultFilePath = path.join(
      options.output || path.join(DEFAULT_OUTPUT_DIR, 'l2'),
      resultFileName
    );

    // Ensure directory exists
    fs.mkdirSync(path.dirname(resultFilePath), { recursive: true });

    fs.writeFileSync(
      resultFilePath,
      JSON.stringify(
        {
          network,
          status: statusResult,
          timestamp: new Date().toISOString(),
        },
        null,
        2
      )
    );

    console.log(chalk.green(`\nTest result saved to ${resultFilePath}`));

    return { success: statusResult.success, network, statusResult };
  } catch (error) {
    console.error(chalk.red(`Test failed: ${error.message}`));
    return { success: false, error };
  }
}

async function handleTestSuite(suiteType, name, options) {
  const config = {
    ...providerConfig,
    ...loadConfig(options.config),
    ...options,
  };

  const { provider, signer } = initializeProvider(config);

  console.log(chalk.blue(`Running ${suiteType} test suite for: ${name}`));

  try {
    let result;

    switch (suiteType) {
      case 'lending':
        result = await defiTesting.runPredefinedTestSuite('lending', name, {
          provider,
          signer,
          outputDir: options.output || path.join(DEFAULT_OUTPUT_DIR, 'lending'),
          runAdvancedTests: options.advanced,
        });
        break;
      case 'amm':
        result = await defiTesting.runPredefinedTestSuite('amm', name, {
          provider,
          signer,
          outputDir: options.output || path.join(DEFAULT_OUTPUT_DIR, 'amm'),
          runAdvancedTests: options.advanced,
          isUniswapV3Compatible: options.v3,
        });
        break;
      case 'staking':
        result = await defiTesting.runPredefinedTestSuite('staking', name, {
          provider,
          signer,
          outputDir: options.output || path.join(DEFAULT_OUTPUT_DIR, 'staking'),
          runAdvancedTests: options.advanced,
        });
        break;
      case 'nft':
        result = await nftMarketplace.runPredefinedTestSuite(name, {
          provider,
          signer,
          outputDir: options.output || path.join(DEFAULT_OUTPUT_DIR, 'nft'),
          collectionAddress: options.collection,
          tokenId: options.tokenId,
          expectedRoyaltyBps: options.royaltyBps,
        });
        break;
      case 'l2':
        const networks = name === 'all' ? Object.keys(crossChain.networks) : [name];

        result = await crossChain.runNetworkHealthCheck(networks);

        // Generate a report
        const report = await crossChain.generateNetworkReport(networks);

        // Save report to file
        const reportFileName = `l2_report_${new Date().toISOString().replace(/:/g, '-')}.json`;
        const reportFilePath = path.join(
          options.output || path.join(DEFAULT_OUTPUT_DIR, 'l2'),
          reportFileName
        );

        // Ensure directory exists
        fs.mkdirSync(path.dirname(reportFilePath), { recursive: true });

        fs.writeFileSync(reportFilePath, JSON.stringify(report, null, 2));
        console.log(chalk.green(`L2 network report saved to ${reportFilePath}`));

        // Display summary
        console.log(chalk.blue('\nL2 Network Test Summary:'));
        console.log(chalk.cyan(`Total networks: ${report.summary.total}`));
        console.log(chalk.green(`Available: ${report.summary.available}`));
        console.log(chalk.red(`Unavailable: ${report.summary.unavailable}`));

        return { success: true, report };
      default:
        throw new Error(`Unknown suite type: ${suiteType}`);
    }

    // Print summary
    if (result && result.summary) {
      console.log(chalk.blue('\nTest Suite Summary:'));
      console.log(chalk.cyan(`Total tests: ${result.summary.total}`));
      console.log(chalk.green(`Passed: ${result.summary.passed}`));
      console.log(chalk.red(`Failed: ${result.summary.failed}`));
      console.log(chalk.cyan(`Success rate: ${result.summary.successRate}`));
      console.log(chalk.cyan(`Total duration: ${result.summary.totalDuration}ms`));
    }

    return result;
  } catch (error) {
    console.error(chalk.red(`Test suite failed: ${error.message}`));
    return { success: false, error };
  }
}

/**
 * Generate a comprehensive report
 */
async function generateReport(options) {
  const config = {
    ...loadConfig(options.config),
    ...options,
  };

  console.log(chalk.blue('Generating comprehensive test report...'));

  try {
    // Create tester instances
    const defiTester = defiTesting.createTester({
      outputDir: options.output || DEFAULT_OUTPUT_DIR,
    });

    const nftTester = nftMarketplace.createTester({
      outputDir: options.output || DEFAULT_OUTPUT_DIR,
    });

    // Generate reports
    const defiReport = defiTester.generateReport();
    const nftReport = nftTester.generateReport();

    // Generate L2 network report
    const l2Report = await crossChain.generateNetworkReport();

    // Combine all reports
    const combinedReport = {
      timestamp: new Date().toISOString(),
      defi: defiReport.report,
      nft: nftReport.report,
      l2: l2Report,
    };

    // Save combined report
    const reportFileName = `comprehensive_report_${new Date().toISOString().replace(/:/g, '-')}.json`;
    const reportFilePath = path.join(options.output || DEFAULT_OUTPUT_DIR, reportFileName);

    // Ensure directory exists
    fs.mkdirSync(path.dirname(reportFilePath), { recursive: true });

    fs.writeFileSync(reportFilePath, JSON.stringify(combinedReport, null, 2));
    console.log(chalk.green(`Comprehensive report saved to ${reportFilePath}`));

    return { success: true, reportFilePath, report: combinedReport };
  } catch (error) {
    console.error(chalk.red(`Report generation failed: ${error.message}`));
    return { success: false, error };
  }
}

/**
 * Run all tests
 */
async function runAll(options) {
  console.log(chalk.blue('Running all protocol tests...'));

  try {
    // Run AMM tests for Uniswap
    console.log(chalk.cyan('\n=== Running Uniswap tests ==='));
    await handleTestSuite('amm', 'Uniswap', options);

    // Run Lending tests for Aave
    console.log(chalk.cyan('\n=== Running Aave tests ==='));
    await handleTestSuite('lending', 'Aave', options);

    // Run Staking tests for Lido
    console.log(chalk.cyan('\n=== Running Lido tests ==='));
    await handleTestSuite('staking', 'Lido', options);

    // Run NFT tests for OpenSea
    console.log(chalk.cyan('\n=== Running OpenSea tests ==='));
    await handleTestSuite('nft', 'seaport', {
      ...options,
      collection: options.collection || '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', // BAYC
      tokenId: options.tokenId || '1',
    });

    // Run L2 tests
    console.log(chalk.cyan('\n=== Running L2 network tests ==='));
    await handleTestSuite('l2', 'all', options);

    // Generate comprehensive report
    console.log(chalk.cyan('\n=== Generating comprehensive report ==='));
    const reportResult = await generateReport(options);

    console.log(chalk.green('\nAll tests completed! Report generated at:'));
    console.log(chalk.cyan(reportResult.reportFilePath));

    return { success: true };
  } catch (error) {
    console.error(chalk.red(`Failed to run all tests: ${error.message}`));
    return { success: false, error };
  }
}

// Define the CLI commands
program.name('defi-test').description('DeFi & NFT Protocol Testing CLI').version('1.0.0');

// Global options
program
  .option('-c, --config <path>', 'Path to config file')
  .option('-o, --output <path>', 'Output directory for test results')
  .option('-r, --rpc <url>', 'RPC URL')
  .option('-k, --key <privateKey>', 'Private key (use with caution)')
  .option('-n, --network <id>', 'Network ID');

// Lending protocol testing
program
  .command('lending-protocol <protocol> <test>')
  .description('Test a lending protocol (e.g., Aave, Compound)')
  .option('-t, --token <address>', 'Token address')
  .option('-a, --amount <amount>', 'Token amount')
  .option('-h, --health-factor <factor>', 'Target health factor')
  .action(handleLendingTest);

// AMM protocol testing
program
  .command('amm-protocol <protocol> <test>')
  .description('Test an AMM protocol (e.g., Uniswap, SushiSwap)')
  .option('-a, --token-a <address>', 'Token A address')
  .option('-b, --token-b <address>', 'Token B address')
  .option('-a, --amount <amount>', 'Token amount')
  .option('-s, --slippage <percent>', 'Slippage tolerance percentage')
  .action(handleAmmTest);

// Staking protocol testing
program
  .command('staking-protocol <protocol> <test>')
  .description('Test a staking protocol (e.g., Lido, Rocket Pool)')
  .option('-t, --token <address>', 'Token address')
  .option('-a, --amount <amount>', 'Token amount')
  .option('-d, --duration <seconds>', 'Staking duration in seconds')
  .action(handleStakingTest);

// NFT marketplace testing
program
  .command('nft-marketplace <marketplace> <test>')
  .description('Test an NFT marketplace (e.g., seaport, looksrare, blur)')
  .option('-c, --collection <address>', 'NFT collection address')
  .option('-t, --token-id <id>', 'Token ID')
  .option('-r, --royalty-bps <bps>', 'Expected royalty in basis points (1% = 100)')
  .action(handleNftTest);

// L2 network testing
program
  .command('l2-network <network>')
  .description('Test an L2 network (e.g., zkSyncEra, linea, base, polygonZkEvm)')
  .option('-t, --tx-test', 'Run a test transaction (requires private key)')
  .action(handleL2Test);

// Test suites
program
  .command('lending-suite <protocol>')
  .description('Run comprehensive test suite for a lending protocol')
  .option('-a, --advanced', 'Run advanced tests')
  .action((protocol, options) => handleTestSuite('lending', protocol, options));

program
  .command('amm-suite <protocol>')
  .description('Run comprehensive test suite for an AMM protocol')
  .option('-a, --advanced', 'Run advanced tests')
  .option('-v, --v3', 'Protocol is Uniswap V3 compatible')
  .action((protocol, options) => handleTestSuite('amm', protocol, options));

program
  .command('staking-suite <protocol>')
  .description('Run comprehensive test suite for a staking protocol')
  .option('-a, --advanced', 'Run advanced tests')
  .action((protocol, options) => handleTestSuite('staking', protocol, options));

program
  .command('nft-suite <marketplace>')
  .description('Run comprehensive test suite for an NFT marketplace')
  .option('-c, --collection <address>', 'NFT collection address')
  .option('-t, --token-id <id>', 'Token ID')
  .option('-r, --royalty-bps <bps>', 'Expected royalty in basis points (1% = 100)')
  .action((marketplace, options) => handleTestSuite('nft', marketplace, options));

program
  .command('l2-suite <network>')
  .description('Run comprehensive test suite for an L2 network, use "all" for all networks')
  .option('-t, --tx-test', 'Run a test transaction (requires private key)')
  .action((network, options) => handleTestSuite('l2', network, options));

// Report generation
program
  .command('generate-report')
  .description('Generate a comprehensive report of all test results')
  .action(generateReport);

// Run all tests
program
  .command('run-all')
  .description('Run all protocol tests and generate a comprehensive report')
  .option('-c, --collection <address>', 'NFT collection address for NFT tests')
  .option('-t, --token-id <id>', 'Token ID for NFT tests')
  .action(runAll);

// Add trading strategy analyzer commands
program
  .command('analyze-strategy <strategyType>')
  .description('Analyze a trading strategy for security vulnerabilities')
  .option('-p, --params <params>', 'Strategy parameters (JSON string)')
  .option('-o, --output <directory>', 'Output directory for analysis results')
  .option('-r, --rpcUrl <url>', 'RPC URL for blockchain provider')
  .option('-n, --network <networkId>', 'Network ID')
  .option('-t, --threshold <value>', 'Detection threshold (0.0-1.0)')
  .action(async (strategyType, options) => {
    try {
      console.log(chalk.blue(`Analyzing ${strategyType} trading strategy`));

      // Parse strategy parameters
      let strategyParams = {};
      if (options.params) {
        try {
          strategyParams = JSON.parse(options.params);
        } catch (error) {
          console.error(chalk.red(`Error parsing strategy parameters: ${error.message}`));
          process.exit(1);
        }
      }

      // Set up analyzer config
      const analyzerConfig = {
        rpcUrl: options.rpcUrl || providerConfig.rpcUrl,
        networkId: options.network ? parseInt(options.network) : providerConfig.networkId,
        detectionThreshold: options.threshold ? parseFloat(options.threshold) : 0.7,
      };

      if (options.output) {
        analyzerConfig.outputDir = options.output;
      }

      // Create and initialize the analyzer
      const analyzer = new TradingStrategyAnalyzer(analyzerConfig);

      // Create a test strategy
      const strategy = tradingStrategies.createStrategy(strategyType, strategyParams);

      // Add some sample transaction history for analysis
      await strategy.simulate(5);

      // Run the analysis
      const results = await analyzer.analyzeStrategy({
        id: strategy.id,
        name: `${strategyType} Strategy`,
        type: strategyType,
        description: `A ${strategyType} trading strategy`,
        params: strategyParams,
        transactions: strategy.getTransactions(),
        swaps: strategy.getSwaps(),
        priceFeeds: strategyParams.priceFeeds || ['single-dex'],
        slippageTolerance: strategyParams.slippageTolerance || 0.5,
        approvalType: strategyParams.approvalType || 'unlimited',
      });

      // Display results summary
      console.log('\n' + chalk.yellow('Analysis Results:'));
      console.log(chalk.yellow('================='));
      console.log(chalk.cyan(`Risk Score: ${results.riskScore}/100`));

      if (results.vulnerabilities.length === 0) {
        console.log(chalk.green('No vulnerabilities detected'));
      } else {
        console.log(chalk.red(`Detected ${results.vulnerabilities.length} vulnerabilities:`));
        results.vulnerabilities.forEach(vuln => {
          console.log(chalk.red(`- ${vuln.name} (${vuln.severity}): ${vuln.description}`));
          console.log(chalk.cyan(`  Remediation: ${vuln.remediation}`));
        });
      }

      console.log(
        chalk.green(
          `\nFull analysis report saved to ${results.reportFile || analyzer.config.outputDir}`
        )
      );
    } catch (error) {
      console.error(chalk.red(`Error analyzing strategy: ${error.message}`));
      console.error(error.stack);
      process.exit(1);
    }
  });

// Add trading strategy execution command
program
  .command('execute-strategy <strategyType>')
  .description('Execute a trading strategy')
  .option('-p, --params <params>', 'Strategy parameters (JSON string)')
  .option('-o, --output <directory>', 'Output directory for execution results')
  .option('-r, --rpcUrl <url>', 'RPC URL for blockchain provider')
  .option('-k, --privateKey <key>', 'Private key for transactions')
  .option('-s, --simulate', 'Run in simulation mode without executing real transactions')
  .option('-a, --analyze', 'Analyze the strategy for vulnerabilities before execution')
  .action(async (strategyType, options) => {
    try {
      // Parse strategy parameters
      let strategyParams = {};
      if (options.params) {
        try {
          strategyParams = JSON.parse(options.params);
        } catch (error) {
          console.error(chalk.red(`Error parsing strategy parameters: ${error.message}`));
          process.exit(1);
        }
      }

      console.log(chalk.blue(`Executing ${strategyType} trading strategy`));

      // Create execution config
      const executionConfig = {
        rpcUrl: options.rpcUrl || providerConfig.rpcUrl,
        privateKey: options.privateKey || providerConfig.privateKey,
        outputDir: options.output || path.join(DEFAULT_OUTPUT_DIR, 'defi', 'trading'),
        simulate: options.simulate === true,
      };

      // If analysis requested, analyze first
      if (options.analyze) {
        const analyzer = new TradingStrategyAnalyzer({
          rpcUrl: executionConfig.rpcUrl,
        });

        // Create strategy for analysis
        const strategy = tradingStrategies.createStrategy(strategyType, strategyParams);
        await strategy.simulate(3);

        // Run analysis
        const results = await analyzer.analyzeStrategy({
          id: strategy.id,
          name: `${strategyType} Strategy`,
          type: strategyType,
          params: strategyParams,
          transactions: strategy.getTransactions(),
          swaps: strategy.getSwaps(),
        });

        // Check if strategy is too risky to execute
        if (results.riskScore > 75) {
          console.log(
            chalk.red(
              `Strategy risk score is ${results.riskScore}/100, which exceeds safe execution threshold.`
            )
          );
          console.log(
            chalk.red(
              'Execution aborted for safety. Review and address the following vulnerabilities:'
            )
          );

          results.vulnerabilities.forEach(vuln => {
            console.log(chalk.red(`- ${vuln.name} (${vuln.severity}): ${vuln.description}`));
            console.log(chalk.cyan(`  Remediation: ${vuln.remediation}`));
          });

          const force = await promptConfirmation(
            'Do you want to force execution despite high risk?'
          );
          if (!force) {
            console.log(chalk.yellow('Execution cancelled by user.'));
            return;
          }
          console.log(chalk.yellow('Proceeding with execution despite high risk...'));
        }
      }

      // Create and execute the strategy
      const strategy = tradingStrategies.createStrategy(strategyType, strategyParams, {
        config: executionConfig,
      });

      if (options.simulate) {
        console.log(chalk.yellow('Running in simulation mode...'));
        const results = await strategy.simulate(10, strategyParams);
        console.log(chalk.green('Simulation completed.'));

        // Display simulation results
        console.log(chalk.yellow('\nSimulation Results:'));
        console.log(chalk.yellow('==================='));
        console.log(
          chalk.cyan(
            `Profit/Loss: ${results.profits.net >= 0 ? '+' : ''}${results.profits.net.toFixed(6)} ETH`
          )
        );
        console.log(chalk.cyan(`Transactions: ${results.transactions.length}`));
        console.log(chalk.cyan(`Gas used: ${results.profits.gas.toFixed(6)} ETH`));

        console.log(chalk.green(`\nFull simulation report saved to ${executionConfig.outputDir}`));
      } else {
        console.log(chalk.yellow('Executing live strategy...'));

        if (!executionConfig.privateKey) {
          console.error(
            chalk.red(
              'Private key required for live execution. Use --privateKey option or set PRIVATE_KEY env var.'
            )
          );
          process.exit(1);
        }

        const results = await strategy.execute(strategyParams);
        console.log(chalk.green('Execution completed.'));

        // Display execution results
        console.log(chalk.yellow('\nExecution Results:'));
        console.log(chalk.yellow('=================='));
        console.log(chalk.cyan(`Status: ${results.status}`));
        console.log(
          chalk.cyan(
            `Profit/Loss: ${results.profits.net >= 0 ? '+' : ''}${results.profits.net.toFixed(6)} ETH`
          )
        );
        console.log(chalk.cyan(`Transactions: ${results.transactions.length}`));

        console.log(chalk.green(`\nFull execution report saved to ${executionConfig.outputDir}`));
      }
    } catch (error) {
      console.error(chalk.red(`Error executing strategy: ${error.message}`));
      console.error(error.stack);
      process.exit(1);
    }
  });

// Helper function for user confirmation
async function promptConfirmation(message) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(`${message} (y/N): `, answer => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Handle unknown commands
program.on('command:*', () => {
  console.error(chalk.red(`Invalid command: ${program.args.join(' ')}`));
  console.error('See --help for a list of available commands.');
  process.exit(1);
});

// Parse command line arguments
program.parse();

// If no arguments, show help
if (process.argv.length <= 2) {
  program.help();
}
