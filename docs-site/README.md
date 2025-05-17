# Audityzer Documentation Site

This directory contains the Docusaurus-powered documentation site for Audityzer.

## Getting Started

### Installation

```bash
# Navigate to the docs-site directory
cd docs-site

# Install dependencies
npm install
```

### Local Development

```bash
# Start the development server
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
# Build the static site
npm run build
```

This command generates static content into the `build` directory and can be served using any static content hosting service.

### Deployment

```bash
# Deploy to GitHub Pages
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push it to the `gh-pages` branch.

## Documentation Structure

The documentation is organized into the following sections:

- **Getting Started**: Introduction, installation, and quickstart guides
- **Usage Guide**: Commands, wallet support, presets, and configuration
- **Advanced Features**: Wallet state snapshots, security testing, performance benchmarking
- **Reference**: Template structure, mobile wallets, cross-chain testing
- **Test Result Reporting**: Reporting overview and vulnerability categorization
- **Guides**: Real wallet integration and community test examples

## Contributing to Documentation

1. Create a new Markdown file in the `docs` directory
2. Add the frontmatter with `sidebar_position` to control the order
3. Update the `sidebars.js` file if adding a new section
4. Submit a pull request with your changes

## Customizing the Site

- Edit `docusaurus.config.js` to modify site configuration
- Customize styling in `src/css/custom.css`
- Modify the landing page in `src/pages/index.js`

## Documentation Standards

- Use clear, concise language
- Include code examples where appropriate
- Add cross-references to related documentation
- Use proper Markdown formatting
- Include images and diagrams when helpful
