---
title: How We Built an AI-Powered Web3 Security Platform from Bakhmach, Ukraine
published: false
description: AuditorSEC/Audityzer story — building production-grade smart contract auditing, PQC, and BRAVE1 defense tech from a frontline Ukrainian city
tags: web3, security, blockchain, ukraine
cover_image: https://raw.githubusercontent.com/romanchaa997/Audityzer/main/docs/cover.png
canonical_url: https://audityzer.com/blog/building-web3-security-from-ukraine
---

# How We Built an AI-Powered Web3 Security Platform from Bakhmach, Ukraine

> *Building production-grade cybersecurity infrastructure under wartime conditions, from a city 60km from the front line.*

## The Context

Bakhmach, Chernihiv Oblast. 16,500 people. 60km from active combat. This is where AuditorSEC — and Audityzer — was built.

When people ask about our motivation for building a defense-grade, post-quantum secure Web3 security platform, the answer is simple: **necessity creates invention**.

## What is Audityzer?

[Audityzer](https://audityzer.com) is an open-source, AI-powered Web3 security testing platform. It combines:

- **Smart contract vulnerability detection** — reentrancy, flash loans, access control, oracle manipulation, MEV
- **Post-Quantum Cryptography (PQC)** — ML-KEM-768, ML-DSA-87 hybrid encryption
- **NIS2/DORA compliance automation** — EU regulatory framework built-in
- **BRAVE1 defense PoC** — drone cybersecurity overlay for Ukraine's defense ecosystem

## The Technical Stack

Here's what we run in production:

```yaml
Infrastructure:
  - Kubernetes: DigitalOcean fra1 (neuralinfra-k8s)
  - GitOps: ArgoCD
  - Streaming: NATS JetStream (3 topics)
  - Database: PostgreSQL + Row Level Security (multi-tenant)
  - CDN/DNS: Cloudflare (DNSSEC enabled, DKIM validated)

Security Pipeline:
  - SARIF generation with AI severity scoring
  - CodeQL + Semgrep + npm audit in CI
  - Smart contract scanners: Slither, Mythril, Echidna, Foundry fuzz
  - PQC: ML-KEM-768 (CRYSTALS-Kyber) + ML-DSA-87 (CRYSTALS-Dilithium)

AI Layer:
  - OpenAI/Grok for report generation
  - HuggingFace Spaces for live demos
  - RAG pipelines for compliance knowledge base
```

## The BRAVE1 Connection

Ukraine's BRAVE1 defense tech cluster is one of the most exciting innovation programs in the world right now. We're building a cybersecurity overlay for drone operations — specifically addressing:

- **Secure communication channels** using PQC for IoT/embedded devices (ESP32/RPi)
- **Real-time threat detection** via NATS JetStream event streaming
- **Evidence-grade audit trails** for NIS2/DORA compliance

Our SPRINT-BAK-COR-001 PoC targets TRL-4 → TRL-6 — from lab demonstration to system validation in relevant environment.

## The Open Source Strategy

We chose open source for Audityzer deliberately:

1. **Trust** — security tools must be auditable
2. **Community** — the Web3 security community finds bugs we miss
3. **Grants** — EU, BRAVE1, Horizon Europe all prefer open-source recipients
4. **GTM** — free tier drives enterprise pipeline

Revenue comes from the commercial SaaS tier:

| Tier | Price |
|------|-------|
| MVP Audit | $2,000–$12,000 |
| DeFi Audit | $40,000–$150,000 |
| Enterprise | $120,000–$400,000 |

## Free Tools Stack (Everything We Use That's Free)

For other bootstrapped founders:

| Tool | Use Case |
|------|----------|
| GitHub Actions | CI/CD, security gates |
| HuggingFace Spaces | AI model demos |
| Railway | Backend deployments |
| Cloudflare | DNS, DDoS, Workers |
| Grafana Cloud | Monitoring (10k series free) |
| n8n (self-hosted) | Workflow automation |
| Telegram Bots | Community + alerting |
| ClickUp | Project management |

## Try It Yourself

```bash
npm install audityzer
npx audityzer scan --target https://your-protocol.com --mode advanced
```

Live demo: [huggingface.co/spaces/Audityzer/audityzer-demo](https://huggingface.co/spaces/Audityzer/audityzer-demo)

BRAVE1 Risk Assistant: [huggingface.co/spaces/Audityzer/brave1-risk-assistant](https://huggingface.co/spaces/Audityzer/brave1-risk-assistant)

GitHub: [github.com/romanchaa997/Audityzer](https://github.com/romanchaa997/Audityzer)

---

*Igor Romanenko — Co-Founder, AuditorSEC · Bakhmach, Ukraine · April 2026*

*We're looking for: DeFi protocol partners for security audits, EU grant co-applicants (Horizon Europe), BRAVE1 ecosystem collaborators, and open-source contributors.*
