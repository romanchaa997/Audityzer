# Monday.com — Exact Formula Syntax (Copy-Paste Ready)

---

## IMPORTANT: Monday.com Formula Column Syntax

Monday.com formula columns reference other columns by their **column ID** (not display name).
To find column IDs: go to Board → `...` menu → **Developer** → or hover over the column header.

Below I use readable placeholder names. Replace them with your actual column IDs:
- `{expected_close_date}` → your "Expected Close Date" column ID
- `{last_activity_date}` → your "Last Activity Date" column ID  
- `{impact}` → your "Impact" column ID
- `{likelihood}` → your "Likelihood" column ID
- `{sentiment}` → your "Sentiment" column ID
- `{days_overdue}` → your "Days Overdue" formula column ID
- `{days_no_touch}` → your "Days No Touch" formula column ID

---

## Formula 1: Days Overdue

**Column:** `Days Overdue` (Formula)

```
IF(DAYS(TODAY(),{expected_close_date})>0,DAYS(TODAY(),{expected_close_date}),0)
```

**What it does:** Returns number of days past the Expected Close Date. Returns 0 if not yet overdue.

---

## Formula 2: Days No Touch

**Column:** `Days No Touch` (Formula)

```
DAYS(TODAY(),{last_activity_date})
```

**What it does:** Returns number of days since last activity/touch.

---

## Formula 3: Risk Score (Main Formula)

**Column:** `Risk Score` (Formula)

```
{impact}*2+(6-{likelihood})+IF(DAYS(TODAY(),{expected_close_date})>0,MIN(DAYS(TODAY(),{expected_close_date}),10),0)+IF(DAYS(TODAY(),{last_activity_date})>7,3,0)+IF("{sentiment}"="Negative",4,IF("{sentiment}"="Neutral",1,0))
```

### Breakdown of the formula:

| Component | Formula Part | Max Points | Logic |
|-----------|-------------|------------|-------|
| **Base Impact** | `{impact}*2` | 10 | Higher impact = more risk weight |
| **Inverse Likelihood** | `(6-{likelihood})` | 5 | Lower likelihood = higher risk |
| **Delay Factor** | `IF(DAYS(...)>0, MIN(...,10), 0)` | 10 | Capped at 10 days overdue |
| **Idle Factor** | `IF(DAYS(...)>7, 3, 0)` | 3 | +3 if no touch in 7+ days |
| **Sentiment Factor** | `IF("..."="Negative",4,...)` | 4 | +4 Negative, +1 Neutral, 0 Positive |
| **Total possible** | | **32** | |

### Score Interpretation:

| Risk Score | Risk Level | Action |
|-----------|------------|--------|
| 0–6 | **Low** (Green) | Monitor, no escalation |
| 7–12 | **Medium** (Yellow) | Owner review, adjust plan |
| ≥13 | **High** (Red) | Escalate, ClickUp Risk Register, dedicated meeting |

---

## Alternative: Simplified Risk Score

If the full formula is too complex for your board, use this simplified version:

```
{impact}*{likelihood}
```

Then the 5×5 risk matrix applies:
- 1–6 = Low
- 7–14 = Medium  
- 15–25 = High

---

## Formula 4: Risk Level as Text (Optional)

If you want Risk Level as a formula text column instead of Status:

```
IF({risk_score}>=13,"High",IF({risk_score}>=7,"Medium","Low"))
```

**Note:** This creates a Text column. If you want a colored Status column, use automations instead (see `03-automations.md`).

---

## Monday.com Formula Tips

1. **Status columns in formulas:** When referencing a Status column (like Sentiment), wrap in quotes: `"{sentiment}"`
2. **Date functions:** `DAYS(date1, date2)` returns difference in days. `TODAY()` returns current date.
3. **MIN/MAX:** `MIN(value, cap)` to cap values.
4. **Nesting:** Monday supports up to ~3 levels of IF nesting.
5. **Column IDs:** Click the column header → "Column Settings" → the ID appears in the URL or API panel.
