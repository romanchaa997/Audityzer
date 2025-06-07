# Risk Scoring Engine for Smart Contracts

The Risk Scoring Engine is a comprehensive system for evaluating smart contract security risks based on the severity of detected vulnerabilities and their exploit likelihood. It helps users prioritize security issues and make informed decisions about their contracts.

## Features

- **CVSS-Based Severity Classification**: Uses a modified version of the Common Vulnerability Scoring System (CVSS) framework to classify vulnerabilities by severity.
- **Exploit Likelihood Calculation**: Estimates the likelihood of exploitation based on historical vulnerability data and contract context.
- **Weighted Scoring Algorithm**: Combines severity and likelihood scores to produce a final risk score.
- **Visual Risk Dashboard**: Provides color-coded indicators and detailed explanations of risks.
- **Actionable Remediation Suggestions**: Offers specific recommendations for addressing each identified vulnerability.
- **Customizable Risk Thresholds**: Allows users to adjust risk thresholds based on their risk tolerance.
- **Multi-Format Export**: Supports exporting risk reports in HTML, JSON, CSV, and Markdown formats.

## Components

### RiskScoringEngine

The core component that calculates risk scores based on vulnerability data and contract context.

```javascript
const { RiskScoringEngine } = require('./risk-scoring');

// Initialize with custom options
const riskEngine = new RiskScoringEngine({
  weights: { severity: 0.7, likelihood: 0.3 },
  thresholds: { low: 3.0, medium: 6.0, high: 8.5 }
});

// Calculate risk score for a vulnerability
const score = riskEngine.calculateVulnerabilityRiskScore(vulnerability);

// Calculate overall contract risk
const contractRisk = riskEngine.calculateContractRiskScore(vulnerabilities, contractAddress);
```

### RiskDashboard

Generates visual dashboards for risk assessment data.

```javascript
const { RiskDashboard } = require('./risk-scoring');

const dashboard = new RiskDashboard();

// Generate HTML dashboard
const htmlDashboard = dashboard.generateHtmlDashboard(riskAssessment);

// Generate JSON representation
const jsonDashboard = dashboard.generateJsonDashboard(riskAssessment);
```

### RiskReportExporter

Exports risk assessment reports in various formats.

```javascript
const { RiskReportExporter } = require('./risk-scoring');

const exporter = new RiskReportExporter();

// Export in different formats
exporter.exportReport(riskAssessment, 'json', './reports/risk-assessment.json');
exporter.exportReport(riskAssessment, 'csv', './reports/risk-assessment.csv');
exporter.exportReport(riskAssessment, 'html', './reports/risk-assessment.html');
exporter.exportReport(riskAssessment, 'markdown', './reports/risk-assessment.md');
```

## Risk Score Calculation

Risk scores are calculated using the following approach:

1. **Base Score**: Determined by the vulnerability type and its inherent severity (0-10 scale)
2. **Likelihood Score**: Calculated based on historical exploit data and contract context (0-10 scale)
3. **Final Score**: Weighted combination of base score and likelihood score

### Severity Levels

- **Critical**: 9.0-10.0 - Severe vulnerabilities that are likely to be exploited
- **High**: 7.0-8.9 - Significant vulnerabilities that pose substantial risk
- **Medium**: 4.0-6.9 - Moderate vulnerabilities that should be addressed
- **Low**: 0.1-3.9 - Minor vulnerabilities with limited impact
- **None**: 0.0 - No vulnerabilities detected

## Contract Context Factors

The following context factors are considered when calculating exploit likelihood:

- **TVL (Total Value Locked)**: Higher TVL increases the likelihood of targeting
- **Contract Age**: Newer contracts may have more undiscovered vulnerabilities
- **Audit History**: More audits generally reduce exploit likelihood

## Usage in CLI

The risk scoring engine is integrated into the Audityzer CLI with the following options:

```bash
audityzer test <url> --security --risk-threshold <low|medium|high>
```

The `--risk-threshold` option allows customizing the sensitivity of risk detection:

- `low`: More lenient thresholds, fewer high-severity findings
- `medium`: Standard CVSS thresholds (default)
- `high`: More stringent thresholds, more high-severity findings