/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro', 'quickstart', 'installation', 'cli-reference'],
    },
    {
      type: 'category',
      label: 'Core Features',
      items: [
        'wallet-support',
        'real-wallet-integration',
        'mobile-wallets',
        'wallet-state-snapshots',
        'cross-chain-testing',
        'user-defined-test-templates',
        'searchable-vulnerability-database',
      ],
    },
    {
      type: 'category',
      label: 'Protocol Testing Guides',
      items: [
        'protocol-testing-guides/index',
        'protocol-testing-guides/defi-protocols',
        {
          type: 'link',
          label: 'NFT Marketplaces',
          href: '/docs/protocol-testing-guides/nft-marketplaces',
        },
        {
          type: 'link',
          label: 'ERC20 Tokens',
          href: '/docs/protocol-testing-guides/erc20-tokens',
        },
        {
          type: 'link',
          label: 'Bridge Security',
          href: '/docs/protocol-testing-guides/bridge-security',
        },
      ],
    },
    {
      type: 'category',
      label: 'Visualization & Reporting',
      items: [
        'customizable-reporting',
        'interactive-visualization-builder',
        'reporting-overview',
        'vulnerability-categorization',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: ['ci-integration', 'bounty-integration', 'codecov-integration'],
    },
    {
      type: 'category',
      label: 'Examples & Community',
      items: ['community-test-examples'],
    },
  ],
};

module.exports = sidebars;
