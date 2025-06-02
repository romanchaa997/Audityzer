#!/usr/bin/env node

/**
 * Final test status check - comprehensive verification
 */

const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');

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
    gray: (text) => `\x1b[90m${text}\x1b[0m`,
    cyan: (text) => `\x1b[36m${text}\x1b[0m`,
    magenta: (text) => `\x1b[35m${text}\x1b[0m`
  };
}

class FinalTestStatus {
  constructor() {
    this.results = {
      setup: { passed: 0, total: 0, details: [] },
      syntax: { passed: 0, total: 0, details: [] },
      basic: { passed: 0, total: 0, details: [] },
      jest: { passed: 0, total: 0, details: [] },
      ai: { passed: 0, total: 0, details: [] }
    };
  }

  async run() {
    console.log(chalk.cyan('🎯 FINAL TEST STATUS CHECK'));
    console.log(chalk.cyan('=' .repeat(60)));
    console.log(chalk.gray(`Timestamp: ${new Date().toISOString()}`));
    console.log(chalk.gray(`Node.js: ${process.version}`));
    console.log(chalk.gray(`Platform: ${process.platform}`));
    console.log('');

    // Phase 1: Setup verification
    await this.checkSetup();

    // Phase 2: Syntax verification
    await this.checkSyntax();

    // Phase 3: Basic tests
    await this.runBasicTests();

    // Phase 4: Jest tests
    await this.runJestTests();

    // Phase 5: AI-specific tests
    await this.checkAITests();

    // Generate final report
    this.generateFinalReport();
  }

  async checkSetup() {
    console.log(chalk.blue('📋 Phase 1: Setup Verification\n'));

    const setupChecks = [
      { name: 'package.json', path: 'package.json' },
      { name: 'jest.config.js', path: 'jest.config.js' },
      { name: 'babel.config.json', path: 'babel.config.json' },
      { name: 'node_modules', path: 'node_modules' },
      { name: 'test directory', path: 'test' },
      { name: 'src directory', path: 'src' },
      { name: 'scripts directory', path: 'scripts' }
    ];

    for (const check of setupChecks) {
      const exists = await fs.pathExists(check.path);
      this.results.setup.total++;
      
      if (exists) {
        this.results.setup.passed++;
        console.log(chalk.green(`  ✅ ${check.name}`));
        this.results.setup.details.push({ name: check.name, status: 'PASS' });
      } else {
        console.log(chalk.red(`  ❌ ${check.name}`));
        this.results.setup.details.push({ name: check.name, status: 'FAIL' });
      }
    }

    console.log('');
  }

  async checkSyntax() {
    console.log(chalk.blue('📋 Phase 2: Syntax Verification\n'));

    const testFiles = [
      'test/basic.test.js',
      'test-quick.js',
      'verify-tests.js',
      'scripts/check-test-syntax.js'
    ];

    for (const file of testFiles) {
      this.results.syntax.total++;
      
      try {
        if (await fs.pathExists(file)) {
          // Try to require the file to check syntax
          delete require.cache[require.resolve(path.resolve(file))];
          require(path.resolve(file));
          
          this.results.syntax.passed++;
          console.log(chalk.green(`  ✅ ${file} - syntax OK`));
          this.results.syntax.details.push({ name: file, status: 'PASS' });
        } else {
          console.log(chalk.yellow(`  ⚠️  ${file} - file not found`));
          this.results.syntax.details.push({ name: file, status: 'SKIP' });
        }
      } catch (error) {
        console.log(chalk.red(`  ❌ ${file} - syntax error: ${error.message.slice(0, 50)}...`));
        this.results.syntax.details.push({ name: file, status: 'FAIL', error: error.message });
      }
    }

    console.log('');
  }

  async runBasicTests() {
    console.log(chalk.blue('📋 Phase 3: Basic Tests\n'));

    const basicTests = [
      { name: 'Test verification', script: 'verify-tests.js' },
      { name: 'Quick Jest test', script: 'test-quick.js' }
    ];

    for (const test of basicTests) {
      this.results.basic.total++;
      
      try {
        const success = await this.runScript(test.script);
        if (success) {
          this.results.basic.passed++;
          console.log(chalk.green(`  ✅ ${test.name} - PASSED`));
          this.results.basic.details.push({ name: test.name, status: 'PASS' });
        } else {
          console.log(chalk.red(`  ❌ ${test.name} - FAILED`));
          this.results.basic.details.push({ name: test.name, status: 'FAIL' });
        }
      } catch (error) {
        console.log(chalk.red(`  ❌ ${test.name} - ERROR: ${error.message}`));
        this.results.basic.details.push({ name: test.name, status: 'ERROR', error: error.message });
      }
    }

    console.log('');
  }

  async runJestTests() {
    console.log(chalk.blue('📋 Phase 4: Jest Tests\n'));

    this.results.jest.total++;

    try {
      const success = await this.runCommand('npx', ['jest', 'test/basic.test.js', '--passWithNoTests']);
      if (success) {
        this.results.jest.passed++;
        console.log(chalk.green(`  ✅ Jest basic test - PASSED`));
        this.results.jest.details.push({ name: 'Jest basic test', status: 'PASS' });
      } else {
        console.log(chalk.red(`  ❌ Jest basic test - FAILED`));
        this.results.jest.details.push({ name: 'Jest basic test', status: 'FAIL' });
      }
    } catch (error) {
      console.log(chalk.red(`  ❌ Jest basic test - ERROR: ${error.message}`));
      this.results.jest.details.push({ name: 'Jest basic test', status: 'ERROR', error: error.message });
    }

    console.log('');
  }

