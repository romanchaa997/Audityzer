/**
 * Threat Detector for AI Governance Platform
 *
 * Monitors 11 threat vectors identified in the architecture analysis:
 *  1. Observer session anomalies (L3/L4 from unexpected IPs)
 *  2. Data exfiltration via blockchain event stream
 *  3. SQL injection attempts on PostgreSQL port 5432
 *  4. API abuse (rate limiting, auth failure tracking)
 *  5. Kubernetes privilege escalation in gov-platform namespace
 *  6. Smart contract exploitation (anomalous contract calls)
 *  7. Credential compromise (token invalidation, auth failure spikes)
 *  8. CRITICAL: exposed simulation ports 8000-8004 with no authentication
 *  9. Communication interception (TLS downgrade, cert pinning)
 * 10. Insider threat behavioral analysis
 * 11. Blockchain manipulation (Merkle tree integrity)
 *
 * Each detection emits a SecurityEvent compatible with the Prisma
 * AuditTrailEvent model.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SecurityEvent {
  id: string;
  source: 'BLOCKCHAIN' | 'OBSERVER' | 'TRANSPARENCY' | 'KUBERNETES' | 'PROMETHEUS' | 'COMMUNICATION';
  eventType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  rawData: Record<string, unknown>;
  normalizedData: {
    threat: string;
    description: string;
    affectedModule: string;
    indicators: string[];
    recommendedAction: string;
  };
  timestamp: string;
}

export type SecurityEventHandler = (event: SecurityEvent) => void | Promise<void>;

export interface ThreatDetectorConfig {
  platformUrl: string;
  apiKey: string;
  observerApiUrl: string;
  blockchainApiUrl: string;
  /** Polling interval in milliseconds (default: 30000) */
  pollInterval: number;
}

// ─── Implementation ──────────────────────────────────────────────────────────

export class ThreatDetector {
  private config: ThreatDetectorConfig;
  private handlers: SecurityEventHandler[] = [];
  private pollTimers: ReturnType<typeof setInterval>[] = [];
  private running = false;

  constructor(config: ThreatDetectorConfig) {
    this.config = config;
  }

  /** Register a handler that receives all SecurityEvents. */
  onEvent(handler: SecurityEventHandler): void {
    this.handlers.push(handler);
  }

  /** Start all threat detection monitors. */
  start(): void {
    if (this.running) return;
    this.running = true;

    const interval = this.config.pollInterval;

    this.pollTimers.push(setInterval(() => this.detectObserverAnomalies(), interval));
    this.pollTimers.push(setInterval(() => this.detectDataExfiltration(), interval));
    this.pollTimers.push(setInterval(() => this.detectSQLInjection(), interval));
    this.pollTimers.push(setInterval(() => this.detectAPIAbuse(), interval));
    this.pollTimers.push(setInterval(() => this.detectK8sPrivilegeEscalation(), interval));
    this.pollTimers.push(setInterval(() => this.detectSmartContractExploitation(), interval));
    this.pollTimers.push(setInterval(() => this.detectCredentialCompromise(), interval));
    this.pollTimers.push(setInterval(() => this.detectExposedSimulationPorts(), interval));
    this.pollTimers.push(setInterval(() => this.detectCommunicationInterception(), interval));
    this.pollTimers.push(setInterval(() => this.detectInsiderThreats(), interval));
    this.pollTimers.push(setInterval(() => this.detectBlockchainManipulation(), interval));
  }

  /** Stop all monitors. */
  stop(): void {
    this.running = false;
    for (const timer of this.pollTimers) {
      clearInterval(timer);
    }
    this.pollTimers = [];
  }

  // ── Detection Methods ─────────────────────────────────────────────────────

  /**
   * 1. Observer session anomalies
   * Alert on L3/L4 (international auditors / bilateral partners) access from unexpected IPs.
   */
  async detectObserverAnomalies(): Promise<void> {
    try {
      const response = await this.fetchApi(
        `${this.config.observerApiUrl}/sessions/anomalies?tiers=L3,L4`
      );
      if (!response.ok) return;

      const data = (await response.json()) as { anomalies: Array<{ ip: string; tier: string; userId: string }> };
      for (const anomaly of data.anomalies ?? []) {
        await this.emit({
          eventType: 'OBSERVER_SESSION_ANOMALY',
          severity: 'critical',
          source: 'OBSERVER',
          rawData: anomaly,
          normalizedData: {
            threat: 'Observer session anomaly',
            description: `${anomaly.tier} observer session from unexpected IP: ${anomaly.ip}`,
            affectedModule: 'Observer Verification Framework',
            indicators: [anomaly.ip, anomaly.tier, anomaly.userId],
            recommendedAction: 'Verify observer identity, check IP against known delegations, consider session termination',
          },
        });
      }
    } catch { /* endpoint unreachable — silent */ }
  }

