const Discord = require('discord.js');
const fs = require('fs');
const countfile = "./data/lanterns.json";
const lancount = JSON.parse(fs.readFileSync(countfile, "utf8"));


function lantern(message, client, prefix, getlogchannel, cooldowns) {

    if (message.content.includes('<:Lantern:570822664789426186>')) {
        lancount.count++

        let countwrite = { "count": `${lancount.count}` };
        let data = JSON.stringify(countwrite);
        fs.writeFileSync(countfile, data);
    };

    if (message.content.startsWith(prefix + 'lanterns')) {
        //Implement cooldown
        if (!cooldowns.has(prefix + 'lanterns')) {
            cooldowns.set(prefix + 'lanterns', new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(prefix + 'lanterns');
        const cooldownAmount = 30000;

        if (timestamps.has(message.guild.id)) {
            const expirationTime = timestamps.get(message.guild.id) + cooldownAmount;

            if (now < expirationTime) {
                let totalSeconds = (expirationTime - now) / 1000;
                let days = Math.floor(totalSeconds / 86400);
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = totalSeconds % 60;
                return;
            }
        }

        timestamps.set(message.guild.id, now);
        setTimeout(() => timestamps.delete(message.guild.id), cooldownAmount);


        if (message.member.roles.find(r => r.name === "KEY (The Guiding Lanterns)")) { //Override cooldown
            timestamps.delete(message.guild.id);
        }
        // End of cooldown implement

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
            fs.writeFileSync(countfile, data);
            lancount.count = 0;
            console.log('Lantern counter reset !')
            getlogchannel.send('Lantern counter reset !')

        } else return;
    }
}

module.exports = lantern;