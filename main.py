# main.py — AuditorSEC FastAPI: /audit + /report + /health
# AuditorSEC / Audityzer — BRAVE1 TRL4 PoC
# Branch: safe-improvements | 2026-04-19

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime, timezone
import os
import openai

from report import generate_pdf_report

app = FastAPI(
    title="AuditorSEC API",
    description="AI-powered Web3 + IoT/NEMS security audit platform — BRAVE1 TRL4",
    version="1.0.0",
)

openai.api_key = os.getenv("OPENAI_API_KEY")


# ── Models ────────────────────────────────────────────────────────────────────

class AuditRequest(BaseModel):
    project_name: str
    log_text: str
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
    log_text: str
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


# ── Core audit logic ──────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are AuditorSEC — an expert AI security auditor for Web3 protocols,
IoT/NEMS sensor systems, and defense-grade infrastructure. Analyze the provided log/description
and return a structured JSON response with:
- risk_level: one of CRITICAL / HIGH / MEDIUM / LOW
- anomalies: list of specific security issues found (Ukrainian or English)
- recommendations: list of actionable remediation steps

Return ONLY valid JSON, no markdown fences."""


async def run_audit(request: AuditRequest) -> AuditResponse:
    """Core audit logic — calls OpenAI and returns structured result."""
    timestamp = datetime.now(timezone.utc).isoformat(timespec="seconds")

    user_message = f"""Project: {request.project_name}
Audit Type: {request.audit_type}
Log/Description:
{request.log_text}"""

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

    import json
    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned invalid JSON")

    return AuditResponse(
        project_name=request.project_name,
        audit_type=request.audit_type,
        risk_level=parsed.get("risk_level", "UNKNOWN"),
        anomalies=parsed.get("anomalies", []),
        recommendations=parsed.get("recommendations", []),
        token_count=token_count,
        timestamp=timestamp,
    )


# ── Endpoints ─────────────────────────────────────────────────────────────────

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
    Full pipeline: AI audit → PDF generation → MinIO upload → presigned URL (24h).
    BRAVE1 TRL4 demo endpoint.
    """
    # 1. Run AI audit
    audit_result = await run_audit(
        AuditRequest(
            project_name=request.project_name,
            log_text=request.log_text,
            audit_type=request.audit_type,
        )
    )

    # 2. Generate PDF and upload to MinIO
    object_name, report_url = generate_pdf_report(
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
