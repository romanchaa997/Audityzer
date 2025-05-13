/**
 * MetaMask Wallet Simulator for dAppium
 * Simulates MetaMask wallet interactions on mobile devices
 */

class MetaMaskWalletSimulator {
  constructor(driver, networkConfig) {
    this.driver = driver;
    this.networkConfig = networkConfig;
    this.isInitialized = false;
    this.currentAccount = null;
  }

  /**
   * Open the MetaMask app and initialize if needed
   */
  async openWallet() {
    try {
      // Check if we need to initialize the wallet
      if (!this.isInitialized) {
        await this._initializeWallet();
      } else {
        // Just navigate to the main wallet view
        await this.driver.$('~wallet-tab').click();
      }
      return true;
    } catch (error) {
      console.error('Error opening MetaMask wallet:', error);
      throw error;
    }
  }

  /**
   * Initialize the wallet with a test account
   */
  async _initializeWallet() {
    try {
      // Import wallet flow
      await this.driver.$('~import-wallet-button').click();
      await this.driver.$('~i-agree-button').click();

      // Enter recovery phrase (for test wallet)
      const testSeedPhrase = 'test test test test test test test test test test test junk';

      // Handle seed phrase input
      const seedPhraseInput = await this.driver.$('~seed-phrase-input');
      await seedPhraseInput.setValue(testSeedPhrase);

      // Set password
      const password = 'Test@12345';
      const passwordInput = await this.driver.$('~password-input');
      await passwordInput.setValue(password);

      const confirmPasswordInput = await this.driver.$('~confirm-password-input');
      await confirmPasswordInput.setValue(password);

      // Complete setup
      await this.driver.$('~create-wallet-button').click();

      // Skip backup reminder
      await this.driver.$('~skip-backup-button').click();

      // Configure network
      await this._configureNetwork();

      this.isInitialized = true;
      this.currentAccount = await this._getCurrentAccount();

      return true;
    } catch (error) {
      console.error('Error initializing MetaMask wallet:', error);
      throw error;
    }
  }

  /**
   * Configure the network settings
   */
  async _configureNetwork() {
    try {
      // Go to settings
      await this.driver.$('~settings-button').click();

      // Go to networks
      await this.driver.$('~networks-settings-button').click();

      // Check if we need to add a custom network
      if (this.networkConfig.chainId !== 1) {
        await this.driver.$('~add-network-button').click();

        // Fill network details
        await this.driver
          .$('~network-name-input')
          .setValue(`Custom Network ${this.networkConfig.chainId}`);
        await this.driver.$('~rpc-url-input').setValue(this.networkConfig.rpcUrl);
        await this.driver.$('~chain-id-input').setValue(this.networkConfig.chainId.toString());
        await this.driver.$('~currency-symbol-input').setValue(this.networkConfig.symbol || 'ETH');

        // Save network
        await this.driver.$('~save-network-button').click();
      } else {
        // Select Ethereum Mainnet
        await this.driver.$('~ethereum-mainnet-network').click();
      }

      // Go back to main view
      await this.driver.$('~back-button').click();
      await this.driver.$('~back-button').click();

      return true;
    } catch (error) {
      console.error('Error configuring network:', error);
      throw error;
    }
  }

  /**
   * Get the current account address
   */
  async _getCurrentAccount() {
    const accountElement = await this.driver.$('~account-address');
    const accountAddress = await accountElement.getText();
    return accountAddress;
  }

  /**
   * Approve a connection request
   */
  async approveConnection() {
    try {
      // Wait for the connection request to appear
      await this.driver.$('~connect-request').waitForExist({ timeout: 10000 });

      // Click on the connect button
      await this.driver.$('~connect-button').click();

      // If multiple accounts, select the first one
      try {
        const selectAccountButton = await this.driver.$('~select-account-0');
        if (await selectAccountButton.isExisting()) {
          await selectAccountButton.click();
          await this.driver.$('~connect-accounts-button').click();
        }
      } catch (e) {
        // It's possible there's no account selection screen
        console.log('No account selection needed');
      }

      return true;
    } catch (error) {
      console.error('Error approving connection:', error);
      throw error;
    }
  }

  /**
   * Sign a transaction
   */
  async signTransaction(txParams) {
    try {
      // Wait for transaction request to appear
      await this.driver.$('~transaction-request').waitForExist({ timeout: 10000 });

      // Review transaction details if needed
      try {
        const reviewDetailsButton = await this.driver.$('~review-details-button');
        if (await reviewDetailsButton.isExisting()) {
          await reviewDetailsButton.click();
        }
      } catch (e) {
        console.log('No review details button found');
      }

      // Check gas settings and update if needed
      if (txParams && txParams.gasLimit) {
        await this._setGasSettings(txParams);
      }

      // Confirm the transaction
      await this.driver.$('~confirm-button').click();

      // Wait for confirmation
      await this.driver.pause(3000);

      return {
        success: true,
        hash:
          '0x' +
          Array(64)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join(''),
      };
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  }

  /**
   * Configure gas settings for a transaction
   */
  async _setGasSettings(txParams) {
    try {
      // Click on gas settings
      await this.driver.$('~gas-settings-button').click();

      // Set gas limit
      if (txParams.gasLimit) {
        const gasLimitInput = await this.driver.$('~gas-limit-input');
        await gasLimitInput.clearValue();
        await gasLimitInput.setValue(txParams.gasLimit.toString());
      }

      // Set gas price if provided
      if (txParams.gasPrice) {
        const gasPriceInput = await this.driver.$('~gas-price-input');
        await gasPriceInput.clearValue();
        await gasPriceInput.setValue(txParams.gasPrice.toString());
      }

      // Save gas settings
      await this.driver.$('~save-gas-settings-button').click();

      return true;
    } catch (error) {
      console.error('Error setting gas parameters:', error);
      throw error;
    }
  }

  /**
   * Sign a personal message
   */
  async signPersonalMessage(message) {
    try {
      // Wait for sign message request to appear
      await this.driver.$('~sign-message-request').waitForExist({ timeout: 10000 });

      // Verify message content if needed
      const messageElement = await this.driver.$('~message-content');
      const displayedMessage = await messageElement.getText();

      // Sign the message
      await this.driver.$('~sign-button').click();

      // Wait for confirmation
      await this.driver.pause(2000);

      return {
        success: true,
        signature:
          '0x' +
          Array(130)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join(''),
      };
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  }

  /**
   * Switch to a different network
   */
  async switchNetwork(networkId) {
    try {
      // Open network selector
      await this.driver.$('~network-dropdown').click();

      // Check if network already exists
      let networkExists = false;
      try {
        const networkSelector = await this.driver.$(`~network-${networkId}`);
        if (await networkSelector.isExisting()) {
          await networkSelector.click();
          networkExists = true;
        }
      } catch (e) {
        networkExists = false;
      }

      // If network doesn't exist, add it
      if (!networkExists) {
        // Close network dropdown
        await this.driver.$('~close-dropdown').click();

        // Configure the new network
        this.networkConfig.chainId = networkId;
        await this._configureNetwork();
      }

      return true;
    } catch (error) {
      console.error('Error switching network:', error);
      throw error;
    }
  }
}

module.exports = MetaMaskWalletSimulator;
