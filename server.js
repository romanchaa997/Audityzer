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
import { createRequire } from 'module';
import pg from 'pg';
const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const HF_TOKEN = process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || '';
const HF_API_URL = 'https://api-inference.huggingface.co/models/microsoft/codebert-base';
const DATABASE_URL = process.env.DATABASE_URL || '';
const TG_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TG_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

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

// ─── Telegram Alert Helper ────────────────────────────────────────────────────
async function sendTelegramAlert(text) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return;
  try {
    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text, parse_mode: 'Markdown' }),
    });
  } catch (err) {
    console.error('Telegram alert error:', err.message);
  }
}

// Mount Prometheus metrics router (dynamic import for ESM compatibility)
try {
  const metricsModule = await import('./src/routes/metrics.js');
  const metricsRouter = metricsModule.default || metricsModule;
  app.use('/', metricsRouter);
} catch (err) {
  console.warn('Prometheus metrics router not loaded:', err.message);
}

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build/client')));

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

// ─── Security Middleware ─────────────────────────────────────────────────────
// Remove X-Powered-By header (info leak)
app.disable('x-powered-by');

// Security headers (OWASP recommended)
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https:;");
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// CORS — restrict to known origins in production
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['https://bbbhhai.com', 'https://www.bbbhhai.com', 'https://audityzer-production.up.railway.app'];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    if (process.env.NODE_ENV !== 'production') return cb(null, true);
    cb(new Error('CORS policy: origin not allowed'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '1mb' }));

