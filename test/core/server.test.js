/**
 * Unit tests for src/core/server.js
 */

import { jest } from '@jest/globals';
import http from 'http';
import { startServer, stopServer, restartServer, getServerStatus } from '../../src/core/server.js';

import fsExtra from 'fs-extra';     // якщо тобі потрібен реальний імпорт для типів або перевірок
import chalk from 'chalk';

const mockFsExtra = jest.fn();
const mockChalkGreen = jest.fn(text => text);
const mockChalkYellow = jest.fn(text => text);

jest.mock('http');
jest.mock('fs-extra', () => mockFsExtra);
jest.mock('chalk', () => ({
  green: mockChalkGreen,
  yellow: mockChalkYellow,
}));

describe('Server Module', () => {
  let mockServer;
  let mockConsoleLog;
  let mockConsoleError;

  beforeEach(() => {
    // Mock console methods
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

    // Create a mock server object
    mockServer = {
      listen: jest.fn((port, callback) => callback()),
      on: jest.fn(),
      close: jest.fn(callback => callback())
    };

    // Mock http.createServer to return our mock server
    http.createServer.mockReturnValue(mockServer);

    // Mock fs.existsSync and fs.mkdirSync
    fs.existsSync.mockReturnValue(true);
    fs.mkdirSync.mockReturnValue(undefined);

    // Reset mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore console methods
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
  });

  describe('startServer', () => {
    test('should start a server on the specified port', () => {
      startServer(5050, './public');

      expect(http.createServer).toHaveBeenCalled();
      expect(mockServer.listen).toHaveBeenCalledWith(5050, expect.any(Function));
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Server started on port 5050'));
    });

    test('should create directory if it does not exist', () => {
      // Mock directory does not exist
      fs.existsSync.mockReturnValueOnce(false);

      startServer(5050, './public');

      expect(fs.mkdirSync).toHaveBeenCalledWith('./public', { recursive: true });
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Directory ./public does not exist'));
    });

    test('should handle port already in use', () => {
      // Start server first time
      startServer(5050, './public');

      // Mock server error for port in use
      const errorCallback = mockServer.on.mock.calls.find(call => call[0] === 'error')[1];
      errorCallback({ code: 'EADDRINUSE' });

      // Should try next port
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Port 5050 is in use'));
      expect(http.createServer).toHaveBeenCalledTimes(2);
    });

    test('should handle other server errors', () => {
      startServer(5050, './public');

      // Mock server error
      const errorCallback = mockServer.on.mock.calls.find(call => call[0] === 'error')[1];
      errorCallback(new Error('Test error'));

      expect(mockConsoleError).toHaveBeenCalledWith(expect.stringContaining('Server error'));
    });
  });

  describe('stopServer', () => {
    test('should stop a running server', () => {
      // Start a server first
      startServer(5050, './public');

      // Clear mock calls
      jest.clearAllMocks();

      // Stop the server
      stopServer(5050);

      expect(mockServer.close).toHaveBeenCalled();
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Server on port 5050 stopped'));
    });

    test('should handle stopping a non-existent server', () => {
      stopServer(9999);

      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('No server running on port 9999'));
    });
  });

  describe('restartServer', () => {
    test('should restart a server', () => {
      // Mock setTimeout
      jest.useFakeTimers();

      // Start a server first
      startServer(5050, './public');

      // Clear mock calls
      jest.clearAllMocks();

      // Restart the server
      restartServer(5050, './public');

      // Verify stopServer was called
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Server on port 5050 stopped'));

      // Fast-forward timer
      jest.runAllTimers();

      // Verify startServer was called
      expect(http.createServer).toHaveBeenCalled();
      expect(mockServer.listen).toHaveBeenCalledWith(5050, expect.any(Function));

      // Restore timers
      jest.useRealTimers();
    });
  });

  describe('getServerStatus', () => {
    test('should return true for a running server', () => {
      // Start a server first
      startServer(5050, './public');

      // Clear mock calls
      jest.clearAllMocks();

      // Check server status
      const status = getServerStatus(5050);

      expect(status).toBe(true);
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Server is running on port 5050'));
    });

    test('should return false for a non-existent server', () => {
      const status = getServerStatus(9999);

      expect(status).toBe(false);
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('No server running on port 9999'));
    });
  });
});