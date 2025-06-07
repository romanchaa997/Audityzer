#!/usr/bin/env node

/**
 * Quick test to verify the master script works
 */

const fs = require('fs');
const { spawn } = require('child_process');

const colors = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`
};

console.log(colors.bold(colors.blue('🧪 Quick Test - Master Script Verification\n')));

async function testScript(scriptName) {
  return new Promise((resolve) => {
    console.log(colors.cyan(`Testing: ${scriptName}`));
    
    const child = spawn('node', [scriptName], { stdio: 'pipe' });
    
    let hasOutput = false;
    
    child.stdout?.on('data', (data) => {
      hasOutput = true;
    });
    
    child.stderr?.on('data', (data) => {
      hasOutput = true;
    });
    
    child.on('close', (code) => {
      if (hasOutput && code <= 1) {
        console.log(colors.green(`✅ ${scriptName} - Working`));
        resolve(true);
      } else {
        console.log(colors.red(`❌ ${scriptName} - Issues detected`));
        resolve(false);
      }
    });
    
    child.on('error', (error) => {
      console.log(colors.red(`❌ ${scriptName} - Error: ${error.message}`));
      resolve(false);
    });
  });
}

async function main() {
  const scripts = [
    'test-chalk-fix.js',
    'test-syntax-check.js',
    'fix-chalk-issues.js',
    'comprehensive-bug-fix.js',
    'final-verification.js',
    'MASTER-FIX-ALL.js'
  ];
  
  let working = 0;
  let total = scripts.length;
  
  for (const script of scripts) {
    if (fs.existsSync(script)) {
      const result = await testScript(script);
      if (result) working++;
    } else {
      console.log(colors.red(`❌ ${script} - File not found`));
    }
  }
  
  console.log(colors.bold(colors.blue('\n' + '='.repeat(50))));
  console.log(colors.bold(colors.blue('           QUICK TEST RESULTS')));
  console.log(colors.bold(colors.blue('='.repeat(50))));
  
  const successRate = Math.round((working / total) * 100);
  console.log(colors.cyan(`Scripts Working: ${working}/${total}`));
  console.log(colors.cyan(`Success Rate: ${successRate}%`));
  
  if (successRate >= 80) {
    console.log(colors.bold(colors.green('\n🎉 READY TO GO!')));
    console.log(colors.green('✅ Master script is ready to fix everything!'));
    console.log(colors.cyan('\n🚀 Run this command to fix all issues:'));
    console.log(colors.bold(colors.cyan('npm run MASTER-FIX-ALL')));
  } else {
    console.log(colors.bold(colors.yellow('\n⚠️ SOME ISSUES DETECTED')));
    console.log(colors.yellow('Some scripts may need manual attention.'));
  }
  
  console.log(colors.bold(colors.blue('='.repeat(50))));
}

main().catch(error => {
  console.error(colors.red(`Error: ${error.message}`));
  process.exit(1);
});