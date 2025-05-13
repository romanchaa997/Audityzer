/**
 * dAppRecorder - Browser extension for recording and replaying Web3 application interactions
 * Captures wallet connections, transactions, and message signing for automated testing
 */

const fs = require('fs');
const path = require('path');
const ethers = require('ethers');

class DAppRecorder {
  constructor(config = {}) {
    this.config = {
      recordingsDir: path.join(process.cwd(), 'recordings'),
      browserType: 'chrome', // 'chrome', 'firefox', 'edge'
      walletType: 'metamask', // 'metamask', 'coinbase', 'walletconnect'
      autoReplay: false,
      networkConfig: {
        chainId: 1,
        rpcUrl: 'http://localhost:8545',
      },
      captureScreenshots: true,
      screenshotsDir: path.join(process.cwd(), 'screenshots'),
      ...config,
    };

    this.recordings = {};
    this.currentRecording = null;
    this.isRecording = false;
    this.isReplaying = false;
    this.browser = null;
    this.page = null;
    this.events = [];
    this.walletConnected = false;
    this.accounts = [];
  }

  /**
   * Initialize the dAppRecorder
   */
  async initialize() {
    try {
      // Create directories if they don't exist
      if (!fs.existsSync(this.config.recordingsDir)) {
        fs.mkdirSync(this.config.recordingsDir, { recursive: true });
      }

      if (this.config.captureScreenshots && !fs.existsSync(this.config.screenshotsDir)) {
        fs.mkdirSync(this.config.screenshotsDir, { recursive: true });
      }

      // Load existing recordings
      await this._loadRecordings();

      return {
        recordings: Object.keys(this.recordings),
        isInitialized: true,
      };
    } catch (error) {
      console.error('Failed to initialize dAppRecorder:', error);
      throw error;
    }
  }

  /**
   * Load existing recordings from the recordings directory
   */
  async _loadRecordings() {
    try {
      const files = fs
        .readdirSync(this.config.recordingsDir)
        .filter(file => file.endsWith('.json'));

      for (const file of files) {
        const filePath = path.join(this.config.recordingsDir, file);
        const recording = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const recordingName = path.basename(file, '.json');

        this.recordings[recordingName] = {
          ...recording,
          path: filePath,
        };
      }

      console.log(`Loaded ${Object.keys(this.recordings).length} recordings`);
      return this.recordings;
    } catch (error) {
      console.error('Failed to load recordings:', error);
      return {};
    }
  }

  /**
   * Start recording a new session
   */
  async startRecording(url, name) {
    if (this.isRecording) {
      throw new Error('Already recording');
    }

    if (this.isReplaying) {
      throw new Error('Cannot start recording while replaying');
    }

    // Generate a unique name if not provided
    if (!name) {
      name = `recording_${Date.now()}`;
    }

    console.log(`Starting recording: ${name} at ${url}`);

    // Initialize browser for recording
    await this._initializeBrowser();

    // Create recording object
    this.currentRecording = {
      name,
      url,
      events: [],
      startTime: Date.now(),
      walletType: this.config.walletType,
      browserType: this.config.browserType,
      network: {
        chainId: this.config.networkConfig.chainId,
        name: this._getNetworkName(this.config.networkConfig.chainId),
      },
    };

    this.isRecording = true;
    this.events = [];

    // Navigate to the URL
    await this.page.goto(url, { waitUntil: 'networkidle0' });

    // Inject the recording script
    await this._injectRecordingScript();

    // Take initial screenshot
    if (this.config.captureScreenshots) {
      await this._captureScreenshot(`${name}_start`);
    }

    return {
      name,
      url,
      startTime: new Date(this.currentRecording.startTime).toISOString(),
    };
  }

