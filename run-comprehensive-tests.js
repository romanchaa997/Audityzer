#!/usr/bin/env node

/**
 * Run comprehensive tests and show results
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 Running comprehensive test suite...\n');

const scriptPath = path.join(__dirname, 'scripts', 'comprehensive-test-runner.js');

const child = spawn('node', [scriptPath], {
  stdio: 'inherit',
  cwd: __dirname
});

child.on('close', (code) => {
  console.log(`\n✅ Comprehensive tests completed with exit code: ${code}`);
  process.exit(code);
});

child.on('error', (error) => {
  console.error(`❌ Error running comprehensive tests: ${error.message}`);
  process.exit(1);
});