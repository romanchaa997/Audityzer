
const { TwitterApi } = require('twitter-api-v2');
const cron = require('node-cron');

class TwitterBot {
  constructor() {
    this.client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });

    this.rwClient = this.client.readWrite;
    
    this.contentTemplates = [
      "🔍 Smart contract security tip: Always validate input parameters to prevent unexpected behavior. #SmartContractSecurity #Web3Security",
      "📊 This week on Audityzer: {audits} contracts audited, {vulnerabilities} vulnerabilities found, ${value} in assets secured! 🛡️",
      "🚨 Common vulnerability alert: Reentrancy attacks can drain your contract's funds. Use the checks-effects-interactions pattern! #DeFiSecurity",
      "💡 Pro tip: Use automated tools like Audityzer for initial scanning, but always follow up with manual code review. #SmartContracts",
      "🎯 Gas optimization matters! Our latest analysis shows you can save up to 30% on transaction costs with proper optimization. #Ethereum",
      "🔐 Security is not optional in DeFi. Every line of code matters when handling millions in user funds. #Web3 #Security",
      "📚 New blog post: 'Top 10 Smart Contract Vulnerabilities and How to Prevent Them' - Link in bio! #Education #Blockchain",
      "🏆 Shoutout to our community for reporting {bugs} bugs this month! Bug bounty program is live. #BugBounty #Community"
    ];

    this.hashtagSets = [
      ['#SmartContracts', '#Web3Security', '#DeFi'],
      ['#Ethereum', '#Solidity', '#Security'],
      ['#Blockchain', '#CyberSecurity', '#Web3'],
      ['#DeFiSecurity', '#SmartContractAudit', '#Crypto']
    ];
  }

  async postTweet(content) {
    try {
      const tweet = await this.rwClient.v2.tweet(content);
      console.log(`Tweet posted: ${tweet.data.id}`);
      return tweet;
    } catch (error) {
      console.error('Error posting tweet:', error);
      throw error;
    }
  }

  async postThread(tweets) {
    try {
      let previousTweetId = null;
      const threadTweets = [];

      for (const tweetContent of tweets) {
        const tweetOptions = previousTweetId 
          ? { reply: { in_reply_to_tweet_id: previousTweetId } }
          : {};

        const tweet = await this.rwClient.v2.tweet(tweetContent, tweetOptions);
        threadTweets.push(tweet);
        previousTweetId = tweet.data.id;
        
        // Wait between tweets to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      console.log(`Thread posted with ${threadTweets.length} tweets`);
      return threadTweets;
    } catch (error) {
      console.error('Error posting thread:', error);
      throw error;
    }
  }

  generateDailyTip() {
    const tips = [
      "Always use the latest compiler version to benefit from security improvements and bug fixes.",
      "Implement proper access controls using OpenZeppelin's Ownable or AccessControl contracts.",
      "Use SafeMath library or Solidity 0.8+ to prevent integer overflow/underflow vulnerabilities.",
      "Validate all external calls and handle potential failures gracefully.",
      "Implement circuit breakers to pause contract functionality in case of emergencies.",
      "Use time locks for critical administrative functions to give users time to react.",
      "Regularly update your dependencies and audit third-party contracts you integrate with.",
      "Test your contracts thoroughly with both unit tests and integration tests.",
      "Consider formal verification for critical contract logic.",
      "Implement proper event logging for transparency and debugging."
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    const hashtags = this.getRandomHashtags();
    
    return `💡 Daily Security Tip:\n\n${randomTip}\n\n${hashtags.join(' ')} #AudityzerTip`;
  }

  generateWeeklyStats() {
    // Mock data - in production, fetch from analytics
    const stats = {
      audits: Math.floor(Math.random() * 100) + 50,
      vulnerabilities: Math.floor(Math.random() * 50) + 20,
      value: (Math.random() * 5 + 1).toFixed(1) + 'M'
    };

    const template = this.contentTemplates[1];
    return template
      .replace('{audits}', stats.audits)
      .replace('{vulnerabilities}', stats.vulnerabilities)
      .replace('{value}', stats.value);
  }

  generateEducationalThread() {
    const topics = [
      {
        title: "Understanding Reentrancy Attacks",
        tweets: [
          "🧵 Thread: Understanding Reentrancy Attacks in Smart Contracts\n\n1/5 What is a reentrancy attack and why should you care? 👇",
          "2/5 A reentrancy attack occurs when a function makes an external call to another untrusted contract before resolving its own state changes.",
          "3/5 The classic example is the DAO hack of 2016, where an attacker drained $60M by repeatedly calling the withdraw function.",
          "4/5 Prevention: Use the checks-effects-interactions pattern, implement reentrancy guards, or use OpenZeppelin's ReentrancyGuard.",
          "5/5 Always audit your contracts with tools like @Audityzer to catch these vulnerabilities early! 🛡️ #SmartContractSecurity"
        ]
      },
      {
        title: "Gas Optimization Techniques",
        tweets: [
          "🧵 Thread: Gas Optimization Techniques for Smart Contracts\n\n1/6 High gas costs killing your DApp's UX? Here's how to optimize 👇",
          "2/6 Use 'uint256' instead of smaller uints when possible. The EVM operates on 32-byte words, so uint256 is often more efficient.",
          "3/6 Pack struct variables efficiently. Group smaller types together to fit within single storage slots.",
          "4/6 Use 'external' instead of 'public' for functions that won't be called internally. External functions are cheaper.",
          "5/6 Cache storage variables in memory when accessing them multiple times in a function.",
          "6/6 Use events instead of storage for data that doesn't need to be accessed by contracts. Much cheaper! ⛽ #GasOptimization"
        ]
      }
    ];

    return topics[Math.floor(Math.random() * topics.length)];
  }

  getRandomHashtags() {
    return this.hashtagSets[Math.floor(Math.random() * this.hashtagSets.length)];
  }

  async replyToMentions() {
    try {
      const mentions = await this.rwClient.v2.userMentionTimeline('audityzer_official', {
        max_results: 10,
        'tweet.fields': ['author_id', 'created_at']
      });

      for (const mention of mentions.data || []) {
        // Simple auto-reply logic
        const reply = "Thanks for mentioning us! 🛡️ Check out our latest security tools at audityzer.com";
        
        await this.rwClient.v2.tweet(reply, {
          reply: { in_reply_to_tweet_id: mention.id }
        });

        console.log(`Replied to mention: ${mention.id}`);
      }
    } catch (error) {
      console.error('Error handling mentions:', error);
    }
  }

  scheduleContent() {
    // Daily tip at 9 AM
    cron.schedule('0 9 * * *', async () => {
      const tip = this.generateDailyTip();
      await this.postTweet(tip);
    });

    // Weekly stats on Mondays at 10 AM
    cron.schedule('0 10 * * 1', async () => {
      const stats = this.generateWeeklyStats();
      await this.postTweet(stats);
    });

    // Educational thread on Wednesdays at 2 PM
    cron.schedule('0 14 * * 3', async () => {
      const thread = this.generateEducationalThread();
      await this.postThread(thread.tweets);
    });

    // Check mentions every hour
    cron.schedule('0 * * * *', async () => {
      await this.replyToMentions();
    });
  }

  async start() {
    console.log('🐦 Starting Twitter bot...');
    
    try {
      // Verify credentials
      const user = await this.rwClient.v2.me();
      console.log(`Authenticated as: @${user.data.username}`);
      
      // Schedule content
      this.scheduleContent();
      
      console.log('Twitter bot is running and scheduled!');
    } catch (error) {
      console.error('Failed to start Twitter bot:', error);
    }
  }
}

module.exports = TwitterBot;
