/**
 * @module brics-alerting
 * @description Multi-locale BRICS regulatory compliance alerting system.
 * Supports India (SEBI CSCRF, RBI/CERT-In), Brazil (LGPD, ANPD),
 * and South Africa (Joint Standard 2) with timezone-aware scheduling
 * and Telegram MarkdownV2 formatting.
 */

import pino from 'pino';
import {
  LOCALE_CONFIGS,
  SEVERITY_ORDER,
  TELEGRAM_MAX_MESSAGE_LENGTH,
  telegramApiUrl,
  config,
} from './config';
import type {
  AlertCategory,
  AlertPreferences,
  AlertSeverity,
  BRICSCountry,
  BRICSLocale,
  ComplianceAlert,
  RegulatoryFramework,
  TelegramSendMessagePayload,
} from './types';

const logger = pino({ name: 'brics-alerting', level: config.LOG_LEVEL });

// ─── MarkdownV2 Escaping ────────────────────────────────────────────────────

/**
 * Escape special characters for Telegram MarkdownV2.
 * @see https://core.telegram.org/bots/api#markdownv2-style
 */
export function escapeMarkdownV2(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
}

/**
 * Bold text in MarkdownV2.
 * Content inside bold markers must NOT have unescaped `*`.
 */
function bold(text: string): string {
  return `*${escapeMarkdownV2(text)}*`;
}

/** Italic text in MarkdownV2. */
function italic(text: string): string {
  return `_${escapeMarkdownV2(text)}_`;
}

/** Inline code in MarkdownV2. */
function code(text: string): string {
  // Inside code, only ` and \ need escaping
  return `\`${text.replace(/[`\\]/g, '\\$&')}\``;
}

// ─── Severity Emoji & Labels ────────────────────────────────────────────────

const SEVERITY_EMOJI: Record<AlertSeverity, string> = {
  CRITICAL: '🚨',
  HIGH: '🔴',
  MEDIUM: '🟡',
  INFO: 'ℹ️',
};

const SEVERITY_LABELS: Record<BRICSLocale, Record<AlertSeverity, string>> = {
  'en-IN': { CRITICAL: 'CRITICAL', HIGH: 'HIGH', MEDIUM: 'MEDIUM', INFO: 'INFO' },
  hi: { CRITICAL: 'गंभीर', HIGH: 'उच्च', MEDIUM: 'मध्यम', INFO: 'सूचना' },
  'pt-BR': { CRITICAL: 'CRÍTICO', HIGH: 'ALTO', MEDIUM: 'MÉDIO', INFO: 'INFO' },
  'en-ZA': { CRITICAL: 'CRITICAL', HIGH: 'HIGH', MEDIUM: 'MEDIUM', INFO: 'INFO' },
};

// ─── Framework Display Names ────────────────────────────────────────────────

const FRAMEWORK_NAMES: Record<BRICSLocale, Record<RegulatoryFramework, string>> = {
  'en-IN': {
    SEBI_CSCRF: 'SEBI CSCRF',
    RBI_CERT_IN: 'RBI / CERT-In',
    LGPD: 'LGPD',
    ANPD: 'ANPD',
    JOINT_STANDARD_2: 'Joint Standard 2',
  },
  hi: {
    SEBI_CSCRF: 'सेबी CSCRF',
    RBI_CERT_IN: 'आरबीआई / CERT-In',
    LGPD: 'LGPD',
    ANPD: 'ANPD',
    JOINT_STANDARD_2: 'संयुक्त मानक 2',
  },
  'pt-BR': {
    SEBI_CSCRF: 'SEBI CSCRF',
    RBI_CERT_IN: 'RBI / CERT-In',
    LGPD: 'LGPD',
    ANPD: 'ANPD',
    JOINT_STANDARD_2: 'Norma Conjunta 2',
  },
  'en-ZA': {
    SEBI_CSCRF: 'SEBI CSCRF',
    RBI_CERT_IN: 'RBI / CERT-In',
    LGPD: 'LGPD',
    ANPD: 'ANPD',
    JOINT_STANDARD_2: 'Joint Standard 2',
  },
};

// ─── Alert Message Templates ────────────────────────────────────────────────

/**
 * Alert template definitions per category and locale.
 * Uses `{{key}}` placeholders that are interpolated with alert metadata.
 */
