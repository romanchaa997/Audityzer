# AuditorSEC Open Data API

Public read-only API for accessing AuditorSEC audit data, competitive intelligence, and notebook catalogs.

## Base URL

- **Production**: `https://api.bbbhhai.com` (Cloudflare Worker + Hyperdrive)
- **Local**: `http://localhost:8000`

## Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/public/files` | List active audit files (filterable by `domain`, `project`) |
| `GET /api/public/intelligence` | Top competitive intelligence entries by relevance |
| `GET /api/public/notebooks` | Notebook catalog with file metadata |
| `GET /api/public/stats` | Aggregated file inventory statistics |

## Authentication

No authentication required. All endpoints are read-only and publicly accessible.

## CORS

All endpoints return permissive CORS headers (`Access-Control-Allow-Origin: *`) for browser-based integrations.

## Examples

```bash
# List all DeFi audit files
curl https://api.bbbhhai.com/api/public/files?domain=defi

# Get competitive intelligence
curl https://api.bbbhhai.com/api/public/intelligence

# Get notebook catalog
curl https://api.bbbhhai.com/api/public/notebooks

# Get file inventory stats
curl https://api.bbbhhai.com/api/public/stats
```

## Architecture

- **Cloudflare Worker** (`db/hyperdrive/worker.js`) handles routing and CORS
- **Hyperdrive** provides connection pooling and caching to Railway Postgres
- **FastAPI** (`db/api/main.py`) serves the same endpoints for direct K8s access
- **OpenAPI spec** (`openapi.yaml`) documents all endpoints

## Rate Limits

Cloudflare Worker free tier: 100,000 requests/day. No per-endpoint limits.
