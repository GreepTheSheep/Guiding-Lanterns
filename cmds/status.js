const Discord = require("discord.js");

function status(message, client, prefix, donor, donoronlymsg) {

    const nothingsetmsg = `You put nothing? Okay, I set nothing ¯\\_(ツ)_/¯`

    if (message.content.startsWith(prefix + 'setgame')) {
        if (!donor) return message.channel.send(donoronlymsg)
        let args = message.content.split(" ");
        args.shift();
        client.user.setActivity(args.join(" "));
        if (args.length < 1) message.channel.send(nothingsetmsg)
        else message.channel.send(`The status of the bot has been set to "Playing **${args.join(" ")}**" !`)
    }
    if (message.content.startsWith(prefix + 'setwatch')) {
        if (!donor) return message.channel.send(donoronlymsg)
        let args = message.content.split(" ");
        args.shift();
        client.user.setActivity(args.join(" "), { type: 'WATCHING' })
        if (args.length < 1) message.channel.send(nothingsetmsg)
        else message.channel.send(`The status of the bot has been set to "Watching **${args.join(" ")}**" !`)
    }
    if (message.content.startsWith(prefix + 'setlisten')) {
        if (!donor) return message.channel.send(donoronlymsg)
        let args = message.content.split(" ");
        args.shift();
        client.user.setActivity(args.join(" "), { type: 'LISTENING' })
        if (args.length < 1) message.channel.send(nothingsetmsg)
        else message.channel.send(`The status of the bot has been set to "Listening to **${args.join(" ")}**" !`)
    }
}

module.exports = status;