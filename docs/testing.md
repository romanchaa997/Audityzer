# 🧪 Testing Guide

## Overview

Audityzer includes a comprehensive testing framework designed to validate all components of the AI-powered vulnerability detection system. This guide covers testing strategies, tools, and best practices.

## Testing Architecture

```
Testing Framework
├── Unit Tests
│   ├── AI Components
│   ├── Core Modules
│   └── Utilities
├── Integration Tests
│   ├── Component Integration
│   ├── API Integration
│   └── Database Integration
├── End-to-End Tests
│   ├── Full Workflow Tests
│   ├── User Journey Tests
│   └── Performance Tests
└── AI-Specific Tests
    ├── Model Validation
    ├── Feature Engineering
    ├── Classification Accuracy
    └── Remediation Quality
```

## Quick Start

### Prerequisites

- Node.js v16+
- npm v9+
- Jest testing framework

### Running Tests

```bash
# Check test environment
npm run status

# Run all tests
npm test

# Run AI-specific tests
npm run test:ai-comprehensive

# Run with coverage
npm run test:coverage
```

## Test Categories

### 1. Basic Tests

**Purpose**: Validate fundamental functionality and environment setup

```bash
# Run basic tests
npm run test:ai-basic

# Individual basic tests
npx jest test/core/ai-vulnerability-detection-tests/jest-basic.test.js
npx jest test/core/ai-vulnerability-detection-tests/setup.test.js
```

**Coverage**:
- ✅ Jest functionality verification
- ✅ Environment setup validation
- ✅ Module accessibility checks
- ✅ Configuration loading

### 2. AI Component Tests

**Purpose**: Validate AI-powered vulnerability detection components

```bash
# Run all AI component tests
npm run test:ai-comprehensive

# Run specific component tests
npm run test:ai-classifier     # Vulnerability classification
npm run test:ai-features       # Feature engineering
npm run test:ai-remediation    # Remediation generation
```

**Coverage**:
- ✅ Vulnerability classification accuracy
- ✅ Feature extraction completeness
- ✅ Remediation generation quality
- ✅ Performance benchmarks

### 3. Integration Tests

**Purpose**: Validate component interactions and workflows

```bash
# Run integration tests
npm run test:integration

# Run specific integration scenarios
npx jest test/integration/ai-workflow.test.js
npx jest test/integration/mcp-integration.test.js
```

**Coverage**:
- ✅ Component interdependencies
- ✅ Data flow validation
- ✅ Error propagation
- ✅ Configuration inheritance

### 4. Performance Tests

**Purpose**: Validate system performance and resource usage

```bash
# Run performance tests
npm run test:performance

# Run load tests
npm run test:load
```

**Coverage**:
- ✅ Response time benchmarks
- ✅ Memory usage validation
- ✅ Concurrent operation handling
- ✅ Resource cleanup verification

## AI-Specific Testing

### Vulnerability Classification Testing

#### Test Structure

```javascript
describe('VulnerabilityClassifier', () => {
  let classifier;

  beforeEach(() => {
    classifier = new VulnerabilityClassifier({
      confidenceThreshold: 0.75
    });
  });

  describe('reentrancy detection', () => {
    it('should detect reentrancy vulnerabilities with high confidence', () => {
      const vulnerability = {
        name: 'Reentrancy Test',
        description: 'reentrancy vulnerability with external call after state change',
        code: 'function withdraw() { msg.sender.call{value: amount}(""); balance = 0; }'
      };

      const result = classifier.classifyVulnerability(vulnerability);
      
      expect(result.classification).toBe('REENTRANCY');
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });
});
```

#### Test Data Sets

