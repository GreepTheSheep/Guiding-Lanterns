const Discord = require('discord.js')

function geturlofattachment(message, client, prefix, lang) {
    if (message.content.startsWith(prefix + 'geturl')) {
        if (message.attachments.size > 0) {
            let attachurl = message.attachments.array()[0].url
            var isimage = false
            if (message.attachments.array()[0].width > 0 && message.attachments.array()[0].height > 0) isimage = true
            let embed = new Discord.RichEmbed
            embed.setColor('RANDOM')
                .setTitle(`${prefix}geturl : ` + lang.geturl_title)
                .setTitle(lang.geturl_done)
                .setDescription(`${attachurl}`)
                if (isimage == true) embed.setThumbnail(attachurl)
            message.channel.send(embed)
        } else  {
            let embed1 = new Discord.RichEmbed
            embed1.setColor('RANDOM')
            .setTitle(`${prefix}geturl : ` + lang.geturl_title)
            .setDescription(lang.geturl_usage.split('${prefix}').join(prefix))
            .addField(`__${lang.geturl_limit1}__`, lang.geturl_limit2)
        message.channel.send(embed1)
        }
    }
}

module.exports = geturlofattachment