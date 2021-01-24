const Discord = require('discord.js');
const Enmap = require('enmap')
const counter = new Enmap({name: 'r-tangled_lantern'})

module.exports = function(message, client, prefix, getlogchannel, cooldowns) {

    if (message.guild.id == '562602234265731080') {
        if (message.content.includes('<:Lantern:570822664789426186>')) {
            counter.set('count', counter.get('count') + 1 )
        }
    }

    if (message.content.startsWith(prefix + 'lanterns')) {
        if (message.guild.id == '562602234265731080'){ 
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


            if (message.member.roles.cache.find(r => r.name === "KEY (The Guiding Lanterns)")) { //Override cooldown
                timestamps.delete(message.guild.id);
            }

            let embed = new Discord.MessageEmbed()
            embed.setColor("#E35D05")
                .setTitle('Lantern counter')
                .setDescription(`**__${counter.get('count')}__ lanterns thrown**`)
                .setThumbnail(`https://i.pinimg.com/originals/ed/d8/1f/edd81f0f8cd57690777f917a514ae840.gif`)
                .setFooter(`Launch a lantern with :Lantern: emoji`, `${client.user.avatarURL}`)
            message.channel.send(embed)
        } else message.channel.send('Sorry, this command is only for the r/Tangled community server. You can join here: discord.gg/tangled')
    }

    if (message.content.startsWith(prefix + 'resetlanterncount')) {
        if (message.author.id == "330030648456642562") {
            if (message.guild.id == '562602234265731080') counter.set('count', 0 )
            else counter.set(message.guild.id, 0 )
            console.log('Lantern counter reset !')
            getlogchannel.send('Lantern counter reset !')

        } else return;
    }
}