#!/usr/bin/env node

/**
 * MCP Performance Monitor
 * 
 * Real-time performance monitoring and optimization for MCP services
 */

import { performance } from 'perf_hooks';
import fs from 'fs';
import path from 'path';

class MCPPerformanceMonitor {
  constructor () {
    this.metrics = {
      requests: 0,
      errors: 0,
      avgResponseTime: 0,
      memoryUsage: 0,
      cpuUsage: 0
    };
    this.services = [
      { name: 'Main Server', port: 8078, url: 'http://localhost:8078' },
      { name: 'File Server', port: 8079, url: 'http://localhost:8079' },
      { name: 'DB Server', port: 8080, url: 'http://localhost:8080' }
    ];
  }

  async checkServiceHealth(service) {
    const startTime = performance.now();

    try {
      const response = await fetch(`${service.url}/health`, {
        timeout: 5000
      });

      const endTime = performance.now();
      const responseTime = endTime - startTime;

      return {
        name: service.name,
        port: service.port,
        status: response.ok ? '✅ Healthy' : '⚠️  Warning',
        responseTime: `${responseTime.toFixed(2)}ms`,
        statusCode: response.status
      };
    } catch (error) {
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      return {
        name: service.name,
        port: service.port,
        status: '❌ Down',
        responseTime: `${responseTime.toFixed(2)}ms`,
        error: error.message
      };
    }
  }

  async runPerformanceTest() {
    console.log('🔍 Running MCP Performance Analysis...\n');

    const results = [];

    for (const service of this.services) {
      const result = await this.checkServiceHealth(service);
      results.push(result);
    }

    this.displayResults(results);
    this.generateOptimizationRecommendations(results);
  }

  displayResults(results) {
    console.log('📊 MCP Services Performance Report');
    console.log('='.repeat(60));

    results.forEach(result => {
      console.log(`${result.name.padEnd(15)} | ${result.status.padEnd(12)} | ${result.responseTime.padEnd(10)} | Port: ${result.port}`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    });

    console.log('\n');
  }

  generateOptimizationRecommendations(results) {
    console.log('💡 Performance Optimization Recommendations:');
    console.log('-'.repeat(50));

    const healthyServices = results.filter(r => r.status.includes('Healthy'));
    const downServices = results.filter(r => r.status.includes('Down'));
    const slowServices = results.filter(r => {
      const time = parseFloat(r.responseTime);
      return time > 1000; // Slower than 1 second
    });

    if (healthyServices.length === results.length) {
      console.log('✅ All services are running optimally!');
    }

    if (downServices.length > 0) {
      console.log('🚨 Critical Issues:');
      downServices.forEach(service => {
        console.log(`   - ${service.name} is down - restart required`);
      });
    }

    if (slowServices.length > 0) {
      console.log('⚠️  Performance Issues:');
      slowServices.forEach(service => {
        console.log(`   - ${service.name} response time: ${service.responseTime} (consider optimization)`);
      });
    }

    console.log('\n🔧 Optimization Commands:');
    console.log('npm run mcp:restart     - Restart all services');
    console.log('npm run mcp:optimize    - Apply performance optimizations');
    console.log('node scripts/mcp-optimized-start.js - Start with high-performance mode');
  }

  async generatePerformanceReport() {
    const report = {
      timestamp: new Date().toISOString(),
      services: [],
      summary: {
        totalServices: this.services.length,
        healthyServices: 0,
        avgResponseTime: 0
      }
    };

    for (const service of this.services) {
      const result = await this.checkServiceHealth(service);
      report.services.push(result);

      if (result.status.includes('Healthy')) {
        report.summary.healthyServices++;
      }
    }

    const responseTimes = report.services
      .map(s => parseFloat(s.responseTime))
      .filter(t => !isNaN(t));

    report.summary.avgResponseTime = responseTimes.length > 0
      ? (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(2)
      : 0;

    // Save report
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const reportPath = path.join(reportsDir, `mcp-performance-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`📄 Performance report saved to: ${reportPath}`);

    return report;
  }
}

// Run performance monitoring
const monitor = new MCPPerformanceMonitor();

if (process.argv.includes('--report')) {
  monitor.generatePerformanceReport().catch(console.error);
} else {
  monitor.runPerformanceTest().catch(console.error);
}