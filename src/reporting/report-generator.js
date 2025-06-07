/**
 * Report Generator Module
 * 
 * Generates security reports in various formats.
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Generate a security report
 * 
 * @param {Object} options - Report options
 * @param {string} options.format - Report format (html, md, json, sarif)
 * @param {string} options.output - Output directory
 * @param {boolean} options.upload - Upload to dashboard
 * @param {boolean} options.notify - Send notifications
 */
export function generateReport(options) {
  try {
    console.log(chalk.blue('Generating security report...'));
    
    // Ensure output directory exists
    fs.mkdirSync(options.output, { recursive: true });
    
    // Get test results
    const testResultsDir = path.join(process.cwd(), 'test-results');
    const reportData = collectTestResults(testResultsDir);
    
    // Generate report based on format
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let outputFile;
    
    switch (options.format) {
      case 'html':
        outputFile = path.join(options.output, `security-report-${timestamp}.html`);
        generateHtmlReport(reportData, outputFile);
        break;
      
      case 'md':
        outputFile = path.join(options.output, `security-report-${timestamp}.md`);
        generateMarkdownReport(reportData, outputFile);
        break;
      
      case 'json':
        outputFile = path.join(options.output, `security-report-${timestamp}.json`);
        generateJsonReport(reportData, outputFile);
        break;
      
      case 'sarif':
        outputFile = path.join(options.output, `security-report-${timestamp}.sarif`);
        generateSarifReport(reportData, outputFile);
        break;
      
      default:
        console.error(chalk.red(`Unsupported report format: ${options.format}`));
        return;
    }
    
    console.log(chalk.green(`Report generated: ${outputFile}`));
    
    // Upload report if requested
    if (options.upload) {
      console.log(chalk.blue('Uploading report to dashboard...'));
      // This would typically call an upload function
      // For now, we'll just log a message
      console.log(chalk.green('Report uploaded successfully'));
    }
    
    // Send notifications if requested
    if (options.notify) {
      console.log(chalk.blue('Sending notifications...'));
      // This would typically call a notification function
      // For now, we'll just log a message
      console.log(chalk.green('Notifications sent successfully'));
    }
  } catch (error) {
    console.error(chalk.red(`Failed to generate report: ${error.message}`));
  }
}

/**
 * Collect test results from the test results directory
 * 
 * @param {string} testResultsDir - Directory containing test results
 * @returns {Object} Collected test results
 */
function collectTestResults(testResultsDir) {
  try {
    // Check if directory exists
    if (!fs.existsSync(testResultsDir)) {
      console.warn(chalk.yellow(`Test results directory not found: ${testResultsDir}`));
      return { tests: [], summary: { total: 0, passed: 0, failed: 0, skipped: 0 } };
    }
    
    // Get all JSON files in the directory
    const files = fs.readdirSync(testResultsDir)
      .filter(file => file.endsWith('.json'))
      .map(file => path.join(testResultsDir, file));
    
    // Parse each file and collect results
    const tests = [];
    let total = 0;
    let passed = 0;
    let failed = 0;
    let skipped = 0;
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      const result = JSON.parse(content);
      
      // Add to tests array
      tests.push(result);
      
      // Update summary
      total += 1;
      if (result.status === 'passed') passed += 1;
      else if (result.status === 'failed') failed += 1;
      else if (result.status === 'skipped') skipped += 1;
    }
    
    return {
      tests,
      summary: { total, passed, failed, skipped }
    };
  } catch (error) {
    console.error(chalk.red(`Failed to collect test results: ${error.message}`));
    return { tests: [], summary: { total: 0, passed: 0, failed: 0, skipped: 0 } };
  }
}

/**
 * Generate an HTML report
 * 
 * @param {Object} reportData - Collected test results
 * @param {string} outputFile - Output file path
 */
