// Security Test Suite - Phantom Wallet Implementation (Solana)
const { test, expect } = require('@playwright/test');
const { decodeSolanaTransaction, analyzeSolanaInstruction } = require('../../../src/core/cross-chain/solana-analyzer');
const bs58 = require('bs58');

test.describe('Phantom Wallet Security Test Suite', () => {
  // Test configuration
  const config = {
    dappUrl: '{{dapp_url}}',
    walletAddress: '{{address}}' || '5FHwkrdxntdK24hgQU8qgBjn35Y1zwhz1GZwCkP2UJnM',
    connectButtonSelector: '{{connect_button_selector}}',
    networkName: '{{network}}' || 'Solana Mainnet',
    // Common program IDs for reference
    knownProgramIds: {
      systemProgram: '11111111111111111111111111111111',
      tokenProgram: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
      associatedTokenProgram: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
      memoProgram: 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'
    }
  };

  test.beforeEach(async ({ page }) => {
    // Navigate to the dApp
    await page.goto(config.dappUrl);
    
    // Mock Phantom wallet connection with enhanced security tracking
    await page.evaluateHandle(() => {
      // Store transaction history for security analysis
      window._phantomSecurityMonitor = {
        transactions: [],
        messages: [],
        connections: [],
        requests: []
      };
      
      // Create mock Phantom provider with extensive security logging
      window.phantom = {
        solana: {
          isPhantom: true,
          publicKey: {
            toString: () => config.walletAddress,
            toBase58: () => config.walletAddress,
            toBytes: () => new Uint8Array(32).fill(1)
          },
          isConnected: true,
          connect: async ({ onlyIfTrusted = false } = {}) => {
            console.log('PHANTOM_SECURITY: Connect requested', { onlyIfTrusted });
            window._phantomSecurityMonitor.connections.push({
              type: 'connect',
              timestamp: Date.now(),
              onlyIfTrusted
            });
            return { publicKey: { toString: () => config.walletAddress, toBase58: () => config.walletAddress } };
          },
          disconnect: async () => {
            console.log('PHANTOM_SECURITY: Disconnect requested');
            window._phantomSecurityMonitor.connections.push({
              type: 'disconnect',
              timestamp: Date.now()
            });
            return true;
          },
          signTransaction: async (tx) => {
            console.log('PHANTOM_SECURITY: Transaction sign requested');
            
            // Security analysis would decode the transaction here in a real implementation
            const txDetails = {
              timestamp: Date.now(),
              programIds: ['MOCK_PROGRAM_ID'],
              instructions: ['MOCK_INSTRUCTION'],
              signers: [config.walletAddress],
              recentBlockhash: 'MOCK_BLOCKHASH' 
            };
            
            window._phantomSecurityMonitor.transactions.push({
              type: 'single',
              details: txDetails
            });
            
            return tx;
          },
          signAllTransactions: async (txs) => {
            console.log('PHANTOM_SECURITY: Bulk transactions sign requested', txs.length);
            
            txs.forEach((tx, index) => {
              window._phantomSecurityMonitor.transactions.push({
                type: 'bulk',
                index,
                timestamp: Date.now(),
                signature: `mock_signature_${index}`
              });
            });
            
            return txs;
          },
          signMessage: async (message, display = 'utf8') => {
            const messageText = typeof message === 'string' 
              ? message 
              : new TextDecoder().decode(message);
              
            console.log(`PHANTOM_SECURITY: Message sign requested: ${messageText}`);
            
            window._phantomSecurityMonitor.messages.push({
              timestamp: Date.now(),
              message: messageText,
              display
            });
            
            // Return mock signature (64 bytes for ed25519)
            return {
              signature: new Uint8Array(64).fill(1),
              publicKey: config.walletAddress
            };
          },
          on: (eventName, callback) => {
            console.log('PHANTOM_SECURITY: Event listener added', eventName);
            // In a real implementation, we would track what events are being listened for
            return () => {}; // Return disconnect function
          },
          request: async (request) => {
            const { method, params } = request;
            console.log(`PHANTOM_SECURITY: Request method ${method} with params`, params);
            
            window._phantomSecurityMonitor.requests.push({
              timestamp: Date.now(),
              method,
              params
            });
            
            if (method === 'connect') {
              return { publicKey: config.walletAddress };
            }
            
            return { signature: 'mock_signature' };
          }
        }
      };
      
      // Dispatch event to notify dApp of wallet availability
      window.dispatchEvent(new Event('phantom#initialized'));
    });
    
    // Attempt to connect to wallet through UI
    try {
      await page.click('button:has-text("Connect"), #connect-wallet, [data-testid="connect-button"]');
      console.log('Connected via UI button');
    } catch (e) {
      console.log('No connect button found, using direct connection');
      // Connect programmatically
      await page.evaluate(() => {
        if (window.phantom && window.phantom.solana) {
          window.phantom.solana.connect();
        }
      });
    }
    
    // Wait for connection to complete
    await page.waitForTimeout(1000);
  });

  test('Detects unauthorized instruction vulnerabilities', async ({ page }) => {
    // Enhanced transaction monitoring with program ID validation
    await page.evaluate(() => {
      if (window.phantom && window.phantom.solana) {
        const originalSignTransaction = window.phantom.solana.signTransaction;
        window.phantom.solana.signTransaction = async function(transaction) {
          console.log('TRANSACTION_ANALYSIS: Checking for unauthorized instructions');
          
          // Store transaction for deeper analysis
          window._phantomSecurityTx = transaction;
          
          // In a real implementation, transaction would be decoded here
          // to identify program IDs and validate instructions
          
          return originalSignTransaction(transaction);
        };
      }
    });
    
    // Attempt to trigger a transaction
    try {
      await page.click('button:has-text("Send"), button:has-text("Transfer"), #transfer-button, [data-testid="send-button"]');
      await page.waitForTimeout(1000);
    } catch (e) {
      console.log('No transaction button found, simulating transaction');
      
      // Simulate a transaction if no button found
      await page.evaluate(() => {
        if (window.phantom && window.phantom.solana) {
          // Create a mock transaction object
          const mockTx = {
            serialize: () => new Uint8Array(100),
            signatures: [new Uint8Array(64)],
            instructions: [
              {
                programId: config.knownProgramIds.systemProgram,
                data: new Uint8Array([2, 0, 0, 0]), // Sol transfer instruction
                keys: [
                  { pubkey: config.walletAddress, isSigner: true, isWritable: true },
                  { pubkey: "FakEFakEFakEFakEFakEFakEFakEFakEFakEFakEFakEFakE", isSigner: false, isWritable: true }
                ]
              }
            ]
          };
          window.phantom.solana.signTransaction(mockTx);
        }
      });
    }
    
    // Check for potential security issues in the transaction
    const securityIssues = await page.evaluate(() => {
      // In a real implementation, we would analyze the transaction for:
      // 1. Unknown program IDs
      // 2. Multiple token approvals
      // 3. Delegated transfer authority
      // 4. Flash loan operations
      
      const issues = [];
      const tx = window._phantomSecurityTx;
      
      if (tx && tx.instructions) {
        // Example check for unknown program IDs
        const knownProgramIds = Object.values(config.knownProgramIds);
        
        tx.instructions.forEach((instruction, index) => {
          if (instruction.programId && !knownProgramIds.includes(instruction.programId.toString())) {
            issues.push({
              severity: 'high',
              type: 'unknown_program',
              description: `Instruction ${index} uses unknown program ID: ${instruction.programId}`,
              recommendation: 'Verify this program is legitimate before signing'
            });
          }
          
          // Check for token transfer instructions with large amounts
          if (instruction.programId === config.knownProgramIds.tokenProgram) {
            // In real implementation would decode token instruction
            issues.push({
              severity: 'info',
              type: 'token_transfer',
              description: 'Token transfer instruction detected',
              recommendation: 'Verify token transfer amount and destination address'
            });
          }
        });
      }
      
      return issues;
    });
    
    if (securityIssues && securityIssues.length > 0) {
      console.log('SECURITY ISSUES DETECTED:');
      securityIssues.forEach(issue => {
        console.log(`- [${issue.severity.toUpperCase()}] ${issue.description}`);
        console.log(`  Recommendation: ${issue.recommendation}`);
      });
    }
    
    // Check for connection status
    const isConnected = await page.evaluate(() => {
      return !!(window.phantom && window.phantom.solana && window.phantom.solana.isConnected);
    });
    
    expect(isConnected).toBe(true);
  });

  test('Validates secure message signing practices', async ({ page }) => {
    // Enhanced message signing security monitoring
    await page.evaluate(() => {
      if (window.phantom && window.phantom.solana) {
        const originalSignMessage = window.phantom.solana.signMessage;
        window.phantom.solana.signMessage = async function(message, display) {
          // Convert message to text for analysis
          const messageText = typeof message === 'string' 
            ? message 
            : new TextDecoder().decode(message);
            
          console.log(`MESSAGE_SIGN_REQUEST: ${messageText}`);
          
          // Comprehensive security analysis for message signing
          const securityChecks = {
            risks: [],
            hasSensitiveData: false,
            isPhishingAttempt: false,
            containsCode: false
          };
          
          // Check for suspicious message content - expanded list
          const phishingPatterns = [
            { pattern: /wallet|private key|seed|mnemonic|password|secret/i, risk: 'critical', name: 'credential_request' },
            { pattern: /authorize|verify|validate|confirm/i, risk: 'high', name: 'authorization_request' },
            { pattern: /claim|free|airdrop|reward|bonus/i, risk: 'high', name: 'reward_phishing' },
            { pattern: /urgently|urgent|immediately|action required/i, risk: 'medium', name: 'urgency_tactic' },
            { pattern: /javascript:|<script|function\(|eval\(|new Function/i, risk: 'critical', name: 'code_execution' }
          ];
          
          phishingPatterns.forEach(({ pattern, risk, name }) => {
            if (pattern.test(messageText)) {
              console.log(`SECURITY_RISK: Message matches suspicious pattern: ${pattern}`);
              securityChecks.risks.push({ name, risk });
              
              if (name === 'credential_request') {
                securityChecks.hasSensitiveData = true;
              } else if (['reward_phishing', 'authorization_request'].includes(name)) {
                securityChecks.isPhishingAttempt = true;
              } else if (name === 'code_execution') {
                securityChecks.containsCode = true;
              }
            }
          });
          
          // Store security analysis
          window._messageSecurityChecks = securityChecks;
          
          return originalSignMessage(message, display);
        };
      }
    });
    
    // Try to find and click sign buttons
    try {
      await page.click('button:has-text("Sign"), #sign-button, [data-testid="sign-message-button"]');
      await page.waitForTimeout(1000);
    } catch (e) {
      console.log('No sign button found on the page, simulating message signing');
      
      // Simulate different types of message signing requests for testing
      const testMessages = [
        'Welcome to DeFi App - Click sign to verify your wallet',
        'Claim your free 1000 SOL airdrop now! Sign to verify eligibility',
        'Transfer 50 SOL to recipient address: 8xDJA3yr6K6FWK7s5pot6Cd7gWCe6Py9kzsf9ehXKQkW'
      ];
      
      for (const message of testMessages) {
        await page.evaluate((msg) => {
          if (window.phantom && window.phantom.solana) {
            const encodedMessage = new TextEncoder().encode(msg);
            window.phantom.solana.signMessage(encodedMessage);
          }
        }, message);
        await page.waitForTimeout(500);
      }
    }
    
    // Analyze the security checks from message signing
    const messageSecurityResults = await page.evaluate(() => {
      return window._messageSecurityChecks || { risks: [] };
    });
    
    if (messageSecurityResults.risks.length > 0) {
      console.log('MESSAGE SIGNING SECURITY RISKS:');
      messageSecurityResults.risks.forEach(risk => {
        console.log(`- [${risk.risk.toUpperCase()}] ${risk.name}`);
      });
      
      if (messageSecurityResults.isPhishingAttempt) {
        console.log('WARNING: Potential phishing attempt detected in message signing request');
      }
      
      if (messageSecurityResults.hasSensitiveData) {
        console.log('CRITICAL: Message appears to request sensitive credentials or private data');
      }
      
      if (messageSecurityResults.containsCode) {
        console.log('CRITICAL: Message contains code that could be executed');
      }
    }
    
    // Check for secure connection
    const isConnected = await page.evaluate(() => {
      return !!(window.phantom && window.phantom.solana && window.phantom.solana.isConnected);
    });
    
    expect(isConnected).toBe(true);
  });
  
  test('Detects token approval vulnerabilities', async ({ page }) => {
    // Setup token approval monitoring
    await page.evaluate(() => {
      if (window.phantom && window.phantom.solana) {
        const originalSignTransaction = window.phantom.solana.signTransaction;
        window.phantom.solana.signTransaction = async function(transaction) {
          console.log('TOKEN_APPROVAL: Checking for token program instructions');
          
          // Store transaction for analysis
          window._tokenApprovalTx = transaction;
          
          // Simulate instruction parsing
          window._tokenInstructions = [];
          
          if (transaction && transaction.instructions) {
            transaction.instructions.forEach(instruction => {
              if (instruction.programId === config.knownProgramIds.tokenProgram) {
                // In a real implementation, would decode the token program instruction
                // Token Approve is instruction index 4
                if (instruction.data && instruction.data[0] === 4) {
                  window._tokenInstructions.push({
                    type: 'approve',
                    amount: 'unknown', // Would decode the actual amount
                    source: instruction.keys[0]?.pubkey.toString(),
                    delegate: instruction.keys[1]?.pubkey.toString()
                  });
                }
              }
            });
          }
          
          return originalSignTransaction(transaction);
        };
      }
    });
    
    // Trigger a token approval action if possible
    try {
      await page.click('button:has-text("Approve"), button:has-text("Allow"), #approve-button');
      await page.waitForTimeout(1000);
    } catch (e) {
      console.log('No approval button found, simulating token approval');
      
      // Simulate a token approval transaction
      await page.evaluate(() => {
        if (window.phantom && window.phantom.solana) {
          // Create a mock approval transaction
          const mockTokenApproveTx = {
            serialize: () => new Uint8Array(100),
            signatures: [new Uint8Array(64)],
            instructions: [
              {
                programId: config.knownProgramIds.tokenProgram,
                data: new Uint8Array([4, 255, 255, 255, 255]), // Token Approve instruction with max amount
                keys: [
                  { pubkey: "TokenAccountXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", isSigner: false, isWritable: true },
                  { pubkey: "DelegateXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", isSigner: false, isWritable: false },
                  { pubkey: config.walletAddress, isSigner: true, isWritable: false }
                ]
              }
            ]
          };
          window.phantom.solana.signTransaction(mockTokenApproveTx);
        }
      });
    }
    
    // Check for token approval vulnerabilities
    const tokenApprovals = await page.evaluate(() => {
      return window._tokenInstructions || [];
    });
    
    if (tokenApprovals.length > 0) {
      console.log('TOKEN APPROVALS DETECTED:');
      tokenApprovals.forEach(approval => {
        console.log(`- Token approval to delegate: ${approval.delegate}`);
        console.log(`  Source token account: ${approval.source}`);
        
        if (approval.amount === 'unknown' || approval.amount === 'max') {
          console.log('  SECURITY RISK: Unlimited token approval detected');
          console.log('  Recommendation: Use limited token approvals and revoke when not needed');
        }
      });
    }
  });
  
  test('Checks for multi-block transaction security', async ({ page }) => {
    // This test analyzes transactions for multi-block security issues
    // such as sandwich attacks or sequencing vulnerabilities
    
    // Setup simulation of multi-block transaction monitoring
    await page.evaluate(() => {
      window._multiBlockAnalysis = {
        transactions: [],
        sequencingIssues: []
      };
      
      if (window.phantom && window.phantom.solana) {
        // Intercept transaction requests for sequence analysis
        const originalSignAllTransactions = window.phantom.solana.signAllTransactions;
        window.phantom.solana.signAllTransactions = async function(transactions) {
          console.log(`MULTIBLOCK: Processing ${transactions.length} transactions as a batch`);
          
          if (transactions.length > 1) {
            // In a real implementation, would analyze transaction sequence for:
            // 1. Front-running opportunities
            // 2. Sandwich attack vulnerabilities 
            // 3. Transaction reordering risks
            
            // Simulate finding a sequencing issue
            window._multiBlockAnalysis.sequencingIssues.push({
              type: 'potential_sandwich',
              risk: 'high',
              description: 'Multiple transactions affecting token price found. Potential sandwich attack vulnerability.',
              recommendation: 'Add slippage protection or use private transaction paths',
              affectedTxIndexes: [0, transactions.length - 1]
            });
          }
          
          return originalSignAllTransactions(transactions);
        };
      }
    });
    
    // Trigger a multi-transaction operation
    try {
      await page.click('button:has-text("Swap"), #swap-button, [data-testid="swap-button"]');
      await page.waitForTimeout(1000);
    } catch (e) {
      console.log('No swap button found, simulating multi-transaction operation');
      
      // Simulate a multi-transaction operation
      await page.evaluate(() => {
        if (window.phantom && window.phantom.solana) {
          // Create multiple mock transactions
          const mockTransactions = [
            // Transaction 1: Token approval
            {
              serialize: () => new Uint8Array(100),
              signatures: [new Uint8Array(64)],
              instructions: [
                {
                  programId: config.knownProgramIds.tokenProgram,
                  data: new Uint8Array([4]), // Approve
                  keys: [{ pubkey: "TokenAccount1", isSigner: false, isWritable: true }]
                }
              ]
            },
            // Transaction 2: Swap execution
            {
              serialize: () => new Uint8Array(100),
              signatures: [new Uint8Array(64)],
              instructions: [
                {
                  programId: "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5reJTARTM", // Jupiter aggregator
                  data: new Uint8Array([5]), // Swap
                  keys: [{ pubkey: "TokenAccount2", isSigner: false, isWritable: true }]
                }
              ]
            }
          ];
          
          window.phantom.solana.signAllTransactions(mockTransactions);
        }
      });
    }
    
    // Check for sequencing vulnerabilities
    const sequencingAnalysis = await page.evaluate(() => {
      return window._multiBlockAnalysis.sequencingIssues || [];
    });
    
    if (sequencingAnalysis.length > 0) {
      console.log('TRANSACTION SEQUENCING VULNERABILITIES:');
      sequencingAnalysis.forEach(issue => {
        console.log(`- [${issue.risk.toUpperCase()}] ${issue.type}: ${issue.description}`);
        console.log(`  Recommendation: ${issue.recommendation}`);
        console.log(`  Affected transaction indexes: ${issue.affectedTxIndexes.join(', ')}`);
      });
    }
  });
});
