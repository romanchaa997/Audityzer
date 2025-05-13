/**
 * MessageTracer - Visual debugging tool for tracking cross-chain message propagation
 * Monitors and visualizes message flow across blockchain networks
 */

const ethers = require('ethers');
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const http = require('http');
const WebSocket = require('ws');
const express = require('express');

// Supported bridge protocols
const SUPPORTED_PROTOCOLS = {
  LAYERZERO: 'layerzero',
  CCIP: 'ccip',
  HYPERLANE: 'hyperlane',
  AXELAR: 'axelar',
  WORMHOLE: 'wormhole',
  CUSTOM: 'custom',
};

class MessageTracer {
  constructor(config = {}) {
    this.config = {
      networks: {},
      bridges: [],
      tracingEnabled: true,
      visualizerPort: 3500,
      outputDir: path.join(process.cwd(), 'reports', 'message-traces'),
      maxMessagesToTrace: 100,
      refreshInterval: 2000,
      ...config,
    };

    this.providers = {};
    this.messages = [];
    this.activeTraces = {};
    this.bridgeAdapters = {};
    this.server = null;
    this.wss = null;
    this.app = null;
    this.isServerRunning = false;
    this.connections = [];
  }

  /**
   * Initialize the message tracer
   */
  async initialize() {
    // Setup network providers
    for (const [networkName, networkConfig] of Object.entries(this.config.networks)) {
      try {
        this.providers[networkName] = new ethers.providers.JsonRpcProvider(networkConfig.rpcUrl);
        console.log(`Connected to ${networkName} at ${networkConfig.rpcUrl}`);
      } catch (error) {
        console.error(`Failed to connect to ${networkName}:`, error);
      }
    }

    // Initialize bridge protocol adapters
    for (const bridge of this.config.bridges) {
      this.bridgeAdapters[bridge.id] = this._createBridgeAdapter(bridge);
    }

    // Create output directory if it doesn't exist
    if (!fs.existsSync(this.config.outputDir)) {
      fs.mkdirSync(this.config.outputDir, { recursive: true });
    }

    return {
      providers: this.providers,
      bridgeAdapters: Object.keys(this.bridgeAdapters),
    };
  }

  /**
   * Start tracing messages across chains
   */
  async startTracing() {
    if (!this.config.tracingEnabled) {
      console.log('Message tracing is disabled in configuration');
      return false;
    }

    console.log('Starting cross-chain message tracing...');

    // Start listening for bridge events
    for (const [bridgeId, adapter] of Object.entries(this.bridgeAdapters)) {
      try {
        await adapter.startListening();
        console.log(`Listening for ${bridgeId} bridge events`);
      } catch (error) {
        console.error(`Failed to start listening for ${bridgeId} bridge events:`, error);
      }
    }

    // Start the visualization server if not already running
    if (!this.isServerRunning) {
      await this._startVisualizationServer();
    }

    // Set up regular message processing
    this._scheduleMessageProcessing();

    return true;
  }

  /**
   * Stop tracing messages
   */
  async stopTracing() {
    console.log('Stopping cross-chain message tracing...');

    // Stop all bridge adapters
    for (const [bridgeId, adapter] of Object.entries(this.bridgeAdapters)) {
      try {
        await adapter.stopListening();
        console.log(`Stopped listening for ${bridgeId} bridge events`);
      } catch (error) {
        console.error(`Failed to stop listening for ${bridgeId} bridge events:`, error);
      }
    }

    // Stop the visualization server
    if (this.server) {
      this.server.close();
      this.wss.close();
      this.isServerRunning = false;
      console.log('Visualization server stopped');
    }

    return true;
  }

