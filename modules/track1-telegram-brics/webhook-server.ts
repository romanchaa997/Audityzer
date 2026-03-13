/**
 * @module webhook-server
 * @description Production-ready Express server for receiving Telegram webhook updates
 * for @audityzerbot. Handles command routing, request signature verification,
 * rate limiting, and integration with the audit pipeline and BRICS alerting services.
 *
 * Commands:
 *   /audit <contract_address> [chain] — Submit a smart contract for audit
 *   /status [job_id]                  — Check audit status
 *   /alerts on|off                    — Toggle BRICS compliance alerts
 *   /report <audit_id>               — Retrieve audit report
 *   /start                           — Welcome message
 *   /help                            — Command reference
 */

import crypto from 'node:crypto';
import express, { type Request, type Response, type NextFunction } from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { config, CHAIN_CONFIG, COUNTRY_FRAMEWORKS, DEFAULT_LOCALE, DEFAULT_TIMEZONE, telegramApiUrl } from './config';
import { auditPipeline, jobStore } from './audit-pipeline';
import { BRICSAlertingService, escapeMarkdownV2 } from './brics-alerting';
import type {
  AuditSubmission,
  BotCommand,
  EVMChain,
  HealthCheckResponse,
  ParsedCommand,
  RateLimitEntry,
  TelegramMessage,
  TelegramSendMessagePayload,
  TelegramUpdate,
} from './types';

const logger = pino({ name: 'webhook-server', level: config.LOG_LEVEL });

// ─── Services ───────────────────────────────────────────────────────────────

const alertingService = new BRICSAlertingService();

// ─── Rate Limiter ───────────────────────────────────────────────────────────

/**
 * Simple in-memory sliding window rate limiter.
 * Production deployments should use Redis-backed rate limiting.
 */
class RateLimiter {
  private entries = new Map<string, RateLimitEntry>();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number, windowSeconds: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowSeconds * 1000;
  }

  /**
   * Check if a request is within rate limits.
   * @param key - Rate limit key (e.g., user ID)
   * @returns true if request is allowed, false if rate limited
   */
  isAllowed(key: string): boolean {
    const now = Date.now();
    const entry = this.entries.get(key);

    if (!entry || now - entry.windowStart > this.windowMs) {
      this.entries.set(key, { count: 1, windowStart: now });
      return true;
    }

    if (entry.count >= this.maxRequests) {
      return false;
    }

    entry.count++;
    return true;
  }

  /** Periodically clean up expired entries (call on interval). */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.entries) {
      if (now - entry.windowStart > this.windowMs) {
        this.entries.delete(key);
      }
    }
  }
}

const rateLimiter = new RateLimiter(
  config.RATE_LIMIT_MAX_REQUESTS,
  config.RATE_LIMIT_WINDOW_SECONDS
);

// Clean up rate limiter every 5 minutes
setInterval(() => rateLimiter.cleanup(), 5 * 60 * 1000);

// ─── Telegram Signature Verification ────────────────────────────────────────

/**
 * Verify that the incoming webhook request is from Telegram.
 * Uses the X-Telegram-Bot-Api-Secret-Token header set during setWebhook.
 * @see https://core.telegram.org/bots/api#setwebhook
 */
function verifyTelegramSignature(req: Request): boolean {
  const secretToken = req.headers['x-telegram-bot-api-secret-token'];
  if (!secretToken || typeof secretToken !== 'string') {
    return false;
  }
  return crypto.timingSafeEqual(
    Buffer.from(secretToken),
    Buffer.from(config.TELEGRAM_WEBHOOK_SECRET)
  );
}

// ─── Telegram Message Sender ────────────────────────────────────────────────

/**
 * Send a message to a Telegram chat.
 * @param payload - Telegram sendMessage payload
 */
