/**
 * @module audit-pipeline
 * @description Queue-based smart contract audit processing pipeline.
 * Implements a BullMQ-pattern job queue with stages: submission → static analysis →
 * dynamic analysis → report generation. Sends Telegram notifications at each stage transition.
 * Supports EVM chains: Ethereum, BSC, Polygon, Avalanche.
 */

import { randomUUID } from 'node:crypto';
import pino from 'pino';
import { Queue, Worker, Job } from 'bullmq';
import { config, CHAIN_CONFIG, telegramApiUrl } from './config';
import type {
  AuditJob,
  AuditReport,
  AuditStage,
  AuditStatusResponse,
  AuditSubmission,
  EVMChain,
  TelegramSendMessagePayload,
  VulnerabilityFinding,
  VulnerabilitySeverity,
} from './types';
import { escapeMarkdownV2 } from './brics-alerting';

const logger = pino({ name: 'audit-pipeline', level: config.LOG_LEVEL });

// ─── Constants ──────────────────────────────────────────────────────────────

const QUEUE_NAME = 'smart-contract-audit';
const REDIS_CONNECTION = { url: config.REDIS_URL };

/** Stage progression order. */
const STAGE_ORDER: AuditStage[] = [
  'submitted',
  'queued',
  'static_analysis',
  'dynamic_analysis',
  'report_generation',
  'completed',
];

/** Human-readable stage labels for Telegram messages. */
const STAGE_LABELS: Record<AuditStage, string> = {
  submitted: '📥 Submitted',
  queued: '⏳ Queued',
  static_analysis: '🔍 Static Analysis',
  dynamic_analysis: '⚡ Dynamic Analysis',
  report_generation: '📝 Report Generation',
  completed: '✅ Completed',
  failed: '❌ Failed',
};

// ─── In-Memory Job Store ────────────────────────────────────────────────────

/**
 * In-memory audit job store.
 * Production deployments should back this with Redis or a database.
 */
class AuditJobStore {
  private jobs = new Map<string, AuditJob>();

