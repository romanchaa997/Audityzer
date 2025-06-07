/**
 * Unit tests for src/core/test-runner.js
 */

import { jest } from '@jest/globals';
import { spawn } from 'child_process';
import chalk from 'chalk';
import { runTests } from '../../src/core/test-runner.js';

// Mock modules
jest.mock('child_process');
jest.mock('chalk', () => ({
  blue: jest.fn(text => text),
  green: jest.fn(text => text),
  red: jest.fn(text => text)
}));

// Mock the report generator
jest.mock('../../src/reporting/report-generator.js', () => ({
  generateReport: jest.fn()
}));

describe('Test Runner Module', () => {
  let mockConsoleLog;
  let mockConsoleError;
  let mockSpawnProcess;

  beforeEach(() => {
    // Mock console methods
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

    // Create a mock spawn process
    mockSpawnProcess = {
      on: jest.fn()
    };

    // Mock spawn to return our mock process
    spawn.mockReturnValue(mockSpawnProcess);

    // Reset mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore console methods
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
  });

  test('should run tests with default options', () => {
    // Run tests with minimal options
    runTests({
      targetUrl: 'http://example.com'
    });

    // Verify console output
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Starting test run'));
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Target URL: http://example.com'));

    // Verify spawn was called with correct arguments
    expect(spawn).toHaveBeenCalledWith(
      'npx',
      ['playwright', 'test', 'playwright-tests/'],
      expect.objectContaining({
        env: expect.objectContaining({
          TARGET_URL: 'http://example.com',
          MOCK_MODE: 'false',
          WALLET_PROVIDER: 'metamask',
          CHAIN_NETWORK: 'ethereum',
          ENABLE_AA: 'false',
          USE_PIMLICO: 'false'
        })
      })
    );
  });

  test('should run security tests when security option is true', () => {
    runTests({
      targetUrl: 'http://example.com',
      security: true
    });

    // Verify spawn was called with security tests path
    expect(spawn).toHaveBeenCalledWith(
      'npx',
      ['playwright', 'test', 'examples/security-bug-tests/'],
      expect.any(Object)
    );
  });

  test('should run account abstraction tests when aa option is true', () => {
    runTests({
      targetUrl: 'http://example.com',
      aa: true
    });

    // Verify spawn was called with AA tests path
    expect(spawn).toHaveBeenCalledWith(
      'npx',
      ['playwright', 'test', 'examples/security-bug-tests/aa-*.test.js'],
      expect.objectContaining({
        env: expect.objectContaining({
          ENABLE_AA: 'true'
        })
      })
    );
  });

  test('should run a specific test when test option is provided', () => {
    runTests({
      targetUrl: 'http://example.com',
      test: 'specific-test.js'
    });

    // Verify spawn was called with specific test path
    expect(spawn).toHaveBeenCalledWith(
      'npx',
      ['playwright', 'test', 'specific-test.js'],
      expect.any(Object)
    );
  });

  test('should generate a report when tests complete successfully and report option is true', () => {
    // Import the report generator
    const { generateReport } = require('../../src/reporting/report-generator.js');

    // Run tests with report option
    runTests({
      targetUrl: 'http://example.com',
      report: true
    });

    // Get the close event callback
    const closeCallback = mockSpawnProcess.on.mock.calls.find(call => call[0] === 'close')[1];

    // Simulate successful test completion
    closeCallback(0);

    // Verify report generation
    expect(generateReport).toHaveBeenCalledWith({
      format: 'html',
      output: './reports',
      upload: undefined,
      notify: false
    });

    // Verify success message
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Tests completed successfully'));
  });

  test('should handle test failure', () => {
    runTests({
      targetUrl: 'http://example.com'
    });

    // Get the close event callback
    const closeCallback = mockSpawnProcess.on.mock.calls.find(call => call[0] === 'close')[1];

    // Simulate test failure
    closeCallback(1);

    // Verify error message
    expect(mockConsoleError).toHaveBeenCalledWith(expect.stringContaining('Tests failed with code 1'));
  });

  test('should handle errors during test execution', () => {
    // Mock spawn to throw an error
    spawn.mockImplementationOnce(() => {
      throw new Error('Test execution error');
    });

    runTests({
      targetUrl: 'http://example.com'
    });

    // Verify error message
    expect(mockConsoleError).toHaveBeenCalledWith(expect.stringContaining('Failed to run tests: Test execution error'));
  });
});