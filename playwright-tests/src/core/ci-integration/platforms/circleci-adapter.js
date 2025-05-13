/**
 * Mock CircleCI Adapter for Playwright tests
 */

const path = require('path');
const fs = require('fs');

/**
 * Class representing a CircleCI CI/CD adapter
 */
class CircleCIAdapter {
  constructor(config = {}) {
    this.config = {
      orbVersion: '1.0.0',
      includeSecurityChecks: true,
      nodeVersion: '16.14.0',
      ...config
    };
  }

  /**
   * Generate CircleCI configuration
   */
  generateConfig() {
    const config = {
      version: 2.1,
      orbs: {
        node: 'circleci/node@5.0.2',
      },
      jobs: {
        build: {
          docker: [
            {
              image: `cimg/node:${this.config.nodeVersion}`,
            },
          ],
          steps: [
            'checkout',
            {
              run: {
                name: 'Install dependencies',
                command: 'npm ci',
              },
            },
            {
              run: {
                name: 'Run tests',
                command: 'npm test',
              },
            },
          ],
        },
      },
      workflows: {
        version: 2,
        main: {
          jobs: ['build'],
        },
      },
    };

    // Add security checks if requested
    if (this.config.includeSecurityChecks) {
      config.jobs.security_scan = {
        docker: [
          {
            image: `cimg/node:${this.config.nodeVersion}`,
          },
        ],
        steps: [
          'checkout',
          {
            run: {
              name: 'Install dependencies',
              command: 'npm ci',
            },
          },
          {
            run: {
              name: 'Run security checks',
              command: 'npm run security-check',
            },
          },
        ],
      };
      
      config.workflows.main.jobs.push('security_scan');
    }

    return config;
  }

  /**
   * Write configuration to file
   */
  writeConfigToFile(outputPath) {
    const config = this.generateConfig();
    const yaml = JSON.stringify(config, null, 2); // Mock YAML conversion
    
    // Create directory if it doesn't exist
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Mock file writing (we're not actually writing in this mock)
    console.log(`Mock writing CircleCI config to ${outputPath}`);
    
    return true;
  }
}

module.exports = CircleCIAdapter; 