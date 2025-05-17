# CI/CD Integration Guide

This guide explains how to integrate Audityzer with popular CI/CD platforms for automated security testing of web3 applications.

## Supported CI/CD Platforms

Audityzer supports the following CI/CD platforms:

- GitHub Actions
- GitLab CI
- CircleCI
- _More platforms coming soon_

## Automatic Configuration Generation

You can automatically generate CI configuration files using the `generate-ci-config` command:

```bash
npx Audityzer generate-ci-config <platform> [options]
```

Where `<platform>` is one of: `github`, `gitlab`, or `circle`.

### Options:

| Option                     | Description                                 | Default                   |
| -------------------------- | ------------------------------------------- | ------------------------- |
| `--output <path>`          | Output path for the configuration file      | Platform-specific default |
| `--node-version <version>` | Node.js version to use                      | 18.16                     |
| `--browsers <list>`        | Comma-separated list of browsers to install | chromium                  |
| `--include-security`       | Include security checks                     | true                      |
| `--include-deployment`     | Include deployment validation               | false                     |
| `--include-tests`          | Include test runs                           | true                      |

## GitHub Actions Integration

To integrate with GitHub Actions, run:

```bash
npx Audityzer generate-ci-config github
```

This will create a `.github/workflows/Audityzer.yml` file with the configuration.

## GitLab CI Integration

To integrate with GitLab CI, run:

```bash
npx Audityzer generate-ci-config gitlab
```

This will create a `.gitlab-ci.yml` file with the configuration.

## CircleCI Integration

To integrate with CircleCI, run:

```bash
npx Audityzer generate-ci-config circle
```

This will create a `.circleci/config.yml` file with the configuration.

### Example CircleCI Configuration

```yaml
version: 2.1

orbs:
  node: circleci/node@5.1
  playwright: playwright-community/playwright@1.0.0

jobs:
  web3-security-test:
    docker:
      - image: cimg/node:18.16-browsers

    steps:
      - checkout

      # ... configuration steps ...

      # Run security checks
      - run:
          name: Run Security Checks
          command: npx Audityzer analyze --config ./security-rules.json

      # Validate contract deployments
      - run:
          name: Validate Contract Deployments
          command: npx Audityzer deploy-validate --format md --check-security true

      # ... more steps ...

workflows:
  version: 2
  security-test:
    jobs:
      - web3-security-test
```

## Deploy Validation

The `deploy-validate` command validates contract deployments and checks their verification status on block explorers.

```bash
npx Audityzer deploy-validate [options]
```

### Options:

| Option                      | Description                         | Default                   |
| --------------------------- | ----------------------------------- | ------------------------- |
| `-d, --deploy-dir <path>`   | Deployments directory               | ./deployments             |
| `-o, --output <path>`       | Output directory for reports        | ./test-results/deployment |
| `-n, --networks <networks>` | Networks to check (comma-separated) | All networks              |
| `-f, --format <format>`     | Report format (json,md)             | md                        |
| `-c, --check-verification`  | Check contract verification status  | true                      |
| `-s, --check-security`      | Check for security issues           | true                      |

### Supported Networks

The deployment validator supports the following networks:

- Ethereum (Mainnet, Goerli, Sepolia)
- Polygon (Mainnet, Mumbai)
- BSC (Mainnet, Testnet)
- Arbitrum (One, Goerli)
- Optimism (Mainnet, Goerli)
- Fantom (Opera, Testnet)
- Avalanche (C-Chain, Fuji)
- Base (Mainnet, Goerli)
- zkSync Era (Mainnet, Testnet)
- Linea (Mainnet, Goerli/Testnet)
- Polygon zkEVM (Mainnet, Testnet)

## L2 Network Support

Audityzer now includes support for L2 networks including:

- zkSync Era
- Linea
- Polygon zkEVM
- Base
- Optimism
- Arbitrum

You can validate L2 protocol security rules with:

```bash
npx Audityzer validate-l2-protocol <protocol> --config ./security-rules.json
```

Where `<protocol>` is one of: `zksync`, `linea`, `polygon`, `base`, `optimism`, or `arbitrum`.

## Bug Bounty Platform Integration

Audityzer integrates with bug bounty platforms like Immunefi, Code4rena, and Sherlock.

Generate vulnerability reports with:

```bash
npx Audityzer bounty <platform> [options]
```

Where `<platform>` is one of: `immunefi`, `code4rena`, or `sherlock`.

For Sherlock audit reports with L2 support:

```bash
npx Audityzer bounty sherlock --contest-name your-audit-name
```

## Enterprise Security Features

### Headless Wallet Testing in CI

Audityzer supports headless wallet testing in CI environments where browser UI interactions are not possible. This allows you to:

- Simulate wallet connections in CI pipelines
- Test transaction flows without UI interaction
- Mock wallet responses for testing different scenarios

