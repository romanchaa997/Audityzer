/**
 * @module config
 * @description Environment configuration with Zod validation and BRICS locale settings.
 * Validates all required environment variables at startup and exports typed config.
 */

import { z } from 'zod';
import type { BRICSCountry, BRICSLocale, LocaleConfig, RegulatoryFramework } from './types';

// ─── Environment Schema ─────────────────────────────────────────────────────

const envSchema = z.object({
  /** Node environment. */
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  /** Server port for the webhook Express app. */
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),

  /** Telegram Bot API token for @audityzerbot. */
  TELEGRAM_BOT_TOKEN: z.string().min(1, 'TELEGRAM_BOT_TOKEN is required'),

  /** Secret token set via setWebhook for request verification. */
  TELEGRAM_WEBHOOK_SECRET: z.string().min(16, 'TELEGRAM_WEBHOOK_SECRET must be at least 16 chars'),

  /** Public base URL where Telegram sends webhook requests. */
  WEBHOOK_BASE_URL: z.string().url('WEBHOOK_BASE_URL must be a valid URL'),

  /** Redis connection URL for BullMQ job queue. */
  REDIS_URL: z.string().url().default('redis://localhost:6379'),

  /** Log level for pino logger. */
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

  /** Maximum audit jobs per user per hour. */
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().min(1).default(10),

  /** Rate limit window in seconds. */
  RATE_LIMIT_WINDOW_SECONDS: z.coerce.number().int().min(1).default(3600),

  /** Telegram API base URL (allows overriding for local bot API server). */
  TELEGRAM_API_BASE: z.string().url().default('https://api.telegram.org'),
});

export type EnvConfig = z.infer<typeof envSchema>;

/**
 * Parse and validate environment variables. Throws on invalid config
 * with detailed error messages for each missing/invalid field.
 */
function loadConfig(): EnvConfig {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `  ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid environment configuration:\n${formatted}`);
  }

  return result.data;
}

/** Validated environment configuration (singleton). */
export const config = loadConfig();

// ─── BRICS Locale Configurations ────────────────────────────────────────────

/** Locale configurations indexed by BRICSLocale. */
export const LOCALE_CONFIGS: Record<BRICSLocale, LocaleConfig> = {
  'en-IN': {
    country: 'IN',
    locale: 'en-IN',
    timezone: 'Asia/Kolkata',
    name: 'English (India)',
    dateFormat: { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' },
  },
  hi: {
    country: 'IN',
    locale: 'hi',
    timezone: 'Asia/Kolkata',
    name: 'हिन्दी (भारत)',
    dateFormat: { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' },
  },
  'pt-BR': {
    country: 'BR',
    locale: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    name: 'Português (Brasil)',
    dateFormat: { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Sao_Paulo' },
  },
  'en-ZA': {
    country: 'ZA',
    locale: 'en-ZA',
    timezone: 'Africa/Johannesburg',
    name: 'English (South Africa)',
    dateFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Africa/Johannesburg',
    },
  },
};

/** Map country code to default locale. */
export const DEFAULT_LOCALE: Record<BRICSCountry, BRICSLocale> = {
  IN: 'en-IN',
  BR: 'pt-BR',
  ZA: 'en-ZA',
};

/** Map country code to default timezone. */
export const DEFAULT_TIMEZONE: Record<BRICSCountry, string> = {
  IN: 'Asia/Kolkata',
  BR: 'America/Sao_Paulo',
  ZA: 'Africa/Johannesburg',
};

/** Regulatory frameworks applicable per country. */
export const COUNTRY_FRAMEWORKS: Record<BRICSCountry, RegulatoryFramework[]> = {
  IN: ['SEBI_CSCRF', 'RBI_CERT_IN'],
  BR: ['LGPD', 'ANPD'],
  ZA: ['JOINT_STANDARD_2'],
};

// ─── Alert Severity Ordering ────────────────────────────────────────────────

import type { AlertSeverity } from './types';

/** Numeric severity levels for comparison (higher = more severe). */
export const SEVERITY_ORDER: Record<AlertSeverity, number> = {
  INFO: 0,
  MEDIUM: 1,
  HIGH: 2,
  CRITICAL: 3,
};

// ─── Telegram Constants ─────────────────────────────────────────────────────

/** Telegram Bot API URL builder. */
export function telegramApiUrl(method: string): string {
  return `${config.TELEGRAM_API_BASE}/bot${config.TELEGRAM_BOT_TOKEN}/${method}`;
}

/** Maximum message length for Telegram (UTF-8 chars). */
export const TELEGRAM_MAX_MESSAGE_LENGTH = 4096;

/** Supported EVM chains with display names and explorer URLs. */
export const CHAIN_CONFIG = {
  ethereum: {
    name: 'Ethereum',
    explorer: 'https://etherscan.io',
    addressPattern: /^0x[a-fA-F0-9]{40}$/,
  },
  bsc: {
    name: 'BNB Smart Chain',
    explorer: 'https://bscscan.com',
    addressPattern: /^0x[a-fA-F0-9]{40}$/,
  },
  polygon: {
    name: 'Polygon',
    explorer: 'https://polygonscan.com',
    addressPattern: /^0x[a-fA-F0-9]{40}$/,
  },
  avalanche: {
    name: 'Avalanche C-Chain',
    explorer: 'https://snowtrace.io',
    addressPattern: /^0x[a-fA-F0-9]{40}$/,
  },
} as const;
