#!/usr/bin/env node

/**
 * MetaMask Security Test Runner
 *
 * This script runs the various MetaMask security tests and vulnerability scanners,
 * collecting results into a single report.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const config = {
  testTimeout: 120000, // 2 minutes per test
  testsDir: path.join(__dirname, '..', 'Audityzer-community-tests', 'dapp-tests'),
  outputDir: path.join(__dirname, '..', 'reports', 'metamask-security'),
  extensionPath:
    process.env.METAMASK_EXTENSION_PATH || path.join(__dirname, '..', 'extensions', 'metamask'),
  browserHeadless: process.argv.includes('--headless'),
  verbose: process.argv.includes('--verbose'),
  startTime: new Date(),
};

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Test categories to run
const testCategories = [
  {
    name: 'Wallet Connection',
    dir: path.join(config.testsDir, 'wallet-connection'),
    pattern: 'metamask-connection.test.js',
  },
  {
    name: 'Transaction Flow',
    dir: path.join(config.testsDir, 'transaction-flow'),
    pattern: 'metamask-transaction.test.js',
  },
  {
    name: 'Extension Security',
    file: path.join(__dirname, '..', 'tests', 'metamask-extension-security.test.js'),
    skipIfNoExtension: true,
  },
];

// Log function
function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const colorCode =
    {
      info: '\x1b[36m', // Cyan
      success: '\x1b[32m', // Green
      warning: '\x1b[33m', // Yellow
      error: '\x1b[31m', // Red
    }[level] || '\x1b[0m';


  // Ensure output directory exists before writing to log file
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  // Also append to log file
  fs.appendFileSync(
    path.join(config.outputDir, 'test-run.log'),
    `[${timestamp}] [${level.toUpperCase()}] ${message}\n`
  );
}

// Generate a random wallet seed for testing (DO NOT USE FOR REAL WALLETS)
function generateTestSeed() {
  const words = [
    'abandon',
    'ability',
    'able',
    'about',
    'above',
    'absent',
    'absorb',
    'abstract',
    'absurd',
    'abuse',
    'access',
    'accident',
    'account',
    'accuse',
    'achieve',
    'acid',
  ];

  return Array(12)
    .fill(0)
    .map(() => words[Math.floor(Math.random() * words.length)])
    .join(' ');
}

// Execute a Playwright test
function runPlaywrightTest(testFile, extraOptions = []) {
  const testSeed = generateTestSeed();

  const options = [
    '--timeout=' + config.testTimeout,
    config.browserHeadless ? '--headed=false' : '--headed',
    ...extraOptions,
  ];

  const env = {
    ...process.env,
    TEST_WALLET_SEED: testSeed,
    METAMASK_TEST_WALLET: testSeed,
    METAMASK_EXTENSION_PATH: config.extensionPath,
  };

  log(`Running test: ${path.basename(testFile)}`);

  try {
    const result = execSync(`npx playwright test "${testFile}" ${options.join(' ')}`, {
      env,
      stdio: config.verbose ? 'inherit' : 'pipe',
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
    });

    log(`Test passed: ${path.basename(testFile)}`, 'success');
    return { success: true, output: result };
  } catch (error) {
    log(`Test failed: ${path.basename(testFile)}`, 'error');
    if (config.verbose && error.stdout) {
      console.error(error.stdout);
    }
    return { success: false, error: error.message, output: error.stdout };
  }
}

// Run fuzzing tools and tests
function runFuzzingTests() {
  log('Starting fuzzing tests...');

  try {
    // First ensure the fuzzing server is built
    execSync('cd Audityzer && npm install', { stdio: 'pipe' });

    // Run the fuzzer in a child process
    const fuzzerProcess = require('child_process').spawn(
      'node',
      ['./Audityzer/server.js', '--route=metamask-fuzzer'],
      { stdio: config.verbose ? 'inherit' : 'pipe' }
    );

    log('Fuzzer server started. Launching browser tests...');

    // Create a simple HTML file that loads our fuzzer
    const testHtmlPath = path.join(config.outputDir, 'fuzzer-test.html');
    fs.writeFileSync(
      testHtmlPath,
      `
      <!DOCTYPE html>
      <html>
      <head>
        <title>MetaMask Fuzzer Test</title>
        <script type="module">
          import { runMetaMaskFuzzer, MetaMaskFuzzerUI } from '/metamask-fuzzer.js';
          
          window.runTests = async function() {
            if (typeof window.ethereum === 'undefined') {
              document.getElementById('results').innerHTML = 
                '<div style="color: red">MetaMask not detected. Please install and connect MetaMask.</div>';
              return;
            }
            
            const results = await runMetaMaskFuzzer();
            const ui = MetaMaskFuzzerUI();
            document.getElementById('results').appendChild(ui.renderResults(results));
            
            // Save results
            fetch('/save-results', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(results)
            });
          };
        </script>
      </head>
      <body>
        <h1>MetaMask Interface Fuzzer</h1>
        <button onclick="runTests()">Start Fuzzing Tests</button>
        <div id="results"></div>
      </body>
      </html>
    `
    );

    // Run the browser test
    const testResult = runPlaywrightTest(path.join(__dirname, 'fuzzer-browser-test.js'), [
      '--testFuzzerUrl=http://localhost:3000/fuzzer-test.html',
    ]);

    // Kill the fuzzer server
    fuzzerProcess.kill();

    log('Fuzzing tests completed');

    return testResult;
  } catch (error) {
    log(`Failed to run fuzzing tests: ${error.message}`, 'error');
    return { success: false, error: error.message };
  }
}

// Check if MetaMask extension is available
function checkExtensionAvailability() {
  if (!fs.existsSync(config.extensionPath)) {
    log(`MetaMask extension not found at: ${config.extensionPath}`, 'warning');
    return false;
  }

  const manifest = path.join(config.extensionPath, 'manifest.json');
  if (!fs.existsSync(manifest)) {
    log(
      `Invalid extension directory: manifest.json not found in ${config.extensionPath}`,
      'warning'
    );
    return false;
  }

  try {
    const manifestContent = JSON.parse(fs.readFileSync(manifest, 'utf8'));
    if (manifestContent.name && manifestContent.name.includes('MetaMask')) {
      log(`Found MetaMask extension: ${manifestContent.name} v${manifestContent.version}`, 'info');
      return true;
    } else {
      log(
        `Found extension, but it doesn't appear to be MetaMask: ${manifestContent.name}`,
        'warning'
      );
      return false;
    }
  } catch (e) {
    log(`Failed to parse manifest.json: ${e.message}`, 'warning');
    return false;
  }
}

// Main function to run all tests
async function runAllTests() {
  log('Starting MetaMask security tests...', 'info');

  const results = {
    startTime: config.startTime,
    endTime: null,
    categories: {},
    summary: {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
    },
    vulnerabilities: [],
  };

  // Check if extension is available for extension-specific tests
  const extensionAvailable = checkExtensionAvailability();

  // Run tests in each category
  for (const category of testCategories) {
    log(`Running test category: ${category.name}`, 'info');

    // Skip extension tests if extension is not available
    if (category.skipIfNoExtension && !extensionAvailable) {
      log(`Skipping ${category.name} tests - extension not available`, 'warning');
      results.categories[category.name] = {
        status: 'skipped',
        reason: 'Extension not available',
      };
      results.summary.skipped++;
      continue;
    }

    // If a specific file is specified
    if (category.file) {
      const testResult = runPlaywrightTest(category.file);
      results.categories[category.name] = {
        status: testResult.success ? 'passed' : 'failed',
        tests: [{ file: category.file, ...testResult }],
      };

      if (testResult.success) {
        results.summary.passed++;
      } else {
        results.summary.failed++;
      }
      results.summary.total++;

      continue;
    }

    // If a directory with pattern is specified
    if (category.dir && category.pattern) {
      const testFiles = fs
        .readdirSync(category.dir)
        .filter(file => file.match(category.pattern))
        .map(file => path.join(category.dir, file));

      if (testFiles.length === 0) {
        log(`No tests found for pattern: ${category.pattern} in ${category.dir}`, 'warning');
        results.categories[category.name] = {
          status: 'skipped',
          reason: 'No tests found',
        };
        results.summary.skipped++;
        continue;
      }

      const categoryResults = [];
      for (const testFile of testFiles) {
        const testResult = runPlaywrightTest(testFile);
        categoryResults.push({ file: testFile, ...testResult });

        if (testResult.success) {
          results.summary.passed++;
        } else {
          results.summary.failed++;
        }
        results.summary.total++;
      }

      results.categories[category.name] = {
        status: categoryResults.every(r => r.success) ? 'passed' : 'failed',
        tests: categoryResults,
      };
    }
  }

  // Run fuzzing tests if extension is available
  if (extensionAvailable) {
    log('Running fuzzing tests...', 'info');
    const fuzzingResult = runFuzzingTests();
    results.categories['Fuzzing Tests'] = {
      status: fuzzingResult.success ? 'passed' : 'failed',
      tests: [{ file: 'fuzzer', ...fuzzingResult }],
    };

    if (fuzzingResult.success) {
      results.summary.passed++;
    } else {
      results.summary.failed++;
    }
    results.summary.total++;

    // Try to parse vulnerabilities from fuzzing results
    try {
      const fuzzingResultsPath = path.join(config.outputDir, 'fuzzing-results.json');
      if (fs.existsSync(fuzzingResultsPath)) {
        const fuzzingData = JSON.parse(fs.readFileSync(fuzzingResultsPath, 'utf8'));
        if (fuzzingData.vulnerabilities && Array.isArray(fuzzingData.vulnerabilities)) {
          results.vulnerabilities.push(
            ...fuzzingData.vulnerabilities.map(v => ({
              ...v,
              source: 'Interface Fuzzing',
            }))
          );
        }
      }
    } catch (e) {
      log(`Failed to parse fuzzing results: ${e.message}`, 'warning');
    }
  }

  // Finish the run
  results.endTime = new Date();
  results.duration = (results.endTime - results.startTime) / 1000; // in seconds

  // Save results
  const resultsPath = path.join(
    config.outputDir,
    `results-${results.startTime.toISOString().replace(/:/g, '-')}.json`
  );
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

  // Generate summary
  log('\nTest Run Summary:', 'info');
  log(`Total tests: ${results.summary.total}`, 'info');
  log(`Passed: ${results.summary.passed}`, results.summary.passed > 0 ? 'success' : 'info');
  log(`Failed: ${results.summary.failed}`, results.summary.failed > 0 ? 'error' : 'info');
  log(`Skipped: ${results.summary.skipped}`, results.summary.skipped > 0 ? 'warning' : 'info');
  log(`Duration: ${results.duration.toFixed(2)} seconds`, 'info');

  if (results.vulnerabilities.length > 0) {
    log(`\nFound ${results.vulnerabilities.length} potential vulnerabilities:`, 'warning');
    results.vulnerabilities.forEach((v, i) => {
      log(`${i + 1}. ${v.type} (${v.severity}): ${v.description}`, 'warning');
    });
    log(`\nDetailed results saved to: ${resultsPath}`, 'info');
  } else {
    log('\nNo vulnerabilities detected in this run.', 'success');
  }

  return results;
}

// Run all tests
runAllTests()
  .then(results => {
    process.exit(results.summary.failed > 0 ? 1 : 0);
  })
  .catch(error => {
    log(`Error running tests: ${error.message}`, 'error');
    process.exit(1);
  });
