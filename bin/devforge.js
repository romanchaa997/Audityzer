#!/usr/bin/env node

/**
 * DevForge - Intelligent Development Server for Web3
 * 
 * A cross-platform development server manager with smart port management, 
 * process tracking, and health monitoring capabilities. Built specifically
 * for Web3 security testing environments.
 * 
 * Features:
 * - Automatic port conflict resolution
 * - Cross-platform process management (Windows/Linux/macOS)
 * - Health monitoring API endpoint
 * - Server metadata and diagnostics
 * 
 * @license MIT
 * @version 1.0.0
 */

import { program } from 'commander';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// Create require function for importing JSON
const require = createRequire(import.meta.url);
const { version } = require('../package.json');

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to resolve the scripts directory
const scriptsDir = path.join(__dirname, '..', 'scripts');

// Configure CLI
program
  .version(version)
  .description('DevForge: Intelligent development server for Web3 security testing');

// Start command
program
  .command('start')
  .description('Start the development server')
  .option('-p, --port <port>', 'Preferred port (will find next available if occupied)')
  .option('-d, --dir <directory>', 'Directory to serve (default: public)')
  .option('-c, --config <file>', 'Config file path')
  .option('-l, --log-level <level>', 'Log level: debug, info, warn, error')
  .action((options) => {
    // Set environment variables
    if (options.port) process.env.SERVER_PORT = options.port;
    if (options.dir) process.env.PUBLIC_DIR = options.dir;
    if (options.logLevel) process.env.LOG_LEVEL = options.logLevel;
    if (options.config) process.env.CONFIG_PATH = options.config;

    // Execute start script
    import(path.join(scriptsDir, 'start-server.js'));
  });

// Stop command
program
  .command('stop')
  .description('Stop the running development server')
  .action(() => {
    import(path.join(scriptsDir, 'stop-server.js'));
  });

// Status command
program
  .command('status')
  .description('Check development server status')
  .action(() => {
    const pidFile = path.join(__dirname, '..', '.server-pid');

    try {
      if (fs.existsSync(pidFile)) {
        try {
          const data = JSON.parse(fs.readFileSync(pidFile, 'utf8').trim());
          const pid = data.pid;
          const port = data.port;
          const startTime = data.startTime;
          const uptime = (Date.now() - startTime) / 1000; // seconds

          console.log('Status: Running');
          console.log(`PID: ${pid}`);
          console.log(`Port: ${port}`);
          console.log(`Health endpoint: http://localhost:${parseInt(port) + 1}/health`);
          console.log(`Start time: ${new Date(startTime).toISOString()}`);
          console.log(`Uptime: ${uptime.toFixed(2)} seconds`);
        } catch (err) {
          // Handle old format or corrupted file
          const pid = fs.readFileSync(pidFile, 'utf8').trim();
          console.log('Status: Running (legacy format)');
          console.log(`PID: ${pid}`);
          console.log('Note: Server is running with an older version of the runner');
        }
      } else {
        console.log('Status: Not running');
      }
    } catch (err) {
      console.error('Error checking server status:', err.message);
      process.exit(1);
    }
  });

// Restart command
program
  .command('restart')
  .description('Restart the development server')
  .option('-p, --port <port>', 'Preferred port (will find next available if occupied)')
  .option('-d, --dir <directory>', 'Directory to serve (default: public)')
  .option('-c, --config <file>', 'Config file path')
  .option('-l, --log-level <level>', 'Log level: debug, info, warn, error')
  .action((options) => {
    // Set environment variables
    if (options.port) process.env.SERVER_PORT = options.port;
    if (options.dir) process.env.PUBLIC_DIR = options.dir;
    if (options.logLevel) process.env.LOG_LEVEL = options.logLevel;
    if (options.config) process.env.CONFIG_PATH = options.config;

    // Stop any running server first
    import(path.join(scriptsDir, 'stop-server.js'))
      .then(() => {
        // Small delay to ensure port is released
        setTimeout(() => {
          // Start new server
          import(path.join(scriptsDir, 'start-server.js'));
        }, 1000);
      });
  });

// Export functions for programmatic use
export default {
  start: (options) => {
    // Set environment variables
    if (options?.port) process.env.SERVER_PORT = options.port;
    if (options?.dir) process.env.PUBLIC_DIR = options.dir;
    if (options?.logLevel) process.env.LOG_LEVEL = options.logLevel;
    if (options?.config) process.env.CONFIG_PATH = options.config;

    // Execute start script
    import(path.join(scriptsDir, 'start-server.js'));
  },
  stop: () => {
    import(path.join(scriptsDir, 'stop-server.js'));
  },
  restart: (options) => {
    // Set environment variables
    if (options?.port) process.env.SERVER_PORT = options.port;
    if (options?.dir) process.env.PUBLIC_DIR = options.dir;
    if (options?.logLevel) process.env.LOG_LEVEL = options.logLevel;
    if (options?.config) process.env.CONFIG_PATH = options.config;

    // Stop any running server first
    import(path.join(scriptsDir, 'stop-server.js'))
      .then(() => {
        // Small delay to ensure port is released
        setTimeout(() => {
          // Start new server
          import(path.join(scriptsDir, 'start-server.js'));
        }, 1000);
      });
  },
  status: () => {
    const pidFile = path.join(__dirname, '..', '.server-pid');

    try {
      if (fs.existsSync(pidFile)) {
        try {
          const data = JSON.parse(fs.readFileSync(pidFile, 'utf8').trim());
          const pid = data.pid;
          const port = data.port;
          const startTime = data.startTime;
          const uptime = (Date.now() - startTime) / 1000; // seconds

          console.log('Status: Running');
          console.log(`PID: ${pid}`);
          console.log(`Port: ${port}`);
          console.log(`Health endpoint: http://localhost:${parseInt(port) + 1}/health`);
          console.log(`Start time: ${new Date(startTime).toISOString()}`);
          console.log(`Uptime: ${uptime.toFixed(2)} seconds`);
        } catch (err) {
          // Handle old format or corrupted file
          const pid = fs.readFileSync(pidFile, 'utf8').trim();
          console.log('Status: Running (legacy format)');
          console.log(`PID: ${pid}`);
          console.log('Note: Server is running with an older version of the runner');
        }
      } else {
        console.log('Status: Not running');
      }
    } catch (err) {
      console.error('Error checking server status:', err.message);
      process.exit(1);
    }
  }
};

// Parse args
program.parse(process.argv);

// Display help if no args
if (process.argv.length <= 2) {
  program.help();
} 