#!/usr/bin/env node
// src/cli.js
import { program } from 'commander';
import { generatePlaywrightScript } from '../ci/ci-integration.js';
import WalletFlowFuzzer from './fuzzers/wallet-flow-fuzzer.js';
import SecurityChecker from '../security/security-checker.js';
import Reporter from '../reporting/reporter.js';
import { generateTest, analyzeContract } from '../ai-vulnerability-detection/index.js';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

program
    .name('audityzer')
    .description('Zero-config Web3 dApp testing toolkit')
    .version('1.1.2');

program
    .command('test')
    .description('Run automated tests on a dApp')
    .argument('<url>', 'URL of the dApp to test')
    .option('-w, --wallet <type>', 'Wallet type to test with', 'metamask')
    .option('-o, --output <dir>', 'Output directory for reports', './audityzer-reports')
    .option('-s, --security', 'Include security checks', false)
    .option('-r, --risk-threshold <threshold>', 'Custom risk threshold (low, medium, high)', 'medium')
    .action(async (url, options) => {
        console.log(`🚀 Testing ${url} with ${options.wallet} wallet...`);

        // Run tests and generate report
        const fuzzer = new WalletFlowFuzzer({ wallets: [options.wallet] });
        await fuzzer.fuzzWalletConnection(url);
        await fuzzer.fuzzTransactionFlow(url);
        await fuzzer.fuzzSignatureRequests(url);

        let riskAssessment = null;

        if (options.security) {
            // Initialize security checker with custom risk thresholds if specified
            const riskThresholds = {};
            if (options.riskThreshold) {
                switch (options.riskThreshold.toLowerCase()) {
                    case 'low':
                        riskThresholds.low = 1.0;
                        riskThresholds.medium = 4.0;
                        riskThresholds.high = 7.0;
                        break;
                    case 'high':
                        riskThresholds.low = 5.0;
                        riskThresholds.medium = 8.0;
                        riskThresholds.high = 9.5;
                        break;
                    // 'medium' is the default and uses the CVSS standard thresholds
                }
            }

            const securityChecker = new SecurityChecker({
                riskScoringOptions: {
                    thresholds: riskThresholds
                }
            });

            // Extract contract addresses from the page and run security checks
            console.log('Running security checks...');

            // For demonstration, we'll check a sample contract address
            const sampleAddress = '0x1234567890123456789012345678901234567890';

            // Set some sample contract context for more accurate risk assessment
            securityChecker.setContractContext(sampleAddress, {
                tvl: 5000000, // $5M TVL
                age: 45, // 45 days old
                auditCount: 1, // 1 previous audit
                complexity: 7 // Moderate-high complexity
            });

            // Run all security checks and get risk assessment
            riskAssessment = await securityChecker.runAllChecks(sampleAddress);

            console.log(`Contract Risk Score: ${riskAssessment.overallScore.toFixed(1)} (${riskAssessment.severityLevel.label})`);

            // Add security results to fuzzer results
            riskAssessment.vulnerabilityScores.forEach(score => {
                fuzzer.results.push({
                    ...score.originalVulnerability,
                    riskScore: score.finalScore,
                    riskLevel: score.severityLevel.label,
                    remediation: score.remediation.join('\n'),
                    timestamp: new Date().toISOString()
                });
            });

            // Generate risk dashboard and save it
            const riskDashboardHtml = securityChecker.generateRiskDashboard(riskAssessment);
            if (!fs.existsSync(options.output)) {
                fs.mkdirSync(options.output, { recursive: true });
            }
            fs.writeFileSync(path.join(options.output, 'risk-dashboard.html'), riskDashboardHtml);

            // Export risk report in multiple formats
            securityChecker.exportRiskReport(riskAssessment, 'json', path.join(options.output, 'risk-assessment.json'));
            securityChecker.exportRiskReport(riskAssessment, 'markdown', path.join(options.output, 'risk-assessment.md'));
        }

        // Generate Playwright script
        const playwrightScript = generatePlaywrightScript({
            url,
            wallet: options.wallet,
            tests: ['connect', 'transaction', 'sign']
        });

        // Generate report
        const reporter = new Reporter();
        reporter.generateReport({
            url,
            timestamp: new Date(),
            results: fuzzer.results,
            playwrightScript,
            riskAssessment // Include risk assessment in the report
        }, options.output);

        console.log(`✅ Testing complete! Report saved to ${options.output}`);

        if (riskAssessment) {
            console.log(`📊 Risk dashboard available at ${path.join(options.output, 'risk-dashboard.html')}`);
        }
    });

