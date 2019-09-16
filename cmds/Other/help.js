const Discord = require('discord.js');

function help(message, client, prefix, lang) {
    if (message.content.startsWith(prefix + 'help') || message.content.startsWith(prefix + 'commands') || message.content.startsWith(`<@!${client.user.id}> help`) || message.content.startsWith(`<@${client.user.id}> help`) || message.content.startsWith(`<@!${client.user.id}> commands`) || message.content.startsWith(`<@${client.user.id}> commands`)) {
        let embed = new Discord.RichEmbed()
        
        embed.setTitle(lang.help_title)
            .setColor("#9C01C4")
        if (message.guild.id == '562602234265731080') embed.addField("**__Kingdom of Corona: ☀__**", lang.help_kingdomofcorona.split('${prefix}').join(prefix));
        embed.addField("**°o° Disney:**", lang.help_disney.split('${prefix}').join(prefix), true)
            .addField("Util:", lang.help_util.split('${prefix}').join(prefix), true)
            .addField("Fun:", lang.help_fun.split('${prefix}').join(prefix), true)
            .addField(lang.help_anyproblems, lang.help_problems2.split('${prefix}').join(prefix), true)
            .setFooter(lang.help_credits.split('${prefix}').join(prefix), `${client.user.avatarURL}`)
        message.channel.send(embed)
    }
}

module.exports = help;