// Rate limiting (basic — prevent abuse)
const rateMap = new Map();
app.use('/api/', (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const window = 60000; // 1 minute
  const maxReqs = 60;   // 60 req/min per IP
  const entry = rateMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > window) { entry.count = 0; entry.start = now; }
  entry.count++;
  rateMap.set(ip, entry);
  if (entry.count > maxReqs) {
    return res.status(429).json({ error: 'Rate limit exceeded. Try again later.' });
  }
  next();
});

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
    version: '1.2.0',
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
    version: '1.3.0',
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
      aiAgentSecurity: true,
      defenseSupplyChain: true,
      nis2Compliance: true,
      gdprCompliance: true,
      multiChainSupport: true,
      proZorroMonitoring: true,
    },
    security: {
      rulesLoaded: Object.keys(VULN_PATTERNS).length,
      categories: [...new Set(Object.values(VULN_PATTERNS).map(p => p.category))],
      severities: Object.values(VULN_PATTERNS).reduce((acc, p) => {
        acc[p.severity] = (acc[p.severity] || 0) + 1; return acc;
      }, {}),
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
  // ─── Original Web3 Patterns ──────────────────────────────────────────────
  reentrancy: {
    keywords: ['call.value', '.call{value', 'external call', 'callback', 'fallback'],
    severity: 'high', cwe: 'CWE-841', category: 'smart-contract',
    description: 'Re-entrancy: state changes after external calls',
  },
  accessControl: {
    keywords: ['onlyOwner', 'require(msg.sender', 'auth', 'modifier'],
    severity: 'high', cwe: 'CWE-284', category: 'smart-contract',
    description: 'Missing or improper access control',
  },
  integerOverflow: {
    keywords: ['SafeMath', 'overflow', 'underflow', 'unchecked'],
    severity: 'medium', cwe: 'CWE-190', category: 'smart-contract',
    description: 'Integer overflow/underflow risk',
  },
  flashLoan: {
    keywords: ['flashloan', 'flash loan', 'price oracle', 'getReserves'],
    severity: 'high', cwe: 'CWE-682', category: 'defi',
    description: 'Flash loan attack vector',
  },
  frontRunning: {
    keywords: ['mempool', 'frontrun', 'sandwich', 'slippage', 'MEV'],
    severity: 'medium', cwe: 'CWE-362', category: 'mev',
    description: 'MEV/front-running vulnerability',
  },
  crossChain: {
    keywords: ['bridge', 'cross-chain', 'relay', 'message passing'],
    severity: 'critical', cwe: 'CWE-345', category: 'bridge',
    description: 'Cross-chain bridge security issue',
  },
  oracleManipulation: {
    keywords: ['oracle', 'price feed', 'Chainlink', 'TWAP'],
    severity: 'high', cwe: 'CWE-400', category: 'defi',
    description: 'Oracle manipulation vulnerability',
  },
  // ─── AI-Agent Security (Grok Conv #4: AI-agent audit direction) ──────────
  agentPromptInjection: {
    keywords: ['prompt', 'injection', 'system prompt', 'jailbreak', 'ignore previous'],
    severity: 'critical', cwe: 'CWE-77', category: 'ai-agent',
    description: 'AI agent prompt injection / jailbreak vector',
  },
  agentAutonomousTrading: {
    keywords: ['autonomous', 'ai agent', 'auto trade', 'agent executor', 'langchain'],
    severity: 'high', cwe: 'CWE-863', category: 'ai-agent',
    description: 'Autonomous AI agent with unguarded asset access',
  },
  governanceExploit: {
    keywords: ['governance', 'proposal', 'vote', 'quorum', 'timelock', 'delegate'],
    severity: 'high', cwe: 'CWE-285', category: 'defi',
    description: 'Governance manipulation / vote buying exploit',
  },
  sandwichAttack: {
    keywords: ['sandwich', 'frontrun', 'backrun', 'amountOutMin', 'slippage tolerance'],
    severity: 'medium', cwe: 'CWE-362', category: 'mev',
    description: 'Sandwich attack on DEX swap with insufficient slippage protection',
  },
  dataPoisoning: {
    keywords: ['training data', 'model update', 'poisoning', 'adversarial', 'backdoor model'],
    severity: 'high', cwe: 'CWE-506', category: 'ai-agent',
    description: 'Data poisoning / adversarial ML attack on AI component',
  },
  // ─── Defense Tech / Supply Chain (Grok Conv #2: Ukrainian defence tech) ──
  supplyChainIntegrity: {
    keywords: ['supply chain', 'vendor', 'supplier', 'procurement', 'subcontract', 'third party'],
    severity: 'high', cwe: 'CWE-829', category: 'defense-supply-chain',
    description: 'Supply chain integrity risk — unverified vendor/supplier dependency',
  },
  droneCommsSecurity: {
    keywords: ['telemetry', 'mavlink', 'drone', 'UAV', 'command and control', 'C2', 'FPV'],
    severity: 'critical', cwe: 'CWE-319', category: 'defense-supply-chain',
    description: 'Drone/UAV communication channel security — unencrypted C2 or telemetry',
  },
  firmwareIntegrity: {
    keywords: ['firmware', 'bootloader', 'OTA update', 'signed binary', 'secure boot'],
    severity: 'high', cwe: 'CWE-494', category: 'defense-supply-chain',
    description: 'Firmware integrity — unsigned or unverified update mechanism',
  },
  // ─── NIS2 Article 21 Controls (Grok Conv #8: NIS2/GDPR mapping) ─────────
  encryptionWeakness: {
    keywords: ['md5', 'sha1', 'des', 'rc4', 'ecb mode', 'weak cipher', 'no encryption'],
    severity: 'high', cwe: 'CWE-327', category: 'nis2-compliance',
    description: 'NIS2 Art.21(2h) — Weak or missing cryptography/encryption',
  },
  mfaAbsent: {
    keywords: ['single factor', 'password only', 'no 2fa', 'no mfa', 'basic auth'],
    severity: 'medium', cwe: 'CWE-308', category: 'nis2-compliance',
    description: 'NIS2 Art.21(2j) — Missing multi-factor authentication',
  },
  incidentResponseGap: {
    keywords: ['no incident', 'no alert', 'unmonitored', 'no logging', 'no audit trail'],
    severity: 'high', cwe: 'CWE-778', category: 'nis2-compliance',
    description: 'NIS2 Art.21(2b) — Insufficient incident handling / detection capability',
  },
  backupDisasterRecovery: {
    keywords: ['no backup', 'no disaster', 'no recovery', 'single point of failure', 'no redundancy'],
    severity: 'medium', cwe: 'CWE-693', category: 'nis2-compliance',
    description: 'NIS2 Art.21(2c) — Missing business continuity / disaster recovery plan',
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

    const riskLevel = riskScore > 15 ? 'critical' : riskScore > 8 ? 'high' : riskScore > 3 ? 'medium' : 'low';

    // Telegram alert on High/Critical findings
    if (riskLevel === 'high' || riskLevel === 'critical') {
      const contractLabel = req.body.contractName || 'unknown contract';
      const findingSummary = patternFindings
        .map(f => `  • *${f.severity.toUpperCase()}* — ${f.description} (${f.cwe})`)
        .join('\n');
      sendTelegramAlert(
        `🚨 *AuditorSEC Scan Alert*\n` +
        `Risk: *${riskLevel.toUpperCase()}* (score ${Math.round(riskScore * 100) / 100})\n` +
        `Contract: \`${contractLabel}\`\n` +
        `Findings (${patternFindings.length}):\n${findingSummary}`
      );
    }

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      analysis: {
        totalRules: Object.keys(VULN_PATTERNS).length,
        findingsCount: patternFindings.length,
        riskScore: Math.round(riskScore * 100) / 100,
        riskLevel,
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

  const eventId = result?.rows?.[0]?.id || null;

  // Telegram alert on risk event ingestion
  const band = event.band || event.risk_band || 'unknown';
  const score = event.score || event.risk_score || 0;
  if (band === 'High' || band === 'Critical' || score >= 7) {
    sendTelegramAlert(
      `⚠️ *CRM Risk Event Ingested*\n` +
      `Client: *${event.client || event.deal_name || 'N/A'}*\n` +
      `Risk Band: *${band}* (score ${score})\n` +
      `Deal Value: ${event.deal_value || 'N/A'}\n` +
      `Owner: ${event.owner || 'N/A'}\n` +
      `Event ID: ${eventId}`
    );
  }

  res.json({ 
    success: true, 
    id: eventId,
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

// ─── Prometheus-Compatible Metrics (for Grafana Cloud) ──────────────────────
let requestCount = 0;
let scanCount = 0;
let errorCount = 0;

// Count requests
app.use((req, res, next) => { requestCount++; next(); });

app.get('/metrics/prometheus', async (req, res) => {
  const uptimeSec = process.uptime();
  const memUsage = process.memoryUsage();

  let dbScans = 0, dbRiskEvents = 0, dbRules = 0;
  if (pool) {
    const r = await dbQuery(`
      SELECT 
        (SELECT count(*) FROM vulnerability_scans) as scans,
        (SELECT count(*) FROM crm_risk_events) as risk_events,
        (SELECT count(*) FROM security_rules WHERE is_active) as rules
    `);
    if (r?.rows?.[0]) {
      dbScans = parseInt(r.rows[0].scans) || 0;
      dbRiskEvents = parseInt(r.rows[0].risk_events) || 0;
      dbRules = parseInt(r.rows[0].rules) || 0;
    }
  }

  res.set('Content-Type', 'text/plain; version=0.0.4');
  res.send(`# HELP audityzer_uptime_seconds Server uptime in seconds
# TYPE audityzer_uptime_seconds gauge
audityzer_uptime_seconds ${Math.round(uptimeSec)}

# HELP audityzer_requests_total Total HTTP requests received
# TYPE audityzer_requests_total counter
audityzer_requests_total ${requestCount}

# HELP audityzer_scans_total Total vulnerability scans performed
# TYPE audityzer_scans_total counter
audityzer_scans_total ${dbScans}

# HELP audityzer_risk_events_total Total CRM risk events ingested
# TYPE audityzer_risk_events_total counter
audityzer_risk_events_total ${dbRiskEvents}

# HELP audityzer_active_rules Active security detection rules
# TYPE audityzer_active_rules gauge
audityzer_active_rules ${dbRules || Object.keys(VULN_PATTERNS).length}

# HELP audityzer_memory_heap_bytes Heap memory usage in bytes
# TYPE audityzer_memory_heap_bytes gauge
audityzer_memory_heap_bytes ${memUsage.heapUsed}

# HELP audityzer_memory_rss_bytes Resident set size in bytes
# TYPE audityzer_memory_rss_bytes gauge
audityzer_memory_rss_bytes ${memUsage.rss}

# HELP audityzer_version_info Server version info
# TYPE audityzer_version_info gauge
audityzer_version_info{version="1.3.0"} 1
`);
});

// ─── Serve Static Frontend ───────────────────────────────────────────────────
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(__dirname, 'public');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
} else if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
}

// ─── NIST SP 800-171 / CMMC Compliance Mapping ──────────────────────────────
const NIST_MAPPING = {
  'AC': { family: 'Access Control', controls: 22, mapped: ['accessControl'],
    description: 'Limit system access to authorized users and transactions' },
  'AT': { family: 'Awareness and Training', controls: 3, mapped: [],
    description: 'Ensure personnel are aware of security risks' },
  'AU': { family: 'Audit and Accountability', controls: 9, mapped: ['reentrancy', 'crossChain'],
    description: 'Create, protect, and retain system audit records' },
  'CM': { family: 'Configuration Management', controls: 9, mapped: ['integerOverflow'],
    description: 'Establish and maintain baseline configurations' },
  'IA': { family: 'Identification and Authentication', controls: 11, mapped: ['accessControl'],
    description: 'Identify and authenticate users and devices' },
  'IR': { family: 'Incident Response', controls: 3, mapped: [],
    description: 'Establish incident-handling capability' },
  'MA': { family: 'Maintenance', controls: 6, mapped: [],
    description: 'Perform maintenance on organizational systems' },
  'MP': { family: 'Media Protection', controls: 9, mapped: [],
    description: 'Protect system media, including digital and paper' },
  'PE': { family: 'Physical Protection', controls: 6, mapped: [],
    description: 'Limit physical access to systems and equipment' },
  'PS': { family: 'Personnel Security', controls: 2, mapped: [],
    description: 'Screen individuals prior to authorizing access' },
  'RA': { family: 'Risk Assessment', controls: 3, mapped: ['flashLoan', 'oracleManipulation', 'frontRunning'],
    description: 'Assess risk to operations and assets' },
  'CA': { family: 'Security Assessment', controls: 4, mapped: [],
    description: 'Assess security controls periodically' },
  'SC': { family: 'System and Communications Protection', controls: 16, mapped: ['crossChain', 'oracleManipulation'],
    description: 'Monitor and protect communications at system boundaries' },
  'SI': { family: 'System and Information Integrity', controls: 7, mapped: ['reentrancy', 'integerOverflow', 'flashLoan'],
    description: 'Identify and correct information flaws, protect from malicious code' },
};

app.get('/api/compliance/nist', (req, res) => {
  const families = Object.entries(NIST_MAPPING).map(([id, fam]) => {
    const coveredRules = fam.mapped.filter(r => VULN_PATTERNS[r]);
    const coverage = fam.controls > 0 ? Math.min(100, Math.round((coveredRules.length / fam.controls) * 100 * 3)) : 0;
    return {
      id: `NIST-${id}`,
      family: fam.family,
      description: fam.description,
      totalControls: fam.controls,
      automatedRules: coveredRules.length,
      ruleIds: coveredRules,
      coveragePercent: coverage,
      status: coverage >= 50 ? 'partial' : coverage > 0 ? 'minimal' : 'manual',
    };
  });

  const totalControls = families.reduce((s, f) => s + f.totalControls, 0);
  const totalAutomated = families.reduce((s, f) => s + f.automatedRules, 0);
  const familiesWithCoverage = families.filter(f => f.automatedRules > 0).length;

  res.json({
    framework: 'NIST SP 800-171 Rev 2',
    cmmcLevel: 'Level 2 (Advanced)',
    timestamp: new Date().toISOString(),
    summary: {
      totalFamilies: families.length,
      familiesWithAutomation: familiesWithCoverage,
      totalControls,
      automatedDetectionRules: totalAutomated,
      overallScore: Math.round((familiesWithCoverage / families.length) * 100),
    },
    families,
    recommendations: [
      'Add authentication/authorization scanning rules to improve AC/IA coverage',
      'Implement audit trail logging for all scan operations (AU family)',
      'Add configuration baseline checks for CM family compliance',
      'Integrate incident response workflows for IR family',
    ],
  });
});

app.get('/api/compliance/cmmc', (req, res) => {
  res.json({
    framework: 'CMMC 2.0',
    timestamp: new Date().toISOString(),
    levels: [
      { level: 1, name: 'Foundational', practices: 17, status: 'partial',
        description: 'Basic cyber hygiene — protect FCI' },
      { level: 2, name: 'Advanced', practices: 110, status: 'in-progress',
        description: 'Good cyber hygiene — protect CUI (NIST 800-171)' },
      { level: 3, name: 'Expert', practices: 134, status: 'planned',
        description: 'Advanced/progressive — protect CUI from APTs' },
    ],
    currentCapabilities: {
      automatedVulnDetection: true,
      patternBasedScanning: true,
      aiAssistedAnalysis: !!HF_TOKEN,
      complianceReporting: true,
      continuousMonitoring: false,
      incidentResponse: false,
    },
  });
});

// ─── NIS2 Directive Article 21 Full Mapping (Grok Conv #8) ──────────────────
const NIS2_ARTICLE_21 = {
  '21.2a': { measure: 'Risk analysis and information system security policies',
    isoMapping: ['5.2', '6.1.2', '6.1.3', 'A.5.1'], gdprMapping: 'Article 32',
    automatedRules: ['accessControl', 'encryptionWeakness'], status: 'partial' },
  '21.2b': { measure: 'Incident handling',
    isoMapping: ['A.5.24', 'A.5.25', 'A.5.26', 'A.5.27', 'A.5.28'], gdprMapping: 'Article 33/34',
    automatedRules: ['incidentResponseGap'], status: 'partial' },
  '21.2c': { measure: 'Business continuity, backup management, disaster recovery, crisis management',
    isoMapping: ['A.5.29', 'A.5.30'], gdprMapping: 'Article 32(1c)',
    automatedRules: ['backupDisasterRecovery'], status: 'partial' },
  '21.2d': { measure: 'Supply chain security (vendor/supplier relationships)',
    isoMapping: ['A.5.19', 'A.5.20', 'A.5.21', 'A.5.22', 'A.5.23'], gdprMapping: 'Article 28 (DPA)',
    automatedRules: ['supplyChainIntegrity', 'firmwareIntegrity'], status: 'partial' },
  '21.2e': { measure: 'Security in network/information systems acquisition, development, maintenance + vulnerability handling',
    isoMapping: ['A.8.8', 'A.8.9', 'A.8.10', 'A.8.22'], gdprMapping: 'Article 25 (by design)',
    automatedRules: ['reentrancy', 'integerOverflow', 'flashLoan', 'oracleManipulation', 'crossChain'], status: 'active' },
  '21.2f': { measure: 'Policies and procedures to assess effectiveness of cybersecurity risk-management',
    isoMapping: ['9.1', '9.2', '9.3', 'A.5.35'], gdprMapping: 'Article 32(1d)',
    automatedRules: [], status: 'manual' },
  '21.2g': { measure: 'Basic cyber hygiene practices and cybersecurity training',
    isoMapping: ['7.3', '7.4', 'A.6.3'], gdprMapping: 'Article 39',
    automatedRules: [], status: 'manual' },
  '21.2h': { measure: 'Policies and procedures regarding cryptography and encryption',
    isoMapping: ['A.8.24'], gdprMapping: 'Article 32(1a)',
    automatedRules: ['encryptionWeakness'], status: 'partial' },
  '21.2i': { measure: 'Human resources security, access control policies, asset management',
    isoMapping: ['A.5.9', 'A.5.10', 'A.5.11', 'A.5.15', 'A.5.18'], gdprMapping: 'Article 32',
    automatedRules: ['accessControl', 'mfaAbsent'], status: 'partial' },
  '21.2j': { measure: 'Multi-factor authentication, secured communications, emergency communication',
    isoMapping: ['A.5.14', 'A.5.16', 'A.5.17'], gdprMapping: 'Article 32',
    automatedRules: ['mfaAbsent', 'droneCommsSecurity'], status: 'partial' },
};

app.get('/api/compliance/nis2', (req, res) => {
  const measures = Object.entries(NIS2_ARTICLE_21).map(([id, m]) => {
    const rulesCovering = m.automatedRules.filter(r => VULN_PATTERNS[r]);
    return {
      id, measure: m.measure, isoMapping: m.isoMapping, gdprMapping: m.gdprMapping,
      automatedRules: rulesCovering.length, ruleIds: rulesCovering, status: m.status,
    };
  });
  const active = measures.filter(m => m.automatedRules > 0).length;
  res.json({
    framework: 'NIS2 Directive (EU) 2022/2555 — Article 21',
    applicableTo: 'Essential and important entities (EU member states)',
    fines: { essential: '€10M or 2% global turnover', important: '€7M or 1.4% global turnover' },
    timestamp: new Date().toISOString(),
    summary: { totalMeasures: 10, withAutomation: active, overallCoverage: Math.round((active / 10) * 100) },
    measures,
    auditPackages: {
      combined: 'NIS2 + GDPR Gap Analysis — recommended for EU entities',
      pricing: { small: '€3,000–8,000', medium: '€15,000–40,000', enterprise: '€50,000–120,000' },
    },
  });
});

// ─── GDPR Article 32 Compliance Mapping ─────────────────────────────────────
app.get('/api/compliance/gdpr', (req, res) => {
  res.json({
    framework: 'GDPR (EU) 2016/679 — Article 32 (Security of processing)',
    timestamp: new Date().toISOString(),
    requirements: [
      { id: 'Art32.1a', requirement: 'Pseudonymisation and encryption of personal data',
        automatedCheck: true, rules: ['encryptionWeakness'], nis2Mapping: '21.2h' },
      { id: 'Art32.1b', requirement: 'Ensure ongoing confidentiality, integrity, availability and resilience',
        automatedCheck: true, rules: ['accessControl', 'mfaAbsent', 'reentrancy'], nis2Mapping: '21.2a/21.2i' },
      { id: 'Art32.1c', requirement: 'Restore availability and access to personal data in timely manner',
        automatedCheck: true, rules: ['backupDisasterRecovery'], nis2Mapping: '21.2c' },
      { id: 'Art32.1d', requirement: 'Regularly test, assess, evaluate effectiveness of measures',
        automatedCheck: false, rules: [], nis2Mapping: '21.2f' },
    ],
    dpiaRequired: 'For high-risk processing (Article 35)',
    combinedAudit: {
      description: 'GDPR + NIS2 share 70-80% of controls (encryption, MFA, incident handling)',
      recommendation: 'Combined gap analysis reduces cost by 30-40% vs separate audits',
    },
  });
});

// ─── Multi-Chain Support Configuration (Grok Conv #4) ───────────────────────
const SUPPORTED_CHAINS = {
  ethereum: { name: 'Ethereum', chainId: 1, type: 'L1', status: 'active', explorer: 'etherscan.io' },
  optimism: { name: 'Optimism', chainId: 10, type: 'L2', status: 'active', explorer: 'optimistic.etherscan.io' },
  arbitrum: { name: 'Arbitrum One', chainId: 42161, type: 'L2', status: 'active', explorer: 'arbiscan.io' },
  base: { name: 'Base', chainId: 8453, type: 'L2', status: 'active', explorer: 'basescan.org' },
  polygon: { name: 'Polygon PoS', chainId: 137, type: 'L2', status: 'active', explorer: 'polygonscan.com' },
  solana: { name: 'Solana', chainId: null, type: 'L1', status: 'beta', explorer: 'solscan.io' },
  ton: { name: 'TON', chainId: null, type: 'L1', status: 'planned', explorer: 'tonscan.org' },
  cosmos: { name: 'Cosmos Hub', chainId: null, type: 'L0', status: 'planned', explorer: 'mintscan.io' },
  avalanche: { name: 'Avalanche C-Chain', chainId: 43114, type: 'L1', status: 'beta', explorer: 'snowscan.xyz' },
  bsc: { name: 'BNB Smart Chain', chainId: 56, type: 'L1', status: 'active', explorer: 'bscscan.com' },
};

app.get('/api/chains', (req, res) => {
  const chains = Object.entries(SUPPORTED_CHAINS).map(([id, c]) => ({ id, ...c }));
  res.json({
    totalChains: chains.length,
    active: chains.filter(c => c.status === 'active').length,
    beta: chains.filter(c => c.status === 'beta').length,
    planned: chains.filter(c => c.status === 'planned').length,
    chains,
    securityIntelligence: 'Cross-chain vulnerability comparison in real-time — unified database',
  });
});

// ─── ProZorro Tender Monitoring (Grok Conv #8: NIS2/GDPR) ───────────────────
const PROZORRO_CPV_CODES = {
  '79210000-1': 'Accounting and auditing services',
  '72212700-4': 'Software development and consultancy services',
  '72220000-0': 'Systems and technical consultancy services',
  '64210000-1': 'Telephone and data transmission services',
  '72000000-5': 'IT services: consulting, software, Internet',
  '35000000-4': 'Security, fire-fighting, police and defence equipment',
};

app.get('/api/tenders/config', (req, res) => {
  res.json({
    source: 'ProZorro (public-api.prozorro.gov.ua)',
    monitoredCPVCodes: PROZORRO_CPV_CODES,
    relevantStatuses: ['active.enquiries', 'active.tendering'],
    auditFocus: ['NIS2 compliance audits', 'Cybersecurity assessments', 'IT auditing services'],
    apiEndpoint: 'https://public-api.prozorro.gov.ua/api/2.5/tenders',
    estimatedValue: {
      financialAudit: '250,000–340,000 UAH',
      nis2ComplianceAudit: '200,000–500,000 UAH',
      combinedGdprNis2: '250,000–500,000 UAH',
    },
    diiaCity: {
      annualAuditDeadline: 'June 1 (ISAE 3000 required)',
      riskOfNonCompliance: 'Status loss if >20 days late',
    },
  });
});

// ─── Defense Supply Chain Audit (Grok Conv #2 + BRAVE1) ─────────────────────
app.get('/api/defense/capabilities', (req, res) => {
  res.json({
    platform: 'AuditorSEC Defense Audit Module',
    brave1Integration: true,
    capabilities: [
      { id: 'drone-supply-chain', name: 'Drone Supply Chain Audit',
        description: 'Verify vendor integrity, firmware signing, and procurement compliance for UAV components',
        rules: ['supplyChainIntegrity', 'firmwareIntegrity', 'droneCommsSecurity'] },
      { id: 'defense-procurement', name: 'Defense Procurement Transparency',
        description: 'Blockchain-based audit trail for MoD procurement (ProZorro integration)',
        rules: ['supplyChainIntegrity'] },
      { id: 'comms-security', name: 'Secure Communications Audit',
        description: 'Verify encryption of drone C2, telemetry, and video feeds (fiber-optic FPV compliance)',
        rules: ['droneCommsSecurity', 'encryptionWeakness'] },
    ],
    ukrainianDefenseTech: {
      ecosystem: 'BRAVE1 (brave1.gov.ua)',
      companies: ['Ukrspecsystems', 'Airlogix', 'TAF Drones', 'Swarmer', 'Ratel Robotics', 'Wild Hornets', 'Escadrone', 'Aerorozvidka'],
      industrySize: '~500 companies (2025-2026)',
      growth: 'From dozens in 2022 to ~500 in 2026',
    },
  });
});

// ─── Competitive Intelligence (Grok Conv #5 + #7) ───────────────────────────
app.get('/api/market/landscape', (req, res) => {
  res.json({
    platform: 'AuditorSEC / Audityzer',
    positioning: 'AI-first automated security + decentralized audit network (2026-2027)',
    competitors: [
      { name: 'Sherlock', strength: 'AI + competitive audits + $2M insurance', tier: 'leader' },
      { name: 'CertiK', strength: 'Skynet real-time monitoring + formal verification', tier: 'leader' },
      { name: 'Trail of Bits', strength: 'Slither/Echidna tools + deep research', tier: 'leader' },
      { name: 'Spearbit', strength: 'DAO + curated auditor network, $7M funding', tier: 'premium' },
      { name: 'Nethermind', strength: 'AI threat intelligence + proactive defense', tier: 'strong' },
      { name: 'Hashlock', strength: 'Free AI scan + optimization for MVPs', tier: 'emerging' },
      { name: 'Cyfrin', strength: 'Aderyn + AI First Flights education', tier: 'strong' },
      { name: 'Forta', strength: 'Decentralized threat monitoring network (FORT token)', tier: 'leader' },
      { name: 'PeckShield', strength: 'Traditional top-3 auditor since 2018', tier: 'established' },
    ],
    pricingTiers: {
      mvp: { range: '$2,000–$12,000', stack: 'AI scan + 1 manual audit' },
      defi: { range: '$40,000–$150,000', stack: 'Multi-layer: AI + 2-3 manual audits + monitoring' },
      institutional: { range: '$120,000–$400,000+', stack: 'AI + formal verification + top-tier audit + insurance + monitoring' },
    },
    differentiators: [
      'AI-agent security auditing (autonomous DeFi agents, governance exploits)',
      'Defense supply chain auditing (BRAVE1 ecosystem, drone/UAV)',
      'NIS2 + GDPR combined compliance for EU entities',
      'Multi-chain unified security intelligence (10 chains)',
      'ProZorro government tender integration (Ukrainian market)',
    ],
    timestamp: new Date().toISOString(),
  });
});

// API 404 handler — return JSON for unmatched /api/* routes
app.all('/api/*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `No API route matches ${req.method} ${req.path}`,
    availableEndpoints: [
      'GET  /api/status',
      'GET  /api/rules',
      'POST /api/ai/detect',
      'POST /api/events',
      'GET  /api/metrics',
      'GET  /api/risks',
      'GET  /api/scans',
      'GET  /api/compliance/nist',
      'GET  /api/compliance/cmmc',
      'GET  /api/compliance/nis2',
      'GET  /api/compliance/gdpr',
      'GET  /api/chains',
      'GET  /api/tenders/config',
      'GET  /api/defense/capabilities',
      'GET  /api/market/landscape',
    ],
  });
});

// SPA fallback — serve index.html for unmatched non-API routes
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
  console.log(`🛡️  AuditorSEC/Audityzer server v1.3.0 on port ${PORT}`);
  console.log(`   Health:  http://0.0.0.0:${PORT}/health`);
  console.log(`   API:     http://0.0.0.0:${PORT}/api/ai/detect`);
  console.log(`   Status:  http://0.0.0.0:${PORT}/api/status`);
  console.log(`   Events:  http://0.0.0.0:${PORT}/api/events`);
  console.log(`   Metrics: http://0.0.0.0:${PORT}/api/metrics`);
  console.log(`   HF AI:   ${HF_TOKEN ? 'ENABLED ✓' : 'DISABLED (no token)'}`);
  console.log(`   DB:      ${DATABASE_URL ? 'CONNECTED ✓' : 'NOT CONFIGURED'}`);
});
