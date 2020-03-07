module.exports = {
  apps : [{
    name: 'GL',
    script: 'shard.js',
    args: '-n',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    autorestart: true,
    watch: true,
    ignore_watch : ["node_modules", "data", "logs", ".git"],
    max_memory_restart: '500M',
    log_file: 'logs/bot_nightly.log',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
