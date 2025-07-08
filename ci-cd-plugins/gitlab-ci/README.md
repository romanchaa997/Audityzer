
# Audityzer GitLab CI/CD Integration

🛡️ **Automated Web3 Security Scanning for Your GitLab Repositories**

The official GitLab CI/CD template for [Audityzer](https://audityzer.com) - seamlessly integrate Web3 security scanning into your GitLab pipelines.

## ✨ Features

- 🔍 **Comprehensive Security Analysis** - 50+ vulnerability detection patterns
- ⚡ **Incremental Scanning** - Only scan changed files for faster pipelines
- 📊 **GitLab Security Dashboard** - Native SAST integration
- 💬 **Merge Request Integration** - Security reports in MR discussions
- 🎯 **Configurable Thresholds** - Fail pipelines based on severity
- 🔄 **Multi-Format Output** - GitLab SAST, JSON, SARIF reports
- 🌍 **Multi-Language Support** - Solidity, Vyper, Cairo

## 🚀 Quick Start

### 1. Add to your `.gitlab-ci.yml`

```yaml
include:
  - remote: 'https://raw.githubusercontent.com/audityzer/gitlab-ci/main/audityzer-security-scan.yml'

# Add your security scan job
audityzer_security_scan:
  extends: .audityzer_scan
  variables:
    SCAN_PATH: "contracts/"
    FAIL_ON_SEVERITY: "HIGH"
```

### 2. Set up your API key

Add your Audityzer API key as a GitLab CI/CD variable:

1. Go to **Settings** → **CI/CD** → **Variables**
2. Add variable: `AUDITYZER_API_KEY`
3. Set the value to your API key
4. Mark as **Protected** and **Masked**

### 3. Run your pipeline

The security scan will automatically run on:
- Merge requests
- Pushes to default branch
- Tagged releases

## 📋 Configuration Variables

| Variable | Description | Default | Options |
|----------|-------------|---------|---------|
| `AUDITYZER_API_KEY` | Your API key (required) | - | String |
| `SCAN_PATH` | Path to scan for contracts | `contracts/` | Directory path |
| `FAIL_ON_SEVERITY` | Fail pipeline on severity | `HIGH` | `CRITICAL`, `HIGH`, `MEDIUM`, `LOW` |
| `OUTPUT_FORMAT` | Output format | `json` | `json`, `sarif`, `gitlab-sast` |
| `INCREMENTAL_SCAN` | Only scan changed files | `true` | `true`, `false` |
| `UPLOAD_TO_GITLAB_SECURITY` | Upload to Security Dashboard | `true` | `true`, `false` |

## 🔧 Usage Examples

### Basic Setup
```yaml
include:
  - remote: 'https://raw.githubusercontent.com/audityzer/gitlab-ci/main/audityzer-security-scan.yml'

security_scan:
  extends: .audityzer_scan
```

### Custom Configuration
```yaml
defi_security_scan:
  extends: .audityzer_scan
  variables:
    SCAN_PATH: "src/contracts/"
    FAIL_ON_SEVERITY: "MEDIUM"
    INCREMENTAL_SCAN: "false"
```

### Multi-Project Scanning
```yaml
frontend_contracts:
  extends: .audityzer_scan
  variables:
    SCAN_PATH: "packages/frontend/contracts/"

backend_contracts:
  extends: .audityzer_scan
  variables:
    SCAN_PATH: "packages/backend/contracts/"
```

### Conditional Scanning
```yaml
# Scan only on merge requests
mr_security_scan:
  extends: .audityzer_scan
  rules:
    - if: $CI_MERGE_REQUEST_IID

# Full scan on main branch
main_security_scan:
  extends: .audityzer_scan
  variables:
    INCREMENTAL_SCAN: "false"
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

### Stage-based Scanning
```yaml
stages:
  - test
  - security
  - deploy

quick_scan:
  extends: .audityzer_scan
  stage: test
  variables:
    FAIL_ON_SEVERITY: "CRITICAL"

comprehensive_scan:
  extends: .audityzer_scan
  stage: security
  variables:
    INCREMENTAL_SCAN: "false"
    FAIL_ON_SEVERITY: "HIGH"
```

## 📊 GitLab Security Dashboard Integration

When `UPLOAD_TO_GITLAB_SECURITY` is enabled:

- **Security Dashboard** - View vulnerabilities across all projects
- **Merge Request Security Tab** - See security changes in MRs
- **Security Reports** - Download detailed vulnerability reports
- **Pipeline Security** - Track security trends over time

### Viewing Results

1. **Security Dashboard**: Navigate to **Security & Compliance** → **Security Dashboard**
2. **Merge Requests**: Check the **Security** tab in any MR
3. **Pipeline View**: See security job status in pipeline overview

## 🎯 Severity Levels & Actions

| Severity | Description | Recommended Action |
|----------|-------------|-------------------|
| 🔴 **CRITICAL** | Funds at immediate risk | Block deployment, fix immediately |
| 🟠 **HIGH** | Significant security flaw | Review before merge, fix soon |
| 🟡 **MEDIUM** | Moderate security concern | Address in next sprint |
| 🟢 **LOW** | Best practice improvement | Consider for future updates |

## 🔄 Incremental Scanning

Optimize your pipeline performance:

### Merge Requests
```bash
# Only scans files changed in the MR
git diff origin/main...HEAD --name-only | grep -E '\.(sol|vy|cairo)$'
```

### Push Events
```bash
# Scans files changed since last commit
git diff HEAD~1..HEAD --name-only | grep -E '\.(sol|vy|cairo)$'
```

### Full Scans
Triggered on:
- Tagged releases
- Main branch pushes (configurable)
- Manual pipeline runs with `INCREMENTAL_SCAN: "false"`

## 📈 Performance Metrics

- **Average Scan Time**: 20-45 seconds
- **Incremental Scans**: 70% faster than full scans
- **Pipeline Integration**: <5% overhead on total pipeline time

## 🛠️ Advanced Configuration

### Custom Rules
```yaml
security_scan:
  extends: .audityzer_scan
  rules:
    - if: $AUDITYZER_API_KEY == null
      when: never
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
    - if: $CI_MERGE_REQUEST_IID
    - changes:
        - contracts/**/*.sol
        - src/**/*.vy
```

### Parallel Scanning
```yaml
scan_defi:
  extends: .audityzer_scan
  variables:
    SCAN_PATH: "defi-contracts/"
  parallel:
    matrix:
      - CONTRACT_TYPE: [lending, dex, governance]

scan_nft:
  extends: .audityzer_scan
  variables:
    SCAN_PATH: "nft-contracts/"
```

### Artifacts and Reports
```yaml
security_scan:
  extends: .audityzer_scan
  artifacts:
    reports:
      sast: gl-sast-report.json
    paths:
      - audityzer-results.json
      - security-report.html
    expire_in: 30 days
```

## 🔑 API Key Management

### Getting Your API Key
1. Sign up at [audityzer.com](https://audityzer.com)
2. Navigate to **Settings** → **API Keys**
3. Generate a new API key for GitLab CI/CD

### Security Best Practices
- Always mark API key as **Masked** in GitLab
- Use **Protected** variables for production
- Rotate keys regularly
- Use different keys for different environments

## 🐛 Troubleshooting

### Common Issues

**"No smart contract files found"**
```yaml
variables:
  SCAN_PATH: "path/to/your/contracts/"
```

**"API key authentication failed"**
- Verify the API key is correctly set
- Check that the key hasn't expired
- Ensure it's marked as **Masked**

**"Scan timeout"**
```yaml
variables:
  INCREMENTAL_SCAN: "true"
```

### Debug Mode
Enable verbose logging:
```yaml
security_scan:
  extends: .audityzer_scan
  variables:
    AUDITYZER_DEBUG: "true"
```

### Pipeline Optimization
```yaml
# Cache dependencies
security_scan:
  extends: .audityzer_scan
  cache:
    key: audityzer-cli
    paths:
      - node_modules/
```

## 💡 Pro Tips

1. **Use incremental scanning** for faster feedback in MRs
2. **Set stricter thresholds** for production branches
3. **Combine with other security tools** for comprehensive coverage
4. **Monitor security trends** in GitLab Security Dashboard
5. **Set up notifications** for critical vulnerabilities

## 🤝 Support & Resources

- 📚 [Documentation](https://docs.audityzer.com)
- 💬 [Discord Community](https://discord.gg/audityzer)
- 📧 [Email Support](mailto:support@audityzer.com)
- 🐛 [Report Issues](https://gitlab.com/audityzer/gitlab-ci/-/issues)

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by the Audityzer Team**

*Secure your Web3 projects with GitLab CI/CD integration*
