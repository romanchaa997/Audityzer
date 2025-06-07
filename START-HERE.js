#!/usr/bin/env node

/**
 * START HERE - Main entry point for test verification and bug fixing
 */

const { spawn } = require('child_process');

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
    cyan: (text) => `\x1b[36m${text}\x1b[0m`,
    magenta: (text) => `\x1b[35m${text}\x1b[0m`
  };
}

console.log(chalk.cyan('🎯 AUDITYZER TEST VERIFICATION & BUG FIXING'));
console.log(chalk.cyan('=' .repeat(60)));
console.log(chalk.blue('Welcome to the comprehensive test verification system!'));
console.log('');
console.log(chalk.yellow('This script will:'));
console.log(chalk.gray('✅ Fix the chalk import issue'));
console.log(chalk.gray('✅ Verify all test components'));
console.log(chalk.gray('✅ Run basic functionality tests'));
console.log(chalk.gray('✅ Generate comprehensive status report'));
console.log('');
console.log(chalk.blue('🚀 Starting automated test verification...'));
console.log(chalk.cyan('=' .repeat(60)));
console.log('');

const child = spawn('node', ['execute-all-steps.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

child.on('close', (code) => {
  console.log('');
  console.log(chalk.cyan('=' .repeat(60)));
  if (code === 0) {
    console.log(chalk.green('🎉 TEST VERIFICATION COMPLETED SUCCESSFULLY!'));
    console.log('');
    console.log(chalk.blue('🎯 What was accomplished:'));
    console.log(chalk.gray('   ✅ Fixed chalk import issues'));
    console.log(chalk.gray('   ✅ Verified test infrastructure'));
    console.log(chalk.gray('   ✅ Confirmed basic functionality'));
    console.log(chalk.gray('   ✅ Generated status reports'));
    console.log('');
    console.log(chalk.green('🚀 Your system is now ready for testing!'));
    console.log('');
    console.log(chalk.blue('📋 Available commands:'));
    console.log(chalk.gray('   npm test                    - Run Jest test suite'));
    console.log(chalk.gray('   npm run test:basic          - Run basic tests'));
    console.log(chalk.gray('   npm run test:comprehensive  - Full system test'));
    console.log(chalk.gray('   npm run test:final-status   - Status check'));
  } else {
    console.log(chalk.yellow('⚠️  TEST VERIFICATION COMPLETED WITH ISSUES'));
    console.log('');
    console.log(chalk.blue('🔧 Some components may need attention.'));
    console.log(chalk.gray('   Review the output above for specific issues.'));
    console.log('');
    console.log(chalk.blue('📋 Troubleshooting commands:'));
    console.log(chalk.gray('   npm install                 - Reinstall dependencies'));
    console.log(chalk.gray('   npm run test:verify         - Re-verify setup'));
    console.log(chalk.gray('   npm run test:syntax         - Check syntax'));
  }
  console.log(chalk.cyan('=' .repeat(60)));
  process.exit(code);
});

child.on('error', (error) => {
  console.error(chalk.red(`❌ Error running test verification: ${error.message}`));
  console.log('');
  console.log(chalk.blue('🔧 Try these troubleshooting steps:'));
  console.log(chalk.gray('   1. npm install'));
  console.log(chalk.gray('   2. Check Node.js version (>=16.0.0)'));
  console.log(chalk.gray('   3. Verify file permissions'));
  process.exit(1);
});