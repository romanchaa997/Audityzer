/**
 * Bounty Integration Modules
 *
 * This module exports all bounty platform integrations for the Web3FuzzForge toolkit.
 */

// Note: We're providing JavaScript wrappers for the TypeScript classes

// Import CLI but don't execute it automatically
const cli = require('./cli');

// Import all bounty integration classes
const { BridgeBountyAdapter } = require('./bridge-bounty-adapter');
const { ImmunefiSubmissionGenerator } = require('./immunefi-submission-generator');
const { Code4renaIntegration } = require('./code4rena-integration');
const { SherlockReportFormatter } = require('./sherlock-report-formatter');
const { HackenProofSubmission } = require('./hackenproof-submission');
const { UnifiedBountyDashboard } = require('./unified-dashboard');
const { AutoSubmissionService } = require('./auto-submission-service');
const { VulnerabilityTemplates } = require('./vulnerability-templates');
const ImmunefiConnector = require('./immunefi-connector');
const HackerOneConnector = require('./hackerone-connector');
const Code4renaConnector = require('./code4rena-integration');
const SherlockConnector = require('./sherlock-report-formatter');
const HackenproofConnector = require('./hackenproof-submission');
const BountyDashboard = require('./unified-dashboard');

// Custom error for TypeScript files that haven't been compiled
class NotCompiledError extends Error {
  constructor(className) {
    super(`${className} has not been compiled from TypeScript to JavaScript.`);
    this.name = 'NotCompiledError';
  }
}

// JavaScript implementation of the ImmunefiSubmissionGenerator class
class ImmunefiSubmissionGenerator {
  constructor(outputDir = './test-results/bounty-submissions/immunefi') {
    this.outputDir = outputDir;

    // Create output directory if it doesn't exist
    const fs = require('fs');
    const path = require('path');

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  loadTestResults(filePath) {
    try {
      const fs = require('fs');
      const data = fs.readFileSync(filePath, 'utf8');
      this.testResults = JSON.parse(data);
      return true;
    } catch (error) {
      console.error(`Error loading test results from ${filePath}:`, error);
      return false;
    }
  }

  setTestResults(results) {
    this.testResults = results;
  }

  generateSubmissions() {
    // Implementation not available without TypeScript compilation
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return [];
  }

  saveSubmissions(submissions) {
    // Implementation not available without TypeScript compilation
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return [];
  }

  createSummaryReport(submissions) {
    // Implementation not available without TypeScript compilation
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return '';
  }

  generateAndSave() {
    // Implementation not available without TypeScript compilation
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return [];
  }

  run(resultsFilePath) {
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );

    // Basic implementation to allow testing
    this.loadTestResults(resultsFilePath);
    return [];
  }
}

// JavaScript implementation of the Code4renaIntegration class
class Code4renaIntegration {
  constructor(contestId = 'code4rena', outputDir = './test-results/c4-submissions') {
    this.contestId = contestId;
    this.outputDir = outputDir;

    // Create output directory if it doesn't exist
    const fs = require('fs');
    const path = require('path');

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  loadTestResults(filePath) {
    try {
      const fs = require('fs');
      const data = fs.readFileSync(filePath, 'utf8');
      this.testResults = JSON.parse(data);
      return true;
    } catch (error) {
      console.error(`Error loading test results from ${filePath}:`, error);
      return false;
    }
  }

  setTestResults(results) {
    this.testResults = results;
  }

  generateSubmissions() {
    // Implementation not available without TypeScript compilation
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return [];
  }

  saveSubmissions(submissions) {
    // Implementation not available without TypeScript compilation
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return [];
  }

  generateMetricsReport() {
    // Implementation not available without TypeScript compilation
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return '';
  }

  run(resultsFilePath, contestId) {
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );

    // Basic implementation to allow testing
    this.loadTestResults(resultsFilePath);
    return [];
  }
}

