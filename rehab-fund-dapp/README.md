# RehabFund dApp — AuditorSEC

Transparent, auditable ERC-20 fund distributor for rehabilitation programs. Built on Ethereum (Sepolia testnet → mainnet upgrade path).

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Smart Contract  │◄──►│   FastAPI (HF)   │◄──►│   Prometheus    │
│  (Sepolia/ETH)  │    │   /donations     │    │   Monitoring    │
│                  │    │   /releases      │    │                 │
│ RehabFund.sol    │    │   /balance/{tok} │    │ prometheus.yml  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Components

| File | Purpose |
|------|---------|
| `src/RehabFundDistributor.sol` | Core Solidity contract — donate, release, emergency withdraw |
| `script/DeployRehabFund.s.sol` | Foundry deployment script |
| `test/RehabFundDistributor.t.sol` | Comprehensive Foundry test suite (8 tests) |
| `api/main.py` | FastAPI backend — reads on-chain events via Web3 |
| `monitoring/prometheus.yml` | Prometheus scrape config for API + monitor |
| `Dockerfile` | Docker image for HF Spaces deployment (port 7860) |
| `docker-compose.yml` | Local dev: API + Prometheus stack |

## Quick Start

### 1. Install Foundry
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### 2. Install dependencies & test
```bash
cd rehab-fund-dapp
forge install OpenZeppelin/openzeppelin-contracts --no-commit
forge test -vvv
```

### 3. Deploy to Sepolia
```bash
cp .env.example .env
# Edit .env with your private key and RPC URL
source .env
forge script script/DeployRehabFund.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify
```

### 4. Run API locally
```bash
cd api
pip install -r requirements.txt
CONTRACT_ADDRESS=0x... RPC_URL=https://rpc.sepolia.org uvicorn main:app --reload
```

### 5. Docker Compose (full stack)
```bash
docker compose up -d
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check + contract info |
| GET | `/donations?limit=10` | Last N donation events |
| GET | `/releases?limit=10` | Last N release events |
| GET | `/balance/{token}` | Locked balance for ERC-20 token |

## Hugging Face Spaces Deployment

The API is deployed as a Docker Space on Hugging Face for free hosting:
- Auto-builds from Dockerfile
- Exposes FastAPI on port 7860
- Set `CONTRACT_ADDRESS` and `RPC_URL` as Space secrets

## License

MIT — AuditorSEC LLC (EDRPOU 46077399)