const ALERT_TEMPLATES: Record<AlertCategory, Record<BRICSLocale, string>> = {
  audit_deadline: {
    'en-IN':
      '📋 Audit Deadline Reminder\n\nYour {{framework}} compliance audit is due by {{deadline}}.\nEntity: {{entity}}\nAction required: {{action}}',
    hi: '📋 ऑडिट समय सीमा अनुस्मारक\n\nआपका {{framework}} अनुपालन ऑडिट {{deadline}} तक होना चाहिए।\nसंस्था: {{entity}}\nआवश्यक कार्रवाई: {{action}}',
    'pt-BR':
      '📋 Lembrete de Prazo de Auditoria\n\nSua auditoria de conformidade {{framework}} vence em {{deadline}}.\nEntidade: {{entity}}\nAção necessária: {{action}}',
    'en-ZA':
      '📋 Audit Deadline Reminder\n\nYour {{framework}} compliance audit is due by {{deadline}}.\nEntity: {{entity}}\nAction required: {{action}}',
  },
  breach_notification: {
    'en-IN':
      '🚨 Data Breach Notification Required\n\nA data breach has been detected. Under {{framework}}, you must notify the regulator within {{timeframe}}.\nIncident ID: {{incident_id}}\nAffected records: {{affected_count}}',
    hi: '🚨 डेटा उल्लंघन अधिसूचना आवश्यक\n\n{{framework}} के तहत, आपको {{timeframe}} के भीतर नियामक को सूचित करना होगा।\nघटना आईडी: {{incident_id}}\nप्रभावित रिकॉर्ड: {{affected_count}}',
    'pt-BR':
      '🚨 Notificação de Violação de Dados Obrigatória\n\nUma violação de dados foi detectada. Conforme a {{framework}}, a ANPD deve ser notificada em {{timeframe}}.\nID do incidente: {{incident_id}}\nRegistros afetados: {{affected_count}}',
    'en-ZA':
      '🚨 Data Breach Notification Required\n\nA data breach has been detected. Under {{framework}}, the Information Regulator must be notified within {{timeframe}}.\nIncident ID: {{incident_id}}\nAffected records: {{affected_count}}',
  },
  compliance_deadline: {
    'en-IN':
      '⏰ Compliance Deadline Approaching\n\n{{framework}} compliance deadline: {{deadline}}\nRequirement: {{requirement}}\nStatus: {{status}}',
    hi: '⏰ अनुपालन समय सीमा निकट\n\n{{framework}} अनुपालन की अंतिम तिथि: {{deadline}}\nआवश्यकता: {{requirement}}\nस्थिति: {{status}}',
    'pt-BR':
      '⏰ Prazo de Conformidade se Aproximando\n\nPrazo de conformidade {{framework}}: {{deadline}}\nRequisito: {{requirement}}\nStatus: {{status}}',
    'en-ZA':
      '⏰ Compliance Deadline Approaching\n\n{{framework}} compliance deadline: {{deadline}}\nRequirement: {{requirement}}\nStatus: {{status}}',
  },
  incident_notification: {
    'en-IN':
      '🔔 Incident Notification\n\nA cyber incident has been reported under {{framework}} guidelines.\nType: {{incident_type}}\nSeverity: {{severity}}\nReporting deadline: {{deadline}}',
    hi: '🔔 घटना अधिसूचना\n\n{{framework}} दिशानिर्देशों के तहत एक साइबर घटना की रिपोर्ट।\nप्रकार: {{incident_type}}\nगंभीरता: {{severity}}\nरिपोर्टिंग की समय सीमा: {{deadline}}',
    'pt-BR':
      '🔔 Notificação de Incidente\n\nUm incidente cibernético foi relatado conforme as diretrizes da {{framework}}.\nTipo: {{incident_type}}\nSeveridade: {{severity}}\nPrazo de comunicação: {{deadline}}',
    'en-ZA':
      '🔔 Incident Notification\n\nA cyber incident has been reported under {{framework}} guidelines.\nType: {{incident_type}}\nSeverity: {{severity}}\nReporting deadline: {{deadline}}',
  },
  regulatory_update: {
    'en-IN':
      '📰 Regulatory Update\n\n{{framework}} has issued a new update.\nTitle: {{title}}\nEffective date: {{effective_date}}\nSummary: {{summary}}',
    hi: '📰 नियामक अपडेट\n\n{{framework}} ने एक नया अपडेट जारी किया है।\nशीर्षक: {{title}}\nप्रभावी तिथि: {{effective_date}}\nसारांश: {{summary}}',
    'pt-BR':
      '📰 Atualização Regulatória\n\nA {{framework}} emitiu uma nova atualização.\nTítulo: {{title}}\nData de vigência: {{effective_date}}\nResumo: {{summary}}',
    'en-ZA':
      '📰 Regulatory Update\n\n{{framework}} has issued a new update.\nTitle: {{title}}\nEffective date: {{effective_date}}\nSummary: {{summary}}',
  },
};

// ─── Template Interpolation ─────────────────────────────────────────────────

/**
 * Interpolate `{{key}}` placeholders in a template string with values from a metadata map.
 * Missing keys are left as-is.
 */
