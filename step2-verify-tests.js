#!/usr/bin/env node

/**
 * Step 2: Verify test setup
 */

const { spawn } = require('child_process');

console.log('🔍 Step 2: Verifying test setup...\n');

const child = spawn('node', ['verify-tests.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ Step 2 PASSED: Test setup is verified');
    console.log('🎯 Next: Run basic tests');
  } else {
    console.log('\n❌ Step 2 FAILED: Test setup needs attention');
  }
  process.exit(code);
});

child.on('error', (error) => {
  console.error(`❌ Error in Step 2: ${error.message}`);
  process.exit(1);
});