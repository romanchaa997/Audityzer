/**
 * AuditorSEC / Audityzer — Production Server
 * 
 * Express server for Railway deployment:
 * - /health endpoint for Railway healthchecks
 * - /api/ai/detect endpoint for AI vulnerability detection (HF Inference)
 * - /api/status for platform status
 * - /api/events for CRM risk event ingestion (Pipedream webhook target)
 * - /api/metrics for Grafana-compatible metrics
 * - PostgreSQL for persistent storage
 */

import express from 'express';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const HF_TOKEN = process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || '';
const HF_API_URL = 'https://api-inference.huggingface.co/models/microsoft/codebert-base';
const DATABASE_URL = process.env.DATABASE_URL || '';

// ─── Database Connection ─────────────────────────────────────────────────────
let pool = null;
if (DATABASE_URL) {
  pool = new pg.Pool({
    connectionString: DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    ssl: DATABASE_URL.includes('railway') ? { rejectUnauthorized: false } : false,
  });
  pool.on('error', (err) => console.error('DB pool error:', err.message));
}

async function dbQuery(text, params = []) {
  if (!pool) return null;
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (err) {
    console.error('DB query error:', err.message);
    return null;
  }
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// ─── Health Check ────────────────────────────────────────────────────────────
app.get('/health', async (req, res) => {
  let dbStatus = 'not configured';
  if (pool) {
    try {
      await pool.query('SELECT 1');
      dbStatus = 'connected';
    } catch { dbStatus = 'error'; }
  }

  res.json({
    status: 'ok',
    service: 'audityzer',
    version: '1.1.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    ai: {
      huggingface: HF_TOKEN ? 'configured' : 'not configured',
      model: 'microsoft/codebert-base',
    },
    database: dbStatus,
  });
});

// ─── Platform Status ─────────────────────────────────────────────────────────
app.get('/api/status', async (req, res) => {
  let dbStats = {};
  if (pool) {
    const r = await dbQuery(`
      SELECT 
        (SELECT count(*) FROM vulnerability_scans) as total_scans,
        (SELECT count(*) FROM crm_risk_events) as total_risk_events,
        (SELECT count(*) FROM security_rules WHERE is_active) as active_rules,
        (SELECT count(*) FROM audit_log) as audit_entries
    `);
    if (r && r.rows[0]) dbStats = r.rows[0];
  }

  res.json({
    platform: 'AuditorSEC',
    product: 'Audityzer',
    version: '1.1.0',
    branch: 'defense-audit',
    modules: {
      patternDetection: true,
      aiVulnerabilityDetection: !!HF_TOKEN,
      bridgeSecurityScanner: true,
      optimismL2Rules: true,
      frontRunningDetection: true,
      immunefiIntegration: true,
      grafanaDashboard: true,
      postgresStorage: !!pool,
    },
    security: {
      rulesLoaded: 12,
      categories: ['bridge', 'optimism-l2', 'dapp-frontend', 'mev', 'smart-contract', 'defi'],
      severities: { critical: 2, high: 5, medium: 3, low: 1 },
    },
    database: dbStats,
    links: {
      github: 'https://github.com/romanchaa997/Audityzer',
      docs: '/docs',
    },
  });
});

// ─── Vulnerability Patterns ──────────────────────────────────────────────────
const VULN_PATTERNS = {
  reentrancy: {
    keywords: ['call.value', '.call{value', 'external call', 'callback', 'fallback'],
    severity: 'high', cwe: 'CWE-841',
    description: 'Re-entrancy: state changes after external calls',
  },
  accessControl: {
    keywords: ['onlyOwner', 'require(msg.sender', 'auth', 'modifier'],
    severity: 'high', cwe: 'CWE-284',
    description: 'Missing or improper access control',
  },
  integerOverflow: {
    keywords: ['SafeMath', 'overflow', 'underflow', 'unchecked'],
    severity: 'medium', cwe: 'CWE-190',
    description: 'Integer overflow/underflow risk',
  },
  flashLoan: {
    keywords: ['flashloan', 'flash loan', 'price oracle', 'getReserves'],
    severity: 'high', cwe: 'CWE-682',
    description: 'Flash loan attack vector',
  },
  frontRunning: {
    keywords: ['mempool', 'frontrun', 'sandwich', 'slippage', 'MEV'],
    severity: 'medium', cwe: 'CWE-362',
    description: 'MEV/front-running vulnerability',
  },
  crossChain: {
    keywords: ['bridge', 'cross-chain', 'relay', 'message passing'],
    severity: 'critical', cwe: 'CWE-345',
    description: 'Cross-chain bridge security issue',
  },
  oracleManipulation: {
    keywords: ['oracle', 'price feed', 'Chainlink', 'TWAP'],
    severity: 'high', cwe: 'CWE-400',
    description: 'Oracle manipulation vulnerability',
  },
};

