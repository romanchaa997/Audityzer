# Monday.com CRM — Deals Board Column Setup
## Exact copy-paste column configuration for AuditorSEC risk pipeline

---

## Step 1: Add columns to your Deals board

Go to your **Deals board** → click `+` (Add Column) → add each:

### 1. Stage (Status column — likely already exists)
- **Column type:** Status
- **Labels:** Lead → Qualified → Proposal → Negotiation → Closed Won → Closed Lost
- **Colors:** Blue → Yellow → Orange → Purple → Green → Red

### 2. Owner (People column — likely already exists)
- **Column type:** People
- **Purpose:** Responsible sales rep

### 3. Deal Value (Numbers column)
- **Column type:** Numbers
- **Unit:** $ (or ₴)
- **Purpose:** Deal monetary value

### 4. Expected Close Date (Date column)
- **Column type:** Date
- **Column title:** `Expected Close Date`

### 5. Last Activity Date (Date column)
- **Column type:** Date
- **Column title:** `Last Activity Date`
- **Note:** Will be updated by automation on every status/update change

### 6. Sentiment (Status column)
- **Column type:** Status
- **Column title:** `Sentiment`
- **Labels:**
  - `Positive` → Green (#00C875)
  - `Neutral` → Yellow (#FDAB3D)
  - `Negative` → Red (#E2445C)
- **Default:** Neutral

### 7. Likelihood (Numbers column)
- **Column type:** Numbers
- **Column title:** `Likelihood`
- **Unit:** None
- **Values:** 1–5 (1 = almost 0% close probability, 5 = very high)

### 8. Impact (Numbers column)
- **Column type:** Numbers
- **Column title:** `Impact`
- **Unit:** None
- **Values:** 1–5 (1 = small deal, 5 = strategic client)

### 9. Days Overdue (Formula column)
- **Column type:** Formula
- **Column title:** `Days Overdue`

### 10. Days No Touch (Formula column)
- **Column type:** Formula
- **Column title:** `Days No Touch`

### 11. Risk Score (Formula column)
- **Column type:** Formula
- **Column title:** `Risk Score`

### 12. Risk Level (Status column)
- **Column type:** Status
- **Column title:** `Risk Level`
- **Labels:**
  - `Low` → Green (#00C875)
  - `Medium` → Yellow (#FDAB3D)
  - `High` → Red (#E2445C)

---

## Step 2: Column Order (left to right)

```
Item Name | Stage | Owner | Deal Value | Expected Close Date | Last Activity Date | Sentiment | Likelihood | Impact | Days Overdue | Days No Touch | Risk Score | Risk Level
```
