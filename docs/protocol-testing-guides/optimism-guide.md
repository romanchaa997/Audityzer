# Optimism Protocol Testing Guide

This guide covers the testing process for smart contracts deployed on Optimism, focusing on network-specific vulnerabilities and security considerations.

## Table of Contents

- [Introduction](#introduction)
- [Optimism Architecture Overview](#optimism-architecture-overview)
- [Common Security Risks](#common-security-risks)
- [Testing Methodology](#testing-methodology)
- [Cross-Domain Messaging](#cross-domain-messaging)
- [Using the Optimism Validator](#using-the-optimism-validator)
- [Example Test Cases](#example-test-cases)
- [Best Practices](#best-practices)

## Introduction

[Optimism](https://www.optimism.io/) is an Ethereum Layer 2 scaling solution that uses Optimistic Rollups to increase transaction throughput while maintaining security guarantees from Ethereum. While many vulnerabilities that affect Ethereum also apply to Optimism, there are specific considerations that must be taken into account when deploying and testing on this Layer 2 platform.

## Optimism Architecture Overview

Optimism consists of several key components:

- **L1 Contracts**: Contracts deployed on Ethereum mainnet that handle deposits, withdrawals, and challenges
- **L2 Chain**: A separate chain where transactions are executed with higher throughput and lower costs
- **Cross-Domain Messengers**: Contracts that facilitate communication between L1 and L2
- **Standard Bridges**: Contracts that handle token deposits and withdrawals
- **OptimismPortal**: The entry and exit point for messages between L1 and L2

## Common Security Risks

### 1. Cross-Domain Vulnerabilities

When interacting between L1 and L2, several unique vulnerabilities can emerge:

- **Message Sender Confusion**: The apparent message sender in cross-domain contexts differs from traditional transactions
- **Replay Attacks**: Messages might be replayed if proper nonce management is not implemented
- **Message Validation**: Failure to properly validate cross-domain messages can lead to unauthorized access

### 2. Gas Metering Differences

Optimism handles gas differently than Ethereum:

- **L1 to L2 Gas**: When sending messages from L1 to L2, gas must be specified carefully
- **L2 Gas Limitations**: Gas limitations and costs operate differently on Optimism
- **L1 Data Costs**: Transactions on L2 incur L1 data costs based on calldata size

### 3. Withdrawal-Specific Risks

- **7-Day Finalization Period**: Withdrawals from L2 to L1 require a 7-day finalization period
- **Failed Withdrawals**: Withdrawals can fail on L1 after the finalization period if not properly implemented

### 4. Contract Differences

- **`block.timestamp`**: Has a lower precision on Optimism
- **`blockhash`**: Function works differently on Optimism
- **`block.coinbase`**: Returns a predetermined address on Optimism

## Testing Methodology

When testing Optimism contracts, follow these steps:

1. **Environment Setup**: Configure a local Optimism testnet or use public testnets (Optimism Goerli)
2. **L1/L2 Communication**: Test all cross-domain message scenarios
3. **Withdrawal Testing**: Verify the full withdrawal flow including L2 to L1 message passing
4. **Gas Optimization**: Test for gas efficiency given the L1 data costs
5. **Security Verification**: Run Optimism-specific security checks

## Cross-Domain Messaging

### From L1 to L2

Messages from L1 to L2 use the `L1CrossDomainMessenger` contract:

```solidity
// On L1
function sendMessageToL2(address l2Target, bytes memory message) external {
    // Get the L1 Cross Domain Messenger
    address l1MessengerAddr = 0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1;
    IL1CrossDomainMessenger messenger = IL1CrossDomainMessenger(l1MessengerAddr);

    // Send the message
    messenger.sendMessage(
        l2Target,
        message,
        1000000  // Gas limit on L2
    );
}
```

### From L2 to L1

Messages from L2 to L1 use the `L2CrossDomainMessenger` contract:

```solidity
// On L2
function sendMessageToL1(address l1Target, bytes memory message) external {
    // Get the L2 Cross Domain Messenger
    address l2MessengerAddr = 0x4200000000000000000000000000000000000007;
    IL2CrossDomainMessenger messenger = IL2CrossDomainMessenger(l2MessengerAddr);

    // Send the message
    messenger.sendMessage(
        l1Target,
        message,
        0  // Gas limit for L1 execution
    );
}
```

### Receiving Messages

When receiving cross-domain messages, always validate the sender:

```solidity
// On L2, receiving a message from L1
function receiveFromL1(bytes memory message) external {
    // Get the L2 Cross Domain Messenger
    address l2MessengerAddr = 0x4200000000000000000000000000000000000007;

    // Ensure message came from the messenger
    require(msg.sender == l2MessengerAddr, "Not from messenger");

    // Get the original L1 sender
    address l1Sender = IL2CrossDomainMessenger(l2MessengerAddr).xDomainMessageSender();

    // Validate the L1 sender is authorized
    require(l1Sender == authorizedL1Sender, "Unauthorized sender");

    // Process the message
    // ...
}
```

## Using the Optimism Validator

Our toolkit includes an `OptimismValidator` specifically designed to test for Optimism-specific vulnerabilities:

```javascript
const { OptimismValidator } = require('@Audityzer/cross-chain');

async function testOptimismContract() {
  // Initialize the validator
  const validator = new OptimismValidator({
    l2RpcUrl: 'https://goerli.optimism.io',
    l1RpcUrl: 'https://goerli.infura.io/v3/YOUR_API_KEY',
  });

  // Test a cross-domain message
  const messageTesting = await validator.validateCrossDomainMessage({
    target: '0x1234...', // L2 target address
    message: '0xabcd...', // Message data
    gasLimit: 100000, // L2 gas limit
    l1Sender: '0x5678...', // L1 sender address
  });

  console.log('Message validation results:', messageTesting);

  // Test withdrawal validation
  const withdrawalResults = await validator.validateWithdrawal({
    l2Token: '0x4200000000000000000000000000000000000006', // ETH = 0x4200...0006
    amount: '1000000000000000000', // 1 ETH
    recipient: '0x9876...',
    l1Gas: 200000,
  });

  console.log('Withdrawal validation results:', withdrawalResults);

  // Generate test cases
  const testCase = await validator.generateCrossDomainTestCase({
    title: 'L1 to L2 Message Test',
  });

  console.log('Generated test case:', testCase);
}
```

## Example Test Cases

### Test Case 1: L1 to L2 ETH Deposit

```javascript
describe('L1 to L2 ETH Deposit', function () {
  it('should correctly deposit ETH from L1 to L2', async function () {
    // L1 setup
    const l1Signer = l1Provider.getSigner();
    const deposit = ethers.utils.parseEther('0.1');

    // Get OptimismPortal contract on L1
    const portalAddress = '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed';
    const portal = new ethers.Contract(portalAddress, portalAbi, l1Signer);

    // Recipient on L2
    const recipient = await l1Signer.getAddress();

    // Send deposit transaction
    const depositTx = await portal.depositTransaction(
      recipient, // to
      deposit, // value
      100000, // gasLimit
      false, // isCreation
      '0x' // data
    );

    // Wait for transaction to be included on L1
    await depositTx.wait();

    // Wait for deposit to be reflected on L2 (may take several minutes)
    // Use the SDK to wait for the deposit to be processed
    // ...

    // Verify the deposit was successful on L2
    const l2Balance = await l2Provider.getBalance(recipient);
    expect(l2Balance.gte(deposit)).to.be.true;
  });
});
```

### Test Case 2: Validating Message Sender on L2

```javascript
describe('L1 to L2 Message Security', function () {
  it('should reject messages from unauthorized L1 senders', async function () {
    // Deploy test contract on L2
    const L2Receiver = await ethers.getContractFactory('L2Receiver');
    const receiver = await L2Receiver.deploy(authorizedL1Sender);
    await receiver.deployed();

    // On L1, send a message from an unauthorized account
    const l1Signer = l1Provider.getSigner(unauthorizedAccount);

    // Get L1CrossDomainMessenger contract
    const messengerAddress = '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1';
    const messenger = new ethers.Contract(messengerAddress, messengerAbi, l1Signer);

    // Send message to L2
    const message = ethers.utils.defaultAbiCoder.encode(['string'], ['Hello from L1']);

    const tx = await messenger.sendMessage(receiver.address, message, 1000000);
    await tx.wait();

    // Wait for message to be processed on L2
    // ...

    // Verify the message was rejected due to sender validation
    const events = await receiver.queryFilter(receiver.filters.MessageRejected());
    expect(events.length).to.equal(1);
    expect(events[0].args.sender).to.equal(unauthorizedAccount);
  });
});
```

## Best Practices

1. **Always validate message senders** in cross-domain communication
2. **Use the canonical bridges** for token transfers instead of custom implementations
3. **Account for the 7-day withdrawal period** in your application design
4. **Test with realistic gas parameters** to ensure transactions will succeed
5. **Use the OptimismValidator** to catch L2-specific vulnerabilities
6. **Be cautious with `block` properties** as they work differently on Optimism
7. **Provide sufficient gas for L2 execution** when sending messages from L1
8. **Implement proper nonce handling** to prevent replay attacks
9. **Consider L1 data costs** when optimizing gas usage
10. **Test the full withdrawal flow** including claiming on L1 after the finalization period

By following these guidelines and testing thoroughly, you can ensure your contracts operate securely on the Optimism network while taking advantage of the scalability benefits it provides.
