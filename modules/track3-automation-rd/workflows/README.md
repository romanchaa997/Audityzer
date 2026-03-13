# @auditorsec/n8n-workflows

Pre-built n8n workflow templates for the AuditorSEC platform. Each workflow is a standalone JSON file that can be imported directly into any n8n instance.

## Workflows

| File | Trigger | Description |
|------|---------|-------------|
| `audit-pipeline-workflow.json` | Telegram webhook | Smart contract audit pipeline: parse request → validate contract address → queue analysis → poll for completion → deliver report via Telegram |
| `compliance-monitoring-workflow.json` | Cron (daily 08:00 UTC) | BRICS regulatory monitoring: fetch updates from SEBI (India), ANPD/LGPD (Brazil), FSCA/Joint Standard (South Africa) → compare against client configs → alert via Telegram |
| `crm-sync-workflow.json` | monday.com webhook | Bidirectional CRM sync: monday.com board events → parse → fetch full item via GraphQL → sync to internal audit system + Telegram notification |
| `incident-response-workflow.json` | Alert webhook | Automated incident response: classify severity (CRITICAL/HIGH/MEDIUM/LOW) → notify team via Telegram → create tracking ticket → store incident → generate post-mortem template |

## Import into n8n

1. Open your n8n instance
2. Navigate to **Workflows** → **Import from File**
3. Select the desired `.json` file
4. Configure credential placeholders:
   - **Telegram Bot API** — bot token for message delivery
   - **HTTP Header Auth** — API keys for AuditorSEC backend
   - **monday.com API** — API token (CRM sync workflow only)
5. Activate the workflow

## Required Credentials

| Credential | Used By | Setup |
|------------|---------|-------|
| Telegram Bot Token | All workflows | Create bot via @BotFather, set token in n8n Telegram credential |
| AuditorSEC API Key | audit-pipeline, incident-response | Generate in AuditorSEC platform settings |
| monday.com API Token | crm-sync | Generate in monday.com Developer settings |

## Environment Variables

Each workflow references the AuditorSEC API base URL. Set this in your n8n environment or update the HTTP Request nodes:

```
AUDITORSEC_API_URL=https://api.auditorsec.io
TELEGRAM_BOT_TOKEN=<your-bot-token>
TELEGRAM_CHAT_ID=<your-team-chat-id>
```

## Customization

All workflows use n8n's Code nodes for business logic, making them easy to customize:

- **Severity thresholds**: Edit the classification logic in the incident-response workflow Code node
- **Regulatory sources**: Add or modify API endpoints in compliance-monitoring HTTP Request nodes
- **CRM field mapping**: Update the column-to-field mapping in crm-sync Code nodes
- **Notification templates**: Modify Telegram message formatting in any workflow's Code nodes

## Validation

Verify all workflow JSON files parse correctly:

```bash
npm run validate
```

## Tags

All workflows are tagged with `AuditorSEC` for easy filtering in n8n.
