/**
 * CI Integration Module
 * 
 * Provides integration with CI/CD systems and generates test scripts
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

/**
 * Generate a Playwright test script based on configuration
 * @param {Object} config - Configuration object
 * @param {string} config.url - URL of the dApp to test
 * @param {string} config.wallet - Wallet type to use
 * @param {Array} config.tests - Array of test types to include
 * @returns {string} Generated Playwright script
 */
function generatePlaywrightScript(config) {
  const { url, wallet = 'metamask', tests = ['connect'] } = config;

  // Start building the script
  let script = `// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Audityzer automated tests for ${url}', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dApp
    await page.goto('${url}');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });
`;

  // Add wallet connection test if requested
  if (tests.includes('connect')) {
    script += `
  test('should connect to ${wallet} wallet', async ({ page }) => {
    // Find and click the connect wallet button
    // This selector may need to be adjusted based on the specific dApp
    const connectButton = page.getByRole('button', { name: /connect|wallet|connect wallet/i });
    await expect(connectButton).toBeVisible({ timeout: 5000 });
    await connectButton.click();
    
    // Handle wallet connection dialog
    // This will depend on the specific wallet and dApp implementation
    const walletOption = page.getByText('${wallet}', { exact: false });
    if (await walletOption.isVisible({ timeout: 3000 }).catch(() => false)) {
      await walletOption.click();
    }
    
    // Wait for connection confirmation
    // This selector may need to be adjusted based on the specific dApp
    const connectedIndicator = page.getByText(/connected|account|address/i);
    await expect(connectedIndicator).toBeVisible({ timeout: 10000 });
  });
`;
  }

  // Add transaction test if requested
  if (tests.includes('transaction')) {
    script += `
  test('should initiate and confirm a transaction', async ({ page }) => {
    // First connect the wallet
    const connectButton = page.getByRole('button', { name: /connect|wallet|connect wallet/i });
    await expect(connectButton).toBeVisible({ timeout: 5000 });
    await connectButton.click();
    
    // Handle wallet connection dialog
    const walletOption = page.getByText('${wallet}', { exact: false });
    if (await walletOption.isVisible({ timeout: 3000 }).catch(() => false)) {
      await walletOption.click();
    }
    
    // Wait for connection confirmation
    const connectedIndicator = page.getByText(/connected|account|address/i);
    await expect(connectedIndicator).toBeVisible({ timeout: 10000 });
    
    // Find and click a button that initiates a transaction
    // This selector may need to be adjusted based on the specific dApp
    const transactionButton = page.getByRole('button', { name: /send|transfer|swap|buy|sell|mint|stake|claim/i });
    await expect(transactionButton).toBeVisible({ timeout: 5000 });
    await transactionButton.click();
    
    // Handle transaction confirmation in the wallet
    // This will depend on the specific wallet and dApp implementation
    const confirmButton = page.getByRole('button', { name: /confirm|approve|accept/i });
    await expect(confirmButton).toBeVisible({ timeout: 10000 });
    await confirmButton.click();
    
    // Wait for transaction confirmation
    // This selector may need to be adjusted based on the specific dApp
    const transactionConfirmation = page.getByText(/success|confirmed|transaction|hash/i);
    await expect(transactionConfirmation).toBeVisible({ timeout: 15000 });
  });
`;
  }

  // Add signature test if requested
  if (tests.includes('sign')) {
    script += `
  test('should request and confirm a signature', async ({ page }) => {
    // First connect the wallet
    const connectButton = page.getByRole('button', { name: /connect|wallet|connect wallet/i });
    await expect(connectButton).toBeVisible({ timeout: 5000 });
    await connectButton.click();
    
    // Handle wallet connection dialog
    const walletOption = page.getByText('${wallet}', { exact: false });
    if (await walletOption.isVisible({ timeout: 3000 }).catch(() => false)) {
      await walletOption.click();
    }
    
    // Wait for connection confirmation
    const connectedIndicator = page.getByText(/connected|account|address/i);
    await expect(connectedIndicator).toBeVisible({ timeout: 10000 });
    
    // Find and click a button that initiates a signature request
    // This selector may need to be adjusted based on the specific dApp
    const signButton = page.getByRole('button', { name: /sign|signature|message|verify/i });
    await expect(signButton).toBeVisible({ timeout: 5000 });
    await signButton.click();
    
    // Handle signature confirmation in the wallet
    // This will depend on the specific wallet and dApp implementation
    const signConfirmation = page.getByRole('button', { name: /sign|confirm|approve/i });
    await expect(signConfirmation).toBeVisible({ timeout: 10000 });
    await signConfirmation.click();
    
    // Wait for signature confirmation
    // This selector may need to be adjusted based on the specific dApp
    const signatureConfirmation = page.getByText(/signed|verified|success|signature/i);
    await expect(signatureConfirmation).toBeVisible({ timeout: 10000 });
  });
`;
  }

  // Close the test describe block
  script += '})';

  return script;
}

