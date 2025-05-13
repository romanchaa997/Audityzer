#!/usr/bin/env node

/**
 * Bounty Integration CLI
 *
 * Command-line interface for the bounty integration module.
 * Allows easy interaction with different bug bounty platforms.
 */

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// Import bounty platform integrations
const {
  ImmunefiSubmissionGenerator,
  Code4renaIntegration,
  SherlockReportFormatter,
  BridgeBountyAdapter,
  HackenProofSubmission,
  UnifiedBountyDashboard,
  AutoSubmissionService,
  VulnerabilityTemplates,
} = require('./index');

const program = new Command();

program
  .name('bounty-integration')
  .description('Bug bounty platform integration for Web3 security test kit')
  .version('1.0.0');

// Common options
const addCommonOptions = command => {
  return command
    .option(
      '-i, --input <path>',
      'Path to security report file',
      './test-results/security/report.json'
    )
    .option('-o, --output <dir>', 'Output directory for generated files')
    .option('-v, --verbose', 'Enable verbose output', false);
};

// Immunefi command
program
  .command('immunefi')
  .description('Generate reports for Immunefi bug bounty platform')
  .option('-p, --program <id>', 'Immunefi program ID')
  .option('-a, --api-key <key>', 'Immunefi API key (or use IMMUNEFI_API_KEY env var)')
  .option('--submit', 'Submit reports to Immunefi (requires API key and program ID)', false)
  .action(async options => {
    try {
      const outputDir = options.output || './test-results/bounty-submissions/immunefi';
      console.log(chalk.blue(`Generating Immunefi submissions from ${options.input}...`));

      const generator = new ImmunefiSubmissionGenerator(outputDir);
      const files = await generator.run(options.input);

      console.log(chalk.green(`Generated ${files.length} Immunefi submissions in ${outputDir}`));

      if (options.submit && files.length > 0) {
        if (!options.programId && !options.program) {
          console.error(
            chalk.red('Error: Program ID is required for submission. Use --program option.')
          );
          process.exit(1);
        }

        const apiKey = options.apiKey || process.env.IMMUNEFI_API_KEY;
        if (!apiKey) {
          console.error(
            chalk.red(
              'Error: API key is required for submission. Use --api-key option or set IMMUNEFI_API_KEY env var.'
            )
          );
          process.exit(1);
        }

        console.log(chalk.blue('Submitting reports to Immunefi...'));
        const programId = options.program || options.programId;

        let successCount = 0;
        for (const file of files) {
          try {
            const result = await generator.submitToApi(programId, file, apiKey);
            if (result.success) {
              console.log(
                chalk.green(`Submitted ${path.basename(file)}: Report ID ${result.reportId}`)
              );
              successCount++;
            } else {
              console.error(chalk.red(`Failed to submit ${path.basename(file)}: ${result.error}`));
            }
          } catch (error) {
            console.error(chalk.red(`Error submitting ${path.basename(file)}: ${error.message}`));
          }
        }

        console.log(chalk.blue(`Submitted ${successCount} of ${files.length} reports to Immunefi`));
      }
    } catch (error) {
      console.error(chalk.red(`Error generating Immunefi submissions: ${error.message}`));
      process.exit(1);
    }
  });

