# RehabFundDistributor dApp

Transparent, auditable ERC-20 fund distributor for verified NGO rehabilitation programs.
Built on Ethereum (Sepolia testnet) with full monitoring, Telegram bot, and REST API.

## Architecture

```
┌──────────────────┐     ┌──────────────┐     ┌────────────────┐
│  Smart Contract   │◄───►│  FastAPI API  │◄───►│  Prometheus    │
│  (Sepolia / ETH)  │     │  /donations   │     │  + Grafana     │
│                   │     │  /releases    │     │                │
│ RehabFund.sol     │     │  /balance/    │     │ prometheus.yml │
└──────────────────┘     └──────────────┘     └────────────────┘
         ▲                                            ▲
         │                                            │
    ┌────┴──────┐                              ┌──────┴──────┐
    │ Telegram  │                              │  On-chain   │
    │   Bot     │                              │  Monitor    │
    │ /donate   │                              │ monitor.py  │
    │ /status   │                              │             │
    └───────────┘                              └─────────────┘
```

## Directory Structure

```
rehab-fund-dapp/
├── src/RehabFundDistributor.sol       # Core Solidity contract
├── script/DeployRehabFund.s.sol       # Foundry deployment script
├── test/RehabFundDistributor.t.sol    # Foundry test suite (11 tests)
├── monitoring/
│   ├── monitor.py                     # On-chain event monitor + Prometheus metrics
│   └── prometheus.yml                 # Prometheus scrape configuration
├── api/
│   ├── main.py                        # FastAPI REST backend
│   └── requirements.txt               # Python dependencies
├── bot/bot.py                         # Telegram bot (/donate, /status, /audit_log)
├── .github/workflows/rehab-fund.yml   # CI/CD: lint, test, audit, deploy
├── docker-compose.yml                 # Full stack orchestration
├── foundry.toml                       # Foundry project config
├── Makefile                           # Common commands
├── .env.example                       # Environment variable template
└── README.md
```

## Components

| Component | Description |
|-----------|-------------|
| **Smart Contract** | Solidity 0.8.24 ERC-20 escrow with ReentrancyGuard. `donate()`, `release()`, `emergencyWithdraw()`. All ops emit events. |
| **Foundry Tests** | 11 tests covering donations, releases, access control, reentrancy attack simulation, event emission, edge cases. |
| **FastAPI Backend** | REST API reading on-chain Donated/Released events via Web3.py. Endpoints for donations, releases, and token balances. |
| **On-chain Monitor** | Async Python service polling blockchain events, exporting Prometheus counters and gauges for real-time dashboards. |
| **Telegram Bot** | aiogram 3.x bot with `/donate`, `/status`, `/audit_log` commands for user interaction. Read-only, no withdraw capability. |
| **CI/CD Pipeline** | GitHub Actions: `solhint` + `forge fmt` lint, `forge test`, Slither audit, and auto-deploy to Sepolia on merge to main. |
| **Docker Compose** | Full stack: FastAPI, monitor, bot, Prometheus, and Grafana — all containerized. |

## Quick Start

### 1. Install Foundry

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### 2. Install dependencies and run tests

```bash
cd rehab-fund-dapp
forge install OpenZeppelin/openzeppelin-contracts --no-commit
make test
```

### 3. Deploy to Sepolia

```bash
cp .env.example .env
# Edit .env with your private key, RPC URL, and Etherscan API key
source .env
make deploy-sepolia
```

### 4. Run the full stack with Docker

```bash
# Edit .env with CONTRACT_ADDRESS after deployment
docker compose up -d
```

This starts:
- **FastAPI** on `http://localhost:8000`
- **Prometheus** on `http://localhost:9090`
- **Grafana** on `http://localhost:3000` (admin/admin)
- **Monitor** exporting metrics
- **Telegram Bot** polling for commands

### 5. Run API standalone

```bash
cd api
pip install -r requirements.txt
CONTRACT_ADDRESS=0x... RPC_URL=https://rpc.sepolia.org uvicorn main:app --reload
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check + contract info |
| GET | `/donations?limit=10` | Last N donation events |
| GET | `/releases?limit=10` | Last N release events |
| GET | `/balance/{token}` | Locked balance for ERC-20 token |

## Makefile Targets

```bash
make install          # forge install
make build            # forge build
make test             # forge test -vvv
make fmt              # forge fmt
make lint             # forge fmt --check + solhint
make deploy-sepolia   # Deploy to Sepolia testnet
make deploy-local     # Deploy to local Anvil/Hardhat node
make docker-up        # docker compose up -d
make docker-down      # docker compose down
make snapshot         # forge snapshot (gas report)
```

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Used By | Description |
|----------|---------|-------------|
| `SEPOLIA_RPC_URL` | Foundry | RPC endpoint for deployment |
| `PRIVATE_KEY` | Foundry | Deployer private key |
| `ETHERSCAN_API_KEY` | Foundry | For contract verification |
| `CONTRACT_ADDRESS` | API, Monitor, Bot | Deployed contract address |
| `RPC_URL` | API, Monitor, Bot | RPC endpoint for runtime services |
| `TELEGRAM_BOT_TOKEN` | Bot | Telegram BotFather token |

## Security

- **ReentrancyGuard**: All state-changing functions protected via OpenZeppelin's `nonReentrant`
- **Ownable**: Only the verified NGO owner can release funds or emergency withdraw
- **SafeERC20**: All token transfers use SafeERC20 to handle non-standard tokens
- **CI auditing**: Slither static analysis runs on every PR

## License

MIT — AuditorSEC LLC (EDRPOU 46077399)
