/**
 * Unit tests for stop-server.js
 */

import { jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Mock modules
jest.mock('fs');
jest.mock('child_process');

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('stop-server', () => {
  let originalConsoleLog;
  let mockConsoleLog;

  beforeEach(() => {
    // Mock console.log
    originalConsoleLog = console.log;
    mockConsoleLog = jest.fn();
    console.log = mockConsoleLog;

    // Reset mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore console.log
    console.log = originalConsoleLog;
  });

  test('should do nothing if PID file does not exist', async () => {
    // Mock fs.existsSync to return false (no PID file)
    fs.existsSync.mockReturnValue(false);

    // Import the script
    await import('../scripts/stop-server.js');

    // Verify console output
    expect(mockConsoleLog).toHaveBeenCalledWith('No server is running.');

    // Verify execSync was not called
    expect(execSync).not.toHaveBeenCalled();
  });

  test('should stop server process using PID from JSON format', async () => {
    // Mock fs.existsSync to return true (PID file exists)
    fs.existsSync.mockReturnValue(true);

    // Mock fs.readFileSync to return valid JSON
    const mockPidData = JSON.stringify({
      pid: 12345,
      port: 5000,
      startTime: Date.now()
    });
    fs.readFileSync.mockReturnValue(mockPidData);

    // Import the script
    await import('../scripts/stop-server.js');

    // Verify kill command was executed
    if (process.platform === 'win32') {
      expect(execSync).toHaveBeenCalledWith('taskkill /F /PID 12345', expect.any(Object));
    } else {
      expect(execSync).toHaveBeenCalledWith('kill -9 12345', expect.any(Object));
    }

    // Verify PID file was removed
    expect(fs.unlinkSync).toHaveBeenCalled();

    // Verify console output
    expect(mockConsoleLog).toHaveBeenCalledWith('Server stopped.');
  });

  test('should handle legacy PID file format', async () => {
    // Mock fs.existsSync to return true (PID file exists)
    fs.existsSync.mockReturnValue(true);

    // Mock fs.readFileSync to throw on JSON.parse but return a valid PID string
    fs.readFileSync.mockImplementation(() => {
      // First call will be for JSON.parse which should fail
      const error = new Error('Invalid JSON');
      error.name = 'SyntaxError';
      throw error;
    });
    fs.readFileSync.mockReturnValueOnce('12345');

    // Import the script
    await import('../scripts/stop-server.js');

    // Verify kill command was executed with the legacy PID
    if (process.platform === 'win32') {
      expect(execSync).toHaveBeenCalledWith('taskkill /F /PID 12345', expect.any(Object));
    } else {
      expect(execSync).toHaveBeenCalledWith('kill -9 12345', expect.any(Object));
    }

    // Verify PID file was removed
    expect(fs.unlinkSync).toHaveBeenCalled();
  });

  test('should handle errors when stopping the server', async () => {
    // Mock fs.existsSync to return true (PID file exists)
    fs.existsSync.mockReturnValue(true);

    // Mock fs.readFileSync to return valid JSON
    const mockPidData = JSON.stringify({
      pid: 12345,
      port: 5000,
      startTime: Date.now()
    });
    fs.readFileSync.mockReturnValue(mockPidData);

    // Mock execSync to throw an error
    execSync.mockImplementation(() => {
      throw new Error('Process not found');
    });

    // Mock console.error
    const originalConsoleError = console.error;
    const mockConsoleError = jest.fn();
    console.error = mockConsoleError;

    // Import the script
    await import('../scripts/stop-server.js');

    // Verify error was logged
    expect(mockConsoleError).toHaveBeenCalledWith(expect.stringContaining('Error stopping server'));

    // Verify PID file was still removed
    expect(fs.unlinkSync).toHaveBeenCalled();

    // Restore console.error
    console.error = originalConsoleError;
  });
});