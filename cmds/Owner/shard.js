const Discord = require('discord.js')


async function shardcommands(message, client, prefix){
    if (message.author.id === '330030648456642562'  || message.author.id === "460348027463401472"){
        if(message.content.startsWith(prefix + 'shardinfo')){
            let embed = new Discord.RichEmbed
            embed.setTitle(`You are on shard ${client.shard.id}/${client.shard.count - 1}`)
            .setColor('RANDOM')
            
            for (i = 0; i < client.shard.count; i++){
                const guildinshard = await client.shard.fetchClientValues('guilds.size')
                //embed.addField(`Shard #${shard.id}`, `${guildinshard} servers`, true)
                var totalguilds = guildinshard.reduce((prev, val) => prev + val, 0)
            } 
            
            embed.addField(`Total servers:`, `${totalguilds} servers`)


            message.channel.send(embed)
        }
    }
}

module.exports = shardcommands