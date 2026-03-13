.PHONY: build test lint deploy-sepolia fmt install clean docker-up docker-down

# ── Foundry ──────────────────────────────────────────────────
install:
	forge install

build:
	forge build

test:
	forge test -vvv

fmt:
	forge fmt

lint:
	forge fmt --check
	solhint 'src/**/*.sol'

clean:
	forge clean

# ── Deployment ───────────────────────────────────────────────
deploy-sepolia:
	forge script script/DeployRehabFund.s.sol \
		--rpc-url $(SEPOLIA_RPC_URL) \
		--private-key $(PRIVATE_KEY) \
		--broadcast --verify

deploy-local:
	forge script script/DeployRehabFund.s.sol \
		--rpc-url http://localhost:8545 \
		--private-key $(PRIVATE_KEY) \
		--broadcast

# ── Docker ───────────────────────────────────────────────────
docker-up:
	docker compose up -d

docker-down:
	docker compose down

# ── Gas snapshot ─────────────────────────────────────────────
snapshot:
	forge snapshot
