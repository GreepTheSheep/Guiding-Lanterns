try{
const Discord = require("discord.js")
const config = require('./data/config.json')
// ------------- Shard Management ------------------
const shard = new Discord.ShardingManager("./bot.js", {
    autoSpawn: true,
    token: config.token,
    totalShards: "auto", // "auto" or number
})
  
async function launch (shard){
  shard.spawn().catch(e=>console.error(e))

  await shard.on('launch', (shard) => {
    console.log(`⬇ [SHARD] Shard #${shard.id} ⬇` )
  })
}

launch(shard)


}catch(e){
  console.log(e)
}