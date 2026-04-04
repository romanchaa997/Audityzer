# ClickUp Risk Register — Integration with Monday.com CRM

---

## ClickUp Risk Register Setup

### Step 1: Create a ClickUp List for Risk Register

1. Go to your ClickUp Space (e.g., AuditorSEC workspace)
2. Create a new **List**: `Risk Register`
3. Add these **Custom Fields**:

| Field Name | Type | Options/Values |
|-----------|------|----------------|
| Risk Title | Text (task name) | Auto-filled from Monday |
| Source | Dropdown | `Monday CRM` / `Manual` / `BRAVE1` / `Other` |
| Client/Deal | Short Text | Link or name from Monday |
| Monday Item URL | URL | Deep link to Monday.com item |
| Likelihood | Number (1–5) | Same scale as Monday |
| Impact | Number (1–5) | Same scale as Monday |
| Risk Score | Number | Auto-calculated or copied from Monday |
| Risk Level | Dropdown | `Low` / `Medium` / `High` / `Critical` |
| Risk Trigger | Long Text | What triggered this risk entry |
| Mitigation Plan | Long Text | Concrete action plan |
| Status | Status | `Open` → `In Review` → `Mitigated` → `Closed` → `Accepted` |
| Owner | Assignee | Responsible person |
| Review Date | Date | Next review deadline |
| Deal Value at Risk | Currency | From Monday Deal Value |

### Step 2: ClickUp Statuses for Risk Register

```
Open → In Review → Mitigated → Closed
                  ↘ Accepted (risk accepted, no action)
```

---

## Integration: Monday.com → ClickUp (via n8n)

### n8n Workflow: `monday-to-clickup-risk.json`

```json
{
  "name": "Monday High-Risk → ClickUp Risk Register",
  "nodes": [
    {
      "name": "Monday Webhook",
      "type": "n8n-nodes-base.mondayTrigger",
      "parameters": {
        "boardId": "YOUR_DEALS_BOARD_ID",
        "event": "change_specific_column_value",
        "columnId": "risk_level"
      }
    },
    {
      "name": "Filter High Only",
      "type": "n8n-nodes-base.if",
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{ $json.event.value.label.text }}",
              "value2": "High",
              "operation": "equal"
            }
          ]
        }
      }
    },
    {
      "name": "Get Monday Item Details",
      "type": "n8n-nodes-base.monday",
      "parameters": {
        "operation": "getItem",
        "itemId": "={{ $json.event.pulseId }}"
      }
    },
    {
      "name": "Create ClickUp Task",
      "type": "n8n-nodes-base.clickUp",
      "parameters": {
        "list": "YOUR_RISK_REGISTER_LIST_ID",
        "name": "🔴 RISK: {{ $json.name }} — Deal at risk",
        "description": "## Risk Entry from Monday.com CRM\n\n**Deal:** {{ $json.name }}\n**Deal Value:** {{ $json.column_values.deal_value }}\n**Stage:** {{ $json.column_values.stage }}\n**Owner:** {{ $json.column_values.owner }}\n**Risk Score:** {{ $json.column_values.risk_score }}\n**Sentiment:** {{ $json.column_values.sentiment }}\n\n**Risk Trigger:** RiskScore ≥13 in Monday CRM + {{ $json.column_values.sentiment }} sentiment\n\n**Monday Item URL:** https://your-workspace.monday.com/boards/BOARD_ID/pulses/{{ $json.id }}\n\n---\n\n### Mitigation Plan\n- [ ] Schedule call with client within 48h\n- [ ] Review pricing/proposal\n- [ ] Escalate to management if needed\n- [ ] Update Monday CRM after review",
        "priority": 2,
        "status": "Open",
        "assignees": ["YOUR_CLICKUP_USER_ID"],
        "dueDate": "={{ $now.plus(2, 'days').toISO() }}",
        "customFields": [
          {
            "id": "LIKELIHOOD_FIELD_ID",
            "value": "={{ $json.column_values.likelihood }}"
          },
          {
            "id": "IMPACT_FIELD_ID",
            "value": "={{ $json.column_values.impact }}"
          },
          {
            "id": "RISK_SCORE_FIELD_ID",
            "value": "={{ $json.column_values.risk_score }}"
          },
          {
            "id": "RISK_LEVEL_FIELD_ID",
            "value": "High"
          }
        ]
      }
    },
    {
      "name": "Notify via Telegram",
      "type": "n8n-nodes-base.telegram",
      "parameters": {
        "chatId": "YOUR_TELEGRAM_CHAT_ID",
        "text": "🔴 *NEW HIGH-RISK DEAL*\n\n*Deal:* {{ $json.name }}\n*Score:* {{ $json.column_values.risk_score }}\n*Value:* {{ $json.column_values.deal_value }}\n*Sentiment:* {{ $json.column_values.sentiment }}\n\n✅ ClickUp task created\n📋 Review within 48h",
        "parseMode": "Markdown"
      }
    }
  ]
}
```

---

## Alternative: Zapier Integration

### Zap: Monday → ClickUp Risk Entry

**Trigger:**
- App: Monday.com
- Event: "Column Value Changed in Board"
- Board: Your Deals Board
- Column: Risk Level
- Filter: Risk Level = "High"

**Action 1: Create ClickUp Task**
- App: ClickUp
- Event: "Create Task"
- List: Risk Register
- Task Name: `🔴 RISK: {{item_name}} — Deal at risk (Score: {{risk_score}})`
- Description: (use the template from n8n above)
- Priority: High
- Assignee: You
- Due Date: 2 days from now

**Action 2: Send Telegram Message** (optional)
- App: Telegram Bot
- Event: "Send Message"
- Chat ID: Your chat
- Message: Risk alert text

---

## Risk Matrix Reference (5×5)

```
Impact →    1       2       3       4       5
Likelihood
    5      5(M)   10(M)   15(H)   20(H)   25(H)
    4      4(L)    8(M)   12(M)   16(H)   20(H)
    3      3(L)    6(L)    9(M)   12(M)   15(H)
    2      2(L)    4(L)    6(L)    8(M)   10(M)
    1      1(L)    2(L)    3(L)    4(L)    5(M)

L = Low (1-6)    M = Medium (7-14)    H = High (15-25)
```

This simplified matrix (Impact × Likelihood) can be used for ClickUp entries
as an alternative to the Monday compound formula.

---

## Workflow Summary

```
Monday CRM Deal
  ↓ Risk Score calculated (formula)
  ↓ Risk Level auto-set (automation 4a/4b/4c)
  ↓ IF Risk Level = High
      ├→ Notify Owner (monday automation)
      ├→ Create subitem "Risk Review" (monday automation)
      ├→ n8n/Zapier webhook fires
      │   ├→ Create ClickUp Task in Risk Register
      │   ├→ Send Telegram alert
      │   └→ (Optional) Update Slack channel
      └→ Weekly digest email (monday automation)
```