  /**
   * Trace a specific message by ID
   */
  async traceMessage(messageId, sourceNetwork, targetNetwork, protocol) {
    const adapter = this._getBridgeAdapterForProtocol(protocol);
    if (!adapter) {
      throw new Error(`No adapter found for protocol: ${protocol}`);
    }

    console.log(
      `Tracing message ${messageId} from ${sourceNetwork} to ${targetNetwork} via ${protocol}`
    );

    // Create a trace object
    const trace = {
      id: messageId,
      protocol,
      sourceNetwork,
      targetNetwork,
      status: 'pending',
      events: [],
      startTime: Date.now(),
      endTime: null,
      lastUpdate: Date.now(),
    };

    this.activeTraces[messageId] = trace;

    // Start specific tracing via the adapter
    await adapter.traceMessage(messageId, sourceNetwork, targetNetwork, event => {
      this._processTraceEvent(messageId, event);
    });

    return trace;
  }

  /**
   * Process a traced message event
   */
  _processTraceEvent(messageId, event) {
    const trace = this.activeTraces[messageId];
    if (!trace) {
      console.error(`No active trace found for message ID: ${messageId}`);
      return;
    }

    // Add event to the trace
    trace.events.push({
      ...event,
      timestamp: Date.now(),
    });

    trace.lastUpdate = Date.now();

    // Update status if provided
    if (event.status) {
      trace.status = event.status;

      // Check if this is a completion event
      if (event.status === 'completed' || event.status === 'failed') {
        trace.endTime = Date.now();

        // Generate a visualization for the completed trace
        this._generateVisualization(messageId);

        // Add to messages history
        this.messages.push({ ...trace });

        // Keep message history within limits
        if (this.messages.length > this.config.maxMessagesToTrace) {
          this.messages.shift();
        }

        // Remove from active traces
        delete this.activeTraces[messageId];
      }
    }

    // Notify connected clients
    this._broadcastUpdate();
  }

  /**
   * Generate a visualization for a message trace
   */
  _generateVisualization(messageId) {
    try {
      const trace = this.activeTraces[messageId] || this.messages.find(m => m.id === messageId);
      if (!trace) {
        throw new Error(`Trace not found for message ID: ${messageId}`);
      }

      // Create a sequence diagram SVG
      const svg = this._createSequenceDiagram(trace);

      // Save SVG to file
      const fileName = `${messageId.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.svg`;
      const filePath = path.join(this.config.outputDir, fileName);

      fs.writeFileSync(filePath, svg, 'utf8');
      console.log(`Visualization saved to ${filePath}`);

      return filePath;
    } catch (error) {
      console.error(`Failed to generate visualization for message ${messageId}:`, error);
      return null;
    }
  }

