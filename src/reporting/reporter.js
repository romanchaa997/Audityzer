/**
 * Reporter Module
 * 
 * Generates reports in various formats
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

class Reporter {
  constructor (options = {}) {
    this.options = {
      defaultFormat: 'html',
      ...options
    };
  }

  /**
   * Generate a report from test results
   * @param {Object} data - Report data
   * @param {string} outputDir - Output directory
   * @param {string} format - Report format (html, json, md)
   */
  generateReport(data, outputDir = './reports', format = this.options.defaultFormat) {
    try {
      // Ensure output directory exists
      fs.ensureDirSync(outputDir);

      // Generate timestamp for filenames
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

      // Generate reports in requested format
      switch (format.toLowerCase()) {
        case 'html':
          this.generateHtmlReport(data, path.join(outputDir, `report-${timestamp}.html`));
          break;
        case 'json':
          this.generateJsonReport(data, path.join(outputDir, `report-${timestamp}.json`));
          break;
        case 'md':
        case 'markdown':
          this.generateMarkdownReport(data, path.join(outputDir, `report-${timestamp}.md`));
          break;
        default:
          console.warn(chalk.yellow(`Unknown format: ${format}, defaulting to HTML`));
          this.generateHtmlReport(data, path.join(outputDir, `report-${timestamp}.html`));
      }

      // Always generate a JSON report for programmatic access
      if (format.toLowerCase() !== 'json') {
        this.generateJsonReport(data, path.join(outputDir, `report-${timestamp}.json`));
      }

      console.log(chalk.green(`Report generated in ${outputDir}`));
    } catch (error) {
      console.error(chalk.red(`Error generating report: ${error.message}`));
      throw error;
    }
  }

  /**
   * Generate an HTML report
   * @param {Object} data - Report data
   * @param {string} outputPath - Output file path
   */
  generateHtmlReport(data, outputPath) {
    const { url, timestamp, results, playwrightScript, riskAssessment } = data;

    // Count issues by type
    const issueCount = results.reduce((counts, result) => {
      const status = result.status || 'unknown';
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {});

    // Generate HTML content
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audityzer Report - ${url}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
    .report { max-width: 1000px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 30px; }
    .summary { display: flex; justify-content: space-around; margin-bottom: 30px; }
    .summary-item { text-align: center; padding: 15px; border-radius: 5px; }
    .results { margin-top: 30px; }
    .result-item { border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 5px; }
    .success { background-color: #e6ffe6; }
    .warning { background-color: #ffffcc; }
    .error { background-color: #ffe6e6; }
    .code-block { background-color: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
    pre { margin: 0; }
    .risk-assessment { margin-top: 30px; }
  </style>
</head>
<body>
  <div class="report">
    <div class="header">
      <h1>Audityzer Test Report</h1>
      <p>Target: ${url}</p>
      <p>Generated: ${new Date(timestamp).toLocaleString()}</p>
    </div>
    
    <div class="summary">
      <div class="summary-item success">
        <h3>Passed</h3>
        <p>${issueCount.success || 0}</p>
      </div>
      <div class="summary-item warning">
        <h3>Warnings</h3>
        <p>${issueCount.warning || 0}</p>
      </div>
      <div class="summary-item error">
        <h3>Errors</h3>
        <p>${issueCount.error || 0}</p>
      </div>
    </div>
    
    <div class="results">
      <h2>Test Results</h2>
      ${results.map(result => `
        <div class="result-item ${result.status || 'unknown'}">
          <h3>${result.type || 'Test'}</h3>
          <p>${result.details || 'No details provided'}</p>
          ${result.riskLevel ? `<p>Risk Level: ${result.riskLevel}</p>` : ''}
          ${result.riskScore ? `<p>Risk Score: ${result.riskScore.toFixed(1)}</p>` : ''}
          ${result.remediation ? `<p>Remediation: ${result.remediation}</p>` : ''}
          <p>Timestamp: ${new Date(result.timestamp).toLocaleString()}</p>
        </div>
      `).join('')}
    </div>
    
    ${playwrightScript ? `
    <div class="playwright-script">
      <h2>Generated Playwright Script</h2>
      <div class="code-block">
        <pre><code>${playwrightScript}</code></pre>
      </div>
    </div>
    ` : ''}
    
    ${riskAssessment ? `
    <div class="risk-assessment">
      <h2>Risk Assessment</h2>
      <p>Overall Risk Score: ${riskAssessment.overallScore.toFixed(1)} (${riskAssessment.severityLevel.label})</p>
      
      <h3>Vulnerabilities</h3>
      ${riskAssessment.vulnerabilityScores.map(score => `
        <div class="result-item ${score.severityLevel.level}">
          <h4>${score.originalVulnerability.name}</h4>
          <p>${score.originalVulnerability.description}</p>
          <p>Severity: ${score.severityLevel.label} (${score.finalScore.toFixed(1)})</p>
          <p>Location: ${score.originalVulnerability.location}</p>
          
          <h4>Remediation Steps:</h4>
          <ul>
            ${score.remediation.map(step => `<li>${step}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
    ` : ''}
  </div>
</body>
</html>`;

    // Write HTML to file
    fs.writeFileSync(outputPath, html);
  }

  /**
   * Generate a JSON report
   * @param {Object} data - Report data
   * @param {string} outputPath - Output file path
   */
  generateJsonReport(data, outputPath) {
    // Write JSON to file
    fs.writeJsonSync(outputPath, data, { spaces: 2 });
  }

  /**
   * Generate a Markdown report
   * @param {Object} data - Report data
   * @param {string} outputPath - Output file path
   */
  generateMarkdownReport(data, outputPath) {
    const { url, timestamp, results, playwrightScript, riskAssessment } = data;

    // Count issues by type
    const issueCount = results.reduce((counts, result) => {
      const status = result.status || 'unknown';
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {});

    // Generate Markdown content
    let markdown = `# Audityzer Test Report

## Target: ${url}

**Generated:** ${new Date(timestamp).toLocaleString()}

## Summary

- **Passed:** ${issueCount.success || 0}
- **Warnings:** ${issueCount.warning || 0}
- **Errors:** ${issueCount.error || 0}

## Test Results

`;

    results.forEach(result => {
      markdown += `### ${result.type || 'Test'}

`;
      markdown += `- **Status:** ${result.status || 'Unknown'}
`;
      markdown += `- **Details:** ${result.details || 'No details provided'}
`;

      if (result.riskLevel) {
        markdown += `- **Risk Level:** ${result.riskLevel}
`;
      }

      if (result.riskScore) {
        markdown += `- **Risk Score:** ${result.riskScore.toFixed(1)}
`;
      }

      if (result.remediation) {
        markdown += `- **Remediation:** ${result.remediation}
`;
      }

      markdown += `- **Timestamp:** ${new Date(result.timestamp).toLocaleString()}

`;
    });

    if (playwrightScript) {
      markdown += `## Generated Playwright Script

\`\`\`javascript
${playwrightScript}
\`\`\`

`;
    }

    if (riskAssessment) {
      markdown += `## Risk Assessment

`;
      markdown += `**Overall Risk Score:** ${riskAssessment.overallScore.toFixed(1)} (${riskAssessment.severityLevel.label})

`;

      markdown += `### Vulnerabilities

`;

      riskAssessment.vulnerabilityScores.forEach(score => {
        markdown += `#### ${score.originalVulnerability.name}

`;
        markdown += `- **Description:** ${score.originalVulnerability.description}
`;
        markdown += `- **Severity:** ${score.severityLevel.label} (${score.finalScore.toFixed(1)})
`;
        markdown += `- **Location:** ${score.originalVulnerability.location}

`;

        markdown += `**Remediation Steps:**

`;
        score.remediation.forEach(step => {
          markdown += `- ${step}
`;
        });

        markdown += `
`;
      });
    }

    // Write Markdown to file
    fs.writeFileSync(outputPath, markdown);
  }
}

export default Reporter;