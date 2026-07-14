# Primary Call Target Decision
**Date:** 2026-07-14 | **Status:** PENDING YOUR INPUT

---

## Decision Matrix

| Criterion | ECCC-03 (PQC-AI Shield) | SecureAI / ECCC-02 (AI Act Audit) | Recommendation |
|---|---|---|---|
| **Deadline** | Mid-September 2026 | TBD (need to confirm) | ECCC-03 is confirmed Sep 2026 |
| **Consortium fit** | PQC crypto + AI anomaly detection for energy grid | Cryptographic audit pipeline + OPA/Rego + EU AI Act conformity | Both align with AuditorSEC strengths |
| **Partner match** | Radboud/KU Leuven/INRIA (PQC + side-channel) | Same EU partners but emphasis on audit/compliance | Overlapping but distinct lead roles |
| **Pilot operator** | Ukrenergo (TSO, grid infrastructure) | Generic "high-risk AI system" (broader TAM) | ECCC-03 has concrete pilot; SecureAI may have none yet |
| **WP4 emphasis** | Side-channel + HACS validation (hardware security) | Audit pipeline (software governance + UI) | Different but complementary scopes |
| **Budget ceiling** | EUR 3.5–4.5M (large, energy-sector focused) | Unknown (need to check call doc) | ECCC-03 is clearer |
| **TRL narrative** | OMEGA infrastructure (testbed) + PQC-ready signer + grid telemetry | Audityzer v5.x + evidence anchoring + OPA bundles | Both have live assets |
| **Risk: scope creep** | If ADR-0011 audit pipeline folds in without clear WP4 boundary | If both calls are pursued in parallel | **Need to pick ONE primary** |

---

## What We Need from You (Right Now)

**Question 1: Which is your primary submission target by mid-September 2026?**
- [ ] **ECCC-03** (PQC-AI Shield for Ukrainian energy infrastructure) — grid telemetry + post-quantum crypto + anomaly detection
- [ ] **SecureAI / ECCC-02** (Cryptographically-attested AI Act audit pipeline) — conformity assessment + OPA/Rego + evidence anchoring
- [ ] **Both in parallel** (separate proposals, same timeline) — *risky, requires full team split*
- [ ] **ECCC-03 primary, SecureAI secondary** (pursue ECCC-03 Sep 2026, if it lands use to fund SecureAI follow-on; if it fails, pivot to SecureAI) — *most pragmatic*

**Question 2: Is the ADR-0011 audit pipeline work (Node.js + Rego + ML-DSA-65 signer) a**:
- [ ] **Stand-alone deliverable** for SecureAI/ECCC-02 (separate call)?
- [ ] **Sub-component of WP4 in ECCC-03** (side-channel validation pipeline uses the audit signer)?
- [ ] **Both** — part of ECCC-03 WP4, but independently fundable under SecureAI if needed?

**Question 3: Ukrenergo as pilot operator — is their grid infrastructure the**:
- [ ] **Only pilot site** (ECCC-03 exclusive)?
- [ ] **One of several** (ECCC-03 primary, but SecureAI could have a separate AI-system pilot)?
- [ ] **Not applicable to SecureAI** (Ukrenergo is TSO-specific, doesn't fit a generic "high-risk AI" call)?

---

## Recommended Primary Target: **ECCC-03**

**Rationale:**
1. **Deadline clarity**: Sep 2026 is locked; SecureAI/ECCC-02 deadline is TBD (you may need to check the call document).
2. **Consortium backbone ready**: KNU + Ukrenergo + EU partner trio is already scoped for ECCC-03; less re-scoping needed.
3. **Pilot operator concrete**: Ukrenergo is a live TSO with grid infrastructure; this is a massive competitive advantage vs. a hypothetical "high-risk AI system" in SecureAI.
4. **TRL narrative clear**: OMEGA testbed (air-gapped, EU-accessible) is a differentiator; fits ECCC-03's "operational evaluation" (WP5) perfectly.
5. **Risk/reward**: ECCC-03 has higher funding but also higher competition. Better to go deep on one strong proposal than split effort.

**If this is your pick**, the consequence is:
- ADR-0011 audit pipeline becomes **WP4 deliverable** (not a separate SecureAI grant).
- The audit signer (Ed25519 + ML-DSA-65 readiness) feeds into side-channel validation, not AI Act conformity assessment (those are separate but complementary).
- SecureAI becomes a **follow-on** opportunity post-2026 if ECCC-03 succeeds.

---

## Once You Decide: Outreach Language Lock-In

Once you pick primary vs. secondary, I will:

1. **Customize KNU LoI** to emphasize either:
   - ECCC-03 path: "cryptographic core (WP2) + side-channel validation (WP4) on OMEGA testbed for energy grid"
   - SecureAI path: "audit pipeline verification + Rego policy engine for AI Act conformity"

2. **Tailor EU crypto institute emails** to highlight:
   - ECCC-03 fit: "Your PQC + HACS expertise; WP2/WP4 co-lead on operational grid pilot"
   - SecureAI fit: "Your cryptographic audit + formal verification skills; policy-as-code integration"

3. **Frame Ukrenergo pitch** to emphasize:
   - ECCC-03 fit: "NIS2 / DORA compliance uplift + EUR [X]M Horizon funding for your grid"
   - SecureAI fit: N/A (Ukrenergo wouldn't be pilot)

4. **Set WP4 scope** to clarify:
   - ECCC-03 path: Side-channel attacks on PQC reference impl; countermeasures; OMEGA HACS testbed
   - SecureAI path: Audit pipeline frontend + OPA sidecar + evidence export for third-party verification

---

## Next Step: Reply with Your Call Target

**Reply in this thread or DM and tell me:**
- Primary call: **ECCC-03** or **SecureAI/ECCC-02**?
- Secondary call (if any): Strategy for follow-on?
- ADR-0011 audit pipeline: WP4 sub-component (ECCC-03) or stand-alone (SecureAI)?

**Once locked, I'll immediately:**
1. Update all outreach templates (KNU, EU partners, Ukrenergo) to use the correct call language.
2. Draft a TRL inventory tailored to your primary call's evaluation criteria.
3. Flag any WP scope changes needed to avoid overlap/confusion.

---

**Prepared:** 2026-07-14 (your GitHub session)  
**Owner:** You (fill in name/GitHub handle)  
**Status:** Awaiting decision input
