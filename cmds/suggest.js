const Discord = require("discord.js");

function suggest(message, client, prefix) {

    if (message.content.startsWith(prefix + 'suggest')) {
        if (message.channel.type === 'dm') return;

        const args = message.content.split(" ").slice(1);

        if (args.length < 2) {
            return message.reply("Usage: `!suggest <bot ; server> <your suggestion>`")
        }

        if (args[0] == 'bot' || args[0] == 'server') {

        var args2 = args.slice(1).join(' ');

        const botsuggestchannel = client.guilds.get('570024448371982373').channels.get('579675497970270240')
        const srvsuggestchannel = client.guilds.get('562602234265731080').channels.get('582532588506447873')

        if (args[0] == 'bot'){
        botsuggestchannel.send('', {
            embed: {
                color: 654456,
                author: {
                    name: "A suggestion has been posted!",
                    icon_url: message.author.avatarURL,
                },
                title: "Suggest",

                description: `__Suggest:__
**${args2}**

         __Sent by__
**${message.author.tag}**`,

            }
        })}

    if (args[0] == 'server'){
        srvsuggestchannel.send('', {
            embed: {
                color: 654456,
                author: {
                    name: "A server suggestion has been posted!",
                    icon_url: message.author.avatarURL,
                },
                title: "Server Suggest",

                description: `__Suggest:__
**${args2}**

        __Sent by__
**${message.author.tag}**`,

            }
        })
    }
        message.delete()

        message.channel.send('Your suggestion has been posted! <:heureuse:570820764799074335>')

    } else return message.reply("Usage: `!suggest [bot, server] [your suggestion]`");
} 
}

module.exports = suggest;