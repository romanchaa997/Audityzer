// Pipedream Workflow: Monday.com CRM High-Risk Deal Router
// Trigger: HTTP Webhook from Monday.com automation
// Pipeline: Normalize → Risk Logic → ClickUp → GitHub → Telegram → Audityzer Events

// ============================================================
// STEP 1: Normalize incoming Monday.com webhook payload
// ============================================================
// Pipedream Step: "normalize" (Node.js)
export default defineComponent({
  async run({ steps, $ }) {
    const body = steps.trigger.event.body;

    // Parse and normalize Monday.com fields
    const deal = {
      itemId: body.item_id || body.pulse_id,
      itemName: body.item_name || body.name,
      boardId: body.board_id,
      clientName: body.client_name || body.item_name,
      owner: body.owner || "Unassigned",
      clientTier: body.client_tier || "Standard",
      impact: parseInt(body.impact) || 3,
      likelihood: parseInt(body.likelihood) || 3,
      riskScore: parseInt(body.risk_score) || 0,
      riskLevel: body.risk_level || "Unknown",
      sentiment: body.sentiment || "Neutral",
      dealValue: body.deal_value || "0",
      expectedCloseDate: body.expected_close_date || null,
      lastActivityDate: body.last_activity_date || null,
      itemUrl: body.item_url || `https://romanchaa997s-team.monday.com/boards/${body.board_id}/pulses/${body.item_id}`,
      timestamp: new Date().toISOString(),
    };

    // Backend risk score recalculation (verify Monday formula)
    const now = new Date();
    let daysOverdue = 0;
    let daysNoTouch = 0;

    if (deal.expectedCloseDate) {
      const closeDate = new Date(deal.expectedCloseDate);
      daysOverdue = Math.max(0, Math.floor((now - closeDate) / 86400000));
    }
    if (deal.lastActivityDate) {
      const lastActivity = new Date(deal.lastActivityDate);
      daysNoTouch = Math.floor((now - lastActivity) / 86400000);
    }

    const sentimentFactor = deal.sentiment === "Negative" ? 4 : deal.sentiment === "Neutral" ? 1 : 0;
    const delayFactor = Math.min(daysOverdue, 10);
    const idleFactor = daysNoTouch > 7 ? 3 : 0;

    deal.riskScoreBackend = deal.impact * 2 + (6 - deal.likelihood) + delayFactor + idleFactor + sentimentFactor;

    // Risk band with dual threshold (B2B Enterprise vs SMB)
    const isEnterprise = deal.clientTier === "Enterprise" || parseInt(deal.dealValue) >= 50000;
    const highThreshold = isEnterprise ? 11 : 13; // Lower threshold for enterprise
    const medThreshold = isEnterprise ? 5 : 7;

    deal.riskBand = deal.riskScoreBackend >= highThreshold ? "High"
                  : deal.riskScoreBackend >= medThreshold ? "Medium"
                  : "Low";

    // Generate reasons array
    deal.reasons = [];
    if (daysOverdue > 0) deal.reasons.push(`${daysOverdue}d overdue`);
    if (daysNoTouch > 7) deal.reasons.push(`${daysNoTouch}d no contact`);
    if (deal.sentiment === "Negative") deal.reasons.push("Negative sentiment");
    if (deal.likelihood <= 2) deal.reasons.push(`Low likelihood (${deal.likelihood}/5)`);
    if (deal.impact >= 4) deal.reasons.push(`High impact (${deal.impact}/5)`);

    $.export("deal", deal);
    $.export("isHighRisk", deal.riskBand === "High");
  },
});


// ============================================================
// STEP 2: Create ClickUp Task (only if High risk)
// ============================================================
// Pipedream Step: "clickup_risk_entry" (Node.js)
// Requires: CLICKUP_API_KEY env var, CLICKUP_RISK_LIST_ID env var
export default defineComponent({
  async run({ steps, $ }) {
    if (!steps.normalize.isHighRisk) {
      $.export("skipped", true);
      return;
    }

    const deal = steps.normalize.deal;
    const listId = process.env.CLICKUP_RISK_LIST_ID; // Your Risk Register list ID

    const taskPayload = {
      name: `🔴 RISK: ${deal.clientName} — Score ${deal.riskScoreBackend} (${deal.riskBand})`,
      description: `## CRM Risk Entry\n\n| Field | Value |\n|-------|-------|\n| **Deal** | ${deal.itemName} |\n| **Client** | ${deal.clientName} |\n| **Deal Value** | ${deal.dealValue} |\n| **Risk Score** | ${deal.riskScoreBackend} (Monday: ${deal.riskScore}) |\n| **Risk Band** | ${deal.riskBand} |\n| **Impact** | ${deal.impact}/5 |\n| **Likelihood** | ${deal.likelihood}/5 |\n| **Sentiment** | ${deal.sentiment} |\n| **Owner** | ${deal.owner} |\n\n**Risk Triggers:** ${deal.reasons.join(", ") || "Manual escalation"}\n\n**Monday Item:** ${deal.itemUrl}\n\n---\n\n### Mitigation Plan\n- [ ] Schedule call with client within 48h\n- [ ] Review pricing/proposal\n- [ ] Prepare alternative strategy\n- [ ] Update Monday CRM after review\n- [ ] Close risk entry when mitigated`,
      priority: 2, // High
      due_date: Date.now() + 2 * 86400000, // +2 days
      status: "Open",
      tags: ["crm-risk", deal.riskBand.toLowerCase()],
    };

    const resp = await $.http.post(
      `https://api.clickup.com/api/v2/list/${listId}/task`,
      taskPayload,
      { headers: { Authorization: process.env.CLICKUP_API_KEY, "Content-Type": "application/json" } }
    );

    $.export("clickup_task_url", resp.data.url);
    $.export("clickup_task_id", resp.data.id);
  },
});


