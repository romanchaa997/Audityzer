/**
 * Social sharing utilities for test results
 */

/**
 * Generate a tweet-sized summary of test results
 * @param {Object} results - Test results to summarize
 * @param {Object} options - Options for generation
 * @returns {string} Tweet-sized summary
 */
function generateTweetSummary(results, options = {}) {
  if (!results) {
    return '📊 No test results available';
  }

  const {
    testName = 'Audityzer Run',
    includeLink = true,
    link = 'https://github.com/your-org/Audityzer',
    maxLength = 240,
  } = options;

  // Extract critical information
  const totalTests = results.tests?.length || 0;
  const passed = results.passed || 0;
  const failed = results.failed || 0;
  const criticals = getCriticalCount(results);
  const wallets = extractWallets(results);
  const vulnerabilityTypes = extractVulnerabilityTypes(results);

  // Build the summary
  let summary = `📊 ${testName}: `;

  // Add wallet info if available
  if (wallets && wallets.length > 0) {
    summary += `${wallets.join(' + ')} | `;
  }

  // Add test counts
  summary += `${totalTests} scenarios | `;

  // Add failure info
  if (failed > 0) {
    summary += `${failed} failures | `;

    // Add critical count if any
    if (criticals > 0) {
      summary += `${criticals} criticals | `;
    }

    // Add top vulnerability types if available
    if (vulnerabilityTypes.length > 0) {
      summary += `${vulnerabilityTypes.slice(0, 2).join(', ')} | `;
    }
  } else {
    summary += 'All tests passed | ';
  }

  // Add link if requested and there's room
  if (includeLink && link) {
    const linkText = `Report: ${link}`;

    // Only add link if it fits within the max length
    if (summary.length + linkText.length <= maxLength) {
      summary += linkText;
    }
  }

  // Ensure the summary fits within max length
  if (summary.length > maxLength) {
    summary = summary.substring(0, maxLength - 3) + '...';
  }

  return summary;
}

/**
 * Extract the count of critical issues from results
 * @param {Object} results - Test results
 * @returns {number} Count of critical issues
 */
function getCriticalCount(results) {
  if (!results.tests) return 0;

  // Count tests with 'critical' in the title or error message
  return results.tests.filter(test => {
    return (
      test.status === 'failed' &&
      ((test.title && test.title.toLowerCase().includes('critical')) ||
        (test.error && test.error.toLowerCase().includes('critical')))
    );
  }).length;
}

/**
 * Extract wallet types used in the tests
 * @param {Object} results - Test results
 * @returns {Array} List of wallet types
 */
function extractWallets(results) {
  if (!results.tests) return [];

  const walletPatterns = [
    { pattern: /metamask/i, name: 'MetaMask' },
    { pattern: /coinbase/i, name: 'CB Wallet' },
    { pattern: /walletconnect/i, name: 'WalletConnect' },
    { pattern: /phantom/i, name: 'Phantom' },
    { pattern: /rabby/i, name: 'Rabby' },
  ];

  const detectedWallets = new Set();

  // Look for wallet names in test titles
  results.tests.forEach(test => {
    if (!test.title) return;

    walletPatterns.forEach(({ pattern, name }) => {
      if (pattern.test(test.title)) {
        detectedWallets.add(name);
      }
    });
  });

  return Array.from(detectedWallets);
}

/**
 * Extract common vulnerability types from test results
 * @param {Object} results - Test results
 * @returns {Array} List of vulnerability types
 */
function extractVulnerabilityTypes(results) {
  if (!results.tests) return [];

  const vulnerabilityPatterns = [
    { pattern: /reentrancy/i, name: 'reentrancy' },
    { pattern: /overflow/i, name: 'overflow' },
    { pattern: /front.?run/i, name: 'front-running' },
    { pattern: /replay/i, name: 'replay attack' },
    { pattern: /gas.?manipulation/i, name: 'gas manipulation' },
    { pattern: /flash.?loan/i, name: 'flash loan' },
    { pattern: /access.?control/i, name: 'access control' },
    { pattern: /oracle.?manipulation/i, name: 'oracle manipulation' },
  ];

  const detectedVulnerabilities = new Map();

  // Count occurrences of each vulnerability type
  results.tests.forEach(test => {
    if (test.status !== 'failed' || !test.title) return;

    vulnerabilityPatterns.forEach(({ pattern, name }) => {
      if (pattern.test(test.title) || (test.error && pattern.test(test.error))) {
        const count = detectedVulnerabilities.get(name) || 0;
        detectedVulnerabilities.set(name, count + 1);
      }
    });
  });

  // Convert to array and sort by count (descending)
  return Array.from(detectedVulnerabilities.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => (count > 1 ? `${count} ${name}` : name));
}

module.exports = {
  generateTweetSummary,
};
