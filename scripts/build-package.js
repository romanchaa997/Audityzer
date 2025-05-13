#!/usr/bin/env node
/**
 * Build the Audityzer package and report its size
 */

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

console.log(chalk.blue('Building Audityzer package...'));

// Run npm pack to create the package
try {
  const output = execSync('npm pack', { encoding: 'utf8' });
  const packageFile = output.trim();
  console.log(chalk.green(`Package created: ${packageFile}`));

  // Get the file size
  const stats = fs.statSync(packageFile);
  const fileSizeInBytes = stats.size;
  const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
  
  console.log(`Package size: ${fileSizeInBytes} bytes (${fileSizeInMegabytes.toFixed(2)} MB)`);
  
  if (fileSizeInMegabytes > 30) {
    console.log(chalk.red(`WARNING: Package size exceeds 30 MB limit (${fileSizeInMegabytes.toFixed(2)} MB)`));
    console.log(chalk.yellow('Consider further optimization:'));
    console.log('1. Check .npmignore and package.json files list');
    console.log('2. Remove large test files and example directories');
    console.log('3. Use tarball command to inspect package contents');
  } else {
    console.log(chalk.green(`Package size is within limits (${fileSizeInMegabytes.toFixed(2)} MB)`));
  }
} catch (error) {
  console.error(chalk.red(`Error building package: ${error.message}`));
  process.exit(1);
} 