async function sendMessage(payload: TelegramSendMessagePayload): Promise<void> {
  const url = telegramApiUrl('sendMessage');
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const body = await response.text();
      logger.error({ status: response.status, body, chatId: payload.chat_id }, 'sendMessage failed');
    }
  } catch (err) {
    logger.error({ err, chatId: payload.chat_id }, 'sendMessage error');
  }
}

/**
 * Send a plain-text reply (auto-escaped for MarkdownV2).
 */
async function sendTextReply(chatId: number, text: string): Promise<void> {
  await sendMessage({
    chat_id: chatId,
    text: escapeMarkdownV2(text),
    parse_mode: 'MarkdownV2',
  });
}

/**
 * Send a pre-formatted MarkdownV2 reply (caller handles escaping).
 */
async function sendMarkdownReply(chatId: number, text: string): Promise<void> {
  await sendMessage({
    chat_id: chatId,
    text,
    parse_mode: 'MarkdownV2',
  });
}

// ─── Command Parser ─────────────────────────────────────────────────────────

const VALID_COMMANDS: Set<string> = new Set([
  '/audit',
  '/status',
  '/alerts',
  '/report',
  '/start',
  '/help',
]);

/**
 * Parse a Telegram message into a structured command.
 * @param message - Incoming Telegram message
 * @returns Parsed command or null if not a recognised command
 */
function parseCommand(message: TelegramMessage): ParsedCommand | null {
  if (!message.text || !message.from) return null;

  const text = message.text.trim();
  if (!text.startsWith('/')) return null;

  // Handle @botname suffix (e.g., /audit@audityzerbot)
  const parts = text.split(/\s+/);
  const rawCommand = parts[0].split('@')[0].toLowerCase();

  if (!VALID_COMMANDS.has(rawCommand)) return null;

  return {
    command: rawCommand as BotCommand,
    args: parts.slice(1),
    chatId: message.chat.id,
    userId: message.from.id,
    username: message.from.username,
    messageId: message.message_id,
  };
}

// ─── Command Handlers ───────────────────────────────────────────────────────

/**
 * Handle /start — Welcome message with bot description.
 */
async function handleStart(cmd: ParsedCommand): Promise<void> {
  const welcome =
    `*Welcome to AuditorSEC* 🛡️\n\n` +
    `Smart contract security audits powered by AI\\.\n\n` +
    `*Commands:*\n` +
    `/audit \\<address\\> \\[chain\\] — Submit contract for audit\n` +
    `/status \\[job\\_id\\] — Check audit status\n` +
    `/alerts on\\|off — Toggle compliance alerts\n` +
    `/report \\<audit\\_id\\> — Get audit report\n` +
    `/help — Show this message\n\n` +
    `_Supported chains: Ethereum, BSC, Polygon, Avalanche_`;

  await sendMarkdownReply(cmd.chatId, welcome);
}

/**
 * Handle /help — Same as /start.
 */
async function handleHelp(cmd: ParsedCommand): Promise<void> {
  await handleStart(cmd);
}

/**
 * Handle /audit <contract_address> [chain]
 * Submits a smart contract for audit processing.
 * Default chain: ethereum.
 */
