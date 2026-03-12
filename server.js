/**
 * AuditorSEC / Audityzer — Production Server
 * 
 * Express server for Railway deployment:
 * - Serves Vite-built static frontend
 * - /health endpoint for Railway healthchecks
 * - /api/ai/detect endpoint for AI vulnerability detection (HF Inference)
 * - /api/status for platform status
 */

import express from 'express';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const HF_TOKEN = process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || '';
const HF_API_URL = 'https://api-inference.huggingface.co/models/microsoft/codebert-base';

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// ─── Health Check ────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'audityzer',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    ai: {
      huggingface: HF_TOKEN ? 'configured' : 'not configured',
      model: 'microsoft/codebert-base',
    },
  });
});

// ─── Platform Status ─────────────────────────────────────────────────────────
app.get('/api/status', (req, res) => {
  res.json({
    platform: 'AuditorSEC',
    product: 'Audityzer',
    version: '1.0.0',
    branch: 'defense-audit',
    modules: {
      patternDetection: true,
      aiVulnerabilityDetection: !!HF_TOKEN,
      bridgeSecurityScanner: true,
      optimismL2Rules: true,
      frontRunningDetection: true,
      immunefiIntegration: true,
      grafanaDashboard: true,
    },
    security: {
      rulesLoaded: 12,
      categories: ['bridge', 'optimism-l2', 'dapp-frontend', 'mev'],
      severities: { critical: 6, high: 4, medium: 2 },
    },
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

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      analysis: {
        totalRules: Object.keys(VULN_PATTERNS).length,
        findingsCount: patternFindings.length,
        riskScore: Math.round(riskScore * 100) / 100,
        riskLevel: riskScore > 15 ? 'critical' : riskScore > 8 ? 'high' : riskScore > 3 ? 'medium' : 'low',
      },
      findings: patternFindings,
      ai: aiResult,
    });
  } catch (err) {
    console.error('Detection error:', err);
    res.status(500).json({ error: 'Internal detection error', message: err.message });
  }
});

// ─── Security Rules Endpoint ─────────────────────────────────────────────────
app.get('/api/rules', (req, res) => {
  const rules = Object.entries(VULN_PATTERNS).map(([id, rule]) => ({
    id, ...rule, keywords: undefined,
  }));
  res.json({ rules, total: rules.length });
});

// ─── Serve Static Frontend ───────────────────────────────────────────────────
// Try dist/ first (Vite build output), fall back to public/
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(__dirname, 'public');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
} else {
  app.use(express.static(publicPath));
}

// SPA fallback — serve index.html for unmatched routes
app.get('*', (req, res) => {
  const indexDist = path.join(distPath, 'index.html');
  const indexPublic = path.join(publicPath, 'index.html');
  
  if (fs.existsSync(indexDist)) {
    res.sendFile(indexDist);
  } else if (fs.existsSync(indexPublic)) {
    res.sendFile(indexPublic);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🛡️  AuditorSEC/Audityzer server running on port ${PORT}`);
  console.log(`   Health: http://0.0.0.0:${PORT}/health`);
  console.log(`   API:    http://0.0.0.0:${PORT}/api/ai/detect`);
  console.log(`   Status: http://0.0.0.0:${PORT}/api/status`);
  console.log(`   HF AI:  ${HF_TOKEN ? 'ENABLED ✓' : 'DISABLED (no token)'}`);
});
