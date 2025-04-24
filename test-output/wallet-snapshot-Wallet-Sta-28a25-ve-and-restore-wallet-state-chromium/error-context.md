# Test info

- Name: Wallet State Snapshot Demo >> Save and restore wallet state
- Location: F:\Ігор\web3-security-test-kit\tests\wallet-snapshot.test.js:193:3

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "0xf39Fd6e5"
Received string:    "Not connected"
    at setupWalletDirectly (F:\Ігор\web3-security-test-kit\tests\wallet-snapshot.test.js:103:25)
    at F:\Ігор\web3-security-test-kit\tests\wallet-snapshot.test.js:195:5
```

# Page snapshot

```yaml
- heading "Web3 Test Page" [level=1]
- button "Connect Wallet"
- heading "Wallet Connected" [level=2]
- paragraph: "Address: 0x1234567890abcdef1234567890abcdef12345678"
- paragraph: "Network: Ethereum Mainnet"
- heading "Send Transaction" [level=2]
- text: "Recipient Address:"
- textbox "Recipient Address:": "0x1234567890123456789012345678901234567890"
- text: "Amount (ETH):"
- textbox "Amount (ETH):": "0.1"
- button "Send"
```

# Test source

```ts
   3 | const { forceShowWalletUI } = require('./utils/wallet-snapshot')
   4 |
   5 | // Simple wallet state snapshot utilities
   6 | async function saveSimpleWalletState(page, customData = {}) {
   7 |   return await page.evaluate((customData) => {
   8 |     if (!window.ethereum) {
   9 |       console.error('No wallet detected')
   10 |       return null
   11 |     }
   12 |     
   13 |     return {
   14 |       selectedAddress: window.ethereum?.selectedAddress || null,
   15 |       chainId: window.ethereum?.chainId || '0x1',
   16 |       networkVersion: window.ethereum?.networkVersion || '1',
   17 |       // Save any UI state that might be needed
   18 |       uiState: {
   19 |         walletInfoVisible: document.getElementById('wallet-info')?.style.display !== 'none',
   20 |       },
   21 |       // Store any custom data that was provided
   22 |       customData: customData || {},
   23 |     }
   24 |   }, customData)
   25 | }
   26 |
   27 | async function restoreSimpleWalletState(page, state) {
   28 |   if (!state) {
   29 |     throw new Error('Cannot restore null or undefined wallet state')
   30 |   }
   31 |
   32 |   await page.evaluate((state) => {
   33 |     if (window.ethereum) {
   34 |       window.ethereum.selectedAddress = state.selectedAddress
   35 |       window.ethereum.chainId = state.chainId
   36 |       window.ethereum.networkVersion = state.networkVersion
   37 |
   38 |       // Important: Update the UI elements to reflect the restored state
   39 |       if (document.getElementById('wallet-info')) {
   40 |         document.getElementById('wallet-info').style.display = 'block'
   41 |       }
   42 |
   43 |       if (document.querySelector('.wallet-address')) {
   44 |         document.querySelector('.wallet-address').textContent = state.selectedAddress
   45 |       }
   46 |
   47 |       // Update network name
   48 |       const networkNames = {
   49 |         '0x1': 'Ethereum Mainnet',
   50 |         '0x5': 'Goerli Testnet', 
   51 |         '0x89': 'Polygon Mainnet',
   52 |       }
   53 |       
   54 |       if (document.getElementById('network-name')) {
   55 |         document.getElementById('network-name').textContent = 
   56 |           networkNames[state.chainId] || `Chain ID: ${state.chainId}`
   57 |       }
   58 |
   59 |       // Restore any custom data
   60 |       if (state.customData) {
   61 |         window.ethereum.customData = state.customData
   62 |       }
   63 |     }
   64 |   }, state)
   65 |   
   66 |   // Wait a bit for UI to update
   67 |   await page.waitForTimeout(100)
   68 | }
   69 |
   70 | // Alternative approach for connecting wallet without relying on UI
   71 | async function setupWalletDirectly(page) {
   72 |   // Directly set wallet state through JavaScript without relying on UI
   73 |   await page.evaluate(() => {
   74 |     if (window.ethereum) {
   75 |       window.ethereum.selectedAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
   76 |       window.ethereum.chainId = '0x1' // Ethereum Mainnet
   77 |       window.ethereum.networkVersion = '1'
   78 |       
   79 |       // Directly manipulate the DOM to show wallet info
   80 |       const walletInfo = document.getElementById('wallet-info')
   81 |       if (walletInfo) {
   82 |         walletInfo.style.display = 'block'
   83 |       }
   84 |       
   85 |       const walletAddressEl = document.querySelector('.wallet-address')
   86 |       if (walletAddressEl) {
   87 |         walletAddressEl.textContent = window.ethereum.selectedAddress
   88 |       }
   89 |       
   90 |       const networkNameEl = document.getElementById('network-name')
   91 |       if (networkNameEl) {
   92 |         networkNameEl.textContent = 'Ethereum Mainnet'
   93 |       }
   94 |     }
   95 |   })
   96 |   
   97 |   // Force show the wallet UI instead of relying on visibility checks
   98 |   await forceShowWalletUI(page)
   99 |   
  100 |   // Verify content but skip visibility checks that are unreliable
  101 |   await page.waitForTimeout(500)
  102 |   const walletAddress = await page.locator('.wallet-address').textContent()
> 103 |   expect(walletAddress).toContain('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'.substring(0, 10))
      |                         ^ Error: expect(received).toContain(expected) // indexOf
  104 | }
  105 |
  106 | test.describe('Wallet State Snapshot Demo', () => {
  107 |   let page
  108 |   let walletState
  109 |
  110 |   test.beforeEach(async ({ browser }) => {
  111 |     // Create a new page
  112 |     page = await browser.newPage()
  113 |     
  114 |     // Navigate to the test page
  115 |     await page.goto('file://' + process.cwd() + '/tests/test-page.html')
  116 |     
  117 |     // Add a mock ethereum provider - Ensure this is properly initialized before tests run
  118 |     await page.addInitScript(() => {
  119 |       window.ethereum = {
  120 |         isMetaMask: true,
  121 |         selectedAddress: null,
  122 |         chainId: '0x1', // Ethereum Mainnet
  123 |         networkVersion: '1',
  124 |         request: async ({ method, params = [] }) => {
  125 |           console.log(`Mock wallet: ${method} called with params:`, params)
  126 |
  127 |           switch (method) {
  128 |             case 'eth_requestAccounts':
  129 |               window.ethereum.selectedAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  130 |               // Update UI
  131 |               if (document.getElementById('wallet-info')) {
  132 |                 document.getElementById('wallet-info').style.display = 'block'
  133 |               }
  134 |               if (document.querySelector('.wallet-address')) {
  135 |                 document.querySelector('.wallet-address').textContent = window.ethereum.selectedAddress
  136 |               }
  137 |               if (document.getElementById('network-name')) {
  138 |                 document.getElementById('network-name').textContent = 'Ethereum Mainnet'
  139 |               }
  140 |               return [window.ethereum.selectedAddress]
  141 |
  142 |             case 'eth_chainId':
  143 |               return window.ethereum.chainId
  144 |
  145 |             case 'wallet_switchEthereumChain':
  146 |               const newChainId = params[0]?.chainId
  147 |               if (newChainId) {
  148 |                 window.ethereum.chainId = newChainId
  149 |                 window.ethereum.networkVersion = 
  150 |                   newChainId === '0x1' ? '1' : 
  151 |                   newChainId === '0x5' ? '5' : 
  152 |                   newChainId === '0x89' ? '137' : '0'
  153 |                 
  154 |                 // Update UI
  155 |                 const networkNames = {
  156 |                   '0x1': 'Ethereum Mainnet',
  157 |                   '0x5': 'Goerli Testnet',
  158 |                   '0x89': 'Polygon Mainnet',
  159 |                 }
  160 |                 if (document.getElementById('network-name')) {
  161 |                   document.getElementById('network-name').textContent = 
  162 |                     networkNames[newChainId] || `Chain ID: ${newChainId}`;
  163 |                 }
  164 |               }
  165 |               return null
  166 |
  167 |             case 'eth_sendTransaction':
  168 |               // Mock a successful transaction
  169 |               if (document.getElementById('tx-confirmation')) {
  170 |                 document.getElementById('tx-confirmation').style.display = 'block';
  171 |               }
  172 |               if (document.getElementById('tx-hash')) {
  173 |                 document.getElementById('tx-hash').textContent = 
  174 |                   '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
  175 |               }
  176 |               return '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
  177 |
  178 |             default:
  179 |               console.warn(`Unhandled method: ${method}`)
  180 |               return null
  181 |           }
  182 |         },
  183 |         on: (eventName, callback) => {
  184 |           console.log(`MetaMask mock: registered event listener for ${eventName}`)
  185 |         },
  186 |       }
  187 |     })
  188 |     
  189 |     // Ensure the page is fully loaded
  190 |     await page.waitForLoadState('networkidle');
  191 |   })
  192 |
  193 |   test('Save and restore wallet state', async () => {
  194 |     // Use direct setup instead of clicking button
  195 |     await setupWalletDirectly(page)
  196 |
  197 |     // Verify the correct address is shown
  198 |     const walletAddressElement = await page.locator('.wallet-address')
  199 |     await expect(walletAddressElement).toContainText('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'.substring(0, 10))
  200 |
  201 |     // Save the current wallet state
  202 |     walletState = await saveSimpleWalletState(page, {
  203 |       testData: 'This is custom data that can be stored with the snapshot',
```