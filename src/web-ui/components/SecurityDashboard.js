/**
 * Security Dashboard Component
 *
 * A unified dashboard interface for visualizing security testing results
 * and providing actionable insights from the vulnerability detection system.
 */

const React = require('react');
const { useState, useEffect } = React;

// Components
const VulnerabilityPanel = require('./VulnerabilityPanel');
const SandboxResults = require('./SandboxResults');
const L2TestingPanel = require('./L2TestingPanel');
const MetricsPanel = require('./MetricsPanel');
const ReportGenerator = require('./ReportGenerator');

// Styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '9999px',
    fontSize: '14px',
    fontWeight: 500,
  },
  secure: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
  warning: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  critical: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px',
    marginBottom: '24px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    padding: '16px',
    border: '1px solid #E5E7EB',
  },
  fullWidthCard: {
    gridColumn: '1 / -1',
  },
  tabContainer: {
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    marginBottom: '16px',
  },
  tab: {
    padding: '8px 16px',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
  },
  activeTab: {
    borderBottom: '2px solid #3B82F6',
    fontWeight: 500,
    color: '#3B82F6',
  },
  button: {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '14px',
  },
  actionButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  vulnerabilityCounter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
  },
  counter: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '22px',
    height: '22px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
};

function SecurityDashboard({ projectId, onGenerateReport }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState(null);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [securityScore, setSecurityScore] = useState(0);
  const [testResults, setTestResults] = useState([]);

  // Fetch project data
  useEffect(() => {
    async function fetchData() {
      if (!projectId) return;

      try {
        setLoading(true);

        // Fetch project data
        const projectResponse = await fetch(`/api/projects/${projectId}`);
        const projectData = await projectResponse.json();
        setProjectData(projectData);

        // Fetch vulnerabilities
        const vulnResponse = await fetch(`/api/projects/${projectId}/vulnerabilities`);
        const vulnData = await vulnResponse.json();
        setVulnerabilities(vulnData.vulnerabilities || []);

        // Calculate security score based on vulnerabilities
        const score = calculateSecurityScore(vulnData.vulnerabilities || []);
        setSecurityScore(score);

        // Fetch test results
        const testsResponse = await fetch(`/api/projects/${projectId}/test-results`);
        const testData = await testsResponse.json();
        setTestResults(testData.results || []);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [projectId]);

  // Calculate security score based on vulnerabilities
  const calculateSecurityScore = vulnerabilities => {
    if (!vulnerabilities.length) return 100;

    const severityWeights = {
      critical: 10,
      high: 5,
      medium: 2,
      low: 1,
      informational: 0,
    };

    const totalIssues = vulnerabilities.length;
    const weightedScore = vulnerabilities.reduce((score, vuln) => {
      return score - severityWeights[vuln.severity] || 0;
    }, 100);

    return Math.max(0, Math.min(100, weightedScore));
  };

  // Determine security status based on score
  const getSecurityStatus = score => {
    if (score >= 80) return { label: 'Secure', style: styles.secure };
    if (score >= 50) return { label: 'Warning', style: styles.warning };
    return { label: 'Critical', style: styles.critical };
  };

  // Count vulnerabilities by severity
  const countBySeverity = severity => {
    return vulnerabilities.filter(v => v.severity === severity).length;
  };

  // Get status style for severity counters
  const getSeverityStyle = severity => {
    switch (severity) {
      case 'critical':
        return { backgroundColor: '#FEE2E2', color: '#B91C1C' };
      case 'high':
        return { backgroundColor: '#FEF3C7', color: '#92400E' };
      case 'medium':
        return { backgroundColor: '#E0F2FE', color: '#0369A1' };
      case 'low':
        return { backgroundColor: '#D1FAE5', color: '#065F46' };
      default:
        return { backgroundColor: '#F3F4F6', color: '#374151' };
    }
  };

  if (loading) {
    return (
      <div style={styles.loader}>
        <p>Loading security dashboard...</p>
      </div>
    );
  }

  // Security status based on score
  const securityStatus = getSecurityStatus(securityScore);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Security Dashboard</h1>
          <div style={styles.vulnerabilityCounter}>
            <span>Security Score: {securityScore}</span>
            <div style={{ ...styles.statusBadge, ...securityStatus.style }}>
              {securityStatus.label}
            </div>
            <div style={{ ...styles.counter, ...getSeverityStyle('critical') }}>
              {countBySeverity('critical')}
            </div>
            <div style={{ ...styles.counter, ...getSeverityStyle('high') }}>
              {countBySeverity('high')}
            </div>
            <div style={{ ...styles.counter, ...getSeverityStyle('medium') }}>
              {countBySeverity('medium')}
            </div>
            <div style={{ ...styles.counter, ...getSeverityStyle('low') }}>
              {countBySeverity('low')}
            </div>
          </div>
        </div>
        <button
          style={styles.button}
          onClick={() => onGenerateReport && onGenerateReport(projectId)}
        >
          Generate Report
        </button>
      </div>

      <div style={styles.tabContainer}>
        <div
          style={{ ...styles.tab, ...(activeTab === 'overview' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </div>
        <div
          style={{ ...styles.tab, ...(activeTab === 'vulnerabilities' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('vulnerabilities')}
        >
          Vulnerabilities
        </div>
        <div
          style={{ ...styles.tab, ...(activeTab === 'l2tests' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('l2tests')}
        >
          L2 Protocol Tests
        </div>
        <div
          style={{ ...styles.tab, ...(activeTab === 'sandbox' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('sandbox')}
        >
          Sandbox Results
        </div>
      </div>

      {activeTab === 'overview' && (
        <div style={styles.grid}>
          <div style={{ ...styles.card, ...styles.fullWidthCard }}>
            <h2>Project Overview</h2>
            {projectData && (
              <div>
                <p>
                  <strong>Name:</strong> {projectData.name}
                </p>
                <p>
                  <strong>Last Scan:</strong> {new Date(projectData.lastScan).toLocaleString()}
                </p>
                <p>
                  <strong>Security Score:</strong> {securityScore}/100
                </p>
              </div>
            )}
          </div>

          <div style={styles.card}>
            <h2>Vulnerability Summary</h2>
            <div>
              <p>
                <strong>Critical:</strong> {countBySeverity('critical')}
              </p>
              <p>
                <strong>High:</strong> {countBySeverity('high')}
              </p>
              <p>
                <strong>Medium:</strong> {countBySeverity('medium')}
              </p>
              <p>
                <strong>Low:</strong> {countBySeverity('low')}
              </p>
              <p>
                <strong>Informational:</strong> {countBySeverity('informational')}
              </p>
            </div>
          </div>

          <div style={styles.card}>
            <h2>Test Coverage</h2>
            <MetricsPanel testResults={testResults} projectData={projectData} />
          </div>

          <div style={{ ...styles.card, ...styles.fullWidthCard }}>
            <h2>Recent Activity</h2>
            <ul>
              {projectData?.recentActivity?.map((activity, index) => (
                <li key={index}>
                  {activity.description} - {new Date(activity.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'vulnerabilities' && <VulnerabilityPanel vulnerabilities={vulnerabilities} />}

      {activeTab === 'l2tests' && (
        <L2TestingPanel testResults={testResults.filter(r => r.type === 'l2')} />
      )}

      {activeTab === 'sandbox' && (
        <SandboxResults testResults={testResults.filter(r => r.type === 'sandbox')} />
      )}
    </div>
  );
}

module.exports = SecurityDashboard;