```javascript
// Positive test cases
const reentrancyVulnerabilities = [
  {
    name: 'Classic Reentrancy',
    code: 'msg.sender.call{value: amount}(""); balance = 0;',
    expectedClassification: 'REENTRANCY',
    expectedConfidence: 0.9
  },
  {
    name: 'Withdraw Pattern',
    code: 'function withdraw() { require(balance > 0); msg.sender.call{value: balance}(""); }',
    expectedClassification: 'REENTRANCY',
    expectedConfidence: 0.8
  }
];

// Negative test cases
const safePatterns = [
  {
    name: 'Checks-Effects-Interactions',
    code: 'balance = 0; msg.sender.call{value: amount}("");',
    expectedClassification: 'SAFE',
    expectedConfidence: 0.1
  }
];
```

### Feature Engineering Testing

#### Test Structure

```javascript
describe('FeatureEngineering', () => {
  beforeEach(async () => {
    await FeatureEngineering.initialize({
      enabledExtractors: ['codeMetrics', 'patternMatches']
    });
  });

  describe('code metrics extraction', () => {
    it('should extract comprehensive code metrics', async () => {
      const contractCode = `
        contract Test {
          uint256 public balance;
          function withdraw() public {
            require(balance > 0);
            msg.sender.call{value: balance}("");
            balance = 0;
          }
        }
      `;

      const features = await FeatureEngineering.extractFeatures({
        contractCode,
        saveFeatures: false
      });

      expect(features.features.codeMetrics).toBeDefined();
      expect(features.features.codeMetrics.functionCount).toBe(1);
      expect(features.features.codeMetrics.stateVarCount).toBe(1);
    });
  });
});
```

### Remediation Testing

#### Test Structure

```javascript
describe('RemediationGenerator', () => {
  beforeEach(async () => {
    await RemediationGenerator.initialize({
      useAI: false, // Use templates for consistent testing
      templatePath: './test/fixtures/remediation-templates'
    });
  });

  describe('reentrancy remediation', () => {
    it('should generate appropriate remediation for reentrancy', async () => {
      const vulnerability = {
        type: 'reentrancy',
        severity: 'high',
        location: 'function withdraw()',
        code: 'msg.sender.call{value: amount}(""); balance = 0;'
      };

      const remediation = await RemediationGenerator.generateRemediation(vulnerability);

      expect(remediation.strategy).toContain('checks-effects-interactions');
      expect(remediation.code).toContain('balance = 0');
      expect(remediation.explanation).toBeDefined();
    });
  });
});
```

## Test Configuration

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000,
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/test-utils/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: [
    '<rootDir>/test/**/*.test.js'
  ],
  verbose: true,
  bail: false,
  maxWorkers: '50%'
};
```

### Environment Configuration

```javascript
// test/setup.js
const { config } = require('dotenv');

// Load test environment variables
config({ path: '.env.test' });

// Global test configuration
global.testConfig = {
  timeout: 30000,
  aiConfidenceThreshold: 0.25, // Lower threshold for testing
  enableMocks: true,
  logLevel: 'error' // Reduce noise in test output
};

// Mock external services in test environment
if (process.env.NODE_ENV === 'test') {
  jest.mock('external-ai-service', () => ({
    analyze: jest.fn().mockResolvedValue({ confidence: 0.8 })
  }));
}
```

### Test Environment Variables

```env
# .env.test
NODE_ENV=test
TEST_TIMEOUT=30000
AI_CONFIDENCE_THRESHOLD=0.25
ENABLE_AI_TESTS=true
MOCK_EXTERNAL_SERVICES=true
LOG_LEVEL=error
DB_URL=sqlite://memory
```

## Test Data Management

### Test Fixtures

```javascript
// test/fixtures/contracts.js
module.exports = {
  reentrancyVulnerable: `
    contract Vulnerable {
      mapping(address => uint256) public balances;
      
      function withdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0);
        msg.sender.call{value: amount}("");
        balances[msg.sender] = 0;
      }
    }
  `,
  
  reentrancySafe: `
    contract Safe {
      mapping(address => uint256) public balances;
      
      function withdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0);
        balances[msg.sender] = 0;
        msg.sender.call{value: amount}("");
      }
    }
  `
};
```

### Mock Data Generation

```javascript
// test/utils/mockData.js
function generateMockVulnerability(type = 'reentrancy') {
  const templates = {
    reentrancy: {
      name: 'Reentrancy Vulnerability',
      description: 'External call before state update',
      severity: 'high',
      code: 'msg.sender.call{value: amount}(""); balance = 0;'
    },
    accessControl: {
      name: 'Access Control Issue',
      description: 'Missing access control modifier',
      severity: 'medium',
      code: 'function sensitiveFunction() public { /* ... */ }'
    }
  };
  
  return templates[type] || templates.reentrancy;
}

