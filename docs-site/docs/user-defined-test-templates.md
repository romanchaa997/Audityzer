# User-Defined Test Templates

Audityzer allows you to create, customize, and share your own test templates for specific vulnerabilities, protocols, or testing scenarios.

## Overview

User-defined test templates enable you to:

- Create specialized tests for specific smart contract patterns
- Define custom testing workflows for unique protocols
- Share testing knowledge with the community
- Standardize security testing across teams
- Build reusable testing components

## Creating Test Templates

### Command Line Template Creation

Create new test templates using the CLI:

```bash
# Create a basic template
npx Audityzer template create --name="my-custom-test" --type=security

# Create from an existing test
npx Audityzer template create --from=./tests/existing-test.js --name="enhanced-version"
```

### Template Builder UI

Use the visual template builder for a guided experience:

```bash
# Launch the template builder UI
npx Audityzer template-builder
```

This opens a browser-based interface where you can:

- Select test components from a library
- Configure test parameters
- Add assertions and checks
- Define setup and teardown steps
- Preview the generated test

### Template Structure

Templates follow a consistent structure:

```javascript
// my-custom-template.js
/**
 * @template-name My Custom Security Test
 * @template-description Tests for a custom vulnerability pattern
 * @template-category security
 * @template-protocol defi
 * @template-author Your Name
 */

const { test, expect } = require('@playwright/test');
const { Audityzer } = require('Audityzer');

// Template parameters with defaults
const PARAMETERS = {
  TARGET_CONTRACT: '{{target_contract}}',
  ATTACK_SEQUENCE: '{{attack_sequence}}',
  EXPECTED_OUTCOME: '{{expected_outcome}}',
};

// Metadata exposed to template users
const TEMPLATE_METADATA = {
  description: 'Tests for a specific vulnerability pattern in DeFi contracts',
  parameters: [
    {
      name: 'target_contract',
      description: 'Address of the contract to test',
      type: 'address',
      required: true,
    },
    {
      name: 'attack_sequence',
      description: 'Sequence of functions to call',
      type: 'array',
      required: true,
    },
    {
      name: 'expected_outcome',
      description: 'Expected test outcome',
      type: 'string',
      required: false,
      default: 'revert',
    },
  ],
  examples: [
    {
      name: 'Simple Example',
      parameters: {
        target_contract: '0x1234...5678',
        attack_sequence: ['deposit', 'withdraw', 'withdraw'],
        expected_outcome: 'revert',
      },
    },
  ],
};

// The actual test implementation
test('should prevent the security vulnerability', async ({ page }) => {
  const forge = new Audityzer(page);

  // Setup test environment
  await forge.setup({
    targetContract: PARAMETERS.TARGET_CONTRACT,
  });

  // Execute attack sequence
  const result = await forge.executeSequence(PARAMETERS.ATTACK_SEQUENCE);

  // Verify results
  if (PARAMETERS.EXPECTED_OUTCOME === 'revert') {
    expect(result.reverted).toBeTruthy();
    expect(result.revertReason).toContain('error');
  } else {
    expect(result.success).toBeTruthy();
  }
});
```

## Using Custom Templates

### Generating Tests From Templates

Generate tests from your templates:

```bash
# Generate a test from your template
npx Audityzer generate --template=my-custom-test --out=./tests/new-test.js

# Generate with specific parameters
npx Audityzer generate --template=my-custom-test --params=target_contract:0x1234,expected_outcome:success
```

### Interactive Template Selection

Browse and select templates interactively:

```bash
# Browse available templates
npx Audityzer templates browse

# Use interactive template generator
npx Audityzer generate --interactive
```

### Specifying Parameters

Parameters can be provided in several ways:

```bash
# Via command line arguments
npx Audityzer generate --template=my-custom-test --param target_contract=0x1234

# Via JSON file
npx Audityzer generate --template=my-custom-test --params-file=./params.json

# Via interactive prompts
npx Audityzer generate --template=my-custom-test --interactive
```

## Sharing Templates

### Packaging Templates

Package your templates for sharing:

```bash
# Package a single template
npx Audityzer template package --template=my-custom-test --output=./my-template.json

# Package multiple templates as a collection
npx Audityzer template package --templates=template1,template2 --collection="My Test Collection"
```

### Publishing Templates

Share templates with the community:

```bash
# Publish to the Audityzer template registry
npx Audityzer template publish --template=my-custom-test

# Publish a collection
npx Audityzer template publish --collection=./my-collection.json
```

### Importing Templates

Import templates from various sources:

