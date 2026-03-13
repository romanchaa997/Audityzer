/**
 * @module crm-integration
 * @description CRM integration layer for AuditorSEC.
 *
 * Connects monday.com ↔ Telegram ↔ Audit Pipeline:
 *  - monday.com webhook receiver and sender (GraphQL API)
 *  - Client onboarding: Telegram bot → CRM record → audit pipeline
 *  - Audit status sync: pipeline stages → monday.com columns
 *  - Alert routing: CRM escalation → Telegram notification
 */

import crypto from 'node:crypto';
import pino from 'pino';
import { mondayConfig, telegramConfig } from './config.js';
import type {
  AuditPipelineStage,
  CRMClient,
  MondayColumnValue,
  MondayMutation,
  MondayWebhookPayload,
  TelegramNotification,
} from './types.js';

const logger = pino({ name: 'crm-integration' });

// ─── monday.com GraphQL Client ──────────────────────────────────────────────

/**
 * Execute a monday.com GraphQL query/mutation.
 *
 * @param query     - GraphQL query string.
 * @param variables - Query variables.
 * @returns Parsed response data.
 * @throws On network or GraphQL errors.
 */
export async function mondayGraphQL<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(mondayConfig.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: mondayConfig.apiToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`monday.com API error: ${response.status} ${response.statusText}`);
  }

  const result = (await response.json()) as { data?: T; errors?: Array<{ message: string }> };

  if (result.errors?.length) {
    const messages = result.errors.map((e) => e.message).join('; ');
    throw new Error(`monday.com GraphQL errors: ${messages}`);
  }

  return result.data as T;
}

// ─── monday.com Webhook Handler ─────────────────────────────────────────────

/**
 * Verify a monday.com webhook signature.
 *
 * @param body      - Raw request body string.
 * @param signature - X-Monday-Signature header value.
 * @returns True if signature is valid.
 */
