/**
 * ERC-4337 CI Reporter
 * Outputs standardized JSON verdict reports for CI/CD pipelines
 */

const fs = require('fs').promises;
const path = require('path');

class AACIReporter {
  /**
   * Create a new CI reporter
   * @param {Object} options Configuration options
   * @param {string} options.outputDir Directory to output reports (default: "./reports")
   * @param {string} options.format Output format (json, sarif) (default: "json")
   * @param {boolean} options.includeDetails Whether to include test details in the report (default: true)
   * @param {string} options.projectName Name of the project (default: package.json name or "account-abstraction-tests")
   */
  constructor(options = {}) {
    this.outputDir = options.outputDir || './reports';
    this.format = options.format || 'json';
    this.includeDetails = options.includeDetails !== false;
    this.projectName = options.projectName;
    this.testResults = [];
    this.startTime = new Date();
    
    // Try to get project name from package.json if not provided
    if (!this.projectName) {
      try {
        const packageJson = require(path.join(process.cwd(), 'package.json'));
        this.projectName = packageJson.name || 'account-abstraction-tests';
      } catch (e) {
        this.projectName = 'account-abstraction-tests';
      }
    }
  }
  
  /**
   * Add a test result to the report
   * @param {Object} testResult Test result object
   * @param {string} testResult.name Test name
   * @param {string} testResult.category Test category (e.g., "UserOp", "Paymaster", "Bundler")
   * @param {boolean} testResult.passed Whether the test passed
   * @param {string} testResult.message Test message
   * @param {Object} testResult.details Additional test details
   */
  addTestResult(testResult) {
    if (!testResult.name) {
      throw new Error('Test result must have a name');
    }
    
    this.testResults.push({
      name: testResult.name,
      category: testResult.category || 'Uncategorized',
      passed: !!testResult.passed,
      message: testResult.message || '',
      details: testResult.details || null,
      timestamp: new Date().toISOString()
    });
  }
  
  /**
   * Add multiple test results
   * @param {Array<Object>} testResults Array of test results
   */
  addTestResults(testResults) {
    if (!Array.isArray(testResults)) {
      throw new Error('Test results must be an array');
    }
    
    testResults.forEach(result => this.addTestResult(result));
  }
  
  /**
   * Generate a summary of the test results
   * @returns {Object} Test summary
   */
  generateSummary() {
    const total = this.testResults.length;
    const passed = this.testResults.filter(r => r.passed).length;
    const failed = total - passed;
    const passRate = total > 0 ? (passed / total) * 100 : 0;
    
    // Group by category
    const categories = {};
    this.testResults.forEach(result => {
      const category = result.category;
      if (!categories[category]) {
        categories[category] = {
          total: 0,
          passed: 0,
          failed: 0
        };
      }
      
      categories[category].total++;
      if (result.passed) {
        categories[category].passed++;
      } else {
        categories[category].failed++;
      }
    });
    
    return {
      total,
      passed,
      failed,
      passRate: passRate.toFixed(2) + '%',
      startTime: this.startTime.toISOString(),
      endTime: new Date().toISOString(),
      categories
    };
  }
  
  /**
   * Generate a JSON report
   * @returns {Object} JSON report object
   */
  generateJsonReport() {
    const summary = this.generateSummary();
    
    const report = {
      projectName: this.projectName,
      summary,
      verdict: summary.failed === 0 ? 'PASS' : 'FAIL',
      timestamp: new Date().toISOString()
    };
    
    if (this.includeDetails) {
      report.tests = this.testResults;
    }
    
    return report;
  }
  
