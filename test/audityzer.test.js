/**
 * Unit tests for audityzer.js CLI
 */

import { jest } from '@jest/globals';
import { program } from 'commander';
import chalk from 'chalk';

// Mock modules
jest.mock('commander');
jest.mock('chalk');

// Mock dynamic imports
jest.mock('../src/cli/index.js', () => ({
  default: {
    run: jest.fn(),
    scan: jest.fn(),
    init: jest.fn(),
    generate: jest.fn()
  }
}), { virtual: true });

describe('audityzer CLI', () => {
  let originalConsoleLog;
  let mockConsoleLog;
  let mockCliModule;

  beforeEach(() => {
    // Mock console.log
    originalConsoleLog = console.log;
    mockConsoleLog = jest.fn();
    console.log = mockConsoleLog;

    // Mock chalk methods
    chalk.cyan.mockReturnValue('cyan text');
    chalk.green.mockReturnValue('green text');
    chalk.white.mockReturnValue('white text');
    chalk.red.mockReturnValue('red text');

    // Mock commander methods
    program.version.mockReturnValue(program);
    program.description.mockReturnValue(program);
    program.command.mockReturnValue(program);
    program.alias.mockReturnValue(program);
    program.option.mockReturnValue(program);
    program.action.mockImplementation(callback => {
      // Store the callback for later execution
      program.actionCallback = callback;
      return program;
    });
    program.parse.mockReturnValue(program);
    program.help.mockReturnValue(program);

    // Reset mocks
    jest.clearAllMocks();

    // Import the CLI module
    mockCliModule = require('../src/cli/index.js').default;
  });

  afterEach(() => {
    // Restore console.log
    console.log = originalConsoleLog;
  });

  test('should display banner', () => {
    // Import the script to trigger the banner display
    require('../bin/audityzer.js');

    // Verify banner was displayed
    expect(chalk.cyan).toHaveBeenCalled();
    expect(mockConsoleLog).toHaveBeenCalledWith('cyan text');
  });

  test('should configure run command correctly', () => {
    // Import the script
    require('../bin/audityzer.js');

    // Verify command was configured
    expect(program.command).toHaveBeenCalledWith('run <target>');
    expect(program.description).toHaveBeenCalledWith('Run security tests on a target');
    expect(program.option).toHaveBeenCalledWith('-c, --config <file>', 'Config file path');
    expect(program.option).toHaveBeenCalledWith('-r, --report', 'Generate a report after testing');
  });

  test('should execute run command with correct parameters', async () => {
    // Import the script
    require('../bin/audityzer.js');

    // Find the run command action callback
    const runCommand = program.command.mock.calls.find(call => call[0] === 'run <target>');
    expect(runCommand).toBeTruthy();

    // Execute the action callback with test parameters
    const target = 'test-target';
    const options = { report: true, format: 'html' };

    // Get the action callback and execute it
    await program.actionCallback(target, options);

    // Verify CLI module was called correctly
    expect(mockCliModule.run).toHaveBeenCalledWith(target, options);
  });

  test('should execute scan command with correct parameters', async () => {
    // Import the script
    require('../bin/audityzer.js');

    // Find the scan command action callback
    const scanCommand = program.command.mock.calls.find(call => call[0] === 'scan <contract>');
    expect(scanCommand).toBeTruthy();

    // Execute the action callback with test parameters
    const contract = 'test-contract';
    const options = { chain: 'ethereum', verbose: true };

    // Get the action callback and execute it
    await program.actionCallback(contract, options);

    // Verify CLI module was called correctly
    expect(mockCliModule.scan).toHaveBeenCalledWith(contract, options);
  });

  test('should execute init command with correct parameters', async () => {
    // Import the script
    require('../bin/audityzer.js');

    // Find the init command action callback
    const initCommand = program.command.mock.calls.find(call => call[0] === 'init [dir]');
    expect(initCommand).toBeTruthy();

    // Execute the action callback with test parameters
    const dir = 'test-dir';
    const options = { template: 'custom', install: false };

    // Get the action callback and execute it
    await program.actionCallback(dir, options);

    // Verify CLI module was called correctly
    expect(mockCliModule.init).toHaveBeenCalledWith(dir, options);
  });

  test('should execute generate command with correct parameters', async () => {
    // Import the script
    require('../bin/audityzer.js');

    // Find the generate command action callback
    const generateCommand = program.command.mock.calls.find(call => call[0] === 'generate <type> <n>');
    expect(generateCommand).toBeTruthy();

    // Execute the action callback with test parameters
    const type = 'test';
    const name = 'test-name';
    const options = { template: 'default', output: 'tests' };

    // Get the action callback and execute it
    await program.actionCallback(type, name, options);

    // Verify CLI module was called correctly
    expect(mockCliModule.generate).toHaveBeenCalledWith(type, name, options);
  });
});