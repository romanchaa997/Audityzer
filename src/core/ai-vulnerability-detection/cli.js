#!/usr/bin/env node

/**
 * AI Vulnerability Detector CLI
 *
 * Command-line interface for running the AI vulnerability detector on smart contracts
 * and web3 applications.
 */

const path = require('path');
const fs = require('fs');
const { AIVulnerabilityDetector } = require('./index');

// Parse command line arguments
const args = process.argv.slice(2);
let scanDirectory = process.cwd();
let outputDirectory = path.join(process.cwd(), 'scan-results');
let verbose = false;
let runExternalScan = false;
let showHelp = false;
let noAi = false;

// Process arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg === '-d' || arg === '--directory') {
    scanDirectory = args[++i] || scanDirectory;
  } else if (arg === '-o' || arg === '--output') {
    outputDirectory = args[++i] || outputDirectory;
  } else if (arg === '-v' || arg === '--verbose') {
    verbose = true;
  } else if (arg === '-e' || arg === '--external') {
    runExternalScan = true;
  } else if (arg === '-h' || arg === '--help') {
    showHelp = true;
  } else if (arg === '-n' || arg === '--no-ai') {
    noAi = true;
  }
}

// Display help
if (showHelp) {
  console.log('AI Vulnerability Detector CLI');
  console.log('=============================');
  console.log('Usage: node cli.js [options]');
  console.log('');
  console.log('Options:');
  console.log(
    '  -d, --directory <path>  Specify the directory to scan (default: current directory)'
  );
  console.log('  -o, --output <path>     Specify the output directory (default: ./scan-results)');
  console.log('  -v, --verbose           Enable verbose output');
  console.log('  -e, --external          Run external security scan tools as well');
  console.log('  -h, --help              Display this help information');
  console.log('  -n, --no-ai             Disable AI-based vulnerability detection');
  console.log('');
  console.log('Example:');
  console.log('  node cli.js -d ./contracts -o ./security-reports -v');
  process.exit(0);
}

// Print banner
console.log('=========================================');
console.log('     AI Vulnerability Detection Tool     ');
console.log('=========================================');
console.log('');

// Validate scan directory
if (!fs.existsSync(scanDirectory)) {
  console.error(`Error: Scan directory does not exist: ${scanDirectory}`);
  process.exit(1);
}

// Check for OpenAI API key
const hasApiKey = !!process.env.OPENAI_API_KEY;
if (!hasApiKey && !noAi) {
  console.warn(
    '⚠️  Warning: No OpenAI API key found. Running in basic mode without AI capabilities.'
  );
  noAi = true;
}

// Run the scan
async function runScan() {
  try {
    console.log(`Scanning directory: ${scanDirectory}`);

    // Create detector instance
    const detector = new AIVulnerabilityDetector({
      scanDirectory,
      outputDirectory,
      verbose,
      enableAI: !noAi,
    });

    // Initialize and run scan
    await detector.initialize();

    // Run external scan if requested
    if (runExternalScan) {
      console.log('Running external security scan tools...');
      const externalResults = await detector.runExternalScan();

      if (externalResults.success) {
        console.log('External security scan completed successfully');
      } else {
        console.warn('External security scan failed:', externalResults.error);
      }
    }

    // Run AI-based scan
    console.log('Running AI vulnerability detection...');
    const results = await detector.scanProject();

    // Print summary
    console.log('\nScan Summary:');
    console.log(`- Files Scanned: ${results.stats.filesScanned}`);
    console.log(`- Vulnerabilities Found: ${results.stats.vulnerabilitiesFound}`);

    if (results.stats.vulnerabilitiesFound > 0) {
      console.log(`  - Critical: ${results.stats.criticalIssues}`);
      console.log(`  - High: ${results.stats.highIssues}`);
      console.log(`  - Medium: ${results.stats.mediumIssues}`);
      console.log(`  - Low: ${results.stats.lowIssues}`);
    }

    console.log(
      `\nDetailed report saved to: ${path.join(outputDirectory, 'ai-vulnerability-report.md')}`
    );

    // Exit with non-zero code if critical vulnerabilities found
    if (results.stats.criticalIssues > 0) {
      console.log('\nWarning: Critical vulnerabilities detected!');
      process.exit(2);
    }
  } catch (error) {
    console.error('Error running vulnerability scan:', error);
    process.exit(1);
  }
}

runScan();
