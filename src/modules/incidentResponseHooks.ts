/**
 * Incident Response Runbook Integration for Audityzer
 * ГО Digital / AuditorSEC — 7-step response flow + SARIF reporting
 *
 * Severity levels: P1 (Critical), P2 (High), P3 (Medium), P4 (Low)
 * State machine: immediateAssessment → impactAssessment → initialResponse →
 *   resolutionActions → verification → communicationUpdate → postIncident
 */

// ---------------------------------------------------------------------------
// Types & Interfaces
// ---------------------------------------------------------------------------

/** Severity levels with SLA response times */
export type SeverityLevel = 'P1' | 'P2' | 'P3' | 'P4';

export interface SeveritySLA {
  level: SeverityLevel;
  label: string;
  responseTimeMinutes: number;
  description: string;
}

export const SEVERITY_DEFINITIONS: Record<SeverityLevel, SeveritySLA> = {
  P1: { level: 'P1', label: 'Critical', responseTimeMinutes: 15, description: 'Complete service outage or security breach affecting all users' },
  P2: { level: 'P2', label: 'High', responseTimeMinutes: 60, description: 'Major degradation or security incident affecting significant user base' },
  P3: { level: 'P3', label: 'Medium', responseTimeMinutes: 120, description: 'Partial degradation affecting subset of users or non-critical systems' },
  P4: { level: 'P4', label: 'Low', responseTimeMinutes: 240, description: 'Minor issue with workaround available, minimal user impact' },
};

/** Response team roles */
export interface ResponseTeam {
  technicalLead: ContactInfo;
  communicationsLead: ContactInfo;
  operationsLead: ContactInfo;
}

export interface ContactInfo {
  name: string;
  role: string;
  phone: string;
  email: string;
  slackHandle: string;
}

/** Escalation contacts */
export interface EscalationContacts {
  technical: ContactInfo[];
  management: ContactInfo[];
  government: GovernmentContact[];
}

export interface GovernmentContact {
  agency: string;
  department: string;
  phone: string;
  email: string;
  notificationRequirement: string;
}

/** 7-step response flow states */
export type ResponseStep =
  | 'immediateAssessment'
  | 'impactAssessment'
  | 'initialResponse'
  | 'resolutionActions'
  | 'verification'
  | 'communicationUpdate'
  | 'postIncident';

export const RESPONSE_STEP_ORDER: ResponseStep[] = [
  'immediateAssessment',
  'impactAssessment',
  'initialResponse',
  'resolutionActions',
  'verification',
  'communicationUpdate',
  'postIncident',
];

export interface StepConfig {
  step: ResponseStep;
  name: string;
  maxDurationMinutes: number;
  actions: string[];
}

export const STEP_CONFIGS: Record<ResponseStep, StepConfig> = {
  immediateAssessment: {
    step: 'immediateAssessment',
    name: 'Immediate Assessment',
    maxDurationMinutes: 5,
    actions: [
      'Run system health check (API endpoints, service status)',
      'Check database connectivity and replication lag',
      'Verify load balancer health and traffic distribution',
      'Check monitoring dashboards for anomalies',
    ],
  },
  impactAssessment: {
    step: 'impactAssessment',
    name: 'Impact Assessment',
    maxDurationMinutes: 10,
    actions: [
      'Determine scope: which services are affected',
      'Estimate user impact: count and geography',
      'Identify upstream/downstream dependency failures',
      'Classify data exposure if security incident',
    ],
  },
  initialResponse: {
    step: 'initialResponse',
    name: 'Initial Response',
    maxDurationMinutes: 15,
    actions: [
      'Activate incident response team',
      'Create dedicated Slack channel (#incident-YYYY-MM-DD-NNN)',
      'Send stakeholder notification (severity-based template)',
      'Start incident timeline documentation',
    ],
  },
  resolutionActions: {
    step: 'resolutionActions',
    name: 'Resolution Actions',
    maxDurationMinutes: 60,
    actions: [
      'If deployment issue: initiate rollback to last known good version',
      'If scaling issue: scale infrastructure (horizontal/vertical)',
      'If database issue: execute DB fix runbook (failover, repair, restore)',
      'If security issue: execute containment procedures',
      'Verify fix in staging before applying to production',
    ],
  },
  verification: {
    step: 'verification',
    name: 'Verification',
    maxDurationMinutes: 15,
    actions: [
      'Run full health check suite',
      'Verify monitoring metrics returning to baseline',
      'Confirm user-facing functionality restored',
      'Check error rates and latency percentiles',
    ],
  },
  communicationUpdate: {
    step: 'communicationUpdate',
    name: 'Communication Update',
    maxDurationMinutes: 15,
    actions: [
      'Update status page (investigating → identified → monitoring → resolved)',
      'Send stakeholder resolution notification',
      'Notify government contacts if required by regulation',
      'Post user-facing communication if public impact',
    ],
  },
  postIncident: {
    step: 'postIncident',
    name: 'Post-Incident',
    maxDurationMinutes: 0, // ongoing
    actions: [
      'Schedule post-mortem (P1: 24h, P2: 48h, P3: 48h, P4: 1 week)',
      'Collect timeline and evidence',
      'Draft incident report',
      'Identify follow-up action items',
      'Update runbooks based on lessons learned',
    ],
  },
};

