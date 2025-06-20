/**
 * Audityzer CLI
 * Cross-chain DeFi fuzzing toolkit for security researchers
 */

const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const audityzer = require('../core');
const packageJson = require('../../package.json');
const { generateAATestTemplates, generateAAReport } = require('./generateAATestTemplates');

// Import new AA features
const { generateUserOpFlowDiagram } = require('../../templates/aa-tests/aa-visualization-flow');
const { runAABenchmark } = require('../../templates/aa-tests/aa-benchmark-comparison');
const { generateAADashboard } = require('../../templates/aa-tests/aa-dashboard-report');
const AACIReporter = require('../../templates/aa-tests/aa-ci-reporter');
const PimlicoService = require('../../templates/aa-tests/aa-pimlico-service');

// Check if AA mode is enabled via direct arguments
const args = process.argv.slice(2);
const aaMode = args.includes('--aa') || args.includes('--pimlico');

if (aaMode) {
  
  // Check for addon flag
  const addonIndex = args.indexOf('--addon');
  const addonOption = addonIndex !== -1 && addonIndex < args.length - 1 ? args[addonIndex + 1] : null;
  
  generateAATestTemplates({ addon: addonOption });
}

// Setup the CLI program
function setupProgram() {
  program
    .name('audityzer')
    .description('Cross-chain DeFi fuzzing toolkit for security researchers')
    .version(packageJson.version);
    
  // Run command
  program
    .command('run')
    .description('Run security tests against a target')
    .argument('<target>', 'Target protocol or dApp to test')
    .option('-c, --chain <chain>', 'Chain to test on (ethereum, polygon, etc.)', 'ethereum')
    .option('-t, --tests <tests...>', 'Test types to run (wallet, bridge, defi, etc.)')
    .option('-w, --wallet <wallet>', 'Wallet to use (metamask, coinbase, etc.)', 'metamask')
    .option('-o, --output <file>', 'Output file for results')
    .option('-f, --format <format>', 'Output format (json, html, md)', 'json')
    .option('--rpc <url>', 'RPC URL for chain connection')
    .option('--gas-limit <limit>', 'Gas limit for transactions')
    .option('--mock', 'Run in mock mode without real transactions')
    .option('--aa', 'Run in Account Abstraction mode with ERC-4337 fuzzing')
    .option('--pimlico', 'Run in Pimlico-compatible Account Abstraction mode')
    .option('--bundler <bundler>', 'Specify bundler to use (pimlico, stackup, alchemy, etherspot)', 'pimlico')
    .option('--addon <addon>', 'Add specialized tests for AA features (social-recovery, counterfactual, session-keys, token-gating)')
    .option('--report', 'Generate AA report after testing')
    .option('--dashboard', 'Generate interactive dashboard for test results')
    .option('--ci', 'Output JSON verdicts in CI-friendly format')
    .option('--pimlico-connect', 'Connect to Pimlico API for live gas fee suggestions / EntryPoint metadata')
    .option('--pimlico-api-key <key>', 'API key for Pimlico (if using --pimlico-connect)')
    .option('--theme <theme>', 'Dashboard theme (light or dark)', 'light')
    .option('--viz-output <dir>', 'Output directory for visualizations', './reports/dashboards')
    .action(runTests);
    
  // Benchmark command
  program
    .command('benchmark')
    .description('Run performance benchmarks')
    .option('-t, --test <test>', 'Test to benchmark', 'all')
    .option('-i, --iterations <n>', 'Number of iterations', 10)
    .option('--aa', 'Run Account Abstraction implementation benchmarks')
    .option('--addon <addon>', 'Add specialized tests for AA features (social-recovery, counterfactual, session-keys, token-gating)')
    .option('--results-dir <dir>', 'Directory to save benchmark results', './reports/benchmarks')
    .option('--ci', 'Output JSON verdicts in CI-friendly format')
    .action(runBenchmark);
    
  // Submit command
  program
    .command('submit')
    .description('Submit results to a bounty platform')
    .argument('<file>', 'JSON results file to submit')
    .option('-p, --platform <platform>', 'Platform to submit to (immunefi, hackenproof, code4rena)')
    .option('-k, --key <key>', 'API key for the platform')
    .action(submitResults);
    
  // Init command
  program
    .command('init')
    .description('Initialize a new test project')
    .option('-t, --template <template>', 'Template to use (wallet, bridge, defi, aa)')
    .option('--addon <addon>', 'Add specialized tests for AA features (social-recovery, counterfactual, session-keys, token-gating)')
    .option('--no-interactive', 'Skip interactive wizard and use defaults')
    .action(initProject);

  // AA-specific commands
  program
    .command('aa')
    .description('Account Abstraction testing tools')
    .option('--flow <userOpFile>', 'Generate flow diagram for a UserOperation')
    .option('--bundlers <bundlersFile>', 'Compare multiple bundlers using spec file')
    .option('--dashboard <resultsFile>', 'Generate dashboard from results file')
    .option('--addon <addon>', 'Generate specialized tests (social-recovery, counterfactual, session-keys, token-gating)')
    .option('--output <dir>', 'Output directory for generated files', './reports')
    .option('--theme <theme>', 'Dashboard theme (light or dark)', 'light')
    .option('--ci', 'Output in CI-friendly format')
    .option('--pimlico-connect', 'Connect to Pimlico API for live gas fee suggestions / EntryPoint metadata')
    .option('--pimlico-api-key <key>', 'API key for Pimlico (if using --pimlico-connect)')
    .action(runAATools);
    
  // Add a new 'visualize' command
  program
    .command('visualize')
    .description('Generate visualizations from test results')
    .argument('<results-file>', 'JSON results file to visualize')
    .option('-t, --type <type>', 'Type of visualization (dashboard, flow, comparison)', 'dashboard')
    .option('-o, --output <dir>', 'Output directory for visualizations', './reports/dashboards')
    .option('--theme <theme>', 'Visualization theme (light or dark)', 'light')
    .option('--title <title>', 'Title for the visualization')
    .action(generateVisualization);
    
  return program;
}

