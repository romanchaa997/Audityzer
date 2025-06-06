/**
 * Test Outcome Aggregator
 *
 * Collects, processes, and aggregates test outcomes to identify security
 * vulnerabilities in Web3 applications and smart contracts.
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

// Default configuration
let config = {
  dataStoragePath: null,
  testDataPath: null,
  testResultMapping: {
    failure: {
      'test-connection': 'connection-issue',
      'test-transaction': 'transaction-issue',
      'test-approval': 'approval-issue',
      'test-transfer': 'transfer-issue',
      'test-security': 'security-issue',
    },
    error: {
      'RPC error': 'rpc-issue',
      Timeout: 'timeout-issue',
      Assertion: 'assertion-issue',
      Contract: 'contract-issue',
    },
  },
  vulnerabilityMapping: {
    'connection-issue': {
      category: 'wallet-connection',
      severity: 'medium',
      description: 'Issues with wallet connection that might indicate security problems',
    },
    'transaction-issue': {
      category: 'transaction-flow',
      severity: 'high',
      description: 'Issues with transaction flow that might indicate security vulnerabilities',
    },
    'approval-issue': {
      category: 'approval-flow',
      severity: 'high',
      description: 'Issues with token approval that might indicate security vulnerabilities',
    },
    'transfer-issue': {
      category: 'transfer-flow',
      severity: 'high',
      description: 'Issues with token transfer that might indicate security vulnerabilities',
    },
    'security-issue': {
      category: 'explicit-security',
      severity: 'critical',
      description: 'Explicitly identified security issues in tests',
    },
    'rpc-issue': {
      category: 'infrastructure',
      severity: 'low',
      description: 'RPC connection issues that might affect security testing',
    },
    'timeout-issue': {
      category: 'performance',
      severity: 'low',
      description: 'Timeout issues that might mask security problems',
    },
    'assertion-issue': {
      category: 'test-quality',
      severity: 'medium',
      description: 'Test assertion issues that might mask security problems',
    },
    'contract-issue': {
      category: 'contract-security',
      severity: 'high',
      description: 'Smart contract issues that indicate security vulnerabilities',
    },
  },
};

// Track initialization state
let initialized = false;

/**
 * Initialize the test outcome aggregator
 * @param {Object} userConfig - Configuration options
 * @returns {Promise<boolean>} Success status
 */
async function initialize(userConfig = {}) {
  try {
    // Update configuration with user settings
    config = {
      ...config,
      ...userConfig,
      testDataPath:
        userConfig.testDataPath || path.join(userConfig.dataStoragePath || '', 'test-outcomes'),
    };

    // Ensure required directories exist
    await fs.ensureDir(config.testDataPath);
    await fs.ensureDir(path.join(config.testDataPath, 'raw'));
    await fs.ensureDir(path.join(config.testDataPath, 'processed'));

    // Merge vulnerability mapping if provided
    if (userConfig.vulnerabilityMapping) {
      config.vulnerabilityMapping = {
        ...config.vulnerabilityMapping,
        ...userConfig.vulnerabilityMapping,
      };
    }

    initialized = true;
    return true;
  } catch (error) {
    console.error('Failed to initialize test outcome aggregator:', error);
    return false;
  }
}

/**
 * Collect test outcomes from test results
 * @param {string} testResultsPath - Path to test results directory or file
 * @returns {Promise<Object>} Collection results
 */
