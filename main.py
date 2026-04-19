# main.py — AuditorSEC FastAPI: /audit + /report + /health
# AuditorSEC / Audityzer — BRAVE1 TRL4 PoC
# Branch: safe-improvements | 2026-04-19
# fix(api): fix async blocking - use asyncio.to_thread for OpenAI+PDF calls; add log_text size limit

import asyncio
import os
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import openai

from report import generate_pdf_report

app = FastAPI(
    title="AuditorSEC API",
    description="BRAVE1 TRL4 PoC — Web3 Security Audit API",
    version="1.1.3"
)

openai.api_key = os.environ["OPENAI_API_KEY"]


class AuditRequest(BaseModel):
    project_name: str = Field(..., min_length=1, max_length=200)
    # P2 fix: cap log_text to prevent oversized inputs / token DoS
    log_text: str = Field(..., min_length=1, max_length=50000)


class AuditResponse(BaseModel):
    project_name: str
    timestamp: str
    analysis: str
    status: str


class ReportResponse(BaseModel):
    project_name: str
    timestamp: str
    report_url: str
    object_name: str


@app.get("/health")
async def health():
    return {"status": "ok", "version": "1.1.3", "service": "AuditorSEC"}


@app.post("/api/v1/audit", response_model=AuditResponse)
async def audit(request: AuditRequest):
    """Analyze smart contract / dApp logs for security issues."""
    try:
        prompt = (
            f"You are a Web3 security auditor. Analyze the following logs for "
            f"vulnerabilities, anomalies, and compliance issues:\n\n"
            f"Project: {request.project_name}\n\nLogs:\n{request.log_text}"
        )
        # P1 fix: use asyncio.to_thread to avoid blocking the event loop
        response = await asyncio.to_thread(
            openai.chat.completions.create,
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=2000,
            temperature=0.2,
        )
        analysis = response.choices[0].message.content
        return AuditResponse(
            project_name=request.project_name,
            timestamp=datetime.now(timezone.utc).isoformat(),
            analysis=analysis,
            status="completed",
        )
    except openai.OpenAIError as e:
        raise HTTPException(status_code=502, detail=f"OpenAI error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Audit failed: {str(e)}")


@app.post("/api/v1/report", response_model=ReportResponse)
async def report(request: AuditRequest):
    """Generate PDF report and upload to MinIO, return presigned URL."""
    try:
        # P1 fix: wrap synchronous PDF generation + MinIO upload in asyncio.to_thread
        object_name, report_url = await asyncio.to_thread(
            generate_pdf_report,
            project_name=request.project_name,
            log_text=request.log_text,
        )
        return ReportResponse(
            project_name=request.project_name,
            timestamp=datetime.now(timezone.utc).isoformat(),
            report_url=report_url,
            object_name=object_name,
        )
    except EnvironmentError as e:
        raise HTTPException(status_code=500, detail=f"Configuration error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Report generation failed: {str(e)}")
