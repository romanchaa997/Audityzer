# Security Policy

## Dependency Security Management

This project has implemented several layers of protection to manage and mitigate security vulnerabilities in dependencies:

### Automated Vulnerability Fixes

When you install dependencies with `npm install`, our post-install scripts automatically:

1. Resolve dependency conflicts that could cause compatibility issues
2. Fix known security vulnerabilities by upgrading affected packages to safe versions
3. Configure npm to ignore low/moderate severity issues that only affect development dependencies

### Running Security Audits

To check for security vulnerabilities:

```bash
# Regular audit (may show known dev dependency issues)
npm audit

# Production-only audit (ignores dev dependencies)
npm audit --production

# Audit only for critical issues
npm run audit:all

# Fix critical vulnerabilities (be careful with breaking changes)
npm run fix:vulnerabilities
```

### Handling Known Issues

Some development dependencies (like testing tools) may have vulnerabilities that don't affect production code. These are tracked and managed through:

1. Package resolutions in `package.json`
2. Specific settings in `.npmrc`
3. CI-specific configuration in `.npmrc-ci`
4. Acknowledged exceptions in `.nsprc`

#### Known Development Dependencies with Vulnerabilities

The following development dependencies have vulnerabilities that don't affect production code:

1. **lodash.set** - Has a prototype pollution vulnerability (GHSA-p6mc-m468-83gw)
   - Used by: lighthouse in @lhci/cli (development testing tool)
   - Mitigation: Overridden in package.json, exceptions tracked in .nsprc
   - Production impact: None (not included in production builds)

2. **cookie** - Accept cookie with out of bounds characters (GHSA-pxg6-pf52-xh8x)
   - Used by: raven in lighthouse in @lhci/cli (development testing tool)
   - Mitigation: Overridden in package.json, exceptions tracked in .nsprc
   - Production impact: None (not included in production builds)

### CI Security Checking

Our GitHub workflow automatically checks for security issues on:
- Every push to main branches
- Pull requests to protected branches
- Weekly scheduled scans

### Reporting New Vulnerabilities

If you discover a security vulnerability in this project, please report it by:

1. **DO NOT** create a public GitHub issue
2. Send details to [security@example.com](mailto:security@example.com)
3. Include steps to reproduce and potential impact

## Security Best Practices

When working with this codebase:

1. Keep all dependencies updated
2. Run security audits before deploying
3. Never expose sensitive credentials in code
4. Follow the security patterns established in the codebase

## Responsible Disclosure

We follow responsible disclosure practices and will:
- Acknowledge receipt within 48 hours
- Provide regular updates on progress
- Credit discoverers (if desired)
- Publish details after fixes are available 