Example:

```bash
npx Audityzer ci-run --headless=true
```

### Static Analysis Integration

For smart contract projects, Audityzer can integrate with static analysis tools:

- Slither - for vulnerability detection
- Mythril - for symbolic execution analysis
- Solhint - for linting and code quality

To enable static analysis:

```bash
npx Audityzer ci-run --static-analysis=true --contracts-dir=./contracts
```

### Enterprise Reporting with SARIF

Audityzer supports the SARIF (Static Analysis Results Interchange Format) for security reporting, allowing integration with:

- GitHub Security Analysis
- Azure DevOps Security
- Enterprise security dashboards

This will be automatically generated when running in GitHub Actions or Azure DevOps environments.

### Notification System

Audityzer includes an enterprise notification system for security alerts:

```bash
# Generate notification config template
npx Audityzer generate-notification-config

# Enable notifications in CI run
npx Audityzer ci-run --notify=true --notification-config=./notification-config.json
```

Supported notification channels:

- Email (via SMTP)
- Slack
- Custom webhooks

## Platform-Specific Integration

### GitHub Actions

Audityzer integrates with GitHub Actions providing:

- GitHub Security Analysis integration with SARIF
- GitHub check annotations
- Automated issue creation for security vulnerabilities

Example workflow:

```yaml
name: Audityzer Security Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  security-tests:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run Audityzer security tests
        run: npx Audityzer ci-run --reporter=github

      - name: Upload SARIF report
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: test-results/security-results.sarif
```

### GitLab CI

Audityzer integrates with GitLab CI providing:

- GitLab Security Dashboard integration
- Pipeline visualization
- JUnit test reporting

Example .gitlab-ci.yml:

```yaml
Audityzer-security:
  image: node:18
  stage: test
  script:
    - npm ci
    - npx Audityzer ci-run --reporter=gitlab
  artifacts:
    paths:
      - test-results/
    reports:
      junit: test-results/junit-report.xml
      security_report:
        path: test-results/gl-security-report.json
```

### Jenkins

Audityzer integrates with Jenkins pipelines providing:

- JUnit test reporting
- HTML report publishing
- Pipeline integration

Example Jenkinsfile:

```groovy
pipeline {
    agent {
        docker { image 'node:18' }
    }
    stages {
        stage('Security Tests') {
            steps {
                sh 'npm ci'
                sh 'npx Audityzer ci-run --reporter=jenkins'
            }
        }
    }
    post {
        always {
            junit 'test-results/junit-report.xml'
            publishHTML([
                allowMissing: false,
                reportDir: 'test-results',
                reportFiles: 'report.html',
                reportName: 'Security Test Report'
            ])
        }
    }
}
```

### Azure DevOps

Audityzer integrates with Azure DevOps providing:

- Azure security reporting
- Test results integration
- Pipeline tasks

Example azure-pipelines.yml:

```yaml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'
    displayName: 'Install Node.js'

  - script: npm ci
    displayName: 'Install dependencies'

  - script: npx Audityzer ci-run --reporter=azure
    displayName: 'Run Audityzer security tests'

  - task: PublishTestResults@2
    inputs:
      testResultsFormat: 'JUnit'
      testResultsFiles: 'test-results/junit-report.xml'
      testRunTitle: 'Audityzer Security Tests'
    displayName: 'Publish test results'
```

## API Reference

The CI integration module provides a programmatic API for custom integrations:

```javascript
const { createIntegration } = require('Audityzer/core/ci-integration');

// Create integration with all components
const integration = createIntegration({
  // Configuration options
  testDir: './tests',
  outputDir: './test-results',
  configPath: './security-rules.json',

  // Enable headless wallet testing
  headlessWallet: {
    enabled: true,
    accounts: ['0x123...'],
    chainId: '0x1',
  },

  // Enable static analysis
  staticAnalysis: {
    enabled: true,
    tools: {
      slither: true,
      mythril: true,
      solhint: true,
    },
  },

  // Configure notifications
  notification: {
    enabled: true,
    channels: {
      slack: {
        enabled: true,
        webhookUrl: 'https://hooks.slack.com/...',
      },
    },
  },
});

// Run tests programmatically
const results = await integration.executor.execute();
```

## Advanced Configuration

For advanced configuration, including custom security rules, custom reporters, and integration with enterprise security systems, see the [Advanced Configuration Guide](./advanced-configuration.md).

## Troubleshooting

If you encounter issues with the CI integration, check the following:

1. Ensure your CI environment has the necessary permissions
2. Verify your security rules configuration is valid
3. Check that playwright dependencies are installed correctly
4. For static analysis tools, ensure they are installed globally or in your project

For more detailed troubleshooting information, see the [Troubleshooting Guide](./troubleshooting.md).
