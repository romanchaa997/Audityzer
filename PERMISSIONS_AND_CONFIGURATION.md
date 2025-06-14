# GitHub Actions Permissions and Repository Configuration

This document provides the necessary commands and configuration for setting up proper permissions and repository settings for the Audityzer GitHub Actions workflows.

## Repository Settings Configuration

### 1. GitHub Actions Permissions

#### Enable GitHub Actions (if not already enabled)
```bash
# Using GitHub CLI
gh api repos/:owner/:repo --method PATCH --field allow_actions=true
```

#### Set Actions Permissions
```bash
# Allow all actions and reusable workflows
gh api repos/:owner/:repo/actions/permissions --method PUT --field enabled=true --field allowed_actions=all
```

### 2. GitHub Pages Configuration

#### Enable GitHub Pages with Actions
```bash
# Enable GitHub Pages with GitHub Actions as source
gh api repos/:owner/:repo/pages --method POST \
  --field source='{"branch":"gh-pages","path":"/"}' \
  --field build_type="workflow"
```

#### Alternative: Configure via Web Interface
1. Go to repository **Settings** > **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save the configuration

### 3. Branch Protection Rules

#### Protect Main Branch
```bash
# Create branch protection rule for main branch
gh api repos/:owner/:repo/branches/main/protection --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["CI/CD Pipeline","Security Scanning"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

### 4. Security Settings

#### Enable Dependabot Alerts
```bash
# Enable Dependabot vulnerability alerts
gh api repos/:owner/:repo/vulnerability-alerts --method PUT
```

#### Enable Dependabot Security Updates
```bash
# Enable Dependabot security updates
gh api repos/:owner/:repo/automated-security-fixes --method PUT
```

#### Enable Code Scanning
```bash
# Enable code scanning (CodeQL will be configured via workflow)
gh api repos/:owner/:repo/code-scanning/default-setup --method PATCH \
  --field state="configured"
```

## Environment Configuration

### 1. Create Environments

#### Production Environment
```bash
# Create production environment
gh api repos/:owner/:repo/environments/production --method PUT \
  --field wait_timer=0 \
  --field reviewers='[]' \
  --field deployment_branch_policy='{"protected_branches":true,"custom_branch_policies":false}'
```

#### Staging Environment
```bash
# Create staging environment
gh api repos/:owner/:repo/environments/staging --method PUT \
  --field wait_timer=0 \
  --field reviewers='[]' \
  --field deployment_branch_policy='{"protected_branches":false,"custom_branch_policies":true}'
```

### 2. Environment Protection Rules

#### Add Environment Protection (Optional)
```bash
# Add required reviewers for production (replace with actual usernames)
gh api repos/:owner/:repo/environments/production --method PUT \
  --field reviewers='[{"type":"User","id":USER_ID}]' \
  --field wait_timer=300
```

## Workflow-Specific Permissions

### Required Token Permissions
Our workflows require the following permissions for `GITHUB_TOKEN`:

```yaml
permissions:
  contents: write        # For creating releases and pushing changes
  security-events: write # For uploading security scan results
  pages: write          # For GitHub Pages deployment
  packages: write       # For publishing packages
  issues: write         # For creating issues from security scans
  pull-requests: write  # For commenting on PRs
  actions: read         # For reading workflow information
```

### Repository Settings via Web Interface

If you prefer using the GitHub web interface:

#### 1. Actions Settings
- Go to **Settings** > **Actions** > **General**
- Under **Actions permissions**, select "Allow all actions and reusable workflows"
- Under **Workflow permissions**, select "Read and write permissions"
- Check "Allow GitHub Actions to create and approve pull requests"

#### 2. Security Settings
- Go to **Settings** > **Security & analysis**
- Enable **Dependency graph**
- Enable **Dependabot alerts**
- Enable **Dependabot security updates**
- Enable **Code scanning** (CodeQL analysis)
- Enable **Secret scanning**

#### 3. Pages Settings
- Go to **Settings** > **Pages**
- Under **Source**, select **GitHub Actions**
- The workflows will handle deployment automatically

## Monitoring and Maintenance

### 1. Workflow Monitoring Commands

```bash
# List recent workflow runs
gh run list --limit 10

# Watch a specific workflow run
gh run watch <run-id>

# View workflow run logs
gh run view <run-id> --log

# List workflow runs for specific workflow
gh run list --workflow="CI/CD Pipeline"
```

### 2. Security Monitoring

```bash
# List security alerts
gh api repos/:owner/:repo/dependabot/alerts

# List code scanning alerts
gh api repos/:owner/:repo/code-scanning/alerts

# View security advisories
gh api repos/:owner/:repo/security-advisories
```

### 3. Repository Health Check

```bash
# Check repository settings
gh repo view --json name,description,visibility,defaultBranch,hasIssues,hasWiki,hasPages

# Check branch protection
gh api repos/:owner/:repo/branches/main/protection

# Check Actions permissions
gh api repos/:owner/:repo/actions/permissions
```

## Troubleshooting Commands

### Common Issues and Solutions

#### 1. Workflow Permission Issues
```bash
# Check current permissions
gh api repos/:owner/:repo/actions/permissions

# Fix permissions
gh api repos/:owner/:repo/actions/permissions --method PUT \
  --field enabled=true \
  --field allowed_actions=all
```

#### 2. Pages Deployment Issues
```bash
# Check Pages status
gh api repos/:owner/:repo/pages

# Re-enable Pages
gh api repos/:owner/:repo/pages --method POST \
  --field source='{"branch":"gh-pages","path":"/"}' \
  --field build_type="workflow"
```

#### 3. Security Scanning Issues
```bash
# Check CodeQL status
gh api repos/:owner/:repo/code-scanning/analyses

# Re-run security workflows
gh workflow run "Security Scanning"
```

## Automated Setup Script

Create a setup script to configure everything at once:

```bash
#!/bin/bash
# setup-repository.sh

REPO="owner/repo"  # Replace with your repository

echo "🔧 Configuring repository permissions and settings..."

# Enable Actions
gh api repos/$REPO/actions/permissions --method PUT \
  --field enabled=true --field allowed_actions=all

# Enable security features
gh api repos/$REPO/vulnerability-alerts --method PUT
gh api repos/$REPO/automated-security-fixes --method PUT

# Configure Pages
gh api repos/$REPO/pages --method POST \
  --field build_type="workflow" || echo "Pages already configured"

# Create environments
gh api repos/$REPO/environments/production --method PUT \
  --field deployment_branch_policy='{"protected_branches":true,"custom_branch_policies":false}'

gh api repos/$REPO/environments/staging --method PUT \
  --field deployment_branch_policy='{"protected_branches":false,"custom_branch_policies":true}'

echo "✅ Repository configuration complete!"
echo "🚀 Workflows are ready to run!"
```

## Next Steps

1. **Run the setup commands** or use the automated script
2. **Add required secrets** as documented in `SECURITY_AND_SECRETS.md`
3. **Test workflows** by pushing a commit or creating a pull request
4. **Monitor workflow runs** in the Actions tab
5. **Review security alerts** regularly in the Security tab

---

*Last updated: June 14, 2025*
