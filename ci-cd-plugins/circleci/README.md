
# Audityzer CircleCI Orb

🛡️ **Streamlined Web3 Security Scanning for CircleCI**

The official CircleCI Orb for [Audityzer](https://audityzer.com) - integrate comprehensive smart contract security scanning into your CircleCI workflows with minimal configuration.

## ✨ Features

- 🔍 **Comprehensive Security Analysis** - 50+ vulnerability detection patterns
- ⚡ **Lightning Fast** - Incremental scanning for rapid CI/CD integration  
- 📊 **Rich Reporting** - JSON, SARIF, and HTML output formats
- 🎯 **Configurable Thresholds** - Fail builds based on severity levels
- 🔄 **Pull Request Integration** - Scan only changed files in PRs
- 📈 **Artifacts & Storage** - Automatic result archiving
- 🌍 **Multi-Language Support** - Solidity, Vyper, Cairo, and more

## 🚀 Quick Start

### 1. Add the Orb to your config

```yaml
version: 2.1

orbs:
  audityzer: audityzer/security-scan@1.0.0

workflows:
  security:
    jobs:
      - audityzer/security-scan:
          context: audityzer-api
```

### 2. Set up your API key

1. Go to **Project Settings** → **Environment Variables**
2. Add `AUDITYZER_API_KEY` with your API key value
3. Or use a CircleCI Context for shared access across projects

### 3. Commit and watch it run

Your security scan will automatically run on every push!

## 📋 Configuration Options

### Job Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `api-key` | env_var_name | `AUDITYZER_API_KEY` | Environment variable with API key |
| `scan-path` | string | `contracts/` | Path to scan for smart contracts |
| `output-format` | enum | `json` | Output format (`json`, `sarif`, `html`) |
| `incremental` | boolean | `true` | Enable incremental scanning |
| `fail-on-severity` | enum | `HIGH` | Severity threshold (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, `NONE`) |
| `base-branch` | string | `main` | Base branch for incremental comparison |
| `cli-version` | string | `latest` | Audityzer CLI version |

## 🔧 Usage Examples

### Basic Security Scan

```yaml
version: 2.1

orbs:
  audityzer: audityzer/security-scan@1.0.0

workflows:
  main:
    jobs:
      - audityzer/security-scan:
          context: audityzer-api
```

### Advanced Configuration

```yaml
version: 2.1

orbs:
  audityzer: audityzer/security-scan@1.0.0

workflows:
  security:
    jobs:
      - audityzer/security-scan:
          name: comprehensive-scan
          context: audityzer-api
          scan-path: "src/contracts/"
          output-format: "html"
          fail-on-severity: "MEDIUM"
          incremental: false
```

### Multi-Project Scanning

```yaml
version: 2.1

orbs:
  audityzer: audityzer/security-scan@1.0.0

workflows:
  security:
    jobs:
      # Scan DeFi contracts
      - audityzer/security-scan:
          name: scan-defi
          context: audityzer-api
          scan-path: "packages/defi/contracts/"
          
      # Scan NFT contracts
      - audityzer/security-scan:
          name: scan-nft
          context: audityzer-api
          scan-path: "packages/nft/contracts/"
          
      # Scan governance contracts
      - audityzer/security-scan:
          name: scan-governance
          context: audityzer-api
          scan-path: "packages/governance/contracts/"
          fail-on-severity: "CRITICAL"
```

### Conditional Scanning

```yaml
version: 2.1

orbs:
  audityzer: audityzer/security-scan@1.0.0

workflows:
  security:
    jobs:
      # Quick scan for PRs
      - audityzer/security-scan:
          name: pr-scan
          context: audityzer-api
          incremental: true
          filters:
            branches:
              ignore: main
              
      # Full scan for main branch
      - audityzer/security-scan:
          name: main-scan
          context: audityzer-api
          incremental: false
          fail-on-severity: "HIGH"
          filters:
            branches:
              only: main
```

### Integration with Other Jobs

```yaml
version: 2.1

orbs:
  audityzer: audityzer/security-scan@1.0.0

jobs:
  test:
    docker:
      - image: cimg/node:18.16
    steps:
      - checkout
      - run: npm test
      
  deploy:
    docker:
      - image: cimg/node:18.16
    steps:
      - checkout
      - run: npm run deploy

workflows:
  main:
    jobs:
      - test
      - audityzer/security-scan:
          context: audityzer-api
          requires:
            - test
      - deploy:
          requires:
            - audityzer/security-scan
          filters:
            branches:
              only: main
```

## 📊 Output Formats & Artifacts

### JSON Output
```json
{
  "vulnerabilities": [
    {
      "type": "REENTRANCY",
      "severity": "HIGH",
      "title": "Potential Reentrancy Attack",
      "description": "External call without reentrancy protection",
      "filePath": "contracts/Token.sol",
      "lineNumber": 45,
      "recommendation": "Use ReentrancyGuard modifier"
    }
  ],
  "metrics": {
    "scanTime": 1250,
    "filesScanned": 8
  }
}
```

### SARIF Output
Compatible with GitHub Security tab and other SARIF-consuming tools.

### HTML Output
Rich, interactive report with:
- Executive summary
- Vulnerability details with code snippets
- Severity distributions
- Recommendations

### Artifacts
All scan results are automatically stored as CircleCI artifacts:
- Available in the **Artifacts** tab of each job
- Downloadable for offline analysis
- Preserved according to your retention policy

## 🎯 Severity Levels & Thresholds

| Severity | Description | Recommended Action |
|----------|-------------|-------------------|
| 🔴 **CRITICAL** | Funds at immediate risk | Block deployment |
| 🟠 **HIGH** | Significant security flaw | Review before merge |
| 🟡 **MEDIUM** | Moderate security concern | Address in next sprint |
| 🟢 **LOW** | Best practice improvement | Consider for future |

### Threshold Behavior

- **CRITICAL**: Fail only on critical issues
- **HIGH**: Fail on critical OR high issues  
- **MEDIUM**: Fail on critical, high, OR medium issues
- **LOW**: Fail on any vulnerability
- **NONE**: Never fail (report only)

## 🔄 Incremental Scanning

Boost your CI/CD performance with smart incremental scanning:

### How It Works

**Pull Requests**: Compares against target branch
```bash
git diff origin/main...HEAD --name-only | grep -E '\.(sol|vy|cairo)$'
```

**Feature Branches**: Compares against main branch
```bash  
git diff origin/main...HEAD --name-only | grep -E '\.(sol|vy|cairo)$'
```

**Main Branch**: Compares against previous commit
```bash
git diff HEAD~1..HEAD --name-only | grep -E '\.(sol|vy|cairo)$'
```

### Performance Impact
- **70% faster** scan times for typical changes
- **Sub-30 second** scans for single file changes
- **Automatic fallback** to full scan when needed

## 📈 Performance Metrics

### Typical Scan Times
- **Small project** (1-5 contracts): 15-30 seconds
- **Medium project** (6-20 contracts): 30-60 seconds  
- **Large project** (21+ contracts): 1-3 minutes
- **Incremental scans**: 70% faster than full scans

### Resource Usage
- **CPU**: Low impact on CircleCI credits
- **Memory**: ~512MB peak usage
- **Storage**: Minimal artifact size

## 🔑 API Key Management

### Getting Your API Key

1. Sign up at [audityzer.com](https://audityzer.com)
2. Navigate to **Settings** → **API Keys**
3. Generate a new API key for CircleCI
4. Copy the key for environment variable setup

### Environment Variable Setup

#### Project Level
1. Go to **Project Settings** → **Environment Variables**
2. Click **Add Environment Variable**
3. Name: `AUDITYZER_API_KEY`
4. Value: Your API key

#### Context Level (Recommended)
1. Go to **Organization Settings** → **Contexts**
2. Create or select a context (e.g., `audityzer-api`)
3. Add environment variable: `AUDITYZER_API_KEY`
4. Use context in your workflow:
   ```yaml
   - audityzer/security-scan:
       context: audityzer-api
   ```

### Security Best Practices
- Use contexts for shared API keys
- Rotate keys regularly (every 90 days)
- Use different keys for different environments
- Monitor API key usage in Audityzer dashboard

## 🛠️ Advanced Usage

### Custom Commands

Use individual Orb commands for custom workflows:

```yaml
version: 2.1

orbs:
  audityzer: audityzer/security-scan@1.0.0

jobs:
  custom-security-job:
    executor: audityzer/default
    steps:
      - checkout
      - audityzer/install-cli:
          version: "1.2.0"
      - audityzer/find-contracts:
          scan-path: "custom/path/"
      - audityzer/scan:
          api-key: AUDITYZER_API_KEY
          scan-path: "custom/path/"
          fail-on-severity: "CRITICAL"
      - audityzer/process-results:
          output-format: "json"
          fail-on-severity: "CRITICAL"
```

### Integration with Slack

```yaml
version: 2.1

orbs:
  audityzer: audityzer/security-scan@1.0.0
  slack: circleci/slack@4.10.1

workflows:
  security:
    jobs:
      - audityzer/security-scan:
          context: audityzer-api
          post-steps:
            - slack/notify:
                event: fail
                template: basic_fail_1
            - slack/notify:
                event: pass
                custom: |
                  {
                    "blocks": [
                      {
                        "type": "section",
                        "text": {
                          "type": "mrkdwn",
                          "text": "✅ Security scan passed!\nVulnerabilities found: $AUDITYZER_TOTAL_VULNS"
                        }
                      }
                    ]
                  }
```

### Dependency Caching

```yaml
jobs:
  custom-scan:
    executor: audityzer/default
    steps:
      - checkout
      - restore_cache:
          keys:
            - audityzer-cli-v1-{{ checksum "package-lock.json" }}
            - audityzer-cli-v1-
      - audityzer/install-cli
      - save_cache:
          key: audityzer-cli-v1-{{ checksum "package-lock.json" }}
          paths:
            - ~/.npm
      # ... rest of job
```

## 🐛 Troubleshooting

### Common Issues

**No smart contracts found**
```yaml
- audityzer/security-scan:
    scan-path: "path/to/your/contracts/"
```

**API authentication failed**
- Verify `AUDITYZER_API_KEY` is set correctly
- Check that the API key hasn't expired
- Ensure you're using the correct context

**Scan timeout**
```yaml
- audityzer/security-scan:
    incremental: true  # Enable for faster scans
```

**CLI installation failed**
```yaml
- audityzer/install-cli:
    version: "1.0.0"  # Use specific version
```

### Debug Mode

Enable verbose logging for troubleshooting:

```yaml
jobs:
  debug-scan:
    executor: audityzer/default
    environment:
      AUDITYZER_DEBUG: true
    steps:
      - checkout
      - audityzer/security-scan
```

### Support Resources

- 📚 [CircleCI Orb Documentation](https://circleci.com/docs/2.0/orb-intro/)
- 🛡️ [Audityzer Documentation](https://docs.audityzer.com)
- 💬 [Community Discord](https://discord.gg/audityzer)
- 🐛 [Report Issues](https://github.com/audityzer/circleci-orb/issues)

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by the Audityzer Team**

*Secure your Web3 projects with CircleCI automation*
