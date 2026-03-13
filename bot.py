#!/usr/bin/env python3
"""
AuditorSEC — Telegram Bot Ecosystem (5 Bots)
=============================================
Unified Flask service that manages all 5 Telegram bots:

1. @audityzerbot          — Core Product Bot (user-facing auditing)
2. @AuditorSEC_Alert_Bot  — Ops Monitoring (Prometheus/Grafana alerts)
3. @AuditorSEC_bot        — DevSecOps Automation (n8n/Make/webhooks)
4. @audityzer_alerts_bot  — Product Notifications (CI/CD pipeline alerts)
5. @AuditorSECYouTubeBot  — YouTube Content Distribution

Deploy: Railway (https://audityzer-production.up.railway.app)
"""

import os
import json
import logging
from datetime import datetime
from flask import Flask, request, jsonify
import requests

# ─── Configuration ───────────────────────────────────────────────────────────
# Bot tokens — set via Railway environment variables
BOTS = {
    "core": {
        "name": "@audityzerbot",
        "role": "Core Product Bot",
        "token": os.environ.get("TELEGRAM_BOT_CORE", ""),
        "chat_id": os.environ.get("TELEGRAM_CHAT_CORE", ""),
        "commands": ["/scan", "/results", "/findings", "/fix", "/history", "/docs", "/help"],
    },
    "ops": {
        "name": "@AuditorSEC_Alert_Bot",
        "role": "Ops Monitoring",
        "token": os.environ.get("TELEGRAM_BOT_OPS", ""),
        "chat_id": os.environ.get("TELEGRAM_CHAT_OPS", ""),
        "commands": ["/alerts", "/status", "/subscribe", "/unsubscribe", "/report", "/help"],
    },
    "devsecops": {
        "name": "@AuditorSEC_bot",
        "role": "DevSecOps Automation",
        "token": os.environ.get("TELEGRAM_BOT_DEVSECOPS", ""),
        "chat_id": os.environ.get("TELEGRAM_CHAT_DEVSECOPS", ""),
        "commands": ["/scan", "/pipeline", "/tasks", "/webhook", "/logs", "/help"],
    },
    "cicd": {
        "name": "@audityzer_alerts_bot",
        "role": "Product Notifications (CI/CD)",
        "token": os.environ.get("TELEGRAM_BOT_CICD", ""),
        "chat_id": os.environ.get("TELEGRAM_CHAT_CICD", ""),
        "commands": ["/alerts", "/scans", "/severity", "/contracts", "/report", "/help"],
    },
    "youtube": {
        "name": "@AuditorSECYouTubeBot",
        "role": "YouTube Content Distribution",
        "token": os.environ.get("TELEGRAM_BOT_YOUTUBE", ""),
        "chat_id": os.environ.get("TELEGRAM_CHAT_YOUTUBE", ""),
        "commands": ["/latest", "/subscribe", "/unsubscribe", "/playlist", "/stats", "/help"],
    },
}

# Legacy support
WEBHOOK_SECRET = os.environ.get("WEBHOOK_SECRET", "auditorsec-risk-2026")

