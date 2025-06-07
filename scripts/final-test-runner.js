#!/usr/bin/env node

/**
 * Final comprehensive test runner for AI vulnerability detection
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

console.log(chalk.blue('🚀 Final AI Vulnerability Detection Test Suite\n'));

// Test phases
const phases = [
  {
    name: 'Environment Check',
    command: 'node scripts/ai-test-status.js',
    description: 'Checking test environment status'
  },
  {
    name: 'Basic Jest Test',
    command: 'npx jest test/core/ai-vulnerability-detection-tests/jest-basic.test.js --verbose',
    description: 'Testing Jest functionality'
  },
  {
    name: 'Setup Test',
    command: 'npx jest test/core/ai-vulnerability-detection-tests/setup.test.js --verbose',
    description: 'Testing environment setup'
  },
  {
    name: 'Mock Modules Test',
    command: 'npx jest test/core/ai-vulnerability-detection-tests/mock-modules.test.js --verbose',
    description: 'Testing with mocked modules'
  },
  {
    name: 'Vulnerability Classifier Test',
    command: 'npx jest test/core/ai-vulnerability-detection-tests/vulnerability-classifier.test.js --verbose',
    description: 'Testing vulnerability classification'
  },
  {
    name: 'Feature Engineering Test',
    command: 'npx jest test/core/ai-vulnerability-detection-tests/feature-engineering.test.js --verbose',
    description: 'Testing feature extraction'
  },
  {
    name: 'Remediation Generator Test',
    command: 'npx jest test/core/ai-vulnerability-detection-tests/remediation-generator.test.js --verbose',
    description: 'Testing remediation generation'
  }
];

let passedTests = 0;
let failedTests = 0;

for (const phase of phases) {
  console.log(chalk.yellow(`\n📋 ${phase.name}: ${phase.description}`));
  console.log(chalk.gray(`Command: ${phase.command}\n`));

  try {
    execSync(phase.command, {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    console.log(chalk.green(`✅ ${phase.name} passed!\n`));
    passedTests++;

  } catch (error) {
    console.log(chalk.red(`❌ ${phase.name} failed!\n`));
    failedTests++;

    // Continue with other tests even if one fails
    console.log(chalk.gray('Continuing with remaining tests...\n'));
  }
}

// Final summary
console.log(chalk.blue('\n📊 Test Summary:'));
console.log(chalk.green(`✅ Passed: ${passedTests}`));
console.log(chalk.red(`❌ Failed: ${failedTests}`));
console.log(chalk.blue(`📝 Total: ${phases.length}`));

if (failedTests === 0) {
  console.log(chalk.green('\n🎉 All tests passed! AI vulnerability detection system is ready!'));
} else {
  console.log(chalk.yellow(`\n⚠️  ${failedTests} test(s) failed. Check the output above for details.`));
  console.log(chalk.gray('Refer to TROUBLESHOOTING.md for help with failing tests.'));
}

console.log(chalk.blue('\n📚 Documentation:'));
console.log(chalk.gray('  - README: test/core/ai-vulnerability-detection-tests/README.md'));
console.log(chalk.gray('  - Troubleshooting: test/core/ai-vulnerability-detection-tests/TROUBLESHOOTING.md'));