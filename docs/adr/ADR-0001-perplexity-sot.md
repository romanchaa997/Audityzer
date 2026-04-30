# ADR-0001: Perplexity Threads as Source of Truth + Search Views

**Status:** Accepted  
**Date:** 2026-04-21  
**Owner:** Ihor  
**Phase:** UHIP-2A  
**Domain:** INFRA/PMO  
**Priority:** P0 (Strategic)

---

## Context

AuditorSEC / Audityzer / UHIP infra uses Perplexity AI threads as the primary knowledge capture layer for architecture decisions, grant applications, and operational runbooks. Without a formal SoT model, teams have been referencing Search URLs (which are volatile and session-scoped) instead of stable `thread_id` identifiers. This creates drift risk in CI/Helm configs and potential GDPR exposure via log leakage.

---

## Decision

**Source of Truth = `thread_id`** (the stable, machine-readable identifier for a Perplexity thread).  
**Search URLs** (`perplexity.ai/search/...`) are treated as **read-only human-navigable views** only — not as refs in configs or automation.

### Identifier Model

```yaml
perplexity:
  sotThreadId: "tejeBGviQ22LHy04IEf6Gw"   # canonical SoT ref
  entryMessageId: "1"                       # optional: anchors to first message
  searchUrl: "https://www.perplexity.ai/search/os-tekst-z-bloku-5-z-potochnog-tejeBGviQ22LHy04IEf6Gw#1"
  # searchUrl is for DOCUMENTATION / human navigation ONLY
  # Never hardcode searchUrl in Helm values, GitHub Actions, or Makefiles
```

### Rule Summary

| Ref Type | Usage | Machine refs (CI/Helm/Make) |
|---|---|---|
| `thread_id` | SoT identifier | YES |
| `#N` anchor | UI scroll position only | NO |
| Search URL | Human docs / README links | NO |

---

## Consequences

### Positive
- Stable infra refs — no drift when Perplexity rotates search slugs
- No sensitive thread content leaking into CI logs via URL params
- GDPR-safe: `thread_id` alone does not expose content
- Enables registry-driven lookups (`perplexity-sot.yaml`)

### Negative / Risks
- Existing hardcoded search URLs in Helm values / GitHub Actions / Makefiles must be audited and replaced (see Action Plan)
- `thread_id` is opaque without access to the Perplexity account — access control must be documented

---

## Action Plan

| # | Action | Owner | ETA |
|---|---|---|---|
| 1 | Audit Helm values, GH Actions, Makefiles — replace search URLs with `thread_id` | DevOps | Today |
| 2 | Create `infra/perplexity-sot.yaml` registry with `thread_id` map for UHIP | DevOps | Today |
| 3 | Add "Perplexity SoT + Views" section to `README.md` with examples | Ihor | Today |
| 4 | `helm lint --values values-links.yaml` + `wrangler deploy` test pass | DevOps | Today |
| 5 | Reference this ADR from pitch-deck (BRAVE1, NL-UA CF) as infra maturity proof | Ihor | This week |

---

## References

- UHIP-2A Phase design thread: `tejeBGviQ22LHy04IEf6Gw`
- Space: [ГО Digital web3cloud neuralinfra](https://www.perplexity.ai/spaces/go-digital-web3cloud-neuralinf-S_tMPNJoSyOojl4dn6bKNg)
- Related: `FINAL_SUBMISSION_CHECKLIST.md`, `REVENUE_MODEL.md`, `GTM_STRATEGY.md`
- Cloudflare infra ADR: see AuditorSEC YCombinator Space artifact (scenarios MVP→Scale-up, $0–$35/mo)