async function collectFromTests(testResultsPath) {
  if (!initialized) {
    throw new Error('Test outcome aggregator has not been initialized');
  }

  const collectionId = `test-outcomes-${crypto.randomBytes(4).toString('hex')}`;
  const timestamp = new Date().toISOString();

  const results = {
    collectionId,
    timestamp,
    sources: [],
    count: 0,
    items: [],
    vulnerabilitiesByCategory: {},
    vulnerabilitiesBySeverity: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      info: 0,
    },
  };

  try {
    // Check if path exists
    if (!testResultsPath || !(await fs.pathExists(testResultsPath))) {
      // Default to looking for test results in the test-results directory
      testResultsPath = path.join(process.cwd(), 'test-results');

      if (!(await fs.pathExists(testResultsPath))) {
        return {
          ...results,
          status: 'warning',
          warning: 'No test results found',
        };
      }
    }

    // Get test result files
    let testFiles = [];

    // Check if path is a directory or file
    const pathStats = await fs.stat(testResultsPath);

    if (pathStats.isDirectory()) {
      // Get all JSON files in directory and subdirectories
      testFiles = await getJsonFilesRecursive(testResultsPath);
    } else if (pathStats.isFile() && testResultsPath.endsWith('.json')) {
      // Single JSON file
      testFiles = [testResultsPath];
    } else {
      return {
        ...results,
        status: 'warning',
        warning: 'Invalid test results path',
      };
    }

    if (testFiles.length === 0) {
      return {
        ...results,
        status: 'warning',
        warning: 'No test result files found',
      };
    }

    // Process each test file
    for (const testFile of testFiles) {
      try {
        console.log(`Processing test file: ${testFile}`);

        // Read and parse test results
        const testResults = await fs.readJson(testFile);

        // Extract outcomes and identify vulnerabilities
        const outcomes = extractTestOutcomes(testResults, path.basename(testFile));

        if (outcomes.count > 0) {
          // Update results
          results.sources.push({
            name: path.basename(testFile),
            count: outcomes.count,
            status: 'success',
          });

          results.count += outcomes.count;
          results.items.push(...outcomes.items);

          // Update category and severity counts
          outcomes.items.forEach(item => {
            // Update by category
            if (!results.vulnerabilitiesByCategory[item.category]) {
              results.vulnerabilitiesByCategory[item.category] = 0;
            }
            results.vulnerabilitiesByCategory[item.category]++;

            // Update by severity
            if (item.severity) {
              results.vulnerabilitiesBySeverity[item.severity]++;
            }
          });
        }
      } catch (error) {
        console.error(`Error processing test file ${testFile}:`, error);
        results.sources.push({
          name: path.basename(testFile),
          count: 0,
          status: 'error',
          error: error.message,
        });
      }
    }

    // Save processed outcomes
    const outputPath = path.join(config.testDataPath, 'processed', `${collectionId}.json`);

    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeJson(outputPath, results, { spaces: 2 });

    return results;
  } catch (error) {
    console.error('Error collecting test outcomes:', error);
    return {
      ...results,
      status: 'error',
      error: error.message,
    };
  }
}

/**
 * Get all JSON files in a directory and its subdirectories
 * @param {string} dir - Directory to search
 * @returns {Promise<Array<string>>} Array of file paths
 */
