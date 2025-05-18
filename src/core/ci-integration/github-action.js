/**
 * GitHub Actions Integration Module
 *
 * Provides integration with GitHub Actions for automated security scanning,
 * deployment validation, and bug bounty report generation.
 */

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const chalk = require('chalk');

class GitHubActionIntegration {
  /**
   * Initialize the GitHub Actions integration
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    this.options = {
      workflowsDir: options.workflowsDir || '.github/workflows',
      securityScanWorkflow: options.securityScanWorkflow || 'web3-security-scan.yml',
      deployValidationWorkflow: options.deployValidationWorkflow || 'deploy-validation.yml',
      bountyReadinessWorkflow: options.bountyReadinessWorkflow || 'bounty-readiness.yml',
      l2ValidationWorkflow: options.l2ValidationWorkflow || 'l2-validation.yml',
      generateIfMissing: options.generateIfMissing !== false,
    };

    // Ensure workflows directory exists
    if (this.options.generateIfMissing) {
      fs.ensureDirSync(path.join(process.cwd(), this.options.workflowsDir));
    }
  }

  /**
   * Add or update security scan workflow
   * @param {Object} config - Configuration for the workflow
   * @returns {boolean} Success status
   */
  addSecurityScanWorkflow(config = {}) {
    const workflowPath = path.join(
      process.cwd(),
      this.options.workflowsDir,
      this.options.securityScanWorkflow
    );

    try {
      // Default workflow configuration
      const workflowConfig = {
        name: config.name || 'Web3 Security Scan',
        on: config.on || {
          push: {
            branches: ['main', 'master', 'develop'],
          },
          pull_request: {
            branches: ['main', 'master', 'develop'],
          },
          workflow_dispatch: {
            inputs: {
              scan_mode: {
                description: 'Scan mode',
                required: true,
                default: 'full',
                type: 'choice',
                options: ['quick', 'standard', 'full'],
              },
              target_contracts: {
                description: 'Target contracts directory',
                required: false,
                default: 'contracts',
              },
              l2_validation: {
                description: 'Enable L2 validation',
                required: false,
                default: true,
                type: 'boolean',
              },
            },
          },
        },
        env: {
          NODE_VERSION: config.nodeVersion || '18.x',
        },
        jobs: {
          'security-scan': {
            name: 'Web3 Security Scan',
            'runs-on': 'ubuntu-latest',
            steps: [
              {
                name: 'Checkout code',
                uses: 'actions/checkout@v3',
              },
              {
                name: 'Setup Node.js',
                uses: 'actions/setup-node@v3',
                with: {
                  'node-version': '${{ env.NODE_VERSION }}',
                  cache: 'npm',
                },
              },
              {
                name: 'Install dependencies',
                run: 'npm ci',
              },
              {
                name: 'Run security scan',
                run: [
                  'echo "Running Web3 security scan in ${{ github.event.inputs.scan_mode || \'standard\' }} mode"',
                  "npm run security-scan -- --mode=${{ github.event.inputs.scan_mode || 'standard' }} --contracts=${{ github.event.inputs.target_contracts || 'contracts' }}",
                ].join('\n'),
              },
              {
                name: 'Run AI vulnerability detection',
                if: "${{ github.event.inputs.scan_mode != 'quick' }}",
                run: 'npm run ai-scan:verbose',
              },
              {
                name: 'Run L2 validation',
                if: "${{ github.event.inputs.l2_validation != 'false' }}",
                run: 'npm run security-validate -- --l2=true',
              },
              {
                name: 'Generate security report',
                run: [
                  'mkdir -p reports',
                  'npm run viz:report -- --output=reports/security-report',
                ].join('\n'),
              },
              {
                name: 'Archive security reports',
                uses: 'actions/upload-artifact@v3',
                with: {
                  name: 'security-reports',
                  path: ['reports/', 'test-results/security/'].join('\n'),
                },
              },
            ],
          },
        },
      };

      // Add deployment validation job if specified
      if (config.includeDeployValidation) {
        workflowConfig.jobs['deploy-validation'] = {
          name: 'Deployment Validation',
          'runs-on': 'ubuntu-latest',
          needs: 'security-scan',
          if: "github.event_name == 'pull_request' && contains(github.event.pull_request.labels.*.name, 'deployment')",
          steps: [
            {
              name: 'Checkout code',
              uses: 'actions/checkout@v3',
            },
            {
              name: 'Setup Node.js',
              uses: 'actions/setup-node@v3',
              with: {
                'node-version': '${{ env.NODE_VERSION }}',
                cache: 'npm',
              },
            },
            {
              name: 'Install dependencies',
              run: 'npm ci',
            },
            {
              name: 'Validate deployment',
              run: 'npm run deploy-validate -- --check-verification --check-security',
            },
            {
              name: 'Archive deployment reports',
              uses: 'actions/upload-artifact@v3',
              with: {
                name: 'deployment-reports',
                path: 'test-results/deployment/',
              },
            },
          ],
        };
      }

      // Add bounty-ready job if specified
      if (config.includeBountyReadiness) {
        workflowConfig.jobs['bounty-ready'] = {
          name: 'Prepare Bug Bounty Package',
          'runs-on': 'ubuntu-latest',
          needs: config.includeDeployValidation
            ? ['security-scan', 'deploy-validation']
            : 'security-scan',
          if: "github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'",
          steps: [
            {
              name: 'Checkout code',
              uses: 'actions/checkout@v3',
            },
            {
              name: 'Setup Node.js',
              uses: 'actions/setup-node@v3',
              with: {
                'node-version': '${{ env.NODE_VERSION }}',
                cache: 'npm',
              },
            },
            {
              name: 'Install dependencies',
              run: 'npm ci',
            },
            {
              name: 'Download security reports',
              uses: 'actions/download-artifact@v3',
              with: {
                name: 'security-reports',
                path: 'reports/',
              },
            },
            {
              name: 'Generate Immunefi submission',
              run: 'npm run submit-to-immunefi -- --input=reports/security-report.json',
            },
            {
              name: 'Generate HackenProof submission',
              run: 'node src/core/bounty-integration/cli.js submit-to-hackenproof --input=reports/security-report.json',
            },
            {
              name: 'Archive bounty submissions',
              uses: 'actions/upload-artifact@v3',
              with: {
                name: 'bounty-submissions',
                path: ['test-results/bounty-submissions/', 'reports/bounty-*/'].join('\n'),
              },
            },
          ],
        };
      }

      // Write workflow file
      fs.writeFileSync(workflowPath, yaml.dump(workflowConfig));
      console.log(chalk.green(`Security scan workflow created at ${workflowPath}`));
      return true;
    } catch (error) {
      console.error(chalk.red(`Error creating security scan workflow: ${error.message}`));
      return false;
    }
  }

