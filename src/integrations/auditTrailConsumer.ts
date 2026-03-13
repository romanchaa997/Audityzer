/**
 * Audit Trail Consumer for AI Governance Platform
 *
 * Subscribes to 6 audit trail sources defined in the architecture:
 *  1. Blockchain audit trail (Trust Mechanisms) — real-time JSON event stream
 *  2. Communication audit trail (Secure Communications) — encrypted records
 *  3. Observer activity log — session logs with timestamps and access levels
 *  4. Transparency Engine access log — structured log
 *  5. Kubernetes events (gov-platform namespace)
 *  6. Prometheus metrics (ports 8000-8002)
 *
 * All events are normalized into a unified AuditEvent format compatible
 * with the Prisma AuditTrailEvent model.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type AuditSource =
  | 'BLOCKCHAIN'
  | 'OBSERVER'
  | 'TRANSPARENCY'
  | 'KUBERNETES'
  | 'PROMETHEUS'
  | 'COMMUNICATION';

export interface AuditEvent {
  id: string;
  source: AuditSource;
  eventType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  rawData: Record<string, unknown>;
  normalizedData: {
    action: string;
    actor: string;
    target: string;
    module: string;
    details: string;
  };
  timestamp: string;
  processedAt: string;
}

export type AuditEventHandler = (event: AuditEvent) => void | Promise<void>;

export interface AuditTrailConsumerConfig {
  platformUrl: string;
  apiKey: string;
  blockchainApiUrl: string;
  observerApiUrl: string;
  prometheusEndpoints: string[];
  /** Polling interval in milliseconds (default: 15000) */
  pollInterval: number;
}

interface SubscriptionState {
  source: AuditSource;
  status: 'connected' | 'disconnected' | 'error';
  lastEventId?: string;
  eventCount: number;
  lastPoll?: string;
}

// ─── Implementation ──────────────────────────────────────────────────────────

export class AuditTrailConsumer {
  private config: AuditTrailConsumerConfig;
  private handlers: AuditEventHandler[] = [];
  private pollTimers: ReturnType<typeof setInterval>[] = [];
  private subscriptions: Map<AuditSource, SubscriptionState> = new Map();
  private running = false;

  constructor(config: AuditTrailConsumerConfig) {
    this.config = config;

    const sources: AuditSource[] = [
      'BLOCKCHAIN',
      'COMMUNICATION',
      'OBSERVER',
      'TRANSPARENCY',
      'KUBERNETES',
      'PROMETHEUS',
    ];
    for (const source of sources) {
      this.subscriptions.set(source, { source, status: 'disconnected', eventCount: 0 });
    }
  }

  /** Register a handler that receives all normalized AuditEvents. */
  onEvent(handler: AuditEventHandler): void {
    this.handlers.push(handler);
  }

  /** Get current subscription states. */
  getSubscriptions(): Map<AuditSource, SubscriptionState> {
    return new Map(this.subscriptions);
  }

  /** Start consuming from all 6 audit trail sources. */
  start(): void {
    if (this.running) return;
    this.running = true;

    const interval = this.config.pollInterval;

    this.pollTimers.push(setInterval(() => this.pollBlockchain(), interval));
    this.pollTimers.push(setInterval(() => this.pollCommunication(), interval));
    this.pollTimers.push(setInterval(() => this.pollObserver(), interval));
    this.pollTimers.push(setInterval(() => this.pollTransparency(), interval));
    this.pollTimers.push(setInterval(() => this.pollKubernetes(), interval));
    this.pollTimers.push(setInterval(() => this.pollPrometheus(), interval));
  }

  /** Stop all consumers. */
  stop(): void {
    this.running = false;
    for (const timer of this.pollTimers) {
      clearInterval(timer);
    }
    this.pollTimers = [];

    for (const [source, state] of this.subscriptions) {
      this.subscriptions.set(source, { ...state, status: 'disconnected' });
    }
  }

  // ── Source Consumers ──────────────────────────────────────────────────────

