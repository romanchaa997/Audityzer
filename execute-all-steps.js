#!/usr/bin/env node

/**
 * Execute all test verification steps in sequence
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
    cyan: (text) => `\x1b[36m${text}\x1b[0m`,
    magenta: (text) => `\x1b[35m${text}\x1b[0m`
  };
}

class StepExecutor {
  constructor () {
    this.steps = [
      { name: 'Test Chalk Fix', script: 'step1-test-chalk.js', critical: true },
      { name: 'Verify Test Setup', script: 'step2-verify-tests.js', critical: true },
      { name: 'Run Basic Tests', script: 'step3-basic-tests.js', critical: false },
      { name: 'Final Status Check', script: 'step4-final-status.js', critical: false }
    ];
    this.results = [];
  }

  async executeAll() {
    console.log(chalk.cyan('🚀 EXECUTING ALL TEST VERIFICATION STEPS'));
    console.log(chalk.cyan('='.repeat(60)));
    console.log(chalk.cyan(`Started: ${new Date().toISOString()}`));
    console.log('');

    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i];
      const stepNumber = i + 1;

      console.log(chalk.blue(`📋 Step ${stepNumber}/${this.steps.length}: ${step.name}`));
      console.log(chalk.blue('-'.repeat(40)));

      const success = await this.executeStep(step.script);

      this.results.push({
        step: stepNumber,
        name: step.name,
        success: success,
        critical: step.critical
      });

      if (!success && step.critical) {
        console.log(chalk.red(`\n🚨 CRITICAL STEP FAILED: ${step.name}`));
        console.log(chalk.red('Stopping execution due to critical failure.'));
        break;
      }

      if (i < this.steps.length - 1) {
        console.log(chalk.cyan('\n' + '='.repeat(60)));
        console.log('');
      }
    }

    this.generateSummary();
  }

  async executeStep(scriptPath) {
    return new Promise((resolve) => {
      const child = spawn('node', [scriptPath], {
        stdio: 'inherit',
        cwd: __dirname
      });

      child.on('close', (code) => {
        resolve(code === 0);
      });

      child.on('error', (error) => {
        console.error(chalk.red(`Error executing ${scriptPath}: ${error.message}`));
        resolve(false);
      });
    });
  }

  generateSummary() {
    console.log(chalk.cyan('\n' + '='.repeat(60)));
    console.log(chalk.cyan('📊 EXECUTION SUMMARY'));
    console.log(chalk.cyan('='.repeat(60)));

    const passed = this.results.filter(r => r.success).length;
    const total = this.results.length;
    const criticalFailed = this.results.filter(r => !r.success && r.critical).length;

    console.log(chalk.magenta(`📈 Results: ${passed}/${total} steps passed`));
    console.log('');

    this.results.forEach(result => {
      const icon = result.success ? '✅' : '❌';
      const status = result.success ? 'PASSED' : 'FAILED';
      const critical = result.critical ? ' (CRITICAL)' : '';

      if (result.success) {
        console.log(chalk.green(`${icon} Step ${result.step}: ${result.name} - ${status}${critical}`));
      } else {
        console.log(chalk.red(`${icon} Step ${result.step}: ${result.name} - ${status}${critical}`));
      }
    });

    console.log(chalk.cyan('-'.repeat(60)));

    if (criticalFailed > 0) {
      console.log(chalk.red('🚨 CRITICAL FAILURES DETECTED'));
      console.log(chalk.red('System requires immediate attention before proceeding.'));
    } else if (passed === total) {
      console.log(chalk.green('🎉 ALL STEPS COMPLETED SUCCESSFULLY!'));
      console.log(chalk.green('✨ System is ready for full testing.'));
      console.log(chalk.blue('\n🎯 Recommended next actions:'));
      console.log(chalk.gray('   • npm test - Run full Jest test suite'));
      console.log(chalk.gray('   • npm run test:ai-status - Check AI components'));
      console.log(chalk.gray('   • npm run test:comprehensive - Full system test'));
    } else {
      console.log(chalk.yellow('⚠️  SOME STEPS FAILED'));
      console.log(chalk.yellow('Review failed steps and fix issues before proceeding.'));
      console.log(chalk.blue('\n🔧 Troubleshooting:'));
      console.log(chalk.gray('   • Check error messages above'));
      console.log(chalk.gray('   • Verify dependencies: npm install'));
      console.log(chalk.gray('   • Check file permissions'));
    }

    console.log(chalk.cyan('\n' + '='.repeat(60)));
    console.log(chalk.cyan(`Completed: ${new Date().toISOString()}`));
  }
}

// Execute all steps
if (require.main === module) {
  const executor = new StepExecutor();
  executor.executeAll().catch(error => {
    console.error(chalk.red(`Fatal error: ${error.message}`));
    process.exit(1);
  });
}

module.exports = StepExecutor;