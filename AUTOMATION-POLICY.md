# Automation Policy

This policy defines how automated processes, GitHub Actions, and AI-assisted tooling may operate in Audityzer.

## Principle
Automation must be secure by default, limited in scope, and reviewable by maintainers. It must not be granted capabilities beyond the minimum required to complete its task.

## Scope
This policy applies to:
- GitHub Actions
- Copilot-enabled automation
- repository automation
- deployment-related scripts
- CI/CD validation workflows
- code generation or code review agents

## Required security controls
The following controls are mandatory for repository automation:

### 1. Explicit approval for execution
Any workflow that makes changes to code, environment variables, deployments, or repository state must require approval before running.

### 2. Minimal permissions
GitHub Actions and agents must use the narrowest possible permissions. Avoid broad write access and avoid default access to secrets unless strictly required.

### 3. Restricted write scope
Automation must only write to the resource that triggered it. It must not be allowed to modify unrelated repository areas or unrelated secrets.

### 4. No secrets in prompts or logs
Secrets, access tokens, and credentials must never be included in:
- issue descriptions
- pull request comments
- generated logs
- prompts sent to automation
- review summaries

### 5. Reviewable automation
All automation changes must be reviewed before merge. Workflow logic must be readable, deterministic, and easy to audit.

### 6. Environment isolation
Automation must never access production secrets unless explicitly required and governed by the maintainers.

## Allowed use cases
Automation may be used for:
- static analysis
- dependency checks
- secret scanning
- linting and validation
- reporting generation
- reproducible CI checks
- non-destructive project validation

## Forbidden use cases
Automation must not be used for:
- arbitrary repository mutation without approval
- access to production credentials
- automatic deployment without maintainer review
- broad, uncontrolled writes to multiple critical areas
- writing secrets to logs or artifacts
- unreviewed execution of external scripts from unknown sources

## Agent-specific safeguards
If an AI coding agent or Copilot agent is enabled:
- Do not grant broad repository write permissions by default
- Require human approval before any workflow is executed
- Restrict the agent to known tasks and approved paths
- Review generated code and workflow changes before merge
- Ensure prompts and generated content do not include secrets or sensitive data

## Workflow design requirements
Workflows should:
- be deterministic
- be easy to reason about
- use pinned versions where practical
- avoid unnecessary network access
- avoid installing arbitrary packages from untrusted sources
- print only safe, non-sensitive output

## Incident response for automation issues
If automation behaves unexpectedly:
- disable the workflow or revoke permissions immediately
- identify affected repository scope
- review logs and artifacts
- rotate any exposed credentials
- document the incident and remediation steps

## Compliance expectation
This policy is aligned with secure engineering practices and is intended to reduce the risk of:
- secret exposure
- supply-chain attacks
- malicious changes
- unauthorized actions by automation

## Enforcement
Violations of this policy may result in:
- workflow suspension
- permission reduction
- branch or release restrictions
- maintainer review requirements
- removal of unsafe automation from the repository
