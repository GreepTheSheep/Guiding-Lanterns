const Discord = require('discord.js');
const fs = require('fs');
const dbfile = './data/support_db.json'
const Enmap = require("enmap");
const support_db = new Enmap({name: "support"})

function SupportCheck (message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, config) {
    const db = JSON.parse(fs.readFileSync(dbfile, "utf8"))

    let donorsonly = new Discord.RichEmbed()
    donorsonly.setColor("#D30051")
    .addField("Sorry :shrug:", `This command is reserved for donors only\n\n[You can contribute to the financing of the project by clicking here](https://donatebot.io/checkout/570024448371982373?buyer=${message.author.id})`)

    const donor = support_db.get(message.author.id)


    if (message.channel.type !== 'dm'){

    const say = require('../cmds/Fun/say.js');
    say(message, client, prefix, donor, donorsonly);

    }
    
    
    if (message.content.startsWith(prefix + 'adddonation')) {
        if (message.author.id == config.owner) {
            let args = message.content.split(" ");
            args.shift();
            let mention = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))

            if(!mention) return message.react('❌')
            support_db.set(mention.user.id, mention.user.tag)
            message.channel.send(`:+1:`);
        } else return;
    }
}

module.exports = SupportCheck