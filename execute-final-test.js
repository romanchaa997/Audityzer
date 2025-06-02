#!/usr/bin/env node

/**
 * Execute final test status check
 */

const { spawn } = require('child_process');

console.log('🎯 Executing final test status check...\n');

const child = spawn('node', ['final-test-status.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

child.on('close', (code) => {
  console.log(`\n🏁 Final test status completed with exit code: ${code}`);
  process.exit(code);
});

child.on('error', (error) => {
  console.error(`❌ Error running final test status: ${error.message}`);
  process.exit(1);
});