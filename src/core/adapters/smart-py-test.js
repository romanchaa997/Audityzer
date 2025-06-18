/**
 * SmartPyTest - Python-based framework for comprehensive smart contract testing
 * Provides Python bindings for testing smart contracts with integration to Audityzer
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class SmartPyTest {
  constructor(config = {}) {
    this.config = {
      pythonPath: 'python3',
      smartPyPath: path.join(process.cwd(), 'scripts', 'smartpy-cli'),
      outputDir: path.join(process.cwd(), 'test-results', 'smartpy'),
      templatesDir: path.join(process.cwd(), 'templates', 'smartpy'),
      networkConfig: {},
      logLevel: 'info',
      ...config,
    };

    this.initialized = false;
    this.testScripts = {};
    this.testResults = [];
  }

  /**
   * Initialize the SmartPyTest framework
   */
  async initialize() {
    try {
      // Create output directory if it doesn't exist
      if (!fs.existsSync(this.config.outputDir)) {
        fs.mkdirSync(this.config.outputDir, { recursive: true });
      }

      // Check if Python is installed
      await this._checkPythonInstallation();

      // Check if SmartPy CLI is installed
      await this._checkSmartPyInstallation();

      // Load test templates
      await this._loadTestTemplates();

      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize SmartPyTest:', error);
      return false;
    }
  }

  /**
   * Check if Python is installed and available
   */
  async _checkPythonInstallation() {
    return new Promise((resolve, reject) => {
      const python = spawn(this.config.pythonPath, ['--version']);

      let output = '';
      python.stdout.on('data', data => {
        output += data.toString();
      });

      python.stderr.on('data', data => {
        output += data.toString();
      });

      python.on('close', code => {
        if (code === 0) {
          // console.log(`Python detected: ${output.trim()}`);
          resolve(true);
        } else {
          reject(
            new Error("Python not found. Please install Python 3.7+ and ensure it's in your PATH.")
          );
        }
      });
    });
  }

  /**
   * Check if SmartPy CLI is installed
   */
  async _checkSmartPyInstallation() {
    // If SmartPy path doesn't exist, download it
    if (!fs.existsSync(this.config.smartPyPath)) {
      // console.log('SmartPy CLI not found. Downloading...');
      await this._downloadSmartPy();
    }

    return new Promise((resolve, reject) => {
      // Try to run SmartPy CLI
      const smartpy = spawn(this.config.pythonPath, [
        path.join(this.config.smartPyPath, 'SmartPy.py'),
        '--version',
      ]);

      let output = '';
      smartpy.stdout.on('data', data => {
        output += data.toString();
      });

      smartpy.stderr.on('data', data => {
        output += data.toString();
      });

      smartpy.on('close', code => {
        if (code === 0) {
          // console.log(`SmartPy detected: ${output.trim()}`);
          resolve(true);
        } else {
          reject(new Error('SmartPy CLI not working correctly. Please check your installation.'));
        }
      });
    });
  }

  /**
   * Download SmartPy CLI if not present
   */
  async _downloadSmartPy() {
    return new Promise((resolve, reject) => {
      // Create scripts directory if it doesn't exist
      const scriptsDir = path.dirname(this.config.smartPyPath);
      if (!fs.existsSync(scriptsDir)) {
        fs.mkdirSync(scriptsDir, { recursive: true });
      }

      // Download SmartPy CLI installer
      const installerUrl = 'https://smartpy.io/cli/install.sh';
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'smartpy-'));
      const installerPath = path.join(tempDir, 'install.sh');

      const wget = spawn('curl', ['-o', installerPath, installerUrl]);

      wget.on('close', code => {
        if (code !== 0) {
          reject(new Error('Failed to download SmartPy installer'));
          return;
        }

        // Run the installer
        const installer = spawn('bash', [installerPath, this.config.smartPyPath]);

        installer.stdout.on('data', data => {
          // console.log(`SmartPy Installer: ${data.toString().trim()}`);
        });

        installer.stderr.on('data', data => {
          console.error(`SmartPy Installer Error: ${data.toString().trim()}`);
        });

        installer.on('close', code => {
          if (code === 0) {
            // console.log('SmartPy installed successfully');
            resolve(true);
          } else {
            reject(new Error('Failed to install SmartPy'));
          }

          // Cleanup
          fs.rmSync(tempDir, { recursive: true, force: true });
        });
      });
    });
  }

  /**
   * Load test templates from the templates directory
   */
  async _loadTestTemplates() {
    if (!fs.existsSync(this.config.templatesDir)) {
      fs.mkdirSync(this.config.templatesDir, { recursive: true });

      // Create sample templates
      this._createSampleTemplates();
    }

    // Load templates
    const templateFiles = fs
      .readdirSync(this.config.templatesDir)
      .filter(file => file.endsWith('.py'));

    for (const file of templateFiles) {
      const templateName = path.basename(file, '.py');
      const templatePath = path.join(this.config.templatesDir, file);

      this.testScripts[templateName] = {
        path: templatePath,
        content: fs.readFileSync(templatePath, 'utf8'),
      };
    }

    // console.log(`Loaded ${Object.keys(this.testScripts).length} test templates`);
    return this.testScripts;
  }

  /**
   * Create sample templates for testing
   */
  _createSampleTemplates() {
    // Basic ERC20 token test
    const erc20TestPath = path.join(this.config.templatesDir, 'erc20_token_test.py');
    const erc20Test = `
import smartpy as sp

class ERC20Token(sp.Contract):
    def __init__(self, admin, totalSupply):
        self.init(
            balances = sp.big_map({admin: totalSupply}),
            allowances = sp.big_map(),
            totalSupply = totalSupply,
            admin = admin
        )

    @sp.entry_point
    def transfer(self, params):
        sp.verify(self.data.balances.get(sp.sender, sp.tez(0)) >= params.value, "Insufficient balance")
        self.data.balances[sp.sender] = sp.as_nat(self.data.balances.get(sp.sender, sp.tez(0)) - params.value)
        self.data.balances[params.to] = self.data.balances.get(params.to, sp.tez(0)) + params.value

    @sp.entry_point
    def approve(self, params):
        self.data.allowances[sp.pair(sp.sender, params.spender)] = params.value

    @sp.entry_point
    def transferFrom(self, params):
        sp.verify(self.data.allowances.get(sp.pair(params.from_, sp.sender), sp.tez(0)) >= params.value, "Insufficient allowance")
        sp.verify(self.data.balances.get(params.from_, sp.tez(0)) >= params.value, "Insufficient balance")
        self.data.balances[params.from_] = sp.as_nat(self.data.balances.get(params.from_, sp.tez(0)) - params.value)
        self.data.balances[params.to] = self.data.balances.get(params.to, sp.tez(0)) + params.value
        self.data.allowances[sp.pair(params.from_, sp.sender)] = sp.as_nat(self.data.allowances.get(sp.pair(params.from_, sp.sender), sp.tez(0)) - params.value)

@sp.add_test(name = "ERC20 Token")
def test():
    scenario = sp.test_scenario()
    scenario.h1("ERC20 Token Test")
    
    # Initialize accounts
    admin = sp.test_account("Administrator")
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")
    
    # Initialize contract
    totalSupply = sp.nat(1000000)
    contract = ERC20Token(admin.address, totalSupply)
    scenario += contract
    
    # Test transfer
    scenario.h2("Test transfer")
    scenario += contract.transfer(to = alice.address, value = 100).run(sender = admin)
    scenario.verify(contract.data.balances[alice.address] == 100)
    scenario.verify(contract.data.balances[admin.address] == 999900)
    
    # Test approve and transferFrom
    scenario.h2("Test approve and transferFrom")
    scenario += contract.approve(spender = bob.address, value = 50).run(sender = alice)
    scenario += contract.transferFrom(from_ = alice.address, to = bob.address, value = 30).run(sender = bob)
    scenario.verify(contract.data.balances[alice.address] == 70)
    scenario.verify(contract.data.balances[bob.address] == 30)
    scenario.verify(contract.data.allowances[sp.pair(alice.address, bob.address)] == 20)
    
    # Test error cases
    scenario.h2("Test error cases")
    scenario += contract.transfer(to = bob.address, value = 1000).run(sender = alice, valid = False)
    scenario += contract.transferFrom(from_ = alice.address, to = admin.address, value = 30).run(sender = bob, valid = False)
`;
    fs.writeFileSync(erc20TestPath, erc20Test);

    // DEX test
    const dexTestPath = path.join(this.config.templatesDir, 'dex_test.py');
    const dexTest = `
import smartpy as sp

class DEX(sp.Contract):
    def __init__(self, admin, token_address):
        self.init(
            admin = admin,
            token_address = token_address,
            liquidity_pool = sp.tez(0),
            token_pool = sp.nat(0),
            liquidity_providers = sp.big_map(),
            fee = sp.nat(30)  # 0.3% fee
        )

    @sp.entry_point
    def add_liquidity(self, params):
        sp.set_type(params.token_amount, sp.TNat)
        
        token_contract = sp.contract(
            sp.TRecord(from_ = sp.TAddress, to = sp.TAddress, value = sp.TNat),
            self.data.token_address,
            entry_point = "transferFrom").open_some()
            
        sp.transfer(
            sp.record(from_ = sp.sender, to = sp.self_address, value = params.token_amount),
            sp.mutez(0),
            token_contract)
            
        liquidity_minted = sp.nat(0)
        if self.data.liquidity_pool == sp.tez(0):
            liquidity_minted = sp.as_nat(sp.amount)
        else:
            liquidity_minted = sp.as_nat(sp.amount * self.data.token_pool / self.data.liquidity_pool)
            
        self.data.liquidity_providers[sp.sender] = self.data.liquidity_providers.get(
            sp.sender, sp.nat(0)) + liquidity_minted
        self.data.liquidity_pool += sp.amount
        self.data.token_pool += params.token_amount

    @sp.entry_point
    def remove_liquidity(self, params):
        sp.set_type(params.liquidity_amount, sp.TNat)
        
        sp.verify(self.data.liquidity_providers.get(sp.sender, sp.nat(0)) >= params.liquidity_amount,
                 "Insufficient liquidity")
                 
        token_amount = sp.as_nat(params.liquidity_amount * self.data.token_pool / self.data.liquidity_pool)
        tez_amount = sp.as_nat(params.liquidity_amount * self.data.liquidity_pool / self.data.liquidity_pool)
        
        token_contract = sp.contract(
            sp.TRecord(to = sp.TAddress, value = sp.TNat),
            self.data.token_address,
            entry_point = "transfer").open_some()
            
        sp.transfer(
            sp.record(to = sp.sender, value = token_amount),
            sp.mutez(0),
            token_contract)
            
        sp.send(sp.sender, sp.utils.nat_to_mutez(tez_amount))
        
        self.data.liquidity_providers[sp.sender] = sp.as_nat(
            self.data.liquidity_providers.get(sp.sender, sp.nat(0)) - params.liquidity_amount)
        self.data.liquidity_pool = sp.as_nat(self.data.liquidity_pool - sp.utils.nat_to_mutez(tez_amount))
        self.data.token_pool = sp.as_nat(self.data.token_pool - token_amount)

    @sp.entry_point
    def swap_tez_to_token(self, params):
        sp.set_type(params.min_tokens, sp.TNat)
        
        input_amount = sp.as_nat(sp.amount)
        input_amount_with_fee = sp.as_nat(input_amount * sp.as_nat(1000 - self.data.fee))
        tokens_bought = sp.as_nat(input_amount_with_fee * self.data.token_pool / 
                                 (self.data.liquidity_pool * 1000 + input_amount_with_fee))
                                 
        sp.verify(tokens_bought >= params.min_tokens, "Slippage limit exceeded")
        
        token_contract = sp.contract(
            sp.TRecord(to = sp.TAddress, value = sp.TNat),
            self.data.token_address,
            entry_point = "transfer").open_some()
            
        sp.transfer(
            sp.record(to = sp.sender, value = tokens_bought),
            sp.mutez(0),
            token_contract)
            
        self.data.liquidity_pool += sp.amount
        self.data.token_pool = sp.as_nat(self.data.token_pool - tokens_bought)

@sp.add_test(name = "DEX Test")
def test():
    scenario = sp.test_scenario()
    scenario.h1("DEX Test")
    
    # Initialize accounts
    admin = sp.test_account("Administrator")
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")
    
    # Create token contract
    token = ERC20Token(admin.address, sp.nat(1000000))
    scenario += token
    
    # Create DEX contract
    dex = DEX(admin.address, token.address)
    scenario += dex
    
    # Transfer tokens to users
    scenario += token.transfer(to = alice.address, value = 10000).run(sender = admin)
    scenario += token.transfer(to = bob.address, value = 10000).run(sender = admin)
    
    # Approve DEX to transfer tokens
    scenario += token.approve(spender = dex.address, value = 5000).run(sender = alice)
    
    # Add liquidity
    scenario.h2("Add Liquidity")
    scenario += dex.add_liquidity(token_amount = 5000).run(sender = alice, amount = sp.tez(5))
    scenario.verify(dex.data.liquidity_pool == sp.tez(5))
    scenario.verify(dex.data.token_pool == 5000)
    scenario.verify(dex.data.liquidity_providers[alice.address] == 5000000)
    
    # Swap tez to token
    scenario.h2("Swap TEZ to Token")
    scenario += dex.swap_tez_to_token(min_tokens = 900).run(sender = bob, amount = sp.tez(1))
    
    # Check results
    scenario.verify(dex.data.liquidity_pool > sp.tez(5))
    scenario.verify(dex.data.token_pool < 5000)
    scenario.verify(token.data.balances[bob.address] > 10000)
`;
    fs.writeFileSync(dexTestPath, dexTest);
  }

  /**
   * Create a new test from a template
   */
  async createTest(templateName, testName, parameters = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    if (!this.testScripts[templateName]) {
      throw new Error(`Template '${templateName}' not found`);
    }

    let testContent = this.testScripts[templateName].content;

    // Replace template parameters
    for (const [key, value] of Object.entries(parameters)) {
      const placeholder = `{{${key}}}`;
      testContent = testContent.replace(new RegExp(placeholder, 'g'), value);
    }

    // Save the test file
    const testPath = path.join(this.config.outputDir, `${testName}.py`);
    fs.writeFileSync(testPath, testContent);

    return {
      name: testName,
      path: testPath,
      content: testContent,
    };
  }

  /**
   * Run a SmartPy test
   */
  async runTest(testName, options = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    const testPath = path.join(this.config.outputDir, `${testName}.py`);
    if (!fs.existsSync(testPath)) {
      throw new Error(`Test '${testName}' not found at ${testPath}`);
    }

    const outputPath = path.join(this.config.outputDir, testName);
    const args = [
      path.join(this.config.smartPyPath, 'SmartPy.py'),
      'test',
      testPath,
      outputPath,
      '--html',
    ];

    if (options.protocol) {
      args.push('--protocol');
      args.push(options.protocol);
    }

    if (options.verbose) {
      args.push('--verbose');
    }

    // console.log(`Running SmartPy test: ${testName}`);
    // console.log(`Command: ${this.config.pythonPath} ${args.join(' ')}`);

    return new Promise((resolve, reject) => {
      const smartpy = spawn(this.config.pythonPath, args);

      let output = '';
      let errorOutput = '';

      smartpy.stdout.on('data', data => {
        const text = data.toString();
        output += text;
        if (this.config.logLevel !== 'quiet') {
          // console.log(`[SmartPyTest] ${text.trim()}`);
        }
      });

      smartpy.stderr.on('data', data => {
        const text = data.toString();
        errorOutput += text;
        console.error(`[SmartPyTest Error] ${text.trim()}`);
      });

      smartpy.on('close', code => {
        const result = {
          testName,
          success: code === 0,
          output,
          errorOutput,
          exitCode: code,
          htmlReport: path.join(outputPath, 'index.html'),
        };

        // Parse test results if successful
        if (code === 0) {
          // In a real implementation, we would parse the output to extract detailed test results
          result.details = this._parseTestResults(outputPath);
        }

        this.testResults.push(result);

        if (code === 0) {
          resolve(result);
        } else {
          reject(new Error(`Test '${testName}' failed with exit code ${code}`));
        }
      });
    });
  }

  /**
   * Run all tests in the output directory
   */
  async runAllTests(options = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    const testFiles = fs.readdirSync(this.config.outputDir).filter(file => file.endsWith('.py'));

    const results = [];

    for (const file of testFiles) {
      const testName = path.basename(file, '.py');
      try {
        const result = await this.runTest(testName, options);
        results.push(result);
      } catch (error) {
        console.error(`Failed to run test '${testName}':`, error);
        results.push({
          testName,
          success: false,
          error: error.message,
        });
      }
    }

    return results;
  }

  /**
   * Parse SmartPy test results
   */
  _parseTestResults(outputPath) {
    try {
      // In a real implementation, we would parse the output files
      // to extract detailed test results. This is a simplified version.
      const scenarioPath = path.join(outputPath, 'scenario.json');

      if (fs.existsSync(scenarioPath)) {
        const scenarioData = JSON.parse(fs.readFileSync(scenarioPath, 'utf8'));

        return {
          scenarioName: scenarioData.name || 'Unknown',
          blocks: scenarioData.blocks || [],
          success: true,
        };
      }

      return {
        success: true,
        message: 'Test completed successfully, but no scenario data found.',
      };
    } catch (error) {
      console.error('Failed to parse test results:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Generate a test summary report
   */
  generateReport() {
    const passedTests = this.testResults.filter(test => test.success).length;
    const failedTests = this.testResults.length - passedTests;

    const report = {
      summary: {
        total: this.testResults.length,
        passed: passedTests,
        failed: failedTests,
        passRate:
          this.testResults.length > 0
            ? Math.round((passedTests / this.testResults.length) * 100)
            : 0,
      },
      tests: this.testResults.map(test => ({
        name: test.testName,
        success: test.success,
        exitCode: test.exitCode,
        htmlReport: test.htmlReport,
      })),
    };

    // Save report to file
    const reportPath = path.join(this.config.outputDir, 'report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    return {
      report,
      path: reportPath,
    };
  }
}

module.exports = SmartPyTest;
