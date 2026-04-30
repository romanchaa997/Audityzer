# AuditorSEC — Secrets & Environment Variables Setup
# Sprint 260h | 2026-04-19
# Required for full API functionality (audit + report endpoints)

## ⚠️ Critical: Do NOT commit secrets to git
All secrets must be set via Railway dashboard, GitHub Secrets, or `.env` (gitignored).

---

## 1. Railway Production Secrets

Navigate to: [Railway Dashboard](https://railway.com/project/5480689f-0092-402c-8b9e-0d003872183f)

Service: **Audityzer** → Tab: **Variables**

### Required Variables

```bash
# OpenAI (required for /api/v1/audit)
OPENAI_API_KEY=sk-proj-...

# MinIO (required for /api/v1/report PDF upload)
MINIO_ENDPOINT=minio:9000
MINIO_ACCESS_KEY=audityzer-access
MINIO_SECRET_KEY=audityzer-secret-32chars-minimum
MINIO_SECURE=false
MINIO_BUCKET=audit-reports

# App config
NODE_ENV=production
PORT=3000
```

### Optional (monitoring)
```bash
# Grafana / Prometheus
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=your-strong-password

# Telegram alerts
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

---

## 2. GitHub Actions Secrets

Navigate to: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

### Required for `optimism-scan.yml` (PR #178)
```bash
OPTIMISM_RPC_URL=https://mainnet.optimism.io
# Or use Alchemy/Infura for better reliability:
# OPTIMISM_RPC_URL=https://opt-mainnet.g.alchemy.com/v2/YOUR_KEY
```

### Required for CI/CD pipelines
```bash
# Railway deployment
RAILWAY_TOKEN=your-railway-token

# Docker registry (if using DOCR)
DOCR_TOKEN=your-digitalocean-token

# S3 backup (optional)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=audityzer-backups
```

### Required for security scans
```bash
# Slither / Foundry (Ethereum node)
ETH_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
```

---

## 3. Local Development (.env)

Create `.env` in project root (already in `.gitignore`):

```bash
# Copy from .env.example and fill in:
cp .env.example .env

# Edit .env:
OPENAI_API_KEY=sk-proj-...
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin123
MINIO_SECURE=false
MINIO_BUCKET=audit-reports
OPTIMISM_RPC_URL=https://mainnet.optimism.io
NODE_ENV=development
PORT=3000
```

---

## 4. Docker Compose (local stack)

Start full local stack:
```bash
# Start MinIO + FastAPI + Prometheus + Grafana
docker compose up -d

# Verify MinIO is running
curl http://localhost:9000/minio/health/live

# Verify API is running
curl http://localhost:3000/health
```

MinIO console: http://localhost:9001 (login: minioadmin / minioadmin)

---

## 5. Trigger Optimism Scan Manually

After adding `OPTIMISM_RPC_URL` to GitHub Secrets:

1. Go to **Actions** tab
2. Find **"Optimism Chain Security Scan"** workflow (PR #178)
3. Click **"Run workflow"**
4. Select `scan_depth: quick` for initial test
5. Check results in **"optimism-scan-N"** artifact

---

## 6. Verify Full Stack

```bash
# 1. Health check
curl https://audityzer-production-5112.up.railway.app/health
# Expected: {"status":"ok","version":"1.1.3","service":"AuditorSEC"}

# 2. Audit endpoint (after OPENAI_API_KEY set)
curl -X POST https://audityzer-production-5112.up.railway.app/api/v1/audit \
  -H "Content-Type: application/json" \
  -d '{"project_name":"Verify","log_text":"transfer(0x1,0x2,1000)"}'

# 3. Report endpoint (after MINIO_* set)
curl -X POST https://audityzer-production-5112.up.railway.app/api/v1/report \
  -H "Content-Type: application/json" \
  -d '{"project_name":"Verify","log_text":"No issues found."}'
# Expected: {"report_url": "http://minio.../reports/..._audit.pdf?...", ...}
```

---

## 7. Security Notes

- Never use default MinIO credentials (`minioadmin`) in production
- Rotate `OPENAI_API_KEY` every 90 days
- Enable Railway private networking for MinIO (disable public endpoint)
- Use `MINIO_SECURE=true` with TLS in production
- `MINIO_SECRET_KEY` must be at least 8 characters (MinIO requirement)

---

*AuditorSEC / Audityzer | Sprint 260h | 2026-04-19*