// JavaScript implementation of the SherlockReportFormatter class
class SherlockReportFormatter {
  constructor(
    contestName = 'sherlock-contest',
    outputDir = './test-results/sherlock-submissions',
    judging = false
  ) {
    this.contestName = contestName;
    this.outputDir = outputDir;
    this.judging = judging;

    // Create output directory if it doesn't exist
    const fs = require('fs');
    const path = require('path');

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  loadTestResults(filePath) {
    try {
      const fs = require('fs');
      const data = fs.readFileSync(filePath, 'utf8');
      this.testResults = JSON.parse(data);
      return true;
    } catch (error) {
      console.error(`Error loading test results from ${filePath}:`, error);
      return false;
    }
  }

  setTestResults(results) {
    this.testResults = results;
  }

  generateSubmissions() {
    // Implementation not available without TypeScript compilation
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return [];
  }

  saveSubmissions(submissions) {
    // Implementation not available without TypeScript compilation
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return [];
  }

  run(resultsFilePath, contestName) {
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );

    // Basic implementation to allow testing
    this.loadTestResults(resultsFilePath);
    return [];
  }
}

// JavaScript implementation of the BridgeBountyAdapter class
class BridgeBountyAdapter {
  constructor(outputDir = './web3fuzzforge-community-tests/dapp-tests') {
    this.outputDir = outputDir;
    this.vulnerabilityReports = [];
    this.templates = [];

    // Create output directory if it doesn't exist
    const fs = require('fs');
    const path = require('path');

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async loadReportsFromFile(filePath) {
    try {
      const fs = require('fs');
      const data = fs.readFileSync(filePath, 'utf8');
      this.vulnerabilityReports = JSON.parse(data);
      return this.vulnerabilityReports;
    } catch (error) {
      console.error(`Error loading reports from ${filePath}:`, error);
      return [];
    }
  }

  async fetchCode4renaReports(limit = 10) {
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return [];
  }

  async fetchSherlockReports(limit = 10) {
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return [];
  }

  async generateTestTemplates() {
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return [];
  }

  async saveTestTemplates() {
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return [];
  }

  generateReport() {
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return {};
  }

  async run() {
    console.warn(
      'This is a JavaScript wrapper. Full functionality requires TypeScript compilation.'
    );
    return {
      success: true,
      report: this.generateReport(),
      savedFiles: [],
    };
  }
}

// JavaScript implementation of the factory function
function createBountySubmissionGenerator(platform, options = {}) {
  switch (platform) {
    case 'immunefi':
      return new ImmunefiSubmissionGenerator(options.outputDir);

    case 'code4rena':
      return new Code4renaIntegration(options.contestId, options.outputDir);

    case 'sherlock':
      return new SherlockReportFormatter(
        options.contestName,
        options.outputDir,
        options.judging || false
      );

    case 'bridge':
      return new BridgeBountyAdapter(options.outputDir);

    case 'hackenproof':
      return new HackenProofSubmission(options.outputDir);

    default:
      throw new Error(`Unsupported bounty platform: ${platform}`);
  }
}

/**
 * Get the unified bounty dashboard instance
 * @param {Object} options - Dashboard options
 * @returns {UnifiedBountyDashboard} Dashboard instance
 */
function getUnifiedDashboard(options = {}) {
  return new UnifiedBountyDashboard(options);
}

/**
 * Create an auto-submission service for the specified platforms
 * @param {Array<string>} platforms - Platforms to enable auto-submission for
 * @param {Object} options - Submission options
 * @returns {AutoSubmissionService} Auto-submission service instance
 */
function createAutoSubmissionService(platforms = [], options = {}) {
  return new AutoSubmissionService(platforms, options);
}

/**
 * Get vulnerability templates for common vulnerability patterns
 * @param {string} category - Vulnerability category
 * @returns {Object} Templates for the specified category
 */
function getVulnerabilityTemplates(category = 'all') {
  return VulnerabilityTemplates.getTemplates(category);
}

// Export classes and functions
module.exports = {
  ImmunefiSubmissionGenerator,
  Code4renaIntegration,
  SherlockReportFormatter,
  BridgeBountyAdapter,
  createBountySubmissionGenerator,
  getUnifiedDashboard,
  createAutoSubmissionService,
  getVulnerabilityTemplates,
  // Include CLI but don't execute it
  cli,
  ImmunefiConnector,
  HackerOneConnector,
  Code4renaConnector,
  SherlockConnector,
  HackenproofConnector,
  AutoSubmissionService,
  BountyDashboard,
};
