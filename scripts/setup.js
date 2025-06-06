
#!/usr/bin/env node
/**
 * Setup Script for Audityzer
 * Handles initial project setup and configuration
 */

import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import logger from '../src/utils/logger.js';

const projectRoot = process.cwd();

async function createDirectories() {
  logger.info('Creating project directories...');
  
  const directories = [
    'logs',
    'temp',
    'reports',
    'config',
    'dist',
    'coverage'
  ];
  
  for (const dir of directories) {
    const dirPath = path.join(projectRoot, dir);
    await fs.ensureDir(dirPath);
    logger.info(`Created directory: ${dir}`);
  }
}

async function setupEnvironmentFiles() {
  logger.info('Setting up environment files...');
  
  const envExample = path.join(projectRoot, '.env-example');
  const envFile = path.join(projectRoot, '.env');
  
  if (fs.existsSync(envExample) && !fs.existsSync(envFile)) {
    await fs.copy(envExample, envFile);
    logger.info('Created .env file from .env-example');
  }
  
  const firebaseExample = path.join(projectRoot, '.firebase-config.example.json');
  const firebaseConfig = path.join(projectRoot, '.firebase-config.json');
  
  if (fs.existsSync(firebaseExample) && !fs.existsSync(firebaseConfig)) {
    await fs.copy(firebaseExample, firebaseConfig);
    logger.info('Created .firebase-config.json from example');
  }
}

async function setupGitHooks() {
  logger.info('Setting up Git hooks...');
  
  const hooksDir = path.join(projectRoot, '.git', 'hooks');
  
  if (fs.existsSync(path.join(projectRoot, '.git'))) {
    await fs.ensureDir(hooksDir);
    
    // Pre-commit hook
    const preCommitHook = `#!/bin/sh
npm run precommit
`;
    
    const preCommitPath = path.join(hooksDir, 'pre-commit');
    await fs.writeFile(preCommitPath, preCommitHook);
    await fs.chmod(preCommitPath, '755');
    
    // Pre-push hook
    const prePushHook = `#!/bin/sh
npm run prepush
`;
    
    const prePushPath = path.join(hooksDir, 'pre-push');
    await fs.writeFile(prePushPath, prePushHook);
    await fs.chmod(prePushPath, '755');
    
    logger.info('Git hooks configured');
  }
}

async function installPlaywright() {
  logger.info('Installing Playwright browsers...');
  
  try {
    execSync('npx playwright install chromium', { stdio: 'inherit' });
    logger.success('Playwright browsers installed');
  } catch (error) {
    logger.warn('Failed to install Playwright browsers:', error.message);
  }
}

async function validateSetup() {
  logger.info('Validating setup...');
  
  const requiredFiles = [
    'package.json',
    'tsconfig.json',
    'eslint.config.mjs'
  ];
  
  for (const file of requiredFiles) {
    const filePath = path.join(projectRoot, file);
    if (!fs.existsSync(filePath)) {
      logger.error(`Required file missing: ${file}`);
      process.exit(1);
    }
  }
  
  logger.success('Setup validation completed');
}

async function main() {
  try {
    logger.info('Starting Audityzer setup...');
    
    await createDirectories();
    await setupEnvironmentFiles();
    await setupGitHooks();
    await installPlaywright();
    await validateSetup();
    
    logger.success('Audityzer setup completed successfully!');
    logger.info('You can now run: npm run dev');
  } catch (error) {
    logger.error('Setup failed:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as setup };
