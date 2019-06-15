const Discord = require("discord.js");

function say(message, client, prefix) {

    if (message.content.startsWith(prefix + 'say')) {
        let donorsonly = new Discord.RichEmbed()
        donorsonly.setColor("#D30051")
        .addField("Sorry :shrug:", `This command is reserved for donors only\n\n[You can contribute to the financing of the project by clicking here](https://patreon.com/KingdomCoronaBot)`)
        .setFooter(`If you have already donated but you don't have the role, type " !bug Donated but haven't the KEY "`, `${client.user.avatarURL}`)

        if (message.member.roles.find(r => r.name === "KEY (The Guiding Lanterns)") || message.author.id == 330030648456642562) {
            let args = message.content.split(" ");
            args.shift();
            if (args.length < 1) {
                message.delete();
                message.channel.send('__Input your message!__\nExample: `!say Hello everyone!`\n**WARNING!** You can not edit or delete your message, so be careful!');
            } else {
                message.delete();
                message.channel.send(`${args.join(" ")}`)
            }
        } else return message.channel.send(donorsonly);
    }
}

module.exports = say;