  /** Create a new audit job from a submission. */
  create(submission: AuditSubmission): AuditJob {
    const job: AuditJob = {
      id: randomUUID(),
      contractAddress: submission.contractAddress,
      chain: submission.chain,
      stage: 'submitted',
      submittedBy: {
        chatId: submission.chatId,
        userId: submission.userId,
        username: submission.username,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      findings: [],
    };
    this.jobs.set(job.id, job);
    logger.info({ jobId: job.id, address: job.contractAddress, chain: job.chain }, 'Audit job created');
    return job;
  }

  /** Get an audit job by ID. */
  get(id: string): AuditJob | undefined {
    return this.jobs.get(id);
  }

  /** Get all audit jobs for a specific user. */
  getByUser(userId: number): AuditJob[] {
    return Array.from(this.jobs.values()).filter((j) => j.submittedBy.userId === userId);
  }

  /** Get the most recent audit job for a user. */
  getLatestByUser(userId: number): AuditJob | undefined {
    const userJobs = this.getByUser(userId);
    if (userJobs.length === 0) return undefined;
    return userJobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
  }

  /** Update a job's stage and timestamp. */
  updateStage(id: string, stage: AuditStage): AuditJob | undefined {
    const job = this.jobs.get(id);
    if (!job) return undefined;
    job.stage = stage;
    job.updatedAt = new Date();
    logger.info({ jobId: id, stage }, 'Job stage updated');
    return job;
  }

  /** Add findings to a job. */
  addFindings(id: string, findings: VulnerabilityFinding[]): void {
    const job = this.jobs.get(id);
    if (!job) return;
    job.findings.push(...findings);
    job.updatedAt = new Date();
  }

  /** Set the report URL for a completed job. */
  setReportUrl(id: string, url: string): void {
    const job = this.jobs.get(id);
    if (!job) return;
    job.reportUrl = url;
    job.updatedAt = new Date();
  }

  /** Mark a job as failed with an error message. */
  fail(id: string, error: string): void {
    const job = this.jobs.get(id);
    if (!job) return;
    job.stage = 'failed';
    job.error = error;
    job.updatedAt = new Date();
    logger.error({ jobId: id, error }, 'Job failed');
  }

  /** Get total number of pending/in-progress jobs. */
  getQueueSize(): number {
    return Array.from(this.jobs.values()).filter(
      (j) => j.stage !== 'completed' && j.stage !== 'failed'
    ).length;
  }
}

/** Singleton job store instance. */
export const jobStore = new AuditJobStore();

// ─── Telegram Notification Helper ───────────────────────────────────────────

/**
 * Send a stage transition notification to the user via Telegram.
 * @param chatId - Telegram chat ID to notify
 * @param job - Current state of the audit job
 */
async function notifyStageTransition(chatId: number, job: AuditJob): Promise<void> {
  const chainName = CHAIN_CONFIG[job.chain].name;
  const stageLabel = STAGE_LABELS[job.stage];
  const shortAddr = `${job.contractAddress.slice(0, 6)}...${job.contractAddress.slice(-4)}`;

  let text =
    `${stageLabel}\n\n` +
    `*Contract:* ${escapeMarkdownV2(shortAddr)}\n` +
    `*Chain:* ${escapeMarkdownV2(chainName)}\n` +
    `*Job ID:* \`${job.id.slice(0, 8)}\``;

  if (job.stage === 'completed' && job.reportUrl) {
    text += `\n\n📄 [View Full Report](${escapeMarkdownV2(job.reportUrl)})`;
  }

  if (job.stage === 'completed' && job.findings.length > 0) {
    const counts = countBySeverity(job.findings);
    text +=
      '\n\n*Findings Summary:*\n' +
      `🚨 Critical: ${counts.Critical}\n` +
      `🔴 High: ${counts.High}\n` +
      `🟡 Medium: ${counts.Medium}\n` +
      `🔵 Low: ${counts.Low}\n` +
      `ℹ️ Info: ${counts.Informational}`;
  }

  if (job.stage === 'failed') {
    text += `\n\n⚠️ *Error:* ${escapeMarkdownV2(job.error ?? 'Unknown error')}`;
  }

  const payload: TelegramSendMessagePayload = {
    chat_id: chatId,
    text,
    parse_mode: 'MarkdownV2',
  };

  try {
    const url = telegramApiUrl('sendMessage');
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const body = await response.text();
      logger.error({ chatId, status: response.status, body }, 'Telegram notification failed');
    }
  } catch (err) {
    logger.error({ chatId, err }, 'Telegram notification error');
  }
}

/** Count findings by severity. */
function countBySeverity(
  findings: VulnerabilityFinding[]
): Record<VulnerabilitySeverity, number> {
  const counts: Record<VulnerabilitySeverity, number> = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
    Informational: 0,
  };
  for (const f of findings) {
    counts[f.severity]++;
  }
  return counts;
}

// ─── Scanner Stubs ──────────────────────────────────────────────────────────

/**
 * STUB: Static analysis scanner.
 * In production, this integrates with Slither, Mythril, or custom analyzers.
 * Returns simulated findings for demonstration.
 */
async function runStaticAnalysis(
  contractAddress: string,
  chain: EVMChain
): Promise<VulnerabilityFinding[]> {
  logger.info({ contractAddress, chain }, 'Running static analysis (stub)');

  // Simulate analysis time
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Return stub findings
  return [
    {
      id: randomUUID(),
      title: 'Reentrancy vulnerability in withdraw function',
      severity: 'High',
      swcId: 'SWC-107',
      description:
        'The withdraw() function makes an external call before updating state, ' +
        'allowing potential reentrancy attacks.',
      location: { file: 'Contract.sol', startLine: 45, endLine: 52 },
      recommendation:
        'Apply checks-effects-interactions pattern or use ReentrancyGuard from OpenZeppelin.',
    },
    {
      id: randomUUID(),
      title: 'Unchecked return value from low-level call',
      severity: 'Medium',
      swcId: 'SWC-104',
      description:
        'Return value of a low-level .call() is not checked, which may silently fail.',
      location: { file: 'Contract.sol', startLine: 78, endLine: 78 },
      recommendation: 'Check the return value of all low-level calls or use Address.sendValue().',
    },
  ];
}

