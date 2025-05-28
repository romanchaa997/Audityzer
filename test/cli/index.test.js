/**
 * Unit tests for src/cli/index.js
 */

import { jest } from '@jest/globals';

// Mock dependencies
jest.mock('commander', () => ({
  program: {
    name: jest.fn().mockReturnThis(),
    description: jest.fn().mockReturnThis(),
    version: jest.fn().mockReturnThis(),
    command: jest.fn().mockReturnThis(),
    argument: jest.fn().mockReturnThis(),
    option: jest.fn().mockReturnThis(),
    action: jest.fn().mockReturnThis(),
    parse: jest.fn()
  }
}));

jest.mock('chalk', () => ({
  blue: jest.fn(text => text),
  green: jest.fn(text => text),
  yellow: jest.fn(text => text),
  red: jest.fn(text => text)
}));

jest.mock('fs-extra');

// Mock the core module
jest.mock('../../src/core', () => ({
  run: jest.fn(),
  version: '1.1.2'
}));

// Mock the AA test templates generator
jest.mock('../../src/cli/generateAATestTemplates', () => ({
  generateAATestTemplates: jest.fn(),
  generateAAReport: jest.fn()
}));

// Mock the AA visualization flow
jest.mock('../../templates/aa-tests/aa-visualization-flow', () => ({
  generateUserOpFlowDiagram: jest.fn()
}));

// Mock the AA benchmark comparison
jest.mock('../../templates/aa-tests/aa-benchmark-comparison', () => ({
  runAABenchmark: jest.fn()
}));

// Mock the AA dashboard report
jest.mock('../../templates/aa-tests/aa-dashboard-report', () => ({
  generateAADashboard: jest.fn()
}));

// Mock the AA CI reporter
jest.mock('../../templates/aa-tests/aa-ci-reporter', () => ({
  default: jest.fn()
}));

// Mock the Pimlico service
jest.mock('../../templates/aa-tests/aa-pimlico-service', () => ({
  default: jest.fn().mockImplementation(() => ({
    getUserOperationGasParams: jest.fn().mockResolvedValue({}),
    getEntryPointMetadata: jest.fn().mockResolvedValue({})
  }))
}));

describe('CLI Module', () => {
  let mockConsoleLog;
  let mockConsoleError;
  let mockConsoleWarn;
  let cli;

  beforeEach(() => {
    // Mock console methods
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
    mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation();

    // Reset mocks
    jest.clearAllMocks();

    // Reset process.argv
    process.argv = ['node', 'audityzer'];

    // Import the CLI module
    cli = require('../../src/cli/index.js');
  });

  afterEach(() => {
    // Restore console methods
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
    mockConsoleWarn.mockRestore();

    // Clear module cache to ensure fresh import
    jest.resetModules();
  });

  test('should detect AA mode from command line arguments', () => {
    // Set up process.argv with AA flag
    process.argv = ['node', 'audityzer', '--aa'];

    // Re-import the CLI module
    jest.resetModules();
    cli = require('../../src/cli/index.js');

    // Import the AA test templates generator
    const { generateAATestTemplates } = require('../../src/cli/generateAATestTemplates');

    // Verify AA mode was detected and templates were generated
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Account Abstraction Test Mode enabled'));
    expect(generateAATestTemplates).toHaveBeenCalled();
  });

  test('should detect Pimlico mode from command line arguments', () => {
    // Set up process.argv with Pimlico flag
    process.argv = ['node', 'audityzer', '--pimlico'];

    // Re-import the CLI module
    jest.resetModules();
    cli = require('../../src/cli/index.js');

    // Import the AA test templates generator
    const { generateAATestTemplates } = require('../../src/cli/generateAATestTemplates');

    // Verify AA mode was detected and templates were generated
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Account Abstraction Test Mode enabled'));
    expect(generateAATestTemplates).toHaveBeenCalled();
  });

  test('should handle addon option for AA tests', () => {
    // Set up process.argv with AA flag and addon
    process.argv = ['node', 'audityzer', '--aa', '--addon', 'social-recovery'];

    // Re-import the CLI module
    jest.resetModules();
    cli = require('../../src/cli/index.js');

    // Import the AA test templates generator
    const { generateAATestTemplates } = require('../../src/cli/generateAATestTemplates');

    // Verify AA mode was detected and templates were generated with addon
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Account Abstraction Test Mode enabled'));
    expect(generateAATestTemplates).toHaveBeenCalledWith({ addon: 'social-recovery' });
  });

  test('should set up the CLI program with all commands', () => {
    // Import commander
    const { program } = require('commander');

    // Verify program setup
    expect(program.name).toHaveBeenCalledWith('audityzer');
    expect(program.description).toHaveBeenCalledWith(expect.stringContaining('Cross-chain DeFi fuzzing toolkit'));
    expect(program.version).toHaveBeenCalled();

    // Verify commands were set up
    expect(program.command).toHaveBeenCalledWith('run');
    expect(program.command).toHaveBeenCalledWith('benchmark');
    expect(program.command).toHaveBeenCalledWith('submit');
    expect(program.command).toHaveBeenCalledWith('init');
    expect(program.command).toHaveBeenCalledWith('aa');
    expect(program.command).toHaveBeenCalledWith('visualize');
  });

  test('should run tests with correct options', async () => {
    // Get the runTests function
    const { runTests } = cli;

    // Mock audityzer.run
    const audityzer = require('../../src/core');

    // Call runTests with test parameters
    await runTests('test-target', {
      chain: 'ethereum',
      tests: ['wallet', 'defi'],
      wallet: 'metamask',
      mock: true
    });

    // Verify console output
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Running tests against test-target'));

    // Verify audityzer.run was called with correct parameters
    expect(audityzer.run).toHaveBeenCalledWith(expect.objectContaining({
      target: 'test-target',
      chain: 'ethereum',
      tests: ['wallet', 'defi'],
      wallet: 'metamask',
      mockMode: true
    }));
  });

  test('should handle AA mode in runTests', async () => {
    // Get the runTests function
    const { runTests } = cli;

    // Call runTests with AA option
    await runTests('test-target', {
      aa: true
    });

    // Verify AA-specific handling
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Running tests against test-target'));
  });

  test('should handle Pimlico connection in runTests', async () => {
    // Get the runTests function
    const { runTests } = cli;

    // Import the Pimlico service
    const PimlicoService = require('../../templates/aa-tests/aa-pimlico-service').default;

    // Call runTests with Pimlico connection option
    await runTests('test-target', {
      pimlicoConnect: true,
      pimlicoApiKey: 'test-api-key',
      chain: 'ethereum'
    });

    // Verify Pimlico service was initialized
    expect(PimlicoService).toHaveBeenCalledWith(expect.objectContaining({
      apiKey: 'test-api-key',
      chainId: '1',
      debug: true
    }));

    // Verify console output
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Connected to Pimlico API'));
  });
});