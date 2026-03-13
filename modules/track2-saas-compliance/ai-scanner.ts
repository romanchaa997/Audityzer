/**
 * @module ai-scanner
 * @description AI Meta-Learning Scanner for AuditorSEC.
 *
 * Aggregates results from multiple analysis tools with a meta-learning layer
 * that tracks which scanners find which vulnerability types most effectively.
 *
 * Features:
 *  - Plugin architecture for adding new scanners
 *  - Meta-learning: historical accuracy tracking per scanner/vuln-type
 *  - Confidence scoring based on scanner agreement
 *  - Known vulnerability pattern database
 *  - ML model integration interface (stub for actual model)
 */

import { readFile, writeFile } from 'node:fs/promises';
import pino from 'pino';
import { scannerConfig } from './config.js';
import type {
  AggregatedFinding,
  MLModelInterface,
  MLPrediction,
  ScannerFinding,
  ScannerMetaStats,
  ScannerPlugin,
  Severity,
  VulnerabilityPattern,
} from './types.js';

const logger = pino({ name: 'ai-scanner' });

// ─── Scanner Plugin Registry ────────────────────────────────────────────────

/** Registered scanner plugins */
const plugins = new Map<string, ScannerPlugin>();

/** Scanner execution functions */
const scannerExecutors = new Map<string, ScannerExecutor>();

/** Signature for a scanner executor function */
type ScannerExecutor = (target: ScanTarget) => Promise<ScannerFinding[]>;

/** Target to scan */
export interface ScanTarget {
  /** Type of target */
  type: 'solidity' | 'bytecode' | 'address' | 'repository';
  /** Source code, bytecode, address, or repo path */
  content: string;
  /** Chain if applicable */
  chain?: string;
  /** Additional scanner-specific options */
  options?: Record<string, unknown>;
}

/**
 * Register a scanner plugin with its executor function.
 *
 * @param plugin   - Scanner metadata.
 * @param executor - Function that runs the scan and returns raw findings.
 */
export function registerScanner(plugin: ScannerPlugin, executor: ScannerExecutor): void {
  plugins.set(plugin.id, plugin);
  scannerExecutors.set(plugin.id, executor);
  logger.info({ scanner: plugin.id, name: plugin.name }, 'Scanner plugin registered');
}

/**
 * Unregister a scanner plugin.
 */
export function unregisterScanner(id: string): boolean {
  const removed = plugins.delete(id) && scannerExecutors.delete(id);
  if (removed) logger.info({ scanner: id }, 'Scanner plugin unregistered');
  return removed;
}

/**
 * List all registered scanner plugins.
 */
export function listScanners(): ScannerPlugin[] {
  return [...plugins.values()];
}

/**
 * Enable or disable a scanner plugin.
 */
export function toggleScanner(id: string, enabled: boolean): boolean {
  const plugin = plugins.get(id);
  if (!plugin) return false;
  plugin.enabled = enabled;
  return true;
}

// ─── Built-in Scanner Stubs ─────────────────────────────────────────────────

/**
 * Register built-in scanner plugins.
 * These are stubs — real implementations would call external tools (Slither, Mythril, etc.).
 */
