/**
 * MetaMask Interface Fuzzer
 * This module systematically tests MetaMask interfaces for edge cases and security vulnerabilities
 */

import { ethers } from 'ethers';

// Utility function to generate random hex string of specified length
function randomHex(length) {
  return '0x' + [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

// Utility function to generate random address
function randomAddress() {
  return randomHex(40);
}

// Utility function to generate random value
function randomValue() {
  const rand = Math.floor(Math.random() * 1000000);
  return '0x' + rand.toString(16);
}

// Utility function to generate random data
function randomData(length = 10) {
  return randomHex(length * 2);
}

// Utility to generate malformed parameters
function generateMalformedParams() {
  const paramTypes = [
    // Valid but unusual values
    { to: randomAddress(), value: randomValue(), gas: '0x0' },
    { to: randomAddress(), value: '0x0', gasPrice: '0xffffffffffffffff' },
    { to: randomAddress(), gas: '0x1', data: randomData(1000) },

    // Malformed values
    { to: 'not-an-address', value: randomValue() },
    { to: randomAddress(), value: 'not-hex-value' },
    { to: randomAddress(), value: '0x' + 'f'.repeat(100) },

    // Missing required fields
    { value: randomValue() },
    { to: randomAddress() },
    { data: randomData() },

    // Mixed case and checksummed addresses
    { to: randomAddress().toLowerCase(), value: randomValue() },
    { to: ethers.utils.getAddress(randomAddress().toLowerCase()), value: randomValue() },

    // Unusual extras
    { to: randomAddress(), value: randomValue(), nonStandardField: 'test' },
    { to: randomAddress(), value: randomValue(), from: randomAddress() }, // Override from

    // Zero value transactions with large data
    { to: randomAddress(), value: '0x0', data: randomData(5000) },

    // Nested fields
    { to: randomAddress(), value: randomValue(), nested: { field: 'value' } },

    // Arrays in fields
    { to: randomAddress(), value: randomValue(), arrayField: [1, 2, 3] },

    // Transactions to known problematic addresses
    { to: '0x0000000000000000000000000000000000000000', value: randomValue() }, // Zero address
    { to: '0x000000000000000000000000000000000000dEaD', value: randomValue() }, // Dead address
  ];

  return paramTypes[Math.floor(Math.random() * paramTypes.length)];
}

// Fuzzing class for MetaMask
export class MetaMaskFuzzer {
  constructor() {
    this.results = [];
    this.provider = window.ethereum;
    this.connected = false;
  }

  // Connect to wallet
  async connect() {
    try {
      if (!this.provider) {
        this.results.push({
          method: 'connect',
          success: false,
          error: 'No provider found',
          severity: 'High',
        });
        return false;
      }

      const accounts = await this.provider.request({
        method: 'eth_requestAccounts',
      });

      this.connected = accounts && accounts.length > 0;
      this.account = accounts[0];

      this.results.push({
        method: 'connect',
        success: this.connected,
        accounts,
      });

      return this.connected;
    } catch (error) {
      this.results.push({
        method: 'connect',
        success: false,
        error: error.message,
        severity: error.code === 4001 ? 'Low' : 'Medium', // 4001 is user rejected
      });
      return false;
    }
  }

  // Fuzz transaction sending
  async fuzzTransactions(iterations = 20) {
    if (!this.connected && !(await this.connect())) {
      return {
        success: false,
        error: 'Not connected to wallet',
      };
    }

    for (let i = 0; i < iterations; i++) {
      const params = generateMalformedParams();

      // Ensure from address is set to the connected account
      params.from = this.account;

      try {
        const result = await this.provider.request({
          method: 'eth_sendTransaction',
          params: [params],
        });

        this.results.push({
          method: 'eth_sendTransaction',
          params,
          success: true,
          result,
          iteration: i,
          note: 'Transaction accepted with potentially problematic parameters',
        });
      } catch (error) {
        // Expected behavior for invalid parameters
        this.results.push({
          method: 'eth_sendTransaction',
          params,
          success: false,
          error: error.message,
          code: error.code,
          iteration: i,
        });
      }
    }

    return this.results.filter(r => r.method === 'eth_sendTransaction');
  }

  // Fuzz message signing with various message formats
  async fuzzMessageSigning(iterations = 10) {
    if (!this.connected && !(await this.connect())) {
      return {
        success: false,
        error: 'Not connected to wallet',
      };
    }

    // Generate different message types to test
    const messages = [
      // Regular messages
      'Normal message',
      // Empty message
      '',
      // Very long message
      'a'.repeat(10000),
      // Messages with special characters
      'Message with \0 null bytes',
      'Unicode: 😁🔥⚠️',
      // JSON stringified data
      JSON.stringify({ foo: 'bar', baz: [1, 2, 3] }),
      // Binary data
      ethers.utils.hexlify(ethers.utils.randomBytes(100)),
      // Malformed UTF-8
      '\uD83D', // Unpaired surrogate
      // HTML/script content
      "<script>alert('XSS')</script>",
      // SQL injection attempt
      "' OR 1=1 --",
    ];

    for (let i = 0; i < iterations; i++) {
      const messageIndex = i % messages.length;
      const message = messages[messageIndex];
      const hexMessage =
        typeof message === 'string' && !message.startsWith('0x')
          ? ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
          : message;

      try {
        const signature = await this.provider.request({
          method: 'personal_sign',
          params: [hexMessage, this.account],
        });

        this.results.push({
          method: 'personal_sign',
          message: message.length > 100 ? message.substring(0, 100) + '...' : message,
          messageLength: message.length,
          success: true,
          signature,
          iteration: i,
        });
      } catch (error) {
        this.results.push({
          method: 'personal_sign',
          message: message.length > 100 ? message.substring(0, 100) + '...' : message,
          messageLength: message.length,
          success: false,
          error: error.message,
          code: error.code,
          iteration: i,
        });
      }
    }

    return this.results.filter(r => r.method === 'personal_sign');
  }

  // Fuzz EIP-712 typed data signing
  async fuzzTypedDataSigning(iterations = 5) {
    if (!this.connected && !(await this.connect())) {
      return {
        success: false,
        error: 'Not connected to wallet',
      };
    }

    // Generate different typed data structures to test
    const typedDataVariations = [
      // Standard EIP-712 data
      {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
          ],
          Test: [{ name: 'value', type: 'uint256' }],
        },
        primaryType: 'Test',
        domain: {
          name: 'Test',
          version: '1',
          chainId: 1,
          verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        },
        message: {
          value: 100,
        },
      },

      // Malformed: Missing required domain fields
      {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
          ],
          Test: [{ name: 'value', type: 'uint256' }],
        },
        primaryType: 'Test',
        domain: {
          name: 'Test',
          version: '1',
        },
        message: {
          value: 100,
        },
      },

      // Malformed: Type mismatch
      {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
          ],
          Test: [{ name: 'value', type: 'uint256' }],
        },
        primaryType: 'Test',
        domain: {
          name: 'Test',
          version: '1',
          chainId: 1,
          verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        },
        message: {
          value: 'not a number', // Type mismatch
        },
      },

      // Complex nested structures
      {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
          ],
          Person: [
            { name: 'name', type: 'string' },
            { name: 'wallet', type: 'address' },
          ],
          Mail: [
            { name: 'from', type: 'Person' },
            { name: 'to', type: 'Person' },
            { name: 'contents', type: 'string' },
            { name: 'attachments', type: 'Attachment[]' },
          ],
          Attachment: [
            { name: 'filename', type: 'string' },
            { name: 'size', type: 'uint256' },
          ],
        },
        primaryType: 'Mail',
        domain: {
          name: 'Complex Mail',
          version: '1',
          chainId: 1,
          verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        },
        message: {
          from: {
            name: 'Alice',
            wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
          },
          to: {
            name: 'Bob',
            wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
          },
          contents: 'Hello, Bob!',
          attachments: [
            {
              filename: 'attachment1.txt',
              size: 100,
            },
            {
              filename: 'attachment2.txt',
              size: 200,
            },
          ],
        },
      },

      // Array types that could cause issues
      {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
          ],
          ArrayTest: [
            { name: 'values', type: 'uint256[]' },
            { name: 'nestedArray', type: 'uint256[][]' },
          ],
        },
        primaryType: 'ArrayTest',
        domain: {
          name: 'Array Test',
          version: '1',
          chainId: 1,
          verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        },
        message: {
          values: Array(100).fill(1), // Large array
          nestedArray: [Array(50).fill(1), Array(50).fill(2)],
        },
      },
    ];

    for (let i = 0; i < iterations; i++) {
      const dataIndex = i % typedDataVariations.length;
      const typedData = typedDataVariations[dataIndex];

      try {
        const signature = await this.provider.request({
          method: 'eth_signTypedData_v4',
          params: [this.account, JSON.stringify(typedData)],
        });

        this.results.push({
          method: 'eth_signTypedData_v4',
          typedDataType: typedData.primaryType,
          success: true,
          signature,
          iteration: i,
        });
      } catch (error) {
        this.results.push({
          method: 'eth_signTypedData_v4',
          typedDataType: typedData.primaryType,
          success: false,
          error: error.message,
          code: error.code,
          iteration: i,
        });
      }
    }

    return this.results.filter(r => r.method === 'eth_signTypedData_v4');
  }

  // Fuzz chain switching behavior
  async fuzzChainSwitching(iterations = 5) {
    if (!this.connected && !(await this.connect())) {
      return {
        success: false,
        error: 'Not connected to wallet',
      };
    }

    // Test data: chainId values to test
    const chainIds = [
      '0x1', // Ethereum Mainnet
      '0x89', // Polygon
      '0xA', // Optimism
      '0xA86A', // Avalanche
      '0x38', // BSC
      '0x1234567890', // Non-existent chain with very large ID
      '0x0', // Invalid chainId
      'not-a-chain-id', // Invalid format
      '', // Empty string
      '0x' + 'f'.repeat(64), // Very large hex
    ];

    for (let i = 0; i < iterations; i++) {
      const chainIndex = i % chainIds.length;
      const chainId = chainIds[chainIndex];

      try {
        const result = await this.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        });

        this.results.push({
          method: 'wallet_switchEthereumChain',
          chainId,
          success: true,
          result,
          iteration: i,
        });
      } catch (error) {
        // Check if it's the "chain not added" error (code 4902)
        if (error.code === 4902) {
          // Try to add the chain
          try {
            const addResult = await this.provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId,
                  chainName: `Test Chain ${i}`,
                  nativeCurrency: {
                    name: 'Test',
                    symbol: 'TEST',
                    decimals: 18,
                  },
                  rpcUrls: [`https://example.com/rpc/${chainId}`],
                  blockExplorerUrls: [`https://example.com/explorer/${chainId}`],
                },
              ],
            });

            this.results.push({
              method: 'wallet_addEthereumChain',
              chainId,
              success: true,
              result: addResult,
              iteration: i,
            });
          } catch (addError) {
            this.results.push({
              method: 'wallet_addEthereumChain',
              chainId,
              success: false,
              error: addError.message,
              code: addError.code,
              iteration: i,
            });
          }
        } else {
          this.results.push({
            method: 'wallet_switchEthereumChain',
            chainId,
            success: false,
            error: error.message,
            code: error.code,
            iteration: i,
          });
        }
      }
    }

    return this.results.filter(
      r => r.method === 'wallet_switchEthereumChain' || r.method === 'wallet_addEthereumChain'
    );
  }

  // Run a comprehensive fuzz testing session
  async runComprehensiveFuzz() {
    console.log('Starting comprehensive MetaMask fuzzing...');

    // Connect to the wallet first
    await this.connect();

    // Run all fuzzing tests in sequence
    const txResults = await this.fuzzTransactions(10);
    console.log(`Transaction fuzzing completed: ${txResults.length} tests`);

    const msgResults = await this.fuzzMessageSigning(8);
    console.log(`Message signing fuzzing completed: ${msgResults.length} tests`);

    const typedDataResults = await this.fuzzTypedDataSigning(5);
    console.log(`Typed data signing fuzzing completed: ${typedDataResults.length} tests`);

    const chainResults = await this.fuzzChainSwitching(7);
    console.log(`Chain switching fuzzing completed: ${chainResults.length} tests`);

    // Analyze results for potential vulnerabilities
    const vulnerabilities = this.analyzeResults();

    return {
      total: this.results.length,
      vulnerabilities,
      results: this.results,
    };
  }

  // Analyze the results for potential vulnerabilities
  analyzeResults() {
    const vulnerabilities = [];

    // Check for transaction handling issues
    const txResults = this.results.filter(r => r.method === 'eth_sendTransaction');
    const suspiciousTx = txResults.filter(
      r =>
        r.success &&
        (!r.params.to || r.params.gas === '0x0' || r.params.value === '0x' + 'f'.repeat(64))
    );

    if (suspiciousTx.length > 0) {
      vulnerabilities.push({
        type: 'Transaction Validation',
        severity: 'High',
        description: `MetaMask accepted ${suspiciousTx.length} transactions with suspicious parameters`,
        examples: suspiciousTx.slice(0, 3),
      });
    }

    // Check for message signing issues
    const signResults = this.results.filter(r => r.method === 'personal_sign');
    const suspiciousSigns = signResults.filter(
      r =>
        r.success &&
        (r.message === '' || r.message.includes('\0') || r.message.includes('<script>'))
    );

    if (suspiciousSigns.length > 0) {
      vulnerabilities.push({
        type: 'Message Signing Validation',
        severity: 'Medium',
        description: `MetaMask signed ${suspiciousSigns.length} messages with potentially malicious content`,
        examples: suspiciousSigns.slice(0, 3),
      });
    }

    // Check for typed data issues
    const typedDataResults = this.results.filter(r => r.method === 'eth_signTypedData_v4');
    // Analysis would depend on specific edge cases found

    // Check for chain switching issues
    const chainResults = this.results.filter(
      r => r.method === 'wallet_switchEthereumChain' || r.method === 'wallet_addEthereumChain'
    );

    const suspiciousChains = chainResults.filter(
      r => r.success && (r.chainId === '0x0' || r.chainId.length > 20)
    );

    if (suspiciousChains.length > 0) {
      vulnerabilities.push({
        type: 'Chain Validation',
        severity: 'Medium',
        description: `MetaMask allowed switching to ${suspiciousChains.length} potentially invalid chains`,
        examples: suspiciousChains.slice(0, 3),
      });
    }

    return vulnerabilities;
  }
}

