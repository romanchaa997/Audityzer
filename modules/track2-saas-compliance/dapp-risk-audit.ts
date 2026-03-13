/**
 * @module dapp-risk-audit
 * @description dApp risk scoring and audit module for AuditorSEC.
 *
 * Provides:
 *  - CVSS-like vulnerability scoring adapted for Web3
 *  - DeFi-specific risk factors: rug pull detection, liquidity, governance
 *  - Cross-chain risk aggregation
 *  - JSON and Markdown report generation
 */

import pino from 'pino';
import { riskConfig } from './config.js';
import type {
  Chain,
  DAppRiskCategory,
  DAppRiskFactor,
  DAppRiskReport,
  GovernanceAssessment,
  LiquidityAssessment,
  Severity,
  Web3CVSS,
} from './types.js';

const logger = pino({ name: 'dapp-risk-audit' });

// ─── Web3 CVSS Scoring ─────────────────────────────────────────────────────

/** Attack vector weights */
const ATTACK_VECTOR_WEIGHTS: Record<Web3CVSS['attackVector'], number> = {
  network: 0.85,
  contract: 0.72,
  governance: 0.62,
  oracle: 0.55,
};

/** Financial impact multiplier */
const FINANCIAL_IMPACT: Record<Web3CVSS['financialImpact'], number> = {
  negligible: 1.0,
  moderate: 1.2,
  significant: 1.5,
  catastrophic: 2.0,
};

/**
 * Calculate a Web3 CVSS base score (0–10 scale).
 * Extends standard CVSS v3.1 with a financial impact multiplier unique to DeFi.
 *
 * @param cvss - The Web3 CVSS vector.
 * @returns Numeric score between 0.0 and 10.0.
 */
export function calculateWeb3CVSSScore(cvss: Web3CVSS): number {
  const av = ATTACK_VECTOR_WEIGHTS[cvss.attackVector];
  const ac = cvss.attackComplexity === 'low' ? 0.77 : 0.44;
  const pr = cvss.privilegesRequired === 'none' ? 0.85 : cvss.privilegesRequired === 'low' ? 0.62 : 0.27;
  const ui = cvss.userInteraction === 'none' ? 0.85 : 0.62;

  const impactC = cvss.impactConfidentiality === 'high' ? 0.56 : cvss.impactConfidentiality === 'low' ? 0.22 : 0;
  const impactI = cvss.impactIntegrity === 'high' ? 0.56 : cvss.impactIntegrity === 'low' ? 0.22 : 0;
  const impactA = cvss.impactAvailability === 'high' ? 0.56 : cvss.impactAvailability === 'low' ? 0.22 : 0;

  const iss = 1 - (1 - impactC) * (1 - impactI) * (1 - impactA);
  const impact = cvss.scope === 'changed' ? 7.52 * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15) : 6.42 * iss;

  const exploitability = 8.22 * av * ac * pr * ui;
  const financialMultiplier = FINANCIAL_IMPACT[cvss.financialImpact];

  if (impact <= 0) return 0;

  const rawScore =
    cvss.scope === 'changed'
      ? Math.min(1.08 * (impact + exploitability), 10)
      : Math.min(impact + exploitability, 10);

  // Apply financial multiplier, capping at 10
  return Math.min(Math.round(rawScore * financialMultiplier * 10) / 10, 10);
}

/**
 * Map a numeric CVSS score to a severity label.
 */
export function scoreToSeverity(score: number): Severity {
  if (score >= riskConfig.thresholds.critical) return 'critical';
  if (score >= riskConfig.thresholds.high) return 'high';
  if (score >= riskConfig.thresholds.medium) return 'medium';
  if (score >= riskConfig.thresholds.low) return 'low';
  return 'info';
}

// ─── Rug Pull Detection ────────────────────────────────────────────────────

/** Signals that contribute to rug pull probability */
interface RugPullSignals {
  /** Owner can mint unlimited tokens */
  unlimitedMint: boolean;
  /** Contract is not renounced */
  ownerNotRenounced: boolean;
  /** Hidden transfer fees or tax */
  hiddenFees: boolean;
  /** Liquidity is not locked */
  liquidityUnlocked: boolean;
  /** Team holds > 20% of supply */
  highTeamAllocation: boolean;
  /** No audit by recognized firm */
  unaudited: boolean;
  /** Contract recently deployed (< 30 days) */
  recentlyDeployed: boolean;
  /** Anonymous team */
  anonymousTeam: boolean;
}

/**
 * Estimate rug pull probability based on on-chain and off-chain signals.
 *
 * @param signals - Observed rug pull risk signals.
 * @returns Probability from 0 to 1.
 */
