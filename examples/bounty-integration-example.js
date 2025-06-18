/**
 * Example of using the Bug Bounty Integration features
 *
 * This example demonstrates how to generate submissions for different bug bounty platforms
 * and how to use the bridge bounty adapter specifically.
 */

// Import required modules
const {
  ImmunefiSubmissionGenerator,
  Code4renaIntegration,
  SherlockReportFormatter,
  BridgeBountyAdapter,
  createBountySubmissionGenerator,
} = require('../src/core/bounty-integration');

// Sample security test results for demonstration
const sampleTestResults = {
  securityIssues: [
    {
      id: 'VULN-001',
      title: 'Transaction signature replay vulnerability',
      description:
        'The dApp does not validate transaction signatures properly, allowing replay attacks.',
      severity: 'high',
      category: 'transaction-security',
      impact: 'Attackers can replay user transactions, potentially draining funds.',
      steps: [
        'Connect wallet to dApp',
        'Sign a transaction',
        'Capture the signature',
        'Replay the signature in a different context',
      ],
      code: 'function validateSignature(signature) {\n  // Missing proper validation\n  return true;\n}',
      affected_files: ['app/transactions.js'],
      recommendation: 'Implement proper signature validation with nonces and chainId',
    },
    {
      id: 'VULN-002',
      title: 'Improper access control in admin functions',
      description: 'Admin functions do not properly check caller permissions.',
      severity: 'critical',
      category: 'access-control',
      impact: 'Any user can call admin functions and potentially take control of the contract.',
      affected_files: ['contracts/Admin.sol'],
      recommendation: 'Add proper access control using modifiers and role-based permissions',
    },
  ],
  metadata: {
    protocol: 'ExampleDApp',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    tester: 'Audityzer',
  },
};

/**
 * Demonstrate using Immunefi Submission Generator
 */
async function demonstrateImmunefi() {

  // Create a new instance
  const immunefi = new ImmunefiSubmissionGenerator('./examples/output/immunefi');

  // Set test results
  immunefi.setTestResults(sampleTestResults);

  // Generate submissions
  const submissions = immunefi.generateSubmissions();

  // Save submissions
  const savedFiles = immunefi.saveSubmissions(submissions);

  // Create summary report
  const summaryPath = immunefi.createSummaryReport(submissions);

  return submissions;
}

/**
 * Demonstrate using Code4rena Integration
 */
async function demonstrateCode4rena() {

  // Create a new instance
  const code4rena = new Code4renaIntegration('example-contest', './examples/output/code4rena');

  // Set test results
  code4rena.setTestResults(sampleTestResults);

  // Generate submissions
  const submissions = code4rena.generateSubmissions();

  // Save submissions
  const savedFiles = code4rena.saveSubmissions(submissions);

  // Generate metrics
  const metricsPath = code4rena.generateMetricsReport();

  return submissions;
}

/**
 * Demonstrate using Sherlock Report Formatter
 */
async function demonstrateSherlock() {

  // Create a new instance
  const sherlock = new SherlockReportFormatter(
    'example-audit',
    './examples/output/sherlock',
    false // judging format
  );

  // Set test results
  sherlock.setTestResults(sampleTestResults);

  // Generate submissions
  const submissions = sherlock.generateSubmissions();

  // Save submissions
  const savedFiles = sherlock.saveSubmissions(submissions);

  return submissions;
}

/**
 * Demonstrate using Bridge Bounty Adapter
 */
async function demonstrateBridgeBounty() {

  // Create a new instance
  const bridgeAdapter = new BridgeBountyAdapter('./examples/output/bridge');

  // Fetch vulnerability reports
  const c4Reports = await bridgeAdapter.fetchCode4renaReports(5);

  const sherlockReports = await bridgeAdapter.fetchSherlockReports(5);

  // Generate test templates
  const templates = await bridgeAdapter.generateTestTemplates();

  // Save templates
  const savedFiles = await bridgeAdapter.saveTestTemplates();

  // Generate report
  const report = bridgeAdapter.generateReport();

  return templates;
}

/**
 * Demonstrate using factory function
 */
async function demonstrateFactory() {

  // Create generators for different platforms
  const immunefi = createBountySubmissionGenerator('immunefi', {
    outputDir: './examples/output/factory/immunefi',
  });

  const code4rena = createBountySubmissionGenerator('code4rena', {
    contestId: 'factory-example',
    outputDir: './examples/output/factory/c4',
  });

  const sherlock = createBountySubmissionGenerator('sherlock', {
    contestName: 'factory-example',
    outputDir: './examples/output/factory/sherlock',
    judging: true,
  });

  const bridge = createBountySubmissionGenerator('bridge', {
    outputDir: './examples/output/factory/bridge',
  });


  // Set test results
  immunefi.setTestResults(sampleTestResults);

  // Generate submissions
  const submissions = immunefi.generateSubmissions();

  return submissions;
}

/**
 * Run all examples
 */
async function runAllExamples() {
  try {
    // Create output directory
    const fs = require('fs');
    const path = require('path');
    const outputDir = path.join(__dirname, 'output');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Run all examples
    await demonstrateImmunefi();
    await demonstrateCode4rena();
    await demonstrateSherlock();
    await demonstrateBridgeBounty();
    await demonstrateFactory();

  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Run the examples if this file is executed directly
if (require.main === module) {
  runAllExamples();
}

// Export functions for use in tests
module.exports = {
  demonstrateImmunefi,
  demonstrateCode4rena,
  demonstrateSherlock,
  demonstrateBridgeBounty,
  demonstrateFactory,
  runAllExamples,
};
