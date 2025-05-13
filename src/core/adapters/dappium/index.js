/**
 * dAppium - Mobile dApp testing framework for iOS and Android with wallet simulation capabilities
 * Extends Appium with Web3-specific capabilities for testing blockchain applications on mobile devices
 */

const { remote } = require('webdriverio');
const path = require('path');
const fs = require('fs');

class DAppium {
  constructor(config = {}) {
    this.config = {
      platform: 'ios', // 'ios' or 'android'
      device: 'iPhone 13',
      walletType: 'metamask', // 'metamask', 'trustwallet', 'coinbase'
      appPath: '',
      capabilities: {},
      networkConfig: {
        chainId: 1,
        rpcUrl: 'https://mainnet.infura.io/v3/your-api-key',
      },
      ...config,
    };

    this.driver = null;
    this.walletSimulator = null;
    this.isConnected = false;
  }

  /**
   * Initialize the dAppium driver with platform-specific capabilities
   */
  async initialize() {
    const caps = this._buildCapabilities();

    this.driver = await remote({
      path: '/wd/hub',
      port: 4723,
      capabilities: caps,
    });

    this.walletSimulator = this._initializeWalletSimulator();
    return this.driver;
  }

  /**
   * Build capabilities based on platform
   */
  _buildCapabilities() {
    const commonCaps = {
      'appium:newCommandTimeout': 240,
      'appium:noReset': false,
      'appium:fullReset': true,
    };

    if (this.config.platform === 'ios') {
      return {
        platformName: 'iOS',
        'appium:platformVersion': '15.0',
        'appium:deviceName': this.config.device,
        'appium:automationName': 'XCUITest',
        'appium:app': this.config.appPath,
        ...commonCaps,
        ...this.config.capabilities,
      };
    } else {
      return {
        platformName: 'Android',
        'appium:deviceName': this.config.device,
        'appium:automationName': 'UiAutomator2',
        'appium:app': this.config.appPath,
        ...commonCaps,
        ...this.config.capabilities,
      };
    }
  }

  /**
   * Initialize the appropriate wallet simulator
   */
  _initializeWalletSimulator() {
    const WalletSimulator = require(`./wallets/${this.config.walletType}`);
    return new WalletSimulator(this.driver, this.config.networkConfig);
  }

  /**
   * Connect to wallet and approve connection
   */
  async connectWallet() {
    await this.walletSimulator.openWallet();
    await this.walletSimulator.approveConnection();
    this.isConnected = true;
    return true;
  }

  /**
   * Sign a transaction with specific parameters
   */
  async signTransaction(txParams) {
    if (!this.isConnected) {
      throw new Error('Wallet not connected. Call connectWallet() first');
    }

    return await this.walletSimulator.signTransaction(txParams);
  }

  /**
   * Sign a personal message
   */
  async signPersonalMessage(message) {
    if (!this.isConnected) {
      throw new Error('Wallet not connected. Call connectWallet() first');
    }

    return await this.walletSimulator.signPersonalMessage(message);
  }

  /**
   * Switch to a different network
   */
  async switchNetwork(networkId) {
    return await this.walletSimulator.switchNetwork(networkId);
  }

  /**
   * Take a screenshot and save it to the specified path
   */
  async takeScreenshot(filepath) {
    const screenshot = await this.driver.takeScreenshot();
    const screenshotPath = filepath || path.join(process.cwd(), 'screenshots', `${Date.now()}.png`);

    // Ensure directory exists
    const dir = path.dirname(screenshotPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(screenshotPath, Buffer.from(screenshot, 'base64'));
    return screenshotPath;
  }

  /**
   * Close the session and cleanup resources
   */
  async close() {
    if (this.driver) {
      await this.driver.deleteSession();
      this.driver = null;
      this.isConnected = false;
    }
  }
}

module.exports = DAppium;