  /**
   * 1. Blockchain audit trail (Trust Mechanisms)
   * Real-time JSON event stream of all government actions recorded on-chain.
   * Format: Structured JSON (government action metadata + timestamp + signatures)
   */
  private async pollBlockchain(): Promise<void> {
    const source: AuditSource = 'BLOCKCHAIN';
    const state = this.subscriptions.get(source)!;

    try {
      const sinceParam = state.lastEventId ? `?since=${state.lastEventId}` : '';
      const response = await this.fetchApi(
        `${this.config.blockchainApiUrl}/events/stream${sinceParam}`
      );
      if (!response.ok) {
        this.updateState(source, 'error');
        return;
      }

      const data = (await response.json()) as {
        events: Array<{
          txHash: string;
          blockHeight: number;
          action: string;
          department: string;
          signatures: string[];
          timestamp: string;
        }>;
      };

      this.updateState(source, 'connected');

      for (const raw of data.events ?? []) {
        const event = this.normalize({
          source,
          eventType: 'BLOCKCHAIN_ACTION',
          severity: 'low',
          rawData: raw as unknown as Record<string, unknown>,
          action: raw.action,
          actor: raw.department,
          target: `block:${raw.blockHeight}`,
          module: 'Trust Mechanisms (Blockchain)',
          details: `Tx ${raw.txHash.substring(0, 16)}... — ${raw.action} by ${raw.department}`,
        });
        state.lastEventId = raw.txHash;
        state.eventCount++;
        await this.emit(event);
      }
    } catch {
      this.updateState(source, 'error');
    }
  }

  /**
   * 2. Communication audit trail (Secure Communications)
   * Encrypted audit records of all communications for legal hold and compliance.
   */
  private async pollCommunication(): Promise<void> {
    const source: AuditSource = 'COMMUNICATION';
    const state = this.subscriptions.get(source)!;

    try {
      const sinceParam = state.lastEventId ? `?since=${state.lastEventId}` : '';
      const response = await this.fetchApi(
        `${this.config.platformUrl}/api/comms/audit-trail${sinceParam}`
      );
      if (!response.ok) {
        this.updateState(source, 'error');
        return;
      }

      const data = (await response.json()) as {
        records: Array<{
          id: string;
          channel: string;
          protocol: string;
          participants: number;
          encryptionMethod: string;
          timestamp: string;
        }>;
      };

      this.updateState(source, 'connected');

      for (const raw of data.records ?? []) {
        const event = this.normalize({
          source,
          eventType: 'COMMUNICATION_RECORD',
          severity: 'low',
          rawData: raw as unknown as Record<string, unknown>,
          action: `${raw.protocol} communication`,
          actor: `${raw.participants} participants`,
          target: raw.channel,
          module: 'Secure Multi-Party Communication System',
          details: `${raw.protocol} on ${raw.channel}, ${raw.participants} participants, encrypted with ${raw.encryptionMethod}`,
        });
        state.lastEventId = raw.id;
        state.eventCount++;
        await this.emit(event);
      }
    } catch {
      this.updateState(source, 'error');
    }
  }

  /**
   * 3. Observer activity log (Observer Verification)
   * Session logs with timestamps, access levels (L1-L4), and activities.
   */
  private async pollObserver(): Promise<void> {
    const source: AuditSource = 'OBSERVER';
    const state = this.subscriptions.get(source)!;

    try {
      const sinceParam = state.lastEventId ? `?since=${state.lastEventId}` : '';
      const response = await this.fetchApi(
        `${this.config.observerApiUrl}/activity/stream${sinceParam}`
      );
      if (!response.ok) {
        this.updateState(source, 'error');
        return;
      }

      const data = (await response.json()) as {
        activities: Array<{
          id: string;
          observerId: string;
          accessLevel: string;
          action: string;
          resource: string;
          ip: string;
          timestamp: string;
        }>;
      };

      this.updateState(source, 'connected');

      for (const raw of data.activities ?? []) {
        const severity = raw.accessLevel === 'L4' || raw.accessLevel === 'L3' ? 'medium' : 'low';
        const event = this.normalize({
          source,
          eventType: 'OBSERVER_ACTIVITY',
          severity,
          rawData: raw as unknown as Record<string, unknown>,
          action: raw.action,
          actor: `observer:${raw.observerId} (${raw.accessLevel})`,
          target: raw.resource,
          module: 'Observer Verification Framework',
          details: `${raw.accessLevel} observer ${raw.observerId} — ${raw.action} on ${raw.resource} from ${raw.ip}`,
        });
        state.lastEventId = raw.id;
        state.eventCount++;
        await this.emit(event);
      }
    } catch {
      this.updateState(source, 'error');
    }
  }

  /**
   * 4. Transparency Engine access log
   * Structured logs of all access to transparency/government operations data.
   */
  private async pollTransparency(): Promise<void> {
    const source: AuditSource = 'TRANSPARENCY';
    const state = this.subscriptions.get(source)!;

    try {
      const sinceParam = state.lastEventId ? `?since=${state.lastEventId}` : '';
      const response = await this.fetchApi(
        `${this.config.platformUrl}/api/transparency/access-log${sinceParam}`
      );
      if (!response.ok) {
        this.updateState(source, 'error');
        return;
      }

      const data = (await response.json()) as {
        entries: Array<{
          id: string;
          userId: string;
          resource: string;
          action: string;
          department: string;
          timestamp: string;
        }>;
      };

      this.updateState(source, 'connected');

      for (const raw of data.entries ?? []) {
        const event = this.normalize({
          source,
          eventType: 'TRANSPARENCY_ACCESS',
          severity: 'low',
          rawData: raw as unknown as Record<string, unknown>,
          action: raw.action,
          actor: raw.userId,
          target: raw.resource,
          module: 'Real-Time Transparency Engine',
          details: `${raw.userId} accessed ${raw.resource} (${raw.department}) — ${raw.action}`,
        });
        state.lastEventId = raw.id;
        state.eventCount++;
        await this.emit(event);
      }
    } catch {
      this.updateState(source, 'error');
    }
  }