export function registerBuiltinScanners(): void {
  registerScanner(
    {
      id: 'slither',
      name: 'Slither Static Analyzer',
      version: '0.10.0',
      specialties: ['reentrancy', 'access-control', 'uninitialized-storage', 'tx-origin'],
      avgExecutionMs: 15_000,
      accuracy: { reentrancy: 0.92, 'access-control': 0.88, 'uninitialized-storage': 0.85 },
      enabled: true,
    },
    async (target) => {
      logger.debug({ target: target.type }, 'Running Slither (stub)');
      // Stub: in production, shell out to `slither` CLI
      return [];
    },
  );

  registerScanner(
    {
      id: 'mythril',
      name: 'Mythril Symbolic Executor',
      version: '0.24.0',
      specialties: ['integer-overflow', 'reentrancy', 'delegatecall', 'selfdestruct'],
      avgExecutionMs: 120_000,
      accuracy: { 'integer-overflow': 0.95, reentrancy: 0.87, delegatecall: 0.90 },
      enabled: true,
    },
    async (target) => {
      logger.debug({ target: target.type }, 'Running Mythril (stub)');
      return [];
    },
  );

  registerScanner(
    {
      id: 'semgrep-solidity',
      name: 'Semgrep Solidity Rules',
      version: '1.50.0',
      specialties: ['gas-optimization', 'access-control', 'unchecked-return', 'reentrancy'],
      avgExecutionMs: 8_000,
      accuracy: { 'gas-optimization': 0.93, 'unchecked-return': 0.91 },
      enabled: true,
    },
    async (target) => {
      logger.debug({ target: target.type }, 'Running Semgrep (stub)');
      return [];
    },
  );

  registerScanner(
    {
      id: 'aderyn',
      name: 'Aderyn Rust Analyzer',
      version: '0.1.0',
      specialties: ['reentrancy', 'centralization-risk', 'access-control'],
      avgExecutionMs: 10_000,
      accuracy: { 'centralization-risk': 0.89, 'access-control': 0.86 },
      enabled: true,
    },
    async (target) => {
      logger.debug({ target: target.type }, 'Running Aderyn (stub)');
      return [];
    },
  );

  logger.info('Built-in scanners registered (stub mode)');
}

// ─── Pattern Database ───────────────────────────────────────────────────────

/** In-memory pattern database */
let patternDb: VulnerabilityPattern[] = [];

/**
 * Load vulnerability pattern database from disk.
 */
export async function loadPatternDatabase(): Promise<void> {
  try {
    const raw = await readFile(scannerConfig.patternDbPath, 'utf-8');
    patternDb = JSON.parse(raw);
    logger.info({ patternCount: patternDb.length }, 'Pattern database loaded');
  } catch {
    logger.warn('Pattern database not found — starting with empty database');
    patternDb = getDefaultPatterns();
  }
}

/**
 * Get default vulnerability patterns (built-in).
 */
function getDefaultPatterns(): VulnerabilityPattern[] {
  return [
    {
      id: 'pat-reentrancy-001',
      name: 'Classic Reentrancy',
      description: 'State update after external call allows re-entry',
      category: 'reentrancy',
      signature: 'call\\.value\\(.*\\).*\\n.*state_update',
      patternType: 'regex',
      severity: 'critical',
      falsePositiveRate: 0.12,
      references: ['SWC-107', 'https://swcregistry.io/docs/SWC-107'],
    },
    {
      id: 'pat-overflow-001',
      name: 'Integer Overflow/Underflow',
      description: 'Arithmetic without SafeMath or unchecked block',
      category: 'integer-overflow',
      signature: '(\\+|\\-|\\*)(?!.*SafeMath)(?!.*unchecked)',
      patternType: 'regex',
      severity: 'high',
      falsePositiveRate: 0.25,
      references: ['SWC-101'],
    },
    {
      id: 'pat-delegatecall-001',
      name: 'Unsafe Delegatecall',
      description: 'Delegatecall to user-supplied address',
      category: 'delegatecall',
      signature: 'delegatecall\\(.*msg\\.data.*\\)',
      patternType: 'regex',
      severity: 'critical',
      falsePositiveRate: 0.08,
      references: ['SWC-112'],
    },
    {
      id: 'pat-txorigin-001',
      name: 'tx.origin Authentication',
      description: 'Using tx.origin for authorization instead of msg.sender',
      category: 'tx-origin',
      signature: 'require\\(.*tx\\.origin',
      patternType: 'regex',
      severity: 'high',
      falsePositiveRate: 0.05,
      references: ['SWC-115'],
    },
    {
      id: 'pat-selfdestruct-001',
      name: 'Unprotected Selfdestruct',
      description: 'Selfdestruct callable without access control',
      category: 'selfdestruct',
      signature: 'selfdestruct\\(',
      patternType: 'regex',
      severity: 'critical',
      falsePositiveRate: 0.15,
      references: ['SWC-106'],
    },
  ];
}

/**
 * Match source code against known vulnerability patterns.
 *
 * @param source - Source code to match against patterns.
 * @returns Findings from pattern matching.
 */