function generateMockFeatures() {
  return {
    codeMetrics: {
      functionCount: 5,
      stateVarCount: 3,
      complexityScore: 8,
      normalizedComplexity: 0.8
    },
    patternMatches: {
      patternScores: {
        reentrancy: 0.8,
        accessControl: 0.2
      },
      vulnerabilityScores: {
        hasVulnerability: true,
        maxScore: 0.8,
        maxCategory: 'reentrancy'
      }
    }
  };
}
```

## Testing Strategies

### 1. Test-Driven Development (TDD)

```javascript
// Write test first
describe('New Feature', () => {
  it('should detect new vulnerability type', () => {
    const vulnerability = generateNewVulnerabilityType();
    const result = classifier.classifyVulnerability(vulnerability);
    expect(result.classification).toBe('NEW_TYPE');
  });
});

// Implement feature to make test pass
class VulnerabilityClassifier {
  classifyVulnerability(vulnerability) {
    // Implementation here
  }
}
```

### 2. Behavior-Driven Development (BDD)

```javascript
describe('Given a smart contract with reentrancy vulnerability', () => {
  describe('When analyzing the contract', () => {
    it('Then should classify as reentrancy with high confidence', () => {
      // Test implementation
    });
    
    it('Then should generate appropriate remediation', () => {
      // Test implementation
    });
  });
});
```

### 3. Property-Based Testing

```javascript
const fc = require('fast-check');

describe('Property-based tests', () => {
  it('should always return confidence between 0 and 1', () => {
    fc.assert(fc.property(
      fc.string(), // Random contract code
      (contractCode) => {
        const result = classifier.classifyVulnerability({ code: contractCode });
        return result.confidence >= 0 && result.confidence <= 1;
      }
    ));
  });
});
```

## Performance Testing

### Benchmark Tests

```javascript
describe('Performance benchmarks', () => {
  it('should classify vulnerability within acceptable time', async () => {
    const startTime = Date.now();
    
    const result = classifier.classifyVulnerability(largeContract);
    
    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(5000); // 5 seconds max
  });
  
  it('should handle concurrent classifications', async () => {
    const promises = Array(10).fill().map(() => 
      classifier.classifyVulnerability(testContract)
    );
    
    const results = await Promise.all(promises);
    expect(results).toHaveLength(10);
    results.forEach(result => {
      expect(result.classification).toBeDefined();
    });
  });
});
```

### Memory Usage Tests

```javascript
describe('Memory usage', () => {
  it('should not leak memory during batch processing', async () => {
    const initialMemory = process.memoryUsage().heapUsed;
    
    // Process many contracts
    for (let i = 0; i < 100; i++) {
      await FeatureEngineering.extractFeatures({
        contractCode: generateRandomContract()
      });
    }
    
    // Force garbage collection
    if (global.gc) global.gc();
    
    const finalMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = finalMemory - initialMemory;
    
    // Memory increase should be reasonable
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // 50MB
  });
});
```

## Test Automation

### Continuous Integration

```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Run AI tests
      run: npm run test:ai-comprehensive
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
```

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged && npm run test:quick",
      "pre-push": "npm run test:ai-validate"
    }
  },
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"]
  }
}
```

## Test Utilities

### Custom Matchers

