/**
 * Demo Script Generator
 * 
 * Creates a visual demo of Audityzer functionality
 */

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

// ASCII art logo
const logo = `
   _____            ___ __                    
  /  _  \__ __  __/  //_/_ __  _____ _______ 
 / /_/ / / / / / / ,<  / // / / ___// __/ -_)
/_____//_/ /_/ /_/|_| /\_, / /_/   /_/  \__/ 
                      /___/                   
`;

// Demo steps
const demoSteps = [
  {
    title: 'Initialize Audityzer',
    command: 'npx audityzer init --template security',
    description: 'Setting up Audityzer with security configuration'
  },
  {
    title: 'Run Security Tests',
    command: 'npx audityzer test https://example-defi-app.com --security',
    description: 'Testing a DeFi application for security vulnerabilities'
  },
  {
    title: 'Generate AI Test',
    command: 'npx audityzer ask "Create a test that checks for reentrancy vulnerabilities in a swap function"',
    description: 'Using AI to generate a specialized security test'
  },
  {
    title: 'Analyze Smart Contract',
    command: 'npx audityzer analyze ./examples/contracts/vulnerable-contract.sol',
    description: 'Analyzing a smart contract for security issues'
  }
];

// Function to simulate typing
async function simulateTyping(text, speed = 50) {
  for (const char of text) {
    process.stdout.write(char);
    await new Promise(resolve => setTimeout(resolve, speed));
  }
  process.stdout.write('\n');
}

// Function to simulate command execution
async function simulateCommand(command, description) {
  console.log(chalk.gray('\n$ ') + chalk.white(command));
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate output based on the command
  if (command.includes('init')) {
    console.log(chalk.blue('Initializing Audityzer configuration...'));
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(chalk.green('✅ Configuration initialized at: ./.audityzer/config.json'));
    console.log(chalk.green('✅ Example test created at: ./examples/security-bug-tests/example-test.js'));
  }
  else if (command.includes('test')) {
    console.log(chalk.blue(`🚀 Testing https://example-defi-app.com with metamask wallet...`));
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Fuzzing wallet connection for https://example-defi-app.com...');
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Fuzzing transaction flow for https://example-defi-app.com...');
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Fuzzing signature requests for https://example-defi-app.com...');
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Running security checks...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(chalk.yellow('Contract Risk Score: 7.2 (High)'));
    console.log(chalk.green(`✅ Testing complete! Report saved to ./audityzer-reports`));
    console.log(chalk.blue(`📊 Risk dashboard available at ./audityzer-reports/risk-dashboard.html`));
  }
  else if (command.includes('ask')) {
    console.log(chalk.blue(`🧠 Generating test based on prompt: "Create a test that checks for reentrancy vulnerabilities in a swap function"...`));
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(chalk.green(`✅ Test generated successfully!`));
    console.log(chalk.green(`📝 Saved to: examples/security-bug-tests/reentrancy-vulnerabilities-swap-function-2023-05-15T12-34-56.test.js`));
  }
  else if (command.includes('analyze')) {
    console.log(chalk.blue(`🔍 Analyzing smart contract: ./examples/contracts/vulnerable-contract.sol...`));
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(chalk.green(`✅ Analysis complete!`));
    console.log(chalk.green(`📝 Report saved to: reports/analysis/vulnerable-contract-analysis-2023-05-15T12-34-56.md`));
    console.log(chalk.yellow(`\nVulnerabilities found: 3`));
    console.log(chalk.red(`  Critical: 1`));
    console.log(chalk.yellow(`  Medium: 2`));
    console.log(chalk.yellow('\nTop issues:'));
    console.log(chalk.yellow(`  1. Reentrancy Vulnerability (Critical)`));
    console.log(chalk.yellow(`  2. Unchecked Return Value (Medium)`));
    console.log(chalk.yellow(`  3. Front-Running Vulnerability (Medium)`));
  }
}

// Main demo function
async function runDemo() {
  // Clear the console
  console.clear();

  // Display logo
  console.log(chalk.cyan(logo));
  console.log(chalk.white('Intelligent security testing framework for Web3 applications'));
  console.log(chalk.white('Version 1.1.2\n'));

  // Display demo intro
  console.log(chalk.yellow('=== DEMO MODE ==='));
  console.log(chalk.white('This demo shows the main features of Audityzer\n'));

  // Run through demo steps
  for (const [index, step] of demoSteps.entries()) {
    console.log(chalk.cyan(`\n[${index + 1}/${demoSteps.length}] ${step.title}`));
    console.log(chalk.gray(step.description));
    await new Promise(resolve => setTimeout(resolve, 1000));
    await simulateCommand(step.command);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Display demo conclusion
  console.log(chalk.green('\n✨ Demo completed!'));
  console.log(chalk.white('\nTo get started with Audityzer, run:'));
  console.log(chalk.cyan('  npx audityzer init'));
  console.log(chalk.white('\nFor more information, visit:'));
  console.log(chalk.cyan('  https://github.com/romanchaa997/audityzer'));
}

// Run the demo
runDemo().catch(error => {
  console.error(chalk.red(`Error running demo: ${error.message}`));
  process.exit(1);
});