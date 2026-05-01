# AuditorSEC Governance Charter v1.0

> Date: 02.05.2026 | Version: 1.0 | Repo: Audityzer

## 1. Purpose

This document defines the governance structure for AuditorSEC / Audityzer.

## 2. Streams

| Stream | Focus | Owner | Deliverable |
|--------|-------|-------|-------------|
| G - Governance | NIS2, PQC, DORA, EU AI Act | @romanchaa997 | Charter, compliance docs |
| P - Production | MVP, features, deployment | @romanchaa997 | Live releases, PRs |
| R - Risk | Risk register, blockers | @romanchaa997 | Risk log updated |
| C - Coordination | Daily sync, RACI | @romanchaa997 | Sync running |

## 3. Compliance Matrix (NIS2 + DORA)

| Requirement | NIS2 | DORA | Audityzer Component | Status |
|-------------|------|------|---------------------|--------|
| Incident reporting 24h | Art.23 | Art.19 | Incident Runbook | OPEN |
| ICT Risk management | Art.21 | Art.17 | Risk Register (Sheets) | IN PROGRESS |
| Supply chain security | Art.21(d) | Art.28 | Slither/Mythril/Echidna | OPEN |
| Vulnerability disclosure | Art.12 | Art.26 | SARIF + GitHub Security | ACTIVE |
| PQC / crypto-agility | ENISA | Art.6 | ML-KEM-768 + ML-DSA-87 | IN PROGRESS |
| Penetration testing | Art.21(e) | Art.26 | CLI scan + Foundry fuzz | ACTIVE |
| Audit logging | Art.21(g) | Art.9 | K8s RequestResponse | ACTIVE |
| Governance | Art.20 | Art.5 | This charter | ACTIVE |

## 4. Rules

- 1 owner + 1 deliverable per stream per sprint
- Scope freeze: Monday 09:00 EEST
- Scope changes: Friday triage only
- WIP limit: max 2 active tasks per stream
- Charter review: Q2, Q3, Q4 2026

## 5. Sprint Cadence

| Day | Action |
|-----|--------|
| Monday 09:00 | Scope freeze + dependency check |
| Wednesday | Production milestone check |
| Thursday | Risk register review |
| Friday | Sprint closeout + next sprint planning |

## 6. Daily Async Sync

Channel: GitHub Discussions > AuditorSEC Daily Sync
Time: 09:00 EEST

Format:
```
[DATE] AuditorSEC Daily Sync
Yesterday: ...
Today: ...
Blockers: yes/no
```

## 7. Links

- MVP: https://audityzer.onrender.com/ (v1.1.3)
- Risk Register: https://docs.google.com/spreadsheets/d/1WgQ8xidC9x3yzN2oBqmHKwR-0LBCINHS5YVaQDdWftA
- Space: https://www.perplexity.ai/spaces/novii-prostir-aYF6BXbGTj2CUeHUfCllQQ
- Repo: https://github.com/romanchaa997/Audityzer

---
_Approved: @romanchaa997 | 02.05.2026_
