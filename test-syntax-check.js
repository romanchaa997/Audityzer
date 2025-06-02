#!/usr/bin/env node

/**
 * Test the syntax checker script
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Simple console colors
const colors = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`
};

console.log(colors.blue('🧪 Testing syntax checker...\n'));

const scriptPath = path.join(__dirname, 'scripts', 'check-test-syntax.js');

// Check if the script exists
if (!fs.existsSync(scriptPath)) {
  console.error(colors.red(`❌ Script not found: ${scriptPath}`));
  process.exit(1);
}

const child = spawn('node', [scriptPath], {
  stdio: 'inherit',
  cwd: __dirname
});

child.on('close', (code) => {
  if (code === 0) {
    console.log(colors.green(`\n✅ Syntax checker completed successfully with exit code: ${code}`));
  } else {
    console.log(colors.yellow(`\n⚠️ Syntax checker completed with exit code: ${code}`));
  }
  process.exit(code);
});

child.on('error', (error) => {
  console.error(colors.red(`❌ Error running syntax checker: ${error.message}`));
  process.exit(1);
});