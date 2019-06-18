const Discord = require("discord.js");

function say(message, client, prefix, donor, donoronlymsg) {

    if (message.content.startsWith(prefix + 'say')) {
        if (!donor) return message.channel.send(donoronlymsg)

        let args = message.content.split(" ");
        args.shift();
        if (args.length < 1) {
            message.delete();
                message.channel.send('__Input your message!__\nExample: `!say Hello everyone!`\n**WARNING!** You can not edit or delete your message, so be careful!');
        } else {
            message.delete();
            message.channel.send(`${args.join(" ")}`)
        }
    }
}

module.exports = say;