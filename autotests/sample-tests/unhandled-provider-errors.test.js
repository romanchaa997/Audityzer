// Unhandled provider errors test using Playwright with mocked provider failures
const { test, expect } = require('@playwright/test')

test.describe('Unhandled Provider Errors Test', () => {
  let page

  test.beforeEach(async ({ browser }) => {
    // Create a new page
    page = await browser.newPage()

    // Mock the ethereum provider with purposeful errors
    await page.addInitScript(() => {
      // Mock wallet address
      // eslint-disable-next-line no-unused-vars
      const WALLET_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678'

      // Common error types in web3 providers
      const PROVIDER_ERRORS = {
        USER_REJECTED: { code: 4001, message: 'User rejected the request.' },
        UNAUTHORIZED: {
          code: 4100,
          message: 'The requested method and/or account has not been authorized.',
        },
        UNSUPPORTED_METHOD: {
          code: 4200,
          message: 'The Provider does not support the requested method.',
        },
        DISCONNECTED: { code: 4900, message: 'The Provider is disconnected from all chains.' },
        CHAIN_DISCONNECTED: {
          code: 4901,
          message: 'The Provider is not connected to the requested chain.',
        },
        RESOURCE_UNAVAILABLE: {
          code: -32002,
          message: 'Resource unavailable, request already pending',
        },
        INTERNAL_ERROR: { code: -32603, message: 'Internal JSON-RPC error.' },
        INVALID_PARAMS: { code: -32602, message: 'Invalid parameters' },
      }

      // Create error log to track unhandled errors
      window.errorLog = []

      // Mock ethereum provider with error injection
      window.ethereum = {
        isMetaMask: true,
        selectedAddress: WALLET_ADDRESS,
        _isConnected: true,
        _currentErrorType: null, // Will be set to trigger specific errors

        // Mock request method for eth interactions with error injection
        request: async ({ method, params }) => {
          console.log(`Ethereum mock: ${method} called`)

          // Log the request
          window.errorLog.push({
            type: 'request',
            method,
            params,
            timestamp: Date.now(),
          })

          // If we're set to trigger an error for this method, throw it
          if (this._currentErrorType && PROVIDER_ERRORS[this._currentErrorType]) {
            const error = PROVIDER_ERRORS[this._currentErrorType]

            // Log the error
            window.errorLog.push({
              type: 'error',
              method,
              error,
              timestamp: Date.now(),
              handled: false,
            })

            const providerError = new Error(error.message)
            providerError.code = error.code
            throw providerError
          }

          // Otherwise proceed with normal behavior
          if (method === 'eth_requestAccounts') {
            return [WALLET_ADDRESS]
          }

          if (method === 'eth_chainId') {
            return '0x1' // Mainnet
          }

          if (method === 'eth_sendTransaction') {
            return '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890' // fake tx hash
          }

          return null
        },

        // Event listeners
        on: (eventName, callback) => {
          console.log(`Ethereum mock: registered event listener for ${eventName}`)
        },
      }

      // Function to set which error to trigger next
      window.triggerProviderError = function (errorType) {
        window.ethereum._currentErrorType = errorType
        console.log(`Set to trigger error: ${errorType}`)
        return true
      }

      // Function to check if errors were properly handled
      window.checkErrorHandling = function () {
        const unhandledErrors = window.errorLog.filter(
          entry => entry.type === 'error' && entry.handled === false
        )

        return {
          total: window.errorLog.filter(entry => entry.type === 'error').length,
          unhandled: unhandledErrors.length,
          errors: unhandledErrors,
        }
      }

      // Function to mark an error as handled
      window.markErrorHandled = function (methodName) {
        window.errorLog.forEach(entry => {
          if (entry.type === 'error' && entry.method === methodName) {
            entry.handled = true
          }
        })
      }
    })

    // Simple mock dApp page with transaction functionality
    await page.goto('about:blank')
    await page.evaluate(() => {
      document.body.innerHTML = `
        <h1>DApp with Provider Error Handling</h1>
        <div id="status">Wallet connected</div>
        <div>
          <button id="connect-button">Connect</button>
          <button id="send-tx-button">Send Transaction</button>
          <button id="switch-chain-button">Switch Chain</button>
          <button id="sign-button">Sign Message</button>
        </div>
        <div id="error-message" style="color: red;"></div>
        <div id="transaction-status">No transaction pending</div>
        <div id="handled-errors">Handled errors: 0</div>
        <div id="unhandled-errors">Unhandled errors: 0</div>
        
        <div class="error-controls">
          <h3>Test Controls (not part of the dApp)</h3>
          <button id="trigger-user-rejected">Trigger USER_REJECTED</button>
          <button id="trigger-unauthorized">Trigger UNAUTHORIZED</button>
          <button id="trigger-disconnected">Trigger DISCONNECTED</button>
          <button id="trigger-resource-unavailable">Trigger RESOURCE_UNAVAILABLE</button>
        </div>
      `

      // Track whether we handle errors properly
      let handledErrorCount = 0

      // Generic error handler (proper implementation)
      function handleProviderError(error, actionType) {
        const errorDiv = document.getElementById('error-message')
        handledErrorCount++

        // Mark this error as handled in our log
        window.markErrorHandled(actionType)

        // Update the UI
        document.getElementById('handled-errors').textContent =
          `Handled errors: ${handledErrorCount}`

        // Handle specific error types (proper implementation)
        if (error.code === 4001) {
          errorDiv.textContent = `User rejected the ${actionType} request`
        } else if (error.code === 4100) {
          errorDiv.textContent = `Not authorized to perform ${actionType}`
        } else if (error.code === 4900 || error.code === 4901) {
          errorDiv.textContent = 'Wallet disconnected. Please reconnect.'
          document.getElementById('status').textContent = 'Wallet disconnected'
        } else if (error.code === -32002) {
          errorDiv.textContent = 'Request already pending. Check your wallet.'
        } else {
          // Generic fallback
          errorDiv.textContent = `Error during ${actionType}: ${error.message || 'Unknown error'}`
        }
      }

      // Connect wallet button (without proper error handling)
      document.getElementById('connect-button').addEventListener('click', async () => {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

          document.getElementById('status').textContent =
            `Connected: ${accounts[0].substring(0, 8)}...`
          document.getElementById('error-message').textContent = ''
        } catch (error) {
          // No error handling here (intentionally bad implementation)
          console.error('Connection error:', error)
          // The UI won't update, simulating an unhandled error
        }
      })

      // Send transaction button (with proper error handling)
      document.getElementById('send-tx-button').addEventListener('click', async () => {
        document.getElementById('transaction-status').textContent = 'Transaction pending...'

        try {
          const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [
              {
                from: window.ethereum.selectedAddress,
                to: '0x1234567890123456789012345678901234567890',
                value: '0x0',
                gas: '0x5208', // 21000 gas
              },
            ],
          })

          document.getElementById('transaction-status').textContent =
            `Transaction sent: ${txHash.substring(0, 8)}...`
          document.getElementById('error-message').textContent = ''
        } catch (error) {
          // Proper error handling
          handleProviderError(error, 'eth_sendTransaction')
          document.getElementById('transaction-status').textContent = 'Transaction failed'
        }
      })

      // Switch chain button (without proper error handling)
      document.getElementById('switch-chain-button').addEventListener('click', async () => {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain', params: [{ chainId: '0x89' }], // Polygon
          })

          document.getElementById('status').textContent = 'Switched to Polygon'
        } catch (error) {
          // Incomplete error handling (intentionally bad implementation)
          if (error.code === 4902) {
            console.log('Chain not added yet')
            // Attempt to add the chain but without handling errors in this request
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x89',
                    chainName: 'Polygon',
                    rpcUrls: ['https://polygon-rpc.com'],
                  },
                ],
              })
            } catch (addError) {
              // This error is unhandled (intentionally)
              console.error('Failed to add chain:', addError)
            }
          } else {
            console.error('Chain switch error:', error)
            // Most errors unhandled here (intentionally)
          }
        }
      })

      // Sign message button (with proper error handling)
      document.getElementById('sign-button').addEventListener('click', async () => {
        try {
          const signature = await window.ethereum.request({
            method: 'personal_sign', params: ['Hello Web3!', window.ethereum.selectedAddress],
          })

          document.getElementById('transaction-status').textContent =
            `Message signed: ${signature.substring(0, 8)}...`
          document.getElementById('error-message').textContent = ''
        } catch (error) {
          // Proper error handling
          handleProviderError(error, 'personal_sign')
          document.getElementById('transaction-status').textContent = 'Signing failed'
        }
      })

      // Test control buttons
      document.getElementById('trigger-user-rejected').addEventListener('click', () => {
        window.triggerProviderError('USER_REJECTED')
      })

      document.getElementById('trigger-unauthorized').addEventListener('click', () => {
        window.triggerProviderError('UNAUTHORIZED')
      })

      document.getElementById('trigger-disconnected').addEventListener('click', () => {
        window.triggerProviderError('DISCONNECTED')
      })

      document.getElementById('trigger-resource-unavailable').addEventListener('click', () => {
        window.triggerProviderError('RESOURCE_UNAVAILABLE')
      })

      // Periodically check for unhandled errors and update UI
      setInterval(() => {
        const errorStatus = window.checkErrorHandling()
        document.getElementById('unhandled-errors').textContent =
          `Unhandled errors: ${errorStatus.unhandled}`

        if (errorStatus.unhandled > 0) {
          document.getElementById('unhandled-errors').style.color = 'red'
        }
      }, 1000)
    })
  })

  test('detects unhandled provider errors', async () => {
    // Test the buttons with error triggers

    // First, trigger USER_REJECTED error
    await page.locator('#trigger-user-rejected').click()

    // Try to connect (this has bad error handling)
    await page.locator('#connect-button').click()

    // Check that the error was unhandled
    await expect(page.locator('#unhandled-errors')).toContainText('Unhandled errors: 1', {
      timeout: 5000,
    })

    // Now try a transaction which has proper error handling
    await page.locator('#trigger-resource-unavailable').click()
    await page.locator('#send-tx-button').click()

    // Check that the error was handled properly
    await expect(page.locator('#handled-errors')).toContainText('Handled errors: 1', {
      timeout: 5000,
    })

    // Check if error message is displayed correctly
    await expect(page.locator('#error-message')).toContainText('Request already pending', {
      timeout: 5000,
    })

    // Finally, try chain switching which has incomplete error handling
    await page.locator('#trigger-disconnected').click()
    await page.locator('#switch-chain-button').click()

    // Check that another error was unhandled
    await expect(page.locator('#unhandled-errors')).toContainText('Unhandled errors: 2', {
      timeout: 5000,
    })

    // Take a screenshot for documentation
    await page.screenshot({ path: 'media/provider-errors-test.png' })

    console.log(
      'Provider errors test completed! Screenshot saved to media/provider-errors-test.png'
    )
  })

  test('validates error message display and UX impact', async () => {
    // Check how errors impact the user experience

    // First, get current status before any errors
    const initialStatus = await page.locator('#status').textContent()

    // Trigger an authorization error
    await page.locator('#trigger-unauthorized').click()
    await page.locator('#send-tx-button').click()

    // Wait for error to be displayed
    await expect(page.locator('#error-message')).toContainText('Not authorized', {
      timeout: 5000,
    })

    // Verify the transaction status was updated
    await expect(page.locator('#transaction-status')).toContainText('Transaction failed', {
      timeout: 5000,
    })

    // Check if the wallet connection status remains consistent
    const currentStatus = await page.locator('#status').textContent()
    expect(currentStatus).toBe(initialStatus)

    // Now simulate a disconnection error
    await page.locator('#trigger-disconnected').click()
    await page.locator('#sign-button').click()

    // Check that disconnect is properly reported to the user
    await expect(page.locator('#error-message')).toContainText('Wallet disconnected', {
      timeout: 5000,
    })

    await expect(page.locator('#status')).toContainText('Wallet disconnected', {
      timeout: 5000,
    })

    // Take a screenshot
    await page.screenshot({ path: 'media/provider-errors-ux-impact.png' })
  })
})
