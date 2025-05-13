# Bug Bounty Platform Integration

This document covers the bug bounty platform integration features of Web3FuzzForge, which allow you to generate standardized vulnerability reports and submissions for popular bug bounty platforms.

## Overview

Web3FuzzForge includes specialized modules for generating properly formatted vulnerability reports and submissions for several popular bug bounty platforms:

- **Immunefi**: Generate standardized vulnerability submissions for the Immunefi platform
- **Code4rena**: Create contest submissions in the format required by Code4rena
- **Sherlock**: Format security reports according to Sherlock's requirements
- **Bridge Bounty**: Specialized adapter for cross-chain bridge vulnerabilities

These integrations help automate the process of reporting vulnerabilities discovered through Web3FuzzForge's testing tools, ensuring they meet each platform's specific requirements.

## Quick Start

### 1. Generate Immunefi Submissions

```bash
# Generate Immunefi submission from test results
npx web3fuzzforge submit-to-immunefi --input ./test-results/security/report.json
```

### 2. Create Code4rena Contest Submissions

```bash
# Generate Code4rena submissions for a contest
npx web3fuzzforge submit-to-code4rena --contest-id your-contest-name
```

### 3. Generate Sherlock Audit Reports

```bash
# Generate Sherlock audit report
npx web3fuzzforge generate-sherlock-report --contest-name your-audit-name
```

### 4. Generate Bridge Vulnerability Reports

```bash
# Generate bridge vulnerability reports with data from Code4rena and Sherlock
npx web3fuzzforge generate-bridge-reports --fetch-code4rena --fetch-sherlock
```

## Installation

The bounty integration modules are included in the main Web3FuzzForge package. Make sure you're using version 1.1.0 or later:

```bash
npm install web3fuzzforge@latest
```

## Detailed Usage

### Immunefi Submission Generator

The Immunefi Submission Generator creates properly formatted vulnerability reports for submission to the Immunefi platform.

```javascript
const { ImmunefiSubmissionGenerator } = require('web3fuzzforge/core/bounty-integration');

// Create a new instance
const generator = new ImmunefiSubmissionGenerator('./reports/immunefi');

// Load test results from a file
generator.loadTestResults('./test-results/security/report.json');

// Generate and save submissions
const submissions = generator.generateSubmissions();
const savedFiles = generator.saveSubmissions(submissions);

// Create a summary report
const summaryPath = generator.createSummaryReport(submissions);
```

### Code4rena Integration

The Code4rena integration module creates properly formatted contest submissions.

```javascript
const { Code4renaIntegration } = require('web3fuzzforge/core/bounty-integration');

// Create a new instance with contest ID
const c4 = new Code4renaIntegration('your-contest-id', './reports/code4rena');

// Load test results
c4.loadTestResults('./test-results/security/report.json');

// Generate and save submissions
const submissions = c4.generateSubmissions();
const savedFiles = c4.saveSubmissions(submissions);

// Generate metrics report
const metricsPath = c4.generateMetricsReport();
```

### Sherlock Report Formatter

The Sherlock Report Formatter creates audit reports according to Sherlock's specifications.

```javascript
const { SherlockReportFormatter } = require('web3fuzzforge/core/bounty-integration');

// Create a new instance
// Set judging=true to use Sherlock's judging format
const formatter = new SherlockReportFormatter(
  'your-contest-name',
  './reports/sherlock',
  false // judging format (true/false)
);

// Load test results
formatter.loadTestResults('./test-results/security/report.json');

// Generate and save reports
const submissions = formatter.generateSubmissions();
const savedFiles = formatter.saveSubmissions(submissions);
```

### Bridge Bounty Adapter

The Bridge Bounty Adapter specializes in cross-chain bridge vulnerabilities and can generate test templates from existing reports.

```javascript
const { BridgeBountyAdapter } = require('web3fuzzforge/core/bounty-integration');

// Create a new instance
const adapter = new BridgeBountyAdapter('./test-templates/bridge');

// Fetch vulnerability reports from platforms
await adapter.fetchCode4renaReports(10); // Fetch up to 10 reports
await adapter.fetchSherlockReports(10);

// Generate test templates
const templates = await adapter.generateTestTemplates();

// Save templates
const savedFiles = await adapter.saveTestTemplates();

// Generate a report
const report = adapter.generateReport();
```

## CLI Reference

Web3FuzzForge includes a CLI for the bounty integration features.

### Submit to Immunefi

```bash
npx web3fuzzforge submit-to-immunefi [options]
```

**Options:**

| Option                    | Description                      |
| ------------------------- | -------------------------------- |
| `-i, --input <path>`      | Path to test results file        |
| `-o, --output-dir <path>` | Output directory for submissions |

### Submit to Code4rena

```bash
npx web3fuzzforge submit-to-code4rena [options]
```

**Options:**

| Option                    | Description                      |
| ------------------------- | -------------------------------- |
| `-i, --input <path>`      | Path to test results file        |
| `-o, --output-dir <path>` | Output directory for submissions |
| `-c, --contest-id <id>`   | Code4rena contest ID             |

### Generate Sherlock Report

```bash
npx web3fuzzforge generate-sherlock-report [options]
```

**Options:**

| Option                      | Description                  |
| --------------------------- | ---------------------------- |
| `-i, --input <path>`        | Path to test results file    |
| `-o, --output-dir <path>`   | Output directory for reports |
| `-c, --contest-name <name>` | Sherlock contest name        |
| `-j, --judging`             | Use judging format           |

### Generate Bridge Reports

```bash
npx web3fuzzforge generate-bridge-reports [options]
```

**Options:**

| Option                    | Description                  |
| ------------------------- | ---------------------------- |
| `-o, --output-dir <path>` | Output directory for reports |
| `--fetch-code4rena`       | Fetch reports from Code4rena |
| `--fetch-sherlock`        | Fetch reports from Sherlock  |
| `--limit <number>`        | Number of reports to fetch   |

## Customization

Each bounty platform module can be customized with additional options:

```javascript
// Using the factory function for any platform
const { createBountySubmissionGenerator } = require('web3fuzzforge/core/bounty-integration');

// Create a submission generator for Immunefi
const generator = createBountySubmissionGenerator('immunefi', {
  outputDir: './custom-path',
});

// Create a submission generator for Code4rena
const c4Generator = createBountySubmissionGenerator('code4rena', {
  contestId: 'your-contest',
  outputDir: './custom-path',
});

// Create a submission generator for Sherlock
const sherlockGenerator = createBountySubmissionGenerator('sherlock', {
  contestName: 'your-audit',
  outputDir: './custom-path',
  judging: true,
});

// Create a submission generator for bridge vulnerabilities
const bridgeGenerator = createBountySubmissionGenerator('bridge', {
  outputDir: './custom-path',
});
```

## Integration with Test Workflows

You can integrate bounty submission generation into your test workflows:

```javascript
const { test } = require('@playwright/test');
const { ImmunefiSubmissionGenerator } = require('web3fuzzforge/core/bounty-integration');

test('should generate Immunefi submissions after testing', async ({ page }) => {
  // Run your security tests
  // ...

  // Generate submissions from results
  const generator = new ImmunefiSubmissionGenerator('./reports/immunefi');
  generator.setTestResults(testResults);
  const submissions = generator.generateSubmissions();
  const savedFiles = generator.saveSubmissions(submissions);

  console.log(`Generated ${submissions.length} Immunefi submissions`);
});
```

## Related Documentation

- [Security Testing Guide](./security-testing.md)
- [CI/CD Integration Guide](./ci-integration.md)
- [Static Analysis Integration](./static-analysis.md)
