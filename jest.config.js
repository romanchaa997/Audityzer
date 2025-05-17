/**
 * Jest configuration for Web3FuzzForge
 */
module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Coverage reporters to use
  coverageReporters: ['json', 'lcov', 'text', 'clover'],

  // Directories to exclude from coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/examples/',
    '/docs/',
    '/docs-site/',
    '/test-results/',
    '/tests/utils/',
  ],

  // A list of reporter names that Jest uses when writing coverage reports
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './test-results',
        outputName: 'junit.xml',
      },
    ],
  ],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // The pattern or patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

  // IMPORTANT: Exclude Playwright tests from Jest runs
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/examples/',
    '/autotests/',
    '/playwright-tests/',
    '/tests/wallet-',
    '/tests/connection',
    '/tests/transaction',
    '/tests/custom',
    '/tests/test.js',
    '/tests/metamask-',
    '/tests/zk-snark',
    '/tests/layerzero-',
    '/web3fuzzforge-community-tests/',
    '/darkforest-v0.6/eth/test/',
  ],

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};