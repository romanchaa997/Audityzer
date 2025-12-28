# Audityzer Quick Start Guide

Get up and running with Audityzer in minutes!

## Installation in 30 Seconds

```bash
npm install -g audityzer
audityzer init
```

## Your First Audit

### 1. Basic Usage

```bash
# Analyze a smart contract
audityzer audit ./contracts/MyToken.sol

# Analyze a dApp
audityzer audit https://myapp.example.com
```

### 2. View Results

```bash
# Display report in terminal
audityzer report

# Open web dashboard
audityzer dashboard
```

## Common Commands

### Initialize Project
```bash
audityzer init
# This creates an Audityzer config file in your project
```

### Run a Security Audit
```bash
# Single file
audityzer audit contracts/MyContract.sol

# Multiple files
audityzer audit contracts/**/*.sol

# With specific checks
audityzer audit contracts/ --checks security,performance
```

### Generate Reports
```bash
# Terminal output
audityzer report --format text

# JSON output
audityzer report --format json > report.json

# HTML report
audityzer report --format html --output report.html
```

### API Usage
```javascript
const Audityzer = require('audityzer');

const auditor = new Audityzer({
  apiKey: 'your-api-key'
});

const results = await auditor.audit('contracts/Token.sol');
console.log(results);
```

## Configuration

Create an `audityzer.config.json` file in your project root:

```json
{
  "apiKey": "your-api-key",
  "checks": ["security", "performance", "code-quality"],
  "severity": "medium",
  "reportFormat": "html",
  "outputDir": "./reports"
}
```

## Example Workflow

### Smart Contract Audit

```bash
# 1. Create a new project
mkdir my-audit
cd my-audit

# 2. Initialize Audityzer
audityzer init

# 3. Add your contract
cp ~/Downloads/MyToken.sol ./contracts/

# 4. Run audit
audityzer audit contracts/MyToken.sol

# 5. View the report
audityzer report --format html
```

### Continuous Integration

Add to your CI/CD pipeline:

```yaml
# .github/workflows/audit.yml
name: Security Audit
on: [push, pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install -g audityzer
      - run: audityzer audit contracts/
```

## Understanding Results

Audityzer categorizes findings as:

- **Critical**: Immediate security risks
- **High**: Significant vulnerabilities
- **Medium**: Potential issues to investigate
- **Low**: Code quality suggestions
- **Info**: Informational findings

## Tips & Tricks

### Exclude Files
```bash
audityzer audit contracts/ --exclude "test,mock"
```

### Focus on Security Issues
```bash
audityzer audit contracts/ --severity critical,high
```

### Generate Markdown Report
```bash
audityzer report --format markdown > AUDIT_REPORT.md
```

### Watch Mode for Development
```bash
audityzer audit contracts/ --watch
```

## Getting Help

### View Command Help
```bash
audityzer --help
audityzer audit --help
```

### Check Version
```bash
audityzer --version
```

### Debug Mode
```bash
audityzer audit contracts/ --debug
```

## Next Steps

1. **Read the Installation Guide**: [INSTALLATION.md](INSTALLATION.md)
2. **Review the Pricing**: [PRICING.md](PRICING.md)
3. **Explore API Documentation**: [API.md](API.md)
4. **Join Community**: Visit [community.audityzer.dev](https://community.audityzer.dev)

## Troubleshooting

### "Command not found: audityzer"
Ensure Audityzer is installed:
```bash
npm install -g audityzer
```

### "API Key Invalid"
Verify your API key in the configuration or environment:
```bash
export AUDITYZER_API_KEY=your_actual_key
```

### "Permission Denied"
On Linux/macOS, you may need:
```bash
sudo npm install -g audityzer
```

## Resources

- **Documentation**: https://docs.audityzer.dev
- **GitHub**: https://github.com/romanchaa997/Audityzer
- **Issues**: https://github.com/romanchaa997/Audityzer/issues
- **Discussions**: https://github.com/romanchaa997/Audityzer/discussions

## Support

Need help? Contact us:
- Email: support@audityzer.dev
- Discord: [Join our community](https://discord.gg/audityzer)
- Twitter: [@audityzer](https://twitter.com/audityzer)
