#!/usr/bin/env node

/**
 * devforge
 * Intelligent development server with auto port management for Web3 security testing, process tracking,
 * and health monitoring capabilities.
 */

const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const { startServer, stopServer, getServerStatus } = require('../index');

// Get version from package.json
let version = '1.0.0';
try {
  const packageJson = require('../package.json');
  version = packageJson.version;
} catch (err) {
  // Use default version if package.json not found
}

// Configure CLI
program
  .version(version)
  .description('Cross-platform development server manager with smart port handling');

// Start command
program
  .command('start')
  .description('Start the development server')
  .option('-p, --port <port>', 'Preferred port (will find next available if occupied)')
  .option('-d, --dir <directory>', 'Directory to serve (default: public)')
  .option('-c, --config <file>', 'Config file path')
  .option('-l, --log-level <level>', 'Log level: debug, info, warn, error')
  .action((options) => {
    startServer({
      port: options.port,
      publicDir: options.dir,
      logLevel: options.logLevel,
      configFile: options.config,
      autoKill: true
    }).catch(err => {
      console.error('Failed to start server:', err.message);
      process.exit(1);
    });
  });

// Stop command
program
  .command('stop')
  .description('Stop the running development server')
  .action(() => {
    stopServer().catch(err => {
      console.error('Failed to stop server:', err.message);
      process.exit(1);
    });
  });

// Status command
program
  .command('status')
  .description('Check development server status')
  .action(() => {
    getServerStatus()
      .then(status => {
        console.log(`Status: ${status.status}`);
        if (status.pid) console.log(`PID: ${status.pid}`);
        if (status.port) console.log(`Port: ${status.port}`);
        if (status.healthEndpoint) console.log(`Health endpoint: ${status.healthEndpoint}`);
        if (status.startTime) console.log(`Start time: ${status.startTime}`);
        if (status.uptime) console.log(`Uptime: ${status.uptime}`);
        if (status.note) console.log(`Note: ${status.note}`);
      })
      .catch(err => {
        console.error('Error checking server status:', err.message);
        process.exit(1);
      });
  });

// Restart command
program
  .command('restart')
  .description('Restart the development server')
  .option('-p, --port <port>', 'Preferred port (will find next available if occupied)')
  .option('-d, --dir <directory>', 'Directory to serve (default: public)')
  .option('-c, --config <file>', 'Config file path')
  .option('-l, --log-level <level>', 'Log level: debug, info, warn, error')
  .action(async (options) => {
    try {
      // Stop any running server first
      await stopServer();
      
      // Small delay to ensure port is released
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Start new server
      await startServer({
        port: options.port,
        publicDir: options.dir,
        logLevel: options.logLevel,
        configFile: options.config,
        autoKill: false // Already stopped above
      });
    } catch (err) {
      console.error('Failed to restart server:', err.message);
      process.exit(1);
    }
  });

// Parse args
program.parse(process.argv);

// Display help if no args
if (process.argv.length <= 2) {
  program.help();
} 