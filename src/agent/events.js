/**
 * Security Agent Event Constants
 * Defines all event names used in the event-driven security agent
 */

export const SecurityScanEvent = Object.freeze({
  /** Triggered when a new scan is requested */
  SCAN_REQUESTED: 'security:scan:requested',

  /** Triggered when a scan is queued due to concurrency limits */
  SCAN_QUEUED: 'security:scan:queued',

  /** Triggered when a scan completes successfully */
  SCAN_COMPLETED: 'security:scan:completed',

  /** Triggered when a scan fails */
  SCAN_FAILED: 'security:scan:failed',

  /** Triggered when a report is stored on IPFS and blockchain */
  REPORT_READY: 'security:report:ready',

  /** Triggered when a report is published to messaging layer */
  REPORT_PUBLISHED: 'security:report:published',

  /** Triggered when the agent starts */
  AGENT_STARTED: 'security:agent:started',

  /** Triggered when the agent stops */
  AGENT_STOPPED: 'security:agent:stopped',
});

export default SecurityScanEvent;
