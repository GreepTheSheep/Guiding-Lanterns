module.exports = {
  apps : [{
    name: 'GL',
    script: 'bot.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances  : 4,
    exec_mode  : "cluster",
    autorestart: true,
    watch: ["server", "client"],
    ignore_watch : ["node_modules", "data", "logs"],
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
