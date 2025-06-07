#!/usr/bin/env node

/**
 * Audityzer CLI
 * 
 * Main entry point for the Audityzer security testing framework.
 * This CLI provides commands for testing Web3 applications and smart contracts.
 * 
 * @license MIT
 * @version 1.1.2
 */

import { program } from 'commander';
import { createRequire } from 'module';
import chalk from 'chalk';

// Create require function for importing JSON
const require = createRequire(import.meta.url);
const { version } = require('../package.json');

// Display banner
const displayBanner = () => {
  console.log(chalk.cyan(`
  █████╗ ██╗   ██╗██████╗ ██╗████████╗██╗   ██╗███████╗███████╗██████╗ 
 ██╔══██╗██║   ██║██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝╚══███╔╝██╔════╝██╔══██╗
 ███████║██║   ██║██║  ██║██║   ██║    ╚████╔╝   ███╔╝ █████╗  ██████╔╝
 ██╔══██║██║   ██║██║  ██║██║   ██║     ╚██╔╝   ███╔╝  ██╔══╝  ██╔══██╗
 ██║  ██║╚██████╔╝██████╔╝██║   ██║      ██║   ███████╗███████╗██║  ██║
 ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚═╝  ╚═╝
`));
  console.log(chalk.white(`  Web3 Security Testing Framework v${version}`));
  console.log(chalk.white(`  https://github.com/romanchaa997/audityzer`));
  console.log();
};

// Configure CLI
program
  .version(version)
  .description('Audityzer: Intelligent security testing framework for Web3 applications and smart contracts');

// Run command
program
  .command('run <target>')
  .description('Run security tests on a target')
  .option('-c, --config <file>', 'Config file path')
  .option('-r, --report', 'Generate a report after testing')
  .option('-f, --format <format>', 'Report format (html, md, json)', 'html')
  .option('-o, --output <dir>', 'Output directory for reports', 'reports')
  .option('-v, --verbose', 'Enable verbose output')
  .option('--aa', 'Enable Account Abstraction testing')
  .option('--pimlico', 'Use Pimlico for AA testing')
  .action((target, options) => {
    displayBanner();
    console.log(chalk.green(`Starting security tests on target: ${target}`));

    // Import the CLI module dynamically
    import('../src/cli/index.js')
      .then(module => {
        // Pass command to the CLI module
        module.default.run(target, options);
      })
      .catch(err => {
        console.error(chalk.red(`Error loading CLI module: ${err.message}`));
        process.exit(1);
      });
  });

// Scan command
program
  .command('scan <contract>')
  .description('Scan a smart contract for vulnerabilities')
  .option('-c, --config <file>', 'Config file path')
  .option('-r, --report', 'Generate a report after scanning')
  .option('-f, --format <format>', 'Report format (html, md, json)', 'html')
  .option('-o, --output <dir>', 'Output directory for reports', 'reports')
  .option('-v, --verbose', 'Enable verbose output')
  .option('--chain <chain>', 'Target blockchain (ethereum, polygon, etc.)', 'ethereum')
  .action((contract, options) => {
    displayBanner();
    console.log(chalk.green(`Starting contract scan on: ${contract}`));

    // Import the CLI module dynamically
    import('../src/cli/index.js')
      .then(module => {
        // Pass command to the CLI module
        module.default.scan(contract, options);
      })
      .catch(err => {
        console.error(chalk.red(`Error loading CLI module: ${err.message}`));
        process.exit(1);
      });
  });

// Init command
program
  .command('init [dir]')
  .description('Initialize a new Audityzer project')
  .option('-t, --template <template>', 'Project template to use', 'default')
  .option('--no-install', 'Skip dependency installation')
  .action((dir = '.', options) => {
    displayBanner();
    console.log(chalk.green(`Initializing new Audityzer project in: ${dir}`));

    // Import the CLI module dynamically
    import('../src/cli/index.js')
      .then(module => {
        // Pass command to the CLI module
        module.default.init(dir, options);
      })
      .catch(err => {
        console.error(chalk.red(`Error loading CLI module: ${err.message}`));
        process.exit(1);
      });
  });

