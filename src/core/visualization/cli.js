#!/usr/bin/env node

/**
 * Visualization CLI Tool
 *
 * Provides command line interface for generating visualizations from test results.
 */

const fs = require('fs-extra');
const path = require('path');
const { program } = require('commander');
const dashboardRenderer = require('./dashboard-renderer');
const transactionFlowVisualizer = require('./transaction-flow-visualizer');
const debugTools = require('./debug-tools');

// Define common options
const commonOptions = {
  input: '',
  output: '',
  title: '',
  theme: 'light',
  format: 'html',
};

// Setup CLI program
program.name('Audityzer-viz').description('Audityzer Visualization Tools').version('1.0.0');

// Dashboard command
program
  .command('dashboard')
  .description('Generate test results dashboard')
  .option('-i, --input <path>', 'Path to test results JSON file')
  .option('-o, --output <path>', 'Path to output directory')
  .option('-t, --title <title>', 'Dashboard title')
  .option('--theme <theme>', 'Color theme (light or dark)', 'light')
  .action(async options => {
    try {
      const input = options.input || findLatestResultFile();
      if (!input) {
        console.error('No input file provided and no test results found.');
        process.exit(1);
      }

      const testResults = loadTestResults(input);
      const outputPath = options.output || path.join(process.cwd(), 'reports', 'dashboards');
      const title = options.title || 'Audityzer Test Results';

      console.log(`Generating dashboard from ${input}...`);

      const dashboard = dashboardRenderer.initialize({ outputDir: outputPath });
      const result = dashboardRenderer.render(testResults, {
        title,
        theme: options.theme,
        filename: `dashboard-${Date.now()}.html`,
      });

      console.log(`Dashboard generated at: ${result}`);
    } catch (error) {
      console.error('Error generating dashboard:', error);
      process.exit(1);
    }
  });

// Flow command
program
  .command('flow')
  .description('Generate transaction flow diagram')
  .option('-i, --input <path>', 'Path to transactions JSON file')
  .option('-o, --output <path>', 'Path to output directory')
  .option('-t, --title <title>', 'Diagram title')
  .option('--type <type>', 'Diagram type (sequence or flowchart)', 'sequence')
  .option('--theme <theme>', 'Color theme (light or dark)', 'light')
  .action(async options => {
    try {
      const input = options.input || findLatestTransactionsFile();
      if (!input) {
        console.error('No input file provided and no transactions found.');
        process.exit(1);
      }

      const transactions = loadTransactions(input);
      const outputPath = options.output || path.join(process.cwd(), 'reports', 'diagrams');
      const title = options.title || 'Transaction Flow Diagram';

      console.log(`Generating ${options.type} diagram from ${input}...`);

      const visualizer = transactionFlowVisualizer.initialize({ outputDir: outputPath });
      const result = transactionFlowVisualizer.generate(transactions, {
        title,
        diagramType: options.type,
        theme: options.theme,
        filename: `${options.type}-diagram-${Date.now()}.html`,
      });

      console.log(`Diagram generated at: ${result.path}`);
    } catch (error) {
      console.error('Error generating flow diagram:', error);
      process.exit(1);
    }
  });

// Debug command
program
  .command('debug')
  .description('Create or view debug session')
  .option('-i, --input <path>', 'Path to debug session file')
  .option('-o, --output <path>', 'Path to output directory')
  .option('-t, --title <title>', 'Debug dashboard title')
  .option('--theme <theme>', 'Color theme (light or dark)', 'light')
  .action(async options => {
    try {
      if (options.input) {
        // View existing debug session
        const sessionData = loadDebugSession(options.input);
        const outputPath = options.output || path.join(process.cwd(), 'reports', 'debug');
        const title = options.title || 'Debug Session';


        const tools = debugTools.initialize({ outputDir: outputPath });
        const session = recreateDebugSession(sessionData);
        const result = session.visualize({
          title,
          theme: options.theme,
          generateFile: true,
        });

        console.log(`Debug dashboard generated at: ${result.dashboard.path}`);
      } else {
        // Create new debug session

        const outputPath = options.output || path.join(process.cwd(), 'reports', 'debug');
        const tools = debugTools.initialize({ outputDir: outputPath });
        const session = debugTools.createSession(
          {},
          {
            config: {
              outputDir: outputPath,
              visualizationTheme: options.theme,
            },
          }
        );

        console.log(`Debug session created with ID: ${session.id}`);
        console.log('Use this ID to reference the session.');
      }
    } catch (error) {
      console.error('Error with debug session:', error);
      process.exit(1);
    }
  });

