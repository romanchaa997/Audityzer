# Monday.com Webhook Setup for Pipedream Risk Router

## Step 1: Get Pipedream Webhook URL

1. Go to [pipedream.com](https://pipedream.com) → Create New Workflow
2. Trigger: **HTTP / Webhook** → "New Requests"
3. Copy the generated URL (e.g., `https://eo1234abcd.m.pipedream.net`)

## Step 2: Create Monday.com Custom Automation

In Monday.com → Deals Board → Automate (⚡):

### Automation Template:
```
When "Risk Level" changes to "High",
send a webhook to [YOUR_PIPEDREAM_URL]
with body:
{
  "item_id": "{pulse.id}",
  "item_name": "{item_name}",
  "board_id": "{board.id}",
  "client_name": "{item_name}",
  "owner": "{Owner}",
  "client_tier": "Standard",
  "impact": "{Impact}",
  "likelihood": "{Likelihood}",
  "risk_score": "{Risk Score}",
  "risk_level": "{Risk Level}",
  "sentiment": "{Sentiment}",
  "deal_value": "{Deal Value}",
  "expected_close_date": "{Expected Close Date}",
  "last_activity_date": "{Last Activity Date}",
  "item_url": "https://romanchaa997s-team.monday.com/boards/{board.id}/pulses/{pulse.id}"
}
```

### Step-by-Step in Monday UI:
1. Board → Automate → + Add Automation → Custom
2. Trigger: `When status changes to something`
   - Column: `Risk Level`
   - Value: `High`
3. Action: `Send a webhook`
   - URL: Your Pipedream URL
   - Method: POST
   - Headers: `Content-Type: application/json`
   - Body: The JSON above

## Step 3: Pipedream Environment Variables

Set these in Pipedream → Workflow → Settings → Environment:

```
CLICKUP_API_KEY=pk_YOUR_CLICKUP_API_KEY
CLICKUP_RISK_LIST_ID=YOUR_RISK_REGISTER_LIST_ID
GITHUB_TOKEN=ghp_YOUR_GITHUB_PAT
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN
TELEGRAM_CHAT_ID=YOUR_CHAT_ID
AUDITYZER_EVENTS_URL=https://auditorsec-defense.up.railway.app/api/events
```

## Step 4: Test

1. In Monday.com, manually set a deal's Risk Level to "High"
2. Watch Pipedream execution logs
3. Verify: ClickUp task created, GitHub issue created, Telegram alert sent
