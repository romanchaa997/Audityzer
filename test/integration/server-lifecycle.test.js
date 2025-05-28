/**
 * Integration tests for server lifecycle
 * 
 * Tests the complete lifecycle of server operations including:
 * - Starting a server
 * - Checking server status
 * - Restarting a server
 * - Stopping a server
 */

import { jest } from '@jest/globals';
import http from 'http';
import { initCore } from '../../src/core/index.js';

// Use real modules for integration testing
jest.mock('http', () => {
  const originalModule = jest.requireActual('http');

  // Create a mock server that behaves like a real one but doesn't actually listen on ports
  const mockServer = {
    listen: jest.fn((port, callback) => {
      if (callback) callback();
      return mockServer;
    }),
    on: jest.fn((event, callback) => mockServer),
    close: jest.fn(callback => {
      if (callback) callback();
      return mockServer;
    })
  };

  return {
    ...originalModule,
    createServer: jest.fn(() => mockServer)
  };
});

describe('Server Lifecycle Integration', () => {
  let core;
  let mockConsoleLog;

  beforeEach(() => {
    // Mock console.log to avoid cluttering test output
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

    // Initialize the core module
    core = initCore();

    // Reset mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore console.log
    mockConsoleLog.mockRestore();
  });

  test('should complete a full server lifecycle', () => {
    // Start the server
    core.startServer(5050, './public');

    // Verify server was created and started
    expect(http.createServer).toHaveBeenCalled();
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Server started on port 5050'));

    // Check server status
    const status = core.getServerStatus(5050);
    expect(status).toBe(true);
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Server is running on port 5050'));

    // Restart the server
    jest.useFakeTimers();
    core.restartServer(5050, './public');

    // Verify server was stopped
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Server on port 5050 stopped'));

    // Fast-forward timer to trigger restart
    jest.runAllTimers();

    // Verify server was restarted
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Server started on port 5050'));

    // Stop the server
    core.stopServer(5050);

    // Verify server was stopped
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Server on port 5050 stopped'));

    // Restore timers
    jest.useRealTimers();
  });

  test('should handle multiple servers on different ports', () => {
    // Start servers on different ports
    core.startServer(5050, './public');
    core.startServer(5051, './other-public');

    // Verify both servers were created
    expect(http.createServer).toHaveBeenCalledTimes(2);
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Server started on port 5050'));
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Server started on port 5051'));

    // Check status of both servers
    expect(core.getServerStatus(5050)).toBe(true);
    expect(core.getServerStatus(5051)).toBe(true);

    // Stop one server
    core.stopServer(5050);

    // Verify only one server was stopped
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Server on port 5050 stopped'));
    expect(core.getServerStatus(5050)).toBe(false);
    expect(core.getServerStatus(5051)).toBe(true);

    // Stop the other server
    core.stopServer(5051);

    // Verify the second server was stopped
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Server on port 5051 stopped'));
    expect(core.getServerStatus(5051)).toBe(false);
  });
});