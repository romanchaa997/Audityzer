/**
 * Compliance Monitor for AI Governance Platform
 *
 * Checks compliance against 6 standards identified in the architecture:
 *  - GDPR (consent, retention, deletion, breach notification 72h SLA)
 *  - NATO STANAGs (classified info access across L1-L4 observer tiers)
 *  - FIPS 140-2 (approved cipher suites: AES-256, RSA-4096, CRYSTALS-Kyber/Dilithium)
 *  - ISO 27001 (information security controls across all modules)
 *  - Blockchain (smart contract enforcement verification)
 *  - WCAG 2.1 (automated accessibility scanning)
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ComplianceReport {
  generatedAt: string;
  overallStatus: 'compliant' | 'non-compliant' | 'partial';
  standards: StandardResult[];
  summary: { total: number; passed: number; failed: number; warnings: number };
}

export interface StandardResult {
  standard: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  findings: Finding[];
  checkedAt: string;
}

export interface Finding {
  control: string;
  status: 'pass' | 'fail' | 'warning';
  detail: string;
  evidence?: string;
  remediation?: string;
}

export interface ComplianceMonitorConfig {
  platformUrl: string;
  apiKey: string;
  observerApiUrl: string;
  blockchainApiUrl: string;
}

// ─── Implementation ──────────────────────────────────────────────────────────

export class ComplianceMonitor {
  private config: ComplianceMonitorConfig;

  constructor(config: ComplianceMonitorConfig) {
    this.config = config;
  }

  /**
   * Run all compliance checks and produce a unified report.
   */
  async runFullCheck(): Promise<ComplianceReport> {
    const standards = await Promise.all([
      this.checkGDPR(),
      this.checkNATOSTANAGs(),
      this.checkFIPS140(),
      this.checkISO27001(),
      this.checkBlockchainCompliance(),
      this.checkWCAG(),
    ]);

    const summary = { total: 0, passed: 0, failed: 0, warnings: 0 };
    for (const s of standards) {
      for (const f of s.findings) {
        summary.total++;
        if (f.status === 'pass') summary.passed++;
        else if (f.status === 'fail') summary.failed++;
        else summary.warnings++;
      }
    }

    const overallStatus =
      summary.failed === 0
        ? summary.warnings === 0
          ? 'compliant'
          : 'partial'
        : 'non-compliant';

    return {
      generatedAt: new Date().toISOString(),
      overallStatus,
      standards,
      summary,
    };
  }

  // ── GDPR ──────────────────────────────────────────────────────────────────

  /**
   * GDPR compliance checks mapped to architecture requirements:
   *  - Consent verification (Onboarding, Analytics)
   *  - Retention schedule enforcement (Secure Comms, Analytics)
   *  - Deletion execution audit (right to erasure)
   *  - Breach 72-hour notification SLA (Incident Response)
   */
  async checkGDPR(): Promise<StandardResult> {
    const findings: Finding[] = [];

    // Consent verification
    findings.push(
      await this.probeControl({
        control: 'GDPR-ART6-CONSENT',
        url: `${this.config.platformUrl}/api/compliance/gdpr/consent`,
        passDetail: 'User consent records present and valid',
        failDetail: 'Consent records missing or expired',
        remediation: 'Ensure all data processing has documented lawful basis under GDPR Article 6',
      })
    );

    // Retention schedules
    findings.push(
      await this.probeControl({
        control: 'GDPR-RETENTION-SCHEDULE',
        url: `${this.config.platformUrl}/api/compliance/gdpr/retention`,
        passDetail: 'Data retention schedules enforced (12-24 month tiers)',
        failDetail: 'Data retention schedules not enforced or data exceeds retention periods',
        remediation: 'Implement automated data lifecycle management per retention categories',
      })
    );

    // Deletion execution
    findings.push(
      await this.probeControl({
        control: 'GDPR-ART17-ERASURE',
        url: `${this.config.platformUrl}/api/compliance/gdpr/deletion`,
        passDetail: 'Right to erasure requests processed within SLA',
        failDetail: 'Pending erasure requests exceed processing SLA',
        remediation: 'Implement automated deletion pipeline triggered by erasure requests',
      })
    );

    // Breach notification SLA (72 hours per GDPR Article 33)
    findings.push(
      await this.probeControl({
        control: 'GDPR-ART33-BREACH-72H',
        url: `${this.config.platformUrl}/api/compliance/gdpr/breach-sla`,
        passDetail: 'Breach notification workflow active, 72-hour SLA monitored',
        failDetail: 'Breach notification SLA tracking not active or past violations detected',
        remediation:
          'Ensure P1 security events trigger 72-hour breach notification countdown per GDPR Article 33',
      })
    );

    return this.buildResult('GDPR', findings);
  }

  // ── NATO STANAGs ──────────────────────────────────────────────────────────

  /**
   * NATO STANAG compliance checks:
   *  - Classified information access patterns across L1-L4 observer tiers
   *  - Security classification handling for L3/L4 observers (UN/EU/NATO, bilateral)
   */
  async checkNATOSTANAGs(): Promise<StandardResult> {
    const findings: Finding[] = [];
    const tiers = ['L1', 'L2', 'L3', 'L4'] as const;

    for (const tier of tiers) {
      findings.push(
        await this.probeControl({
          control: `NATO-STANAG-${tier}-ACCESS`,
          url: `${this.config.observerApiUrl}/compliance/nato/access-patterns?tier=${tier}`,
          passDetail: `${tier} observer access patterns comply with NATO classification requirements`,
          failDetail: `${tier} access patterns violate NATO classification boundaries`,
          remediation: `Review ${tier} access grants and ensure they align with NATO STANAG security classifications`,
        })
      );
    }

    return this.buildResult('NATO_STANAG', findings);
  }

  // ── FIPS 140-2 ────────────────────────────────────────────────────────────

  /**
   * FIPS 140-2 compliance checks:
   *  - Verify approved algorithms in cipher suites
   *  - AES-256-GCM for symmetric encryption
   *  - RSA-4096 for asymmetric key exchange
   *  - CRYSTALS-Kyber for post-quantum key encapsulation
   *  - CRYSTALS-Dilithium for post-quantum digital signatures
   */
  async checkFIPS140(): Promise<StandardResult> {
    const findings: Finding[] = [];

    const algorithms = [
      { control: 'FIPS-AES-256-GCM', endpoint: 'cipher-suites', name: 'AES-256-GCM symmetric encryption' },
      { control: 'FIPS-RSA-4096', endpoint: 'key-exchange', name: 'RSA-4096 asymmetric key exchange' },
      { control: 'FIPS-CRYSTALS-KYBER', endpoint: 'post-quantum-kem', name: 'CRYSTALS-Kyber key encapsulation' },
      { control: 'FIPS-CRYSTALS-DILITHIUM', endpoint: 'post-quantum-sig', name: 'CRYSTALS-Dilithium digital signatures' },
    ];

    for (const algo of algorithms) {
      findings.push(
        await this.probeControl({
          control: algo.control,
          url: `${this.config.platformUrl}/api/compliance/fips/${algo.endpoint}`,
          passDetail: `${algo.name} verified in active cipher suite configuration`,
          failDetail: `${algo.name} not found or not active in cipher suite`,
          remediation: `Enable ${algo.name} in all TLS configurations and verify with cipher suite audit`,
        })
      );
    }

    return this.buildResult('FIPS_140', findings);
  }

  // ── ISO 27001 ─────────────────────────────────────────────────────────────

  /**
   * ISO 27001 information security controls across all platform modules:
   *  - Access control (A.9)
   *  - Cryptography (A.10)
   *  - Operations security (A.12)
   *  - Communications security (A.13)
   *  - Supplier relationships (A.15)
   */
  async checkISO27001(): Promise<StandardResult> {
    const findings: Finding[] = [];

    const controls = [
      { control: 'ISO27001-A9-ACCESS', endpoint: 'access-control', name: 'Access control (A.9)' },
      { control: 'ISO27001-A10-CRYPTO', endpoint: 'cryptography', name: 'Cryptography (A.10)' },
      { control: 'ISO27001-A12-OPS', endpoint: 'operations', name: 'Operations security (A.12)' },
      { control: 'ISO27001-A13-COMMS', endpoint: 'communications', name: 'Communications security (A.13)' },
      { control: 'ISO27001-A15-SUPPLIER', endpoint: 'supplier', name: 'Supplier relationships (A.15)' },
    ];

    for (const ctrl of controls) {
      findings.push(
        await this.probeControl({
          control: ctrl.control,
          url: `${this.config.platformUrl}/api/compliance/iso27001/${ctrl.endpoint}`,
          passDetail: `${ctrl.name} controls verified`,
          failDetail: `${ctrl.name} controls not meeting requirements`,
          remediation: `Review and remediate ${ctrl.name} per ISO 27001:2022 Annex A`,
        })
      );
    }

    return this.buildResult('ISO_27001', findings);
  }

  // ── Blockchain Compliance ─────────────────────────────────────────────────

  /**
   * Blockchain/smart contract compliance for Trust Mechanisms module:
   *  - Smart contract enforcement verification
   *  - Chain integrity (Merkle tree, BFT consensus)
   *  - Multi-signature validation for critical actions
   */
  async checkBlockchainCompliance(): Promise<StandardResult> {
    const findings: Finding[] = [];

    findings.push(
      await this.probeControl({
        control: 'BC-SMART-CONTRACT-ENFORCEMENT',
        url: `${this.config.blockchainApiUrl}/compliance/smart-contract-enforcement`,
        passDetail: 'Automated compliance enforcement via smart contracts is active',
        failDetail: 'Smart contract enforcement not active or bypassed',
        remediation: 'Verify all government action smart contracts enforce compliance checks before execution',
      })
    );

    findings.push(
      await this.probeControl({
        control: 'BC-CHAIN-INTEGRITY',
        url: `${this.config.blockchainApiUrl}/compliance/chain-integrity`,
        passDetail: 'Blockchain integrity verified (Merkle tree, BFT consensus)',
        failDetail: 'Chain integrity check failed — potential tampering detected',
        remediation: 'Investigate block integrity failure; verify validator set and Merkle proofs',
      })
    );

    findings.push(
      await this.probeControl({
        control: 'BC-MULTI-SIG',
        url: `${this.config.blockchainApiUrl}/compliance/multi-sig-validation`,
        passDetail: 'Multi-signature validation enforced for critical actions',
        failDetail: 'Critical actions executed without multi-signature validation',
        remediation: 'Enforce multi-sig requirement for all high-impact government transactions',
      })
    );

    return this.buildResult('BLOCKCHAIN', findings);
  }

  // ── WCAG 2.1 ──────────────────────────────────────────────────────────────

  /**
   * WCAG 2.1 Level AA accessibility compliance:
   *  - Citizen portal (platform.gov.ua)
   *  - Observer portal
   *  - Onboarding system
   */
  async checkWCAG(): Promise<StandardResult> {
    const findings: Finding[] = [];

    const targets = [
      { control: 'WCAG-CITIZEN-PORTAL', endpoint: 'citizen-portal', name: 'Citizen portal' },
      { control: 'WCAG-OBSERVER-PORTAL', endpoint: 'observer-portal', name: 'Observer portal' },
      { control: 'WCAG-ONBOARDING', endpoint: 'onboarding', name: 'Onboarding system' },
    ];

    for (const target of targets) {
      findings.push(
        await this.probeControl({
          control: target.control,
          url: `${this.config.platformUrl}/api/compliance/wcag/${target.endpoint}`,
          passDetail: `${target.name} meets WCAG 2.1 Level AA criteria`,
          failDetail: `${target.name} has WCAG 2.1 Level AA violations`,
          remediation: `Run axe-core or Lighthouse accessibility audit on ${target.name} and remediate findings`,
        })
      );
    }

    return this.buildResult('WCAG', findings);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private async probeControl(params: {
    control: string;
    url: string;
    passDetail: string;
    failDetail: string;
    remediation: string;
  }): Promise<Finding> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);
      const response = await fetch(params.url, {
        headers: { Authorization: `Bearer ${this.config.apiKey}` },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (response.ok) {
        return {
          control: params.control,
          status: 'pass',
          detail: params.passDetail,
        };
      }

      return {
        control: params.control,
        status: 'fail',
        detail: params.failDetail,
        remediation: params.remediation,
      };
    } catch {
      return {
        control: params.control,
        status: 'warning',
        detail: `${params.control} endpoint unreachable`,
        remediation: params.remediation,
      };
    }
  }

  private buildResult(standard: string, findings: Finding[]): StandardResult {
    const hasFail = findings.some((f) => f.status === 'fail');
    const hasWarning = findings.some((f) => f.status === 'warning');
    const status = hasFail ? 'fail' : hasWarning ? 'warning' : 'pass';

    return {
      standard,
      status,
      findings,
      checkedAt: new Date().toISOString(),
    };
  }
}
