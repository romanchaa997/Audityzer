/**
 * Unit tests for start-server.js
 */

import { jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync, spawn } from 'child_process';
import findAvailablePort from '../scripts/find-available-port.js';

// Mock modules
jest.mock('fs');
jest.mock('child_process');
jest.mock('../scripts/find-available-port.js');

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('start-server', () => {
  let originalEnv;
  let mockSpawnProcess;

  beforeEach(() => {
    // Save original process.env
    originalEnv = { ...process.env };

    // Mock spawn to return a mock process
    mockSpawnProcess = {
      pid: 12345,
      on: jest.fn(),
      stdout: { on: jest.fn() },
      stderr: { on: jest.fn() }
    };
    spawn.mockReturnValue(mockSpawnProcess);

    // Mock findAvailablePort to return a port
    findAvailablePort.mockImplementation((port, callback) => callback(5000));

    // Reset mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore original process.env
    process.env = originalEnv;
  });

  test('should use the specified port if available', async () => {
    // Set environment variable for port
    process.env.SERVER_PORT = '5000';

    // Import the script
    await import('../scripts/start-server.js');

    // Verify findAvailablePort was called with the specified port
    expect(findAvailablePort).toHaveBeenCalledWith(5000, expect.any(Function));
  });

  test('should use the default port if none specified', async () => {
    // Clear environment variable for port
    delete process.env.SERVER_PORT;

    // Import the script
    await import('../scripts/start-server.js');

    // Verify findAvailablePort was called with the default port
    expect(findAvailablePort).toHaveBeenCalledWith(expect.any(Number), expect.any(Function));
  });

  test('should write PID file with server information', async () => {
    // Set environment variable for port
    process.env.SERVER_PORT = '5000';

    // Mock Date.now
    const mockTimestamp = 1234567890000;
    const originalDateNow = Date.now;
    Date.now = jest.fn(() => mockTimestamp);

    // Import the script
    await import('../scripts/start-server.js');

    // Verify PID file was written
    expect(fs.writeFileSync).toHaveBeenCalled();

    // Get the data written to the PID file
    const writeCall = fs.writeFileSync.mock.calls[0];
    const pidFilePath = writeCall[0];
    const pidFileData = writeCall[1];

    // Verify PID file path
    expect(pidFilePath).toContain('.server-pid');

    // Verify PID file data
    const pidData = JSON.parse(pidFileData);
    expect(pidData).toEqual({
      pid: 12345,
      port: 5000,
      startTime: mockTimestamp
    });

    // Restore Date.now
    Date.now = originalDateNow;
  });

  test('should handle server process events', async () => {
    // Import the script
    await import('../scripts/start-server.js');

    // Verify event handlers were registered
    expect(mockSpawnProcess.on).toHaveBeenCalledWith('error', expect.any(Function));
    expect(mockSpawnProcess.stdout.on).toHaveBeenCalledWith('data', expect.any(Function));
    expect(mockSpawnProcess.stderr.on).toHaveBeenCalledWith('data', expect.any(Function));
  });
});