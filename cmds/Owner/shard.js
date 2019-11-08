const Discord = require('discord.js')
const shardManager = new Discord.ShardingManager('../../bot.js')
const shard = new Discord.Shard(shardManager, client.shard.id)

async function shardcommands(message, client, prefix){
    if (message.author.id === '330030648456642562'  || message.author.id === "460348027463401472"){
        if(message.content.startsWith(prefix + 'shardinfo')){
            let embed = new Discord.RichEmbed
            embed.setTitle(`You are on shard ${client.shard.id}/${client.shard.count}`)
            .setColor('RANDOM')
            for(var everyShard in shard){
                const guildsPerShard = await shard.eval(client.guilds.count)
                embed.addField(`Shard ${shard.id}`, `Guilds: ${guildsPerShard}`)
            }


            message.channel.send(embed)
        }
    }
}

module.exports = shardcommands