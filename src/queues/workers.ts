/**
 * src/queues/workers.ts
 * BullMQ Worker — full error boundaries, retry logic, blockchain anchoring,
 * IPFS pinning, and SecurityAgent event emission for Audityzer.
 */

import { Worker, Job, UnrecoverableError } from 'bullmq';
import IORedis from 'ioredis';
import { SecurityAgent } from '../agent/index.js';
import { BlockchainAdapter } from '../agent/blockchain.js';
import { IpfsAdapter } from '../agent/ipfs.js';
import { MessagingAdapter } from '../agent/messaging.js';
import { SecurityScanEvent } from '../agent/events.js';

// ─── Redis Connection ─────────────────────────────────────────────────────────
const connection = new IORedis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

// ─── Adapters ────────────────────────────────────────────────────────────────
const blockchain = new BlockchainAdapter({
  rpcUrl: process.env.BLOCKCHAIN_RPC_URL ?? 'http://localhost:8545',
  contractAddress: process.env.ANCHOR_CONTRACT_ADDRESS ?? '',
  privateKey: process.env.ANCHOR_PRIVATE_KEY ?? '',
});

const ipfs = new IpfsAdapter({
  apiUrl: process.env.IPFS_API_URL ?? 'http://localhost:5001',
  gatewayUrl: process.env.IPFS_GATEWAY_URL ?? 'https://ipfs.io/ipfs/',
});

const messaging = new MessagingAdapter({
  webhookUrl: process.env.WEBHOOK_URL,
  slackToken: process.env.SLACK_BOT_TOKEN,
  slackChannel: process.env.SLACK_CHANNEL ?? '#security-alerts',
  discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
});

const agent = new SecurityAgent({ blockchain, ipfs, messaging });

// ─── Types ────────────────────────────────────────────────────────────────────
interface AuditJobData {
  auditId: string;
  targetUrl: string;
  reportHash: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, unknown>;
}

interface AuditJobResult {
  auditId: string;
  ipfsCid: string;
  txHash: string;
  anchoredAt: string;
  notified: boolean;
}

// ─── Retry / Backoff Config ───────────────────────────────────────────────────
const WORKER_CONCURRENCY = Number(process.env.WORKER_CONCURRENCY ?? 4);
const MAX_JOB_ATTEMPTS = 3;

function isRetryableError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const retryableMessages = [
    'ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND',
    'network error', 'rate limit', '429', '503',
  ];
  return retryableMessages.some((msg) =>
    err.message.toLowerCase().includes(msg.toLowerCase())
  );
}

// ─── Core Job Processor ───────────────────────────────────────────────────────
async function processAuditJob(job: Job<AuditJobData>): Promise<AuditJobResult> {
  const { auditId, targetUrl, reportHash, severity, metadata } = job.data;

  // Step 1 — Pin report to IPFS
  await job.updateProgress(10);
  let ipfsCid: string;
  try {
    ipfsCid = await ipfs.pinJson({
      auditId,
      targetUrl,
      reportHash,
      severity,
      metadata,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    if (isRetryableError(err)) throw err; // allow BullMQ retry
    throw new UnrecoverableError(
      `IPFS pin failed for audit ${auditId}: ${(err as Error).message}`
    );
  }

  // Step 2 — Anchor to blockchain
  await job.updateProgress(40);
  let txHash: string;
  try {
    const { txHash: anchorTx } = await blockchain.anchorToIoTeX(
      reportHash,
      ipfsCid,
      auditId
    );
    txHash = anchorTx;
  } catch (err) {
    if (isRetryableError(err)) throw err;
    throw new UnrecoverableError(
      `Blockchain anchor failed for audit ${auditId}: ${(err as Error).message}`
    );
  }
  await job.updateProgress(70);

  // Step 3 — Emit SecurityAgent event
  const event: SecurityScanEvent = {
    type: 'AUDIT_ANCHORED',
    auditId,
    targetUrl,
    severity,
    ipfsCid,
    txHash,
    timestamp: new Date().toISOString(),
    metadata,
  };

  let notified = false;
  try {
    await agent.emit('security:scan:complete', event);
    notified = true;
  } catch (notifyErr) {
    // Non-fatal — log but do not fail the job
    console.warn(
      `[workers] Notification failed for audit ${auditId}:`,
      (notifyErr as Error).message
    );
  }

  await job.updateProgress(100);

  return {
    auditId,
    ipfsCid,
    txHash,
    anchoredAt: new Date().toISOString(),
    notified,
  };
}

// ─── Worker Instance ─────────────────────────────────────────────────────────
export const auditWorker = new Worker<AuditJobData, AuditJobResult>(
  'audit-queue',
  processAuditJob,
  {
    connection,
    concurrency: WORKER_CONCURRENCY,
    removeOnComplete: { count: 200 },
    removeOnFail: { count: 500 },
    settings: {
      backoffStrategy: (attemptsMade: number) =>
        Math.min(1000 * 2 ** attemptsMade, 30_000), // exp backoff capped at 30s
    },
  }
);

// ─── Worker Event Handlers ────────────────────────────────────────────────────
auditWorker.on('completed', (job: Job<AuditJobData>, result: AuditJobResult) => {
  console.info(
    `[workers] Job ${job.id} completed — auditId=${result.auditId} ` +
    `ipfs=${result.ipfsCid} tx=${result.txHash}`
  );
});

auditWorker.on('failed', (job: Job<AuditJobData> | undefined, err: Error) => {
  const attempts = job?.attemptsMade ?? 0;
  const maxAttempts = job?.opts?.attempts ?? MAX_JOB_ATTEMPTS;

  if (attempts >= maxAttempts) {
    console.error(
      `[workers] Job ${job?.id} PERMANENTLY FAILED after ${attempts} attempts:`,
      err.message
    );
    // Fire-and-forget critical alert
    messaging
      .sendAlert({
        level: 'critical',
        title: 'Audit Job Permanently Failed',
        body: `Job ${job?.id} (auditId=${job?.data?.auditId}) failed: ${err.message}`,
      })
      .catch((alertErr: Error) =>
        console.error('[workers] Alert send failed:', alertErr.message)
      );
  } else {
    console.warn(
      `[workers] Job ${job?.id} failed (attempt ${attempts}/${maxAttempts}), ` +
      `will retry: ${err.message}`
    );
  }
});

auditWorker.on('error', (err: Error) => {
  console.error('[workers] Worker connection error:', err.message);
});

auditWorker.on('stalled', (jobId: string) => {
  console.warn(`[workers] Job ${jobId} stalled — will be requeued`);
});

// ─── Graceful Shutdown ────────────────────────────────────────────────────────
async function gracefulShutdown(signal: string): Promise<void> {
  console.info(`[workers] ${signal} received — draining worker...`);
  await auditWorker.close();
  await connection.quit();
  console.info('[workers] Worker shut down gracefully.');
  process.exit(0);
}

process.once('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.once('SIGINT', () => gracefulShutdown('SIGINT'));

export default auditWorker;
