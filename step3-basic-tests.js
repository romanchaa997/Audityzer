#!/usr/bin/env node

/**
 * Step 3: Run basic tests
 */

const { spawn } = require('child_process');

console.log('🧪 Step 3: Running basic tests...\n');

const child = spawn('node', ['run-basic-tests.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ Step 3 PASSED: Basic tests are working');
    console.log('🎯 Next: Run comprehensive tests');
  } else {
    console.log('\n❌ Step 3 FAILED: Basic tests need attention');
  }
  process.exit(code);
});

child.on('error', (error) => {
  console.error(`❌ Error in Step 3: ${error.message}`);
  process.exit(1);
});