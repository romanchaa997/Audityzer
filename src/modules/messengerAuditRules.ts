/**
 * Messenger Security Audit Checklist Engine
 * ГО Digital / AuditorSEC — universal 6-module audit methodology
 *
 * Модулі:
 * 1. inventoryChannels — інвентаризація месенджерів та класифікація даних
 * 2. assessTechnicalRisk — технічна оцінка (e2e, ключі, юрисдикція)
 * 3. evaluateOrgPolicies — організаційні політики комунікацій
 * 4. auditAccessControl — контроль доступу та журналювання
 * 5. analyzeIncidents — аналіз інцидентів та регуляторне відображення
 * 6. recommendMigration — план міграції на безпечні платформи
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Тип даних, що передається через месенджер */
export type DataClassification = 'PII' | 'financial' | 'military' | 'HR' | 'legal';

/** Профіль месенджер-платформи */
export interface MessengerProfile {
  name: string;
  e2eEncryption: boolean;
  keyStorage: 'local' | 'server' | 'hybrid';
  serverJurisdiction: string;
  openSource: boolean;
  auditLogCapability: boolean;
  mfaSupport: boolean;
  dataTypes: DataClassification[];
}

/** Категорія ризику */
export type RiskCategory = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

/** Результат оцінки ризику платформи */
export interface RiskScore {
  platform: string;
  score: number; // 0-10
  category: RiskCategory;
  findings: string[];
  recommendations: string[];
}

/** Регуляторний фреймворк */
export type RegulatoryFramework = 'DSSZI' | 'NBU' | 'NKCPFR' | 'GDPR' | 'NIS2' | 'wartime';

/** Контекст аудиту */
export interface AuditContext {
  organizationType: 'government' | 'military' | 'financial' | 'commercial' | 'ngo';
  regulatoryFramework: RegulatoryFramework[];
  criticalRoles: boolean;
}

/** Результат інвентаризації каналів */
export interface ChannelInventory {
  platform: string;
  dataClassification: DataClassification[];
  userCount: number;
  approvedForUse: boolean;
  notes: string;
}

/** Результат технічної оцінки */
export interface TechnicalAssessment {
  platform: string;
  e2eStatus: 'full' | 'partial' | 'none';
  keyStorageRisk: 'low' | 'medium' | 'high';
  jurisdictionRisk: 'low' | 'medium' | 'high';
  policyPressureCases: string[];
  overallRisk: RiskCategory;
}

/** Політики організації */
export interface OrgPolicyEvaluation {
  hasCommPolicy: boolean;
  hasBYODPolicy: boolean;
  roleBasedRestrictions: boolean;
  gaps: string[];
  recommendations: string[];
}

/** Контроль доступу */
export interface AccessControlAudit {
  platform: string;
  adminRightsReviewed: boolean;
  offboardingProcess: boolean;
  actionLogging: boolean;
  findings: string[];
}

/** Аналіз інцидентів */
export interface IncidentAnalysis {
  pastIncidents: string[];
  lessonsLearned: string[];
  regulatoryMapping: Record<RegulatoryFramework, string[]>;
}

/** Рекомендації з міграції */
export interface MigrationRecommendation {
  fromPlatform: string;
  toPlatform: string;
  riskReduction: number;
  effort: 'low' | 'medium' | 'high';
  steps: string[];
  policyTemplateRef: string;
}

/** Звіт аудиту */
export interface AuditReport {
  generatedAt: string;
  context: AuditContext;
  riskMatrix: RiskScore[];
  gapAnalysis: { framework: RegulatoryFramework; gaps: string[] }[];
  migrationPlan: MigrationRecommendation[];
}

// ---------------------------------------------------------------------------
// Built-in messenger profiles
// ---------------------------------------------------------------------------

/**
 * Вбудовані профілі популярних месенджерів.
 * Дані базуються на публічній документації станом на 2024-2025 рр.
 */
