const Discord = require('discord.js')

function geturlofattachment(message, client, prefix) {
    if (message.content.startsWith(prefix + 'geturl')) {
        if (message.attachments.size > 0) {
            let attachurl = message.attachments.array()[0].url
            var isimage = false
            if (message.attachments.array()[0].width > 0 && message.attachments.array()[0].height > 0) isimage = true
            let embed = new Discord.RichEmbed
            embed.setColor('RANDOM')
                .setTitle(`${prefix}geturl : Gets URL of a file`)
                .setTitle('Here is the URL of your file:')
                .setDescription(`${attachurl}`)
                if (isimage == true) embed.setThumbnail(attachurl)
            message.channel.send(embed)
        } else  {
            let embed1 = new Discord.RichEmbed
            embed1.setColor('RANDOM')
            .setTitle(`${prefix}geturl : Gets URL of a file`)
            .setDescription(`Usage: Send your file with the command \`${prefix}geturl\` in the text.`)
            .addField('__Size limit:__', '**Free users: 8MB**\nNitro users: 50MB\n\nNitro server boost (for all users):\nLevel 2: 50MB\nLevel 3: 100MB')
        message.channel.send(embed1)
        }
    }
}

module.exports = geturlofattachment