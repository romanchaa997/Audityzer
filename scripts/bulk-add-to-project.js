#!/usr/bin/env node

const { Octokit } = require('@octokit/rest');
const { graphql } = require('@octokit/graphql');
const fs = require('fs');
const path = require('path');

// Configuration - pass as env vars or from a config file
const token = process.env.GITHUB_TOKEN;
const owner = process.env.REPO_OWNER;
const repo = process.env.REPO_NAME;
const projectId = process.env.PROJECT_ID;
const configPath = process.argv[2] || 'project-items.json';

// Initialize Octokit and GraphQL clients
const octokit = new Octokit({ auth: token });
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${token}`,
  },
});

/**
 * Get issue or PR node ID (needed for the GraphQL API)
 */
async function getNodeId(itemType, itemNumber) {
  try {
    if (itemType === 'issue') {
      const { data } = await octokit.issues.get({
        owner,
        repo,
        issue_number: itemNumber,
      });
      return data.node_id;
    } else if (itemType === 'pr') {
      const { data } = await octokit.pulls.get({
        owner,
        repo,
        pull_number: itemNumber,
      });
      return data.node_id;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${itemType} #${itemNumber}:`, error.message);
    return null;
  }
}

/**
 * Add an item to the project
 */
async function addItemToProject(nodeId) {
  try {
    const result = await graphqlWithAuth(`
      mutation {
        addProjectV2ItemById(input: {
          projectId: "${projectId}"
          contentId: "${nodeId}"
        }) {
          item {
            id
          }
        }
      }
    `);

    return result.addProjectV2ItemById.item.id;
  } catch (error) {
    console.error(`Error adding item ${nodeId} to project:`, error.message);
    return null;
  }
}

/**
 * Update fields for an item in the project
 */
async function updateItemFields(itemId, fields) {
  // This would need to be implemented according to your project's field structure
  // Example: update status, priority, assignees, etc.
  console.log(`Would update fields for item ${itemId}:`, fields);
}

/**
 * Process a batch of items from a configuration file
 */
async function processBatch() {
  try {
    // Read configuration file
    const configFile = path.resolve(process.cwd(), configPath);
    const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

    console.log(`Processing ${config.items.length} items from ${configPath}`);

    for (const item of config.items) {
      const { type, number, fields } = item;

      // Get the node ID for the issue or PR
      console.log(`Processing ${type} #${number}...`);
      const nodeId = await getNodeId(type, number);

      if (!nodeId) {
        console.warn(`Skipping ${type} #${number} - could not get node ID`);
        continue;
      }

      // Add to project
      const itemId = await addItemToProject(nodeId);

      if (!itemId) {
        console.warn(`Failed to add ${type} #${number} to project`);
        continue;
      }

      console.log(`Added ${type} #${number} to project as item ${itemId}`);

      // Update fields if provided
      if (fields && Object.keys(fields).length > 0) {
        await updateItemFields(itemId, fields);
      }
    }

    console.log('Batch processing complete!');
  } catch (error) {
    console.error('Error processing batch:', error.message);
    process.exit(1);
  }
}

// Run the script
processBatch();
