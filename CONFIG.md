# Audityzer Configuration Guide

## Environment Configuration

Audityzer uses environment variables and configuration files for customization. This guide covers all available configuration options.

## Environment Variables

Set these variables in your `.env` file or system environment:

### Core Settings

```bash
# API Configuration
AUDITYZER_API_KEY=your_api_key_here
AUDITYZER_API_URL=https://api.audityzer.dev
AUDITYZER_API_TIMEOUT=30000

# Application Environment
AUDITYZER_ENV=production  # development, staging, or production
AUDITYZER_DEBUG=false
AUDITYZER_LOG_LEVEL=info  # error, warn, info, debug, trace

# Server Configuration
AUDITYZER_PORT=8080
AUDITYZER_HOST=0.0.0.0
AUDITYZER_WORKERS=4

# Security
AUDITYZER_SECRET_KEY=your_secret_key
AUDITYZER_JWT_SECRET=your_jwt_secret
AUDITYZER_CORS_ORIGIN=*
```

### Database Configuration

```bash
# MongoDB
AUDITYZER_DB_URI=mongodb://localhost:27017/audityzer
AUDITYZER_DB_USERNAME=admin
AUDITYZER_DB_PASSWORD=password
AUDITYZER_DB_NAME=audityzer
AUDITYZER_DB_POOL_SIZE=10

# Redis Cache
AUDITYZER_REDIS_URL=redis://localhost:6379
AUDITYZER_REDIS_DB=0
AUDITYZER_CACHE_TTL=3600
```

### Storage Configuration

```bash
# File Storage
AUDITYZER_STORAGE_TYPE=local  # local, s3, gcs
AUDITYZER_STORAGE_PATH=/var/audityzer/uploads
AUDITYZER_MAX_FILE_SIZE=104857600  # 100MB

# AWS S3 (if using S3 storage)
AUDITYZER_S3_BUCKET=audityzer-reports
AUDITYZER_S3_REGION=us-east-1
AUDITYZER_S3_ACCESS_KEY=your_access_key
AUDITYZER_S3_SECRET_KEY=your_secret_key
```

### Email Configuration

```bash
# Email Service
AUDITYZER_EMAIL_PROVIDER=smtp  # smtp or sendgrid
AUDITYZER_SMTP_HOST=smtp.gmail.com
AUDITYZER_SMTP_PORT=587
AUDITYZER_SMTP_USER=your_email@gmail.com
AUDITYZER_SMTP_PASSWORD=your_app_password
AUDITYZER_MAIL_FROM=noreply@audityzer.dev
```

### Audit Engine Configuration

```bash
# Analysis Settings
AUDITYZER_ENABLE_STATIC_ANALYSIS=true
AUDITYZER_ENABLE_DYNAMIC_ANALYSIS=false
AUDITYZER_ANALYSIS_TIMEOUT=300000  # 5 minutes
AUDITYZER_MAX_CONCURRENT_AUDITS=5

# Check Plugins
AUDITYZER_PLUGINS_DIR=/opt/audityzer/plugins
AUDITYZER_ENABLED_CHECKS=security,performance,code-quality

# Report Settings
AUDITYZER_REPORT_FORMAT=html  # html, json, markdown
AUDITYZER_REPORT_TEMPLATE=default
AUDITYZER_INCLUDE_RECOMMENDATIONS=true
```

### Integration Configuration

```bash
# GitHub Integration
AUDITYZER_GITHUB_TOKEN=your_github_token
AUDITYZER_GITHUB_WEBHOOK_SECRET=your_webhook_secret

# Slack Integration
AUDITYZER_SLACK_WEBHOOK_URL=https://hooks.slack.com/...
AUDITYZER_SLACK_CHANNEL=#audityzer-reports

# Webhook Configuration
AUDITYZER_WEBHOOK_ENABLED=true
AUDITYZER_WEBHOOK_TIMEOUT=10000
AUDITYZER_WEBHOOK_RETRY_ATTEMPTS=3
```

## Configuration File Format

Create `audityzer.config.json` in your project root:

