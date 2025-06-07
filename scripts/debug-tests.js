#!/usr/bin/env node

/**
 * Debug test runner to identify specific issues
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

console.log(chalk.blue('🔍 Debug Test Runner\n'));

const tests = [
  {
    name: 'Debug Classifier',
    file: 'debug-classifier.test.js',
    description: 'Debug pattern matching'
  },
  {
    name: 'Basic Jest',
    file: 'jest-basic.test.js',
    description: 'Basic Jest functionality'
  },
  {
    name: 'Setup Test',
    file: 'setup.test.js',
    description: 'Environment setup'
  },
  {
    name: 'Vulnerability Classifier',
    file: 'vulnerability-classifier.test.js',
    description: 'Classification logic'
  }
];

for (const test of tests) {
  console.log(chalk.yellow(`\n🧪 Running: ${test.name}`));
  console.log(chalk.gray(`Description: ${test.description}`));
  console.log(chalk.gray(`File: ${test.file}\n`));

  try {
    execSync(`npx jest test/core/ai-vulnerability-detection-tests/${test.file} --verbose --no-cache`, {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    console.log(chalk.green(`✅ ${test.name} passed!\n`));

  } catch (error) {
    console.log(chalk.red(`❌ ${test.name} failed!\n`));
    console.log(chalk.gray('Continuing with next test...\n'));
  }
}

console.log(chalk.blue('🏁 Debug run complete!'));