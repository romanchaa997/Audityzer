#!/usr/bin/env node
// UTM Link Generator for Marketing Campaigns

const fs = require('fs');
const path = require('path');

// Base URL
const baseUrl = 'https://audityzer.com';

// Campaign sources
const sources = [
  'twitter',
  'discord',
  'github',
  'email',
  'blog',
  'youtube',
  'linkedin',
  'reddit',
  'security_conference'
];

// Campaign mediums
const mediums = [
  'social',
  'influencer',
  'newsletter',
  'organic',
  'direct',
  'paid',
  'referral',
  'tutorial',
  'documentation'
];

// Example campaigns
const campaigns = [
  'product_launch',
  'security_tips',
  'wallet_compatibility',
  'bridge_security',
  'flash_loan_detection',
  'signature_replay_testing',
  'security_researcher_outreach',
  'protocol_audit_guide',
  'community_growth'
];

// Example content types
const contents = [
  'tweet',
  'post',
  'message',
  'banner',
  'blog_link',
  'video',
  'demo',
  'case_study',
  'tutorial'
];

// Landing pages
const pages = [
  '',  // homepage
  'features',
  'demo',
  'pricing',
  'docs',
  'github',
  'community',
  'security-testing-guide',
  'wallet-compatibility'
];

// Generate UTM links
function generateUtmLinks() {
  const links = [];
  
  // Generate a selection of links for common scenarios
  sources.forEach((source, idx) => {
    const medium = mediums[idx % mediums.length];
    const campaign = campaigns[idx % campaigns.length];
    const content = contents[idx % contents.length];
    const page = pages[idx % pages.length];
    
    const pageUrl = page ? `/${page}` : '';
    const utmParams = `utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}&utm_content=${content}`;
    const fullUrl = `${baseUrl}${pageUrl}?${utmParams}`;
    
    links.push({
      description: `${source.charAt(0).toUpperCase() + source.slice(1)} ${medium} campaign for ${campaign.replace('_', ' ')}`,
      url: fullUrl
    });
  });
  
  // Generate specific links for influencer outreach
  const influencers = ['alice', 'bob', 'charlie', 'dave', 'eve'];
  influencers.forEach(name => {
    const fullUrl = `${baseUrl}?utm_source=twitter&utm_medium=influencer&utm_campaign=${name}&utm_content=profile`;
    links.push({
      description: `Twitter link for influencer ${name}`,
      url: fullUrl
    });
  });
  
  return links;
}

// Write to file
function saveLinksToFile() {
  const utmLinks = generateUtmLinks();
  const markdown = `# UTM Links for Marketing Campaigns
  
${utmLinks.map(link => `## ${link.description}\n${link.url}\n`).join('\n')}

## How to Use These Links

1. Copy the appropriate link for your marketing channel
2. Use it in your social media posts, emails, etc.
3. Track performance in your analytics dashboard

## Custom Link Generator

For custom campaigns, use this format:

\`\`\`
https://audityzer.com?utm_source=[SOURCE]&utm_medium=[MEDIUM]&utm_campaign=[CAMPAIGN_NAME]&utm_content=[CONTENT_TYPE]
\`\`\`

Replace the bracketed values with your specific parameters.
`;

  const outputDir = path.join(process.cwd(), 'marketing');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(outputDir, 'utm-links.md'), markdown);
  console.log('UTM links generated successfully in marketing/utm-links.md');
}

// Run the script
saveLinksToFile(); 