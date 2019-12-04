const Discord = require("discord.js");

function suggest(message, client, prefix, lang) {

    if (message.content.startsWith(prefix + 'suggest')) {

        const args = message.content.split(" ").slice(1);
        if (args.length < 1) {
            return message.reply(`Usage: \`${prefix}suggest <your suggestion>\``)
        }

        var args2 = args.join(' ');

        const botsuggestchannel = client.guilds.get('570024448371982373').channels.get('579675497970270240')
            
        let embed = new Discord.RichEmbed;
            embed.setColor('#14D0A6')
            .setAuthor("A suggestion has been posted!", message.author.displayAvatarURL)
            .setTitle(`Suggest by ${message.author.tag}`)
            .setDescription('\`\`\`' + args2 + '\`\`\`')
            .setFooter(`ID: ${message.author.id}`)
            .setTimestamp()
            
        botsuggestchannel.send(embed).then(m=>{
        message.reply(lang.suggest_ok + "\n> https://discord.gg/Nzherng")
        logchannel.send(`Suggest: ${m.url}\nGuild ID: ${message.guild.id}\nAuthor ID: ${message.author.id}`)
        })
        .catch(err=>{
            message.reply(lang.error);
            console.log(err)
        })
    }
}

module.exports = suggest;