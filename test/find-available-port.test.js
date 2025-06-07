/**
 * Unit tests for find-available-port.js
 */

import { jest } from '@jest/globals';
import net from 'net';
import findAvailablePort from '../scripts/find-available-port.js';

// Mock the net module
jest.mock('net');

describe('findAvailablePort', () => {
  let mockServer;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Create a mock server object
    mockServer = {
      on: jest.fn(),
      listen: jest.fn(),
      close: jest.fn(callback => callback())
    };

    // Mock net.createServer to return our mock server
    net.createServer.mockReturnValue(mockServer);
  });

  test('should return the start port when it is available', done => {
    // Setup the mock server to simulate an available port
    mockServer.listen.mockImplementation((port, callback) => {
      callback();
    });

    // Call the function with a callback
    findAvailablePort(5000, port => {
      expect(port).toBe(5000);
      expect(mockServer.listen).toHaveBeenCalledWith(5000, expect.any(Function));
      expect(mockServer.close).toHaveBeenCalled();
      done();
    });
  });

  test('should try the next port when the current port is in use', done => {
    // Setup the mock server to simulate a port in use, then available
    let callCount = 0;

    // First call - port in use
    mockServer.on.mockImplementation((event, callback) => {
      if (event === 'error' && callCount === 0) {
        callback({ code: 'EADDRINUSE' });
      }
    });

    // Second call - port available
    mockServer.listen.mockImplementation((port, callback) => {
      callCount++;
      if (callCount === 2) {
        callback();
      }
    });

    // Call the function with a callback
    findAvailablePort(5000, port => {
      expect(port).toBe(5001);
      expect(mockServer.listen).toHaveBeenCalledTimes(2);
      expect(mockServer.listen).toHaveBeenCalledWith(5001, expect.any(Function));
      expect(mockServer.close).toHaveBeenCalled();
      done();
    });
  });

  test('should handle non-EADDRINUSE errors', done => {
    // Setup the mock server to simulate a different error
    mockServer.on.mockImplementation((event, callback) => {
      if (event === 'error') {
        callback({ code: 'SOME_OTHER_ERROR' });
      }
    });

    // Mock console.error to prevent test output pollution
    console.error = jest.fn();

    // Call the function with a callback
    findAvailablePort(5000, port => {
      expect(port).toBeNull();
      expect(console.error).toHaveBeenCalled();
      done();
    });
  });
});