  /**
   * 2. Data exfiltration via blockchain event stream
   * Monitor Trust Mechanisms event streaming for anomalous large data transfers.
   */
  async detectDataExfiltration(): Promise<void> {
    try {
      const response = await this.fetchApi(
        `${this.config.blockchainApiUrl}/events/anomalies?type=exfiltration`
      );
      if (!response.ok) return;

      const data = (await response.json()) as { alerts: Array<{ txHash: string; dataSize: number; destination: string }> };
      for (const alert of data.alerts ?? []) {
        await this.emit({
          eventType: 'DATA_EXFILTRATION_ATTEMPT',
          severity: 'critical',
          source: 'BLOCKCHAIN',
          rawData: alert,
          normalizedData: {
            threat: 'Data exfiltration via blockchain',
            description: `Anomalous data transfer detected: ${alert.dataSize} bytes to ${alert.destination}`,
            affectedModule: 'Trust Mechanisms (Blockchain)',
            indicators: [alert.txHash, String(alert.dataSize), alert.destination],
            recommendedAction: 'Block destination, investigate originating account, preserve blockchain evidence',
          },
        });
      }
    } catch { /* endpoint unreachable */ }
  }

  /**
   * 3. SQL injection attempts on PostgreSQL port 5432
   * Monitor database activity for query anomalies.
   */
  async detectSQLInjection(): Promise<void> {
    try {
      const response = await this.fetchApi(
        `${this.config.platformUrl}/api/security/db-anomalies`
      );
      if (!response.ok) return;

      const data = (await response.json()) as { incidents: Array<{ query: string; sourceIp: string; timestamp: string }> };
      for (const incident of data.incidents ?? []) {
        await this.emit({
          eventType: 'SQL_INJECTION_ATTEMPT',
          severity: 'high',
          source: 'KUBERNETES',
          rawData: incident,
          normalizedData: {
            threat: 'SQL injection attempt',
            description: `Suspicious query pattern from ${incident.sourceIp} on PostgreSQL port 5432`,
            affectedModule: 'Core Infrastructure (PostgreSQL)',
            indicators: [incident.sourceIp, incident.query.substring(0, 100)],
            recommendedAction: 'Block source IP, review WAF rules, audit parameterized query usage',
          },
        });
      }
    } catch { /* endpoint unreachable */ }
  }

  /**
   * 4. API abuse (rate limiting, authentication failure tracking)
   * Track excessive requests and auth failures across all REST endpoints.
   */
  async detectAPIAbuse(): Promise<void> {
    try {
      const response = await this.fetchApi(
        `${this.config.platformUrl}/api/security/rate-limit-violations`
      );
      if (!response.ok) return;

      const data = (await response.json()) as { violations: Array<{ ip: string; endpoint: string; count: number; authFailures: number }> };
      for (const violation of data.violations ?? []) {
        const severity = violation.authFailures > 10 ? 'high' : 'medium';
        await this.emit({
          eventType: 'API_ABUSE',
          severity,
          source: 'PROMETHEUS',
          rawData: violation,
          normalizedData: {
            threat: 'API abuse detected',
            description: `${violation.count} requests from ${violation.ip} to ${violation.endpoint} (${violation.authFailures} auth failures)`,
            affectedModule: 'All REST API endpoints',
            indicators: [violation.ip, violation.endpoint, String(violation.authFailures)],
            recommendedAction: 'Apply rate limiting, consider IP ban, investigate for credential stuffing',
          },
        });
      }
    } catch { /* endpoint unreachable */ }
  }

  /**
   * 5. Kubernetes privilege escalation in gov-platform namespace
   * Monitor RBAC audit events for unauthorized role binding changes.
   */
  async detectK8sPrivilegeEscalation(): Promise<void> {
    try {
      const response = await this.fetchApi(
        `${this.config.platformUrl}/api/k8s/audit-events?namespace=gov-platform&type=privilege-escalation`
      );
      if (!response.ok) return;

      const data = (await response.json()) as { events: Array<{ user: string; resource: string; action: string; namespace: string }> };
      for (const event of data.events ?? []) {
        await this.emit({
          eventType: 'K8S_PRIVILEGE_ESCALATION',
          severity: 'critical',
          source: 'KUBERNETES',
          rawData: event,
          normalizedData: {
            threat: 'Kubernetes privilege escalation',
            description: `User ${event.user} attempted ${event.action} on ${event.resource} in ${event.namespace}`,
            affectedModule: 'Kubernetes (gov-platform namespace)',
            indicators: [event.user, event.resource, event.action],
            recommendedAction: 'Revoke elevated permissions, audit RBAC bindings, check for compromised service accounts',
          },
        });
      }
    } catch { /* endpoint unreachable */ }
  }

