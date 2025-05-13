# Codecov Integration for Web3FuzzForge

This guide explains how the Web3FuzzForge project is integrated with Codecov for tracking test results and coverage.

## Overview

The integration with Codecov provides:

1. **Test Result Reporting**: Tracks passing, failing, and skipped tests with detailed information
2. **Coverage Reporting**: Shows which parts of the codebase are covered by tests
3. **PR Comments**: Automatic comments on pull requests showing test status and coverage changes
4. **Dashboard Visualization**: Web interface for exploring test results and coverage data

## How It Works

The integration consists of these key components:

1. **Jest and Playwright Configuration**: Test frameworks configured to output JUnit XML reports
2. **Codecov CLI**: Used to upload test results and coverage data
3. **GitHub Actions Workflow**: Automates the testing and reporting process
4. **codecov.yml**: Configuration file for customizing Codecov behavior

## Running Tests Locally with Codecov Reporting

To run tests locally and generate Codecov reports:

```bash
# Run unit tests with coverage and JUnit reports
npm run codecov:junit

# Run E2E tests with JUnit reports
npm run codecov:e2e:junit

# Generate and upload both test results and coverage
npm run codecov:generate-and-upload
```

## CI/CD Integration

The GitHub Actions workflow automatically:

1. Runs tests on each pull request and push to main branches
2. Generates JUnit XML reports for test results
3. Uploads test results to Codecov using the CLI
4. Uploads coverage data to Codecov

## Available Scripts

The following npm scripts are available for Codecov integration:

- `npm run test:coverage`: Run Jest tests with coverage reporting
- `npm run test:e2e:coverage`: Run Playwright E2E tests with coverage reporting
- `npm run codecov:junit`: Generate JUnit XML test reports with Jest
- `npm run codecov:e2e:junit`: Generate JUnit XML test reports with Playwright
- `npm run codecov:generate-and-upload`: Generate and upload both reports to Codecov

## Configuring Codecov

You can customize the Codecov integration by editing the `codecov.yml` file. Some key settings include:

```yaml
codecov:
  require_ci_to_pass: yes # Whether CI success is required for upload

coverage:
  precision: 2 # Decimal places in coverage reporting
  round: down # How to round coverage numbers
  range: '70...100' # Coverage range for coloring

  status:
    project: # Project-wide coverage thresholds
      default:
        target: auto
        threshold: 5%
    patch: # Coverage thresholds for PR changes only
      default:
        target: auto
        threshold: 10%
```

## Viewing Results

After running tests and uploading to Codecov:

1. Visit the [Codecov Dashboard](https://codecov.io) to view results
2. Check PR comments for test result and coverage summaries
3. Explore coverage reports to identify areas needing more tests

## Troubleshooting

- **Missing Reports**: Ensure the reports directory exists by running `npm run pretest`
- **Upload Failures**: Check that you have the correct Codecov token in your environment
- **Format Issues**: Verify the JUnit XML reports are being generated correctly
- **CI Issues**: Check the GitHub Actions logs for detailed error information
