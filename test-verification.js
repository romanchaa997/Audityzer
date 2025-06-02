#!/usr/bin/env node

/**
 * Run test verification and show results
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🔍 Running test verification...\n');

const scriptPath = path.join(__dirname, 'verify-tests.js');

const child = spawn('node', [scriptPath], {
  stdio: 'inherit',
  cwd: __dirname
});

child.on('close', (code) => {
  console.log(`\n✅ Test verification completed with exit code: ${code}`);
  
  if (code === 0) {
    console.log('\n🎯 Next: Run comprehensive tests with:');
    console.log('   node run-comprehensive-tests.js');
  }
  
  process.exit(code);
});

child.on('error', (error) => {
  console.error(`❌ Error running test verification: ${error.message}`);
  process.exit(1);
});