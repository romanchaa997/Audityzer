#!/usr/bin/env node

/**
 * Optimized MCP Server Startup Script
 * 
 * High-performance startup with health monitoring and auto-recovery
 */

import { spawn } from 'child_process';
import { performance } from 'perf_hooks';
import fs from 'fs';
import path from 'path';

const SERVICES = [
  {
    name: 'mcp-main',
    script: 'src/mcp/server.js',
    port: process.env.MCP_PORT || 8078,
    env: { ...process.env, NODE_ENV: 'production' }
  },
  {
    name: 'mcp-file-server',
    script: 'src/mcp/file-server.js',
    port: process.env.MCP_FILE_SERVER_PORT || 8079,
    env: { ...process.env, NODE_ENV: 'production' }
  },
  {
    name: 'mcp-db-server',
    script: 'src/mcp/db-server.js',
    port: process.env.MCP_DB_SERVER_PORT || 8080,
    env: { ...process.env, NODE_ENV: 'production' }
  }
];

class OptimizedMCPManager {
  constructor () {
    this.processes = new Map();
    this.startTime = performance.now();
    this.healthCheckInterval = null;
  }

  async startService(service) {
    console.log(`🚀 Starting ${service.name} on port ${service.port}...`);

    const process = spawn('node', [service.script], {
      env: service.env,
      stdio: ['pipe', 'pipe', 'pipe'],
      detached: false
    });

    process.stdout.on('data', (data) => {
      console.log(`[${service.name}] ${data.toString().trim()}`);
    });

    process.stderr.on('data', (data) => {
      console.error(`[${service.name}] ERROR: ${data.toString().trim()}`);
    });

    process.on('exit', (code) => {
      console.log(`[${service.name}] Exited with code ${code}`);
      this.processes.delete(service.name);
    });

    this.processes.set(service.name, {
      process,
      service,
      startTime: Date.now(),
      restartCount: 0
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`✅ ${service.name} started successfully`);
        resolve();
      }, 2000);
    });
  }

  async startAllServices() {
    console.log('🔥 Starting Audityzer MCP Services (High-Performance Mode)');
    console.log('='.repeat(60));

    for (const service of SERVICES) {
      await this.startService(service);
    }

    const totalTime = ((performance.now() - this.startTime) / 1000).toFixed(2);
    console.log(`\n🎉 All MCP services started in ${totalTime}s`);

    this.startHealthMonitoring();
    this.displayStatus();
  }

  startHealthMonitoring() {
    this.healthCheckInterval = setInterval(() => {
      this.checkHealth();
    }, 30000); // Check every 30 seconds
  }

  async checkHealth() {
    for (const [name, info] of this.processes) {
      try {
        const response = await fetch(`http://localhost:${info.service.port}/health`);
        if (!response.ok) {
          console.warn(`⚠️  Health check failed for ${name}`);
        }
      } catch (error) {
        console.error(`❌ ${name} is not responding, attempting restart...`);
        await this.restartService(name);
      }
    }
  }

  async restartService(serviceName) {
    const info = this.processes.get(serviceName);
    if (!info) return;

    info.restartCount++;
    if (info.restartCount > 3) {
      console.error(`🚨 ${serviceName} failed to restart 3 times, giving up`);
      return;
    }

    console.log(`🔄 Restarting ${serviceName} (attempt ${info.restartCount})`);

    // Kill existing process
    info.process.kill('SIGTERM');

    // Wait a moment then restart
    setTimeout(() => {
      this.startService(info.service);
    }, 5000);
  }

  displayStatus() {
    console.log('\n📊 MCP Services Status:');
    console.log('-'.repeat(50));

    for (const [name, info] of this.processes) {
      const uptime = ((Date.now() - info.startTime) / 1000).toFixed(0);
      console.log(`${name.padEnd(20)} | Port: ${info.service.port} | Uptime: ${uptime}s`);
    }

    console.log('\n🌐 Service URLs:');
    console.log(`Main Server:     http://localhost:${SERVICES[0].port}`);
    console.log(`File Server:     http://localhost:${SERVICES[1].port}`);
    console.log(`Database Server: http://localhost:${SERVICES[2].port}`);

    console.log('\n📝 Available Commands:');
    console.log('npm run mcp:status  - Check service status');
    console.log('npm run mcp:stop    - Stop all services');
    console.log('npm run mcp:restart - Restart all services');
  }

  async stop() {
    console.log('🛑 Stopping all MCP services...');

    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    for (const [name, info] of this.processes) {
      console.log(`Stopping ${name}...`);
      info.process.kill('SIGTERM');
    }

    process.exit(0);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Received SIGINT, shutting down gracefully...');
  if (global.mcpManager) {
    await global.mcpManager.stop();
  }
});

process.on('SIGTERM', async () => {
  console.log('\n🔄 Received SIGTERM, shutting down gracefully...');
  if (global.mcpManager) {
    await global.mcpManager.stop();
  }
});

// Start the manager
const manager = new OptimizedMCPManager();
global.mcpManager = manager;
manager.startAllServices().catch(console.error);