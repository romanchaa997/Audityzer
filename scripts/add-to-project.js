#!/usr/bin/env node

const { Octokit } = require('@octokit/rest');
const { graphql } = require('@octokit/graphql');

// Get GitHub token from environment or config
const token = process.env.GITHUB_TOKEN;

// Configure Octokit
const octokit = new Octokit({ auth: token });
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${token}`,
  },
});

async function addToProject(issueNodeId, projectId) {
  try {
    // GraphQL mutation to add item to project
    const result = await graphqlWithAuth(`
      mutation {
        addProjectV2ItemById(input: {
          projectId: "${projectId}"
          contentId: "${issueNodeId}"
        }) {
          item {
            id
          }
        }
      }
    `);

    console.log(`Successfully added item to project: ${result.addProjectV2ItemById.item.id}`);
    return result;
  } catch (error) {
    console.error('Error adding item to project:', error.message);
    throw error;
  }
}

// Example usage:
// addToProject("ISSUE_NODE_ID", "PROJECT_ID");

module.exports = { addToProject };
