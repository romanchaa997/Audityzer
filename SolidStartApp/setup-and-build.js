#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

// Helper function to execute commands and log output
function executeCommand(command, description) {
  console.log(`${colors.blue}${colors.bright}> ${description}...${colors.reset}`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`${colors.green}✓ ${description} completed successfully${colors.reset}\n`);
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ ${description} failed:${colors.reset}`, error.message);
    return false;
  }
}

// Main function to run the setup and build process
async function main() {
  console.log(`\n${colors.bright}=== SOLIDSTART APP SETUP AND BUILD ===\n${colors.reset}`);

  // 1. Check if .env file exists, if not create it with CODECOV_TOKEN
  const envFilePath = path.join(__dirname, '.env');
  if (!fs.existsSync(envFilePath)) {
    console.log(`${colors.yellow}Creating .env file with CODECOV_TOKEN...${colors.reset}`);
    fs.writeFileSync(envFilePath, 'CODECOV_TOKEN=7eb6aaf4-9247-480d-9286-c1ff12a83dd6\n');
    console.log(`${colors.green}✓ .env file created${colors.reset}\n`);
  }

  // 2. Install dependencies
  if (!executeCommand('npm install', 'Installing dependencies')) {
    return;
  }

  // 3. Build the application
  if (!executeCommand('npm run build', 'Building the application')) {
    return;
  }

  // 4. Commit changes if needed
  if (process.argv.includes('--commit')) {
    if (!executeCommand('git add .', 'Adding changes to git')) {
      return;
    }
    if (
      !executeCommand(
        'git commit -m "Add SolidStart app with Codecov integration"',
        'Committing changes'
      )
    ) {
      return;
    }
    if (!executeCommand('git push', 'Pushing changes to remote repository')) {
      return;
    }
  }

  console.log(
    `\n${colors.green}${colors.bright}✓ Setup and build completed successfully!${colors.reset}`
  );
  console.log(
    `\n${colors.bright}Run 'npm start' in the SolidStartApp directory to start the application.${colors.reset}\n`
  );
}

main().catch(error => {
  console.error(`${colors.red}Error:${colors.reset}`, error);
  process.exit(1);
});
