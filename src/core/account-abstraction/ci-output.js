/**
 * CI Output Module for Account Abstraction Testing
 *
 * Provides functionality to generate CI-friendly JSON output for test results
 * that can be consumed by CI/CD pipelines.
 */

const fs = require('fs-extra');
const path = require('path');

/**
 * Convert standard test results to CI-friendly format
 * @param {Object} results Standard test results
 * @param {Object} options Output options
 * @returns {Object} CI-formatted results
 */
function formatResultsForCI(results, options = {}) {
  const timestamp = new Date().toISOString();
  const target = options.target || 'unknown';
  const chain = options.chain || 'ethereum';
  const addon = options.addon || null;
  
  const formatted = {
    metadata: {
      timestamp,
      target,
      chain,
      addon,
      version: options.version || '1.0.0',
      runId: options.runId || generateRunId(),
    },
    summary: {
      success: results.success || false,
      passRate: calculatePassRate(results),
      testsPassed: countPassedTests(results),
      testsFailed: countFailedTests(results),
      testsTotal: countTotalTests(results),
      duration: results.duration || 0,
    },
    testSuites: [],
    vulnerabilities: [],
    recommendations: []
  };
  
  // Process test suites
  if (results.tests) {
    for (const [suiteName, suite] of Object.entries(results.tests)) {
      const suiteResult = {
        name: suiteName,
        status: suite.success ? 'passed' : 'failed',
        duration: suite.executionTime || 0,
        tests: []
      };
      
      if (suite.tests) {
        for (const [testName, test] of Object.entries(suite.tests)) {
          suiteResult.tests.push({
            name: testName,
            status: test.success ? 'passed' : 'failed',
            duration: test.executionTime || 0,
            message: test.notes || null,
            error: test.error || null
          });
        }
      }
      
      formatted.testSuites.push(suiteResult);
    }
  }
  
  // Process individual test results
  if (results.scenarios) {
    const scenarioSuite = {
      name: 'scenarios',
      status: 'unknown',
      tests: []
    };
    
    let scenarioPassed = 0;
    let scenarioTotal = 0;
    
    for (const [scenarioName, scenario] of Object.entries(results.scenarios)) {
      scenarioTotal++;
      
      if (scenario.success) {
        scenarioPassed++;
      }
      
      scenarioSuite.tests.push({
        name: scenarioName,
        status: scenario.success ? 'passed' : 'failed',
        duration: scenario.executionTime || 0,
        message: scenario.notes || null,
        error: scenario.error || null
      });
    }
    
    scenarioSuite.status = scenarioPassed === scenarioTotal ? 'passed' : 'failed';
    formatted.testSuites.push(scenarioSuite);
  }
  
  // Add vulnerabilities if present
  if (results.vulnerabilities) {
    formatted.vulnerabilities = results.vulnerabilities.map(vuln => ({
      id: vuln.id || generateVulnId(),
      name: vuln.name,
      severity: vuln.severity || 'medium',
      description: vuln.description,
      impact: vuln.impact || null,
      location: vuln.location || null,
      remediation: vuln.remediation || null
    }));
  }
  
  // Add recommendations if present
  if (results.recommendations) {
    formatted.recommendations = results.recommendations.map(rec => ({
      id: rec.id || generateRecommendationId(),
      type: rec.type || 'improvement',
      title: rec.title,
      description: rec.description || rec.title,
      priority: rec.priority || 'medium'
    }));
  }
  
  return formatted;
}

/**
 * Write CI-formatted results to a file
 * @param {Object} results Test results
 * @param {Object} options Output options
 * @returns {Promise<string>} Path to output file
 */
async function writeResultsToFile(results, options = {}) {
  const formatted = formatResultsForCI(results, options);
  
  const outputDir = options.outputDir || path.resolve(process.cwd(), 'reports');
  await fs.ensureDir(outputDir);
  
  const timestamp = formatted.metadata.timestamp.replace(/[:.]/g, '-');
  const fileName = options.fileName || `aa-test-${options.target || 'unknown'}-${timestamp}.json`;
  const outputPath = path.join(outputDir, fileName);
  
  await fs.writeJson(outputPath, formatted, { spaces: 2 });
  
  return outputPath;
}

