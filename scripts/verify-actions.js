#!/usr/bin/env node

/**
 * GitHub Actions Workflow Verification Script
 *
 * This script verifies GitHub Actions workflows against best practices
 * and reports any issues found. It's meant to be run as part of the
 * workflow development process or in CI environments.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const chalk = require('chalk');

const WORKFLOWS_DIR = path.join(process.cwd(), '.github', 'workflows');

// Best practices to check against
const bestPractices = {
  // Job-level checks
  jobLevel: {
    timeout: job => !!job['timeout-minutes'],
    runnerSpecified: job => !!job['runs-on'],
    maxSteps: (job, maxSteps = 20) => !job.steps || job.steps.length <= maxSteps,
  },

  // Step-level checks
  stepLevel: {
    hasName: step => !!step.name,
    usesActionPin: step =>
      !step.uses || /\@[a-f0-9]{40}$/.test(step.uses) || /\@v\d+$/.test(step.uses),
    conditionalContinueOnError: step => {
      const riskyCmds = ['bash', 'docker', 'npm', 'yarn', 'slither'];
      const isRiskyStep = step.run && riskyCmds.some(cmd => step.run.includes(cmd));
      return !isRiskyStep || step['continue-on-error'] === true;
    },
  },

  // Workflow-level checks
  workflowLevel: {
    hasName: wf => !!wf.name,
    hasConcurrency: wf => !!wf.concurrency,
    hasPermissions: wf => !!wf.permissions,
    triggersSpecified: wf => !!wf.on,
  },
};

/**
 * Main function to verify all workflows
 */
async function verifyWorkflows() {
  console.log(chalk.blue('=== GitHub Actions Workflow Verification ===\n'));

  try {
    // Check if workflows directory exists
    if (!fs.existsSync(WORKFLOWS_DIR)) {
      console.log(chalk.yellow('Workflows directory not found.'));
      return;
    }

    // Get all YAML files in the workflows directory
    const files = fs.readdirSync(WORKFLOWS_DIR);
    const yamlFiles = files.filter(file => file.endsWith('.yml') || file.endsWith('.yaml'));

    console.log(chalk.blue(`Found ${yamlFiles.length} workflow files to verify\n`));

    if (yamlFiles.length === 0) {
      console.log(chalk.yellow('No workflow files found.'));
      return;
    }

    let totalIssues = 0;

    // Process each workflow file
    for (const file of yamlFiles) {
      const filePath = path.join(WORKFLOWS_DIR, file);
      const issuesCount = verifyWorkflowFile(filePath);
      totalIssues += issuesCount;
    }

    // Print summary
    console.log(chalk.blue('\n=== Verification Summary ==='));
    if (totalIssues === 0) {
      console.log(chalk.green('✓ All workflows follow best practices'));
    } else {
      console.log(chalk.yellow(`! Found ${totalIssues} issues across all workflows`));
      console.log(chalk.yellow('  Run `npm run fix-actions` to automatically fix common issues'));
    }
  } catch (error) {
    console.error(chalk.red(`Error verifying workflows: ${error.message}`));
    process.exit(1);
  }
}

/**
 * Verify a single workflow file
 */
function verifyWorkflowFile(filePath) {
  const fileName = path.basename(filePath);
  console.log(chalk.magenta(`Verifying ${fileName}...`));

  try {
    // Read and parse the workflow file
    const content = fs.readFileSync(filePath, 'utf8');
    const workflow = yaml.parse(content);

    let issuesCount = 0;

    // Workflow-level checks
    for (const [checkName, checkFn] of Object.entries(bestPractices.workflowLevel)) {
      if (!checkFn(workflow)) {
        console.log(chalk.yellow(`  ! Workflow-level issue: ${formatCheckName(checkName)}`));
        issuesCount++;
      }
    }

    // Process each job
    if (workflow.jobs) {
      for (const [jobId, job] of Object.entries(workflow.jobs)) {
        // Job-level checks
        for (const [checkName, checkFn] of Object.entries(bestPractices.jobLevel)) {
          if (!checkFn(job)) {
            console.log(chalk.yellow(`  ! Job "${jobId}" issue: ${formatCheckName(checkName)}`));
            issuesCount++;
          }
        }

        // Step-level checks
        if (job.steps) {
          job.steps.forEach((step, index) => {
            for (const [checkName, checkFn] of Object.entries(bestPractices.stepLevel)) {
              if (!checkFn(step)) {
                const stepName = step.name || `Step #${index + 1}`;
                console.log(
                  chalk.yellow(`  ! Step "${stepName}" issue: ${formatCheckName(checkName)}`)
                );
                issuesCount++;
              }
            }
          });
        }
      }
    }

    // Security scan-specific checks
    if (fileName === 'security-scan.yml') {
      const securityIssues = checkSecurityScanWorkflow(workflow);
      securityIssues.forEach(issue => {
        console.log(chalk.yellow(`  ! Security scan issue: ${issue}`));
        issuesCount++;
      });
    }

    // Report result for this file
    if (issuesCount === 0) {
      console.log(chalk.green(`  ✓ ${fileName} follows all best practices`));
    } else {
      console.log(chalk.yellow(`  ! ${fileName} has ${issuesCount} issues`));
    }

    return issuesCount;
  } catch (error) {
    console.error(chalk.red(`  Error verifying ${fileName}: ${error.message}`));
    return 1;
  }
}

/**
 * Special checks for security scan workflows
 */
function checkSecurityScanWorkflow(workflow) {
  const issues = [];

  // Check jobs
  if (workflow.jobs) {
    const securityJob = workflow.jobs['security-scan'];

    if (securityJob) {
      // Check for proper artifact saving
      const hasArtifactUpload =
        securityJob.steps &&
        securityJob.steps.some(step => step.uses && step.uses.includes('actions/upload-artifact'));

      if (!hasArtifactUpload) {
        issues.push('Missing artifact upload step');
      }

      // Check for proper error handling in scan step
      const scanStep =
        securityJob.steps &&
        securityJob.steps.find(step => step.name && step.name.toLowerCase().includes('scan'));

      if (scanStep) {
        if (!scanStep['continue-on-error']) {
          issues.push('Scan step should have continue-on-error set to true');
        }

        if (scanStep.run && !scanStep.run.includes('||') && !scanStep.run.includes('trap')) {
          issues.push('Scan step should include error handling in the script');
        }
      }
    } else {
      issues.push('No security-scan job found in security workflow');
    }
  }

  return issues;
}

/**
 * Format check name for display
 */
function formatCheckName(checkName) {
  return checkName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/([A-Z])\s/g, match => match.toLowerCase());
}

// Run verification
verifyWorkflows().catch(error => {
  console.error(chalk.red(`Unhandled error: ${error.message}`));
  process.exit(1);
});
