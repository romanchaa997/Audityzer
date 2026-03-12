# Monday.com CRM Risk Pipeline + ClickUp Risk Register

Automated setup for AuditorSEC CRM risk scoring and escalation pipeline.

## Quick Start

```bash
# 1. Get your API tokens
#    Monday.com: Profile → Developers → My Access Tokens
#    ClickUp: Settings → Apps → Generate API Token

# 2. Run setup
export MONDAY_API_TOKEN=your_monday_token
export CLICKUP_API_TOKEN=your_clickup_token
cd automation/monday-crm-risk
chmod +x setup-all.sh && ./setup-all.sh
```

## What Gets Created

### Monday.com (Deals Board: 5065891772)
| Column | Type | Purpose |
|--------|------|---------|
| Sentiment | Status | Positive / Neutral / Negative |
| Likelihood | Numbers | 1-5 close probability |
| Impact | Numbers | 1-5 deal importance |
| Days Overdue | Formula | Days past expected close |
| Days No Touch | Formula | Days since last activity |
| Risk Score | Formula | Compound score (0-25+) |
| Risk Level | Status | Low / Medium / High |

### ClickUp (Risk Register List)
- 11 custom fields (Source, Client/Deal, Likelihood, Impact, Risk Score, Risk Level, etc.)
- Statuses: Open → In Review → Mitigated → Accepted → Closed
- Sample task for verification

### Risk Score Formula
```
Impact×2 + (6−Likelihood) + min(DaysOverdue, 10) + (DaysNoTouch>7 ? 3 : 0) + SentimentFactor
```
Thresholds: 0-6=Low, 7-12=Medium, ≥13=High
Enterprise override: 0-4=Low, 5-10=Medium, ≥11=High

## Files

| File | Purpose |
|------|---------|
| `setup-all.sh` | One-click setup runner |
| `setup-monday-columns.js` | Creates Monday columns + formulas via API |
| `setup-clickup-risk-register.js` | Creates ClickUp Risk Register + custom fields |
| `01-columns-setup.md` | Manual column setup reference |
| `02-formulas-exact.md` | Formula syntax reference |
| `03-automations-exact.md` | 7 automation recipes (manual setup in Monday UI) |
| `04-clickup-integration.md` | n8n/Zapier integration specs |
| `n8n-monday-clickup-risk.json` | n8n workflow import file |

## Post-Setup: 7 Automations (Manual in Monday UI)

These must be added via Monday.com → Board → Automate (⚡):

1. **Any column changes** → Set Last Activity Date = today
2. **Risk Level → High** → Notify Owner + Create subitem
3. **Sentiment → Negative** → Set Risk Level = High + Add co-owner
4. **Risk Score ≥ 13** → Set Risk Level = High
5. **Risk Score 7-12** → Set Risk Level = Medium
6. **Risk Score < 7** → Set Risk Level = Low
7. **Every Monday 9 AM** → Email High-risk digest