/**
 * Generate a CI pipeline verdict from test results
 * @param {Object} results Test results
 * @param {Object} options Output options
 * @returns {Object} Verdict object
 */
function generateCIVerdict(results, options = {}) {
  const passRate = calculatePassRate(results);
  const threshold = options.passThreshold || 80; // Default threshold is 80%
  
  const verdict = {
    timestamp: new Date().toISOString(),
    target: options.target || 'unknown',
    passRate: passRate,
    threshold: threshold,
    passed: passRate >= threshold,
    statusCode: passRate >= threshold ? 0 : 1,
    summary: {
      total: countTotalTests(results),
      passed: countPassedTests(results),
      failed: countFailedTests(results)
    },
    vulnerabilities: {
      total: (results.vulnerabilities || []).length,
      critical: countVulnerabilitiesBySeverity(results, 'critical'),
      high: countVulnerabilitiesBySeverity(results, 'high'),
      medium: countVulnerabilitiesBySeverity(results, 'medium'),
      low: countVulnerabilitiesBySeverity(results, 'low')
    },
    message: passRate >= threshold 
      ? `Tests passed with ${passRate}% success rate`
      : `Tests failed with ${passRate}% success rate (threshold: ${threshold}%)`
  };
  
  return verdict;
}

// Utility functions

/**
 * Generate a unique run ID
 * @returns {string} Run ID
 */
function generateRunId() {
  return `run-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

/**
 * Generate a unique vulnerability ID
 * @returns {string} Vulnerability ID
 */
function generateVulnId() {
  return `vuln-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

/**
 * Generate a unique recommendation ID
 * @returns {string} Recommendation ID
 */
function generateRecommendationId() {
  return `rec-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

/**
 * Calculate the pass rate from test results
 * @param {Object} results Test results
 * @returns {number} Pass rate percentage
 */
function calculatePassRate(results) {
  const passed = countPassedTests(results);
  const total = countTotalTests(results);
  
  if (total === 0) return 0;
  return Math.round((passed / total) * 100);
}

/**
 * Count the number of passed tests
 * @param {Object} results Test results
 * @returns {number} Number of passed tests
 */
function countPassedTests(results) {
  let passed = 0;
  
  // Check individual tests
  if (results.tests) {
    for (const [suiteName, suite] of Object.entries(results.tests)) {
      if (suite.tests) {
        for (const [testName, test] of Object.entries(suite.tests)) {
          if (test.success) passed++;
        }
      } else if (suite.success) {
        passed++;
      }
    }
  }
  
  // Check scenarios
  if (results.scenarios) {
    for (const [scenarioName, scenario] of Object.entries(results.scenarios)) {
      if (scenario.success) passed++;
    }
  }
  
  return passed;
}

/**
 * Count the number of failed tests
 * @param {Object} results Test results
 * @returns {number} Number of failed tests
 */
function countFailedTests(results) {
  return countTotalTests(results) - countPassedTests(results);
}

/**
 * Count the total number of tests
 * @param {Object} results Test results
 * @returns {number} Total number of tests
 */
function countTotalTests(results) {
  let total = 0;
  
  // Count individual tests
  if (results.tests) {
    for (const [suiteName, suite] of Object.entries(results.tests)) {
      if (suite.tests) {
        for (const [testName, test] of Object.entries(suite.tests)) {
          total++;
        }
      } else {
        total++;
      }
    }
  }
  
  // Count scenarios
  if (results.scenarios) {
    total += Object.keys(results.scenarios).length;
  }
  
  return total;
}

/**
 * Count vulnerabilities by severity
 * @param {Object} results Test results
 * @param {string} severity Severity level
 * @returns {number} Number of vulnerabilities with the given severity
 */
function countVulnerabilitiesBySeverity(results, severity) {
  if (!results.vulnerabilities) return 0;
  
  return results.vulnerabilities.filter(vuln => 
    vuln.severity && vuln.severity.toLowerCase() === severity.toLowerCase()
  ).length;
}

module.exports = {
  formatResultsForCI,
  writeResultsToFile,
  generateCIVerdict
}; 