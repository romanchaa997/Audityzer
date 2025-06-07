#!/usr/bin/env node

/**
 * Comprehensive test runner with detailed error reporting
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

console.log(chalk.blue('🔍 Comprehensive AI Vulnerability Detection Test Suite\n'));

const testSuites = [
  {
    name: 'Environment Check',
    command: 'node scripts/ai-test-status.js',
    critical: false
  },
  {
    name: 'Basic Jest Functionality',
    command: 'npx jest test/core/ai-vulnerability-detection-tests/jest-basic.test.js --verbose',
    critical: true
  },
  {
    name: 'Environment Setup',
    command: 'npx jest test/core/ai-vulnerability-detection-tests/setup.test.js --verbose',
    critical: true
  },
  {
    name: 'Mock Modules',
    command: 'npx jest test/core/ai-vulnerability-detection-tests/mock-modules.test.js --verbose',
    critical: false
  },
  {
    name: 'Simple Classifier',
    command: 'npx jest test/core/ai-vulnerability-detection-tests/simple-classifier.test.js --verbose',
    critical: true
  },
  {
    name: 'Debug Classifier',
    command: 'npx jest test/core/ai-vulnerability-detection-tests/debug-classifier.test.js --verbose',
    critical: false
  },
  {
    name: 'Vulnerability Classifier',
    command: 'npx jest test/core/ai-vulnerability-detection-tests/vulnerability-classifier.test.js --verbose',
    critical: true
  },
  {
    name: 'Feature Engineering',
    command: 'npx jest test/core/ai-vulnerability-detection-tests/feature-engineering.test.js --verbose',
    critical: true
  },
  {
    name: 'Remediation Generator',
    command: 'npx jest test/core/ai-vulnerability-detection-tests/remediation-generator.test.js --verbose',
    critical: true
  }
];

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let criticalFailures = 0;

for (const suite of testSuites) {
  totalTests++;
  console.log(chalk.yellow(`\n📋 ${suite.name}`));
  console.log(chalk.gray(`Command: ${suite.command}`));
  console.log(chalk.gray(`Critical: ${suite.critical ? 'Yes' : 'No'}\n`));

  try {
    execSync(suite.command, {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    console.log(chalk.green(`✅ ${suite.name} PASSED\n`));
    passedTests++;

  } catch (error) {
    console.log(chalk.red(`❌ ${suite.name} FAILED\n`));
    failedTests++;

    if (suite.critical) {
      criticalFailures++;
    }

    console.log(chalk.gray('Continuing with remaining tests...\n'));
  }
}

// Final report
console.log(chalk.blue('\n' + '='.repeat(60)));
console.log(chalk.blue('📊 COMPREHENSIVE TEST REPORT'));
console.log(chalk.blue('='.repeat(60)));

console.log(chalk.white(`Total Test Suites: ${totalTests}`));
console.log(chalk.green(`✅ Passed: ${passedTests}`));
console.log(chalk.red(`❌ Failed: ${failedTests}`));
console.log(chalk.yellow(`⚠️  Critical Failures: ${criticalFailures}`));

const successRate = Math.round((passedTests / totalTests) * 100);
console.log(chalk.blue(`📈 Success Rate: ${successRate}%`));

if (criticalFailures === 0) {
  console.log(chalk.green('\n🎉 All critical tests passed! System is functional.'));
} else {
  console.log(chalk.red(`\n⚠️  ${criticalFailures} critical test(s) failed. System needs attention.`));
}

if (failedTests > 0) {
  console.log(chalk.gray('\n📚 For troubleshooting help:'));
  console.log(chalk.gray('  - Check TROUBLESHOOTING.md'));
  console.log(chalk.gray('  - Run: npm run test:ai-debug'));
  console.log(chalk.gray('  - Check individual test files for specific errors'));
}

console.log(chalk.blue('\n' + '='.repeat(60)));