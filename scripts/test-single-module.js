#!/usr/bin/env node

/**
 * Test a single module to debug issues
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

const testFile = process.argv[2];

if (!testFile) {
  console.log(chalk.red('Usage: node scripts/test-single-module.js <test-file>'));
  console.log(chalk.gray('Example: node scripts/test-single-module.js vulnerability-classifier.test.js'));
  process.exit(1);
}

const fullPath = `test/core/ai-vulnerability-detection-tests/${testFile}`;

console.log(chalk.blue(`🧪 Testing: ${testFile}\n`));

try {
  execSync(`npx jest ${fullPath} --verbose --no-cache`, {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  console.log(chalk.green(`\n✅ ${testFile} passed!`));

} catch (error) {
  console.log(chalk.red(`\n❌ ${testFile} failed!`));
  console.log(chalk.gray('Check the output above for details.'));
  process.exit(1);
}