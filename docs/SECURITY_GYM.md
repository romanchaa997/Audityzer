# 🏋️ Security Gym — AuditorSEC Private Training Dataset

> *"Like China's robot schools with 6M training episodes/year — every real-world case makes AuditorSEC smarter."*

## Concept

Security Gym is AuditorSEC's private dataset of real-world security episodes collected from:
- Immunefi bug reports (submitted & validated)
- Manual audit engagements
- Internal fuzzing campaigns
- Incident post-mortems

Each episode is a structured learning unit that continuously improves the AI-audit pipeline — not simulations, but real combat data.

---

## Episode Schema

Every security finding is stored as a training episode with the following structure:

```json
{
  "episode_id": "EP-001",
  "date": "2026-04-19",
  "source": "immunefi | manual_audit | fuzz | incident",
  "chain_context": {
    "chain": "ethereum | optimism | arbitrum | base | zksync",
    "layer": "L1 | L2 | L3",
    "category": "DeFi | Bridge | NFT | DAO | Staking | Lending"
  },
  "vulnerability": {
    "type": "reentrancy | overflow | access_control | oracle | flashloan | logic",
    "severity": "Critical | High | Medium | Low",
    "cwe": "CWE-XXX",
    "swc": "SWC-XXX"
  },
  "artifacts": {
    "vulnerable_code_snippet": "...",
    "patch_code_snippet": "...",
    "poc_script": "path/to/poc.ts",
    "slither_output": "path/to/slither.json",
    "echidna_corpus": "path/to/corpus/"
  },
  "lessons_learned": "Plain-text description of root cause and fix strategy",
  "immunefi_bounty_usd": 0,
  "tags": ["reentrancy", "proxy", "upgradeable"]
}
```

---

## How Episodes Improve AuditorSEC

```
New Real-World Bug
       │
       ▼
┌─────────────────────────┐
│   Episode Ingestion     │  ← structured JSON added to /gym/episodes/
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   Pattern Extraction    │  ← vulnerability signatures, AST patterns
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  LLM Context Injection  │  ← few-shot examples in AI-audit prompts
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  Static Rule Update     │  ← new Slither/custom detector if warranted
└────────────┬────────────┘
             │
             ▼
       AuditorSEC detects
       this class of bug
       in future contracts ✅
```

---

## Directory Structure

```
gym/
├── episodes/          # Individual episode JSON files
│   ├── EP-001.json
│   ├── EP-002.json
│   └── ...
├── patterns/          # Extracted vulnerability patterns
│   ├── reentrancy.yaml
│   ├── access_control.yaml
│   └── ...
├── prompts/           # Few-shot LLM prompt templates per category
│   ├── defi_audit.md
│   ├── bridge_audit.md
│   └── ...
└── stats.json         # Running metrics: episodes_total, chains, severities
```

---

## Privacy & Data Policy

- All episodes are **anonymized** before storage (no client names, no contract addresses from private audits)
- Immunefi episodes reference only **public** disclosed reports
- The gym schema is open-source; the episode data is **proprietary**

---

## Metrics (updated automatically)

| Metric | Value |
|--------|-------|
| Total episodes | 0 (bootstrap) |
| Chains covered | Ethereum, Optimism |
| Vulnerability categories | 12 |
| LLM prompt templates | 4 |

---

## Landing / README messaging

> **"Trained on real Immunefi & audit cases — private Security Gym.**
> *Every new case makes AuditorSEC smarter. No simulations — only real combat experience."*

---

## Roadmap

- [ ] Q2 2026: Ingest 50 historical Immunefi public reports as bootstrap episodes
- [ ] Q2 2026: Automate episode creation from Immunefi Worker pipeline output
- [ ] Q3 2026: Fine-tune open-source LLM (CodeLlama / DeepSeek) on gym episodes
- [ ] Q3 2026: Publish gym schema as open standard for Web3 security community
- [ ] Q4 2026: 500+ episodes across 6 chains
