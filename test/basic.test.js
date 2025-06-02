/* global describe, it, expect, beforeEach, afterEach, jest */
/**
 * Basic test to verify Jest configuration is working
 * Using CommonJS syntax for compatibility
 */

describe('Basic Jest Configuration', () => {
  test('should be able to run basic tests', () => {
    expect(1 + 1).toBe(2);
  });

  test('should support basic JavaScript features', () => {
    const testObject = { name: 'test', version: '1.0.0' };
    expect(testObject.name).toBe('test');
    expect(testObject.version).toBe('1.0.0');
  });

  test('should support async/await', async () => {
    const promise = Promise.resolve('success');
    const result = await promise;
    expect(result).toBe('success');
  });

  test('should support array methods', () => {
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(n => n * 2);
    expect(doubled).toEqual([2, 4, 6, 8, 10]);
  });

  test('should support modern JavaScript features', () => {
    // Template literals
    const name = 'Jest';
    const message = `Hello, ${name}!`;
    expect(message).toBe('Hello, Jest!');

    // Destructuring
    const { name: testName, version } = { name: 'test', version: '1.0.0' };
    expect(testName).toBe('test');
    expect(version).toBe('1.0.0');

    // Arrow functions
    const add = (a, b) => a + b;
    expect(add(2, 3)).toBe(5);
  });
});