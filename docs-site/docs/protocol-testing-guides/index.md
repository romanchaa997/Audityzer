# Protocol-Specific Testing Guides

Welcome to the Audityzer protocol-specific testing guides. These comprehensive guides provide detailed instructions, best practices, and examples for testing different blockchain protocols and applications.

## Available Protocol Guides

- [DeFi Protocols](./defi-protocols.md)
- [NFT Marketplaces](./nft-marketplaces.md)
- [ERC20 Token Contracts](./erc20-tokens.md)
- [ERC721/ERC1155 Contracts](./nft-contracts.md)
- [Bridge Security](./bridge-security.md)
- [AMM & DEX Testing](./amm-dex-testing.md)
- [Lending Protocols](./lending-protocols.md)
- [Staking Contracts](./staking-contracts.md)
- [Governance Mechanisms](./governance.md)

## Layer 2 Protocol Guides

- [zkSync Era Testing](./zksync-era.md)
- [Polygon zkEVM Testing](./polygon-zkevm.md)
- [Linea Testing](./linea.md)
- [Optimism Testing](./optimism.md)
- [Arbitrum Testing](./arbitrum.md)
- [Base Testing](./base.md)

## Guide Structure

Each protocol guide follows a consistent structure:

1. **Protocol Overview**: Key concepts and architecture
2. **Common Vulnerabilities**: Protocol-specific security issues
3. **Testing Strategy**: Comprehensive approach for thorough testing
4. **Test Scenarios**: Specific test cases with examples
5. **Code Examples**: Ready-to-use test templates
6. **Best Practices**: Security recommendations for developers
7. **Case Studies**: Real-world vulnerability examples

## Using the Guides

These guides can be used in several ways:

- **Security Audits**: Framework for comprehensive audits
- **Pre-deployment Testing**: Verification before mainnet deployment
- **Continuous Security Testing**: Ongoing validation during development
- **Learning Resource**: Understanding protocol-specific security concerns

## Interactive Examples

Throughout the guides, you'll find interactive examples you can run directly:

```bash
# Example: Test ERC20 token approval vulnerability
npx Audityzer test erc20 --scenario=approval-race-condition
```

## Community Contributions

These guides are continuously improved with community input. To contribute:

1. Submit pull requests with guide enhancements
2. Share your testing experiences and findings
3. Suggest new protocols that need specialized testing guides

## Custom Testing Workflows

For teams with specific needs, use our guide builder to create custom testing workflows:

```bash
# Generate a custom testing guide for your protocol
npx Audityzer guide-builder --protocol=my-protocol --template=defi
```

## Stay Updated

Protocol security best practices evolve rapidly. These guides are regularly updated to reflect:

- New vulnerability discoveries
- Protocol upgrades and changes
- Improved testing methodologies
- Community feedback and contributions

Check the "Last Updated" date at the top of each guide to ensure you're using the most current recommendations.
