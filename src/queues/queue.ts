/**
 * src/queues/queue.ts
 * BullMQ Queue factory + job enqueue helpers for Audityzer.
 * Provides a simple API to enqueue audit jobs and integrates with workers.ts.
 */

import { Queue, JobsOptions } from 'bullmq';
import IORedis from 'ioredis';

// ─── Redis Connection ─────────────────────────────────────────────────────────
const connection = new IORedis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

// ─── Job Data Interface ─────────────────────────────────────────────────────
export interface AuditJobData {
  auditId: string;
  targetUrl: string;
  reportHash: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, unknown>;
}

// ─── Queue Instance ────────────────────────────────────────────────────────
export const auditQueue = new Queue<AuditJobData>('audit-queue', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: 200,
    removeOnFail: 500,
  },
});

// ─── Helper: Enqueue Audit Job ──────────────────────────────────────────────
/**
 * Enqueue an audit job with the given data and optional job options.
 * Returns the job ID.
 */
export async function enqueueAuditJob(
  data: AuditJobData,
  options?: JobsOptions
): Promise<string> {
  const job = await auditQueue.add('audit', data, options);
  return job.id as string;
}

/**
 * Enqueue multiple audit jobs in bulk.
 * Returns an array of job IDs.
 */
export async function enqueueBulkAuditJobs(
  jobs: Array<{ data: AuditJobData; options?: JobsOptions }>
): Promise<string[]> {
  const bulkJobs = jobs.map((j) => ({
    name: 'audit',
    data: j.data,
    opts: j.options,
  }));

  const addedJobs = await auditQueue.addBulk(bulkJobs);
  return addedJobs.map((job) => job.id as string);
}

/**
 * Get job counts (active, completed, failed, etc.).
 */
export async function getQueueCounts(): Promise<Record<string, number>> {
  const counts = await auditQueue.getJobCounts(
    'active',
    'completed',
    'failed',
    'delayed',
    'waiting'
  );
  return counts;
}

/**
 * Pause the queue (stops processing new jobs).
 */
export async function pauseQueue(): Promise<void> {
  await auditQueue.pause();
  console.info('[queue] Audit queue paused.');
}

/**
 * Resume the queue.
 */
export async function resumeQueue(): Promise<void> {
  await auditQueue.resume();
  console.info('[queue] Audit queue resumed.');
}

/**
 * Obliterate (clear) all jobs from the queue.
 */
export async function clearQueue(): Promise<void> {
  await auditQueue.obliterate({ force: true });
  console.info('[queue] Audit queue cleared.');
}

/**
 * Graceful shutdown: close the queue connection.
 */
export async function closeQueue(): Promise<void> {
  await auditQueue.close();
  await connection.quit();
  console.info('[queue] Audit queue connection closed.');
}

export default auditQueue;
