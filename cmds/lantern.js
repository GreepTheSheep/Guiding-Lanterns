const Discord = require('discord.js');
const fs = require('fs');
const countfile = "./counter/lanterns.json";
const lancount = JSON.parse(fs.readFileSync(countfile, "utf8"));


function lantern(message, client, prefix, getlogchannel) {

    if (message.content == '<:Lantern:570822664789426186>') {
        lancount.count++

        let countwrite = { "count": `${lancount.count}` };
        let data = JSON.stringify(countwrite);
        fs.writeFileSync('lanterns.json', data);
    };

    if (message.content.startsWith(prefix + 'lanterns')) {
        let embed = new Discord.RichEmbed()
        embed.setColor("#E35D05")
            .addField("Lantern counter", `**__${lancount.count}__ lanterns thrown**`)
            .setThumbnail(`https://i.pinimg.com/originals/ed/d8/1f/edd81f0f8cd57690777f917a514ae840.gif`)
            .setFooter(`Launch a lantern with :Lantern: emoji`, `${client.user.avatarURL}`)
        message.channel.send({ embed: embed })
    }

    if (message.content.startsWith(prefix + 'resetlanterncount')) {
        if (message.author.id == "330030648456642562") {
            let countwrite = { "count": `0` };
            let data = JSON.stringify(countwrite);
            fs.writeFileSync('lanterns.json', data);
            lancount.count = 0;
            console.log('Lantern counter reset !')
            getlogchannel.send('Lantern counter reset !')

        } else return;
    }
}

module.exports = lantern;