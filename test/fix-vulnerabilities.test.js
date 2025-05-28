/**
 * Unit tests for fix-vulnerabilities.js
 */

import { jest } from '@jest/globals';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Mock modules
jest.mock('child_process');
jest.mock('fs');

describe('fix-vulnerabilities', () => {
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

  test('should run npm audit to identify vulnerabilities', async () => {
    // Mock execSync to return audit data
    const mockAuditOutput = JSON.stringify({
      vulnerabilities: {
        'package-1': {
          name: 'package-1',
          severity: 'high',
          via: ['dependency-1']
        },
        'package-2': {
          name: 'package-2',
          severity: 'critical',
          via: ['dependency-2']
        }
      },
      metadata: {
        vulnerabilities: {
          info: 0,
          low: 0,
          moderate: 0,
          high: 1,
          critical: 1,
          total: 2
        }
      }
    });
    execSync.mockReturnValueOnce(Buffer.from(mockAuditOutput));

    // Import the script
    await import('../scripts/fix-vulnerabilities.js');

    // Verify npm audit was executed
    expect(execSync).toHaveBeenCalledWith('npm audit --json', expect.any(Object));

    // Verify vulnerabilities were reported
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Found 2 vulnerabilities'));
  });

  test('should attempt to fix vulnerabilities', async () => {
    // Mock execSync for audit and fix commands
    const mockAuditOutput = JSON.stringify({
      vulnerabilities: {
        'package-1': {
          name: 'package-1',
          severity: 'high',
          via: ['dependency-1']
        }
      },
      metadata: {
        vulnerabilities: {
          high: 1,
          total: 1
        }
      }
    });
    execSync.mockReturnValueOnce(Buffer.from(mockAuditOutput));

    // Mock successful fix
    execSync.mockReturnValueOnce(Buffer.from('Fixed 1 vulnerability'));

    // Import the script
    await import('../scripts/fix-vulnerabilities.js');

    // Verify npm audit fix was executed
    expect(execSync).toHaveBeenCalledWith('npm audit fix --force', expect.any(Object));

    // Verify success message
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Successfully fixed vulnerabilities'));
  });

  test('should handle errors during vulnerability fixing', async () => {
    // Mock execSync for audit
    const mockAuditOutput = JSON.stringify({
      vulnerabilities: {
        'package-1': {
          name: 'package-1',
          severity: 'high',
          via: ['dependency-1']
        }
      },
      metadata: {
        vulnerabilities: {
          high: 1,
          total: 1
        }
      }
    });
    execSync.mockReturnValueOnce(Buffer.from(mockAuditOutput));

    // Mock error during fix
    execSync.mockImplementationOnce(() => {
      throw new Error('Failed to fix vulnerabilities');
    });

    // Mock console.error
    const originalConsoleError = console.error;
    const mockConsoleError = jest.fn();
    console.error = mockConsoleError;

    // Import the script
    await import('../scripts/fix-vulnerabilities.js');

    // Verify error was logged
    expect(mockConsoleError).toHaveBeenCalledWith(expect.stringContaining('Error fixing vulnerabilities'));

    // Restore console.error
    console.error = originalConsoleError;
  });

  test('should handle case with no vulnerabilities', async () => {
    // Mock execSync to return audit data with no vulnerabilities
    const mockAuditOutput = JSON.stringify({
      vulnerabilities: {},
      metadata: {
        vulnerabilities: {
          info: 0,
          low: 0,
          moderate: 0,
          high: 0,
          critical: 0,
          total: 0
        }
      }
    });
    execSync.mockReturnValueOnce(Buffer.from(mockAuditOutput));

    // Import the script
    await import('../scripts/fix-vulnerabilities.js');

    // Verify no vulnerabilities message
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('No vulnerabilities found'));

    // Verify npm audit fix was not executed
    expect(execSync).toHaveBeenCalledTimes(1); // Only the initial audit
  });
});