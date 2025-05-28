/**
 * Jest configuration for Audityzer tests
 */

export default {
  // Indicates whether the coverage information should be collected
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/test'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],

  // An array of regexp pattern strings that are matched against all test paths
  testPathIgnorePatterns: ['/node_modules/'],

  // Transform configuration for ESM
  transform: {
    '^.+\.js$': ['babel-jest', { configFile: './babel.config.json' }]
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // Use ESM for tests
  extensionsToTreatAsEsm: ['.js'],

  // Setup files to run before each test
  setupFiles: [],

  // Mock all .js files to use ESM
  moduleNameMapper: {
    '^(\.{1,2}/.*)\.js$': '$1'
  },
};