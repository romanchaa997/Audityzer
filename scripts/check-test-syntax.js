#!/usr/bin/env node

/**
 * Simple syntax checker for test files
 */

const fs = require('fs');
const path = require('path');

// Simple console colors fallback (chalk v5+ is ES module only)
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};

const testDir = path.join(__dirname, '..', 'test', 'core', 'ai-vulnerability-detection-tests');

console.log(chalk.blue('🔍 Checking test file syntax...\n'));

const testFiles = fs.readdirSync(testDir).filter(file => file.endsWith('.test.js'));

let hasErrors = false;

for (const file of testFiles) {
  const filePath = path.join(testDir, file);
  console.log(chalk.gray(`Checking ${file}...`));

  try {
    // Try to require the file to check for syntax errors
    require(filePath);
    console.log(chalk.green(`✅ ${file} - OK`));
  } catch (error) {
    console.log(chalk.red(`❌ ${file} - Error: ${error.message}`));
    hasErrors = true;
  }
}

if (hasErrors) {
  console.log(chalk.red('\n❌ Some test files have syntax errors.'));
  process.exit(1);
} else {
  console.log(chalk.green('\n✅ All test files have valid syntax!'));
}