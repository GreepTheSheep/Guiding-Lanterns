const config = require('./data/config.json')
const { ShardingManager } = require('discord.js');
const shard = new ShardingManager('./bot.js',{
  token : config.token
});

shard.spawn().then(function(){
  if (shard.totalShards == 'auto') console.log('[SHARD] Number of shards set to auto')
  else console.log(`[SHARD] ${shard.totalShards} total shards will start...`)
})

shard.on('launch', shard => console.log(`[SHARD] Shard ${shard.id} started`));

