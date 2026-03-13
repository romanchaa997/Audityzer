# @auditorsec/track3-automation-rd

AuditorSEC Track 3 — Automation & R&D: n8n workflow templates, green energy IoT digital twin, and DefenseTech gig contracts framework.

## Structure

```
track3-automation-rd/
├── workflows/                          # n8n automation templates
│   ├── audit-pipeline-workflow.json    # Smart contract audit pipeline
│   ├── compliance-monitoring-workflow.json  # BRICS compliance monitoring
│   ├── crm-sync-workflow.json          # CRM bidirectional sync
│   └── incident-response-workflow.json # Incident response automation
├── iot-digital-twin/                   # Green energy digital twin
│   ├── digital-twin-spec.md           # System specification
│   ├── dashboard-spec.md             # React dashboard requirements
│   └── twin-model.ts                 # Digital twin engine (TypeScript)
├── gig-contracts/                      # DefenseTech gig contracts
│   ├── contract-framework.ts          # TypeScript framework & types
│   ├── framework-spec.md             # Framework specification
│   └── contract-templates/            # Solidity smart contracts
│       ├── GigEscrow.sol             # Milestone-based escrow
│       ├── ContractorRegistry.sol    # Contractor KYC & clearance registry
│       └── DisputeResolution.sol     # Decentralized arbitration
├── package.json
└── README.md
```

## Modules

### 1. n8n Workflow Templates (`workflows/`)

Pre-built n8n automation workflows for the AuditorSEC platform:

| Workflow | Trigger | Description |
|----------|---------|-------------|
| `audit-pipeline` | Telegram webhook | End-to-end smart contract audit: parse request → validate → parallel Slither/Mythril analysis → aggregate → generate report → notify via Telegram |
| `compliance-monitoring` | Cron (daily) | BRICS regulatory compliance monitoring: fetch updates from SEBI (India), ANPD (Brazil), FSCA (South Africa) → process → alert subscribers |
| `crm-sync` | Webhook / Cron | Bidirectional CRM sync between monday.com and internal systems: audit status, client records, pipeline updates |
| `incident-response` | Webhook (alert) | Automated incident response: classify severity → notify Telegram → create tickets → coordinate response |

### 2. IoT Digital Twin (`iot-digital-twin/`)

Digital twin system for monitoring green energy infrastructure in Bakhmach, Ukraine.

**Key Components:**
- **Sensor Data Ingestion:** MQTT over TLS from ESP32/RPi gateways for solar, wind, battery, and grid sensors
- **Twin Engine:** EventEmitter-based state management with real-time asset tracking, anomaly detection, and stale-data handling
- **Simulation:** What-if scenarios for production forecasting, battery scheduling, capacity planning, and failure impact analysis
- **Carbon Credits:** UNFCCC CDM methodology with Ukraine grid emission factor (0.764 tCO₂/MWh)
- **Predictive Maintenance:** Alert thresholds for solar degradation, wind turbine vibration, battery health, and grid quality
- **Dashboard:** React + Vite + Tailwind + shadcn/ui + Recharts + D3 + Leaflet — 9 pages covering all asset types plus weather, map, and carbon tracking

**Tech Stack:** TimescaleDB (time-series), Redis (real-time state), MQTT (Mosquitto/EMQX), Node.js stream processor, Zod validation

### 3. Gig Contracts Framework (`gig-contracts/`)

On-chain smart contract system for DefenseTech contractor management, aligned with Ukrainian Дія.City regulations.

**Smart Contracts (Solidity ^0.8.20, OpenZeppelin v5):**
- **GigEscrow:** Milestone-based escrow with multi-sig fund release, ERC-20 token support (USDC, USDT, DAI, ETH, UAH-CBDC)
- **ContractorRegistry:** KYC/AML verification, security clearance levels (Confidential → Secret → Top Secret), specialization bitmap, reputation scoring (0–100)
- **DisputeResolution:** Evidence submission (IPFS), arbitrator assignment, outcome-based fund distribution, 3-day appeal window

**TypeScript Framework:**
- `GigContractFramework` class orchestrates gig lifecycle: draft → publish → assign → in-progress → review → completed
- 6-stage DefenseTech vetting pipeline: Application → KYC → Background Check → Skills Assessment → Clearance Review → Final Approval
- Interfaces for all three smart contracts (`IGigEscrow`, `IContractorRegistry`, `IDisputeResolution`)

**Target Deployment:** Polygon (mainnet), Ethereum Sepolia / Polygon Amoy (testnet)

## Prerequisites

- Node.js >= 20
- n8n instance (self-hosted or cloud) for workflow import
- MQTT broker (Mosquitto/EMQX) for digital twin
- Hardhat or Foundry for Solidity compilation

## Setup

```bash
npm install
npm run typecheck
```

## Related Tracks

- **Track 1** (`track1-telegram-brics/`): Telegram bot with BRICS regulatory alerting
- **Track 2** (`track2-saas-compliance/`): SaaS compliance audit engine with AI scanner
