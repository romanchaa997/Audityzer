#!/usr/bin/env node

/**
 * Run basic AI vulnerability detection tests
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

console.log(chalk.blue('🧪 Running Basic AI Vulnerability Detection Tests\n'));

try {
  // Run basic Jest test
  console.log(chalk.yellow('1. Running basic Jest functionality test...'));
  execSync('npx jest test/core/ai-vulnerability-detection-tests/jest-basic.test.js --verbose', {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  console.log(chalk.green('✅ Basic Jest test passed!\n'));

  // Run setup test
  console.log(chalk.yellow('2. Running environment setup test...'));
  execSync('npx jest test/core/ai-vulnerability-detection-tests/setup.test.js --verbose', {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  console.log(chalk.green('✅ Setup test passed!\n'));

  // Run mock modules test
  console.log(chalk.yellow('3. Running mock modules test...'));
  execSync('npx jest test/core/ai-vulnerability-detection-tests/mock-modules.test.js --verbose', {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  console.log(chalk.green('✅ Mock modules test passed!\n'));

  console.log(chalk.green('🎉 All basic tests passed! Ready to run full test suite.'));
  console.log(chalk.gray('Next: npm run test:ai-vuln'));

} catch (error) {
  console.error(chalk.red('❌ Basic tests failed:'));
  console.error(error.message);
  process.exit(1);
}