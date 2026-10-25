# Automation Policy

This document defines the rules for automation in the Audityzer repository. The goal is to enable useful automation while avoiding secret exposure, repository misuse, and unreviewed actions that can affect protected resources.

## 1. Objective

Automation may be used to:
- run CI validation;
- scan for secrets or vulnerabilities;
- generate reports;
- validate code quality;
- support secure engineering workflows.

Automation must never be used to:
- bypass human review for security-sensitive changes;
- run untrusted code with access to production secrets;
- write to arbitrary repository paths;
- modify customer data or environment without explicit approval;
- expose credentials in logs, issues, or generated artifacts.

## 2. General principles

Every automation workflow must have:
- a clear owner;
- a documented purpose;
- a limited scope;
- a rollback or disable plan;
- audit logging;
- approval requirements when risk is moderate or high.

## 3. Allowed automation

Allowed automation includes:
- scheduled or PR-triggered code scanning;
- dependency review checks;
- secret scanning;
- security linting;
- static analysis and build validation;
- automated reporting for non-sensitive information.

Allowed automation must:
- run with the minimum required permissions;
- not write to protected branches without approval;
- not read or expose secrets unless necessary and approved;
- only act on the triggering repository or resource where possible.

## 4. Disallowed automation

The following are prohibited unless explicitly approved by maintainers:
- workflows that write to arbitrary paths in the repository;
- automation with broad repository access beyond the task requirement;
- execution of remote scripts from unverified URLs;
- internet fetches from untrusted sources in protected workflows;
- secret injection into prompts, logs, issues, or generated output;
- production automation without explicit human approval.

## 5. GitHub security requirements

Follow these safe defaults:
- Require approval for workflow runs.
- Restrict automation to users with write access.
- Limit automation writes to the triggering resource.
- Prefer manual review for workflows affecting sensitive configuration.
- Keep workflow permissions explicit and minimal.

When using GitHub Actions:
- do not grant broad default permissions;
- pin action versions or SHAs;
- verify third-party actions before use;
- validate all workflow changes via PR review.

## 6. Secrets handling

Secrets must:
- be stored in GitHub Secrets or a secure external vault;
- never be printed or logged;
- never be included in generated output or issue descriptions;
- never be passed to prompts or AI agents unless explicitly needed and approved.

If a workflow requires a secret:
- justify why it is necessary;
- limit the secret to the specific workflow;
- restrict access to required roles only;
- rotate the secret if there is any suspicion of exposure.

## 7. AI and Copilot automation constraints

AI-based automation should be treated as high-risk unless constrained.

Rules:
- do not allow repository-wide write access by default;
- do not permit AI agents to operate on production or customer data without controlled approval;
- do not expose credentials, tokens, or internal architecture details to third-party models unless explicitly approved;
- do not allow autonomous changes without review when the change affects security, infrastructure, or data protection.

For GitHub Copilot or similar systems:
- the repository must implement review and approval workflows before automation is trusted;
- automation scope must be explicit and minimal;
- all automated changes must be auditable;
- no direct pushes to protected branches from automated agents.

## 8. Approval model

High-risk automation requires:
- explicit maintainer approval;
- justification of intent and scope;
- rollback or abort procedure;
- log retention and review.

Examples of high-risk automation:
- creating or modifying workflows;
- deployment automation;
- infrastructure definition changes;
- automation with access to secrets;
- autonomous agent actions in protected repositories.

## 9. Logging and auditability

Every automation action should provide evidence of:
- who initiated it;
- what was triggered;
- what changed;
- whether it succeeded or failed;
- what permissions were used;
- what secrets or resources were accessed.

Logs, outputs, and workflow records should be retained according to repository policy.

## 10. Incident response for automation issues

If automation causes:
- unauthorized repository modification;
- secret leakage;
- unexpected access or privilege escalation;
- data exposure;
- malicious or erroneous behavior;

then the response must be:
1. disable the workflow or revoke credentials;
2. assess the blast radius;
3. preserve logs and evidence;
4. notify maintainers and security stakeholders;
5. fix the root cause with a PR;
6. add preventive controls to prevent recurrence.

## 11. Review and enforcement

This policy must be reviewed:
- after major workflow changes;
- after security incidents;
- at least quarterly.

Violations may result in:
- workflow disablement;
- permission restrictions;
- PR rejection;
- maintainer intervention;
- revocation of automation privileges.

## 12. Summary

Automation is allowed only when it is:
- necessary;
- scoped;
- reviewed;
- audited;
- minimal in privilege;
- safe by default.

The default posture is:
- no broad automation;
- no secret exposure;
- no unapproved write access;
- no trust in unreviewed code or workflows.
