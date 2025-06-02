/* global describe, it, expect, beforeEach, afterEach, jest */
// Cross-Wallet Connection Switching Test
const { test, expect } = require('@playwright/test');
const {
  setupMockEthereum,
  setupWalletState,
  saveWalletState,
  restoreWalletState,
} = require('./utils/wallet-snapshot');

/**
 * Helper function to setup a specific wallet provider
 * @param {Object} page - Playwright page object
 * @param {string} walletType - Wallet type: 'metamask', 'coinbase', 'walletconnect', etc.
 * @param {Object} options - Additional wallet configuration options
 */
async function setupWalletProvider(page, walletType, options = {}) {
  const address = options.address || '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
  const chainId = options.chainId || '0x1';

  await page.evaluate(
    ({ walletType, address, chainId }) => {
      // Reset existing provider if any
      if (window.ethereum) {
        delete window.ethereum;
      }

      // Create the basic provider object
      window.ethereum = {
        selectedAddress: address,
        chainId,
        networkVersion:
          chainId === '0x1' ? '1' : chainId === '0x5' ? '5' : chainId === '0x89' ? '137' : '0',
        _events: {},

        // Set wallet-specific properties
        isMetaMask: walletType === 'metamask',
        isCoinbaseWallet: walletType === 'coinbase',
        isWalletConnect: walletType === 'walletconnect',
        isPhantom: walletType === 'phantom',
        isRabby: walletType === 'rabby',

        // Implement standard request method
        request: async ({ method, params = [] }) => {
          console.log(`Mock ${walletType}: ${method} called with params:`, params);

          switch (method) {
            case 'eth_requestAccounts':
              window.ethereum.selectedAddress = address;
              return [address];

            case 'eth_chainId':
              return window.ethereum.chainId;

            case 'wallet_switchEthereumChain':
              const newChainId = params[0]?.chainId;
              if (newChainId) {
                window.ethereum.chainId = newChainId;
                window.ethereum.networkVersion =
                  newChainId === '0x1'
                    ? '1'
                    : newChainId === '0x5'
                      ? '5'
                      : newChainId === '0x89'
                        ? '137'
                        : '0';

                // Emit chainChanged event
                const callbacks = window.ethereum._events.chainChanged || [];
                callbacks.forEach(cb => cb(newChainId));
              }
              return null;

            case 'eth_sendTransaction':
              // Mock transaction hash
              return (
                '0x' +
                Array(64)
                  .fill(0)
                  .map(() => Math.floor(Math.random() * 16).toString(16))
                  .join('')
              );

            default:
              console.warn(`Unhandled method in ${walletType} mock: ${method}`);
              return null;
          }
        },

        // Standard event handler registration
        on: (eventName, callback) => {
          if (!window.ethereum._events[eventName]) {
            window.ethereum._events[eventName] = [];
          }
          window.ethereum._events[eventName].push(callback);
          return window.ethereum;
        },

        // Remove event listener
        removeListener: (eventName, callback) => {
          if (window.ethereum._events[eventName]) {
            window.ethereum._events[eventName] = window.ethereum._events[eventName].filter(
              cb => cb !== callback
            );
          }
          return window.ethereum;
        },
      };

      // Add wallet-specific methods
      if (walletType === 'walletconnect') {
        window.ethereum.disconnect = async () => {
          window.ethereum.selectedAddress = null;
          const callbacks = window.ethereum._events.disconnect || [];
          callbacks.forEach(cb => cb());
          return true;
        };
      }

      if (walletType === 'phantom') {
        // Add Solana-specific methods
        window.solana = {
          isPhantom: true,
          publicKey: { toBase58: () => 'SoLAb58Char32AddresS0FPhant0MWaLLe7' },
          connect: async () => ({ publicKey: window.solana.publicKey }),
          disconnect: async () => {},
        };
      }

      // Dispatch connection event
      window.dispatchEvent(new Event('ethereum#initialized'));

      return walletType;
    },
    { walletType, address, chainId }
  );

  return await page.evaluate(() => window.ethereum.selectedAddress);
}

