# A Deep Dive into DevForge's Health Monitoring API

*May 17, 2025 · 6 min read*

![DevForge Health Monitoring](../../assets/img/health-api.png)

Monitoring the health of your development servers is critical when conducting security tests on Web3 applications. Traditional development servers typically don't provide much visibility into their operational state, forcing developers to implement custom monitoring solutions. DevForge, however, comes with a built-in health monitoring API that gives you real-time insights into your server's performance and status.

## Why Health Monitoring Matters in Web3 Development

Web3 development presents unique challenges for server monitoring:

1. **Blockchain interaction complexity**: Applications interact with multiple chains, requiring reliable server connectivity
2. **Security test instrumentation**: Detailed server metrics help identify performance issues during security tests
3. **Multi-environment testing**: Testing across multiple environments requires consistent monitoring interfaces
4. **Transaction behavior analysis**: When testing transactions, knowing server state is crucial for debugging

Without proper monitoring, diagnosing issues in Web3 applications becomes significantly harder. Was that failed transaction due to a blockchain problem, a network issue, or your development server silently crashing?

## The DevForge Health API

Every DevForge server automatically creates a health endpoint that provides detailed metadata about the running server. This endpoint is accessible at `http://localhost:<port+1>/health`, where `<port+1>` is the next port after your main server port.

For example, if your server runs on port 5050, the health endpoint will be at:

```
http://localhost:5051/health
```

### What Information Does It Provide?

A typical response from the health endpoint looks like this:

```json
{
  "status": "running",
  "uptime": 125.4,
  "pid": 12345,
  "port": 5050,
  "memory": "24.8MB",
  "os": "windows",
  "node": "v16.14.0",
  "timestamp": "2025-05-13T03:05:48.000Z",
  "cpu": {
    "usage": "2.1%",
    "cores": 8
  },
  "environment": "development"
}
```

Let's break down these fields:

- **status**: Current server status ("running", "starting", "stopping", "error")
- **uptime**: Time in seconds since server start
- **pid**: Process ID of the server
- **port**: Port the server is running on
- **memory**: Current memory usage
- **os**: Operating system information
- **node**: Node.js version
- **timestamp**: Current server time
- **cpu**: CPU usage information
- **environment**: Server environment (development, testing, production)

### How to Access Health Data

You can access the health endpoint in various ways:

#### Using cURL

```bash
curl http://localhost:5051/health
```

#### Using JavaScript/Fetch

```javascript
async function checkServerHealth() {
  const response = await fetch('http://localhost:5051/health');
  const data = await response.json();
  console.log('Server uptime:', data.uptime);
  return data;
}
```

#### Using the DevForge API

```javascript
const devforge = require('devforge');
const status = devforge.getStatus();
console.log(status);
```

## Practical Use Cases for Web3 Developers

### 1. Automated Test Orchestration

When running automated tests against Web3 applications, you can use the health endpoint to ensure your server is ready before starting tests:

```javascript
const axios = require('axios');
const { spawn } = require('child_process');

async function runTests() {
  // Start the server
  spawn('devforge', ['start']);
  
  // Wait for server to be ready
  let serverReady = false;
  while (!serverReady) {
    try {
      const response = await axios.get('http://localhost:5051/health');
      if (response.data.status === 'running' && response.data.uptime > 1) {
        serverReady = true;
      }
    } catch (e) {
      console.log('Waiting for server to start...');
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  // Run tests now that server is ready
  console.log('Server ready, running tests...');
  spawn('npm', ['test']);
}

runTests();
```

### 2. Multi-Environment Testing Dashboard

When testing Web3 applications across multiple environments (testnets, local chains, forks), you can build a simple dashboard to monitor all your servers:

```javascript
const servers = [
  { name: 'Mainnet Fork', port: 5050 },
  { name: 'Optimism Testnet', port: 5060 },
  { name: 'Arbitrum Local', port: 5070 }
];

async function buildDashboard() {
  const serverStates = await Promise.all(
    servers.map(async (server) => {
      try {
        const response = await fetch(`http://localhost:${server.port + 1}/health`);
        const health = await response.json();
        return { ...server, health, online: true };
      } catch (e) {
        return { ...server, online: false };
      }
    })
  );
  
  // Display dashboard with server states
  console.table(serverStates);
}
```

### 3. Security Test Monitoring

When performing security tests on Web3 applications, monitor server resource usage to detect potential issues:

```javascript
async function monitorDuringSecurityTest() {
  const startTime = Date.now();
  
  // Run monitoring in background during test
  const monitoring = setInterval(async () => {
    try {
      const response = await fetch('http://localhost:5051/health');
      const health = await response.json();
      
      // Alert if memory usage exceeds threshold
      if (health.memory > '100MB') {
        console.warn('High memory usage detected:', health.memory);
      }
      
      // Log resource usage during test
      console.log(`[${new Date().toISOString()}] CPU: ${health.cpu.usage}, Memory: ${health.memory}`);
    } catch (e) {
      console.error('Error accessing health endpoint:', e.message);
    }
  }, 5000);
  
  // Run security test here
  // ...

  // Stop monitoring after test
  clearInterval(monitoring);
}
```

## Customizing the Health Endpoint

DevForge allows you to customize the health endpoint for your specific needs:

```javascript
// Start server with custom health metadata
devforge.start({
  port: 5050,
  healthEndpoint: {
    customMetadata: {
      applicationName: 'My DeFi App',
      testEnvironment: 'local-fork',
      chainId: 1337
    }
  }
});
```

Now your health endpoint includes these custom fields:

```json
{
  "status": "running",
  "uptime": 15.2,
  "pid": 12345,
  "port": 5050,
  // ... other standard fields ...
  "applicationName": "My DeFi App",
  "testEnvironment": "local-fork",
  "chainId": 1337
}
```

This allows you to include application-specific information in your health monitoring data.

## Performance Considerations

The health endpoint is designed to be lightweight and non-intrusive. It runs on a separate server instance and doesn't interfere with your main application. The memory and CPU overhead is minimal, typically adding less than 5MB to your application's memory footprint.

## Security Considerations

By default, the health endpoint is only accessible from localhost for security reasons. If you need to access it from other machines (not recommended for development servers), you can configure it when starting the server:

```javascript
devforge.start({
  port: 5050,
  healthEndpoint: {
    allowRemoteAccess: true
  }
});
```

## Conclusion

DevForge's built-in health monitoring API provides invaluable insights into your development server's state, solving a common pain point for Web3 developers. Whether you're running complex security tests, orchestrating multi-environment testing, or simply want better visibility into your development environment, the health monitoring API gives you the information you need without requiring custom monitoring solutions.

In Web3 development, where reliable server state can make the difference between a successful test and a frustrating debugging session, this feature alone can save you hours of troubleshooting time.

Try it out and see how it transforms your development workflow!

---

*Want to learn more about DevForge? Check out our [GitHub repository](https://github.com/YourUser/devforge) or our other articles on DevForge features.* 