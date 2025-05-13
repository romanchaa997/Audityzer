#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const REPORT_DIR = path.join(process.cwd(), 'reports');
const TEST_RESULTS_DIR = path.join(process.cwd(), 'test-results');
const PLAYWRIGHT_REPORT_DIR = path.join(process.cwd(), 'playwright-report');

// Parse command-line arguments
const args = process.argv.slice(2);
const formatArg = args.find(arg => arg === '-f' || arg === '--format');
const formatIndex = args.indexOf(formatArg);
const format = formatIndex !== -1 && formatIndex + 1 < args.length ? args[formatIndex + 1] : 'html';
const shouldUploadToCloud = args.includes('-c') || args.includes('--cloud');

// Ensure reports directory exists
fs.ensureDirSync(REPORT_DIR);

// Define security vulnerabilities
const vulnerabilities = [
  {
    id: 'eth-sign-phishing',
    name: 'Phishing via eth_sign Misuse',
    description: 'Detects unsafe usage of eth_sign that could lead to phishing attacks',
    severity: 'High',
    testFile: 'eth-sign-phishing.test.ts'
  },
  {
    id: 'signature-replay',
    name: 'Signature Replay Attack',
    description: 'Detects when signed messages can be replayed due to missing nonce or expiration',
    severity: 'Critical',
    testFile: 'signature-replay-attack.test.ts'
  },
  {
    id: 'access-control',
    name: 'Access Control Vulnerability',
    description: 'Detects missing or insufficient access controls in smart contracts',
    severity: 'Critical',
    testFile: 'access-control-vulnerability.test.ts'
  },
  {
    id: 'reentrancy',
    name: 'Reentrancy Attack',
    description: 'Detects reentrancy vulnerabilities in smart contracts',
    severity: 'Critical',
    testFile: 'reentrancy-attack.test.ts'
  },
  {
    id: 'oracle-manipulation',
    name: 'Oracle Manipulation',
    description: 'Detects vulnerabilities in price oracle implementations',
    severity: 'High',
    testFile: 'oracle-manipulation.test.ts'
  },
  {
    id: 'front-running',
    name: 'Front-Running Vulnerability',
    description: 'Detects potential front-running vulnerabilities in transaction ordering',
    severity: 'Medium',
    testFile: 'front-running-detection.test.ts'
  }
];

// Function to run security tests if requested
async function runSecurityTests() {
  console.log('Running security tests...');
  try {
    execSync('npm run test:security', { stdio: 'inherit' });
    console.log('Security tests completed.');
    return true;
  } catch (error) {
    console.error('Error running security tests:', error);
    return false;
  }
}

// Function to get test results
function getTestResults() {
  const results = {};
  
  vulnerabilities.forEach(vuln => {
    // Look for test results for each vulnerability type
    const testFile = path.join(TEST_RESULTS_DIR, `${vuln.id}-results.json`);
    const playwrightResultsGlob = path.join(PLAYWRIGHT_REPORT_DIR, '*.json');
    
    try {
      // Try to directly read test result if available
      if (fs.existsSync(testFile)) {
        const resultData = fs.readJsonSync(testFile);
        results[vuln.id] = {
          ...vuln,
          passed: resultData.passed || false,
          details: resultData.details || 'No details available'
        };
      } else {
        // Otherwise, use heuristics to determine results
        const testFilePath = path.join('examples', 'security-bug-tests', vuln.testFile);
        if (fs.existsSync(testFilePath)) {
          results[vuln.id] = {
            ...vuln,
            passed: undefined, // Unknown state
            details: 'Test exists but no results found'
          };
        } else {
          results[vuln.id] = {
            ...vuln,
            passed: false,
            details: 'Test not implemented yet'
          };
        }
      }
    } catch (error) {
      console.error(`Error processing results for ${vuln.id}:`, error);
      results[vuln.id] = {
        ...vuln,
        passed: false,
        details: 'Error processing results'
      };
    }
  });
  
  return results;
}