  /**
   * Create a sequence diagram SVG for a message trace
   */
  _createSequenceDiagram(trace) {
    // Simple SVG sequence diagram implementation
    const width = 800;
    const height = 600;

    // Create SVG document
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

    // Add title
    svg += `<text x="10" y="30" font-family="Arial" font-size="16" font-weight="bold">
      Message Trace: ${trace.id.substring(0, 10)}... (${trace.protocol})
    </text>`;

    // Add timestamp
    const formattedDate = new Date(trace.startTime).toLocaleString();
    svg += `<text x="10" y="50" font-family="Arial" font-size="12">
      Started: ${formattedDate}
    </text>`;

    // Draw chains as vertical lifelines
    const sourceX = 150;
    const targetX = 650;
    const startY = 80;
    const endY = 500;

    // Draw chain boxes
    svg += `<rect x="${sourceX - 60}" y="${startY}" width="120" height="40" rx="5" ry="5" fill="#e6f7ff" stroke="#1890ff" />`;
    svg += `<text x="${sourceX}" y="${startY + 25}" font-family="Arial" font-size="12" text-anchor="middle">${trace.sourceNetwork}</text>`;

    svg += `<rect x="${targetX - 60}" y="${startY}" width="120" height="40" rx="5" ry="5" fill="#e6f7ff" stroke="#1890ff" />`;
    svg += `<text x="${targetX}" y="${startY + 25}" font-family="Arial" font-size="12" text-anchor="middle">${trace.targetNetwork}</text>`;

    // Draw lifelines
    svg += `<line x1="${sourceX}" y1="${startY + 40}" x2="${sourceX}" y2="${endY}" stroke="#1890ff" stroke-dasharray="4" />`;
    svg += `<line x1="${targetX}" y1="${startY + 40}" x2="${targetX}" y2="${endY}" stroke="#1890ff" stroke-dasharray="4" />`;

    // Draw events as arrows between lifelines
    let currentY = startY + 80;
    const eventSpacing = 60;
    const events = [...trace.events].sort((a, b) => a.timestamp - b.timestamp);

    for (const event of events) {
      // Determine arrow direction and coordinates
      let fromX, toX, label;

      if (event.network === trace.sourceNetwork) {
        fromX = sourceX;
        toX = targetX;
      } else {
        fromX = targetX;
        toX = sourceX;
      }

      // Create label based on event type
      label = event.type || 'Event';
      if (event.status) {
        label += ` (${event.status})`;
      }

      // Draw arrow
      svg += `<line x1="${fromX}" y1="${currentY}" x2="${toX}" y2="${currentY}" stroke="#1890ff" stroke-width="2" />`;
      svg += `<polygon points="${toX - 5},${currentY - 5} ${toX},${currentY} ${toX - 5},${currentY + 5}" fill="#1890ff" />`;

      // Add label
      const labelX = (fromX + toX) / 2;
      svg += `<text x="${labelX}" y="${currentY - 10}" font-family="Arial" font-size="10" text-anchor="middle">${label}</text>`;

      // Add timestamp
      const eventTime = new Date(event.timestamp).toLocaleTimeString();
      svg += `<text x="${labelX}" y="${currentY + 15}" font-family="Arial" font-size="8" text-anchor="middle">${eventTime}</text>`;

      currentY += eventSpacing;
    }

    // Add status indicator
    const statusColor =
      trace.status === 'completed' ? '#52c41a' : trace.status === 'failed' ? '#f5222d' : '#faad14';

    svg += `<rect x="10" y="${endY - 30}" width="120" height="30" rx="5" ry="5" fill="${statusColor}" fill-opacity="0.2" stroke="${statusColor}" />`;
    svg += `<text x="70" y="${endY - 10}" font-family="Arial" font-size="12" text-anchor="middle">Status: ${trace.status}</text>`;

    // Add duration if available
    if (trace.endTime) {
      const duration = (trace.endTime - trace.startTime) / 1000;
      svg += `<text x="200" y="${endY - 10}" font-family="Arial" font-size="12">Duration: ${duration.toFixed(2)}s</text>`;
    }

    svg += '</svg>';
    return svg;
  }

  /**
   * Start the visualization server
   */
  async _startVisualizationServer() {
    try {
      // Create Express app
      this.app = express();

      // Serve static files
      this.app.use('/traces', express.static(this.config.outputDir));

      // Serve dashboard HTML
      this.app.get('/', (req, res) => {
        res.send(this._generateDashboardHtml());
      });

      // Create HTTP server
      this.server = http.createServer(this.app);

      // Create WebSocket server
      this.wss = new WebSocket.Server({ server: this.server });

      // Handle WebSocket connections
      this.wss.on('connection', ws => {
        this.connections.push(ws);

        // Send initial state
        ws.send(
          JSON.stringify({
            activeTraces: this.activeTraces,
            messages: this.messages,
          })
        );

        ws.on('close', () => {
          this.connections = this.connections.filter(conn => conn !== ws);
        });
      });

      // Start the server
      this.server.listen(this.config.visualizerPort, () => {
        console.log(
          `Visualization server running at http://localhost:${this.config.visualizerPort}`
        );
        this.isServerRunning = true;
      });

      return true;
    } catch (error) {
      console.error('Failed to start visualization server:', error);
      return false;
    }
  }

  /**
   * Broadcast updates to connected clients
   */
  _broadcastUpdate() {
    if (!this.isServerRunning || this.connections.length === 0) {
      return;
    }

    const update = JSON.stringify({
      activeTraces: this.activeTraces,
      messages: this.messages,
    });

    for (const connection of this.connections) {
      if (connection.readyState === WebSocket.OPEN) {
        connection.send(update);
      }
    }
  }

