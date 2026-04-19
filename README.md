# Audityzer — AI-Powered Web3 Security Platform


## 🛡️ AuditorSEC — Enterprise Web3 Security Auditing Platform

> **TRL4 PoC** | BRAVE1 Cybersecurity Track | Deadline: 30.04.2026

[![Railway](https://img.shields.io/badge/Railway-deployed-success)](https://audityzer-production-5112.up.railway.app)
[![BRAVE1 Tier](https://img.shields.io/badge/BRAVE1-Tier%202%20(UAH%208M%20total)-blue)](https://brave1.gov.ua)
[![GTM Strategy](https://img.shields.io/badge/docs-GTM%20Strategy-informational)](docs/GTM_STRATEGY.md)
[![API](https://img.shields.io/badge/FastAPI-/api/v1/audit-green)](https://audityzer.onrender.com/health)

### What is AuditorSEC?

AuditorSEC is a security auditing platform for Web3/dApp smart contracts, built on top of Audityzer. It provides:

- 🔍 **Automated vulnerability scanning** via Slither + Foundry (Optimism, EVM chains)
- 📄 **PDF audit reports** with MinIO-backed storage and presigned URLs
- 🧠 **AI-powered analysis** (GPT-4) for log interpretation and anomaly detection
- 🌐 **Multi-chain support**: Optimism, Ethereum, Polygon (UHIP-2A schema)
- 🇺🇦 **BRAVE1 / DIANA compliant**: dual-use security tooling for Ukrainian defense sector

### Quick Start

```bash
# API (FastAPI)
curl -X POST https://audityzer.onrender.com/api/v1/audit \
  -H "Content-Type: application/json" \
  -d '{"project_name": "MyDeFiProtocol", "log_text": "transfer(0x..., 1000000)"}'

# Health check
curl https://audityzer.onrender.com/health
```

---


[![npm version](https://badge.fury.io/js/audityzer.svg)](https://www.npmjs.com/package/audityzer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/romanchaa997/Audityzer/actions/workflows/ci.yml/badge.svg)](https://github.com/romanchaa997/Audityzer/actions)
[![HF Spaces](https://img.shields.io/badge/HuggingFace-Spaces-blue)](https://huggingface.co/Audityzer)
[![BRAVE1](https://img.shields.io/badge/BRAVE1-Cybersecurity%20Track-red)](https://brave1.gov.ua)
[![NIS2](https://img.shields.io/badge/NIS2-Compliant%20Design-green)](https://www.nis2directive.eu)
[![PQC](https://img.shields.io/badge/PQC-ML--KEM--768%20Ready-purple)](https://audityzer.com)

**The most advanced open-source Web3 security testing toolkit**
Smart contract auditing · AI vulnerability detection · Post-Quantum Cryptography · Defense-grade compliance

[Live Demo](https://audityzer.com) · [HF Spaces](https://huggingface.co/spaces/Audityzer/audityzer-demo) · [BRAVE1 PoC](https://brave1.gov.ua) · [Documentation](https://audityzer.com/docs) · [bbbhhai.com](https://bbbhhai.com)

---

## What is Audityzer?

Audityzer is a **production-grade, AI-enhanced Web3 security testing platform** built for DeFi protocols, smart contract auditors, and defense-adjacent cybersecurity teams. Built under the AuditorSEC initiative, it combines:

- **AI-powered vulnerability detection** with Playwright-based browser automation
- **Post-Quantum Cryptography (PQC)** readiness — ML-KEM-768, ML-DSA-87, hybrid X25519+PQC
- **Multi-tenant Kubernetes deployment** on DigitalOcean (fra1) with ArgoCD GitOps
- **NATS JetStream event bus** for real-time security telemetry
- **BRAVE1 defense PoC** — Bakhmach cybersecurity overlay, TRL-4→TRL-6
- **NIS2 / DORA compliance** framework with automated audit trails

---

## Architecture

```
Audityzer Platform
├── AI Security Engine      # Playwright + OpenAI + custom SARIF scanner
├── Smart Contract Scanner  # Slither, Mythril, Echidna, Foundry fuzz
├── PQC Module              # ML-KEM-768, ML-DSA-87, hybrid TLS
├── Multi-tenant API        # FastAPI + PostgreSQL RLS + Cloudflare Hyperdrive
├── NATS JetStream Bus      # Real-time event streaming (3 topics)
├── K8s Orchestration       # DigitalOcean fra1, ArgoCD, Prometheus/Grafana
├── Defense Branch          # BRAVE1 SPRINT-BAK-COR-001, drone cybersecurity
└── Compliance Layer        # NIS2 Art.20/21/23, DORA, SOC/MDR
```

---

## Features

### Security Testing
- 20+ vulnerability detection algorithms (reentrancy, flash loans, access control, oracle manipulation, MEV)
- Cross-chain support: Ethereum, Solana, Optimism L2, Arbitrum, BSC
- AI-powered SARIF report generation with severity scoring
- OWASP / NIST CSF / SCA / DAST / SAST pipelines
- Web3 wallet integration: MetaMask, WalletConnect, Coinbase Wallet

### Infrastructure & DevSecOps
- Kubernetes (DigitalOcean neuralinfra-k8s, fra1) + ArgoCD GitOps
- GitHub Actions CI/CD with CodeQL, Semgrep, dependency audit
- Multi-tenant PostgreSQL with Row Level Security (RLS)
- Apache SeaTunnel CDC sync + NATS JetStream streaming
- Cloudflare DNS / Workers / Hyperdrive connection pooling
- Telegram bot ecosystem: `audityzerbot`, `AuditorSECAlertBot`, `audityzeralertsbot`

### Post-Quantum Cryptography (PQC)
- ML-KEM-768 (CRYSTALS-Kyber) key encapsulation
- ML-DSA-87 (CRYSTALS-Dilithium) digital signatures
- Hybrid X25519 + PQC for backwards-compatible TLS
- NIS2-aligned crypto-agility policy engine
- IoT edge PQC (ESP32/RPi) via BRAVE1 defense track

### Compliance & Governance
- NIS2 Directive (EU 2022/2555) — Art. 20 management, Art. 21 risk/crypto, Art. 23 incident reporting
- DORA-aligned incident response workflows
- ForestESG governance layer — ESG risk scoring, resource tracking
- SOC/MDR telemetry with Grafana + ClickHouse dashboards
- UHIP-2A justice/compliance integration

---

## Quick Start

```bash
# Install
npm install audityzer

# Run security scan
npx audityzer scan --target https://your-protocol.com --mode advanced

# Docker
docker run -p 3000:3000 audityzer/platform:latest

# Helm (K8s)
helm install audityzer ./charts/audityzer -n audityzer
helm install nats nats/nats -n audityzer --set nats.jetstream.enabled=true
```

---

## Live Infrastructure

| Service | Status | URL |
|---------|--------|-----|
| Main Platform | Production | [audityzer.com](https://audityzer.com) |
| Grafana Dashboard | Live | [bbbhhai.com](https://bbbhhai.com) |
| HF Demo Space | Running | [audityzer-demo](https://huggingface.co/spaces/Audityzer/audityzer-demo) |
| BRAVE1 Risk Assistant | Running | [brave1-risk-assistant](https://huggingface.co/spaces/Audityzer/brave1-risk-assistant) |
| K8s Cluster | fra1 DO | neuralinfra-k8s |
| Load Balancer | Active | 129.212.254.79 |

---

## Grant & Program Track

- **BRAVE1** — Cybersecurity track, 8,000,000 UAH, 2026 (SPRINT-BAK-COR-001 Bakhmach PoC)
- **Diia.City** — R&D grant matching, innovation track 2026
- **USF Startup EDGE** — 2026 program
- **Horizon Europe** — Civic-Tech / Quantum-Safe Governance track
- **EU4UA / WNISEF** — Defense-adjacent technology

---

## Revenue Model (GTM 2026)

| Tier | Scope | Price |
|------|-------|-------|
| MVP Audit | Early-stage protocols | $2,000–$12,000 |
| DeFi Audit | Production DeFi | $40,000–$150,000 |
| Enterprise | Institutional Web3 | $120,000–$400,000 |

Target: **300,000 UAH/month Q2 2026** | ICP: Immunefi, BRAVE1, EU institutions, PeckShield/Spearbit-adjacent

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

```bash
git clone https://github.com/romanchaa997/Audityzer
cd Audityzer
npm install
npm run dev
```

---

Built in Ukraine with love and resilience. Bakhmach, Chernihiv Oblast — AuditorSEC Initiative 2024-2026

[![GitHub stars](https://img.shields.io/github/stars/romanchaa997/Audityzer?style=social)](https://github.com/romanchaa997/Audityzer/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/romanchaa997/Audityzer?style=social)](https://github.com/romanchaa997/Audityzer/network)
[![GitHub watchers](https://img.shields.io/github/watchers/romanchaa997/Audityzer?style=social)](https://github.com/romanchaa997/Audityzer/watchers)


---

## AuditorSEC — Advanced Threat Intelligence Modules

### Support & SSO Attack Surface

Detects identity-layer attacks inspired by real-world threat actors (Scattered Spider / The Com).

**Scope:**
- SaaS SSO providers: Okta, Azure AD, Google Workspace, Duo
- Help desk / support portal impersonation vectors
- MFA bypass: SIM-swap, SS7, push-fatigue, voice phishing
- Identity provider (IdP) federation misconfigurations

**Automated Checks:**
- `sso:mfa-fatigue` — detects repeated push notification abuse patterns
- `sso:helpdesk-impersonation` — maps support ticket flows for social engineering risk
- `sso:sim-swap-exposure` — flags SMS-based 2FA as high-risk for telco-adjacent targets
- `sso:idp-misconfiguration` — SAML/OIDC trust chain validation
- `sso:vishing-surface` — enumerates publicly exposed org charts and employee directories

---

### Teenage Threat Actor Profile (TTAP) Model

Risk scoring model for organizations targeted by young, financially-motivated threat actors.

**Profile Indicators:**
- Target sector: Telecom, SaaS, Crypto exchanges, Gaming platforms
- Attack vectors: Social engineering, credential stuffing, insider recruitment
- Motivation: Financial gain, peer status (The Com / Lapsus$ behavioral patterns)
- Age cohort risk: 16-24 operators with high OPSEC variance

**TTAP Risk Scoring:**
```
TTAP Score = (SSO_Surface × 0.4) + (HelpDesk_Exposure × 0.3) + (Crypto_Assets × 0.3)
```
- Score 0-3: Low — standard controls sufficient
- Score 4-6: Medium — MFA hardening + SOC monitoring recommended
- Score 7-10: High — emergency IdP review + vishing simulation required

---

### Ransomware Alliance Risk (RaaS) Finding Type

New finding category for organizations exposed to RaaS affiliate networks.

**Finding Types:**
- `RAAS-001`: Initial Access Broker (IAB) credential exposure
- `RAAS-002`: RaaS affiliate recruitment surface (dark web job board exposure)
- `RAAS-003`: Double-extortion data exfil pathway identified
- `RAAS-004`: Backup/recovery infrastructure reachable from compromised segment
- `RAAS-005`: Cyber insurance disclosure risk (ransom negotiation surface)

**SARIF Integration:**
```json
{
  "ruleId": "RAAS-001",
  "level": "error",
  "message": "Initial Access Broker credential exposure detected via combo-list match",
  "properties": {
    "threat-actor-profile": "RaaS-Affiliate",
    "ttap-score": 8,
    "recommended-action": "Immediate credential rotation + dark web monitoring activation"
  }
}
```

---

### Human Stories in Reports

AuditorSEC reports include real-world context sections that connect technical findings to human impact.

**Format per finding:**
```
## Human Story — [Finding ID]
**What happened in the real world:**
[Brief anonymized case study — e.g., MGM Resorts breach via 10-minute vishing call]

**Why this matters for your organization:**
[Contextual paragraph connecting the finding to the client's sector]

**The people at risk:**
[Who in the organization is targeted — helpdesk staff, executives, IT admins]
```

**Example — SSO MFA Fatigue:**
> In 2023, a major US casino operator lost control of their Okta tenant after attackers called the IT helpdesk posing as an employee. The attack took under 10 minutes and resulted in $100M+ in damages. AuditorSEC detected equivalent exposure in your support portal flow.

---

### Anti-Lapsus$ / Anti-TheCom Security Course

Part of the **AuditorSEC Academy** — free educational track for Ukrainian cybersecurity professionals.

**Module: Social Engineering & Identity Attacks**

| Lesson | Topic | Duration |
|--------|-------|----------|
| 1 | How The Com operates — recruitment, hierarchy, targets | 45 min |
| 2 | SIM-swap mechanics and telecom vulnerabilities | 60 min |
| 3 | Vishing simulation lab — defending the helpdesk | 90 min |
| 4 | Okta / Azure AD hardening against TTAP-class attacks | 75 min |
| 5 | Incident response for social engineering breaches | 60 min |
| 6 | Legal & ethical framework — Ukraine Criminal Code Art. 361-363 | 45 min |

**Certification:** AuditorSEC Anti-Social-Engineering Specialist (ASES)

---

### Talent Pipeline: від школяра до white-hat через AuditorSEC

**Mission:** Convert curious Ukrainian teenagers into certified ethical hackers — not threat actors.

**3-Stage Pipeline:**

**Stage 1 — Школяр (Age 14-17):**
- Free CTF platform with Web3 + OSINT challenges
- Mentorship from AuditorSEC community
- Monthly hackathons with BRAVE1 recognition

**Stage 2 — Стажер (Age 17-21):**
- Paid bug bounty program on Audityzer platform
- Supervised real-world audit participation
- AuditorSEC Certified Junior Auditor (ACJA) credential

**Stage 3 — White-Hat (21+):**
- Full employment pipeline to AuditorSEC partner firms
- NIS2/DORA compliance specialization
- BRAVE1 defense project contributions

> "The same curiosity that makes a teenager pick a lock should be channeled into picking apart smart contracts legally." — AuditorSEC Initiative

---

## 7-Day AuditorSEC Integration Roadmap

| Day | Task | Output |
|-----|------|--------|
| 1 | Document SSO Attack Surface module spec | `/docs/modules/sso-attack-surface.md` |
| 2 | Implement TTAP risk scoring engine | `src/analyzers/ttap-scorer.ts` |
| 3 | Add RaaS finding types to SARIF schema | `src/sarif/raas-findings.json` |
| 4 | Build Human Stories template engine | `src/reports/human-stories.ts` |
| 5 | Create Anti-TheCom course outline + first lesson | `academy/anti-thecom/lesson-01.md` |
| 6 | Launch talent pipeline landing page | `docs/talent-pipeline.md` |
| 7 | Integration test: full audit report with new modules | `tests/e2e/full-report-with-ttap.spec.ts` |

---

*AuditorSEC Initiative — Захищаємо Web3. Виховуємо наступне покоління. Built in Ukraine.*
