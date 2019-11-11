const Discord = require('discord.js')


async function shardcommands(message, client, prefix){
    if (message.author.id === '330030648456642562'  || message.author.id === "460348027463401472"){
        if(message.content.startsWith(prefix + 'shardinfo')){
            var shardManager 
            if (client.user.id == '577477992608038912') return message.reply('No shards defined')
            if (client.user.id == '569624646475972608') shardManager = new Discord.ShardingManager('./shard.js')
            if(!shardManager) return message.reply('shardManager is not set').then(m=>m.delete(7000))
            const shard = new Discord.Shard(shardManager, client.shard.id)
            let embed = new Discord.RichEmbed
            embed.setTitle(`You are on shard ${client.shard.id}/${client.shard.count - 1}`)
            .setColor('RANDOM')
            for (i = 0; i < client.shard.count; i++){
                const guildinshard = await client.shard.fetchClientValues('guilds.size')
                embed.addField(`Shard #${shard.id}`, `${guildinshard} servers`, true)
                var totalguilds = guildinshard.reduce((prev, val) => prev + val, 0)
            }
            embed.addField(`Total servers:`, `${totalguilds} servers`)


            message.channel.send(embed)
        }
    }
}

module.exports = shardcommands