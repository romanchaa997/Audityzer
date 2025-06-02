#!/usr/bin/env node

/**
 * Comprehensive Project Status Checker
 * Provides detailed status of all project components
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
// Simple console colors fallback (chalk v5+ is ES module only)
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`
};

console.log(chalk.blue('🔍 Audityzer Project Status Report\n'));

async function checkProjectStatus() {
  const status = {
    environment: {},
    dependencies: {},
    structure: {},
    tests: {},
    ai: {},
    mcp: {},
    overall: 'unknown'
  };

  // Check Node.js and npm versions
  console.log(chalk.yellow('📋 Environment Check'));
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();

    status.environment.node = nodeVersion;
    status.environment.npm = npmVersion;

    console.log(chalk.green(`✅ Node.js: ${nodeVersion}`));
    console.log(chalk.green(`✅ npm: ${npmVersion}`));
  } catch (error) {
    console.log(chalk.red('❌ Environment check failed'));
    status.environment.error = error.message;
  }

  // Check package.json and dependencies
  console.log(chalk.yellow('\n📦 Dependencies Check'));
  try {
    const packageJson = await fs.readJson('package.json');
    status.dependencies.packageJson = true;

    // Check if node_modules exists
    const nodeModulesExists = await fs.pathExists('node_modules');
    status.dependencies.installed = nodeModulesExists;

    console.log(chalk.green('✅ package.json found'));
    console.log(nodeModulesExists ?
      chalk.green('✅ Dependencies installed') :
      chalk.yellow('⚠️  Dependencies not installed (run npm install)')
    );

    // Check key dependencies
    const keyDeps = ['jest', 'chalk', 'fs-extra'];
    for (const dep of keyDeps) {
      const depExists = packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep];
      if (depExists) {
        console.log(chalk.green(`✅ ${dep}: ${depExists}`));
      } else {
        console.log(chalk.red(`❌ ${dep}: missing`));
      }
    }
  } catch (error) {
    console.log(chalk.red('❌ Dependencies check failed'));
    status.dependencies.error = error.message;
  }

  // Check project structure
  console.log(chalk.yellow('\n📁 Project Structure Check'));
  const requiredDirs = [
    'src/core/ai-vulnerability-detection',
    'test/core/ai-vulnerability-detection-tests',
    'scripts'
  ];

  status.structure.directories = {};
  for (const dir of requiredDirs) {
    const exists = await fs.pathExists(dir);
    status.structure.directories[dir] = exists;

    console.log(exists ?
      chalk.green(`✅ ${dir}`) :
      chalk.red(`❌ ${dir}`)
    );
  }

  // Check AI components
  console.log(chalk.yellow('\n🤖 AI Components Check'));
  const aiComponents = [
    'src/core/ai-vulnerability-detection/model-development/vulnerability-classifier.js',
    'src/core/ai-vulnerability-detection/model-development/feature-engineering.js',
    'src/core/ai-vulnerability-detection/model-development/remediation-generator.js',
    'src/core/ai-vulnerability-detection/model-development/vulnerability-generator.js'
  ];

  status.ai.components = {};
  for (const component of aiComponents) {
    const exists = await fs.pathExists(component);
    const name = path.basename(component, '.js');
    status.ai.components[name] = exists;

    console.log(exists ?
      chalk.green(`✅ ${name}`) :
      chalk.red(`❌ ${name}`)
    );
  }

  // Check test files
  console.log(chalk.yellow('\n🧪 Test Files Check'));
  const testFiles = [
    'jest-basic.test.js',
    'setup.test.js',
    'vulnerability-classifier.test.js',
    'feature-engineering.test.js',
    'remediation-generator.test.js',
    'simple-classifier.test.js',
    'debug-classifier.test.js'
  ];

  status.tests.files = {};
  const testDir = 'test/core/ai-vulnerability-detection-tests';

  for (const testFile of testFiles) {
    const testPath = path.join(testDir, testFile);
    const exists = await fs.pathExists(testPath);
    status.tests.files[testFile] = exists;

    console.log(exists ?
      chalk.green(`✅ ${testFile}`) :
      chalk.red(`❌ ${testFile}`)
    );
  }

  // Check scripts
  console.log(chalk.yellow('\n📜 Scripts Check'));
  const scripts = [
    'ai-test-status.js',
    'comprehensive-test.js',
    'debug-tests.js',
    'validate-fixes.js',
    'cleanup-project.js',
    'project-status.js'
  ];

  status.scripts = {};
  for (const script of scripts) {
    const scriptPath = path.join('scripts', script);
    const exists = await fs.pathExists(scriptPath);
    status.scripts[script] = exists;

    console.log(exists ?
      chalk.green(`✅ ${script}`) :
      chalk.red(`❌ ${script}`)
    );
  }

  // Test basic functionality
  console.log(chalk.yellow('\n🔬 Basic Functionality Test'));
  try {
    // Try to run a simple test
    execSync('npx jest test/core/ai-vulnerability-detection-tests/jest-basic.test.js --silent', {
      stdio: 'pipe'
    });
    status.tests.basic = true;
    console.log(chalk.green('✅ Basic tests passing'));
  } catch (error) {
    status.tests.basic = false;
    console.log(chalk.red('❌ Basic tests failing'));
  }

  // Calculate overall status
  const criticalChecks = [
    status.environment.node,
    status.dependencies.packageJson,
    status.dependencies.installed,
    Object.values(status.ai.components).every(Boolean),
    Object.values(status.tests.files).filter(Boolean).length >= 5,
    status.tests.basic
  ];

  const passedChecks = criticalChecks.filter(Boolean).length;
  const totalChecks = criticalChecks.length;

  if (passedChecks === totalChecks) {
    status.overall = 'excellent';
  } else if (passedChecks >= totalChecks * 0.8) {
    status.overall = 'good';
  } else if (passedChecks >= totalChecks * 0.6) {
    status.overall = 'fair';
  } else {
    status.overall = 'poor';
  }

  // Generate report
  console.log(chalk.blue('\n' + '='.repeat(60)));
  console.log(chalk.blue('📊 PROJECT STATUS SUMMARY'));
  console.log(chalk.blue('='.repeat(60)));

  const statusColors = {
    excellent: chalk.green,
    good: chalk.green,
    fair: chalk.yellow,
    poor: chalk.red
  };

  const statusEmojis = {
    excellent: '🎉',
    good: '✅',
    fair: '⚠️',
    poor: '❌'
  };

  console.log(statusColors[status.overall](`${statusEmojis[status.overall]} Overall Status: ${status.overall.toUpperCase()}`));
  console.log(chalk.white(`📈 Health Score: ${passedChecks}/${totalChecks} (${Math.round(passedChecks / totalChecks * 100)}%)`));

  // Recommendations
  console.log(chalk.blue('\n🎯 Recommendations:'));

  if (!status.dependencies.installed) {
    console.log(chalk.yellow('  • Run: npm install'));
  }

  if (!status.tests.basic) {
    console.log(chalk.yellow('  • Run: npm run test:ai-validate'));
  }

  if (status.overall === 'excellent') {
    console.log(chalk.green('  • Project is ready for development and testing!'));
    console.log(chalk.green('  • Run: npm run test:ai-comprehensive'));
  }

  // Quick commands
  console.log(chalk.blue('\n🚀 Quick Commands:'));
  console.log(chalk.gray('  npm run test:ai-status          # Check AI test environment'));
  console.log(chalk.gray('  npm run test:ai-comprehensive   # Run all AI tests'));
  console.log(chalk.gray('  npm run test:ai-validate        # Validate all fixes'));
  console.log(chalk.gray('  npm run cleanup                 # Clean up project'));

  console.log(chalk.blue('\n' + '='.repeat(60)));

  return status;
}

// Run status check
checkProjectStatus().catch(console.error);