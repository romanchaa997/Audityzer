/**
 * @module config
 * @description Configuration for AuditorSEC SaaS Compliance Platform.
 * All values can be overridden via environment variables.
 */

import type { ComplianceFramework } from './types.js';

/** Environment-safe string reader */
function env(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

/** Environment-safe integer reader */
function envInt(key: string, fallback: number): number {
  const v = process.env[key];
  return v ? parseInt(v, 10) : fallback;
}

/** Environment-safe boolean reader */
function envBool(key: string, fallback: boolean): boolean {
  const v = process.env[key];
  if (!v) return fallback;
  return v === 'true' || v === '1';
}

// ─── Server Config ──────────────────────────────────────────────────────────

export const serverConfig = {
  port: envInt('PORT', 3100),
  host: env('HOST', '0.0.0.0'),
  env: env('NODE_ENV', 'development') as 'development' | 'production' | 'test',
  logLevel: env('LOG_LEVEL', 'info') as 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace',
} as const;

// ─── Auth Config ────────────────────────────────────────────────────────────

export const authConfig = {
  jwtSecret: env('JWT_SECRET', 'CHANGE_ME_IN_PRODUCTION'),
  jwtExpiresIn: env('JWT_EXPIRES_IN', '24h'),
  bcryptRounds: envInt('BCRYPT_ROUNDS', 12),
} as const;

// ─── Rate Limiting ──────────────────────────────────────────────────────────

export const rateLimitConfig = {
  windowMs: envInt('RATE_LIMIT_WINDOW_MS', 60_000),
  maxRequests: envInt('RATE_LIMIT_MAX', 100),
  /** Stricter limit for write operations */
  writeMaxRequests: envInt('RATE_LIMIT_WRITE_MAX', 20),
} as const;

// ─── Compliance Frameworks ──────────────────────────────────────────────────

export interface FrameworkConfig {
  framework: ComplianceFramework;
  enabled: boolean;
  region: string;
  regulator: string;
  rulesetPath: string;
  enforcementDate: string;
}

export const frameworkConfigs: FrameworkConfig[] = [
  {
    framework: 'SEBI_CSCRF',
    enabled: envBool('ENABLE_SEBI', true),
    region: 'India',
    regulator: 'Securities and Exchange Board of India',
    rulesetPath: './rulesets/sebi-cscrf.json',
    enforcementDate: '2025-04-01',
  },
  {
    framework: 'LGPD',
    enabled: envBool('ENABLE_LGPD', true),
    region: 'Brazil',
    regulator: 'ANPD — Autoridade Nacional de Proteção de Dados',
    rulesetPath: './rulesets/lgpd.json',
    enforcementDate: '2020-09-18',
  },
  {
    framework: 'JOINT_STANDARD_2',
    enabled: envBool('ENABLE_JS2', true),
    region: 'South Africa',
    regulator: 'FSCA / Prudential Authority',
    rulesetPath: './rulesets/joint-standard-2.json',
    enforcementDate: '2025-06-01',
  },
  {
    framework: 'SOC2_TYPE_II',
    enabled: envBool('ENABLE_SOC2', true),
    region: 'International',
    regulator: 'AICPA',
    rulesetPath: './rulesets/soc2-type-ii.json',
    enforcementDate: '2017-04-01',
  },
  {
    framework: 'ISO_27001',
    enabled: envBool('ENABLE_ISO27001', true),
    region: 'International',
    regulator: 'ISO / IEC',
    rulesetPath: './rulesets/iso-27001.json',
    enforcementDate: '2022-10-25',
  },
  {
    framework: 'GDPR',
    enabled: envBool('ENABLE_GDPR', true),
    region: 'EU',
    regulator: 'European Data Protection Board',
    rulesetPath: './rulesets/gdpr.json',
    enforcementDate: '2018-05-25',
  },
];

// ─── CRM (monday.com) ──────────────────────────────────────────────────────

export const mondayConfig = {
  apiToken: env('MONDAY_API_TOKEN', ''),
  apiUrl: 'https://api.monday.com/v2',
  webhookSecret: env('MONDAY_WEBHOOK_SECRET', ''),
  boardIds: {
    audits: envInt('MONDAY_BOARD_AUDITS', 0),
    clients: envInt('MONDAY_BOARD_CLIENTS', 0),
    incidents: envInt('MONDAY_BOARD_INCIDENTS', 0),
  },
  /** Column IDs mapping for audit board */
  columnMapping: {
    status: env('MONDAY_COL_STATUS', 'status'),
    auditor: env('MONDAY_COL_AUDITOR', 'person'),
    priority: env('MONDAY_COL_PRIORITY', 'priority'),
    dueDate: env('MONDAY_COL_DUE', 'date'),
    clientEmail: env('MONDAY_COL_EMAIL', 'email'),
    telegramId: env('MONDAY_COL_TELEGRAM', 'text0'),
    auditType: env('MONDAY_COL_TYPE', 'dropdown'),
    riskScore: env('MONDAY_COL_RISK', 'numbers'),
  },
} as const;

// ─── Telegram ───────────────────────────────────────────────────────────────

export const telegramConfig = {
  botToken: env('TELEGRAM_BOT_TOKEN', ''),
  /** Chat ID for internal team alerts */
  alertChatId: env('TELEGRAM_ALERT_CHAT_ID', ''),
  apiUrl: 'https://api.telegram.org',
} as const;

// ─── Scanner Config ─────────────────────────────────────────────────────────

export const scannerConfig = {
  /** Maximum concurrent scanners */
  maxConcurrency: envInt('SCANNER_MAX_CONCURRENCY', 4),
  /** Timeout per scanner in ms */
  scannerTimeoutMs: envInt('SCANNER_TIMEOUT_MS', 300_000),
  /** Minimum scanner agreement for high-confidence findings */
  minAgreementThreshold: envInt('SCANNER_MIN_AGREEMENT', 2),
  /** Confidence threshold to auto-flag findings */
  confidenceThreshold: parseFloat(env('SCANNER_CONFIDENCE_THRESHOLD', '0.7')),
  /** Path to vulnerability pattern database */
  patternDbPath: env('SCANNER_PATTERN_DB', './data/patterns.json'),
  /** Path to meta-learning statistics */
  metaStatsPath: env('SCANNER_META_STATS', './data/meta-stats.json'),
} as const;

// ─── dApp Risk Audit ────────────────────────────────────────────────────────

export const riskConfig = {
  /** Risk score thresholds */
  thresholds: {
    critical: 9.0,
    high: 7.0,
    medium: 4.0,
    low: 2.0,
  },
  /** Rug pull detection sensitivity (0–1) */
  rugPullSensitivity: parseFloat(env('RUGPULL_SENSITIVITY', '0.8')),
  /** Chain RPC endpoints */
  rpcEndpoints: {
    ethereum: env('RPC_ETHEREUM', 'https://eth-mainnet.g.alchemy.com/v2/demo'),
    bsc: env('RPC_BSC', 'https://bsc-dataseed.binance.org'),
    polygon: env('RPC_POLYGON', 'https://polygon-rpc.com'),
    arbitrum: env('RPC_ARBITRUM', 'https://arb1.arbitrum.io/rpc'),
    optimism: env('RPC_OPTIMISM', 'https://mainnet.optimism.io'),
    avalanche: env('RPC_AVALANCHE', 'https://api.avax.network/ext/bc/C/rpc'),
    solana: env('RPC_SOLANA', 'https://api.mainnet-beta.solana.com'),
    base: env('RPC_BASE', 'https://mainnet.base.org'),
  },
} as const;
