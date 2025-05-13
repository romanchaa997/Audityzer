#!/usr/bin/env node

/**
 * Web3FuzzForge - Immunefi Submission CLI
 * 
 * Command line tool to submit vulnerabilities to Immunefi from test results.
 */

const fs = require('fs');
const path = require('path');
const { processAndSubmitToImmunefi } = require('./immunefi-submitter');

// Parse command line arguments
const args = process.argv.slice(2);
const params = {};

for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    params[args[i].substring(2)] = args[i + 1] || true;
    i++;
  }
}

// Set default values for parameters
const testResultsPath = params.input || path.join(process.cwd(), 'reports', 'test-results.json');
const projectName = params.project || 'Target Web3 Application';
const contractAddresses = params.contracts || '';
const websiteUrl = params.url || '';
const contactInfo = params.contact || '';
const immunefiProjectId = params.projectId || '';

// Validate test results file exists
if (!fs.existsSync(testResultsPath)) {
  console.error(`Error: Test results file not found at ${testResultsPath}`);
  console.log('Use --input parameter to specify the path to your test results file');
  process.exit(1);
}

// Check if API key is set
if (!process.env.IMMUNEFI_API_KEY) {
  console.error('Error: IMMUNEFI_API_KEY environment variable is not set');
  console.log('Set the environment variable before running this command:');
  console.log('  export IMMUNEFI_API_KEY=your_api_key_here');
  process.exit(1);
}

// Display submission information
console.log('Web3FuzzForge - Immunefi Vulnerability Submission');
console.log('================================================');
console.log(`Test Results: ${testResultsPath}`);
console.log(`Project Name: ${projectName}`);
console.log(`Contract Addresses: ${contractAddresses || 'Not specified'}`);
console.log(`Website URL: ${websiteUrl || 'Not specified'}`);
console.log(`Contact Info: ${contactInfo || 'Not specified'}`);
console.log(`Immunefi Project ID: ${immunefiProjectId || 'Not specified (auto-detection will be attempted)'}`);
console.log('================================================');

// Confirm submission
if (!params.confirm) {
  console.log('\nReview the information above and add --confirm flag to proceed with submission.');
  console.log('Example: npm run submit:immunefi -- --input=./results.json --project="My Project" --confirm');
  process.exit(0);
}

// Project metadata
const projectMetadata = {
  projectName,
  contractAddresses,
  websiteUrl,
  contactInfo,
  immunefiProjectId
};

// Process and submit
console.log('\nProcessing test results and submitting vulnerabilities to Immunefi...');

processAndSubmitToImmunefi(testResultsPath, projectMetadata)
  .then(result => {
    if (result.success) {
      console.log('\n✅ Submission successful!');
      console.log(`Report ID: ${result.reportId}`);
      console.log(`Submission Date: ${result.submissionDate}`);
      console.log(`Status: ${result.status}`);
    } else {
      if (result.reason === 'no-vulnerabilities') {
        console.log('\n⚠️ No critical, high, or medium vulnerabilities found. Submission skipped.');
      } else {
        console.error('\n❌ Submission failed:');
        console.error(`Error: ${result.error}`);
        if (result.errorCode) {
          console.error(`Error Code: ${result.errorCode}`);
        }
      }
    }
  })
  .catch(error => {
    console.error('\n❌ Error during submission process:');
    console.error(error);
    process.exit(1);
  }); 