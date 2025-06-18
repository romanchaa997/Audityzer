#!/usr/bin/env node

const { graphql } = require('@octokit/graphql');

// Get environment variables
const token = process.env.GITHUB_TOKEN;
const projectId = process.env.PROJECT_ID;
const daysBeforeArchive = parseInt(process.env.DAYS_BEFORE_ARCHIVE || '30', 10);

// GraphQL client
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${token}`,
  },
});

async function getClosedItems() {
  // Calculate date threshold for archiving
  const dateThreshold = new Date();
  dateThreshold.setDate(dateThreshold.getDate() - daysBeforeArchive);

  try {
    // Query project for closed items
    const result = await graphqlWithAuth(`
      query {
        node(id: "${projectId}") {
          ... on ProjectV2 {
            items(first: 100) {
              nodes {
                id
                content {
                  ... on Issue {
                    id
                    title
                    state
                    closedAt
                  }
                  ... on PullRequest {
                    id
                    title
                    state
                    closedAt
                  }
                }
                fieldValues(first: 10) {
                  nodes {
                    ... on ProjectV2ItemFieldSingleSelectValue {
                      name
                      field {
                        ... on ProjectV2SingleSelectField {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `);

    // Filter for closed items older than threshold
    const items = result.node.items.nodes;
    const itemsToArchive = items.filter(item => {
      // Only process items with content (issues/PRs)
      if (!item.content) return false;

      // Only archive closed items
      if (item.content.state !== 'CLOSED') return false;

      // Check if closed date is past our threshold
      const closedAt = new Date(item.content.closedAt);
      return closedAt < dateThreshold;
    });

    return itemsToArchive;
  } catch (error) {
    console.error('Error fetching closed items:', error.message);
    throw error;
  }
}

async function archiveItem(itemId) {
  try {
    const result = await graphqlWithAuth(`
      mutation {
        archiveProjectV2Item(input: {
          projectId: "${projectId}"
          itemId: "${itemId}"
        }) {
          item {
            id
          }
        }
      }
    `);

    return result;
  } catch (error) {
    console.error(`Error archiving item ${itemId}:`, error.message);
    return null;
  }
}

async function main() {
  try {
    const itemsToArchive = await getClosedItems();


    for (const item of itemsToArchive) {
      await archiveItem(item.id);
    }

  } catch (error) {
    console.error('Error in main process:', error.message);
    process.exit(1);
  }
}

main();
