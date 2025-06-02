# 🛡️ Audityzer - AI-Powered Smart Contract Security Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![Test Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)](./coverage)
[![AI Components](https://img.shields.io/badge/AI%20Components-4-blue)](./docs/ai-components.md)

> **Advanced AI-powered vulnerability detection and remediation for smart contracts with comprehensive testing framework and Model Context Protocol (MCP) integration.**

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd audityzer
npm install

# Check project status
npm run status

# Run comprehensive tests
npm run test:ai-comprehensive

# Start development
npm run dev
```

## ✨ Features

### 🤖 AI-Powered Analysis
- **Vulnerability Classification**: Advanced pattern matching and ML-based vulnerability detection
- **Feature Engineering**: Comprehensive code metrics and semantic analysis
- **Remediation Generation**: Automated fix suggestions with AI-powered recommendations
- **Exploit Generation**: Educational vulnerability examples and test case creation

### 🧪 Comprehensive Testing
- **95%+ Test Coverage**: Extensive test suite covering all components
- **AI Component Testing**: Specialized tests for ML models and AI features
- **Performance Benchmarks**: Load testing and performance validation
- **Integration Testing**: End-to-end workflow validation

### 📚 Rich Documentation
- **Component Guides**: Detailed documentation for all AI components
- **Testing Framework**: Comprehensive testing strategies and best practices
- **API Reference**: Complete API documentation with examples
- **Troubleshooting**: Detailed guides for common issues and solutions

### 🔧 Developer Tools
- **Status Monitoring**: Real-time project health and component status
- **Debug Tools**: Advanced debugging and profiling capabilities
- **Cleanup Scripts**: Automated project maintenance and optimization
- **Validation Tools**: Comprehensive fix validation and quality assurance

## 🏗️ Architecture

```
Audityzer Platform
├── 🤖 AI Components
│   ├── Vulnerability Classifier
│   ├── Feature Engineering
│   ├── Remediation Generator
│   └── Vulnerability Generator
├── 🧪 Testing Framework
│   ├── Unit Tests
│   ├── Integration Tests
│   ├── Performance Tests
│   └── AI-Specific Tests
├── 📡 MCP Integration
│   ├── Server Implementation
│   ├── Tool Definitions
│   └── Client Communication
└── 🛠️ Developer Tools
    ├── Status Monitoring
    ├── Debug Utilities
    ├── Cleanup Scripts
    └── Validation Tools
```

## 📦 Installation

### Prerequisites

- **Node.js**: v16.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: Latest version

### Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd audityzer

# 2. Install dependencies
npm install

# 3. Verify installation
npm run setup

# 4. Run final status check
npm run final-check
```

## 🎯 Usage

### Basic Analysis

```javascript
const {
  VulnerabilityClassifier,
  FeatureEngineering,
  RemediationGenerator
} = require('./src/core/ai-vulnerability-detection');

// Analyze smart contract
async function analyzeContract(contractCode) {
  // Extract features
  await FeatureEngineering.initialize();
  const features = await FeatureEngineering.extractFeatures({
    contractCode
  });

  // Classify vulnerabilities
  const classifier = new VulnerabilityClassifier();
  const classification = classifier.classifyVulnerability({
    code: contractCode,
    features: features.features
  });

  // Generate remediation
  if (classification.confidence > 0.7) {
    await RemediationGenerator.initialize();
    const remediation = await RemediationGenerator.generateRemediation({
      type: classification.classification.toLowerCase(),
      code: contractCode
    });
    
    return { classification, remediation };
  }

  return { classification };
}
```

### Testing

```bash
# Run all tests
npm test

# AI-specific tests
npm run test:ai-comprehensive
npm run test:ai-validate
npm run test:ai-status

# Performance tests
npm run test:performance

# Coverage report
npm run test:coverage
```

### Development

```bash
# Start development server
npm run dev

# Check project status
npm run status

# Debug tests
npm run test:ai-debug

# Clean up project
npm run cleanup
```

## 🧪 Testing Framework

### Test Categories

| Category | Command | Description |
|----------|---------|-------------|
| **Basic Tests** | `npm run test:ai-basic` | Environment and setup validation |
| **AI Components** | `npm run test:ai-comprehensive` | Full AI component testing |
| **Integration** | `npm run test:integration` | Component interaction testing |
| **Performance** | `npm run test:performance` | Load and performance testing |
| **Validation** | `npm run test:ai-validate` | Fix validation and quality assurance |

### Test Structure

```
test/
├── core/
│   └── ai-vulnerability-detection-tests/
│       ├── jest-basic.test.js
│       ├── setup.test.js
│       ├── vulnerability-classifier.test.js
│       ├── feature-engineering.test.js
│       ├── remediation-generator.test.js
│       └── README.md
├── integration/
│   ├── ai-workflow.test.js
│   └── mcp-integration.test.js
└── performance/
    ├── load-testing.test.js
    └── memory-usage.test.js
```

## 🤖 AI Components

### 1. Vulnerability Classifier

Classifies detected vulnerabilities using advanced pattern matching and ML techniques.

```javascript
const classifier = new VulnerabilityClassifier({
  confidenceThreshold: 0.75,
  enabledCategories: ['reentrancy', 'access-control', 'arithmetic']
});

const result = classifier.classifyVulnerability(vulnerability);
// Output: { classification: 'REENTRANCY', confidence: 0.85 }
```

**Supported Categories**: Reentrancy, Access Control, Arithmetic, Unchecked Returns, Front Running, DoS, tx.origin

### 2. Feature Engineering

Extracts comprehensive features from smart contracts for ML analysis.

```javascript
await FeatureEngineering.initialize({
  enabledExtractors: ['codeMetrics', 'patternMatches', 'semanticEmbeddings']
});

const features = await FeatureEngineering.extractFeatures({
  contractCode: sourceCode
});
```

**Feature Types**: Code Metrics, Pattern Matches, Semantic Embeddings

### 3. Remediation Generator

Generates automated fix suggestions and remediation strategies.

```javascript
await RemediationGenerator.initialize({
  useAI: true,
  confidenceThreshold: 0.8
});

const remediation = await RemediationGenerator.generateRemediation(vulnerability);
```

**Remediation Types**: Template-based, AI-powered, Custom strategies

### 4. Vulnerability Generator

Creates test cases, exploits, and educational content.

```javascript
const generator = new VulnerabilityGenerator();
const exploit = await generator.generateExploit(vulnerability);
```

**Generation Types**: Exploits, Test Cases, Educational Content

## 📊 Project Status

### Health Monitoring

```bash
# Comprehensive status check
npm run status

# Final validation
npm run final-check

# AI component status
npm run test:ai-status
```

### Quality Metrics

- ✅ **Test Coverage**: 95%+
- ✅ **AI Accuracy**: 85%+ confidence
- ✅ **Performance**: <5s analysis time
- ✅ **Documentation**: Complete guides
- ✅ **Error Handling**: Comprehensive coverage

## 🛠️ Developer Tools

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run status` | Check project health and component status |
| `npm run setup` | Initial project setup and validation |
| `npm run final-check` | Comprehensive final status validation |
| `npm run test:ai-comprehensive` | Run all AI component tests |
| `npm run test:ai-validate` | Validate all applied fixes |
| `npm run test:ai-debug` | Debug AI component issues |
| `npm run cleanup` | Clean up project and optimize structure |

### Debug Mode

```bash
# Enable debug output
DEBUG=audityzer:* npm run test:ai-comprehensive

# Debug specific component
DEBUG=audityzer:ai:classifier npm test
```

## 📚 Documentation

### Guides

- 📖 [AI Components Guide](./docs/ai-components.md) - Comprehensive AI component documentation
- 🧪 [Testing Guide](./docs/testing.md) - Testing strategies and best practices
- 🏗️ [Architecture Guide](./docs/architecture.md) - System architecture and design
- 🔧 [Configuration Guide](./docs/configuration.md) - Configuration options and setup

### API Reference

- 🔍 [Vulnerability Classifier API](./docs/api/vulnerability-classifier.md)
- ⚙️ [Feature Engineering API](./docs/api/feature-engineering.md)
- 🛠️ [Remediation Generator API](./docs/api/remediation-generator.md)
- 🎯 [Vulnerability Generator API](./docs/api/vulnerability-generator.md)

## 🚀 Performance

### Benchmarks

- **Analysis Speed**: <5 seconds per contract
- **Memory Usage**: <100MB for typical workloads
- **Concurrent Processing**: 10+ contracts simultaneously
- **Accuracy**: 85%+ vulnerability detection rate

### Optimization

```javascript
// Production configuration
const productionConfig = {
  featureEngineering: {
    enabledExtractors: ['codeMetrics', 'patternMatches'],
    cacheFeatures: true,
    batchSize: 10
  },
  classifier: {
    confidenceThreshold: 0.8,
    maxConcurrentClassifications: 5
  }
};
```

## 🔧 Configuration

### Environment Variables

```env
# AI Configuration
AI_CONFIDENCE_THRESHOLD=0.75
ENABLE_AI_FEATURES=true
AI_MODEL_ENDPOINT=https://api.openai.com/v1

# Testing Configuration
TEST_TIMEOUT=30000
ENABLE_PERFORMANCE_TESTS=true
LOG_LEVEL=info

# Development Configuration
NODE_ENV=development
DEBUG=audityzer:*
```

### Component Configuration

```javascript
// AI Components
const aiConfig = {
  vulnerabilityClassifier: {
    confidenceThreshold: 0.75,
    enabledCategories: ['all'],
    patternMatchingWeight: 0.6
  },
  featureEngineering: {
    enabledExtractors: ['codeMetrics', 'patternMatches'],
    cacheFeatures: true
  },
  remediationGenerator: {
    useAI: true,
    templatePath: './templates/remediations'
  }
};
```

## 🤝 Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch
3. **Implement** changes with tests
4. **Run** validation: `npm run test:ai-validate`
5. **Submit** pull request

### Code Standards

- **ESLint**: Enforced code style
- **Prettier**: Automated formatting
- **Jest**: Testing framework
- **JSDoc**: Documentation standards

### Testing Requirements

- ✅ Unit tests for all new features
- ✅ Integration tests for component interactions
- ✅ Performance tests for critical paths
- ✅ Documentation updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI**: AI model integration and support
- **Jest**: Comprehensive testing framework
- **Node.js Community**: Excellent ecosystem and tools
- **Security Researchers**: Vulnerability pattern research

## 📞 Support

### Getting Help

- 📖 **Documentation**: Check the [docs](./docs/) directory
- 🐛 **Issues**: Report bugs via GitHub Issues
- 💬 **Discussions**: Join community discussions
- 📧 **Contact**: Reach out to the development team

### Troubleshooting

```bash
# Check system status
npm run status

# Validate installation
npm run setup

# Debug issues
npm run test:ai-debug

# Get help
npm run help
```

---

**Built with ❤️ by the Audityzer Team**

*Making smart contract security accessible through AI-powered analysis and comprehensive testing.*