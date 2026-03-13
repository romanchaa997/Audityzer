/**
 * @module types
 * @description Core type definitions for the AuditorSEC SaaS Compliance Platform (Track 2).
 * Covers compliance frameworks, risk scoring, scanner integration, and CRM sync.
 */

// ─── Compliance Frameworks ──────────────────────────────────────────────────

/** Supported compliance frameworks */
export type ComplianceFramework =
  | 'SEBI_CSCRF'
  | 'LGPD'
  | 'JOINT_STANDARD_2'
  | 'SOC2_TYPE_II'
  | 'ISO_27001'
  | 'GDPR';

/** Severity levels for compliance findings */
export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

/** Status of a compliance check */
export type ComplianceStatus = 'pass' | 'fail' | 'partial' | 'not_applicable' | 'pending';

/** Single rule within a compliance ruleset */
export interface ComplianceRule {
  id: string;
  framework: ComplianceFramework;
  category: string;
  title: string;
  description: string;
  severity: Severity;
  /** Automated check function identifier */
  checkFn: string;
  /** Evidence types required for this rule */
  requiredEvidence: EvidenceType[];
  /** Remediation guidance if rule fails */
  remediation: string;
  /** Reference to regulation section */
  regulationRef: string;
}

/** Compliance ruleset — a collection of rules for a given framework */
export interface ComplianceRuleset {
  framework: ComplianceFramework;
  version: string;
  effectiveDate: string;
  rules: ComplianceRule[];
  metadata: {
    region: string;
    regulator: string;
    enforcementDate: string;
  };
}

/** Result of evaluating a single compliance rule */
export interface ComplianceCheckResult {
  ruleId: string;
  status: ComplianceStatus;
  score: number;
  maxScore: number;
  evidence: AuditEvidence[];
  findings: string[];
  remediation: string | null;
  checkedAt: string;
}

/** Types of audit evidence */
export type EvidenceType =
  | 'document'
  | 'screenshot'
  | 'log'
  | 'config'
  | 'interview'
  | 'scan_result'
  | 'api_response';

/** Collected audit evidence */
export interface AuditEvidence {
  id: string;
  type: EvidenceType;
  title: string;
  description: string;
  source: string;
  collectedAt: string;
  hash: string;
  /** URI or inline data */
  data: string;
}

/** Full compliance audit report */
export interface ComplianceReport {
  id: string;
  clientId: string;
  framework: ComplianceFramework;
  results: ComplianceCheckResult[];
  overallScore: number;
  maxScore: number;
  passRate: number;
  gaps: GapAnalysisItem[];
  generatedAt: string;
  auditorId: string;
}

/** Gap analysis entry */
export interface GapAnalysisItem {
  ruleId: string;
  framework: ComplianceFramework;
  gap: string;
  currentState: string;
  requiredState: string;
  severity: Severity;
  remediation: RemediationRecommendation;
  estimatedEffort: 'low' | 'medium' | 'high';
}

/** Remediation recommendation */
export interface RemediationRecommendation {
  id: string;
  title: string;
  description: string;
  steps: string[];
  priority: Severity;
  estimatedCost: string;
  tools: string[];
}

// ─── dApp Risk Audit ────────────────────────────────────────────────────────

/** Risk category for dApp audits */
export type DAppRiskCategory =
  | 'smart_contract'
  | 'rug_pull'
  | 'liquidity'
  | 'governance'
  | 'oracle'
  | 'bridge'
  | 'access_control'
  | 'economic';

/** Chain identifiers */
export type Chain =
  | 'ethereum'
  | 'bsc'
  | 'polygon'
  | 'arbitrum'
  | 'optimism'
  | 'avalanche'
  | 'solana'
  | 'base';

/** Vulnerability classification (CVSS-like for Web3) */
export interface Web3CVSS {
  baseScore: number;
  attackVector: 'network' | 'contract' | 'governance' | 'oracle';
  attackComplexity: 'low' | 'high';
  privilegesRequired: 'none' | 'low' | 'high';
  userInteraction: 'none' | 'required';
  scope: 'unchanged' | 'changed';
  impactConfidentiality: 'none' | 'low' | 'high';
  impactIntegrity: 'none' | 'low' | 'high';
  impactAvailability: 'none' | 'low' | 'high';
  /** Financial impact multiplier (unique to Web3) */
  financialImpact: 'negligible' | 'moderate' | 'significant' | 'catastrophic';
}

/** Individual risk factor for a dApp */
export interface DAppRiskFactor {
  id: string;
  category: DAppRiskCategory;
  title: string;
  description: string;
  cvss: Web3CVSS;
  evidence: string[];
  chain: Chain;
  contractAddress?: string;
  mitigations: string[];
}

/** Full dApp risk report */
export interface DAppRiskReport {
  id: string;
  dappName: string;
  chains: Chain[];
  overallRiskScore: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  factors: DAppRiskFactor[];
  rugPullProbability: number;
  liquidityAssessment: LiquidityAssessment;
  governanceAssessment: GovernanceAssessment;
  generatedAt: string;
  format: 'json' | 'markdown';
}

/** Liquidity risk assessment */
export interface LiquidityAssessment {
  totalLiquidityUSD: number;
  liquidityConcentration: number;
  withdrawalRisk: 'low' | 'medium' | 'high' | 'critical';
  lockDuration: number | null;
  pools: Array<{
    pair: string;
    chain: Chain;
    liquidityUSD: number;
    volume24hUSD: number;
  }>;
}