  /**
   * Generate HTML for the dashboard
   */
  _generateDashboardHtml() {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>MessageTracer Dashboard</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
            .container { max-width: 1200px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
            .card { background-color: white; border-radius: 5px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 15px; margin-bottom: 15px; }
            .status-badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
            .status-pending { background-color: #fff7e6; color: #d46b08; border: 1px solid #ffd591; }
            .status-completed { background-color: #f6ffed; color: #389e0d; border: 1px solid #b7eb8f; }
            .status-failed { background-color: #fff1f0; color: #cf1322; border: 1px solid #ffa39e; }
            .tabs { display: flex; border-bottom: 1px solid #ddd; margin-bottom: 15px; }
            .tab { padding: 10px 15px; cursor: pointer; }
            .tab.active { border-bottom: 2px solid #1890ff; color: #1890ff; }
            .tab-content { display: none; }
            .tab-content.active { display: block; }
            table { width: 100%; border-collapse: collapse; }
            th, td { text-align: left; padding: 8px; border-bottom: 1px solid #eee; }
            th { background-color: #fafafa; }
            .visualization { width: 100%; height: 500px; border: none; }
            .event-list { max-height: 300px; overflow-y: auto; }
            .no-data { text-align: center; padding: 20px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Cross-Chain Message Tracer</h1>
              <div>
                <span id="status-indicator">Connecting...</span>
                <span id="time-indicator"></span>
              </div>
            </div>
            
            <div class="tabs">
              <div class="tab active" data-tab="active">Active Traces</div>
              <div class="tab" data-tab="history">Message History</div>
            </div>
            
            <div class="tab-content active" id="active-tab">
              <div id="active-traces"></div>
            </div>
            
            <div class="tab-content" id="history-tab">
              <div id="message-history"></div>
            </div>
            
            <div class="card">
              <h2>Message Visualization</h2>
              <div id="visualization-container">
                <div class="no-data">Select a message to view its visualization</div>
              </div>
            </div>
          </div>
          
          <script>
            // WebSocket connection
            const ws = new WebSocket('ws://' + window.location.host);
            let activeTraces = {};
            let messageHistory = [];
            
            // Handle WebSocket messages
            ws.onopen = () => {
              document.getElementById('status-indicator').textContent = 'Connected';
              document.getElementById('status-indicator').style.color = '#389e0d';
            };
            
            ws.onclose = () => {
              document.getElementById('status-indicator').textContent = 'Disconnected';
              document.getElementById('status-indicator').style.color = '#cf1322';
            };
            
            ws.onmessage = (event) => {
              const data = JSON.parse(event.data);
              activeTraces = data.activeTraces || {};
              messageHistory = data.messages || [];
              
              updateActiveTraces();
              updateMessageHistory();
              updateTimeIndicator();
            };
            
            // Tab switching
            document.querySelectorAll('.tab').forEach(tab => {
              tab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab + '-tab').classList.add('active');
              });
            });
            
            // Update active traces display
            function updateActiveTraces() {
              const container = document.getElementById('active-traces');
              
              if (Object.keys(activeTraces).length === 0) {
                container.innerHTML = '<div class="no-data">No active traces</div>';
                return;
              }
              
              let html = '';
              for (const [messageId, trace] of Object.entries(activeTraces)) {
                const statusClass = 'status-' + trace.status;
                
                html += \`
                  <div class="card" data-id="\${messageId}">
                    <h3>\${trace.protocol.toUpperCase()} Message</h3>
                    <div>
                      <strong>ID:</strong> \${messageId}
                      <span class="status-badge \${statusClass}">\${trace.status}</span>
                    </div>
                    <div><strong>From:</strong> \${trace.sourceNetwork} → <strong>To:</strong> \${trace.targetNetwork}</div>
                    <div><strong>Started:</strong> \${new Date(trace.startTime).toLocaleString()}</div>
                    <div><strong>Events:</strong> \${trace.events.length}</div>
                    <div class="event-list">
                      <table>
                        <tr>
                          <th>Time</th>
                          <th>Network</th>
                          <th>Type</th>
                          <th>Status</th>
                        </tr>
                \`;
                
                for (const event of trace.events) {
                  html += \`
                        <tr>
                          <td>\${new Date(event.timestamp).toLocaleTimeString()}</td>
                          <td>\${event.network}</td>
                          <td>\${event.type || 'Event'}</td>
                          <td>\${event.status || '-'}</td>
                        </tr>
                  \`;
                }
                
                html += \`
                      </table>
                    </div>
                    <button onclick="showVisualization('\${messageId}')">View Visualization</button>
                  </div>
                \`;
              }
              
              container.innerHTML = html;
            }
            
            // Update message history display
            function updateMessageHistory() {
              const container = document.getElementById('message-history');
              
              if (messageHistory.length === 0) {
                container.innerHTML = '<div class="no-data">No message history</div>';
                return;
              }
              
              let html = '<table>';
              html += \`
                <tr>
                  <th>ID</th>
                  <th>Protocol</th>
                  <th>Source → Target</th>
                  <th>Status</th>
                  <th>Duration</th>
                  <th>Events</th>
                  <th>Actions</th>
                </tr>
              \`;
              
              for (const message of messageHistory) {
                const statusClass = 'status-' + message.status;
                const duration = message.endTime ? 
                  ((message.endTime - message.startTime) / 1000).toFixed(2) + 's' : 
                  'In progress';
                
                html += \`
                  <tr>
                    <td>\${message.id.substring(0, 10)}...</td>
                    <td>\${message.protocol.toUpperCase()}</td>
                    <td>\${message.sourceNetwork} → \${message.targetNetwork}</td>
                    <td><span class="status-badge \${statusClass}">\${message.status}</span></td>
                    <td>\${duration}</td>
                    <td>\${message.events.length}</td>
                    <td><button onclick="showVisualization('\${message.id}')">View</button></td>
                  </tr>
                \`;
              }
              
              html += '</table>';
              container.innerHTML = html;
            }
            
            // Show visualization for a message
            function showVisualization(messageId) {
              const container = document.getElementById('visualization-container');
              const trace = activeTraces[messageId] || messageHistory.find(m => m.id === messageId);
              
              if (!trace) {
                container.innerHTML = '<div class="no-data">Message not found</div>';
                return;
              }
              
              // Create an iframe to display the SVG
              container.innerHTML = \`<iframe class="visualization" src="/traces/\${messageId.replace(/[^a-zA-Z0-9]/g, '_')}_\${trace.startTime}.svg"></iframe>\`;
            }
            
            // Update time indicator
            function updateTimeIndicator() {
              document.getElementById('time-indicator').textContent = new Date().toLocaleString();
            }
            
            // Update time every second
            setInterval(updateTimeIndicator, 1000);
          </script>
        </body>
      </html>
    `;
  }

  /**
   * Schedule regular message processing
   */
  _scheduleMessageProcessing() {
    setInterval(() => {
      // Check for timed out messages
      const now = Date.now();
      const timeout = 30 * 60 * 1000; // 30 minutes

      for (const [messageId, trace] of Object.entries(this.activeTraces)) {
        if (now - trace.lastUpdate > timeout) {
          // Mark as failed due to timeout
          this._processTraceEvent(messageId, {
            type: 'timeout',
            network: trace.sourceNetwork,
            status: 'failed',
            details: 'Message processing timed out',
          });
        }
      }

      // Broadcast updates to clients
      this._broadcastUpdate();
    }, this.config.refreshInterval);
  }

  /**
   * Create a bridge adapter for the specified protocol
   */
  _createBridgeAdapter(bridge) {
    const { protocol, id } = bridge;

    switch (protocol.toLowerCase()) {
      case SUPPORTED_PROTOCOLS.LAYERZERO:
        return new LayerZeroBridgeAdapter(
          bridge,
          this.providers,
          this._processTraceEvent.bind(this)
        );

      case SUPPORTED_PROTOCOLS.CCIP:
        return new CCIPBridgeAdapter(bridge, this.providers, this._processTraceEvent.bind(this));

      case SUPPORTED_PROTOCOLS.HYPERLANE:
        return new HyperlaneBridgeAdapter(
          bridge,
          this.providers,
          this._processTraceEvent.bind(this)
        );

      case SUPPORTED_PROTOCOLS.AXELAR:
        return new AxelarBridgeAdapter(bridge, this.providers, this._processTraceEvent.bind(this));

      case SUPPORTED_PROTOCOLS.WORMHOLE:
        return new WormholeBridgeAdapter(
          bridge,
          this.providers,
          this._processTraceEvent.bind(this)
        );

      case SUPPORTED_PROTOCOLS.CUSTOM:
        return new CustomBridgeAdapter(bridge, this.providers, this._processTraceEvent.bind(this));

      default:
        throw new Error(`Unsupported bridge protocol: ${protocol}`);
    }
  }

  /**
   * Get a bridge adapter for the specified protocol
   */
  _getBridgeAdapterForProtocol(protocol) {
    const adapterEntries = Object.entries(this.bridgeAdapters);
    const bridgeEntry = adapterEntries.find(([_, adapter]) => adapter.protocol === protocol);

    return bridgeEntry ? bridgeEntry[1] : null;
  }
}

/**
 * Base class for bridge adapters
 */
class BaseBridgeAdapter {
  constructor(bridge, providers, eventCallback) {
    this.bridge = bridge;
    this.providers = providers;
    this.eventCallback = eventCallback;
    this.protocol = bridge.protocol;
    this.listeners = [];
    this.isListening = false;
  }

  async startListening() {
    this.isListening = true;
  }

  async stopListening() {
    this.isListening = false;

    // Remove all listeners
    for (const listener of this.listeners) {
      if (listener.contract && listener.event && listener.callback) {
        listener.contract.off(listener.event, listener.callback);
      }
    }

    this.listeners = [];
  }

  async traceMessage(messageId, sourceNetwork, targetNetwork, callback) {
    throw new Error('traceMessage method must be implemented by subclasses');
  }
}

/**
 * LayerZero bridge adapter
 */
class LayerZeroBridgeAdapter extends BaseBridgeAdapter {
  constructor(bridge, providers, eventCallback) {
    super(bridge, providers, eventCallback);

    // LayerZero-specific settings
    this.endpoints = bridge.endpoints || {};
    this.contracts = {};
  }

  async startListening() {
    await super.startListening();

    // Initialize contracts for each network
    for (const [networkName, endpointAddress] of Object.entries(this.endpoints)) {
      const provider = this.providers[networkName];
      if (!provider) {
        console.error(`Provider not found for network: ${networkName}`);
        continue;
      }

      // LayerZero Endpoint ABI (minimal for event monitoring)
      const endpointAbi = [
        'event PacketSent(bytes payload)',
        'event PacketReceived(uint16 srcChainId, address srcAddress, bytes payload)',
      ];

      const contract = new ethers.Contract(endpointAddress, endpointAbi, provider);
      this.contracts[networkName] = contract;

      // Listen for packet events
      const sentCallback = payload => {
        if (!this.isListening) return;

        const messageId = ethers.utils.keccak256(payload);
        this.eventCallback(messageId, {
          type: 'packetSent',
          network: networkName,
          status: 'pending',
          details: { payload },
        });
      };

      const receivedCallback = (srcChainId, srcAddress, payload) => {
        if (!this.isListening) return;

        const messageId = ethers.utils.keccak256(payload);
        this.eventCallback(messageId, {
          type: 'packetReceived',
          network: networkName,
          status: 'completed',
          details: {
            srcChainId,
            srcAddress,
            payload,
          },
        });
      };

      // Set up event listeners
      contract.on('PacketSent', sentCallback);
      contract.on('PacketReceived', receivedCallback);

      this.listeners.push(
        { contract, event: 'PacketSent', callback: sentCallback },
        { contract, event: 'PacketReceived', callback: receivedCallback }
      );
    }
  }

  async traceMessage(messageId, sourceNetwork, targetNetwork, callback) {
    // Check if contracts are available
    const sourceContract = this.contracts[sourceNetwork];
    const targetContract = this.contracts[targetNetwork];

    if (!sourceContract || !targetContract) {
      throw new Error(`Contracts not available for ${sourceNetwork} or ${targetNetwork}`);
    }

    // For LayerZero, we can't directly query for a specific message by ID
    // Instead, we will filter events based on the message ID (hash of payload)

    // Get current block numbers
    const sourceProvider = this.providers[sourceNetwork];
    const targetProvider = this.providers[targetNetwork];

    const sourceBlock = await sourceProvider.getBlockNumber();
    const targetBlock = await targetProvider.getBlockNumber();

    // Look back maximum 10,000 blocks
    const fromSourceBlock = Math.max(sourceBlock - 10000, 0);
    const fromTargetBlock = Math.max(targetBlock - 10000, 0);

    // Filter for sent events
    const sentFilter = sourceContract.filters.PacketSent();
    const sentEvents = await sourceContract.queryFilter(sentFilter, fromSourceBlock);

    // Find the matching event by computing the message ID from payload
    for (const event of sentEvents) {
      const payload = event.args.payload;
      const computedId = ethers.utils.keccak256(payload);

      if (computedId === messageId) {
        callback({
          type: 'packetSent',
          network: sourceNetwork,
          status: 'pending',
          details: {
            payload,
            blockNumber: event.blockNumber,
            txHash: event.transactionHash,
          },
        });

        // Now look for the corresponding received event
        const receivedFilter = targetContract.filters.PacketReceived();
        const receivedEvents = await targetContract.queryFilter(receivedFilter, fromTargetBlock);

        for (const recEvent of receivedEvents) {
          const recPayload = recEvent.args.payload;

          if (payload === recPayload || ethers.utils.keccak256(recPayload) === messageId) {
            callback({
              type: 'packetReceived',
              network: targetNetwork,
              status: 'completed',
              details: {
                srcChainId: recEvent.args.srcChainId,
                srcAddress: recEvent.args.srcAddress,
                payload: recPayload,
                blockNumber: recEvent.blockNumber,
                txHash: recEvent.transactionHash,
              },
            });
            return true;
          }
        }

        // Message sent but not yet received
        callback({
          type: 'pendingDelivery',
          network: targetNetwork,
          status: 'pending',
          details: {
            message: 'Message sent but not yet received on the target chain',
          },
        });

        return true;
      }
    }

    callback({
      type: 'messageNotFound',
      network: sourceNetwork,
      status: 'failed',
      details: {
        message: 'No matching message found in recent blocks',
      },
    });

    return false;
  }
}

// Placeholder for other bridge adapters
class CCIPBridgeAdapter extends BaseBridgeAdapter {
  async startListening() {
    await super.startListening();
    // Implementation specific to CCIP
  }

  async traceMessage(messageId, sourceNetwork, targetNetwork, callback) {
    // Implementation specific to CCIP
  }
}

class HyperlaneBridgeAdapter extends BaseBridgeAdapter {
  async startListening() {
    await super.startListening();
    // Implementation specific to Hyperlane
  }

  async traceMessage(messageId, sourceNetwork, targetNetwork, callback) {
    // Implementation specific to Hyperlane
  }
}

class AxelarBridgeAdapter extends BaseBridgeAdapter {
  async startListening() {
    await super.startListening();
    // Implementation specific to Axelar
  }

  async traceMessage(messageId, sourceNetwork, targetNetwork, callback) {
    // Implementation specific to Axelar
  }
}

class WormholeBridgeAdapter extends BaseBridgeAdapter {
  async startListening() {
    await super.startListening();
    // Implementation specific to Wormhole
  }

  async traceMessage(messageId, sourceNetwork, targetNetwork, callback) {
    // Implementation specific to Wormhole
  }
}

class CustomBridgeAdapter extends BaseBridgeAdapter {
  async startListening() {
    await super.startListening();
    // Implementation for custom bridges
  }

  async traceMessage(messageId, sourceNetwork, targetNetwork, callback) {
    // Implementation for custom bridges
  }
}

module.exports = MessageTracer;
