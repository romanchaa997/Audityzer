
const fs = require('fs').promises;
const path = require('path');

class GrowthTracker {
  constructor() {
    this.metrics = {
      users: {
        total: 0,
        new_today: 0,
        new_this_week: 0,
        new_this_month: 0,
        active_daily: 0,
        active_weekly: 0,
        active_monthly: 0,
        retention_7d: 0,
        retention_30d: 0
      },
      audits: {
        total: 0,
        today: 0,
        this_week: 0,
        this_month: 0,
        avg_per_user: 0,
        success_rate: 0
      },
      revenue: {
        total: 0,
        today: 0,
        this_week: 0,
        this_month: 0,
        mrr: 0,
        arr: 0,
        churn_rate: 0
      },
      marketing: {
        website_visitors: 0,
        conversion_rate: 0,
        cost_per_acquisition: 0,
        lifetime_value: 0,
        social_followers: {
          twitter: 0,
          discord: 0,
          telegram: 0,
          linkedin: 0
        }
      },
      product: {
        vulnerabilities_found: 0,
        false_positive_rate: 0,
        avg_scan_time: 0,
        user_satisfaction: 0,
        feature_adoption: {}
      }
    };

    this.goals = {
      users: {
        monthly_growth_rate: 20, // 20% month-over-month
        target_dau: 1000,
        target_mau: 10000,
        retention_7d_target: 70,
        retention_30d_target: 40
      },
      revenue: {
        monthly_growth_rate: 25,
        target_mrr: 50000,
        target_arr: 600000,
        churn_rate_target: 5
      },
      marketing: {
        conversion_rate_target: 5,
        cpa_target: 50,
        ltv_target: 500
      }
    };

    this.dataFile = path.join(__dirname, 'growth-data.json');
  }

  async loadData() {
    try {
      const data = await fs.readFile(this.dataFile, 'utf8');
      const parsed = JSON.parse(data);
      this.metrics = { ...this.metrics, ...parsed.metrics };
      return true;
    } catch (error) {
      console.log('No existing data file found, starting fresh');
      return false;
    }
  }