/**
 * Generate a GitHub Actions workflow file
 * @param {Object} config - Configuration object
 * @param {string} config.name - Workflow name
 * @param {string} config.url - URL of the dApp to test
 * @param {string} config.wallet - Wallet type to use
 * @param {Array} config.tests - Array of test types to include
 * @returns {string} Generated GitHub Actions workflow file
 */
function generateGitHubWorkflow(config) {
  const { name = 'Audityzer Tests', url, wallet = 'metamask', tests = ['connect'] } = config;

  return `name: ${name}

on:
  schedule:
    - cron: '0 0 * * *'  # Run daily at midnight
  workflow_dispatch:     # Allow manual triggering
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  security-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install chromium
      
      - name: Run Audityzer tests
        run: npm run test -- ${url} --wallet ${wallet} --security
        env:
          TARGET_URL: ${url}
          MOCK_MODE: 'true'
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: audityzer-reports
          path: ./audityzer-reports/
          retention-days: 30
`;
}

/**
 * Generate a GitLab CI configuration file
 * @param {Object} config - Configuration object
 * @param {string} config.url - URL of the dApp to test
 * @param {string} config.wallet - Wallet type to use
 * @param {Array} config.tests - Array of test types to include
 * @returns {string} Generated GitLab CI configuration file
 */
function generateGitLabCI(config) {
  const { url, wallet = 'metamask', tests = ['connect'] } = config;

  return `stages:
  - test

audityzer-security-tests:
  stage: test
  image: node:18
  script:
    - npm ci
    - npx playwright install chromium
    - npm run test -- ${url} --wallet ${wallet} --security
  artifacts:
    paths:
      - ./audityzer-reports/
    expire_in: 1 week
  variables:
    TARGET_URL: ${url}
    MOCK_MODE: 'true'
  rules:
    - if: $CI_PIPELINE_SOURCE == 'schedule'
    - if: $CI_PIPELINE_SOURCE == 'web'
    - if: $CI_COMMIT_BRANCH == 'main' || $CI_COMMIT_BRANCH == 'master'
    - if: $CI_MERGE_REQUEST_ID
`;
}

/**
 * Generate a CircleCI configuration file
 * @param {Object} config - Configuration object
 * @param {string} config.url - URL of the dApp to test
 * @param {string} config.wallet - Wallet type to use
 * @param {Array} config.tests - Array of test types to include
 * @returns {string} Generated CircleCI configuration file
 */
function generateCircleCI(config) {
  const { url, wallet = 'metamask', tests = ['connect'] } = config;

  return `version: 2.1

jobs:
  security-tests:
    docker:
      - image: cimg/node:18.17
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package.json" }}
            - v1-dependencies-
      - run: npm ci
      - save_cache:
          paths:
            - node_modules
          key: v1-dependencies-{{ checksum "package.json" }}
      - run: npx playwright install chromium
      - run:
          name: Run Audityzer tests
          command: npm run test -- ${url} --wallet ${wallet} --security
          environment:
            TARGET_URL: ${url}
            MOCK_MODE: 'true'
      - store_artifacts:
          path: ./audityzer-reports/
          destination: reports

workflows:
  version: 2
  scheduled-workflow:
    triggers:
      - schedule:
          cron: "0 0 * * *"
          filters:
            branches:
              only:
                - main
                - master
    jobs:
      - security-tests
  main-workflow:
    jobs:
      - security-tests:
          filters:
            branches:
              only:
                - main
                - master
            tags:
              only: /^v.*/
`;
}

