/**
 * Messaging Adapter for Audityzer Security Agent
 * Publishes scan events to configured messaging backends:
 * - Webhook (HTTP POST)
 * - Slack
 * - Discord
 * - Custom via MESSAGING_WEBHOOK_URL env var
 */

export class MessagingAdapter {
  constructor(config = {}) {
    this.config = {
      webhookUrl: config.webhookUrl || process.env.MESSAGING_WEBHOOK_URL || null,
      slackWebhookUrl: config.slackWebhookUrl || process.env.SLACK_WEBHOOK_URL || null,
      discordWebhookUrl: config.discordWebhookUrl || process.env.DISCORD_WEBHOOK_URL || null,
      enabled: config.enabled !== undefined
        ? config.enabled
        : !!(config.webhookUrl || process.env.MESSAGING_WEBHOOK_URL ||
             process.env.SLACK_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL),
      ...config,
    };
  }

  /**
   * Publish an event to all configured messaging backends
   * @param {object} message - The message payload to publish
   */
  async publish(message) {
    if (!this.config.enabled) {
      return;
    }

    const sends = [];

    if (this.config.webhookUrl) {
      sends.push(this._sendWebhook(this.config.webhookUrl, message));
    }

    if (this.config.slackWebhookUrl) {
      sends.push(this._sendSlack(message));
    }

    if (this.config.discordWebhookUrl) {
      sends.push(this._sendDiscord(message));
    }

    const results = await Promise.allSettled(sends);
    results.forEach((r, i) => {
      if (r.status === 'rejected') {
        console.error(`[MessagingAdapter] Send[${i}] failed:`, r.reason);
      }
    });
  }

  /**
   * Send a notification (alias for publish with error priority)
   * @param {object} notification - Notification payload
   */
  async notify(notification) {
    return this.publish({ priority: 'high', ...notification });
  }

  async _sendWebhook(url, payload) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }
  }

  async _sendSlack(message) {
    const payload = {
      text: `*Audityzer Security Agent* - ${message.type}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: [
              `*Event:* ${message.type}`,
              message.scanId ? `*Scan ID:* ${message.scanId}` : null,
              message.ipfsHash ? `*IPFS:* ${message.ipfsHash}` : null,
              message.error ? `*Error:* ${message.error}` : null,
            ].filter(Boolean).join('\n'),
          },
        },
      ],
    };
    return this._sendWebhook(this.config.slackWebhookUrl, payload);
  }

  async _sendDiscord(message) {
    const content = [
      `**Audityzer Security Agent** - ${message.type}`,
      message.scanId ? `Scan ID: \`${message.scanId}\`` : null,
      message.ipfsHash ? `IPFS: \`${message.ipfsHash}\`` : null,
      message.error ? `Error: ${message.error}` : null,
    ].filter(Boolean).join('\n');
    return this._sendWebhook(this.config.discordWebhookUrl, { content });
  }

  isEnabled() {
    return this.config.enabled;
  }
}

export default MessagingAdapter;
