#!/usr/bin/env node
/**
 * Build the Audityzer package and report its size
 */

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');


// Run npm pack to create the package
try {
  const output = execSync('npm pack', { encoding: 'utf8' });
  const packageFile = output.trim();

  // Get the file size
  const stats = fs.statSync(packageFile);
  const fileSizeInBytes = stats.size;
  const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
  
  
  if (fileSizeInMegabytes > 30) {
  } else {
  }
} catch (error) {
  console.error(chalk.red(`Error building package: ${error.message}`));
  process.exit(1);
} 