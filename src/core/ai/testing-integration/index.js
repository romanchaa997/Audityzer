/**
 * Phase 3: Testing Integration
 *
 * This module integrates AI vulnerability detection into the testing
 * pipeline, enhancing security testing with ML-powered analysis.
 */

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

// Default configuration
let config = {
  dataStoragePath: null,
  testingStoragePath: null,
  reportOutputPath: null,
  activeModels: {},
  testHooks: {
    beforeTest: true,
    afterTest: true,
    beforeTransaction: true,
    afterTransaction: false,
  },
  thresholds: {
    criticalVulnerability: 0.8,
    highVulnerability: 0.6,
    mediumVulnerability: 0.4,
    lowVulnerability: 0.2,
  },
  alertingConfig: {
    enabled: true,
    criticalOnly: false,
    failOnCritical: true,
    dryRun: false,
  },
};

// Track initialization state
let initialized = false;

// Reference to model development module
// (will be injected during initialization)
let modelDevelopment = null;

/**
 * Initialize the testing integration module
 * @param {Object} userConfig - Configuration options
 * @returns {Promise<boolean>} Success status
 */
async function initialize(userConfig = {}) {
  try {
    // Update configuration with user settings
    config = {
      ...config,
      ...userConfig,
      testingStoragePath:
        userConfig.testingStoragePath ||
        path.join(userConfig.dataStoragePath || '', 'testing-integration'),
      reportOutputPath:
        userConfig.reportOutputPath || path.join(userConfig.dataStoragePath || '', 'reports'),
    };

    // Merge nested configs
    if (userConfig.testHooks) {
      config.testHooks = { ...config.testHooks, ...userConfig.testHooks };
    }

    if (userConfig.thresholds) {
      config.thresholds = { ...config.thresholds, ...userConfig.thresholds };
    }

    if (userConfig.alertingConfig) {
      config.alertingConfig = { ...config.alertingConfig, ...userConfig.alertingConfig };
    }

    // Ensure required directories exist
    await fs.ensureDir(config.testingStoragePath);
    await fs.ensureDir(config.reportOutputPath);
    await fs.ensureDir(path.join(config.testingStoragePath, 'hooks'));
    await fs.ensureDir(path.join(config.testingStoragePath, 'contracts'));
    await fs.ensureDir(path.join(config.reportOutputPath, 'test-runs'));

    // Get reference to model development module if available
    if (userConfig.modelDevelopment) {
      modelDevelopment = userConfig.modelDevelopment;
    }

    initialized = true;
    return true;
  } catch (error) {
    console.error('Failed to initialize testing integration module:', error);
    return false;
  }
}

/**
 * Detect vulnerabilities in a contract or transaction
 * @param {Object} options - Detection options
 * @returns {Promise<Object>} Detection results
 */
