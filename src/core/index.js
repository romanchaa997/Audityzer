/**
 * Audityzer Core API
 * Cross-chain DeFi fuzzing toolkit for security researchers
 */

import * as defi from './defi-testing.js';
import * as bridge from './bridge-testing.js';
import * as wallet from './wallet-testing.js';
import * as vulnerability from './vulnerability-detection.js';
import * as ai from './ai-vulnerability-detection.js';
import * as ci from './ci-integration.js';
import * as visualization from './visualization.js';
import * as utils from './utils.js';

/**
 * Run security tests against a target
 * @param {Object} options Configuration options
 * @param {string} options.target Target protocol or dApp
 * @param {string} options.chain Chain to test on (e.g., 'ethereum', 'polygon')
 * @param {string[]} options.tests Array of test types to run
 * @param {Object} options.wallets Wallet configurations
 * @param {Object} options.rpcUrls RPC URL configurations
 * @returns {Promise<Object>} Test results
 */
async function run(options = {}) {
  console.log('Running Audityzer security tests...');
  
  // Validate options
  if (!options.target) {
    throw new Error('Target must be specified');
  }
  
  // Default test types if none specified
  if (!options.tests || !options.tests.length) {
    options.tests = ['wallet', 'bridge', 'transaction'];
  }

  // Handle Account Abstraction mode
  if (options.aa || options.pimlico) {
    console.log('Running in Account Abstraction mode...');
    // If AA mode is specified, include AA tests
    if (!options.tests.includes('aa')) {
      options.tests.push('aa');
    }
  }
  
  // Run tests in order
  const results = {
    timestamp: new Date(),
    target: options.target,
    chain: options.chain || 'ethereum',
    tests: {},
    summary: {
      total: 0,
      passed: 0,
      failed: 0,
      vulnerabilities: []
    }
  };
  
  // Execute specified tests
  for (const testType of options.tests) {
    let testResult;
    
    switch(testType) {
      case 'wallet':
        testResult = await wallet.runTests(options);
        break;
      case 'bridge':
        testResult = await bridge.runTests(options);
        break;
      case 'defi':
        testResult = await defi.runTests(options);
        break;
      case 'vulnerability':
        testResult = await vulnerability.runTests(options);
        break;
      case 'ai':
        testResult = await ai.runTests(options);
        break;
      case 'aa':
        // Load the AA testing module dynamically
        const aa = await import('./account-abstraction.js');
        testResult = await aa.runTests(options);
        break;
      default:
        console.warn(`Unknown test type: ${testType}`);
        continue;
    }
    
    results.tests[testType] = testResult;
    results.summary.total += testResult.total;
    results.summary.passed += testResult.passed;
    results.summary.failed += testResult.failed;
    
    if (testResult.vulnerabilities && testResult.vulnerabilities.length) {
      results.summary.vulnerabilities = [
        ...results.summary.vulnerabilities,
        ...testResult.vulnerabilities
      ];
    }
  }
  
  return results;
}

/**
 * Generate a security report from test results
 * @param {Object} results Test results from run()
 * @param {Object} options Report options
 * @param {string} options.format Report format ('html', 'md', 'json')
 * @param {boolean} options.includeRemediation Include remediation suggestions
 * @returns {Promise<string>} Generated report
 */
async function generateReport(results, options = {}) {
  return visualization.generateReport(results, options);
}

/**
 * Submit results to a bounty platform
 * @param {Object} results Test results from run()
 * @param {Object} options Submission options
 * @param {string} options.platform Platform to submit to ('immunefi', 'hackenproof', 'code4rena')
 * @param {Object} options.credentials API credentials for the platform
 * @returns {Promise<Object>} Submission result
 */
async function submitToBounty(results, options = {}) {
  // Implementation for bounty submission
  return { submitted: true, platform: options.platform };
}

export {
  run,
  generateReport,
  submitToBounty,
  // Export individual modules for direct access
  defi,
  bridge,
  wallet,
  vulnerability,
  ai,
  ci,
  visualization,
  utils
};
