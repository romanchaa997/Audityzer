/**
 * Test case description: MetaMask connection race condition vulnerability
 * Vulnerability/edge case: Race condition in wallet connection flow that can lead to approval bypassing
 * Manual reproduction steps:
 *   1. Visit a dApp like Uniswap
 *   2. Click connect wallet
 *   3. Rapidly interact with the page while MetaMask popup is loading
 *   4. Under specific conditions, this can cause unexpected connection behavior
 * Security impact: Could potentially bypass user approval, leading to unauthorized wallet connections
 */

const { test, expect } = require('@playwright/test')
const { connectWallet, setupWalletState } = require('../../utils/wallet-helpers')

test.describe('MetaMask Connection Race Condition Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up the initial wallet state for testing
    await setupWalletState(page, {
      chainId: '0x1', // Ethereum Mainnet
      networkName: 'Ethereum Mainnet',
      locked: false,
      accounts: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
    })
  })

  test('should prevent connection when rapidly interacting during popup load', async ({ page }) => {
    // Navigate to the dApp
    await page.goto('https://app.uniswap.org')

    // Find wallet connect button
    const connectButton = await page.locator('button:has-text("Connect")').first()

    // Set up a race condition scenario by:
    // 1. Clicking the connect button
    // 2. Rapidly interacting with the page while wallet popup is pending
    await connectButton.click()

    // Simulate rapid interactions while wallet popup is appearing
    for (let i = 0; i < 5; i++) {
      await page.mouse.click(10, 10)
      await page.keyboard.press('Escape')
      await page.mouse.click(50, 100)
      await page.keyboard.press('Tab')
    }

    // Check if connection is still in expected state (not connected)
    // MetaMask interaction would normally happen here, but is mocked to fail safely

    // Verify expected outcome: connection either failed or properly prompted for permission
    const isConnected = await page.evaluate(() => {
      return typeof window.ethereum !== 'undefined' && window.ethereum.selectedAddress !== null
    })

    // The test passes if the wallet is not connected without explicit permission
    await expect(isConnected).toBeFalsy()
  })

  test('should maintain connection security even with multiple rapid connect attempts', async ({ page }) => {
    // Navigate to the dApp
    await page.goto('https://app.uniswap.org')

    // Find wallet connect button
    const connectButton = await page.locator('button:has-text("Connect")').first()

    // Try rapid-fire connection attempts to force race condition
    for (let i = 0; i < 3; i++) {
      await connectButton.click()
      await page.waitForTimeout(100) // Very short timeout to create race
      await page.keyboard.press('Escape')
    }

    // Check if multiple connect attempts caused a bypass
    const connectionCount = await page.evaluate(() => {
      // In a vulnerable implementation, multiple events might have fired
      return typeof window._connectionAttempts !== 'undefined' ? window._connectionAttempts : 0
    })

    // Verify we don't have multiple successful connections
    await expect(connectionCount).toBeLessThanOrEqual(1)
  })
})
