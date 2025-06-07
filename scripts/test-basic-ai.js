#!/usr/bin/env node

/**
 * Basic test runner for AI Vulnerability Detection module
 */

const { spawn } = require('child_process');
// Simple console colors fallback (chalk v5+ is ES module only)
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};

console.log(chalk.blue('🧪 Running Basic AI Vulnerability Detection Tests...\n'));

// Run Jest with specific test files
const jestProcess = spawn('npx', [
  'jest',
  'test/core/ai-vulnerability-detection-tests/jest-basic.test.js',
  'test/core/ai-vulnerability-detection-tests/setup.test.js',
  'test/core/ai-vulnerability-detection-tests/mock-modules.test.js',
  '--verbose',
  '--no-cache',
  '--detectOpenHandles',
  '--forceExit'
], {
  stdio: 'inherit',
  cwd: process.cwd()
});

jestProcess.on('close', (code) => {
  if (code === 0) {
    console.log(chalk.green('\n✅ Basic tests passed! You can now run the full test suite.'));
    console.log(chalk.blue('Next: npm run test:ai-vuln'));
  } else {
    console.log(chalk.red('\n❌ Basic tests failed. Exit code:', code));
  }
  process.exit(code);
});

jestProcess.on('error', (error) => {
  console.error(chalk.red('Error running tests:', error.message));
  process.exit(1);
});