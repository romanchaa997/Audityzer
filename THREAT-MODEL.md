# Threat Model

This document describes the main security threats relevant to Audityzer and its operational environment. It is intended to help contributors reason about risks and prioritize security controls.

## Security goals
- Protect repository integrity
- Prevent unauthorized code or workflow execution
- Protect secrets and environment credentials
- Preserve user trust in the generated risk assessments
- Reduce exposure to supply-chain and automation risks

## Assets
The following assets are considered important:
- Source code and repository contents
- GitHub Actions workflows
- Secrets and environment variables
- CI/CD pipeline configuration
- Generated reports and audit artifacts
- External API tokens and connected services
- User and customer data processed by the platform

## Key threat actors
- External attackers targeting public repos or exposed infrastructure
- Malicious contributors or supply-chain actors
- Compromised dependencies or third-party libraries
- Misconfigured automation or workflows
- Prompt injection or unsafe automation patterns
- Credential leakage through logs, issue content, or pull requests
- Social engineering targeting maintainers or administrators

## Threats and risks

### 1. Credential leakage
Risk:
- API keys, tokens, or secrets are accidentally committed or exposed in logs or workflows

Mitigations:
- Use GitHub Secrets only
- Do not paste secrets into prompts or issue comments
- Block secret scanning failures in CI
- Rotate credentials when necessary
- Review workflow logs and artifact handling

### 2. Malicious workflow execution
Risk:
- Untrusted code or automation can trigger branch changes, deployments, or secret access

Mitigations:
- Require approval for workflow runs
- Restrict automation permissions to the minimal scope
- Use CODEOWNERS and branch protection
- Review workflow trigger conditions and permissions carefully

### 3. Supply-chain compromise
Risk:
- Dependency vulnerabilities or malicious package changes affect the project

Mitigations:
- Enable dependency review
- Keep dependencies updated
- Prefer trusted sources and pinned versions where possible
- Review automated dependency updates

### 4. Code tampering or unsafe PRs
Risk:
- Contributors submit malicious code or workflows

Mitigations:
- Require code review
- Use branch protection
- Restrict privileged actions to trusted maintainers
- Enforce approval rules for critical changes

### 5. Prompt injection and unsafe AI automation
Risk:
- AI agents or automation act on user-controlled content in ways that bypass security assumptions

Mitigations:
- Limit automation scope
- Do not grant broad repository write permissions
- Separate untrusted input from privileged operations
- Validate outputs before execution

### 6. Data exposure
Risk:
- Generated audit output, logs, or customer reports expose internal information

Mitigations:
- Classify sensitive data
- Use secure storage and access controls
- Avoid logging sensitive values
- Review report generation and exporting flows

## Security assumptions
- The repository is a public-facing project and therefore exposed to common open-source attack patterns
- Automation must be treated as privileged infrastructure
- Security review is required for workflow, secret, and pipeline changes
- Critical system changes require explicit maintainer approval

## Security controls in scope
- Branch protection
- CODEOWNERS
- Actions permissions review
- Dependency scanning
- Secret scanning
- Secure coding and review practices
- Minimal automation permissions
- Evidence-based remediation tracking

## Residual risk
Some residual risk remains due to:
- external dependency trust
- user-contributed code
- internet-exposed integrations
- operational complexity of automation

This risk is managed through policy, review, approval controls, and continuous monitoring.
