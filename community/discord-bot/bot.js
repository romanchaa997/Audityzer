
const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

class AudityzerBot {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
      ]
    });

    this.commands = new Map();
    this.setupCommands();
    this.setupEvents();
  }

  setupCommands() {
    // Audit command
    const auditCommand = new SlashCommandBuilder()
      .setName('audit')
      .setDescription('Get information about smart contract auditing')
      .addStringOption(option =>
        option.setName('type')
          .setDescription('Type of audit information')
          .setRequired(false)
          .addChoices(
            { name: 'Getting Started', value: 'getting-started' },
            { name: 'Best Practices', value: 'best-practices' },
            { name: 'Tools', value: 'tools' },
            { name: 'Resources', value: 'resources' }
          )
      );

    // Stats command
    const statsCommand = new SlashCommandBuilder()
      .setName('stats')
      .setDescription('Get Audityzer platform statistics');

    // Help command
    const helpCommand = new SlashCommandBuilder()
      .setName('help')
      .setDescription('Get help with Audityzer commands');

    this.commands.set('audit', auditCommand);
    this.commands.set('stats', statsCommand);
    this.commands.set('help', helpCommand);
  }

  setupEvents() {
    this.client.once('ready', () => {
      console.log(`🤖 Audityzer Bot is ready! Logged in as ${this.client.user.tag}`);
      this.client.user.setActivity('Smart Contract Audits', { type: 'WATCHING' });
    });

    this.client.on('interactionCreate', async interaction => {
      if (!interaction.isChatInputCommand()) return;

      const { commandName } = interaction;

      try {
        switch (commandName) {
          case 'audit':
            await this.handleAuditCommand(interaction);
            break;
          case 'stats':
            await this.handleStatsCommand(interaction);
            break;
          case 'help':
            await this.handleHelpCommand(interaction);
            break;
          default:
            await interaction.reply('Unknown command!');
        }
      } catch (error) {
        console.error('Error handling command:', error);
        await interaction.reply('There was an error executing this command!');
      }
    });

    this.client.on('guildMemberAdd', member => {
      this.welcomeNewMember(member);
    });
  }

  async handleAuditCommand(interaction) {
    const type = interaction.options.getString('type') || 'getting-started';

    const embeds = {
      'getting-started': new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('🚀 Getting Started with Smart Contract Auditing')
        .setDescription('Welcome to the world of smart contract security!')
        .addFields(
          { name: '1. Learn the Basics', value: 'Understand Solidity and common vulnerabilities' },
          { name: '2. Use Audityzer', value: 'Try our automated scanning tools' },
          { name: '3. Join the Community', value: 'Connect with other security researchers' },
          { name: '4. Practice', value: 'Audit test contracts and participate in CTFs' }
        )
        .setFooter({ text: 'Audityzer - Securing Web3' }),

      'best-practices': new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle('✅ Smart Contract Audit Best Practices')
        .addFields(
          { name: 'Static Analysis', value: 'Use tools like Slither, Mythril, and Audityzer' },
          { name: 'Manual Review', value: 'Always complement automated tools with manual review' },
          { name: 'Test Coverage', value: 'Ensure comprehensive test coverage' },
          { name: 'Documentation', value: 'Document all findings and recommendations' }
        ),

      'tools': new EmbedBuilder()
        .setColor(0xFF9900)
        .setTitle('🛠️ Auditing Tools')
        .addFields(
          { name: 'Audityzer Platform', value: 'Our comprehensive audit suite' },
          { name: 'Slither', value: 'Static analysis framework' },
          { name: 'Mythril', value: 'Security analysis tool' },
          { name: 'Echidna', value: 'Property-based fuzzer' }
        ),

      'resources': new EmbedBuilder()
        .setColor(0xFF0099)
        .setTitle('📚 Learning Resources')
        .addFields(
          { name: 'Documentation', value: '[Audityzer Docs](https://docs.audityzer.com)' },
          { name: 'Tutorials', value: '[YouTube Channel](https://youtube.com/audityzer)' },
          { name: 'Blog', value: '[Medium Blog](https://medium.com/audityzer)' },
          { name: 'GitHub', value: '[Open Source Tools](https://github.com/audityzer)' }
        )
    };

    await interaction.reply({ embeds: [embeds[type]] });
  }

  async handleStatsCommand(interaction) {
    // Mock stats - in production, fetch from API
    const embed = new EmbedBuilder()
      .setColor(0x9900FF)
      .setTitle('📊 Audityzer Platform Statistics')
      .addFields(
        { name: 'Total Audits', value: '1,247', inline: true },
        { name: 'Vulnerabilities Found', value: '3,891', inline: true },
        { name: 'Active Users', value: '892', inline: true },
        { name: 'Community Members', value: `${interaction.guild.memberCount}`, inline: true },
        { name: 'Contracts Secured', value: '$2.1B TVL', inline: true },
        { name: 'Success Rate', value: '99.7%', inline: true }
      )
      .setTimestamp()
      .setFooter({ text: 'Updated in real-time' });

    await interaction.reply({ embeds: [embed] });
  }

  async handleHelpCommand(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('🆘 Audityzer Bot Help')
      .setDescription('Available commands and features')
      .addFields(
        { name: '/audit [type]', value: 'Get audit information and resources' },
        { name: '/stats', value: 'View platform statistics' },
        { name: '/help', value: 'Show this help message' }
      )
      .addFields(
        { name: '🔗 Quick Links', value: '[Website](https://audityzer.com) | [Docs](https://docs.audityzer.com) | [GitHub](https://github.com/audityzer)' }
      );

    await interaction.reply({ embeds: [embed] });
  }

  async welcomeNewMember(member) {
    const welcomeChannel = member.guild.channels.cache.find(
      channel => channel.name === 'welcome' || channel.name === 'general'
    );

    if (welcomeChannel) {
      const embed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle('🎉 Welcome to Audityzer Community!')
        .setDescription(`Welcome ${member.user}, we're excited to have you join our security-focused community!`)
        .addFields(
          { name: '🚀 Get Started', value: 'Use `/audit getting-started` to begin your journey' },
          { name: '💬 Introduce Yourself', value: 'Tell us about your background in #introductions' },
          { name: '🛠️ Try Audityzer', value: 'Visit [audityzer.com](https://audityzer.com) to start auditing' }
        )
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp();

      welcomeChannel.send({ embeds: [embed] });
    }
  }

  async deployCommands() {
    const commands = Array.from(this.commands.values()).map(command => command.toJSON());
    
    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(
        Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
        { body: commands }
      );

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error('Error deploying commands:', error);
    }
  }

  async start() {
    await this.deployCommands();
    await this.client.login(process.env.DISCORD_TOKEN);
  }
}

module.exports = AudityzerBot;

// Start the bot if this file is run directly
if (require.main === module) {
  require('dotenv').config();
  const bot = new AudityzerBot();
  bot.start().catch(console.error);
}
