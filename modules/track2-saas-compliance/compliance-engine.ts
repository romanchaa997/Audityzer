/**
 * @module compliance-engine
 * @description Multi-framework compliance checker for AuditorSEC.
 *
 * Supports: SEBI CSCRF, LGPD, Joint Standard 2, SOC 2 Type II, ISO 27001, GDPR.
 * Features:
 *  - JSON-driven configurable rulesets
 *  - Audit evidence collection and scoring
 *  - Gap analysis report generation
 *  - Remediation recommendation engine
 */

import { readFile } from 'node:fs/promises';
import pino from 'pino';
import { frameworkConfigs, type FrameworkConfig } from './config.js';
import type {
  AuditEvidence,
  ComplianceCheckResult,
  ComplianceFramework,
  ComplianceReport,
  ComplianceRule,
  ComplianceRuleset,
  ComplianceStatus,
  GapAnalysisItem,
  RemediationRecommendation,
  Severity,
} from './types.js';

const logger = pino({ name: 'compliance-engine' });

// ─── Rule Registry ──────────────────────────────────────────────────────────

/**
 * In-memory registry of loaded rulesets keyed by framework.
 * Populated via {@link loadRuleset} or {@link loadAllRulesets}.
 */
const rulesetRegistry = new Map<ComplianceFramework, ComplianceRuleset>();

/**
 * Load a ruleset from a JSON file on disk.
 * @param config - Framework configuration pointing to the ruleset file.
 */
export async function loadRuleset(config: FrameworkConfig): Promise<ComplianceRuleset> {
  logger.info({ framework: config.framework }, 'Loading ruleset');
  const raw = await readFile(config.rulesetPath, 'utf-8');
  const ruleset: ComplianceRuleset = JSON.parse(raw);
  rulesetRegistry.set(config.framework, ruleset);
  logger.info(
    { framework: config.framework, ruleCount: ruleset.rules.length },
    'Ruleset loaded',
  );
  return ruleset;
}

/**
 * Load all enabled rulesets defined in {@link frameworkConfigs}.
 */
export async function loadAllRulesets(): Promise<void> {
  const enabled = frameworkConfigs.filter((c) => c.enabled);
  const results = await Promise.allSettled(enabled.map(loadRuleset));
  for (const [i, result] of results.entries()) {
    if (result.status === 'rejected') {
      logger.warn(
        { framework: enabled[i].framework, error: result.reason },
        'Failed to load ruleset — skipping',
      );
    }
  }
}

/**
 * Get a loaded ruleset by framework.
 */
export function getRuleset(framework: ComplianceFramework): ComplianceRuleset | undefined {
  return rulesetRegistry.get(framework);
}

// ─── Check Function Registry ────────────────────────────────────────────────

/** Signature for automated compliance check functions */
type CheckFunction = (
  rule: ComplianceRule,
  evidence: AuditEvidence[],
) => Promise<ComplianceCheckResult>;

const checkFnRegistry = new Map<string, CheckFunction>();

/**
 * Register a check function by identifier.
 * @param id - Unique identifier matching {@link ComplianceRule.checkFn}.
 * @param fn - The check function implementation.
 */
export function registerCheckFn(id: string, fn: CheckFunction): void {
  checkFnRegistry.set(id, fn);
  logger.debug({ checkFn: id }, 'Registered check function');
}

/**
 * Resolve a check function by id, falling back to a manual-review stub.
 */
function resolveCheckFn(id: string): CheckFunction {
  return checkFnRegistry.get(id) ?? defaultManualCheck;
}

/** Default check function for rules that require manual review. */
const defaultManualCheck: CheckFunction = async (rule) => ({
  ruleId: rule.id,
  status: 'pending' as ComplianceStatus,
  score: 0,
  maxScore: 10,
  evidence: [],
  findings: ['Requires manual review — no automated check function registered.'],
  remediation: null,
  checkedAt: new Date().toISOString(),
});

// ─── Built-in Check Functions ───────────────────────────────────────────────