// Generate report command
program
  .command('generate-report')
  .description('Generate a comprehensive report from test results')
  .option('-i, --input <path>', 'Path to test results directory')
  .option('-o, --output <path>', 'Path to output directory')
  .option('-t, --title <title>', 'Report title')
  .option('--theme <theme>', 'Color theme (light or dark)', 'light')
  .action(async options => {
    try {
      const inputDir = options.input || path.join(process.cwd(), 'reports');
      const outputPath = options.output || path.join(process.cwd(), 'reports', 'visualizations');
      const title = options.title || 'Audityzer Security Report';

      console.log(`Generating comprehensive report from ${inputDir}...`);

      // Load all test results
      const testResults = loadAllTestResults(inputDir);

      // Generate dashboard
      const dashboard = dashboardRenderer.initialize({ outputDir: outputPath });
      const dashboardResult = dashboardRenderer.render(testResults, {
        title,
        theme: options.theme,
        filename: `report-dashboard-${Date.now()}.html`,
      });

      // Extract transactions from results
      const transactions = extractTransactionsFromResults(testResults);

      // Generate transaction flow if transactions exist
      let flowResult = null;
      if (transactions.length > 0) {
        const visualizer = transactionFlowVisualizer.initialize({ outputDir: outputPath });
        flowResult = transactionFlowVisualizer.generate(transactions, {
          title: `${title} - Transaction Flow`,
          theme: options.theme,
          filename: `report-flow-${Date.now()}.html`,
        });
      }

      console.log(`Report dashboard generated at: ${dashboardResult}`);
      if (flowResult) {
        console.log(`Transaction flow diagram generated at: ${flowResult.path}`);
      }
    } catch (error) {
      console.error('Error generating report:', error);
      process.exit(1);
    }
  });

// Generate all visualizations command
program
  .command('generate-all')
  .description('Generate all visualizations from test results')
  .option('-i, --input <path>', 'Path to test results directory')
  .option('-o, --output <path>', 'Path to output directory')
  .option('--theme <theme>', 'Color theme (light or dark)', 'light')
  .action(async options => {
    try {
      const inputDir = options.input || path.join(process.cwd(), 'reports');
      const outputPath = options.output || path.join(process.cwd(), 'reports', 'visualizations');
      const timestamp = Date.now();

      console.log(`Generating all visualizations from ${inputDir}...`);

      // Load all test results
      const testResults = loadAllTestResults(inputDir);

      // Generate dashboard
      const dashboard = dashboardRenderer.initialize({ outputDir: outputPath });
      const dashboardResult = dashboardRenderer.render(testResults, {
        title: 'Audityzer Test Results',
        theme: options.theme,
        filename: `dashboard-${timestamp}.html`,
      });

      // Extract transactions from results
      const transactions = extractTransactionsFromResults(testResults);

      // Generate transaction flow if transactions exist
      let flowResult = null;
      if (transactions.length > 0) {
        const visualizer = transactionFlowVisualizer.initialize({ outputDir: outputPath });
        flowResult = transactionFlowVisualizer.generate(transactions, {
          title: 'Transaction Flow Diagram',
          theme: options.theme,
          filename: `flow-${timestamp}.html`,
        });
      }

      // Generate debug dashboard if debug sessions exist
      let debugResult = null;
      const debugSessions = findDebugSessions(inputDir);
      if (debugSessions.length > 0) {
        const latestSession = loadDebugSession(debugSessions[0]);
        const tools = debugTools.initialize({ outputDir: outputPath });
        const session = recreateDebugSession(latestSession);
        debugResult = session.visualize({
          title: 'Debug Session',
          theme: options.theme,
          generateFile: true,
        });
      }

      console.log(`All visualizations generated in: ${outputPath}`);
    } catch (error) {
      console.error('Error generating visualizations:', error);
      process.exit(1);
    }
  });

// Helper functions

/**
 * Find the latest test result file in the reports directory
 * @returns {string|null} Path to the latest test result file or null if not found
 */
function findLatestResultFile() {
  const reportsDir = path.join(process.cwd(), 'reports');

  if (!fs.existsSync(reportsDir)) {
    return null;
  }

  const resultFiles = fs
    .readdirSync(reportsDir)
    .filter(file => file.endsWith('.json') && !file.includes('config'))
    .map(file => path.join(reportsDir, file))
    .filter(file => fs.statSync(file).isFile());

  if (resultFiles.length === 0) {
    return null;
  }

  // Sort by modification time, newest first
  resultFiles.sort((a, b) => fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime());

  return resultFiles[0];
}

/**
 * Find the latest transactions file in the reports directory
 * @returns {string|null} Path to the latest transactions file or null if not found
 */
function findLatestTransactionsFile() {
  const reportsDir = path.join(process.cwd(), 'reports');

  if (!fs.existsSync(reportsDir)) {
    return null;
  }

  const txFiles = fs
    .readdirSync(reportsDir)
    .filter(file => file.includes('transaction') && file.endsWith('.json'))
    .map(file => path.join(reportsDir, file))
    .filter(file => fs.statSync(file).isFile());

  if (txFiles.length === 0) {
    return null;
  }

  // Sort by modification time, newest first
  txFiles.sort((a, b) => fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime());

  return txFiles[0];
}

