const Discord = require('discord.js');

function help(message, client, prefix) {
    if (message.content.startsWith(prefix + 'help') || message.content.startsWith(prefix + 'commands')) {
        let embed = new Discord.RichEmbed()
            embed.setTitle('You feel lost? Don\'t worry :wink:')
                .setColor("#9C01C4")
                .addField("Commands:", `\`${prefix}quote\` : Send a random quote from Tangled (and the series also)\n\`${prefix}lanterns\` : see how much lanterns are thown (launch your lantern using this emoji : <:Lantern:570822664789426186>)\n\`${prefix}screenshot\` : Take a screenshot from the movie or from the series`, true)
                .addField("If you have any problems :", `\`${prefix}bug\`: Report any bug to devs\nor\n\`${prefix}suggest\`: Suggest an improvement`, true)
                .setFooter(`You can type ${prefix}about for credits!`, `${client.user.avatarURL}`)
            message.channel.send(embed)
    }
}

module.exports = help;