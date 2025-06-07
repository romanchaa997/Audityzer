/**
 * Risk Report Exporter
 * 
 * This module handles exporting risk assessment reports in various formats
 * including PDF, CSV, and JSON.
 */

const fs = require('fs');
const path = require('path');

class RiskReportExporter {
    constructor () {
        this.supportedFormats = ['json', 'csv', 'html', 'markdown'];
    }

    /**
     * Export risk assessment report in specified format
     * @param {Object} riskAssessment - Risk assessment data
     * @param {String} format - Export format (json, csv, html, markdown)
     * @param {String} outputPath - Path to save the exported report
     * @returns {String} - Path to the exported file
     */
    exportReport(riskAssessment, format, outputPath) {
        if (!this.supportedFormats.includes(format.toLowerCase())) {
            throw new Error(`Unsupported export format: ${format}. Supported formats: ${this.supportedFormats.join(', ')}`);
        }

        if (!riskAssessment) {
            throw new Error('No risk assessment data provided for export');
        }

        // Create output directory if it doesn't exist
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        let exportedContent;
        switch (format.toLowerCase()) {
            case 'json':
                exportedContent = this._exportAsJson(riskAssessment);
                break;
            case 'csv':
                exportedContent = this._exportAsCsv(riskAssessment);
                break;
            case 'html':
                exportedContent = this._exportAsHtml(riskAssessment);
                break;
            case 'markdown':
                exportedContent = this._exportAsMarkdown(riskAssessment);
                break;
        }

        fs.writeFileSync(outputPath, exportedContent);
        return outputPath;
    }

    /**
     * Export risk assessment as JSON
     * @private
     */
    _exportAsJson(riskAssessment) {
        return JSON.stringify(riskAssessment, null, 2);
    }

    /**
     * Export risk assessment as CSV
     * @private
     */
    _exportAsCsv(riskAssessment) {
        // Header row
        let csv = 'Vulnerability,Type,Severity,Score,Description\n';

        // Add vulnerability rows
        if (riskAssessment.vulnerabilityScores && riskAssessment.vulnerabilityScores.length > 0) {
            riskAssessment.vulnerabilityScores.forEach(vuln => {
                // Escape any commas in text fields
                const title = `"${vuln.originalVulnerability.title.replace(/"/g, '""')}"`;
                const type = `"${vuln.originalVulnerability.type.replace(/"/g, '""')}"`;
                const severity = `"${vuln.severityLevel.label}"`;
                const score = vuln.finalScore.toFixed(1);
                const description = `"${vuln.originalVulnerability.description.replace(/"/g, '""')}"`;

                csv += `${title},${type},${severity},${score},${description}\n`;
            });
        }

        // Add summary row
        csv += `\n"Overall Risk","${riskAssessment.contractAddress}","${riskAssessment.severityLevel.label}",${riskAssessment.overallScore.toFixed(1)},"${riskAssessment.summary.replace(/"/g, '""')}"\n`;

        return csv;
    }

    /**
     * Export risk assessment as HTML
     * @private
     */
    _exportAsHtml(riskAssessment) {
        // Import the dashboard generator to reuse its HTML generation
        const RiskDashboard = require('./risk-dashboard');
        const dashboard = new RiskDashboard();

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Contract Risk Assessment - ${riskAssessment.contractAddress}</title>
</head>
<body>
    ${dashboard.generateHtmlDashboard(riskAssessment)}
</body>
</html>`;
    }

    /**
     * Export risk assessment as Markdown
     * @private
     */
    _exportAsMarkdown(riskAssessment) {
        let markdown = `# Smart Contract Risk Assessment

## Contract Information

- **Address:** ${riskAssessment.contractAddress}
- **Assessment Date:** ${new Date(riskAssessment.timestamp).toLocaleString()}
- **Overall Risk Score:** ${riskAssessment.overallScore.toFixed(1)} (${riskAssessment.severityLevel.label})
- **Weighted Average Score:** ${riskAssessment.weightedAverageScore.toFixed(1)}

## Risk Summary

${riskAssessment.summary}

## Vulnerability Breakdown

`;

        // Add vulnerability table
        if (riskAssessment.vulnerabilityScores && riskAssessment.vulnerabilityScores.length > 0) {
            markdown += `| Severity | Score | Vulnerability | Type |\n`;
            markdown += `| -------- | ----- | ------------- | ---- |\n`;

            riskAssessment.vulnerabilityScores.forEach(vuln => {
                markdown += `| ${vuln.severityLevel.label} | ${vuln.finalScore.toFixed(1)} | ${vuln.originalVulnerability.title} | ${vuln.originalVulnerability.type} |\n`;
            });

            markdown += `\n`;
        } else {
            markdown += `No vulnerabilities detected.\n\n`;
        }

        // Add remediation section
        markdown += `## Recommended Remediations\n\n`;

        if (riskAssessment.vulnerabilityScores && riskAssessment.vulnerabilityScores.length > 0) {
            // Group by severity
            const criticalVulns = riskAssessment.vulnerabilityScores.filter(v => v.severityLevel.label === 'Critical');
            const highVulns = riskAssessment.vulnerabilityScores.filter(v => v.severityLevel.label === 'High');
            const mediumVulns = riskAssessment.vulnerabilityScores.filter(v => v.severityLevel.label === 'Medium');
            const lowVulns = riskAssessment.vulnerabilityScores.filter(v => v.severityLevel.label === 'Low');

            // Add remediation items for each vulnerability, prioritized by severity
            [...criticalVulns, ...highVulns, ...mediumVulns, ...lowVulns].forEach(vuln => {
                markdown += `### ${vuln.severityLevel.label}: ${vuln.originalVulnerability.title}\n\n`;
                markdown += `${vuln.originalVulnerability.description}\n\n`;
                markdown += `**Recommended actions:**\n\n`;

                vuln.remediation.forEach(item => {
                    markdown += `- ${item}\n`;
                });

                markdown += `\n`;
            });
        } else {
            markdown += `No remediations needed.\n\n`;
        }

        // Add scoring explanation
        markdown += `## How Scores Are Calculated\n\n`;
        markdown += `The risk scores are calculated using a modified CVSS framework that considers both the severity of vulnerabilities and their likelihood of exploitation.\n\n`;
        markdown += `- **Base Score:** Determined by the vulnerability type and its inherent severity\n`;
        markdown += `- **Likelihood Score:** Calculated based on historical exploit data and contract context\n`;
        markdown += `- **Final Score:** Weighted combination of base score and likelihood score\n\n`;
        markdown += `### Severity Levels\n\n`;
        markdown += `- **Critical:** 9.0-10.0 - Severe vulnerabilities that are likely to be exploited\n`;
        markdown += `- **High:** 7.0-8.9 - Significant vulnerabilities that pose substantial risk\n`;
        markdown += `- **Medium:** 4.0-6.9 - Moderate vulnerabilities that should be addressed\n`;
        markdown += `- **Low:** 0.1-3.9 - Minor vulnerabilities with limited impact\n`;
        markdown += `- **None:** 0.0 - No vulnerabilities detected\n\n`;

        markdown += `---\n\n`;
        markdown += `Generated by Audityzer Risk Scoring Engine | ${new Date().toISOString()}\n`;

        return markdown;
    }
}

module.exports = RiskReportExporter;