// Run tests command function
async function runTests(target, options) {
  try {
    
    // Handle AA mode
    if (options.aa || options.pimlico) {
      return await runAATests(target, options);
    }
    
    // Connect to Pimlico API if requested
    let pimlicoService = null;
    let pimlicoData = null;
    if (options.pimlicoConnect) {
      pimlicoService = new PimlicoService({
        apiKey: options.pimlicoApiKey,
        chainId: options.chain === 'ethereum' ? '1' : 
                options.chain === 'polygon' ? '137' : 
                options.chain === 'optimism' ? '10' : 
                options.chain === 'arbitrum' ? '42161' : '1',
        debug: true
      });
      
      
      // Fetch gas parameters and EntryPoint metadata
      try {
        const [gasParams, entryPointMeta] = await Promise.all([
          pimlicoService.getUserOperationGasParams(),
          pimlicoService.getEntryPointMetadata()
        ]);
        
        pimlicoData = { gasParams, entryPointMeta };
        
      } catch (error) {
        console.warn(chalk.yellow(`⚠️ Failed to fetch data from Pimlico API: ${error.message}`));
      }
    }
    
    // Set up addon for specialized AA tests if requested
    let aaAddonTests = null;
    if (options.aa && options.addon) {
      const addon = options.addon.toLowerCase();
      const validAddons = ['social-recovery', 'counterfactual', 'session-keys', 'token-gating'];
      
      if (!validAddons.includes(addon)) {
        console.warn(chalk.yellow(`⚠️ Unknown addon ${addon}. Valid values are: ${validAddons.join(', ')}`));
      } else {
        
        // Map addon to test template
        const addonMap = {
          'social-recovery': 'aa-social-recovery.test.js',
          'counterfactual': 'aa-counterfactual-wallets.test.js',
          'session-keys': 'aa-session-keys.test.js',
          'token-gating': 'aa-token-gating.test.js'
        };
        
        aaAddonTests = {
          type: addon,
          template: addonMap[addon]
        };
      }
    }
    
    const results = await audityzer.run({
      target,
      chain: options.chain,
      tests: options.tests,
      wallet: options.wallet,
      rpcUrl: options.rpc,
      gasLimit: options.gasLimit,
      mockMode: !!options.mock,
      aa: !!options.aa,
      pimlico: !!options.pimlico,
      bundler: options.bundler,
      aaAddon: aaAddonTests,
      pimlicoService
    });
    
    
    if (results.summary.vulnerabilities.length) {
      
      for (const vuln of results.summary.vulnerabilities) {
      }
    }
    
    // Handle CI reporting if requested
    if (options.ci) {
      const ciReporter = new AACIReporter({
        outputDir: './reports',
        format: 'json',
        projectName: `${target}-aa-tests`
      });
      
      // Convert our results to CI reporter format
      const testResultsForCI = [];
      
      // Add standard AA tests
      if (results.tests.aa) {
        for (const [testType, testResults] of Object.entries(results.tests.aa)) {
          for (const [testName, result] of Object.entries(testResults)) {
            testResultsForCI.push({
              name: testName,
              category: testType,
              passed: result.passed,
              message: result.message || '',
              details: result.details || null
            });
          }
        }
      }
      
      // Add addon tests if applicable
      if (results.tests.aaAddon) {
        for (const [testName, result] of Object.entries(results.tests.aaAddon)) {
          testResultsForCI.push({
            name: testName,
            category: aaAddonTests?.type || 'AA-Addon',
            passed: result.passed,
            message: result.message || '',
            details: result.details || null
          });
        }
      }
      
      // Add the test results and write the report
      ciReporter.addTestResults(testResultsForCI);
      const reportPath = await ciReporter.writeReport();
      
      ciReporter.printSummary();
    }
    
    // Generate AA report if in AA mode and report flag is present
    if ((options.aa || options.pimlico) && options.report) {
      const reportResults = {
        userop: { status: results.tests.aa?.userop ? 'Tested' : 'Not tested' },
        paymaster: { status: results.tests.aa?.paymaster ? 'Tested' : 'Not tested' },
        bundler: { status: results.tests.aa?.bundler ? 'Tested' : 'Not tested' },
        vulnerabilities: results.summary.vulnerabilities
      };
      
      // Add addon results if applicable
      if (options.addon) {
        reportResults[options.addon] = { 
          status: results.tests.aaAddon ? 'Tested' : 'Not tested' 
        };
      }
      
      await generateAAReport(reportResults, {
        pimlico: options.pimlico,
        addon: options.addon,
        ci: options.ci,
        pimlicoData: pimlicoData
      });
    }
    
    // Generate interactive dashboard if requested
    if (options.dashboard) {
      try {
        const dashboard = await generateAADashboard({
          title: `${target} Account Abstraction Test Results`,
          results: results,
          theme: options.theme || 'light',
          version: packageJson.version,
          addon: options.addon
        });
        
      } catch (error) {
        console.error(chalk.yellow(`⚠️ Could not generate dashboard: ${error.message}`));
      }
    }
    
    if (options.output) {
      const outputPath = path.resolve(options.output);
      const format = options.format || 'json';
      
      if (format === 'json') {
        await fs.writeJSON(outputPath, results, { spaces: 2 });
      } else {
        const report = await audityzer.generateReport(results, {
          format: options.format
        });
        await fs.writeFile(outputPath, report);
      }
      
    }
  } catch (error) {
    console.error(chalk.red(`💥 Error running tests: ${error.message}`));
    process.exit(1);
  }
}