export const BUILTIN_PROFILES: MessengerProfile[] = [
  {
    name: 'Telegram',
    e2eEncryption: false, // not default in groups / cloud chats
    keyStorage: 'server',
    serverJurisdiction: 'UAE/Dubai',
    openSource: false, // client open, server closed
    auditLogCapability: false,
    mfaSupport: true,
    dataTypes: ['PII', 'financial', 'HR', 'legal'],
  },
  {
    name: 'Viber',
    e2eEncryption: true,
    keyStorage: 'local',
    serverJurisdiction: 'Luxembourg',
    openSource: false,
    auditLogCapability: false,
    mfaSupport: false,
    dataTypes: ['PII', 'HR'],
  },
  {
    name: 'WhatsApp',
    e2eEncryption: true,
    keyStorage: 'local',
    serverJurisdiction: 'USA',
    openSource: false,
    auditLogCapability: false,
    mfaSupport: true,
    dataTypes: ['PII', 'financial', 'HR'],
  },
  {
    name: 'Signal',
    e2eEncryption: true,
    keyStorage: 'local',
    serverJurisdiction: 'USA',
    openSource: true,
    auditLogCapability: false,
    mfaSupport: true,
    dataTypes: ['PII', 'financial', 'military', 'HR', 'legal'],
  },
  {
    name: 'iMessage',
    e2eEncryption: true,
    keyStorage: 'hybrid',
    serverJurisdiction: 'USA',
    openSource: false,
    auditLogCapability: false,
    mfaSupport: true,
    dataTypes: ['PII', 'HR'],
  },
  {
    name: 'Slack',
    e2eEncryption: false,
    keyStorage: 'server',
    serverJurisdiction: 'USA',
    openSource: false,
    auditLogCapability: true,
    mfaSupport: true,
    dataTypes: ['PII', 'financial', 'HR', 'legal'],
  },
  {
    name: 'Discord',
    e2eEncryption: false,
    keyStorage: 'server',
    serverJurisdiction: 'USA',
    openSource: false,
    auditLogCapability: true,
    mfaSupport: true,
    dataTypes: ['PII'],
  },
  {
    name: 'Teams',
    e2eEncryption: false,
    keyStorage: 'server',
    serverJurisdiction: 'USA',
    openSource: false,
    auditLogCapability: true,
    mfaSupport: true,
    dataTypes: ['PII', 'financial', 'HR', 'legal'],
  },
  {
    name: 'Matrix',
    e2eEncryption: true,
    keyStorage: 'local',
    serverJurisdiction: 'self-hosted',
    openSource: true,
    auditLogCapability: true,
    mfaSupport: true,
    dataTypes: ['PII', 'financial', 'military', 'HR', 'legal'],
  },
  {
    name: 'Email',
    e2eEncryption: false, // unless S/MIME or PGP configured
    keyStorage: 'server',
    serverJurisdiction: 'varies',
    openSource: false,
    auditLogCapability: true,
    mfaSupport: true,
    dataTypes: ['PII', 'financial', 'HR', 'legal'],
  },
];

// ---------------------------------------------------------------------------
// Telegram-specific risk flags
// ---------------------------------------------------------------------------

const TELEGRAM_FINDINGS: string[] = [
  'Server-side key storage — Telegram holds decryption keys on its servers',
  'UAE/Dubai jurisdiction concerns — servers outside EU/US legal frameworks',
  'Government pressure incidents (France 2024) — CEO detained, compliance risks',
  'No e2e encryption by default in group chats or cloud chats',
  'Closed-source server — impossible to audit server-side processing',
];

const TELEGRAM_RECOMMENDATIONS: string[] = [
  'Telegram ban recommended for critical roles on work devices',
  'Migrate sensitive communications to Signal or Matrix',
  'If Telegram must be used, enforce Secret Chats for 1-on-1 only',
  'Prohibit sharing of classified / military / financial data via Telegram',
  'Implement monitoring for Telegram usage on corporate devices',
];

// ---------------------------------------------------------------------------
// Risk scoring helpers
// ---------------------------------------------------------------------------

function categoryFromScore(score: number): RiskCategory {
  if (score >= 8) return 'CRITICAL';
  if (score >= 6) return 'HIGH';
  if (score >= 4) return 'MEDIUM';
  return 'LOW';
}

