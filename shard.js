const Discord = require("discord.js")
const config = require('./data/config.json')

// ------------- Shard Management ------------------

const shard = new Discord.ShardingManager("./bot.js", {
    autoSpawn: true,
    token: config.token,
    totalShards: "auto", // "auto" or number
})

console.log('Shard Manager started');
shard.spawn(2)

shard.on('launch', (shard) => {
    console.log(`[SHARD] Shard ID #${shard.id} launched` )
})
