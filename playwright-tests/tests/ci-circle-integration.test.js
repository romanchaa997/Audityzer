/* global describe, it, expect, beforeEach, afterEach, jest */
/**
 * CircleCI Integration Tests
 *
 * This test suite tests the CircleCI adapter functionality.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const CircleCIAdapter = require('../src/core/ci-integration/platforms/circleci-adapter');
const PlatformRegistry = require('../src/core/ci-integration/platform-registry');

// Mock environment variables
const originalEnv = process.env;

describe('CircleCI Integration Tests', () => {
  let adapter;
  let tempDir;

  beforeEach(() => {
    process.env = { ...originalEnv };

    // Create temp directory for test output
    tempDir = path.join(__dirname, 'tmp-circleci-test');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Initialize adapter
    adapter = new CircleCIAdapter({
      configPath: path.join(tempDir, 'config.yml'),
    });
  });

  afterEach(() => {
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }

    // Restore original environment
    process.env = originalEnv;
  });

  test('CircleCI adapter initializes correctly', () => {
    expect(adapter).toBeDefined();
    expect(adapter.config).toBeDefined();
    expect(adapter.config.configPath).toContain('config.yml');
  });

  test('CircleCI adapter generates valid configuration', () => {
    const config = adapter.generateConfig();

    expect(config).toBeDefined();
    expect(config.version).toBe(2.1);
    expect(config.jobs).toBeDefined();
    expect(config.jobs.test).toBeDefined();
    expect(config.jobs.test.steps).toContainEqual(
      expect.objectContaining({
        run: expect.objectContaining({
          name: 'Run tests',
        }),
      })
    );
  });

  test('CircleCI adapter writes configuration to file', () => {
    const outputPath = path.join(tempDir, 'test-config.yml');
    adapter.generateConfigFile({}, outputPath);

    expect(fs.existsSync(outputPath)).toBe(true);

    const content = fs.readFileSync(outputPath, 'utf8');
    const parsedConfig = yaml.load(content);

    expect(parsedConfig).toBeDefined();
    expect(parsedConfig.version).toBe(2.1);
  });

  test('CircleCI adapter includes security checks when requested', () => {
    const config = adapter.generateConfig({ includeSecurity: true });

    const securityStep = config.jobs.test.steps.find(
      step => step.run && step.run.name === 'Run security checks'
    );

    expect(securityStep).toBeDefined();
    expect(securityStep.run.command).toContain('Audityzer analyze');
  });

  test('CircleCI adapter excludes security checks when not requested', () => {
    const config = adapter.generateConfig({ includeSecurity: false });

    const securityStep = config.jobs.test.steps.find(
      step => step.run && step.run.name === 'Run security checks'
    );

    expect(securityStep).toBeUndefined();
  });

  test('Platform registry includes CircleCI adapter', () => {
    const registry = new PlatformRegistry();

    expect(registry.hasAdapter('circle')).toBe(true);

    // Test adapter retrieval
    const adapter = registry.getAdapter('circle');
    expect(adapter).toBeDefined();
    expect(adapter.constructor.name).toBe('CircleCIAdapter');
  });

  test('CircleCI adapter is detected from environment', () => {
    // Set up CircleCI environment variable
    process.env.CIRCLECI = 'true';

    const registry = new PlatformRegistry();
    const platform = registry.detectPlatform();

    expect(platform).toBe('circle');

    // Get the adapter for the detected platform
    const adapter = registry.getAdapter();
    expect(adapter).toBeDefined();
    expect(adapter.constructor.name).toBe('CircleCIAdapter');
  });
});
