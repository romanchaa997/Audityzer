/**
 * Unit tests for fix-vulnerabilities.js
 */

const { execSync } = require('child_process');

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

  test('should run npm audit to identify vulnerabilities', () => {
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
    execSync.mockReturnValueOnce(mockAuditOutput);

    // Require the script
    require('../scripts/fix-vulnerabilities.js');

    // Verify npm audit was executed
    expect(execSync).toHaveBeenCalledWith('npm audit --json', expect.any(Object));

    // Verify vulnerabilities were reported
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Found 2 vulnerable packages'));
  });

  test('should attempt to fix vulnerabilities', () => {
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
    execSync.mockReturnValueOnce(mockAuditOutput);

    // Mock successful fix
    execSync.mockReturnValueOnce('Fixed 1 vulnerability');

    // Require the script
    require('../scripts/fix-vulnerabilities.js');

    // Verify npm audit fix was executed
    expect(execSync).toHaveBeenCalledWith('npm audit fix --force', expect.any(Object));

    // Verify completion message
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('Completed npm audit fix'));
  });

  test('should handle errors during vulnerability fixing', () => {
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
    execSync.mockReturnValueOnce(mockAuditOutput);

    // Mock error during fix
    execSync.mockImplementationOnce(() => {
      throw new Error('Failed to fix vulnerabilities');
    });

    // Mock console.warn
    const originalConsoleWarn = console.warn;
    const mockConsoleWarn = jest.fn();
    console.warn = mockConsoleWarn;

    // Require the script
    require('../scripts/fix-vulnerabilities.js');

    // Verify warning was logged
    expect(mockConsoleWarn).toHaveBeenCalledWith(expect.stringContaining('Some vulnerabilities could not be fixed automatically'));

    // Restore console.warn
    console.warn = originalConsoleWarn;
  });

  test('should handle case with no vulnerabilities', () => {
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
    execSync.mockReturnValueOnce(mockAuditOutput);

    // Require the script
    require('../scripts/fix-vulnerabilities.js');

    // Verify no vulnerabilities message
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('No vulnerabilities found'));

    // Verify npm audit fix was not executed for the fix command
    const auditFixCalls = execSync.mock.calls.filter(call =>
      call[0].includes('npm audit fix')
    );
    expect(auditFixCalls).toHaveLength(0);
  });
});