# Audityzer Automation Orchestration

> Comprehensive automation specifications for the AuditorSEC/Audityzer pipeline:
> CSV → ClickUp → GitHub Actions → Railway → Prometheus → Grafana → BRAVE1

## Architecture Overview

```
┌─────────────┐    ┌──────────┐    ┌────────────────┐    ┌─────────┐
│  ClickUp    │───→│  GitHub  │───→│  Railway Deploy │───→│Prometheus│
│  (Tasks)    │    │  Actions │    │  (defense-audit)│    │(Metrics) │
└─────────────┘    └──────────┘    └────────────────┘    └────┬────┘
      ↑                                                       │
      │            ┌──────────┐    ┌────────────────┐         │
      └────────────│  Zapier  │←──│   Grafana       │←────────┘
                   │  (Glue)  │    │  (Dashboards)  │
                   └──────────┘    └───────┬────────┘
                                           │
                   ┌──────────┐    ┌───────▼────────┐
                   │ Telegram │←──│    BRAVE1       │
                   │  (Notify)│    │  (Submission)  │
                   └──────────┘    └────────────────┘
```

## Directory Structure

```
automation/
├── README.md                          # This file
├── orchestration-spec.yaml            # Master pipeline orchestration
├── zapier-specs.yaml                  # Zapier zap definitions
├── n8n-workflows/
│   ├── defense-audit-deploy.json      # Full deploy pipeline (GitHub → Railway)
│   ├── brave1-auto-submit.json        # Auto-submit to BRAVE1 when KPI ≥ 4
│   └── telegram-self-healing.json     # Self-healing health checks + Telegram bot
├── github-actions/
│   ├── self-healing-ci.yml            # Self-healing npm ci workflow
│   └── brave1-metrics-export.yml      # Scheduled KPI export to CSV + ClickUp
├── run-scan.bat                       # Windows scan runner (existing)
├── run-scan.ps1                       # PowerShell scan runner (existing)
└── scan-contracts.sh                  # Contract scanning script (existing)
```

## Components

### 1. Master Orchestration (`orchestration-spec.yaml`)

Defines the full end-to-end pipeline with:

- **7 Pipeline Stages**: csv-ingest → clickup-sync → github-actions-ci → railway-deploy → prometheus-scrape → grafana-import → brave1-submit
- **Parallel Execution**: Railway deploy, ClickUp notify, Prometheus scrape, and Grafana import run in parallel
- **Self-Healing Handlers**: Automatic recovery for npm ci failures, Railway deploy issues, and Prometheus endpoint restarts
- **Scheduling**: Daily KPI sync, weekly BRAVE1 export, 5-minute Prometheus health checks
- **Notification Channels**: Telegram and Slack with templated messages

**Self-healing handlers:**
| Handler | Trigger | Action |
|---------|---------|--------|
| `npm-ci-fix` | `npm ci` failure | Remove `package-lock.json` → `npm install` → recommit |
| `railway-deploy-fix` | Railway deploy failure | Verify secrets → retry with exponential backoff |
| `prometheus-restart` | Metrics endpoint down | Restart endpoint → verify scrape target |

### 2. n8n Workflows (`n8n-workflows/`)

#### `defense-audit-deploy.json`
Automated deployment pipeline triggered by GitHub webhooks:
- Filters for `defense-audit` branch pushes
- Validates repository and extracts push data
- Triggers GitHub Actions CI/CD pipeline
- Deploys to Railway via GraphQL API
- Updates ClickUp task status on success
- Sends Telegram notifications (success/failure)
- Includes retry logic with exponential backoff

#### `brave1-auto-submit.json`
BRAVE1 grant submission automation:
- **Dual triggers**: Webhook (`brave1-submit`) + Weekly schedule (Monday 10:00 Kyiv time)
- Evaluates KPI score threshold (≥ 4 required)
- Fetches `docs/brave1-kpis.csv` from GitHub
- Parses CSV into structured metrics
- Builds submission document with grant tier info (4M prototype / 8M serial production)
- Commits submission JSON to repository
- Creates ClickUp tracking task
- Notifies via Telegram

#### `telegram-self-healing.json`
Proactive health monitoring and self-healing:
- **3-minute scheduled health checks** on all services
- CI/CD alert webhook trigger for immediate response
- Parallel health checks: Railway (`/health`), Prometheus (`/-/healthy`), Grafana (`/api/health`), GitHub Actions API
- Service-specific healing actions (Railway redeploy, Prometheus restart, Grafana restart, CI re-trigger)
- Exponential backoff retry logic (max 3 retries)
- Telegram alerts: healing started → healed / manual intervention needed

### 3. Zapier Integrations (`zapier-specs.yaml`)

| Zap | Trigger | Actions |
|-----|---------|---------|
| `clickup-to-github-notify` | ClickUp task status change | GitHub commit status → Slack → Telegram |
| `grafana-alert-to-brave1` | Grafana alert (KPI ≥ 4) | Fetch CSV → Parse → Trigger n8n BRAVE1 submit → Telegram |
| `github-deploy-to-clickup` | GitHub deploy success on `defense-audit` | Find ClickUp task → Update status → Add comment → Slack → Check milestone |

### 4. GitHub Actions (`github-actions/`)

