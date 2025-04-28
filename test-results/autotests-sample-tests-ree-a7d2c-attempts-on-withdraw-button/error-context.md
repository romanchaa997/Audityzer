# Test info

- Name: Reentrancy Vulnerability Test >> detects reentrancy attempts on withdraw button
- Location: F:\Ігор\web3-security-test-kit\autotests\sample-tests\reentrancy-check.test.js:143:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('#reentrancy-status')
Expected string: "REENTRANCY ATTEMPT DETECTED"
Received string: "No reentrancy detected"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('#reentrancy-status')
    9 × locator resolved to <div id="reentrancy-status">No reentrancy detected</div>
      - unexpected value "No reentrancy detected"

    at F:\Ігор\web3-security-test-kit\autotests\sample-tests\reentrancy-check.test.js:152:54
```

# Page snapshot

```yaml
- heading "DApp with Vulnerable Contract" [level=1]
- text: Wallet connected
- button "Withdraw Funds"
- text: 'Transaction completed: 0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890 Transaction count: 1 No reentrancy detected'
```

# Test source

```ts
   52 |           if (method === 'eth_sendTransaction') {
   53 |             const txParams = params[0];
   54 |             console.log('Transaction params:', txParams);
   55 |
   56 |             // If this is a call to our vulnerable contract
   57 |             if (txParams.to.toLowerCase() === CONTRACT_ADDRESS.toLowerCase()) {
   58 |               // Simulate the contract execution and callback handling
   59 |               window.dispatchEvent(new CustomEvent('contractCalled', {
   60 |                 detail: { txParams }
   61 |               }));
   62 |
   63 |               return '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'; // fake tx hash
   64 |             }
   65 |           }
   66 |
   67 |           return null;
   68 |         },
   69 |
   70 |         // Event listeners
   71 |         on: (eventName, callback) => {
   72 |           console.log(`Ethereum mock: registered event listener for ${eventName}`);
   73 |         }
   74 |       };
   75 |     });
   76 |
   77 |     // Simple mock dApp page with withdraw button
   78 |     await page.goto('about:blank');
   79 |     await page.evaluate(() => {
   80 |       document.body.innerHTML = `
   81 |         <h1>DApp with Vulnerable Contract</h1>
   82 |         <div id="status">Wallet connected</div>
   83 |         <button id="withdraw-button">Withdraw Funds</button>
   84 |         <div id="transaction-status">No transaction pending</div>
   85 |         <div id="transaction-count">Transaction count: 0</div>
   86 |         <div id="reentrancy-status">No reentrancy detected</div>
   87 |       `;
   88 |
   89 |       let isProcessing = false;
   90 |       let txCount = 0;
   91 |
   92 |       // Add withdraw button handler
   93 |       document.getElementById('withdraw-button').addEventListener('click', async () => {
   94 |         if (isProcessing) {
   95 |           document.getElementById('reentrancy-status').textContent = 'REENTRANCY ATTEMPT DETECTED!';
   96 |           document.getElementById('reentrancy-status').style.color = 'red';
   97 |           return;
   98 |         }
   99 |
  100 |         try {
  101 |           // Set processing flag - proper implementation should set this BEFORE external calls
  102 |           isProcessing = true;
  103 |           document.getElementById('transaction-status').textContent = 'Transaction processing...';
  104 |
  105 |           // Call the vulnerable contract
  106 |           const txHash = await window.ethereum.request({
  107 |             method: 'eth_sendTransaction',
  108 |             params: [{
  109 |               from: window.ethereum.selectedAddress,
  110 |               to: window.vulnerableContract.address,
  111 |               value: '0x0',
  112 |               data: '0x2e1a7d4d' // withdraw function signature
  113 |             }]
  114 |           });
  115 |
  116 |           // In a vulnerable implementation, state is updated AFTER the external call
  117 |           txCount++;
  118 |           document.getElementById('transaction-count').textContent = `Transaction count: ${txCount}`;
  119 |
  120 |           // Listen for contract calls (simulating the callback from fallback function)
  121 |           window.addEventListener('contractCalled', (event) => {
  122 |             // This simulates the malicious contract calling back before processing completes
  123 |             if (isProcessing) {
  124 |               // Attempt to trigger another withdraw while the first is still processing
  125 |               document.getElementById('withdraw-button').click();
  126 |             }
  127 |           }, { once: true });
  128 |
  129 |           document.getElementById('transaction-status').textContent = `Transaction completed: ${txHash}`;
  130 |
  131 |           // Reset processing flag - should happen BEFORE external calls in secure implementation
  132 |           isProcessing = false;
  133 |
  134 |         } catch (error) {
  135 |           console.error('Transaction error:', error);
  136 |           document.getElementById('transaction-status').textContent = `Transaction failed: ${error.message}`;
  137 |           isProcessing = false;
  138 |         }
  139 |       });
  140 |     });
  141 |   });
  142 |
  143 |   test('detects reentrancy attempts on withdraw button', async () => {
  144 |     // Find and click the withdraw button
  145 |     const withdrawButton = await page.locator('#withdraw-button');
  146 |     await expect(withdrawButton).toBeVisible();
  147 |
  148 |     // Simulate reentrancy by programmatically clicking multiple times
  149 |     await withdrawButton.click();
  150 |
  151 |     // Wait for transaction to complete and check if reentrancy was detected
> 152 |     await expect(page.locator('#reentrancy-status')).toContainText('REENTRANCY ATTEMPT DETECTED', {
      |                                                      ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
  153 |       timeout: 5000
  154 |     });
  155 |
  156 |     // Take a screenshot for documentation
  157 |     await page.screenshot({ path: 'media/reentrancy-test.png' });
  158 |
  159 |     console.log('Reentrancy test completed! Screenshot saved to media/reentrancy-test.png');
  160 |   });
  161 |
  162 |   test('validates proper reentrancy protection', async () => {
  163 |     // This test can be extended to validate a fixed implementation with proper guards
  164 |     await page.evaluate(() => {
  165 |       // Update the implementation to use reentrancy guards (mutex pattern)
  166 |       const originalClickHandler = document.getElementById('withdraw-button')
  167 |         .onclick;
  168 |
  169 |       document.getElementById('withdraw-button').onclick = null;
  170 |       document.getElementById('withdraw-button').addEventListener('click', async () => {
  171 |         // Check reentrancy guard first (proper implementation)
  172 |         if (window.isProcessing) {
  173 |           document.getElementById('transaction-status').textContent = 'Transaction rejected: Already processing';
  174 |           return;
  175 |         }
  176 |
  177 |         try {
  178 |           // Set guard BEFORE any external calls
  179 |           window.isProcessing = true;
  180 |
  181 |           // Perform the contract call
  182 |           const result = await window.vulnerableContract.withdrawFunds();
  183 |
  184 |           // Update UI based on result
  185 |           document.getElementById('transaction-status').textContent =
  186 |             result ? 'Transaction completed with guards' : 'Transaction failed';
  187 |
  188 |           // Clear guard AFTER all processing
  189 |           window.isProcessing = false;
  190 |         } catch (error) {
  191 |           document.getElementById('transaction-status').textContent = `Error: ${error.message}`;
  192 |           window.isProcessing = false;
  193 |         }
  194 |       });
  195 |     });
  196 |
  197 |     // Test the protected implementation
  198 |     const withdrawButton = await page.locator('#withdraw-button');
  199 |     await withdrawButton.click();
  200 |
  201 |     // Validate that the transaction completes without reentrancy issues
  202 |     await expect(page.locator('#transaction-status')).toContainText('Transaction completed with guards', {
  203 |       timeout: 5000
  204 |     });
  205 |
  206 |     // Take a screenshot
  207 |     await page.screenshot({ path: 'media/reentrancy-protection-test.png' });
  208 |   });
  209 | });
```
