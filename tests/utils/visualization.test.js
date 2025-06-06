/**
 * Tests for AA Dashboard Visualization
 * 
 * This tests the dashboard generation functionality
 */
const { describe, it, expect } = require('jest');
const fs = require('fs-extra');
const path = require('path');
const { AADashboardGenerator } = require("../src/core/visualization/aa-dashboard');

// Mock sample test results
const mockResults = {
  success: true,
  timestamp: '2023-06-15T12:00:00Z',
  chain: 'ethereum',
  target: 'test-target',
  addon: 'social-recovery',
  tests: {
    'social-recovery': {
      success: true,
      tests: {
        'setup': {
          success: true,
          notes: 'Successfully set up guardians'
        },
        'recovery': {
          success: true,
          notes: 'Successfully executed recovery flow'
        },
        'threshold': {
          success: false,
          notes: 'Failed to change threshold',
          error: 'Not enough permissions'
        }
      },
      summary: {
        pass: 2,
        total: 3,
        passRate: '67%'
      }
    }
  },
  vulnerabilities: [
    {
      type: 'RECOVERY_BYPASS',
      severity: 'high',
      description: 'Recovery can be bypassed by manipulating timestamps'
    },
    {
      type: 'GUARDIAN_COLLUSION',
      severity: 'medium',
      description: 'Guardians can potentially collude to take over the account'
    }
  ],
  gasData: {
    standard: {
      maxFeePerGas: '1500000000',
      maxPriorityFeePerGas: '1000000000'
    },
    fast: {
      maxFeePerGas: '3000000000',
      maxPriorityFeePerGas: '2000000000'
    }
  },
  recommendations: [
    'Implement time-locking for recovery operations',
    'Add additional verification steps for guardian actions',
    'Consider increasing the guardian threshold'
  ]
};

describe('AADashboardGenerator', () => {
  it('should properly initialize with default options', () => {
    const generator = new AADashboardGenerator();
    expect(generator.theme).toBe('light');
    expect(generator.outputDir).toContain('reports/dashboards');
  });
  
  it('should properly initialize with custom options', () => {
    const generator = new AADashboardGenerator({
      theme: 'dark',
      outputDir: './custom-dir'
    });
    expect(generator.theme).toBe('dark');
    expect(generator.outputDir).toBe('./custom-dir');
  });
  
  it('should generate dashboard assets', async () => {
    // Create a temporary directory for testing
    const tempDir = path.join(__dirname, '../../temp/dashboard-test');
    await fs.ensureDir(tempDir);
    
    const generator = new AADashboardGenerator({
      outputDir: tempDir
    });
    
    // Generate assets with mock results
    const assets = await generator.generateAssets(mockResults);
    
    // Verify that assets were generated
    expect(assets.summaryChart).toBeDefined();
    expect(assets.summaryChart.file).toBeDefined();
    expect(fs.existsSync(path.join(tempDir, assets.summaryChart.file))).toBe(true);
    
    // Gas chart should be generated if gasData is present
    expect(assets.gasChart).toBeDefined();
    expect(fs.existsSync(path.join(tempDir, assets.gasChart.file))).toBe(true);
    
    // Check if addon chart was generated
    expect(assets.addonChart).toBeDefined();
    expect(fs.existsSync(path.join(tempDir, assets.addonChart.file))).toBe(true);
    
    // Check if vulnerabilities chart was generated
    expect(assets.vulnerabilityChart).toBeDefined();
    expect(fs.existsSync(path.join(tempDir, assets.vulnerabilityChart.file))).toBe(true);
    
    // Clean up temporary directory
    await fs.remove(tempDir);
  });
  
  it('should generate full dashboard', async () => {
    // Create a temporary directory for testing
    const tempDir = path.join(__dirname, '../../temp/dashboard-test');
    await fs.ensureDir(tempDir);
    
    const generator = new AADashboardGenerator({
      outputDir: tempDir
    });
    
    // Generate dashboard with mock results
    const dashboard = await generator.generateDashboard(mockResults, {
      name: 'test-dashboard',
      title: 'Test Dashboard'
    });
    
    // Verify dashboard files were generated
    expect(dashboard.html).toBeDefined();
    expect(fs.existsSync(dashboard.html)).toBe(true);
    
    expect(dashboard.json).toBeDefined();
    expect(fs.existsSync(dashboard.json)).toBe(true);
    
    // Verify dashboard HTML content
    const htmlContent = await fs.readFile(dashboard.html, 'utf8');
    expect(htmlContent).toContain('Test Dashboard');
    expect(htmlContent).toContain('social-recovery');
    expect(htmlContent).toContain('RECOVERY_BYPASS');
    
    // Clean up temporary directory
    await fs.remove(tempDir);
  });
}); 