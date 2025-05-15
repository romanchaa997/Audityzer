/**
 * ERC-4337 UserOperation Flow Visualizer
 * 
 * This module creates visual flow diagrams for UserOperation execution, 
 * showing the path from creation through bundler processing to on-chain execution.
 * 
 * It can be used to visualize:
 * - Validation stages and potential failure points
 * - Gas consumption across different stages
 * - Timing of execution steps
 * - Interactions between different components of the AA system
 */

const mermaid = require('mermaid');
const fs = require('fs-extra');
const path = require('path');

// UserOperation flow stages
const FLOW_STAGES = {
  CREATION: 'Creation',
  BUNDLER_VALIDATION: 'Bundler Validation',
  SIMULATION: 'Simulation',
  BUNDLING: 'Bundling',
  ENTRYPOINT_VALIDATION: 'EntryPoint Validation',
  PAYMASTER_VALIDATION: 'Paymaster Validation',
  ACCOUNT_VALIDATION: 'Account Validation',
  EXECUTION: 'Execution',
  REFUND: 'Refund & Settlement'
};

// Track timing and execution flow of a UserOperation
class UserOpFlowTracker {
  constructor(userOp, options = {}) {
    this.userOp = userOp;
    this.flowId = options.flowId || `flow-${Date.now()}`;
    this.events = [];
    this.errors = [];
    this.gasUsage = {
      verificationGas: 0,
      callGas: 0,
      preVerificationGas: 0,
      total: 0
    };
    this.startTime = Date.now();
    this.endTime = null;
    this.status = 'created';
    
    // Log initial creation
    this.logEvent(FLOW_STAGES.CREATION, 'UserOperation created');
  }

  // Log an event in the flow
  logEvent(stage, description, details = {}) {
    const event = {
      stage,
      description,
      timestamp: Date.now(),
      timeSinceStart: Date.now() - this.startTime,
      details
    };
    
    this.events.push(event);
    return event;
  }

  // Log an error in the flow
  logError(stage, errorMessage, details = {}) {
    const error = {
      stage,
      errorMessage,
      timestamp: Date.now(),
      timeSinceStart: Date.now() - this.startTime,
      details
    };
    
    this.errors.push(error);
    this.status = 'failed';
    return error;
  }

  // Record gas usage at a specific stage
  recordGasUsage(stage, gasDetails) {
    const event = this.logEvent(stage, 'Gas usage recorded', gasDetails);
    
    // Update gas tracking
    if (gasDetails.verificationGas) {
      this.gasUsage.verificationGas = gasDetails.verificationGas;
    }
    
    if (gasDetails.callGas) {
      this.gasUsage.callGas = gasDetails.callGas;
    }
    
    if (gasDetails.preVerificationGas) {
      this.gasUsage.preVerificationGas = gasDetails.preVerificationGas;
    }
    
    // Calculate total
    this.gasUsage.total = 
      this.gasUsage.verificationGas + 
      this.gasUsage.callGas + 
      this.gasUsage.preVerificationGas;
      
    return event;
  }

  // Complete the flow tracking
  completeFlow(status = 'success') {
    this.endTime = Date.now();
    this.status = status;
    this.logEvent('Completion', `UserOperation flow ${status}`, {
      totalTime: this.endTime - this.startTime
    });
    
    return {
      flowId: this.flowId,
      status,
      totalTime: this.endTime - this.startTime,
      eventCount: this.events.length,
      errorCount: this.errors.length
    };
  }

  // Generate a flow summary
  getSummary() {
    return {
      flowId: this.flowId,
      userOp: {
        sender: this.userOp.sender,
        nonce: this.userOp.nonce,
        callData: this.userOp.callData.substr(0, 20) + '...' // Truncated for summary
      },
      status: this.status,
      startTime: new Date(this.startTime).toISOString(),
      endTime: this.endTime ? new Date(this.endTime).toISOString() : null,
      duration: this.endTime ? (this.endTime - this.startTime) : null,
      eventCount: this.events.length,
      errorCount: this.errors.length,
      gasUsage: this.gasUsage
    };
  }
}

