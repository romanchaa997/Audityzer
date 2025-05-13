/**
 * @fileoverview Core CI/CD Integration Module for Web3FuzzForge
 *
 * This module exports all components of the CI/CD integration layer.
 */

const CIIntegrationLayer = require('./integration-layer');
const SecurityRulesValidator = require('./security-rules-validator');
const TestExecutor = require('./test-executor');
const PlatformRegistry = require('./platform-registry');
const HeadlessWalletTesting = require('./headless-wallet');
const StaticAnalysisIntegration = require('./static-analysis');
const NotificationSystem = require('./notification-system');
const path = require('path');
const fs = require('fs');

// Platform-specific adapters
const GitHubAdapter = require('./platforms/github-adapter');
const GitLabAdapter = require('./platforms/gitlab-adapter');

// Add this require for the vulnerability classifier
const VulnerabilityClassifier = require('../ai-vulnerability-detection/model-development/vulnerability-classifier');
const ReportGenerators = require('./report-generators');

// Export DeploymentValidator
const { DeploymentValidator } = require('./deployment-validator');

/**
 * Generates a template security rules file
 * @param {string} outputPath - Path to write the template
 * @returns {boolean} Success status
 */
function generateTemplateRules(outputPath = './security-rules.json') {
  try {
    const validator = new SecurityRulesValidator();
    const template = validator.generateTemplate();

    fs.writeFileSync(outputPath, JSON.stringify(template, null, 2));
    console.log(`Template security rules generated at: ${outputPath}`);
    return true;
  } catch (error) {
    console.error('Error generating template security rules:', error);
    return false;
  }
}

/**
 * Validates security rules configuration
 * @param {string} configPath - Path to the security rules configuration
 * @returns {Object} Validation result
 */
function validateSecurityRules(configPath = './security-rules.json') {
  try {
    const validator = new SecurityRulesValidator();
    const result = validator.validate(configPath);

    if (result.valid) {
      console.log('Security rules validation successful!');
    } else {
      console.error('Security rules validation failed:');
      result.errors.forEach((error, index) => {
        console.error(`${index + 1}. ${error.message} at ${error.dataPath}`);
      });
    }

    return result;
  } catch (error) {
    console.error('Error validating security rules:', error);
    return {
      valid: false,
      errors: [{ message: error.message }],
    };
  }
}

/**
 * Detects security misconfigurations in rules
 * @param {string} configPath - Path to the security rules configuration
 * @returns {Object} Misconfiguration detection result
 */
function detectMisconfigurations(configPath = './security-rules.json') {
  try {
    // Load rules from file
    const rules = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // Validate rules structure first
    const validator = new SecurityRulesValidator();
    const validationResult = validator.validate(rules);

    if (!validationResult.valid) {
      return {
        valid: false,
        message: 'Cannot check misconfigurations due to invalid rule structure',
        errors: validationResult.errors,
      };
    }

    // Check for misconfigurations
    const misconfigResult = validator.detectMisconfigurations(rules);

    if (misconfigResult.hasWarnings) {
      console.warn('Security rule misconfigurations detected:');
      misconfigResult.warnings.forEach((warning, index) => {
        console.warn(`${index + 1}. [${warning.level}] ${warning.message}`);
        if (warning.ruleIds) {
          console.warn(`   Affected rules: ${warning.ruleIds.join(', ')}`);
        }
        if (warning.details) {
          console.warn('   Details:', warning.details);
        }
      });
    } else {
      console.log('No security misconfigurations detected.');
    }

    return misconfigResult;
  } catch (error) {
    console.error('Error detecting misconfigurations:', error);
    return {
      hasWarnings: true,
      warnings: [
        {
          type: 'error',
          level: 'high',
          message: `Failed to process rules file: ${error.message}`,
        },
      ],
    };
  }
}

