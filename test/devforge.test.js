/**
 * Unit tests for devforge.js CLI
 */

import { jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Mock modules
jest.mock('fs');
jest.mock('child_process');

// Mock import for dynamic imports
jest.mock('../scripts/start-server.js', () => ({}), { virtual: true });
jest.mock('../scripts/stop-server.js', () => ({}), { virtual: true });

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the devforge.js script
const devforgePath = path.join(__dirname, '..', 'bin', 'devforge.js');

describe('devforge CLI', () => {
  let originalArgv;
  let originalConsoleLog;
  let originalConsoleError;
  let mockConsoleLog;
  let mockConsoleError;

  beforeEach(() => {
    // Save original process.argv
    originalArgv = process.argv;

    // Mock console methods
    originalConsoleLog = console.log;
    originalConsoleError = console.error;
    mockConsoleLog = jest.fn();
    mockConsoleError = jest.fn();
    console.log = mockConsoleLog;
    console.error = mockConsoleError;

    // Reset mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore original process.argv
    process.argv = originalArgv;

    // Restore console methods
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  test('should display help when no arguments are provided', () => {
    // Set up process.argv for no arguments
    process.argv = ['node', devforgePath];

    // Mock program.help
    const mockHelp = jest.fn();
    jest.mock('commander', () => ({
      program: {
        version: jest.fn().mockReturnThis(),
        description: jest.fn().mockReturnThis(),
        command: jest.fn().mockReturnThis(),
        option: jest.fn().mockReturnThis(),
        action: jest.fn().mockReturnThis(),
        parse: jest.fn(),
        help: mockHelp
      }
    }));

    // Execute the script
    require('../bin/devforge.js');

    // Verify help was called
    expect(mockHelp).toHaveBeenCalled();
  });

  test('should check server status correctly when server is running', () => {
    // Mock fs.existsSync to return true (server is running)
    fs.existsSync.mockReturnValue(true);

    // Mock fs.readFileSync to return valid JSON
    const mockPidData = JSON.stringify({
      pid: 12345,
      port: 5000,
      startTime: Date.now() - 60000 // 1 minute ago
    });
    fs.readFileSync.mockReturnValue(mockPidData);

    // Set up process.argv for status command
    process.argv = ['node', devforgePath, 'status'];

    // Execute the script
    require('../bin/devforge.js');

    // Verify console output
    expect(mockConsoleLog).toHaveBeenCalledWith('Status: Running');
    expect(mockConsoleLog).toHaveBeenCalledWith('PID: 12345');
    expect(mockConsoleLog).toHaveBeenCalledWith('Port: 5000');
  });

  test('should handle legacy PID file format', () => {
    // Mock fs.existsSync to return true (server is running)
    fs.existsSync.mockReturnValue(true);

    // Mock fs.readFileSync to throw on JSON.parse but return a valid PID string
    fs.readFileSync.mockImplementation(() => {
      // First call will be for JSON.parse which should fail
      const error = new Error('Invalid JSON');
      error.name = 'SyntaxError';
      throw error;
    });
    fs.readFileSync.mockReturnValueOnce('12345');

    // Set up process.argv for status command
    process.argv = ['node', devforgePath, 'status'];

    // Execute the script
    require('../bin/devforge.js');

    // Verify console output for legacy format
    expect(mockConsoleLog).toHaveBeenCalledWith('Status: Running (legacy format)');
    expect(mockConsoleLog).toHaveBeenCalledWith('PID: 12345');
  });

  test('should report server not running when PID file does not exist', () => {
    // Mock fs.existsSync to return false (server not running)
    fs.existsSync.mockReturnValue(false);

    // Set up process.argv for status command
    process.argv = ['node', devforgePath, 'status'];

    // Execute the script
    require('../bin/devforge.js');

    // Verify console output
    expect(mockConsoleLog).toHaveBeenCalledWith('Status: Not running');
  });
});