  async saveData() {
    const data = {
      metrics: this.metrics,
      lastUpdated: new Date().toISOString()
    };

    try {
      await fs.writeFile(this.dataFile, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }

  trackUserSignup(userId, source = 'organic') {
    this.metrics.users.total++;
    this.metrics.users.new_today++;
    this.metrics.users.new_this_week++;
    this.metrics.users.new_this_month++;

    console.log(`New user signup: ${userId} from ${source}`);
    this.saveData();
  }

  trackUserActivity(userId, action) {
    // Track daily active users
    this.metrics.users.active_daily++;
    
    console.log(`User activity: ${userId} performed ${action}`);
  }

  trackAudit(userId, contractAddress, result) {
    this.metrics.audits.total++;
    this.metrics.audits.today++;
    this.metrics.audits.this_week++;
    this.metrics.audits.this_month++;

    if (result.vulnerabilities) {
      this.metrics.product.vulnerabilities_found += result.vulnerabilities.length;
    }

    if (result.scanTime) {
      // Update average scan time
      this.metrics.product.avg_scan_time = 
        (this.metrics.product.avg_scan_time + result.scanTime) / 2;
    }

    console.log(`Audit completed: ${contractAddress} by ${userId}`);
    this.saveData();
  }

  trackRevenue(amount, type = 'subscription') {
    this.metrics.revenue.total += amount;
    this.metrics.revenue.today += amount;
    this.metrics.revenue.this_week += amount;
    this.metrics.revenue.this_month += amount;

    console.log(`Revenue tracked: $${amount} from ${type}`);
    this.saveData();
  }

  trackWebsiteVisit(source, page) {
    this.metrics.marketing.website_visitors++;
    
    console.log(`Website visit: ${page} from ${source}`);
  }

  trackConversion(userId, source) {
    // Calculate conversion rate
    const conversions = this.metrics.users.new_today;
    const visitors = this.metrics.marketing.website_visitors;
    
    if (visitors > 0) {
      this.metrics.marketing.conversion_rate = (conversions / visitors) * 100;
    }

    console.log(`Conversion tracked: ${userId} from ${source}`);
  }

  calculateGrowthRates() {
    // This would typically compare with historical data
    return {
      user_growth_rate: 15.2, // Mock data
      revenue_growth_rate: 22.8,
      audit_growth_rate: 18.5
    };
  }

  generateDashboard() {
    const growthRates = this.calculateGrowthRates();
    
    return {
      overview: {
        total_users: this.metrics.users.total,
        total_audits: this.metrics.audits.total,
        total_revenue: this.metrics.revenue.total,
        growth_rates: growthRates
      },
      users: {
        ...this.metrics.users,
        growth_rate: growthRates.user_growth_rate
      },
      revenue: {
        ...this.metrics.revenue,
        growth_rate: growthRates.revenue_growth_rate
      },
      product: this.metrics.product,
      marketing: this.metrics.marketing,
      goals_progress: this.calculateGoalsProgress()
    };
  }

  calculateGoalsProgress() {
    return {
      user_growth: {
        current: this.metrics.users.new_this_month,
        target: this.goals.users.target_mau,
        progress: (this.metrics.users.new_this_month / this.goals.users.target_mau) * 100
      },
      revenue_growth: {
        current: this.metrics.revenue.mrr,
        target: this.goals.revenue.target_mrr,
        progress: (this.metrics.revenue.mrr / this.goals.revenue.target_mrr) * 100
      },
      retention: {
        current: this.metrics.users.retention_7d,
        target: this.goals.users.retention_7d_target,
        progress: (this.metrics.users.retention_7d / this.goals.users.retention_7d_target) * 100
      }
    };
  }

  generateReport() {
    const dashboard = this.generateDashboard();
    
    return {
      summary: `
📊 Audityzer Growth Report - ${new Date().toLocaleDateString()}

👥 Users: ${dashboard.users.total} total (+${dashboard.users.growth_rate}%)
🔍 Audits: ${dashboard.overview.total_audits} completed
💰 Revenue: $${dashboard.overview.total_revenue} (+${dashboard.revenue.growth_rate}%)

🎯 Goal Progress:
- User Growth: ${dashboard.goals_progress.user_growth.progress.toFixed(1)}%
- Revenue Growth: ${dashboard.goals_progress.revenue_growth.progress.toFixed(1)}%
- Retention: ${dashboard.goals_progress.retention.progress.toFixed(1)}%
      `,
      detailed: dashboard
    };
  }

  async exportToCSV() {
    const data = this.generateDashboard();
    const csv = this.convertToCSV(data);
    
    const filename = `audityzer-growth-${new Date().toISOString().split('T')[0]}.csv`;
    await fs.writeFile(path.join(__dirname, filename), csv);
    
    return filename;
  }

  convertToCSV(data) {
    // Simple CSV conversion for key metrics
    const rows = [
      ['Metric', 'Value'],
      ['Total Users', data.users.total],
      ['New Users Today', data.users.new_today],
      ['Total Audits', data.overview.total_audits],
      ['Total Revenue', data.overview.total_revenue],
      ['User Growth Rate', data.users.growth_rate + '%'],
      ['Revenue Growth Rate', data.revenue.growth_rate + '%']
    ];

    return rows.map(row => row.join(',')).join('\n');
  }

  startTracking() {
    console.log('🚀 Starting growth tracking...');
    
    // Load existing data
    this.loadData();

    // Set up periodic data saves
    setInterval(() => {
      this.saveData();
    }, 60000); // Save every minute

    // Generate daily reports
    setInterval(() => {
      const report = this.generateReport();
      console.log(report.summary);
    }, 24 * 60 * 60 * 1000); // Daily
  }
}

module.exports = GrowthTracker;
