#!/usr/bin/env node

/**
 * Step 1: Test chalk fix
 */

const { spawn } = require('child_process');

console.log('🎨 Step 1: Testing chalk fix...\n');

const child = spawn('node', ['test-chalk-fix.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ Step 1 PASSED: Chalk fix is working');
    console.log('🎯 Next: Run verification tests');
  } else {
    console.log('\n❌ Step 1 FAILED: Chalk fix needs attention');
  }
  process.exit(code);
});

child.on('error', (error) => {
  console.error(`❌ Error in Step 1: ${error.message}`);
  process.exit(1);
});