// HackenProof command
program
  .command('hackenproof')
  .description('Generate reports for HackenProof bug bounty platform')
  .option('-p, --program <id>', 'HackenProof program ID')
  .option('-a, --api-key <key>', 'HackenProof API key (or use HACKENPROOF_API_KEY env var)')
  .option('--submit', 'Submit reports to HackenProof (requires API key and program ID)', false)
  .option('--batch', 'Submit reports in batch mode', false)
  .action(async options => {
    try {
      const outputDir = options.output || './test-results/bounty-submissions/hackenproof';
      console.log(chalk.blue(`Generating HackenProof submissions from ${options.input}...`));

      const generator = new HackenProofSubmission(outputDir);
      const files = await generator.run(options.input);

      console.log(chalk.green(`Generated ${files.length} HackenProof submissions in ${outputDir}`));

      if (options.submit && files.length > 0) {
        if (!options.programId && !options.program) {
          console.error(
            chalk.red('Error: Program ID is required for submission. Use --program option.')
          );
          process.exit(1);
        }

        const apiKey = options.apiKey || process.env.HACKENPROOF_API_KEY;
        if (!apiKey) {
          console.error(
            chalk.red(
              'Error: API key is required for submission. Use --api-key option or set HACKENPROOF_API_KEY env var.'
            )
          );
          process.exit(1);
        }

        console.log(chalk.blue('Submitting reports to HackenProof...'));
        const programId = options.program || options.programId;

        if (options.batch) {
          const batchResult = await generator.batchSubmit(programId, files);
          console.log(
            chalk.blue(
              `Batch submission complete: ${batchResult.success} successful, ${batchResult.failed} failed`
            )
          );
        } else {
          let successCount = 0;
          for (const file of files) {
            try {
              const result = await generator.submitToApi(programId, file);
              if (result.success) {
                console.log(
                  chalk.green(`Submitted ${path.basename(file)}: Report ID ${result.reportId}`)
                );
                successCount++;
              } else {
                console.error(
                  chalk.red(`Failed to submit ${path.basename(file)}: ${result.error}`)
                );
              }
            } catch (error) {
              console.error(chalk.red(`Error submitting ${path.basename(file)}: ${error.message}`));
            }
          }

          console.log(
            chalk.blue(`Submitted ${successCount} of ${files.length} reports to HackenProof`)
          );
        }
      }
    } catch (error) {
      console.error(chalk.red(`Error generating HackenProof submissions: ${error.message}`));
      process.exit(1);
    }
  });

// Code4rena command
program
  .command('code4rena')
  .description('Generate reports for Code4rena contests')
  .option('-c, --contest <id>', 'Code4rena contest ID', 'web3-security-test-kit')
  .option('-a, --api-key <key>', 'Code4rena API key (or use CODE4RENA_API_KEY env var)')
  .option('--submit', 'Submit reports to Code4rena (requires API key and contest ID)', false)
  .action(async options => {
    try {
      const outputDir = options.output || './test-results/c4-submissions';
      console.log(chalk.blue(`Generating Code4rena submissions for contest ${options.contest}...`));

      const integration = new Code4renaIntegration(options.contest, outputDir);
      const files = await integration.run(options.input, options.contest);

      console.log(chalk.green(`Generated Code4rena submissions in ${outputDir}`));

      if (options.submit) {
        const apiKey = options.apiKey || process.env.CODE4RENA_API_KEY;
        if (!apiKey) {
          console.error(
            chalk.red(
              'Error: API key is required for submission. Use --api-key option or set CODE4RENA_API_KEY env var.'
            )
          );
          process.exit(1);
        }

        console.log(chalk.blue('Submitting reports to Code4rena...'));
        // Implementation for Code4rena submission would go here
        console.log(
          chalk.yellow('Note: Direct Code4rena API submission is not currently available.')
        );
      }
    } catch (error) {
      console.error(chalk.red(`Error generating Code4rena submissions: ${error.message}`));
      process.exit(1);
    }
  });