async function handleAudit(cmd: ParsedCommand): Promise<void> {
  if (cmd.args.length === 0) {
    await sendTextReply(
      cmd.chatId,
      'Usage: /audit <contract_address> [chain]\n\nSupported chains: ethereum, bsc, polygon, avalanche\nDefault: ethereum'
    );
    return;
  }

  const contractAddress = cmd.args[0];
  const chainArg = (cmd.args[1] || 'ethereum').toLowerCase();

  // Validate chain
  if (!(chainArg in CHAIN_CONFIG)) {
    await sendTextReply(
      cmd.chatId,
      `Unknown chain: ${chainArg}\nSupported: ethereum, bsc, polygon, avalanche`
    );
    return;
  }

  const chain = chainArg as EVMChain;

  // Validate address format
  if (!CHAIN_CONFIG[chain].addressPattern.test(contractAddress)) {
    await sendTextReply(
      cmd.chatId,
      'Invalid contract address. Expected format: 0x followed by 40 hexadecimal characters.'
    );
    return;
  }

  // Rate limit check
  if (!rateLimiter.isAllowed(`audit:${cmd.userId}`)) {
    await sendTextReply(
      cmd.chatId,
      `Rate limit exceeded. Maximum ${config.RATE_LIMIT_MAX_REQUESTS} audits per hour.`
    );
    return;
  }

  try {
    const submission: AuditSubmission = {
      contractAddress,
      chain,
      chatId: cmd.chatId,
      userId: cmd.userId,
      username: cmd.username,
    };

    const job = await auditPipeline.submit(submission);

    const shortAddr = `${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`;
    const msg =
      `*Audit Submitted* ✅\n\n` +
      `*Contract:* ${escapeMarkdownV2(shortAddr)}\n` +
      `*Chain:* ${escapeMarkdownV2(CHAIN_CONFIG[chain].name)}\n` +
      `*Job ID:* \`${job.id.slice(0, 8)}\`\n\n` +
      `_You will receive notifications as the audit progresses\\._`;

    await sendMarkdownReply(cmd.chatId, msg);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    logger.error({ err, contractAddress, chain }, 'Audit submission failed');
    await sendTextReply(cmd.chatId, `Audit submission failed: ${errorMsg}`);
  }
}

/**
 * Handle /status [job_id]
 * Shows the status of a specific audit or the user's latest audit.
 */
async function handleStatus(cmd: ParsedCommand): Promise<void> {
  let status;

  if (cmd.args.length > 0) {
    // Look up by job ID (supports partial ID matching)
    const jobIdPrefix = cmd.args[0];
    // Try exact match first
    status = auditPipeline.getStatus(jobIdPrefix);

    // If no exact match, try prefix search
    if (!status) {
      const userJobs = jobStore.getByUser(cmd.userId);
      const match = userJobs.find((j) => j.id.startsWith(jobIdPrefix));
      if (match) {
        status = auditPipeline.getStatus(match.id);
      }
    }
  } else {
    // Show latest audit for this user
    status = auditPipeline.getLatestStatusForUser(cmd.userId);
  }

  if (!status) {
    await sendTextReply(
      cmd.chatId,
      'No audit found. Submit one with /audit <contract_address>'
    );
    return;
  }

  const stageEmoji: Record<string, string> = {
    submitted: '📥',
    queued: '⏳',
    static_analysis: '🔍',
    dynamic_analysis: '⚡',
    report_generation: '📝',
    completed: '✅',
    failed: '❌',
  };

  let msg =
    `*Audit Status*\n\n` +
    `*Job ID:* \`${status.jobId.slice(0, 8)}\`\n` +
    `*Stage:* ${stageEmoji[status.stage] || '❓'} ${escapeMarkdownV2(status.stage.replace(/_/g, ' '))}\n` +
    `*Findings:* ${status.findingsCount} total`;

  if (status.criticalCount > 0) {
    msg += ` \\(🚨 ${status.criticalCount} critical\\)`;
  }
  if (status.highCount > 0) {
    msg += ` \\(🔴 ${status.highCount} high\\)`;
  }

  if (status.reportUrl) {
    msg += `\n\n📄 [View Full Report](${escapeMarkdownV2(status.reportUrl)})`;
  }

  await sendMarkdownReply(cmd.chatId, msg);
}

/**
 * Handle /alerts on|off
 * Toggles BRICS compliance alerting for the current chat.
 */
