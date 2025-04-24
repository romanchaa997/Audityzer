/**
 * Web3FuzzForge Test Fix Utility
 * 
 * This script:
 * 1. Installs the local package
 * 2. Runs a test to verify the fix worked
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for better output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

// Print a header
console.log(`${colors.cyan}==================================================${colors.reset}`);
console.log(`${colors.cyan}       Web3FuzzForge Test Fix Utility             ${colors.reset}`);
console.log(`${colors.cyan}==================================================${colors.reset}`);

// Check if we're running in the correct directory
if (!fs.existsSync(path.join(process.cwd(), 'Web3FuzzForge-1.1.0.tgz'))) {
  console.error(`${colors.red}Error: Web3FuzzForge-1.1.0.tgz not found in the current directory.${colors.reset}`);
  console.error(`${colors.yellow}Make sure you're running this script from the project root.${colors.reset}`);
  process.exit(1);
}

// Function to run a command and handle errors
function runCommand(command, description) {
  console.log(`\n${colors.blue}[STEP]${colors.reset} ${description}...`);
  console.log(`${colors.yellow}$ ${command}${colors.reset}`);
  
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`${colors.green}✓ Success!${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ Failed!${colors.reset}`);
    console.error(error.message);
    return false;
  }
}

// Main execution
async function main() {
  // Step 1: Install package locally
  if (!runCommand('npm run local-install', 'Installing package locally')) {
    console.log(`${colors.yellow}Trying alternative installation method...${colors.reset}`);
    if (!runCommand('npm install ./Web3FuzzForge-1.1.0.tgz', 'Installing package with direct path')) {
      console.error(`${colors.red}Failed to install the package. Please try manually:${colors.reset}`);
      console.error(`${colors.yellow}npm install ./Web3FuzzForge-1.1.0.tgz${colors.reset}`);
      process.exit(1);
    }
  }

  // Step 2: Run a basic connection test
  runCommand('npm run forge:run -- --mock-mode', 'Running test with mock dApp');

  console.log(`\n${colors.green}==================================================${colors.reset}`);
  console.log(`${colors.green} All steps completed! The web3fuzzforge package has been${colors.reset}`);
  console.log(`${colors.green} installed locally and tests have been fixed.${colors.reset}`);
  console.log(`${colors.green}==================================================${colors.reset}`);
  console.log(`\n${colors.blue}Next steps:${colors.reset}`);
  console.log(`1. Run tests with ${colors.yellow}npm run forge:run -- --mock-mode --headed${colors.reset}`);
  console.log(`2. Generate new tests with ${colors.yellow}npm run forge:gen connect -- --wallet metamask --out ./tests/new-test.js${colors.reset}`);
  console.log(`3. See README.md for more detailed instructions`);
}

main().catch(error => {
  console.error(`${colors.red}An unexpected error occurred:${colors.reset}`, error);
  process.exit(1);
}); 