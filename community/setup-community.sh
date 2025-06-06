
#!/bin/bash

set -e

echo "🏘️ Setting up Audityzer Community Platform..."

# Create necessary directories
mkdir -p community/forum/uploads
mkdir -p community/forum/ssl
mkdir -p community/discord-bot/logs

# Set up Discord Bot
echo "🤖 Setting up Discord Bot..."
cd community/discord-bot
npm install
cd ../..

# Generate SSL certificates (self-signed for development)
echo "🔐 Generating SSL certificates..."
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout community/forum/ssl/key.pem \
  -out community/forum/ssl/cert.pem \
  -subj "/C=US/ST=State/L=City/O=Audityzer/CN=forum.audityzer.com"

# Set up environment variables
if [ ! -f community/.env ]; then
  echo "📝 Creating environment file..."
  cat > community/.env << EOF
# Discord Bot Configuration
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_GUILD_ID=your_discord_guild_id_here

# Forum Configuration
POSTGRES_PASSWORD=$(openssl rand -base64 32)
SMTP_USERNAME=your_smtp_username
SMTP_PASSWORD=your_smtp_password

# API Keys
AUDITYZER_API_KEY=your_api_key_here
AUDITYZER_API_URL=https://api.audityzer.com
EOF
  echo "⚠️ Please update community/.env with your actual credentials"
fi

# Start forum services
echo "🗣️ Starting forum services..."
docker-compose -f community/forum/docker-compose.forum.yml up -d

echo "⏳ Waiting for services to start..."
sleep 30

echo "🔍 Checking service status..."
docker-compose -f community/forum/docker-compose.forum.yml ps

echo "✅ Community platform setup complete!"
echo ""
echo "🌐 Access URLs:"
echo "  Forum:        http://localhost:8080"
echo "  Forum (HTTPS): https://localhost:443"
echo ""
echo "🤖 Discord Bot:"
echo "  Update community/.env with Discord credentials"
echo "  Run: cd community/discord-bot && npm start"
echo ""
echo "📋 Next Steps:"
echo "  1. Configure Discord bot token in community/.env"
echo "  2. Set up SMTP credentials for forum emails"
echo "  3. Configure domain names and SSL certificates"
echo "  4. Customize forum themes and plugins"
echo "  5. Create initial forum categories and topics"