/** Check if required evidence types are present and non-empty. */
registerCheckFn('evidence_present', async (rule, evidence) => {
  const requiredTypes = new Set(rule.requiredEvidence);
  const presentTypes = new Set(evidence.map((e) => e.type));
  const missing = [...requiredTypes].filter((t) => !presentTypes.has(t));

  const pass = missing.length === 0;
  return {
    ruleId: rule.id,
    status: pass ? 'pass' : 'fail',
    score: pass ? 10 : Math.max(0, 10 - missing.length * 3),
    maxScore: 10,
    evidence,
    findings: pass
      ? ['All required evidence types present.']
      : [`Missing evidence types: ${missing.join(', ')}`],
    remediation: pass ? null : rule.remediation,
    checkedAt: new Date().toISOString(),
  };
});

/** Check configuration evidence against expected patterns. */
registerCheckFn('config_validation', async (rule, evidence) => {
  const configEvidence = evidence.filter((e) => e.type === 'config');
  if (configEvidence.length === 0) {
    return {
      ruleId: rule.id,
      status: 'fail',
      score: 0,
      maxScore: 10,
      evidence: [],
      findings: ['No configuration evidence provided.'],
      remediation: rule.remediation,
      checkedAt: new Date().toISOString(),
    };
  }

  // Check each config evidence has non-empty data
  const valid = configEvidence.filter((e) => e.data.trim().length > 0);
  const score = Math.round((valid.length / configEvidence.length) * 10);
  return {
    ruleId: rule.id,
    status: score >= 7 ? 'pass' : score >= 4 ? 'partial' : 'fail',
    score,
    maxScore: 10,
    evidence: configEvidence,
    findings: [
      `${valid.length}/${configEvidence.length} configuration items validated.`,
    ],
    remediation: score < 7 ? rule.remediation : null,
    checkedAt: new Date().toISOString(),
  };
});

/** Check scan results for vulnerability presence. */
registerCheckFn('scan_result_check', async (rule, evidence) => {
  const scans = evidence.filter((e) => e.type === 'scan_result');
  if (scans.length === 0) {
    return {
      ruleId: rule.id,
      status: 'fail',
      score: 0,
      maxScore: 10,
      evidence: [],
      findings: ['No scan results provided.'],
      remediation: rule.remediation,
      checkedAt: new Date().toISOString(),
    };
  }

  // Parse scan data looking for severity markers
  const criticalFindings = scans.filter((s) =>
    s.data.toLowerCase().includes('critical'),
  );
  const pass = criticalFindings.length === 0;
  return {
    ruleId: rule.id,
    status: pass ? 'pass' : 'fail',
    score: pass ? 10 : 2,
    maxScore: 10,
    evidence: scans,
    findings: pass
      ? ['No critical vulnerabilities found in scan results.']
      : [`${criticalFindings.length} critical finding(s) detected in scan results.`],
    remediation: pass ? null : rule.remediation,
    checkedAt: new Date().toISOString(),
  };
});

/** Check API response evidence for expected status codes. */
registerCheckFn('api_response_check', async (rule, evidence) => {
  const apiEvidence = evidence.filter((e) => e.type === 'api_response');
  if (apiEvidence.length === 0) {
    return {
      ruleId: rule.id,
      status: 'pending',
      score: 0,
      maxScore: 10,
      evidence: [],
      findings: ['No API response evidence collected yet.'],
      remediation: null,
      checkedAt: new Date().toISOString(),
    };
  }

  const passed = apiEvidence.filter((e) => {
    try {
      const parsed = JSON.parse(e.data);
      return parsed.status >= 200 && parsed.status < 300;
    } catch {
      return false;
    }
  });

  const score = Math.round((passed.length / apiEvidence.length) * 10);
  return {
    ruleId: rule.id,
    status: score >= 7 ? 'pass' : score >= 4 ? 'partial' : 'fail',
    score,
    maxScore: 10,
    evidence: apiEvidence,
    findings: [`${passed.length}/${apiEvidence.length} API checks passed.`],
    remediation: score < 7 ? rule.remediation : null,
    checkedAt: new Date().toISOString(),
  };
});

// ─── Compliance Audit Runner ────────────────────────────────────────────────

/**
 * Run a full compliance audit for a given framework against provided evidence.
 *
 * @param framework  - The compliance framework to audit against.
 * @param clientId   - Identifier of the client being audited.
 * @param evidence   - Collected audit evidence.
 * @param auditorId  - Identifier of the auditor running the check.
 * @returns A complete {@link ComplianceReport}.
 * @throws If the requested framework ruleset is not loaded.
 */
