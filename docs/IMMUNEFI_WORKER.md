# 🤖 Immunefi Security Worker — Automated Bug Bounty Pipeline

> *"Like the Manoid AI-agent that autonomously found pallets in a chaotic warehouse — AuditorSEC's Immunefi Worker runs 24/7, hunts bugs, and surfaces only top candidates to you."*

## Overview

The **Immunefi Security Worker** is an end-to-end automated module that closes the full bug bounty cycle without manual intervention for most steps. It is a key component of the **AI Security Worker** positioning of AuditorSEC.

---

## Architecture: Brain + Hands

```
┌────────────────────────────────────────────────────────────┐
│             BRAIN (AI Agent)                            │
│  GPT-4 / LLM — context, risk prioritization, reports   │
└───────────────────────┬───────────────────────────────┘
                       │
         ┌───────────┼───────────┐
         ▼            ▼            ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│ PARSER  │  │SCANNERS│  │ REPORT  │
│Immunefi │  │Slither  │  │Generator│
│  API/RSS │  │Echidna  │  │PoC+Fixes│
│         │  │Halmos   │  │PDF/MD   │
└─────────┘  └─────────┘  └─────────┘
             HANDS (Action Modules)
```

---

## Pipeline Stages

### Stage 1: Program Discovery
```
Input: Immunefi API / RSS feed
Action:
  - Fetch new/updated bug bounty programs
  - Filter by: max_bounty > $10K AND scope includes smart_contracts
  - Check against already-processed program registry
Output: List of new programs with scope details
```

### Stage 2: Scope Extraction
```
Input: Program page URL
Action:
  - Extract in-scope contract addresses
  - Resolve to source code (Etherscan / Sourcify / GitHub)
  - Detect framework: Foundry / Hardhat / Truffle
  - Pull existing test suite if public
Output: /workspace/{program_id}/contracts/ + metadata.json
```

### Stage 3: Automated Analysis (Hands)
```
Input: /workspace/{program_id}/contracts/
Parallel execution:
  a) Slither — static analysis → slither-report.json
  b) Echidna — fuzz campaign (30 min budget) → echidna-corpus/
  c) Halmos — symbolic execution on critical paths
  d) LLM Review — GPT-4 with Security Gym few-shot prompts
Output: merged-findings.json with deduplication
```

### Stage 4: Risk Scoring & Prioritization (Brain)
```
Input: merged-findings.json
Action:
  - Score each finding: severity × exploitability × bounty_multiplier
  - Cross-reference Security Gym — is this a known pattern?
  - Filter out: false positives, out-of-scope, already-reported
Output: top_candidates.json (max 5 per program)
```

### Stage 5: Draft Report Generation
```
Input: top_candidates.json
For each candidate:
  - Title, vulnerability description
  - Affected code snippet (highlighted)
  - PoC: minimal Foundry test demonstrating the bug
  - Impact: what an attacker can do
  - Mitigation: recommended fix
  - CVSS-style score
  - Immunefi severity classification
Output: reports/{program_id}/{finding_id}/draft-report.md + .pdf
```

### Stage 6: Human Review Gate
```
Input: top_candidates.json + draft reports
Action:
  - Notify operator (Telegram / Slack / email)
  - Present: program name, finding title, estimated bounty, confidence score
  - Operator action: APPROVE / REJECT / REQUEST_REVIEW
Output: approved_submissions/
```

### Stage 7: Submission (Semi-automated)
```
Input: approved_submissions/
Action:
  - Prefill Immunefi submission form
  - Attach PoC, report PDF
  - Operator clicks SUBMIT (human-in-the-loop final step)
Output: submission tracking entry
```

---

## Scheduling

```yaml
# .github/workflows/immunefi-worker.yml (skeleton)
schedule:
  - cron: '0 6 * * *'   # Daily 06:00 UTC — new program scan
  - cron: '0 */6 * * *' # Every 6h — priority program re-scan
```

---

## Configuration

```yaml
# config/immunefi-worker.yaml
worker:
  min_bounty_usd: 10000
  max_programs_per_run: 5
  fuzz_budget_minutes: 30
  chains:
    - ethereum
    - optimism
    - arbitrum
    - base
  notify:
    telegram_bot_token: ${TELEGRAM_BOT_TOKEN}
    telegram_chat_id: ${TELEGRAM_CHAT_ID}
  report_format: [md, pdf]
  security_gym_path: ./gym/episodes/
```

---

## Metrics to Track

| Metric | Target |
|--------|--------|
| Programs scanned/week | 20+ |
| Findings generated/week | 50+ |
| False positive rate | <20% |
| Top candidates/week surfaced | 5-10 |
| Bounties won/month | 1+ |
| Time saved vs manual (hours) | 40+/week |

---

## Positioning

> **"AuditorSEC Immunefi Worker: Automated Bounty Hunter.**
> *Scans 20+ programs daily. Surfaces only high-confidence findings. You approve. You submit. The worker does the rest."*

---

## Roadmap

- [ ] Q2 2026: MVP pipeline (Slither + LLM review + draft report)
- [ ] Q2 2026: Telegram notification integration
- [ ] Q3 2026: Echidna + Halmos integration
- [ ] Q3 2026: Semi-automated submission prefill
- [ ] Q3 2026: Security Gym episode auto-ingestion from approved findings
- [ ] Q4 2026: Multi-chain parallel scanning (wolf-pack mode)