// Generate command
program
  .command('generate <type> <name>')
  .alias('g')
  .description('Generate a new component (test, contract, report)')
  .option('-t, --template <template>', 'Template to use', 'default')
  .option('-o, --output <dir>', 'Output directory', '.')
  .action((type, name, options) => {
    displayBanner();
    console.log(chalk.green(`Generating new ${type}: ${name}`));

    // Import the CLI module dynamically
    import('../src/cli/index.js')
      .then(module => {
        // Pass command to the CLI module
        module.default.generate(type, name, options);
      })
      .catch(err => {
        console.error(chalk.red(`Error loading CLI module: ${err.message}`));
        process.exit(1);
      });
  });

// Server command group
const serverCommand = program
  .command('server')
  .description('Manage the development server');

// Server start subcommand
serverCommand
  .command('start')
  .description('Start the development server')
  .option('-p, --port <port>', 'Server port')
  .action((options) => {
    displayBanner();
    console.log(chalk.green('Starting development server...'));

    // Import the devforge module dynamically
    import('./devforge.js')
      .then(module => {
        // Call the start function
        if (typeof module.default === 'object' && module.default.start) {
          module.default.start(options);
        } else {
          console.log(chalk.yellow('Using legacy server start method'));
          // Fallback to direct script execution
          import('child_process').then(cp => {
            cp.spawn('node', ['./bin/devforge.js', 'start'], { stdio: 'inherit' });
          });
        }
      })
      .catch(err => {
        console.error(chalk.red(`Error starting server: ${err.message}`));
        process.exit(1);
      });
  });

// Server stop subcommand
serverCommand
  .command('stop')
  .description('Stop the development server')
  .action(() => {
    displayBanner();
    console.log(chalk.green('Stopping development server...'));

    // Import the devforge module dynamically
    import('./devforge.js')
      .then(module => {
        // Call the stop function
        if (typeof module.default === 'object' && module.default.stop) {
          module.default.stop();
        } else {
          console.log(chalk.yellow('Using legacy server stop method'));
          // Fallback to direct script execution
          import('child_process').then(cp => {
            cp.spawn('node', ['./bin/devforge.js', 'stop'], { stdio: 'inherit' });
          });
        }
      })
      .catch(err => {
        console.error(chalk.red(`Error stopping server: ${err.message}`));
        process.exit(1);
      });
  });

// Server restart subcommand
serverCommand
  .command('restart')
  .description('Restart the development server')
  .option('-p, --port <port>', 'Server port')
  .action((options) => {
    displayBanner();
    console.log(chalk.green('Restarting development server...'));

    // Import the devforge module dynamically
    import('./devforge.js')
      .then(module => {
        // Call the restart function
        if (typeof module.default === 'object' && module.default.restart) {
          module.default.restart(options);
        } else {
          console.log(chalk.yellow('Using legacy server restart method'));
          // Fallback to direct script execution
          import('child_process').then(cp => {
            cp.spawn('node', ['./bin/devforge.js', 'restart'], { stdio: 'inherit' });
          });
        }
      })
      .catch(err => {
        console.error(chalk.red(`Error restarting server: ${err.message}`));
        process.exit(1);
      });
  });

// Server status subcommand
serverCommand
  .command('status')
  .description('Check the status of the development server')
  .action(() => {
    displayBanner();
    console.log(chalk.green('Checking server status...'));

    // Import the devforge module dynamically
    import('./devforge.js')
      .then(module => {
        // Call the status function
        if (typeof module.default === 'object' && module.default.status) {
          module.default.status();
        } else {
          console.log(chalk.yellow('Using legacy server status method'));
          // Fallback to direct script execution
          import('child_process').then(cp => {
            cp.spawn('node', ['./bin/devforge.js', 'status'], { stdio: 'inherit' });
          });
        }
      })
      .catch(err => {
        console.error(chalk.red(`Error checking server status: ${err.message}`));
        process.exit(1);
      });
  });

// Parse args
program.parse(process.argv);

// Display help if no args
if (process.argv.length <= 2) {
  displayBanner();
  program.help();
}