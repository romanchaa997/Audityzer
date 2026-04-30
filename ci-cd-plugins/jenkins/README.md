
# Audityzer Jenkins Plugin

🛡️ **Enterprise Web3 Security Scanning for Jenkins**

Integrate [Audityzer](https://audityzer.com) security scanning directly into your Jenkins pipelines for automated smart contract vulnerability detection.

## ✨ Features

- 🔍 **Comprehensive Security Analysis** - 50+ vulnerability patterns
- ⚡ **Incremental Scanning** - Fast scans for changed files only
- 📊 **Rich Reporting** - HTML reports with detailed findings
- 🎯 **Configurable Thresholds** - Fail builds based on severity
- 🔄 **Pull Request Integration** - Scan changes in PRs
- 📈 **Build Metrics** - Track security trends over time
- 🌍 **Multi-Language Support** - Solidity, Vyper, Cairo

## 🚀 Quick Start

### 1. Install Prerequisites

Ensure your Jenkins instance has:
- Node.js 16+ (for Audityzer CLI)
- Git plugin
- HTML Publisher plugin (for reports)

### 2. Set Up Credentials

1. Go to **Manage Jenkins** → **Manage Credentials**
2. Add a new **Secret text** credential
3. Set ID as `audityzer-api-key`
4. Enter your Audityzer API key as the secret

### 3. Create Pipeline Job

1. Create a new **Pipeline** job
2. Use the provided `Jenkinsfile.example` as your pipeline script
3. Configure build triggers as needed

## 📋 Pipeline Configuration

### Basic Jenkinsfile

```groovy
pipeline {
    agent any
    
    environment {
        AUDITYZER_API_KEY = credentials('audityzer-api-key')
    }
    
    parameters {
        choice(
            name: 'SCAN_TYPE',
            choices: ['incremental', 'full'],
            description: 'Type of security scan'
        )
    }
    
    stages {
        stage('Security Scan') {
            steps {
                script {
                    sh '''
                        npm install -g @audityzer/cli
                        audityzer scan \
                            --api-key "$AUDITYZER_API_KEY" \
                            --scan-path "contracts/" \
                            --output-file "results.json"
                    '''
                }
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'results.json'
        }
    }
}
```

### Advanced Configuration

```groovy
pipeline {
    agent any
    
    environment {
        AUDITYZER_API_KEY = credentials('audityzer-api-key')
        SCAN_PATH = 'src/contracts/'
        FAIL_ON_SEVERITY = 'HIGH'
    }
    
    parameters {
        choice(
            name: 'SEVERITY_THRESHOLD',
            choices: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],
            description: 'Minimum severity to fail build'
        )
        booleanParam(
            name: 'INCREMENTAL_SCAN',
            defaultValue: true,
            description: 'Only scan changed files'
        )
    }
    
    stages {
        // ... pipeline stages from example
    }
}
```

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `AUDITYZER_API_KEY` | API key credential | Required |
| `AUDITYZER_API_URL` | API endpoint | `https://api.audityzer.com` |
| `SCAN_PATH` | Path to scan | `contracts/` |
| `FAIL_ON_SEVERITY` | Severity threshold | `HIGH` |

### Pipeline Parameters

| Parameter | Type | Description | Options |
|-----------|------|-------------|---------|
| `SCAN_TYPE` | Choice | Scan type | `incremental`, `full` |
| `SEVERITY_THRESHOLD` | Choice | Failure threshold | `CRITICAL`, `HIGH`, `MEDIUM`, `LOW` |

## 📊 Reporting & Artifacts

### HTML Reports

The pipeline generates rich HTML reports:
- **Security Dashboard** - Overview of all findings
- **Vulnerability Details** - Detailed analysis per issue
- **Code Snippets** - Highlighted vulnerable code
- **Recommendations** - Fix suggestions

### Artifacts

Automatically archived:
- `audityzer-results.json` - Raw scan results
- `audityzer-report.html` - Formatted HTML report

### Build Descriptions

Pipeline adds vulnerability summary to build description:
```
Vulnerabilities: 5 (🔴1 🟠2 🟡1 🟢1)
```

## 🔄 Integration Patterns

### Multi-Branch Pipeline

```groovy
pipeline {
    agent any
    
    stages {
        stage('Security Scan') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                    changeRequest()
                }
            }
            steps {
                // Scan logic
            }
        }
    }
}
```

### Parallel Multi-Project Scanning

```groovy
stage('Security Scans') {
    parallel {
        stage('DeFi Contracts') {
            steps {
                auditzyerScan('defi-contracts/')
            }
        }
        stage('NFT Contracts') {
            steps {
                auditzyerScan('nft-contracts/')
            }
        }
        stage('Governance Contracts') {
            steps {
                auditzyerScan('governance-contracts/')
            }
        }
    }
}
```

### Conditional Scanning

```groovy
stage('Security Scan') {
    when {
        anyOf {
            changeset "contracts/**/*.sol"
            changeset "src/**/*.vy"
            expression { params.FORCE_SCAN == true }
        }
    }
    steps {
        // Scan logic
    }
}
```

## 🎯 Severity Levels & Actions

| Severity | Jenkins Action | Recommendation |
|----------|---------------|----------------|
| 🔴 **CRITICAL** | Fail build immediately | Block deployment |
| 🟠 **HIGH** | Fail build (configurable) | Review before merge |
| 🟡 **MEDIUM** | Warning (continue) | Address in sprint |
| 🟢 **LOW** | Info only | Consider improvements |

## 📈 Metrics & Trending

### Build Metrics

Track security metrics over time:
- Vulnerability count trends
- Scan performance metrics
- Security debt accumulation

### Integration with Monitoring

```groovy
post {
    always {
        script {
            // Send metrics to monitoring system
            sh """
                curl -X POST https://metrics.company.com/jenkins \
                     -d '{
                         "job": "${env.JOB_NAME}",
                         "build": "${env.BUILD_NUMBER}",
                         "vulnerabilities": ${env.TOTAL_VULNS},
                         "critical": ${env.CRITICAL_COUNT}
                     }'
            """
        }
    }
}
```

## 🔔 Notifications

### Slack Integration

```groovy
post {
    failure {
        slackSend(
            channel: '#security',
            color: 'danger',
            message: """
🚨 Security Scan Failed
Job: ${env.JOB_NAME}
Build: ${env.BUILD_NUMBER}
Vulnerabilities: ${env.TOTAL_VULNS}
            """
        )
    }
}
```

### Email Notifications

```groovy
post {
    always {
        emailext(
            subject: "Security Scan: ${currentBuild.result}",
            body: """
Security scan completed for ${env.JOB_NAME} #${env.BUILD_NUMBER}

Results:
- Total vulnerabilities: ${env.TOTAL_VULNS}
- Critical: ${env.CRITICAL_COUNT}
- High: ${env.HIGH_COUNT}

Report: ${env.BUILD_URL}Audityzer_Security_Report/
            """,
            recipientProviders: [developers()]
        )
    }
}
```

## 🛠️ Advanced Features

### Custom Scan Rules

```groovy
stage('Custom Security Rules') {
    steps {
        script {
            sh '''
                audityzer scan \
                    --api-key "$AUDITYZER_API_KEY" \
                    --scan-path "$SCAN_PATH" \
                    --custom-rules "custom-rules.json" \
                    --output-file "results.json"
            '''
        }
    }
}
```

### Integration with SonarQube

```groovy
stage('Quality Gates') {
    parallel {
        stage('Audityzer Security') {
            steps {
                // Audityzer scan
            }
        }
        stage('SonarQube Analysis') {
            steps {
                // SonarQube scan
            }
        }
    }
}
```

### Docker Integration

```groovy
pipeline {
    agent {
        docker {
            image 'node:18-alpine'
        }
    }
    
    stages {
        stage('Setup') {
            steps {
                sh 'npm install -g @audityzer/cli'
            }
        }
        // ... rest of pipeline
    }
}
```

## 🔑 Security Best Practices

### Credential Management
- Use Jenkins Credential Store for API keys
- Rotate API keys regularly
- Use different keys per environment
- Never log sensitive information

### Pipeline Security
```groovy
options {
    // Prevent concurrent builds
    disableConcurrentBuilds()
    
    // Clean workspace
    skipDefaultCheckout()
    
    // Set build timeout
    timeout(time: 30, unit: 'MINUTES')
}
```

## 🐛 Troubleshooting

### Common Issues

**CLI Installation Failed**
```groovy
sh '''
    # Alternative installation methods
    npm config set registry https://registry.npmjs.org/
    npm install -g @audityzer/cli --verbose
'''
```

**Permission Denied**
```groovy
sh '''
    # Fix permissions
    sudo chown -R jenkins:jenkins /var/lib/jenkins/.npm
    npm install -g @audityzer/cli
'''
```

**Scan Timeout**
```groovy
timeout(time: 10, unit: 'MINUTES') {
    sh 'audityzer scan --timeout 600 ...'
}
```

### Debug Mode

Enable verbose logging:
```groovy
environment {
    AUDITYZER_DEBUG = 'true'
}
```

## 📚 Resources

- 📖 [Jenkins Pipeline Documentation](https://jenkins.io/doc/book/pipeline/)
- 🛡️ [Audityzer API Documentation](https://docs.audityzer.com)
- 💬 [Community Support](https://discord.gg/audityzer)
- 🐛 [Report Issues](https://github.com/audityzer/jenkins-plugin/issues)

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by the Audityzer Team**

*Enterprise Web3 security for Jenkins pipelines*
