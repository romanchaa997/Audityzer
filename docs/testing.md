
# Testing Guide

This guide covers the comprehensive testing framework implemented in Audityzer.

## Overview

Audityzer uses a multi-layered testing approach:

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions
- **End-to-End Tests**: Test complete user workflows
- **Security Tests**: Validate security features

## Testing Framework

### Technologies Used

- **Vitest**: Fast unit and integration testing
- **Playwright**: End-to-end browser testing
- **MSW**: API mocking for tests
- **Testing Library**: Component testing utilities

### Test Structure

```
tests/
├── unit/                 # Unit tests
│   ├── core/            # Core functionality tests
│   └── utils/           # Utility function tests
├── integration/         # Integration tests
│   ├── cli.test.ts      # CLI integration tests
│   └── api.test.ts      # API integration tests
├── e2e/                 # End-to-end tests
│   ├── audit-flow.test.ts
│   └── playwright.config.ts
├── fixtures/            # Test data and mocks
└── setup/              # Test configuration
```

## Running Tests

### Unit Tests

```bash
# Run all unit tests
npm run test:unit

# Run with watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Integration Tests

```bash
# Run integration tests
npm run test:integration

# Run specific integration test
npm run test:integration -- cli.test.ts
```

### End-to-End Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode
npm run test:e2e -- --headed

# Run specific browser
npm run test:e2e -- --project=chromium
```

### All Tests

```bash
# Run complete test suite
npm run test:all

# Run tests in CI mode
npm run ci
```

## Test Configuration

### Vitest Configuration

The Vitest configuration is in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./tests/setup/vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov'],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70
        }
      }
    }
  }
});
```

### Playwright Configuration

E2E tests are configured in `tests/e2e/playwright.config.ts`:

```typescript
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:5000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  }
});
```

## Writing Tests

### Unit Test Example

```typescript
import { describe, it, expect, vi } from 'vitest';
import { Auditor } from '@core/auditor';

describe('Auditor', () => {
  it('should create auditor with valid config', () => {
    const config = {
      target: 'https://example.com',
      rules: ['security'],
      output: './output',
      format: 'json'
    };
    
    const auditor = new Auditor(config);
    expect(auditor.config).toEqual(config);
  });
});
```

### Integration Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';

describe('CLI Integration', () => {
  it('should show help', () => {
    const output = execSync('node bin/audityzer.js --help', { 
      encoding: 'utf8' 
    });
    expect(output).toContain('Usage:');
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('audit flow', async ({ page }) => {
  await page.goto('/');
  
  await page.fill('[data-testid="url-input"]', 'https://example.com');
  await page.click('[data-testid="start-audit"]');
  
  await expect(page.locator('[data-testid="audit-results"]'))
    .toBeVisible({ timeout: 30000 });
});
```

## Mocking

### API Mocking with MSW

```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('/api/audit', (req, res, ctx) => {
    return res(ctx.json({ 
      id: 'test-audit',
      status: 'completed',
      score: 85 
    }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Function Mocking

```typescript
import { vi } from 'vitest';

// Mock external dependency
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn()
  }
}));

// Mock implementation
const mockAxios = vi.mocked(axios);
mockAxios.get.mockResolvedValue({ data: { result: 'success' } });
```

## Coverage Reports

Coverage reports are generated in multiple formats:

- **HTML**: `coverage/index.html` - Interactive browser report
- **LCOV**: `coverage/lcov.info` - For CI integration
- **JSON**: `coverage/coverage.json` - Machine-readable format
- **Text**: Console output during test runs

### Coverage Thresholds

Current coverage thresholds:
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## Continuous Integration

### GitHub Actions

Tests run automatically on:
- Pull requests
- Pushes to main/develop branches
- Scheduled runs (daily)

### Test Artifacts

CI uploads test artifacts:
- Test results (JUnit XML)
- Coverage reports
- E2E screenshots/videos (on failure)
- Playwright traces

## Best Practices

### Test Organization

1. **Group related tests** using `describe` blocks
2. **Use descriptive test names** that explain the expected behavior
3. **Follow AAA pattern**: Arrange, Act, Assert
4. **Keep tests independent** - no shared state between tests

### Test Data

1. **Use fixtures** for complex test data
2. **Create factories** for generating test objects
3. **Mock external dependencies** to ensure test isolation
4. **Use realistic data** that represents actual usage

### Performance

1. **Run unit tests frequently** during development
2. **Use watch mode** for rapid feedback
3. **Parallelize tests** where possible
4. **Mock expensive operations** in unit tests

### Debugging

1. **Use `test.only`** to focus on specific tests
2. **Add `console.log`** for debugging (remove before commit)
3. **Use debugger** with `--inspect` flag
4. **Check test artifacts** for E2E test failures

## Troubleshooting

### Common Issues

#### Tests timing out
```bash
# Increase timeout for specific tests
test('slow operation', async () => {
  // test code
}, { timeout: 30000 });
```

#### Module resolution errors
```bash
# Check path aliases in vitest.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
  }
}
```

#### E2E tests failing in CI
```bash
# Use headless mode and proper wait conditions
await expect(page.locator('[data-testid="element"]'))
  .toBeVisible({ timeout: 10000 });
```

### Getting Help

1. Check the [test examples](../tests/) for reference
2. Review [Vitest documentation](https://vitest.dev/)
3. Check [Playwright documentation](https://playwright.dev/)
4. Open an issue on GitHub for test-specific problems

## Test Maintenance

### Regular Tasks

1. **Update snapshots** when UI changes
2. **Review coverage reports** and add tests for uncovered code
3. **Update test dependencies** regularly
4. **Clean up obsolete tests** when features are removed

### Performance Monitoring

Monitor test performance:
- Test execution time
- Coverage percentage
- Flaky test detection
- CI build duration

Use `npm run test:coverage` to generate detailed reports and identify areas needing more test coverage.
