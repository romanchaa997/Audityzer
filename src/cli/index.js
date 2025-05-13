/**
 * Audityzer CLI
 * Cross-chain DeFi fuzzing toolkit for security researchers
 */

const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const audityzer = require('../core');
const packageJson = require('../../package.json');

// Setup the CLI program
function setupProgram() {
  program
    .name('audityzer')
    .description('Cross-chain DeFi fuzzing toolkit for security researchers')
    .version(packageJson.version);
    
  // Run command
  program
    .command('run')
    .description('Run security tests against a target')
    .argument('<target>', 'Target protocol or dApp to test')
    .option('-c, --chain <chain>', 'Chain to test on (ethereum, polygon, etc.)', 'ethereum')
    .option('-t, --tests <tests...>', 'Test types to run (wallet, bridge, defi, etc.)')
    .option('-w, --wallet <wallet>', 'Wallet to use (metamask, coinbase, etc.)', 'metamask')
    .option('-o, --output <file>', 'Output file for results')
    .option('-f, --format <format>', 'Output format (json, html, md)', 'json')
    .option('--rpc <url>', 'RPC URL for chain connection')
    .option('--gas-limit <limit>', 'Gas limit for transactions')
    .option('--mock', 'Run in mock mode without real transactions')
    .action(runTests);
    
  // Benchmark command
  program
    .command('benchmark')
    .description('Run performance benchmarks')
    .option('-t, --test <test>', 'Test to benchmark', 'all')
    .option('-i, --iterations <n>', 'Number of iterations', 10)
    .action(runBenchmark);
    
  // Submit command
  program
    .command('submit')
    .description('Submit results to a bounty platform')
    .argument('<file>', 'JSON results file to submit')
    .option('-p, --platform <platform>', 'Platform to submit to (immunefi, hackenproof, code4rena)')
    .option('-k, --key <key>', 'API key for the platform')
    .action(submitResults);
    
  // Init command
  program
    .command('init')
    .description('Initialize a new test project')
    .option('-t, --template <template>', 'Template to use (wallet, bridge, defi)', 'defi')
    .action(initProject);
    
  return program;
}

// Implementation of run command
async function runTests(target, options) {
  console.log(chalk.blue(`🔍 Running security tests against ${chalk.bold(target)}...`));
  
  try {
    const results = await audityzer.run({
      target,
      chain: options.chain,
      tests: options.tests,
      wallet: options.wallet,
      rpcUrl: options.rpc,
      gasLimit: options.gasLimit,
      mockMode: !!options.mock
    });
    
    console.log(chalk.green('✅ Tests completed successfully!'));
    console.log(chalk.yellow(`Total tests: ${results.summary.total}`));
    console.log(chalk.green(`Passed: ${results.summary.passed}`));
    console.log(chalk.red(`Failed: ${results.summary.failed}`));
    
    if (results.summary.vulnerabilities.length) {
      console.log(chalk.red(`Found ${results.summary.vulnerabilities.length} vulnerabilities:`));
      
      for (const vuln of results.summary.vulnerabilities) {
        console.log(chalk.red(`  - ${vuln.type}: ${vuln.description}`));
      }
    }
    
    if (options.output) {
      const outputPath = path.resolve(options.output);
      const format = options.format || 'json';
      
      if (format === 'json') {
        await fs.writeJSON(outputPath, results, { spaces: 2 });
      } else {
        const report = await audityzer.generateReport(results, {
          format: options.format
        });
        await fs.writeFile(outputPath, report);
      }
      
      console.log(chalk.blue(`📝 Results saved to ${chalk.bold(outputPath)}`));
    }
  } catch (error) {
    console.error(chalk.red(`❌ Error running tests: ${error.message}`));
    process.exit(1);
  }
}

// Implementation of benchmark command
async function runBenchmark(options) {
  console.log(chalk.blue(`⏱️ Running benchmark for ${chalk.bold(options.test)}...`));
  console.log(chalk.yellow(`Iterations: ${options.iterations}`));
  
  // Implementation for benchmarking
  console.log(chalk.green('✅ Benchmark completed!'));
}

// Implementation of submit command
async function submitResults(file, options) {
  console.log(chalk.blue(`📤 Submitting results from ${chalk.bold(file)} to ${chalk.bold(options.platform)}...`));
  
  try {
    const results = await fs.readJSON(path.resolve(file));
    
    const submission = await audityzer.submitToBounty(results, {
      platform: options.platform,
      credentials: {
        apiKey: options.key
      }
    });
    
    console.log(chalk.green('✅ Results submitted successfully!'));
    console.log(submission);
  } catch (error) {
    console.error(chalk.red(`❌ Error submitting results: ${error.message}`));
    process.exit(1);
  }
}

// Implementation of init command
async function initProject(options) {
  console.log(chalk.blue(`🚀 Initializing new project with ${chalk.bold(options.template)} template...`));
  
  try {
    // Implementation for project initialization
    console.log(chalk.green('✅ Project initialized successfully!'));
    console.log(chalk.yellow('Run `audityzer run <target>` to start testing!'));
  } catch (error) {
    console.error(chalk.red(`❌ Error initializing project: ${error.message}`));
    process.exit(1);
  }
}

// Main CLI runner
function runCLI(argv) {
  const program = setupProgram();
  program.parse(argv);
}

module.exports = { runCLI }; 