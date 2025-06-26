/**
 * Audityzer CLI
 * Cross-chain DeFi fuzzing toolkit for security researchers
 */

import { program } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import * as audityzer from '../core/index.js';
import { generateAATestTemplates, generateAAReport } from './generateAATestTemplates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json
const packageJsonPath = path.join(__dirname, '../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Check if AA mode is enabled via direct arguments
const args = process.argv.slice(2);
const aaMode = args.includes('--aa') || args.includes('--pimlico');

if (aaMode) {
  console.log(chalk.blue('[+] Account Abstraction Test Mode enabled.'));
  
  // Check for addon flag
  const addonIndex = args.indexOf('--addon');
  const addonOption = addonIndex !== -1 && addonIndex < args.length - 1 ? args[addonIndex + 1] : null;
  
  generateAATestTemplates({ addon: addonOption });
}

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
    .option('--aa', 'Enable Account Abstraction testing mode')
    .option('--pimlico', 'Use Pimlico service for AA testing')
    .option('--addon <addon>', 'AA addon to test (social-recovery, counterfactual, session-keys, token-gating)')
    .option('--mock', 'Run in mock mode for testing')
    .action(async (target, options) => {
      try {
        console.log(chalk.blue(`🔍 Running security tests on ${target}...`));
        
        const testOptions = {
          target,
          chain: options.chain,
          tests: options.tests || ['wallet', 'bridge', 'defi'],
          wallet: options.wallet,
          aa: options.aa,
          pimlico: options.pimlico,
          addon: options.addon,
          mock: options.mock
        };
        
        const results = await audityzer.run(testOptions);
        
        console.log(chalk.green('✅ Tests completed!'));
        console.log(`Total: ${results.summary.total}, Passed: ${results.summary.passed}, Failed: ${results.summary.failed}`);
        
        if (results.summary.vulnerabilities.length > 0) {
          console.log(chalk.red(`⚠️  Found ${results.summary.vulnerabilities.length} vulnerabilities`));
        }
        
        // Generate report
        const report = await audityzer.generateReport(results, { format: 'html' });
        console.log(chalk.blue(`📄 Report generated`));
        
      } catch (error) {
        console.error(chalk.red('❌ Error running tests:'), error.message);
        process.exit(1);
      }
    });

  // Start command (alias for run)
  program
    .command('start')
    .description('Start the Audityzer server')
    .option('-p, --port <port>', 'Port to run on', '5000')
    .option('--mock', 'Run in mock mode')
    .action(async (options) => {
      console.log(chalk.blue(`🚀 Starting Audityzer server on port ${options.port}...`));
      console.log(chalk.yellow('Server functionality not implemented yet. Use "run" command instead.'));
    });

  // Generate command
  program
    .command('generate')
    .description('Generate test templates')
    .option('--aa', 'Generate Account Abstraction templates')
    .option('--addon <addon>', 'AA addon type (social-recovery, counterfactual, session-keys, token-gating)')
    .action(async (options) => {
      if (options.aa) {
        console.log(chalk.blue('📝 Generating AA test templates...'));
        const result = generateAATestTemplates({ addon: options.addon });
        console.log(chalk.green('✅ AA templates generated successfully!'));
        if (result.addonInfo) {
          console.log(chalk.blue(`📋 Generated ${result.addonInfo.type} addon: ${result.addonInfo.filename}`));
        }
      } else {
        console.log(chalk.yellow('Please specify --aa to generate Account Abstraction templates'));
      }
    });

  // Report command
  program
    .command('report')
    .description('Generate security report')
    .option('--aa', 'Generate AA-specific report')
    .option('--pimlico', 'Include Pimlico compatibility data')
    .option('--addon <addon>', 'Include addon-specific data')
    .option('--ci', 'Generate CI-friendly JSON format')
    .action(async (options) => {
      if (options.aa) {
        console.log(chalk.blue('📊 Generating AA security report...'));
        
        // Mock results for demonstration
        const mockResults = {
          userop: { status: 'Tested' },
          paymaster: { status: 'Tested' },
          bundler: { status: 'Tested' },
          vulnerabilities: []
        };
        
        if (options.addon) {
          mockResults[options.addon] = { status: 'Tested' };
        }
        
        const reportOptions = {
          pimlico: options.pimlico,
          addon: options.addon,
          ci: options.ci
        };
        
        const report = await generateAAReport(mockResults, reportOptions);
        console.log(chalk.green(`✅ AA report generated: ${report.path}`));
      } else {
        console.log(chalk.yellow('Please specify --aa to generate Account Abstraction report'));
      }
    });

  // Audit command (alias for run with specific options)
  program
    .command('audit')
    .description('Run comprehensive security audit')
    .argument('<target>', 'Target to audit')
    .option('--mock', 'Run in mock mode')
    .action(async (target, options) => {
      console.log(chalk.blue(`🔒 Running comprehensive audit on ${target}...`));
      
      const testOptions = {
        target,
        tests: ['wallet', 'bridge', 'defi', 'vulnerability', 'ai'],
        mock: options.mock
      };
      
      try {
        const results = await audityzer.run(testOptions);
        console.log(chalk.green('✅ Audit completed!'));
        console.log(`Summary: ${results.summary.passed}/${results.summary.total} tests passed`);
        
        if (results.summary.vulnerabilities.length > 0) {
          console.log(chalk.red(`⚠️  Found ${results.summary.vulnerabilities.length} vulnerabilities`));
        }
      } catch (error) {
        console.error(chalk.red('❌ Audit failed:'), error.message);
        process.exit(1);
      }
    });
}

// Main CLI function
export function runCLI(argv) {
  setupProgram();
  
  // Parse arguments
  program.parse(argv);
  
  // Show help if no command provided
  if (!argv.slice(2).length) {
    program.outputHelp();
  }
}

// Export for testing
export { setupProgram };
