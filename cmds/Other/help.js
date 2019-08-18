const Discord = require('discord.js');

function help(message, client, prefix) {
    if (message.content.startsWith(prefix + 'help') || message.content.startsWith(prefix + 'commands') || message.content.startsWith(`<@!${client.user.id}> help`) || message.content.startsWith(`<@${client.user.id}> help`) || message.content.startsWith(`<@!${client.user.id}> commands`) || message.content.startsWith(`<@${client.user.id}> commands`)) {
        let embed = new Discord.RichEmbed()
        
        embed.setTitle('You feel lost? Don\'t worry :wink:\n\nList of commands:')
            .setColor("#9C01C4")
        if (message.guild.id == '562602234265731080') embed.addField("**__Kingdom of Corona: ☀__**", `\`${prefix}screenshot\` : Take a screenshot from the movie or the series\nSends lanterns! Use this emote: <:Lantern:570822664789426186> and see how much lanterns sent with \`${prefix}lanterns\``);
        embed.addField("**°o° Disney:**", `\`${prefix}quote\` : Send a random quote from your movie\n\`${prefix}picture\`: Send a random picture (or GIF) from your movie`, true)
            .addField("Util:", `\`${prefix}wolfram\` : What would you like to know about ?\nSupporter only: \`${prefix}full-wolfram\` : What would you like to know about ? (Get full answer)\nSupporter only: \`${prefix}setgame\` : Sets a "Playing ..." status\nSupporter only: \`${prefix}setwatch\` : same as setgame but is "Watching ..."\nSupporter only: \`${prefix}setlisten\` : Same as setgame but is "Listening to ..."\n **NEW** \`${prefix}googleimage\` : Input your search and he will returns an image`, true)
            .addField("Fun:", `\`${prefix}8ball\` : Ask a question and he will answer.\nSupporter only: \`${prefix}say\` : Makes the bot talking !`, true)
            .addField("If you have any problems:", `\`${prefix}bug\`: Report any bug to devs\n\`${prefix}suggest\`: Suggest an improvement`, true)
            .setFooter(`You can type ${prefix}about for credits!`, `${client.user.avatarURL}`)
        message.channel.send(embed)
    }
}

module.exports = help;