// Run Account Abstraction tests
async function runAATests(target, options) {
  try {
    
    // Check if we need to validate addon value
    if (options.addon) {
      const validAddons = ['social-recovery', 'counterfactual', 'session-keys', 'token-gating'];
      if (!validAddons.includes(options.addon)) {
        console.error(chalk.red(`Invalid addon "${options.addon}". Valid options are: ${validAddons.join(', ')}`));
        process.exit(1);
      }
    }
    
    // Prepare options for AA module
    const aaOptions = {
      target,
      chain: options.chain,
      addon: options.addon,
      bundler: options.bundler,
      pimlico: options.pimlico,
      report: options.report,
      ci: options.ci,
      pimlicpConnect: options.pimlicoConnect,
      pimlicoApiKey: options.pimlicoApiKey,
      outputDir: options.output || './reports',
      mock: options.mock,
      rpcUrl: options.rpc
    };
    
    // Run tests
    const { runTests } = require('../core/account-abstraction');
    const results = await runTests(aaOptions);
    
    // Display results
    if (results.success) {
    } else {
    }
    
    // Show test summary
    if (results.tests) {
      for (const [testName, testResult] of Object.entries(results.tests)) {
        const statusIcon = testResult.success ? chalk.green('✓') : chalk.red('✗');
      }
    }
    
    // If tests are run with the --ci flag and results include CI output
    if (options.ci && results.ciOutput) {
    }
    
    return results;
  } catch (error) {
    console.error(chalk.red(`💥 Error running AA tests: ${error.message}`));
    process.exit(1);
  }
}