/**
 * STUB: Dynamic analysis scanner.
 * In production, this runs fuzzing (Echidna) or symbolic execution (Manticore).
 */
async function runDynamicAnalysis(
  contractAddress: string,
  chain: EVMChain
): Promise<VulnerabilityFinding[]> {
  logger.info({ contractAddress, chain }, 'Running dynamic analysis (stub)');

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return [
    {
      id: randomUUID(),
      title: 'Integer overflow in token transfer',
      severity: 'Critical',
      swcId: 'SWC-101',
      description:
        'Token transfer arithmetic can overflow when dealing with large values. ' +
        'Detected via fuzzing with boundary values.',
      location: { file: 'Token.sol', startLine: 112, endLine: 115 },
      recommendation:
        'Use SafeMath library or Solidity 0.8+ built-in overflow checks.',
    },
  ];
}

/**
 * STUB: Report generation.
 * In production, generates a PDF/HTML report and uploads to storage.
 */
async function generateReport(job: AuditJob): Promise<AuditReport> {
  logger.info({ jobId: job.id }, 'Generating audit report (stub)');

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const criticalCount = job.findings.filter((f) => f.severity === 'Critical').length;
  const highCount = job.findings.filter((f) => f.severity === 'High').length;
  const total = job.findings.length;

  const riskScore = Math.min(
    100,
    criticalCount * 30 + highCount * 15 + (total - criticalCount - highCount) * 5
  );

  return {
    id: randomUUID(),
    jobId: job.id,
    contractAddress: job.contractAddress,
    chain: job.chain,
    generatedAt: new Date(),
    findings: job.findings,
    riskScore,
    summary:
      `Audit of ${job.contractAddress} on ${CHAIN_CONFIG[job.chain].name} found ` +
      `${total} issue(s): ${criticalCount} critical, ${highCount} high. ` +
      `Risk score: ${riskScore}/100.`,
    reportUrl: `https://app.auditorsec.io/reports/${job.id}`,
  };
}

// ─── Audit Pipeline Service ─────────────────────────────────────────────────

/**
 * Smart contract audit pipeline.
 * Manages BullMQ queue, worker processing, and stage transitions with
 * Telegram notifications at each step.
 */
export class AuditPipeline {
  private queue: Queue;
  private worker: Worker | null = null;

  constructor() {
    this.queue = new Queue(QUEUE_NAME, { connection: REDIS_CONNECTION });
  }

  /**
   * Submit a new audit job to the pipeline.
   * Validates the contract address, creates a job record, and enqueues for processing.
   * @param submission - Audit submission from Telegram command
   * @returns The created audit job
   */
  async submit(submission: AuditSubmission): Promise<AuditJob> {
    // Validate contract address format
    const chainConfig = CHAIN_CONFIG[submission.chain];
    if (!chainConfig.addressPattern.test(submission.contractAddress)) {
      throw new Error(
        `Invalid contract address for ${chainConfig.name}. Expected format: 0x followed by 40 hex characters.`
      );
    }

    // Create job record
    const auditJob = jobStore.create(submission);

    // Enqueue for processing
    await this.queue.add('audit', { jobId: auditJob.id }, {
      jobId: auditJob.id,
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
      removeOnComplete: { age: 86400, count: 1000 },
      removeOnFail: { age: 604800, count: 5000 },
    });

    // Update stage and notify
    jobStore.updateStage(auditJob.id, 'queued');
    await notifyStageTransition(submission.chatId, jobStore.get(auditJob.id)!);

    logger.info({ jobId: auditJob.id }, 'Audit job enqueued');
    return jobStore.get(auditJob.id)!;
  }

