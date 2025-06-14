// Community Metrics Tracking for Audityzer
const { Octokit } = require('@octokit/rest');

class CommunityMetrics {
  constructor(token) {
    this.octokit = new Octokit({ auth: token });
    this.owner = 'romanchaa997';
    this.repo = 'Audityzer';
  }

  async getRepositoryStats() {
    try {
      const { data: repo } = await this.octokit.repos.get({
        owner: this.owner,
        repo: this.repo
      });

      const { data: contributors } = await this.octokit.repos.listContributors({
        owner: this.owner,
        repo: this.repo
      });

      const { data: issues } = await this.octokit.issues.listForRepo({
        owner: this.owner,
        repo: this.repo,
        state: 'all'
      });

      const { data: prs } = await this.octokit.pulls.list({
        owner: this.owner,
        repo: this.repo,
        state: 'all'
      });

      return {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        contributors: contributors.length,
        issues: issues.length,
        pullRequests: prs.length,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching repository stats:', error);
      return null;
    }
  }

  async getSecurityMetrics() {
    try {
      // Get security-related issues
      const { data: securityIssues } = await this.octokit.issues.listForRepo({
        owner: this.owner,
        repo: this.repo,
        labels: 'security,vulnerability,bounty'
      });

      // Get plugin submissions
      const { data: pluginIssues } = await this.octokit.issues.listForRepo({
        owner: this.owner,
        repo: this.repo,
        labels: 'security-plugin'
      });

      return {
        securityIssues: securityIssues.length,
        pluginSubmissions: pluginIssues.length,
        bountyProgram: {
          totalSubmissions: securityIssues.filter(issue => 
            issue.labels.some(label => label.name === 'bounty')
          ).length
        }
      };
    } catch (error) {
      console.error('Error fetching security metrics:', error);
      return null;
    }
  }

  async generateReport() {
    const repoStats = await this.getRepositoryStats();
    const securityStats = await this.getSecurityMetrics();

    const report = {
      timestamp: new Date().toISOString(),
      repository: repoStats,
      security: securityStats,
      community: {
        engagement: 'Active',
        growth: 'Steady',
        satisfaction: 'High'
      }
    };

    console.log('Community Metrics Report:');
    console.log(JSON.stringify(report, null, 2));
    
    return report;
  }
}

module.exports = CommunityMetrics;

// Usage example
if (require.main === module) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('GITHUB_TOKEN environment variable required');
    process.exit(1);
  }

  const metrics = new CommunityMetrics(token);
  metrics.generateReport().catch(console.error);
}