// Run AA tools
async function runAATools(options) {
  try {
    
    if (options.addon) {
      return await generateAAAddonTests(options);
    }
    
    // Connect to Pimlico API if requested
    let pimlicoService = null;
    let pimlicoData = null;
    if (options.pimlicoConnect) {
      try {
        pimlicoService = new PimlicoService({
          apiKey: options.pimlicoApiKey,
          debug: true
        });
        
        
        // Generate a full metrics report if no other operation is specified
        if (!options.flow && !options.dashboard && !options.bundlers && !options.addon) {
          
          const report = await pimlicoService.generateMetricsReport();
          const outputDir = path.join(options.output, 'pimlico');
          fs.ensureDirSync(outputDir);
          
          const outputPath = path.join(outputDir, `pimlico-report-${Date.now()}.json`);
          await fs.writeJSON(outputPath, report, { spaces: 2 });
          
          
          // Save the data for potential use in other operations
          pimlicoData = {
            gasParams: report.gasParameters,
            entryPointMeta: report.entryPointMetadata
          };
        }
      } catch (error) {
        console.error(chalk.red(`❌ Error connecting to Pimlico API: ${error.message}`));
      }
    }
    
    // Generate a UserOperation flow diagram
    if (options.flow) {
      
      try {
        const userOpFile = path.resolve(options.flow);
        const userOp = await fs.readJSON(userOpFile);
        
        const outputDir = path.join(options.output, 'flows');
        await fs.ensureDir(outputDir);
        
        const result = await generateUserOpFlowDiagram(userOp, {
          outputDir,
          fileName: `userop-flow-${Date.now()}`
        });
        
        
        // Generate CI report if requested
        if (options.ci) {
          const ciReporter = new AACIReporter({
            outputDir: outputDir,
            format: 'json',
            projectName: 'userop-flow-analysis'
          });
          
          // Add flow analysis results
          ciReporter.addTestResult({
            name: 'Flow Visualization Generation',
            category: 'UserOp Flow',
            passed: true,
            details: {
              htmlPath: result.outputs.htmlPath,
              jsonPath: result.outputs.jsonPath
            }
          });
          
          // Add potential issues found during flow analysis
          result.analysis.issues.forEach(issue => {
            ciReporter.addTestResult({
              name: issue.title,
              category: 'Flow Analysis',
              passed: issue.severity !== 'high',
              message: issue.description,
              details: {
                severity: issue.severity,
                location: issue.location
              }
            });
          });
          
          const reportPath = await ciReporter.writeReport();
        }
        
      } catch (error) {
        console.error(chalk.red(`❌ Error generating flow diagram: ${error.message}`));
      }
    }
    
    // Generate a dashboard from results
    if (options.dashboard) {
      
      try {
        const resultsFile = path.resolve(options.dashboard);
        const results = await fs.readJSON(resultsFile);
        
        const outputDir = path.join(options.output, 'dashboard');
        
        const dashboard = await generateAADashboard({
          title: 'Account Abstraction Test Results',
          results: results,
          outputDir,
          theme: options.theme
        });
        
        
      } catch (error) {
        console.error(chalk.red(`❌ Error generating dashboard: ${error.message}`));
      }
    }
    
    // Compare bundlers
    if (options.bundlers) {
      
      try {
        const bundlersFile = path.resolve(options.bundlers);
        const config = await fs.readJSON(bundlersFile);
        
        // This would use the multi-bundler testing functionality
        
      } catch (error) {
        console.error(chalk.red(`❌ Error comparing bundlers: ${error.message}`));
      }
    }
    
    // Show help if no option was provided
    if (!options.flow && !options.dashboard && !options.bundlers && !options.addon && !options.pimlicoConnect) {
    }
    
  } catch (error) {
    console.error(chalk.red(`💥 Error running AA tools: ${error.message}`));
    process.exit(1);
  }
}

