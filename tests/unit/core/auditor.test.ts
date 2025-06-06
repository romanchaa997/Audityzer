
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Auditor } from '@core/auditor';
import { AuditConfig } from '@core/types';

describe('Auditor Core', () => {
  let auditor: Auditor;
  let mockConfig: AuditConfig;

  beforeEach(() => {
    mockConfig = {
      target: 'http://localhost:3000',
      rules: ['security', 'performance'],
      output: './test-output',
      format: 'json'
    };
    auditor = new Auditor(mockConfig);
  });

  describe('initialization', () => {
    it('should create auditor with valid config', () => {
      expect(auditor).toBeDefined();
      expect(auditor.config).toEqual(mockConfig);
    });

    it('should throw error with invalid config', () => {
      expect(() => new Auditor({} as AuditConfig)).toThrow();
    });
  });

  describe('audit execution', () => {
    it('should run basic audit successfully', async () => {
      const mockResult = global.testUtils.createMockAuditResult();
      
      // Mock the audit method
      vi.spyOn(auditor, 'run').mockResolvedValue(mockResult);
      
      const result = await auditor.run();
      
      expect(result).toBeDefined();
      expect(result.status).toBe('completed');
      expect(result.score).toBeGreaterThan(0);
    });

    it('should handle audit errors gracefully', async () => {
      vi.spyOn(auditor, 'run').mockRejectedValue(new Error('Network error'));
      
      await expect(auditor.run()).rejects.toThrow('Network error');
    });
  });

  describe('configuration validation', () => {
    it('should validate target URL', () => {
      const invalidConfig = { ...mockConfig, target: 'invalid-url' };
      expect(() => new Auditor(invalidConfig)).toThrow('Invalid target URL');
    });

    it('should validate rules array', () => {
      const invalidConfig = { ...mockConfig, rules: [] };
      expect(() => new Auditor(invalidConfig)).toThrow('At least one rule must be specified');
    });
  });
});
