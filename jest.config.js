/**
 * Jest configuration for Audityzer tests
 * Fixed configuration to avoid preset conflicts
 */

const config = {
  // Test environment
  testEnvironment: 'node',

  // Test file patterns
  testMatch: [
    '**/test/**/*.test.js',
    '**/tests/**/*.test.js',
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],

  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/coverage/'
  ],

  // Coverage settings
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  // Coverage collection patterns
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.spec.js'
  ],

  // Transform settings - using babel-jest as transformer, not preset
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },

  // Module file extensions
  moduleFileExtensions: ['js', 'json'],

  // Verbose output
  verbose: true,

  // Root directories
  roots: ['<rootDir>/test', '<rootDir>/tests', '<rootDir>/src'],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },

  // Clear mocks between tests
  clearMocks: true,

  // Automatically restore mock state between every test
  restoreMocks: true,

  // Test timeout (30 seconds for AI operations)
  testTimeout: 30000,

  // Setup files
  setupFilesAfterEnv: [],

  // Handle ES modules and CommonJS
  extensionsToTreatAsEsm: [],

  // Error handling
  errorOnDeprecated: false
};

module.exports = config;