  /**
   * Generate a SARIF report for GitHub Code Scanning integration
   * @returns {Object} SARIF report object
   */
  generateSarifReport() {
    const failedTests = this.testResults.filter(r => !r.passed);
    
    // Map test failures to SARIF results
    const results = failedTests.map((test, index) => ({
      ruleId: `aa-test-failure-${index + 1}`,
      message: {
        text: `${test.name}: ${test.message}`
      },
      level: 'error',
      properties: {
        category: test.category,
        details: test.details
      }
    }));
    
    // Create SARIF report
    return {
      $schema: 'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json',
      version: '2.1.0',
      runs: [
        {
          tool: {
            driver: {
              name: 'Audityzer AA Testing',
              informationUri: 'https://github.com/Audityzer',
              version: '1.0.0',
              rules: failedTests.map((test, index) => ({
                id: `aa-test-failure-${index + 1}`,
                shortDescription: {
                  text: test.name
                },
                fullDescription: {
                  text: test.message
                },
                help: {
                  text: `Fix the failing Account Abstraction test: ${test.name}`
                },
                properties: {
                  category: test.category
                }
              }))
            }
          },
          results
        }
      ]
    };
  }
  
  /**
   * Write the report to a file
   * @returns {Promise<string>} Path to the report file
   */
  async writeReport() {
    try {
      // Ensure the output directory exists
      await fs.mkdir(this.outputDir, { recursive: true });
      
      // Generate the report based on the format
      let reportContent;
      let filename;
      
      if (this.format === 'sarif') {
        reportContent = this.generateSarifReport();
        filename = 'aa-test-results.sarif';
      } else {
        // Default to JSON
        reportContent = this.generateJsonReport();
        filename = 'aa-test-results.json';
      }
      
      const outputPath = path.join(this.outputDir, filename);
      
      // Write the report
      await fs.writeFile(
        outputPath,
        JSON.stringify(reportContent, null, 2)
      );
      
      return outputPath;
    } catch (error) {
      console.error('Failed to write report:', error);
      throw error;
    }
  }
  
  /**
   * Generate and write a report with test results from Mocha
   * @param {Object} mochaResults Mocha test results
   * @returns {Promise<string>} Path to the report file
   */
  async generateReportFromMocha(mochaResults) {
    if (!mochaResults || !mochaResults.tests) {
      throw new Error('Invalid Mocha results');
    }
    
    // Convert Mocha results to our format
    const testResults = mochaResults.tests.map(test => ({
      name: test.title,
      category: test.parent?.title || 'Uncategorized',
      passed: test.state === 'passed',
      message: test.err ? test.err.message : '',
      details: test.err ? { stack: test.err.stack } : null
    }));
    
    this.addTestResults(testResults);
    return this.writeReport();
  }
  
  /**
   * Generate and return the exit code based on test results
   * @param {boolean} failOnTestFailure Whether to return non-zero exit code on test failure (default: true)
   * @returns {number} Exit code (0 for success, 1 for failure)
   */
  getExitCode(failOnTestFailure = true) {
    const summary = this.generateSummary();
    
    if (failOnTestFailure && summary.failed > 0) {
      return 1;
    }
    
    return 0;
  }
  
  /**
   * Print a summary of the test results to the console
   */
  printSummary() {
    const summary = this.generateSummary();
    const verdict = summary.failed === 0 ? 'PASS' : 'FAIL';
    
    console.log('\n-----------------------------------------');
    console.log(`AA Test Results: ${verdict}`);
    console.log('-----------------------------------------');
    console.log(`Total Tests: ${summary.total}`);
    console.log(`Passed: ${summary.passed}`);
    console.log(`Failed: ${summary.failed}`);
    console.log(`Pass Rate: ${summary.passRate}`);
    console.log('-----------------------------------------');
    
    // Print category summaries
    console.log('Results by Category:');
    Object.entries(summary.categories).forEach(([category, results]) => {
      const categoryPassRate = results.total > 0 
        ? ((results.passed / results.total) * 100).toFixed(2) + '%' 
        : '0.00%';
      console.log(`  ${category}: ${results.passed}/${results.total} (${categoryPassRate})`);
    });
    
    if (summary.failed > 0) {
      console.log('\nFailing Tests:');
      this.testResults
        .filter(test => !test.passed)
        .forEach(test => {
          console.log(`  - ${test.category} > ${test.name}`);
          if (test.message) {
            console.log(`    Error: ${test.message}`);
          }
        });
    }
    
    console.log('-----------------------------------------\n');
  }
}

module.exports = AACIReporter; 