export async function runComplianceAudit(
  framework: ComplianceFramework,
  clientId: string,
  evidence: AuditEvidence[],
  auditorId: string,
): Promise<ComplianceReport> {
  const ruleset = rulesetRegistry.get(framework);
  if (!ruleset) {
    throw new Error(`Ruleset not loaded for framework: ${framework}`);
  }

  logger.info(
    { framework, clientId, ruleCount: ruleset.rules.length },
    'Starting compliance audit',
  );

  const results: ComplianceCheckResult[] = [];

  for (const rule of ruleset.rules) {
    const checkFn = resolveCheckFn(rule.checkFn);
    const relevantEvidence = evidence.filter((e) =>
      rule.requiredEvidence.includes(e.type),
    );

    try {
      const result = await checkFn(rule, relevantEvidence);
      results.push(result);
    } catch (err) {
      logger.error({ ruleId: rule.id, error: err }, 'Check function failed');
      results.push({
        ruleId: rule.id,
        status: 'fail',
        score: 0,
        maxScore: 10,
        evidence: [],
        findings: [`Check function error: ${err instanceof Error ? err.message : String(err)}`],
        remediation: rule.remediation,
        checkedAt: new Date().toISOString(),
      });
    }
  }

  const overallScore = results.reduce((sum, r) => sum + r.score, 0);
  const maxScore = results.reduce((sum, r) => sum + r.maxScore, 0);
  const passRate = maxScore > 0 ? overallScore / maxScore : 0;

  const gaps = generateGapAnalysis(ruleset, results);

  const report: ComplianceReport = {
    id: `rpt-${framework}-${Date.now()}`,
    clientId,
    framework,
    results,
    overallScore,
    maxScore,
    passRate: Math.round(passRate * 100) / 100,
    gaps,
    generatedAt: new Date().toISOString(),
    auditorId,
  };

  logger.info(
    {
      framework,
      clientId,
      overallScore,
      maxScore,
      passRate: report.passRate,
      gapCount: gaps.length,
    },
    'Compliance audit complete',
  );

  return report;
}

// ─── Gap Analysis ───────────────────────────────────────────────────────────

/**
 * Generate gap analysis from compliance check results.
 * Only includes rules that did not fully pass.
 */
function generateGapAnalysis(
  ruleset: ComplianceRuleset,
  results: ComplianceCheckResult[],
): GapAnalysisItem[] {
  const ruleMap = new Map(ruleset.rules.map((r) => [r.id, r]));
  const gaps: GapAnalysisItem[] = [];

  for (const result of results) {
    if (result.status === 'pass' || result.status === 'not_applicable') continue;

    const rule = ruleMap.get(result.ruleId);
    if (!rule) continue;

    const remediation = generateRemediation(rule, result);

    gaps.push({
      ruleId: rule.id,
      framework: ruleset.framework,
      gap: result.findings.join(' '),
      currentState: `Score: ${result.score}/${result.maxScore} — ${result.status}`,
      requiredState: `Full compliance (${result.maxScore}/${result.maxScore})`,
      severity: rule.severity,
      remediation,
      estimatedEffort: estimateEffort(rule.severity, result.score, result.maxScore),
    });
  }

  // Sort by severity
  const severityOrder: Record<Severity, number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
    info: 4,
  };
  gaps.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return gaps;
}

/**
 * Generate remediation recommendations for a failed rule.
 */
function generateRemediation(
  rule: ComplianceRule,
  result: ComplianceCheckResult,
): RemediationRecommendation {
  const baseSteps = [
    `Review ${rule.regulationRef} requirements.`,
    `Collect missing evidence: ${rule.requiredEvidence.join(', ')}.`,
    rule.remediation,
    'Re-run compliance check to verify remediation.',
  ];

  return {
    id: `rem-${rule.id}`,
    title: `Remediate: ${rule.title}`,
    description: `Address gap in ${rule.category} — current score ${result.score}/${result.maxScore}.`,
    steps: baseSteps,
    priority: rule.severity,
    estimatedCost: estimateCost(rule.severity),
    tools: inferTools(rule),
  };
}

/** Estimate remediation effort based on severity and score gap. */
function estimateEffort(
  severity: Severity,
  score: number,
  maxScore: number,
): 'low' | 'medium' | 'high' {
  const gap = maxScore - score;
  if (severity === 'critical' || gap >= 8) return 'high';
  if (severity === 'high' || gap >= 5) return 'medium';
  return 'low';
}

