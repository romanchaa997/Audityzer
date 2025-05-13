#!/usr/bin/env node

/**
 * Dependency Installation Script
 *
 * This script installs required dependencies with appropriate flags
 * to handle peer dependency conflicts and other issues.
 */

const { spawn } = require('child_process');
const chalk = require('chalk');

// Define dependencies that need special handling
const criticalDependencies = {
  // Format: packageName: { version, flags }
  ethers: { version: '5.7.2', flags: ['--legacy-peer-deps'] },
  web3: { version: '1.10.0', flags: ['--legacy-peer-deps'] },
  openai: { version: '4.24.1', flags: [] },
};

// Check if specific packages are installed
async function checkPackages(packages) {
  const missing = [];

  for (const pkg of packages) {
    try {
      require(pkg);
    } catch (error) {
      missing.push(pkg);
    }
  }

  return missing;
}

// Install a package with npm
function installPackage(pkg, version, flags = []) {
  return new Promise((resolve, reject) => {
    const packageSpec = version ? `${pkg}@${version}` : pkg;
    const args = ['install', packageSpec, ...flags];

    console.log(chalk.blue(`Installing ${packageSpec} with flags: ${flags.join(' ')}`));

    const npmProcess = spawn('npm', args, { stdio: 'inherit' });

    npmProcess.on('close', code => {
      if (code === 0) {
        console.log(chalk.green(`Successfully installed ${packageSpec}`));
        resolve();
      } else {
        console.error(chalk.red(`Failed to install ${packageSpec} (exit code: ${code})`));
        reject(new Error(`npm install exited with code ${code}`));
      }
    });

    npmProcess.on('error', error => {
      console.error(chalk.red(`Error spawning npm process: ${error.message}`));
      reject(error);
    });
  });
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  let packagesToInstall = Object.keys(criticalDependencies);

  // If packages are specified as arguments, only install those
  if (args.length > 0) {
    packagesToInstall = args.filter(pkg => pkg in criticalDependencies);
    if (packagesToInstall.length === 0) {
      console.error(
        chalk.red('None of the specified packages are in the critical dependencies list.')
      );
      console.log(chalk.yellow('Available critical packages:'));
      Object.keys(criticalDependencies).forEach(pkg => {
        console.log(`- ${pkg}`);
      });
      process.exit(1);
    }
  }

  // Check which packages are missing
  const missingPackages = await checkPackages(packagesToInstall);

  if (missingPackages.length === 0) {
    console.log(chalk.green('All critical dependencies are already installed!'));
    process.exit(0);
  }

  console.log(chalk.yellow(`Installing missing dependencies: ${missingPackages.join(', ')}`));

  // Install missing packages
  for (const pkg of missingPackages) {
    const { version, flags } = criticalDependencies[pkg];
    try {
      await installPackage(pkg, version, flags);
    } catch (error) {
      console.error(chalk.red(`Failed to install ${pkg}: ${error.message}`));
      process.exit(1);
    }
  }

  console.log(chalk.green('All dependencies installed successfully!'));
}

// Run the main function
main().catch(error => {
  console.error(chalk.red('Error running installation script:'));
  console.error(error);
  process.exit(1);
});
