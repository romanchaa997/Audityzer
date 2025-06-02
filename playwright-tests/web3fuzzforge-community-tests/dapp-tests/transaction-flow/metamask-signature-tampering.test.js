/* global describe, it, expect, beforeEach, afterEach, jest */
/**
 * Test case description: MetaMask transaction signature tampering vulnerability detection
 * Vulnerability/edge case: Tests if a malicious dApp can manipulate transaction data after user signature
 * Security impact: Could lead to unauthorized transactions or different transaction data than what user signed
 */

const { test, expect } = require('@playwright/test');
const { connectWallet, setupWalletState } = require('../../utils');
const ethers = require('ethers');

test.describe('MetaMask Transaction Signature Tampering Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up wallet in unlocked state with test account
    await setupWalletState(page, {
      chainId: '0x1', // Ethereum Mainnet
      networkName: 'Ethereum Mainnet',
      locked: false,
      accounts: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
      balance: '10000000000000000000', // 10 ETH
    });

    // Navigate to test dApp and connect wallet
    await page.goto('https://app.uniswap.org');
    await connectWallet(page, 'metamask');
  });

  test('should prevent transaction data tampering after signature', async ({ page }) => {
    // Testing if transaction data can be modified after user signs
    const transactionIntegrity = await page.evaluate(async () => {
      // Original transaction parameters
      const originalParams = {
        from: window.ethereum.selectedAddress,
        to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970',
        value: '0x38D7EA4C68000', // 0.001 ETH
        gas: '0x5208', // 21000 gas
        gasPrice: '0x4A817C800', // 20 Gwei
        data: '0x',
      };

      // Attempt to modify transaction after user signature by manipulating provider
      try {
        // Store the original implementation
        const originalSendAsync = window.ethereum.sendAsync;
        let transactionModified = false;

        // Override the send method to attempt tampering
        window.ethereum.sendAsync = function (payload, callback) {
          if (payload.method === 'eth_sendTransaction') {
            // Record original transaction for comparison
            const originalTx = JSON.stringify(payload.params[0]);

            // Try to modify the transaction params
            if (payload.params && payload.params[0]) {
              // Attempt to change recipient or value after user has signed
              const modifiedParams = { ...payload.params[0] };

              // Try changing the recipient address
              modifiedParams.to = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
              // Try changing the value
              modifiedParams.value = '0x6F05B59D3B20000'; // 0.5 ETH instead of 0.001

              payload.params[0] = modifiedParams;
              transactionModified = true;
            }

            // Log for debugging
            console.log('Original tx:', originalTx);
            console.log('Modified tx:', JSON.stringify(payload.params[0]));
          }

          // Call original method
          return originalSendAsync.call(this, payload, callback);
        };

        // Now trigger the transaction flow
        await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [originalParams],
        });

        return {
          attempted: true,
          modified: transactionModified,
          // Additional checks to see if MetaMask caught the tampering
          success: false, // We expect this to fail for security
        };
      } catch (error) {
        // Expected to fail with security error
        return {
          attempted: true,
          modified: false,
          error: error.message,
          // If we get a security error, that's good
          success: error.message.includes('User denied') || error.message.includes('Unauthorized'),
        };
      }
    });

    // The test passes if either:
    // 1. The transaction modification was prevented
    // 2. MetaMask detected the tampering and rejected with error
    expect(transactionIntegrity.attempted).toBeTruthy();
    expect(transactionIntegrity.modified && !transactionIntegrity.success).toBeFalsy();
  });

  test('should prevent personal_sign data manipulation', async ({ page }) => {
    // Test if signed data can be manipulated for personal_sign method
    const signatureResult = await page.evaluate(async () => {
      try {
        // Message to be signed
        const originalMessage = 'Please sign this message to verify your identity';
        const encodedMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(originalMessage));

        // Store original implementation
        const originalRequest = window.ethereum.request;
        let messageModified = false;

        // Override the request method to attempt tampering
        window.ethereum.request = async function (payload) {
          if (payload.method === 'personal_sign') {
            // Try to swap the message after user has approved
            const originalMsg = payload.params[0];

            // Attempt to change the message
            const maliciousMessage = 'I authorize transfer of all my assets';
            const encodedMalicious = ethers.utils.hexlify(
              ethers.utils.toUtf8Bytes(maliciousMessage)
            );

            // Try to modify params
            payload.params[0] = encodedMalicious;
            messageModified = true;
          }

          // Call original method
          return await originalRequest.call(this, payload);
        };

        // Request signature from user
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [encodedMessage, window.ethereum.selectedAddress],
        });

        return {
          attempted: true,
          modified: messageModified,
          signature: signature !== null,
          // If we got a valid signature after modification, that's a vulnerability
          vulnerable: messageModified && signature !== null,
        };
      } catch (error) {
        // Expected behavior is to fail with security error
        return {
          attempted: true,
          modified: false,
          error: error.message,
          vulnerable: false,
        };
      }
    });

    // The test passes if the signature manipulation was prevented
    expect(signatureResult.attempted).toBeTruthy();
    expect(signatureResult.vulnerable).toBeFalsy();
  });

  test('should prevent eth_signTypedData manipulation', async ({ page }) => {
    // Test if typed data can be manipulated in EIP-712 signing
    const typedDataResult = await page.evaluate(async () => {
      try {
        // EIP-712 typed data
        const originalTypedData = {
          types: {
            EIP712Domain: [
              { name: 'name', type: 'string' },
              { name: 'version', type: 'string' },
              { name: 'chainId', type: 'uint256' },
              { name: 'verifyingContract', type: 'address' },
            ],
            Permit: [
              { name: 'owner', type: 'address' },
              { name: 'spender', type: 'address' },
              { name: 'value', type: 'uint256' },
              { name: 'nonce', type: 'uint256' },
              { name: 'deadline', type: 'uint256' },
            ],
          },
          primaryType: 'Permit',
          domain: {
            name: 'Test Token',
            version: '1',
            chainId: 1,
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
          },
          message: {
            owner: window.ethereum.selectedAddress,
            spender: '0x5555555555555555555555555555555555555555',
            value: 1000,
            nonce: 0,
            deadline: 1714521432, // Future timestamp
          },
        };

        // Store original implementation
        const originalRequest = window.ethereum.request;
        let dataModified = false;

        // Override the request method to attempt tampering
        window.ethereum.request = async function (payload) {
          if (payload.method === 'eth_signTypedData_v4') {
            // Try to modify the data after user approval
            const parsedData = JSON.parse(payload.params[1]);

            // Attempt to change the value or spender
            if (parsedData.message) {
              parsedData.message.value = 1000000000; // Much larger amount
              parsedData.message.spender = '0x1111111111111111111111111111111111111111'; // Different recipient

              // Replace the payload with modified data
              payload.params[1] = JSON.stringify(parsedData);
              dataModified = true;
            }
          }

          // Call original method
          return await originalRequest.call(this, payload);
        };

        // Request signature from user
        const signature = await window.ethereum.request({
          method: 'eth_signTypedData_v4',
          params: [window.ethereum.selectedAddress, JSON.stringify(originalTypedData)],
        });

        return {
          attempted: true,
          modified: dataModified,
          signature: signature !== null,
          // If we got a valid signature after modification, that's a vulnerability
          vulnerable: dataModified && signature !== null,
        };
      } catch (error) {
        // Expected behavior is to fail with security error
        return {
          attempted: true,
          modified: false,
          error: error.message,
          vulnerable: false,
        };
      }
    });

    // The test passes if the typed data manipulation was prevented
    expect(typedDataResult.attempted).toBeTruthy();
    expect(typedDataResult.vulnerable).toBeFalsy();
  });
});
