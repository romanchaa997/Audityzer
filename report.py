# report.py — PDF generation + MinIO upload
# AuditorSEC / Audityzer — BRAVE1 TRL4 PoC
# 2026-04-19
# fix(security): address cubic-dev-ai P1/P2 — require explicit MinIO secrets, escape HTML in PDF

import html
import io
import os
import uuid
from datetime import datetime, timedelta

from minio import Minio
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer


def _get_minio_client() -> Minio:
    """Build MinIO client from required environment variables.
    P1 fix: no default credentials — raise EnvironmentError if missing.
    """
    endpoint = os.environ.get("MINIO_ENDPOINT")
    access_key = os.environ.get("MINIO_ACCESS_KEY")
    secret_key = os.environ.get("MINIO_SECRET_KEY")
    if not endpoint or not access_key or not secret_key:
        raise EnvironmentError(
            "MINIO_ENDPOINT, MINIO_ACCESS_KEY and MINIO_SECRET_KEY must be set."
        )
    secure = os.environ.get("MINIO_SECURE", "false").lower() == "true"
    return Minio(endpoint, access_key=access_key, secret_key=secret_key, secure=secure)


def generate_pdf_report(
    project_name: str,
    log_text: str,
    anomalies: list[str] | None = None,
) -> tuple[str, str]:
    """Generate PDF audit report and upload to MinIO.
    Returns (object_name, presigned_url).
    """
    if anomalies is None:
        anomalies = []

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "Title",
        parent=styles["Heading1"],
        fontSize=16,
        spaceAfter=12,
    )
    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontSize=13,
        spaceAfter=8,
    )
    body_style = styles["BodyText"]

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    story = []

    # Title
    story.append(Paragraph(html.escape(f"AuditorSEC Audit Report: {project_name}"), title_style))
    story.append(Spacer(1, 0.2 * inch))

    # Timestamp
    story.append(Paragraph(
        html.escape(f"Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}"),
        body_style,
    ))
    story.append(Spacer(1, 0.2 * inch))

    # Log summary
    story.append(Paragraph("Log Summary", section_style))
    story.append(Paragraph(html.escape(log_text[:2000]), body_style))
    story.append(Spacer(1, 0.2 * inch))

    # Detected anomalies
    story.append(Paragraph("Detected Anomalies", section_style))
    if anomalies:
        for i, a in enumerate(anomalies, 1):
            # P2 fix: escape dynamic text to prevent XML parsing failures
            story.append(Paragraph(f"{i}. {html.escape(str(a))}", body_style))
    else:
        story.append(Paragraph("No anomalies detected.", body_style))

    doc.build(story)
    pdf_bytes = buffer.getvalue()

    # Upload to MinIO
    minio_client = _get_minio_client()
    bucket = os.environ.get("MINIO_BUCKET", "audit-reports")

    # Ensure bucket exists
    if not minio_client.bucket_exists(bucket):
        minio_client.make_bucket(bucket)

    object_name = f"reports/{uuid.uuid4()}/{project_name.replace(' ', '_')}_audit.pdf"
    minio_client.put_object(
        bucket,
        object_name,
        io.BytesIO(pdf_bytes),
        length=len(pdf_bytes),
        content_type="application/pdf",
    )

    # Generate 1-hour presigned URL
    report_url = minio_client.presigned_get_object(
        bucket,
        object_name,
        expires=timedelta(hours=1),
    )

    return object_name, report_url
