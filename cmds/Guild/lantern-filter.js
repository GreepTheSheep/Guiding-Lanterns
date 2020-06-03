const Discord = require('discord.js')

function lantern_filter(message, client, prefix, getlogchannel, cooldowns){
    if (message.guild.id == '562602234265731080') {
        if (message.channel.id == '663693329187471370'){
            if (!message.content.includes('<:Lantern:570822664789426186>')) {
                message.delete()
            }
        }
    } else if (message.guild.id == '600355162279641108') {
        if (message.channel.id == '717018224784310342'){
            if (!message.content.includes('<:Lanterne:717500316987162655>')) {
                message.delete()
            }
        }
    }
}

module.exports = lantern_filter