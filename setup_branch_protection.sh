#!/bin/bash
# Branch Protection Setup Script
# Note: Requires GitHub token with admin permissions

REPO="romanchaa997/Audityzer"
TOKEN="$GITHUB_TOKEN"

echo "Setting up branch protection for main branch..."
curl -X PUT \
  -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/$REPO/branches/main/protection \
  -d '{
    "required_status_checks": {
      "strict": true,
      "contexts": ["ci/test", "security/scan"]
    },
    "enforce_admins": false,
    "required_pull_request_reviews": {
      "required_approving_review_count": 1,
      "dismiss_stale_reviews": true
    },
    "restrictions": null,
    "allow_force_pushes": false,
    "allow_deletions": false
  }'

echo "Setting up branch protection for safe-improvements branch..."
curl -X PUT \
  -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/$REPO/branches/safe-improvements/protection \
  -d '{
    "required_status_checks": {
      "strict": true,
      "contexts": ["ci/test"]
    },
    "enforce_admins": false,
    "required_pull_request_reviews": {
      "required_approving_review_count": 1
    },
    "restrictions": null,
    "allow_force_pushes": false,
    "allow_deletions": false
  }'
