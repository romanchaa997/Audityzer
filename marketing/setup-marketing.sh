
#!/bin/bash

set -e

echo "📢 Setting up Audityzer Marketing Automation..."

# Create necessary directories
mkdir -p marketing/automation/templates
mkdir -p marketing/analytics/reports
mkdir -p marketing/social-media/content
mkdir -p marketing/campaigns/assets

# Install Node.js dependencies for marketing automation
echo "📦 Installing marketing dependencies..."
cd marketing
npm init -y
npm install nodemailer node-cron twitter-api-v2 dotenv fs-extra

# Set up environment variables
if [ ! -f .env ]; then
  echo "📝 Creating marketing environment file..."
  cat > .env << EOF
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Twitter API
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret

# Application
BASE_URL=https://audityzer.com
AUDITYZER_API_URL=https://api.audityzer.com
AUDITYZER_API_KEY=your_api_key

# Analytics
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
MIXPANEL_TOKEN=your_mixpanel_token
EOF
  echo "⚠️ Please update marketing/.env with your actual credentials"
fi

# Create package.json for marketing automation
cat > package.json << EOF
{
  "name": "audityzer-marketing-automation",
  "version": "1.0.0",
  "description": "Marketing automation and growth tracking for Audityzer",
  "main": "index.js",
  "scripts": {
    "start": "node campaigns/launch-campaign.js",
    "email": "node automation/email-campaigns.js",
    "twitter": "node social-media/twitter-bot.js",
    "analytics": "node analytics/growth-tracker.js",
    "test": "echo 'No tests specified'"
  },
  "dependencies": {
    "nodemailer": "^6.9.7",
    "node-cron": "^3.0.3",
    "twitter-api-v2": "^1.15.1",
    "dotenv": "^16.3.1",
    "fs-extra": "^11.1.1",
    "axios": "^1.6.2"
  },
  "keywords": [
    "marketing",
    "automation",
    "growth",
    "analytics",
    "audityzer"
  ],
  "author": "Audityzer Team",
  "license": "MIT"
}
EOF

# Create additional email templates
echo "📧 Creating additional email templates..."

cat > automation/templates/getting-started.html << EOF
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Get Started with Audityzer</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .step { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Ready to Secure Your Smart Contracts?</h1>
        </div>
        <div class="content">
            <h2>Hi {{name}},</h2>
            <p>Let's get you started with your first smart contract audit on Audityzer!</p>
            
            <div class="step">
                <h3>Step 1: Upload Your Contract</h3>
                <p>Simply paste your Solidity code or upload your contract file to begin the analysis.</p>
            </div>
            
            <div class="step">
                <h3>Step 2: Choose Your Scan Type</h3>
                <p>Select from Quick Scan (30 seconds), Deep Analysis (5 minutes), or Full Audit (15 minutes).</p>
            </div>
            
            <div class="step">
                <h3>Step 3: Review Results</h3>
                <p>Get detailed vulnerability reports with fix recommendations and security scores.</p>
            </div>
            
            <div style="text-align: center;">
                <a href="https://audityzer.com/audit" class="button">Start Your First Audit</a>
            </div>
        </div>
    </div>
</body>
</html>
EOF

# Create analytics dashboard script
echo "📊 Creating analytics dashboard..."
cat > analytics/dashboard.js << EOF
const GrowthTracker = require('./growth-tracker');
const express = require('express');
const app = express();

const tracker = new GrowthTracker();

app.get('/dashboard', async (req, res) => {
  const dashboard = tracker.generateDashboard();
  res.json(dashboard);
});

app.get('/report', async (req, res) => {
  const report = tracker.generateReport();
  res.json(report);
});

app.listen(3002, () => {
  console.log('📊 Analytics dashboard running on http://localhost:3002');
});
EOF

# Create social media content calendar
echo "📅 Creating content calendar..."
cat > social-media/content-calendar.json << EOF
{
  "weekly_schedule": {
    "monday": {
      "time": "09:00",
      "type": "weekly_stats",
      "platforms": ["twitter", "linkedin"]
    },
    "tuesday": {
      "time": "14:00",
      "type": "educational_tip",
      "platforms": ["twitter", "discord"]
    },
    "wednesday": {
      "time": "10:00",
      "type": "feature_highlight",
      "platforms": ["twitter", "linkedin"]
    },
    "thursday": {
      "time": "15:00",
      "type": "community_spotlight",
      "platforms": ["twitter", "discord"]
    },
    "friday": {
      "time": "11:00",
      "type": "weekly_roundup",
      "platforms": ["twitter", "linkedin"]
    }
  },
  "content_themes": [
    "Smart Contract Security",
    "DeFi Safety",
    "Web3 Education",
    "Community Highlights",
    "Product Updates",
    "Industry News",
    "Best Practices",
    "Success Stories"
  ]
}
EOF

cd ..

echo "✅ Marketing automation setup complete!"
echo ""
echo "📢 Marketing Tools Available:"
echo "  Email Campaigns:    cd marketing && node automation/email-campaigns.js"
echo "  Twitter Bot:        cd marketing && node social-media/twitter-bot.js"
echo "  Growth Analytics:   cd marketing && node analytics/growth-tracker.js"
echo "  Launch Campaign:    cd marketing && node campaigns/launch-campaign.js"
echo "  Analytics Dashboard: cd marketing && node analytics/dashboard.js"
echo ""
echo "🔧 Configuration:"
echo "  Update marketing/.env with your API credentials"
echo "  Customize email templates in automation/templates/"
echo "  Modify social media content in social-media/"
echo ""
echo "📊 Analytics:"
echo "  Dashboard: http://localhost:3002/dashboard"
echo "  Reports:   http://localhost:3002/report"
echo ""
echo "🚀 Ready to launch your marketing campaigns!"
