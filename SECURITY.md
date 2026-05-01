# AuditorSEC Security Policy

## Security Cockpit v1.0 — Status 2026-05-01

### Infrastructure Security (auditorsec.com)

| Check | Status | Notes |
|-------|--------|-------|
| SSL/TLS Grade | **A+** | All 3 IPs, isExceptional, no warnings |
| TLS Version | **1.2+** | TLS 1.0/1.1 disabled via Cloudflare |
| HTTP→HTTPS | **Enabled** | Cloudflare redirect rule deployed |
| HSTS | **Enabled** | max-age=31536000; includeSubDomains; preload |
| PQC Readiness | **TLS 1.3** | Verified via Intel Monitor |
| Security Headers | **Configured** | CSP, X-Frame-Options, X-Content-Type, Referrer-Policy |

### Automated Security Workflows

#### intel-monitor.yml (Every Monday 08:00 UTC)
- Semgrep SAST static analysis
- SSL Labs API grade check
- Security headers audit
- DeFi bridges monitoring via DeFiLlama API
- PQC TLS 1.3 readiness
- Auto-creates GitHub Issue on critical findings
- **First run:** SUCCESS, SSL A+, no critical findings

#### promptfoo-ai-security.yml (Wednesday + PRs)
- Prompt injection resistance test
- Reentrancy detection accuracy
- Hallucination prevention check
- Requires `OPENROUTER_API_KEY` secret (free at openrouter.ai)

#### docker-compose.changedetection.yml (Self-hosted)
```bash
docker compose -f docker/docker-compose.changedetection.yml up -d
# Web UI: http://localhost:5000
```
Monitors: DeFi bridges, OpenZeppelin advisories, NIST PQC, Solidity releases, auditorsec.com

### Security Cockpits

1. **Solidity Engineering Cockpit** — Smart contract audit reports (reentrancy, overflow, access control, front-running)
2. **California DROP Privacy Cockpit** — CCPA/CALOPPA compliance, PII exposure, data retention audit
3. **AuditorSEC Intel Monitor** — SSL, DeFi bridges, PQC, security advisories — weekly automation

### DeFi Bridge Intelligence (2026-05-01)

| Bridge | 24h Volume | Risk Notes |
|--------|-----------|------------|
| USDT0 | $182M | Liquidity concentration risk |
| Relay | $88M | Cross-chain message validation |
| Hyperliquid | $85M | Centralization risk |
| Polygon PoS | $45M | Validator set monitoring |
| Across | $27M | Optimistic bridge model risk |

### Vulnerability Reporting

**DO NOT** open public GitHub issues for security vulnerabilities.

Report privately via:
- GitHub Advisory: https://github.com/romanchaa997/Audityzer/security/advisories/new
- Email: security@auditorsec.com

Response SLA: 48h acknowledgment, 7 days for critical issues.

### Known Issues

CodeQL scan: **32 alerts (6 high severity)** — remediation in progress.
See: [Security & Quality](https://github.com/romanchaa997/Audityzer/security) tab.

### Dependency Security

This project uses automated vulnerability management:
- Post-install scripts resolve dependency conflicts
- Critical vulns auto-upgraded to safe versions
- Production-only audit: `npm audit --production`

### Setup OPENROUTER_API_KEY (for AI red-team)

```bash
# 1. Register free: https://openrouter.ai/keys
# 2. Add secret:
gh secret set OPENROUTER_API_KEY --body "sk-or-..."
```

---
*AuditorSEC Security Cockpit v1.0 | Updated: 2026-05-01 | Adaptive Security Development Initiative*
