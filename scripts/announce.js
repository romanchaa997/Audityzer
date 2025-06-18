#!/usr/bin/env node

/* announce.js
 * Sends a message to a Discord webhook channel specified in config/discord_webhooks.json.
 * Usage: node scripts/announce.js --channel launch --message "DevForge v1 is live!"
 */

const fs = require('fs');
const path = require('path');

const axios = require('axios');

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  let key = null;
  for (const arg of args) {
    if (arg.startsWith('--')) {
      key = arg.replace(/^--/, '');
      parsed[key] = true;
    } else if (key) {
      parsed[key] = arg;
      key = null;
    }
  }
  return parsed;
}

(async () => {
  try {
    const { channel = 'launch', message = '🚀 DevForge update' } = parseArgs();
    const cfgPath = path.resolve(__dirname, '..', 'config', 'discord_webhooks.json');
    if (!fs.existsSync(cfgPath)) {
      console.error('config/discord_webhooks.json not found. Please create it with your webhook URLs.');
      process.exit(1);
    }
    const webhooks = JSON.parse(fs.readFileSync(cfgPath, 'utf-8'));
    const url = webhooks[channel];
    if (!url) {
      console.error(`No webhook configured for channel '${channel}'.`);
      process.exit(1);
    }

    await axios.post(url, { content: message });
  } catch (err) {
    console.error('Failed to send Discord announcement:', err.message || err);
    process.exit(1);
  }
})(); 