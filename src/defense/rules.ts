// AuditorSEC Defense Audit Platform - 15 Risk Rules
// Branch: defense-audit | BRAVE1 Grant MVP
// LLC AuditorSEC EDRPOU 46077399

export interface RiskRule {
  id: string;
  name: string;
  category: 'Pricing' | 'Structure' | 'Integrity' | 'CyberOPSEC' | 'Documentation';
  severity: 'critical' | 'high' | 'medium';
  check: (data: any) => number; // returns 0-10 risk score
}

export const rules: RiskRule[] = [
  {
    id: 'price-inflation',
    name: 'Inflated Pricing vs Benchmark',
    category: 'Pricing',
    severity: 'critical',
    check: (data) => data.unitPrice > data.benchmarkPrice * 1.5 ? 9 : 0,
  },
  {
    id: 'single-source',
    name: 'Single-Source No Competition',
    category: 'Structure',
    severity: 'high',
    check: (data) => (data.supplierCount <= 1 && !data.soleSourceJustification) ? 8 : 0,
  },
  {
    id: 'high-risk-jurisdiction',
    name: 'High-Risk Jurisdiction / Sanctions',
    category: 'Integrity',
    severity: 'critical',
    check: (data) => data.sanctionedCountry ? 10 : 0,
  },
  {
    id: 'unusual-intermediaries',
    name: 'Unusual Intermediary Chain',
    category: 'Structure',
    severity: 'high',
    check: (data) => (data.intermediaryCount > 2 || data.lastMileRegisteredMonths < 12) ? 8 : 0,
  },
  {
    id: 'conflict-of-interest',
    name: 'Conflict of Interest Pattern (PEP/UBO)',
    category: 'Integrity',
    severity: 'critical',
    check: (data) => data.pepUboOverlap ? 9 : 0,
  },
  {
    id: 'shell-company',
    name: 'New Shell Company Pattern',
    category: 'Structure',
    severity: 'critical',
    check: (data) => (data.registeredMonths < 12 && data.contractValue > 500000) ? 9 : 0,
  },
  {
    id: 'repeated-overpricing',
    name: 'Repeated Overpricing Same Counterparty',
    category: 'Pricing',
    severity: 'high',
    check: (data) => (data.repeatOverpricingCount >= 2) ? 8 : 0,
  },
  {
    id: 'suspicious-prepayment',
    name: 'Suspicious Prepayment Terms',
    category: 'Documentation',
    severity: 'high',
    check: (data) => (data.prepaymentPercent >= 70 && data.deliveryWeeks > 8) ? 7 : 0,
  },
  {
    id: 'inconsistent-docs',
    name: 'Inconsistent Documentation',
    category: 'Documentation',
    severity: 'medium',
    check: (data) => (data.missingContractId || data.quantityMismatch) ? 6 : 0,
  },
  {
    id: 'cyber-opsec-supplier',
    name: 'Cyber/OPSEC Red Flag on Supplier',
    category: 'CyberOPSEC',
    severity: 'high',
    check: (data) => (data.inBreachDump || data.weakTLS) ? 8 : 0,
  },
  {
    id: 'onchain-mixer',
    name: 'Non-Traceable On-Chain Payments (Mixers)',
    category: 'CyberOPSEC',
    severity: 'critical',
    check: (data) => data.onchainMixerDetected ? 10 : 0,
  },
  {
    id: 'tender-fragmentation',
    name: 'Fragmentation of Contracts (Anti-tender Split)',
    category: 'Structure',
    severity: 'high',
    check: (data) => (data.smallContractCount >= 3 && data.sameSupplierSameMonth) ? 8 : 0,
  },
  {
    id: 'unusual-intermediary-margin',
    name: 'Unusual Margin for Intermediaries',
    category: 'Pricing',
    severity: 'high',
    check: (data) => (data.intermediaryMarginPercent > 30 && !data.valueAdded) ? 8 : 0,
  },
  {
    id: 'low-transparency',
    name: 'Low Supplier Transparency',
    category: 'Integrity',
    severity: 'medium',
    check: (data) => (!data.hasWebsite || !data.physicalAddressVerified || data.statutoryCapital < 10000) ? 6 : 0,
  },
  {
    id: 'combo-redflag',
    name: 'Red-Flag Combo Score (3 medium OR 1 critical)',
    category: 'Integrity',
    severity: 'critical',
    check: (data) => (data.mediumFindingCount >= 3 || data.criticalFindingCount >= 1) ? 10 : 0,
  },
];

export function runAudit(csvData: any): { score: number; risks: string[]; severity: string } {
  const risks: string[] = [];
  let totalScore = 0;
  let criticalCount = 0;
  let mediumCount = 0;

  rules.forEach((rule) => {
    const score = rule.check(csvData);
    if (score >= 5) {
      risks.push(`[${rule.severity.toUpperCase()}] ${rule.name} (+${score})`);
      totalScore += score;
      if (rule.severity === 'critical') criticalCount++;
      else if (rule.severity === 'medium') mediumCount++;
    }
  });

  const normalizedScore = Math.min(10, totalScore / rules.length);
  const severity = criticalCount >= 1 ? 'HIGH-RISK' : mediumCount >= 3 ? 'MEDIUM-RISK' : 'LOW-RISK';

  return { score: normalizedScore, risks, severity };
}

// BRAVE1 METADATA
// Grant tier: up to 4M UAH (prototype field tests) -> up to 8M UAH (serial production)
// Compliance: MoD Order 692nm, GDPR (anonymized KPIs), Zero-trust (Cloudflare Workers)
// Integration: DOTChain Defence API, Brave1 Market, Prometheus/Grafana metrics export
// IP Protection: UADV utility model filing (uaip.gov.ua) - file within 30 days of grant
// ZSU Field Test Protocol: NDA v1, read-only VPN/RBAC, 12mo log retention (ELK stack)
