/**
 * Coinbase Wallet Provider
 *
 * A specialized provider implementation for Coinbase Wallet that simulates
 * the Coinbase Wallet JSON-RPC protocol, mobile linking behavior, and UI integration.
 * This is used by the CoinbaseWalletAdapter in wallet-adapter.ts.
 */

const { EventEmitter } = require('events');

class CoinbaseWalletProvider extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = {
      appName: options.appName || 'Audityzer Test App',
      appLogoUrl: options.appLogoUrl || 'https://www.coinbase.com/assets/favicon-32x32.png',
      darkMode: options.darkMode || false,
      overrideIsMetaMask: options.overrideIsMetaMask || false,
      overrideIsCoinbaseWallet: options.overrideIsCoinbaseWallet !== false,
      autoApprove: options.autoApprove !== false,
      mockAddress: options.mockAddress || '0x1234567890abcdef1234567890abcdef12345678',
      mockChainId: options.mockChainId || '0x1',
      delayMs: options.delayMs || 500,
    };

    this.connected = false;
    this.accounts = [];
    this.chainId = this.options.mockChainId;
    this.networkVersion = this.chainId === '0x1' ? '1' : '0';
    this.isCoinbaseWallet = true;
    this.isMetaMask = this.options.overrideIsMetaMask;
    this.selectedAddress = null;
    this.mobileLoginUri = null;
    this.desktopLoginUri = null;
  }

  /**
   * Initializes the Coinbase Wallet connection
   */
  async init() {
    // Generate mock mobile/desktop login URIs
    this.mobileLoginUri = `coinbasewallet://dapps?link=${encodeURIComponent('https://example.com')}&cbwsource=${encodeURIComponent(this.options.appName)}`;
    this.desktopLoginUri = `https://www.coinbase.com/connect?uri=${encodeURIComponent('https://example.com')}&source=${encodeURIComponent(this.options.appName)}`;

    // Emit initialization event
    this.emit('coinbase_initialized', {
      mobileLoginUri: this.mobileLoginUri,
      desktopLoginUri: this.desktopLoginUri,
    });

    return this;
  }

  /**
   * Handles the Coinbase Wallet JSON-RPC requests
   */
  async request(args) {
    const { method, params = [] } = args;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, this.options.delayMs));

    console.log(`Coinbase Wallet request: ${method}`, params);

    switch (method) {
      case 'eth_requestAccounts':
      case 'eth_accounts':
        if (!this.connected) {
          if (this.options.autoApprove) {
            await this.simulateConnection();
          } else {
            throw new Error('User rejected connection request');
          }
        }
        return this.accounts;

      case 'eth_chainId':
        return this.chainId;

      case 'net_version':
        return this.networkVersion;

      case 'eth_sendTransaction':
        if (!this.options.autoApprove) {
          throw new Error('User rejected transaction');
        }

        // Generate mock transaction hash
        return '0xcbdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';

      case 'eth_signTransaction':
        if (!this.options.autoApprove) {
          throw new Error('User rejected transaction signing');
        }

        // Generate mock signature
        return {
          r: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          s: '0xcbdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
          v: '0x1c',
          raw: '0xcbdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        };

      case 'personal_sign':
      case 'eth_sign':
      case 'eth_signTypedData':
      case 'eth_signTypedData_v4':
        if (!this.options.autoApprove) {
          throw new Error('User rejected signing request');
        }

        // Generate mock signature
        return '0xcbdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef01';

      case 'wallet_switchEthereumChain':
        if (!this.options.autoApprove) {
          throw new Error('User rejected chain switch request');
        }

        const newChainId = params[0]?.chainId;
        if (newChainId) {
          await this.updateChainId(newChainId);
        }
        return null;

      case 'wallet_addEthereumChain':
        if (!this.options.autoApprove) {
          throw new Error('User rejected add chain request');
        }

        const chainToAdd = params[0];
        if (chainToAdd?.chainId) {
          await this.updateChainId(chainToAdd.chainId);
        }
        return null;

      case 'wallet_watchAsset':
        if (!this.options.autoApprove) {
          throw new Error('User rejected watch asset request');
        }

        // Always return success
        return true;

      // Coinbase Wallet specific methods
      case 'eth_coinbaseWalletRequestAccounts':
        if (!this.options.autoApprove) {
          throw new Error('User rejected connection request');
        }

        await this.simulateConnection();
        return this.accounts;

      case 'coinbase_setAppInfo':
        // Return success - this is just configuration
        return true;

      default:
        console.warn(`Unhandled Coinbase Wallet method: ${method}`);
        throw new Error(`Method not supported: ${method}`);
    }
  }

  /**
   * Simulates a successful Coinbase Wallet connection
   */
  async simulateConnection() {
    this.accounts = [this.options.mockAddress];
    this.connected = true;
    this.selectedAddress = this.options.mockAddress;

    // Emit connection events
    this.emit('connect', { chainId: this.chainId });
    this.emit('accountsChanged', this.accounts);

    return true;
  }

  /**
   * Updates chain ID and emits relevant events
   */
  async updateChainId(newChainId) {
    this.chainId = newChainId;
    this.networkVersion = parseInt(newChainId, 16).toString();

    // Emit chain changed event
    this.emit('chainChanged', newChainId);

    return true;
  }

  /**
   * Disconnects the Coinbase Wallet session
   */
  async disconnect() {
    if (!this.connected) {
      return false;
    }

    this.connected = false;
    this.accounts = [];
    this.selectedAddress = null;

    // Emit disconnect event
    this.emit('disconnect', { reason: 'User disconnected' });
    this.emit('accountsChanged', []);

    return true;
  }

  /**
   * Simulates the mobile linking behavior
   */
  async openMobileLink() {
    if (!this.mobileLoginUri) {
      await this.init();
    }

    console.log('Opening Coinbase Wallet mobile link:', this.mobileLoginUri);

    // In a real scenario, this would open the URI in a mobile device
    // For testing, we'll simulate a successful connection after a delay
    if (this.options.autoApprove) {
      setTimeout(() => this.simulateConnection(), this.options.delayMs * 2);
    }

    return this.mobileLoginUri;
  }

  /**
   * Simulates opening the QR code for desktop wallets
   */
  async displayQRCode() {
    if (!this.desktopLoginUri) {
      await this.init();
    }

    console.log('Displaying Coinbase Wallet QR code with URI:', this.desktopLoginUri);

    // Emit QR code display event
    this.emit('display_uri', this.desktopLoginUri);

    return this.desktopLoginUri;
  }

  /**
   * Captures the current provider state for testing
   */
  captureState() {
    return {
      connected: this.connected,
      accounts: [...this.accounts],
      chainId: this.chainId,
      networkVersion: this.networkVersion,
      selectedAddress: this.selectedAddress,
      mobileLoginUri: this.mobileLoginUri,
      desktopLoginUri: this.desktopLoginUri,
    };
  }

  /**
   * Restores a previously captured provider state
   */
  restoreState(state) {
    if (!state) return false;

    this.connected = state.connected || false;
    this.accounts = state.accounts || [];
    this.chainId = state.chainId || this.options.mockChainId;
    this.networkVersion = state.networkVersion || this.networkVersion;
    this.selectedAddress = state.selectedAddress || null;
    this.mobileLoginUri = state.mobileLoginUri || null;
    this.desktopLoginUri = state.desktopLoginUri || null;

    return true;
  }

  /**
   * Implement standard provider methods and properties
   */
  isConnected() {
    return this.connected;
  }

  /**
   * Legacy provider method support
   */
  enable() {
    return this.request({ method: 'eth_requestAccounts' });
  }

  /**
   * Legacy send method support
   */
  send(method, params) {
    if (typeof method === 'string') {
      return this.request({ method, params });
    } else {
      return this.request(method);
    }
  }

  /**
   * Legacy sendAsync method support
   */
  sendAsync(payload, callback) {
    this.request(payload)
      .then(result => callback(null, { id: payload.id, jsonrpc: '2.0', result }))
      .catch(error => callback(error, null));
  }
}

module.exports = CoinbaseWalletProvider;
