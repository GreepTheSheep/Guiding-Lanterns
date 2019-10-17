const Discord = require("discord.js")
const config = require('./data/config.json')
const logchannel = '589337734754336781' //Set a channel for logging
const getlogchannel = () => client.channels.get(logchannel)

// ------------- Shard Management ------------------

const shard = new Discord.ShardingManager("./bot.js", {
    autoSpawn: true,
    token: config.token,
    totalShards: "auto", // "auto" or number
})

console.log('Shard Manager started');
getlogchannel().send('Shard Manager started')
shard.spawn(2)

shard.on('launch', (shard) => {
    console.log(`[SHARD] Shard ID #${shard.id}/${shard.totalShards} launched` )
    getlogchannel().send(`Shard ID #${shard.id}/${shard.totalShards} launched` )
})