/**
 * Checks if security rules meet compliance standards
 * @param {string} configPath - Path to the security rules configuration
 * @param {string} standard - Compliance standard to check (e.g., 'soc2', 'gdpr')
 * @returns {Object} Compliance check results
 */
function checkCompliance(configPath = './security-rules.json', standard = 'soc2') {
  try {
    // Load rules from file
    const rules = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // Create validator
    const validator = new SecurityRulesValidator();

    // Check compliance
    const result = validator.checkCompliance(rules, standard);

    if (result.valid) {
      console.log(`${standard.toUpperCase()} compliance check passed!`);
    } else {
      console.error(`${standard.toUpperCase()} compliance check failed:`);
      result.errors.forEach((error, index) => {
        console.error(`${index + 1}. ${error}`);
      });
    }

    return result;
  } catch (error) {
    console.error(`Error checking ${standard} compliance:`, error);
    return {
      valid: false,
      errors: [`Failed to check compliance: ${error.message}`],
    };
  }
}

/**
 * Exports security rules to SARIF format for GitHub Security integration
 * @param {string} configPath - Path to the security rules configuration
 * @param {string} outputPath - Path to write SARIF file
 * @returns {boolean} Success status
 */
function exportToSARIF(
  configPath = './security-rules.json',
  outputPath = './security-report.sarif'
) {
  try {
    // Load rules from file
    const rules = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // Create validator
    const validator = new SecurityRulesValidator();

    // Export to SARIF
    const success = validator.exportToSARIF(rules, outputPath);

    if (success) {
      console.log(`Security rules exported to SARIF format at: ${outputPath}`);
    } else {
      console.error('Failed to export security rules to SARIF format');
    }

    return success;
  } catch (error) {
    console.error('Error exporting to SARIF format:', error);
    return false;
  }
}

/**
 * Detects the current CI platform
 * @returns {string} Detected platform name
 */
function detectCIPlatform() {
  const registry = new PlatformRegistry();
  const platform = registry.detectPlatform();

  console.log(`Detected CI platform: ${platform || 'None (local environment)'}`);
  return platform;
}

/**
 * Generates a CI configuration file for the specified platform
 * @param {string} platform - CI platform (github, gitlab, jenkins, azure)
 * @param {string} outputPath - Path to write the configuration
 * @returns {boolean} Success status
 */
