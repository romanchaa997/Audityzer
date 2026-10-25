# Security Policy

This repository is used for the development of Audityzer / AuditorSEC. The goal of this policy is to define the minimum security expectations for repository access, code quality, automation, secrets handling, and vulnerability disclosure.

## 1. Scope

This policy applies to:
- all contributors and maintainers;
- all GitHub workflows and automation;
- environment variables, tokens, API keys, and secrets;
- dependency management and CI/CD configuration;
- code, infrastructure, and security-sensitive product assets.

## 2. Security principles

We follow these principles:
- least privilege for access and permissions;
- no secrets in source code, PR descriptions, issues, logs, or prompts;
- all risk-bearing changes must be reviewed before merge;
- protected automation must require explicit approval;
- production data and secrets must be isolated from untrusted automation.

## 3. Repository access

All repositories handling production or sensitive assets must enforce:
- branch protection on the default branch;
- required pull request reviews before merge;
- required status checks before merge;
- CODEOWNERS for critical content paths;
- secret scanning enabled;
- dependency review enabled;
- vulnerability alerts enabled.

Changes involving:
- CI/CD configuration;
- workflow files;
- authentication or access logic;
- dependencies or supply-chain security;
- customer data handling;
- compliance policies;

must be reviewed by at least one maintainer.

## 4. Secure development standards

### Code review
- No direct push to protected branches without review.
- Every change must include a clear purpose and rationale.
- Security-sensitive changes require maintainer review.
- Breaking changes must be documented in the PR description.

### Dependencies
- Keep dependencies updated and reviewed.
- Address known vulnerabilities promptly.
- Prefer supported and maintained libraries.
- Use lockfiles and reproducible build workflows.

### Secrets handling
Secrets must never be:
- committed into source code;
- pasted into issues, PRs, or comments;
- printed in logs or generated output;
- included in prompts sent to external tools or models.

Secrets must be stored only in:
- GitHub Secrets;
- a dedicated secret manager or vault;
- environment-specific secure storage with restricted access.

## 5. GitHub automation and AI policy

All automation must:
- have a stated purpose and owner;
- use the minimum required permissions;
- avoid access to production secrets unless necessary and approved;
- be restricted to the triggering resource whenever possible;
- generate audit logs and outputs;
- support rollback or disablement.

Automated tools must not:
- run unreviewed code with broad repository access;
- write to arbitrary repository paths by default;
- expose tokens, credentials, or customer data in logs;
- operate on production systems without explicit approval.

## 6. Vulnerability disclosure

Security problems must be reported privately and responsibly.

Do not disclose vulnerabilities in public issues or public pull requests.

Contact repository maintainers or the designated security contact with:
- affected component or area;
- reproduction steps;
- severity and impact assessment;
- suggested remediation when known.

We will acknowledge valid reports and work toward remediation in a reasonable timeframe.

## 7. Workflow security

Workflows must:
- use minimal permissions;
- avoid unnecessary secret access;
- validate third-party actions before use;
- pin actions to commit SHAs when possible;
- avoid curl-based execution of remote scripts from untrusted sources;
- run static security checks in CI.

No workflow should execute untrusted code in a way that could affect protected repository resources.

## 8. Incident handling

If a security issue is identified:
1. Contain the issue and reduce exposure.
2. Preserve evidence and logs.
3. Notify maintainers and stakeholders.
4. Assess whether secrets, data, or credentials were exposed.
5. Create a remediation plan.
6. Record findings and lessons learned.

## 9. Exceptions

Exceptions to this policy require:
- a reasoned justification;
- maintainer approval;
- time-bound validity;
- compensating security controls.

## 10. Enforcement

Violations of this policy may result in:
- restriction of access;
- PR rejection;
- removal of automation privileges;
- escalation to maintainers and compliance stakeholders if necessary.

Audityzer is expected to operate with secure-by-default practices at all times.

## 11. Related documents

- THREAT-MODEL.md
- AUTOMATION-POLICY.md
- CODEOWNERS
- README.md
- workflows and CI configuration
