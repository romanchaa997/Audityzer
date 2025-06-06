
import os
import logging
import asyncio
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes
import aiohttp
import json

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

class AudityzerTelegramBot:
    def __init__(self, token: str):
        self.token = token
        self.api_url = os.getenv('AUDITYZER_API_URL', 'https://api.audityzer.com')
        
    async def start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Send a message when the command /start is issued."""
        keyboard = [
            [InlineKeyboardButton("🔍 Start Audit", callback_data='start_audit')],
            [InlineKeyboardButton("📊 View Stats", callback_data='view_stats')],
            [InlineKeyboardButton("📚 Learn More", callback_data='learn_more')],
            [InlineKeyboardButton("🌐 Visit Website", url='https://audityzer.com')]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        welcome_text = """
🛡️ **Welcome to Audityzer!**

Your trusted partner for smart contract security auditing.

🔹 Automated vulnerability detection
🔹 Comprehensive security reports  
🔹 Real-time monitoring
🔹 Expert recommendations

Choose an option below to get started:
        """
        
        await update.message.reply_text(
            welcome_text,
            reply_markup=reply_markup,
            parse_mode='Markdown'
        )

    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Send a message when the command /help is issued."""
        help_text = """
🆘 **Audityzer Bot Commands**

/start - Welcome message and main menu
/help - Show this help message
/audit <contract_address> - Quick audit of a contract
/stats - Platform statistics
/price - Pricing information
/support - Contact support

**Inline Commands:**
• Quick audit via buttons
• Real-time notifications
• Security alerts

Need more help? Visit our [documentation](https://docs.audityzer.com)
        """
        
        await update.message.reply_text(help_text, parse_mode='Markdown')

    async def audit_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle audit command with contract address."""
        if not context.args:
            await update.message.reply_text(
                "Please provide a contract address:\n`/audit 0x1234...`",
                parse_mode='Markdown'
            )
            return
            
        contract_address = context.args[0]
        
        # Validate contract address format
        if not contract_address.startswith('0x') or len(contract_address) != 42:
            await update.message.reply_text(
                "❌ Invalid contract address format. Please use a valid Ethereum address."
            )
            return
            
        await update.message.reply_text(
            f"🔍 Starting audit for contract: `{contract_address}`\n\n"
            "This may take a few minutes...",
            parse_mode='Markdown'
        )
        
        # Simulate audit process
        try:
            audit_result = await self.perform_audit(contract_address)
            await self.send_audit_result(update, audit_result)
        except Exception as e:
            logger.error(f"Audit failed: {e}")
            await update.message.reply_text(
                "❌ Audit failed. Please try again later or contact support."
            )

    async def stats_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Show platform statistics."""
        stats_text = """
📊 **Audityzer Platform Statistics**

🔍 **Total Audits:** 1,247
🐛 **Vulnerabilities Found:** 3,891  
👥 **Active Users:** 892
💰 **Value Secured:** $2.1B TVL
✅ **Success Rate:** 99.7%
⚡ **Avg. Scan Time:** 45 seconds

*Updated in real-time*
        """
        
        keyboard = [
            [InlineKeyboardButton("📈 Detailed Stats", callback_data='detailed_stats')],
            [InlineKeyboardButton("🔄 Refresh", callback_data='refresh_stats')]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            stats_text,
            reply_markup=reply_markup,
            parse_mode='Markdown'
        )

    async def button_handler(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle button callbacks."""
        query = update.callback_query
        await query.answer()
        
        if query.data == 'start_audit':
            await query.edit_message_text(
                "🔍 **Start New Audit**\n\n"
                "Send me a contract address to begin:\n"
                "`/audit 0x1234567890123456789012345678901234567890`",
                parse_mode='Markdown'
            )
            
        elif query.data == 'view_stats':
            await self.stats_command(update, context)
            
        elif query.data == 'learn_more':
            keyboard = [
                [InlineKeyboardButton("📖 Documentation", url='https://docs.audityzer.com')],
                [InlineKeyboardButton("🎥 Tutorials", url='https://youtube.com/audityzer')],
                [InlineKeyboardButton("💬 Community", url='https://discord.gg/audityzer')]
            ]
            reply_markup = InlineKeyboardMarkup(keyboard)
            
            await query.edit_message_text(
                "📚 **Learn More About Audityzer**\n\n"
                "🔹 Comprehensive documentation\n"
                "🔹 Video tutorials and guides\n"
                "🔹 Active community support\n"
                "🔹 Regular security updates",
                reply_markup=reply_markup,
                parse_mode='Markdown'
            )

    async def perform_audit(self, contract_address: str):
        """Perform audit via API call."""
        # Mock audit result - in production, call actual API
        return {
            'contract_address': contract_address,
            'status': 'completed',
            'vulnerabilities': [
                {
                    'severity': 'Medium',
                    'type': 'Reentrancy',
                    'description': 'Potential reentrancy vulnerability in withdraw function'
                },
                {
                    'severity': 'Low',
                    'type': 'Gas Optimization',
                    'description': 'Loop can be optimized to reduce gas costs'
                }
            ],
            'score': 85,
            'recommendations': [
                'Implement reentrancy guard',
                'Optimize gas usage in loops',
                'Add input validation'
            ]
        }

    async def send_audit_result(self, update: Update, result: dict):
        """Send formatted audit results."""
        vulnerabilities = result.get('vulnerabilities', [])
        score = result.get('score', 0)
        
        # Determine score emoji
        if score >= 90:
            score_emoji = "🟢"
        elif score >= 70:
            score_emoji = "🟡"
        else:
            score_emoji = "🔴"
            
        result_text = f"""
✅ **Audit Complete**

📋 **Contract:** `{result['contract_address']}`
{score_emoji} **Security Score:** {score}/100

🐛 **Vulnerabilities Found:** {len(vulnerabilities)}
"""
        
        if vulnerabilities:
            result_text += "\n**Issues:**\n"
            for vuln in vulnerabilities:
                severity_emoji = "🔴" if vuln['severity'] == 'High' else "🟡" if vuln['severity'] == 'Medium' else "🟢"
                result_text += f"{severity_emoji} {vuln['severity']}: {vuln['type']}\n"
        
        keyboard = [
            [InlineKeyboardButton("📄 Full Report", callback_data=f"full_report_{result['contract_address']}")],
            [InlineKeyboardButton("🔄 Re-audit", callback_data=f"re_audit_{result['contract_address']}")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            result_text,
            reply_markup=reply_markup,
            parse_mode='Markdown'
        )

    def run(self):
        """Start the bot."""
        application = Application.builder().token(self.token).build()
        
        # Add handlers
        application.add_handler(CommandHandler("start", self.start))
        application.add_handler(CommandHandler("help", self.help_command))
        application.add_handler(CommandHandler("audit", self.audit_command))
        application.add_handler(CommandHandler("stats", self.stats_command))
        application.add_handler(CallbackQueryHandler(self.button_handler))
        
        # Start the bot
        logger.info("Starting Audityzer Telegram Bot...")
        application.run_polling()

if __name__ == '__main__':
    token = os.getenv('TELEGRAM_BOT_TOKEN')
    if not token:
        logger.error("TELEGRAM_BOT_TOKEN environment variable not set")
        exit(1)
        
    bot = AudityzerTelegramBot(token)
    bot.run()
