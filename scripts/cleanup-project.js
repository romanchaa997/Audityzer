#!/usr/bin/env node

/**
 * Project Cleanup and Organization Script
 * Removes unnecessary files and organizes the project structure
 */

const fs = require('fs-extra');
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

console.log(chalk.blue('🧹 Project Cleanup and Organization\n'));

// Files and directories to clean up
const cleanupTargets = [
  // Temporary test files
  'test/core/ai-vulnerability-detection-tests/temp-*',

  // Old backup files
  '**/*.bak',
  '**/*.backup',
  '**/*.old',

  // Node modules in wrong places
  'src/**/node_modules',
  'test/**/node_modules',

  // Log files
  '**/*.log',
  '**/logs',

  // Coverage files (will be regenerated)
  'coverage',
  '.nyc_output',

  // IDE files
  '.vscode/settings.json.bak',
  '**/.DS_Store',
  '**/Thumbs.db',

  // Duplicate documentation
  'test/core/ai-vulnerability-detection-tests/FINAL-STATUS.md.bak',
];

// Directories to ensure exist
const requiredDirectories = [
  'src/core/ai-vulnerability-detection/model-development',
  'test/core/ai-vulnerability-detection-tests',
  'scripts',
  'docs',
  'templates',
  'data',
];

async function cleanupProject() {
  console.log(chalk.yellow('Step 1: Removing unnecessary files'));

  for (const target of cleanupTargets) {
    try {
      const files = await fs.glob(target, { cwd: process.cwd() });
      for (const file of files) {
        if (await fs.pathExists(file)) {
          await fs.remove(file);
          console.log(chalk.gray(`Removed: ${file}`));
        }
      }
    } catch (error) {
      // Ignore errors for files that don't exist
    }
  }

  console.log(chalk.yellow('\nStep 2: Ensuring required directories exist'));

  for (const dir of requiredDirectories) {
    await fs.ensureDir(dir);
    console.log(chalk.green(`✅ ${dir}`));
  }

  console.log(chalk.yellow('\nStep 3: Organizing test files'));

  // Check for any misplaced test files
  const testDir = 'test/core/ai-vulnerability-detection-tests';
  const testFiles = await fs.readdir(testDir);

  const validTestFiles = [
    'jest-basic.test.js',
    'setup.test.js',
    'mock-modules.test.js',
    'simple-classifier.test.js',
    'debug-classifier.test.js',
    'vulnerability-classifier.test.js',
    'vulnerability-generator.test.js',
    'feature-engineering.test.js',
    'remediation-generator.test.js',
    'index.test.js',
    'README.md',
    'TROUBLESHOOTING.md',
    'FINAL-STATUS.md',
    'COMPREHENSIVE-FIX-SUMMARY.md'
  ];

  for (const file of testFiles) {
    if (!validTestFiles.includes(file) && !file.startsWith('.')) {
      console.log(chalk.yellow(`⚠️  Unexpected file in test directory: ${file}`));
    }
  }

  console.log(chalk.yellow('\nStep 4: Validating script files'));

  const scriptsDir = 'scripts';
  const scriptFiles = await fs.readdir(scriptsDir);

  const validScriptFiles = [
    'ai-test-status.js',
    'check-test-syntax.js',
    'cleanup-project.js',
    'comprehensive-test.js',
    'debug-tests.js',
    'final-test-runner.js',
    'fix-all-tests.js',
    'run-basic-tests.js',
    'test-ai-vulnerability-detection.js',
    'test-basic-ai.js',
    'test-single-module.js',
    'validate-fixes.js'
  ];

  for (const file of scriptFiles) {
    if (!validScriptFiles.includes(file) && !file.startsWith('.')) {
      console.log(chalk.yellow(`⚠️  Unexpected file in scripts directory: ${file}`));
    }
  }

  console.log(chalk.green('\n✅ Project cleanup completed!'));
}

// Run cleanup
cleanupProject().catch(console.error);