// Sherlock command
program
  .command('sherlock')
  .description('Generate reports for Sherlock audits')
  .option('-c, --contest <name>', 'Sherlock contest name', 'web3-security-test-kit')
  .option('-j, --judging', 'Use Sherlock judging format', false)
  .option('-a, --api-key <key>', 'Sherlock API key (or use SHERLOCK_API_KEY env var)')
  .option('--submit', 'Submit reports to Sherlock (requires API key and contest name)', false)
  .action(async options => {
    try {
      const outputDir = options.output || './test-results/sherlock-submissions';
      console.log(chalk.blue(`Generating Sherlock audit report for ${options.contest}...`));

      const formatter = new SherlockReportFormatter(options.contest, outputDir, options.judging);

      const files = await formatter.run(options.input, options.contest);

      console.log(chalk.green(`Generated Sherlock audit report in ${outputDir}`));

      if (options.submit) {
        const apiKey = options.apiKey || process.env.SHERLOCK_API_KEY;
        if (!apiKey) {
          console.error(
            chalk.red(
              'Error: API key is required for submission. Use --api-key option or set SHERLOCK_API_KEY env var.'
            )
          );
          process.exit(1);
        }

        console.log(chalk.blue('Submitting reports to Sherlock...'));
        // Implementation for Sherlock submission would go here
        console.log(
          chalk.yellow('Note: Direct Sherlock API submission is not currently available.')
        );
      }
    } catch (error) {
      console.error(chalk.red(`Error generating Sherlock audit report: ${error.message}`));
      process.exit(1);
    }
  });

// Bridge test templates command
program
  .command('bridge')
  .description('Generate bridge vulnerability reports and test templates')
  .option('--fetch-code4rena', 'Fetch reports from Code4rena', false)
  .option('--fetch-sherlock', 'Fetch reports from Sherlock', false)
  .option('--limit <number>', 'Number of reports to fetch', '10')
  .action(async options => {
    try {
      const outputDir = options.output || './web3fuzzforge-community-tests/dapp-tests';
      console.log(chalk.blue('Generating bridge vulnerability reports...'));

      const adapter = new BridgeBountyAdapter(outputDir);

      if (options.fetchCode4rena) {
        console.log(chalk.blue(`Fetching up to ${options.limit} reports from Code4rena...`));
        await adapter.fetchCode4renaReports(parseInt(options.limit));
      }

      if (options.fetchSherlock) {
        console.log(chalk.blue(`Fetching up to ${options.limit} reports from Sherlock...`));
        await adapter.fetchSherlockReports(parseInt(options.limit));
      }

      const templates = await adapter.generateTestTemplates();
      const files = await adapter.saveTestTemplates();

      console.log(
        chalk.green(`Generated ${templates.length} bridge test templates in ${outputDir}`)
      );
    } catch (error) {
      console.error(chalk.red(`Error generating bridge vulnerability reports: ${error.message}`));
      process.exit(1);
    }
  });

// Dashboard command
program
  .command('dashboard')
  .description('Start the unified bounty submission dashboard')
  .option('-p, --port <port>', 'Dashboard server port', '3030')
  .option('-d, --data-dir <path>', 'Data directory', './data/bounty-dashboard')
  .option('-k, --api-keys <path>', 'Path to API keys JSON file')
  .action(async options => {
    try {
      console.log(chalk.blue.bold('Starting unified bounty dashboard'));

      // Load API keys if provided
      let apiKeys = {};
      if (options.apiKeys && fs.existsSync(options.apiKeys)) {
        try {
          apiKeys = JSON.parse(fs.readFileSync(options.apiKeys, 'utf8'));
        } catch (error) {
          console.warn(chalk.yellow(`Error loading API keys: ${error.message}`));
        }
      }

      // Create and start dashboard
      const dashboard = new UnifiedBountyDashboard({
        dataDir: options.dataDir,
        port: parseInt(options.port, 10),
        apiKeys,
      });

      const serverInfo = await dashboard.start();

      console.log(chalk.green(`Dashboard running at ${serverInfo.url}`));
      console.log('Press Ctrl+C to stop the dashboard');

      // Keep process running
      process.on('SIGINT', async () => {
        console.log(chalk.yellow('\nStopping dashboard...'));
        await dashboard.stop();
        process.exit(0);
      });
    } catch (error) {
      console.error(chalk.red('Error starting bounty dashboard:'), error);
      process.exit(1);
    }
  });

