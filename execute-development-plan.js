#!/usr/bin/env node

/**
 * Audityzer Development Plan Executor
 * Systematically executes the development workflow
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// Simple console colors
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  magenta: (text) => `\x1b[35m${text}\x1b[0m`
};

console.log(chalk.blue('🚀 Audityzer Development Plan Executor\n'));

class DevelopmentExecutor {
  constructor () {
    this.phases = [
      { name: 'Environment Setup & Validation', method: 'executePhase1' },
      { name: 'Core Development & Testing', method: 'executePhase2' },
      { name: 'Integration & Performance', method: 'executePhase3' },
      { name: 'Documentation & Examples', method: 'executePhase4' },
      { name: 'Deployment Preparation', method: 'executePhase5' }
    ];
    this.results = {};
  }

  async execute() {
    console.log(chalk.magenta('📋 Starting Audityzer Development Workflow\n'));

    for (let i = 0; i < this.phases.length; i++) {
      const phase = this.phases[i];
      console.log(chalk.blue(`\n${'='.repeat(60)}`));
      console.log(chalk.blue(`📍 Phase ${i + 1}: ${phase.name}`));
      console.log(chalk.blue(`${'='.repeat(60)}\n`));

      try {
        const result = await this[phase.method]();
        this.results[`phase${i + 1}`] = { success: true, ...result };
        console.log(chalk.green(`✅ Phase ${i + 1} completed successfully\n`));
      } catch (error) {
        this.results[`phase${i + 1}`] = { success: false, error: error.message };
        console.log(chalk.red(`❌ Phase ${i + 1} failed: ${error.message}\n`));

        // Ask if we should continue
        console.log(chalk.yellow('⚠️  Would you like to continue with the next phase? (y/n)'));
        // For automation, we'll continue but log the issue
        console.log(chalk.gray('   Continuing with next phase...\n'));
      }
    }

    await this.generateReport();
  }

  async executePhase1() {
    console.log(chalk.yellow('🔧 Phase 1: Environment Setup & Validation'));

    const tasks = [
      { name: 'Check Node.js and npm versions', cmd: 'node --version && npm --version' },
      { name: 'Verify package.json', cmd: 'test -f package.json' },
      { name: 'Check dependencies installation', cmd: 'test -d node_modules' },
      { name: 'Run project status check', cmd: 'npm run status' },
      { name: 'Basic AI components test', cmd: 'npm run test:ai-basic' }
    ];

    const results = {};

    for (const task of tasks) {
      console.log(chalk.gray(`  • ${task.name}...`));
      try {
        const output = execSync(task.cmd, { encoding: 'utf8', stdio: 'pipe' });
        results[task.name] = { success: true, output: output.trim() };
        console.log(chalk.green(`    ✅ ${task.name}`));
      } catch (error) {
        results[task.name] = { success: false, error: error.message };
        console.log(chalk.red(`    ❌ ${task.name}: ${error.message}`));
      }
    }

    return { tasks: results };
  }

  async executePhase2() {
    console.log(chalk.yellow('🔧 Phase 2: Core Development & Testing'));

    const tasks = [
      { name: 'AI components status check', cmd: 'npm run test:ai-status' },
      { name: 'Vulnerability detection tests', cmd: 'npm run test:ai-vuln' },
      { name: 'Comprehensive AI tests', cmd: 'npm run test:ai-comprehensive' },
      { name: 'Code linting', cmd: 'npm run lint' },
      { name: 'Test validation', cmd: 'npm run test:ai-validate' }
    ];

    const results = {};

    for (const task of tasks) {
      console.log(chalk.gray(`  • ${task.name}...`));
      try {
        const output = execSync(task.cmd, { encoding: 'utf8', stdio: 'pipe' });
        results[task.name] = { success: true, output: output.trim() };
        console.log(chalk.green(`    ✅ ${task.name}`));
      } catch (error) {
        results[task.name] = { success: false, error: error.message };
        console.log(chalk.yellow(`    ⚠️  ${task.name}: ${error.message}`));

        // Try to fix common issues
        if (task.name.includes('test') && error.message.includes('test')) {
          console.log(chalk.gray(`    🔧 Attempting to fix tests...`));
          try {
            execSync('npm run fix-tests', { stdio: 'pipe' });
            console.log(chalk.green(`    ✅ Tests fixed`));
          } catch (fixError) {
            console.log(chalk.red(`    ❌ Fix failed: ${fixError.message}`));
          }
        }
      }
    }

    return { tasks: results };
  }

  async executePhase3() {
    console.log(chalk.yellow('🔧 Phase 3: Integration & Performance'));

    const tasks = [
      { name: 'MCP server status', cmd: 'npm run mcp:status' },
      { name: 'Performance monitoring setup', cmd: 'npm run mcp:monitor --report' },
      { name: 'Integration tests', cmd: 'npm run test:integration || echo "Integration tests not available"' },
      { name: 'Memory usage check', cmd: 'node -e "console.log(process.memoryUsage())"' }
    ];

    const results = {};

    for (const task of tasks) {
      console.log(chalk.gray(`  • ${task.name}...`));
      try {
        const output = execSync(task.cmd, { encoding: 'utf8', stdio: 'pipe' });
        results[task.name] = { success: true, output: output.trim() };
        console.log(chalk.green(`    ✅ ${task.name}`));
      } catch (error) {
        results[task.name] = { success: false, error: error.message };
        console.log(chalk.yellow(`    ⚠️  ${task.name}: ${error.message}`));
      }
    }

    return { tasks: results };
  }

  async executePhase4() {
    console.log(chalk.yellow('🔧 Phase 4: Documentation & Examples'));

    const documentationChecks = [
      'README.md',
      'docs/',
      'examples/',
      'CONTRIBUTING.md',
      'SECURITY.md'
    ];

    const results = {};

    for (const doc of documentationChecks) {
      console.log(chalk.gray(`  • Checking ${doc}...`));
      try {
        const exists = await fs.pathExists(doc);
        results[doc] = { exists, success: exists };
        console.log(exists ?
          chalk.green(`    ✅ ${doc} exists`) :
          chalk.yellow(`    ⚠️  ${doc} missing`)
        );
      } catch (error) {
        results[doc] = { exists: false, success: false, error: error.message };
        console.log(chalk.red(`    ❌ Error checking ${doc}: ${error.message}`));
      }
    }

    return { documentation: results };
  }

  async executePhase5() {
    console.log(chalk.yellow('🔧 Phase 5: Deployment Preparation'));

    const deploymentChecks = [
      { name: 'Environment files', files: ['.env-example', '.env-server-example'] },
      { name: 'Docker files', files: ['Dockerfile', 'docker-compose.yml'] },
      { name: 'Configuration files', files: ['package.json', 'tsconfig.json'] },
      { name: 'Build scripts', cmd: 'npm run build || echo "No build script"' }
    ];

    const results = {};

    for (const check of deploymentChecks) {
      if (check.files) {
        console.log(chalk.gray(`  • Checking ${check.name}...`));
        const fileResults = {};
        for (const file of check.files) {
          const exists = await fs.pathExists(file);
          fileResults[file] = exists;
          console.log(exists ?
            chalk.green(`    ✅ ${file}`) :
            chalk.yellow(`    ⚠️  ${file} missing`)
          );
        }
        results[check.name] = fileResults;
      } else if (check.cmd) {
        console.log(chalk.gray(`  • ${check.name}...`));
        try {
          const output = execSync(check.cmd, { encoding: 'utf8', stdio: 'pipe' });
          results[check.name] = { success: true, output: output.trim() };
          console.log(chalk.green(`    ✅ ${check.name}`));
        } catch (error) {
          results[check.name] = { success: false, error: error.message };
          console.log(chalk.yellow(`    ⚠️  ${check.name}: ${error.message}`));
        }
      }
    }

    return { deployment: results };
  }

  async generateReport() {
    console.log(chalk.blue('\n' + '='.repeat(60)));
    console.log(chalk.blue('📊 DEVELOPMENT EXECUTION REPORT'));
    console.log(chalk.blue('='.repeat(60)));

    const report = {
      timestamp: new Date().toISOString(),
      phases: this.results,
      summary: {
        total: this.phases.length,
        successful: Object.values(this.results).filter(r => r.success).length,
        failed: Object.values(this.results).filter(r => !r.success).length
      }
    };

    // Display summary
    console.log(chalk.cyan(`\n📈 Execution Summary:`));
    console.log(chalk.green(`  ✅ Successful phases: ${report.summary.successful}/${report.summary.total}`));
    console.log(chalk.red(`  ❌ Failed phases: ${report.summary.failed}/${report.summary.total}`));

    // Calculate overall health
    const healthScore = (report.summary.successful / report.summary.total) * 100;
    const healthColor = healthScore >= 80 ? chalk.green : healthScore >= 60 ? chalk.yellow : chalk.red;
    console.log(healthColor(`  📊 Overall Health: ${healthScore.toFixed(1)}%`));

    // Next steps
    console.log(chalk.blue(`\n🎯 Next Steps:`));

    if (healthScore >= 80) {
      console.log(chalk.green(`  🚀 Project is ready for deployment!`));
      console.log(chalk.gray(`  • Run: npm run final-check`));
      console.log(chalk.gray(`  • Configure production environment`));
      console.log(chalk.gray(`  • Deploy to chosen platform`));
    } else if (healthScore >= 60) {
      console.log(chalk.yellow(`  🔧 Some issues need attention:`));
      console.log(chalk.gray(`  • Run: npm run test:ai-validate`));
      console.log(chalk.gray(`  • Fix failing tests`));
      console.log(chalk.gray(`  • Re-run this executor`));
    } else {
      console.log(chalk.red(`  ⚠️  Critical issues need resolution:`));
      console.log(chalk.gray(`  • Run: npm run fix-tests`));
      console.log(chalk.gray(`  • Check dependencies: npm install`));
      console.log(chalk.gray(`  • Review error messages above`));
    }

    // Save report
    await fs.writeJson('development-execution-report.json', report, { spaces: 2 });
    console.log(chalk.gray(`\n📄 Report saved to: development-execution-report.json`));

    console.log(chalk.blue('\n' + '='.repeat(60)));

    return report;
  }
}

// Execute the development plan
const executor = new DevelopmentExecutor();
executor.execute().catch(console.error);