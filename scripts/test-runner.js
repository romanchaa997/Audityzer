#!/usr/bin/env node

/**
 * Simple test runner to verify Jest setup
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Jest Configuration...\n');

// Check if Jest config exists
const jestConfigPath = path.resolve('jest.config.js');
if (fs.existsSync(jestConfigPath)) {
  console.log('✅ Jest config file found');
} else {
  console.log('❌ Jest config file not found');
  process.exit(1);
}

// Check if test files exist
const testDir = path.resolve('test');
if (fs.existsSync(testDir)) {
  const testFiles = fs.readdirSync(testDir).filter(file => file.endsWith('.test.js'));
  console.log(`✅ Found ${testFiles.length} test files`);
} else {
  console.log('❌ Test directory not found');
}

// Try to run Jest with basic configuration
try {
  console.log('\n🏃 Running Jest...');
  const output = execSync('npx jest --version', { encoding: 'utf8' });
  console.log(`✅ Jest version: ${output.trim()}`);

  // Try to run the basic test
  console.log('\n🧪 Running basic test...');
  const testOutput = execSync('npx jest test/basic.test.js --verbose', {
    encoding: 'utf8',
    stdio: 'pipe'
  });
  console.log('✅ Basic test passed!');
  console.log(testOutput);

} catch (error) {
  console.log('❌ Jest execution failed:');
  console.log(error.message);

  // Try to provide helpful debugging info
  console.log('\n🔍 Debugging information:');
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' });
    console.log(`Node.js version: ${nodeVersion.trim()}`);

    const npmVersion = execSync('npm --version', { encoding: 'utf8' });
    console.log(`npm version: ${npmVersion.trim()}`);
  } catch (debugError) {
    console.log('Could not get version information');
  }
}

console.log('\n✨ Test runner complete!');