// Auto-submission command
program
  .command('auto-submit')
  .description('Automatically submit vulnerabilities to multiple bug bounty platforms')
  .option('-i, --input <path>', 'Path to security report file', './reports/security-report.json')
  .option('-c, --config <path>', 'Path to submission configuration file')
  .option(
    '-p, --platforms <list>',
    'Platforms to submit to (comma-separated)',
    'immunefi,hackenproof'
  )
  .option('-d, --dry-run', 'Generate submissions without actually submitting', false)
  .option(
    '-o, --output-dir <path>',
    'Output directory for generated files',
    './data/auto-submission'
  )
  .action(async options => {
    try {
      // Parse platforms list
      const platforms = options.platforms.split(',').map(p => p.trim());

      console.log(chalk.blue(`Auto-submitting to platforms: ${platforms.join(', ')}`));

      // Load config file if provided
      let config = {};
      if (options.config && fs.existsSync(options.config)) {
        config = JSON.parse(fs.readFileSync(options.config, 'utf8'));
      }

      // Merge config with options
      const apiKeys = config.apiKeys || {};

      // Get platform-specific options
      const platformOptions = {
        immunefiProgramId: config.immunefi?.programId,
        hackenproofProgramId: config.hackenproof?.programId,
        contestId: config.code4rena?.contestId,
        contestName: config.sherlock?.contestName,
      };

      // Create auto-submission service
      const service = new AutoSubmissionService(platforms, {
        dataDir: options.outputDir,
        dryRun: options.dryRun,
        apiKeys,
        ...platformOptions,
      });

      // Submit to all platforms
      const results = await service.submitToAllPlatforms(options.input);

      console.log(
        chalk.green(
          `Submission complete. Generated ${results.totalSubmissions} submissions across ${platforms.length} platforms.`
        )
      );
      console.log(
        `${results.successfulSubmissions} successful, ${results.failedSubmissions} failed.`
      );

      if (options.dryRun) {
        console.log(chalk.yellow('DRY RUN MODE - No actual submissions were made'));
      }

      // Output results summary for each platform
      for (const [platform, platformResults] of Object.entries(results.platforms)) {
        if (platformResults.error) {
          console.error(chalk.red(`Error with ${platform}: ${platformResults.error}`));
          continue;
        }

        console.log(
          chalk.blue(
            `${platform}: ${platformResults.success} successful, ${platformResults.failed} failed`
          )
        );
      }
    } catch (error) {
      console.error(chalk.red(`Error in auto-submission: ${error.message}`));
      process.exit(1);
    }
  });

// Vulnerability templates command
program
  .command('templates')
  .description('View and use predefined vulnerability templates')
  .option('-c, --category <category>', 'Vulnerability category', 'all')
  .option('-l, --list', 'List available templates', false)
  .option('-o, --output <path>', 'Save templates to file')
  .action(options => {
    try {
      const templates = VulnerabilityTemplates.getTemplates(options.category);

      if (options.list) {
        console.log(chalk.blue.bold(`Available ${options.category} vulnerability templates:`));

        Object.entries(templates).forEach(([id, template]) => {
          console.log(`${chalk.green(id)}: ${template.title} (${chalk.yellow(template.severity)})`);
        });

        console.log(`\nTotal: ${Object.keys(templates).length} templates`);
      } else if (options.output) {
        fs.ensureDirSync(path.dirname(options.output));
        fs.writeFileSync(options.output, JSON.stringify(templates, null, 2));

        console.log(chalk.green(`Templates saved to ${options.output}`));
      } else {
        console.log(JSON.stringify(templates, null, 2));
      }
    } catch (error) {
      console.error(chalk.red('Error accessing vulnerability templates:'), error);
      process.exit(1);
    }
  });

// Add common options to all commands
program.commands.forEach(command => {
  addCommonOptions(command);
});

// Parse command line arguments
program.parse(process.argv);

// Show help if no arguments provided
if (process.argv.length <= 2) {
  program.help();
}
