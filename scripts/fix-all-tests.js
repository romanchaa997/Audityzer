#!/usr/bin/env node

/**
 * Comprehensive test fix and validation script
 */

const { execSync } = require('child_process');
// Simple console colors fallback (chalk v5+ is ES module only)
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};
const fs = require('fs');
const path = require('path');

console.log(chalk.blue('🔧 Comprehensive Test Fix and Validation\n'));

// Step 1: Check environment
console.log(chalk.yellow('Step 1: Environment Check'));
try {
  execSync('node scripts/ai-test-status.js', { stdio: 'inherit' });
  console.log(chalk.green('✅ Environment check passed\n'));
} catch (error) {
  console.log(chalk.red('❌ Environment check failed\n'));
}

// Step 2: Run simple tests first
console.log(chalk.yellow('Step 2: Simple Tests'));
const simpleTests = [
  'jest-basic.test.js',
  'setup.test.js',
  'simple-classifier.test.js'
];

for (const test of simpleTests) {
  console.log(chalk.gray(`Testing: ${test}`));
  try {
    execSync(`npx jest test/core/ai-vulnerability-detection-tests/${test} --verbose`, {
      stdio: 'inherit'
    });
    console.log(chalk.green(`✅ ${test} passed`));
  } catch (error) {
    console.log(chalk.red(`❌ ${test} failed`));
  }
}

// Step 3: Run complex tests
console.log(chalk.yellow('\nStep 3: Complex Tests'));
const complexTests = [
  'vulnerability-classifier.test.js',
  'feature-engineering.test.js',
  'remediation-generator.test.js'
];

for (const test of complexTests) {
  console.log(chalk.gray(`Testing: ${test}`));
  try {
    execSync(`npx jest test/core/ai-vulnerability-detection-tests/${test} --verbose`, {
      stdio: 'inherit'
    });
    console.log(chalk.green(`✅ ${test} passed`));
  } catch (error) {
    console.log(chalk.red(`❌ ${test} failed`));
  }
}

console.log(chalk.blue('\n🏁 Test fix validation complete!'));
console.log(chalk.gray('Check the output above for any remaining issues.'));