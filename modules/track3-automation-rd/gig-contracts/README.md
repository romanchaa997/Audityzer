# @auditorsec/gig-contracts

On-chain gig contracts framework for AuditorSEC's DefenseTech contractor management platform, aligned with Ukraine's Дія.City regulatory framework.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  TypeScript Framework (contract-framework.ts)       │
│                                                     │
│  ┌──────────────┐  ┌─────────────┐  ┌───────────┐  │
│  │ Gig Lifecycle│  │ Vetting     │  │ Contract  │  │
│  │ Management   │  │ Pipeline    │  │ Interfaces│  │
│  └──────┬───────┘  └──────┬──────┘  └─────┬─────┘  │
│         │                 │               │         │
└─────────┼─────────────────┼───────────────┼─────────┘
          │                 │               │
          ▼                 ▼               ▼
┌─────────────────────────────────────────────────────┐
│  Solidity Smart Contracts (Polygon)                 │
│                                                     │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────┐  │
│  │ GigEscrow    │  │ Contractor    │  │ Dispute  │  │
│  │ (multi-sig)  │  │ Registry      │  │ Resolution│ │
│  └──────────────┘  └───────────────┘  └──────────┘  │
└─────────────────────────────────────────────────────┘
```

## Smart Contracts

### GigEscrow.sol

Milestone-based escrow with multi-sig fund release.

- **createEscrow()** — Client creates escrow with milestones and signers
- **deposit()** — Client deposits ERC-20 tokens
- **submitMilestone()** — Contractor submits deliverable (IPFS hash)
- **approveMilestone() / rejectMilestone()** — Client reviews
- **signRelease()** — Multi-sig signers approve fund release; auto-releases when threshold met
- **resolveDispute()** — Dispute resolution contract distributes funds per ruling

### ContractorRegistry.sol

KYC/AML-verified contractor registry with security clearance tracking.

- **register()** — Contractor self-registers with Дія.City ФОП ID and tax ID
- **updateKycStatus()** — KYC provider updates verification status (SumSub integration)
- **updateClearance()** — Clearance officer sets security level (None → Confidential → Secret → Top Secret)
- **updateReputation()** — Escrow contract updates reputation score (0–100)
- **meetsRequirements()** — Check contractor eligibility for a gig (specializations, clearance, KYC)

### DisputeResolution.sol

Decentralized arbitration with evidence submission and appeal mechanism.

- **fileDispute()** — Client or contractor initiates dispute
- **submitEvidence()** — Both parties submit evidence during gathering period (7 days)
- **assignArbitrator()** — Admin assigns qualified arbitrator
- **resolveDispute()** — Arbitrator issues ruling with fund distribution
- **appeal()** — Losing party can appeal within 3-day window

## TypeScript Framework

The `GigContractFramework` class orchestrates the full gig lifecycle:

```typescript
import { GigContractFramework } from './contract-framework.js';

const framework = new GigContractFramework(escrow, registry, disputeRes);

// Create and publish a gig
const gig = framework.createGig({
  title: 'Smart Contract Audit — DeFi Protocol',
  clientAddress: '0x...',
  requiredSpecializations: ['smart-contract-audit', 'devsecops'],
  requiredClearance: 'confidential',
  milestones: [
    { title: 'Initial Review', amount: 5000 },
    { title: 'Full Audit Report', amount: 15000 },
  ],
  paymentToken: 'USDC',
});

framework.publishGig(gig.id);
framework.assignContractor(gig.id, contractorAddress);
framework.startWork(gig.id);
```

### DefenseTech Vetting Pipeline

6-stage security vetting for cleared contractors:

1. **Application** — Contractor submits Дія.City ФОП docs + clearance request
2. **KYC Verification** — Identity, tax ID, AML screening (SumSub)
3. **Background Check** — Criminal record (MVS API), credit, employment
4. **Skills Assessment** — CTF challenges, code review, audit samples
5. **Clearance Review** — SBU referral (Secret+), BRAVE1 registry check
6. **Final Approval** — Multi-party sign-off

## Дія.City Compliance

| Requirement | Implementation |
|-------------|----------------|
| Contractor must be registered ФОП | `diaCityFopId` field in ContractorRegistry |
| Tax ID verification | `taxId` field + KYC verification |
| Contract scope and milestones | Milestone-based GigEscrow |
| Payment documentation | On-chain transaction records |
| IP assignment | Deliverable hash stored on-chain (IPFS) |
| Dispute resolution | DisputeResolution contract with arbitration |

## Supported Payment Tokens

| Token | Network |
|-------|---------|
| USDC | Ethereum / Polygon |
| USDT | Ethereum / Polygon |
| DAI | Ethereum |
| ETH | Ethereum |

## Deployment

| Phase | Network |
|-------|---------|
| Development | Hardhat local |
| Testnet | Polygon Amoy |
| Production | Polygon PoS |

### Deploy

```bash
# Compile contracts
npm run compile

# Deploy to testnet
npm run deploy:testnet

# Deploy to mainnet
npm run deploy:mainnet
```

## Setup

```bash
npm install
npm run typecheck
npm run compile
```

## Security

- OpenZeppelin v5 base contracts (AccessControl, ReentrancyGuard, SafeERC20)
- Multi-sig required for all fund releases
- Emergency pause functionality
- Timelock controller for upgrades (48h delay)
- All contracts to be audited before mainnet deployment
