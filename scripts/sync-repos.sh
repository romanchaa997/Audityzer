#!/bin/bash

# Script to synchronize the local repository with GitHub and GitLab

# Display colored output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Web3FuzzForge Repository Synchronization Tool${NC}"
echo "==========================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: Git is not installed. Please install Git and try again.${NC}"
    exit 1
fi

# Function to check if a remote exists
remote_exists() {
    git remote | grep -q "^$1\$"
    return $?
}

# Get current repository directory
REPO_DIR=$(pwd)
echo -e "Current directory: ${GREEN}$REPO_DIR${NC}"

# Check if the current directory is a git repository
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}This directory is not a git repository. Initializing...${NC}"
    git init
    echo -e "${GREEN}Git repository initialized.${NC}"
fi

# Configure GitHub remote
echo -e "\n${YELLOW}Setting up GitHub remote...${NC}"
read -p "Enter GitHub username: " GITHUB_USERNAME
read -p "Enter GitHub repository name [Web3FuzzForge]: " GITHUB_REPO
GITHUB_REPO=${GITHUB_REPO:-Web3FuzzForge}

if remote_exists "github"; then
    echo -e "GitHub remote already exists. Updating URL..."
    git remote set-url github "https://github.com/$GITHUB_USERNAME/$GITHUB_REPO.git"
else
    echo -e "Adding GitHub remote..."
    git remote add github "https://github.com/$GITHUB_USERNAME/$GITHUB_REPO.git"
fi
echo -e "${GREEN}GitHub remote configured: https://github.com/$GITHUB_USERNAME/$GITHUB_REPO.git${NC}"

# Configure GitLab remote
echo -e "\n${YELLOW}Setting up GitLab remote...${NC}"
read -p "Enter GitLab username: " GITLAB_USERNAME
read -p "Enter GitLab repository name [web3-security-test-kit]: " GITLAB_REPO
GITLAB_REPO=${GITLAB_REPO:-web3-security-test-kit}

if remote_exists "gitlab"; then
    echo -e "GitLab remote already exists. Updating URL..."
    git remote set-url gitlab "https://gitlab.com/$GITLAB_USERNAME/$GITLAB_REPO.git"
else
    echo -e "Adding GitLab remote..."
    git remote add gitlab "https://gitlab.com/$GITLAB_USERNAME/$GITLAB_REPO.git"
fi
echo -e "${GREEN}GitLab remote configured: https://gitlab.com/$GITLAB_USERNAME/$GITLAB_REPO.git${NC}"

# Add origin as both if it doesn't exist
if ! remote_exists "origin"; then
    echo -e "\n${YELLOW}Setting up origin remote as GitHub...${NC}"
    git remote add origin "https://github.com/$GITHUB_USERNAME/$GITHUB_REPO.git"
    echo -e "${GREEN}Origin remote configured.${NC}"
fi

# List all remotes
echo -e "\n${YELLOW}Configured remotes:${NC}"
git remote -v

# Commit changes if there are any
echo -e "\n${YELLOW}Checking for changes to commit...${NC}"
if [[ -n $(git status --porcelain) ]]; then
    echo -e "Changes detected. Adding and committing..."
    
    # Ask for commit message
    read -p "Enter commit message: " COMMIT_MESSAGE
    COMMIT_MESSAGE=${COMMIT_MESSAGE:-"Update WalletConnect and Coinbase Wallet providers"}
    
    git add .
    git commit -m "$COMMIT_MESSAGE"
    echo -e "${GREEN}Changes committed.${NC}"
else
    echo -e "${GREEN}No changes to commit.${NC}"
fi

# Push to GitHub
echo -e "\n${YELLOW}Pushing to GitHub...${NC}"
git push -u github HEAD:main
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully pushed to GitHub.${NC}"
else
    echo -e "${RED}Failed to push to GitHub. Please check your credentials and try again.${NC}"
fi

# Push to GitLab
echo -e "\n${YELLOW}Pushing to GitLab...${NC}"
git push -u gitlab HEAD:main
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully pushed to GitLab.${NC}"
else
    echo -e "${RED}Failed to push to GitLab. Please check your credentials and try again.${NC}"
fi

echo -e "\n${GREEN}Repository synchronization complete!${NC}"
echo "==========================================="
echo -e "GitHub: https://github.com/$GITHUB_USERNAME/$GITHUB_REPO"
echo -e "GitLab: https://gitlab.com/$GITLAB_USERNAME/$GITLAB_REPO" 