// Generate a Mermaid flow diagram from a UserOpFlowTracker
function generateFlowDiagram(flowTracker) {
  let diagram = 'sequenceDiagram\n';
  diagram += '    participant User\n';
  diagram += '    participant Wallet\n';
  diagram += '    participant Bundler\n';
  diagram += '    participant EntryPoint\n';
  diagram += '    participant Paymaster\n';
  diagram += '    participant Account\n';
  
  // Sort events by timestamp
  const sortedEvents = [...flowTracker.events].sort((a, b) => a.timestamp - b.timestamp);
  
  // Add events to diagram
  for (const event of sortedEvents) {
    switch (event.stage) {
      case FLOW_STAGES.CREATION:
        diagram += '    User->>Wallet: Create UserOperation\n';
        break;
      case FLOW_STAGES.BUNDLER_VALIDATION:
        diagram += '    Wallet->>Bundler: Submit UserOperation\n';
        diagram += '    Bundler->>Bundler: Validate format\n';
        break;
      case FLOW_STAGES.SIMULATION:
        diagram += '    Bundler->>EntryPoint: Simulate UserOperation\n';
        diagram += '    EntryPoint-->>Bundler: Simulation result\n';
        break;
      case FLOW_STAGES.BUNDLING:
        diagram += '    Bundler->>Bundler: Add to bundle\n';
        break;
      case FLOW_STAGES.ENTRYPOINT_VALIDATION:
        diagram += '    Bundler->>EntryPoint: handleOps([UserOperation])\n';
        diagram += '    EntryPoint->>EntryPoint: Validate operation\n';
        break;
      case FLOW_STAGES.PAYMASTER_VALIDATION:
        diagram += '    EntryPoint->>Paymaster: validatePaymasterUserOp\n';
        diagram += '    Paymaster-->>EntryPoint: Validation result\n';
        break;
      case FLOW_STAGES.ACCOUNT_VALIDATION:
        diagram += '    EntryPoint->>Account: validateUserOp\n';
        diagram += '    Account-->>EntryPoint: Validation result\n';
        break;
      case FLOW_STAGES.EXECUTION:
        diagram += '    EntryPoint->>Account: Execute callData\n';
        diagram += '    Account-->>EntryPoint: Execution result\n';
        break;
      case FLOW_STAGES.REFUND:
        diagram += '    EntryPoint->>Paymaster: postOp refund\n';
        break;
      case 'Completion':
        if (flowTracker.status === 'success') {
          diagram += '    EntryPoint-->>Bundler: Operation succeeded\n';
          diagram += '    Bundler-->>Wallet: Operation succeeded\n';
          diagram += '    Wallet-->>User: Operation succeeded\n';
        } else {
          diagram += '    EntryPoint-->>Bundler: Operation failed\n';
          diagram += '    Bundler-->>Wallet: Operation failed\n';
          diagram += '    Wallet-->>User: Operation failed\n';
        }
        break;
    }
  }
  
  // Add any errors
  for (const error of flowTracker.errors) {
    switch (error.stage) {
      case FLOW_STAGES.BUNDLER_VALIDATION:
        diagram += '    Bundler--xWallet: Reject - ' + error.errorMessage.substring(0, 30) + '\n';
        break;
      case FLOW_STAGES.SIMULATION:
        diagram += '    EntryPoint--xBundler: Simulation failed - ' + error.errorMessage.substring(0, 30) + '\n';
        break;
      case FLOW_STAGES.ENTRYPOINT_VALIDATION:
        diagram += '    EntryPoint--xBundler: Validation failed - ' + error.errorMessage.substring(0, 30) + '\n';
        break;
      case FLOW_STAGES.PAYMASTER_VALIDATION:
        diagram += '    Paymaster--xEntryPoint: Paymaster validation failed - ' + error.errorMessage.substring(0, 30) + '\n';
        break;
      case FLOW_STAGES.ACCOUNT_VALIDATION:
        diagram += '    Account--xEntryPoint: Account validation failed - ' + error.errorMessage.substring(0, 30) + '\n';
        break;
      case FLOW_STAGES.EXECUTION:
        diagram += '    Account--xEntryPoint: Execution failed - ' + error.errorMessage.substring(0, 30) + '\n';
        break;
    }
  }
  
  return diagram;
}

/**
 * Generate a visual flow diagram for a UserOperation
 * @param {Object} userOp - The UserOperation object
 * @param {Object} options - Options for diagram generation
 * @returns {Promise<Object>} Results of diagram generation
 */
