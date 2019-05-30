const Discord = require("discord.js");

function bug(message, client, prefix) {

    if (message.content.startsWith(prefix + 'bug')) {

        const args = message.content.split(" ").slice(1);

        if (args.length < 1) {
            return message.reply("Please enter your bug details!")
        }

        var args2 = message.content.split(' ').slice(1).join(' ');

        const reportchannel = client.guilds.get('570024448371982373').channels.get('579675887545614341')
        reportchannel.send('', {
            embed: {
                color: 654456,
                author: {
                    name: "A bug report has been posted !",
                    icon_url: message.author.displayAvatarURL,
                },
                title: "BUG REPORT",

                description: `__Bug details :__
**${args2}**

         __Sent by__
**${message.author.tag}**`,

            }
        })
        message.delete()

        message.channel.send("Thank you! I'll try to fix this as soon as possible! <:heureuse:570820764799074335>")

    }
}

module.exports = bug;