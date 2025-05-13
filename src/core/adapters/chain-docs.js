/**
 * ChainDocs - Interactive Web3 API documentation and testing platform
 * Provides interactive API documentation for blockchain RPC endpoints with built-in testing
 */

const fs = require('fs');
const path = require('path');
const ethers = require('ethers');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');

class ChainDocs {
  constructor(config = {}) {
    this.config = {
      port: 3700,
      host: 'localhost',
      docsDir: path.join(process.cwd(), 'docs', 'api'),
      outputDir: path.join(process.cwd(), 'docs-site', 'api'),
      networks: {},
      templates: path.join(process.cwd(), 'templates', 'api-docs'),
      defaultNetwork: 'mainnet',
      enableInteractive: true,
      enableTransactionSigning: true,
      ...config,
    };

    this.app = null;
    this.server = null;
    this.wss = null;
    this.providers = {};
    this.apiDocs = {};
    this.connections = [];
    this.isRunning = false;
  }

  /**
   * Initialize ChainDocs
   */
  async initialize() {
    // Initialize network providers
    for (const [networkName, networkConfig] of Object.entries(this.config.networks)) {
      try {
        this.providers[networkName] = new ethers.providers.JsonRpcProvider(networkConfig.rpcUrl);
        console.log(`Connected to ${networkName} at ${networkConfig.rpcUrl}`);
      } catch (error) {
        console.error(`Failed to connect to ${networkName}:`, error);
      }
    }

    // Create directories if they don't exist
    if (!fs.existsSync(this.config.docsDir)) {
      fs.mkdirSync(this.config.docsDir, { recursive: true });
    }

    if (!fs.existsSync(this.config.outputDir)) {
      fs.mkdirSync(this.config.outputDir, { recursive: true });
    }

    // Load API documentation
    await this._loadApiDocs();

    // Generate OpenAPI specifications
    await this._generateOpenApiSpecs();

    // Initialize Express app
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, 'public')));

    // Set up API routes
    this._setupApiRoutes();

    return {
      networks: Object.keys(this.providers),
      apiDocs: Object.keys(this.apiDocs),
    };
  }

  /**
   * Start the ChainDocs server
   */
  async start() {
    if (!this.app) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      try {
        this.server = http.createServer(this.app);

        // Set up WebSocket server for real-time updates
        this.wss = new WebSocket.Server({ server: this.server });

        this.wss.on('connection', ws => {
          this.connections.push(ws);

          ws.on('message', message => {
            this._handleWebSocketMessage(ws, message);
          });

          ws.on('close', () => {
            this.connections = this.connections.filter(conn => conn !== ws);
          });

          // Send initial state
          ws.send(
            JSON.stringify({
              type: 'init',
              networks: Object.keys(this.providers),
              currentNetwork: this.config.defaultNetwork,
            })
          );
        });

        // Start the server
        this.server.listen(this.config.port, this.config.host, () => {
          this.isRunning = true;
          console.log(`ChainDocs server running at http://${this.config.host}:${this.config.port}`);
          resolve({
            host: this.config.host,
            port: this.config.port,
            url: `http://${this.config.host}:${this.config.port}`,
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Stop the ChainDocs server
   */
  async stop() {
    return new Promise(resolve => {
      if (this.server) {
        this.connections.forEach(connection => {
          if (connection.readyState === WebSocket.OPEN) {
            connection.close();
          }
        });

        this.server.close(() => {
          this.isRunning = false;
          console.log('ChainDocs server stopped');
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  }

  /**
   * Generate API documentation for a contract
   */
  async generateContractDocs(contractName, abi, address, networkName = this.config.defaultNetwork) {
    if (!Array.isArray(abi)) {
      throw new Error('ABI must be an array');
    }

    // Create contract documentation object
    const contractDoc = {
      name: contractName,
      address,
      network: networkName,
      functions: [],
      events: [],
      createdAt: new Date().toISOString(),
    };

    // Process ABI items
    for (const item of abi) {
      if (item.type === 'function') {
        const functionDoc = {
          name: item.name,
          type: item.type,
          stateMutability: item.stateMutability,
          inputs: item.inputs || [],
          outputs: item.outputs || [],
          examples: this._generateExamples(item),
          description: `${item.name} function`,
        };

        contractDoc.functions.push(functionDoc);
      } else if (item.type === 'event') {
        const eventDoc = {
          name: item.name,
          type: item.type,
          inputs: item.inputs || [],
          description: `${item.name} event`,
        };

        contractDoc.events.push(eventDoc);
      }
    }

    // Save documentation to file
    const docsPath = path.join(this.config.docsDir, `${contractName}.json`);
    fs.writeFileSync(docsPath, JSON.stringify(contractDoc, null, 2));

    // Add to loaded docs
    this.apiDocs[contractName] = contractDoc;

    // Generate OpenAPI spec for this contract
    await this._generateContractOpenApiSpec(contractName);

    return contractDoc;
  }

  /**
   * Generate documentation for standard ERC contracts
   */
  async generateStandardContractDocs() {
    // Generate ERC20 documentation
    const erc20Abi = [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        type: 'function',
        stateMutability: 'view',
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        type: 'function',
        stateMutability: 'view',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function',
        stateMutability: 'view',
      },
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', type: 'uint256' }],
        type: 'function',
        stateMutability: 'view',
      },
      {
        constant: true,
        inputs: [{ name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        type: 'function',
        stateMutability: 'view',
      },
      {
        constant: false,
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: '', type: 'bool' }],
        type: 'function',
        stateMutability: 'nonpayable',
      },
      {
        constant: true,
        inputs: [
          { name: 'owner', type: 'address' },
          { name: 'spender', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ name: '', type: 'uint256' }],
        type: 'function',
        stateMutability: 'view',
      },
      {
        constant: false,
        inputs: [
          { name: 'spender', type: 'address' },
          { name: 'value', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ name: '', type: 'bool' }],
        type: 'function',
        stateMutability: 'nonpayable',
      },
      {
        constant: false,
        inputs: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'value', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ name: '', type: 'bool' }],
        type: 'function',
        stateMutability: 'nonpayable',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'from', type: 'address' },
          { indexed: true, name: 'to', type: 'address' },
          { indexed: false, name: 'value', type: 'uint256' },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'owner', type: 'address' },
          { indexed: true, name: 'spender', type: 'address' },
          { indexed: false, name: 'value', type: 'uint256' },
        ],
        name: 'Approval',
        type: 'event',
      },
    ];

    await this.generateContractDocs('ERC20', erc20Abi, null);

    // Generate ERC721 documentation
    const erc721Abi = [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        type: 'function',
        stateMutability: 'view',
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        type: 'function',
        stateMutability: 'view',
      },
      {
        constant: true,
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ name: '', type: 'string' }],
        type: 'function',
        stateMutability: 'view',
      },
      {
        constant: true,
        inputs: [{ name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        type: 'function',
        stateMutability: 'view',
      },
      {
        constant: true,
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ name: '', type: 'address' }],
        type: 'function',
        stateMutability: 'view',
      },
      {
        constant: false,
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'tokenId', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [],
        type: 'function',
        stateMutability: 'nonpayable',
      },
      {
        constant: false,
        inputs: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'tokenId', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [],
        type: 'function',
        stateMutability: 'nonpayable',
      },
      {
        constant: false,
        inputs: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'tokenId', type: 'uint256' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        type: 'function',
        stateMutability: 'nonpayable',
      },
      {
        constant: false,
        inputs: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'tokenId', type: 'uint256' },
          { name: 'data', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        type: 'function',
        stateMutability: 'nonpayable',
      },
      {
        constant: false,
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'approved', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        type: 'function',
        stateMutability: 'nonpayable',
      },
      {
        constant: true,
        inputs: [
          { name: 'owner', type: 'address' },
          { name: 'operator', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ name: '', type: 'bool' }],
        type: 'function',
        stateMutability: 'view',
      },
      {
        constant: false,
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'tokenId', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [],
        type: 'function',
        stateMutability: 'nonpayable',
      },
      {
        constant: true,
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'getApproved',
        outputs: [{ name: '', type: 'address' }],
        type: 'function',
        stateMutability: 'view',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'from', type: 'address' },
          { indexed: true, name: 'to', type: 'address' },
          { indexed: true, name: 'tokenId', type: 'uint256' },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'owner', type: 'address' },
          { indexed: true, name: 'approved', type: 'address' },
          { indexed: true, name: 'tokenId', type: 'uint256' },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: 'owner', type: 'address' },
          { indexed: true, name: 'operator', type: 'address' },
          { indexed: false, name: 'approved', type: 'bool' },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
    ];

    await this.generateContractDocs('ERC721', erc721Abi, null);

    return {
      standards: ['ERC20', 'ERC721'],
    };
  }

  /**
   * Load API documentation from files
   */
  async _loadApiDocs() {
    if (!fs.existsSync(this.config.docsDir)) {
      return;
    }

    const docFiles = fs.readdirSync(this.config.docsDir).filter(file => file.endsWith('.json'));

    for (const file of docFiles) {
      try {
        const filePath = path.join(this.config.docsDir, file);
        const contractName = path.basename(file, '.json');
        const docContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        this.apiDocs[contractName] = docContent;
        console.log(`Loaded API documentation for ${contractName}`);
      } catch (error) {
        console.error(`Failed to load API documentation for ${file}:`, error);
      }
    }

    console.log(`Loaded ${Object.keys(this.apiDocs).length} API docs`);
  }

  /**
   * Generate OpenAPI specifications for all contracts
   */
  async _generateOpenApiSpecs() {
    for (const contractName of Object.keys(this.apiDocs)) {
      await this._generateContractOpenApiSpec(contractName);
    }
  }

  /**
   * Generate OpenAPI specification for a contract
   */
  async _generateContractOpenApiSpec(contractName) {
    const contractDoc = this.apiDocs[contractName];
    if (!contractDoc) {
      throw new Error(`Contract documentation for ${contractName} not found`);
    }

    // Create OpenAPI spec
    const openApiSpec = {
      openapi: '3.0.0',
      info: {
        title: `${contractName} API`,
        description: `API documentation for ${contractName} contract`,
        version: '1.0.0',
      },
      servers: [
        {
          url: `/api/contracts/${contractName}`,
          description: `${contractName} API endpoint`,
        },
      ],
      paths: {},
      components: {
        schemas: {},
      },
    };

    // Create path definitions for each function
    for (const func of contractDoc.functions) {
      const path = `/call/${func.name}`;

      // Create request body schema
      const requestSchema = {
        type: 'object',
        properties: {},
      };

      for (const input of func.inputs) {
        requestSchema.properties[input.name] = this._convertEthTypeToOpenApiType(input.type);
      }

      // Create response schema
      const responseSchema = {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
          },
          result: {
            type: 'object',
            properties: {},
          },
        },
      };

      for (const output of func.outputs) {
        const outputName = output.name || 'result';
        responseSchema.properties.result.properties[outputName] = this._convertEthTypeToOpenApiType(
          output.type
        );
      }

      // Create path definition
      openApiSpec.paths[path] = {
        post: {
          summary: func.description || `Call ${func.name} function`,
          description: `${func.stateMutability} function`,
          tags: [contractName],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: requestSchema,
              },
            },
          },
          responses: {
            200: {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: responseSchema,
                },
              },
            },
            400: {
              description: 'Bad request',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: false,
                      },
                      error: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };

      // Add component schemas
      openApiSpec.components.schemas[`${contractName}_${func.name}_request`] = requestSchema;
      openApiSpec.components.schemas[`${contractName}_${func.name}_response`] = responseSchema;
    }

    // Create OpenAPI spec file
    const specPath = path.join(this.config.outputDir, `${contractName}.yaml`);
    fs.writeFileSync(specPath, YAML.stringify(openApiSpec));

    return {
      contractName,
      specPath,
    };
  }

  /**
   * Convert Ethereum type to OpenAPI type
   */
  _convertEthTypeToOpenApiType(ethType) {
    // Handle arrays
    if (ethType.endsWith('[]')) {
      const baseType = ethType.slice(0, -2);
      return {
        type: 'array',
        items: this._convertEthTypeToOpenApiType(baseType),
      };
    }

    // Handle basic types
    if (ethType.startsWith('uint') || ethType.startsWith('int')) {
      return {
        type: 'string', // Use string for big numbers
        example: '0',
      };
    } else if (ethType === 'bool') {
      return {
        type: 'boolean',
        example: false,
      };
    } else if (ethType === 'address') {
      return {
        type: 'string',
        example: '0x0000000000000000000000000000000000000000',
      };
    } else if (ethType === 'string') {
      return {
        type: 'string',
        example: '',
      };
    } else if (ethType.startsWith('bytes')) {
      return {
        type: 'string',
        example: '0x',
      };
    }

    // Default to string
    return {
      type: 'string',
    };
  }

  /**
   * Generate example values for contract function
   */
  _generateExamples(functionAbi) {
    if (!functionAbi.inputs) {
      return {};
    }

    const inputExample = {};
    for (const input of functionAbi.inputs) {
      inputExample[input.name] = this._generateExampleValue(input.type);
    }

    const examples = {
      input: inputExample,
    };

    // For view/pure functions, generate example output
    if (functionAbi.stateMutability === 'view' || functionAbi.stateMutability === 'pure') {
      const outputExample = {};
      for (const output of functionAbi.outputs || []) {
        const name = output.name || 'result';
        outputExample[name] = this._generateExampleValue(output.type);
      }
      examples.output = outputExample;
    }

    return examples;
  }

  /**
   * Generate example value for Ethereum type
   */
  _generateExampleValue(ethType) {
    // Handle arrays
    if (ethType.endsWith('[]')) {
      const baseType = ethType.slice(0, -2);
      return [this._generateExampleValue(baseType)];
    }

    // Handle basic types
    if (ethType.startsWith('uint')) {
      return '1000000000000000000'; // 1 ETH in wei
    } else if (ethType.startsWith('int')) {
      return '0';
    } else if (ethType === 'bool') {
      return true;
    } else if (ethType === 'address') {
      return '0x0000000000000000000000000000000000000000';
    } else if (ethType === 'string') {
      return 'Example String';
    } else if (ethType.startsWith('bytes')) {
      return '0x0123456789abcdef';
    }

    // Default
    return null;
  }

  /**
   * Set up API routes for the Express app
   */
  _setupApiRoutes() {
    // API documentation route
    this.app.get('/api/docs', (req, res) => {
      res.json({
        contracts: Object.keys(this.apiDocs),
        networks: Object.keys(this.providers),
      });
    });

    // Contract documentation route
    this.app.get('/api/docs/:contractName', (req, res) => {
      const contractName = req.params.contractName;
      const contractDoc = this.apiDocs[contractName];

      if (!contractDoc) {
        return res.status(404).json({
          success: false,
          error: `Contract documentation for ${contractName} not found`,
        });
      }

      res.json(contractDoc);
    });

    // Contract function call route
    this.app.post('/api/contracts/:contractName/call/:functionName', async (req, res) => {
      try {
        const contractName = req.params.contractName;
        const functionName = req.params.functionName;
        const contractDoc = this.apiDocs[contractName];

        if (!contractDoc) {
          return res.status(404).json({
            success: false,
            error: `Contract documentation for ${contractName} not found`,
          });
        }

        const functionDoc = contractDoc.functions.find(f => f.name === functionName);
        if (!functionDoc) {
          return res.status(404).json({
            success: false,
            error: `Function ${functionName} not found in contract ${contractName}`,
          });
        }

        // Get network provider
        const networkName = req.body.network || contractDoc.network || this.config.defaultNetwork;
        const provider = this.providers[networkName];

        if (!provider) {
          return res.status(400).json({
            success: false,
            error: `Provider for network ${networkName} not found`,
          });
        }

        // Get contract address
        const contractAddress = req.body.address || contractDoc.address;
        if (!contractAddress) {
          return res.status(400).json({
            success: false,
            error: 'Contract address is required',
          });
        }

        // Create contract instance
        const abi = [functionDoc];
        const contract = new ethers.Contract(contractAddress, abi, provider);

        // Prepare function arguments
        const args = [];
        for (const input of functionDoc.inputs) {
          if (req.body[input.name] === undefined) {
            return res.status(400).json({
              success: false,
              error: `Missing required parameter: ${input.name}`,
            });
          }

          args.push(req.body[input.name]);
        }

        // Call the function
        const result = await contract[functionName](...args);

        // Format the result
        let formattedResult;
        if (Array.isArray(result)) {
          formattedResult = {};
          for (let i = 0; i < functionDoc.outputs.length; i++) {
            const output = functionDoc.outputs[i];
            const name = output.name || `result${i}`;
            formattedResult[name] = result[i].toString();
          }
        } else {
          formattedResult = result.toString();
        }

        res.json({
          success: true,
          result: formattedResult,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message,
        });
      }
    });

    // Transaction signing route (if enabled)
    if (this.config.enableTransactionSigning) {
      this.app.post('/api/sign-transaction', (req, res) => {
        // This would be implemented with a secure wallet connection
        // For security reasons, we're not implementing actual transaction signing here
        res.status(400).json({
          success: false,
          error: 'Transaction signing requires a secure wallet connection',
        });
      });
    }

    // Serve Swagger UI for each contract
    for (const contractName of Object.keys(this.apiDocs)) {
      const yamlPath = path.join(this.config.outputDir, `${contractName}.yaml`);
      if (fs.existsSync(yamlPath)) {
        const openApiDocument = YAML.parse(fs.readFileSync(yamlPath, 'utf8'));
        this.app.use(`/docs/${contractName}`, swaggerUi.serve, swaggerUi.setup(openApiDocument));
      }
    }

    // Index page that lists all available API docs
    this.app.get('/', (req, res) => {
      const contractList = Object.keys(this.apiDocs).map(name => ({
        name,
        docsUrl: `/docs/${name}`,
      }));

      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ChainDocs - Web3 API Documentation</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
        </head>
        <body>
          <div class="container mt-5">
            <h1>ChainDocs API Documentation</h1>
            <p class="lead">Interactive API documentation for blockchain contracts</p>
            
            <div class="card mt-4">
              <div class="card-header">Available Contract APIs</div>
              <div class="card-body">
                <ul class="list-group">
                  ${contractList
                    .map(
                      contract => `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      ${contract.name}
                      <a href="${contract.docsUrl}" class="btn btn-sm btn-primary">View API Docs</a>
                    </li>
                  `
                    )
                    .join('')}
                </ul>
              </div>
            </div>
          </div>
        </body>
        </html>
      `);
    });
  }

  /**
   * Handle WebSocket messages
   */
  _handleWebSocketMessage(ws, message) {
    try {
      const data = JSON.parse(message);

      if (data.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong' }));
      } else if (data.type === 'setNetwork') {
        // Switch network
        const networkName = data.network;
        if (this.providers[networkName]) {
          ws.send(
            JSON.stringify({
              type: 'networkChanged',
              network: networkName,
            })
          );
        } else {
          ws.send(
            JSON.stringify({
              type: 'error',
              error: `Network ${networkName} not found`,
            })
          );
        }
      }
    } catch (error) {
      console.error('Error handling WebSocket message:', error);
    }
  }

  /**
   * Broadcast message to all connected WebSocket clients
   */
  _broadcast(message) {
    const messageStr = typeof message === 'string' ? message : JSON.stringify(message);

    for (const connection of this.connections) {
      if (connection.readyState === WebSocket.OPEN) {
        connection.send(messageStr);
      }
    }
  }
}

module.exports = ChainDocs;
