"""
UHIP-2A / AuditorSEC — FastAPI Ingestion Service
Async Postgres via asyncpg, multi-tenant file management.
"""

import os
import re
from datetime import datetime, timedelta, timezone
from typing import Optional
from uuid import UUID

import asyncpg
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/auditorsec",
)

app = FastAPI(title="UHIP-2A Ingestion API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pool: Optional[asyncpg.Pool] = None


@app.on_event("startup")
async def startup():
    global pool
    pool = await asyncpg.create_pool(DATABASE_URL, min_size=2, max_size=10)


@app.on_event("shutdown")
async def shutdown():
    if pool:
        await pool.close()


# ── Pydantic models ────────────────────────────────────────────

class FileIngest(BaseModel):
    name: str
    type: str = "other"
    domain: Optional[str] = None
    url: Optional[str] = None
    upload_date: Optional[datetime] = None
    status: str = "active"
    web3_tags: list[str] = Field(default_factory=list)
    checksum: Optional[str] = None
    size_bytes: Optional[int] = None
    metadata: dict = Field(default_factory=dict)
    tenant_id: Optional[UUID] = None
    engagement_id: Optional[UUID] = None


class FileClassifyRequest(BaseModel):
    name: str
    type: str = "other"


class WebhookPayload(BaseModel):
    trigger_type: str
    action_type: str = "n8n_workflow"
    file_id: Optional[UUID] = None
    engagement_id: Optional[UUID] = None
    n8n_workflow_id: Optional[str] = None
    webhook_url: Optional[str] = None
    payload: dict = Field(default_factory=dict)


# ── Classification logic ───────────────────────────────────────

DOMAIN_RULES: list[tuple[re.Pattern, str]] = [
    (re.compile(r"(railway|docker|k8s|bot_ecosystem|n8n|deploy|ci.cd)", re.I), "infra"),
    (re.compile(r"(pitch.?deck|executive.?summary|investor|financial.?model|one.?pager)", re.I), "strategy"),
    (re.compile(r"(brave1|track.[abcd]|flare|grant|diana)", re.I), "grants"),
    (re.compile(r"(monday|clickup|quick.?start|automation|formula|column)", re.I), "ops"),
    (re.compile(r"(dnssec|ds.record|security|vulnerability|cve)", re.I), "security"),
    (re.compile(r"(compliance|correction|legal|vat|regulation)", re.I), "legal"),
    (re.compile(r"(budget|invoice|financial|revenue)", re.I), "finance"),
    (re.compile(r"(slide|presentation|report|plan|chart|media|pqc|greengrid|uhip|audit)", re.I), "media"),
]

TAG_RULES: list[tuple[re.Pattern, str]] = [
    (re.compile(r"pqc|quantum|post.quantum", re.I), "PQC"),
    (re.compile(r"defi|bridge|swap", re.I), "DeFi"),
    (re.compile(r"smart.?contract|solidity", re.I), "smart-contract"),
    (re.compile(r"osint|recon", re.I), "OSINT"),
    (re.compile(r"nato|diana|defense|brave1", re.I), "defense"),
    (re.compile(r"telegram|bot", re.I), "telegram"),
    (re.compile(r"n8n|automation|workflow", re.I), "automation"),
    (re.compile(r"deploy|railway|k8s|docker", re.I), "deployment"),
    (re.compile(r"investor|fundrais|pitch", re.I), "investors"),
    (re.compile(r"green.?energy|esg|solar|wind", re.I), "ESG"),
    (re.compile(r"dns|dnssec", re.I), "DNS"),
    (re.compile(r"crm|monday", re.I), "CRM"),
    (re.compile(r"prozorro|tender", re.I), "procurement"),
]

PROJECT_RULES: list[tuple[re.Pattern, str]] = [
    (re.compile(r"bakhmach|greengrid|green.energy", re.I), "Bakhmach"),
    (re.compile(r"uhip|rehab", re.I), "UHIP2A"),
    (re.compile(r"audit(or)?sec|pqc|defi|bridge|nis2", re.I), "AuditorSEC"),
]


def classify_file(name: str, file_type: str) -> dict:
    text = f"{name} {file_type}"
    domain = None
    for pattern, d in DOMAIN_RULES:
        if pattern.search(text):
            domain = d
            break

    tags = []
    for pattern, tag in TAG_RULES:
        if pattern.search(text):
            tags.append(tag)

    project = "Other"
    for pattern, p in PROJECT_RULES:
        if pattern.search(text):
            project = p
            break

    return {"domain": domain or "ops", "web3_tags": list(set(tags)), "project": project}


def compute_priority(
    upload_date: Optional[datetime],
    domain: Optional[str],
    web3_tags: list[str],
    access_frequency: str = "medium",
) -> float:
    score = 0.0
    now = datetime.now(timezone.utc)
    if upload_date:
        age = now - upload_date
        if age < timedelta(days=7):
            score += 3
        elif age < timedelta(days=30):
            score += 2
        elif age < timedelta(days=90):
            score += 1

    freq_map = {"high": 3, "medium": 2, "low": 1}
    score += freq_map.get(access_frequency, 1)

    if domain in ("security", "grants"):
        score += 2
    elif domain == "infra":
        score += 1

    high_value_tags = {"PQC", "DeFi", "smart-contract"}
    score += len(high_value_tags & set(web3_tags))

    return round(score, 2)


# ── Endpoints ──────────────────────────────────────────────────

@app.post("/api/v1/files/ingest")
async def ingest_file(body: FileIngest):
    classification = classify_file(body.name, body.type)
    domain = body.domain or classification["domain"]
    tags = body.web3_tags or classification["web3_tags"]
    upload_date = body.upload_date or datetime.now(timezone.utc)
    priority = compute_priority(upload_date, domain, tags)

    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO files (
                tenant_id, engagement_id, name, type, domain, url,
                upload_date, priority_score, status, web3_tags,
                checksum, size_bytes, metadata
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
            ON CONFLICT (id) DO UPDATE SET
                domain = EXCLUDED.domain,
                web3_tags = EXCLUDED.web3_tags,
                priority_score = EXCLUDED.priority_score,
                metadata = EXCLUDED.metadata,
                updated_at = NOW()
            RETURNING id, name, domain, priority_score, web3_tags
            """,
            str(body.tenant_id) if body.tenant_id else None,
            str(body.engagement_id) if body.engagement_id else None,
            body.name,
            body.type,
            domain,
            body.url,
            upload_date,
            priority,
            body.status,
            tags,
            body.checksum,
            body.size_bytes,
            body.metadata,
        )
    return {
        "id": str(row["id"]),
        "name": row["name"],
        "domain": row["domain"],
        "priority_score": float(row["priority_score"]),
        "web3_tags": row["web3_tags"],
        "status": "upserted",
    }


@app.post("/api/v1/files/classify")
async def classify_endpoint(body: FileClassifyRequest):
    result = classify_file(body.name, body.type)
    return result


@app.get("/api/v1/files")
async def list_files(
    domain: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
    after: Optional[str] = Query(None, description="ISO date, e.g. 2026-03-01"),
    web3_tags: Optional[str] = Query(None, description="Comma-separated tags"),
    limit: int = Query(50, le=200),
    offset: int = Query(0, ge=0),
):
    conditions = []
    params: list = []
    idx = 1

    if domain:
        conditions.append(f"domain = ${idx}")
        params.append(domain)
        idx += 1
    if status:
        conditions.append(f"status = ${idx}")
        params.append(status)
        idx += 1
    if type:
        conditions.append(f"type = ${idx}")
        params.append(type)
        idx += 1
    if after:
        conditions.append(f"upload_date >= ${idx}::timestamptz")
        params.append(after)
        idx += 1
    if web3_tags:
        tag_list = [t.strip() for t in web3_tags.split(",")]
        conditions.append(f"web3_tags && ${idx}")
        params.append(tag_list)
        idx += 1

    where = "WHERE " + " AND ".join(conditions) if conditions else ""
    params.extend([limit, offset])

    query = f"""
        SELECT id, tenant_id, name, type, domain, url, upload_date,
               priority_score, status, web3_tags, metadata
        FROM files {where}
        ORDER BY priority_score DESC, upload_date DESC
        LIMIT ${idx} OFFSET ${idx + 1}
    """

    async with pool.acquire() as conn:
        rows = await conn.fetch(query, *params)

    return [dict(r) for r in rows]


@app.get("/api/v1/dashboard/risks")
async def dashboard_risks():
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            "SELECT * FROM high_risk_dashboard ORDER BY risk_score DESC"
        )
    return [dict(r) for r in rows]


@app.get("/api/v1/dashboard/inventory")
async def dashboard_inventory():
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            "SELECT * FROM file_inventory ORDER BY file_count DESC"
        )
    return [dict(r) for r in rows]


@app.post("/api/v1/webhooks/n8n")
async def n8n_webhook(body: WebhookPayload):
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO automations (
                file_id, engagement_id, trigger_type, action_type,
                n8n_workflow_id, webhook_url, payload_template,
                is_active, last_triggered, trigger_count
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,TRUE,NOW(),1)
            RETURNING id
            """,
            str(body.file_id) if body.file_id else None,
            str(body.engagement_id) if body.engagement_id else None,
            body.trigger_type,
            body.action_type,
            body.n8n_workflow_id,
            body.webhook_url,
            body.payload,
        )
    return {"id": str(row["id"]), "status": "created"}


@app.get("/health")
async def health():
    try:
        async with pool.acquire() as conn:
            tables = await conn.fetch(
                """
                SELECT table_name FROM information_schema.tables
                WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
                """
            )
            counts = {}
            for t in tables:
                name = t["table_name"]
                row = await conn.fetchrow(f"SELECT COUNT(*) AS cnt FROM {name}")
                counts[name] = row["cnt"]
        return {"status": "healthy", "database": "connected", "tables": counts}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database error: {e}")