```javascript
// test/utils/matchers.js
expect.extend({
  toBeValidClassification(received) {
    const validClassifications = [
      'REENTRANCY', 'ACCESS_CONTROL', 'ARITHMETIC', 'UNCHECKED_RETURN'
    ];
    
    const pass = validClassifications.includes(received);
    
    return {
      message: () => `expected ${received} to be a valid classification`,
      pass
    };
  },
  
  toHaveHighConfidence(received, threshold = 0.7) {
    const pass = received.confidence >= threshold;
    
    return {
      message: () => `expected confidence ${received.confidence} to be >= ${threshold}`,
      pass
    };
  }
});

// Usage in tests
expect(result.classification).toBeValidClassification();
expect(result).toHaveHighConfidence(0.8);
```

### Test Helpers

```javascript
// test/utils/helpers.js
class TestHelper {
  static async setupTestEnvironment() {
    // Initialize test database
    await this.initTestDB();
    
    // Setup mock services
    await this.setupMocks();
    
    // Load test fixtures
    await this.loadFixtures();
  }
  
  static async cleanupTestEnvironment() {
    // Clean up test data
    await this.cleanupTestDB();
    
    // Reset mocks
    jest.clearAllMocks();
  }
  
  static generateTestContract(vulnerabilityType) {
    const templates = {
      reentrancy: this.getReentrancyTemplate(),
      accessControl: this.getAccessControlTemplate()
    };
    
    return templates[vulnerabilityType] || templates.reentrancy;
  }
}
```

## Debugging Tests

### Debug Configuration

```javascript
// Enable debug mode
process.env.DEBUG = 'audityzer:test:*';

// Run specific test with debugging
npx jest --runInBand --detectOpenHandles test/specific.test.js
```

### Test Debugging Tools

```javascript
describe('Debug example', () => {
  it('should debug classification process', () => {
    // Enable detailed logging
    const classifier = new VulnerabilityClassifier({
      debug: true,
      logLevel: 'debug'
    });
    
    const result = classifier.classifyVulnerability(testVulnerability);
    
    // Log intermediate results
    console.log('Classification steps:', result.debugInfo);
    console.log('Pattern matches:', result.patternMatches);
    console.log('Confidence calculation:', result.confidenceBreakdown);
  });
});
```

## Test Reporting

### Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
open coverage/lcov-report/index.html

# Generate coverage badge
npm run coverage:badge
```

### Test Results

```javascript
// Custom test reporter
class CustomReporter {
  onRunComplete(contexts, results) {
    const summary = {
      total: results.numTotalTests,
      passed: results.numPassedTests,
      failed: results.numFailedTests,
      coverage: results.coverageMap?.getCoverageSummary()
    };
    
    console.log('Test Summary:', JSON.stringify(summary, null, 2));
    
    // Send to monitoring service
    this.sendToMonitoring(summary);
  }
}
```

## Best Practices

### Test Organization

1. **Group related tests** using `describe` blocks
2. **Use descriptive test names** that explain the expected behavior
3. **Keep tests independent** and isolated
4. **Use setup/teardown** for common initialization

### Test Data

1. **Use fixtures** for consistent test data
2. **Generate dynamic data** for property-based testing
3. **Mock external dependencies** to ensure test reliability
4. **Clean up test data** after each test

### Performance

1. **Run tests in parallel** when possible
2. **Use appropriate timeouts** for async operations
3. **Mock expensive operations** in unit tests
4. **Profile test performance** regularly

### Maintenance

1. **Keep tests up to date** with code changes
2. **Refactor tests** when refactoring code
3. **Remove obsolete tests** that no longer provide value
4. **Document complex test scenarios**

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Tests timeout | Long-running operations | Increase timeout or add mocks |
| Memory leaks | Improper cleanup | Add proper teardown |
| Flaky tests | Race conditions | Add proper synchronization |
| Slow tests | Expensive operations | Add mocking or optimization |

### Debug Commands

```bash
# Check test environment
npm run test:ai-status

# Debug specific test
npx jest --runInBand test/specific.test.js

# Run with verbose output
npx jest --verbose

# Run with coverage
npx jest --coverage
```

---

For more information, see:
- [AI Components Guide](./ai-components.md)
- [API Reference](./api-reference.md)
- [Configuration Guide](./configuration.md)