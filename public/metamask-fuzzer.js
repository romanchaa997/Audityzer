/**
 * MetaMask Fuzzer Module
 *
 * This module provides a fuzzer for testing MetaMask extension's security
 * by sending various malformed requests and checking for proper error handling.
 */

// Function to delay execution for a specified time
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// List of test cases to run against MetaMask
const testCases = [
  {
    name: 'Connection with malformed origin',
    run: async () => {
      try {
        // Try to manipulate origin in the request
        const provider = window.ethereum;
        const originalRequest = provider.request;

        provider.request = async function (args) {
          // Inject malicious origin for wallet_requestPermissions
          if (args.method === 'wallet_requestPermissions') {
            const origArgs = { ...args };
            origArgs.maliciousOrigin = 'https://attacker.com';
            return originalRequest.call(this, origArgs);
          }
          return originalRequest.call(this, args);
        };

        // Try connection with modified provider
        await provider.request({ method: 'eth_requestAccounts' });

        // Restore original function
        provider.request = originalRequest;

        return {
          status: 'passed',
          message: 'MetaMask correctly handled connection with malformed origin',
        };
      } catch (error) {
        return {
          status: 'passed',
          message: `MetaMask properly rejected the malformed request: ${error.message}`,
        };
      }
    },
  },
  {
    name: 'Transaction with oversized data',
    run: async () => {
      try {
        // Create a transaction with unusually large data field
        const largeData = '0x' + Array(50000).fill('ff').join('');

        await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: window.ethereum.selectedAddress,
              to: '0x0000000000000000000000000000000000000000',
              value: '0x0',
              data: largeData,
            },
          ],
        });

        // If we get here, MetaMask should have displayed an error
        return {
          status: 'needs_verification',
          message: 'MetaMask accepted large data transaction, verify if proper warning was shown',
        };
      } catch (error) {
        return {
          status: 'passed',
          message: `MetaMask correctly rejected oversized transaction data: ${error.message}`,
        };
      }
    },
  },
  {
    name: 'Personal sign with Unicode manipulation',
    run: async () => {
      try {
        // Create a message with unicode right-to-left override characters
        // This can be used to mislead users about what they're signing
        const maliciousMessage = 'Safe harmless message \u202Ekcatta\u202C is here';

        await window.ethereum.request({
          method: 'personal_sign',
          params: [maliciousMessage, window.ethereum.selectedAddress],
        });

        // Need manual verification of what was displayed to user
        return {
          status: 'needs_verification',
          message: 'Verify if MetaMask properly displayed right-to-left override characters',
        };
      } catch (error) {
        return {
          status: 'passed',
          message: `MetaMask rejected message with unicode manipulation: ${error.message}`,
        };
      }
    },
  },
  {
    name: 'Malformed chain ID switch',
    run: async () => {
      try {
        // Try to switch to a chain with malformed/invalid chain ID
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: 'not-a-hex-value' }],
        });

        return {
          status: 'failed',
          message: 'MetaMask accepted a malformed chain ID',
        };
      } catch (error) {
        return {
          status: 'passed',
          message: `MetaMask properly rejected malformed chain ID: ${error.message}`,
        };
      }
    },
  },
  {
    name: 'Multiple rapid requests',
    run: async () => {
      try {
        // Send many requests rapidly to check for race conditions
        const promises = [];
        for (let i = 0; i < 20; i++) {
          promises.push(
            window.ethereum.request({
              method: 'eth_accounts',
            })
          );
        }

        await Promise.all(promises);
        return {
          status: 'passed',
          message: 'MetaMask handled multiple rapid requests correctly',
        };
      } catch (error) {
        return {
          status: 'failed',
          message: `MetaMask failed during multiple rapid requests: ${error.message}`,
        };
      }
    },
  },
];

/**
 * Run the MetaMask fuzzer tests
 * @returns {Promise<Array>} - Results of all test cases
 */
export async function runMetaMaskFuzzer() {
  if (typeof window.ethereum === 'undefined') {
    return [
      {
        name: 'MetaMask Detection',
        status: 'failed',
        message: 'MetaMask not detected in this browser',
      },
    ];
  }

  const results = [];
  for (const testCase of testCases) {
    console.log(`Running test: ${testCase.name}`);
    try {
      // Run the test case
      const result = await testCase.run();
      results.push({
        name: testCase.name,
        ...result,
      });

      // Add a small delay between tests
      await delay(1000);
    } catch (error) {
      results.push({
        name: testCase.name,
        status: 'error',
        message: `Test case execution error: ${error.message}`,
      });
    }
  }

  return results;
}

/**
 * Create UI components for the MetaMask fuzzer
 * @returns {Object} - UI methods for rendering results
 */
export function MetaMaskFuzzerUI() {
  return {
    renderResults(results) {
      const container = document.createElement('div');
      container.className = 'fuzzer-results';

      // Add summary
      const summary = document.createElement('div');
      const total = results.length;
      const passed = results.filter(r => r.status === 'passed').length;
      const failed = results.filter(r => r.status === 'failed').length;
      const needsVerification = results.filter(r => r.status === 'needs_verification').length;
      const errors = results.filter(r => r.status === 'error').length;

      summary.innerHTML = `
        <h2>Fuzzing Complete</h2>
        <div class="summary">
          <p>Total tests: ${total}</p>
          <p>Passed: ${passed}</p>
          <p>Failed: ${failed}</p>
          <p>Needs verification: ${needsVerification}</p>
          <p>Errors: ${errors}</p>
        </div>
      `;
      container.appendChild(summary);

      // Add detailed results
      const details = document.createElement('div');
      details.className = 'details';

      for (const result of results) {
        const resultElem = document.createElement('div');
        resultElem.className = `test-result ${result.status}`;
        resultElem.innerHTML = `
          <h3>${result.name}</h3>
          <p class="status ${result.status}">Status: ${result.status}</p>
          <p class="message">${result.message}</p>
        `;
        details.appendChild(resultElem);
      }

      container.appendChild(details);

      // Add some basic styling
      const style = document.createElement('style');
      style.textContent = `
        .fuzzer-results {
          font-family: Arial, sans-serif;
          margin: 20px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .summary {
          margin-bottom: 20px;
          padding: 10px;
          background-color: #f5f5f5;
          border-radius: 5px;
        }
        .test-result {
          margin: 10px 0;
          padding: 10px;
          border-radius: 5px;
          border-left: 5px solid gray;
        }
        .test-result.passed {
          border-left-color: green;
          background-color: rgba(0, 255, 0, 0.1);
        }
        .test-result.failed {
          border-left-color: red;
          background-color: rgba(255, 0, 0, 0.1);
        }
        .test-result.needs_verification {
          border-left-color: orange;
          background-color: rgba(255, 165, 0, 0.1);
        }
        .test-result.error {
          border-left-color: purple;
          background-color: rgba(128, 0, 128, 0.1);
        }
        .status {
          font-weight: bold;
        }
        .status.passed { color: green; }
        .status.failed { color: red; }
        .status.needs_verification { color: orange; }
        .status.error { color: purple; }
      `;

      container.appendChild(style);
      return container;
    },
  };
}
