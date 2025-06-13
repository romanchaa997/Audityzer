#!/bin/bash
# Community Analytics Tracker

REPO="romanchaa997/Audityzer"
DATE=$(date +"%Y-%m-%d")
LOG_FILE="analytics_$DATE.log"

echo "=== Audityzer Community Analytics - $DATE ===" >> $LOG_FILE

# GitHub Metrics
echo "--- GitHub Repository Metrics ---" >> $LOG_FILE
STARS=$(curl -s https://api.github.com/repos/$REPO | jq -r '.stargazers_count // "N/A"')
FORKS=$(curl -s https://api.github.com/repos/$REPO | jq -r '.forks_count // "N/A"')
ISSUES=$(curl -s https://api.github.com/repos/$REPO | jq -r '.open_issues_count // "N/A"')
WATCHERS=$(curl -s https://api.github.com/repos/$REPO | jq -r '.subscribers_count // "N/A"')

echo "Stars: $STARS" >> $LOG_FILE
echo "Forks: $FORKS" >> $LOG_FILE
echo "Open Issues: $ISSUES" >> $LOG_FILE
echo "Watchers: $WATCHERS" >> $LOG_FILE

# Traffic Data (requires authentication)
echo "--- Repository Traffic ---" >> $LOG_FILE
echo "Views: Requires GitHub token for access" >> $LOG_FILE
echo "Clones: Requires GitHub token for access" >> $LOG_FILE

# Recent Activity
echo "--- Recent Activity ---" >> $LOG_FILE
LATEST_COMMIT=$(curl -s https://api.github.com/repos/$REPO/commits | jq -r '.[0].commit.message // "N/A"')
COMMIT_DATE=$(curl -s https://api.github.com/repos/$REPO/commits | jq -r '.[0].commit.author.date // "N/A"')
echo "Latest Commit: $LATEST_COMMIT" >> $LOG_FILE
echo "Commit Date: $COMMIT_DATE" >> $LOG_FILE

# Contributors
echo "--- Contributors ---" >> $LOG_FILE
CONTRIBUTORS=$(curl -s https://api.github.com/repos/$REPO/contributors | jq -r 'length // "N/A"')
echo "Total Contributors: $CONTRIBUTORS" >> $LOG_FILE

echo "Analytics logged to $LOG_FILE"
cat $LOG_FILE
