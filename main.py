# main.py — AuditorSEC FastAPI: /audit + /report + /health
# AuditorSEC / Audityzer — BRAVE1 TRL4 PoC
# Branch: safe-improvements | 2026-04-19

import asyncio
import json
import os
from datetime import datetime, timezone

import openai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from report import generate_pdf_report

app = FastAPI(
    title="AuditorSEC API",
    description="AI-powered Web3 + IoT/NEMS security audit platform — BRAVE1 TRL4",
    version="1.0.0",
)

openai.api_key = os.getenv("OPENAI_API_KEY")

# ── Models ──────────────────────────────────────────────────────────────────────

LOG_TEXT_MAX_LEN = 8000  # ~2000 tokens; prevents DoS / runaway cost


class AuditRequest(BaseModel):
    project_name: str
    log_text: str = Field(..., max_length=LOG_TEXT_MAX_LEN)
    audit_type: str = "health_check"


class AuditResponse(BaseModel):
    project_name: str
    audit_type: str
    risk_level: str
    anomalies: list[str]
    recommendations: list[str]
    token_count: int
    timestamp: str


class ReportRequest(BaseModel):
    project_name: str
    log_text: str = Field(..., max_length=LOG_TEXT_MAX_LEN)
    audit_type: str = "health_check"


class ReportResponse(BaseModel):
    project_name: str
    audit_type: str
    risk_level: str
    anomalies: list[str]
    recommendations: list[str]
    report_url: str
    object_name: str
    timestamp: str


# ── Core audit logic ─────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are AuditorSEC — an expert AI security auditor for Web3 protocols,
IoT/NEMS sensor systems, and defense-grade infrastructure.
Analyze the provided log/description and return a structured JSON response with:
- risk_level: one of CRITICAL / HIGH / MEDIUM / LOW
- anomalies: list of specific security issues found (Ukrainian or English)
- recommendations: list of actionable remediation steps
Return ONLY valid JSON, no markdown fences."""


def _call_openai(project_name: str, audit_type: str, log_text: str) -> dict:
    """Blocking OpenAI call — run in thread pool via asyncio.to_thread()."""
    user_message = f"""Project: {project_name}
Audit Type: {audit_type}
Log/Description: {log_text}"""
    try:
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message},
            ],
            temperature=0.2,
            max_tokens=1000,
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"OpenAI error: {str(e)}")

    raw = response.choices[0].message.content
    token_count = response.usage.total_tokens
    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned invalid JSON")
    return {"parsed": parsed, "token_count": token_count}


async def run_audit(request: AuditRequest) -> AuditResponse:
    """Core audit logic — calls OpenAI in thread pool to avoid blocking event loop."""
    timestamp = datetime.now(timezone.utc).isoformat(timespec="seconds")
    result = await asyncio.to_thread(
        _call_openai, request.project_name, request.audit_type, request.log_text
    )
    parsed = result["parsed"]
    return AuditResponse(
        project_name=request.project_name,
        audit_type=request.audit_type,
        risk_level=parsed.get("risk_level", "UNKNOWN"),
        anomalies=parsed.get("anomalies", []),
        recommendations=parsed.get("recommendations", []),
        token_count=result["token_count"],
        timestamp=timestamp,
    )


# ── Endpoints ────────────────────────────────────────────────────────────────────


@app.get("/health")
async def health():
    """Health check endpoint — used by Grafana / BRAVE1 SLA monitoring."""
    return {
        "status": "ok",
        "service": "AuditorSEC API",
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.post("/api/v1/audit", response_model=AuditResponse)
async def audit_endpoint(request: AuditRequest):
    """
    AI-powered security audit — returns risk level, anomalies, recommendations.
    No PDF generated; use /api/v1/report for full PDF pipeline.
    """
    return await run_audit(request)


@app.post("/api/v1/report", response_model=ReportResponse)
async def generate_report(request: ReportRequest):
    """
    Full pipeline: AI audit + PDF generation + MinIO upload + presigned URL (24h).
    BRAVE1 TRL4 demo endpoint.
    PDF/MinIO work runs in thread pool to avoid blocking the event loop.
    """
    # 1. Run AI audit (already uses thread pool)
    audit_result = await run_audit(
        AuditRequest(
            project_name=request.project_name,
            log_text=request.log_text,
            audit_type=request.audit_type,
        )
    )

    # 2. Generate PDF and upload to MinIO in thread pool (blocking I/O)
    object_name, report_url = await asyncio.to_thread(
        generate_pdf_report,
        project_name=audit_result.project_name,
        audit_type=audit_result.audit_type,
        anomalies=audit_result.anomalies,
        risk_level=audit_result.risk_level,
        recommendations=audit_result.recommendations,
        token_count=audit_result.token_count,
        timestamp=audit_result.timestamp,
    )

    return ReportResponse(
        project_name=audit_result.project_name,
        audit_type=audit_result.audit_type,
        risk_level=audit_result.risk_level,
        anomalies=audit_result.anomalies,
        recommendations=audit_result.recommendations,
        report_url=report_url,
        object_name=object_name,
        timestamp=audit_result.timestamp,
    )
