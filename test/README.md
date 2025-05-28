# Audityzer Test Suite

This directory contains unit tests for the Audityzer security testing framework.

## Running Tests

To run all tests:

```bash
npm test
```

To run a specific test file:

```bash
npm test -- test/find-available-port.test.js
```

To run tests with coverage report:

```bash
npm test -- --coverage
```

## Test Structure

The test suite is organized as follows:

- `audityzer.test.js` - Tests for the main CLI interface
- `devforge.test.js` - Tests for the development server CLI
- `find-available-port.test.js` - Tests for the port finding utility
- `fix-vulnerabilities.test.js` - Tests for the vulnerability fixing script
- `start-server.test.js` - Tests for the server startup script
- `stop-server.test.js` - Tests for the server shutdown script

## Mocking Strategy

These tests use Jest's mocking capabilities to isolate components and test them independently:

- External modules like `fs`, `child_process`, and `net` are mocked
- Dynamic imports are handled with virtual mocks
- Console output is captured for verification

## Adding New Tests

When adding new tests, follow these guidelines:

1. Create a new test file named `[module-name].test.js`
2. Import the module to be tested
3. Mock any dependencies
4. Write test cases that verify the module's behavior
5. Run the tests to ensure they pass

## Test Coverage

The test suite aims to achieve high coverage of the codebase, focusing on:

- Command-line argument handling
- Error handling and edge cases
- Core functionality of each module