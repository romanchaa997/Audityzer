
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const fs = require('fs').promises;
const path = require('path');

class EmailCampaignManager {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    this.campaigns = new Map();
    this.subscribers = new Map();
    this.analytics = {
      sent: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0
    };
  }

  async loadTemplates() {
    const templatesDir = path.join(__dirname, 'templates');
    const templates = {};
    
    try {
      const files = await fs.readdir(templatesDir);
      for (const file of files) {
        if (file.endsWith('.html')) {
          const name = path.basename(file, '.html');
          templates[name] = await fs.readFile(path.join(templatesDir, file), 'utf8');
        }
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    }
    
    return templates;
  }

  async createCampaign(name, config) {
    const campaign = {
      id: Date.now().toString(),
      name,
      subject: config.subject,
      template: config.template,
      audience: config.audience || 'all',
      schedule: config.schedule,
      status: 'draft',
      created: new Date(),
      analytics: {
        sent: 0,
        opened: 0,
        clicked: 0,
        bounced: 0
      }
    };

    this.campaigns.set(campaign.id, campaign);
    return campaign;
  }

  async sendCampaign(campaignId) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const templates = await this.loadTemplates();
    const template = templates[campaign.template];
    
    if (!template) {
      throw new Error('Template not found');
    }

    const recipients = this.getAudienceEmails(campaign.audience);
    
    for (const recipient of recipients) {
      try {
        const personalizedContent = this.personalizeContent(template, recipient);
        
        await this.transporter.sendMail({
          from: `"Audityzer" <${process.env.SMTP_USER}>`,
          to: recipient.email,
          subject: campaign.subject,
          html: personalizedContent,
          headers: {
            'X-Campaign-ID': campaignId,
            'X-Recipient-ID': recipient.id
          }
        });

        campaign.analytics.sent++;
        this.analytics.sent++;
        
        console.log(`Email sent to ${recipient.email}`);
      } catch (error) {
        console.error(`Failed to send email to ${recipient.email}:`, error);
        campaign.analytics.bounced++;
      }
    }

    campaign.status = 'sent';
    campaign.sentAt = new Date();
  }

  personalizeContent(template, recipient) {
    return template
      .replace(/{{name}}/g, recipient.name || 'Valued User')
      .replace(/{{email}}/g, recipient.email)
      .replace(/{{unsubscribe_url}}/g, `${process.env.BASE_URL}/unsubscribe?token=${recipient.token}`)
      .replace(/{{tracking_pixel}}/g, `<img src="${process.env.BASE_URL}/track/open/${recipient.id}" width="1" height="1" style="display:none;">`)
      .replace(/{{date}}/g, new Date().toLocaleDateString());
  }

  getAudienceEmails(audience) {
    // Mock data - in production, fetch from database
    const allSubscribers = [
      { id: '1', email: 'user1@example.com', name: 'John Doe', segment: 'developers', token: 'token1' },
      { id: '2', email: 'user2@example.com', name: 'Jane Smith', segment: 'auditors', token: 'token2' },
      { id: '3', email: 'user3@example.com', name: 'Bob Johnson', segment: 'investors', token: 'token3' }
    ];

    if (audience === 'all') {
      return allSubscribers;
    }

    return allSubscribers.filter(sub => sub.segment === audience);
  }

  scheduleWeeklyNewsletter() {
    // Every Monday at 9 AM
    cron.schedule('0 9 * * 1', async () => {
      console.log('Sending weekly newsletter...');
      
      const campaign = await this.createCampaign('Weekly Newsletter', {
        subject: 'Audityzer Weekly: Latest Security Insights',
        template: 'newsletter',
        audience: 'all',
        schedule: 'weekly'
      });

      await this.sendCampaign(campaign.id);
    });
  }

  scheduleWelcomeSeries() {
    // Check for new users every hour
    cron.schedule('0 * * * *', async () => {
      const newUsers = await this.getNewUsers();
      
      for (const user of newUsers) {
        await this.sendWelcomeSequence(user);
      }
    });
  }

  async sendWelcomeSequence(user) {
    const sequence = [
      { delay: 0, template: 'welcome', subject: 'Welcome to Audityzer!' },
      { delay: 24, template: 'getting-started', subject: 'Get Started with Your First Audit' },
      { delay: 72, template: 'features', subject: 'Discover Audityzer\'s Powerful Features' },
      { delay: 168, template: 'community', subject: 'Join the Audityzer Community' }
    ];

    for (const step of sequence) {
      setTimeout(async () => {
        const campaign = await this.createCampaign(`Welcome Series - ${step.template}`, {
          subject: step.subject,
          template: step.template,
          audience: 'new-users'
        });

        await this.sendCampaign(campaign.id);
      }, step.delay * 60 * 60 * 1000); // Convert hours to milliseconds
    }
  }

  async getNewUsers() {
    // Mock implementation - fetch from database in production
    return [];
  }

  trackOpen(recipientId) {
    this.analytics.opened++;
    console.log(`Email opened by recipient ${recipientId}`);
  }

  trackClick(recipientId, url) {
    this.analytics.clicked++;
    console.log(`Link clicked by recipient ${recipientId}: ${url}`);
  }

  getAnalytics() {
    return {
      campaigns: Array.from(this.campaigns.values()),
      overall: this.analytics
    };
  }

  start() {
    console.log('Starting email campaign manager...');
    this.scheduleWeeklyNewsletter();
    this.scheduleWelcomeSeries();
  }
}

module.exports = EmailCampaignManager;