// AI-assisted test generation command
program
    .command('ask')
    .description('Generate a test using AI based on a natural language prompt')
    .argument('<prompt>', 'Natural language description of the test to generate')
    .option('-o, --output <path>', 'Output file path for the generated test')
    .option('-t, --template <type>', 'Template type to use (security, wallet, aa)', 'security')
    .option('-m, --model <name>', 'AI model to use', 'gpt-4')
    .option('-r, --run-with <command>', 'Run the generated test immediately with the specified command')
    .action(async (prompt, options) => {
        try {
            console.log(chalk.blue(`🧠 Generating test based on prompt: "${prompt}"...`));

            // Check if OpenAI API key is set
            if (!process.env.OPENAI_API_KEY) {
                console.error(chalk.red('Error: OPENAI_API_KEY environment variable is not set.'));
                console.log(chalk.yellow('Please set your OpenAI API key:'));
                console.log(chalk.yellow('  export OPENAI_API_KEY=your_api_key_here'));
                process.exit(1);
            }

            // Determine output path if not specified
            let outputPath = options.output;
            if (!outputPath) {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const testName = prompt.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '')
                    .substring(0, 40);
                outputPath = path.join('examples', 'security-bug-tests', `${testName}-${timestamp}.test.js`);
            }

            // Generate the test
            await generateTest(prompt, {
                templateType: options.template,
                model: options.model,
                outputPath
            });

            console.log(chalk.green(`✅ Test generated successfully!`));
            console.log(chalk.green(`📝 Saved to: ${outputPath}`));

            // Run the test immediately if requested
            if (options.runWith) {
                console.log(chalk.blue(`🚀 Running the generated test...`));

                // Determine the command to run
                let command;
                switch (options.runWith) {
                    case 'security':
                        command = `npm run test:security -- ${outputPath}`;
                        break;
                    case 'aa':
                        command = `npm run test:aa -- ${outputPath}`;
                        break;
                    case 'tx':
                        command = `npm run test:playwright -- ${outputPath}`;
                        break;
                    default:
                        command = `npx playwright test ${outputPath}`;
                }

                // Execute the command
                const { execSync } = require('child_process');
                try {
                    execSync(command, { stdio: 'inherit' });
                    console.log(chalk.green(`✅ Test execution complete!`));
                } catch (error) {
                    console.error(chalk.red(`❌ Test execution failed: ${error.message}`));
                }
            }
        } catch (error) {
            console.error(chalk.red(`Error generating test: ${error.message}`));
            process.exit(1);
        }
    });

// Analyze smart contract command
program
    .command('analyze')
    .description('Analyze a smart contract for vulnerabilities')
    .argument('<file>', 'Path to the smart contract file')
    .option('-o, --output <path>', 'Output file path for the analysis report')
    .option('-m, --model <name>', 'AI model to use', 'gpt-4')
    .option('-f, --format <format>', 'Output format (md, json, html)', 'md')
    .action(async (file, options) => {
        try {
            console.log(chalk.blue(`🔍 Analyzing smart contract: ${file}...`));

            // Check if OpenAI API key is set
            if (!process.env.OPENAI_API_KEY) {
                console.error(chalk.red('Error: OPENAI_API_KEY environment variable is not set.'));
                console.log(chalk.yellow('Please set your OpenAI API key:'));
                console.log(chalk.yellow('  export OPENAI_API_KEY=your_api_key_here'));
                process.exit(1);
            }

            // Check if file exists
            if (!fs.existsSync(file)) {
                console.error(chalk.red(`Error: File not found: ${file}`));
                process.exit(1);
            }

            // Read the contract code
            const contractCode = fs.readFileSync(file, 'utf8');

            // Determine output path if not specified
            let outputPath = options.output;
            if (!outputPath) {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const baseName = path.basename(file, path.extname(file));
                outputPath = path.join('reports', 'analysis', `${baseName}-analysis-${timestamp}.${options.format}`);
            }

            // Analyze the contract
            const result = await analyzeContract(contractCode, {
                model: options.model,
                outputPath
            });

            console.log(chalk.green(`✅ Analysis complete!`));
            console.log(chalk.green(`📝 Report saved to: ${outputPath}`));

            // Print summary of findings
            if (result.vulnerabilities && result.vulnerabilities.length > 0) {
                console.log(chalk.yellow(`\nVulnerabilities found: ${result.vulnerabilities.length}`));

                // Group by severity
                const severityCounts = result.vulnerabilities.reduce((counts, vuln) => {
                    const severity = vuln.severity || 'Unknown';
                    counts[severity] = (counts[severity] || 0) + 1;
                    return counts;
                }, {});

                // Print severity counts
                Object.entries(severityCounts).forEach(([severity, count]) => {
                    const color = severity === 'Critical' || severity === 'High' ? chalk.red :
                        severity === 'Medium' ? chalk.yellow :
                            severity === 'Low' ? chalk.blue : chalk.gray;
                    console.log(color(`  ${severity}: ${count}`));
                });

                // Print top 3 vulnerabilities
                console.log(chalk.yellow('\nTop issues:'));
                result.vulnerabilities.slice(0, 3).forEach((vuln, index) => {
                    console.log(chalk.yellow(`  ${index + 1}. ${vuln.title || vuln.type} (${vuln.severity})`));
                });
            } else {
                console.log(chalk.green('\nNo vulnerabilities detected!'));
            }
        } catch (error) {
            console.error(chalk.red(`Error analyzing contract: ${error.message}`));
            process.exit(1);
        }
    });

