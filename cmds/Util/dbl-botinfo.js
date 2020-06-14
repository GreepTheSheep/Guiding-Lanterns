const Discord = require('discord.js');
const fs = require('fs')
const package = JSON.parse(fs.readFileSync('./package.json', "utf8"));
const os = require('os');
const shell = require('shelljs');
const translate = require('translate')
const configfile = "./data/config.json";
const config = JSON.parse(fs.readFileSync(configfile, "utf8"));
translate.engine = 'yandex'
translate.key = config.translate_key

async function dblBotInfo(message, client, prefix, dbl, cooldowns) {
    if (message.content.startsWith(prefix + 'botinfo')) {
        if (dbl == undefined || !dbl) return message.channel.send('Bot not registed on top.gg. It might be an error.')
        let args = message.content.split(" ")
        args.shift()
        if (args.length < 1) return message.channel.send('ID is missing! Usage \`'+prefix+'botinfo <ID of the bot>\`')

        //Implement cooldown
        if (!cooldowns.has(prefix + 'botinfo')) {
            cooldowns.set(prefix + 'botinfo', new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(prefix + 'botinfo');
        const cooldownAmount = 60000;

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

        const result = await dbl.getBot(args[1])
        const owner = await dbl.getUser(result.owners[0])
        let embed = new Discord.RichEmbed
            .setAuthor(`${result.username}#${result.discriminator}`, `https://cdn.discordapp.com/avatars/${result.id}/${result.avatar}.png`, `https://top.gg/bot/${result.id}`)
            .setColor('RANDOM')
            .setDescription(result.shortdesc)
            .addField('Prefix', '```'+result.prefix+'```', true)
            .addField('Library', result.lib, true)
            .addField('Stats:', `${result.server_count ? result.server_count+` servers \n${result.shard_count ? result.shard_count+' shards' : 'No shards info'}`: 'No stats found'}`, true)
            .addField('Owner:', owner.username+'#'+owner.discriminator+`\nID: ${result.owners[0]}`, true)
            .addField('Verified bot:', result.certifiedBot?'Yes':'No', true)
            .addField('Links', `- [top.gg bot page](https://top.gg/bot/${result.id})\n- ${result.website == "" ? 'No website': `[Website](${result.website})`}\n- ${result.support == ""?'No support server': `[Support server](https://discord.gg/${result.support})`}\n- ${result.github == "" ? 'No github repo': `[Github repo](${result.github})`}`, true)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${result.id}/${result.avatar}.png`)
            .setFooter(`ID: ${result.id} - Added on top.gg on`)
            .setTimestamp(result.date)
        message.channel.send(embed)
        
    }
}

module.exports = dblBotInfo;
