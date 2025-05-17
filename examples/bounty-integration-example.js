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
  console.log('\n--- Immunefi Submission Generator Example ---');

  // Create a new instance
  const immunefi = new ImmunefiSubmissionGenerator('./examples/output/immunefi');

  // Set test results
  immunefi.setTestResults(sampleTestResults);

  // Generate submissions
  const submissions = immunefi.generateSubmissions();
  console.log(`Generated ${submissions.length} Immunefi submissions`);

  // Save submissions
  const savedFiles = immunefi.saveSubmissions(submissions);
  console.log(`Saved submissions to: ${savedFiles.join(', ')}`);

  // Create summary report
  const summaryPath = immunefi.createSummaryReport(submissions);
  console.log(`Summary report saved to: ${summaryPath}`);

  return submissions;
}

/**
 * Demonstrate using Code4rena Integration
 */
async function demonstrateCode4rena() {
  console.log('\n--- Code4rena Integration Example ---');

  // Create a new instance
  const code4rena = new Code4renaIntegration('example-contest', './examples/output/code4rena');

  // Set test results
  code4rena.setTestResults(sampleTestResults);

  // Generate submissions
  const submissions = code4rena.generateSubmissions();
  console.log(`Generated ${submissions.length} Code4rena submissions`);

  // Save submissions
  const savedFiles = code4rena.saveSubmissions(submissions);
  console.log(`Saved submissions to: ${savedFiles.join(', ')}`);

  // Generate metrics
  const metricsPath = code4rena.generateMetricsReport();
  console.log(`Metrics report saved to: ${metricsPath}`);

  return submissions;
}

/**
 * Demonstrate using Sherlock Report Formatter
 */
async function demonstrateSherlock() {
  console.log('\n--- Sherlock Report Formatter Example ---');

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
  console.log(`Generated ${submissions.length} Sherlock submissions`);

  // Save submissions
  const savedFiles = sherlock.saveSubmissions(submissions);
  console.log(`Saved submissions to: ${savedFiles.join(', ')}`);

  return submissions;
}

/**
 * Demonstrate using Bridge Bounty Adapter
 */
async function demonstrateBridgeBounty() {
  console.log('\n--- Bridge Bounty Adapter Example ---');

  // Create a new instance
  const bridgeAdapter = new BridgeBountyAdapter('./examples/output/bridge');

  // Fetch vulnerability reports
  const c4Reports = await bridgeAdapter.fetchCode4renaReports(5);
  console.log(`Fetched ${c4Reports.length} reports from Code4rena`);

  const sherlockReports = await bridgeAdapter.fetchSherlockReports(5);
  console.log(`Fetched ${sherlockReports.length} reports from Sherlock`);

  // Generate test templates
  const templates = await bridgeAdapter.generateTestTemplates();
  console.log(`Generated ${templates.length} test templates`);

  // Save templates
  const savedFiles = await bridgeAdapter.saveTestTemplates();
  console.log(`Saved templates to: ${savedFiles.join(', ')}`);

  // Generate report
  const report = bridgeAdapter.generateReport();
  console.log('Generated bridge vulnerability report');

  return templates;
}

/**
 * Demonstrate using factory function
 */
async function demonstrateFactory() {
  console.log('\n--- Bounty Submission Generator Factory Example ---');

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

  console.log('Successfully created bounty submission generators using factory function');

  // Set test results
  immunefi.setTestResults(sampleTestResults);

  // Generate submissions
  const submissions = immunefi.generateSubmissions();
  console.log(`Generated ${submissions.length} submissions using factory-created generator`);

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

    console.log('\nAll examples completed successfully!');
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
