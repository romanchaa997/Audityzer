# @auditorsec/telegram-brics

Production-ready Telegram webhook integration for AuditorSEC's **@audityzerbot** with BRICS-localized regulatory compliance alerting.

## Architecture

```
Telegram Cloud → POST /webhook/audityzerbot → Express Server
                                                    │
                            ┌───────────────────────┼───────────────────────┐
                            │                       │                       │
                     Command Router          Rate Limiter           Signature Verify
                            │
              ┌─────────┬───┴────┬──────────┬──────────┐
              │         │        │          │          │
          /audit    /status  /alerts    /report    /help
              │
              ▼
        Audit Pipeline (BullMQ)
        ┌──────────────────────────────┐
        │ submitted → queued →         │
        │ static_analysis →            │     ──► Telegram Notifications
        │ dynamic_analysis →           │         at each stage
        │ report_generation →          │
        │ completed                    │
        └──────────────────────────────┘

        BRICS Alerting Service
        ┌──────────────────────────────┐
        │ India: SEBI CSCRF, CERT-In   │
        │ Brazil: LGPD, ANPD           │ ──► Multi-locale alerts
        │ South Africa: Joint Std 2    │     (en-IN, hi, pt-BR, en-ZA)
        └──────────────────────────────┘
```

## Modules

| File | Description |
|---|---|
| `webhook-server.ts` | Express server with Telegram webhook handling, command routing, rate limiting, and signature verification |
| `audit-pipeline.ts` | BullMQ-based smart contract audit queue with stage notifications |
| `brics-alerting.ts` | Multi-locale BRICS compliance alert system (SEBI, LGPD, Joint Standard 2) |
| `types.ts` | Full TypeScript type definitions for all modules |
| `config.ts` | Zod-validated environment configuration with BRICS locale settings |

## Bot Commands

| Command | Description |
|---|---|
| `/audit <address> [chain]` | Submit a smart contract for security audit |
| `/status [job_id]` | Check audit status (latest or by ID) |
| `/alerts on\|off` | Toggle BRICS compliance alerts |
| `/report <audit_id>` | Retrieve full audit report |
| `/start`, `/help` | Show welcome message and command reference |

**Supported chains:** Ethereum, BSC, Polygon, Avalanche

## Setup

### Prerequisites

- Node.js ≥ 20
- Redis (for BullMQ job queue)
- Telegram Bot Token (from @BotFather)

### Environment Variables

```bash
# Required
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_WEBHOOK_SECRET=your_secret_min_16_chars
WEBHOOK_BASE_URL=https://your-domain.com

# Optional
PORT=3000
REDIS_URL=redis://localhost:6379
LOG_LEVEL=info
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_SECONDS=3600
TELEGRAM_API_BASE=https://api.telegram.org
NODE_ENV=production
```

### Installation

```bash
npm install
npm run build
```

### Register Webhook with Telegram

```bash
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-domain.com/webhook/audityzerbot",
    "secret_token": "your_secret_min_16_chars",
    "allowed_updates": ["message", "callback_query"]
  }'
```

### Run

```bash
# Production
npm start

# Development (hot reload)
npm run dev
```

## BRICS Regulatory Coverage

### India
- **SEBI CSCRF**: Mandatory cyber security audit deadlines for market infrastructure institutions (April 2025–March 2026 cycle)
- **RBI / CERT-In**: 6-hour cyber incident reporting requirement

### Brazil
- **LGPD**: 3 business day breach notification to ANPD
- **ANPD**: Regulatory updates and compliance deadlines (fines up to 2% revenue / 50M BRL)

### South Africa
- **Joint Standard 2 of 2024**: Mandatory IT governance for all financial institutions (effective 1 June 2025)

## Deployment

Designed for containerized deployment. Health check available at `GET /health`.

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist/ ./dist/
EXPOSE 3000
CMD ["node", "dist/webhook-server.js"]
```
