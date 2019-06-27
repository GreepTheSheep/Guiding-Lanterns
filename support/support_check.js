const Discord = require('discord.js');
const fs = require('fs');
const dbfile = './support/support_db.json'

function SupportCheck (message, client, prefix) {
    const db = JSON.parse(fs.readFileSync(dbfile, "utf8"))

    let donorsonly = new Discord.RichEmbed()
    donorsonly.setColor("#D30051")
    .addField("Sorry :shrug:", `This command is reserved for donors only\n\n[You can contribute to the financing of the project by clicking here](https://donatebot.io/checkout/570024448371982373?buyer=${message.author.id})`)
    .setFooter(`If you have already donated but you don't have the role, type " !bug Donated but can't do commands "`, `${client.user.avatarURL}`)

    const donor = db[message.author.id]

    const status = require('../cmds/status.js');
    status(message, client, prefix, donor, donorsonly);

    const say = require('../cmds/say.js');
    say(message, client, prefix, donor, donorsonly);

    const wolfram = require('../cmds/wolfram.js');
    wolfram(message, client, prefix, donor, donorsonly);

    if (message.content.startsWith(prefix + 'adddonation')) {
        if (message.author.id == "330030648456642562") {
            let args = message.content.split(" ");
            args.shift();
            let mention = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!mention) return message.channel.send("This user does not exist !");
            db[mention.id] = {
                "name" : mention.user.tag
            };
            fs.writeFile(dbfile, JSON.stringify(db), (x) => {
                if (x) console.error(x)
              });
            message.channel.send(`:+1:`);
        } else return;
    }
}

module.exports = SupportCheck