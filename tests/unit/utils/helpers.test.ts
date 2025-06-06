
import { describe, it, expect } from 'vitest';
import { validateUrl, formatScore, parseConfig } from '@utils/helpers';

describe('Utility Helpers', () => {
  describe('validateUrl', () => {
    it('should validate correct URLs', () => {
      expect(validateUrl('https://example.com')).toBe(true);
      expect(validateUrl('http://localhost:3000')).toBe(true);
      expect(validateUrl('https://app.uniswap.org')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(validateUrl('invalid-url')).toBe(false);
      expect(validateUrl('')).toBe(false);
      expect(validateUrl('ftp://example.com')).toBe(false);
    });
  });

  describe('formatScore', () => {
    it('should format scores correctly', () => {
      expect(formatScore(85.5)).toBe('86');
      expect(formatScore(100)).toBe('100');
      expect(formatScore(0)).toBe('0');
    });

    it('should handle edge cases', () => {
      expect(formatScore(-1)).toBe('0');
      expect(formatScore(101)).toBe('100');
    });
  });

  describe('parseConfig', () => {
    it('should parse valid JSON config', () => {
      const configString = '{"target": "https://example.com", "rules": ["security"]}';
      const result = parseConfig(configString);
      
      expect(result).toEqual({
        target: 'https://example.com',
        rules: ['security']
      });
    });

    it('should throw error for invalid JSON', () => {
      expect(() => parseConfig('invalid-json')).toThrow();
    });
  });
});
