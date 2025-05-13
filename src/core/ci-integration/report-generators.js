/**
 * Report generation utilities for test results
 */
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const VulnerabilityClassifier = require('../ai-vulnerability-detection/model-development/vulnerability-classifier');

/**
 * Generate a markdown report from test results
 * @param {Object} results - The test results to include in report
 * @param {Object} options - Report generation options
 * @returns {string} Generated markdown content
 */
function generateMarkdownReport(results, options = {}) {
  if (!results || !results.tests) {
    throw new Error('No valid test results to generate markdown report');
  }

  const timestamp = new Date().toISOString();
  const { testName = 'Test Run', environment = 'Default' } = options;

  // Initialize markdown content
  let markdown = `# ${testName} - Test Report\n\n`;

  // Add summary section
  markdown += '## Summary\n\n';
  markdown += `- **Date**: ${new Date(timestamp).toLocaleString()}\n`;
  markdown += `- **Environment**: ${environment}\n`;
  markdown += `- **Total Tests**: ${results.tests.length}\n`;
  markdown += `- **Passed**: ${results.passed || 0}\n`;
  markdown += `- **Failed**: ${results.failed || 0}\n`;
  markdown += `- **Skipped**: ${results.skipped || 0}\n`;
  markdown += `- **Duration**: ${formatDuration(results.duration || 0)}\n\n`;

  // Add test results table
  markdown += '## Test Results\n\n';
  markdown += '| Test | Status | Duration | Notes |\n';
  markdown += '| ---- | ------ | -------- | ----- |\n';

  // Sort tests: failures first, then passes, then skipped
  const sortedTests = [...results.tests].sort((a, b) => {
    // First sort by status (failed, passed, skipped)
    const statusOrder = { failed: 0, passed: 1, skipped: 2 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;

    // Then sort by duration (longest first)
    return (b.duration || 0) - (a.duration || 0);
  });

  // Add sorted tests to the table
  sortedTests.forEach(test => {
    const status = getStatusEmoji(test.status);
    const formattedDuration = formatDuration(test.duration || 0);
    const notes = test.error ? `\`${truncate(test.error, 100)}\`` : '';

    markdown += `| ${test.title} | ${status} | ${formattedDuration} | ${notes} |\n`;
  });

  // Add notable failures section if there are failures
  const failures = results.tests.filter(test => test.status === 'failed');
  if (failures.length > 0) {
    markdown += '\n## Notable Failures\n\n';

    failures.forEach((failure, index) => {
      markdown += `### ${index + 1}. ${failure.title}\n\n`;

      if (failure.error) {
        markdown += `\`\`\`\n${failure.error}\n\`\`\`\n\n`;
      }

      if (failure.location) {
        markdown += `**Location**: \`${failure.location}\`\n\n`;
      }
    });
  }

  // Add timestamp
  markdown += `\n\n*Report generated at ${timestamp}*\n`;

  return markdown;
}

/**
 * Write markdown report to file
 * @param {string} markdown - Markdown content
 * @param {string} outputPath - Path to write the report
 * @returns {Promise<boolean>} Success status
 */
async function writeMarkdownReport(markdown, outputPath) {
  try {
    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, markdown);
    console.log(chalk.green(`Markdown report generated at: ${outputPath}`));
    return true;
  } catch (error) {
    console.error(chalk.red('Error writing markdown report:'), error);
    return false;
  }
}

/**
 * Helper function to format duration in ms to a readable string
 * @param {number} ms - Duration in milliseconds
 * @returns {string} Formatted duration string
 */
function formatDuration(ms) {
  if (ms < 1000) {
    return `${ms}ms`;
  } else if (ms < 60000) {
    return `${(ms / 1000).toFixed(2)}s`;
  } else {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(1);
    return `${minutes}m ${seconds}s`;
  }
}

/**
 * Get emoji for test status
 * @param {string} status - Test status (passed, failed, skipped)
 * @returns {string} Emoji representing the status
 */
function getStatusEmoji(status) {
  switch (status) {
    case 'passed':
      return '✅ Pass';
    case 'failed':
      return '❌ Fail';
    case 'skipped':
      return '⏭️ Skip';
    default:
      return status;
  }
}

/**
 * Truncate string to specified length
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated string
 */
