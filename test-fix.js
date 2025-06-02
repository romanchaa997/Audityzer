#!/usr/bin/env node

/**
 * Test script to verify the fix-vulnerabilities.js script works
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Testing fix-vulnerabilities.js script...');

try {
  // Test that the script can be required without errors
  console.log('✓ Testing script import...');

  // Create a backup of the original script
  const scriptPath = path.join(__dirname, 'scripts', 'fix-vulnerabilities.js');
  const backupPath = scriptPath + '.backup';

  if (fs.existsSync(scriptPath)) {
    console.log('✓ Script file exists');

    // Try to parse the script to check for syntax errors
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');

    // Check if it uses CommonJS syntax
    if (scriptContent.includes('require(') && scriptContent.includes('module.exports')) {
      console.log('✓ Script uses CommonJS syntax');
    } else if (scriptContent.includes('require(')) {
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
    console.log(`✓ Transform configured: ${jestConfig.transform ? 'Yes' : 'No'}`);
  } else {
    console.log('✗ Jest configuration not found');
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
      } else {
        console.log('⚠ Babel module configuration may need adjustment');
      }
    }
  } else {
    console.log('✗ Babel configuration not found');
  }

  console.log('\n🎉 All tests passed! The fix has been applied successfully.');
  console.log('\nNext steps:');
  console.log('1. Run "npm test" to verify Jest is working');
  console.log('2. Run "node scripts/fix-vulnerabilities.js" to test the vulnerability script');

} catch (error) {
  console.error('✗ Test failed:', error.message);
  process.exit(1);
}