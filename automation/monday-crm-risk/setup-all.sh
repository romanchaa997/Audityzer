#!/bin/bash
# ============================================================
# AuditorSEC CRM Risk Pipeline — One-Click Setup
# ============================================================
# 
# This script sets up the complete CRM risk pipeline:
#   1. Monday.com columns + formulas on Deals board
#   2. ClickUp Risk Register list + custom fields
#
# Prerequisites:
#   - Node.js 18+
#   - Monday.com API token
#   - ClickUp API token
#
# Usage:
#   export MONDAY_API_TOKEN=your_monday_token
#   export CLICKUP_API_TOKEN=your_clickup_token
#   chmod +x setup-all.sh && ./setup-all.sh
# ============================================================

set -e

echo "╔══════════════════════════════════════════════════╗"
echo "║  AuditorSEC CRM Risk Pipeline — Setup           ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# Check tokens
if [ -z "$MONDAY_API_TOKEN" ]; then
  echo "⚠️  MONDAY_API_TOKEN not set — skipping Monday.com setup"
  echo "   Get token: monday.com → Avatar → Developers → My Access Tokens"
  SKIP_MONDAY=true
fi

if [ -z "$CLICKUP_API_TOKEN" ]; then
  echo "⚠️  CLICKUP_API_TOKEN not set — skipping ClickUp setup"
  echo "   Get token: ClickUp → Settings → Apps → Generate API Token"
  SKIP_CLICKUP=true
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Step 1: Monday.com
if [ "$SKIP_MONDAY" != "true" ]; then
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📊 Step 1: Monday.com Columns + Formulas"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  node "$SCRIPT_DIR/setup-monday-columns.js"
fi

# Step 2: ClickUp
if [ "$SKIP_CLICKUP" != "true" ]; then
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📋 Step 2: ClickUp Risk Register"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  node "$SCRIPT_DIR/setup-clickup-risk-register.js"
fi

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║  ✅ Setup Complete!                              ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
echo "📌 Remaining manual steps:"
echo "   1. Monday.com → Automate (⚡) → Add 7 automation recipes"
echo "      (see automation/monday-crm-risk/03-automations-exact.md)"
echo "   2. ClickUp → Risk Register → Edit statuses:"
echo "      Open → In Review → Mitigated → Accepted → Closed"
echo "   3. Set up Pipedream/n8n webhook:"
echo "      (see automation/pipedream-risk-router/README.md)"
echo ""
