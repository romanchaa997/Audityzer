# UHIP-2A / AuditorSEC — Multi-Tenant Postgres Database

Multi-tenant Postgres schema with FastAPI ingestion API for the UHIP-2A ecosystem (AuditorSEC, RehabFund, Bakhmach pilot).

## Schema Diagram (ASCII)

```
┌──────────────┐      ┌─────────────────┐      ┌───────────────────┐
│   accounts   │──1:N─│   engagements   │──1:N─│    risk_events    │
│              │      │                 │      │   (risk_score =   │
│  id (UUID)   │      │  id (UUID)      │      │   severity*impact)│
│  name        │      │  account_id FK  │      │  engagement_id FK │
│  vat         │      │  name           │      │  entity_type      │
│  metadata {} │      │  type/status    │      │  risk_category    │
└──────┬───────┘      │  risk_level     │      │  severity/impact  │
       │              │  deadline       │      └───────────────────┘
       │              └────────┬────────┘
       │                       │
       │ 1:N                   │ 1:N
       ▼                       ▼
┌──────────────────────────────────────────┐
│                 files                     │
│  id (UUID)  │  tenant_id FK (→accounts)  │
│  name       │  engagement_id FK          │
│  type       │  domain (infra/strategy/…) │
│  web3_tags []  │  priority_score         │
│  metadata {}   │  status                 │
│  checksum      │  upload_date            │
└──────────┬───────────────────────────────┘
           │ 1:N                    │ 1:N
           ▼                        ▼
┌──────────────────┐    ┌──────────────────┐
│  media_catalog   │    │   automations    │
│  file_id FK      │    │  file_id FK      │
│  media_type      │    │  trigger_type    │
│  project         │    │  action_type     │
│  classification{}│    │  n8n_workflow_id  │
│  ocr_text        │    │  webhook_url     │
└──────────────────┘    └──────────────────┘

Materialized Views:
  active_media         — media files from last 30 days
  high_risk_dashboard  — unresolved risks with score >= 10
  file_inventory       — aggregated counts by domain/type
```

## Quick Start (Local)

```bash
cd db
docker compose up -d
```

This starts:
- **Postgres 16** on port `5432` (auto-runs migrations + seed data)
- **FastAPI** on port `8000` (with hot-reload)

Verify:
```bash
curl http://localhost:8000/health
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/files/ingest` | Upsert file with auto-classification and priority scoring |
| `POST` | `/api/v1/files/classify` | Classify a file by name/type → domain, tags, project |
| `GET` | `/api/v1/files` | Query files with filters (domain, status, type, after, web3_tags) |
| `GET` | `/api/v1/dashboard/risks` | High-risk dashboard (materialized view) |
| `GET` | `/api/v1/dashboard/inventory` | File inventory by domain (materialized view) |
| `POST` | `/api/v1/webhooks/n8n` | Receive n8n automation triggers |
| `GET` | `/health` | DB connection status + table row counts |

### Examples

**Ingest a file:**
```bash
curl -X POST http://localhost:8000/api/v1/files/ingest \
  -H "Content-Type: application/json" \
  -d '{"name": "Pqc Master Plan", "type": "pdf"}'
```

**Classify a file:**
```bash
curl -X POST http://localhost:8000/api/v1/files/classify \
  -H "Content-Type: application/json" \
  -d '{"name": "BRAVE1 Track C Draft", "type": "docx"}'
```

**Query files:**
```bash
curl "http://localhost:8000/api/v1/files?domain=security&status=active"
```

## Batch Import

```bash
# From JSON
python db/batch_update.py --input files.json

# From CSV
python db/batch_update.py --input files.csv
```

JSON format:
```json
[
  {"name": "My File", "type": "pdf", "url": "https://..."},
  {"name": "Another", "type": "docx", "domain": "strategy"}
]
```

## n8n Integration

Import `db/n8n/file-classifier-workflow.json` into your n8n instance.

Flow: Webhook → Classify → Route by Domain → Ingest → Telegram Notification

Set environment variables in n8n:
- `FASTAPI_BASE_URL` — e.g., `http://api:8000`
- `TELEGRAM_CHAT_ID` — target chat for notifications

## Deploy to Railway

1. Create a new Railway project
2. Add a Postgres plugin (Railway provides `DATABASE_URL` automatically)
3. Deploy the FastAPI service:
   ```bash
   cd db/api
   railway up
   ```
4. Run migrations:
   ```bash
   railway run psql $DATABASE_URL -f db/migrations/001_init_schema.sql
   railway run psql $DATABASE_URL -f db/seeds/001_seed_data.sql
   ```
5. Set the health check path to `/health`

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/auditorsec` |

## Prisma (TypeScript/Node.js)

A Prisma schema is provided at `db/prisma/schema.prisma` for TypeScript integration:

```bash
cd db/prisma
npx prisma generate
npx prisma db pull   # introspect existing DB
```

## Multi-Tenancy

Row-Level Security (RLS) is enabled on the `files` table. Set the tenant context per connection:

```sql
SET app.current_tenant = 'a0000000-0000-0000-0000-000000000001';
SELECT * FROM files;  -- only returns files for AuditorSEC LLC
```

## Materialized View Refresh

Views are refreshed on seed. For production, set up a cron job:

```sql
REFRESH MATERIALIZED VIEW CONCURRENTLY active_media;
REFRESH MATERIALIZED VIEW CONCURRENTLY high_risk_dashboard;
REFRESH MATERIALIZED VIEW CONCURRENTLY file_inventory;
```

Recommended: every 15 minutes via K8s CronJob or pg_cron.