// Initialize configuration command
program
    .command('init')
    .description('Initialize Audityzer configuration')
    .option('-f, --force', 'Override existing configuration', false)
    .option('-t, --template <type>', 'Template type to use (default, security, aa)', 'default')
    .action(async (options) => {
        try {
            console.log(chalk.blue('Initializing Audityzer configuration...'));

            // Create config directory if it doesn't exist
            const configDir = path.join(process.cwd(), '.audityzer');
            await fs.ensureDir(configDir);

            // Determine config file path
            const configPath = path.join(configDir, 'config.json');

            // Check if config already exists
            const configExists = await fs.pathExists(configPath);
            if (configExists && !options.force) {
                console.log(chalk.yellow('Configuration already exists. Use --force to override.'));
                return;
            }

            // Create default configuration based on template
            let config;
            switch (options.template) {
                case 'security':
                    config = {
                        version: '1.1.2',
                        security: {
                            riskThreshold: 'medium',
                            enableFuzzing: true,
                            vulnerabilityTypes: [
                                'reentrancy', 'overflow', 'frontrunning', 'accessControl',
                                'oracleManipulation', 'flashloanAttack', 'uncheckedReturn'
                            ]
                        },
                        reporting: {
                            format: 'html',
                            outputDir: './reports',
                            uploadToDashboard: false
                        }
                    };
                    break;
                case 'aa':
                    config = {
                        version: '1.1.2',
                        accountAbstraction: {
                            enabled: true,
                            pimlicoMode: false,
                            bundlerUrl: 'https://bundler.example.com',
                            addons: ['social-recovery', 'session-keys']
                        },
                        reporting: {
                            format: 'html',
                            outputDir: './reports',
                            uploadToDashboard: false
                        }
                    };
                    break;
                default:
                    config = {
                        version: '1.1.2',
                        testing: {
                            mockMode: true,
                            defaultWallet: 'metamask',
                            defaultChain: 'ethereum'
                        },
                        reporting: {
                            format: 'html',
                            outputDir: './reports',
                            uploadToDashboard: false
                        }
                    };
            }

            // Write configuration file
            await fs.writeJson(configPath, config, { spaces: 2 });

            console.log(chalk.green(`✅ Configuration initialized at: ${configPath}`));

            // Create example test file if it doesn't exist
            const exampleTestDir = path.join(process.cwd(), 'examples', 'security-bug-tests');
            await fs.ensureDir(exampleTestDir);

            const exampleTestPath = path.join(exampleTestDir, 'example-test.js');
            if (!await fs.pathExists(exampleTestPath)) {
                const exampleTest = `// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Example Security Test', () => {
  test('should detect a basic vulnerability', async ({ page }) => {
    // Navigate to the target dApp
    await page.goto(process.env.TARGET_URL || 'http://localhost:5050');
    
    // Your test code here
    console.log('Running example security test...');
    
    // This is just a placeholder assertion
    expect(true).toBeTruthy();
  });
});
`;

                await fs.writeFile(exampleTestPath, exampleTest);
                console.log(chalk.green(`✅ Example test created at: ${exampleTestPath}`));
            }
        } catch (error) {
            console.error(chalk.red(`Error initializing configuration: ${error.message}`));
            process.exit(1);
        }
    });

program.parse();