```bash
# Import from a file
npx Audityzer template import --file=./received-template.json

# Import from the registry
npx Audityzer template import --id=template-registry-id

# Import from a GitHub repository
npx Audityzer template import --repo=username/repo --path=templates/my-template.js
```

## Template Categories

Templates are organized into categories:

### By Vulnerability Type

- Reentrancy
- Access Control
- Oracle Manipulation
- Flash Loan Attacks
- Front-running
- Logic Errors

### By Protocol Type

- ERC20 Tokens
- ERC721/NFTs
- DeFi Protocols
- AMMs
- Lending Platforms
- Governance Systems
- Bridges

### By Test Approach

- Fuzz Testing
- Property-based Testing
- State Transition Tests
- Economic Attacks
- Gas Optimization Checks

## Advanced Template Features

### Composable Test Components

Create and combine reusable test components:

```javascript
// Import test components
const { ReentrancyCheck, AccessControlCheck } = require('Audityzer/components');

// Use in your template
test('combined security test', async ({ page }) => {
  const forge = new Audityzer(page);

  // Run reentrancy check
  await ReentrancyCheck.run(forge, {
    target: PARAMETERS.TARGET_CONTRACT,
    functions: ['withdraw', 'deposit'],
  });

  // Run access control check
  await AccessControlCheck.run(forge, {
    target: PARAMETERS.TARGET_CONTRACT,
    restrictedFunctions: ['setOwner', 'withdrawAll'],
  });
});
```

### Dynamic Test Generation

Generate tests dynamically based on contract analysis:

```javascript
// Dynamic test generation based on contract analysis
const { ContractAnalyzer } = require('Audityzer/analysis');

module.exports = async function generateTests(contractPath) {
  // Analyze the contract
  const analyzer = new ContractAnalyzer();
  const analysis = await analyzer.analyze(contractPath);

  // Generate tests based on findings
  const tests = [];

  if (analysis.hasPayableFunctions) {
    tests.push(createEtherHandlingTest(analysis.payableFunctions));
  }

  if (analysis.hasAccessControl) {
    tests.push(createAccessControlTest(analysis.accessControlledFunctions));
  }

  return tests;
};
```

### Conditional Test Logic

Create templates with conditional test logic:

```javascript
// Conditional test logic
test('adaptive security test', async ({ page }) => {
  const forge = new Audityzer(page);

  // Deploy contract for testing
  const contract = await forge.deployContract(PARAMETERS.CONTRACT_SOURCE);

  // Determine which tests to run based on contract features
  const contractFeatures = await forge.analyzeContract(contract);

  if (contractFeatures.hasTokenTransfer) {
    await runTokenTransferTests(forge, contract);
  }

  if (contractFeatures.hasExternalCalls) {
    await runExternalCallTests(forge, contract);
  }
});
```

## Template Registry

Browse the public template registry:

```bash
# Search the template registry
npx Audityzer templates search "defi reentrancy"

# List templates by category
npx Audityzer templates list --category=flash-loan

# List templates by author
npx Audityzer templates list --author="secure-dev"
```

## Best Practices

When creating templates:

1. **Clear Documentation**: Clearly document all parameters and expected behavior
2. **Maintainable Structure**: Use a modular, well-structured approach
3. **Reasonable Defaults**: Provide sensible default values for parameters
4. **Complete Examples**: Include working examples to demonstrate usage
5. **Error Handling**: Include robust error handling and clear error messages
6. **Compatibility**: Test compatibility across different environments
7. **Versioning**: Use semantic versioning for your templates

## Example Use Cases

### Custom Protocol Testing

Create templates for specialized protocols:

```bash
# Generate a test for a specific lending protocol pattern
npx Audityzer generate --template=lending-liquidation-check --params=protocol:compound
```

### Team Standardization

Standardize testing across development teams:

```bash
# Create a company-specific template collection
npx Audityzer template collection create --name="CompanyStandards"

# Add required security tests to the collection
npx Audityzer template collection add --collection="CompanyStandards" --templates=access-control,reentrancy
```

### Audit Process Integration

Integrate templates into your audit process:

```bash
# Run all audit templates against a project
npx Audityzer audit --template-collection=audit-templates --project=./contracts
```

## Community Templates

Explore popular community-contributed templates:

- **Sandwich Attack Tester**: Tests DEX contracts for sandwich attack resistance
- **Governance Takeover Simulator**: Simulates governance attack scenarios
- **Oracle Failure Analyzer**: Tests contract behavior during oracle failures
- **Gas Optimization Checker**: Tests for gas inefficiencies
- **MEV Vulnerability Detector**: Detects MEV vulnerabilities in DeFi protocols
