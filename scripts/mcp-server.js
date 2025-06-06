
#!/usr/bin/env node

/**
 * MCP Server for Audityzer
 * Provides AI integration capabilities
 */

const http = require('http');
const url = require('url');

// Configuration
const PORT = process.env.MCP_PORT || 8080;
const AUDITYZER_URL = process.env.AUDITYZER_URL || 'http://localhost:5000';

// MCP Server implementation
class MCPServer {
  constructor() {
    this.capabilities = {
      tools: true,
      prompts: true,
      resources: true,
      logging: true
    };
    
    this.tools = new Map();
    this.resources = new Map();
    this.prompts = new Map();
    
    this.initializeTools();
    this.initializeResources();
    this.initializePrompts();
  }
  
  initializeTools() {
    // Audit tool
    this.tools.set('audit', {
      name: 'audit',
      description: 'Run security audit on a target URL',
      inputSchema: {
        type: 'object',
        properties: {
          target: { type: 'string', description: 'Target URL to audit' },
          rules: { type: 'array', items: { type: 'string' }, description: 'Security rules to apply' }
        },
        required: ['target']
      }
    });
    
    // Report tool
    this.tools.set('report', {
      name: 'report',
      description: 'Generate audit report',
      inputSchema: {
        type: 'object',
        properties: {
          auditId: { type: 'string', description: 'Audit ID to generate report for' },
          format: { type: 'string', enum: ['json', 'html', 'pdf'], description: 'Report format' }
        },
        required: ['auditId']
      }
    });
  }
  
  initializeResources() {
    this.resources.set('audit-results', {
      uri: 'audityzer://audit-results',
      name: 'Audit Results',
      description: 'Latest audit results and findings',
      mimeType: 'application/json'
    });
    
    this.resources.set('security-rules', {
      uri: 'audityzer://security-rules',
      name: 'Security Rules',
      description: 'Available security rules and configurations',
      mimeType: 'application/json'
    });
  }
  
  initializePrompts() {
    this.prompts.set('analyze-vulnerability', {
      name: 'analyze-vulnerability',
      description: 'Analyze a security vulnerability',
      arguments: [
        {
          name: 'vulnerability',
          description: 'Vulnerability details to analyze',
          required: true
        }
      ]
    });
    
    this.prompts.set('security-recommendations', {
      name: 'security-recommendations',
      description: 'Generate security recommendations',
      arguments: [
        {
          name: 'auditResults',
          description: 'Audit results to base recommendations on',
          required: true
        }
      ]
    });
  }
  
  async handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
    
    try {
      switch (path) {
        case '/health':
          this.handleHealth(req, res);
          break;
        case '/mcp/capabilities':
          this.handleCapabilities(req, res);
          break;
        case '/mcp/tools':
          this.handleTools(req, res);
          break;
        case '/mcp/resources':
          this.handleResources(req, res);
          break;
        case '/mcp/prompts':
          this.handlePrompts(req, res);
          break;
        case '/mcp/call':
          await this.handleToolCall(req, res);
          break;
        default:
          this.handleNotFound(req, res);
      }
    } catch (error) {
      this.handleError(req, res, error);
    }
  }
  
  handleHealth(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }));
  }
  
  handleCapabilities(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      capabilities: this.capabilities,
      serverInfo: {
        name: 'audityzer-mcp-server',
        version: '1.0.0'
      }
    }));
  }
  
  handleTools(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      tools: Array.from(this.tools.values())
    }));
  }
  
  handleResources(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      resources: Array.from(this.resources.values())
    }));
  }
  
  handlePrompts(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      prompts: Array.from(this.prompts.values())
    }));
  }
  
  async handleToolCall(req, res) {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }
    
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const { tool, arguments: args } = JSON.parse(body);
        
        if (!this.tools.has(tool)) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Tool not found' }));
          return;
        }
        
        const result = await this.executeTool(tool, args);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result }));
      } catch (error) {
        this.handleError(req, res, error);
      }
    });
  }
  
  async executeTool(toolName, args) {
    switch (toolName) {
      case 'audit':
        return this.executeAudit(args);
      case 'report':
        return this.generateReport(args);
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }
  
  async executeAudit(args) {
    // Mock audit execution - in real implementation, this would call Audityzer
    return {
      auditId: `audit-${Date.now()}`,
      status: 'completed',
      target: args.target,
      score: Math.floor(Math.random() * 100),
      issues: [
        {
          severity: 'medium',
          category: 'security',
          title: 'Example security issue',
          description: 'This is a mock security issue for demonstration'
        }
      ],
      timestamp: new Date().toISOString()
    };
  }
  
  async generateReport(args) {
    // Mock report generation
    return {
      reportId: `report-${Date.now()}`,
      auditId: args.auditId,
      format: args.format || 'json',
      url: `/reports/${args.auditId}.${args.format || 'json'}`,
      timestamp: new Date().toISOString()
    };
  }
  
  handleNotFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
  
  handleError(req, res, error) {
    console.error('MCP Server Error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message 
    }));
  }
}

// Start the server
const mcpServer = new MCPServer();
const server = http.createServer((req, res) => {
  mcpServer.handleRequest(req, res);
});

server.listen(PORT, () => {
  console.log(`🤖 MCP Server running on port ${PORT}`);
  console.log(`🔗 Audityzer URL: ${AUDITYZER_URL}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down MCP Server...');
  server.close(() => {
    console.log('✅ MCP Server stopped');
    process.exit(0);
  });
});
