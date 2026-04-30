
# Audityzer GitHub Action

🛡️ **Automated Web3 Security Scanning for Your GitHub Repositories**

The official GitHub Action for [Audityzer](https://audityzer.com) - the leading Web3 security testing platform. Automatically scan your smart contracts for vulnerabilities on every push, pull request, and release.

## ✨ Features

- 🔍 **Comprehensive Security Analysis** - Detects reentrancy, access control, integer overflow, and 50+ other vulnerability types
- ⚡ **Lightning Fast** - Incremental scanning analyzes only changed files for rapid CI/CD integration
- 📊 **GitHub Security Integration** - Automatic SARIF upload to GitHub Security tab
- 💬 **Pull Request Comments** - Detailed vulnerability reports directly in your PRs
- 🎯 **Customizable Thresholds** - Fail builds based on severity levels
- 🔄 **Multi-Format Output** - SARIF, JSON, and HTML reports
- 🌍 **Multi-Language Support** - Solidity, Vyper, Cairo, and more

## 🚀 Quick Start

Add this action to your GitHub workflow:

```yaml
name: Security Scan

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run Audityzer Security Scan
        uses: audityzer/github-action@v1
        with:
          api-key: ${{ secrets.AUDITYZER_API_KEY }}
          fail-on-severity: 'HIGH'
          upload-to-github-security: 'true'
          comment-on-pr: 'true'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 📋 Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `api-key` | Your Audityzer API key | ✅ | - |
| `repository-url` | Repository URL (auto-detected) | ❌ | Auto-detected |
| `scan-path` | Path to scan for contracts | ❌ | `contracts/` |
| `fail-on-severity` | Fail build on severity level | ❌ | `HIGH` |
| `output-format` | Output format (sarif/json/html) | ❌ | `sarif` |
| `upload-to-github-security` | Upload to GitHub Security tab | ❌ | `true` |
| `comment-on-pr` | Comment on pull requests | ❌ | `true` |
| `incremental-scan` | Only scan changed files | ❌ | `true` |

## 📤 Outputs

| Output | Description |
|--------|-------------|
| `scan-results` | Complete scan results in JSON format |
| `vulnerabilities-found` | Total number of vulnerabilities |
| `critical-count` | Number of critical vulnerabilities |
| `high-count` | Number of high severity vulnerabilities |
| `scan-report-url` | URL to detailed scan report |

## 🔧 Configuration Examples

### Basic Setup
```yaml
- name: Security Scan
  uses: audityzer/github-action@v1
  with:
    api-key: ${{ secrets.AUDITYZER_API_KEY }}
```

### Advanced Configuration
```yaml
- name: Comprehensive Security Scan
  uses: audityzer/github-action@v1
  with:
    api-key: ${{ secrets.AUDITYZER_API_KEY }}
    scan-path: 'src/contracts/'
    fail-on-severity: 'MEDIUM'
    output-format: 'json'
    incremental-scan: 'false'
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Multi-Project Setup
```yaml
strategy:
  matrix:
    project: [defi-core, nft-marketplace, governance]
steps:
  - name: Scan ${{ matrix.project }}
    uses: audityzer/github-action@v1
    with:
      api-key: ${{ secrets.AUDITYZER_API_KEY }}
      scan-path: 'packages/${{ matrix.project }}/contracts/'
```

## 🔑 Getting Your API Key

1. Sign up at [audityzer.com](https://audityzer.com)
2. Navigate to Settings → API Keys
3. Generate a new API key
4. Add it to your repository secrets as `AUDITYZER_API_KEY`

## 📊 GitHub Security Integration

When `upload-to-github-security` is enabled, scan results automatically appear in:

- **Security Tab** - View all vulnerabilities in GitHub's security overview
- **Pull Request Checks** - See security status directly in PR status checks
- **Code Scanning Alerts** - Get notified about new vulnerabilities

## 💬 Pull Request Comments

Enable `comment-on-pr` to get detailed vulnerability reports as PR comments:

```
🔴 Audityzer Security Scan Results

Summary:
- 🔴 Critical: 1
- 🟠 High: 2
- 🟡 Medium: 3
- 🟢 Low: 1

Top Issues:
- 🔴 Reentrancy Vulnerability in contracts/Token.sol
  External call without reentrancy protection detected
```

## 🎯 Severity Levels

- **CRITICAL** - Immediate action required, funds at risk
- **HIGH** - Significant security concern
- **MEDIUM** - Moderate security issue
- **LOW** - Minor improvement recommended

## 🔄 Incremental Scanning

Speed up your CI/CD pipeline with incremental scanning:

- **Pull Requests** - Only scans files changed in the PR
- **Push Events** - Analyzes commits since last scan
- **Full Scans** - Complete repository analysis on demand

## 📈 Performance Metrics

- **Average Scan Time** - 15-30 seconds for typical projects
- **Incremental Scans** - 70% faster than full scans
- **Cache Hit Rate** - 85%+ for unchanged files

## 🛠️ Troubleshooting

### Common Issues

**No Solidity files found**
```yaml
with:
  scan-path: 'path/to/your/contracts/'
```

**API key not working**
- Verify the API key is correctly set in repository secrets
- Check that the key hasn't expired

**Scan timing out**
- Use incremental scanning for large repositories
- Consider splitting into multiple jobs

### Debug Mode
Enable verbose logging:
```yaml
env:
  ACTIONS_STEP_DEBUG: true
```

## 🤝 Support

- 📚 [Documentation](https://docs.audityzer.com)
- 💬 [Discord Community](https://discord.gg/audityzer)
- 📧 [Email Support](mailto:support@audityzer.com)
- 🐛 [Report Issues](https://github.com/audityzer/github-action/issues)

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by the Audityzer Team**

*Secure your Web3 projects with confidence*