export function verifyMondayWebhook(body: string, signature: string): boolean {
  if (!mondayConfig.webhookSecret) {
    logger.warn('monday.com webhook secret not configured — skipping verification');
    return true;
  }
  const expected = crypto
    .createHmac('sha256', mondayConfig.webhookSecret)
    .update(body)
    .digest('base64');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

/** Handler functions for different monday.com event types */
type WebhookHandler = (payload: MondayWebhookPayload) => Promise<void>;
const webhookHandlers = new Map<string, WebhookHandler>();

/**
 * Register a handler for a specific monday.com event type.
 */
export function onMondayEvent(eventType: string, handler: WebhookHandler): void {
  webhookHandlers.set(eventType, handler);
}

/**
 * Process an incoming monday.com webhook payload.
 * Routes to the registered handler for the event type.
 *
 * @param payload - Parsed webhook payload.
 */
export async function processMondayWebhook(payload: MondayWebhookPayload): Promise<void> {
  const eventType = payload.event.type;
  logger.info(
    { eventType, pulseId: payload.event.pulseId, boardId: payload.event.boardId },
    'Processing monday.com webhook',
  );

  const handler = webhookHandlers.get(eventType);
  if (handler) {
    await handler(payload);
  } else {
    logger.debug({ eventType }, 'No handler registered for event type');
  }
}

// ─── monday.com Mutations ───────────────────────────────────────────────────

/**
 * Execute a monday.com mutation (create item, update column, post update).
 *
 * @param mutation - Mutation descriptor.
 */
export async function executeMondayMutation(mutation: MondayMutation): Promise<void> {
  let query: string;
  const vars: Record<string, unknown> = {};

  switch (mutation.type) {
    case 'create_item':
      query = `mutation ($boardId: ID!, $itemName: String!, $columnValues: JSON) {
        create_item(board_id: $boardId, item_name: $itemName, column_values: $columnValues) {
          id
        }
      }`;
      vars.boardId = mutation.boardId;
      vars.itemName = mutation.body ?? 'New Item';
      vars.columnValues = mutation.value ?? '{}';
      break;

    case 'change_column_value':
      query = `mutation ($boardId: ID!, $itemId: ID!, $columnId: String!, $value: JSON!) {
        change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
          id
        }
      }`;
      vars.boardId = mutation.boardId;
      vars.itemId = mutation.itemId;
      vars.columnId = mutation.columnId;
      vars.value = mutation.value;
      break;

    case 'create_update':
      query = `mutation ($itemId: ID!, $body: String!) {
        create_update(item_id: $itemId, body: $body) {
          id
        }
      }`;
      vars.itemId = mutation.itemId;
      vars.body = mutation.body;
      break;
  }

  await mondayGraphQL(query, vars);
  logger.info({ mutationType: mutation.type, boardId: mutation.boardId }, 'monday.com mutation executed');
}

// ─── Pipeline Stage → CRM Sync ─────────────────────────────────────────────

/** Map audit pipeline stages to monday.com status labels */
const stageToStatusLabel: Record<AuditPipelineStage, string> = {
  intake: 'Intake',
  scoping: 'Scoping',
  scanning: 'Scanning',
  manual_review: 'Manual Review',
  report_draft: 'Report Draft',
  client_review: 'Client Review',
  remediation: 'Remediation',
  final_report: 'Final Report',
  completed: 'Completed',
};

/**
 * Sync an audit pipeline stage change to monday.com and notify via Telegram.
 *
 * @param client - CRM client record.
 * @param newStage - New pipeline stage.
 */
export async function syncPipelineStage(
  client: CRMClient,
  newStage: AuditPipelineStage,
): Promise<void> {
  logger.info(
    { clientId: client.id, mondayItemId: client.mondayItemId, newStage },
    'Syncing pipeline stage',
  );

  // Update monday.com status column
  await executeMondayMutation({
    type: 'change_column_value',
    boardId: mondayConfig.boardIds.audits,
    itemId: client.mondayItemId,
    columnId: mondayConfig.columnMapping.status,
    value: JSON.stringify({ label: stageToStatusLabel[newStage] }),
  });

  // Post update on monday.com item
  await executeMondayMutation({
    type: 'create_update',
    boardId: mondayConfig.boardIds.audits,
    itemId: client.mondayItemId,
    body: `Audit stage updated to: ${stageToStatusLabel[newStage]}`,
  });

  // Notify client via Telegram
  if (client.telegramChatId) {
    await sendTelegramNotification({
      chatId: client.telegramChatId,
      message: `<b>Audit Status Update</b>\n\nYour audit for <b>${client.name}</b> has moved to: <b>${stageToStatusLabel[newStage]}</b>`,
      parseMode: 'HTML',
    });
  }

  logger.info({ clientId: client.id, newStage }, 'Pipeline stage synced');
}

// ─── Telegram Integration ───────────────────────────────────────────────────

/**
 * Send a notification via the Telegram Bot API.
 *
 * @param notification - Message payload.
 * @throws On Telegram API errors.
 */
export async function sendTelegramNotification(
  notification: TelegramNotification,
): Promise<void> {
  const url = `${telegramConfig.apiUrl}/bot${telegramConfig.botToken}/sendMessage`;

  const body: Record<string, unknown> = {
    chat_id: notification.chatId,
    text: notification.message,
    parse_mode: notification.parseMode,
  };

  if (notification.replyMarkup) {
    body.reply_markup = notification.replyMarkup;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram API error: ${response.status} — ${errorText}`);
  }

  logger.debug({ chatId: notification.chatId }, 'Telegram notification sent');
}

/**
 * Send an escalation alert to the internal team chat.
 *
 * @param subject - Alert subject.
 * @param details - Alert details.
 * @param severity - Alert severity.
 */
export async function sendEscalationAlert(
  subject: string,
  details: string,
  severity: 'critical' | 'high' | 'medium' | 'low',
): Promise<void> {
  const severityTag = severity === 'critical' || severity === 'high' ? '🔴' : severity === 'medium' ? '🟡' : '🟢';

  await sendTelegramNotification({
    chatId: telegramConfig.alertChatId,
    message: `${severityTag} <b>ESCALATION: ${subject}</b>\n\n${details}\n\n<i>Severity: ${severity.toUpperCase()}</i>`,
    parseMode: 'HTML',
  });
}

// ─── Client Onboarding ──────────────────────────────────────────────────────

/**
 * Onboard a new client from a Telegram bot interaction.
 * Creates a CRM record in monday.com and initialises the audit pipeline.
 *
 * @param params - Client onboarding parameters.
 * @returns The created CRM client record.
 */
export async function onboardClient(params: {
  name: string;
  telegramChatId: string;
  email: string;
  auditType: CRMClient['auditType'];
  assignedAuditor: string;
}): Promise<CRMClient> {
  logger.info({ name: params.name, auditType: params.auditType }, 'Onboarding new client');

  // Create monday.com item
  const columnValues: Record<string, MondayColumnValue> = {
    [mondayConfig.columnMapping.status]: { label: 'Intake' },
    [mondayConfig.columnMapping.clientEmail]: { text: params.email },
    [mondayConfig.columnMapping.telegramId]: { text: params.telegramChatId },
    [mondayConfig.columnMapping.auditType]: { label: params.auditType },
    [mondayConfig.columnMapping.auditor]: { text: params.assignedAuditor },
  };

  const result = await mondayGraphQL<{ create_item: { id: string } }>(
    `mutation ($boardId: ID!, $itemName: String!, $columnValues: JSON) {
      create_item(board_id: $boardId, item_name: $itemName, column_values: $columnValues) {
        id
      }
    }`,
    {
      boardId: mondayConfig.boardIds.clients,
      itemName: params.name,
      columnValues: JSON.stringify(columnValues),
    },
  );

  const now = new Date().toISOString();
  const client: CRMClient = {
    id: `cli-${Date.now()}`,
    mondayItemId: parseInt(result.create_item.id, 10),
    name: params.name,
    telegramChatId: params.telegramChatId,
    email: params.email,
    auditType: params.auditType,
    pipelineStage: 'intake',
    assignedAuditor: params.assignedAuditor,
    createdAt: now,
    updatedAt: now,
  };

  // Notify client via Telegram
  await sendTelegramNotification({
    chatId: params.telegramChatId,
    message:
      `<b>Welcome to AuditorSEC!</b>\n\nYour ${params.auditType} audit has been registered.\nAssigned auditor: ${params.assignedAuditor}\nCurrent status: <b>Intake</b>\n\nYou'll receive updates as your audit progresses.`,
    parseMode: 'HTML',
  });

  // Notify internal team
  await sendEscalationAlert(
    'New Client Onboarded',
    `Client: ${params.name}\nType: ${params.auditType}\nAuditor: ${params.assignedAuditor}`,
    'low',
  );

  logger.info({ clientId: client.id, mondayItemId: client.mondayItemId }, 'Client onboarded');
  return client;
}