  /**
   * 6. Smart contract exploitation (anomalous contract calls)
   * Monitor Ethereum EVM for reentrancy, overflow, and unusual call patterns.
   */
  async detectSmartContractExploitation(): Promise<void> {
    try {
      const response = await this.fetchApi(
        `${this.config.blockchainApiUrl}/contracts/anomalies`
      );
      if (!response.ok) return;

      const data = (await response.json()) as { anomalies: Array<{ contractAddress: string; txHash: string; pattern: string }> };
      for (const anomaly of data.anomalies ?? []) {
        await this.emit({
          eventType: 'SMART_CONTRACT_EXPLOITATION',
          severity: 'critical',
          source: 'BLOCKCHAIN',
          rawData: anomaly,
          normalizedData: {
            threat: 'Smart contract exploitation attempt',
            description: `Anomalous call pattern "${anomaly.pattern}" on contract ${anomaly.contractAddress}`,
            affectedModule: 'Trust Mechanisms (Ethereum EVM)',
            indicators: [anomaly.contractAddress, anomaly.txHash, anomaly.pattern],
            recommendedAction: 'Pause affected contract, investigate transaction, verify reentrancy guards',
          },
        });
      }
    } catch { /* endpoint unreachable */ }
  }

  /**
   * 7. Credential compromise (token invalidation, auth failure spikes)
   * Track SAML/OAuth token invalidation events and authentication failure spikes.
   */
  async detectCredentialCompromise(): Promise<void> {
    try {
      const response = await this.fetchApi(
        `${this.config.platformUrl}/api/security/auth-anomalies`
      );
      if (!response.ok) return;

      const data = (await response.json()) as { alerts: Array<{ userId: string; failureCount: number; tokenInvalidations: number; sourceIps: string[] }> };
      for (const alert of data.alerts ?? []) {
        await this.emit({
          eventType: 'CREDENTIAL_COMPROMISE',
          severity: 'high',
          source: 'COMMUNICATION',
          rawData: alert,
          normalizedData: {
            threat: 'Credential compromise suspected',
            description: `User ${alert.userId}: ${alert.failureCount} auth failures, ${alert.tokenInvalidations} token invalidations from ${alert.sourceIps.length} IPs`,
            affectedModule: 'Identity Management (SAML/OAuth/OIDC)',
            indicators: [alert.userId, ...alert.sourceIps],
            recommendedAction: 'Force password reset, invalidate all sessions, enable MFA if not active',
          },
        });
      }
    } catch { /* endpoint unreachable */ }
  }

