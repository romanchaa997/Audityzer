# Customizable Reporting Views

Web3FuzzForge provides highly customizable security reporting options, allowing you to generate tailored reports for different stakeholders and purposes.

## Overview

The reporting system allows you to:

- Generate reports in multiple formats (HTML, PDF, Markdown, JSON)
- Customize report content and sections
- Create stakeholder-specific views (technical, executive, audit-ready)
- Save report templates for reuse
- Include interactive visualizations
- Apply custom branding

## Report Types

### Security Audit Reports

Comprehensive security audit reports that include:

- Executive summary
- Vulnerability listings with severity ratings
- Detailed technical findings
- Code snippets and recommendations
- Testing methodology
- Remediation suggestions

```bash
# Generate a complete security audit report
npx web3fuzzforge report audit --format=pdf --output=./reports/security-audit.pdf
```

### Compliance Reports

Reports focused on compliance with industry standards:

- SOC2 compliance
- GDPR requirements
- Financial regulations
- Best practice adherence

```bash
# Generate a compliance-focused report
npx web3fuzzforge report compliance --standard=soc2 --format=html
```

### Executive Summaries

Concise overviews of security status for management:

- Key findings overview
- Risk assessment
- Remediation priorities
- Timeline recommendations

```bash
# Generate an executive summary
npx web3fuzzforge report executive-summary --format=pdf --include-charts
```

### Developer Reports

Detailed technical reports for development teams:

- Code-level issues
- Test coverage analysis
- Security improvement suggestions
- Integration with development tools

```bash
# Generate a developer-focused report
npx web3fuzzforge report developer --format=html --include-code-snippets
```

## Customizing Reports

### Using the Report Builder

The interactive report builder allows you to customize every aspect of your reports:

```bash
# Launch the interactive report builder
npx web3fuzzforge report-builder
```

This opens an interactive web interface where you can:

- Select sections to include/exclude
- Customize the order of sections
- Choose visualization types
- Add corporate branding

### Configuration File Approach

Create a report configuration file for reproducible reports:

```json
{
  "reportType": "security-audit",
  "title": "Smart Contract Security Audit",
  "branding": {
    "logo": "./assets/logo.png",
    "primaryColor": "#2563EB",
    "secondaryColor": "#7C3AED"
  },
  "sections": [
    {
      "id": "executive-summary",
      "title": "Executive Summary",
      "include": true
    },
    {
      "id": "methodology",
      "title": "Methodology",
      "include": true
    },
    {
      "id": "findings",
      "title": "Security Findings",
      "include": true,
      "severityFilter": ["critical", "high", "medium"]
    },
    {
      "id": "code-review",
      "title": "Code Review",
      "include": true
    },
    {
      "id": "recommendations",
      "title": "Recommendations",
      "include": true
    }
  ],
  "visualizations": [
    {
      "id": "severity-breakdown",
      "type": "pie-chart",
      "title": "Issue Severity Breakdown",
      "include": true
    },
    {
      "id": "vulnerability-timeline",
      "type": "timeline",
      "title": "Vulnerability Discovery Timeline",
      "include": false
    }
  ],
  "format": {
    "type": "pdf",
    "orientation": "portrait",
    "pageSize": "A4"
  }
}
```

Use this configuration to generate a report:

```bash
npx web3fuzzforge report --config=./report-config.json --output=./security-audit.pdf
```

## Interactive Report Elements

Add interactive elements to HTML reports:

### Vulnerability Visualizations

```bash
# Generate a report with interactive vulnerability visualization
npx web3fuzzforge report --include-visualizations --format=html
```

This creates an HTML report with interactive elements:

- Expandable vulnerability details
- Visual representation of attack vectors
- Code coverage highlighting
- Interactive severity filters

### Test Coverage Maps

```bash
# Include test coverage maps in your report
npx web3fuzzforge report --include-coverage-maps --format=html
```

## Report Templates

Save and reuse report templates for consistency:

```bash
# Save current report configuration as a template
npx web3fuzzforge report-template save --name="audit-report" --config=./report-config.json

# Use a saved template
npx web3fuzzforge report --template="audit-report" --output=./security-audit.pdf
```

## Exporting to Third-Party Platforms

Export reports directly to security platforms:

```bash
# Export to Immunefi
npx web3fuzzforge report --export=immunefi --format=html

# Export to Code4rena
npx web3fuzzforge report --export=code4rena --format=md

# Export to Sherlock
npx web3fuzzforge report --export=sherlock --format=md
```

## Custom Reporting API

For programmatic report generation, use our API:

```javascript
const { ReportGenerator } = require('web3fuzzforge/reporting');

// Create a custom report programmatically
async function generateCustomReport() {
  const generator = new ReportGenerator({
    reportType: 'security-audit',
    testResults: './test-results/security-results.json',
    customizations: {
      title: 'Custom Security Report',
      includeSections: ['executive-summary', 'findings', 'recommendations'],
      severityFilter: ['critical', 'high'],
    },
  });

  // Generate the report
  const reportPath = await generator.generate({
    format: 'pdf',
    output: './reports/custom-report.pdf',
  });

  console.log(`Report generated at: ${reportPath}`);
}
```

## Best Practices

For effective reporting:

1. **Target Your Audience**: Customize reports based on the intended audience (developers, executives, auditors)
2. **Consistent Branding**: Maintain consistent branding across all reports
3. **Clear Severity Ratings**: Use standardized severity ratings (CVSS scores recommended)
4. **Provide Context**: Include relevant context for all findings
5. **Actionable Recommendations**: Ensure all recommendations are specific and actionable
6. **Regular Updates**: Schedule regular report updates to track progress
7. **Visual Elements**: Use visualizations to make complex information more accessible

## Report Templates Library

We provide a library of ready-to-use report templates:

- **Audit Report**: Comprehensive security audit report
- **Executive Dashboard**: High-level overview for management
- **Developer Summary**: Technical details for development teams
- **Compliance Check**: Regulatory and standard compliance status
- **Bug Bounty Submission**: Formatted for bug bounty platforms

```bash
# List available report templates
npx web3fuzzforge report-templates list

# Generate a report using a template
npx web3fuzzforge report --template=audit-report --output=./audit-report.pdf
```

## Upcoming Features

We're continually enhancing our reporting capabilities:

- **AI-Generated Summaries**: Automatically generate executive summaries
- **Interactive 3D Vulnerability Maps**: Visual representation of vulnerability relationships
- **Comparative Reports**: Compare security status across versions
- **Real-time Dashboards**: Live updates on security status
- **Custom Metric Tracking**: Define and track custom security metrics