function interpolate(template: string, metadata: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) => metadata[key] ?? match);
}

// ─── Date Formatting ────────────────────────────────────────────────────────

/**
 * Format a Date for a given BRICS locale, respecting the locale's timezone.
 */
export function formatDateForLocale(date: Date, locale: BRICSLocale): string {
  const localeConfig = LOCALE_CONFIGS[locale];
  return new Intl.DateTimeFormat(locale, {
    ...localeConfig.dateFormat,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

// ─── Core Alerting Class ────────────────────────────────────────────────────

/**
 * BRICS Alerting Service.
 * Manages compliance alerts across India, Brazil, and South Africa with
 * multi-locale support and Telegram MarkdownV2 delivery.
 */
export class BRICSAlertingService {
  /** In-memory store of alert preferences per chat (production: use Redis/DB). */
  private preferences = new Map<number, AlertPreferences>();

  /**
   * Register or update alert preferences for a chat.
   * @param prefs - Full alert preference object
   */
  setPreferences(prefs: AlertPreferences): void {
    this.preferences.set(prefs.chatId, prefs);
    logger.info({ chatId: prefs.chatId, country: prefs.country }, 'Alert preferences updated');
  }

  /**
   * Retrieve alert preferences for a chat.
   * @param chatId - Telegram chat ID
   * @returns Stored preferences or undefined
   */
  getPreferences(chatId: number): AlertPreferences | undefined {
    return this.preferences.get(chatId);
  }

  /**
   * Enable or disable alerts for a chat.
   * @param chatId - Telegram chat ID
   * @param enabled - Whether alerts are enabled
   * @returns true if preferences existed and were updated
   */
  toggleAlerts(chatId: number, enabled: boolean): boolean {
    const prefs = this.preferences.get(chatId);
    if (!prefs) return false;
    prefs.enabled = enabled;
    this.preferences.set(chatId, prefs);
    logger.info({ chatId, enabled }, 'Alerts toggled');
    return true;
  }

  /**
   * Build a formatted Telegram message for a compliance alert.
   * @param alert - The compliance alert to format
   * @param locale - Target locale for formatting
   * @returns MarkdownV2-formatted message string
   */
  formatAlert(alert: ComplianceAlert, locale: BRICSLocale): string {
    const template = ALERT_TEMPLATES[alert.category]?.[locale];
    if (!template) {
      logger.warn({ category: alert.category, locale }, 'No template found for alert');
      return escapeMarkdownV2(`[${alert.category}] ${alert.messages[locale] ?? 'Alert'}`);
    }

    // Merge framework display name and formatted deadline into metadata
    const enrichedMetadata: Record<string, string> = {
      ...alert.metadata,
      framework: FRAMEWORK_NAMES[locale][alert.framework],
    };
    if (alert.deadline) {
      enrichedMetadata.deadline = formatDateForLocale(alert.deadline, locale);
    }

    const rawMessage = interpolate(template, enrichedMetadata);
    const severityLabel = SEVERITY_LABELS[locale][alert.severity];
    const severityEmoji = SEVERITY_EMOJI[alert.severity];

    // Build final MarkdownV2 message
    const header = `${severityEmoji} ${bold(severityLabel)}`;
    const body = escapeMarkdownV2(rawMessage);
    const footer = `\n\n${italic('AuditorSEC BRICS Compliance')} \\| ${code(alert.id)}`;

    const message = `${header}\n\n${body}${footer}`;

    // Truncate if exceeding Telegram limit
    if (message.length > TELEGRAM_MAX_MESSAGE_LENGTH) {
      return message.slice(0, TELEGRAM_MAX_MESSAGE_LENGTH - 3) + '\\.\\.\\.' ;
    }

    return message;
  }

  /**
   * Determine which chats should receive a given alert based on their preferences.
   * Filters by: enabled, country/framework match, minimum severity.
   * @param alert - The alert to route
   * @returns Array of chat IDs that should receive this alert
   */
  routeAlert(alert: ComplianceAlert): number[] {
    const recipients: number[] = [];

    for (const [chatId, prefs] of this.preferences) {
      if (!prefs.enabled) continue;
      if (prefs.country !== alert.country) continue;
      if (!prefs.frameworks.includes(alert.framework)) continue;
      if (SEVERITY_ORDER[alert.severity] < SEVERITY_ORDER[prefs.minSeverity]) continue;
      recipients.push(chatId);
    }

    logger.debug({ alertId: alert.id, recipientCount: recipients.length }, 'Alert routed');
    return recipients;
  }

  /**
   * Send an alert to all eligible recipients via Telegram.
   * @param alert - The compliance alert to dispatch
   * @returns Number of messages successfully sent
   */
  async dispatchAlert(alert: ComplianceAlert): Promise<number> {
    const recipients = this.routeAlert(alert);
    let sentCount = 0;

    for (const chatId of recipients) {
      const prefs = this.preferences.get(chatId)!;
      const message = this.formatAlert(alert, prefs.locale);

      try {
        await this.sendTelegramMessage({
          chat_id: chatId,
          text: message,
          parse_mode: 'MarkdownV2',
        });
        sentCount++;
      } catch (err) {
        logger.error({ chatId, alertId: alert.id, err }, 'Failed to send alert');
      }
    }

    logger.info({ alertId: alert.id, sentCount, totalRecipients: recipients.length }, 'Alert dispatched');
    return sentCount;
  }

  /**
   * Send a message via the Telegram Bot API.
   * @param payload - Telegram sendMessage payload
   */
  private async sendTelegramMessage(payload: TelegramSendMessagePayload): Promise<void> {
    const url = telegramApiUrl('sendMessage');
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Telegram API error ${response.status}: ${body}`);
    }
  }
}

// ─── Pre-built Alert Factories ──────────────────────────────────────────────

/**
 * Create a SEBI CSCRF audit deadline alert.
 * SEBI mandates quarterly cyber audits for market infrastructure institutions.
 */
export function createSEBIAuditDeadlineAlert(params: {
  entity: string;
  deadline: Date;
  action: string;
}): ComplianceAlert {
  return {
    id: `SEBI-CSCRF-${Date.now()}`,
    country: 'IN',
    framework: 'SEBI_CSCRF',
    category: 'audit_deadline',
    severity: 'HIGH',
    messages: {},
    deadline: params.deadline,
    metadata: {
      entity: params.entity,
      action: params.action,
    },
    createdAt: new Date(),
  };
}

/**
 * Create an RBI/CERT-In cyber incident notification alert.
 * CERT-In requires reporting within 6 hours of discovery.
 */
export function createCERTInIncidentAlert(params: {
  incidentType: string;
  severity: AlertSeverity;
  deadline: Date;
}): ComplianceAlert {
  return {
    id: `CERT-IN-${Date.now()}`,
    country: 'IN',
    framework: 'RBI_CERT_IN',
    category: 'incident_notification',
    severity: params.severity,
    messages: {},
    deadline: params.deadline,
    metadata: {
      incident_type: params.incidentType,
      severity: params.severity,
    },
    createdAt: new Date(),
  };
}

/**
 * Create an LGPD 3-day breach notification alert.
 * LGPD requires notifying ANPD within 3 business days of a confirmed breach.
 */
export function createLGPDBreachAlert(params: {
  incidentId: string;
  affectedCount: string;
}): ComplianceAlert {
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 3);

  return {
    id: `LGPD-BREACH-${Date.now()}`,
    country: 'BR',
    framework: 'LGPD',
    category: 'breach_notification',
    severity: 'CRITICAL',
    messages: {},
    deadline,
    metadata: {
      incident_id: params.incidentId,
      affected_count: params.affectedCount,
      timeframe: '3 business days',
    },
    createdAt: new Date(),
  };
}

/**
 * Create an ANPD compliance update alert.
 */
export function createANPDComplianceAlert(params: {
  title: string;
  effectiveDate: string;
  summary: string;
}): ComplianceAlert {
  return {
    id: `ANPD-${Date.now()}`,
    country: 'BR',
    framework: 'ANPD',
    category: 'regulatory_update',
    severity: 'MEDIUM',
    messages: {},
    metadata: {
      title: params.title,
      effective_date: params.effectiveDate,
      summary: params.summary,
    },
    createdAt: new Date(),
  };
}

/**
 * Create a Joint Standard 2 compliance deadline alert.
 * Applicable to all South African financial institutions.
 */
export function createJointStandard2Alert(params: {
  requirement: string;
  deadline: Date;
  status: string;
}): ComplianceAlert {
  return {
    id: `JS2-${Date.now()}`,
    country: 'ZA',
    framework: 'JOINT_STANDARD_2',
    category: 'compliance_deadline',
    severity: 'HIGH',
    messages: {},
    deadline: params.deadline,
    metadata: {
      requirement: params.requirement,
      status: params.status,
    },
    createdAt: new Date(),
  };
}

/**
 * Create a Joint Standard 2 financial institution audit reminder.
 */
export function createJointStandard2AuditAlert(params: {
  entity: string;
  deadline: Date;
  action: string;
}): ComplianceAlert {
  return {
    id: `JS2-AUDIT-${Date.now()}`,
    country: 'ZA',
    framework: 'JOINT_STANDARD_2',
    category: 'audit_deadline',
    severity: 'HIGH',
    messages: {},
    deadline: params.deadline,
    metadata: {
      entity: params.entity,
      action: params.action,
    },
    createdAt: new Date(),
  };
}
