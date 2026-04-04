"""
UHIP-2A Batch Import Script
Reads file inventory from JSON, auto-classifies, upserts into Postgres.

Usage:
    python db/batch_update.py --input files.json
    python db/batch_update.py --input files.csv
"""

import argparse
import csv
import json
import os
import re
import sys
from datetime import datetime, timedelta, timezone

import asyncio
import asyncpg

DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/auditorsec",
)

# ── Classification rules (mirror of api/main.py) ──────────────

DOMAIN_RULES = [
    (re.compile(r"(railway|docker|k8s|bot_ecosystem|n8n|deploy|ci.cd)", re.I), "infra"),
    (re.compile(r"(pitch.?deck|executive.?summary|investor|financial.?model|one.?pager)", re.I), "strategy"),
    (re.compile(r"(brave1|track.[abcd]|flare|grant|diana)", re.I), "grants"),
    (re.compile(r"(monday|clickup|quick.?start|automation|formula|column)", re.I), "ops"),
    (re.compile(r"(dnssec|ds.record|security|vulnerability|cve)", re.I), "security"),
    (re.compile(r"(compliance|correction|legal|vat|regulation)", re.I), "legal"),
    (re.compile(r"(budget|invoice|financial|revenue)", re.I), "finance"),
    (re.compile(r"(slide|presentation|report|plan|chart|media|pqc|greengrid|uhip|audit)", re.I), "media"),
]

TAG_RULES = [
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

PROJECT_RULES = [
    (re.compile(r"bakhmach|greengrid|green.energy", re.I), "Bakhmach"),
    (re.compile(r"uhip|rehab", re.I), "UHIP2A"),
    (re.compile(r"audit(or)?sec|pqc|defi|bridge|nis2", re.I), "AuditorSEC"),
]


def classify_file(name: str, file_type: str) -> dict:
    text = f"{name} {file_type}"
    domain = "ops"
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

    return {"domain": domain, "web3_tags": list(set(tags)), "project": project}


def compute_priority(upload_date_str: str | None, domain: str, web3_tags: list[str]) -> float:
    score = 0.0
    now = datetime.now(timezone.utc)

    if upload_date_str:
        try:
            upload_date = datetime.fromisoformat(upload_date_str.replace("Z", "+00:00"))
            age = now - upload_date
            if age < timedelta(days=7):
                score += 3
            elif age < timedelta(days=30):
                score += 2
            elif age < timedelta(days=90):
                score += 1
        except ValueError:
            pass

    score += 2  # default medium access frequency

    if domain in ("security", "grants"):
        score += 2
    elif domain == "infra":
        score += 1

    high_value = {"PQC", "DeFi", "smart-contract"}
    score += len(high_value & set(web3_tags))

    return round(score, 2)


def load_json(path: str) -> list[dict]:
    with open(path) as f:
        data = json.load(f)
    return data if isinstance(data, list) else data.get("files", [])


def load_csv(path: str) -> list[dict]:
    with open(path) as f:
        return list(csv.DictReader(f))


async def upsert_files(records: list[dict]):
    conn = await asyncpg.connect(DATABASE_URL)
    inserted = 0
    updated = 0
    errors = 0

    for rec in records:
        name = rec.get("name", "").strip()
        if not name:
            errors += 1
            continue

        file_type = rec.get("type", "other")
        classification = classify_file(name, file_type)

        domain = rec.get("domain") or classification["domain"]
        tags = rec.get("web3_tags", classification["web3_tags"])
        if isinstance(tags, str):
            tags = [t.strip() for t in tags.split(",")]

        upload_date = rec.get("upload_date")
        priority = compute_priority(upload_date, domain, tags)

        try:
            result = await conn.execute(
                """
                INSERT INTO files (name, type, domain, url, upload_date, priority_score,
                                   status, web3_tags, checksum, size_bytes, metadata,
                                   tenant_id, engagement_id)
                VALUES ($1,$2,$3,$4,$5::timestamptz,$6,$7,$8,$9,$10,$11::jsonb,$12,$13)
                ON CONFLICT (id) DO UPDATE SET
                    domain = EXCLUDED.domain,
                    web3_tags = EXCLUDED.web3_tags,
                    priority_score = EXCLUDED.priority_score,
                    metadata = EXCLUDED.metadata,
                    updated_at = NOW()
                """,
                name,
                file_type,
                domain,
                rec.get("url"),
                upload_date,
                priority,
                rec.get("status", "active"),
                tags,
                rec.get("checksum"),
                int(rec["size_bytes"]) if rec.get("size_bytes") else None,
                json.dumps(rec.get("metadata", {})),
                rec.get("tenant_id"),
                rec.get("engagement_id"),
            )
            if "INSERT" in result:
                inserted += 1
            else:
                updated += 1
        except Exception as e:
            print(f"  ERROR: {name} — {e}")
            errors += 1

    await conn.close()
    return {"inserted": inserted, "updated": updated, "errors": errors}


def main():
    parser = argparse.ArgumentParser(description="UHIP-2A Batch File Importer")
    parser.add_argument("--input", "-i", required=True, help="Path to JSON or CSV file")
    args = parser.parse_args()

    path = args.input
    if not os.path.exists(path):
        print(f"File not found: {path}")
        sys.exit(1)

    ext = os.path.splitext(path)[1].lower()
    if ext == ".json":
        records = load_json(path)
    elif ext == ".csv":
        records = load_csv(path)
    else:
        print(f"Unsupported format: {ext} (use .json or .csv)")
        sys.exit(1)

    print(f"Loaded {len(records)} records from {path}")
    result = asyncio.run(upsert_files(records))
    print(f"Done: {result['inserted']} inserted, {result['updated']} updated, {result['errors']} errors")


if __name__ == "__main__":
    main()