export function estimateRugPullProbability(signals: RugPullSignals): number {
  const weights: Record<keyof RugPullSignals, number> = {
    unlimitedMint: 0.20,
    ownerNotRenounced: 0.12,
    hiddenFees: 0.18,
    liquidityUnlocked: 0.15,
    highTeamAllocation: 0.10,
    unaudited: 0.08,
    recentlyDeployed: 0.07,
    anonymousTeam: 0.10,
  };

  let score = 0;
  for (const [key, weight] of Object.entries(weights)) {
    if (signals[key as keyof RugPullSignals]) {
      score += weight;
    }
  }

  // Apply sensitivity from config
  return Math.min(score * riskConfig.rugPullSensitivity * 1.25, 1);
}

// ─── Liquidity Assessment ───────────────────────────────────────────────────

/** Input for liquidity assessment */
export interface LiquidityInput {
  pools: Array<{
    pair: string;
    chain: Chain;
    liquidityUSD: number;
    volume24hUSD: number;
  }>;
  lockDuration: number | null;
}

/**
 * Assess liquidity risk for a dApp.
 *
 * @param input - Pool and lock data.
 * @returns Structured liquidity assessment.
 */
export function assessLiquidity(input: LiquidityInput): LiquidityAssessment {
  const totalLiquidity = input.pools.reduce((s, p) => s + p.liquidityUSD, 0);
  const maxPoolLiquidity = Math.max(...input.pools.map((p) => p.liquidityUSD), 0);
  const concentration = totalLiquidity > 0 ? maxPoolLiquidity / totalLiquidity : 1;

  let withdrawalRisk: LiquidityAssessment['withdrawalRisk'];
  if (totalLiquidity < 50_000 || concentration > 0.9) {
    withdrawalRisk = 'critical';
  } else if (totalLiquidity < 500_000 || concentration > 0.7) {
    withdrawalRisk = 'high';
  } else if (totalLiquidity < 5_000_000 || concentration > 0.5) {
    withdrawalRisk = 'medium';
  } else {
    withdrawalRisk = 'low';
  }

  return {
    totalLiquidityUSD: totalLiquidity,
    liquidityConcentration: Math.round(concentration * 1000) / 1000,
    withdrawalRisk,
    lockDuration: input.lockDuration,
    pools: input.pools,
  };
}

// ─── Governance Assessment ──────────────────────────────────────────────────

/** Input for governance assessment */
export interface GovernanceInput {
  multisigRequired: boolean;
  timelockDuration: number;
  adminKeyConcentration: number;
  proposalThreshold: number;
  votingPeriod: number;
}

/**
 * Assess governance risk for a dApp.
 *
 * @param input - Governance configuration data.
 * @returns Structured governance assessment.
 */
export function assessGovernance(input: GovernanceInput): GovernanceAssessment {
  let riskLevel: GovernanceAssessment['riskLevel'];

  if (!input.multisigRequired && input.adminKeyConcentration > 0.8) {
    riskLevel = 'critical';
  } else if (input.timelockDuration < 86400 || input.adminKeyConcentration > 0.5) {
    riskLevel = 'high';
  } else if (input.timelockDuration < 172800 || input.votingPeriod < 259200) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'low';
  }

  return { ...input, riskLevel };
}

// ─── Cross-Chain Aggregation ────────────────────────────────────────────────

/**
 * Aggregate risk factors across multiple chains to produce a unified score.
 *
 * Uses weighted average where critical findings dominate.
 *
 * @param factors - All risk factors across all chains.
 * @returns Aggregated score (0–10).
 */
export function aggregateCrossChainRisk(factors: DAppRiskFactor[]): number {
  if (factors.length === 0) return 0;

  const severityWeight: Record<Severity, number> = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1,
    info: 0.5,
  };

  let weightedSum = 0;
  let totalWeight = 0;

  for (const factor of factors) {
    const score = calculateWeb3CVSSScore(factor.cvss);
    const severity = scoreToSeverity(score);
    const weight = severityWeight[severity];
    weightedSum += score * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 10) / 10 : 0;
}

// ─── Full dApp Risk Audit ───────────────────────────────────────────────────

/** Input for a full dApp risk audit */
export interface DAppAuditInput {
  dappName: string;
  chains: Chain[];
  riskFactors: DAppRiskFactor[];
  rugPullSignals: RugPullSignals;
  liquidityInput: LiquidityInput;
  governanceInput: GovernanceInput;
}

