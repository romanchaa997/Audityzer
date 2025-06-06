module.exports = {
  apps: [
    {
      name: 'audityzer-api',
      script: 'server.cjs',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
      watch: false,
      ignore_watch: ['node_modules', 'logs', 'dist'],
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s'
    },
    {
      name: 'audityzer-monitoring',
      script: 'monitoring/setup-monitoring.sh',
      instances: 1,
      exec_mode: 'fork',
      autorestart: false,
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'audityzer-marketing',
      script: 'marketing/campaigns/launch-campaign.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production'
      },
      cron_restart: '0 9 * * 1', // Restart every Monday at 9 AM
      watch: false
    }
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: ['audityzer.com'],
      ref: 'origin/main',
      repo: 'https://github.com/romanchaa997/Audityzer.git',
      path: '/var/www/audityzer',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    },
    staging: {
      user: 'ubuntu',
      host: ['staging.audityzer.com'],
      ref: 'origin/develop',
      repo: 'https://github.com/romanchaa997/Audityzer.git',
      path: '/var/www/audityzer-staging',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env staging',
      env: {
        NODE_ENV: 'staging',
        PORT: 3001
      }
    }
  }
};
