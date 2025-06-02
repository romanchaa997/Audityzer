#!/usr/bin/env node

/**
 * AI Vulnerability Detection Test Status Checker
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

console.log(chalk.blue('🔍 AI Vulnerability Detection Test Status\n'));

// Check test files
const testDir = path.join(__dirname, '..', 'test', 'core', 'ai-vulnerability-detection-tests');
const testFiles = [
  'jest-basic.test.js',
  'setup.test.js',
  'mock-modules.test.js',
  'index.test.js',
  'feature-engineering.test.js',
  'remediation-generator.test.js',
  'vulnerability-generator.test.js'
];

console.log(chalk.yellow('📁 Test Files:'));
testFiles.forEach(file => {
  const filePath = path.join(testDir, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? chalk.green('✅') : chalk.red('❌');
  console.log(`  ${status} ${file}`);
});

// Check source modules
const srcDir = path.join(__dirname, '..', 'src', 'core', 'ai-vulnerability-detection');
const moduleFiles = [
  'index.js',
  'model-development/index.js',
  'model-development/feature-engineering.js',
  'model-development/remediation-generator.js',
  'model-development/vulnerability-generator.js'
];

console.log(chalk.yellow('\n🔧 Source Modules:'));
moduleFiles.forEach(file => {
  const filePath = path.join(srcDir, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? chalk.green('✅') : chalk.red('❌');
  console.log(`  ${status} ${file}`);
});

// Check configuration files
const configFiles = [
  'jest.config.js',
  'babel.config.json',
  'package.json'
];

console.log(chalk.yellow('\n⚙️  Configuration Files:'));
configFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  const exists = fs.existsSync(filePath);
  const status = exists ? chalk.green('✅') : chalk.red('❌');
  console.log(`  ${status} ${file}`);
});

// Check package.json scripts
const packagePath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const scripts = ['test', 'test:ai-basic', 'test:ai-vuln'];

  console.log(chalk.yellow('\n📜 NPM Scripts:'));
  scripts.forEach(script => {
    const exists = pkg.scripts && pkg.scripts[script];
    const status = exists ? chalk.green('✅') : chalk.red('❌');
    console.log(`  ${status} ${script}`);
  });
}

console.log(chalk.blue('\n🚀 Quick Start:'));
console.log(chalk.gray('  1. Run basic tests: npm run test:ai-basic'));
console.log(chalk.gray('  2. Run full suite: npm run test:ai-vuln'));
console.log(chalk.gray('  3. Check syntax: node scripts/check-test-syntax.js'));

console.log(chalk.blue('\n📚 Documentation:'));
console.log(chalk.gray('  - README: test/core/ai-vulnerability-detection-tests/README.md'));
console.log(chalk.gray('  - Troubleshooting: test/core/ai-vulnerability-detection-tests/TROUBLESHOOTING.md'));