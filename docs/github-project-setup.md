# GitHub Project Automation Setup Guide

This guide will help you set up the required configurations and secrets for the GitHub project automation features in this repository.

## Prerequisites

- A GitHub account with admin access to the repository
- A GitHub project (either personal or organization-level)
- Basic understanding of GitHub Actions and workflows

## Creating the Required Secrets

### 1. Generate a Personal Access Token (PAT)

1. Go to your GitHub account settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Click "Generate new token"
3. Give it a descriptive name like "Project Automation Token"
4. Set the expiration as needed (recommended: 90 days)
5. Select the repository scope (only the specific repository or all repositories)
6. For permissions, select:
   - Repository: Read access
   - Projects: Read and write
7. Click "Generate token"
8. **IMPORTANT**: Copy the token immediately! You won't be able to see it again.

### 2. Add Secrets to Your Repository

1. Go to your repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add the following secrets:

#### `PROJECT_TOKEN`

- Name: `PROJECT_TOKEN`
- Value: [Paste the PAT you generated]

#### `PROJECT_ID`

You need to get your GitHub project ID, which is a node ID in GraphQL format:

1. Go to https://docs.github.com/en/graphql/overview/explorer
2. Authenticate with your GitHub account
3. Run this query (replace USER_OR_ORG and PROJECT_NUMBER):

```graphql
query {
  user(login: "YOUR_USERNAME") {
    # or organization(login: "YOUR_ORG")
    projectV2(number: PROJECT_NUMBER) {
      id
    }
  }
}
```

4. Copy the ID value (it should look like: `projv2_ABC123...`)
5. Add as a secret:
   - Name: `PROJECT_ID`
   - Value: [Paste the project ID]

#### `REPO_OWNER` and `REPO_NAME` (for scripts)

- Name: `REPO_OWNER`
- Value: [Your GitHub username or organization name]

- Name: `REPO_NAME`
- Value: [Your repository name]

## Customizing the Workflows

### Auto-Add Workflow

Edit `.github/workflows/auto-add.yml`:

1. Update `project-url` with your actual project URL
2. Choose between:
   - `github.token` (works for personal projects, limited permissions)
   - `secrets.PROJECT_TOKEN` (works for all projects, requires the PAT)

### Auto-Archive Workflow

Edit `.github/workflows/auto-archive.yml`:

1. Choose between hardcoded project ID or secret
2. Adjust the `DAYS_BEFORE_ARCHIVE` value as needed

## Testing the Workflows

1. For auto-add: Create a new issue or pull request
2. For auto-archive: Manually trigger the workflow using:
   - Go to Actions → Auto-archive closed items → Run workflow

## Troubleshooting

If you encounter issues:

1. Check workflow run logs in GitHub Actions
2. Verify secrets are correctly set up
3. Ensure the PAT has not expired
4. Confirm the project ID is correct
5. Check that your PAT has appropriate permissions
