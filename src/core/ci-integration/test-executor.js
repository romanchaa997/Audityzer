/**
 * @fileoverview CI/CD test executor for Audityzer
 *
 * This module provides cross-platform test execution capabilities for CI/CD environments.
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const CIIntegrationLayer = require('./integration-layer');
const SecurityRulesValidator = require('./security-rules-validator');
const { generateMarkdownReport, writeMarkdownReport } = require('./report-generators');

class TestExecutor {
  constructor(options = {}) {
    this.options = {
      testDir: options.testDir || './tests',
      outputDir: options.outputDir || './test-results',
      configPath: options.configPath || './security-rules.json',
      reporter: options.reporter || 'html,json',
      timeout: options.timeout || 300000, // 5 minutes default timeout
      headless: options.headless !== false, // Default to headless mode in CI
      retries: options.retries || 2,
      workers: options.workers || 1,
      reportMarkdown: options.reportMarkdown || false,
      ...options,
    };

    this.ciLayer = new CIIntegrationLayer(options);
    this.rulesValidator = new SecurityRulesValidator();
    this.testProcess = null;
    this.testResults = null;
    this.executionTimeout = null;
  }

  /**
   * Validates the test environment setup
   * @returns {boolean} Whether the environment is valid
   */
  validateEnvironment() {
    // Check if test directory exists
    if (!fs.existsSync(this.options.testDir)) {
      console.error(`Test directory not found: ${this.options.testDir}`);
      return false;
    }

    // Ensure output directory exists
    if (!fs.existsSync(this.options.outputDir)) {
      try {
        fs.mkdirSync(this.options.outputDir, { recursive: true });
      } catch (error) {
        console.error(`Failed to create output directory: ${error.message}`);
        return false;
      }
    }

    // Validate security rules if provided
    if (fs.existsSync(this.options.configPath)) {
      const validation = this.rulesValidator.validateFile(this.options.configPath);
      if (!validation.valid) {
        console.error('Security rules validation failed:');
        validation.errors.forEach(error => console.error(`- ${error}`));
        return false;
      }

      // Load validated rules
      this.ciLayer.loadSecurityRules(this.options.configPath);
    }

    return true;
  }

  /**
   * Builds the command arguments for test execution
   * @returns {Array} Command line arguments
   */
  buildCommandArgs() {
    const args = ['playwright', 'test', '--reporter=' + this.options.reporter];

    // Add test directory if provided
    if (this.options.testDir && this.options.testDir !== './tests') {
      args.push(this.options.testDir);
    }

    // Add output directory
    args.push('--output=' + this.options.outputDir);

    // Add headless flag if needed
    if (this.options.headless) {
      args.push('--headless');
    }

    // Add retries
    if (this.options.retries > 0) {
      args.push(`--retries=${this.options.retries}`);
    }

    // Add workers
    if (this.options.workers > 0) {
      args.push(`--workers=${this.options.workers}`);
    }

    // Add timeout
    if (this.options.timeout > 0) {
      args.push(`--timeout=${this.options.timeout}`);
    }

    // Add any custom args
    if (this.options.extraArgs && Array.isArray(this.options.extraArgs)) {
      args.push(...this.options.extraArgs);
    }

    return args;
  }

  /**
   * Generates a markdown report from test results
   * @param {Object} results - Test results to report on
   * @returns {Promise<Object>} Generated markdown report info
   */
  async generateMarkdownReport(results = this.testResults) {
    if (!results) {
      return {
        generated: false,
        error: 'No test results available',
      };
    }

    try {
      // Get test name from directory
      const testName = path.basename(this.options.testDir);

      // Generate markdown content
      const markdown = generateMarkdownReport(results, {
        testName,
        environment: process.env.NODE_ENV || 'development',
      });

      // Determine output path
      const outputPath = path.join(this.options.outputDir, 'test-report.md');

      // Write to file
      await writeMarkdownReport(markdown, outputPath);

      return {
        generated: true,
        path: outputPath,
        content: markdown,
      };
    } catch (error) {
      console.error('Failed to generate markdown report:', error);
      return {
        generated: false,
        error: error.message,
      };
    }
  }

  /**
   * Executes tests in the CI environment
   * @returns {Promise<Object>} Test execution results
   */
  async executeTests() {
    if (!this.validateEnvironment()) {
      return {
        success: false,
        error: 'Invalid test environment',
      };
    }

    return new Promise(resolve => {
      const args = this.buildCommandArgs();

      console.log(`Executing tests with command: npx ${args.join(' ')}`);

      // Start the test process
      this.testProcess = spawn('npx', args, {
        stdio: 'pipe',
        shell: true,
      });

      let stdout = '';
      let stderr = '';

      this.testProcess.stdout.on('data', data => {
        const output = data.toString();
        stdout += output;
        console.log(output);
      });

      this.testProcess.stderr.on('data', data => {
        const output = data.toString();
        stderr += output;
        console.error(output);
      });

      // Set execution timeout
      this.executionTimeout = setTimeout(() => {
        if (this.testProcess) {
          console.error(`Test execution timed out after ${this.options.timeout}ms`);
          this.testProcess.kill();
        }
      }, this.options.timeout);

      this.testProcess.on('close', async code => {
        clearTimeout(this.executionTimeout);

        console.log(`Test process exited with code ${code}`);

        // Parse test results
        try {
          const resultsPath = path.join(this.options.outputDir, 'results.json');
          if (fs.existsSync(resultsPath)) {
            this.testResults = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
          }
        } catch (error) {
          console.error('Failed to parse test results:', error);
        }

        // Format results for the current CI platform
        const formattedResults = this.ciLayer.formatResultsForPlatform(this.testResults);

        // Generate markdown report if requested
        let markdownReport = null;
        if (this.options.reportMarkdown && this.testResults) {
          markdownReport = await this.generateMarkdownReport(this.testResults);
        }

        // Determine if build should fail
        const shouldFail = this.ciLayer.shouldFailBuild(this.testResults);

        resolve({
          success: code === 0 && !shouldFail,
          exitCode: code,
          results: formattedResults,
          shouldFailBuild: shouldFail,
          stdout,
          stderr,
          markdownReport,
        });
      });
    });
  }

  /**
   * Generates a security report from test results
   * @param {Object} results - Test results to report on
   * @returns {Object} Generated security report
   */
  generateSecurityReport(results = this.testResults) {
    if (!results) {
      return {
        generated: false,
        error: 'No test results available',
      };
    }

    // Basic security report structure
    const report = {
      generated: true,
      timestamp: new Date().toISOString(),
      summary: {
        passed: results.passed || 0,
        failed: results.failed || 0,
        skipped: results.skipped || 0,
        total: (results.passed || 0) + (results.failed || 0) + (results.skipped || 0),
        duration: results.duration || 0,
      },
      securityIssues: [],
    };

    // Process test results for security issues
    if (results.tests && Array.isArray(results.tests)) {
      report.securityIssues = results.tests
        .filter(test => test.status === 'failed')
        .map(test => {
          // Try to match with security rules
          const matchedRule = this.ciLayer.securityRules.find(rule =>
            test.title.includes(rule.pattern)
          );

          return {
            title: test.title,
            location: test.location || 'Unknown',
            severity: matchedRule ? matchedRule.severity : 'unknown',
            category: matchedRule ? matchedRule.category : 'unknown',
            ruleId: matchedRule ? matchedRule.id : null,
            description: matchedRule ? matchedRule.description : 'Security test failure',
            remediation: matchedRule ? matchedRule.remediation : null,
            error: test.error || null,
          };
        });
    }

    // Write report to file
    try {
      const reportPath = path.join(this.options.outputDir, 'security-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`Security report generated at: ${reportPath}`);
    } catch (error) {
      console.error('Failed to write security report:', error);
    }

    return report;
  }
}

module.exports = TestExecutor;