  /**
   * Add or update deployment validation workflow
   * @param {Object} config - Configuration for the workflow
   * @returns {boolean} Success status
   */
  addDeployValidationWorkflow(config = {}) {
    const workflowPath = path.join(
      process.cwd(),
      this.options.workflowsDir,
      this.options.deployValidationWorkflow
    );

    try {
      // Default workflow configuration
      const workflowConfig = {
        name: config.name || 'Deployment Validation',
        on: config.on || {
          pull_request: {
            types: ['labeled'],
            branches: ['main', 'master', 'develop'],
          },
          workflow_dispatch: {
            inputs: {
              deploy_dir: {
                description: 'Deployments directory',
                required: false,
                default: 'deployments',
              },
              networks: {
                description: 'Networks to validate (comma-separated)',
                required: false,
              },
              l2_validation: {
                description: 'Enable L2-specific validation',
                required: false,
                default: true,
                type: 'boolean',
              },
            },
          },
        },
        env: {
          NODE_VERSION: config.nodeVersion || '18.x',
        },
        jobs: {
          'validate-deployment': {
            name: 'Validate Contract Deployment',
            'runs-on': 'ubuntu-latest',
            if: "github.event_name == 'workflow_dispatch' || contains(github.event.pull_request.labels.*.name, 'deployment')",
            steps: [
              {
                name: 'Checkout code',
                uses: 'actions/checkout@v3',
              },
              {
                name: 'Setup Node.js',
                uses: 'actions/setup-node@v3',
                with: {
                  'node-version': '${{ env.NODE_VERSION }}',
                  cache: 'npm',
                },
              },
              {
                name: 'Install dependencies',
                run: 'npm ci',
              },
              {
                name: 'Validate deployment',
                run: [
                  'npm run deploy-validate -- \\',
                  "  --deploy-dir=${{ github.event.inputs.deploy_dir || 'deployments' }} \\",
                  '  --output=./test-results/deployment \\',
                  '  --format=md \\',
                  '  --check-verification=true \\',
                  '  --check-security=true \\',
                  "  --l2=${{ github.event.inputs.l2_validation || 'true' }} \\",
                  '  --gas-optimization=true \\',
                  "  ${{ github.event.inputs.networks && format('--networks={0}', github.event.inputs.networks) || '' }}",
                ].join('\n'),
              },
              {
                name: 'Check for critical issues',
                run: [
                  'if grep -q "CRITICAL" test-results/deployment/validation-report.md; then',
                  '  echo "::error::Critical deployment issues found. See the validation report for details."',
                  '  exit 1',
                  'fi',
                ].join('\n'),
              },
              {
                name: 'Archive deployment reports',
                uses: 'actions/upload-artifact@v3',
                with: {
                  name: 'deployment-reports',
                  path: 'test-results/deployment/',
                },
              },
              {
                name: 'Add report comment to PR',
                if: "github.event_name == 'pull_request'",
                uses: 'actions/github-script@v6',
                with: {
                  script: [
                    'const fs = require("fs");',
                    'const report = fs.readFileSync("test-results/deployment/validation-report.md", "utf8");',
                    'const message = `## Deployment Validation Report\\n\\n${report}`;',
                    'github.rest.issues.createComment({',
                    '  issue_number: context.issue.number,',
                    '  owner: context.repo.owner,',
                    '  repo: context.repo.repo,',
                    '  body: message',
                    '});',
                  ].join('\n'),
                },
              },
            ],
          },
        },
      };

      // Add gas report if specified
      if (config.includeGasReport) {
        workflowConfig.jobs['validate-deployment'].steps.push({
          name: 'Generate Gas Usage Report',
          run: "npm run gas-report -- --deployments=${{ github.event.inputs.deploy_dir || 'deployments' }} --output=./test-results/gas-report",
        });

        // Update artifact to include gas report
        const artifactStep = workflowConfig.jobs['validate-deployment'].steps.find(
          step => step.name === 'Archive deployment reports'
        );
        if (artifactStep) {
          artifactStep.with.path = ['test-results/deployment/', 'test-results/gas-report/'].join(
            '\n'
          );
        }
      }

      // Write workflow file
      fs.writeFileSync(workflowPath, yaml.dump(workflowConfig));
      console.log(chalk.green(`Deployment validation workflow created at ${workflowPath}`));
      return true;
    } catch (error) {
      console.error(chalk.red(`Error creating deployment validation workflow: ${error.message}`));
      return false;
    }
  }

