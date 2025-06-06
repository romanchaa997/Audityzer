
# Audityzer Community Platform

This directory contains the community engagement tools and platforms for Audityzer.

## Components

### 🤖 Discord Bot (`discord-bot/`)
- Interactive commands for audit information
- Community engagement features
- Real-time notifications
- Welcome messages for new members

### 🗣️ Forum (`forum/`)
- Discourse-based community forum
- Technical discussions
- Knowledge sharing
- Support channels

### 📱 Telegram Bot (`telegram-bot/`)
- Quick audit commands
- Mobile-friendly interface
- Real-time audit results
- Security alerts

## Quick Setup

```bash
# Set up the entire community platform
chmod +x setup-community.sh
./setup-community.sh
```

## Individual Setup

### Discord Bot
```bash
cd discord-bot
npm install
# Update .env with Discord credentials
npm start
```

### Forum (Discourse)
```bash
# Update community/.env with credentials
docker-compose -f forum/docker-compose.forum.yml up -d
```

### Telegram Bot
```bash
cd telegram-bot
pip install -r requirements.txt
# Set TELEGRAM_BOT_TOKEN environment variable
python bot.py
```

## Configuration

### Environment Variables
Create `community/.env` with:

```env
# Discord Bot
DISCORD_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_client_id
DISCORD_GUILD_ID=your_guild_id

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_telegram_token

# Forum
POSTGRES_PASSWORD=secure_password
SMTP_USERNAME=your_smtp_user
SMTP_PASSWORD=your_smtp_password

# API
AUDITYZER_API_KEY=your_api_key
AUDITYZER_API_URL=https://api.audityzer.com
```

### Discord Bot Setup
1. Create a Discord application at https://discord.com/developers/applications
2. Create a bot and get the token
3. Invite the bot to your server with appropriate permissions
4. Update the environment variables

### Telegram Bot Setup
1. Create a bot via @BotFather on Telegram
2. Get the bot token
3. Set the TELEGRAM_BOT_TOKEN environment variable
4. Start the bot

### Forum Setup
1. Configure domain name and SSL certificates
2. Set up SMTP for email notifications
3. Customize themes and plugins
4. Create initial categories and content

## Features

### Discord Bot Features
- `/audit [type]` - Get audit information
- `/stats` - Platform statistics
- `/help` - Command help
- Welcome messages for new members
- Interactive embeds and buttons

### Telegram Bot Features
- `/start` - Welcome and main menu
- `/audit <address>` - Quick contract audit
- `/stats` - Platform statistics
- `/help` - Command help
- Inline keyboards for easy navigation

### Forum Features
- Technical discussions
- Knowledge base
- Support channels
- User authentication
- Mobile responsive design

## Monitoring

All community platforms include:
- Health checks
- Error logging
- Usage analytics
- Performance monitoring

## Security

- Rate limiting on bot commands
- Input validation and sanitization
- Secure credential management
- Regular security updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

- Discord: [Join our server](https://discord.gg/audityzer)
- Telegram: [@AudityzerBot](https://t.me/AudityzerBot)
- Forum: [forum.audityzer.com](https://forum.audityzer.com)
- Email: support@audityzer.com
