# Audityzer × Superfluid Streaming Payments Integration

Superfluid streaming payments integration for the Audityzer Web3 security platform. Enables real-time, continuous reward streams to security auditors and contributors.

## Architecture

- **RewardsMacro Contract** — Uses Superfluid's MacroForwarder (`IUserDefinedMacro`) to batch-create reward streams in a single transaction
- **Subgraph** — Indexes `FlowUpdated` events on Optimism Sepolia for stream tracking and TVL monitoring
- **Monitoring Service** — Real-time WebSocket listener + 120s polling for balance and flow rate metrics
- **CI/CD** — GitHub Actions pipeline for testing, subgraph deployment, and contract deployment

## Quick Start

```bash
# Install dependencies
npm install

# Copy env and configure
cp .env.example .env

# Compile contracts
npm run compile

# Run tests
npm test

# Deploy to Optimism Sepolia
npm run deploy:sepolia
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile Solidity contracts |
| `npm test` | Run Hardhat tests |
| `npm run deploy:sepolia` | Deploy RewardsMacro to OP Sepolia |
| `npm run deploy:mainnet` | Deploy RewardsMacro to OP Mainnet |
| `npm run stream:test` | Create a test stream on Sepolia |
| `npm run monitor` | Start the monitoring service |
| `npm run subgraph:codegen` | Generate subgraph types |
| `npm run subgraph:build` | Build the subgraph |
| `npm run subgraph:deploy:dev` | Deploy subgraph to Studio |

## Networks

| Network | Chain ID | RPC |
|---------|----------|-----|
| Optimism Sepolia | 11155420 | https://sepolia.optimism.io |
| Optimism Mainnet | 10 | https://mainnet.optimism.io |

## Key Addresses

- **MacroForwarder**: `0xcfA132E353cB4E398080B9700609bb008eceB125` (same on all networks)

## Integration Notes

- All addresses are lowercased in subgraph queries
- Production subgraph queries use `gateway.thegraph.com`
- SDK initialization uses auto-resolve (no `protocolReleaseVersion` or `resolverAddress`)
- Monitoring poll interval: 120s minimum (free API quota compliance)
- Use `accountTokenSnapshots` (not `streamAccounts`) for subgraph queries
