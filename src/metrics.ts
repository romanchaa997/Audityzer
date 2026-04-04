/**
 * AuditorSEC BRAVE1 Prometheus Metrics Endpoint
 * Exposes KPIs for Grafana dashboard at bbbhhai.com
 * GDPR: No PII - anonymised KPIs only
 */

import { Registry, Counter, Gauge, collectDefaultMetrics } from 'prom-client';

export const registry = new Registry();

// Collect default Node.js metrics
collectDefaultMetrics({ register: registry });

// === BRAVE1 KPI Metrics ===

export const auditsTotal = new Counter({
  name: 'audityzer_audits_total',
  help: 'Total number of smart contract audits completed',
  labelNames: ['type', 'severity'],
  registers: [registry],
});

export const vulnerabilitiesDetected = new Counter({
  name: 'audityzer_vulnerabilities_detected_total',
  help: 'Total vulnerabilities detected by severity',
  labelNames: ['severity', 'category'],
  registers: [registry],
});

export const detectionRatePercent = new Gauge({
  name: 'audityzer_detection_rate_percent',
  help: 'Vulnerability detection rate as percentage (BRAVE1 KPI)',
  registers: [registry],
});

export const brave1Score = new Gauge({
  name: 'audityzer_brave1_score',
  help: 'BRAVE1 grant evaluation score (target: 4+)',
  registers: [registry],
});

export const fopTovComplianceScore = new Gauge({
  name: 'audityzer_fop_tov_compliance_score',
  help: 'Ukrainian FOP/TOV compliance score (0-100)',
  registers: [registry],
});

export const budgetUtilizationPercent = new Gauge({
  name: 'audityzer_budget_utilization_percent',
  help: 'BRAVE1 grant budget utilization percentage',
  registers: [registry],
});

export const milestoneCompletionCount = new Counter({
  name: 'audityzer_milestone_completion_total',
  help: 'Total BRAVE1 milestones completed',
  labelNames: ['phase', 'milestone'],
  registers: [registry],
});

export const apiResponseTimeMs = new Gauge({
  name: 'audityzer_api_response_time_ms',
  help: 'API endpoint response time in milliseconds',
  labelNames: ['endpoint'],
  registers: [registry],
});

// Initialize with baseline values
detectionRatePercent.set(0);
brave1Score.set(0);
fopTovComplianceScore.set(0);
budgetUtilizationPercent.set(0);

/**
 * Express middleware for /metrics endpoint
 */
export async function metricsHandler(req: any, res: any): Promise<void> {
  try {
    res.set('Content-Type', registry.contentType);
    res.end(await registry.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
}

/**
 * BRAVE1 KPI endpoint - aggregated metrics for grant reporting
 */
export async function brave1MetricsHandler(req: any, res: any): Promise<void> {
  try {
    const metrics = await registry.getMetricsAsJSON();
    const brave1KPIs = {
      timestamp: new Date().toISOString(),
      project: 'AuditorSEC',
      grantProgram: 'BRAVE1',
      kpis: {
        audits_completed: metrics.find(m => m.name === 'audityzer_audits_total')?.values?.[0]?.value ?? 0,
        detection_rate: metrics.find(m => m.name === 'audityzer_detection_rate_percent')?.values?.[0]?.value ?? 0,
        brave1_score: metrics.find(m => m.name === 'audityzer_brave1_score')?.values?.[0]?.value ?? 0,
        fop_tov_compliance: metrics.find(m => m.name === 'audityzer_fop_tov_compliance_score')?.values?.[0]?.value ?? 0,
        budget_utilization: metrics.find(m => m.name === 'audityzer_budget_utilization_percent')?.values?.[0]?.value ?? 0,
      },
      gdpr_compliant: true,
      pii_present: false,
    };
    res.json(brave1KPIs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to collect BRAVE1 metrics' });
  }
}
