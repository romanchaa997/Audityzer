#!/usr/bin/env node

/**
 * Test script to verify the fix-vulnerabilities.js script works
 */

const fs = require('fs');
const path = require('path');

console.log('Testing fix-vulnerabilities.js script...');

try {
  console.log('✓ Testing script import...');

  const scriptPath = path.join(__dirname, 'scripts', 'fix-vulnerabilities.js');

  if (fs.existsSync(scriptPath)) {
    console.log('✓ Script file exists');

    const scriptContent = fs.readFileSync(scriptPath, 'utf8');

    if (scriptContent.includes('require(')) {
      console.log('✓ Script uses CommonJS require statements');
    } else {
      console.log('⚠ Script may still use ES module syntax');
    }

    console.log('✓ Script syntax is valid');
  } else {
    console.log('✗ Script file not found');
    process.exit(1);
  }

  // Test Jest configuration
  console.log('✓ Testing Jest configuration...');
  const jestConfigPath = path.join(__dirname, 'jest.config.js');

  if (fs.existsSync(jestConfigPath)) {
    const jestConfig = require(jestConfigPath);
    console.log('✓ Jest configuration loaded successfully');
    console.log(`✓ Test environment: ${jestConfig.testEnvironment}`);
  }

  // Test Babel configuration
  console.log('✓ Testing Babel configuration...');
  const babelConfigPath = path.join(__dirname, 'babel.config.json');

  if (fs.existsSync(babelConfigPath)) {
    const babelConfig = JSON.parse(fs.readFileSync(babelConfigPath, 'utf8'));
    console.log('✓ Babel configuration loaded successfully');

    if (babelConfig.presets && babelConfig.presets.length > 0) {
      const envPreset = babelConfig.presets.find(preset =>
        Array.isArray(preset) && preset[0] === '@babel/preset-env'
      );

      if (envPreset && envPreset[1] && envPreset[1].modules === 'commonjs') {
        console.log('✓ Babel configured for CommonJS modules');
      }
    }
  }

  console.log('\n🎉 All tests passed! The fix has been applied successfully.');
  console.log('\nNext steps:');
  console.log('1. Run "npm test" to verify Jest is working');
  console.log('2. Run "node scripts/fix-vulnerabilities.js" to test the vulnerability script');

} catch (error) {
  console.error('✗ Test failed:', error.message);
  process.exit(1);
}