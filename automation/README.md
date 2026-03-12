# Audityzer Automation Orchestration

Complete automation pipeline for AuditorSEC/Audityzer — from CSV intake through BRAVE1 submission, with self-healing CI/CD and multi-platform notifications.

## Architecture Overview

```
CSV Intake → ClickUp → GitHub Actions → Railway Deploy
                                      → Prometheus Metrics
                                      → Grafana Dashboard
                                      → BRAVE1 Submission (KPI ≥ 4)
```

## Directory Structure

```
automation/
├── orchestration-spec.yaml          # Master pipeline orchestration
├── zapier-specs.yaml                # Zapier zap definitions
├── README.md                        # This file
├── github-actions/
│   ├── self-healing-ci.yml          # Self-healing npm ci workflow
│   └── brave1-metrics-export.yml    # Weekly KPI export to CSV + ClickUp
├── n8n-workflows/
│   ├── defense-audit-deploy.json    # Full deploy pipeline (GitHub → Railway)
│   ├── brave1-auto-submit.json      # Auto-submit to BRAVE1 when KPI ≥ 4
│   └── telegram-self-healing.json   # Telegram bot commands + auto-heal
├── run-scan.bat                     # Windows scan runner
├── run-scan.ps1                     # PowerShell scan runner
└── scan-contracts.sh                # Contract scanning script
```

## Components

### 1. Master Orchestration (`orchestration-spec.yaml`)

Defines the full pipeline with 4 stages:

| Stage | Description |
|-------|-------------|
| `csv-intake` | Parse CSV KPI data, validate schema |
| `build-validate` | `npm ci`, lint, test on defense-audit branch |
| `parallel-deploy` | Railway, ClickUp, Prometheus, Grafana (parallel) |
| `brave1-submit` | Submit to BRAVE1 portal when KPI ≥ 4 |

**Self-healing handlers:**
- `self-heal-npm` — Regenerate `package-lock.json` on `npm ci` failure
- `self-heal-railway` — Verify secrets and retry Railway deploy with backoff
- `self-heal-prometheus` — Restart metrics endpoint and verify scrape target

### 2. n8n Workflows

#### `defense-audit-deploy.json`
- **Trigger:** GitHub webhook on `defense-audit` push
- **Flow:** Filter branch → Install → Lint/Test → Railway deploy → Health check → Notify
- **Self-healing:** Auto-fixes npm install failures, retries Railway deploy on failure
- **Notifications:** Telegram, ClickUp status update, Prometheus reload

#### `brave1-auto-submit.json`
- **Triggers:** Webhook + Weekly schedule (Monday 06:00 UTC)
- **Flow:** Fetch KPI from Prometheus → Check threshold (≥ 4) → Submit to BRAVE1
- **On success:** Telegram notification + ClickUp task logged
- **Below threshold:** Informational Telegram message, no submission

#### `telegram-self-healing.json`
- **Triggers:** Telegram webhook + Every 5 minutes health check
- **Commands:** `/status`, `/deploy`, `/heal`, `/kpi`, `/help`
- **Auto-heal:** Checks Railway, Prometheus, Grafana health → auto-fixes detected issues
- **Reports:** Telegram messages with heal results

### 3. Zapier Integrations (`zapier-specs.yaml`)

| Zap | Trigger | Actions |
|-----|---------|---------|
| `clickup-to-github-notify` | ClickUp task updated | GitHub commit status → Slack → Telegram |
| `grafana-alert-to-brave1` | Grafana alert (KPI ≥ 4) | Fetch CSV → Parse → Trigger n8n BRAVE1 submit |
| `github-deploy-to-clickup` | GitHub deploy success | Find ClickUp task → Update status → Comment → Slack |

### 4. GitHub Actions

#### `self-healing-ci.yml`
- **Trigger:** Push to `defense-audit` + manual dispatch
- **Jobs:** Build → Self-Heal (on failure) → Verify
- **Self-heal:** Removes stale lockfile → fresh `npm install` → verify `npm ci` → commit + push
- **Concurrency:** Cancels in-progress runs on same ref

#### `brave1-metrics-export.yml`
- **Trigger:** Weekly Monday 06:00 UTC + manual dispatch
- **Jobs:** Export KPIs → Update ClickUp
- **Exports:** CSV to `data/brave1-exports/` with metrics: KPI score, deploy success rate, MTTD, vulnerability count, test coverage, self-heal events
- **Artifact retention:** 90 days

## Required Secrets

### GitHub Actions
| Secret | Used By |
|--------|---------|
| `PROMETHEUS_ENDPOINT` | brave1-metrics-export |
| `PROMETHEUS_TOKEN` | brave1-metrics-export |
| `CLICKUP_API_TOKEN` | brave1-metrics-export |
| `CLICKUP_LIST_ID` | brave1-metrics-export |
| `TELEGRAM_BOT_TOKEN` | self-healing-ci, brave1-metrics-export |
| `TELEGRAM_CHAT_ID` | self-healing-ci, brave1-metrics-export |
| `RAILWAY_TOKEN` | deploy workflows |
| `RAILWAY_SERVICE_ID` | deploy workflows |

### n8n Environment Variables
| Variable | Description |
|----------|-------------|
| `GRAFANA_URL` | Grafana instance URL |
| `BRAVE1_API_URL` | BRAVE1 submission API endpoint |
| `TELEGRAM_CHAT_ID` | Telegram notification target |
| `RAILWAY_TOKEN` | Railway deploy token |
| `CLICKUP_LIST_ID` | ClickUp list for task tracking |

### n8n Credentials
| ID | Type | Purpose |
|----|------|---------|
| `grafana-auth` | HTTP Header Auth | Grafana API access |
| `brave1-auth` | HTTP Header Auth | BRAVE1 API submission |
| `telegram-bot` | Telegram API | Bot notifications |
| `clickup-auth` | HTTP Header Auth | ClickUp task management |
| `railway-auth` | HTTP Header Auth | Railway deployment |

### Zapier
| Secret | Description |
|--------|-------------|
| `TELEGRAM_CHAT_ID` | Telegram notification target |
| `ZAPIER_GRAFANA_WEBHOOK` | Webhook URL for Grafana alerts |
| `N8N_WEBHOOK_URL` | n8n instance base URL |
| `CLICKUP_MILESTONE_TASK_ID` | ClickUp milestone task |

## BRAVE1 Integration

- **Portal:** https://brave1.gov.ua
- **USF Profile:** https://usf.com.ua/brave1
- **Submission threshold:** KPI score ≥ 4
- **Auto-submit:** Weekly check + webhook trigger
- **KPI metrics:** Vulnerability detection, test coverage, deploy success rate, MTTD

## Branch

All automation targets the `defense-audit` branch.