async function getJsonFilesRecursive(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const subDirFiles = await getJsonFilesRecursive(fullPath);
      files.push(...subDirFiles);
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Extract test outcomes and identify vulnerabilities
 * @param {Object} testResults - Test results data
 * @param {string} sourceName - Source name for tracking
 * @returns {Object} Extracted outcomes
 */
function extractTestOutcomes(testResults, sourceName) {
  const outcomes = {
    count: 0,
    items: [],
  };

  // Different test report formats
  if (Array.isArray(testResults)) {
    // Array of test results
    processTestResultsArray(testResults, outcomes, sourceName);
  } else if (testResults.results) {
    // Results property containing tests
    processTestResultsArray(testResults.results, outcomes, sourceName);
  } else if (testResults.tests) {
    // Tests property containing tests
    processTestResultsArray(testResults.tests, outcomes, sourceName);
  } else if (testResults.suites) {
    // Suites property containing tests
    processSuites(testResults.suites, outcomes, sourceName);
  } else {
    // Try to extract from properties
    processGenericTestResults(testResults, outcomes, sourceName);
  }

  return outcomes;
}

/**
 * Process an array of test results
 * @param {Array} results - Test results array
 * @param {Object} outcomes - Outcomes object to update
 * @param {string} sourceName - Source name for tracking
 */
function processTestResultsArray(results, outcomes, sourceName) {
  if (!Array.isArray(results)) return;

  for (const result of results) {
    // Look for failed tests
    if (
      result.status === 'failed' ||
      result.state === 'failed' ||
      result.result === 'failed' ||
      result.passed === false
    ) {
      // Extract test information
      const testName = result.title || result.name || result.description || 'Unknown Test';
      const testFullName = result.fullTitle || result.fullName || testName;
      const errorMessage = extractErrorMessage(result);

      // Determine vulnerability type
      const vulnerabilityType = determineVulnerabilityType(testName, testFullName, errorMessage);

      if (vulnerabilityType) {
        const vulnerabilityInfo = config.vulnerabilityMapping[vulnerabilityType];

        if (vulnerabilityInfo) {
          outcomes.items.push({
            id: `${vulnerabilityType}-${outcomes.items.length + 1}`,
            source: sourceName,
            testName,
            testFullName,
            errorMessage,
            category: vulnerabilityInfo.category,
            severity: vulnerabilityInfo.severity,
            description: vulnerabilityInfo.description,
            details: {
              rawResult: result,
              identifiedVulnerabilityType: vulnerabilityType,
            },
            timestamp: new Date().toISOString(),
          });

          outcomes.count++;
        }
      }
    }
  }
}

/**
 * Process test suites
 * @param {Array} suites - Test suites
 * @param {Object} outcomes - Outcomes object to update
 * @param {string} sourceName - Source name for tracking
 */
function processSuites(suites, outcomes, sourceName) {
  if (!Array.isArray(suites)) return;

  for (const suite of suites) {
    if (suite.tests) {
      processTestResultsArray(suite.tests, outcomes, sourceName);
    }

    if (suite.suites) {
      processSuites(suite.suites, outcomes, sourceName);
    }
  }
}

/**
 * Process generic test results object
 * @param {Object} results - Test results object
 * @param {Object} outcomes - Outcomes object to update
 * @param {string} sourceName - Source name for tracking
 */
function processGenericTestResults(results, outcomes, sourceName) {
  // Look for patterns that might indicate test results
  for (const key in results) {
    if (Array.isArray(results[key])) {
      // Try array properties as potential test results
      processTestResultsArray(results[key], outcomes, sourceName);
    } else if (typeof results[key] === 'object' && results[key] !== null) {
      // Look for nested objects that might contain test results
      if (key === 'tests' || key === 'results' || key === 'specs') {
        processTestResultsArray(results[key], outcomes, sourceName);
      } else if (key === 'suites') {
        processSuites(results[key], outcomes, sourceName);
      } else {
        // Recursively check object properties
        processGenericTestResults(results[key], outcomes, sourceName);
      }
    }
  }
}

/**
 * Extract error message from test result
 * @param {Object} result - Test result
 * @returns {string} Error message
 */
function extractErrorMessage(result) {
  if (result.error) {
    if (typeof result.error === 'string') {
      return result.error;
    } else if (result.error.message) {
      return result.error.message;
    } else if (result.error.toString) {
      return result.error.toString();
    }
  }

  if (result.err) {
    if (typeof result.err === 'string') {
      return result.err;
    } else if (result.err.message) {
      return result.err.message;
    } else if (result.err.toString) {
      return result.err.toString();
    }
  }

  if (result.failureMessages && Array.isArray(result.failureMessages)) {
    return result.failureMessages.join('. ');
  }

  if (result.message) {
    return result.message;
  }

  return 'Unknown error';
}

/**
 * Determine vulnerability type based on test information
 * @param {string} testName - Test name
 * @param {string} testFullName - Full test name
 * @param {string} errorMessage - Error message
 * @returns {string|null} Vulnerability type or null
 */
function determineVulnerabilityType(testName, testFullName, errorMessage) {
  const testLower = (testName + ' ' + testFullName).toLowerCase();
  const errorLower = errorMessage.toLowerCase();

  // Check for test type specific failures
  for (const [testType, mappedType] of Object.entries(config.testResultMapping.failure)) {
    if (testLower.includes(testType)) {
      return mappedType;
    }
  }

  // Check for error message patterns
  for (const [errorPattern, mappedType] of Object.entries(config.testResultMapping.error)) {
    if (errorLower.includes(errorPattern.toLowerCase())) {
      return mappedType;
    }
  }

  // Security related keywords in test names
  const securityKeywords = [
    'security',
    'vulnerability',
    'attack',
    'exploit',
    'mitigation',
    'overflow',
    'underflow',
    'reentrancy',
    'front-running',
    'access control',
    'unauthorized',
    'bypass',
    'sensitive',
  ];

  for (const keyword of securityKeywords) {
    if (testLower.includes(keyword)) {
      return 'security-issue';
    }
  }

  // If no clear match, determine based on other patterns
  if (testLower.includes('transaction') || testLower.includes('tx')) {
    return 'transaction-issue';
  }

  if (testLower.includes('connect') || testLower.includes('wallet')) {
    return 'connection-issue';
  }

  if (testLower.includes('approve') || testLower.includes('allowance')) {
    return 'approval-issue';
  }

  if (testLower.includes('transfer') || testLower.includes('send')) {
    return 'transfer-issue';
  }

  if (errorLower.includes('contract') || errorLower.includes('solidity')) {
    return 'contract-issue';
  }

  // Default to generic contract issue if we've made it this far
  return 'contract-issue';
}

module.exports = {
  initialize,
  collectFromTests,
};
