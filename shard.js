const Discord = require("discord.js")
const config = require('./data/config.json')
const bot = new Discord.Client({
    autoReconnect: true,
    disableEveryone: true
})
// ------------- Shard Management ------------------

const shard = new Discord.ShardingManager("./bot.js", {
    autoSpawn: true,
    token: config.token,
    totalShards: "auto", // "auto" or number
})

shard.spawn()

shard.on('launch', (shard) => {
    console.log(`⬇ [SHARD] Shard ID #${shard.id} ⬇` )
})