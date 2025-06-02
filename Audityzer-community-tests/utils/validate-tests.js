/* global describe, it, expect, beforeEach, afterEach, jest */
#!/usr/bin/env node

/**
 * This script validates the structure and content of test files
 * to ensure they meet the repository standards.
 */

const fs = require('fs');
const path = require('path');
// Simple console colors fallback (chalk v5+ is ES module only)
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};

// Define test directories
const testDirs = [
  'dapp-tests/wallet-connection',
  'dapp-tests/transaction-flow',
  'dapp-tests/signature-request',
  'contract-tests/erc20',
  'contract-tests/erc721',
  'contract-tests/defi',
];

// Required test file components
const requiredComments = [
  'Test case description',
  'Vulnerability/edge case:',
  'Manual reproduction steps:',
  'Security impact:',
];

// Validation results
let errors = 0;
let warnings = 0;
let passed = 0;

// Create directories if they don't exist
function ensureDirectoriesExist() {
  console.log(chalk.blue('Ensuring test directories exist...'));

  testDirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      console.log(chalk.yellow(`Creating directory: ${dir}`));
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  console.log(chalk.green('All directories present ✓'));
}

// Validate a single test file
function validateTestFile(filePath) {
  console.log(chalk.blue(`Validating: ${filePath}`));

  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if file contains required comments
    const missingComments = requiredComments.filter(comment => !content.includes(comment));

    if (missingComments.length > 0) {
      console.log(chalk.red(`❌ Missing required comments in ${filePath}:`));
      missingComments.forEach(comment => console.log(chalk.red(`   - ${comment}`)));
      errors++;
      return false;
    }

    // Check if test contains assertions
    if (!content.includes('.expect(') && !content.includes('expect(')) {
      console.log(chalk.yellow(`⚠️ Warning: No assertions found in ${filePath}`));
      warnings++;
    }

    // Check if file is too large (> 300 lines)
    const lineCount = content.split('\n').length;
    if (lineCount > 300) {
      console.log(
        chalk.yellow(`⚠️ Warning: File ${filePath} has ${lineCount} lines. Consider splitting it.`)
      );
      warnings++;
    }

    console.log(chalk.green(`✓ ${filePath} passed validation`));
    passed++;
    return true;
  } catch (error) {
    console.log(chalk.red(`❌ Error reading/validating ${filePath}: ${error.message}`));
    errors++;
    return false;
  }
}

// Scan directories and validate test files
function validateAllTests() {
  console.log(chalk.blue('Validating test files...'));

  let testFilesFound = 0;

  testDirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);

    if (fs.existsSync(dirPath)) {
      const files = fs
        .readdirSync(dirPath)
        .filter(file => file.endsWith('.test.js') || file.endsWith('.test.ts'));

      testFilesFound += files.length;

      files.forEach(file => {
        validateTestFile(path.join(dirPath, file));
      });
    }
  });

  if (testFilesFound === 0) {
    console.log(chalk.yellow('⚠️ No test files found. Creating sample test...'));
    createSampleTest();
  }

  return { passed, warnings, errors };
}

// Create a sample test file
function createSampleTest() {
  const sampleDir = path.join(process.cwd(), 'dapp-tests/wallet-connection');
  const samplePath = path.join(sampleDir, 'sample-wallet-connection.test.js');

  if (!fs.existsSync(sampleDir)) {
    fs.mkdirSync(sampleDir, { recursive: true });
  }

  const sampleContent = `/**
 * Test case description: Tests for bypassing wallet connection confirmation
 * Vulnerability/edge case: User confirmation popups can sometimes be bypassed 
 * Manual reproduction steps: 
 *   1. Visit a dApp
 *   2. Trigger wallet connection
 *   3. Try to click connect before the popup fully renders
 * Security impact: Could allow automatic connections without user consent
 */

const { test, expect } = require('@playwright/test');

test.describe('MetaMask Wallet Connection Edge Cases', () => {
  test('should not connect wallet without explicit user confirmation', async ({ page }) => {
    // Setup
    await page.goto('https://app.uniswap.org');
    
    // Find and click connect button
    const connectButton = await page.locator('.connect-wallet-button');
    await connectButton.click();
    
    // Try to automatically approve connection (this should fail)
    const walletAddress = await page.evaluate(() => {
      // This would be the malicious code trying to auto-connect
      return window.ethereum?.selectedAddress;
    });
    
    // Verify wallet is not connected without user confirmation
    await expect(walletAddress).toBeUndefined();
  });
});
`;

  fs.writeFileSync(samplePath, sampleContent);
  console.log(chalk.green(`✓ Created sample test at ${samplePath}`));
  validateTestFile(samplePath);
}

// Main function
function main() {
  console.log(chalk.bold('Validating test structure...'));

  ensureDirectoriesExist();
  const results = validateAllTests();

  console.log('\n' + chalk.bold('Validation Summary:'));
  console.log(chalk.green(`✓ ${results.passed} tests passed`));
  console.log(chalk.yellow(`⚠️ ${results.warnings} warnings`));
  console.log(chalk.red(`❌ ${results.errors} errors`));

  if (results.errors > 0) {
    console.log(chalk.red('\nValidation failed! Please fix the errors above.'));
    process.exit(1);
  } else {
    console.log(chalk.green('\nValidation successful!'));
    process.exit(0);
  }
}

main();