  /**
   * Add or update bug bounty readiness workflow
   * @param {Object} config - Configuration for the workflow
   * @returns {boolean} Success status
   */
  addBountyReadinessWorkflow(config = {}) {
    const workflowPath = path.join(
      process.cwd(),
      this.options.workflowsDir,
      this.options.bountyReadinessWorkflow
    );

    try {
      // Default workflow configuration
      const workflowConfig = {
        name: config.name || 'Bug Bounty Readiness',
        on: config.on || {
          push: {
            branches: ['main', 'master'],
            paths: ['contracts/**', 'src/**', 'test/**'],
          },
          workflow_dispatch: {
            inputs: {
              platforms: {
                description: 'Platforms to generate submissions for (comma-separated)',
                required: false,
                default: 'immunefi,hackenproof',
              },
            },
          },
        },
        env: {
          NODE_VERSION: config.nodeVersion || '18.x',
        },
        jobs: {
          'bounty-package': {
            name: 'Generate Bug Bounty Package',
            'runs-on': 'ubuntu-latest',
            steps: [
              {
                name: 'Checkout code',
                uses: 'actions/checkout@v3',
              },
              {
                name: 'Setup Node.js',
                uses: 'actions/setup-node@v3',
                with: {
                  'node-version': '${{ env.NODE_VERSION }}',
                  cache: 'npm',
                },
              },
              {
                name: 'Install dependencies',
                run: 'npm ci',
              },
              {
                name: 'Run comprehensive security scan',
                run: 'npm run security-scan -- --mode=full',
              },
              {
                name: 'Run cross-chain security tests',
                run: 'npm run cross-chain-test',
              },
              {
                name: 'Generate vulnerability report',
                run: 'npm run viz:report -- --output=reports/security-report',
              },
            ],
          },
        },
      };

      // Add platform-specific steps
      const platformsToAdd = config.platforms || [
        'immunefi',
        'hackenproof',
        'code4rena',
        'sherlock',
      ];

      if (platformsToAdd.includes('immunefi')) {
        workflowConfig.jobs['bounty-package'].steps.push({
          name: 'Generate Immunefi submission',
          run: 'npm run submit-to-immunefi -- --input=reports/security-report.json',
        });
      }

      if (platformsToAdd.includes('hackenproof')) {
        workflowConfig.jobs['bounty-package'].steps.push({
          name: 'Generate HackenProof submission',
          run: 'npm run submit-to-hackenproof -- --input=reports/security-report.json',
        });
      }

      if (platformsToAdd.includes('code4rena')) {
        workflowConfig.jobs['bounty-package'].steps.push({
          name: 'Generate Code4rena submission',
          run: 'npm run submit-to-code4rena -- --input=reports/security-report.json --contest-id=Audityzer',
        });
      }

      if (platformsToAdd.includes('sherlock')) {
        workflowConfig.jobs['bounty-package'].steps.push({
          name: 'Generate Sherlock report',
          run: 'npm run generate-sherlock-report -- --input=reports/security-report.json --contest-name=Audityzer',
        });
      }

      // Add unified dashboard step if specified
      if (config.includeDashboard) {
        workflowConfig.jobs['bounty-package'].steps.push({
          name: 'Generate unified dashboard data',
          run: 'npm run bounty-dashboard-generate',
        });
      }

      // Add artifact upload step
      workflowConfig.jobs['bounty-package'].steps.push({
        name: 'Archive bounty submissions',
        uses: 'actions/upload-artifact@v3',
        with: {
          name: 'bounty-submissions',
          path: [
            'reports/security-report.*',
            'test-results/bounty-submissions/**',
            'test-results/security/**',
          ].join('\n'),
        },
      });

      // Add notification step if specified
      if (config.includeNotification) {
        workflowConfig.jobs['bounty-package'].steps.push({
          name: 'Send notification',
          if: "github.event_name == 'push'",
          uses: 'actions/github-script@v6',
          with: {
            script: [
              'const reportSummary = require("./reports/security-report.json");',
              'const totalIssues = reportSummary.totalIssues || 0;',
              'const criticalIssues = reportSummary.issueBySeverity?.critical || 0;',
              'const highIssues = reportSummary.issueBySeverity?.high || 0;',
              '',
              'const issueTitle = "Bug Bounty Readiness Report";',
              'const body = `## Bug Bounty Readiness Report\\n\\n` +',
              '  `- Total issues identified: ${totalIssues}\\n` +',
              '  `- Critical issues: ${criticalIssues}\\n` +',
              '  `- High issues: ${highIssues}\\n\\n` +',
              '  `[Download the full report](${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID})`;',
              '',
              '// Create or update issue',
              'const issues = await github.rest.issues.listForRepo({',
              '  owner: context.repo.owner,',
              '  repo: context.repo.repo,',
              '  labels: ["bug-bounty-readiness"],',
              '  state: "open"',
              '});',
              '',
              'if (issues.data.length > 0) {',
              '  await github.rest.issues.update({',
              '    owner: context.repo.owner,',
              '    repo: context.repo.repo,',
              '    issue_number: issues.data[0].number,',
              '    body',
              '  });',
              '} else {',
              '  await github.rest.issues.create({',
              '    owner: context.repo.owner,',
              '    repo: context.repo.repo,',
              '    title: issueTitle,',
              '    body,',
              '    labels: ["bug-bounty-readiness"]',
              '  });',
              '}',
            ].join('\n'),
          },
        });
      }

      // Write workflow file
      fs.writeFileSync(workflowPath, yaml.dump(workflowConfig));
      console.log(chalk.green(`Bug bounty readiness workflow created at ${workflowPath}`));
      return true;
    } catch (error) {
      console.error(chalk.red(`Error creating bug bounty readiness workflow: ${error.message}`));
      return false;
    }
  }

