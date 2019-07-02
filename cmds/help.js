const Discord = require('discord.js');

function help(message, client, prefix) {
    if (message.content.startsWith(prefix + 'help') || message.content.startsWith(prefix + 'commands') || message.content.startsWith(`<@!${client.user.id}> help`) || message.content.startsWith(`<@${client.user.id}> help`) || message.content.startsWith(`<@!${client.user.id}> commands`) || message.content.startsWith(`<@${client.user.id}> commands`)) {
        let embed = new Discord.RichEmbed()
        embed.setTitle('You feel lost? Don\'t worry :wink:\n\nList of commands:')
            .setColor("#9C01C4")
            .addField("Tangled commands <:heureuse:570820764799074335>", `\`${prefix}quote\` : Send a random quote from Tangled (and the series also)\n\`${prefix}screenshot\` : Take a screenshot from the movie or from the series`, true)
            .addField("Util:", `\`${prefix}wolfram\` : What would you like to know about ?\nSupporter only: \`${prefix}full-wolfram\` : What would you like to know about ? (Get full answer)\nSupporter only: \`${prefix}setgame\` : Sets a "Playing ..." status\nSupporter only: \`${prefix}setwatch\` : same as setgame but is "Watching ..."\nSupporter only: \`${prefix}setlisten\` : Same as setgame but is "Listening to ..."`, true)
            .addField("Fun:", `**NEW** \`${prefix}8ball\` : Ask a question and he will answer.\nSupporter only: \`${prefix}say\` : Makes the bot talking !`, true)
            .addField("If you have any problems:", `\`${prefix}bug\`: Report any bug to devs\n\`${prefix}suggest\`: Suggest an improvement`, true)
            .setFooter(`You can type ${prefix}about for credits!`, `${client.user.avatarURL}`)
        message.channel.send(embed)
    }
}

module.exports = help;