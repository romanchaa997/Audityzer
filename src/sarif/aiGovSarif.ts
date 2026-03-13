/**
 * SARIF Generator for AI Governance Platform
 *
 * Produces SARIF 2.1.0 reports with 8 custom rules targeting security
 * and compliance gaps identified in the AI Gov Platform architecture:
 *
 *  AIGOV_AUTH_001     — Unauthenticated simulation endpoints (9.5)
 *  AIGOV_GDPR_001     — Neural data without Article 9 framework (9.0)
 *  AIGOV_K8S_001      — Kubernetes RBAC misconfiguration (8.5)
 *  AIGOV_CRYPTO_001   — Post-quantum crypto incomplete (7.5)
 *  AIGOV_BLOCKCHAIN_001 — Smart contract vulnerability (8.0)
 *  AIGOV_OBSERVER_001 — Observer privilege escalation (9.0)
 *  AIGOV_DATA_001     — PostgreSQL credentials exposure (7.0)
 *  AIGOV_PORT_001     — Port conflict simulation vs analytics (6.5)
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AiGovSarifReport {
  $schema: string;
  version: '2.1.0';
  runs: AiGovSarifRun[];
}

interface AiGovSarifRun {
  tool: { driver: AiGovSarifDriver };
  results: AiGovSarifResult[];
}

interface AiGovSarifDriver {
  name: string;
  version: string;
  informationUri: string;
  rules: AiGovSarifRule[];
}

export interface AiGovSarifRule {
  id: string;
  shortDescription: { text: string };
  fullDescription: { text: string };
  help: { text: string; markdown: string };
  properties: {
    tags: string[];
    'security-severity': string;
  };
}

interface AiGovSarifResult {
  ruleId: string;
  level: 'error' | 'warning' | 'note';
  message: { text: string };
  locations: Array<{
    physicalLocation: {
      artifactLocation: { uri: string };
      region: { startLine: number; startColumn: number };
    };
  }>;
}

export interface AiGovFinding {
  ruleId: string;
  message: string;
  location: string;
  line?: number;
  column?: number;
}

// ─── Rules ───────────────────────────────────────────────────────────────────

export const AI_GOV_SARIF_RULES: AiGovSarifRule[] = [
  {
    id: 'AIGOV_AUTH_001',
    shortDescription: { text: 'Unauthenticated simulation endpoints' },
    fullDescription: {
      text: 'Simulation Framework services on ports 8000-8004 (Multiverse Core, Quantum Processor, Spatial Engine, Consciousness Hub, Temporal Processor) are exposed without any documented authentication mechanism.',
    },
    help: {
      text: 'Add authentication middleware to all simulation service endpoints or isolate them behind a VPN.',
      markdown: `## Unauthenticated Simulation Endpoints (ports 8000-8004)

**Security Severity:** 9.5 / 10

### Problem
The Parallel Universe Simulation Framework exposes 5 services on ports 8000-8004 with no documented authentication. Any network-reachable client can interact with these endpoints.

### Affected Services
| Port | Service |
|------|---------|
| 8000 | Multiverse Core |
| 8001 | Quantum Processor |
| 8002 | Spatial Engine |
| 8003 | Consciousness Hub |
| 8004 | Temporal Processor |

### Remediation
1. **Immediate:** Add OAuth 2.0 bearer token validation middleware to all 5 services
2. **Short-term:** Deploy Kubernetes NetworkPolicy restricting access to authorized pods only
3. **Long-term:** Evaluate whether these speculative services should be deployed at all in production

### References
- Architecture: Section 3.10 (Parallel Universe Simulation Framework)
- Risk Flags: Section 12.2 (No documented authentication on simulation service endpoints)`,
    },
    properties: {
      tags: ['security', 'authentication', 'simulation', 'ai-gov'],
      'security-severity': '9.5',
    },
  },
  {
    id: 'AIGOV_GDPR_001',
    shortDescription: { text: 'Neural data without Article 9 framework' },
    fullDescription: {
      text: 'The Neural Civic Intelligence module processes BCI (Brain-Computer Interface) and EEG data which constitutes special-category personal data under GDPR Article 9, but no explicit consent framework or DPIA is documented.',
    },
    help: {
      text: 'Implement GDPR Article 9 consent framework for all neural/biometric data processing.',
      markdown: `## Neural Data Without GDPR Article 9 Framework

**Security Severity:** 9.0 / 10

### Problem
The Neural Civic Intelligence module processes brain-computer interface (BCI) signals including EEG and fNIRS data. Under GDPR Article 9, biometric and health-related data requires:
- Explicit consent separate from general platform consent
- Data Protection Impact Assessment (DPIA)
- Designated special-category data processing safeguards

### Affected Components
- \`CivicBrainInterface\` — EEG + fNIRS multi-modal signal capture
- \`NeuralSignalAnalyzer\` — ICA, CSP, Wavelet, DeepNeuralDecoder
- \`NeuralVotingSystem\` — VotingIntentionDetector, SubconsciousBiasDetector

### Remediation
1. Conduct a DPIA specifically for neural data processing
2. Implement separate, informed consent flow for BCI participation
3. Deploy \`NeuralPrivacyProtector\` with verified anonymization before any storage
4. Establish data minimization — capture only signals necessary for civic participation
5. Define retention periods shorter than general platform data

### References
- Architecture: Section 3.3 (Neural Civic Intelligence)
- Compliance: Section 12.3 (GDPR Article 9 framework absent for BCI/neural data)`,
    },
    properties: {
      tags: ['compliance', 'gdpr', 'privacy', 'neural', 'ai-gov'],
      'security-severity': '9.0',
    },
  },
  {
    id: 'AIGOV_K8S_001',
    shortDescription: { text: 'Kubernetes RBAC misconfiguration' },
    fullDescription: {
      text: 'The gov-platform Kubernetes namespace may have overly permissive RBAC role bindings, missing Pod Security Admission policies, or privileged container configurations that enable privilege escalation.',
    },
    help: {
      text: 'Audit and restrict RBAC bindings in the gov-platform namespace.',
      markdown: `## Kubernetes RBAC Misconfiguration

**Security Severity:** 8.5 / 10

### Problem
The \`gov-platform\` namespace hosts all platform modules. Misconfigured RBAC could allow:
- Service accounts to escalate to cluster-admin
- Pods to run as privileged containers
- Cross-namespace access to sensitive resources

### Remediation
1. Audit all \`RoleBinding\` and \`ClusterRoleBinding\` in \`gov-platform\`
2. Remove any \`cluster-admin\` bindings from service accounts
3. Enable Pod Security Admission with \`restricted\` profile
4. Implement Kubernetes audit logging for RBAC changes
5. Review security-policies/gdpr-compliance.yaml for correct scoping

### References
- Architecture: Section 5 Layer 4 (Network Security)
- Training Materials: \`kubectl get pods -n gov-platform\``,
    },
    properties: {
      tags: ['security', 'kubernetes', 'rbac', 'infrastructure', 'ai-gov'],
      'security-severity': '8.5',
    },
  },
  {
    id: 'AIGOV_CRYPTO_001',
    shortDescription: { text: 'Post-quantum crypto incomplete deployment' },
    fullDescription: {
      text: 'CRYSTALS-Kyber (key encapsulation) and CRYSTALS-Dilithium (digital signatures) are referenced in the Secure Communications architecture, but deployment completeness across all transport layers (Matrix, Signal, WebRTC, XMPP, SIP) is unverified.',
    },
    help: {
      text: 'Verify post-quantum cryptography deployment across all communication channels.',
      markdown: `## Post-Quantum Cryptography Incomplete Deployment

**Security Severity:** 7.5 / 10

### Problem
The platform references NIST PQC algorithms but verification of actual deployment is incomplete:
- CRYSTALS-Kyber for key encapsulation — referenced but not verified active
- CRYSTALS-Dilithium for digital signatures — referenced but not verified active
- FALCON as compact signature fallback — mentioned but deployment unknown

### Expected Cipher Suite
| Algorithm | Use | Status |
|-----------|-----|--------|
| AES-256-GCM | Symmetric encryption | Assumed active |
| RSA-4096 | Key exchange | Assumed active |
| CRYSTALS-Kyber | PQC key encapsulation | **Unverified** |
| CRYSTALS-Dilithium | PQC digital signatures | **Unverified** |

### Remediation
1. Audit TLS configuration on all 5 communication protocols
2. Verify PQC cipher suites are negotiated (use \`openssl s_client\`)
3. Test with quantum-resistant TLS testing tools
4. Ensure FALCON is available as signature fallback

### References
- Architecture: Section 3.9 (Secure Communications), Section 5 Layer 3`,
    },
    properties: {
      tags: ['security', 'cryptography', 'post-quantum', 'ai-gov'],
      'security-severity': '7.5',
    },
  },
  {
    id: 'AIGOV_BLOCKCHAIN_001',
    shortDescription: { text: 'Smart contract vulnerability' },
    fullDescription: {
      text: 'Ethereum EVM smart contracts in the Trust Mechanisms module handle automated compliance enforcement, budget disbursement, and inter-agency agreements. These high-value contracts require formal security audit for reentrancy, integer overflow, access control, and oracle manipulation.',
    },
    help: {
      text: 'Run Slither/Mythril analysis on all deployed smart contracts.',
      markdown: `## Smart Contract Vulnerability

**Security Severity:** 8.0 / 10

### Problem
Trust Mechanisms smart contracts automate critical government functions:
- Automated compliance enforcement
- Performance-triggered budget disbursement
- Multi-party inter-agency agreements

These contracts are high-value targets for exploitation.

### Common Vulnerability Patterns
- **Reentrancy:** External calls before state updates
- **Integer overflow/underflow:** Unchecked arithmetic in financial calculations
- **Access control:** Missing \`onlyOwner\` or role checks on critical functions
- **Oracle manipulation:** Untrusted external data feeds influencing contract state

### Remediation
1. Run Slither static analysis on all Solidity source
2. Run Mythril symbolic execution for deeper vulnerability detection
3. Verify checks-effects-interactions pattern or OpenZeppelin ReentrancyGuard
4. Audit multi-signature validation for critical government actions
5. Review oracle integration for manipulation vectors

### References
- Architecture: Section 3.14 (Trust Mechanisms)
- Section 5 Layer 5 (Blockchain Integrity)`,
    },
    properties: {
      tags: ['security', 'blockchain', 'smart-contract', 'ethereum', 'ai-gov'],
      'security-severity': '8.0',
    },
  },
  {
    id: 'AIGOV_OBSERVER_001',
    shortDescription: { text: 'Observer privilege escalation' },
    fullDescription: {
      text: 'The Observer Verification Framework implements 4 access tiers (L1-Public to L4-Bilateral). Insufficient server-side tier enforcement could allow lower-tier observers to access classified L3/L4 data intended for international auditors and bilateral partners.',
    },
    help: {
      text: 'Enforce strict server-side tier boundaries in the Observer Verification API.',
      markdown: `## Observer Privilege Escalation

**Security Severity:** 9.0 / 10

### Problem
The Observer Verification Framework defines 4 access tiers:

| Level | Users | Data Sensitivity |
|-------|-------|-----------------|
| L1 | General public, media | Public information |
| L2 | NGOs, academics | Non-sensitive government data |
| L3 | UN, EU, NATO auditors | Full government operations |
| L4 | Bilateral partners | Bilateral cooperation data |

If tier enforcement is client-side only or has gaps, L1/L2 observers could access L3/L4 classified data.

### Remediation
1. Implement server-side access tier enforcement on **every** API endpoint
2. Add integration tests: L1 credentials must receive 403 on L3/L4 resources
3. Verify MFA is enforced for all L3+ observer sessions
4. Deploy continuous monitoring for cross-tier access attempts
5. Log all tier boundary violations as critical security events

### References
- Architecture: Section 3.4 (Observer Verification Framework)
- Section 11.3 (Threat Detection — Unauthorized Access)`,
    },
    properties: {
      tags: ['security', 'access-control', 'observer', 'privilege-escalation', 'ai-gov'],
      'security-severity': '9.0',
    },
  },
  {
    id: 'AIGOV_DATA_001',
    shortDescription: { text: 'PostgreSQL credentials exposure' },
    fullDescription: {
      text: 'The Incident Response Runbook contains hardcoded PostgreSQL credentials (app_user/app_db on port 5432) and internal contact emails (o.petrov@company.com, cto@company.com), revealing infrastructure details and organizational structure.',
    },
    help: {
      text: 'Remove hardcoded credentials from documentation and rotate secrets.',
      markdown: `## PostgreSQL Credentials Exposure

**Security Severity:** 7.0 / 10

### Problem
The Incident Response Runbook (\`incident_response_runbook.pdf\`) contains:
- Database connection: \`psql -h localhost -U app_user -d app_db\` on port 5432
- Internal contacts: \`o.petrov@company.com\`, \`cto@company.com\`
- Infrastructure commands with real namespace and deployment names

### Remediation
1. **Immediate:** Rotate the \`app_user\` database password
2. Remove hardcoded credentials from all documentation
3. Use Kubernetes Secrets or HashiCorp Vault for database connection strings
4. Restrict PostgreSQL port 5432 via NetworkPolicy to \`gov-platform\` pods only
5. Replace personal emails with role-based distribution lists in runbooks

### References
- Architecture: Section 3.2 (Incident Response Runbook)
- Risk Flags: Section 12.2 (Hardcoded contact emails, PostgreSQL credentials)`,
    },
    properties: {
      tags: ['security', 'credentials', 'database', 'postgresql', 'ai-gov'],
      'security-severity': '7.0',
    },
  },
  {
    id: 'AIGOV_PORT_001',
    shortDescription: { text: 'Port conflict: simulation vs analytics' },
    fullDescription: {
      text: 'Ports 8000-8004 are allocated to both the Simulation Framework (5 services) and the Analytics/Prometheus system (ports 8000-8002 for metrics). The Incident Response health check also uses localhost:8000/api/health. This creates a conflict that could lead to service disruption or misdirected traffic.',
    },
    help: {
      text: 'Reassign port allocations to eliminate conflicts.',
      markdown: `## Port Conflict: Simulation vs Analytics

**Security Severity:** 6.5 / 10

### Problem
Three systems claim overlapping ports:

| Port | Simulation Framework | Analytics (Prometheus) | Incident Response |
|------|---------------------|----------------------|-------------------|
| 8000 | Multiverse Core | User engagement metrics | /api/health |
| 8001 | Quantum Processor | Crisis intervention metrics | — |
| 8002 | Spatial Engine | Safety feature metrics | — |
| 8003 | Consciousness Hub | — | — |
| 8004 | Temporal Processor | — | — |

### Remediation
1. Reassign Simulation Framework to ports 9000-9004
2. Or reassign Prometheus to standard port 9090+
3. Update all service discovery, health checks, and monitoring configs
4. Document final port allocation in the architecture
5. Add port conflict detection to CI/CD pipeline

### References
- Architecture: Section 12.1 (Port Conflicts)
- Section 3.10 (Simulation Framework) vs Section 3.15 (Mindfulness Analytics)`,
    },
    properties: {
      tags: ['configuration', 'infrastructure', 'port-conflict', 'ai-gov'],
      'security-severity': '6.5',
    },
  },
];

// ─── Generator ───────────────────────────────────────────────────────────────

/**
 * Generate a SARIF 2.1.0 report for AI Gov Platform findings.
 */
export function generateAiGovSarifReport(findings: AiGovFinding[]): AiGovSarifReport {
  const results: AiGovSarifResult[] = findings.map((finding) => {
    const rule = AI_GOV_SARIF_RULES.find((r) => r.id === finding.ruleId);
    const severity = parseFloat(rule?.properties['security-severity'] ?? '5.0');

    return {
      ruleId: finding.ruleId,
      level: severity >= 8.0 ? 'error' : severity >= 6.0 ? 'warning' : 'note',
      message: { text: finding.message },
      locations: [
        {
          physicalLocation: {
            artifactLocation: { uri: finding.location },
            region: {
              startLine: finding.line ?? 1,
              startColumn: finding.column ?? 1,
            },
          },
        },
      ],
    };
  });

  return {
    $schema:
      'https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json',
    version: '2.1.0',
    runs: [
      {
        tool: {
          driver: {
            name: 'Audityzer AI Gov Platform Scanner',
            version: '1.0.0',
            informationUri: 'https://github.com/audityzer/audityzer',
            rules: AI_GOV_SARIF_RULES,
          },
        },
        results,
      },
    ],
  };
}