// ─── Summary Generator ──────────────────────────────────────────────────────

/** Audit summary for CRM display */
export interface AuditSummary {
  clientName: string;
  auditType: CRMClient['auditType'];
  pipelineStage: AuditPipelineStage;
  overallScore: number | null;
  criticalFindings: number;
  highFindings: number;
  lastUpdated: string;
}

/**
 * Generate a Markdown summary of an audit suitable for CRM updates.
 *
 * @param summary - Audit summary data.
 * @returns Formatted Markdown string.
 */
export function formatAuditSummary(summary: AuditSummary): string {
  const scoreDisplay = summary.overallScore !== null
    ? `${summary.overallScore}%`
    : 'Pending';

  return [
    `## Audit Summary: ${summary.clientName}`,
    '',
    `| Field | Value |`,
    `| ----- | ----- |`,
    `| Type | ${summary.auditType} |`,
    `| Stage | ${stageToStatusLabel[summary.pipelineStage]} |`,
    `| Score | ${scoreDisplay} |`,
    `| Critical | ${summary.criticalFindings} |`,
    `| High | ${summary.highFindings} |`,
    `| Updated | ${summary.lastUpdated} |`,
  ].join('\n');
}

// ─── Default Event Handlers ─────────────────────────────────────────────────

/** Register default monday.com webhook handlers */
export function registerDefaultHandlers(): void {
  onMondayEvent('change_status', async (payload) => {
    const newLabel = payload.event.value?.label;
    if (!newLabel) return;

    logger.info(
      { pulseId: payload.event.pulseId, newStatus: newLabel },
      'Status changed on monday.com',
    );

    // Forward status change to Telegram alert channel
    await sendEscalationAlert(
      'Audit Status Changed',
      `Item #${payload.event.pulseId} (${payload.event.pulseName}) → ${newLabel}`,
      'low',
    );
  });

  onMondayEvent('create_pulse', async (payload) => {
    logger.info(
      { pulseId: payload.event.pulseId, name: payload.event.pulseName },
      'New item created on monday.com',
    );

    await sendEscalationAlert(
      'New CRM Item Created',
      `Item: ${payload.event.pulseName} (Board: ${payload.event.boardId})`,
      'low',
    );
  });

  onMondayEvent('create_update', async (payload) => {
    logger.debug(
      { pulseId: payload.event.pulseId },
      'Update posted on monday.com item',
    );
  });

  logger.info('Default monday.com webhook handlers registered');
}