/**
 * Обчислення поправочного коефіцієнту на основі організаційного контексту.
 * Для критичних ролей та військових/державних структур оцінка зростає.
 */
function contextMultiplier(context: AuditContext): number {
  let m = 1.0;
  if (context.criticalRoles) m += 0.3;
  if (context.organizationType === 'military') m += 0.4;
  if (context.organizationType === 'government') m += 0.2;
  if (context.regulatoryFramework.includes('wartime')) m += 0.3;
  if (context.regulatoryFramework.includes('DSSZI')) m += 0.1;
  if (context.regulatoryFramework.includes('NBU')) m += 0.1;
  return m;
}

// ---------------------------------------------------------------------------
// Core functions
// ---------------------------------------------------------------------------

/**
 * Розрахунок ризик-балу для месенджер-платформи.
 *
 * Методологія: базовий бал формується за технічними характеристиками (e2e, ключі,
 * юрисдикція, відкритий код, аудит-лог), далі коригується контекстним множником.
 */
export function calculateRiskScore(
  profile: MessengerProfile,
  context: AuditContext,
): RiskScore {
  let base = 0;
  const findings: string[] = [];
  const recommendations: string[] = [];

  // --- E2E encryption ---
  if (!profile.e2eEncryption) {
    base += 3;
    findings.push(`${profile.name}: no e2e encryption by default`);
    recommendations.push(`Enable or migrate to a platform with default e2e encryption`);
  }

  // --- Key storage ---
  if (profile.keyStorage === 'server') {
    base += 2;
    findings.push(`${profile.name}: server-side key storage`);
    recommendations.push(`Prefer platforms with local key storage`);
  } else if (profile.keyStorage === 'hybrid') {
    base += 1;
    findings.push(`${profile.name}: hybrid key storage — partial server exposure`);
  }

  // --- Jurisdiction ---
  const riskyJurisdictions = ['UAE/Dubai', 'Russia', 'China', 'varies'];
  if (riskyJurisdictions.includes(profile.serverJurisdiction)) {
    base += 2;
    findings.push(`${profile.name}: server jurisdiction ${profile.serverJurisdiction} poses regulatory risk`);
    recommendations.push(`Prefer platforms within EU or self-hosted jurisdiction`);
  }

  // --- Open source ---
  if (!profile.openSource) {
    base += 1;
    findings.push(`${profile.name}: closed source — cannot independently verify security`);
  }

  // --- Audit logging ---
  if (!profile.auditLogCapability) {
    base += 0.5;
    findings.push(`${profile.name}: no audit log capability`);
    recommendations.push(`Ensure audit logging for compliance (DSSZI, NBU, NKCPFR)`);
  }

  // --- MFA ---
  if (!profile.mfaSupport) {
    base += 0.5;
    findings.push(`${profile.name}: no MFA support`);
    recommendations.push(`Require MFA on all communication platforms`);
  }

  // --- Data sensitivity amplifier ---
  const sensitiveTypes: DataClassification[] = ['military', 'financial', 'legal'];
  const hasSensitive = profile.dataTypes.some((d) => sensitiveTypes.includes(d));
  if (hasSensitive && !profile.e2eEncryption) {
    base += 1;
    findings.push(`${profile.name}: sensitive data types without e2e encryption`);
  }

  // --- Telegram-specific overrides ---
  if (profile.name === 'Telegram') {
    findings.push(...TELEGRAM_FINDINGS);
    recommendations.push(...TELEGRAM_RECOMMENDATIONS);
  }

  // --- Signal-specific notes ---
  if (profile.name === 'Signal') {
    findings.push('Gold standard e2e encryption (Signal Protocol)');
    findings.push('Open source protocol — independently auditable');
    findings.push('Minimal metadata retention');
    recommendations.push('Recommended as primary secure messenger for all roles');
  }

  // Apply context multiplier and clamp
  const raw = base * contextMultiplier(context);
  const score = Math.min(10, Math.round(raw * 10) / 10);
  const category = categoryFromScore(score);

  return { platform: profile.name, score, category, findings, recommendations };
}

/**
 * Генерація повного звіту аудиту месенджерів.
 *
 * Методологія: для кожної платформи розраховується ризик-бал, далі формується
 * матриця ризиків, gap-аналіз щодо регуляторних вимог та план міграції.
 */