// Generate AA addon-specific tests
async function generateAAAddonTests(options) {
  const addon = options.addon;
  const outputDir = options.output || './reports';
  
  
  // Ensure output directory exists
  await fs.ensureDir(outputDir);
  
  // Determine which addon tests to generate
  let templateName;
  switch (addon) {
    case 'social-recovery':
      templateName = 'aa-social-recovery-test.js';
      break;
    case 'counterfactual':
      templateName = 'aa-counterfactual-wallet-test.js';
      break;
    case 'session-keys':
      templateName = 'aa-session-keys-test.js';
      break;
    case 'token-gating':
      templateName = 'aa-token-gating-test.js';
      break;
    default:
      console.error(chalk.red(`Invalid addon: ${addon}`));
      process.exit(1);
  }
  
  // Load template and generate the file
  const templatePath = path.join(__dirname, '../../templates/aa-tests', templateName);
  const outputPath = path.join(outputDir, `${addon}-test.js`);
  
  try {
    // Check if template exists
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templatePath}`);
    }
    
    // Read template and write to output
    const template = await fs.readFile(templatePath, 'utf8');
    await fs.writeFile(outputPath, template);
    
    
    return {
      success: true,
      outputPath,
      addon
    };
  } catch (error) {
    console.error(chalk.red(`Error generating test: ${error.message}`));
    return {
      success: false,
      error: error.message
    };
  }
}

// Implementation of benchmark command
async function runBenchmark(options) {
  if (options.aa) {
    
    // Set up addon for specialized AA benchmarks if requested
    if (options.addon) {
      const addon = options.addon.toLowerCase();
      const validAddons = ['social-recovery', 'counterfactual', 'session-keys', 'token-gating'];
      
      if (!validAddons.includes(addon)) {
        console.warn(chalk.yellow(`⚠️ Unknown addon ${addon}. Valid values are: ${validAddons.join(', ')}`));
      } else {
        options.aaAddon = addon;
      }
    }
    
    try {
      const results = await runAABenchmark({
        resultsDir: options.resultsDir,
        aaAddon: options.aaAddon,
        ci: options.ci
      });
      
      
      // Handle CI output if requested
      if (options.ci) {
        const ciReporter = new AACIReporter({
          outputDir: options.resultsDir,
          format: 'json',
          projectName: `aa-benchmarks${options.aaAddon ? `-${options.aaAddon}` : ''}`
        });
        
        // Convert benchmark results to test results format
        const testResults = Object.entries(results.benchmarks).map(([name, data]) => ({
          name,
          category: 'AA-Benchmark',
          passed: !data.error,
          message: data.error || '',
          details: {
            duration: data.duration,
            gas: data.gas,
            improvement: data.improvement
          }
        }));
        
        ciReporter.addTestResults(testResults);
        const reportPath = await ciReporter.writeReport();
        
        ciReporter.printSummary();
      }
      
      return;
    } catch (error) {
      console.error(chalk.red(`❌ Error running AA benchmarks: ${error.message}`));
      process.exit(1);
    }
  }
  
  
  // Implementation for benchmarking
}

// Implementation of submit command
async function submitResults(file, options) {
  
  try {
    const results = await fs.readJSON(path.resolve(file));
    
    const submission = await audityzer.submitToBounty(results, {
      platform: options.platform,
      credentials: {
        apiKey: options.key
      }
    });
    
  } catch (error) {
    console.error(chalk.red(`❌ Error submitting results: ${error.message}`));
    process.exit(1);
  }
}

// Implementation of init command
async function initProject(options) {
  try {
    // If no template specified or interactive mode requested, run the wizard
    if (!options.template || options.interactive !== false) {
      const AudityzerInitWizard = require('../../scripts/init-wizard');
      const wizard = new AudityzerInitWizard();
      await wizard.start();
      return;
    }
    
    
    // Special handling for AA template
    if (options.template === 'aa') {
      const templateOptions = {};
      
      // Add addon templates if requested
      if (options.addon) {
        templateOptions.addon = options.addon;
      }
      
      await generateAATestTemplates(templateOptions);
      return;
    }
    
    // Implementation for project initialization
  } catch (error) {
    console.error(chalk.red(`❌ Error initializing project: ${error.message}`));
    process.exit(1);
  }
}

// Implementation of visualize command
async function generateVisualization(resultsFile, options) {
  try {
    
    // Ensure output directory exists
    await fs.ensureDir(options.output);
    
    // Read results file
    const results = await fs.readJSON(path.resolve(resultsFile));
    
    // Generate appropriate visualization
    if (options.type === 'dashboard') {
      const { AADashboardGenerator } = require('../core/visualization/aa-dashboard');
      
      const dashboardGenerator = new AADashboardGenerator({
        outputDir: options.output,
        theme: options.theme
      });
      
      const dashboard = await dashboardGenerator.generateDashboard(results, {
        name: `dashboard-${Date.now()}`,
        title: options.title || 'Test Results Dashboard',
        version: packageJson.version
      });
      
      
      // Open the dashboard in the default browser if possible
      try {
        const open = require('open');
        await open(dashboard.html);
      } catch (err) {
      }
      
    } else if (options.type === 'flow') {
      // This would be for AA flow visualization
    } else if (options.type === 'comparison') {
      // This would be for comparison visualization
    } else {
      console.error(chalk.red(`Unknown visualization type: ${options.type}`));
    }
  } catch (error) {
    console.error(chalk.red(`❌ Error generating visualization: ${error.message}`));
    process.exit(1);
  }
}

// Main CLI runner
function runCLI(argv) {
  const program = setupProgram();
  program.parse(argv);
}

module.exports = { runCLI }; 