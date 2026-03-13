/**
 * AI Governance Platform Integration — Barrel Export
 *
 * Exposes all integration modules for the Audityzer <> AI Gov Platform bridge.
 */

// Main integration bridge
export { AIGovBridge, aiGovBridge } from './aiGovBridge.js';
export type {
  AIGovBridgeConfig,
  HealthStatus,
  AuditTrailSubscription,
  SecurityScanResult,
  SecurityFinding,
  ComplianceResult,
  ComplianceFinding,
  SarifReport,
} from './aiGovBridge.js';

// Compliance monitoring
export { ComplianceMonitor } from './complianceMonitor.js';
export type {
  ComplianceMonitorConfig,
  ComplianceReport,
  StandardResult,
  Finding,
} from './complianceMonitor.js';

// Threat detection
export { ThreatDetector } from './threatDetector.js';
export type {
  ThreatDetectorConfig,
  SecurityEvent,
  SecurityEventHandler,
} from './threatDetector.js';

// Audit trail consumption
export { AuditTrailConsumer } from './auditTrailConsumer.js';
export type {
  AuditTrailConsumerConfig,
  AuditEvent,
  AuditEventHandler,
  AuditSource,
} from './auditTrailConsumer.js';
