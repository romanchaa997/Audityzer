# MetaMask Test Scaffold for dApps

This directory contains Playwright test scaffolds for Web3 dApp testing with mocked MetaMask wallet.

## MetaMask Connection Test (`metamask-connection.spec.ts`)

This test scaffold demonstrates how to test MetaMask wallet connection flows in your dApp without requiring the actual MetaMask extension.

### Features

- Mocks the `window.ethereum` provider that MetaMask injects
- Tests basic wallet connection flow
- Tests network switching
- Tests wallet disconnection
- Includes proper TypeScript typing

### How to Use

1. **Configure the test for your dApp**:

   - Update `DAPP_URL` to point to your dApp's URL
   - Replace the selectors (e.g., `button:has-text("Connect Wallet")`) with your dApp's actual selectors
   - Customize assertions based on your UI

2. **Run the test**:

   ```bash
   npx playwright test tests/metamask-connection.spec.ts
   ```

3. **View results**:
   - Test screenshots will be saved in the `test-results` directory
   - View HTML report with `npx playwright show-report`

### Customizing the Tests

- **Mock different chain IDs**: Modify the initial `chainId` and `networkVersion` values
- **Add more RPC methods**: Extend the `request` method switch case to handle additional MetaMask methods
- **Add more test cases**: Create more specific tests for your dApp's wallet integration features

### Troubleshooting

- If your dApp uses a different pattern to detect MetaMask, you may need to extend the mock
- Check browser console logs for any errors related to the MetaMask provider
- Ensure your selectors match the actual elements in your dApp

## License

This test scaffold is part of the Web3 Security Test Kit and is licensed under MIT.
