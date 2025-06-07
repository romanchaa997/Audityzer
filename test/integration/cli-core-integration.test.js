/**
 * Integration tests for CLI and Core module integration
 * 
 * Tests the interaction between the CLI commands and the Core module functionality.
 */

import { jest } from '@jest/globals';
import { program } from 'commander';
import { initCore } from '../../src/core/index.js';

// Mock commander
jest.mock('commander', () => ({
  program: {
    name: jest.fn().mockReturnThis(),
    description: jest.fn().mockReturnThis(),
    version: jest.fn().mockReturnThis(),
    command: jest.fn().mockReturnThis(),
    argument: jest.fn().mockReturnThis(),
    option: jest.fn().mockReturnThis(),
    action: jest.fn(callback => {
      // Store the callback for testing
      program.actionCallback = callback;
      return program;
    }),
    parse: jest.fn(),
    actionCallback: null
  }
}));

// Mock child_process for test runner
jest.mock('child_process', () => ({
  spawn: jest.fn(() => ({
    on: jest.fn((event, callback) => {
      // Store the callback for testing
      if (event === 'close') {
        spawnCallbacks.close = callback;
      }
    }),
    stdout: { on: jest.fn() },
    stderr: { on: jest.fn() }
  }))
}));

// Store spawn callbacks for testing
const spawnCallbacks = {
  close: null
};

describe('CLI and Core Integration', () => {
  let mockConsoleLog;
  let core;
  let cli;

  beforeEach(() => {
    // Mock console.log
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

    // Initialize the core module
    core = initCore();

    // Reset mocks
    jest.clearAllMocks();

    // Reset callbacks
    spawnCallbacks.close = null;

    // Import the CLI module
    cli = require('../../src/cli/index.js');
  });

  afterEach(() => {
    // Restore console.log
    mockConsoleLog.mockRestore();

    // Clear module cache
    jest.resetModules();
  });

  test('should execute run command and use core module to run tests', async () => {
    // Get the runTests function from CLI
    const cliRunTests = cli.runTests;

    // Mock the core runTests function
    const originalRunTests = core.runTests;
    core.runTests = jest.fn();

    // Call the CLI runTests function
    await cliRunTests('test-target', {
      chain: 'ethereum',
      tests: ['wallet', 'defi'],
      wallet: 'metamask',
      mock: true
    });

    // Verify core.runTests was called with correct parameters
    expect(core.runTests).toHaveBeenCalledWith(expect.objectContaining({
      targetUrl: expect.any(String),
      mockMode: true,
      wallet: 'metamask',
      chain: 'ethereum'
    }));

    // Restore original function
    core.runTests = originalRunTests;
  });

  test('should handle successful test completion and report generation', async () => {
    // Get the runTests function from CLI
    const cliRunTests = cli.runTests;

    // Mock the report generator
    const reportGenerator = require('../../src/reporting/report-generator.js');
    reportGenerator.generateReport = jest.fn();

    // Call the CLI runTests function with report option
    await cliRunTests('test-target', {
      report: true
    });

    // Simulate successful test completion
    if (spawnCallbacks.close) {
      spawnCallbacks.close(0);
    }

    // Verify report generation was called
    expect(reportGenerator.generateReport).toHaveBeenCalled();

    // Verify success message
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Tests completed successfully'));
  });

  test('should handle test failures', async () => {
    // Get the runTests function from CLI
    const cliRunTests = cli.runTests;

    // Mock console.error
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

    // Call the CLI runTests function
    await cliRunTests('test-target', {});

    // Simulate test failure
    if (spawnCallbacks.close) {
      spawnCallbacks.close(1);
    }

    // Verify error message
    expect(mockConsoleError).toHaveBeenCalledWith(expect.stringContaining('Tests failed with code 1'));

    // Restore console.error
    mockConsoleError.mockRestore();
  });
});