export function generateAuditReport(
  profiles: MessengerProfile[],
  context: AuditContext,
): AuditReport {
  const riskMatrix = profiles.map((p) => calculateRiskScore(p, context));

  // Gap analysis per regulatory framework
  const gapAnalysis = context.regulatoryFramework.map((framework) => {
    const gaps: string[] = [];
    for (const profile of profiles) {
      const rs = riskMatrix.find((r) => r.platform === profile.name);
      if (!rs) continue;

      switch (framework) {
        case 'DSSZI':
          if (!profile.auditLogCapability) gaps.push(`${profile.name}: відсутній аудит-лог (вимога ДССЗІ)`);
          if (!profile.e2eEncryption) gaps.push(`${profile.name}: відсутнє e2e шифрування (вимога ДССЗІ)`);
          if (profile.keyStorage === 'server') gaps.push(`${profile.name}: серверне зберігання ключів (вимога ДССЗІ)`);
          break;
        case 'NBU':
          if (!profile.e2eEncryption) gaps.push(`${profile.name}: невідповідність вимогам НБУ щодо шифрування`);
          if (!profile.mfaSupport) gaps.push(`${profile.name}: відсутня MFA (вимога НБУ)`);
          break;
        case 'NKCPFR':
          if (!profile.auditLogCapability) gaps.push(`${profile.name}: відсутній аудит-лог (вимога НКЦПФР)`);
          if (profile.dataTypes.includes('financial') && !profile.e2eEncryption)
            gaps.push(`${profile.name}: фінансові дані без e2e (вимога НКЦПФР)`);
          break;
        case 'GDPR':
          if (profile.serverJurisdiction !== 'self-hosted' && !['USA', 'Luxembourg'].includes(profile.serverJurisdiction))
            gaps.push(`${profile.name}: юрисдикція ${profile.serverJurisdiction} — проблеми з адекватністю GDPR`);
          break;
        case 'NIS2':
          if (!profile.mfaSupport) gaps.push(`${profile.name}: відсутня MFA (вимога NIS2)`);
          if (!profile.auditLogCapability) gaps.push(`${profile.name}: відсутній аудит-лог (вимога NIS2)`);
          break;
        case 'wartime':
          if (profile.serverJurisdiction === 'UAE/Dubai' || profile.serverJurisdiction === 'Russia')
            gaps.push(`${profile.name}: юрисдикція ${profile.serverJurisdiction} — неприпустимо у воєнний час`);
          if (!profile.e2eEncryption && profile.dataTypes.includes('military'))
            gaps.push(`${profile.name}: військові дані без e2e — критичне порушення`);
          break;
      }
    }
    return { framework, gaps };
  });

  // Migration recommendations — move HIGH/CRITICAL to Signal or Matrix
  const migrationPlan: MigrationRecommendation[] = [];
  for (const rs of riskMatrix) {
    if (rs.category === 'CRITICAL' || rs.category === 'HIGH') {
      const profile = profiles.find((p) => p.name === rs.platform);
      if (!profile) continue;

      const hasMilitary = profile.dataTypes.includes('military');
      const target = hasMilitary ? 'Matrix' : 'Signal';

      migrationPlan.push({
        fromPlatform: rs.platform,
        toPlatform: target,
        riskReduction: rs.score,
        effort: hasMilitary ? 'high' : 'medium',
        steps: [
          `Announce migration timeline to ${target}`,
          `Deploy ${target} ${hasMilitary ? 'on-prem instance' : 'organization-wide'}`,
          `Migrate active channels from ${rs.platform}`,
          `Enforce policy: block ${rs.platform} on managed devices`,
          `Monitor compliance for 30 days`,
        ],
        policyTemplateRef: `templates/migration-${rs.platform.toLowerCase()}-to-${target.toLowerCase()}.md`,
      });
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    context,
    riskMatrix,
    gapAnalysis,
    migrationPlan,
  };
}

// ---------------------------------------------------------------------------
// 6 Checklist Modules
// ---------------------------------------------------------------------------

/**
 * Модуль 1 — Інвентаризація каналів комунікації.
 * Повертає інвентарний перелік усіх месенджер-платформ із класифікацією даних.
 */
export function inventoryChannels(
  profiles: MessengerProfile[],
  context: AuditContext,
): ChannelInventory[] {
  return profiles.map((p) => {
    const rs = calculateRiskScore(p, context);
    return {
      platform: p.name,
      dataClassification: p.dataTypes,
      userCount: 0, // to be filled during audit
      approvedForUse: rs.category === 'LOW' || rs.category === 'MEDIUM',
      notes: rs.category === 'CRITICAL' || rs.category === 'HIGH'
        ? `⚠ ${p.name} is ${rs.category} risk — review required`
        : `${p.name} is within acceptable risk threshold`,
    };
  });
}

/**
 * Модуль 2 — Технічна оцінка ризиків.
 * Аналізує e2e шифрування, зберігання ключів, юрисдикцію серверів,
 * випадки тиску з боку урядів.
 */
export function assessTechnicalRisk(
  profiles: MessengerProfile[],
): TechnicalAssessment[] {
  return profiles.map((p) => {
    const e2eStatus: 'full' | 'partial' | 'none' = p.e2eEncryption
      ? p.name === 'Telegram' ? 'partial' : 'full'
      : 'none';

    const keyStorageRisk: 'low' | 'medium' | 'high' =
      p.keyStorage === 'local' ? 'low' : p.keyStorage === 'hybrid' ? 'medium' : 'high';

    const riskyJurisdictions = ['UAE/Dubai', 'Russia', 'China'];
    const jurisdictionRisk: 'low' | 'medium' | 'high' =
      p.serverJurisdiction === 'self-hosted' ? 'low'
        : riskyJurisdictions.includes(p.serverJurisdiction) ? 'high'
          : 'medium';

    const policyPressureCases: string[] = [];
    if (p.name === 'Telegram') {
      policyPressureCases.push('France 2024: CEO Pavel Durov detained — compliance with law enforcement');
      policyPressureCases.push('Multiple government bans (Russia 2018-2020, Iran, China)');
    }
    if (p.name === 'WhatsApp') {
      policyPressureCases.push('India 2021: traceability requirements threaten e2e');
      policyPressureCases.push('EU 2023-2024: Chat Control regulation proposals');
    }

    const riskFactors = [e2eStatus === 'none' ? 3 : e2eStatus === 'partial' ? 1.5 : 0,
      keyStorageRisk === 'high' ? 2 : keyStorageRisk === 'medium' ? 1 : 0,
      jurisdictionRisk === 'high' ? 2 : jurisdictionRisk === 'medium' ? 1 : 0];
    const total = riskFactors.reduce((a, b) => a + b, 0);
    const overallRisk = categoryFromScore(total);

    return { platform: p.name, e2eStatus, keyStorageRisk, jurisdictionRisk, policyPressureCases, overallRisk };
  });
}

/**
 * Модуль 3 — Оцінка організаційних політик.
 * Перевіряє наявність комунікаційної політики, BYOD-правил,
 * обмежень за ролями.
 */
export function evaluateOrgPolicies(context: AuditContext): OrgPolicyEvaluation {
  const gaps: string[] = [];
  const recommendations: string[] = [];

  // Default: assume policies not yet in place (audit will verify)
  const hasCommPolicy = false;
  const hasBYODPolicy = false;
  const roleBasedRestrictions = false;

  if (!hasCommPolicy) {
    gaps.push('No formal communications policy defined');
    recommendations.push('Draft and approve a communications policy specifying allowed platforms per data classification');
  }
  if (!hasBYODPolicy) {
    gaps.push('No BYOD (Bring Your Own Device) policy');
    recommendations.push('Implement BYOD policy with MDM requirements for personal devices accessing work communications');
  }
  if (!roleBasedRestrictions) {
    gaps.push('No role-based communication restrictions');
    recommendations.push('Define role-based access: critical roles → Signal/Matrix only; general staff → approved list');
  }

  if (context.organizationType === 'military' || context.organizationType === 'government') {
    recommendations.push('Mandate security clearance review for communication platform access');
    recommendations.push('Implement compartmentalized channels per classification level');
  }

  if (context.regulatoryFramework.includes('wartime')) {
    recommendations.push('Enforce wartime communication protocols — ban non-approved messengers');
    gaps.push('Wartime-specific messenger restrictions not formalized');
  }

  return { hasCommPolicy, hasBYODPolicy, roleBasedRestrictions, gaps, recommendations };
}

/**
 * Модуль 4 — Аудит контролю доступу.
 * Перевіряє адмін-права, процес offboarding, журналювання дій.
 */
export function auditAccessControl(
  profiles: MessengerProfile[],
): AccessControlAudit[] {
  return profiles.map((p) => {
    const findings: string[] = [];

    if (!p.auditLogCapability) {
      findings.push(`${p.name}: no built-in audit logging — use external monitoring`);
    }

    if (p.name === 'Telegram' || p.name === 'WhatsApp' || p.name === 'Signal') {
      findings.push(`${p.name}: no centralized admin console — offboarding difficult`);
    }

    if (p.name === 'Slack' || p.name === 'Teams') {
      findings.push(`${p.name}: ensure admin rights follow least-privilege principle`);
    }

    return {
      platform: p.name,
      adminRightsReviewed: false, // to be verified during audit
      offboardingProcess: p.auditLogCapability, // proxy: platforms with admin console
      actionLogging: p.auditLogCapability,
      findings,
    };
  });
}

/**
 * Модуль 5 — Аналіз інцидентів.
 * Збирає минулі інциденти, уроки та відображення на регуляторні вимоги
 * (ДССЗІ, НБУ, НКЦПФР, воєнний стан).
 */
export function analyzeIncidents(context: AuditContext): IncidentAnalysis {
  const pastIncidents: string[] = [
    'Telegram channel compromise — unauthorized admin added via SIM-swap',
    'WhatsApp group data leak — ex-employee retained access post-offboarding',
    'Email phishing via spoofed domain targeting financial department',
    'Viber group used for unofficial military coordination — OPSEC breach',
  ];

  const lessonsLearned: string[] = [
    'Enforce immediate revocation of all messenger access upon offboarding',
    'Require hardware MFA (FIDO2) for admin accounts on all platforms',
    'Prohibit use of personal phone numbers for work messenger registration',
    'Regular audit of group memberships (monthly for CRITICAL, quarterly for others)',
  ];

  const regulatoryMapping: Record<RegulatoryFramework, string[]> = {
    DSSZI: [
      'ДССЗІ вимагає шифрування каналів зв\'язку для обробки ІзОД',
      'Обов\'язкова реєстрація інцидентів безпеки протягом 24 годин',
    ],
    NBU: [
      'НБУ: вимоги до захисту банківської таємниці в електронних комунікаціях',
      'Обов\'язковий аудит каналів передачі фінансових даних',
    ],
    NKCPFR: [
      'НКЦПФР: обов\'язкова архівація комунікацій з клієнтами',
      'Контроль витоку інсайдерської інформації через месенджери',
    ],
    GDPR: [
      'GDPR Art.32: appropriate technical measures for communication channels',
      'Data breach notification within 72 hours for messenger incidents',
    ],
    NIS2: [
      'NIS2: incident reporting for essential and important entities',
      'Supply chain security assessment for communication platforms',
    ],
    wartime: [
      'Воєнний стан: заборона передачі координат та дислокацій через незахищені канали',
      'Обов\'язкове використання лише затверджених засобів зв\'язку',
      'Негайне повідомлення СБУ про компрометацію каналів зв\'язку',
    ],
  };

  return { pastIncidents, lessonsLearned, regulatoryMapping };
}

/**
 * Модуль 6 — Рекомендації з міграції.
 * Формує план переходу на безпечні платформи (Signal/Matrix/on-prem)
 * із ризик-балами та посиланнями на шаблони політик.
 */
export function recommendMigration(
  profiles: MessengerProfile[],
  context: AuditContext,
): MigrationRecommendation[] {
  const report = generateAuditReport(profiles, context);
  return report.migrationPlan;
}