/**
 * Generate a Jenkins pipeline file
 * @param {Object} config - Configuration object
 * @param {string} config.url - URL of the dApp to test
 * @param {string} config.wallet - Wallet type to use
 * @param {Array} config.tests - Array of test types to include
 * @returns {string} Generated Jenkins pipeline file
 */
function generateJenkinsPipeline(config) {
  const { url, wallet = 'metamask', tests = ['connect'] } = config;

  return `pipeline {
  agent {
    docker {
      image 'node:18'
    }
  }
  
  triggers {
    cron('0 0 * * *') // Run daily at midnight
  }
  
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install chromium'
      }
    }
    
    stage('Run Audityzer Tests') {
      steps {
        withEnv(['TARGET_URL=${url}', 'MOCK_MODE=true']) {
          sh 'npm run test -- ${url} --wallet ${wallet} --security'
        }
      }
    }
  }
  
  post {
    always {
      archiveArtifacts artifacts: 'audityzer-reports/**', fingerprint: true
    }
  }
}`;
}

/**
 * Generate a SARIF report from security findings
 * @param {Array} findings - Array of security findings
 * @returns {Object} SARIF report object
 */
function generateSarifReport(findings) {
  // Create a SARIF report structure
  const sarifReport = {
    "$schema": "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
    "version": "2.1.0",
    "runs": [
      {
        "tool": {
          "driver": {
            "name": "Audityzer",
            "version": "1.1.2",
            "informationUri": "https://github.com/romanchaa997/audityzer",
            "rules": []
          }
        },
        "results": []
      }
    ]
  };

  // Process each finding
  findings.forEach((vuln) => {
    // Create a rule ID
    const ruleId = `AUDITYZER-${vuln.type.toUpperCase()}`;

    // Add rule if not already added
    if (!sarifReport.runs[0].tool.driver.rules.some(rule => rule.id === ruleId)) {
      sarifReport.runs[0].tool.driver.rules.push({
        "id": ruleId,
        "shortDescription": {
          "text": vuln.name || `${vuln.type} vulnerability`
        },
        "fullDescription": {
          "text": vuln.description || `Detects ${vuln.type} vulnerabilities in smart contracts and dApps`
        },
        "helpUri": `https://github.com/romanchaa997/audityzer/docs/rules/${vuln.type}.md`,
        "properties": {
          "security-severity": getSeverityLevel(vuln.severity)
        }
      });
    }

    // Add result
    sarifReport.runs[0].results.push({
      "ruleId": ruleId,
      "level": getSarifLevel(vuln.severity),
      "message": {
        "text": vuln.description || `${vuln.type} vulnerability detected`
      },
      "locations": [
        {
          "physicalLocation": {
            "artifactLocation": {
              "uri": vuln.location || "unknown"
            },
            "region": {
              "startLine": vuln.line || 1
            }
          }
        }
      ]
    });
  });

  return sarifReport;
}

/**
 * Get SARIF severity level from vulnerability severity
 * @param {string} severity - Vulnerability severity
 * @returns {string} SARIF severity level
 */
function getSarifLevel(severity) {
  switch (severity.toLowerCase()) {
    case 'critical':
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'note';
    default:
      return 'warning';
  }
}

/**
 * Get numeric severity level from vulnerability severity
 * @param {string} severity - Vulnerability severity
 * @returns {string} Numeric severity level
 */
function getSeverityLevel(severity) {
  switch (severity.toLowerCase()) {
    case 'critical':
      return '9.5';
    case 'high':
      return '8.0';
    case 'medium':
      return '5.5';
    case 'low':
      return '3.0';
    default:
      return '5.0';
  }
}

module.exports = {
  generatePlaywrightScript,
  generateGitHubWorkflow,
  generateGitLabCI,
  generateCircleCI,
  generateJenkinsPipeline,
  generateSarifReport
};