  /**
   * Stop the current recording session
   */
  async stopRecording() {
    if (!this.isRecording) {
      throw new Error('Not recording');
    }

    // Take final screenshot
    if (this.config.captureScreenshots) {
      await this._captureScreenshot(`${this.currentRecording.name}_end`);
    }

    // Update recording with events
    this.currentRecording.events = this.events;
    this.currentRecording.endTime = Date.now();
    this.currentRecording.duration =
      (this.currentRecording.endTime - this.currentRecording.startTime) / 1000;
    this.currentRecording.eventsCount = this.events.length;

    // Save recording to file
    const filePath = path.join(this.config.recordingsDir, `${this.currentRecording.name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(this.currentRecording, null, 2));

    // Add to recordings list
    this.recordings[this.currentRecording.name] = {
      ...this.currentRecording,
      path: filePath,
    };

    console.log(`Recording stopped: ${this.currentRecording.name}`);
    console.log(
      `Recorded ${this.events.length} events in ${this.currentRecording.duration} seconds`
    );

    // Clean up
    const recordingResult = { ...this.currentRecording };
    this.isRecording = false;

    // Close browser
    await this._closeBrowser();

    return recordingResult;
  }

  /**
   * Replay a recorded session
   */
  async replayRecording(recordingName) {
    if (this.isRecording) {
      throw new Error('Cannot replay while recording');
    }

    if (this.isReplaying) {
      throw new Error('Already replaying');
    }

    const recording = this.recordings[recordingName];
    if (!recording) {
      throw new Error(`Recording '${recordingName}' not found`);
    }

    console.log(`Replaying: ${recordingName}`);

    // Initialize browser for replaying
    await this._initializeBrowser();

    this.isReplaying = true;

    // Navigate to the URL
    await this.page.goto(recording.url, { waitUntil: 'networkidle0' });

    // Connect wallet first if needed
    const connectEvent = recording.events.find(e => e.type === 'wallet_connect');
    if (connectEvent) {
      await this._replayWalletConnect(connectEvent);
    }

    // Take initial screenshot
    if (this.config.captureScreenshots) {
      await this._captureScreenshot(`replay_${recordingName}_start`);
    }

    // Replay each event
    let eventIndex = 0;
    for (const event of recording.events) {
      // Skip connect event we already handled
      if (event.type === 'wallet_connect' && event === connectEvent) {
        continue;
      }

      console.log(`Replaying event ${eventIndex + 1}/${recording.events.length}: ${event.type}`);

      try {
        await this._replayEvent(event);

        // Take screenshot after each significant event
        if (
          this.config.captureScreenshots &&
          ['transaction_submit', 'message_sign', 'wallet_connect', 'contract_interaction'].includes(
            event.type
          )
        ) {
          await this._captureScreenshot(`replay_${recordingName}_event_${eventIndex}`);
        }
      } catch (error) {
        console.error(`Failed to replay event ${eventIndex + 1}:`, error);
      }

      eventIndex++;
    }

    // Take final screenshot
    if (this.config.captureScreenshots) {
      await this._captureScreenshot(`replay_${recordingName}_end`);
    }

    console.log(`Finished replaying: ${recordingName}`);

    // Clean up
    this.isReplaying = false;

    // Close browser
    await this._closeBrowser();

    return {
      name: recordingName,
      eventsCount: recording.events.length,
      success: true,
    };
  }

  /**
   * Initialize browser for recording or replaying
   */
  async _initializeBrowser() {
    try {
      // Import puppeteer dynamically to avoid dependency issues
      const puppeteer = require('puppeteer');

      // Launch browser
      this.browser = await puppeteer.launch({
        headless: false,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process',
          `--load-extension=${this._getWalletExtensionPath()}`,
        ],
      });

      // Create a new page
      this.page = await this.browser.newPage();

      // Set viewport
      await this.page.setViewport({ width: 1366, height: 768 });

      // Set up event listeners for recording
      await this._setupEventListeners();

      return true;
    } catch (error) {
      console.error('Failed to initialize browser:', error);
      throw error;
    }
  }

  /**
   * Close browser
   */
  async _closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  /**
   * Get wallet extension path based on configuration
   */
  _getWalletExtensionPath() {
    // In a real implementation, this would return the path to the wallet extension
    // For demonstration, we just log a message
    console.log(`Would load ${this.config.walletType} extension for ${this.config.browserType}`);

    // This would typically be a path to the extension directory
    return path.join(process.cwd(), 'extensions', this.config.walletType);
  }

  /**
   * Set up event listeners for recording
   */
  async _setupEventListeners() {
    // In a real implementation, this would inject JavaScript into the page
    // to listen for Web3-related events like wallet connections, transactions, etc.

    // This is a simplified version that just logs a message
    console.log('Setting up event listeners for recording');
  }

  /**
   * Inject the recording script into the page
   */
  async _injectRecordingScript() {
    // In a real implementation, this would inject a script to intercept
    // Web3 provider requests and responses for recording

    await this.page.evaluate(() => {
      // This function runs in the browser context
      console.log('dAppRecorder: Recording script injected');

      // Create a global object to store the original provider
      window.__dAppRecorder = {
        originalProvider: window.ethereum,
        events: [],
      };

      // Create a proxy to intercept provider requests
      const providerProxy = new Proxy(window.ethereum, {
        get(target, prop, receiver) {
          const originalValue = Reflect.get(target, prop, receiver);

          // Intercept request method
          if (prop === 'request') {
            return async function (args) {
              // Record the request
              const event = {
                type: 'provider_request',
                method: args.method,
                params: args.params,
                timestamp: Date.now(),
              };

              window.__dAppRecorder.events.push(event);
              console.log('dAppRecorder:', event);

              // Call the original method
              try {
                const result = await originalValue.apply(target, [args]);

                // Record the response
                window.__dAppRecorder.events.push({
                  type: 'provider_response',
                  method: args.method,
                  result,
                  timestamp: Date.now(),
                });

                return result;
              } catch (error) {
                // Record the error
                window.__dAppRecorder.events.push({
                  type: 'provider_error',
                  method: args.method,
                  error: error.message,
                  timestamp: Date.now(),
                });

                throw error;
              }
            };
          }

          // Return the original value for other properties
          return originalValue;
        },
      });

      // Replace the provider with our proxy
      window.ethereum = providerProxy;

      // Add a function to get recorded events
      window.__dAppRecorder.getEvents = function () {
        return window.__dAppRecorder.events;
      };
    });
  }

  /**
   * Record a Web3 event
   */
  async _recordEvent(event) {
    if (!this.isRecording) {
      return;
    }

    // Add timestamp if not present
    if (!event.timestamp) {
      event.timestamp = Date.now();
    }

    // Add to events list
    this.events.push(event);

    console.log(`Recorded event: ${event.type}`);
  }

  /**
   * Replay a recorded event
   */
  async _replayEvent(event) {
    switch (event.type) {
      case 'wallet_connect':
        return await this._replayWalletConnect(event);

      case 'transaction_submit':
        return await this._replayTransaction(event);

      case 'message_sign':
        return await this._replayMessageSign(event);

      case 'contract_interaction':
        return await this._replayContractInteraction(event);

      case 'ui_interaction':
        return await this._replayUIInteraction(event);

      default:
        console.log(`Skipping unknown event type: ${event.type}`);
    }
  }

  /**
   * Replay wallet connection event
   */
  async _replayWalletConnect(event) {
    console.log('Replaying wallet connection');

    // In a real implementation, this would interact with the wallet extension
    // to simulate the connection process

    // For demonstration, we simulate a wallet connection
    await this.page.evaluate(() => {
      // This function runs in the browser context
      window.ethereum = window.ethereum || {};

      // Simulate the wallet connection
      window.ethereum.isConnected = () => true;
      window.ethereum.selectedAddress = '0x0000000000000000000000000000000000000000';
      window.ethereum.chainId = '0x1';

      // Dispatch events to notify the dApp
      window.dispatchEvent(new Event('ethereum#initialized'));
      window.ethereum.emit('connect', { chainId: '0x1' });
      window.ethereum.emit('accountsChanged', ['0x0000000000000000000000000000000000000000']);
      window.ethereum.emit('chainChanged', '0x1');
    });

    // Mark wallet as connected
    this.walletConnected = true;

    return true;
  }

  /**
   * Replay transaction event
   */
  async _replayTransaction(event) {
    console.log('Replaying transaction submission');

    // In a real implementation, this would interact with the wallet extension
    // to simulate transaction signing and submission

    // For demonstration, we simulate a transaction response
    await this.page.evaluate(txHash => {
      // Simulate a transaction response
      window.__dAppRecorder = window.__dAppRecorder || {};
      window.__dAppRecorder.lastTxHash = txHash;

      // If there's a pending transaction promise, resolve it
      if (window.__dAppRecorder.pendingTxPromise) {
        window.__dAppRecorder.pendingTxResolve(txHash);
      }
    }, event.hash || '0x0000000000000000000000000000000000000000000000000000000000000000');

    return true;
  }

  /**
   * Replay message signing event
   */
  async _replayMessageSign(event) {
    console.log('Replaying message signing');

    // In a real implementation, this would interact with the wallet extension
    // to simulate message signing

    // For demonstration, we simulate a signature response
    await this.page.evaluate(signature => {
      // Simulate a signature response
      window.__dAppRecorder = window.__dAppRecorder || {};
      window.__dAppRecorder.lastSignature = signature;

      // If there's a pending signature promise, resolve it
      if (window.__dAppRecorder.pendingSignPromise) {
        window.__dAppRecorder.pendingSignResolve(signature);
      }
    }, event.signature || '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000');

    return true;
  }

  /**
   * Replay contract interaction event
   */
  async _replayContractInteraction(event) {
    console.log('Replaying contract interaction');

    // In a real implementation, this would simulate the contract interaction
    // For demonstration, we just log the event
    console.log(
      `Would call contract ${event.contract} method ${event.method} with args:`,
      event.args
    );

    return true;
  }

  /**
   * Replay UI interaction event
   */
  async _replayUIInteraction(event) {
    console.log('Replaying UI interaction');

    // Handle different types of UI interactions
    switch (event.action) {
      case 'click':
        if (event.selector) {
          await this.page.waitForSelector(event.selector);
          await this.page.click(event.selector);
        }
        break;

      case 'input':
        if (event.selector && event.value) {
          await this.page.waitForSelector(event.selector);
          await this.page.type(event.selector, event.value);
        }
        break;

      case 'select':
        if (event.selector && event.value) {
          await this.page.waitForSelector(event.selector);
          await this.page.select(event.selector, event.value);
        }
        break;

      case 'wait':
        if (event.duration) {
          await this.page.waitForTimeout(event.duration);
        }
        break;

      default:
        console.log(`Unknown UI action: ${event.action}`);
    }

    return true;
  }

  /**
   * Capture a screenshot
   */
  async _captureScreenshot(name) {
    if (!this.config.captureScreenshots || !this.page) {
      return null;
    }

    try {
      const screenshotPath = path.join(this.config.screenshotsDir, `${name}.png`);
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved: ${screenshotPath}`);
      return screenshotPath;
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
      return null;
    }
  }

  /**
   * Get network name from chain ID
   */
  _getNetworkName(chainId) {
    const networks = {
      1: 'Ethereum Mainnet',
      3: 'Ropsten Testnet',
      4: 'Rinkeby Testnet',
      5: 'Goerli Testnet',
      42: 'Kovan Testnet',
      56: 'Binance Smart Chain',
      137: 'Polygon',
      42161: 'Arbitrum',
      10: 'Optimism',
      250: 'Fantom',
      43114: 'Avalanche',
      1337: 'Local Testnet',
    };

    return networks[chainId] || `Chain ${chainId}`;
  }

  /**
   * Get all recordings
   */
  getRecordings() {
    return this.recordings;
  }

  /**
   * Delete a recording
   */
  deleteRecording(name) {
    if (!this.recordings[name]) {
      throw new Error(`Recording '${name}' not found`);
    }

    const filePath = this.recordings[name].path;
    fs.unlinkSync(filePath);

    delete this.recordings[name];
    console.log(`Deleted recording: ${name}`);

    return Object.keys(this.recordings);
  }

  /**
   * Export a recording to a file
   */
  exportRecording(name, outputPath) {
    if (!this.recordings[name]) {
      throw new Error(`Recording '${name}' not found`);
    }

    const filePath = this.recordings[name].path;
    const content = fs.readFileSync(filePath, 'utf8');

    fs.writeFileSync(outputPath, content);
    console.log(`Exported recording to ${outputPath}`);

    return {
      name,
      exportPath: outputPath,
    };
  }

  /**
   * Import a recording from a file
   */
  importRecording(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const recording = JSON.parse(content);

    if (!recording.name) {
      throw new Error('Invalid recording: missing name');
    }

    const newFilePath = path.join(this.config.recordingsDir, `${recording.name}.json`);
    fs.writeFileSync(newFilePath, content);

    this.recordings[recording.name] = {
      ...recording,
      path: newFilePath,
    };

    console.log(`Imported recording: ${recording.name}`);

    return {
      name: recording.name,
      importPath: filePath,
      savePath: newFilePath,
    };
  }
}

module.exports = DAppRecorder;
