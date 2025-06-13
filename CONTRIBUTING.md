
# Contributing to Audityzer

Thank you for your interest in contributing to Audityzer! This guide will help you understand our development process, branching strategy, and how to submit contributions effectively.

## 🌟 Getting Started

### Prerequisites
- Node.js >= 16.0.0
- Git
- Basic understanding of Web3/blockchain concepts
- Familiarity with JavaScript/TypeScript

### Development Environment Setup
```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/your-username/audityzer.git
cd audityzer

# 3. Add upstream remote
git remote add upstream https://github.com/Audityzer/audityzer.git

# 4. Install dependencies
npm install

# 5. Run setup wizard
npm run setup

# 6. Start development server
npm run dev
```

## 🔄 Branching Strategy

### Branch Hierarchy
```
main (production)
├── unified-main (stable + latest features)
├── safe-improvements (stability focus)
├── roadmap-exec (cutting-edge features)
└── develop (feature integration)
    ├── feature/bridge-testing
    ├── feature/ai-improvements
    └── feature/dashboard-updates
```

### Branch Descriptions

#### `main`
- **Purpose**: Production-ready, stable releases
- **Protection**: Requires PR approval and CI/CD passing
- **Merge Source**: `unified-main` only
- **Release**: Tagged releases for npm/Docker

#### `unified-main`
- **Purpose**: Latest stable features combined with reliability
- **Protection**: Requires PR approval and comprehensive testing
- **Merge Source**: `safe-improvements` + `roadmap-exec`
- **Testing**: Full test suite + security audits

#### `safe-improvements`
- **Purpose**: Stability-focused improvements and bug fixes
- **Protection**: Requires PR approval
- **Merge Source**: `develop` + hotfixes
- **Focus**: Performance, reliability, security patches

#### `roadmap-exec`
- **Purpose**: Latest features and experimental capabilities
- **Protection**: Requires PR approval
- **Merge Source**: `develop` + feature branches
- **Focus**: Innovation, new features, cutting-edge tech

#### `develop`
- **Purpose**: Integration branch for feature development
- **Protection**: Basic CI/CD checks
- **Merge Source**: Feature branches
- **Testing**: Unit tests + integration tests

### Feature Branches
- **Naming**: `feature/description-of-feature`
- **Source**: Branch from `develop`
- **Merge Target**: `develop`
- **Lifecycle**: Delete after merge

## 🚀 Development Workflow

### 1. Creating a Feature Branch
```bash
# Update your local repository
git checkout develop
git pull upstream develop

# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Push branch to your fork
git push -u origin feature/your-feature-name
```

### 2. Development Process
```bash
# Make your changes
# Write tests for new functionality
# Update documentation

# Run tests locally
npm test
npm run test:security
npm run lint

# Commit changes with conventional commits
git add .
git commit -m "feat: add cross-chain bridge testing for Arbitrum"
```

### 3. Submitting a Pull Request
```bash
# Push your changes
git push origin feature/your-feature-name

# Create PR on GitHub targeting 'develop' branch
# Fill out the PR template completely
# Request review from maintainers
```

## 📝 Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear commit history:

### Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

### Examples
```bash
feat(bridge): add LayerZero cross-chain testing support
fix(ai): resolve vulnerability detection false positives
docs(api): update bridge testing documentation
test(security): add comprehensive DeFi protocol tests
```

## 🧪 Testing Guidelines

### Test Categories
1. **Unit Tests**: Individual function/module testing
2. **Integration Tests**: Component interaction testing
3. **E2E Tests**: Full application workflow testing
4. **Security Tests**: Vulnerability and exploit testing

### Running Tests
```bash
# All tests
npm test

# Specific categories
npm run test:unit
npm run test:integration
npm run test:e2e
npm run test:security

# With coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### Writing Tests
```javascript
// Example unit test
describe('Bridge Testing', () => {
  test('should validate LayerZero bridge configuration', async () => {
    const config = {
      sourceChain: 'ethereum',
      targetChain: 'polygon',
      protocol: 'layerzero'
    };
    
    const result = await validateBridgeConfig(config);
    expect(result.isValid).toBe(true);
  });
});

// Example security test
describe('Security Tests', () => {
  test('should detect reentrancy vulnerability', async () => {
    const contractCode = `
      // Vulnerable contract code
    `;
    
    const vulnerabilities = await auditContract(contractCode);
    expect(vulnerabilities).toContainEqual(
      expect.objectContaining({
        type: 'reentrancy',
        severity: 'high'
      })
    );
  });
});
```

## 📚 Documentation Standards

### Code Documentation
- Use JSDoc for function documentation
- Include examples for complex functions
- Document API endpoints with OpenAPI/Swagger
- Keep README files updated

### Example JSDoc
```javascript
/**
 * Performs security audit on a smart contract
 * @param {string} contractAddress - The contract address to audit
 * @param {Object} options - Audit configuration options
 * @param {string[]} options.networks - Networks to test on
 * @param {boolean} options.deepScan - Enable deep vulnerability scanning
 * @returns {Promise<AuditResult>} Audit results with vulnerabilities
 * @example
 * const result = await auditContract('0x123...', {
 *   networks: ['ethereum', 'polygon'],
 *   deepScan: true
 * });
 */
async function auditContract(contractAddress, options = {}) {
  // Implementation
}
```

## 🔒 Security Guidelines

### Security-First Development
- Never commit sensitive data (API keys, private keys)
- Use environment variables for configuration
- Validate all inputs and sanitize outputs
- Follow OWASP security guidelines
- Regular dependency updates

### Security Testing
- All security-related features must include tests
- Test for common Web3 vulnerabilities
- Include fuzzing tests for critical components
- Document security assumptions

## 🎯 Feature Development Guidelines

### Cross-Chain Bridge Features
- Support multiple bridge protocols
- Include comprehensive testing
- Document integration steps
- Provide example configurations

### AI/ML Features
- Include model validation
- Document training data requirements
- Provide accuracy metrics
- Include fallback mechanisms

### Dashboard Features
- Ensure responsive design
- Include accessibility features
- Test across browsers
- Optimize for performance

## 📋 Pull Request Process

### PR Requirements
1. **Description**: Clear description of changes
2. **Testing**: All tests passing
3. **Documentation**: Updated documentation
4. **Security**: Security review if applicable
5. **Performance**: No performance regressions

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Security
- [ ] Security review completed
- [ ] No sensitive data exposed
- [ ] Input validation implemented

## Documentation
- [ ] Code comments updated
- [ ] README updated
- [ ] API documentation updated
```

### Review Process
1. **Automated Checks**: CI/CD pipeline must pass
2. **Code Review**: At least one maintainer approval
3. **Security Review**: Required for security-related changes
4. **Testing**: Comprehensive test coverage
5. **Documentation**: Updated documentation

## 🏆 Recognition

### Contributor Levels
- **Community Contributor**: First-time contributors
- **Regular Contributor**: Multiple merged PRs
- **Core Contributor**: Significant ongoing contributions
- **Maintainer**: Repository maintenance privileges

### Hall of Fame
Outstanding contributors are recognized in our [Hall of Fame](tests/security/HALL_OF_FAME.md).

## 🆘 Getting Help

### Communication Channels
- **Discord**: [Join our Discord](https://discord.gg/audityzer)
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and community discussion
- **Email**: maintainers@audityzer.com

### Mentorship Program
New contributors can request mentorship through our Discord community.

## 📜 Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## 🎉 Thank You!

Your contributions make Audityzer better for everyone. We appreciate your time and effort in improving Web3 security!

---

**Happy Contributing! 🚀**
