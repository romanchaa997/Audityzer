/**
 * Unit tests for src/core/index.js
 */

import { jest } from '@jest/globals';
import { initCore, version } from '../../src/core/index.js';
import { startServer, stopServer, restartServer, getServerStatus } from '../../src/core/server.js';
import { runTests } from '../../src/core/test-runner.js';

// Mock the server and test-runner modules
jest.mock('../../src/core/server.js');
jest.mock('../../src/core/test-runner.js');

describe('Core Module', () => {
  let mockConsoleLog;

  beforeEach(() => {
    // Mock console.log
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

    // Reset mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore console.log
    mockConsoleLog.mockRestore();
  });

  test('should export the correct version', () => {
    expect(version).toBe('1.1.2');
  });

  test('should initialize the core with default options', () => {
    const core = initCore();

    // Verify initialization message
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Initializing Audityzer core'));

    // Verify core object structure
    expect(core).toEqual({
      version,
      startServer,
      stopServer,
      restartServer,
      getServerStatus,
      runTests
    });
  });

  test('should initialize the core with custom options', () => {
    const options = {
      logLevel: 'debug',
      configPath: './custom-config.json'
    };

    const core = initCore(options);

    // Verify initialization message
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Initializing Audityzer core'));

    // Verify core object structure
    expect(core).toEqual({
      version,
      startServer,
      stopServer,
      restartServer,
      getServerStatus,
      runTests
    });
  });
});