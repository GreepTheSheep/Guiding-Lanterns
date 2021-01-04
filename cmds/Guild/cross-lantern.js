const Discord = require('discord.js')

module.exports = async function(message, client, prefix, getlogchannel, cooldowns){
    if (message.guild.id == '562602234265731080') { // r/tangled
        if (message.channel.id == '663693329187471370'){
            if (!message.content.includes('<:Lantern:570822664789426186>')) {
                return message.delete()
            }
            // send to disneyFR
            var webhooks = await client.guilds.cache.find(g=> g.id == "600355162279641108").channels.cache.find(c => c.id == "717018224784310342").fetchWebhooks()
            //var webhooks = await client.shard.broadcastEval(`await this.guilds.cache.find(g=> g.id == "600355162279641108").channels.cache.find(c => c.id == "717018224784310342").fetchWebhooks()`)
            var webhook = webhooks.first()
            webhook.send('<:Lanterne:717500316987162655>', {
                username: message.author.username,
                avatarURL: message.author.displayAvatarURL(),
            })
        }
    } else if (message.guild.id == '600355162279641108') { // disneyFR
        if (message.channel.id == '717018224784310342'){
            if (!message.content.includes('<:Lanterne:717500316987162655>')) {
                return message.delete()
            }
            // send to r/tangled
            var webhooks = await client.guilds.cache.find(g=> g.id == "562602234265731080").channels.cache.find(c => c.id == "663693329187471370").fetchWebhooks()
            // var webhooks = await client.shard.broadcastEval(`await this.guilds.find(g=> g.id == "562602234265731080").channels.find(c => c.id == "663693329187471370").fetchWebhooks()`)
            var webhook = webhooks.first()
            webhook.send('<:Lantern:570822664789426186>', {
                username: message.author.username,
                avatarURL: message.author.displayAvatarURL(),
            })
        }
    }
}