/** Post-mortem deadlines by severity */
export const POSTMORTEM_DEADLINES: Record<SeverityLevel, string> = {
  P1: '24 hours',
  P2: '48 hours',
  P3: '48 hours',
  P4: '1 week',
};

/** Incident state */
export type IncidentStatus = 'open' | 'investigating' | 'identified' | 'monitoring' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  title: string;
  severity: SeverityLevel;
  status: IncidentStatus;
  currentStep: ResponseStep;
  team: ResponseTeam | null;
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEntry[];
  affectedSystems: string[];
  affectedUsers: number;
  geography: string[];
  resolutionSummary: string;
}

export interface TimelineEntry {
  timestamp: string;
  step: ResponseStep;
  action: string;
  actor: string;
  notes: string;
}

/** Health check result */
export interface HealthCheckResult {
  system: string;
  status: 'healthy' | 'degraded' | 'down';
  latencyMs: number;
  details: string;
}

/** Security containment action */
export type ContainmentAction = 'block_ip' | 'disable_account' | 'preserve_evidence' | 'isolate_system' | 'revoke_tokens';

export interface SecurityContainment {
  action: ContainmentAction;
  target: string;
  executedAt: string;
  executedBy: string;
  reversible: boolean;
  notes: string;
}

/** Communication templates */
export interface CommunicationTemplate {
  type: 'internal' | 'government' | 'user';
  subject: string;
  body: string;
  recipients: string[];
}

/** SARIF integration types */
export interface SarifRun {
  tool: { driver: { name: string; version: string; informationUri: string; rules: SarifRule[] } };
  results: SarifResult[];
}

export interface SarifRule {
  id: string;
  name: string;
  shortDescription: { text: string };
  fullDescription: { text: string };
  helpUri: string;
  properties: { severity: string; category: string; tags: string[] };
}

export interface SarifResult {
  ruleId: string;
  level: 'error' | 'warning' | 'note' | 'none';
  message: { text: string };
  locations: { physicalLocation: { artifactLocation: { uri: string } } }[];
  properties: Record<string, unknown>;
}

export interface SarifReport {
  $schema: string;
  version: string;
  runs: SarifRun[];
}

// ---------------------------------------------------------------------------
// State machine
// ---------------------------------------------------------------------------

/**
 * Create a new incident and initialize the response state machine.
 */
export function createIncident(
  title: string,
  severity: SeverityLevel,
  affectedSystems: string[],
): Incident {
  const now = new Date().toISOString();
  return {
    id: `INC-${Date.now()}`,
    title,
    severity,
    status: 'open',
    currentStep: 'immediateAssessment',
    team: null,
    createdAt: now,
    updatedAt: now,
    timeline: [
      {
        timestamp: now,
        step: 'immediateAssessment',
        action: 'Incident created',
        actor: 'system',
        notes: `Severity: ${severity} — ${SEVERITY_DEFINITIONS[severity].description}`,
      },
    ],
    affectedSystems,
    affectedUsers: 0,
    geography: [],
    resolutionSummary: '',
  };
}

/**
 * Advance the incident to the next step in the response flow.
 * Returns the updated incident or null if already at the final step.
 */