app = Flask(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("audityzer-bots")


# ─── Risk Level Thresholds ───────────────────────────────────────────────────
RISK_THRESHOLDS = {
    "low": {"min": 0, "max": 6, "emoji": "🟢", "label": "Low"},
    "medium": {"min": 7, "max": 12, "emoji": "🟡", "label": "Medium"},
    "high": {"min": 13, "max": 99, "emoji": "🔴", "label": "High"},
}


# ─── Telegram Helpers ────────────────────────────────────────────────────────
def send_telegram(bot_key: str, chat_id: str, text: str, parse_mode: str = "HTML") -> dict:
    """Send a message via a specific bot."""
    bot = BOTS.get(bot_key, {})
    token = bot.get("token", "")
    if not token:
        log.warning(f"Bot '{bot_key}' has no token configured")
        return {"ok": False, "error": f"No token for bot '{bot_key}'"}

    api_url = f"https://api.telegram.org/bot{token}/sendMessage"
    resp = requests.post(api_url, json={
        "chat_id": chat_id,
        "text": text,
        "parse_mode": parse_mode,
        "disable_web_page_preview": True,
    })
    resp.raise_for_status()
    return resp.json()


def broadcast(bot_key: str, text: str, parse_mode: str = "HTML"):
    """Send to the default chat for a bot."""
    bot = BOTS.get(bot_key, {})
    chat_id = bot.get("chat_id", "")
    if not chat_id:
        log.warning(f"Bot '{bot_key}' has no CHAT_ID configured")
        return
    return send_telegram(bot_key, chat_id, text, parse_mode)


def get_risk_level(score: int) -> dict:
    """Determine risk level from score."""
    for level, t in RISK_THRESHOLDS.items():
        if t["min"] <= score <= t["max"]:
            return t
    return RISK_THRESHOLDS["high"]


# ═══════════════════════════════════════════════════════════════════════════════
#  WEBHOOK ENDPOINTS — monday.com Risk Pipeline
# ═══════════════════════════════════════════════════════════════════════════════

@app.route("/webhook/monday-risk", methods=["POST"])
def monday_risk_webhook():
    """
    Risk alert from monday.com → forwards to @AuditorSEC_bot (DevSecOps) + @AuditorSEC_Alert_Bot (Ops).
    
    Expected JSON payload:
    {
        "deal_name": "...", "client": "...", "risk_score": 15,
        "sentiment": "Negative", "days_overdue": 5, "days_no_touch": 12,
        "impact": 4, "likelihood": 2, "owner": "...", "monday_url": "..."
    }
    """
    data = request.get_json(force=True, silent=True) or {}
    log.info(f"monday-risk webhook: {json.dumps(data, ensure_ascii=False)}")

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
        message += f'🔗 <a href="{monday_url}">Open in monday.com</a>\n'
    message += f"\n🕐 {ts}"

    # Send to DevSecOps bot (primary) and Ops bot (secondary)
    results = {}
    for bot_key in ["devsecops", "ops"]:
        try:
            broadcast(bot_key, message)
            results[bot_key] = "sent"
        except Exception as e:
            log.error(f"Failed to send to {bot_key}: {e}")
            results[bot_key] = str(e)

    return jsonify({"status": "processed", "risk_level": risk["label"], "bots": results}), 200


@app.route("/webhook/weekly-digest", methods=["POST"])
def weekly_digest_webhook():
    """Weekly digest → sends to DevSecOps bot."""
    data = request.get_json(force=True, silent=True) or {}
    deals = data.get("deals", [])
    if not deals:
        return jsonify({"status": "no_deals"}), 200

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
        broadcast("devsecops", message)
        return jsonify({"status": "sent", "count": len(deals)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ═══════════════════════════════════════════════════════════════════════════════
#  WEBHOOK ENDPOINTS — CI/CD Pipeline Notifications
# ═══════════════════════════════════════════════════════════════════════════════

@app.route("/webhook/ci-cd", methods=["POST"])
def cicd_webhook():
    """
    CI/CD pipeline events → sends to @audityzer_alerts_bot.
    
    Expected JSON:
    {
        "event": "build_success|build_failure|deploy|scan_complete",
        "repo": "romanchaa997/Audityzer",
        "branch": "defense-audit",
        "commit": "abc123",
        "message": "...",
        "url": "https://github.com/..."
    }
    """
    data = request.get_json(force=True, silent=True) or {}
    event = data.get("event", "unknown")
    repo = data.get("repo", "—")
    branch = data.get("branch", "—")
    commit = data.get("commit", "—")[:7]
    msg = data.get("message", "—")
    url = data.get("url", "")

    emoji_map = {
        "build_success": "✅", "build_failure": "❌",
        "deploy": "🚀", "scan_complete": "🔍",
    }
    emoji = emoji_map.get(event, "📢")

    text = (
        f"{emoji} <b>CI/CD: {event.replace('_', ' ').title()}</b>\n"
        f"━━━━━━━━━━━━━━━━━━\n"
        f"📦 <b>Repo:</b> {repo}\n"
        f"🌿 <b>Branch:</b> {branch}\n"
        f"🔖 <b>Commit:</b> <code>{commit}</code>\n"
        f"💬 {msg}\n"
    )
    if url:
        text += f'🔗 <a href="{url}">View</a>\n'
    text += f"\n🕐 {datetime.now().strftime('%Y-%m-%d %H:%M')}"

    try:
        broadcast("cicd", text)
        return jsonify({"status": "sent"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ═══════════════════════════════════════════════════════════════════════════════
#  WEBHOOK ENDPOINTS — Ops Monitoring (Prometheus/Grafana)
# ═══════════════════════════════════════════════════════════════════════════════

@app.route("/webhook/grafana-alert", methods=["POST"])
def grafana_alert_webhook():
    """
    Grafana/Alertmanager alerts → sends to @AuditorSEC_Alert_Bot.
    
    Accepts Grafana webhook payload format.
    """
    data = request.get_json(force=True, silent=True) or {}
    
    # Handle Grafana alerting format
    alerts = data.get("alerts", [data])
    
    for alert in alerts:
        status = alert.get("status", "firing")
        emoji = "🔥" if status == "firing" else "✅"
        alert_name = alert.get("labels", {}).get("alertname", alert.get("ruleName", "Unknown"))
        severity = alert.get("labels", {}).get("severity", "warning")
        summary = alert.get("annotations", {}).get("summary", alert.get("message", "—"))
        
        text = (
            f"{emoji} <b>OPS ALERT: {alert_name}</b>\n"
            f"━━━━━━━━━━━━━━━━━━\n"
            f"📊 <b>Status:</b> {status.upper()}\n"
            f"⚡ <b>Severity:</b> {severity}\n"
            f"💬 {summary}\n"
            f"\n🕐 {datetime.now().strftime('%Y-%m-%d %H:%M')}"
        )
        
        try:
            broadcast("ops", text)
        except Exception as e:
            log.error(f"Failed to send ops alert: {e}")

    return jsonify({"status": "processed", "count": len(alerts)}), 200


# ═══════════════════════════════════════════════════════════════════════════════
#  WEBHOOK ENDPOINTS — YouTube Content
# ═══════════════════════════════════════════════════════════════════════════════

@app.route("/webhook/youtube", methods=["POST"])
def youtube_webhook():
    """
    YouTube content notifications → sends to @AuditorSECYouTubeBot.
    
    Expected JSON:
    {
        "title": "Video title",
        "url": "https://youtube.com/...",
        "description": "...",
        "published_at": "2026-03-13T00:00:00Z"
    }
    """
    data = request.get_json(force=True, silent=True) or {}
    title = data.get("title", "New Video")
    url = data.get("url", "")
    desc = data.get("description", "")[:200]

    text = (
        f"🎬 <b>New Video Published</b>\n"
        f"━━━━━━━━━━━━━━━━━━\n"
        f"📹 <b>{title}</b>\n"
        f"{desc}\n"
    )
    if url:
        text += f'\n🔗 <a href="{url}">Watch Now</a>'

    try:
        broadcast("youtube", text)
        return jsonify({"status": "sent"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ═══════════════════════════════════════════════════════════════════════════════
#  TELEGRAM WEBHOOK HANDLERS (per bot)
# ═══════════════════════════════════════════════════════════════════════════════

def handle_telegram_command(bot_key: str):
    """Generic Telegram command handler for any bot."""
    update = request.get_json(force=True, silent=True) or {}
    message = update.get("message", {})
    text = message.get("text", "")
    chat_id = str(message.get("chat", {}).get("id", ""))
    bot = BOTS[bot_key]

    if text.startswith("/start"):
        cmds = "\n".join(f"  {c}" for c in bot["commands"])
        send_telegram(bot_key, chat_id, (
            f"🤖 <b>AuditorSEC — {bot['role']}</b>\n"
            f"Bot: {bot['name']}\n\n"
            f"Your Chat ID: <code>{chat_id}</code>\n\n"
            f"Available commands:\n{cmds}"
        ))
    elif text.startswith("/status"):
        send_telegram(bot_key, chat_id, (
            f"✅ <b>{bot['role']} Status</b>\n\n"
            f"🟢 Bot: Online\n"
            f"🟢 Service: Healthy\n"
            f"🕐 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        ))
    elif text.startswith("/help"):
        cmds = "\n".join(f"  {c}" for c in bot["commands"])
        send_telegram(bot_key, chat_id, (
            f"📖 <b>{bot['role']} — Help</b>\n\n"
            f"Commands:\n{cmds}\n\n"
            f"Webhook: https://audityzer-production.up.railway.app/webhook/telegram/{bot_key}"
        ))

    return jsonify({"ok": True})


# Individual Telegram webhook routes for each bot
@app.route("/webhook/telegram/core", methods=["POST"])
def telegram_core():
    return handle_telegram_command("core")

@app.route("/webhook/telegram/ops", methods=["POST"])
def telegram_ops():
    return handle_telegram_command("ops")

@app.route("/webhook/telegram/devsecops", methods=["POST"])
def telegram_devsecops():
    return handle_telegram_command("devsecops")

@app.route("/webhook/telegram/cicd", methods=["POST"])
def telegram_cicd():
    return handle_telegram_command("cicd")

@app.route("/webhook/telegram/youtube", methods=["POST"])
def telegram_youtube():
    return handle_telegram_command("youtube")

# Legacy route (backward compatibility)
@app.route("/webhook/telegram", methods=["POST"])
def telegram_legacy():
    return handle_telegram_command("devsecops")


# ═══════════════════════════════════════════════════════════════════════════════
#  HEALTH & STATUS
# ═══════════════════════════════════════════════════════════════════════════════

@app.route("/health", methods=["GET"])
def health():
    """Health check for Railway."""
    bot_status = {}
    for key, bot in BOTS.items():
        bot_status[key] = {
            "name": bot["name"],
            "role": bot["role"],
            "configured": bool(bot["token"]),
        }
    return jsonify({
        "status": "ok",
        "version": "2.0.0",
        "bots": bot_status,
        "timestamp": datetime.now().isoformat(),
    })


@app.route("/", methods=["GET"])
def index():
    """Root endpoint — shows ecosystem overview."""
    return jsonify({
        "service": "AuditorSEC Telegram Bot Ecosystem",
        "version": "2.0.0",
        "bots": {k: {"name": v["name"], "role": v["role"]} for k, v in BOTS.items()},
        "webhooks": {
            "monday_risk": "/webhook/monday-risk",
            "weekly_digest": "/webhook/weekly-digest",
            "ci_cd": "/webhook/ci-cd",
            "grafana_alert": "/webhook/grafana-alert",
            "youtube": "/webhook/youtube",
            "telegram_core": "/webhook/telegram/core",
            "telegram_ops": "/webhook/telegram/ops",
            "telegram_devsecops": "/webhook/telegram/devsecops",
            "telegram_cicd": "/webhook/telegram/cicd",
            "telegram_youtube": "/webhook/telegram/youtube",
        },
        "health": "/health",
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    log.info(f"Starting AuditorSEC Bot Ecosystem v2.0.0 on port {port}")
    log.info(f"Configured bots: {[k for k, v in BOTS.items() if v['token']]}")
    app.run(host="0.0.0.0", port=port, debug=False)
