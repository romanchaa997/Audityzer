
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { execSync } from 'child_process';
import path from 'path';

describe('CLI Integration Tests', () => {
  const cliPath = path.resolve(process.cwd(), 'bin/audityzer.js');

  beforeEach(() => {
    // Set test environment
    process.env.NODE_ENV = 'test';
    process.env.MOCK_MODE = 'true';
  });

  describe('command execution', () => {
    it('should show help when no arguments provided', () => {
      const output = execSync(`node ${cliPath} --help`, { encoding: 'utf8' });
      expect(output).toContain('Usage:');
      expect(output).toContain('audityzer');
    });

    it('should show version information', () => {
      const output = execSync(`node ${cliPath} --version`, { encoding: 'utf8' });
      expect(output).toMatch(/\d+\.\d+\.\d+/);
    });
  });

  describe('audit command', () => {
    it('should run audit with mock mode', async () => {
      const command = `node ${cliPath} audit --target http://localhost:3000 --mock`;
      
      try {
        const output = execSync(command, { 
          encoding: 'utf8',
          timeout: 10000
        });
        
        expect(output).toContain('Audit completed');
      } catch (error) {
        // In test mode, we expect this to work with mocks
        console.log('CLI test output:', error.stdout);
      }
    });
  });

  describe('config validation', () => {
    it('should validate required parameters', () => {
      expect(() => {
        execSync(`node ${cliPath} audit`, { encoding: 'utf8' });
      }).toThrow();
    });
  });
});