export function matchPatterns(source: string): ScannerFinding[] {
  const findings: ScannerFinding[] = [];

  for (const pattern of patternDb) {
    if (pattern.patternType !== 'regex') continue;

    try {
      const regex = new RegExp(pattern.signature, 'gm');
      let match: RegExpExecArray | null;
      while ((match = regex.exec(source)) !== null) {
        const lineNumber = source.substring(0, match.index).split('\n').length;
        findings.push({
          scannerId: 'pattern-db',
          ruleId: pattern.id,
          title: pattern.name,
          description: pattern.description,
          severity: pattern.severity,
          confidence: 1 - pattern.falsePositiveRate,
          location: { file: 'source', line: lineNumber },
          metadata: { patternId: pattern.id, references: pattern.references },
        });
      }
    } catch (err) {
      logger.warn({ patternId: pattern.id, error: err }, 'Pattern regex failed');
    }
  }

  return findings;
}

// ─── Meta-Learning Statistics ───────────────────────────────────────────────

/** In-memory meta-learning stats */
let metaStats = new Map<string, ScannerMetaStats>();

/**
 * Load meta-learning statistics from disk.
 */
export async function loadMetaStats(): Promise<void> {
  try {
    const raw = await readFile(scannerConfig.metaStatsPath, 'utf-8');
    const arr: ScannerMetaStats[] = JSON.parse(raw);
    metaStats = new Map(arr.map((s) => [s.scannerId, s]));
    logger.info({ scannerCount: metaStats.size }, 'Meta-learning stats loaded');
  } catch {
    logger.warn('Meta-learning stats not found — starting fresh');
  }
}

/**
 * Save meta-learning statistics to disk.
 */
export async function saveMetaStats(): Promise<void> {
  const arr = [...metaStats.values()];
  await writeFile(scannerConfig.metaStatsPath, JSON.stringify(arr, null, 2));
  logger.info({ scannerCount: arr.length }, 'Meta-learning stats saved');
}

/**
 * Update meta-learning stats after a scan with verified results.
 *
 * @param scannerId     - Scanner that produced findings.
 * @param vulnType      - Vulnerability type detected.
 * @param wasCorrect    - Whether the finding was confirmed correct.
 * @param confidence    - Reported confidence at time of detection.
 */
export function updateMetaStats(
  scannerId: string,
  vulnType: string,
  wasCorrect: boolean,
  confidence: number,
): void {
  let stats = metaStats.get(scannerId);
  if (!stats) {
    stats = {
      scannerId,
      totalScans: 0,
      detectionRates: {},
      falsePositiveRates: {},
      avgConfidenceCorrect: 0,
      avgConfidenceIncorrect: 0,
      lastUpdated: new Date().toISOString(),
    };
    metaStats.set(scannerId, stats);
  }

  stats.totalScans++;

  // Update detection rate (running average)
  const prevRate = stats.detectionRates[vulnType] ?? 0;
  const prevFPRate = stats.falsePositiveRates[vulnType] ?? 0;

  if (wasCorrect) {
    stats.detectionRates[vulnType] = prevRate + (1 - prevRate) / stats.totalScans;
    stats.avgConfidenceCorrect =
      stats.avgConfidenceCorrect + (confidence - stats.avgConfidenceCorrect) / stats.totalScans;
  } else {
    stats.falsePositiveRates[vulnType] = prevFPRate + (1 - prevFPRate) / stats.totalScans;
    stats.avgConfidenceIncorrect =
      stats.avgConfidenceIncorrect +
      (confidence - stats.avgConfidenceIncorrect) / stats.totalScans;
  }

  stats.lastUpdated = new Date().toISOString();
}

/**
 * Get the meta-learning score for a scanner on a given vulnerability type.
 * Higher is better: combines detection rate and false positive avoidance.
 *
 * @returns Score between 0 and 1.
 */
export function getMetaLearningScore(scannerId: string, vulnType: string): number {
  const stats = metaStats.get(scannerId);
  if (!stats) return 0.5; // No data — neutral

  const detection = stats.detectionRates[vulnType] ?? 0.5;
  const fpRate = stats.falsePositiveRates[vulnType] ?? 0.5;

  // Weighted combination: detection rate matters more than FP avoidance
  return 0.7 * detection + 0.3 * (1 - fpRate);
}

