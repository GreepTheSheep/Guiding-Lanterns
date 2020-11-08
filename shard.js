const config = require('./data/config.json')
const { ShardingManager } = require('discord.js');
const execArgs = process.argv.slice(2);
const shard = new ShardingManager('./bot.js',{
  token : config.token,
  shardArgs: ['-s', execArgs[0]],
  autoSpawn: true
});

shard.spawn().catch(e=>console.error(e));

shard.on('shardCreate', shard => console.log(`[SHARD] Shard ${shard.id} started`));

shard.on('message', (shard, message) => {
  if (message._eval){
    console.log(`Shard #${shard.id} : ${message._eval} : ${message._result}`);
    console.log(message._result)
  } else {
    console.log(message)
  }
});