/** Governance risk assessment */
export interface GovernanceAssessment {
  multisigRequired: boolean;
  timelockDuration: number;
  adminKeyConcentration: number;
  proposalThreshold: number;
  votingPeriod: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

// ─── AI Meta-Learning Scanner ───────────────────────────────────────────────

/** Scanner plugin metadata */
export interface ScannerPlugin {
  id: string;
  name: string;
  version: string;
  /** Vulnerability types this scanner excels at detecting */
  specialties: string[];
  /** Average execution time in ms */
  avgExecutionMs: number;
  /** Historical accuracy for different vuln types */
  accuracy: Record<string, number>;
  enabled: boolean;
}

/** Raw finding from a scanner plugin */
export interface ScannerFinding {
  scannerId: string;
  ruleId: string;
  title: string;
  description: string;
  severity: Severity;
  confidence: number;
  location: {
    file: string;
    line?: number;
    column?: number;
    contractName?: string;
    functionName?: string;
  };
  metadata: Record<string, unknown>;
}

/** Aggregated finding with meta-learning confidence */
export interface AggregatedFinding {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  /** Confidence based on scanner agreement */
  confidence: number;
  /** Which scanners detected this */
  detectedBy: string[];
  /** Which scanners missed this */
  missedBy: string[];
  /** Number of scanners that agree */
  agreement: number;
  location: ScannerFinding['location'];
  patternId: string | null;
  /** Meta-learning score: how reliable is this finding based on historical data */
  metaLearningScore: number;
}

/** Known vulnerability pattern signature */
export interface VulnerabilityPattern {
  id: string;
  name: string;
  description: string;
  category: string;
  signature: string;
  /** Regex or AST pattern */
  patternType: 'regex' | 'ast' | 'bytecode';
  severity: Severity;
  falsePositiveRate: number;
  references: string[];
}

/** Scanner meta-learning statistics */
export interface ScannerMetaStats {
  scannerId: string;
  totalScans: number;
  /** Detection rate per vulnerability type */
  detectionRates: Record<string, number>;
  /** False positive rate per vulnerability type */
  falsePositiveRates: Record<string, number>;
  /** Average confidence when correct vs incorrect */
  avgConfidenceCorrect: number;
  avgConfidenceIncorrect: number;
  lastUpdated: string;
}

/** ML model stub interface */
export interface MLModelInterface {
  modelId: string;
  modelType: 'ensemble' | 'transformer' | 'graph_nn';
  inputFeatures: string[];
  outputLabels: string[];
  version: string;
  /** Predict vulnerability probability */
  predict(features: Record<string, number>): Promise<MLPrediction>;
}

/** ML model prediction result */
export interface MLPrediction {
  label: string;
  probability: number;
  confidence: number;
  features: Record<string, number>;
}

// ─── CRM Integration (monday.com + Telegram) ───────────────────────────────

/** monday.com webhook event types */
export type MondayEventType =
  | 'create_pulse'
  | 'change_column_value'
  | 'change_status'
  | 'create_update'
  | 'item_archived'
  | 'subitem_created';

/** monday.com webhook payload */
export interface MondayWebhookPayload {
  event: {
    type: MondayEventType;
    pulseId: number;
    pulseName: string;
    boardId: number;
    groupId: string;
    columnId?: string;
    columnType?: string;
    value?: MondayColumnValue;
    previousValue?: MondayColumnValue;
    userId: number;
    triggerTime: string;
  };
}

/** monday.com column value */
export interface MondayColumnValue {
  label?: string;
  text?: string;
  value?: unknown;
  changed_at?: string;
}

/** monday.com GraphQL mutation types */
export interface MondayMutation {
  type: 'change_column_value' | 'create_item' | 'create_update';
  boardId: number;
  itemId?: number;
  columnId?: string;
  value?: string;
  body?: string;
}

/** Audit pipeline stages mapped to CRM columns */
export type AuditPipelineStage =
  | 'intake'
  | 'scoping'
  | 'scanning'
  | 'manual_review'
  | 'report_draft'
  | 'client_review'
  | 'remediation'
  | 'final_report'
  | 'completed';

/** Client record in CRM */
export interface CRMClient {
  id: string;
  mondayItemId: number;
  name: string;
  telegramChatId: string;
  email: string;
  auditType: 'smart_contract' | 'compliance' | 'dapp_risk' | 'full';
  pipelineStage: AuditPipelineStage;
  assignedAuditor: string;
  createdAt: string;
  updatedAt: string;
}

/** Telegram notification payload */
export interface TelegramNotification {
  chatId: string;
  message: string;
  parseMode: 'HTML' | 'Markdown';
  replyMarkup?: {
    inline_keyboard: Array<
      Array<{
        text: string;
        callback_data: string;
      }>
    >;
  };
}

// ─── API Types ──────────────────────────────────────────────────────────────

/** Standard API response envelope */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: ApiError;
  pagination?: PaginationMeta;
}

/** API error */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/** Pagination metadata */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/** API query parameters for listing endpoints */
export interface ListQueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, string | string[]>;
}

/** JWT authentication payload */
export interface AuthPayload {
  userId: string;
  email: string;
  role: 'admin' | 'auditor' | 'client' | 'viewer';
  permissions: string[];
  iat: number;
  exp: number;
}