// Export function to run the fuzzer
export async function runMetaMaskFuzzer() {
  const fuzzer = new MetaMaskFuzzer();
  return await fuzzer.runComprehensiveFuzz();
}

// Browser detection
export function isMetaMaskInstalled() {
  return (
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    window.ethereum.isMetaMask
  );
}

// UI component to display fuzzing results
export function MetaMaskFuzzerUI() {
  // This would be implemented with React/Vue components
  // For now, returning a simple function that creates HTML
  return {
    renderResults(results) {
      const container = document.createElement('div');
      container.className = 'metamask-fuzzer-results';

      // Add summary
      const summary = document.createElement('div');
      summary.className = 'fuzzer-summary';
      summary.innerHTML = `
        <h2>MetaMask Fuzzing Results</h2>
        <p>Total tests run: ${results.total}</p>
        <p>Potential vulnerabilities found: ${results.vulnerabilities.length}</p>
      `;
      container.appendChild(summary);

      // Add vulnerabilities section
      if (results.vulnerabilities.length > 0) {
        const vulnSection = document.createElement('div');
        vulnSection.className = 'vulnerabilities-section';
        vulnSection.innerHTML = '<h3>Potential Vulnerabilities</h3>';

        results.vulnerabilities.forEach((vuln, i) => {
          const vulnEl = document.createElement('div');
          vulnEl.className = `vulnerability ${vuln.severity.toLowerCase()}`;
          vulnEl.innerHTML = `
            <h4>${i + 1}. ${vuln.type} (${vuln.severity})</h4>
            <p>${vuln.description}</p>
            <div class="examples">
              <strong>Examples:</strong>
              <pre>${JSON.stringify(vuln.examples, null, 2)}</pre>
            </div>
          `;
          vulnSection.appendChild(vulnEl);
        });

        container.appendChild(vulnSection);
      }

      return container;
    },
  };
}
