#!/usr/bin/env node

/**
 * Run basic tests to verify functionality
 */

const { spawn } = require('child_process');
const path = require('path');

// Handle chalk import for both CommonJS and ES modules
// Simple console colors fallback (chalk v5+ is ES module only)
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};\x1b[0m`,
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    gray: (text) => `\x1b[90m${text}\x1b[0m`
  };
}

async function runTest(command, args, description) {
  return new Promise((resolve) => {
    console.log(chalk.blue(`🧪 ${description}...`));
    
    const child = spawn(command, args, {
      stdio: 'pipe',
      cwd: __dirname
    });

    let output = '';
    let errorOutput = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green(`✅ ${description} - PASSED`));
        if (output.includes('PASS') || output.includes('✅')) {
          console.log(chalk.gray(`   ${output.split('\n')[0]}`));
        }
      } else {
        console.log(chalk.red(`❌ ${description} - FAILED (exit code: ${code})`));
        if (errorOutput) {
          console.log(chalk.red(`   Error: ${errorOutput.split('\n')[0]}`));
        }
      }
      resolve(code === 0);
    });

    child.on('error', (error) => {
      console.log(chalk.red(`❌ ${description} - ERROR: ${error.message}`));
      resolve(false);
    });
  });
}

async function runBasicTests() {
  console.log(chalk.blue('🚀 Running basic test suite...\n'));

  const tests = [
    {
      command: 'node',
      args: ['verify-tests.js'],
      description: 'Test verification'
    },
    {
      command: 'node',
      args: ['test-quick.js'],
      description: 'Quick Jest test'
    },
    {
      command: 'npx',
      args: ['jest', 'test/basic.test.js', '--verbose'],
      description: 'Basic Jest test'
    },
    {
      command: 'node',
      args: ['scripts/check-test-syntax.js'],
      description: 'Test syntax check'
    }
  ];

  let passedTests = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    const passed = await runTest(test.command, test.args, test.description);
    if (passed) passedTests++;
    console.log(''); // Add spacing
  }

  console.log(chalk.gray('='.repeat(50)));
  console.log(chalk.blue(`📊 Results: ${passedTests}/${totalTests} tests passed`));
  
  const successRate = (passedTests / totalTests * 100).toFixed(1);
  console.log(chalk.blue(`📈 Success Rate: ${successRate}%`));

  if (passedTests === totalTests) {
    console.log(chalk.green('\n🎉 All basic tests passed! System is ready.'));
    console.log(chalk.blue('\n🎯 Next steps:'));
    console.log(chalk.gray('   • Run full test suite: npm test'));
    console.log(chalk.gray('   • Run comprehensive tests: node run-comprehensive-tests.js'));
    console.log(chalk.gray('   • Check AI tests: npm run test:ai-status'));
  } else {
    console.log(chalk.yellow('\n⚠️  Some tests failed. Please review the issues above.'));
    console.log(chalk.blue('\n🔧 Troubleshooting:'));
    console.log(chalk.gray('   • Check dependencies: npm install'));
    console.log(chalk.gray('   • Verify file paths and permissions'));
    console.log(chalk.gray('   • Check Node.js version compatibility'));
  }

  return passedTests === totalTests;
}

// Run basic tests
if (require.main === module) {
  runBasicTests().catch(error => {
    console.error(chalk.red(`Fatal error: ${error.message}`));
    process.exit(1);
  });
}

module.exports = runBasicTests;