const Discord = require("discord.js");

function status(message, client, prefix) {
    let donorsonly = new Discord.RichEmbed()
    donorsonly.setColor("#D30051")
    .addField("Sorry :shrug:", `This command is reserved for donors only\n\n[You can contribute to the financing of the project by clicking here](https://patreon.com/KingdomCoronaBot)`)
    .setFooter(`If you have already donated but you don't have the role, type " !bug Donated but haven't the KEY "`, `${client.user.avatarURL}`);

    const nothingsetmsg = `You put nothing? Okay, I set nothing ¯\\_(ツ)_/¯`

    if (message.content.startsWith(prefix + 'setgame')) {
        if (!message.member.roles.find(r => r.name === "KEY (The Guiding Lanterns)")) return message.channel.send(donorsonly)
        let args = message.content.split(" ");
        args.shift();
        client.user.setActivity(args.join(" "));
        if (args.length < 1) message.channel.send(nothingsetmsg)
        else message.channel.send(`The status of the bot has been set to "Playing **${args.join(" ")}**" !`)
    }
    if (message.content.startsWith(prefix + 'setwatch')) {
        if (!message.member.roles.find(r => r.name === "KEY (The Guiding Lanterns)")) return message.channel.send(donorsonly)
        let args = message.content.split(" ");
        args.shift();
        client.user.setActivity(args.join(" "), { type: 'WATCHING' })
        if (args.length < 1) message.channel.send(nothingsetmsg)
        else message.channel.send(`The status of the bot has been set to "Watching **${args.join(" ")}**" !`)
    }
    if (message.content.startsWith(prefix + 'setlisten')) {
        if (!message.member.roles.find(r => r.name === "KEY (The Guiding Lanterns)")) return message.channel.send(donorsonly)
        let args = message.content.split(" ");
        args.shift();
        client.user.setActivity(args.join(" "), { type: 'LISTENING' })
        if (args.length < 1) message.channel.send(nothingsetmsg)
        else message.channel.send(`The status of the bot has been set to "Listening to **${args.join(" ")}**" !`)
    }
}

module.exports = status;