#### `self-healing-ci.yml`
Self-healing CI/CD workflow with 4 jobs:
1. **detect-failure**: Runs `npm ci`, categorizes error type (`ERESOLVE`, `lockfile_outdated`, `unknown`)
2. **fix-lockfile**: Removes stale `package-lock.json`, regenerates with `npm install --package-lock-only --legacy-peer-deps`, commits
3. **retrigger-ci**: Dispatches the main CI/CD workflow after fix
4. **notify**: Telegram notification with success/failure details

> Addresses known blocker: `npm ci` fails due to outdated `package-lock.json` (tailwindcss 4.1.10 vs 4.2.1)

#### `brave1-metrics-export.yml`
Scheduled KPI export workflow (daily 06:00 UTC + manual dispatch):
1. **scrape-metrics**: Queries Prometheus for all 8 KPIs, falls back to CSV if unavailable
2. **export-csv**: Appends metrics to `docs/brave1-kpis.csv`, optional JSON export
3. **update-clickup**: Creates KPI tracking task, updates budget utilization
4. **brave1-threshold-check**: If `brave1_score >= 4`, triggers n8n submission webhook + Telegram

## Prometheus KPIs (8 Metrics)

| Metric | Description | Target |
|--------|-------------|--------|
| `audityzer_audits_total` | Total audits completed | — |
| `audityzer_detection_rate_percent` | Vulnerability detection rate | > 80% |
| `audityzer_brave1_score` | BRAVE1 readiness score | ≥ 4 |
| `audityzer_fop_tov_compliance_score` | FOP/TOV compliance | > 0.8 |
| `audityzer_budget_utilization_percent` | Budget utilization | 70-100% |
| `audityzer_vulnerabilities_detected_total` | Total vulnerabilities found | — |
| `audityzer_milestone_completion_total` | Milestones completed | — |
| `audityzer_api_response_time_seconds` | API response time | < 2s |

## Error Handling

All automation specs implement:
- **Retry Strategy**: 3 retries with exponential backoff (60s → 120s → 240s)
- **Failure Notifications**: Telegram + Slack on all failures
- **Self-Healing**: Automatic recovery for common failures (lockfile, deploy, metrics endpoint)
- **Escalation**: Manual intervention alert after all retries exhausted

## Required Secrets

### GitHub Actions Secrets
| Secret | Used By |
|--------|---------|
| `RAILWAY_TOKEN` | deploy workflows |
| `RAILWAY_PROJECT_ID` | deploy workflows (`cfae5288-cb86-42fb-b913-adc37df6dabf`) |
| `RAILWAY_SERVICE_ID` | deploy workflows (`42cf6b63-c312-4b52-8e6a-d9fe98c8bbcf`) |
| `CLICKUP_API_TOKEN` | brave1-metrics-export |
| `CLICKUP_LIST_ID` | brave1-metrics-export (`86c6yjdmk`) |
| `CLICKUP_MILESTONE_TASK_ID` | milestone tracking |
| `TELEGRAM_BOT_TOKEN` | self-healing-ci, brave1-metrics-export |
| `TELEGRAM_CHAT_ID` | all notification workflows |
| `PROMETHEUS_ENDPOINT` | brave1-metrics-export |
| `GRAFANA_API_KEY` | Grafana dashboard import |

### n8n Credentials
| ID | Type | Purpose |
|----|------|---------|
| `github-auth` | HTTP Header Auth | GitHub API access |
| `grafana-auth` | HTTP Header Auth | Grafana API access |
| `brave1-auth` | HTTP Header Auth | BRAVE1 API submission |
| `telegram-bot` | Telegram API | Bot notifications |
| `clickup-auth` | HTTP Header Auth | ClickUp task management |
| `railway-auth` | HTTP Header Auth | Railway deployment |

### Zapier Secrets
| Secret | Description |
|--------|-------------|
| `TELEGRAM_CHAT_ID` | Telegram notification target |
| `ZAPIER_GRAFANA_WEBHOOK` | Webhook URL for Grafana alerts |
| `N8N_WEBHOOK_URL` | n8n instance base URL |
| `CLICKUP_MILESTONE_TASK_ID` | ClickUp milestone task |

## Setup Instructions

### n8n Import
1. Open n8n instance dashboard
2. Navigate to **Workflows → Import**
3. Upload each JSON from `n8n-workflows/`
4. Configure credentials for: GitHub, ClickUp, Telegram, Railway
5. Activate all workflows

### GitHub Actions
Copy workflows to `.github/workflows/`:
```bash
cp automation/github-actions/*.yml .github/workflows/
```

### Zapier
1. Create Zapier account and connect: ClickUp, GitHub, Slack, Telegram
2. Import zap definitions from `zapier-specs.yaml`
3. Configure webhook URLs and API tokens
4. Enable all zaps

## BRAVE1 Integration

- **Portal**: [brave1.gov.ua](https://brave1.gov.ua)
- **USF Profile**: [usf.com.ua/brave1](https://usf.com.ua/brave1)
- **Grant Tiers**: 4M UAH (prototype) + 8M UAH (serial production)
- **Submission Threshold**: KPI score ≥ 4 triggers auto-submission
- **Schedule**: Weekly check (Monday 10:00 Kyiv time)

## Branch

All automation targets the `defense-audit` branch.