async function handleAlerts(cmd: ParsedCommand): Promise<void> {
  if (cmd.args.length === 0) {
    const prefs = alertingService.getPreferences(cmd.chatId);
    const status = prefs?.enabled ? 'ON' : 'OFF';
    await sendTextReply(
      cmd.chatId,
      `Alerts are currently ${status}.\nUsage: /alerts on|off`
    );
    return;
  }

  const action = cmd.args[0].toLowerCase();

  if (action === 'on') {
    // Check if preferences exist; if not, create defaults
    let prefs = alertingService.getPreferences(cmd.chatId);
    if (!prefs) {
      // Default to India locale (most common BRICS market)
      const country = 'IN' as const;
      prefs = {
        chatId: cmd.chatId,
        enabled: true,
        country,
        locale: DEFAULT_LOCALE[country],
        minSeverity: 'MEDIUM',
        frameworks: COUNTRY_FRAMEWORKS[country],
        timezone: DEFAULT_TIMEZONE[country],
      };
      alertingService.setPreferences(prefs);
    } else {
      alertingService.toggleAlerts(cmd.chatId, true);
    }
    await sendTextReply(cmd.chatId, 'BRICS compliance alerts enabled. You will receive regulatory notifications.');
  } else if (action === 'off') {
    alertingService.toggleAlerts(cmd.chatId, false);
    await sendTextReply(cmd.chatId, 'BRICS compliance alerts disabled.');
  } else {
    await sendTextReply(cmd.chatId, 'Usage: /alerts on|off');
  }
}

/**
 * Handle /report <audit_id>
 * Retrieves a full audit report summary.
 */
async function handleReport(cmd: ParsedCommand): Promise<void> {
  if (cmd.args.length === 0) {
    await sendTextReply(cmd.chatId, 'Usage: /report <audit_id>');
    return;
  }

  const jobIdPrefix = cmd.args[0];
  let job = jobStore.get(jobIdPrefix);

  // Try prefix match
  if (!job) {
    const userJobs = jobStore.getByUser(cmd.userId);
    job = userJobs.find((j) => j.id.startsWith(jobIdPrefix));
  }

  if (!job) {
    await sendTextReply(cmd.chatId, 'Audit not found. Check the audit ID and try again.');
    return;
  }

  if (job.stage !== 'completed') {
    await sendTextReply(
      cmd.chatId,
      `Audit is still in progress (stage: ${job.stage.replace(/_/g, ' ')}). Report will be available once completed.`
    );
    return;
  }

  const chainName = CHAIN_CONFIG[job.chain].name;
  const shortAddr = `${job.contractAddress.slice(0, 6)}...${job.contractAddress.slice(-4)}`;

  let msg =
    `*Audit Report* 📄\n\n` +
    `*Contract:* ${escapeMarkdownV2(shortAddr)}\n` +
    `*Chain:* ${escapeMarkdownV2(chainName)}\n` +
    `*Job ID:* \`${job.id.slice(0, 8)}\`\n` +
    `*Completed:* ${escapeMarkdownV2(job.updatedAt.toISOString())}\n\n` +
    `*Findings \\(${job.findings.length}\\):*\n`;

  for (const finding of job.findings) {
    const severityEmoji: Record<string, string> = {
      Critical: '🚨',
      High: '🔴',
      Medium: '🟡',
      Low: '🔵',
      Informational: 'ℹ️',
    };
    msg +=
      `\n${severityEmoji[finding.severity] || '•'} *${escapeMarkdownV2(finding.title)}*\n` +
      `  Severity: ${escapeMarkdownV2(finding.severity)}`;
    if (finding.swcId) {
      msg += ` \\(${escapeMarkdownV2(finding.swcId)}\\)`;
    }
    msg += '\n';
  }

  if (job.reportUrl) {
    msg += `\n📄 [View Full Report](${escapeMarkdownV2(job.reportUrl)})`;
  }

  await sendMarkdownReply(cmd.chatId, msg);
}

// ─── Command Dispatcher ─────────────────────────────────────────────────────

const COMMAND_HANDLERS: Record<BotCommand, (cmd: ParsedCommand) => Promise<void>> = {
  '/start': handleStart,
  '/help': handleHelp,
  '/audit': handleAudit,
  '/status': handleStatus,
  '/alerts': handleAlerts,
  '/report': handleReport,
};

