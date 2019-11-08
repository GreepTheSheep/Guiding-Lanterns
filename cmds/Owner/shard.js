const Discord = require('discord.js')

function shardcommands(message, client, prefix){
    if (message.author.id === '330030648456642562'  || message.author.id === "460348027463401472"){
        if(message.content.startsWith(prefix + 'shardinfo')){
            let embed = new Discord.RichEmbed
            embed.setTitle(`You are on shard ${client.shard.id}/${client.shard.count}`)

            message.channel.send(embed)
        }
    }
}

module.exports = shardcommands