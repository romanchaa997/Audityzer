/**
 * @fileoverview Platform-agnostic CI/CD integration layer for Web3FuzzForge
 *
 * This module provides a standardized interface for integrating Web3FuzzForge
 * with various CI/CD platforms.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class CIIntegrationLayer {
  constructor(config = {}) {
    this.config = config;
    this.platform = this.detectCIPlatform();
    this.testResults = null;
    this.securityRules = [];
  }

  /**
   * Detects the current CI/CD platform environment
   * @returns {string} The detected CI platform name
   */
  detectCIPlatform() {
    if (process.env.GITHUB_ACTIONS) return 'github';
    if (process.env.GITLAB_CI) return 'gitlab';
    if (process.env.JENKINS_URL) return 'jenkins';
    if (process.env.TF_BUILD) return 'azure';
    if (process.env.CIRCLE_CI) return 'circleci';
    if (process.env.TRAVIS) return 'travis';
    return 'local';
  }

  /**
   * Loads security rules from config file
   * @param {string} configPath - Path to security rules config
   * @returns {Array} Loaded security rules
   */
  loadSecurityRules(configPath) {
    try {
      const rulesPath = configPath || path.join(process.cwd(), 'security-rules.json');
      if (fs.existsSync(rulesPath)) {
        this.securityRules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));
        return this.securityRules;
      }
      return [];
    } catch (error) {
      console.error('Error loading security rules:', error);
      return [];
    }
  }

  /**
   * Executes test suite with provided configuration
   * @param {Object} options - Test execution options
   * @returns {Promise<Object>} Test results
   */
  async executeTests(options = {}) {
    const testOptions = {
      testDir: options.testDir || './tests',
      reporter: options.reporter || 'html,json',
      outputDir: options.outputDir || './test-results',
      ...options,
    };

    try {
      // Form the command for executing tests
      const command = `npx playwright test --reporter=${testOptions.reporter} --output=${testOptions.outputDir}`;

      // Execute the test command
      const output = execSync(command, { stdio: 'pipe' }).toString();

      // Process test results
      this.testResults = this.parseTestResults(testOptions.outputDir);

      return {
        success: true,
        results: this.testResults,
        output,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        stderr: error.stderr?.toString() || '',
      };
    }
  }

  /**
   * Parses test results from output directory
   * @param {string} outputDir - Directory containing test results
   * @returns {Object} Parsed test results
   */
  parseTestResults(outputDir) {
    try {
      const resultsPath = path.join(outputDir, 'results.json');
      if (fs.existsSync(resultsPath)) {
        return JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
      }
      return null;
    } catch (error) {
      console.error('Error parsing test results:', error);
      return null;
    }
  }

  /**
   * Formats test results for CI/CD platform
   * @param {Object} results - Test results to format
   * @returns {Object} Formatted results for the specific CI platform
   */
  formatResultsForPlatform(results = this.testResults) {
    if (!results) return null;

    // Basic structure that works across platforms
    const formattedResults = {
      passed: results.passed || 0,
      failed: results.failed || 0,
      skipped: results.skipped || 0,
      timestamp: new Date().toISOString(),
      duration: results.duration || 0,
      tests: results.tests || [],
    };

    // Platform-specific formatting
    switch (this.platform) {
      case 'github':
        return this.formatForGitHub(formattedResults);
      case 'gitlab':
        return this.formatForGitLab(formattedResults);
      case 'jenkins':
        return this.formatForJenkins(formattedResults);
      case 'azure':
        return this.formatForAzureDevOps(formattedResults);
      default:
        return formattedResults;
    }
  }

  /**
   * Format results specifically for GitHub Actions
   */
  formatForGitHub(results) {
    // GitHub-specific formatting logic
    return {
      ...results,
      annotations: results.tests
        .filter(test => test.status === 'failed')
        .map(test => ({
          path: test.file,
          start_line: test.line || 1,
          end_line: test.line || 1,
          annotation_level: 'failure',
          message: test.error || 'Test failed',
          title: `Failed: ${test.title}`,
        })),
    };
  }

  /**
   * Format results specifically for GitLab CI
   */
  formatForGitLab(results) {
    // GitLab-specific formatting logic
    return results;
  }

  /**
   * Format results specifically for Jenkins
   */
  formatForJenkins(results) {
    // Jenkins-specific formatting logic
    return results;
  }

  /**
   * Format results specifically for Azure DevOps
   */
  formatForAzureDevOps(results) {
    // Azure DevOps-specific formatting logic
    return results;
  }

  /**
   * Returns whether the test run should fail the build based on security rules
   * @param {Object} results - Test results to evaluate
   * @returns {boolean} Whether the build should fail
   */
  shouldFailBuild(results = this.testResults) {
    if (!results) return false;

    // Check if there are any critical security issues
    const hasBlockingIssues = results.tests
      .filter(test => test.status === 'failed')
      .some(test => {
        // Check if test matches any critical security rule
        return this.securityRules.some(
          rule => rule.severity === 'critical' && test.title.includes(rule.pattern)
        );
      });

    return hasBlockingIssues;
  }
}

module.exports = CIIntegrationLayer;
