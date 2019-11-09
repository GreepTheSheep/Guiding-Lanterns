const { ShardingManager } = require('discord.js');
const shard = new ShardingManager('./bot.js');

shard.spawn(2)

shard.on('launch', shard => console.log(`[SHARD] Shard ${shard.id}/${shard.totalShards}`));

