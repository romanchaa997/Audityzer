#!/usr/bin/env python3
"""
AuditorSEC AI Sprint Lead Bot — Risk Pipeline Notifications
Telegram Bot: @ai_sprint_lead_bot
Receives webhook calls from monday.com automations and forwards risk alerts.

Deploy: Docker / Railway / any Python host
Webhook endpoint: POST /webhook/monday-risk
"""

import os
import json
import logging
from datetime import datetime
from flask import Flask, request, jsonify
import requests

# ─── Configuration ───────────────────────────────────────────────────────────
BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")  # REQUIRED: set via env variable
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "")  # Set your chat ID after /start
WEBHOOK_SECRET = os.environ.get("WEBHOOK_SECRET", "auditorsec-risk-2026")

TELEGRAM_API = f"https://api.telegram.org/bot{BOT_TOKEN}"

app = Flask(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("risk-bot")

# ─── Risk Level Thresholds ───────────────────────────────────────────────────
RISK_THRESHOLDS = {
    "low": {"min": 0, "max": 6, "emoji": "🟢", "label": "Low"},
    "medium": {"min": 7, "max": 12, "emoji": "🟡", "label": "Medium"},
    "high": {"min": 13, "max": 99, "emoji": "🔴", "label": "High"},
}

# ─── Telegram Helpers ────────────────────────────────────────────────────────
def send_telegram(chat_id: str, text: str, parse_mode: str = "HTML") -> dict:
    """Send a message via Telegram Bot API."""
    resp = requests.post(f"{TELEGRAM_API}/sendMessage", json={
        "chat_id": chat_id,
        "text": text,
        "parse_mode": parse_mode,
        "disable_web_page_preview": True,
    })
    resp.raise_for_status()
    return resp.json()


def get_risk_level(score: int) -> dict:
    """Determine risk level from score."""
    for level, t in RISK_THRESHOLDS.items():
        if t["min"] <= score <= t["max"]:
            return t
    return RISK_THRESHOLDS["high"]


# ─── Webhook Endpoints ───────────────────────────────────────────────────────
@app.route("/webhook/monday-risk", methods=["POST"])
def monday_risk_webhook():
    """
    Receives risk alert from monday.com automation (via Webhook action).
    
    Expected JSON payload:
    {
        "event_type": "risk_alert",
        "deal_name": "...",
        "client": "...",
        "risk_score": 15,
        "sentiment": "Negative",
        "days_overdue": 5,
        "days_no_touch": 12,
        "impact": 4,
        "likelihood": 2,
        "owner": "...",
        "monday_url": "https://..."
    }
    """
    data = request.get_json(force=True, silent=True) or {}
    log.info(f"Received webhook: {json.dumps(data, ensure_ascii=False)}")

    # Validate
    if not CHAT_ID:
        return jsonify({"error": "CHAT_ID not configured. Send /start to bot first."}), 500

    deal = data.get("deal_name", "Unknown Deal")
    client = data.get("client", "—")
    score = int(data.get("risk_score", 0))
    sentiment = data.get("sentiment", "—")
    days_overdue = data.get("days_overdue", 0)
    days_idle = data.get("days_no_touch", 0)
    impact = data.get("impact", "—")
    likelihood = data.get("likelihood", "—")
    owner = data.get("owner", "—")
    monday_url = data.get("monday_url", "")

    risk = get_risk_level(score)
    ts = datetime.now().strftime("%Y-%m-%d %H:%M")

    message = (
        f"{risk['emoji']} <b>RISK ALERT — {risk['label']}</b>\n"
        f"━━━━━━━━━━━━━━━━━━\n"
        f"📋 <b>Deal:</b> {deal}\n"
        f"🏢 <b>Client:</b> {client}\n"
        f"👤 <b>Owner:</b> {owner}\n"
        f"━━━━━━━━━━━━━━━━━━\n"
        f"📊 <b>Risk Score:</b> {score}\n"
        f"💬 <b>Sentiment:</b> {sentiment}\n"
        f"📅 <b>Days Overdue:</b> {days_overdue}\n"
        f"⏳ <b>Days Idle:</b> {days_idle}\n"
        f"⚡ <b>Impact:</b> {impact}/5  |  <b>Likelihood:</b> {likelihood}/5\n"
        f"━━━━━━━━━━━━━━━━━━\n"
    )

    if monday_url:
        message += f"🔗 <a href=\"{monday_url}\">Open in monday.com</a>\n"

    message += f"\n🕐 {ts}"

    try:
        send_telegram(CHAT_ID, message)
        return jsonify({"status": "sent", "risk_level": risk["label"]}), 200
    except Exception as e:
        log.error(f"Failed to send: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/webhook/weekly-digest", methods=["POST"])
def weekly_digest_webhook():
    """
    Receives a weekly digest payload with multiple high-risk deals.
    
    Expected JSON:
    {
        "deals": [
            {"deal_name": "...", "client": "...", "risk_score": 15, "sentiment": "Negative"},
            ...
        ]
    }
    """
    data = request.get_json(force=True, silent=True) or {}
    deals = data.get("deals", [])

    if not deals:
        return jsonify({"status": "no_deals"}), 200

    if not CHAT_ID:
        return jsonify({"error": "CHAT_ID not configured"}), 500

    ts = datetime.now().strftime("%Y-%m-%d")
    header = f"📊 <b>Weekly Risk Digest — {ts}</b>\n{'━' * 30}\n\n"

    lines = []
    for i, d in enumerate(deals, 1):
        score = int(d.get("risk_score", 0))
        risk = get_risk_level(score)
        lines.append(
            f"{i}. {risk['emoji']} <b>{d.get('deal_name', '?')}</b> "
            f"({d.get('client', '?')}) — Score: {score}"
        )

    message = header + "\n".join(lines) + f"\n\n🔴 Total high-risk: {len(deals)}"

    try:
        send_telegram(CHAT_ID, message)
        return jsonify({"status": "sent", "count": len(deals)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─── Telegram Command Handlers ───────────────────────────────────────────────
@app.route("/webhook/telegram", methods=["POST"])
def telegram_webhook():
    """
    Handles incoming Telegram messages (for /start, /status commands).
    Set this as Telegram webhook: 
    https://api.telegram.org/bot{TOKEN}/setWebhook?url=https://YOUR_DOMAIN/webhook/telegram
    """
    update = request.get_json(force=True, silent=True) or {}
    message = update.get("message", {})
    text = message.get("text", "")
    chat_id = str(message.get("chat", {}).get("id", ""))

    if text.startswith("/start"):
        send_telegram(chat_id, (
            "🤖 <b>AuditorSEC AI Sprint Lead Bot</b>\n\n"
            f"Your Chat ID: <code>{chat_id}</code>\n\n"
            "Set this as TELEGRAM_CHAT_ID env variable.\n\n"
            "Commands:\n"
            "/start — Show this message\n"
            "/status — Pipeline health check\n"
            "/risk — Show risk thresholds"
        ))
    elif text.startswith("/status"):
        send_telegram(chat_id, (
            "✅ <b>Pipeline Status</b>\n\n"
            "🟢 Bot: Online\n"
            "🟢 Webhook: Active\n"
            f"🟢 Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        ))
    elif text.startswith("/risk"):
        send_telegram(chat_id, (
            "📊 <b>Risk Thresholds</b>\n\n"
            "🟢 0–6: Low — Monitor\n"
            "🟡 7–12: Medium — Review & adjust\n"
            "🔴 ≥13: High — Escalate immediately"
        ))

    return jsonify({"ok": True})


# ─── Health Check ─────────────────────────────────────────────────────────────
@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "bot": "@ai_sprint_lead_bot",
        "timestamp": datetime.now().isoformat(),
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    log.info(f"Starting AuditorSEC Risk Bot on port {port}")
    app.run(host="0.0.0.0", port=port, debug=False)