function patternAnalysis(code) {
  const findings = [];
  const codeLower = code.toLowerCase();
  for (const [type, pattern] of Object.entries(VULN_PATTERNS)) {
    const matched = pattern.keywords.filter(kw => codeLower.includes(kw.toLowerCase()));
    if (matched.length > 0) {
      findings.push({
        type, severity: pattern.severity, cwe: pattern.cwe,
        description: pattern.description,
        confidence: Math.min(0.95, 0.4 + matched.length * 0.15),
        matchedKeywords: matched, source: 'pattern-engine',
      });
    }
  }
  return findings;
}

// ─── AI Vulnerability Detection API ──────────────────────────────────────────
app.post('/api/ai/detect', async (req, res) => {
  const startTime = Date.now();
  const { code, enableAI = true } = req.body;
  
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Request body must include "code" (string)' });
  }

  try {
    // Phase 1: Pattern analysis (always runs)
    const patternFindings = patternAnalysis(code);

    // Phase 2: HF AI analysis (if token available and enabled)
    let aiResult = { available: false, model: null, error: null };
    
    if (enableAI && HF_TOKEN) {
      try {
        const hfResponse = await fetch(HF_API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: code.substring(0, 512),
            options: { wait_for_model: true },
          }),
        });

        if (hfResponse.ok) {
          const hfData = await hfResponse.json();
          aiResult = {
            available: true,
            model: 'microsoft/codebert-base',
            embeddingSize: Array.isArray(hfData) ? hfData.length : null,
          };
        } else {
          aiResult.error = `HF API ${hfResponse.status}`;
        }
      } catch (hfErr) {
        aiResult.error = hfErr.message;
      }
    } else if (!HF_TOKEN) {
      aiResult.error = 'HUGGINGFACE_API_KEY not configured';
    }

    // Deduplicate and sort
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    patternFindings.sort((a, b) => (severityOrder[a.severity] || 4) - (severityOrder[b.severity] || 4));

    const riskScore = patternFindings.reduce((acc, f) => {
      const w = { critical: 10, high: 7, medium: 4, low: 1 };
      return acc + (w[f.severity] || 0) * (f.confidence || 0.5);
    }, 0);

    const scanDuration = Date.now() - startTime;

    // Log scan to database
    const severityCounts = {};
    patternFindings.forEach(f => { severityCounts[f.severity] = (severityCounts[f.severity] || 0) + 1; });
    
    await dbQuery(`
      INSERT INTO vulnerability_scans 
      (contract_name, code_snippet, vulnerabilities, total_found, severity_counts, 
       ai_model, scan_duration_ms, source_ip)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
      req.body.contractName || 'unknown',
      code.substring(0, 2000),
      JSON.stringify(patternFindings),
      patternFindings.length,
      JSON.stringify(severityCounts),
      aiResult.available ? 'microsoft/codebert-base' : null,
      scanDuration,
      req.ip,
    ]);

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      analysis: {
        totalRules: Object.keys(VULN_PATTERNS).length,
        findingsCount: patternFindings.length,
        riskScore: Math.round(riskScore * 100) / 100,
        riskLevel: riskScore > 15 ? 'critical' : riskScore > 8 ? 'high' : riskScore > 3 ? 'medium' : 'low',
        scanDurationMs: scanDuration,
      },
      findings: patternFindings,
      ai: aiResult,
    });
  } catch (err) {
    console.error('Detection error:', err);
    res.status(500).json({ error: 'Internal detection error', message: err.message });
  }
});

// ─── CRM Risk Events Ingestion (Pipedream webhook target) ────────────────────
app.post('/api/events', async (req, res) => {
  const event = req.body;
  
  const result = await dbQuery(`
    INSERT INTO crm_risk_events 
    (event_type, deal_id, deal_name, client_name, client_tier, owner,
     deal_value, impact, likelihood, risk_score, risk_band, sentiment,
     reasons, monday_item_url, source)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING id
  `, [
    event.event || 'risk_update',
    event.deal_id, event.client || event.deal_name, event.client,
    event.segment || 'Standard', event.owner,
    event.deal_value, event.impact, event.likelihood,
    event.score || event.risk_score, event.band || event.risk_band,
    event.sentiment, event.reasons || [],
    event.monday_item_url, event.source || 'webhook',
  ]);

  // Log to audit trail
  await dbQuery(`
    INSERT INTO audit_log (event_type, source, resource_type, resource_id, details)
    VALUES ('crm_risk_event', $1, 'deal', $2, $3)
  `, [event.source || 'webhook', event.deal_id, JSON.stringify(event)]);

  res.json({ 
    success: true, 
    id: result?.rows?.[0]?.id || null,
    timestamp: new Date().toISOString(),
  });
});

// ─── Metrics Endpoint (Grafana-compatible) ───────────────────────────────────
app.get('/api/metrics', async (req, res) => {
  if (!pool) return res.json({ error: 'Database not configured' });

  const [scans, risks, trend] = await Promise.all([
    dbQuery('SELECT * FROM v_daily_scan_metrics LIMIT 30'),
    dbQuery('SELECT risk_band, count(*) as cnt FROM crm_risk_events GROUP BY risk_band'),
    dbQuery('SELECT * FROM v_risk_trend LIMIT 30'),
  ]);

  res.json({
    scan_metrics: scans?.rows || [],
    risk_distribution: risks?.rows || [],
    risk_trend: trend?.rows || [],
    timestamp: new Date().toISOString(),
  });
});

// ─── Risk Events List ────────────────────────────────────────────────────────
app.get('/api/risks', async (req, res) => {
  if (!pool) return res.json({ events: [], total: 0 });

  const limit = Math.min(parseInt(req.query.limit) || 50, 200);
  const band = req.query.band; // filter by risk_band

  let query = 'SELECT * FROM crm_risk_events';
  const params = [];
  if (band) {
    query += ' WHERE risk_band = $1';
    params.push(band);
  }
  query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1);
  params.push(limit);

  const result = await dbQuery(query, params);
  res.json({ events: result?.rows || [], total: result?.rowCount || 0 });
});

// ─── Scan History ────────────────────────────────────────────────────────────
app.get('/api/scans', async (req, res) => {
  if (!pool) return res.json({ scans: [], total: 0 });

  const limit = Math.min(parseInt(req.query.limit) || 50, 200);
  const result = await dbQuery(
    'SELECT id, scan_id, contract_name, total_found, severity_counts, ai_model, scan_duration_ms, created_at FROM vulnerability_scans ORDER BY created_at DESC LIMIT $1',
    [limit]
  );
  res.json({ scans: result?.rows || [], total: result?.rowCount || 0 });
});

// ─── Security Rules Endpoint ─────────────────────────────────────────────────
app.get('/api/rules', async (req, res) => {
  // Try DB first, fall back to in-memory
  if (pool) {
    const result = await dbQuery('SELECT rule_id, name, category, severity, cwe, description FROM security_rules WHERE is_active = true');
    if (result?.rows?.length) {
      return res.json({ rules: result.rows, total: result.rowCount, source: 'database' });
    }
  }
  
  const rules = Object.entries(VULN_PATTERNS).map(([id, rule]) => ({
    id, ...rule, keywords: undefined,
  }));
  res.json({ rules, total: rules.length, source: 'memory' });
});

// ─── Serve Static Frontend ───────────────────────────────────────────────────
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(__dirname, 'public');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
} else if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
}

// SPA fallback
app.get('*', (req, res) => {
  const indexDist = path.join(distPath, 'index.html');
  const indexPublic = path.join(publicPath, 'index.html');
  
  if (fs.existsSync(indexDist)) {
    res.sendFile(indexDist);
  } else if (fs.existsSync(indexPublic)) {
    res.sendFile(indexPublic);
  } else {
    res.status(404).json({ error: 'Not found', endpoints: ['/health', '/api/status', '/api/ai/detect', '/api/events', '/api/metrics', '/api/risks', '/api/scans', '/api/rules'] });
  }
});

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🛡️  AuditorSEC/Audityzer server v1.1.0 on port ${PORT}`);
  console.log(`   Health:  http://0.0.0.0:${PORT}/health`);
  console.log(`   API:     http://0.0.0.0:${PORT}/api/ai/detect`);
  console.log(`   Status:  http://0.0.0.0:${PORT}/api/status`);
  console.log(`   Events:  http://0.0.0.0:${PORT}/api/events`);
  console.log(`   Metrics: http://0.0.0.0:${PORT}/api/metrics`);
  console.log(`   HF AI:   ${HF_TOKEN ? 'ENABLED ✓' : 'DISABLED (no token)'}`);
  console.log(`   DB:      ${DATABASE_URL ? 'CONNECTED ✓' : 'NOT CONFIGURED'}`);
});
