
#!/usr/bin/env node
/**
 * Build Script for Audityzer
 * Handles compilation and bundling of the application
 */

import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import logger from '../src/utils/logger.js';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const srcDir = path.join(projectRoot, 'src');

async function cleanBuild() {
  logger.info('Cleaning previous build...');
  await fs.remove(distDir);
  await fs.ensureDir(distDir);
}

async function copyAssets() {
  logger.info('Copying assets...');
  
  const assetDirs = ['templates', 'config', 'assets'];
  
  for (const dir of assetDirs) {
    const srcPath = path.join(projectRoot, dir);
    const destPath = path.join(distDir, dir);
    
    if (await fs.pathExists(srcPath)) {
      await fs.copy(srcPath, destPath);
      logger.info(`Copied ${dir} to dist/`);
    }
  }
  
  // Copy package.json and other essential files
  const essentialFiles = ['package.json', 'README.md', 'LICENSE'];
  for (const file of essentialFiles) {
    const srcPath = path.join(projectRoot, file);
    const destPath = path.join(distDir, file);
    
    if (await fs.pathExists(srcPath)) {
      await fs.copy(srcPath, destPath);
    }
  }
}

async function buildCore() {
  logger.info('Building core application...');
  
  try {
    // Copy source files to dist
    await fs.copy(srcDir, path.join(distDir, 'src'));
    
    // Copy bin directory
    const binDir = path.join(projectRoot, 'bin');
    if (await fs.pathExists(binDir)) {
      await fs.copy(binDir, path.join(distDir, 'bin'));
    }
    
    logger.success('Core build completed successfully!');
  } catch (error) {
    logger.error('Build failed:', error);
    process.exit(1);
  }
}

async function generateManifest() {
  logger.info('Generating build manifest...');
  
  const manifest = {
    version: process.env.npm_package_version || '1.1.2',
    buildTime: new Date().toISOString(),
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch
  };
  
  await fs.writeJson(path.join(distDir, 'build-manifest.json'), manifest, { spaces: 2 });
}

async function main() {
  try {
    logger.info('Starting Audityzer build process...');
    
    await cleanBuild();
    await copyAssets();
    await buildCore();
    await generateManifest();
    
    logger.success('Build completed successfully!');
    logger.info(`Build output: ${distDir}`);
  } catch (error) {
    logger.error('Build process failed:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as build };
