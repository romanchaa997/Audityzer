# Test Maintenance Guide

This guide provides instructions for maintaining and updating the test suite as the Audityzer project evolves.

## Table of Contents

1. [General Guidelines](#general-guidelines)
2. [Adding New Tests](#adding-new-tests)
3. [Updating Existing Tests](#updating-existing-tests)
4. [Test Coverage](#test-coverage)
5. [Integration Tests](#integration-tests)
6. [CI/CD Integration](#cicd-integration)

## General Guidelines

- **Keep tests isolated**: Each test should be independent and not rely on the state from other tests.
- **Use mocks appropriately**: Mock external dependencies but test the actual code logic.
- **Follow naming conventions**: Name test files with `.test.js` suffix and place them in the appropriate directory.
- **Maintain test coverage**: Aim for high test coverage, especially for critical functionality.
- **Run tests regularly**: Run tests before committing changes to ensure nothing breaks.

## Adding New Tests

When adding new functionality to the project, follow these steps to add corresponding tests:

1. **Identify the type of test needed**:
   - Unit test for a single function or module
   - Integration test for multiple components working together
   - End-to-end test for complete workflows

2. **Create the test file**:
   - For unit tests: `test/[module-name]/[file-name].test.js`
   - For integration tests: `test/integration/[feature-name].test.js`

3. **Structure the test file**:
   ```javascript
   /**
    * Tests for [module-name]
    */
   
   import { jest } from '@jest/globals';
   import { functionToTest } from '../../src/path/to/module.js';
   
   // Mock dependencies
   jest.mock('dependency');
   
   describe('Module Name', () => {
     beforeEach(() => {
       // Setup code
     });
     
     afterEach(() => {
       // Cleanup code
     });
     
     test('should do something specific', () => {
       // Arrange
       // Act
       // Assert
     });
   });
   ```

4. **Run the new test**:
   ```bash
   npm test -- test/path/to/new-test.test.js
   ```

## Updating Existing Tests

When updating existing functionality, follow these steps to update the corresponding tests:

1. **Identify affected tests**:
   - Run tests to see which ones fail after your changes
   - Identify tests that need to be updated based on the changes made

2. **Update test expectations**:
   - Update input data, expected outputs, and assertions
   - Update mocks if the dependencies or their behavior has changed

3. **Add new test cases**:
   - Add test cases for new edge cases or behaviors
   - Add test cases for bug fixes to prevent regression

4. **Run the updated tests**:
   ```bash
   npm test -- test/path/to/updated-test.test.js
   ```

## Test Coverage

Maintain high test coverage by following these guidelines:

1. **Check current coverage**:
   ```bash
   npm test -- --coverage
   ```

2. **Identify areas with low coverage**:
   - Review the coverage report in `coverage/lcov-report/index.html`
   - Focus on critical modules and functions first

3. **Add tests for uncovered code**:
   - Add tests for uncovered branches and edge cases
   - Prioritize testing error handling and edge cases

4. **Set coverage thresholds**:
   - Update `jest.config.js` to set coverage thresholds if needed

## Integration Tests

Maintain integration tests to verify components work together correctly:

1. **Identify integration points**:
   - CLI and Core module interaction
   - Server lifecycle management
   - Test runner and reporting integration

2. **Update integration tests when changing interfaces**:
   - When changing module APIs, update integration tests
   - When adding new components, add integration tests for them

3. **Use realistic scenarios**:
   - Test real-world workflows and use cases
   - Test error handling and recovery scenarios

## CI/CD Integration

Ensure tests run correctly in the CI/CD pipeline:

1. **Review CI configuration**:
   - Check `.github/workflows/ci-cd.yml` for test configuration
   - Ensure all test types are included in the pipeline

2. **Test CI locally**:
   - Run the same test commands locally before pushing
   - Use the same Node.js version as the CI environment

3. **Monitor CI test results**:
   - Review test artifacts and reports from CI runs
   - Address failing tests promptly

4. **Update CI configuration when needed**:
   - When adding new test types or dependencies
   - When changing test output formats or locations