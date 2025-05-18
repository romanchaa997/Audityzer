# Script to synchronize the local repository with GitHub and GitLab

# Display colored output
function Write-ColorOutput($ForegroundColor) {
    # Save the current color
    $previousForegroundColor = $host.UI.RawUI.ForegroundColor

    # Set the new color
    $host.UI.RawUI.ForegroundColor = $ForegroundColor

    # Return to the previous color after the script block execution
    Try {
        # Call the script block
        return $args
    }
    Finally {
        $host.UI.RawUI.ForegroundColor = $previousForegroundColor
    }
}

function Test-RemoteExists($remoteName) {
    $remotes = git remote
    return $remotes -contains $remoteName
}

Write-Host ""
Write-ColorOutput Yellow "Audityzer Repository Synchronization Tool"
Write-Host "==========================================="

# Check if git is installed
try {
    git --version | Out-Null
}
catch {
    Write-ColorOutput Red "Error: Git is not installed. Please install Git and try again."
    exit 1
}

# Get current repository directory
$REPO_DIR = Get-Location
Write-Host "Current directory: $(Write-ColorOutput Green $REPO_DIR)"

# Check if the current directory is a git repository
if (-not (Test-Path ".git")) {
    Write-ColorOutput Yellow "This directory is not a git repository. Initializing..."
    git init
    Write-ColorOutput Green "Git repository initialized."
}

# Configure GitHub remote
Write-Host ""
Write-ColorOutput Yellow "Setting up GitHub remote..."
$GITHUB_USERNAME = Read-Host "Enter GitHub username"
$GITHUB_REPO = Read-Host "Enter GitHub repository name [Audityzer]"
if ([string]::IsNullOrEmpty($GITHUB_REPO)) {
    $GITHUB_REPO = "Audityzer"
}

if (Test-RemoteExists "github") {
    Write-Host "GitHub remote already exists. Updating URL..."
    git remote set-url github "https://github.com/$GITHUB_USERNAME/$GITHUB_REPO.git"
}
else {
    Write-Host "Adding GitHub remote..."
    git remote add github "https://github.com/$GITHUB_USERNAME/$GITHUB_REPO.git"
}
Write-ColorOutput Green "GitHub remote configured: https://github.com/$GITHUB_USERNAME/$GITHUB_REPO.git"

# Configure GitLab remote
Write-Host ""
Write-ColorOutput Yellow "Setting up GitLab remote..."
$GITLAB_USERNAME = Read-Host "Enter GitLab username"
$GITLAB_REPO = Read-Host "Enter GitLab repository name [Audityzer]"
if ([string]::IsNullOrEmpty($GITLAB_REPO)) {
    $GITLAB_REPO = "Audityzer"
}

if (Test-RemoteExists "gitlab") {
    Write-Host "GitLab remote already exists. Updating URL..."
    git remote set-url gitlab "https://gitlab.com/$GITLAB_USERNAME/$GITLAB_REPO.git"
}
else {
    Write-Host "Adding GitLab remote..."
    git remote add gitlab "https://gitlab.com/$GITLAB_USERNAME/$GITLAB_REPO.git"
}
Write-ColorOutput Green "GitLab remote configured: https://gitlab.com/$GITLAB_USERNAME/$GITLAB_REPO.git"

# Add origin as both if it doesn't exist
if (-not (Test-RemoteExists "origin")) {
    Write-Host ""
    Write-ColorOutput Yellow "Setting up origin remote as GitHub..."
    git remote add origin "https://github.com/$GITHUB_USERNAME/$GITHUB_REPO.git"
    Write-ColorOutput Green "Origin remote configured."
}

# List all remotes
Write-Host ""
Write-ColorOutput Yellow "Configured remotes:"
git remote -v

# Commit changes if there are any
Write-Host ""
Write-ColorOutput Yellow "Checking for changes to commit..."
$changes = git status --porcelain
if (-not [string]::IsNullOrEmpty($changes)) {
    Write-Host "Changes detected. Adding and committing..."
    
    # Ask for commit message
    $COMMIT_MESSAGE = Read-Host "Enter commit message"
    if ([string]::IsNullOrEmpty($COMMIT_MESSAGE)) {
        $COMMIT_MESSAGE = "Update WalletConnect and Coinbase Wallet providers"
    }
    
    git add .
    git commit -m "$COMMIT_MESSAGE"
    Write-ColorOutput Green "Changes committed."
}
else {
    Write-ColorOutput Green "No changes to commit."
}

# Push to GitHub
Write-Host ""
Write-ColorOutput Yellow "Pushing to GitHub..."
$githubResult = git push -u github HEAD:main 2>&1
if ($?) {
    Write-ColorOutput Green "Successfully pushed to GitHub."
}
else {
    Write-ColorOutput Red "Failed to push to GitHub. Please check your credentials and try again."
    Write-Host $githubResult
}

# Push to GitLab
Write-Host ""
Write-ColorOutput Yellow "Pushing to GitLab..."
$gitlabResult = git push -u gitlab HEAD:main 2>&1
if ($?) {
    Write-ColorOutput Green "Successfully pushed to GitLab."
}
else {
    Write-ColorOutput Red "Failed to push to GitLab. Please check your credentials and try again."
    Write-Host $gitlabResult
}

Write-Host ""
Write-ColorOutput Green "Repository synchronization complete!"
Write-Host "==========================================="
Write-Host "GitHub: https://github.com/$GITHUB_USERNAME/$GITHUB_REPO"
Write-Host "GitLab: https://gitlab.com/$GITLAB_USERNAME/$GITLAB_REPO" 