// ─── Express Application ────────────────────────────────────────────────────

export function createApp(): express.Express {
  const app = express();

  // Request logging
  app.use(pinoHttp({ logger, autoLogging: { ignore: (req) => req.url === '/health' } }));

  // Parse JSON bodies (Telegram sends application/json)
  app.use(express.json({ limit: '1mb' }));

  // ── Health Check ────────────────────────────────────────────────────

  app.get('/health', (_req: Request, res: Response) => {
    const response: HealthCheckResponse = {
      status: 'ok',
      version: '1.0.0',
      uptime: process.uptime(),
      queueSize: auditPipeline.getQueueSize(),
    };
    res.json(response);
  });

  // ── Telegram Webhook Endpoint ───────────────────────────────────────

  app.post(
    '/webhook/audityzerbot',
    async (req: Request, res: Response, _next: NextFunction) => {
      // Verify request is from Telegram
      if (!verifyTelegramSignature(req)) {
        logger.warn({ ip: req.ip }, 'Webhook signature verification failed');
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const update: TelegramUpdate = req.body;

      // Respond immediately to Telegram (they expect 200 within a few seconds)
      res.sendStatus(200);

      // Process the update asynchronously
      try {
        await processUpdate(update);
      } catch (err) {
        logger.error({ err, updateId: update.update_id }, 'Error processing update');
      }
    }
  );

  // ── 404 Handler ─────────────────────────────────────────────────────

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found', code: 'NOT_FOUND', timestamp: new Date().toISOString() });
  });

  // ── Global Error Handler ────────────────────────────────────────────

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error({ err }, 'Unhandled error');
    res.status(500).json({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
      timestamp: new Date().toISOString(),
    });
  });

  return app;
}

/**
 * Process an incoming Telegram update.
 * Routes messages to command handlers; ignores non-command messages.
 */
async function processUpdate(update: TelegramUpdate): Promise<void> {
  const message = update.message;
  if (!message) {
    logger.debug({ updateId: update.update_id }, 'Update has no message, skipping');
    return;
  }

  const command = parseCommand(message);
  if (!command) {
    logger.debug({ chatId: message.chat.id, text: message.text?.slice(0, 50) }, 'Not a command');
    return;
  }

  // Global rate limit per user
  if (!rateLimiter.isAllowed(`cmd:${command.userId}`)) {
    await sendTextReply(command.chatId, 'Too many requests. Please slow down.');
    return;
  }

  logger.info(
    { command: command.command, userId: command.userId, chatId: command.chatId },
    'Processing command'
  );

  const handler = COMMAND_HANDLERS[command.command];
  if (handler) {
    await handler(command);
  }
}

// ─── Server Startup ─────────────────────────────────────────────────────────

/**
 * Start the webhook server and audit pipeline worker.
 * Handles graceful shutdown on SIGTERM/SIGINT.
 */
export async function startServer(): Promise<void> {
  const app = createApp();

  // Start the audit pipeline worker
  auditPipeline.startWorker();

  const server = app.listen(config.PORT, () => {
    logger.info({ port: config.PORT }, 'AuditorSEC webhook server started');
    logger.info(
      { webhookUrl: `${config.WEBHOOK_BASE_URL}/webhook/audityzerbot` },
      'Webhook endpoint ready'
    );
  });

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    logger.info({ signal }, 'Shutting down gracefully');
    server.close();
    await auditPipeline.shutdown();
    process.exit(0);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

// Run if executed directly
const isMainModule = process.argv[1]?.endsWith('webhook-server.ts') ||
  process.argv[1]?.endsWith('webhook-server.js');
if (isMainModule) {
  startServer().catch((err) => {
    logger.fatal({ err }, 'Failed to start server');
    process.exit(1);
  });
}
