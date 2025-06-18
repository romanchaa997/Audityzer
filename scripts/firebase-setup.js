#!/usr/bin/env node

/**
 * Firebase Configuration Simplifier
 * Reduces Firebase setup complexity for Audityzer
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

class FirebaseSetup {
  constructor() {
    this.configPath = path.join(process.cwd(), '.firebase-config.json');
    this.examplePath = path.join(process.cwd(), '.firebase-config.example.json');
  }

  async simplifySetup() {

    try {
      // Check if config already exists
      if (await fs.pathExists(this.configPath)) {
        const answer = await this.question('Do you want to overwrite it? (y/N): ');
        if (!answer.toLowerCase().startsWith('y')) {
          return;
        }
      }

      // Create simplified config
      const config = await this.createSimplifiedConfig();
      
      // Write config file
      await fs.writeJSON(this.configPath, config, { spaces: 2 });
      
      
      // Show next steps
      this.showNextSteps();
      
    } catch (error) {
      console.error(chalk.red(`❌ Error setting up Firebase: ${error.message}`));
      process.exit(1);
    }
  }

  async createSimplifiedConfig() {

    const projectId = await this.question('Project ID: ');
    const apiKey = await this.question('API Key: ');
    
    // Optional fields with defaults
    const authDomain = await this.question(`Auth Domain (${projectId}.firebaseapp.com): `) || `${projectId}.firebaseapp.com`;
    const storageBucket = await this.question(`Storage Bucket (${projectId}.appspot.com): `) || `${projectId}.appspot.com`;

    return {
      projectId: projectId.trim(),
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim(),
      storageBucket: storageBucket.trim(),
      // Simplified - only essential fields
      messagingSenderId: "123456789",
      appId: "1:123456789:web:abcdef123456",
      // Audityzer-specific settings
      audityzer: {
        collection: "security-reports",
        enableRealtime: true,
        autoUpload: false
      }
    };
  }

  showNextSteps() {
    
    
    
  }

  question(prompt) {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question(chalk.cyan(prompt), (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  // Create example config for reference
  static async createExample() {
    const exampleConfig = {
      "projectId": "your-firebase-project-id",
      "apiKey": "your-firebase-api-key",
      "authDomain": "your-project-id.firebaseapp.com",
      "storageBucket": "your-project-id.appspot.com",
      "messagingSenderId": "123456789",
      "appId": "1:123456789:web:abcdef123456",
      "audityzer": {
        "collection": "security-reports",
        "enableRealtime": true,
        "autoUpload": false
      }
    };

    const examplePath = path.join(process.cwd(), '.firebase-config.example.json');
    await fs.writeJSON(examplePath, exampleConfig, { spaces: 2 });
    
  }

  // Test Firebase connection
  static async testConnection() {
    try {
      const configPath = path.join(process.cwd(), '.firebase-config.json');
      
      if (!await fs.pathExists(configPath)) {
        console.error(chalk.red('❌ No Firebase config found. Run firebase:setup first.'));
        return;
      }

      const config = await fs.readJSON(configPath);
      
      
      // Basic validation
      const required = ['projectId', 'apiKey', 'authDomain'];
      const missing = required.filter(field => !config[field]);
      
      if (missing.length > 0) {
        console.error(chalk.red(`❌ Missing required fields: ${missing.join(', ')}`));
        return;
      }

      
      if (config.audityzer) {
      }

    } catch (error) {
      console.error(chalk.red(`❌ Error testing Firebase connection: ${error.message}`));
    }
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'setup':
      const setup = new FirebaseSetup();
      setup.simplifySetup();
      break;
    case 'example':
      FirebaseSetup.createExample();
      break;
    case 'test':
      FirebaseSetup.testConnection();
      break;
    default:
  }
}

module.exports = FirebaseSetup;
