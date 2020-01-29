module.exports = {
  apps : [{
    name: 'GL',
    script: 'shard.js',

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
  "deploy" : {
     // "production" is the environment name
     "production" : {
       "user" : "root",
       "host" : ["192.168.1.59"],
       "ref"  : "origin/master",
       "repo" : "git@github.com:Guiding-Lanterns/Guiding-Lanterns.git",
       "post-deploy" : "npm install; pm2 restart GL"
      },
   }
};