// ─── Finding Aggregation ────────────────────────────────────────────────────

/**
 * Aggregate raw findings from multiple scanners into unified findings.
 *
 * Deduplicates by location + vulnerability type and scores confidence
 * based on scanner agreement and meta-learning data.
 *
 * @param allFindings - Raw findings from all scanners.
 * @returns Deduplicated, confidence-scored aggregated findings.
 */
export function aggregateFindings(allFindings: ScannerFinding[]): AggregatedFinding[] {
  // Group by location key
  const groups = new Map<string, ScannerFinding[]>();

  for (const finding of allFindings) {
    const key = `${finding.location.file}:${finding.location.line ?? 0}:${finding.ruleId}`;
    const group = groups.get(key) ?? [];
    group.push(finding);
    groups.set(key, group);
  }

  const aggregated: AggregatedFinding[] = [];
  const allScannerIds = [...plugins.keys()].filter((id) => plugins.get(id)?.enabled);

  for (const [, group] of groups) {
    const detectedBy = [...new Set(group.map((f) => f.scannerId))];
    const missedBy = allScannerIds.filter((id) => !detectedBy.includes(id));
    const agreement = detectedBy.length;

    // Base confidence from scanner agreement
    const agreementConfidence = agreement / allScannerIds.length;

    // Average reported confidence
    const avgReportedConfidence =
      group.reduce((sum, f) => sum + f.confidence, 0) / group.length;

    // Meta-learning boost
    const vulnType = group[0].ruleId;
    const metaScores = detectedBy.map((id) => getMetaLearningScore(id, vulnType));
    const avgMetaScore = metaScores.length > 0
      ? metaScores.reduce((a, b) => a + b, 0) / metaScores.length
      : 0.5;

    // Combined confidence: 40% agreement, 30% reported, 30% meta-learning
    const confidence =
      0.4 * agreementConfidence + 0.3 * avgReportedConfidence + 0.3 * avgMetaScore;

    // Pick highest severity from the group
    const severityOrder: Severity[] = ['critical', 'high', 'medium', 'low', 'info'];
    const bestSeverity = severityOrder.find((s) =>
      group.some((f) => f.severity === s),
    ) ?? 'info';

    // Match against pattern database
    const patternMatch = patternDb.find((p) =>
      group.some((f) => f.ruleId === p.id || f.title.includes(p.name)),
    );

    aggregated.push({
      id: `agg-${Date.now()}-${aggregated.length}`,
      title: group[0].title,
      description: group[0].description,
      severity: bestSeverity,
      confidence: Math.round(confidence * 1000) / 1000,
      detectedBy,
      missedBy,
      agreement,
      location: group[0].location,
      patternId: patternMatch?.id ?? null,
      metaLearningScore: Math.round(avgMetaScore * 1000) / 1000,
    });
  }

  // Sort by confidence descending
  aggregated.sort((a, b) => b.confidence - a.confidence);

  return aggregated;
}

// ─── ML Model Integration ───────────────────────────────────────────────────

/** Registered ML model (stub — actual model would be loaded separately) */
let mlModel: MLModelInterface | null = null;

/**
 * Register an ML model for vulnerability prediction.
 *
 * @param model - ML model implementing the {@link MLModelInterface}.
 */
export function registerMLModel(model: MLModelInterface): void {
  mlModel = model;
  logger.info({ modelId: model.modelId, type: model.modelType }, 'ML model registered');
}

/**
 * Run ML-based vulnerability prediction on aggregated findings.
 *
 * @param findings - Aggregated findings to enhance with ML predictions.
 * @returns Findings with ML prediction metadata attached.
 */
