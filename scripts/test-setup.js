#!/usr/bin/env node

/**
 * Test setup verification script
 * Checks if Jest, ESLint, and other tools are working correctly
 */

const { execSync } = require('child_process');

console.log('🔧 Testing project setup...\n');

const tests = [
  {
    name: 'Package Manager Check',
    command: 'npm --version',
    description: 'Verify npm is available'
  },
  {
    name: 'Node.js Version',
    command: 'node --version',
    description: 'Check Node.js version'
  },
  {
    name: 'Jest Configuration',
    command: 'npx jest --showConfig',
    description: 'Verify Jest configuration is valid'
  }
];

let passed = 0;
let failed = 0;

for (const test of tests) {
  try {
    console.log(`Testing: ${test.name}`);
    console.log(`Description: ${test.description}`);

    execSync(test.command, {
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: 10000
    });

    console.log('✅ PASSED\n');
    passed++;
  } catch (error) {
    console.log('❌ FAILED');
    console.log(`Error: ${error.message}\n`);
    failed++;
  }
}

console.log('📊 Test Results:');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);

if (failed === 0) {
  console.log('\n🎉 All setup tests passed! Your project is ready to go.');
} else {
  console.log('\n⚠️  Some tests failed. Please check the errors above.');
}

console.log('\n🚀 Next steps:');
console.log('1. Run: npm test');
console.log('2. Run: npm run lint');
console.log('3. Run: npm start');