  /**
   * Add or update L2 validation workflow
   * @param {Object} config - Configuration for the workflow
   * @returns {boolean} Success status
   */
  addL2ValidationWorkflow(config = {}) {
    const workflowPath = path.join(
      process.cwd(),
      this.options.workflowsDir,
      this.options.l2ValidationWorkflow
    );

    try {
      // Default workflow configuration
      const l2Chains = config.l2Chains || [
        'optimism',
        'arbitrum',
        'polygon',
        'zksync',
        'base',
        'linea',
      ];

      const workflowConfig = {
        name: config.name || 'L2 Security Validation',
        on: config.on || {
          pull_request: {
            branches: ['main', 'master', 'develop'],
            paths: ['contracts/**', 'deployments/**'],
          },
          workflow_dispatch: {
            inputs: {
              chains: {
                description: 'L2 chains to validate (comma-separated)',
                required: false,
                default: l2Chains.join(','),
              },
              performance_test: {
                description: 'Run performance tests',
                required: false,
                default: false,
                type: 'boolean',
              },
            },
          },
        },
        env: {
          NODE_VERSION: config.nodeVersion || '18.x',
        },
        jobs: {
          'l2-validation': {
            name: 'L2 Security Validation',
            'runs-on': 'ubuntu-latest',
            strategy: {
              matrix: {
                l2_chain: l2Chains,
              },
            },
            steps: [
              {
                name: 'Checkout code',
                uses: 'actions/checkout@v3',
              },
              {
                name: 'Setup Node.js',
                uses: 'actions/setup-node@v3',
                with: {
                  'node-version': '${{ env.NODE_VERSION }}',
                  cache: 'npm',
                },
              },
              {
                name: 'Install dependencies',
                run: 'npm ci',
              },
              {
                name: 'Generate L2 template',
                run: 'npm run generate-l2-template -- ${{ matrix.l2_chain }} --output=./l2-${{ matrix.l2_chain }}-rules.json',
              },
              {
                name: 'Validate L2 protocol',
                run: 'npm run validate-l2-protocol -- ${{ matrix.l2_chain }} --config=./l2-${{ matrix.l2_chain }}-rules.json',
              },
              {
                name: 'Check L2 contract compatibility',
                run: 'npm run check-l2-compatibility -- --chain=${{ matrix.l2_chain }} --contracts=./contracts',
              },
              {
                name: 'Archive L2 validation results',
                uses: 'actions/upload-artifact@v3',
                with: {
                  name: 'l2-validation-${{ matrix.l2_chain }}',
                  path: [
                    'l2-${{ matrix.l2_chain }}-rules.json',
                    'test-results/l2-validation/${{ matrix.l2_chain }}/**',
                  ].join('\n'),
                },
              },
            ],
          },
        },
      };

      // Add performance testing job if specified
      if (config.includePerformanceTests) {
        workflowConfig.jobs['l2-performance'] = {
          name: 'L2 Performance Testing',
          'runs-on': 'ubuntu-latest',
          needs: 'l2-validation',
          if: "github.event.inputs.performance_test == 'true'",
          steps: [
            {
              name: 'Checkout code',
              uses: 'actions/checkout@v3',
            },
            {
              name: 'Setup Node.js',
              uses: 'actions/setup-node@v3',
              with: {
                'node-version': '${{ env.NODE_VERSION }}',
                cache: 'npm',
              },
            },
            {
              name: 'Install dependencies',
              run: 'npm ci',
            },
            {
              name: 'Generate performance test config',
              run: 'npm run generate-l2-performance-template -- --output=./l2-performance-tests.json',
            },
            {
              name: 'Measure L2 finality',
              run: 'npm run measure-l2-finality -- --config=./l2-performance-tests.json',
            },
            {
              name: 'Test transaction confirmation',
              run: 'npm run test-l2-transaction-confirmation -- --config=./l2-performance-tests.json',
            },
            {
              name: 'Archive performance test results',
              uses: 'actions/upload-artifact@v3',
              with: {
                name: 'l2-performance-tests',
                path: ['l2-performance-tests.json', 'test-results/l2-performance/**'].join('\n'),
              },
            },
          ],
        };
      }

      // Write workflow file
      fs.writeFileSync(workflowPath, yaml.dump(workflowConfig));
      console.log(chalk.green(`L2 validation workflow created at ${workflowPath}`));
      return true;
    } catch (error) {
      console.error(chalk.red(`Error creating L2 validation workflow: ${error.message}`));
      return false;
    }
  }

