# Audityzer – AI-powered multi-chain Web3 security toolkit

[![GitHub stars](https://img.shields.io/github/stars/romanchaa997/Audityzer?style=social)](https://github.com/romanchaa997/Audityzer)
[![CI](https://img.shields.io/github/actions/workflow/status/romanchaa997/Audityzer/ci.yml?label=CI)](https://github.com/romanchaa997/Audityzer/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Multi-chain smart contract auditing with 20+ detection algorithms. Audityzer combines AI/ML detection with static analysis to find vulnerabilities across 6 EVM chains (Ethereum, BSC, Polygon, Arbitrum, Optimism, Avalanche).

---

## Why Audityzer

- 3.7B+ lost to smart contract exploits in 2024 (Chainalysis).
- Traditional audits cost 20K–150K and take 4–8 weeks.
- 85% of Web3 projects launch without proper security audits.

Audityzer automates security reviews from weeks to minutes, so you can ship faster without sacrificing security.

## Key features

- **20+ detection algorithms**: reentrancy, integer overflow/underflow, access control flaws, oracle manipulation, flash loan exploits, front-running and more.
- **Multi-chain native**: Ethereum, BSC, Polygon, Arbitrum, Optimism, Avalanche.
- **AI-assisted analysis**: pattern recognition trained on tens of thousands of real exploits.
- **CI/CD friendly**: CLI-first design, easy to plug into GitHub Actions and other pipelines.

## Quick start

1. Install CLI:
   ```bash
   npm install -g audityzer
   # or
   pip install audityzer-cli
   ```
2. Scan a Solidity project:
   ```bash
   audityzer scan ./contracts --chain ethereum
   # or npm variant
   npx audityzer scan --target ./contracts --mode advanced
   ```
3. Review report:
   - High / Medium / Low findings
   - Suggested fixes
   - Links to docs and best practices.

## Architecture

```
Audityzer Platform
├── AI Security Engine (Playwright + OpenAI + SARIF scanner)
├── Smart Contract Scanner (Slither, Mythril, Echidna, Foundry fuzz)
├── Multi-chain API (FastAPI + PostgreSQL)
├── NATS JetStream (real-time events)
└── K8s (DigitalOcean fra1, ArgoCD)
```

CLI integrates Slither/Foundry for static+fuzz analysis; AI layer flags patterns like reentrancy (external calls before state updates).

## Installation

- **NPM**: `npm install audityzer`
- **Docker**: `docker run -p 3000:3000 audityzer/platform:latest`
- **From source**: `git clone https://github.com/romanchaa997/Audityzer && npm install && npm run dev`

## Live Demo

- Platform: [https://audityzer.com](https://audityzer.com)
- HF Spaces: https://huggingface.co/spaces/Audityzer/audityzer-demo

## Tech Stack

Python, TypeScript/Node.js, Solidity, FastAPI, Kubernetes, Docker, Slither, Foundry, OpenAI.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Focus: new detectors, chain support, CLI plugins.

## Community & support

- Star this repo to support the project 💫
- Join the Discord: [link soon]
- Follow on X/Twitter: [https://twitter.com/audityzer](https://twitter.com/audityzer)
- Docs: [https://audityzer.com/docs](https://audityzer.com/docs)

Together, we're making Web3 safer for everyone.
