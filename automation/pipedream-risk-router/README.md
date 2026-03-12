# Pipedream Risk Router — Monday.com → ClickUp/GitHub/Telegram

5-step Pipedream workflow that processes high-risk CRM deals:

1. **Normalize** — Parse Monday.com webhook payload, recalculate risk score with dual Enterprise/SMB thresholds
2. **ClickUp** — Create task in Risk Register list (only if High risk)
3. **GitHub** — Create issue in romanchaa997/Audityzer (only if High risk)
4. **Telegram** — Send alert with links to ClickUp task + GitHub issue
5. **Audityzer** — Push event to defense API for metrics tracking

## Environment Variables Required

| Variable | Description |
|----------|-------------|
| `CLICKUP_API_KEY` | ClickUp API token |
| `CLICKUP_RISK_LIST_ID` | Risk Register list ID |
| `GITHUB_TOKEN` | GitHub PAT with repo scope |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token |
| `TELEGRAM_CHAT_ID` | Target chat/group ID |
| `AUDITYZER_EVENTS_URL` | Defense API events endpoint |

## Setup

1. Create a Pipedream workflow with HTTP trigger
2. Add each step from `pipedream-risk-router.js` as a separate Node.js step
3. Configure environment variables in Pipedream settings
4. Set the webhook URL in Monday.com automation (see `monday-webhook-setup.md`)
