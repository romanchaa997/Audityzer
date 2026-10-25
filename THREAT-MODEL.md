# Threat Model for Audityzer

This document describes the main threats to the repository, platform, and product workflow for Audityzer / AuditorSEC. The goal is to identify realistic risks and define minimum controls that reduce them.

## 1. Purpose and scope

This threat model covers:
- repository security;
- source code and dependency protection;
- CI/CD automation;
- secrets and credentials handling;
- AI / automation usage;
- product delivery environments;
- external integrations and customer-facing workflows.

## 2. Assets

The following assets are considered critical:
- source code and intellectual property;
- customer data and audit results;
- secrets, API keys, and service credentials;
- GitHub repository access and workflow permissions;
- CI/CD pipelines and deployment automation;
- infrastructure configuration and runtime environment;
- product documentation and customer deliverables.

## 3. Trust boundaries

Trust boundaries include:
- developer workstation to GitHub;
- GitHub repository to workflow runner;
- workflow runner to secrets and repository resources;
- external service integrations (GitHub, cloud providers, email, monitoring);
- customer data to internal processing and reporting;
- public repository content versus private security-sensitive content.

## 4. Threat actors

Potential threat actors include:
- external attacker;
- compromised maintainer or contributor account;
- malicious dependency or compromised package;
- phishing or credential theft;
- prompt injection or malicious automation input;
- supply-chain attack against workflow actions or dependencies;
- insider misuse of repository access;
- customer or partner misuse of generated reports or access.

## 5. Main threat categories

### 5.1 Credential compromise
Risk:
- leaked tokens or API keys;
- stolen GitHub session or PAT;
- secrets embedded in repository or logs.

Controls:
- no secrets in code or prompts;
- GitHub Secrets only;
- restricted permissions;
- MFA for maintainers;
- secret scanning enabled.

### 5.2 CI/CD abuse
Risk:
- unauthorized workflow execution;
- malicious PR-triggered code execution;
- repository tampering;
- secret exposure to untrusted code.

Controls:
- approval for workflow runs;
- limit automation scope;
- write permissions restricted to the triggering resource;
- maintainer review for high-risk workflows;
- no production secrets in untrusted execution paths.

### 5.3 Supply chain compromise
Risk:
- compromised dependency;
- malicious GitHub action;
- tainted package or update with malicious behavior.

Controls:
- dependency review and vulnerability scanning;
- pinning actions to commit SHAs;
- verification of third-party action sources;
- human review of dependency updates.

### 5.4 Prompt injection and automation misuse
Risk:
- automated systems acting on untrusted input;
- prompt injection through issue or PR content;
- AI agent making unsafe repository changes.

Controls:
- restrict automation to trusted write-capable users;
- require approval for service-triggered automation;
- keep workflows deterministic and minimal;
- avoid exposing secrets in prompts;
- maintain explicit task scope.

### 5.5 Insider misuse
Risk:
- excessive repository permissions;
- unauthorized export of customer data;
- direct modification of critical files.

Controls:
- least-privilege access;
- CODEOWNERS;
- reviewer requirements;
- audit logs;
- access reviews.

### 5.6 Data leakage and disclosure
Risk:
- customer audit results exposed in public repos;
- credentials or environment values leaked;
- reports containing sensitive posture data published without control.

Controls:
- data classification policy;
- secure sharing practices;
- private reporting by default;
- customer-specific access restrictions.

## 6. Security requirements by risk area

### Repository
- branch protection;
- required reviews;
- required status checks;
- CODEOWNERS;
- secret scanning;
- dependency review.

### Automation
- maintainers approve workflow execution;
- automation writes are limited;
- no production secrets in non-production flows;
- restricted automation permissions.

### Code
- secure coding standards;
- dependency hygiene;
- static scanning in CI;
- review for security-sensitive changes.

### Data
- enforce minimum-disclosure practices;
- protect internal products and customer reports;
- separate production data from development data.

## 7. High-risk change categories

The following categories should be treated as high risk:
- CI/CD configuration;
- workflow files;
- IAM or authentication logic;
- deployment and infrastructure automation;
- secrets and environment configuration;
- customer data handling;
- compliance and policy logic.

These changes must have:
- explicit owner;
- reviewed PR;
- rollback or disable path;
- logging and evidence of execution.

## 8. Security assumptions

The following assumptions are valid:
- GitHub accounts can be targeted by phishing or compromise;
- repository access may be abused by insiders or stolen tokens;
- automation can become a security risk if unconstrained;
- unverified third-party actions or scripts can introduce security issues;
- public repositories should never contain production secrets or customer data.

## 9. Residual risk

Residual risk remains in the following areas:
- external services and APIs;
- dependency vulnerabilities;
- insider risk from authorized users;
- gaps in human review of workflows.

This risk is reduced by:
- consistent security review;
- human approvals for critical actions;
- limited automation and access;
- monitoring of dependencies and secrets.

## 10. Review and update

This document must be reviewed:
- quarterly; or
- after any major change in architecture, automation, or data handling.

Maintainers are responsible for keeping the threat model aligned with the repository’s actual risk profile.