/**
 * Find debug sessions in the reports directory
 * @param {string} baseDir Base directory to search
 * @returns {Array} List of debug session files
 */
function findDebugSessions(baseDir) {
  const debugDir = path.join(baseDir, 'debug');

  if (!fs.existsSync(debugDir)) {
    return [];
  }

  const sessionDirs = fs
    .readdirSync(debugDir)
    .filter(dir => dir.startsWith('debug-'))
    .map(dir => path.join(debugDir, dir))
    .filter(dir => fs.statSync(dir).isDirectory());

  const sessionFiles = sessionDirs
    .map(dir => path.join(dir, 'session.json'))
    .filter(file => fs.existsSync(file));

  if (sessionFiles.length === 0) {
    return [];
  }

  // Sort by modification time, newest first
  sessionFiles.sort((a, b) => fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime());

  return sessionFiles;
}

/**
 * Load test results from a file
 * @param {string} filePath Path to test results JSON file
 * @returns {Object} Test results
 */
function loadTestResults(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Error loading test results from ${filePath}:`, error);
    process.exit(1);
  }
}

/**
 * Load transactions from a file
 * @param {string} filePath Path to transactions JSON file
 * @returns {Array} Transactions
 */
function loadTransactions(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Handle different transaction formats
    if (Array.isArray(data)) {
      return data;
    } else if (data.transactions && Array.isArray(data.transactions)) {
      return data.transactions;
    } else {
      console.warn('Unexpected transactions format, attempting to extract transactions');
      return extractTransactionsFromResults(data);
    }
  } catch (error) {
    console.error(`Error loading transactions from ${filePath}:`, error);
    process.exit(1);
  }
}

/**
 * Load debug session from a file
 * @param {string} filePath Path to debug session JSON file
 * @returns {Object} Debug session data
 */
function loadDebugSession(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Error loading debug session from ${filePath}:`, error);
    process.exit(1);
  }
}

/**
 * Load all test results from a directory
 * @param {string} dir Directory containing test results
 * @returns {Object} Combined test results
 */
function loadAllTestResults(dir) {
  const files = fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.json') && !file.includes('config'))
    .map(file => path.join(dir, file))
    .filter(file => fs.statSync(file).isFile());

  if (files.length === 0) {
    console.warn(`No test result files found in ${dir}`);
    return { tests: [] };
  }

  // Load and combine all test results
  const allResults = { tests: [] };

  files.forEach(file => {
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (Array.isArray(data)) {
        allResults.tests.push(...data);
      } else if (data.tests && Array.isArray(data.tests)) {
        allResults.tests.push(...data.tests);
      } else {
        // Try to convert to a test result
        allResults.tests.push({
          id: path.basename(file, '.json'),
          title: data.title || path.basename(file, '.json'),
          status: data.status || 'unknown',
          ...data,
        });
      }
    } catch (error) {
      console.warn(`Error loading test results from ${file}:`, error);
    }
  });

  return allResults;
}

/**
 * Extract transactions from test results
 * @param {Object} results Test results
 * @returns {Array} Extracted transactions
 */
function extractTransactionsFromResults(results) {
  const transactions = [];

  // Handle different results formats
  if (Array.isArray(results)) {
    // Array of test results
    results.forEach(test => {
      if (test.transactions && Array.isArray(test.transactions)) {
        transactions.push(...test.transactions);
      }
    });
  } else if (results.tests && Array.isArray(results.tests)) {
    // Object with tests array
    results.tests.forEach(test => {
      if (test.transactions && Array.isArray(test.transactions)) {
        transactions.push(...test.transactions);
      }
    });
  } else if (results.transactions && Array.isArray(results.transactions)) {
    // Object with transactions array
    transactions.push(...results.transactions);
  }

  return transactions;
}

/**
 * Recreate a debug session from loaded data
 * @param {Object} sessionData Debug session data
 * @returns {Object} Debug session instance
 */
function recreateDebugSession(sessionData) {
  const tools = debugTools.initialize();
  const session = tools.createSession(sessionData.testContext || {}, {
    sessionId: sessionData.id,
  });

  // Add transactions
  if (sessionData.transactions && Array.isArray(sessionData.transactions)) {
    sessionData.transactions.forEach(tx => {
      session.trackTransaction(tx);
    });
  }

  // Add steps
  if (sessionData.steps && Array.isArray(sessionData.steps)) {
    sessionData.steps.forEach(step => {
      // Only add completed steps
      if (step.status === 'completed' || step.status === 'failed') {
        const startedStep = session.startStep(step.name, step.params);
        session.endStep(startedStep.id, step.result || {});
      }
    });
  }

  // Add logs
  if (sessionData.logs && Array.isArray(sessionData.logs)) {
    sessionData.logs.forEach(log => {
      session.log(log.message, log.level);
    });
  }

  return session;
}

// Parse command line arguments
program.parse(process.argv);

// Show help if no arguments are provided
if (process.argv.length <= 2) {
  program.help();
}