function truncate(str, length) {
  if (!str) return '';
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

/**
 * Generate structured test report with vulnerability classification
 * @param {Object} testResults - Test execution results
 * @param {Object} options - Report generation options
 * @returns {Object} Structured report
 */
function generateStructuredReport(testResults, options = {}) {
  // Create a vulnerability classifier instance
  const classifier = new VulnerabilityClassifier();

  const vulnerabilities = [];
  let totalTests = 0;
  let passedTests = 0;

  // Process test results
  testResults.forEach(result => {
    totalTests++;
    if (result.status === 'passed') {
      passedTests++;
    }

    // Extract vulnerabilities from test
    if (result.vulnerabilities && Array.isArray(result.vulnerabilities)) {
      vulnerabilities.push(...result.vulnerabilities);
    }
  });

  // Classify vulnerabilities
  const classifiedVulnerabilities = classifier.classifyVulnerabilities(vulnerabilities);

  // Generate statistics
  const classificationStats = classifier.generateStatistics(classifiedVulnerabilities);

  return {
    summary: {
      totalTests,
      passedTests,
      failedTests: totalTests - passedTests,
      passRate: totalTests > 0 ? (passedTests / totalTests) * 100 : 0,
      totalVulnerabilities: vulnerabilities.length,
      severityCounts: classificationStats.bySeverity,
      categoryCounts: classificationStats.byCategory,
    },
    vulnerabilities: classifiedVulnerabilities,
    classificationStats,
    testResults,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Generate SARIF-formatted report for GitHub Security integration
 * @param {Object} testResults - Test execution results
 * @param {Object} options - Report generation options
 * @returns {Object} SARIF report
 */
function generateSarifReport(testResults, options = {}) {
  // Create a vulnerability classifier instance
  const classifier = new VulnerabilityClassifier();

  // Extract and classify vulnerabilities
  const vulnerabilities = [];
  testResults.forEach(result => {
    if (result.vulnerabilities && Array.isArray(result.vulnerabilities)) {
      vulnerabilities.push(...result.vulnerabilities);
    }
  });

  const classifiedVulnerabilities = classifier.classifyVulnerabilities(vulnerabilities);

  // Create SARIF report structure
  const sarifReport = {
    $schema:
      'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json',
    version: '2.1.0',
    runs: [
      {
        tool: {
          driver: {
            name: 'Web3FuzzForge Security Scanner',
            version: '1.0.0',
            informationUri: 'https://github.com/yourusername/web3-security-test-kit',
            rules: [],
          },
        },
        results: [],
      },
    ],
  };

  // Add rules based on vulnerability classifications
  const ruleIndex = {};
  let ruleId = 0;

  classifiedVulnerabilities.forEach(vuln => {
    const category = vuln.classification || 'UNKNOWN';

    // Add rule if not already added
    if (!ruleIndex[category]) {
      const rule = {
        id: `WEB3-${category}`,
        shortDescription: {
          text: vuln.original.name || category,
        },
        fullDescription: {
          text: vuln.original.description || `Vulnerability of type ${category}`,
        },
        helpUri: `https://github.com/yourusername/web3-security-test-kit/docs/${category.toLowerCase()}.md`,
        properties: {
          tags: ['security', 'web3', category.toLowerCase()],
          category,
          severity: vuln.severity || 'medium',
        },
      };

      sarifReport.runs[0].tool.driver.rules.push(rule);
      ruleIndex[category] = ruleId++;
    }

    // Add vulnerability result
    const result = {
      ruleId: `WEB3-${category}`,
      level: mapSeverityToLevel(vuln.severity || 'medium'),
      message: {
        text: vuln.original.description || `A ${category} vulnerability was detected`,
      },
      locations: [],
    };

    // Add location if available
    if (vuln.original.location) {
      result.locations.push({
        physicalLocation: {
          artifactLocation: {
            uri: vuln.original.location.file || 'unknown',
          },
          region: {
            startLine: vuln.original.location.line || 1,
            startColumn: vuln.original.location.column || 1,
          },
        },
      });
    }

    sarifReport.runs[0].results.push(result);
  });

  return sarifReport;
}

/**
 * Map severity to SARIF level
 * @param {string} severity - Vulnerability severity
 * @returns {string} SARIF level
 */
function mapSeverityToLevel(severity) {
  switch (severity.toLowerCase()) {
    case 'critical':
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'note';
    default:
      return 'none';
  }
}

module.exports = {
  generateMarkdownReport,
  writeMarkdownReport,
  generateStructuredReport,
  generateSarifReport,
};
