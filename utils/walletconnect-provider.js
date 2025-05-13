/**
 * WalletConnect Provider
 *
 * A specialized provider implementation for WalletConnect that simulates
 * the WalletConnect JSON-RPC protocol, QR code session handling, and mobile linking behavior.
 * This is used by the WalletConnect adapter in wallet-adapter.ts.
 */

const { EventEmitter } = require('events');

class WalletConnectProvider extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = {
      projectId: options.projectId || 'mock-project-id',
      chains: options.chains || [1], // Default to Ethereum Mainnet
      showQrModal: options.showQrModal !== false,
      methods: options.methods || [
        'eth_sendTransaction',
        'eth_signTransaction',
        'eth_sign',
        'personal_sign',
        'eth_signTypedData',
      ],
      optionalMethods: options.optionalMethods || [],
      autoApprove: options.autoApprove !== false,
      mockAddress: options.mockAddress || '0x1234567890abcdef1234567890abcdef12345678',
      mockChainId: options.mockChainId || '0x1',
      delayMs: options.delayMs || 500,
    };

    this.connected = false;
    this.accounts = [];
    this.chainId = this.options.mockChainId;
    this.networkVersion = this.chainId === '0x1' ? '1' : '0';
    this.qrCodeUrl = null;
    this.sessionTopic = null;
    this.isWalletConnect = true;
    this.session = null;
    this.pairingUri = null;
  }

  /**
   * Initializes the WalletConnect session
   */
  async init() {
    // Simulate session initialization
    this.sessionTopic = `mock-session-${Date.now()}`;
    this.pairingUri = `wc:${this.sessionTopic}@2?relay-protocol=irn&symKey=mock-symkey`;
    this.qrCodeUrl = this.pairingUri;

    // Emit events to simulate QR code display
    this.emit('display_uri', this.pairingUri);

    return this;
  }

  /**
   * Handles the WalletConnect JSON-RPC requests
   */
  async request(args) {
    const { method, params = [] } = args;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, this.options.delayMs));

    console.log(`WalletConnect request: ${method}`, params);

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
        return '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';

      case 'eth_signTransaction':
        if (!this.options.autoApprove) {
          throw new Error('User rejected transaction signing');
        }

        // Generate mock signature
        return {
          r: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          s: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
          v: '0x1c',
          raw: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        };

      case 'personal_sign':
      case 'eth_sign':
      case 'eth_signTypedData':
      case 'eth_signTypedData_v4':
        if (!this.options.autoApprove) {
          throw new Error('User rejected signing request');
        }

        // Generate mock signature
        return '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef01';

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

      default:
        console.warn(`Unhandled WalletConnect method: ${method}`);
        throw new Error(`Method not supported: ${method}`);
    }
  }

  /**
   * Simulates a successful WalletConnect connection
   */
  async simulateConnection() {
    this.accounts = [this.options.mockAddress];
    this.connected = true;

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
   * Disconnects the WalletConnect session
   */
  async disconnect() {
    if (!this.connected) {
      return false;
    }

    this.connected = false;
    this.accounts = [];
    this.session = null;

    // Emit disconnect event
    this.emit('disconnect', { reason: 'User disconnected' });

    return true;
  }

  /**
   * Simulates displaying a QR code
   */
  async displayQRCode() {
    if (!this.pairingUri) {
      await this.init();
    }

    console.log('Displaying WalletConnect QR code with URI:', this.pairingUri);

    return this.pairingUri;
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
      sessionTopic: this.sessionTopic,
      qrCodeUrl: this.qrCodeUrl,
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
    this.sessionTopic = state.sessionTopic || null;
    this.qrCodeUrl = state.qrCodeUrl || null;

    return true;
  }
}

module.exports = WalletConnectProvider;
