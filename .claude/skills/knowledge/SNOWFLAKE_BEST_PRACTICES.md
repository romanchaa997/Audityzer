# Snowflake Query Best Practices

---

## One Query Per Invocation

Execute one query at a time. No semicolon-separated statements.

```sql
-- CORRECT: Single query (CTEs are fine)
WITH base AS (
    SELECT user_id, COUNT(*) as query_count
    FROM <table>
    WHERE <date_column> >= CURRENT_DATE - 1
    GROUP BY 1
)
SELECT * FROM base WHERE query_count > 10;

-- WRONG: Multiple statements
SELECT COUNT(*) FROM table1 WHERE date_pt = CURRENT_DATE - 1;
SELECT COUNT(*) FROM table2 WHERE date_pt = CURRENT_DATE - 1;
```

---

## Wildcards: Discovery Only

**`ILIKE '%pattern%'` is for discovery ONLY. Never use in final queries.**

### Discovery Phase (wildcards OK)

```sql
-- Discovering event names
SELECT DISTINCT event_name, COUNT(*) as cnt
FROM <table>
WHERE <date_column> >= CURRENT_DATE - 1
  AND event_name ILIKE '%transcri%'
GROUP BY 1
ORDER BY 2 DESC
LIMIT 20;
```

### Final Query (exact matches required)

After discovering values, use exact matches:

```sql
-- Good: Exact match in final query
SELECT COUNT(*)
FROM <table>
WHERE <date_column> >= CURRENT_DATE - 1
  AND event_name = 'start transcription';

-- Bad: Wildcard in final query
SELECT COUNT(*)
FROM <table>
WHERE <date_column> >= CURRENT_DATE - 1
  AND event_name ILIKE '%transcription%';  -- Too broad, includes unrelated events
```

---

## String Value Filtering

**Always check actual values before filtering on string columns.**

### Step 1: Discover actual values

```sql
SELECT <column>, COUNT(*) as cnt
FROM <table>
WHERE <date_column> >= CURRENT_DATE - 1
GROUP BY 1
ORDER BY cnt DESC
LIMIT 20;
```

### Step 2: Choose the correct value

If there's ambiguity (e.g., `ios` vs `mobile_ios`):

1. Use context from the user's query to determine which is relevant
2. If unclear, default to the higher-volume value
3. Always document your assumption

### Step 3: Use exact match in final query

```sql
-- Good: Exact match after discovery
SELECT COUNT(*)
FROM <table>
WHERE <date_column> >= CURRENT_DATE - 1
  AND platform = 'ios';

-- Document assumption: "Used platform='ios' (20M rows) not 'mobile_ios' (1M rows)"
```
