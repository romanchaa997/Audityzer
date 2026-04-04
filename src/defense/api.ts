// AuditorSEC Defense Audit — Express/Node API handler
// Compatible with Railway deployment (Node 20)
// Branch: defense-audit | BRAVE1 MVP

import { runAudit } from './rules';

export interface AuditRequest {
  supplier: string;
  unitPrice: number;
  benchmarkPrice: number;
  registeredMonths: number;
  contractValue: number;
  supplierCount: number;
  soleSourceJustification: boolean;
  sanctionedCountry: boolean;
  intermediaryCount: number;
  lastMileRegisteredMonths: number;
  pepUboOverlap: boolean;
  repeatOverpricingCount: number;
  prepaymentPercent: number;
  deliveryWeeks: number;
  missingContractId: boolean;
  quantityMismatch: boolean;
  inBreachDump: boolean;
  weakTLS: boolean;
  onchainMixerDetected: boolean;
  smallContractCount: number;
  sameSupplierSameMonth: boolean;
  intermediaryMarginPercent: number;
  valueAdded: boolean;
  hasWebsite: boolean;
  physicalAddressVerified: boolean;
  statutoryCapital: number;
  mediumFindingCount: number;
  criticalFindingCount: number;
}

export interface AuditResponse {
  supplier: string;
  score: number;
  risks: string[];
  severity: string;
  timestamp: string;
  brave1Compliant: boolean;
}

/**
 * Express-compatible handler — mount at POST /api/audit
 * Also usable as Next.js API route (pages/api/audit.ts)
 */
export async function handleAudit(
  body: AuditRequest | AuditRequest[]
): Promise<AuditResponse[]> {
  const entries = Array.isArray(body) ? body : [body];

  return entries.map((entry) => {
    const result = runAudit(entry);
    return {
      supplier: entry.supplier,
      score: Math.round(result.score * 10) / 10,
      risks: result.risks,
      severity: result.severity,
      timestamp: new Date().toISOString(),
      // BRAVE1 threshold: score < 4 = compliant for grant purposes
      brave1Compliant: result.score < 4 && result.severity !== 'HIGH-RISK',
    };
  });
}

// ---- Express standalone server (Railway entry point) ----
// Uncomment when deploying standalone (not as Next.js route):
/*
import express from 'express';
const app = express();
app.use(express.json());

app.post('/api/audit', async (req, res) => {
  try {
    const results = await handleAudit(req.body);
    res.json({ ok: true, results });
  } catch (err) {
    res.status(400).json({ ok: false, error: String(err) });
  }
});

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'auditorsec-defense' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`AuditorSEC Defense API listening on :${PORT}`));
*/
