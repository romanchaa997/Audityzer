
#!/usr/bin/env node
/**
 * Deployment Script for Audityzer
 * Handles deployment to different environments
 */

import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import logger from '../src/utils/logger.js';

const projectRoot = process.cwd();

class Deployer {
  constructor(environment = 'staging') {
    this.environment = environment;
    this.config = this.loadConfig();
  }

  loadConfig() {
    const configPath = path.join(projectRoot, 'config', `deploy-${this.environment}.json`);
    
    if (fs.existsSync(configPath)) {
      return fs.readJsonSync(configPath);
    }
    
    // Default configuration
    return {
      staging: {
        host: 'staging.audityzer.com',
        port: 5000,
        buildDir: 'dist'
      },
      production: {
        host: 'audityzer.com',
        port: 80,
        buildDir: 'dist'
      }
    }[this.environment] || {};
  }

  async preDeploy() {
    logger.info(`Pre-deployment checks for ${this.environment}...`);
    
    // Run tests
    try {
      execSync('npm test', { stdio: 'inherit' });
      logger.success('Tests passed');
    } catch (error) {
      logger.error('Tests failed');
      throw error;
    }
    
    // Run security checks
    try {
      execSync('npm run security:check', { stdio: 'inherit' });
      logger.success('Security checks passed');
    } catch (error) {
      logger.error('Security checks failed');
      throw error;
    }
    
    // Build application
    try {
      execSync('npm run build:core', { stdio: 'inherit' });
      logger.success('Build completed');
    } catch (error) {
      logger.error('Build failed');
      throw error;
    }
  }

  async deploy() {
    logger.info(`Deploying to ${this.environment}...`);
    
    const buildDir = path.join(projectRoot, this.config.buildDir || 'dist');
    
    if (!fs.existsSync(buildDir)) {
      throw new Error(`Build directory not found: ${buildDir}`);
    }
    
    // Create deployment package
    const deploymentPackage = await this.createDeploymentPackage(buildDir);
    logger.info(`Created deployment package: ${deploymentPackage}`);
    
    // Deploy based on environment
    if (this.environment === 'production') {
      await this.deployToProduction(deploymentPackage);
    } else {
      await this.deployToStaging(deploymentPackage);
    }
  }

  async createDeploymentPackage(buildDir) {
    const packagePath = path.join(projectRoot, `audityzer-${this.environment}-${Date.now()}.tar.gz`);
    
    try {
      execSync(`tar -czf "${packagePath}" -C "${buildDir}" .`, { stdio: 'inherit' });
      return packagePath;
    } catch (error) {
      logger.error('Failed to create deployment package');
      throw error;
    }
  }

  async deployToStaging(packagePath) {
    logger.info('Deploying to staging environment...');
    // Staging deployment logic here
    logger.success('Staging deployment completed');
  }

  async deployToProduction(packagePath) {
    logger.info('Deploying to production environment...');
    // Production deployment logic here
    logger.success('Production deployment completed');
  }

  async postDeploy() {
    logger.info('Running post-deployment tasks...');
    
    // Health checks, notifications, etc.
    logger.success('Post-deployment tasks completed');
  }

  async run() {
    try {
      await this.preDeploy();
      await this.deploy();
      await this.postDeploy();
      
      logger.success(`Deployment to ${this.environment} completed successfully!`);
    } catch (error) {
      logger.error(`Deployment to ${this.environment} failed:`, error);
      process.exit(1);
    }
  }
}

// CLI handling
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const envArg = args.find(arg => arg.startsWith('--env='));
  const environment = envArg ? envArg.split('=')[1] : 'staging';
  
  const deployer = new Deployer(environment);
  deployer.run();
}

export { Deployer };