  /**
   * Get the current status of an audit job.
   * @param jobId - Audit job ID
   * @returns Status response or undefined if not found
   */
  getStatus(jobId: string): AuditStatusResponse | undefined {
    const job = jobStore.get(jobId);
    if (!job) return undefined;

    return {
      jobId: job.id,
      stage: job.stage,
      findingsCount: job.findings.length,
      criticalCount: job.findings.filter((f) => f.severity === 'Critical').length,
      highCount: job.findings.filter((f) => f.severity === 'High').length,
      reportUrl: job.reportUrl,
    };
  }

  /**
   * Get the status of the latest audit for a user.
   * @param userId - Telegram user ID
   * @returns Status response or undefined
   */
  getLatestStatusForUser(userId: number): AuditStatusResponse | undefined {
    const job = jobStore.getLatestByUser(userId);
    if (!job) return undefined;
    return this.getStatus(job.id);
  }

  /**
   * Get the full audit report for a job.
   * @param jobId - Audit job ID
   * @returns The audit job or undefined
   */
  getReport(jobId: string): AuditJob | undefined {
    return jobStore.get(jobId);
  }

  /**
   * Start the BullMQ worker to process audit jobs.
   * Runs the full pipeline: static analysis → dynamic analysis → report generation.
   */
  startWorker(): void {
    if (this.worker) {
      logger.warn('Worker already running');
      return;
    }

    this.worker = new Worker(
      QUEUE_NAME,
      async (bullJob: Job<{ jobId: string }>) => {
        const { jobId } = bullJob.data;
        const auditJob = jobStore.get(jobId);

        if (!auditJob) {
          throw new Error(`Audit job ${jobId} not found`);
        }

        const chatId = auditJob.submittedBy.chatId;

        try {
          // Stage 1: Static Analysis
          jobStore.updateStage(jobId, 'static_analysis');
          await notifyStageTransition(chatId, jobStore.get(jobId)!);

          const staticFindings = await runStaticAnalysis(
            auditJob.contractAddress,
            auditJob.chain
          );
          jobStore.addFindings(jobId, staticFindings);

          // Stage 2: Dynamic Analysis
          jobStore.updateStage(jobId, 'dynamic_analysis');
          await notifyStageTransition(chatId, jobStore.get(jobId)!);

          const dynamicFindings = await runDynamicAnalysis(
            auditJob.contractAddress,
            auditJob.chain
          );
          jobStore.addFindings(jobId, dynamicFindings);

          // Stage 3: Report Generation
          jobStore.updateStage(jobId, 'report_generation');
          await notifyStageTransition(chatId, jobStore.get(jobId)!);

          const updatedJob = jobStore.get(jobId)!;
          const report = await generateReport(updatedJob);
          jobStore.setReportUrl(jobId, report.reportUrl);

          // Complete
          jobStore.updateStage(jobId, 'completed');
          await notifyStageTransition(chatId, jobStore.get(jobId)!);

          logger.info({ jobId, findingsCount: updatedJob.findings.length }, 'Audit completed');
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown processing error';
          jobStore.fail(jobId, errorMessage);
          await notifyStageTransition(chatId, jobStore.get(jobId)!);
          throw err; // Let BullMQ handle retry
        }
      },
      {
        connection: REDIS_CONNECTION,
        concurrency: 3,
        limiter: { max: 10, duration: 60000 },
      }
    );

    this.worker.on('failed', (job, err) => {
      logger.error({ jobId: job?.id, err: err.message }, 'Audit worker job failed');
    });

    this.worker.on('error', (err) => {
      logger.error({ err: err.message }, 'Audit worker error');
    });

    logger.info('Audit pipeline worker started');
  }

  /**
   * Gracefully stop the worker and close the queue.
   */
  async shutdown(): Promise<void> {
    if (this.worker) {
      await this.worker.close();
      this.worker = null;
    }
    await this.queue.close();
    logger.info('Audit pipeline shut down');
  }

  /** Get current queue depth (pending + active jobs). */
  getQueueSize(): number {
    return jobStore.getQueueSize();
  }
}

/** Singleton pipeline instance. */
export const auditPipeline = new AuditPipeline();
