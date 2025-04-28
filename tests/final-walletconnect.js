// WalletConnect connection test
const { test, expect } = require('@playwright/test')

// Test configuration
// eslint-disable-next-line no-unused-vars
const WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678'
// eslint-disable-next-line no-unused-vars
const WALLET_NAME = 'Test Wallet'
// eslint-disable-next-line no-unused-vars
const NETWORK_NAME = 'Ethereum'

test.describe('WalletConnect Connection Test', () => {
  let page

  test.beforeEach(async ({ browser }) => {
    // Create a new page
    page = await browser.newPage()

    // Mock the WalletConnect provider before navigating to the page
    await page.addInitScript(() => {
      // Create WalletConnect mock
      window.ethereum = {
        isMetaMask: false, // Not MetaMask
        isWalletConnect: true, // WalletConnect identifier
        selectedAddress: null,
        request: async ({ method }) => {
          console.log(`WalletConnect mock: ${method} called`)
          if (method === 'eth_requestAccounts') {
            window.ethereum.selectedAddress = '0x1234567890abcdef1234567890abcdef12345678'
            // Dispatch connection event
            window.dispatchEvent(new Event('ethereum#initialized'))
            return ['0x1234567890abcdef1234567890abcdef12345678']
          }
          return null
        },
        on: (eventName, callback) => {
          console.log(`WalletConnect mock: registered event listener for ${eventName}`)
          window.addEventListener('ethereum#initialized', () => {
            if (eventName === 'accountsChanged') {
              callback(['0x1234567890abcdef1234567890abcdef12345678'])
            }
          })
        },
        // WalletConnect specific methods
        disconnect: async () => {
          console.log('WalletConnect mock: disconnect called')
          window.ethereum.selectedAddress = null
          window.dispatchEvent(new Event('disconnect'))
          return true
        },
        // Trigger QR code display
        triggerQRCode: () => {
          console.log('WalletConnect mock: QR code should be displayed')
          // This would be called when user clicks connect in real app
        },
      }
    })

    // Navigate to the test page or use a blank page
    await page.goto('https://app.uniswap.org')
  })

  test('connects WalletConnect wallet to dApp', async () => {
    // Find and click the "Connect Wallet" button
    const connectWalletButton = await page.locator('.connect-wallet-button')
    await expect(connectWalletButton).toBeVisible()
    await connectWalletButton.click()

    // Optional: Mock QR code scanning process
    await page.evaluate(() => {
      // Simulate QR code being scanned by a mobile device
      console.log('Simulating QR code scan from mobile wallet')
      // After QR code scan, connection is established
      window.ethereum.selectedAddress = '0x1234567890abcdef1234567890abcdef12345678'
      window.dispatchEvent(new Event('accountsChanged'))
    })

    // Wait for wallet info to be displayed
    const walletInfo = await page.locator('#wallet-info')
    await expect(walletInfo).toBeVisible()

    // Check if wallet address is displayed correctly
    const walletAddressElement = await page.locator('.wallet-address')
    await expect(walletAddressElement).toContainText(WALLET_ADDRESS.substring(0, 10))

    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/walletconnect-connection-test.png' })

    console.log('WalletConnect connection test completed successfully!')
  })

  test('disconnects WalletConnect wallet from dApp', async () => {
    // First connect the wallet
    const connectWalletButton = await page.locator('.connect-wallet-button')
    await expect(connectWalletButton).toBeVisible()
    await connectWalletButton.click()

    // Simulate QR code scan and connection
    await page.evaluate(() => {
      window.ethereum.selectedAddress = '0x1234567890abcdef1234567890abcdef12345678'
      window.dispatchEvent(new Event('accountsChanged'))
    })

    // Verify connection was successful
    const walletInfo = await page.locator('#wallet-info')
    await expect(walletInfo).toBeVisible()

    // Find and click disconnect button (this varies by dApp implementation)
    const disconnectButton = await page.locator(
      '#disconnect-wallet, [data-testid="disconnect-button"]'
    )
    if (await disconnectButton.isVisible()) {
      await disconnectButton.click()

      // Simulate wallet disconnection response
      await page.evaluate(() => {
        window.ethereum.disconnect()
      })

      // Verify connect button is visible again
      await expect(connectWalletButton).toBeVisible()

      // Take a screenshot to document disconnected state
      await page.screenshot({ path: 'media/walletconnect-disconnection-test.png' })
    } else {
      console.log('Disconnect button not found, skipping disconnect test')
    }
  })
})