function generateCIConfig(platform, outputPath) {
  try {
    // Default to current platform if not specified
    if (!platform) {
      platform = detectCIPlatform() || 'github';
    }

    // Set default output path based on platform
    if (!outputPath) {
      switch (platform) {
        case 'github':
          outputPath = './.github/workflows/web3fuzzforge-security.yml';
          break;
        case 'gitlab':
          outputPath = './.gitlab-ci.yml';
          break;
        case 'jenkins':
          outputPath = './Jenkinsfile';
          break;
        case 'azure':
          outputPath = './azure-pipelines.yml';
          break;
        default:
          outputPath = `./.${platform}-config.yml`;
      }
    }

    // Define template content based on platform
    let templateContent = '';

    switch (platform) {
      case 'github':
        templateContent = fs.readFileSync(
          path.join(__dirname, '../../templates/ci/github-workflow.yml'),
          'utf8'
        );
        break;
      case 'gitlab':
        templateContent = fs.readFileSync(
          path.join(__dirname, '../../templates/ci/gitlab-ci.yml'),
          'utf8'
        );
        break;
      case 'jenkins':
        templateContent = fs.readFileSync(
          path.join(__dirname, '../../templates/ci/Jenkinsfile'),
          'utf8'
        );
        break;
      case 'azure':
        templateContent = fs.readFileSync(
          path.join(__dirname, '../../templates/ci/azure-pipelines.yml'),
          'utf8'
        );
        break;
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write configuration file
    fs.writeFileSync(outputPath, templateContent);
    console.log(`CI configuration for ${platform} generated at: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error generating CI config for ${platform}:`, error);
    return false;
  }
}

/**
 * Generate a notification config template
 * @param {string} outputPath - Path to write the configuration
 * @returns {boolean} Success status
 */
function generateNotificationConfig(outputPath = './notification-config.json') {
  try {
    const templateConfig = {
      enabled: true,
      channels: {
        email: {
          enabled: false,
          smtpConfig: {
            host: 'smtp.example.com',
            port: 587,
            secure: false,
            auth: {
              user: 'username@example.com',
              pass: 'password',
            },
          },
          from: 'web3fuzzforge@example.com',
          to: ['security@example.com'],
          subject: 'Web3FuzzForge Security Alert',
        },
        slack: {
          enabled: false,
          webhookUrl: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL',
          channel: '#security-alerts',
          username: 'Web3FuzzForge Security',
        },
        webhook: {
          enabled: false,
          url: 'https://example.com/webhook',
          method: 'POST',
          headers: {
            Authorization: 'Bearer YOUR_API_KEY',
          },
        },
      },
      alertThreshold: {
        severity: 'high',
        count: 1,
      },
    };

    fs.writeFileSync(outputPath, JSON.stringify(templateConfig, null, 2));
    console.log(`Notification configuration template generated at: ${outputPath}`);
    return true;
  } catch (error) {
    console.error('Error generating notification config:', error);
    return false;
  }
}

/**
 * Create and configure all required components for CI/CD integration
 * @param {Object} config - Configuration object
 * @returns {Object} Configured components
 */
function createIntegration(config = {}) {
  const integration = {
    layer: new CIIntegrationLayer(config),
    validator: new SecurityRulesValidator(),
    executor: new TestExecutor(config),
    platformRegistry: new PlatformRegistry(),
    headlessWallet: new HeadlessWalletTesting(config),
    staticAnalysis: new StaticAnalysisIntegration(config),
    notification: new NotificationSystem(config.notification || {}),
  };

  // Detect platform and get appropriate adapter
  integration.platform = integration.platformRegistry.detectPlatform();
  integration.adapter = integration.platformRegistry.getAdapter(integration.platform, config);

  return integration;
}

/**
 * Validates L2 protocol security rules
 * @param {string} configPath - Path to the security rules configuration
 * @param {string} l2Protocol - L2 protocol to validate ('optimism', 'arbitrum', 'zksync', 'polygon', 'base')
 * @returns {Object} Validation result
 */
function validateL2Protocol(configPath = './security-rules.json', l2Protocol) {
  try {
    // Load rules from file
    const rules = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // Create validator
    const validator = new SecurityRulesValidator();

    // Validate L2 protocol rules
    const result = validator.validateL2Protocol(rules, l2Protocol);

    if (result.valid) {
      console.log(`${l2Protocol} protocol security validation passed!`);
    } else {
      console.error(`${l2Protocol} protocol security validation failed:`);
      result.errors.forEach((error, index) => {
        console.error(`${index + 1}. ${error}`);
      });
    }

    return result;
  } catch (error) {
    console.error(`Error validating ${l2Protocol} protocol security:`, error);
    return {
      valid: false,
      errors: [`Failed to validate ${l2Protocol} protocol security: ${error.message}`],
    };
  }
}

/**
 * Validates bridge security rules
 * @param {string} configPath - Path to the security rules configuration
 * @returns {Object} Validation result
 */
function validateBridgeSecurity(configPath = './security-rules.json') {
  try {
    // Load rules from file
    const rules = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // Create validator
    const validator = new SecurityRulesValidator();

    // Validate bridge security rules
    const result = validator.validateBridgeSecurity(rules);

    if (result.valid) {
      console.log('Bridge security validation passed!');
    } else {
      console.error('Bridge security validation failed:');
      result.errors.forEach((error, index) => {
        console.error(`${index + 1}. ${error}`);
      });
    }

    return result;
  } catch (error) {
    console.error('Error validating bridge security:', error);
    return {
      valid: false,
      errors: [`Failed to validate bridge security: ${error.message}`],
    };
  }
}

/**
 * Generates L2-specific security rule template
 * @param {string} l2Protocol - L2 protocol to generate rules for
 * @param {string} outputPath - Path to write the generated rules
 * @returns {boolean} Success status
 */
function generateL2Template(
  l2Protocol,
  outputPath = `./${l2Protocol.toLowerCase()}-security-rules.json`
) {
  try {
    const validator = new SecurityRulesValidator();
    const template = validator.generateL2Template(l2Protocol);

    fs.writeFileSync(outputPath, JSON.stringify(template, null, 2));
    console.log(`${l2Protocol} security rules template generated at: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error generating ${l2Protocol} security rules template:`, error);
    return false;
  }
}

/**
 * Generates bridge security rule template
 * @param {string} outputPath - Path to write the generated rules
 * @returns {boolean} Success status
 */
function generateBridgeTemplate(outputPath = './bridge-security-rules.json') {
  try {
    const validator = new SecurityRulesValidator();
    const template = validator.generateBridgeTemplate();

    fs.writeFileSync(outputPath, JSON.stringify(template, null, 2));
    console.log(`Bridge security rules template generated at: ${outputPath}`);
    return true;
  } catch (error) {
    console.error('Error generating bridge security rules template:', error);
    return false;
  }
}

/**
 * Measures transaction finality across L2 chains
 * @param {string} configPath - Path to the test configuration
 * @returns {Object} Finality measurement results
 */
function measureL2Finality(configPath = './l2-performance-tests.json') {
  try {
    // Load configuration from file
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // Create validator
    const validator = new SecurityRulesValidator();

    // Find finality test configuration
    let finalityTest = null;
    if (config.tests) {
      finalityTest = config.tests.find(test => test.id === 'FINALITY-001');
    }

    if (!finalityTest) {
      return {
        valid: false,
        errors: ['Finality test configuration not found'],
      };
    }

    // Measure finality
    const results = validator.measureFinality(finalityTest);

    if (results.valid) {
      console.log('L2 finality measurement completed successfully!');

      // Display results for each chain
      Object.entries(results.measurements).forEach(([chain, data]) => {
        console.log(`\n${chain.toUpperCase()} Finality:`);
        console.log(`  Average Finality Time: ${data.averageFinalityTime} seconds`);
        console.log(`  Confirmed Blocks: ${data.confirmedBlocks}`);
        console.log(`  Security Level: ${data.securityLevel}`);
      });
    } else {
      console.error('L2 finality measurement failed:');
      results.errors.forEach((error, index) => {
        console.error(`${index + 1}. ${error}`);
      });
    }

    return results;
  } catch (error) {
    console.error('Error measuring L2 finality:', error);
    return {
      valid: false,
      errors: [`Failed to measure L2 finality: ${error.message}`],
    };
  }
}

/**
 * Tests transaction confirmation timing across L2 chains
 * @param {string} configPath - Path to the test configuration
 * @returns {Object} Transaction confirmation test results
 */
function testL2TransactionConfirmation(configPath = './l2-performance-tests.json') {
  try {
    // Load configuration from file
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // Create validator
    const validator = new SecurityRulesValidator();

    // Find transaction confirmation test configuration
    let txTest = null;
    if (config.tests) {
      txTest = config.tests.find(test => test.id === 'TX-CONFIRM-001');
    }

    if (!txTest) {
      return {
        valid: false,
        errors: ['Transaction confirmation test configuration not found'],
      };
    }

    // Test transaction confirmation
    const results = validator.testTransactionConfirmation(txTest);

    if (results.valid) {
      console.log('L2 transaction confirmation tests completed successfully!');

      // Display results for each transaction
      Object.entries(results.timings).forEach(([txId, data]) => {
        console.log(`\nTransaction ${txId} (${data.chain}):`);
        console.log(`  Submission Time: ${data.submissionTime}`);
        console.log(`  Confirmation Time: ${data.confirmationTime}`);
        console.log(`  Finality Achieved: ${data.finalityAchieved ? 'Yes' : 'No'}`);
        console.log(`  Blocks to Finality: ${data.blocksToFinality}`);
      });
    } else {
      console.error('L2 transaction confirmation tests failed:');
      results.errors.forEach((error, index) => {
        console.error(`${index + 1}. ${error}`);
      });
    }

    return results;
  } catch (error) {
    console.error('Error testing L2 transaction confirmation:', error);
    return {
      valid: false,
      errors: [`Failed to test L2 transaction confirmation: ${error.message}`],
    };
  }
}

/**
 * Simulates reorgs and tests recovery mechanisms across L2 chains
 * @param {string} configPath - Path to the test configuration
 * @returns {Object} Reorg simulation results
 */
function simulateL2ReorgRecovery(configPath = './l2-performance-tests.json') {
  try {
    // Load configuration from file
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // Create validator
    const validator = new SecurityRulesValidator();

    // Find reorg simulation test configuration
    let reorgTest = null;
    if (config.tests) {
      reorgTest = config.tests.find(test => test.id === 'REORG-001');
    }

    if (!reorgTest) {
      return {
        valid: false,
        errors: ['Reorg simulation test configuration not found'],
      };
    }

    // Simulate reorg recovery
    const results = validator.simulateReorgRecovery(reorgTest);

    if (results.valid) {
      console.log('L2 reorg simulation and recovery tests completed successfully!');

      // Display results for each scenario
      Object.entries(results.simulations).forEach(([scenarioId, data]) => {
        console.log(`\nScenario ${scenarioId} (${data.chain}):`);
        console.log(`  Reorg Depth: ${data.reorgDepth} blocks`);
        console.log(`  Start Time: ${data.startTime}`);
        console.log(`  Recovery Time: ${data.recoveryTime}`);
        console.log(`  Transactions Affected: ${data.transactionsAffected}`);
        console.log(`  Recovery Success: ${data.recoverySuccess ? 'Yes' : 'No'}`);
        console.log(`  Data Consistency: ${data.dataConsistency}%`);
      });
    } else {
      console.error('L2 reorg simulation and recovery tests failed:');
      results.errors.forEach((error, index) => {
        console.error(`${index + 1}. ${error}`);
      });
    }

    return results;
  } catch (error) {
    console.error('Error simulating L2 reorgs:', error);
    return {
      valid: false,
      errors: [`Failed to simulate L2 reorgs: ${error.message}`],
    };
  }
}

/**
 * Generates a template for L2 performance testing
 * @param {string} outputPath - Path to write the template
 * @returns {boolean} Success status
 */
function generateL2PerformanceTemplate(outputPath = './l2-performance-tests.json') {
  try {
    const validator = new SecurityRulesValidator();
    const template = validator.generateL2PerformanceTemplate();

    fs.writeFileSync(outputPath, JSON.stringify(template, null, 2));
    console.log(`L2 performance testing template generated at: ${outputPath}`);
    return true;
  } catch (error) {
    console.error('Error generating L2 performance testing template:', error);
    return false;
  }
}

/**
 * Generate security report with vulnerability classification
 * @param {Object} options - Report generation options
 * @returns {boolean} Success status
 */
function generateSecurityReport(options = {}) {
  try {
    const {
      testResultsPath = './test-results',
      outputFormat = 'json',
      outputPath = './test-results/security',
      classifyVulnerabilities = true,
    } = options;

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    // Load test results
    const testResults = [];
    const resultsFiles = fs
      .readdirSync(testResultsPath)
      .filter(file => file.endsWith('.json') && file.includes('test-result'));

    resultsFiles.forEach(file => {
      try {
        const resultData = JSON.parse(fs.readFileSync(path.join(testResultsPath, file), 'utf8'));
        if (Array.isArray(resultData)) {
          testResults.push(...resultData);
        } else {
          testResults.push(resultData);
        }
      } catch (err) {
        console.warn(`Error parsing test result file ${file}: ${err.message}`);
      }
    });

    console.log(`Loaded ${testResults.length} test results from ${resultsFiles.length} files`);

    // Generate appropriate report format
    let reportContent;
    let reportFilename;

    if (outputFormat === 'sarif') {
      reportContent = ReportGenerators.generateSarifReport(testResults);
      reportFilename = 'security-report.sarif';
    } else if (outputFormat === 'markdown') {
      reportContent = ReportGenerators.generateMarkdownReport(testResults);
      reportFilename = 'security-report.md';
    } else {
      // Default to JSON
      reportContent = ReportGenerators.generateStructuredReport(testResults);
      reportFilename = 'security-report.json';
    }

    // Write report to file
    const reportPath = path.join(outputPath, reportFilename);

    if (outputFormat === 'json' || outputFormat === 'sarif') {
      fs.writeFileSync(reportPath, JSON.stringify(reportContent, null, 2));
    } else {
      fs.writeFileSync(reportPath, reportContent);
    }

    console.log(`Security report generated at: ${reportPath}`);
    return true;
  } catch (error) {
    console.error('Error generating security report:', error);
    return false;
  }
}

/**
 * Generate a summary of vulnerabilities found in tests
 * @param {Object} options - Summary generation options
 * @returns {boolean} Success status
 */
function summarizeVulnerabilities(options = {}) {
  try {
    const {
      reportPath = './test-results/security/security-report.json',
      outputPath = './test-results/security/summary.md',
    } = options;

    // Load the report
    if (!fs.existsSync(reportPath)) {
      throw new Error(`Report file not found: ${reportPath}`);
    }

    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

    // Create summary markdown
    let summary = '# Web3FuzzForge Security Test Summary\n\n';

    // Add test summary
    if (report.summary) {
      summary += '## Test Summary\n\n';
      summary += `- **Total Tests**: ${report.summary.totalTests}\n`;
      summary += `- **Passed**: ${report.summary.passedTests}\n`;
      summary += `- **Failed**: ${report.summary.failedTests}\n`;
      summary += `- **Pass Rate**: ${report.summary.passRate.toFixed(2)}%\n\n`;
    }

    // Add vulnerability summary
    if (report.classificationStats) {
      summary += '## Vulnerability Summary\n\n';
      summary += `- **Total Vulnerabilities**: ${report.classificationStats.total}\n\n`;

      // Severity breakdown
      summary += '### Severity Breakdown\n\n';
      summary += '| Severity | Count |\n';
      summary += '|----------|-------|\n';

      for (const [severity, count] of Object.entries(report.classificationStats.bySeverity)) {
        if (count > 0) {
          summary += `| ${severity.charAt(0).toUpperCase() + severity.slice(1)} | ${count} |\n`;
        }
      }

      summary += '\n';

      // Category breakdown
      summary += '### Category Breakdown\n\n';
      summary += '| Category | Count |\n';
      summary += '|----------|-------|\n';

      for (const [category, count] of Object.entries(report.classificationStats.byCategory)) {
        if (count > 0) {
          summary += `| ${formatCategoryName(category)} | ${count} |\n`;
        }
      }

      summary += '\n';
    }

    // Add vulnerability details section if there are any vulnerabilities
    if (report.vulnerabilities && report.vulnerabilities.length > 0) {
      summary += '## Critical & High Severity Vulnerabilities\n\n';

      // Only include critical and high severity vulnerabilities
      const highSeverityVulns = report.vulnerabilities.filter(
        vuln => vuln.severity === 'critical' || vuln.severity === 'high'
      );

      if (highSeverityVulns.length === 0) {
        summary += 'No critical or high severity vulnerabilities found.\n\n';
      } else {
        highSeverityVulns.forEach((vuln, index) => {
          summary += `### ${index + 1}. ${vuln.original.name || formatCategoryName(vuln.classification)}\n\n`;
          summary += `- **Severity**: ${vuln.severity}\n`;
          summary += `- **Category**: ${formatCategoryName(vuln.classification)}\n`;
          summary += `- **Confidence**: ${(vuln.confidence * 100).toFixed(1)}%\n`;

          if (vuln.cweId) {
            summary += `- **CWE ID**: ${vuln.cweId}\n`;
          }

          if (vuln.original.description) {
            summary += `\n**Description**: ${vuln.original.description}\n\n`;
          }

          if (vuln.original.location) {
            summary += `**Location**: ${vuln.original.location.file}:${vuln.original.location.line}\n\n`;
          }

          if (vuln.original.remediation) {
            summary += `**Remediation**: ${vuln.original.remediation}\n\n`;
          }

          summary += '---\n\n';
        });
      }
    }

    // Add timestamp
    summary += `\n\n*Report generated at: ${new Date().toISOString()}*\n`;

    // Write summary to file
    fs.writeFileSync(outputPath, summary);
    console.log(`Vulnerability summary generated at: ${outputPath}`);

    return true;
  } catch (error) {
    console.error('Error generating vulnerability summary:', error);
    return false;
  }
}

/**
 * Format a vulnerability category name for display
 * @param {string} category - Category name
 * @returns {string} Formatted name
 */
function formatCategoryName(category) {
  if (!category) return 'Unknown';

  // Replace underscores with spaces and capitalize each word
  return category
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Check for critical vulnerabilities and exit with error if found
 * @param {Object} options - Check options
 * @returns {boolean} Check status
 */
function checkCriticalVulnerabilities(options = {}) {
  try {
    const {
      reportPath = './test-results/security/security-report.json',
      failOnHigh = true,
      failOnCritical = true,
    } = options;

    // Load the report
    if (!fs.existsSync(reportPath)) {
      throw new Error(`Report file not found: ${reportPath}`);
    }

    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

    // Check for critical vulnerabilities
    let criticalCount = 0;
    let highCount = 0;

    if (report.classificationStats && report.classificationStats.bySeverity) {
      criticalCount = report.classificationStats.bySeverity.critical || 0;
      highCount = report.classificationStats.bySeverity.high || 0;
    }

    // Log summary
    console.log(`Found ${criticalCount} critical and ${highCount} high severity vulnerabilities`);

    // Determine if we should fail
    if (failOnCritical && criticalCount > 0) {
      console.error('Critical vulnerabilities detected. Failing the build.');
      process.exit(1);
    }

    if (failOnHigh && highCount > 0) {
      console.error('High severity vulnerabilities detected. Failing the build.');
      process.exit(1);
    }

    console.log('No critical/high severity vulnerabilities that require build failure.');
    return true;
  } catch (error) {
    console.error('Error checking for critical vulnerabilities:', error);
    return false;
  }
}

// Export all modules
module.exports = {
  CIIntegrationLayer,
  SecurityRulesValidator,
  TestExecutor,
  PlatformRegistry,
  HeadlessWalletTesting,
  StaticAnalysisIntegration,
  NotificationSystem,
  GitHubAdapter,
  GitLabAdapter,
  generateTemplateRules,
  validateSecurityRules,
  detectMisconfigurations,
  checkCompliance,
  exportToSARIF,
  detectCIPlatform,
  generateCIConfig,
  generateNotificationConfig,
  createIntegration,
  validateL2Protocol,
  validateBridgeSecurity,
  generateL2Template,
  generateBridgeTemplate,
  measureL2Finality,
  testL2TransactionConfirmation,
  simulateL2ReorgRecovery,
  generateL2PerformanceTemplate,
  generateSecurityReport,
  summarizeVulnerabilities,
  checkCriticalVulnerabilities,
  DeploymentValidator,
};