async function detectVulnerabilities(options = {}) {
  if (!initialized) {
    throw new Error('Testing integration module has not been initialized');
  }

  const {
    contractCode,
    contractPath,
    transactionData,
    testContext,
    modelIds = Object.keys(config.activeModels),
    saveResults = true,
  } = options;

  try {
    // Create a unique detection ID
    const detectionId = `detection-${crypto.randomBytes(4).toString('hex')}`;
    const timestamp = new Date().toISOString();

    // Check if we have model development module available
    if (!modelDevelopment) {
      throw new Error('Model development module is required for vulnerability detection');
    }

    // Results object
    const results = {
      detectionId,
      timestamp,
      source: contractPath || 'inline-code',
      testContext: testContext || null,
      vulnerabilities: [],
      alerts: [],
      status: 'pending',
    };

    // Analyze contract using ML models
    if (contractCode || contractPath) {
      // Use the model development module to analyze contract
      const analysisResult = await modelDevelopment.analyzeContract({
        contractCode,
        contractPath,
        modelIds,
      });

      if (analysisResult.vulnerabilitiesFound) {
        results.vulnerabilities = analysisResult.vulnerabilities;

        // Process alerts based on vulnerability severities
        results.alerts = processVulnerabilityAlerts(analysisResult.vulnerabilities);

        // Determine if we need to fail the test based on alert levels
        const hasCritical = results.alerts.some(alert => alert.level === 'critical');

        if (hasCritical && config.alertingConfig.failOnCritical && !config.alertingConfig.dryRun) {
          results.status = 'failed';
          results.failReason = 'Critical vulnerability detected';
        } else {
          results.status = 'success';
        }
      } else {
        results.status = 'success';
      }
    }

    // Analyze transaction data if provided
    if (transactionData) {
      const txAnalysisResult = analyzeTransaction(transactionData);

      if (txAnalysisResult.issues.length > 0) {
        results.transactionIssues = txAnalysisResult.issues;

        // Add transaction issues to alerts
        const txAlerts = processTransactionAlerts(txAnalysisResult.issues);
        results.alerts.push(...txAlerts);

        // Update status if needed
        const hasCriticalTx = txAlerts.some(alert => alert.level === 'critical');

        if (
          hasCriticalTx &&
          config.alertingConfig.failOnCritical &&
          !config.alertingConfig.dryRun &&
          results.status !== 'failed'
        ) {
          results.status = 'failed';
          results.failReason = 'Critical transaction issue detected';
        }
      }
    }

    // Save detection results if requested
    if (saveResults) {
      const resultPath = path.join(
        config.testingStoragePath,
        'detection-results',
        `${detectionId}.json`
      );

      await fs.ensureDir(path.dirname(resultPath));
      await fs.writeJson(resultPath, results, { spaces: 2 });
    }

    return results;
  } catch (error) {
    console.error('Error detecting vulnerabilities:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Process vulnerability findings into alerts
 * @param {Array} vulnerabilities - Vulnerability findings
 * @returns {Array} Alert objects
 */
function processVulnerabilityAlerts(vulnerabilities) {
  const alerts = [];

  for (const vuln of vulnerabilities) {
    // Determine alert level based on severity and confidence
    let level = 'info';

    if (vuln.severity === 'critical' && vuln.confidence > config.thresholds.criticalVulnerability) {
      level = 'critical';
    } else if (vuln.severity === 'high' && vuln.confidence > config.thresholds.highVulnerability) {
      level = 'high';
    } else if (
      vuln.severity === 'medium' &&
      vuln.confidence > config.thresholds.mediumVulnerability
    ) {
      level = 'medium';
    } else if (vuln.severity === 'low' && vuln.confidence > config.thresholds.lowVulnerability) {
      level = 'low';
    }

    // Skip non-critical alerts if criticalOnly is enabled
    if (config.alertingConfig.criticalOnly && level !== 'critical') {
      continue;
    }

    // Create alert object
    alerts.push({
      id: `alert-${vuln.id}`,
      source: 'ai-vulnerability-detection',
      level,
      title: `${vuln.type.toUpperCase()} vulnerability detected`,
      message: vuln.description,
      details: {
        vulnerability: vuln,
        remediation: vuln.remediation,
      },
    });
  }

  return alerts;
}

/**
 * Analyze transaction data for potential issues
 * @param {Object} transactionData - Transaction data
 * @returns {Object} Analysis results
 */
function analyzeTransaction(transactionData) {
  const issues = [];

  // Check for high gas price
  if (transactionData.gasPrice && BigInt(transactionData.gasPrice) > BigInt(1000000000000)) {
    issues.push({
      id: 'tx-gas-price-1',
      type: 'gas-price',
      severity: 'medium',
      confidence: 0.8,
      description: 'Unusually high gas price detected, potential front-running vulnerability',
      data: {
        gasPrice: transactionData.gasPrice,
        threshold: '1000000000000',
      },
    });
  }

  // Check for high value transfers
  if (transactionData.value && BigInt(transactionData.value) > BigInt(10000000000000000000n)) {
    // > 10 ETH
    issues.push({
      id: 'tx-high-value-1',
      type: 'high-value',
      severity: 'high',
      confidence: 0.9,
      description: 'High-value transaction detected, potential economic risk',
      data: {
        value: transactionData.value,
        threshold: '10000000000000000000',
      },
    });
  }

  // Check for unverified contract interaction
  if (transactionData.to && !transactionData.verifiedContract) {
    issues.push({
      id: 'tx-unverified-contract-1',
      type: 'unverified-contract',
      severity: 'medium',
      confidence: 0.7,
      description: 'Interaction with unverified contract, potential security risk',
      data: {
        contractAddress: transactionData.to,
      },
    });
  }

  return {
    issues,
    transactionData,
  };
}

/**
 * Process transaction issues into alerts
 * @param {Array} issues - Transaction issues
 * @returns {Array} Alert objects
 */
function processTransactionAlerts(issues) {
  const alerts = [];

  for (const issue of issues) {
    // Determine alert level based on severity and confidence
    let level = 'info';

    if (
      issue.severity === 'critical' &&
      issue.confidence > config.thresholds.criticalVulnerability
    ) {
      level = 'critical';
    } else if (
      issue.severity === 'high' &&
      issue.confidence > config.thresholds.highVulnerability
    ) {
      level = 'high';
    } else if (
      issue.severity === 'medium' &&
      issue.confidence > config.thresholds.mediumVulnerability
    ) {
      level = 'medium';
    } else if (issue.severity === 'low' && issue.confidence > config.thresholds.lowVulnerability) {
      level = 'low';
    }

    // Skip non-critical alerts if criticalOnly is enabled
    if (config.alertingConfig.criticalOnly && level !== 'critical') {
      continue;
    }

    // Create alert object
    alerts.push({
      id: `alert-${issue.id}`,
      source: 'transaction-analysis',
      level,
      title: `Transaction ${issue.type.replace(/-/g, ' ')} issue detected`,
      message: issue.description,
      details: {
        issue,
      },
    });
  }

  return alerts;
}

/**
 * Create test hooks for integration into testing frameworks
 * @param {Object} options - Hook options
 * @returns {Object} Test hooks
 */
function createTestHooks(options = {}) {
  if (!initialized) {
    throw new Error('Testing integration module has not been initialized');
  }

  const {
    testFramework = 'playwright',
    saveDetectionResults = true,
    failOnCritical = config.alertingConfig.failOnCritical,
  } = options;

  // Create hook context
  const hookContext = {
    testRuns: new Map(),
    currentTest: null,
  };

  // Playwright-specific hooks
  if (testFramework === 'playwright') {
    return {
      /**
       * Before test hook
       * @param {Object} testInfo - Playwright test info
       */
      beforeTest: async testInfo => {
        if (!config.testHooks.beforeTest) return;

        hookContext.currentTest = testInfo.title;
        hookContext.testRuns.set(testInfo.title, {
          start: Date.now(),
          detections: [],
        });

        console.log(`AI vulnerability detection: starting test "${testInfo.title}"`);
      },

      /**
       * After test hook
       * @param {Object} testInfo - Playwright test info
       */
      afterTest: async testInfo => {
        if (!config.testHooks.afterTest) return;

        const testRun = hookContext.testRuns.get(testInfo.title);

        if (testRun) {
          testRun.end = Date.now();
          testRun.duration = testRun.end - testRun.start;
          testRun.status = testInfo.status;

          // Check if any critical vulnerabilities were detected
          const hasCritical = testRun.detections.some(
            detection =>
              detection.alerts && detection.alerts.some(alert => alert.level === 'critical')
          );

          if (hasCritical && failOnCritical) {
            console.error(
              `AI vulnerability detection: critical vulnerabilities detected in test "${testInfo.title}"`
            );
            // In a real implementation, this might mark the test as failed
            // For now, we'll just log it
          }

          // Save test run results
          await saveTestRunResults(testInfo.title, testRun);
        }

        hookContext.currentTest = null;
      },

      /**
       * Before transaction hook
       * @param {Object} transactionConfig - Transaction configuration
       */
      beforeTransaction: async transactionConfig => {
        if (!config.testHooks.beforeTransaction) return;

        // Check if we have a current test
        if (!hookContext.currentTest) return;

        const testRun = hookContext.testRuns.get(hookContext.currentTest);

        if (testRun) {
          try {
            // Analyze contract and transaction
            const detection = await detectVulnerabilities({
              transactionData: transactionConfig,
              testContext: {
                test: hookContext.currentTest,
                phase: 'beforeTransaction',
              },
              saveResults: saveDetectionResults,
            });

            testRun.detections.push(detection);

            // Check if we need to fail the test
            if (detection.status === 'failed' && failOnCritical) {
              console.error(
                'AI vulnerability detection: critical issue detected before transaction'
              );
              // In a real implementation, this might cancel the transaction
            }
          } catch (error) {
            console.error('Error in beforeTransaction hook:', error);
          }
        }
      },

      /**
       * After transaction hook
       * @param {Object} transactionResult - Transaction result
       */
      afterTransaction: async transactionResult => {
        if (!config.testHooks.afterTransaction) return;

        // Check if we have a current test
        if (!hookContext.currentTest) return;

        const testRun = hookContext.testRuns.get(hookContext.currentTest);

        if (testRun) {
          try {
            // Analyze transaction result
            const detection = await detectVulnerabilities({
              transactionData: transactionResult,
              testContext: {
                test: hookContext.currentTest,
                phase: 'afterTransaction',
              },
              saveResults: saveDetectionResults,
            });

            testRun.detections.push(detection);
          } catch (error) {
            console.error('Error in afterTransaction hook:', error);
          }
        }
      },
    };
  }

  // Default hooks for other frameworks
  return {
    beforeTest: async testContext => {
      if (!config.testHooks.beforeTest) return;

      const testName = testContext.title || 'unknown-test';
      hookContext.currentTest = testName;
      hookContext.testRuns.set(testName, {
        start: Date.now(),
        detections: [],
      });

      console.log(`AI vulnerability detection: starting test "${testName}"`);
    },

    afterTest: async testContext => {
      if (!config.testHooks.afterTest) return;

      const testName = testContext.title || 'unknown-test';
      const testRun = hookContext.testRuns.get(testName);

      if (testRun) {
        testRun.end = Date.now();
        testRun.duration = testRun.end - testRun.start;
        testRun.status = testContext.status || 'unknown';

        // Save test run results
        await saveTestRunResults(testName, testRun);
      }

      hookContext.currentTest = null;
    },
  };
}

/**
 * Save test run results
 * @param {string} testName - Test name
 * @param {Object} testRun - Test run data
 * @returns {Promise<boolean>} Success status
 */
async function saveTestRunResults(testName, testRun) {
  try {
    const safeTestName = testName.replace(/[^a-zA-Z0-9-_]/g, '_');
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filePath = path.join(
      config.reportOutputPath,
      'test-runs',
      `${safeTestName}-${timestamp}.json`
    );

    await fs.ensureDir(path.dirname(filePath));
    await fs.writeJson(filePath, testRun, { spaces: 2 });

    return true;
  } catch (error) {
    console.error('Error saving test run results:', error);
    return false;
  }
}

module.exports = {
  initialize,
  detectVulnerabilities,
  createTestHooks,
};
