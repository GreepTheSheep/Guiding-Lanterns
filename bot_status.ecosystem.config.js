module.exports = {
  apps : [{
    name: 'GLstat',
    script: 'bot_status.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances  : 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    log_file: 'logs/bot_status.log',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