test.describe('Cross-Wallet Connection Switching Tests', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();

    // Create a simple UI for wallet testing
    await page.setContent(`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            #wallet-info { display: none; padding: 10px; border: 1px solid #ccc; margin: 10px 0; }
            button { padding: 8px 16px; margin-right: 10px; }
          </style>
        </head>
        <body>
          <h1>Wallet Testing</h1>
          <button id="connect-button">Connect Wallet</button>
          <button id="switch-wallet-button">Switch Wallet</button>
          <button id="send-button">Send Transaction</button>
          
          <div id="wallet-info">
            <h3>Connected Wallet</h3>
            <p>Type: <span id="wallet-type">-</span></p>
            <p>Address: <span class="wallet-address">-</span></p>
            <p>Network: <span id="network-name">-</span></p>
          </div>
          
          <div id="tx-confirmation" style="display: none;">
            <h3>Transaction Sent</h3>
            <p>Hash: <span id="tx-hash">-</span></p>
          </div>
        </body>
      </html>
    `);

    // Add basic interaction handlers
    await page.evaluate(() => {
      document.getElementById('connect-button').addEventListener('click', async () => {
        if (window.ethereum && window.ethereum.request) {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            document.querySelector('.wallet-address').textContent = accounts[0];
            document.getElementById('wallet-info').style.display = 'block';

            // Update wallet type
            let walletType = 'Unknown';
            if (window.ethereum.isMetaMask) walletType = 'MetaMask';
            else if (window.ethereum.isCoinbaseWallet) walletType = 'Coinbase';
            else if (window.ethereum.isWalletConnect) walletType = 'WalletConnect';
            else if (window.ethereum.isPhantom) walletType = 'Phantom';
            else if (window.ethereum.isRabby) walletType = 'Rabby';

            document.getElementById('wallet-type').textContent = walletType;

            // Display network name
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            const networkNames = {
              '0x1': 'Ethereum Mainnet',
              '0x5': 'Goerli Testnet',
              '0x89': 'Polygon Mainnet',
            };
            document.getElementById('network-name').textContent =
              networkNames[chainId] || `Chain ID: ${chainId}`;
          } catch (err) {
            console.error('Error connecting wallet:', err);
          }
        }
      });

      document.getElementById('send-button').addEventListener('click', async () => {
        if (window.ethereum && window.ethereum.selectedAddress) {
          try {
            const txHash = await window.ethereum.request({
              method: 'eth_sendTransaction',
              params: [
                {
                  to: '0x0000000000000000000000000000000000000000',
                  from: window.ethereum.selectedAddress,
                  value: '0x0',
                },
              ],
            });

            document.getElementById('tx-hash').textContent = txHash;
            document.getElementById('tx-confirmation').style.display = 'block';
          } catch (err) {
            console.error('Error sending transaction:', err);
          }
        }
      });
    });
  });

  test('should switch between different wallet providers', async () => {
    // First connect with MetaMask
    await setupWalletProvider(page, 'metamask', {
      address: '0xMetamask1234567890abcdef1234567890abcdef',
      chainId: '0x1',
    });

    // Click connect button
    await page.locator('#connect-button').click();

    // Verify MetaMask connection
    await expect(page.locator('#wallet-type')).toHaveText('MetaMask');
    await expect(page.locator('.wallet-address')).toContainText('0xMetamask');

    // Save MetaMask wallet state
    const metamaskState = await saveWalletState(page, { walletType: 'metamask' });

    // Switch to Coinbase wallet
    await setupWalletProvider(page, 'coinbase', {
      address: '0xCoinbase1234567890abcdef1234567890abcdef',
      chainId: '0x1',
    });

    // Click connect button again
    await page.locator('#connect-button').click();

    // Verify Coinbase connection
    await expect(page.locator('#wallet-type')).toHaveText('Coinbase');
    await expect(page.locator('.wallet-address')).toContainText('0xCoinbase');

    // Save Coinbase wallet state
    const coinbaseState = await saveWalletState(page, { walletType: 'coinbase' });

    // Switch to WalletConnect
    await setupWalletProvider(page, 'walletconnect', {
      address: '0xWalletConnect1234567890abcdef1234567890abcdef',
      chainId: '0x89', // Connect on Polygon network
    });

    // Click connect button again
    await page.locator('#connect-button').click();

    // Verify WalletConnect connection and network
    await expect(page.locator('#wallet-type')).toHaveText('WalletConnect');
    await expect(page.locator('.wallet-address')).toContainText('0xWalletConnect');
    await expect(page.locator('#network-name')).toContainText('Polygon');

    // Save WalletConnect wallet state
    const walletConnectState = await saveWalletState(page, { walletType: 'walletconnect' });

    // Restore MetaMask state
    await restoreWalletState(page, metamaskState);

    // Verify restored to MetaMask
    await expect(page.locator('#wallet-type')).toHaveText('MetaMask');
    await expect(page.locator('.wallet-address')).toContainText('0xMetamask');

    // Restore WalletConnect state (directly switching from MetaMask to WalletConnect)
    await restoreWalletState(page, walletConnectState);

    // Verify restored to WalletConnect and correct network
    await expect(page.locator('#wallet-type')).toHaveText('WalletConnect');
    await expect(page.locator('.wallet-address')).toContainText('0xWalletConnect');
    await expect(page.locator('#network-name')).toContainText('Polygon');

    // Send a transaction with current wallet
    await page.locator('#send-button').click();

    // Verify transaction was sent
    await expect(page.locator('#tx-hash')).not.toBeEmpty();

    // Restore Coinbase wallet state
    await restoreWalletState(page, coinbaseState);

    // Verify restored to Coinbase
    await expect(page.locator('#wallet-type')).toHaveText('Coinbase');
    await expect(page.locator('.wallet-address')).toContainText('0xCoinbase');
  });
});
