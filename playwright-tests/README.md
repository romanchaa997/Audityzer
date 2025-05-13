# Web3 Security Test Kit - Playwright Tests

This directory contains all Playwright tests for the Web3 Security Test Kit.

## Directory Structure

- `tests/` - Core test files
- `autotests/` - Automated test scripts
- `examples/` - Example test cases
- `utils/` - Utility functions for testing
- `web3fuzzforge-community-tests/` - Community contributed tests

## Running Tests

### Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with your test configuration:
   ```
   MOCK_MODE=true
   TARGET_URL=http://localhost:3000
   ```

### Run Tests

Run all tests:
```
npm test
```

Run a specific test:
```
npm run test:single
```

Run tests with UI:
```
npm run test:ui
```

Debug tests:
```
npm run test:debug
```

## Utilities

The `utils/` directory contains helper functions:

- `wallet-helpers.js` - Functions for wallet interactions
- `wallet-snapshot.js` - Wallet state persistence utilities
- `debug-logger.js` - Logging utilities
- `contributor-tracker.js` - Community contribution tracking

Import utilities:
```javascript
const { connectWallet, setupWalletState, saveWalletState } = require('./utils');
``` 