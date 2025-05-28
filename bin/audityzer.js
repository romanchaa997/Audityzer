#!/usr/bin/env node

/**
 * Audityzer CLI Entry Point
 * 
 * This is the main entry point for the Audityzer CLI tool.
 * It handles command parsing and delegates to the appropriate modules.
 */

import { program } from 'commander';
import chalk from 'chalk';
import { startServer, stopServer, restartServer, getServerStatus } from '../src/core/server.js';
import { generateTest } from '../src/generators/test-generator.js';
import { runTests } from '../src/core/test-runner.js';
import { generateReport } from '../src/reporting/report-generator.js';
import { version } from '../package.json';

// Configure the CLI program
program
  .name('audityzer')
  .description('Web3 security testing framework for dApps and smart contracts')
  .version(version);

// Server commands
program
  .command('server')
  .description('Manage the development server')
  .argument('<action>', 'Action to perform: start, stop, restart, status')
  .option('-p, --port <port>', 'Port to use for the server', '5050')
  .option('-d, --directory <directory>', 'Directory to serve', './public')
  .option('-c, --config <config>', 'Path to config file')
  .action((action, options) => {
    const port = parseInt(options.port, 10);
    
    switch (action) {
      case 'start':
        startServer(port, options.directory, options.config);
        break;
      case 'stop':
        stopServer(port);
        break;
      case 'restart':
        restartServer(port, options.directory, options.config);
        break;
      case 'status':
        getServerStatus(port);
        break;
      default:
        console.error(chalk.red(`Unknown action: ${action}`));
        console.log(chalk.yellow('Available actions: start, stop, restart, status'));
        process.exit(1);
    }
  });

// Generate command
program
  .command('generate')
  .description('Generate test templates')
  .argument('<type>', 'Test type: connect, tx, sign, error, security, aa')
  .option('-o, --out <file>', 'Output file path')
  .option('-w, --wallet <wallet>', 'Wallet provider to use')
  .option('-l, --lang <language>', 'Programming language (js, ts)', 'js')
  .option('-f, --fuzz', 'Enable security fuzzing')
  .option('--lint', 'Enable linting and formatting')
  .action((type, options) => {
    generateTest(type, options);
  });

// Run command
program
  .command('run')
  .description('Run tests against a target')
  .option('-t, --target-url <url>', 'Target URL to test')
  .option('-s, --security', 'Run security tests')
  .option('-w, --wallet <wallet>', 'Specify wallet provider')
  .option('-c, --chain <chain>', 'Specify blockchain network')
  .option('-m, --mock-mode', 'Use mock environment')
  .option('-r, --report', 'Generate report after tests')
  .option('-d, --dashboard', 'Create visual dashboard')
  .option('--aa', 'Test account abstraction')
  .option('--pimlico', 'Use Pimlico-compatible mode')
  .option('--test <test>', 'Specific test to run')
  .action((options) => {
    runTests(options);
  });

// Report command
program
  .command('report')
  .description('Generate security reports')
  .option('-f, --format <format>', 'Report format (html, md, json, sarif)', 'html')
  .option('-o, --output <directory>', 'Output directory', './reports')
  .option('-u, --upload', 'Upload to dashboard')
  .option('-n, --notify', 'Send notifications')
  .action((options) => {
    generateReport(options);
  });

// Parse arguments
program.parse();