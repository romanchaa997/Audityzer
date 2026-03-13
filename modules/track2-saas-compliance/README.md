# AuditorSEC SaaS Compliance Platform — Track 2

Multi-framework compliance engine, dApp risk audit, AI meta-learning vulnerability scanner, and CRM integration for AuditorSEC's blockchain/cybersecurity audit platform.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     API Layer (routes.ts)                     │
│  JWT Auth │ Rate Limiting │ Pagination │ OpenAPI Spec         │
├──────────┬──────────┬──────────────┬────────────────────────┤
│Compliance│ dApp Risk│  AI Scanner  │   CRM Integration      │
│ Engine   │  Audit   │  Meta-Learn  │  monday.com + Telegram │
├──────────┴──────────┴──────────────┴────────────────────────┤
│              Configuration (config.ts)                        │
│              Type Definitions (types.ts)                      │
└─────────────────────────────────────────────────────────────┘
```

## Modules

### 1. Compliance Engine (`compliance-engine.ts`)

Multi-framework compliance checker supporting:

| Framework | Region | Regulator |
| --------- | ------ | --------- |
| SEBI CSCRF | India | SEBI |
| LGPD | Brazil | ANPD |
| Joint Standard 2 | South Africa | FSCA/PA |
| SOC 2 Type II | International | AICPA |
| ISO 27001 | International | ISO/IEC |
| GDPR | EU | EDPB |

Features:
- JSON-driven configurable rulesets with pluggable check functions
- Audit evidence collection and scoring (10-point scale per rule)
- Gap analysis report generator sorted by severity
- Remediation recommendation engine with effort/cost estimates
- Markdown and JSON report output

### 2. dApp Risk Audit (`dapp-risk-audit.ts`)

Web3-specific risk scoring:
- CVSS-like scoring adapted for DeFi (Web3CVSS with financial impact multiplier)
- Rug pull probability estimation from on-chain/off-chain signals
- Liquidity risk assessment (pool concentration, lock duration)
- Governance risk assessment (multisig, timelock, admin key concentration)
- Cross-chain risk aggregation (weighted by severity)
- Supports: Ethereum, BSC, Polygon, Arbitrum, Optimism, Avalanche, Solana, Base

### 3. AI Meta-Learning Scanner (`ai-scanner.ts`)

Aggregated vulnerability detection:
- Plugin architecture — register scanners (Slither, Mythril, Semgrep, Aderyn, etc.)
- Concurrent scanner execution with timeout and concurrency limits
- Meta-learning layer tracking per-scanner detection rates and false positive rates
- Confidence scoring: 40% scanner agreement + 30% reported confidence + 30% meta-learning
- Built-in regex pattern database for known vulnerability signatures
- ML model integration interface (stub for transformer/GNN/ensemble models)

### 4. CRM Integration (`crm-integration.ts`)

monday.com + Telegram bidirectional sync:
- monday.com GraphQL client with webhook receiver/sender
- Client onboarding flow: Telegram bot → monday.com item → audit pipeline
- Pipeline stage sync: stage changes → monday.com status column + Telegram notification
- Escalation alerts to internal team chat
- Audit summary generator for CRM display

### 5. API Routes (`routes.ts`)

RESTful API with:
- JWT authentication (HMAC-SHA256)
- Role-based access control (admin, auditor, client, viewer)
- Rate limiting (standard: 100/min, write: 20/min)
- Pagination, filtering, sorting
- Auto-generated OpenAPI 3.0 specification
- CORS support

## API Endpoints

| Method | Path | Auth | Description |
| ------ | ---- | ---- | ----------- |
| GET | `/api/v1/health` | No | Health check |
| GET | `/api/v1/frameworks` | No | List compliance frameworks |
| POST | `/api/v1/compliance/audit` | Yes | Run compliance audit |
| GET | `/api/v1/compliance/report/:id` | Yes | Get compliance report |
| GET | `/api/v1/compliance/report/:id/markdown` | Yes | Get report as Markdown |
| POST | `/api/v1/dapp/risk-audit` | Yes | Run dApp risk audit |
| POST | `/api/v1/scanner/scan` | Yes | Run AI meta-learning scan |
| GET | `/api/v1/scanner/plugins` | Yes | List scanner plugins |
| POST | `/api/v1/scanner/plugins/:id/toggle` | Yes | Toggle scanner plugin |
| POST | `/api/v1/crm/webhook/monday` | No | monday.com webhook |
| POST | `/api/v1/crm/clients` | Yes | Onboard new client |
| PUT | `/api/v1/crm/clients/:id/stage` | Yes | Update pipeline stage |
| GET | `/api/v1/openapi.json` | No | OpenAPI specification |

## Configuration

All configuration via environment variables — see `config.ts` for full list. Key variables:

```env
# Server
PORT=3100
NODE_ENV=production
LOG_LEVEL=info

# Auth
JWT_SECRET=your-secret-here

# monday.com
MONDAY_API_TOKEN=...
MONDAY_WEBHOOK_SECRET=...
MONDAY_BOARD_AUDITS=12345

# Telegram
TELEGRAM_BOT_TOKEN=...
TELEGRAM_ALERT_CHAT_ID=...

# Frameworks (enable/disable)
ENABLE_SEBI=true
ENABLE_LGPD=true
ENABLE_JS2=true

# Scanner
SCANNER_MAX_CONCURRENCY=4
SCANNER_CONFIDENCE_THRESHOLD=0.7
```

## Setup

```bash
npm install
npm run typecheck
npm run build
npm start
```

## Strategic Context

Part of AuditorSEC Track 2 (Blockchain & FinTech). Integrates with:
- Track 1 bots: @audityzerbot, @AuditorSEC_Alert_Bot
- Track 3 n8n workflows for automation
- Existing platform v2 (Express + Vite + React)
- BRICS partners: Kratikal, Mitigata, CyberNX, SISA (India); Clavis, Tempest (Brazil)