  /**
   * 8. CRITICAL: Exposed simulation ports 8000-8004 with no authentication
   * The Simulation Framework services are exposed without documented auth.
   * This is flagged as HIGH RISK in the architecture analysis.
   */
  async detectExposedSimulationPorts(): Promise<void> {
    const ports = [8000, 8001, 8002, 8003, 8004];
    const serviceNames = [
      'Multiverse Core',
      'Quantum Processor',
      'Spatial Engine',
      'Consciousness Hub',
      'Temporal Processor',
    ];

    for (let i = 0; i < ports.length; i++) {
      try {
        // Attempt unauthenticated access — any success is a finding
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5_000);
        const response = await fetch(`${this.config.platformUrl.replace(/:\d+$/, '')}:${ports[i]}/`, {
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (response.ok || response.status < 500) {
          await this.emit({
            eventType: 'EXPOSED_SIMULATION_PORT',
            severity: 'critical',
            source: 'PROMETHEUS',
            rawData: { port: ports[i], service: serviceNames[i], statusCode: response.status },
            normalizedData: {
              threat: 'Unauthenticated simulation endpoint exposed',
              description: `${serviceNames[i]} on port ${ports[i]} is accessible without authentication (HTTP ${response.status})`,
              affectedModule: 'Parallel Universe Simulation Framework',
              indicators: [String(ports[i]), serviceNames[i]],
              recommendedAction:
                'Add authentication middleware (OAuth 2.0/API key) or isolate behind VPN/network policy. This is the highest-priority security gap identified in the architecture.',
            },
          });
        }
      } catch {
        // Port not reachable — not an issue
      }
    }
  }

  /**
   * 9. Communication interception detection
   * Check for TLS downgrade attacks and certificate pinning violations.
   */
  async detectCommunicationInterception(): Promise<void> {
    try {
      const response = await this.fetchApi(
        `${this.config.platformUrl}/api/security/tls-anomalies`
      );
      if (!response.ok) return;

      const data = (await response.json()) as { anomalies: Array<{ type: string; endpoint: string; detail: string }> };
      for (const anomaly of data.anomalies ?? []) {
        await this.emit({
          eventType: 'COMMUNICATION_INTERCEPTION',
          severity: 'high',
          source: 'COMMUNICATION',
          rawData: anomaly,
          normalizedData: {
            threat: 'Communication interception attempt',
            description: `${anomaly.type} detected on ${anomaly.endpoint}: ${anomaly.detail}`,
            affectedModule: 'Secure Multi-Party Communication System',
            indicators: [anomaly.type, anomaly.endpoint],
            recommendedAction: 'Verify certificate chain, enforce HSTS, check for TLS downgrade to non-PFS suites',
          },
        });
      }
    } catch { /* endpoint unreachable */ }
  }

  /**
   * 10. Insider threat behavioral analysis
   * Integrate with the AI-powered anomaly detection feed from Secure Communications.
   */
  async detectInsiderThreats(): Promise<void> {
    try {
      const response = await this.fetchApi(
        `${this.config.platformUrl}/api/security/behavioral-anomalies`
      );
      if (!response.ok) return;

      const data = (await response.json()) as { alerts: Array<{ userId: string; riskScore: number; indicators: string[] }> };
      for (const alert of data.alerts ?? []) {
        if (alert.riskScore < 0.5) continue; // Only report medium+ risk
        await this.emit({
          eventType: 'INSIDER_THREAT',
          severity: alert.riskScore >= 0.8 ? 'critical' : 'high',
          source: 'COMMUNICATION',
          rawData: alert,
          normalizedData: {
            threat: 'Insider threat detected',
            description: `User ${alert.userId} risk score: ${alert.riskScore} — behavioral anomalies: ${alert.indicators.join(', ')}`,
            affectedModule: 'Secure Communications (Behavioral Analysis)',
            indicators: [alert.userId, String(alert.riskScore), ...alert.indicators],
            recommendedAction: 'Restrict user access, initiate investigation, preserve audit trail evidence',
          },
        });
      }
    } catch { /* endpoint unreachable */ }
  }

  /**
   * 11. Blockchain manipulation (Merkle tree integrity verification)
   * Continuously verify chain integrity via BFT consensus checks.
   */
  async detectBlockchainManipulation(): Promise<void> {
    try {
      const response = await this.fetchApi(
        `${this.config.blockchainApiUrl}/integrity/verify`
      );
      if (!response.ok) return;

      const data = (await response.json()) as { valid: boolean; failures: Array<{ blockHeight: number; expectedHash: string; actualHash: string }> };
      if (data.valid) return;

      for (const failure of data.failures ?? []) {
        await this.emit({
          eventType: 'BLOCKCHAIN_MANIPULATION',
          severity: 'critical',
          source: 'BLOCKCHAIN',
          rawData: failure,
          normalizedData: {
            threat: 'Blockchain integrity violation',
            description: `Block ${failure.blockHeight} hash mismatch: expected ${failure.expectedHash.substring(0, 16)}..., got ${failure.actualHash.substring(0, 16)}...`,
            affectedModule: 'Trust Mechanisms (Blockchain)',
            indicators: [String(failure.blockHeight), failure.expectedHash, failure.actualHash],
            recommendedAction: 'Halt block production, investigate validator set, initiate chain rollback to last verified block',
          },
        });
      }
    } catch { /* endpoint unreachable */ }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private async emit(params: Omit<SecurityEvent, 'id' | 'timestamp'>): Promise<void> {
    const event: SecurityEvent = {
      id: `threat_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      timestamp: new Date().toISOString(),
      ...params,
    };

    for (const handler of this.handlers) {
      try {
        await handler(event);
      } catch {
        // Handler errors should not break the detector loop
      }
    }
  }

  private async fetchApi(url: string): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${this.config.apiKey}` },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return response;
  }
}
