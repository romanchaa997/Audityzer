/**
 * Quick test to verify Jest is working
 */

const { execSync } = require('child_process');

console.log('🚀 Quick Jest Test...\n');

try {
  // Test Jest version
  const jestVersion = execSync('npx jest --version', { encoding: 'utf8' });
  console.log(`✅ Jest version: ${jestVersion.trim()}`);

  // Test basic Jest run
  console.log('\n🧪 Running basic test...');
  const testResult = execSync('npx jest test/basic.test.js', {
    encoding: 'utf8',
    stdio: 'pipe'
  });

  console.log('✅ SUCCESS! Jest is working correctly.');
  console.log('\nTest output:');
  console.log(testResult);

} catch (error) {
  console.log('❌ FAILED! Jest is not working.');
  console.log('\nError details:');
  console.log(error.message);

  if (error.stdout) {
    console.log('\nStdout:');
    console.log(error.stdout);
  }

  if (error.stderr) {
    console.log('\nStderr:');
    console.log(error.stderr);
  }
}

console.log('\n🏁 Quick test complete!');