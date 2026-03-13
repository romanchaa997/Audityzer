/**
 * @module types
 * @description Core type definitions for AuditorSEC Telegram BRICS integration.
 * Covers Telegram API types, audit pipeline models, BRICS alerting,
 * and smart contract scanning structures.
 */

// ─── Telegram API Types ─────────────────────────────────────────────────────

/** Telegram chat object (subset of relevant fields). */
export interface TelegramChat {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

/** Telegram user object. */
export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

/** Telegram message entity (commands, mentions, etc.). */
export interface TelegramMessageEntity {
  type:
    | 'bot_command'
    | 'mention'
    | 'hashtag'
    | 'url'
    | 'text_mention'
    | 'text_link'
    | 'bold'
    | 'italic'
    | 'code'
    | 'pre';
  offset: number;
  length: number;
  url?: string;
  user?: TelegramUser;
}

/** Telegram message object. */
export interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
  entities?: TelegramMessageEntity[];
}

/** Telegram callback query (inline keyboard response). */
export interface TelegramCallbackQuery {
  id: string;
  from: TelegramUser;
  message?: TelegramMessage;
  data?: string;
}

/** Incoming Telegram webhook update. */
export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
}

/** Telegram sendMessage payload. */
export interface TelegramSendMessagePayload {
  chat_id: number | string;
  text: string;
  parse_mode?: 'MarkdownV2' | 'HTML';
  reply_markup?: TelegramInlineKeyboard;
}

/** Telegram inline keyboard markup. */
export interface TelegramInlineKeyboard {
  inline_keyboard: TelegramInlineButton[][];
}

/** Single inline keyboard button. */
export interface TelegramInlineButton {
  text: string;
  callback_data?: string;
  url?: string;
}

// ─── Bot Command Types ──────────────────────────────────────────────────────

/** Recognised bot commands. */
export type BotCommand = '/audit' | '/status' | '/alerts' | '/report' | '/start' | '/help';

/** Parsed command from an incoming message. */
export interface ParsedCommand {
  command: BotCommand;
  args: string[];
  chatId: number;
  userId: number;
  username?: string;
  messageId: number;
}

// ─── Audit Pipeline Types ───────────────────────────────────────────────────

/** Supported EVM-compatible chains. */
export type EVMChain = 'ethereum' | 'bsc' | 'polygon' | 'avalanche';

/** Audit processing stages. */
export type AuditStage =
  | 'submitted'
  | 'queued'
  | 'static_analysis'
  | 'dynamic_analysis'
  | 'report_generation'
  | 'completed'
  | 'failed';

/** Vulnerability severity classification (OWASP/SWC aligned). */
export type VulnerabilitySeverity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';

/** Single vulnerability finding. */
export interface VulnerabilityFinding {
  id: string;
  title: string;
  severity: VulnerabilitySeverity;
  /** SWC Registry ID (e.g. SWC-107). */
  swcId?: string;
  description: string;
  /** Affected source file and line range. */
  location?: {
    file: string;
    startLine: number;
    endLine: number;
  };
  recommendation: string;
}

/** Audit job submitted to the processing queue. */
export interface AuditJob {
  id: string;
  contractAddress: string;
  chain: EVMChain;
  stage: AuditStage;
  submittedBy: {
    chatId: number;
    userId: number;
    username?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  /** Findings populated during analysis stages. */
  findings: VulnerabilityFinding[];
  /** Final report URL once generated. */
  reportUrl?: string;
  /** Error message if stage === 'failed'. */
  error?: string;
}

/** Audit submission request from Telegram command. */
export interface AuditSubmission {
  contractAddress: string;
  chain: EVMChain;
  chatId: number;
  userId: number;
  username?: string;
}

/** Audit status response sent back via Telegram. */
export interface AuditStatusResponse {
  jobId: string;
  stage: AuditStage;
  findingsCount: number;
  criticalCount: number;
  highCount: number;
  reportUrl?: string;
}

/** Audit report summary. */
export interface AuditReport {
  id: string;
  jobId: string;
  contractAddress: string;
  chain: EVMChain;
  generatedAt: Date;
  findings: VulnerabilityFinding[];
  riskScore: number;
  summary: string;
  reportUrl: string;
}

// ─── BRICS Alerting Types ───────────────────────────────────────────────────

/** Supported BRICS locales. */
export type BRICSLocale = 'en-IN' | 'hi' | 'pt-BR' | 'en-ZA';

/** BRICS country codes. */
export type BRICSCountry = 'IN' | 'BR' | 'ZA';

/** Alert severity levels. */
export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';

/** Regulatory framework identifiers. */
export type RegulatoryFramework =
  | 'SEBI_CSCRF'
  | 'RBI_CERT_IN'
  | 'LGPD'
  | 'ANPD'
  | 'JOINT_STANDARD_2';

/** Alert category. */
export type AlertCategory =
  | 'audit_deadline'
  | 'breach_notification'
  | 'compliance_deadline'
  | 'incident_notification'
  | 'regulatory_update';

/** A regulatory compliance alert. */
export interface ComplianceAlert {
  id: string;
  country: BRICSCountry;
  framework: RegulatoryFramework;
  category: AlertCategory;
  severity: AlertSeverity;
  /** Locale-keyed alert messages. */
  messages: Partial<Record<BRICSLocale, string>>;
  /** Deadline date if applicable. */
  deadline?: Date;
  /** Metadata for template interpolation. */
  metadata: Record<string, string>;
  createdAt: Date;
}

/** User alert preferences stored per chat. */
export interface AlertPreferences {
  chatId: number;
  enabled: boolean;
  country: BRICSCountry;
  locale: BRICSLocale;
  /** Minimum severity to receive. */
  minSeverity: AlertSeverity;
  frameworks: RegulatoryFramework[];
  /** IANA timezone string (e.g. Asia/Kolkata). */
  timezone: string;
}

/** BRICS locale configuration. */
export interface LocaleConfig {
  country: BRICSCountry;
  locale: BRICSLocale;
  timezone: string;
  /** Locale display name. */
  name: string;
  /** Date format pattern (Intl). */
  dateFormat: Intl.DateTimeFormatOptions;
}

// ─── Rate Limiting ──────────────────────────────────────────────────────────

/** Rate limit entry for a specific chat/user. */
export interface RateLimitEntry {
  count: number;
  windowStart: number;
}

// ─── Webhook Server Types ───────────────────────────────────────────────────

/** Health check response. */
export interface HealthCheckResponse {
  status: 'ok' | 'degraded';
  version: string;
  uptime: number;
  queueSize: number;
}

/** Generic API error response. */
export interface ApiErrorResponse {
  error: string;
  code: string;
  timestamp: string;
}
