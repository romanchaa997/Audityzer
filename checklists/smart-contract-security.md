# Smart Contract Security Checklist

## Security Items by Severity

### Critical 🔴
✅ Use SafeMath or built-in overflow checks (Solidity 0.8.0+) — 🔴 Critical  
✅ Avoid reentrancy vulnerabilities (use ReentrancyGuard) — 🔴 Critical  
✅ Validate input parameters (require statements) — 🔴 Critical  
✅ Protect against flash loan attacks — 🔴 Critical  
✅ Use access control for privileged functions — 🔴 Critical  

### High 🟠
✅ Apply "Checks-Effects-Interactions" pattern — 🟠 High  
✅ Use OpenZeppelin libraries — 🟠 High  
✅ Set appropriate visibility (public/private/internal) — 🟠 High  
✅ Avoid hardcoded addresses or secrets — 🟠 High  
✅ Protect against front-running (use commit-reveal if needed) — 🟠 High  
✅ Beware of timestamp manipulation (block.timestamp issues) — 🟠 High  
✅ Check for integer underflow/overflow — 🟠 High  

### Medium 🟡
✅ Use latest compiler version — 🟡 Medium  
✅ Limit `selfdestruct` usage — 🟡 Medium  
✅ Have fallback functions under control — 🟡 Medium  
✅ Audit before mainnet deployment (even with test coverage) — 🟡 Medium  
✅ Implement circuit breakers/pause mechanisms — 🟡 Medium  
✅ Avoid tx.origin for authentication — 🟡 Medium  

### Low 🟢
✅ Add NatSpec comments — 🟢 Low  
✅ Use events for important state changes — 🟢 Low  
✅ Consider gas optimization but not at expense of security — 🟢 Low  

## Practice Examples

### Sample Vulnerable Contracts
Learn by identifying vulnerabilities in these practice challenges:

- **Ethernaut Challenges** - Gamified smart contract hacking
  - [Fallback](https://ethernaut.openzeppelin.com/level/0x9CB391dbcD447E645D6Cb55dE6ca23164130D008) - Ownership takeover vulnerability
  - [Fallout](https://ethernaut.openzeppelin.com/level/0x5732B2F88cbd19B6f01E3a96e9f0D90B917281E5) - Constructor naming issue
  - [Re-entrancy](https://ethernaut.openzeppelin.com/level/0x4dF32584890A0026e56f7535d0f2C6486753624f) - Classic reentrancy attack
  - [Denial](https://ethernaut.openzeppelin.com/level/0xf1D573178225513eDAA795bE9206f7E311EeDEc3) - Denial of service
  - [Full Challenges List](https://ethernaut.openzeppelin.com/) - 20+ challenges covering different vulnerabilities

- **Damn Vulnerable DeFi**
  - [Unstoppable](https://www.damnvulnerabledefi.xyz/challenges/unstoppable/) - Flash loan manipulation
  - [Naive Receiver](https://www.damnvulnerabledefi.xyz/challenges/naive-receiver/) - Unprotected functions
  - [Truster](https://www.damnvulnerabledefi.xyz/challenges/truster/) - Unsafe external calls 
  - [Side Entrance](https://www.damnvulnerabledefi.xyz/challenges/side-entrance/) - Alternative attack vectors
  - [Full Challenges List](https://www.damnvulnerabledefi.xyz/) - Comprehensive DeFi vulnerabilities examples

- **Capture The Ether**
  - [Predict the Future](https://capturetheether.com/challenges/lotteries/predict-the-future/) - Randomness manipulation
  - [Token Sale](https://capturetheether.com/challenges/math/token-sale/) - Integer overflow
  - [Retirement Fund](https://capturetheether.com/challenges/math/retirement-fund/) - Force-sending Ether
  - [Full Challenges List](https://capturetheether.com/) - Classic Ethereum vulnerabilities

## Recommended Tools

- [Remix Analyzer](https://remix.ethereum.org/) - Browser-based IDE with built-in static analysis
- [MythX](https://mythx.io/) - Security verification platform for Ethereum smart contracts
- [Slither](https://github.com/crytic/slither) - Static analysis framework with detectors for many common Solidity issues
- [Echidna](https://github.com/crytic/echidna) - Ethereum smart contract fuzzer for property-based testing
- [Manticore](https://github.com/trailofbits/manticore) - Symbolic execution tool for analysis of smart contracts and binaries

## Additional Resources

- [ConsenSys Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [Ethereum Smart Contract Security Best Practices](https://ethereum.org/en/developers/docs/smart-contracts/security/)
- [SWC Registry](https://swcregistry.io/) - Smart Contract Weakness Classification and Test Cases