export async function enhanceWithML(
  findings: AggregatedFinding[],
): Promise<Array<AggregatedFinding & { mlPrediction?: MLPrediction }>> {
  if (!mlModel) {
    logger.debug('No ML model registered — returning findings as-is');
    return findings;
  }

  const enhanced = [];
  for (const finding of findings) {
    const features: Record<string, number> = {
      confidence: finding.confidence,
      agreement: finding.agreement,
      metaLearningScore: finding.metaLearningScore,
      severityNumeric:
        finding.severity === 'critical' ? 5
        : finding.severity === 'high' ? 4
        : finding.severity === 'medium' ? 3
        : finding.severity === 'low' ? 2
        : 1,
    };

    try {
      const prediction = await mlModel.predict(features);
      enhanced.push({ ...finding, mlPrediction: prediction });
    } catch (err) {
      logger.warn({ findingId: finding.id, error: err }, 'ML prediction failed');
      enhanced.push(finding);
    }
  }

  return enhanced;
}

// ─── Orchestrator ───────────────────────────────────────────────────────────

/** Full scan result */
export interface ScanResult {
  target: ScanTarget;
  rawFindings: ScannerFinding[];
  patternFindings: ScannerFinding[];
  aggregatedFindings: AggregatedFinding[];
  scannersUsed: string[];
  scanDurationMs: number;
  timestamp: string;
}

/**
 * Run a full scan orchestrating all enabled scanners, pattern matching,
 * and finding aggregation.
 *
 * @param target - The scan target.
 * @returns Complete scan results with aggregated findings.
 */
export async function runFullScan(target: ScanTarget): Promise<ScanResult> {
  const startTime = Date.now();
  logger.info({ targetType: target.type }, 'Starting full scan');

  const enabledPlugins = [...plugins.entries()].filter(([, p]) => p.enabled);
  const scannersUsed: string[] = [];
  const allFindings: ScannerFinding[] = [];

  // Run scanners concurrently with concurrency limit
  const concurrency = scannerConfig.maxConcurrency;
  const batches: Array<[string, ScannerExecutor][]> = [];

  for (let i = 0; i < enabledPlugins.length; i += concurrency) {
    const batch = enabledPlugins.slice(i, i + concurrency).map(([id]) => {
      const executor = scannerExecutors.get(id)!;
      return [id, executor] as [string, ScannerExecutor];
    });
    batches.push(batch);
  }

  for (const batch of batches) {
    const results = await Promise.allSettled(
      batch.map(async ([id, executor]) => {
        const timeout = scannerConfig.scannerTimeoutMs;
        const result = await Promise.race([
          executor(target),
          new Promise<ScannerFinding[]>((_, reject) =>
            setTimeout(() => reject(new Error(`Scanner ${id} timed out after ${timeout}ms`)), timeout),
          ),
        ]);
        return { id, findings: result };
      }),
    );

    for (const result of results) {
      if (result.status === 'fulfilled') {
        scannersUsed.push(result.value.id);
        allFindings.push(...result.value.findings);
      } else {
        logger.warn({ error: result.reason }, 'Scanner failed');
      }
    }
  }

  // Run pattern matching if source code available
  let patternFindings: ScannerFinding[] = [];
  if (target.type === 'solidity' || target.type === 'repository') {
    patternFindings = matchPatterns(target.content);
    allFindings.push(...patternFindings);
  }

  // Aggregate findings
  const aggregatedFindings = aggregateFindings(allFindings);

  const scanDurationMs = Date.now() - startTime;

  logger.info(
    {
      scannersUsed,
      rawFindingCount: allFindings.length,
      patternFindingCount: patternFindings.length,
      aggregatedFindingCount: aggregatedFindings.length,
      durationMs: scanDurationMs,
    },
    'Full scan complete',
  );

  return {
    target,
    rawFindings: allFindings,
    patternFindings,
    aggregatedFindings,
    scannersUsed,
    scanDurationMs,
    timestamp: new Date().toISOString(),
  };
}

// ─── Initialization ─────────────────────────────────────────────────────────

/**
 * Initialize the AI scanner subsystem.
 * Registers built-in scanners, loads pattern DB, and loads meta-learning stats.
 */
export async function initializeScanner(): Promise<void> {
  registerBuiltinScanners();
  await loadPatternDatabase();
  await loadMetaStats();
  logger.info('AI Scanner subsystem initialized');
}
