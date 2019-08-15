module.exports = {
  apps : [{
    name: 'GL_base',
    script: 'bot.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    autorestart: true,
    watch: true,
    ignore_watch : ["node_modules", "data", "logs", ".git"],
    max_memory_restart: '500M',
    log_file: 'logs/bot.log',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
