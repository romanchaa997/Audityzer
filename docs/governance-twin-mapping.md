# Governance Twin Mapping v1.0
# AuditorSEC | Audityzer
# Author: AuditorSEC R&D
# Date: 2026-04-19
# Status: BASELINE FROZEN
# Related: PPE Phase 2 Dynamo zk-SNARKs on-chain attestation

---

## Overview

This file maps NotebookLM narrative sections to their implementation counterparts:
- **Space file** (Audityzer repo path)
- **OPA/YAML policy path** (`quantum-ai-dual-architecture.yaml`)
- **ClickUp custom field**
- **PPE Phase 2 baseline anchor**

PPE Baseline (smoke test 2026-04-18):
- `modelhash`: `5b755eb6d308fb24d9c9c8b68fe9b21e21574523edf84e03da34215e9856318c`
- `baselinepred`: `8.38`
- `commitment`: `0x9cf4c685c410c2bff9694c45aded915249fa2f79f2455a673def78aa18039c40`

---

## Mapping Table

| # | NotebookLM Section | Space File Path | OPA / YAML Path | ClickUp Custom Field | PPE Baseline Anchor | Priority |
|---|---|---|---|---|---|---|
| 1 | PQC TEE/HSM Hybrid KEM | `docs/pqc-tee-hsm.md` | `quantum-ai-dual-architecture.yaml#pqcteehsm.hybridkem` | `pqcteehsmlevel` | `mldsapublickeyprefix: 4445565f46414c4c` | P0 |
| 2 | AI Supply Chain / SBOM | `docs/ai-supply-chain.md` | `quantum-ai-dual-architecture.yaml#aisupplychain.sbomformat` | `aisbomstatus` | `modelhash: 5b755eb6d308fb24...` | P0 |
| 3 | RLHF/RAIL NIS2 Controls | `docs/rlhf-rail-nis2.md` | `quantum-ai-dual-architecture.yaml#rlhfrail.nis2controls` | `nis2compliancelevel` | Telegram audit_events table | P1 |
| 4 | DFIR QAI Response | `docs/dfir-qai.md` | `quantum-ai-dual-architecture.yaml#dfir.qairesponse` | `dfirreadinessscore` | CRM Risk Score >= 13 -> ClickUp | P1 |
| 5 | Governance Twin Attestation | `docs/governance-twin.md` | `quantum-ai-dual-architecture.yaml#govtwin.attestation` | `govtwinlastrun` | `commitment: 0x9cf4c685...` | P0 |
| 6 | Agentic IAM Zero Trust | `docs/agentic-iam.md` | `quantum-ai-dual-architecture.yaml#agentiam.zerotrustscope` | `iamcompliancestatus` | FastAPI JWT + INTERNALSIGNINGKEY | P1 |
| 7 | Productization Paths | `docs/productization.md` | `quantum-ai-dual-architecture.yaml#product.revenuetrack` | `revenuetrackactive` | PitchDeck Track A/B/C -> Y1 $9.4M | P2 |

---

## Layer Contract

```
NotebookLM          <- narrative / human-readable evidence layer
Audityzer Space     <- implementation / code / config layer  
auditorsec-scanner  <- policy engine (OPA + YAML packs)
ClickUp             <- evidence tracker / workflow / audit log
PPE Phase 2         <- cryptographic integrity anchor (zk + on-chain)
```

---

## Acceptance Criteria (Phase 2)

- [ ] All 7 mapping rows have corresponding Space files committed
- [ ] `quantum-ai-dual-architecture.yaml` deployed to `policy-packs/` folder
- [ ] Bakhmach pilot score run returns `riskscore` + top-3 policy failures
- [ ] `govtwin.attestation` policy passes -> `PPEAttestationRegistered` event emitted on Polygon Amoy
- [ ] ClickUp Epic "PPE Phase 2" has all 4 workstream tasks linked
- [ ] Evidence snippet formatted for Diia.City / Horizon annex

---

## Bakhmach Pilot Context

- Domain: `bakhmach.auditorsec.local`
- Project ID: `bakhmach-pilot-001`
- Classification: `municipal-pilot`
- BRAVE1 Tier: 3 (target: Tier 4a)
- HNDL Mitigation: Active
- Urgent queue threshold: `riskscore >= 75`

---

## Change Log

| Date | Author | Change |
|---|---|---|
| 2026-04-19 | AuditorSEC R&D | Initial baseline frozen — governance-twin-mapping v1.0 |
