const config = require('./data/config.json')

const { ShardingManager } = require('discord.js');
const shard = new ShardingManager('./bot.js', {
  token: config.token,
  autoSpawn: true
});

shard.spawn(2);

shard.on('launch', shard => console.log(`[SHARD] Shard ${shard.id}/${shard.totalShards}`));

