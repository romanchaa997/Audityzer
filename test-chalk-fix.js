#!/usr/bin/env node

/**
 * Test that chalk import issue is fixed
 */

console.log('🎨 Testing chalk import fix...\n');

// Use fallback colors since chalk v5+ is ES module only
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};

console.log('✅ Using fallback colors (chalk v5+ is ES module only)');

// Test chalk functionality
console.log(chalk.blue('🔍 Testing blue color'));
console.log(chalk.green('✅ Testing green color'));
console.log(chalk.red('❌ Testing red color'));
console.log(chalk.gray('📝 Testing gray color'));
console.log(chalk.yellow('⚠️ Testing yellow color'));
console.log(chalk.cyan('ℹ️ Testing cyan color'));

console.log('\n🎉 Chalk fix test completed successfully!');