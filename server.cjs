const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      service: 'Audityzer'
    }));
    return;
  }

  if (req.url === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'running',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development'
    }));
    return;
  }

  if (req.url === '/' || req.url === '/index.html') {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audityzer - DeFi Security Auditing Platform</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 600px;
            width: 90%;
        }
        .logo {
            font-size: 3rem;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 1rem;
        }
        .subtitle {
            color: #666;
            font-size: 1.2rem;
            margin-bottom: 2rem;
        }
        .status {
            background: #e8f5e8;
            color: #2d5a2d;
            padding: 1rem;
            border-radius: 10px;
            margin: 2rem 0;
            border-left: 4px solid #4caf50;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        .feature {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 10px;
            border: 1px solid #e9ecef;
        }
        .feature h3 {
            color: #495057;
            margin-bottom: 0.5rem;
        }
        .feature p {
            color: #6c757d;
            font-size: 0.9rem;
        }
        .btn {
            background: #667eea;
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 10px;
            font-size: 1.1rem;
            cursor: pointer;
            margin: 0.5rem;
            transition: all 0.3s ease;
        }
        .btn:hover {
            background: #5a6fd8;
            transform: translateY(-2px);
        }
        .footer {
            margin-top: 2rem;
            color: #6c757d;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🔒 Audityzer</div>
        <div class="subtitle">Advanced DeFi Security Auditing Platform</div>
        
        <div class="status">
            ✅ Deployment Successful - Server Running on Port ${PORT}
        </div>

        <div class="features">
            <div class="feature">
                <h3>🔍 Smart Contract Analysis</h3>
                <p>Comprehensive security auditing for DeFi protocols</p>
            </div>
            <div class="feature">
                <h3>🛡️ Vulnerability Detection</h3>
                <p>Advanced pattern recognition for security flaws</p>
            </div>
            <div class="feature">
                <h3>📊 Risk Assessment</h3>
                <p>Detailed reports with actionable insights</p>
            </div>
            <div class="feature">
                <h3>🚀 Automated Testing</h3>
                <p>Continuous security monitoring and testing</p>
            </div>
        </div>

        <button class="btn" onclick="checkHealth()">Check System Health</button>
        <button class="btn" onclick="viewDocs()">View Documentation</button>

        <div class="footer">
            <p>Deployment completed successfully at ${new Date().toISOString()}</p>
            <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
        </div>
    </div>

    <script>
        async function checkHealth() {
            try {
                const response = await fetch('/health');
                const data = await response.json();
                alert('System Status: ' + data.status + '\\nTimestamp: ' + data.timestamp);
            } catch (error) {
                alert('Error checking health: ' + error.message);
            }
        }

        function viewDocs() {
            window.open('https://github.com/romanchaa997/audityzer', '_blank');
        }

        // Auto-refresh status every 30 seconds
        setInterval(async () => {
            try {
                const response = await fetch('/api/status');
                const data = await response.json();
                console.log('System status:', data);
            } catch (error) {
                console.error('Status check failed:', error);
            }
        }, 30000);
    </script>
</body>
</html>`;
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
    return;
  }

  // 404 for other routes
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`🚀 Audityzer server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 Status API: http://localhost:${PORT}/api/status`);
  console.log(`🕒 Started at: ${new Date().toISOString()}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
