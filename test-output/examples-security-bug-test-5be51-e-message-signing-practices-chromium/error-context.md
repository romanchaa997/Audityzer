# Test info

- Name: Phishing via eth_sign Misuse Detection >> validates secure message signing practices
- Location: F:\Ігор\web3-security-test-kit\examples\security-bug-tests\eth-sign-phishing.test.ts:240:7

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
    at F:\Ігор\web3-security-test-kit\examples\security-bug-tests\eth-sign-phishing.test.ts:298:30
```

# Page snapshot

```yaml
- heading "Test dApp" [level=1]
- button "Connect Wallet"
- button "Login to dApp"
- button "Claim Free NFT"
- button "Sign Message"
- text: 'Error: Buffer is not defined Provider: metamask Address: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e Network: Ethereum Mainnet'
```

# Test source

```ts
  198 |     // Analyze eth_sign requests collected from our monitoring
  199 |     let phishingDetected = false
  200 |
  201 |     // Combine all observed eth_sign calls
  202 |     const allEthSignCalls = [...ethSignCalls, ...ethRequests]
  203 |
  204 |     for (const call of allEthSignCalls) {
  205 |       if (call.method === 'eth_sign' && call.params.length >= 2) {
  206 |         const address = call.params[0]
  207 |         const message = call.params[1]
  208 |
  209 |         // Check 1: Message should be prefixed or hex-encoded
  210 |         const isHex = isHexString(message)
  211 |         const isProperlyPrefixed = isHex || message.startsWith('\u0019Ethereum Signed Message:\n')
  212 |
  213 |         // Check 2: Common phishing patterns in message content
  214 |         const messageStr = isHex ? Buffer.from(message.slice(2), 'hex').toString() : message
  215 |         const phishingPatterns = [
  216 |           /free nft/i,
  217 |           /claim your/i,
  218 |           /airdrop/i,
  219 |           /login to/i,
  220 |           /authorize.+access/i,
  221 |           /connect.+account/i
  222 |         ]
  223 |
  224 |         const containsPhishingPattern = phishingPatterns.some(pattern => pattern.test(messageStr))
  225 |
  226 |         // Detect potential phishing
  227 |         if (!isProperlyPrefixed && containsPhishingPattern) {
  228 |           phishingDetected = true
  229 |           console.log('VULNERABILITY DETECTED: Potential phishing via eth_sign')
  230 |           console.log(`Message: ${messageStr}`)
  231 |           console.log('Improper use of eth_sign without standard prefix')
  232 |         }
  233 |       }
  234 |     }
  235 |
  236 |     // Final assertion - we should have detected the phishing attempt
  237 |     expect(phishingDetected).toBeTruthy()
  238 |   })
  239 |
  240 |   test('validates secure message signing practices', async ({ page }) => {
  241 |     // Set up a mock dApp page
  242 |     await createMockDappPage(page)
  243 |
  244 |     // Connect wallet with mock
  245 |     await connectWallet(page, {
  246 |       provider: 'metamask',
  247 |       address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  248 |       chainId: '0x1' // Ethereum mainnet
  249 |     })
  250 |
  251 |     // Monitor ethereum requests for proper signing methods
  252 |     const signRequests: {method: string, params: any[]}[] = []
  253 |
  254 |     await page.evaluate(() => {
  255 |       const originalRequest = window.ethereum.request
  256 |       window.ethereum.request = async function (args) {
  257 |         if (args.method === 'personal_sign' || args.method === 'eth_sign' ||
  258 |             args.method === 'eth_signTypedData' || args.method === 'eth_signTypedData_v4') {
  259 |           console.log(`SIGN_METHOD: ${args.method} with params: ${JSON.stringify(args.params)}`)
  260 |         }
  261 |         return originalRequest.call(window.ethereum, args)
  262 |       }
  263 |     })
  264 |
  265 |     page.on('console', msg => {
  266 |       const text = msg.text()
  267 |       if (text.includes('SIGN_METHOD:')) {
  268 |         try {
  269 |           const methodMatch = text.match(/SIGN_METHOD: ([^ ]+)/)
  270 |           const paramsMatch = text.match(/with params: (.+)/)
  271 |           if (methodMatch && paramsMatch) {
  272 |             const method = methodMatch[1]
  273 |             const params = JSON.parse(paramsMatch[1])
  274 |             signRequests.push({ method, params })
  275 |           }
  276 |         } catch (e) {
  277 |           // Failed to parse, ignore
  278 |         }
  279 |       }
  280 |     })
  281 |
  282 |     // Trigger secure signing flow
  283 |     await page.click('#sign-button')
  284 |     await page.waitForTimeout(500)
  285 |
  286 |     // Verify that proper method was used
  287 |     let usedSecureMethod = false
  288 |
  289 |     for (const request of signRequests) {
  290 |       // Check for secure signing methods
  291 |       if (request.method === 'personal_sign' ||
  292 |           request.method === 'eth_signTypedData' ||
  293 |           request.method === 'eth_signTypedData_v4') {
  294 |         usedSecureMethod = true
  295 |       }
  296 |     }
  297 |
> 298 |     expect(usedSecureMethod).toBeTruthy()
      |                              ^ Error: expect(received).toBeTruthy()
  299 |   })
  300 | })
  301 |
```