async function generateUserOpFlowDiagram(userOp, options = {}) {
  // Create flow tracker
  const flowTracker = new UserOpFlowTracker(userOp, options);
  
  try {
    // Simulate the full flow
    await simulateUserOpFlow(flowTracker);
    
    // Generate diagram
    const diagram = generateFlowDiagram(flowTracker);
    
    // Output directory
    const outputDir = options.outputDir || path.join(process.cwd(), 'reports', 'flows');
    await fs.ensureDir(outputDir);
    
    // Output files
    const baseName = options.fileName || `userop-flow-${flowTracker.flowId}`;
    const mermaidPath = path.join(outputDir, `${baseName}.mermaid`);
    const htmlPath = path.join(outputDir, `${baseName}.html`);
    const jsonPath = path.join(outputDir, `${baseName}.json`);
    
    // Write outputs
    await fs.writeFile(mermaidPath, diagram);
    await fs.writeFile(jsonPath, JSON.stringify(flowTracker, null, 2));
    
    // Generate HTML with embedded diagram
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>UserOperation Flow - ${flowTracker.flowId}</title>
  <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; line-height: 1.6; }
    .container { max-width: 1200px; margin: 0 auto; }
    .flow-diagram { margin: 20px 0; }
    .summary { background: #f5f5f5; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
    .gas-usage { display: flex; margin: 20px 0; }
    .gas-box { flex: 1; padding: 10px; margin: 0 5px; background: #e9f7ef; border-radius: 4px; text-align: center; }
    .gas-box h3 { margin-top: 0; }
    .events { margin: 20px 0; }
    .event { border-bottom: 1px solid #eee; padding: 10px 0; }
    .event-time { color: #777; font-size: 0.9em; }
    h1 { color: #2c3e50; }
    h2 { color: #34495e; border-bottom: 1px solid #eee; padding-bottom: 10px; }
    .error { color: #c0392b; }
  </style>
</head>
<body>
  <div class="container">
    <h1>UserOperation Flow Diagram</h1>
    
    <div class="summary">
      <h2>Summary</h2>
      <p><strong>Flow ID:</strong> ${flowTracker.flowId}</p>
      <p><strong>Sender:</strong> ${flowTracker.userOp.sender}</p>
      <p><strong>Status:</strong> ${flowTracker.status}</p>
      <p><strong>Duration:</strong> ${flowTracker.endTime ? ((flowTracker.endTime - flowTracker.startTime) / 1000).toFixed(2) + ' seconds' : 'Not completed'}</p>
    </div>
    
    <div class="gas-usage">
      <div class="gas-box">
        <h3>Verification Gas</h3>
        <p>${flowTracker.gasUsage.verificationGas.toLocaleString()}</p>
      </div>
      <div class="gas-box">
        <h3>Call Gas</h3>
        <p>${flowTracker.gasUsage.callGas.toLocaleString()}</p>
      </div>
      <div class="gas-box">
        <h3>Pre-Verification Gas</h3>
        <p>${flowTracker.gasUsage.preVerificationGas.toLocaleString()}</p>
      </div>
      <div class="gas-box" style="background: #d5f5e3;">
        <h3>Total Gas</h3>
        <p>${flowTracker.gasUsage.total.toLocaleString()}</p>
      </div>
    </div>
    
    <h2>Flow Diagram</h2>
    <div class="mermaid flow-diagram">
${diagram}
    </div>
    
    <h2>Events Timeline</h2>
    <div class="events">
      ${flowTracker.events.map(event => `
        <div class="event">
          <p><strong>${event.stage}:</strong> ${event.description}</p>
          <p class="event-time">${new Date(event.timestamp).toISOString()} (+${(event.timeSinceStart / 1000).toFixed(2)}s)</p>
        </div>
      `).join('')}
    </div>
    
    ${flowTracker.errors.length > 0 ? `
      <h2>Errors</h2>
      <div class="events">
        ${flowTracker.errors.map(error => `
          <div class="event error">
            <p><strong>${error.stage} Error:</strong> ${error.errorMessage}</p>
            <p class="event-time">${new Date(error.timestamp).toISOString()} (+${(error.timeSinceStart / 1000).toFixed(2)}s)</p>
          </div>
        `).join('')}
      </div>
    ` : ''}
  </div>
  
  <script>
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      sequence: { 
        actorMargin: 80,
        messageMargin: 30
      }
    });
  </script>
</body>
</html>
    `;
    
    await fs.writeFile(htmlPath, html);
    
    return {
      success: true,
      flowTracker: flowTracker.getSummary(),
      outputs: {
        mermaidPath,
        htmlPath,
        jsonPath
      }
    };
  } catch (error) {
    flowTracker.logError('Diagram Generation', error.message);
    flowTracker.completeFlow('failed');
    
    return {
      success: false,
      error: error.message,
      flowTracker: flowTracker.getSummary()
    };
  }
}

// Simulate the full UserOperation flow
async function simulateUserOpFlow(flowTracker) {
  try {
    // Simulate bundler validation
    await simulateBundlerValidation(flowTracker);
    
    // Simulate UserOp simulation at bundler
    await simulateUserOpSimulation(flowTracker);
    
    // Simulate bundling
    flowTracker.logEvent(FLOW_STAGES.BUNDLING, 'Added to bundle');
    
    // Simulate EntryPoint validation
    await simulateEntryPointValidation(flowTracker);
    
    // If paymaster is used, simulate paymaster validation
    if (flowTracker.userOp.paymasterAndData && flowTracker.userOp.paymasterAndData !== '0x') {
      await simulatePaymasterValidation(flowTracker);
    }
    
    // Simulate account validation
    await simulateAccountValidation(flowTracker);
    
    // Simulate execution
    await simulateExecution(flowTracker);
    
    // Simulate refund if paymaster is used
    if (flowTracker.userOp.paymasterAndData && flowTracker.userOp.paymasterAndData !== '0x') {
      flowTracker.logEvent(FLOW_STAGES.REFUND, 'Paymaster received refund');
    }
    
    // Complete flow
    flowTracker.completeFlow('success');
  } catch (error) {
    // Flow is already tracked by individual simulation steps
    flowTracker.completeFlow('failed');
  }
}

// Simulate bundler validation
async function simulateBundlerValidation(flowTracker) {
  flowTracker.logEvent(FLOW_STAGES.BUNDLER_VALIDATION, 'Validating UserOperation format');
  
  // Simulate validation time
  await new Promise(r => setTimeout(r, 50));
  
  // Check for invalid fields (simple simulation)
  if (!flowTracker.userOp.sender || !flowTracker.userOp.signature) {
    flowTracker.logError(FLOW_STAGES.BUNDLER_VALIDATION, 'Missing required fields');
    throw new Error('Bundler validation failed');
  }
  
  // Check signature length (simple simulation)
  if (flowTracker.userOp.signature.length < 130) {
    flowTracker.logError(FLOW_STAGES.BUNDLER_VALIDATION, 'Invalid signature length');
    throw new Error('Bundler validation failed');
  }
  
  flowTracker.logEvent(FLOW_STAGES.BUNDLER_VALIDATION, 'UserOperation format is valid');
  return true;
}

// Simulate UserOp simulation at bundler
async function simulateUserOpSimulation(flowTracker) {
  flowTracker.logEvent(FLOW_STAGES.SIMULATION, 'Simulating UserOperation execution');
  
  // Simulate time for simulation
  await new Promise(r => setTimeout(r, 100));
  
  // Estimate gas (simulate)
  const callGas = parseInt(flowTracker.userOp.callGasLimit, 16) || 200000;
  const verificationGas = parseInt(flowTracker.userOp.verificationGasLimit, 16) || 100000;
  const preVerificationGas = parseInt(flowTracker.userOp.preVerificationGas, 16) || 21000;
  
  // Record estimated gas
  flowTracker.recordGasUsage(FLOW_STAGES.SIMULATION, {
    callGas,
    verificationGas,
    preVerificationGas
  });
  
  flowTracker.logEvent(FLOW_STAGES.SIMULATION, 'Simulation successful');
  return true;
}

// Simulate EntryPoint validation
async function simulateEntryPointValidation(flowTracker) {
  flowTracker.logEvent(FLOW_STAGES.ENTRYPOINT_VALIDATION, 'EntryPoint validating UserOperation');
  
  // Simulate time for validation
  await new Promise(r => setTimeout(r, 75));
  
  // In a real implementation, this would include signature validation, etc.
  flowTracker.logEvent(FLOW_STAGES.ENTRYPOINT_VALIDATION, 'EntryPoint validation passed');
  return true;
}

// Simulate paymaster validation
async function simulatePaymasterValidation(flowTracker) {
  flowTracker.logEvent(FLOW_STAGES.PAYMASTER_VALIDATION, 'Validating with paymaster');
  
  // Simulate time for paymaster validation
  await new Promise(r => setTimeout(r, 60));
  
  // In a real implementation, this would check paymaster data validity
  flowTracker.logEvent(FLOW_STAGES.PAYMASTER_VALIDATION, 'Paymaster validation passed');
  return true;
}

// Simulate account validation
async function simulateAccountValidation(flowTracker) {
  flowTracker.logEvent(FLOW_STAGES.ACCOUNT_VALIDATION, 'Validating with account contract');
  
  // Simulate time for account validation
  await new Promise(r => setTimeout(r, 80));
  
  // In a real implementation, this would check signature validity
  flowTracker.logEvent(FLOW_STAGES.ACCOUNT_VALIDATION, 'Account validation passed');
  return true;
}

// Simulate execution
async function simulateExecution(flowTracker) {
  flowTracker.logEvent(FLOW_STAGES.EXECUTION, 'Executing UserOperation');
  
  // Simulate time for execution
  await new Promise(r => setTimeout(r, 150));
  
  // In a real implementation, this would execute the callData
  flowTracker.logEvent(FLOW_STAGES.EXECUTION, 'Execution successful');
  return true;
}

// Usage example
const exampleUserOp = {
  sender: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  nonce: '0x01',
  initCode: '0x',
  callData: '0x3c5088ea00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
  callGasLimit: '0x58a83',
  verificationGasLimit: '0x186a0',
  preVerificationGas: '0x5208',
  maxFeePerGas: '0x59682f00',
  maxPriorityFeePerGas: '0x59682f00',
  paymasterAndData: '0x',
  signature: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b00',
};

// Export functions
module.exports = {
  generateUserOpFlowDiagram,
  UserOpFlowTracker,
  FLOW_STAGES
}; 