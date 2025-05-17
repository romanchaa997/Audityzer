# Converting README to Docusaurus Documentation Site

Follow these steps to convert the README into a Docusaurus documentation site:

## 1. Install Docusaurus

```bash
# Create a docs directory
mkdir -p docs-site
cd docs-site

# Initialize a new Docusaurus site
npx @docusaurus/init@latest init Audityzer-docs classic
cd Audityzer-docs
```

## 2. Structure Documentation Content

Organize the README content into multiple documentation pages:

1. Create the following markdown files in the `docs` directory:

```
docs/
  intro.md
  installation.md
  quickstart.md
  commands.md
  wallet-support.md
  presets.md
  configuration.md
  wallet-state-snapshots.md
  features.md
  security-testing.md
```

2. Split the README content into these files. For example:

```markdown
## // intro.md

## sidebar_position: 1

# Audityzer

Automated test scaffolding for the battle-tested Web3 developer who doesn't have time for bullshit.

## Why This Exists

Every decent web3 project has smart contract tests. Few have UI tests. That's a security nightmare.

This tool generates test templates that automate the previously unautomatable: MetaMask interactions, wallet connections, transaction signing, and network switching - all through programmable interfaces.
```

## 3. Configure Docusaurus

Update `docusaurus.config.js` with project information:

```js
module.exports = {
  title: 'Audityzer',
  tagline: 'Automated test scaffolding for Web3 developers',
  url: 'https://Audityzer.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: Audityzer',
  projectName: 'Audityzer',
  // ...rest of config
};
```

## 4. Add Custom Styles and Images

1. Copy the quickstart GIF to `static/img/` directory
2. Add a custom CSS to `src/css/custom.css`

## 5. Build and Deploy

```bash
# Build the site
npm run build

# Test locally
npm run serve

# Deploy (options include GitHub Pages, Netlify, Vercel)
# For GitHub Pages:
GIT_USER=<GITHUB_USERNAME> npm run deploy
```

## Alternative: SvelteKit Setup

If you prefer SvelteKit over Docusaurus:

```bash
# Create a new SvelteKit project
npm create svelte@latest Audityzer-docs
cd Audityzer-docs
npm install

# Install markdown processing packages
npm install -D mdsvex

# Configure SvelteKit for documentation site
# See mdsvex documentation for configuration
```
