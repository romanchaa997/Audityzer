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
    console.log(chalk.blue('🔥 Firebase Configuration Helper\n'));

    try {
      // Check if config already exists
      if (await fs.pathExists(this.configPath)) {
        console.log(chalk.yellow('⚠️  Firebase config already exists at .firebase-config.json'));
        const answer = await this.question('Do you want to overwrite it? (y/N): ');
        if (!answer.toLowerCase().startsWith('y')) {
          console.log(chalk.gray('Setup cancelled.'));
          return;
        }
      }

      // Create simplified config
      const config = await this.createSimplifiedConfig();
      
      // Write config file
      await fs.writeJSON(this.configPath, config, { spaces: 2 });
      
      console.log(chalk.green('✅ Firebase configuration created!'));
      console.log(chalk.blue(`📁 Config saved to: ${this.configPath}`));
      
      // Show next steps
      this.showNextSteps();
      
    } catch (error) {
      console.error(chalk.red(`❌ Error setting up Firebase: ${error.message}`));
      process.exit(1);
    }
  }

  async createSimplifiedConfig() {
    console.log(chalk.cyan('Please provide your Firebase project details:\n'));

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
    console.log(chalk.blue.bold('\n📋 Next Steps:\n'));
    
    console.log(chalk.white('1.'), 'Verify your Firebase project settings in the console');
    console.log(chalk.white('2.'), 'Enable Firestore Database in your Firebase project');
    console.log(chalk.white('3.'), 'Set up authentication rules (optional)');
    console.log(chalk.white('4.'), 'Test the connection:');
    console.log(chalk.gray('   npm run firebase:test'));
    
    console.log(chalk.blue('\n💡 Configuration Tips:'));
    console.log(chalk.gray('• Keep your API key secure and never commit it to public repos'));
    console.log(chalk.gray('• Use Firebase security rules to protect your data'));
    console.log(chalk.gray('• Enable auto-upload in config for continuous reporting'));
    
    console.log(chalk.blue('\n🔧 Audityzer Integration:'));
    console.log(chalk.gray('• Reports will be stored in the "security-reports" collection'));
    console.log(chalk.gray('• Use --upload flag to send results to Firebase'));
    console.log(chalk.gray('• Configure auto-upload in audityzer.config.js'));
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
    
    console.log(chalk.blue('📝 Example config created at .firebase-config.example.json'));
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
      
      console.log(chalk.blue('🔍 Testing Firebase connection...'));
      
      // Basic validation
      const required = ['projectId', 'apiKey', 'authDomain'];
      const missing = required.filter(field => !config[field]);
      
      if (missing.length > 0) {
        console.error(chalk.red(`❌ Missing required fields: ${missing.join(', ')}`));
        return;
      }

      console.log(chalk.green('✅ Firebase configuration is valid'));
      console.log(chalk.blue(`📁 Project: ${config.projectId}`));
      console.log(chalk.blue(`🔗 Auth Domain: ${config.authDomain}`));
      
      if (config.audityzer) {
        console.log(chalk.blue(`📊 Collection: ${config.audityzer.collection}`));
        console.log(chalk.blue(`🔄 Auto-upload: ${config.audityzer.autoUpload ? 'Enabled' : 'Disabled'}`));
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
      console.log(chalk.blue('Firebase Configuration Helper\n'));
      console.log('Usage:');
      console.log('  node firebase-setup.js setup   - Interactive setup');
      console.log('  node firebase-setup.js example - Create example config');
      console.log('  node firebase-setup.js test    - Test connection');
  }
}

module.exports = FirebaseSetup;
