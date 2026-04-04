# Monday.com — Exact Automation Recipes (Copy-Paste Ready)

Go to: **Board** → **Automate** (⚡ icon top-right) → **+ Add Automation**

---

## Automation 1: Auto-Update Last Activity Date

**Purpose:** Every time an item is updated (status change, note, etc.), stamp the current date.

**Recipe (Custom):**
```
When any column changes, set "Last Activity Date" to "today"
```

**Step-by-step in monday UI:**
1. Click "Add Automation" → "Custom Automation"
2. Trigger: `When any column changes`
3. Action: `Set date to today` → select column `Last Activity Date`
4. Save

---

## Automation 2: Risk Level = High → Notify Owner + Create Subitem

**Purpose:** When Risk Score hits ≥13 (High), alert the deal owner and create a review task.

**Recipe (Custom):**
```
When "Risk Level" changes to "High", notify "Owner" with "⚠️ RISK ALERT: {item name} is now HIGH risk (Score: {Risk Score}). Immediate review required." and create a subitem with name "🔴 Risk Review: {item name}"
```

**Step-by-step in monday UI:**
1. Click "Add Automation" → "Custom Automation"
2. Trigger: `When status changes to something`
   - Column: `Risk Level`
   - Status: `High`
3. Action 1: `Notify someone`
   - Who: `{Owner}` (the People column)
   - Message: `⚠️ RISK ALERT: {item name} is now HIGH risk (Score: {Risk Score}). Immediate review required.`
4. Action 2: `Create a subitem`
   - Name: `🔴 Risk Review: {item name}`
   - (Optional: assign to Owner, set due date = today + 2 days)
5. Save

---

## Automation 3: Negative Sentiment → Escalate to High + Assign Co-Owner

**Purpose:** When AI sentiment detects Negative, auto-escalate risk and add you as co-owner.

**Recipe (Custom):**
```
When "Sentiment" changes to "Negative", set "Risk Level" to "High" and add "rigoro13111997@gmail.com" as "Owner"
```

**Step-by-step in monday UI:**
1. Click "Add Automation" → "Custom Automation"
2. Trigger: `When status changes to something`
   - Column: `Sentiment`
   - Status: `Negative`
3. Action 1: `Change status`
   - Column: `Risk Level`
   - To: `High`
4. Action 2: `Assign person`
   - Column: `Owner`
   - Person: **Your account** (adds as additional owner, doesn't replace)
5. Save

---

## Automation 4: Risk Score → Risk Level (Status Auto-Set)

**Purpose:** Automatically set the Risk Level status based on the calculated Risk Score formula.

Since Monday formulas can't directly write to Status columns, use 3 automations:

### 4a. Score ≥ 13 → High
```
When "Risk Score" changes and is greater than or equal to 13, set "Risk Level" to "High"
```

**Step-by-step:**
1. Trigger: `When a column value changes` → `Risk Score`
2. Condition: `and only if` → `Risk Score` → `is greater than or equal to` → `13`
3. Action: `Change status` → `Risk Level` → `High`

### 4b. Score 7–12 → Medium
```
When "Risk Score" changes and is between 7 and 12, set "Risk Level" to "Medium"
```

**Step-by-step:**
1. Trigger: `When a column value changes` → `Risk Score`
2. Condition: `and only if` → `Risk Score` → `is greater than or equal to` → `7`
3. Additional condition: `and` → `Risk Score` → `is less than` → `13`
4. Action: `Change status` → `Risk Level` → `Medium`

### 4c. Score 0–6 → Low
```
When "Risk Score" changes and is less than 7, set "Risk Level" to "Low"
```

**Step-by-step:**
1. Trigger: `When a column value changes` → `Risk Score`
2. Condition: `and only if` → `Risk Score` → `is less than` → `7`
3. Action: `Change status` → `Risk Level` → `Low`

---

## Automation 5: Weekly High-Risk Digest

**Purpose:** Every Monday morning, send a digest of all High-risk deals.

**Recipe:**
```
Every week on Monday, send an email to "rigoro13111997@gmail.com" with subject "⚠️ Weekly High-Risk Deals Digest" including all items where "Risk Level" is "High"
```

**Step-by-step:**
1. Click "Add Automation" → "Recurring"
2. Trigger: `Every time period` → `Every week` → `Monday at 9:00 AM`
3. Condition: `and only if` → `Risk Level` → `is` → `High`
4. Action: `Send an email`
   - To: `rigoro13111997@gmail.com`
   - Subject: `⚠️ Weekly High-Risk Deals Digest — {board name}`
   - Body: `The following deals are at HIGH risk:\n\n{item name} — Score: {Risk Score} — Owner: {Owner} — Value: {Deal Value}\n\nPlease review and update mitigation plans.`
5. Save

**Alternative via Dashboard:**
1. Create a Dashboard → Add Widget → Board widget
2. Filter: `Risk Level` = `High`
3. Share this dashboard view with your team

---

## Automation 6: Stale Deal Alert (No Activity 14+ Days)

**Purpose:** Alert when a deal has had no activity for 14+ days.

**Recipe:**
```
When "Last Activity Date" is more than 14 days ago and "Stage" is not "Closed Won" or "Closed Lost", notify "Owner" with "🕐 STALE DEAL: {item name} has had no activity for 14+ days. Please update or close."
```

**Step-by-step:**
1. Trigger: `When a date arrives`
   - Column: `Last Activity Date`
   - When: `14 days after date`
2. Condition: `and only if` → `Stage` → `is not` → `Closed Won`
3. Additional condition: `and` → `Stage` → `is not` → `Closed Lost`
4. Action: `Notify someone` → `{Owner}`
   - Message: `🕐 STALE DEAL: {item name} has had no activity for 14+ days. Please update or close.`
5. Save

---

## Automation 7: New High-Risk → Create ClickUp Task

**Purpose:** When a deal becomes High risk, auto-create a task in ClickUp Risk Register.

**This requires an integration (Zapier/Make.com/n8n).** See `04-clickup-integration.md`.

---

## Summary of All Automations

| # | Trigger | Action | Priority |
|---|---------|--------|----------|
| 1 | Any column changes | Set Last Activity Date = today | P1 |
| 2 | Risk Level → High | Notify Owner + Create subitem | P1 |
| 3 | Sentiment → Negative | Set Risk Level = High + Add co-owner | P1 |
| 4a | Risk Score ≥ 13 | Set Risk Level = High | P1 |
| 4b | Risk Score 7–12 | Set Risk Level = Medium | P1 |
| 4c | Risk Score < 7 | Set Risk Level = Low | P1 |
| 5 | Every Monday 9 AM | Email High-risk digest | P2 |
| 6 | Last Activity 14+ days ago | Notify Owner about stale deal | P2 |
| 7 | Risk Level → High | Create ClickUp task (via integration) | P2 |