export function advanceStep(incident: Incident, actor: string, notes: string): Incident | null {
  const currentIndex = RESPONSE_STEP_ORDER.indexOf(incident.currentStep);
  if (currentIndex === RESPONSE_STEP_ORDER.length - 1) return null; // already at postIncident

  const nextStep = RESPONSE_STEP_ORDER[currentIndex + 1];
  const now = new Date().toISOString();

  const statusMap: Partial<Record<ResponseStep, IncidentStatus>> = {
    immediateAssessment: 'investigating',
    impactAssessment: 'investigating',
    initialResponse: 'identified',
    resolutionActions: 'identified',
    verification: 'monitoring',
    communicationUpdate: 'resolved',
    postIncident: 'closed',
  };

  return {
    ...incident,
    currentStep: nextStep,
    status: statusMap[nextStep] ?? incident.status,
    updatedAt: now,
    timeline: [
      ...incident.timeline,
      {
        timestamp: now,
        step: nextStep,
        action: `Advanced to ${STEP_CONFIGS[nextStep].name}`,
        actor,
        notes,
      },
    ],
  };
}

/**
 * Assign a response team to the incident.
 */
export function assignTeam(incident: Incident, team: ResponseTeam): Incident {
  return {
    ...incident,
    team,
    updatedAt: new Date().toISOString(),
    timeline: [
      ...incident.timeline,
      {
        timestamp: new Date().toISOString(),
        step: incident.currentStep,
        action: 'Response team assigned',
        actor: 'system',
        notes: `Tech Lead: ${team.technicalLead.name}, Comms: ${team.communicationsLead.name}, Ops: ${team.operationsLead.name}`,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Step 1: Immediate Assessment — health checks
// ---------------------------------------------------------------------------

/**
 * Execute health checks for system, database, and load balancer.
 * Returns mock results to be replaced with real integrations.
 */
export function runHealthChecks(systems: string[]): HealthCheckResult[] {
  return systems.map((system) => ({
    system,
    status: 'healthy' as const,
    latencyMs: 0,
    details: `Health check pending for ${system} — integrate with monitoring provider`,
  }));
}

// ---------------------------------------------------------------------------
// Step 2: Impact Assessment
// ---------------------------------------------------------------------------

/**
 * Record impact assessment findings on the incident.
 */
export function recordImpactAssessment(
  incident: Incident,
  affectedUsers: number,
  geography: string[],
  actor: string,
): Incident {
  return {
    ...incident,
    affectedUsers,
    geography,
    updatedAt: new Date().toISOString(),
    timeline: [
      ...incident.timeline,
      {
        timestamp: new Date().toISOString(),
        step: 'impactAssessment',
        action: 'Impact assessment recorded',
        actor,
        notes: `Users affected: ${affectedUsers}, Regions: ${geography.join(', ')}`,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Step 4: Security incident containment
// ---------------------------------------------------------------------------

/**
 * Execute security containment actions: IP blocking, account disabling,
 * evidence preservation.
 */
export function executeContainment(
  action: ContainmentAction,
  target: string,
  actor: string,
): SecurityContainment {
  const now = new Date().toISOString();

  const reversibleActions: ContainmentAction[] = ['block_ip', 'disable_account', 'revoke_tokens'];
  return {
    action,
    target,
    executedAt: now,
    executedBy: actor,
    reversible: reversibleActions.includes(action),
    notes: `Containment action ${action} executed on ${target}`,
  };
}

/**
 * Block an IP address as a containment measure.
 */
export function blockIP(ip: string, actor: string): SecurityContainment {
  return executeContainment('block_ip', ip, actor);
}

/**
 * Disable a user account as a containment measure.
 */
export function disableAccount(accountId: string, actor: string): SecurityContainment {
  return executeContainment('disable_account', accountId, actor);
}

/**
 * Preserve evidence for forensic analysis.
 */
export function preserveEvidence(resourceId: string, actor: string): SecurityContainment {
  return executeContainment('preserve_evidence', resourceId, actor);
}

// ---------------------------------------------------------------------------
// Step 6: Communication templates
// ---------------------------------------------------------------------------

/**
 * Generate an internal notification for the incident response team.
 */
export function generateInternalNotification(incident: Incident): CommunicationTemplate {
  return {
    type: 'internal',
    subject: `[${incident.severity}] ${incident.title} — Incident ${incident.id}`,
    body: [
      `Incident ID: ${incident.id}`,
      `Severity: ${incident.severity} (${SEVERITY_DEFINITIONS[incident.severity].label})`,
      `Status: ${incident.status}`,
      `Current Step: ${STEP_CONFIGS[incident.currentStep].name}`,
      `Affected Systems: ${incident.affectedSystems.join(', ')}`,
      `Affected Users: ${incident.affectedUsers}`,
      `Geography: ${incident.geography.join(', ') || 'TBD'}`,
      ``,
      `SLA Response Time: ${SEVERITY_DEFINITIONS[incident.severity].responseTimeMinutes} minutes`,
      `Created: ${incident.createdAt}`,
      ``,
      `--- Timeline ---`,
      ...incident.timeline.map(
        (e) => `[${e.timestamp}] (${e.step}) ${e.action} by ${e.actor}: ${e.notes}`,
      ),
    ].join('\n'),
    recipients: ['incident-response-team@org', 'engineering-leads@org'],
  };
}

/**
 * Generate a government notification (Ministry of Digital Transformation of Ukraine).
 */
export function generateGovernmentNotification(incident: Incident): CommunicationTemplate {
  return {
    type: 'government',
    subject: `Повідомлення про інцидент інформаційної безпеки — ${incident.id}`,
    body: [
      `Міністерство цифрової трансформації України`,
      ``,
      `Шановні колеги,`,
      ``,
      `Повідомляємо про інцидент інформаційної безпеки:`,
      ``,
      `Ідентифікатор: ${incident.id}`,
      `Рівень критичності: ${incident.severity} (${SEVERITY_DEFINITIONS[incident.severity].label})`,
      `Статус: ${incident.status}`,
      `Опис: ${incident.title}`,
      `Уражені системи: ${incident.affectedSystems.join(', ')}`,
      `Кількість постраждалих користувачів: ${incident.affectedUsers}`,
      `Географія: ${incident.geography.join(', ') || 'визначається'}`,
      `Час виявлення: ${incident.createdAt}`,
      ``,
      `Вжиті заходи:`,
      ...incident.timeline.map((e) => `- ${e.action}: ${e.notes}`),
      ``,
      `Контактна особа: ${incident.team?.technicalLead.name ?? 'TBD'}`,
      `Телефон: ${incident.team?.technicalLead.phone ?? 'TBD'}`,
      `Email: ${incident.team?.technicalLead.email ?? 'TBD'}`,
      ``,
      `З повагою,`,
      `Команда реагування на інциденти`,
    ].join('\n'),
    recipients: ['cert@dsszzi.gov.ua', 'incident@thedigital.gov.ua'],
  };
}

/**
 * Generate a user-facing communication about the incident.
 */
export function generateUserCommunication(incident: Incident): CommunicationTemplate {
  const isResolved = incident.status === 'resolved' || incident.status === 'closed';
  return {
    type: 'user',
    subject: isResolved
      ? `[Resolved] Service incident — ${incident.title}`
      : `[${incident.severity}] Service incident — ${incident.title}`,
    body: isResolved
      ? [
          `The service incident has been resolved.`,
          ``,
          `Incident: ${incident.title}`,
          `Duration: ${incident.createdAt} — ${incident.updatedAt}`,
          `Affected services: ${incident.affectedSystems.join(', ')}`,
          ``,
          `All systems are now operating normally. We apologize for any inconvenience.`,
          `A full post-mortem will be published within ${POSTMORTEM_DEADLINES[incident.severity]}.`,
        ].join('\n')
      : [
          `We are currently investigating a service incident.`,
          ``,
          `Incident: ${incident.title}`,
          `Status: ${incident.status}`,
          `Affected services: ${incident.affectedSystems.join(', ')}`,
          ``,
          `Our team is actively working to resolve this issue.`,
          `We will provide updates as more information becomes available.`,
        ].join('\n'),
    recipients: ['status-page', 'user-notifications'],
  };
}

// ---------------------------------------------------------------------------
// Step 7: Post-mortem scheduling
// ---------------------------------------------------------------------------

/**
 * Get the post-mortem deadline based on incident severity.
 */
export function getPostmortemDeadline(severity: SeverityLevel): { deadline: string; scheduleBy: Date } {
  const now = new Date();
  const hoursMap: Record<SeverityLevel, number> = { P1: 24, P2: 48, P3: 48, P4: 168 };
  const scheduleBy = new Date(now.getTime() + hoursMap[severity] * 60 * 60 * 1000);
  return { deadline: POSTMORTEM_DEADLINES[severity], scheduleBy };
}

// ---------------------------------------------------------------------------
// Escalation contacts
// ---------------------------------------------------------------------------

/**
 * Build a default escalation contacts structure.
 * Values should be filled during organizational setup.
 */
export function buildEscalationContacts(): EscalationContacts {
  return {
    technical: [
      {
        name: 'On-Call Engineer',
        role: 'Primary on-call',
        phone: '',
        email: 'oncall@org',
        slackHandle: '@oncall-eng',
      },
      {
        name: 'SRE Lead',
        role: 'SRE escalation',
        phone: '',
        email: 'sre-lead@org',
        slackHandle: '@sre-lead',
      },
    ],
    management: [
      {
        name: 'Engineering Director',
        role: 'Engineering management',
        phone: '',
        email: 'eng-director@org',
        slackHandle: '@eng-director',
      },
      {
        name: 'CTO',
        role: 'Executive escalation',
        phone: '',
        email: 'cto@org',
        slackHandle: '@cto',
      },
    ],
    government: [
      {
        agency: 'ДССЗІ (SSSCIP)',
        department: 'CERT-UA',
        phone: '+380-44-281-8828',
        email: 'cert@dsszzi.gov.ua',
        notificationRequirement: 'Within 24 hours for P1/P2 security incidents',
      },
      {
        agency: 'Міністерство цифрової трансформації',
        department: 'Ministry of Digital Transformation of Ukraine',
        phone: '',
        email: 'incident@thedigital.gov.ua',
        notificationRequirement: 'Within 48 hours for incidents affecting public services',
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// SARIF integration — generate findings for incident response gaps
// ---------------------------------------------------------------------------

const SARIF_SCHEMA = 'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json';

/**
 * Audit incident response readiness and produce a SARIF report
 * identifying gaps in the incident response process.
 */
export function generateIncidentResponseSarif(incident: Incident): SarifReport {
  const rules: SarifRule[] = [
    {
      id: 'IR-001',
      name: 'ResponseTeamNotAssigned',
      shortDescription: { text: 'Incident response team not assigned' },
      fullDescription: { text: 'Every incident must have a response team with technical lead, communications lead, and operations lead assigned within the SLA window.' },
      helpUri: 'https://audityzer.dev/docs/incident-response#team-assignment',
      properties: { severity: 'high', category: 'incident-response', tags: ['team', 'sla'] },
    },
    {
      id: 'IR-002',
      name: 'SLABreached',
      shortDescription: { text: 'Incident SLA response time breached' },
      fullDescription: { text: 'The incident was not advanced past immediate assessment within the SLA response time for its severity level.' },
      helpUri: 'https://audityzer.dev/docs/incident-response#sla',
      properties: { severity: 'critical', category: 'incident-response', tags: ['sla', 'compliance'] },
    },
    {
      id: 'IR-003',
      name: 'GovernmentNotificationMissing',
      shortDescription: { text: 'Government notification not sent' },
      fullDescription: { text: 'For P1/P2 security incidents, government notification (CERT-UA / Ministry of Digital Transformation) is required within the regulatory window.' },
      helpUri: 'https://audityzer.dev/docs/incident-response#government-notification',
      properties: { severity: 'high', category: 'incident-response', tags: ['compliance', 'government'] },
    },
    {
      id: 'IR-004',
      name: 'PostmortemNotScheduled',
      shortDescription: { text: 'Post-mortem not scheduled within deadline' },
      fullDescription: { text: 'A post-mortem review must be scheduled within the deadline appropriate to the incident severity.' },
      helpUri: 'https://audityzer.dev/docs/incident-response#postmortem',
      properties: { severity: 'medium', category: 'incident-response', tags: ['postmortem', 'process'] },
    },
    {
      id: 'IR-005',
      name: 'SecurityContainmentMissing',
      shortDescription: { text: 'Security containment actions not executed' },
      fullDescription: { text: 'Security incidents require containment actions (IP blocking, account disabling, evidence preservation) before resolution.' },
      helpUri: 'https://audityzer.dev/docs/incident-response#containment',
      properties: { severity: 'critical', category: 'incident-response', tags: ['security', 'containment'] },
    },
    {
      id: 'IR-006',
      name: 'IncompleteTimeline',
      shortDescription: { text: 'Incident timeline is incomplete' },
      fullDescription: { text: 'All 7 response steps should be documented in the incident timeline for audit and compliance purposes.' },
      helpUri: 'https://audityzer.dev/docs/incident-response#timeline',
      properties: { severity: 'medium', category: 'incident-response', tags: ['documentation', 'compliance'] },
    },
  ];

  const results: SarifResult[] = [];
  const artifactUri = `incidents/${incident.id}`;

  // Check: team assigned
  if (!incident.team) {
    results.push({
      ruleId: 'IR-001',
      level: 'error',
      message: { text: `Incident ${incident.id}: response team not assigned` },
      locations: [{ physicalLocation: { artifactLocation: { uri: artifactUri } } }],
      properties: { incidentId: incident.id, severity: incident.severity },
    });
  }

  // Check: SLA breach
  const slaMinutes = SEVERITY_DEFINITIONS[incident.severity].responseTimeMinutes;
  const elapsed = (new Date(incident.updatedAt).getTime() - new Date(incident.createdAt).getTime()) / 60000;
  if (elapsed > slaMinutes && incident.currentStep === 'immediateAssessment') {
    results.push({
      ruleId: 'IR-002',
      level: 'error',
      message: { text: `Incident ${incident.id}: SLA breached — ${Math.round(elapsed)} min elapsed vs ${slaMinutes} min SLA` },
      locations: [{ physicalLocation: { artifactLocation: { uri: artifactUri } } }],
      properties: { incidentId: incident.id, elapsedMinutes: elapsed, slaMinutes },
    });
  }

  // Check: government notification for P1/P2
  if ((incident.severity === 'P1' || incident.severity === 'P2') && incident.status !== 'closed') {
    const hasGovStep = incident.timeline.some(
      (e) => e.step === 'communicationUpdate' && e.notes.toLowerCase().includes('government'),
    );
    if (!hasGovStep) {
      results.push({
        ruleId: 'IR-003',
        level: 'error',
        message: { text: `Incident ${incident.id}: government notification not found in timeline` },
        locations: [{ physicalLocation: { artifactLocation: { uri: artifactUri } } }],
        properties: { incidentId: incident.id, severity: incident.severity },
      });
    }
  }

  // Check: post-mortem scheduled (if resolved/closed)
  if (incident.status === 'resolved' || incident.status === 'closed') {
    const hasPostmortem = incident.timeline.some(
      (e) => e.step === 'postIncident' && e.action.toLowerCase().includes('post-mortem'),
    );
    if (!hasPostmortem) {
      results.push({
        ruleId: 'IR-004',
        level: 'warning',
        message: { text: `Incident ${incident.id}: post-mortem not scheduled — deadline is ${POSTMORTEM_DEADLINES[incident.severity]}` },
        locations: [{ physicalLocation: { artifactLocation: { uri: artifactUri } } }],
        properties: { incidentId: incident.id, deadline: POSTMORTEM_DEADLINES[incident.severity] },
      });
    }
  }

  // Check: incomplete timeline
  const documentedSteps = new Set(incident.timeline.map((e) => e.step));
  const missingSteps = RESPONSE_STEP_ORDER.filter((s) => !documentedSteps.has(s));
  if (missingSteps.length > 0 && (incident.status === 'resolved' || incident.status === 'closed')) {
    results.push({
      ruleId: 'IR-006',
      level: 'warning',
      message: { text: `Incident ${incident.id}: missing timeline entries for steps: ${missingSteps.join(', ')}` },
      locations: [{ physicalLocation: { artifactLocation: { uri: artifactUri } } }],
      properties: { incidentId: incident.id, missingSteps },
    });
  }

  return {
    $schema: SARIF_SCHEMA,
    version: '2.1.0',
    runs: [
      {
        tool: {
          driver: {
            name: 'Audityzer Incident Response Auditor',
            version: '1.0.0',
            informationUri: 'https://github.com/rigoryanych/Audityzer',
            rules,
          },
        },
        results,
      },
    ],
  };
}

/**
 * Validate overall incident response readiness and return a list of gap descriptions.
 */
export function auditResponseReadiness(incident: Incident): string[] {
  const sarif = generateIncidentResponseSarif(incident);
  return sarif.runs[0].results.map((r) => `[${r.ruleId}] ${r.level.toUpperCase()}: ${r.message.text}`);
}
