#!/usr/bin/env node

/**
 * Deployment Readiness Checker
 * Comprehensive assessment of deployment readiness
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
  magenta: (text) => `\x1b[35m${text}\x1b[0m`
};

console.log(chalk.blue('🚀 Audityzer Deployment Readiness Assessment\n'));

class DeploymentChecker {
  constructor () {
    this.checks = {
      environment: [],
      security: [],
      performance: [],
      documentation: [],
      configuration: [],
      testing: []
    };
    this.score = 0;
    this.maxScore = 0;
  }

  async runAllChecks() {
    console.log(chalk.magenta('📋 Running Comprehensive Deployment Readiness Checks\n'));

    await this.checkEnvironment();
    await this.checkSecurity();
    await this.checkPerformance();
    await this.checkDocumentation();
    await this.checkConfiguration();
    await this.checkTesting();

    await this.generateDeploymentReport();
  }

  async checkEnvironment() {
    console.log(chalk.yellow('🌍 Environment Readiness'));

    const checks = [
      {
        name: 'Node.js Version',
        test: () => {
          const version = execSync('node --version', { encoding: 'utf8' }).trim();
          const major = parseInt(version.slice(1).split('.')[0]);
          return { pass: major >= 16, details: version };
        }
      },
      {
        name: 'npm Version',
        test: () => {
          const version = execSync('npm --version', { encoding: 'utf8' }).trim();
          const major = parseInt(version.split('.')[0]);
          return { pass: major >= 8, details: version };
        }
      },
      {
        name: 'Dependencies Installed',
        test: async () => {
          const exists = await fs.pathExists('node_modules');
          return { pass: exists, details: exists ? 'Installed' : 'Missing' };
        }
      },
      {
        name: 'Package.json Valid',
        test: async () => {
          try {
            const pkg = await fs.readJson('package.json');
            return { pass: !!pkg.name && !!pkg.version, details: `${pkg.name}@${pkg.version}` };
          } catch (error) {
            return { pass: false, details: 'Invalid or missing' };
          }
        }
      }
    ];

    await this.runChecks('environment', checks);
  }

  async checkSecurity() {
    console.log(chalk.yellow('\n🔒 Security Readiness'));

    const checks = [
      {
        name: 'Environment Variables',
        test: async () => {
          const hasExample = await fs.pathExists('.env-example');
          const hasEnv = await fs.pathExists('.env');
          return {
            pass: hasExample,
            details: hasExample ? 'Template available' : 'No .env-example found'
          };
        }
      },
      {
        name: 'Security Dependencies',
        test: async () => {
          try {
            const pkg = await fs.readJson('package.json');
            const secDeps = ['helmet', 'cors', 'joi'];
            const found = secDeps.filter(dep =>
              pkg.dependencies?.[dep] || pkg.devDependencies?.[dep]
            );
            return {
              pass: found.length >= 2,
              details: `${found.length}/${secDeps.length} security deps`
            };
          } catch (error) {
            return { pass: false, details: 'Cannot check dependencies' };
          }
        }
      },
      {
        name: 'Input Validation',
        test: async () => {
          const hasValidation = await fs.pathExists('src/mcp/middleware/validation.js');
          return {
            pass: hasValidation,
            details: hasValidation ? 'Validation middleware exists' : 'No validation found'
          };
        }
      },
      {
        name: 'Error Handling',
        test: async () => {
          const hasErrorHandler = await fs.pathExists('src/mcp/middleware/error-handler.js');
          return {
            pass: hasErrorHandler,
            details: hasErrorHandler ? 'Error handler exists' : 'No error handler found'
          };
        }
      }
    ];

    await this.runChecks('security', checks);
  }

  async checkPerformance() {
    console.log(chalk.yellow('\n⚡ Performance Readiness'));

    const checks = [
      {
        name: 'Memory Usage',
        test: () => {
          const usage = process.memoryUsage();
          const heapUsedMB = Math.round(usage.heapUsed / 1024 / 1024);
          return {
            pass: heapUsedMB < 512,
            details: `${heapUsedMB}MB heap used`
          };
        }
      },
      {
        name: 'Compression Middleware',
        test: async () => {
          try {
            const pkg = await fs.readJson('package.json');
            const hasCompression = pkg.dependencies?.compression;
            return {
              pass: !!hasCompression,
              details: hasCompression ? 'Compression available' : 'No compression middleware'
            };
          } catch (error) {
            return { pass: false, details: 'Cannot check dependencies' };
          }
        }
      },
      {
        name: 'Caching Strategy',
        test: async () => {
          // Check for caching implementation
          const files = await fs.readdir('src/mcp', { recursive: true }).catch(() => []);
          const hasCaching = files.some(file => file.includes('cache'));
          return {
            pass: hasCaching,
            details: hasCaching ? 'Caching implemented' : 'No caching found'
          };
        }
      }
    ];

    await this.runChecks('performance', checks);
  }

  async checkDocumentation() {
    console.log(chalk.yellow('\n📚 Documentation Readiness'));

    const checks = [
      {
        name: 'README.md',
        test: async () => {
          const exists = await fs.pathExists('README.md');
          if (!exists) return { pass: false, details: 'Missing' };

          const content = await fs.readFile('README.md', 'utf8');
          const hasInstall = content.includes('install');
          const hasUsage = content.includes('usage') || content.includes('Usage');
          return {
            pass: hasInstall && hasUsage,
            details: `${content.length} chars, install: ${hasInstall}, usage: ${hasUsage}`
          };
        }
      },
      {
        name: 'API Documentation',
        test: async () => {
          const hasApiDocs = await fs.pathExists('docs/api') ||
            await fs.pathExists('src/mcp/README.md');
          return {
            pass: hasApiDocs,
            details: hasApiDocs ? 'API docs available' : 'No API documentation'
          };
        }
      },
      {
        name: 'Examples',
        test: async () => {
          const hasExamples = await fs.pathExists('examples') ||
            await fs.pathExists('src/mcp/examples');
          return {
            pass: hasExamples,
            details: hasExamples ? 'Examples available' : 'No examples found'
          };
        }
      },
      {
        name: 'Contributing Guide',
        test: async () => {
          const hasContributing = await fs.pathExists('CONTRIBUTING.md');
          return {
            pass: hasContributing,
            details: hasContributing ? 'Contributing guide exists' : 'No contributing guide'
          };
        }
      }
    ];

    await this.runChecks('documentation', checks);
  }

  async checkConfiguration() {
    console.log(chalk.yellow('\n⚙️  Configuration Readiness'));

    const checks = [
      {
        name: 'Docker Configuration',
        test: async () => {
          const hasDockerfile = await fs.pathExists('Dockerfile');
          const hasCompose = await fs.pathExists('docker-compose.yml');
          return {
            pass: hasDockerfile,
            details: `Dockerfile: ${hasDockerfile}, Compose: ${hasCompose}`
          };
        }
      },
      {
        name: 'Production Config',
        test: async () => {
          const hasProdEnv = await fs.pathExists('.env.production');
          const hasProdCompose = await fs.pathExists('docker-compose.prod.yml');
          return {
            pass: hasProdEnv || hasProdCompose,
            details: `Prod env: ${hasProdEnv}, Prod compose: ${hasProdCompose}`
          };
        }
      },
      {
        name: 'Server Configuration',
        test: async () => {
          const hasServerConfig = await fs.pathExists('src/mcp/config.js') ||
            await fs.pathExists('src/config');
          return {
            pass: hasServerConfig,
            details: hasServerConfig ? 'Server config exists' : 'No server config'
          };
        }
      },
      {
        name: 'Build Scripts',
        test: async () => {
          try {
            const pkg = await fs.readJson('package.json');
            const hasBuild = pkg.scripts?.build || pkg.scripts?.start;
            return {
              pass: !!hasBuild,
              details: hasBuild ? 'Build/start scripts available' : 'No build scripts'
            };
          } catch (error) {
            return { pass: false, details: 'Cannot check package.json' };
          }
        }
      }
    ];

    await this.runChecks('configuration', checks);
  }

  async checkTesting() {
    console.log(chalk.yellow('\n🧪 Testing Readiness'));

    const checks = [
      {
        name: 'Test Framework',
        test: async () => {
          try {
            const pkg = await fs.readJson('package.json');
            const hasJest = pkg.devDependencies?.jest;
            return {
              pass: !!hasJest,
              details: hasJest ? `Jest ${hasJest}` : 'No test framework'
            };
          } catch (error) {
            return { pass: false, details: 'Cannot check dependencies' };
          }
        }
      },
      {
        name: 'Test Coverage',
        test: () => {
          try {
            execSync('npm run test:ai-basic', { stdio: 'pipe' });
            return { pass: true, details: 'Basic tests passing' };
          } catch (error) {
            return { pass: false, details: 'Tests failing' };
          }
        }
      },
      {
        name: 'AI Component Tests',
        test: () => {
          try {
            execSync('npm run test:ai-status', { stdio: 'pipe' });
            return { pass: true, details: 'AI tests available' };
          } catch (error) {
            return { pass: false, details: 'AI tests not working' };
          }
        }
      },
      {
        name: 'Integration Tests',
        test: async () => {
          const hasIntegrationTests = await fs.pathExists('test/integration') ||
            await fs.pathExists('tests/integration');
          return {
            pass: hasIntegrationTests,
            details: hasIntegrationTests ? 'Integration tests exist' : 'No integration tests'
          };
        }
      }
    ];

    await this.runChecks('testing', checks);
  }

  async runChecks(category, checks) {
    for (const check of checks) {
      try {
        const result = await check.test();
        this.checks[category].push({
          name: check.name,
          pass: result.pass,
          details: result.details
        });

        if (result.pass) {
          this.score++;
          console.log(chalk.green(`  ✅ ${check.name}: ${result.details}`));
        } else {
          console.log(chalk.red(`  ❌ ${check.name}: ${result.details}`));
        }
        this.maxScore++;
      } catch (error) {
        this.checks[category].push({
          name: check.name,
          pass: false,
          details: `Error: ${error.message}`
        });
        console.log(chalk.red(`  ❌ ${check.name}: Error - ${error.message}`));
        this.maxScore++;
      }
    }
  }

  async generateDeploymentReport() {
    console.log(chalk.blue('\n' + '='.repeat(60)));
    console.log(chalk.blue('🚀 DEPLOYMENT READINESS REPORT'));
    console.log(chalk.blue('='.repeat(60)));

    const percentage = Math.round((this.score / this.maxScore) * 100);
    const grade = this.getGrade(percentage);

    console.log(chalk.cyan(`\n📊 Overall Readiness Score: ${this.score}/${this.maxScore} (${percentage}%)`));
    console.log(this.getGradeColor(grade)(`🎯 Deployment Grade: ${grade}`));

    // Category breakdown
    console.log(chalk.blue(`\n📋 Category Breakdown:`));
    for (const [category, checks] of Object.entries(this.checks)) {
      const passed = checks.filter(c => c.pass).length;
      const total = checks.length;
      const categoryPercentage = Math.round((passed / total) * 100);

      console.log(chalk.gray(`  ${category}: ${passed}/${total} (${categoryPercentage}%)`));
    }

    // Deployment recommendations
    console.log(chalk.blue(`\n🎯 Deployment Recommendations:`));

    if (percentage >= 90) {
      console.log(chalk.green(`  🚀 READY FOR PRODUCTION DEPLOYMENT!`));
      console.log(chalk.gray(`  • All critical systems are operational`));
      console.log(chalk.gray(`  • Recommended platforms: Railway, Render, DigitalOcean`));
      console.log(chalk.gray(`  • Consider setting up monitoring and alerts`));
    } else if (percentage >= 75) {
      console.log(chalk.yellow(`  ⚠️  READY FOR STAGING DEPLOYMENT`));
      console.log(chalk.gray(`  • Most systems are ready`));
      console.log(chalk.gray(`  • Address failing checks before production`));
      console.log(chalk.gray(`  • Test thoroughly in staging environment`));
    } else if (percentage >= 60) {
      console.log(chalk.yellow(`  🔧 NEEDS IMPROVEMENT BEFORE DEPLOYMENT`));
      console.log(chalk.gray(`  • Several critical issues need attention`));
      console.log(chalk.gray(`  • Focus on security and testing improvements`));
      console.log(chalk.gray(`  • Consider development deployment only`));
    } else {
      console.log(chalk.red(`  ❌ NOT READY FOR DEPLOYMENT`));
      console.log(chalk.gray(`  • Critical issues must be resolved`));
      console.log(chalk.gray(`  • Run: npm run fix-tests`));
      console.log(chalk.gray(`  • Complete setup and testing first`));
    }

    // Next steps
    console.log(chalk.blue(`\n📝 Next Steps:`));

    const failedChecks = [];
    for (const [category, checks] of Object.entries(this.checks)) {
      const failed = checks.filter(c => !c.pass);
      if (failed.length > 0) {
        failedChecks.push({ category, failed });
      }
    }

    if (failedChecks.length === 0) {
      console.log(chalk.green(`  1. Configure production environment variables`));
      console.log(chalk.green(`  2. Choose deployment platform`));
      console.log(chalk.green(`  3. Set up monitoring and logging`));
      console.log(chalk.green(`  4. Deploy to production!`));
    } else {
      console.log(chalk.yellow(`  Priority fixes needed:`));
      failedChecks.slice(0, 3).forEach((item, index) => {
        console.log(chalk.gray(`  ${index + 1}. ${item.category}: ${item.failed[0].name}`));
      });
    }

    // Save report
    const report = {
      timestamp: new Date().toISOString(),
      score: this.score,
      maxScore: this.maxScore,
      percentage,
      grade,
      checks: this.checks,
      recommendations: this.getRecommendations(percentage)
    };

    await fs.writeJson('deployment-readiness-report.json', report, { spaces: 2 });
    console.log(chalk.gray(`\n📄 Report saved to: deployment-readiness-report.json`));

    console.log(chalk.blue('\n' + '='.repeat(60)));
  }

  getGrade(percentage) {
    if (percentage >= 90) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 80) return 'B+';
    if (percentage >= 75) return 'B';
    if (percentage >= 70) return 'C+';
    if (percentage >= 65) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }

  getGradeColor(grade) {
    if (['A+', 'A'].includes(grade)) return chalk.green;
    if (['B+', 'B'].includes(grade)) return chalk.yellow;
    if (['C+', 'C'].includes(grade)) return chalk.yellow;
    return chalk.red;
  }

  getRecommendations(percentage) {
    if (percentage >= 90) {
      return [
        'Set up production monitoring',
        'Configure automated backups',
        'Implement CI/CD pipeline',
        'Set up error tracking'
      ];
    } else if (percentage >= 75) {
      return [
        'Fix failing security checks',
        'Improve test coverage',
        'Complete documentation',
        'Test in staging environment'
      ];
    } else {
      return [
        'Fix critical failing checks',
        'Complete basic setup',
        'Implement security measures',
        'Add comprehensive testing'
      ];
    }
  }
}

// Run deployment readiness check
const checker = new DeploymentChecker();
checker.runAllChecks().catch(console.error);