  /**
   * 5. Kubernetes events (gov-platform namespace)
   * Infrastructure security monitoring via kubectl event stream.
   */
  private async pollKubernetes(): Promise<void> {
    const source: AuditSource = 'KUBERNETES';
    const state = this.subscriptions.get(source)!;

    try {
      const sinceParam = state.lastEventId ? `?since=${state.lastEventId}` : '';
      const response = await this.fetchApi(
        `${this.config.platformUrl}/api/k8s/events?namespace=gov-platform${sinceParam ? '&' + sinceParam.substring(1) : ''}`
      );
      if (!response.ok) {
        this.updateState(source, 'error');
        return;
      }

      const data = (await response.json()) as {
        events: Array<{
          uid: string;
          type: string;
          reason: string;
          object: string;
          message: string;
          timestamp: string;
        }>;
      };

      this.updateState(source, 'connected');

      for (const raw of data.events ?? []) {
        const severity = raw.type === 'Warning' ? 'medium' : 'low';
        const event = this.normalize({
          source,
          eventType: `K8S_${raw.reason.toUpperCase()}`,
          severity,
          rawData: raw as unknown as Record<string, unknown>,
          action: raw.reason,
          actor: 'kubernetes',
          target: raw.object,
          module: 'Kubernetes (gov-platform)',
          details: `[${raw.type}] ${raw.reason}: ${raw.message} (${raw.object})`,
        });
        state.lastEventId = raw.uid;
        state.eventCount++;
        await this.emit(event);
      }
    } catch {
      this.updateState(source, 'error');
    }
  }

  /**
   * 6. Prometheus metrics (ports 8000-8002)
   * Anomaly detection and SLA monitoring from metric endpoints.
   */
  private async pollPrometheus(): Promise<void> {
    const source: AuditSource = 'PROMETHEUS';
    const state = this.subscriptions.get(source)!;

    try {
      const metrics: Array<{ endpoint: string; data: string }> = [];

      for (const endpoint of this.config.prometheusEndpoints) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 5_000);
          const response = await fetch(endpoint, { signal: controller.signal });
          clearTimeout(timeout);
          if (response.ok) {
            metrics.push({ endpoint, data: await response.text() });
          }
        } catch {
          // Individual endpoint failure — continue
        }
      }

      if (metrics.length === 0) {
        this.updateState(source, 'error');
        return;
      }

      this.updateState(source, 'connected');

      for (const metric of metrics) {
        const event = this.normalize({
          source,
          eventType: 'PROMETHEUS_METRICS',
          severity: 'low',
          rawData: { endpoint: metric.endpoint, sampleSize: metric.data.length },
          action: 'metrics_scrape',
          actor: 'prometheus',
          target: metric.endpoint,
          module: 'Monitoring (Prometheus)',
          details: `Scraped ${metric.data.length} bytes from ${metric.endpoint}`,
        });
        state.eventCount++;
        await this.emit(event);
      }
    } catch {
      this.updateState(source, 'error');
    }
  }

  // ── Normalization & Helpers ───────────────────────────────────────────────

  private normalize(params: {
    source: AuditSource;
    eventType: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    rawData: Record<string, unknown>;
    action: string;
    actor: string;
    target: string;
    module: string;
    details: string;
  }): AuditEvent {
    return {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      source: params.source,
      eventType: params.eventType,
      severity: params.severity,
      rawData: params.rawData,
      normalizedData: {
        action: params.action,
        actor: params.actor,
        target: params.target,
        module: params.module,
        details: params.details,
      },
      timestamp: new Date().toISOString(),
      processedAt: new Date().toISOString(),
    };
  }

  private async emit(event: AuditEvent): Promise<void> {
    for (const handler of this.handlers) {
      try {
        await handler(event);
      } catch {
        // Handler errors should not break the consumer loop
      }
    }
  }

  private updateState(source: AuditSource, status: 'connected' | 'disconnected' | 'error'): void {
    const current = this.subscriptions.get(source)!;
    this.subscriptions.set(source, { ...current, status, lastPoll: new Date().toISOString() });
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
