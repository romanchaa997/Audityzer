/**
 * Test Runner Module
 * 
 * Runs tests against a target dApp or smart contract.
 */

import chalk from 'chalk';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { generateReport } from '../reporting/report-generator.js';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Run tests against a target
 * 
 * @param {Object} options - Test options
 * @param {string} options.targetUrl - Target URL to test
 * @param {boolean} options.security - Run security tests
 * @param {string} options.wallet - Wallet provider
 * @param {string} options.chain - Blockchain network
 * @param {boolean} options.mockMode - Use mock environment
 * @param {boolean} options.report - Generate report after tests
 * @param {boolean} options.dashboard - Create visual dashboard
 * @param {boolean} options.aa - Test account abstraction
 * @param {boolean} options.pimlico - Use Pimlico-compatible mode
 * @param {string} options.test - Specific test to run
 */
export function runTests(options) {
  try {
    console.log(chalk.blue('Starting test run...'));
    
    // Set environment variables based on options
    const env = {
      ...process.env,
      TARGET_URL: options.targetUrl || 'http://localhost:5050',
      MOCK_MODE: options.mockMode ? 'true' : 'false',
      WALLET_PROVIDER: options.wallet || 'metamask',
      CHAIN_NETWORK: options.chain || 'ethereum',
      ENABLE_AA: options.aa ? 'true' : 'false',
      USE_PIMLICO: options.pimlico ? 'true' : 'false'
    };
    
    // Determine which tests to run
    let testPath;
    
    if (options.test) {
      // Run a specific test
      testPath = options.test;
    } else if (options.security) {
      // Run security tests
      testPath = 'examples/security-bug-tests/';
    } else if (options.aa) {
      // Run account abstraction tests
      testPath = 'examples/security-bug-tests/aa-*.test.js';
    } else {
      // Run all tests
      testPath = 'playwright-tests/';
    }
    
    // Build the playwright command
    const playwrightArgs = [
      'playwright',
      'test',
      testPath
    ];
    
    console.log(chalk.blue(`Running tests: ${testPath}`));
    console.log(chalk.blue(`Target URL: ${env.TARGET_URL}`));
    
    // Spawn the playwright process
    const testProcess = spawn('npx', playwrightArgs, {
      env,
      stdio: 'inherit',
      shell: true
    });
    
    // Handle process completion
    testProcess.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green('Tests completed successfully'));
        
        // Generate report if requested
        if (options.report) {
          const reportOptions = {
            format: 'html',
            output: './reports',
            upload: options.dashboard,
            notify: false
          };
          
          generateReport(reportOptions);
        }
      } else {
        console.error(chalk.red(`Tests failed with code ${code}`));
      }
    });
  } catch (error) {
    console.error(chalk.red(`Failed to run tests: ${error.message}`));
  }
}