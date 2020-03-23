const Discord = require('discord.js')
const Themeparks = require('themeparks')
Themeparks.Settings.Cache = __dirname + "/data/themeparks.sqlite";

function parkslist(){
    const Parks = {};
    for (const park in Themeparks.Parks) {
        Parks[park] = new Themeparks.Parks[park]();
    }
    const array = [];
    for (const park in Parks) {
        array.push(`- ${Parks[park].Name}: \`${park.toString()}\``);
    }
    return array
}

async function parktimes(message, client, prefix, cooldowns){
    if (message.content.startsWith(prefix + 'ridetime')){

         //Implement cooldown
    if (!cooldowns.has(prefix + 'ridetime')) {
        cooldowns.set(prefix + 'ridetime', new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(prefix + 'ridetime');
    const cooldownAmount = 60000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            let totalSeconds = (expirationTime - now) / 1000;
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            return message.react('⌚').then(message.delete(5000))
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    if (message.member.roles.find(r => r.name === "KEY (The Guiding Lanterns)")) { //Override cooldown
        timestamps.delete(message.author.id);
    }
    // End of cooldown implement

        let args = message.content.split(" ");
        args.shift();
        if (args.length < 1) return message.channel.send(`__Input your themepark!__\nExample: \`${prefix}ridetime WaltDisneyWorldMagicKingdom\`\nList of themeparks avialble with \`${prefix}ridetime list\``);

        let embed = new Discord.RichEmbed

        if (args[0] == 'list'){
            embed.setTitle('List of themeparks:')
            .setDescription(parkslist().join('\n'))
        } else {
            message.channel.send('Work in progress...')
        }
    }
}

module.exports = parktimes