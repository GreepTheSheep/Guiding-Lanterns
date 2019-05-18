const Discord = require("discord.js");

function say(message, client, prefix) {

    if (message.content.startsWith(prefix + 'say')) {
        if (message.member.roles.find(r => r.name === "Royal Guards ⚔️") || message.member.roles.find(r => r.name === "Princess of Corona 👑") || message.author.id == 330030648456642562) {
            let args = message.content.split(" ");
            args.shift();
            if (args.length < 1) {
                message.channel.send(`Nothing...`)
            } else {
                message.delete();
                message.channel.send(`${args.join(" ")}`)
            }
        }
        else
        {
            message.channel.send("**__Only administrators and moderators can use this command__**")
        }
    }
}

module.exports = say;