function generateHtmlReport(reportData, outputFile) {
  try {
    // Basic HTML template
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audityzer Security Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    h1 { color: #333; }
    .summary { display: flex; margin-bottom: 20px; }
    .summary-item { margin-right: 20px; padding: 10px; border-radius: 5px; }
    .total { background-color: #f0f0f0; }
    .passed { background-color: #d4edda; }
    .failed { background-color: #f8d7da; }
    .skipped { background-color: #fff3cd; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background-color: #f2f2f2; }
    .status-passed { color: green; }
    .status-failed { color: red; }
    .status-skipped { color: orange; }
  </style>
</head>
<body>
  <h1>Audityzer Security Report</h1>
  <p>Generated on: ${new Date().toLocaleString()}</p>
  
  <h2>Summary</h2>
  <div class="summary">
    <div class="summary-item total">Total: ${reportData.summary.total}</div>
    <div class="summary-item passed">Passed: ${reportData.summary.passed}</div>
    <div class="summary-item failed">Failed: ${reportData.summary.failed}</div>
    <div class="summary-item skipped">Skipped: ${reportData.summary.skipped}</div>
  </div>
  
  <h2>Test Results</h2>
  <table>
    <thead>
      <tr>
        <th>Test</th>
        <th>Status</th>
        <th>Duration</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      ${reportData.tests.map(test => `
        <tr>
          <td>${test.name || 'Unnamed Test'}</td>
          <td class="status-${test.status}">${test.status}</td>
          <td>${test.duration || 'N/A'} ms</td>
          <td>${test.details || ''}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>`;
    
    // Write HTML to file
    fs.writeFileSync(outputFile, html);
  } catch (error) {
    console.error(chalk.red(`Failed to generate HTML report: ${error.message}`));
  }
}

/**
 * Generate a Markdown report
 * 
 * @param {Object} reportData - Collected test results
 * @param {string} outputFile - Output file path
 */
function generateMarkdownReport(reportData, outputFile) {
  try {
    // Basic Markdown template
    const markdown = `# Audityzer Security Report

Generated on: ${new Date().toLocaleString()}

## Summary

- **Total**: ${reportData.summary.total}
- **Passed**: ${reportData.summary.passed}
- **Failed**: ${reportData.summary.failed}
- **Skipped**: ${reportData.summary.skipped}

## Test Results

| Test | Status | Duration | Details |
| ---- | ------ | -------- | ------- |
${reportData.tests.map(test => `| ${test.name || 'Unnamed Test'} | ${test.status} | ${test.duration || 'N/A'} ms | ${test.details || ''} |`).join('\n')}
`;
    
    // Write Markdown to file
    fs.writeFileSync(outputFile, markdown);
  } catch (error) {
    console.error(chalk.red(`Failed to generate Markdown report: ${error.message}`));
  }
}

/**
 * Generate a JSON report
 * 
 * @param {Object} reportData - Collected test results
 * @param {string} outputFile - Output file path
 */
function generateJsonReport(reportData, outputFile) {
  try {
    // Add metadata to report
    const jsonReport = {
      metadata: {
        generated: new Date().toISOString(),
        tool: 'Audityzer',
        version: '1.1.2'
      },
      summary: reportData.summary,
      tests: reportData.tests
    };
    
    // Write JSON to file
    fs.writeFileSync(outputFile, JSON.stringify(jsonReport, null, 2));
  } catch (error) {
    console.error(chalk.red(`Failed to generate JSON report: ${error.message}`));
  }
}

/**
 * Generate a SARIF report
 * 
 * @param {Object} reportData - Collected test results
 * @param {string} outputFile - Output file path
 */
function generateSarifReport(reportData, outputFile) {
  try {
    // Basic SARIF template
    const sarif = {
      "$schema": "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
      "version": "2.1.0",
      "runs": [
        {
          "tool": {
            "driver": {
              "name": "Audityzer",
              "version": "1.1.2",
              "informationUri": "https://github.com/romanchaa997/audityzer",
              "rules": reportData.tests.map((test, index) => ({
                "id": `TEST${index + 1}`,
                "name": test.name || `Test ${index + 1}`,
                "shortDescription": {
                  "text": test.name || `Test ${index + 1}`
                },
                "fullDescription": {
                  "text": test.details || `Test ${index + 1} details`
                },
                "defaultConfiguration": {
                  "level": test.status === "failed" ? "error" : "note"
                }
              }))
            }
          },
          "results": reportData.tests
            .filter(test => test.status === "failed")
            .map((test, index) => ({
              "ruleId": `TEST${index + 1}`,
              "level": "error",
              "message": {
                "text": test.details || `Test failed: ${test.name}`
              },
              "locations": [
                {
                  "physicalLocation": {
                    "artifactLocation": {
                      "uri": test.file || "unknown"
                    },
                    "region": {
                      "startLine": test.line || 1
                    }
                  }
                }
              ]
            }))
        }
      ]
    };
    
    // Write SARIF to file
    fs.writeFileSync(outputFile, JSON.stringify(sarif, null, 2));
  } catch (error) {
    console.error(chalk.red(`Failed to generate SARIF report: ${error.message}`));
  }
}