A curated set of QA assets for Web3 developers, bounty hunters, and security testers.

## 🔍 What's Inside

- ✅ Smart Contract Security Checklist (Solidity-focused)
- 🧪 Frontend DApp Security Checklist
- 🎯 Bug Bounty Hunting Starter Guide
- ⚙️ Sample Autotests for MetaMask login (Playwright-based)

## 🚀 Use Cases

- Save hours during audits
- Standardize your QA across dApps
- Use in bounty programs to catch high-risk bugs
- Speed up penetration testing for solo developers

## 📦 How to Use

1. Clone the repo
2. Explore the `checklists/` for structured testing
3. Run autotests in `autotests/sample-tests/`
4. Customize, expand, and contribute

# Web3FuzzForge 🚀

CLI-first test template generator built for _real_ dApp security.

Forget the fluff. This tool generates fuzzable Playwright test scaffolding that mocks wallet interactions (MetaMask first, others coming). Ideal for Web3 developers and auditors who actually test their UI↔wallet logic.

---

## ⚡ Key Features

- ✅ CLI to generate ready-to-run test templates
- 🔁 JavaScript & TypeScript support
- 🦊 MetaMask wallet simulation
- 🛠️ Easy customization via flags
- 👁️ Headed mode to watch wallet flow visually
- 🔐 Future: wallet injection, phishing flows, bug bounty-ready security modules

---

## 🚀 Quick Start

```bash
npx web3fuzzforge init my-test
cd my-test
npm install
npx playwright test

# Generate JavaScript templates
node src/index.js generate connect --lang js --out ./tests/connect-test.js
node src/index.js generate tx --lang js --out ./tests/tx-test.js
node src/index.js generate sign --lang js --out ./tests/sign-test.js
node src/index.js generate error --lang js --out ./tests/error-test.js

# Generate TypeScript templates
node src/index.js generate connect --lang ts --out ./tests/connect-test.ts
node src/index.js generate tx --lang ts --out ./tests/tx-test.ts
node src/index.js generate sign --lang ts --out ./tests/sign-test.ts
node src/index.js generate error --lang ts --out ./tests/error-test.ts

# Run tests with the CLI shortcut
node src/index.js run                    # Run all tests
node src/index.js run --headed           # Run tests in headed mode
node src/index.js run --debug            # Run tests in debug mode
node src/index.js run --project chrome   # Run tests for a specific project
node src/index.js run --grep "connect"   # Run tests matching a pattern
```

## 🤖 CI Integration

Includes a GitHub Actions workflow for continuous testing. See `.github/workflows/playwright.yml` for the implementation.

MIT License. Open to community PRs.
