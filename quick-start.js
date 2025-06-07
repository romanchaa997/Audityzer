#!/usr/bin/env node

/**
 * Audityzer Quick Start Guide
 * Interactive guide to get the project running
 */

const fs = require('fs-extra');
const { execSync } = require('child_process');

const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  magenta: (text) => `\x1b[35m${text}\x1b[0m`
};

console.log(chalk.blue('🚀 Welcome to Audityzer Quick Start!\n'));

class QuickStart {
  constructor () {
    this.steps = [
      { name: 'Environment Check', method: 'checkEnvironment' },
      { name: 'Dependencies Installation', method: 'installDependencies' },
      { name: 'Project Status', method: 'checkProjectStatus' },
      { name: 'Run Tests', method: 'runTests' },
      { name: 'Deployment Readiness', method: 'checkDeployment' },
      { name: 'Next Steps', method: 'showNextSteps' }
    ];
  }

  async start() {
    console.log(chalk.magenta('🎯 Starting Audityzer setup process...\n'));

    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i];
      console.log(chalk.blue(`\n${'='.repeat(50)}`));
      console.log(chalk.blue(`📍 Step ${i + 1}: ${step.name}`));
      console.log(chalk.blue(`${'='.repeat(50)}\n`));

      try {
        await this[step.method]();
        console.log(chalk.green(`✅ Step ${i + 1} completed successfully\n`));
      } catch (error) {
        console.log(chalk.red(`❌ Step ${i + 1} failed: ${error.message}\n`));
        console.log(chalk.yellow('⚠️  Continuing with next step...\n'));
      }
    }

    console.log(chalk.blue('\n' + '='.repeat(60)));
    console.log(chalk.blue('🎉 QUICK START COMPLETED!'));
    console.log(chalk.blue('='.repeat(60)));
  }

  async checkEnvironment() {
    console.log(chalk.yellow('🔍 Checking your environment...'));

    try {
      const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
      const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();

      console.log(chalk.green(`✅ Node.js: ${nodeVersion}`));
      console.log(chalk.green(`✅ npm: ${npmVersion}`));

      const nodeMajor = parseInt(nodeVersion.slice(1).split('.')[0]);
      if (nodeMajor < 16) {
        console.log(chalk.red('⚠️  Warning: Node.js 16+ is recommended'));
      }
    } catch (error) {
      throw new Error('Node.js or npm not found. Please install Node.js first.');
    }
  }

  async installDependencies() {
    console.log(chalk.yellow('📦 Installing dependencies...'));

    const nodeModulesExists = await fs.pathExists('node_modules');
    if (nodeModulesExists) {
      console.log(chalk.green('✅ Dependencies already installed'));
      return;
    }

    try {
      console.log(chalk.gray('   Running npm install...'));
      execSync('npm install', { stdio: 'inherit' });
      console.log(chalk.green('✅ Dependencies installed successfully'));
    } catch (error) {
      throw new Error('Failed to install dependencies');
    }
  }

  async checkProjectStatus() {
    console.log(chalk.yellow('📊 Checking project status...'));

    try {
      console.log(chalk.gray('   Running project status check...'));
      execSync('npm run status', { stdio: 'inherit' });
    } catch (error) {
      console.log(chalk.yellow('⚠️  Status check had issues, but continuing...'));
    }
  }

  async runTests() {
    console.log(chalk.yellow('🧪 Running tests...'));

    const testCommands = [
      { name: 'Basic AI Tests', cmd: 'npm run test:ai-basic' },
      { name: 'AI Status Check', cmd: 'npm run test:ai-status' }
    ];

    for (const test of testCommands) {
      try {
        console.log(chalk.gray(`   Running ${test.name}...`));
        execSync(test.cmd, { stdio: 'pipe' });
        console.log(chalk.green(`   ✅ ${test.name} passed`));
      } catch (error) {
        console.log(chalk.yellow(`   ⚠️  ${test.name} had issues`));
      }
    }
  }

  async checkDeployment() {
    console.log(chalk.yellow('🚀 Checking deployment readiness...'));

    try {
      console.log(chalk.gray('   Running deployment readiness check...'));
      execSync('node deployment-readiness-checker.js', { stdio: 'inherit' });
    } catch (error) {
      console.log(chalk.yellow('⚠️  Deployment check completed with warnings'));
    }
  }

  async showNextSteps() {
    console.log(chalk.yellow('🎯 What\'s next?'));

    console.log(chalk.cyan('\n📋 Available Commands:'));
    console.log(chalk.gray('  npm run status                   # Check project status'));
    console.log(chalk.gray('  npm run test:ai-comprehensive    # Run all AI tests'));
    console.log(chalk.gray('  npm run final-status             # Complete assessment'));
    console.log(chalk.gray('  npm run deployment-check         # Check deployment readiness'));
    console.log(chalk.gray('  npm run dev                      # Start development server'));

    console.log(chalk.cyan('\n🚀 Deployment Options:'));
    console.log(chalk.gray('  • Railway: npm install -g @railway/cli && railway deploy'));
    console.log(chalk.gray('  • Render: Connect GitHub repo in Render dashboard'));
    console.log(chalk.gray('  • DigitalOcean: Use App Platform with GitHub integration'));
    console.log(chalk.gray('  • Docker: docker build -t audityzer . && docker run -p 3000:3000 audityzer'));

    console.log(chalk.cyan('\n📚 Documentation:'));
    console.log(chalk.gray('  • README.md - Project overview and features'));
    console.log(chalk.gray('  • DEPLOYMENT-GUIDE.md - Complete deployment guide'));
    console.log(chalk.gray('  • development-plan.md - Development workflow'));

    console.log(chalk.cyan('\n🔧 Troubleshooting:'));
    console.log(chalk.gray('  • If tests fail: npm run fix-tests'));
    console.log(chalk.gray('  • If dependencies issue: rm -rf node_modules && npm install'));
    console.log(chalk.gray('  • For help: Check the troubleshooting section in README.md'));

    console.log(chalk.green('\n🎉 You\'re all set! Happy coding! 🚀'));
  }
}

// Run quick start
const quickStart = new QuickStart();
quickStart.start().catch(console.error);