  /**
   * Add or update all workflows
   * @param {Object} config - Configuration for all workflows
   * @returns {boolean} Success status
   */
  addAllWorkflows(config = {}) {
    let success = true;

    // Add security scan workflow
    if (!this.addSecurityScanWorkflow(config)) {
      success = false;
    }

    // Add deployment validation workflow
    if (!this.addDeployValidationWorkflow(config)) {
      success = false;
    }

    // Add bounty readiness workflow
    if (!this.addBountyReadinessWorkflow(config)) {
      success = false;
    }

    // Add L2 validation workflow
    if (!this.addL2ValidationWorkflow(config)) {
      success = false;
    }

    return success;
  }

  /**
   * Get status of existing workflows
   * @returns {Object} Status of each workflow
   */
  getWorkflowsStatus() {
    const workflowsDir = path.join(process.cwd(), this.options.workflowsDir);

    const result = {
      securityScan: false,
      deployValidation: false,
      bountyReadiness: false,
      l2Validation: false,
    };

    // Check if workflows directory exists
    if (!fs.existsSync(workflowsDir)) {
      return result;
    }

    // Check each workflow
    const securityScanPath = path.join(workflowsDir, this.options.securityScanWorkflow);
    if (fs.existsSync(securityScanPath)) {
      result.securityScan = true;
    }

    const deployValidationPath = path.join(workflowsDir, this.options.deployValidationWorkflow);
    if (fs.existsSync(deployValidationPath)) {
      result.deployValidation = true;
    }

    const bountyReadinessPath = path.join(workflowsDir, this.options.bountyReadinessWorkflow);
    if (fs.existsSync(bountyReadinessPath)) {
      result.bountyReadiness = true;
    }

    const l2ValidationPath = path.join(workflowsDir, this.options.l2ValidationWorkflow);
    if (fs.existsSync(l2ValidationPath)) {
      result.l2Validation = true;
    }

    return result;
  }
}

module.exports = GitHubActionIntegration;