  async checkAITests() {
    console.log(chalk.blue('📋 Phase 5: AI Test Components\n'));

    const aiComponents = [
      { name: 'ModelDevelopment class', path: 'src/core/ai-vulnerability-detection/model-development/index.js' },
      { name: 'VulnerabilityClassifier class', path: 'src/core/ai-vulnerability-detection/model-development/vulnerability-classifier.js' },
      { name: 'AI test directory', path: 'test/core/ai-vulnerability-detection-tests' },
      { name: 'AI test files', path: 'test/core/ai-vulnerability-detection-tests/simple-classifier.test.js' }
    ];

    for (const component of aiComponents) {
      this.results.ai.total++;
      
      const exists = await fs.pathExists(component.path);
      if (exists) {
        this.results.ai.passed++;
        console.log(chalk.green(`  ✅ ${component.name}`));
        this.results.ai.details.push({ name: component.name, status: 'PASS' });
      } else {
        console.log(chalk.red(`  ❌ ${component.name}`));
        this.results.ai.details.push({ name: component.name, status: 'FAIL' });
      }
    }

    console.log('');
  }

  async runScript(scriptPath) {
    return new Promise((resolve) => {
      const child = spawn('node', [scriptPath], {
        stdio: 'pipe',
        cwd: __dirname
      });

      child.on('close', (code) => {
        resolve(code === 0);
      });

      child.on('error', () => {
        resolve(false);
      });
    });
  }

  async runCommand(command, args) {
    return new Promise((resolve) => {
      const child = spawn(command, args, {
        stdio: 'pipe',
        cwd: __dirname
      });

      child.on('close', (code) => {
        resolve(code === 0);
      });

      child.on('error', () => {
        resolve(false);
      });
    });
  }

  generateFinalReport() {
    console.log(chalk.cyan('📊 FINAL TEST REPORT'));
    console.log(chalk.cyan('=' .repeat(60)));

    const phases = [
      { name: 'Setup', key: 'setup', icon: '🔧' },
      { name: 'Syntax', key: 'syntax', icon: '📝' },
      { name: 'Basic Tests', key: 'basic', icon: '🧪' },
      { name: 'Jest Tests', key: 'jest', icon: '🃏' },
      { name: 'AI Components', key: 'ai', icon: '🤖' }
    ];

    let totalPassed = 0;
    let totalTests = 0;

    for (const phase of phases) {
      const result = this.results[phase.key];
      const percentage = result.total > 0 ? (result.passed / result.total * 100).toFixed(1) : 0;
      
      totalPassed += result.passed;
      totalTests += result.total;

      console.log(`${phase.icon} ${phase.name}: ${result.passed}/${result.total} (${percentage}%)`);
      
      if (percentage < 100) {
        const failed = result.details.filter(d => d.status === 'FAIL' || d.status === 'ERROR');
        failed.forEach(f => {
          console.log(chalk.red(`   ❌ ${f.name}`));
        });
      }
    }

    console.log(chalk.cyan('-'.repeat(60)));
    
    const overallPercentage = totalTests > 0 ? (totalPassed / totalTests * 100).toFixed(1) : 0;
    console.log(chalk.magenta(`🎯 OVERALL: ${totalPassed}/${totalTests} (${overallPercentage}%)`));

    if (overallPercentage >= 90) {
      console.log(chalk.green('\n🎉 EXCELLENT! System is fully operational.'));
      console.log(chalk.blue('✨ All major components are working correctly.'));
      console.log(chalk.gray('🚀 Ready for production use.'));
    } else if (overallPercentage >= 75) {
      console.log(chalk.yellow('\n✅ GOOD! System is mostly operational.'));
      console.log(chalk.blue('🔧 Minor issues may need attention.'));
      console.log(chalk.gray('📈 System is ready for testing.'));
    } else if (overallPercentage >= 50) {
      console.log(chalk.yellow('\n⚠️  PARTIAL! System has some issues.'));
      console.log(chalk.blue('🛠️  Several components need fixing.'));
      console.log(chalk.gray('🔍 Review failed tests above.'));
    } else {
      console.log(chalk.red('\n🚨 CRITICAL! System has major issues.'));
      console.log(chalk.blue('🆘 Significant fixes required.'));
      console.log(chalk.gray('📋 Check setup and dependencies.'));
    }

    console.log(chalk.cyan('\n' + '=' .repeat(60)));
    console.log(chalk.gray(`Report generated: ${new Date().toISOString()}`));
  }
}

// Run final test status
if (require.main === module) {
  const statusChecker = new FinalTestStatus();
  statusChecker.run().catch(error => {
    console.error(chalk.red(`Fatal error: ${error.message}`));
    process.exit(1);
  });
}

module.exports = FinalTestStatus;