// ============================================================
// STEP 3: Create GitHub Issue (only if High risk)
// ============================================================
// Pipedream Step: "github_issue" (Node.js)
// Requires: GITHUB_TOKEN env var
export default defineComponent({
  async run({ steps, $ }) {
    if (!steps.normalize.isHighRisk) {
      $.export("skipped", true);
      return;
    }

    const deal = steps.normalize.deal;
    const owner = "romanchaa997";
    const repo = "Audityzer";

    const issuePayload = {
      title: `🔴 CRM Risk Alert: ${deal.clientName} (Score: ${deal.riskScoreBackend})`,
      body: `## High-Risk Deal Detected\n\n- **Deal:** ${deal.itemName}\n- **Client:** ${deal.clientName}\n- **Risk Score:** ${deal.riskScoreBackend}\n- **Sentiment:** ${deal.sentiment}\n- **Deal Value:** ${deal.dealValue}\n- **Reasons:** ${deal.reasons.join(", ")}\n- **Monday URL:** ${deal.itemUrl}\n${steps.clickup_risk_entry?.clickup_task_url ? `- **ClickUp Task:** ${steps.clickup_risk_entry.clickup_task_url}` : ""}\n\n### Required Actions\n- [ ] Review deal status\n- [ ] Contact client\n- [ ] Update risk mitigation plan`,
      labels: ["risk-alert", "crm", deal.riskBand.toLowerCase()],
    };

    const resp = await $.http.post(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      issuePayload,
      { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}`, Accept: "application/vnd.github.v3+json" } }
    );

    $.export("github_issue_url", resp.data.html_url);
  },
});


// ============================================================
// STEP 4: Send Telegram Alert
// ============================================================
// Pipedream Step: "telegram_alert" (Node.js)
// Requires: TELEGRAM_BOT_TOKEN env var, TELEGRAM_CHAT_ID env var
export default defineComponent({
  async run({ steps, $ }) {
    if (!steps.normalize.isHighRisk) {
      $.export("skipped", true);
      return;
    }

    const deal = steps.normalize.deal;
    const clickupUrl = steps.clickup_risk_entry?.clickup_task_url || "N/A";
    const githubUrl = steps.github_issue?.github_issue_url || "N/A";

    const message = `🔴 *HIGH-RISK DEAL ALERT*

*Deal:* ${deal.itemName}
*Client:* ${deal.clientName}
*Risk Score:* ${deal.riskScoreBackend} (${deal.riskBand})
*Sentiment:* ${deal.sentiment}
*Deal Value:* ${deal.dealValue}
*Owner:* ${deal.owner}

*Triggers:* ${deal.reasons.join(", ")}

📋 [ClickUp Task](${clickupUrl})
🐙 [GitHub Issue](${githubUrl})
📊 [Monday Item](${deal.itemUrl})

_Review within 48h_`;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    await $.http.post(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      { chat_id: chatId, text: message, parse_mode: "Markdown", disable_web_page_preview: true }
    );

    $.export("sent", true);
  },
});


// ============================================================
// STEP 5: Push Event to Audityzer API
// ============================================================
// Pipedream Step: "audityzer_event" (Node.js)
// Requires: AUDITYZER_EVENTS_URL env var
export default defineComponent({
  async run({ steps, $ }) {
    const deal = steps.normalize.deal;

    const payload = {
      ts: deal.timestamp,
      source: "monday_crm",
      type: "crm_risk_event",
      event: deal.riskBand === "High" ? "high_risk_deal" : "risk_update",
      deal_id: deal.itemId,
      client: deal.clientName,
      segment: deal.clientTier,
      score: deal.riskScoreBackend,
      band: deal.riskBand,
      reasons: deal.reasons,
      sentiment: deal.sentiment,
      owner: deal.owner,
      deal_value: deal.dealValue,
    };

    const url = process.env.AUDITYZER_EVENTS_URL || "https://auditorsec-defense.up.railway.app/api/events";

    try {
      const resp = await $.http.post(url, payload);
      $.export("event_status", resp.status);
    } catch (e) {
      // Non-blocking: Audityzer API may not be deployed yet
      $.export("event_status", `failed: ${e.message}`);
    }
  },
});