/** Rough cost estimate by severity. */
function estimateCost(severity: Severity): string {
  const costs: Record<Severity, string> = {
    critical: '$5,000 – $20,000',
    high: '$2,000 – $10,000',
    medium: '$500 – $5,000',
    low: '$100 – $1,000',
    info: '$0 – $500',
  };
  return costs[severity];
}

/** Infer recommended tools based on rule requirements. */
function inferTools(rule: ComplianceRule): string[] {
  const tools: string[] = [];
  if (rule.requiredEvidence.includes('scan_result')) tools.push('AuditorSEC Scanner');
  if (rule.requiredEvidence.includes('config')) tools.push('Configuration Auditor');
  if (rule.requiredEvidence.includes('log')) tools.push('Log Analyzer');
  if (rule.requiredEvidence.includes('api_response')) tools.push('API Tester');
  if (tools.length === 0) tools.push('Manual Review');
  return tools;
}

// ─── Framework-Specific Helpers ─────────────────────────────────────────────

/**
 * SEBI CSCRF audit — wraps {@link runComplianceAudit} with SEBI defaults.
 * Covers mandatory cyber audit checklist per SEBI circular April 2025.
 */
export async function runSEBIAudit(
  clientId: string,
  evidence: AuditEvidence[],
  auditorId: string,
): Promise<ComplianceReport> {
  return runComplianceAudit('SEBI_CSCRF', clientId, evidence, auditorId);
}

/**
 * LGPD audit — wraps {@link runComplianceAudit} with LGPD defaults.
 * Covers data protection compliance per ANPD enforcement (Brazil).
 */
export async function runLGPDAudit(
  clientId: string,
  evidence: AuditEvidence[],
  auditorId: string,
): Promise<ComplianceReport> {
  return runComplianceAudit('LGPD', clientId, evidence, auditorId);
}

/**
 * Joint Standard 2 audit — South Africa financial institution cybersecurity.
 * Effective 1 June 2025 per FSCA/Prudential Authority.
 */
export async function runJointStandard2Audit(
  clientId: string,
  evidence: AuditEvidence[],
  auditorId: string,
): Promise<ComplianceReport> {
  return runComplianceAudit('JOINT_STANDARD_2', clientId, evidence, auditorId);
}

// ─── Report Formatting ──────────────────────────────────────────────────────

/** Format a compliance report as Markdown. */
export function formatReportMarkdown(report: ComplianceReport): string {
  const lines: string[] = [
    `# Compliance Audit Report — ${report.framework}`,
    '',
    `**Client:** ${report.clientId}`,
    `**Auditor:** ${report.auditorId}`,
    `**Generated:** ${report.generatedAt}`,
    `**Overall Score:** ${report.overallScore}/${report.maxScore} (${Math.round(report.passRate * 100)}%)`,
    '',
    '## Results Summary',
    '',
    '| Rule ID | Status | Score | Findings |',
    '| ------- | ------ | ----- | -------- |',
  ];

  for (const r of report.results) {
    const statusEmoji =
      r.status === 'pass' ? 'PASS' : r.status === 'fail' ? 'FAIL' : r.status.toUpperCase();
    lines.push(
      `| ${r.ruleId} | ${statusEmoji} | ${r.score}/${r.maxScore} | ${r.findings[0] ?? ''} |`,
    );
  }

  if (report.gaps.length > 0) {
    lines.push('', '## Gap Analysis', '');
    for (const gap of report.gaps) {
      lines.push(`### ${gap.ruleId} (${gap.severity.toUpperCase()})`);
      lines.push(`- **Gap:** ${gap.gap}`);
      lines.push(`- **Current:** ${gap.currentState}`);
      lines.push(`- **Required:** ${gap.requiredState}`);
      lines.push(`- **Effort:** ${gap.estimatedEffort}`);
      lines.push(`- **Remediation:** ${gap.remediation.title}`);
      for (const step of gap.remediation.steps) {
        lines.push(`  1. ${step}`);
      }
      lines.push('');
    }
  }

  return lines.join('\n');
}

/** Format a compliance report as structured JSON string. */
export function formatReportJSON(report: ComplianceReport): string {
  return JSON.stringify(report, null, 2);
}
