#!/usr/bin/env node

/**
 * Verify that all test components are working correctly
 */

const fs = require('fs-extra');
const path = require('path');

// Handle chalk import for both CommonJS and ES modules
// Simple console colors fallback (chalk v5+ is ES module only)
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    gray: (text) => `\x1b[90m${text}\x1b[0m`
  };
}

async function verifyTests() {
  console.log(chalk.blue('🔍 Verifying test setup...\n'));

  const checks = [
    {
      name: 'Jest configuration',
      check: () => fs.pathExists('jest.config.js'),
      fix: null
    },
    {
      name: 'Babel configuration',
      check: () => fs.pathExists('babel.config.json'),
      fix: null
    },
    {
      name: 'Basic test file',
      check: () => fs.pathExists('test/basic.test.js'),
      fix: null
    },
    {
      name: 'ModelDevelopment class',
      check: () => fs.pathExists('src/core/ai-vulnerability-detection/model-development/index.js'),
      fix: null
    },
    {
      name: 'VulnerabilityClassifier class',
      check: () => fs.pathExists('src/core/ai-vulnerability-detection/model-development/vulnerability-classifier.js'),
      fix: null
    },
    {
      name: 'Test directory structure',
      check: () => fs.pathExists('test/core/ai-vulnerability-detection-tests'),
      fix: null
    }
  ];

  let allPassed = true;

  for (const check of checks) {
    try {
      const result = await check.check();
      if (result) {
        console.log(chalk.green(`✅ ${check.name}`));
      } else {
        console.log(chalk.red(`❌ ${check.name}`));
        allPassed = false;
      }
    } catch (error) {
      console.log(chalk.red(`❌ ${check.name} - Error: ${error.message}`));
      allPassed = false;
    }
  }

  console.log('\n' + chalk.gray('='.repeat(50)));

  if (allPassed) {
    console.log(chalk.green('🎉 All checks passed! Test setup is ready.'));
  } else {
    console.log(chalk.yellow('⚠️  Some checks failed. Please review the issues above.'));
  }

  // Test basic require functionality
  console.log(chalk.blue('\n🧪 Testing basic require functionality...\n'));

  const requireTests = [
    {
      name: 'fs-extra',
      module: 'fs-extra'
    },
    {
      name: 'path',
      module: 'path'
    },
    {
      name: 'VulnerabilityClassifier',
      module: './src/core/ai-vulnerability-detection/model-development/vulnerability-classifier'
    },
    {
      name: 'ModelDevelopment',
      module: './src/core/ai-vulnerability-detection/model-development/index'
    }
  ];

  for (const test of requireTests) {
    try {
      require(test.module);
      console.log(chalk.green(`✅ ${test.name} - require successful`));
    } catch (error) {
      console.log(chalk.red(`❌ ${test.name} - require failed: ${error.message}`));
      allPassed = false;
    }
  }

  console.log('\n' + chalk.gray('='.repeat(50)));
  
  if (allPassed) {
    console.log(chalk.green('\n🚀 Everything looks good! You can now run tests.'));
    console.log(chalk.blue('\nSuggested next steps:'));
    console.log(chalk.gray('1. npm test - Run all Jest tests'));
    console.log(chalk.gray('2. node test-quick.js - Run quick verification'));
    console.log(chalk.gray('3. node run-comprehensive-tests.js - Run comprehensive test suite'));
  } else {
    console.log(chalk.red('\n🚨 Some issues found. Please fix them before running tests.'));
  }

  return allPassed;
}

// Run verification
if (require.main === module) {
  verifyTests().catch(error => {
    console.error(chalk.red(`Fatal error: ${error.message}`));
    process.exit(1);
  });
}

module.exports = verifyTests;