```json
{
  "apiKey": "your-api-key",
  "environment": "production",
  "server": {
    "port": 8080,
    "host": "0.0.0.0",
    "workers": 4
  },
  "database": {
    "uri": "mongodb://localhost:27017/audityzer",
    "poolSize": 10
  },
  "audit": {
    "enableStaticAnalysis": true,
    "enableDynamicAnalysis": false,
    "timeout": 300000,
    "maxConcurrentAudits": 5,
    "enabledChecks": ["security", "performance", "code-quality"]
  },
  "report": {
    "format": "html",
    "template": "default",
    "includeRecommendations": true
  },
  "security": {
    "secretKey": "your-secret-key",
    "jwtSecret": "your-jwt-secret",
    "corsOrigin": "*"
  },
  "integrations": {
    "github": {
      "enabled": true,
      "token": "your-github-token"
    },
    "slack": {
      "enabled": true,
      "webhookUrl": "your-webhook-url"
    }
  }
}
```

## YAML Configuration

Alternatively, use `audityzer.config.yaml`:

```yaml
apiKey: your-api-key
environment: production

server:
  port: 8080
  host: 0.0.0.0
  workers: 4

database:
  uri: mongodb://localhost:27017/audityzer
  poolSize: 10

audit:
  enableStaticAnalysis: true
  enableDynamicAnalysis: false
  timeout: 300000
  maxConcurrentAudits: 5
  enabledChecks:
    - security
    - performance
    - code-quality

report:
  format: html
  template: default
  includeRecommendations: true
```

## Configuration Profiles

### Development Profile

```bash
AUDITYZER_ENV=development
AUDITYZER_DEBUG=true
AUDITYZER_LOG_LEVEL=debug
AUDITYZER_PORT=3000
AUDITYZER_DB_URI=mongodb://localhost:27017/audityzer-dev
```

### Staging Profile

```bash
AUDITYZER_ENV=staging
AUDITYZER_DEBUG=false
AUDITYZER_LOG_LEVEL=info
AUDITYZER_PORT=8080
AUDITYZER_DB_URI=mongodb://staging-db:27017/audityzer
```

### Production Profile

```bash
AUDITYZER_ENV=production
AUDITYZER_DEBUG=false
AUDITYZER_LOG_LEVEL=warn
AUDITYZER_PORT=8080
AUDITYZER_DB_URI=mongodb://prod-db:27017/audityzer
AUDITYZER_ENABLE_SECURITY_HEADERS=true
AUDITYZER_ENABLE_RATE_LIMITING=true
```

## Configuration Priority

Audityzer loads configuration in this priority order (highest to lowest):

1. Environment Variables
2. `.env` file
3. `audityzer.config.json`
4. `audityzer.config.yaml`
5. Default values

## Plugin Configuration

Customize which security checks to run:

```json
{
  "plugins": {
    "security": {
      "enabled": true,
      "checks": [
        "sql-injection",
        "xss-vulnerabilities",
        "csrf-tokens",
        "dependency-vulnerabilities"
      ]
    },
    "performance": {
      "enabled": true,
      "thresholds": {
        "maxExecutionTime": 5000,
        "maxMemoryUsage": 512000000
      }
    },
    "code-quality": {
      "enabled": true,
      "rules": "eslint:recommended"
    }
  }
}
```

## Logging Configuration

```bash
# Log Levels
# error   - Only errors
# warn    - Warnings and errors
# info    - General information
# debug   - Detailed debugging information
# trace   - Very detailed trace information

AUDITYZER_LOG_LEVEL=info
AUDITYZER_LOG_FORMAT=json  # json or text
AUDITYZER_LOG_OUTPUT=/var/log/audityzer.log
AUDITYZER_LOG_MAX_SIZE=104857600  # 100MB
AUDITYZER_LOG_MAX_FILES=10
```

## Health Check Configuration

```bash
AUDITYZER_HEALTH_CHECK_ENABLED=true
AUDITYZER_HEALTH_CHECK_INTERVAL=30000  # 30 seconds
AUDITYZER_HEALTH_CHECK_PATH=/health
AUDITYZER_HEALTH_CHECK_TIMEOUT=5000
```

## Troubleshooting Configuration

### Configuration not loading

1. Check file permissions
2. Verify file format (JSON/YAML syntax)
3. Check environment variable names
4. Review logs with `AUDITYZER_DEBUG=true`

### Database connection issues

```bash
# Test database connection
audityzer config test-db

# View current config
audityzer config show
```

### Common Issues

**Issue**: "Cannot read property of undefined"
**Solution**: Check for missing required configuration variables

**Issue**: "ECONNREFUSED" errors
**Solution**: Verify database/service URLs and connectivity

**Issue**: "Invalid API Key"
**Solution**: Regenerate and update your API key

## See Also

- [Installation Guide](INSTALLATION.md)
- [Quick Start Guide](QUICKSTART.md)
- [API Documentation](API.md)
- [Troubleshooting](TROUBLESHOOTING.md)