/**
 * Run a full dApp risk audit producing a comprehensive report.
 *
 * @param input - All inputs for the audit.
 * @returns A complete {@link DAppRiskReport}.
 */
export function runDAppRiskAudit(input: DAppAuditInput): DAppRiskReport {
  logger.info({ dapp: input.dappName, chains: input.chains }, 'Starting dApp risk audit');

  // Score all risk factors
  const scoredFactors = input.riskFactors.map((f) => ({
    ...f,
    cvss: { ...f.cvss, baseScore: calculateWeb3CVSSScore(f.cvss) },
  }));

  const overallScore = aggregateCrossChainRisk(scoredFactors);
  const rugPullProbability = estimateRugPullProbability(input.rugPullSignals);
  const liquidityAssessment = assessLiquidity(input.liquidityInput);
  const governanceAssessment = assessGovernance(input.governanceInput);

  const report: DAppRiskReport = {
    id: `dapp-${Date.now()}`,
    dappName: input.dappName,
    chains: input.chains,
    overallRiskScore: overallScore,
    riskLevel: scoreToSeverity(overallScore) as DAppRiskReport['riskLevel'],
    factors: scoredFactors,
    rugPullProbability: Math.round(rugPullProbability * 1000) / 1000,
    liquidityAssessment,
    governanceAssessment,
    generatedAt: new Date().toISOString(),
    format: 'json',
  };

  logger.info(
    {
      dapp: input.dappName,
      overallScore,
      rugPullProbability: report.rugPullProbability,
      liquidityRisk: liquidityAssessment.withdrawalRisk,
      governanceRisk: governanceAssessment.riskLevel,
    },
    'dApp risk audit complete',
  );

  return report;
}

// ─── Report Formatting ──────────────────────────────────────────────────────

/**
 * Format a dApp risk report as Markdown.
 */
export function formatRiskReportMarkdown(report: DAppRiskReport): string {
  const lines: string[] = [
    `# dApp Risk Audit Report — ${report.dappName}`,
    '',
    `**Chains:** ${report.chains.join(', ')}`,
    `**Overall Risk Score:** ${report.overallRiskScore}/10 (${report.riskLevel.toUpperCase()})`,
    `**Rug Pull Probability:** ${Math.round(report.rugPullProbability * 100)}%`,
    `**Generated:** ${report.generatedAt}`,
    '',
    '## Liquidity Assessment',
    '',
    `- **Total Liquidity:** $${report.liquidityAssessment.totalLiquidityUSD.toLocaleString()}`,
    `- **Concentration:** ${Math.round(report.liquidityAssessment.liquidityConcentration * 100)}%`,
    `- **Withdrawal Risk:** ${report.liquidityAssessment.withdrawalRisk.toUpperCase()}`,
    `- **Lock Duration:** ${report.liquidityAssessment.lockDuration ? `${report.liquidityAssessment.lockDuration} seconds` : 'UNLOCKED'}`,
    '',
    '## Governance Assessment',
    '',
    `- **Multisig Required:** ${report.governanceAssessment.multisigRequired ? 'Yes' : 'No'}`,
    `- **Timelock:** ${report.governanceAssessment.timelockDuration} seconds`,
    `- **Admin Key Concentration:** ${Math.round(report.governanceAssessment.adminKeyConcentration * 100)}%`,
    `- **Risk Level:** ${report.governanceAssessment.riskLevel.toUpperCase()}`,
    '',
    '## Risk Factors',
    '',
    '| Category | Title | CVSS | Severity | Chain |',
    '| -------- | ----- | ---- | -------- | ----- |',
  ];

  for (const f of report.factors) {
    lines.push(
      `| ${f.category} | ${f.title} | ${f.cvss.baseScore} | ${scoreToSeverity(f.cvss.baseScore).toUpperCase()} | ${f.chain} |`,
    );
  }

  if (report.liquidityAssessment.pools.length > 0) {
    lines.push('', '## Liquidity Pools', '');
    lines.push('| Pair | Chain | Liquidity (USD) | 24h Volume (USD) |');
    lines.push('| ---- | ----- | --------------- | ---------------- |');
    for (const pool of report.liquidityAssessment.pools) {
      lines.push(
        `| ${pool.pair} | ${pool.chain} | $${pool.liquidityUSD.toLocaleString()} | $${pool.volume24hUSD.toLocaleString()} |`,
      );
    }
  }

  return lines.join('\n');
}

/**
 * Format a dApp risk report as JSON string.
 */
export function formatRiskReportJSON(report: DAppRiskReport): string {
  return JSON.stringify({ ...report, format: 'json' }, null, 2);
}
