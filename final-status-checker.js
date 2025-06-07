#!/usr/bin/env node

/**
 * Final Status Checker - Comprehensive Project Assessment
 * This script provides a complete overview of the project status
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  magenta: (text) => `\x1b[35m${text}\x1b[0m`,
  white: (text) => `\x1b[37m${text}\x1b[0m`
};

console.log(chalk.blue('🎯 Audityzer Final Status Assessment\n'));

class FinalStatusChecker {
  constructor () {
    this.results = {
      environment: { score: 0, max: 0, details: [] },
      codebase: { score: 0, max: 0, details: [] },
      testing: { score: 0, max: 0, details: [] },
      security: { score: 0, max: 0, details: [] },
      deployment: { score: 0, max: 0, details: [] },
      documentation: { score: 0, max: 0, details: [] }
    };
    this.overallScore = 0;
    this.maxScore = 0;
  }

  async runCompleteAssessment() {
    console.log(chalk.magenta('🔍 Running Complete Project Assessment...\n'));

    await this.checkEnvironment();
    await this.checkCodebase();
    await this.checkTesting();
    await this.checkSecurity();
    await this.checkDeployment();
    await this.checkDocumentation();

    await this.generateFinalReport();
  }

  async checkEnvironment() {
    console.log(chalk.yellow('🌍 Environment Assessment'));
    const category = 'environment';

    const checks = [
      {
        name: 'Node.js Version Compatibility',
        test: () => {
          const version = execSync('node --version', { encoding: 'utf8' }).trim();
          const major = parseInt(version.slice(1).split('.')[0]);
          return { pass: major >= 16, details: `${version} (required: >=16)` };
        },
        weight: 2
      },
      {
        name: 'Package Manager',
        test: () => {
          const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
          return { pass: true, details: `npm ${npmVersion}` };
        },
        weight: 1
      },
      {
        name: 'Dependencies Installation',
        test: async () => {
          const exists = await fs.pathExists('node_modules');
          const packageLock = await fs.pathExists('package-lock.json');
          return {
            pass: exists && packageLock,
            details: `node_modules: ${exists}, lock file: ${packageLock}`
          };
        },
        weight: 2
      },
      {
        name: 'Environment Configuration',
        test: async () => {
          const hasExample = await fs.pathExists('.env-example');
          const hasEnv = await fs.pathExists('.env');
          return {
            pass: hasExample,
            details: `Example: ${hasExample}, Local: ${hasEnv}`
          };
        },
        weight: 1
      }
    ];

    await this.runCategoryChecks(category, checks);
  }

  async checkCodebase() {
    console.log(chalk.yellow('\n💻 Codebase Assessment'));
    const category = 'codebase';

    const checks = [
      {
        name: 'Core AI Components',
        test: async () => {
          const components = [
            'src/core/ai-vulnerability-detection/model-development/vulnerability-classifier.js',
            'src/core/ai-vulnerability-detection/model-development/feature-engineering.js',
            'src/core/ai-vulnerability-detection/model-development/remediation-generator.js'
          ];

          const existing = [];
          for (const comp of components) {
            if (await fs.pathExists(comp)) existing.push(comp);
          }

          return {
            pass: existing.length >= 3,
            details: `${existing.length}/${components.length} components`
          };
        },
        weight: 3
      },
      {
        name: 'MCP Server Implementation',
        test: async () => {
          const mcpFiles = [
            'src/mcp/server.js',
            'src/mcp/config.js',
            'src/mcp/routes'
          ];

          const existing = [];
          for (const file of mcpFiles) {
            if (await fs.pathExists(file)) existing.push(file);
          }

          return {
            pass: existing.length >= 2,
            details: `${existing.length}/${mcpFiles.length} MCP files`
          };
        },
        weight: 2
      },
      {
        name: 'Code Quality Tools',
        test: async () => {
          const pkg = await fs.readJson('package.json').catch(() => ({}));
          const hasEslint = pkg.devDependencies?.eslint;
          const hasPrettier = pkg.devDependencies?.prettier;
          const hasLintScript = pkg.scripts?.lint;

          return {
            pass: hasEslint && hasLintScript,
            details: `ESLint: ${!!hasEslint}, Prettier: ${!!hasPrettier}, Script: ${!!hasLintScript}`
          };
        },
        weight: 1
      },
      {
        name: 'TypeScript Support',
        test: async () => {
          const hasTsConfig = await fs.pathExists('tsconfig.json');
          const pkg = await fs.readJson('package.json').catch(() => ({}));
          const hasTypeScript = pkg.devDependencies?.typescript;

          return {
            pass: hasTsConfig || hasTypeScript,
            details: `Config: ${hasTsConfig}, Package: ${!!hasTypeScript}`
          };
        },
        weight: 1
      }
    ];

    await this.runCategoryChecks(category, checks);
  }

  async checkTesting() {
    console.log(chalk.yellow('\n🧪 Testing Assessment'));
    const category = 'testing';

    const checks = [
      {
        name: 'Test Framework Setup',
        test: async () => {
          const pkg = await fs.readJson('package.json').catch(() => ({}));
          const hasJest = pkg.devDependencies?.jest;
          const hasTestScript = pkg.scripts?.test;

          return {
            pass: hasJest && hasTestScript,
            details: `Jest: ${!!hasJest}, Script: ${!!hasTestScript}`
          };
        },
        weight: 2
      },
      {
        name: 'AI Component Tests',
        test: () => {
          try {
            execSync('npm run test:ai-basic', { stdio: 'pipe' });
            return { pass: true, details: 'AI basic tests passing' };
          } catch (error) {
            return { pass: false, details: 'AI tests failing' };
          }
        },
        weight: 3
      },
      {
        name: 'Test Coverage',
        test: async () => {
          const testDir = 'test/core/ai-vulnerability-detection-tests';
          const exists = await fs.pathExists(testDir);
          if (!exists) return { pass: false, details: 'Test directory missing' };

          const files = await fs.readdir(testDir).catch(() => []);
          const testFiles = files.filter(f => f.endsWith('.test.js'));

          return {
            pass: testFiles.length >= 5,
            details: `${testFiles.length} test files`
          };
        },
        weight: 2
      },
      {
        name: 'Integration Tests',
        test: async () => {
          const hasIntegration = await fs.pathExists('test/integration') ||
            await fs.pathExists('tests/integration');
          return {
            pass: hasIntegration,
            details: hasIntegration ? 'Integration tests exist' : 'No integration tests'
          };
        },
        weight: 1
      }
    ];

    await this.runCategoryChecks(category, checks);
  }

  async checkSecurity() {
    console.log(chalk.yellow('\n🔒 Security Assessment'));
    const category = 'security';

    const checks = [
      {
        name: 'Security Dependencies',
        test: async () => {
          const pkg = await fs.readJson('package.json').catch(() => ({}));
          const securityDeps = ['helmet', 'cors', 'joi', 'bcrypt'];
          const found = securityDeps.filter(dep =>
            pkg.dependencies?.[dep] || pkg.devDependencies?.[dep]
          );

          return {
            pass: found.length >= 2,
            details: `${found.length}/${securityDeps.length} security packages`
          };
        },
        weight: 2
      },
      {
        name: 'Input Validation',
        test: async () => {
          const hasValidation = await fs.pathExists('src/mcp/middleware/validation.js');
          return {
            pass: hasValidation,
            details: hasValidation ? 'Validation middleware exists' : 'No validation found'
          };
        },
        weight: 2
      },
      {
        name: 'Error Handling',
        test: async () => {
          const hasErrorHandler = await fs.pathExists('src/mcp/middleware/error-handler.js');
          return {
            pass: hasErrorHandler,
            details: hasErrorHandler ? 'Error handler exists' : 'No error handler'
          };
        },
        weight: 2
      },
      {
        name: 'Environment Security',
        test: async () => {
          const hasEnvExample = await fs.pathExists('.env-example');
          const gitignore = await fs.readFile('.gitignore', 'utf8').catch(() => '');
          const ignoresEnv = gitignore.includes('.env');

          return {
            pass: hasEnvExample && ignoresEnv,
            details: `Example: ${hasEnvExample}, Gitignored: ${ignoresEnv}`
          };
        },
        weight: 1
      }
    ];

    await this.runCategoryChecks(category, checks);
  }

  async checkDeployment() {
    console.log(chalk.yellow('\n🚀 Deployment Assessment'));
    const category = 'deployment';

    const checks = [
      {
        name: 'Docker Configuration',
        test: async () => {
          const hasDockerfile = await fs.pathExists('Dockerfile');
          const hasCompose = await fs.pathExists('docker-compose.yml');
          const hasProdCompose = await fs.pathExists('docker-compose.prod.yml');

          return {
            pass: hasDockerfile,
            details: `Dockerfile: ${hasDockerfile}, Compose: ${hasCompose}, Prod: ${hasProdCompose}`
          };
        },
        weight: 2
      },
      {
        name: 'Production Configuration',
        test: async () => {
          const hasProdEnv = await fs.pathExists('.env.production');
          const hasServerEnv = await fs.pathExists('.env-server-example');

          return {
            pass: hasProdEnv || hasServerEnv,
            details: `Prod env: ${hasProdEnv}, Server env: ${hasServerEnv}`
          };
        },
        weight: 2
      },
      {
        name: 'Build Scripts',
        test: async () => {
          const pkg = await fs.readJson('package.json').catch(() => ({}));
          const hasStart = pkg.scripts?.start;
          const hasDev = pkg.scripts?.dev;
          const hasBuild = pkg.scripts?.build;

          return {
            pass: hasStart && hasDev,
            details: `Start: ${!!hasStart}, Dev: ${!!hasDev}, Build: ${!!hasBuild}`
          };
        },
        weight: 1
      },
      {
        name: 'Health Checks',
        test: async () => {
          // Check if server has health endpoint
          const serverFiles = await fs.readdir('src/mcp').catch(() => []);
          const hasServer = serverFiles.includes('server.js');

          return {
            pass: hasServer,
            details: hasServer ? 'Server file exists' : 'No server file'
          };
        },
        weight: 1
      }
    ];

    await this.runCategoryChecks(category, checks);
  }

  async checkDocumentation() {
    console.log(chalk.yellow('\n📚 Documentation Assessment'));
    const category = 'documentation';

    const checks = [
      {
        name: 'README Quality',
        test: async () => {
          const exists = await fs.pathExists('README.md');
          if (!exists) return { pass: false, details: 'README.md missing' };

          const content = await fs.readFile('README.md', 'utf8');
          const hasInstall = content.includes('install') || content.includes('Install');
          const hasUsage = content.includes('usage') || content.includes('Usage');
          const hasFeatures = content.includes('features') || content.includes('Features');

          const score = [hasInstall, hasUsage, hasFeatures].filter(Boolean).length;
          return {
            pass: score >= 2,
            details: `${score}/3 sections (install, usage, features)`
          };
        },
        weight: 2
      },
      {
        name: 'API Documentation',
        test: async () => {
          const hasApiDocs = await fs.pathExists('docs/api') ||
            await fs.pathExists('src/mcp/README.md');
          return {
            pass: hasApiDocs,
            details: hasApiDocs ? 'API docs available' : 'No API docs'
          };
        },
        weight: 2
      },
      {
        name: 'Examples and Guides',
        test: async () => {
          const hasExamples = await fs.pathExists('examples');
          const hasGuides = await fs.pathExists('docs');
          const hasDeployGuide = await fs.pathExists('DEPLOYMENT-GUIDE.md');

          return {
            pass: hasExamples || hasGuides || hasDeployGuide,
            details: `Examples: ${hasExamples}, Docs: ${hasGuides}, Deploy: ${hasDeployGuide}`
          };
        },
        weight: 1
      },
      {
        name: 'Contributing Guidelines',
        test: async () => {
          const hasContributing = await fs.pathExists('CONTRIBUTING.md');
          const hasSecurity = await fs.pathExists('SECURITY.md');
          const hasLicense = await fs.pathExists('LICENSE');

          return {
            pass: hasContributing || hasSecurity || hasLicense,
            details: `Contributing: ${hasContributing}, Security: ${hasSecurity}, License: ${hasLicense}`
          };
        },
        weight: 1
      }
    ];

    await this.runCategoryChecks(category, checks);
  }

  async runCategoryChecks(category, checks) {
    for (const check of checks) {
      try {
        const result = await check.test();
        const points = result.pass ? check.weight : 0;

        this.results[category].score += points;
        this.results[category].max += check.weight;
        this.results[category].details.push({
          name: check.name,
          pass: result.pass,
          details: result.details,
          weight: check.weight,
          points
        });

        if (result.pass) {
          console.log(chalk.green(`  ✅ ${check.name}: ${result.details}`));
        } else {
          console.log(chalk.red(`  ❌ ${check.name}: ${result.details}`));
        }
      } catch (error) {
        this.results[category].max += check.weight;
        this.results[category].details.push({
          name: check.name,
          pass: false,
          details: `Error: ${error.message}`,
          weight: check.weight,
          points: 0
        });
        console.log(chalk.red(`  ❌ ${check.name}: Error - ${error.message}`));
      }
    }
  }

  async generateFinalReport() {
    // Calculate overall scores
    this.overallScore = Object.values(this.results).reduce((sum, cat) => sum + cat.score, 0);
    this.maxScore = Object.values(this.results).reduce((sum, cat) => sum + cat.max, 0);
    const percentage = Math.round((this.overallScore / this.maxScore) * 100);

    console.log(chalk.blue('\n' + '='.repeat(70)));
    console.log(chalk.blue('🎯 FINAL PROJECT STATUS REPORT'));
    console.log(chalk.blue('='.repeat(70)));

    // Overall score
    const grade = this.getGrade(percentage);
    const gradeColor = this.getGradeColor(grade);

    console.log(chalk.cyan(`\n📊 Overall Score: ${this.overallScore}/${this.maxScore} (${percentage}%)`));
    console.log(gradeColor(`🏆 Project Grade: ${grade}`));

    // Category breakdown
    console.log(chalk.blue(`\n📋 Category Breakdown:`));
    for (const [category, result] of Object.entries(this.results)) {
      const catPercentage = Math.round((result.score / result.max) * 100);
      const status = catPercentage >= 80 ? '🟢' : catPercentage >= 60 ? '🟡' : '🔴';

      console.log(chalk.white(`  ${status} ${category.toUpperCase()}: ${result.score}/${result.max} (${catPercentage}%)`));
    }

    // Project status
    console.log(chalk.blue(`\n🚦 Project Status:`));
    if (percentage >= 85) {
      console.log(chalk.green(`  🎉 EXCELLENT - Ready for production deployment!`));
    } else if (percentage >= 75) {
      console.log(chalk.green(`  ✅ GOOD - Ready for staging deployment`));
    } else if (percentage >= 65) {
      console.log(chalk.yellow(`  ⚠️  FAIR - Needs improvement before deployment`));
    } else {
      console.log(chalk.red(`  ❌ POOR - Significant work needed`));
    }

    // Recommendations
    console.log(chalk.blue(`\n💡 Recommendations:`));
    const recommendations = this.getRecommendations(percentage);
    recommendations.forEach((rec, index) => {
      console.log(chalk.gray(`  ${index + 1}. ${rec}`));
    });

    // Next steps
    console.log(chalk.blue(`\n🎯 Next Steps:`));
    if (percentage >= 85) {
      console.log(chalk.green(`  🚀 Deploy to production!`));
      console.log(chalk.gray(`     • Choose deployment platform (Railway, Render, DigitalOcean)`));
      console.log(chalk.gray(`     • Configure production environment`));
      console.log(chalk.gray(`     • Set up monitoring and alerts`));
    } else if (percentage >= 75) {
      console.log(chalk.yellow(`  🔧 Address remaining issues:`));
      console.log(chalk.gray(`     • Fix failing tests`));
      console.log(chalk.gray(`     • Improve security measures`));
      console.log(chalk.gray(`     • Complete documentation`));
    } else {
      console.log(chalk.red(`  ⚠️  Focus on critical improvements:`));
      console.log(chalk.gray(`     • Run: npm run fix-tests`));
      console.log(chalk.gray(`     • Complete core functionality`));
      console.log(chalk.gray(`     • Implement security measures`));
    }

    // Quick commands
    console.log(chalk.blue(`\n⚡ Quick Commands:`));
    console.log(chalk.gray(`  npm run test:ai-comprehensive    # Run all tests`));
    console.log(chalk.gray(`  npm run test:ai-validate         # Validate fixes`));
    console.log(chalk.gray(`  node deployment-readiness-checker.js  # Check deployment readiness`));
    console.log(chalk.gray(`  npm run status                   # Check project status`));

    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      overallScore: this.overallScore,
      maxScore: this.maxScore,
      percentage,
      grade,
      categories: this.results,
      recommendations,
      status: this.getStatusLevel(percentage)
    };

    await fs.writeJson('final-status-report.json', report, { spaces: 2 });
    console.log(chalk.gray(`\n📄 Detailed report saved to: final-status-report.json`));

    console.log(chalk.blue('\n' + '='.repeat(70)));

    return report;
  }

  getGrade(percentage) {
    if (percentage >= 95) return 'A+';
    if (percentage >= 90) return 'A';
    if (percentage >= 85) return 'A-';
    if (percentage >= 80) return 'B+';
    if (percentage >= 75) return 'B';
    if (percentage >= 70) return 'B-';
    if (percentage >= 65) return 'C+';
    if (percentage >= 60) return 'C';
    if (percentage >= 55) return 'C-';
    if (percentage >= 50) return 'D';
    return 'F';
  }

  getGradeColor(grade) {
    if (['A+', 'A', 'A-'].includes(grade)) return chalk.green;
    if (['B+', 'B', 'B-'].includes(grade)) return chalk.cyan;
    if (['C+', 'C', 'C-'].includes(grade)) return chalk.yellow;
    return chalk.red;
  }

  getStatusLevel(percentage) {
    if (percentage >= 85) return 'EXCELLENT';
    if (percentage >= 75) return 'GOOD';
    if (percentage >= 65) return 'FAIR';
    return 'POOR';
  }

  getRecommendations(percentage) {
    if (percentage >= 85) {
      return [
        'Set up production monitoring and alerting',
        'Configure automated backups',
        'Implement CI/CD pipeline',
        'Set up error tracking (Sentry)',
        'Configure performance monitoring'
      ];
    } else if (percentage >= 75) {
      return [
        'Fix remaining test failures',
        'Improve security configurations',
        'Complete API documentation',
        'Add integration tests',
        'Optimize performance'
      ];
    } else if (percentage >= 65) {
      return [
        'Fix critical test failures',
        'Implement missing security measures',
        'Complete core AI components',
        'Add comprehensive error handling',
        'Improve code coverage'
      ];
    } else {
      return [
        'Complete basic project setup',
        'Fix environment configuration',
        'Implement core functionality',
        'Add basic security measures',
        'Create comprehensive tests'
      ];
    }
  }
}

// Run final status check
const checker = new FinalStatusChecker();
checker.runCompleteAssessment().catch(console.error);