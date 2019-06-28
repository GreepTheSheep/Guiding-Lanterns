const Discord = require('discord.js');

function help(message, client, prefix) {
    if (message.content.startsWith(prefix + 'help') || message.content.startsWith(prefix + 'commands') || message.content.startsWith(`<@!${client.user.id}> help`) || message.content.startsWith(`<@${client.user.id}> help`) || message.content.startsWith(`<@!${client.user.id}> commands`) || message.content.startsWith(`<@${client.user.id}> commands`)) {
        let embed = new Discord.RichEmbed()
        embed.setTitle('You feel lost? Don\'t worry :wink:')
            .setColor("#9C01C4")
            .addField("Commands:", `\`${prefix}quote\` : Send a random quote from Tangled (and the series also)\n\`${prefix}screenshot\` : Take a screenshot from the movie or from the series\n\`${prefix}wolfram\` : What would you like to know about ?\n **NEW** \`${prefix}8ball\` : Ask a question and he will answer.`, true)
            .addField("Commands for supporters:", `\`${prefix}say\` : Makes the bot talking ! \n\`${prefix}setgame\` : Sets a "Playing ..." status\n\`${prefix}setwatch\` : same as setgame but is "Watching ..."\n\`${prefix}setlisten\` : Same as setgame but is "Listening to ..."\n\`${prefix}full-wolfram\` : What would you like to know about ? (Get full answer)`, true)
            .addField("If you have any problems :", `\`${prefix}bug\`: Report any bug to devs\n\`${prefix}suggest\`: Suggest an improvement`, true)
            .setFooter(`You can type ${prefix}about for credits!`, `${client.user.avatarURL}`)
        message.channel.send(embed)
    }
}

module.exports = help;