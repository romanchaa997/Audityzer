#!/usr/bin/env node

/**
 * Validate all fixes applied to the AI vulnerability detection tests
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

console.log(chalk.blue('🔍 Validating All AI Test Fixes\n'));

// Step 1: Check file existence
console.log(chalk.yellow('Step 1: Checking Test File Existence'));
const testFiles = [
  'jest-basic.test.js',
  'setup.test.js',
  'mock-modules.test.js',
  'simple-classifier.test.js',
  'debug-classifier.test.js',
  'vulnerability-classifier.test.js',
  'feature-engineering.test.js',
  'remediation-generator.test.js',
  'index.test.js'
];

const testDir = 'test/core/ai-vulnerability-detection-tests';
let allFilesExist = true;

for (const file of testFiles) {
  const filePath = path.join(testDir, file);
  if (fs.existsSync(filePath)) {
    console.log(chalk.green(`✅ ${file} exists`));
  } else {
    console.log(chalk.red(`❌ ${file} missing`));
    allFilesExist = false;
  }
}

if (!allFilesExist) {
  console.log(chalk.red('\n❌ Some test files are missing. Cannot proceed.'));
  process.exit(1);
}

// Step 2: Check syntax of all test files
console.log(chalk.yellow('\nStep 2: Checking Test File Syntax'));
try {
  execSync('node scripts/check-test-syntax.js', { stdio: 'inherit' });
  console.log(chalk.green('✅ All test files have valid syntax'));
} catch (error) {
  console.log(chalk.red('❌ Syntax errors found in test files'));
}

// Step 3: Run basic tests first
console.log(chalk.yellow('\nStep 3: Running Basic Tests'));
const basicTests = ['jest-basic.test.js', 'setup.test.js'];

for (const test of basicTests) {
  try {
    console.log(chalk.gray(`Testing: ${test}`));
    execSync(`npx jest ${testDir}/${test} --verbose --no-cache`, {
      stdio: 'inherit'
    });
    console.log(chalk.green(`✅ ${test} passed`));
  } catch (error) {
    console.log(chalk.red(`❌ ${test} failed`));
  }
}

// Step 4: Run simple classifier test
console.log(chalk.yellow('\nStep 4: Running Simple Classifier Test'));
try {
  execSync(`npx jest ${testDir}/simple-classifier.test.js --verbose --no-cache`, {
    stdio: 'inherit'
  });
  console.log(chalk.green('✅ Simple classifier test passed'));
} catch (error) {
  console.log(chalk.red('❌ Simple classifier test failed'));
}

// Step 5: Run debug classifier test
console.log(chalk.yellow('\nStep 5: Running Debug Classifier Test'));
try {
  execSync(`npx jest ${testDir}/debug-classifier.test.js --verbose --no-cache`, {
    stdio: 'inherit'
  });
  console.log(chalk.green('✅ Debug classifier test passed'));
} catch (error) {
  console.log(chalk.red('❌ Debug classifier test failed'));
}

// Step 6: Run main tests
console.log(chalk.yellow('\nStep 6: Running Main Test Suite'));
const mainTests = [
  'vulnerability-classifier.test.js',
  'feature-engineering.test.js',
  'remediation-generator.test.js'
];

let mainTestsPassed = 0;
for (const test of mainTests) {
  try {
    console.log(chalk.gray(`Testing: ${test}`));
    execSync(`npx jest ${testDir}/${test} --verbose --no-cache`, {
      stdio: 'inherit'
    });
    console.log(chalk.green(`✅ ${test} passed`));
    mainTestsPassed++;
  } catch (error) {
    console.log(chalk.red(`❌ ${test} failed`));
  }
}

// Final report
console.log(chalk.blue('\n' + '='.repeat(50)));
console.log(chalk.blue('📊 VALIDATION REPORT'));
console.log(chalk.blue('='.repeat(50)));

console.log(chalk.white(`Main tests passed: ${mainTestsPassed}/${mainTests.length}`));

if (mainTestsPassed === mainTests.length) {
  console.log(chalk.green('\n🎉 ALL FIXES VALIDATED SUCCESSFULLY!'));
  console.log(chalk.green('The AI vulnerability detection test suite is fully functional.'));
} else {
  console.log(chalk.yellow('\n⚠️  Some tests still need attention.'));
  console.log(chalk.gray('Check the output above for specific issues.'));
}

console.log(chalk.blue('\n' + '='.repeat(50)));