// Generate HTML report
function generateHtmlReport(results) {
  const reportPath = path.join(REPORT_DIR, 'security-report.html');
  
  const resultRows = Object.values(results).map(result => {
    const statusColor = result.passed === undefined ? 'gray' : result.passed ? 'green' : 'red';
    const statusText = result.passed === undefined ? 'Unknown' : result.passed ? 'Passed' : 'Failed';
    const severityColor = getSeverityColor(result.severity);
    
    return `
    <tr>
      <td>${result.name}</td>
      <td style="color: ${severityColor};">${result.severity}</td>
      <td>${result.description}</td>
      <td style="color: ${statusColor};">${statusText}</td>
      <td>${result.details || ''}</td>
    </tr>
    `;
  }).join('');
  
  const summaryStats = calculateSummaryStats(results);
  
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web3 Security Test Report</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 20px;
        color: #333;
      }
      
      h1, h2 {
        color: #2c3e50;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .summary-boxes {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
      }
      
      .summary-box {
        background: #f8f9fa;
        border-left: 4px solid #3498db;
        padding: 15px;
        width: 23%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }
      
      .summary-box.critical {
        border-left-color: #e74c3c;
      }
      
      .summary-box.tests {
        border-left-color: #2ecc71;
      }
      
      .summary-box.warnings {
        border-left-color: #f39c12;
      }
      
      .summary-box h3 {
        margin-top: 0;
        margin-bottom: 5px;
        color: #555;
        font-size: 16px;
      }
      
      .summary-box p {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
      }
      
      th, td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
      
      th {
        background-color: #f8f9fa;
        font-weight: bold;
      }
      
      tr:hover {
        background-color: #f8f9fa;
      }
      
      .chart-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
      }
      
      .chart {
        width: 48%;
        background: #f8f9fa;
        padding: 20px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }
      
      footer {
        margin-top: 50px;
        text-align: center;
        color: #777;
        font-size: 14px;
      }
      
      @media print {
        body {
          padding: 0;
        }
        
        .container {
          max-width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Web3 Security Test Report</h1>
      <p>Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
      
      <div class="summary-boxes">
        <div class="summary-box tests">
          <h3>Tests Run</h3>
          <p>${summaryStats.testsImplemented}</p>
        </div>
        <div class="summary-box">
          <h3>Tests Passed</h3>
          <p>${summaryStats.testsPassed}</p>
        </div>
        <div class="summary-box warnings">
          <h3>Warnings</h3>
          <p>${summaryStats.warnings}</p>
        </div>
        <div class="summary-box critical">
          <h3>Critical Issues</h3>
          <p>${summaryStats.critical}</p>
        </div>
      </div>
      
      <h2>Security Test Results</h2>
      <table>
        <thead>
          <tr>
            <th>Vulnerability</th>
            <th>Severity</th>
            <th>Description</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          ${resultRows}
        </tbody>
      </table>
      
      <div class="chart-container">
        <div class="chart">
          <h3>Severity Distribution</h3>
          <div id="severity-chart">
            <p>Critical: ${summaryStats.severityCounts.Critical || 0}</p>
            <p>High: ${summaryStats.severityCounts.High || 0}</p>
            <p>Medium: ${summaryStats.severityCounts.Medium || 0}</p>
            <p>Low: ${summaryStats.severityCounts.Low || 0}</p>
          </div>
        </div>
        <div class="chart">
          <h3>Test Status</h3>
          <div id="status-chart">
            <p>Passed: ${summaryStats.testsPassed}</p>
            <p>Failed: ${summaryStats.testsFailed}</p>
            <p>Unknown: ${summaryStats.testsUnknown}</p>
          </div>
        </div>
      </div>
      
      <footer>
        <p>Generated by Web3 Security Test Kit</p>
      </footer>
    </div>
  </body>
  </html>
  `;
  
  fs.writeFileSync(reportPath, htmlContent);
  console.log(`HTML report generated: ${reportPath}`);
  return reportPath;
}

// Generate Markdown report
function generateMarkdownReport(results) {
  const reportPath = path.join(REPORT_DIR, 'security-report.md');
  
  const resultRows = Object.values(results).map(result => {
    const statusText = result.passed === undefined ? 'Unknown' : result.passed ? '✅ Passed' : '❌ Failed';
    
    return `
### ${result.name}
- **Severity**: ${result.severity}
- **Description**: ${result.description}
- **Status**: ${statusText}
- **Details**: ${result.details || 'No details available'}
    `;
  }).join('\n\n');
  
  const summaryStats = calculateSummaryStats(results);
  
  const mdContent = `
# Web3 Security Test Report

*Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}*

## Summary

- **Tests Run**: ${summaryStats.testsImplemented}
- **Tests Passed**: ${summaryStats.testsPassed}
- **Warnings**: ${summaryStats.warnings}
- **Critical Issues**: ${summaryStats.critical}

## Security Test Results

${resultRows}

## Severity Distribution

- Critical: ${summaryStats.severityCounts.Critical || 0}
- High: ${summaryStats.severityCounts.High || 0}
- Medium: ${summaryStats.severityCounts.Medium || 0}
- Low: ${summaryStats.severityCounts.Low || 0}

## Test Status

- Passed: ${summaryStats.testsPassed}
- Failed: ${summaryStats.testsFailed}
- Unknown: ${summaryStats.testsUnknown}

---

Generated by Web3 Security Test Kit
  `;
  
  fs.writeFileSync(reportPath, mdContent);
  console.log(`Markdown report generated: ${reportPath}`);
  return reportPath;
}

// Helper functions
function getSeverityColor(severity) {
  const colors = {
    'Critical': '#e74c3c',
    'High': '#e67e22',
    'Medium': '#f39c12',
    'Low': '#3498db',
  };
  
  return colors[severity] || '#333';
}

function calculateSummaryStats(results) {
  const stats = {
    testsImplemented: Object.values(results).filter(r => r.testFile && fs.existsSync(path.join('examples', 'security-bug-tests', r.testFile))).length,
    testsPassed: Object.values(results).filter(r => r.passed === true).length,
    testsFailed: Object.values(results).filter(r => r.passed === false).length,
    testsUnknown: Object.values(results).filter(r => r.passed === undefined).length,
    warnings: 0,
    critical: 0,
    severityCounts: {}
  };
  
  // Count by severity
  Object.values(results).forEach(result => {
    if (!stats.severityCounts[result.severity]) {
      stats.severityCounts[result.severity] = 0;
    }
    stats.severityCounts[result.severity]++;
    
    if (result.passed === false) {
      if (result.severity === 'Critical') {
        stats.critical++;
      } else if (['High', 'Medium'].includes(result.severity)) {
        stats.warnings++;
      }
    }
  });
  
  return stats;
}

// Function to upload report to cloud
async function uploadReportToCloud(reportPath) {
  if (!shouldUploadToCloud) return;
  
  console.log('Uploading report to cloud storage...');
  
  try {
    // Import the Firebase report service
    const reportService = require('../src/core/services/report-service').default;
    
    // Create report metadata
    const timestamp = new Date().toISOString();
    const reportName = `Security Report - ${timestamp}`;
    
    // Save report metadata to Firestore
    const reportData = {
      name: reportName,
      type: format,
      timestamp: timestamp,
      generatedBy: process.env.USER || 'Unknown'
    };
    
    const reportId = await reportService.saveReport(reportData);
    
    // Upload the report file to Firebase Storage
    const downloadUrl = await reportService.uploadReportFile(reportPath, reportId);
    
    console.log(`Report uploaded successfully. Download URL: ${downloadUrl}`);
    console.log(`Report ID: ${reportId}`);
    
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading report to cloud:', error);
    throw error;
  }
}

// Main function
async function main() {
  console.log('Generating security report...');
  
  // Collect test results
  const results = getTestResults();
  
  // Generate report in the requested format
  let reportPath;
  
  if (format === 'md' || format === 'markdown') {
    reportPath = generateMarkdownReport(results);
  } else {
    // Default to HTML
    reportPath = generateHtmlReport(results);
  }
  
  // Upload report if requested
  if (shouldUploadToCloud) {
    await uploadReportToCloud(reportPath);
  }
  
  console.log('Report generation complete.');
}

// Run the main function
main().catch(error => {
  console.error('Error generating report:', error);
  process.exit(1);
});
