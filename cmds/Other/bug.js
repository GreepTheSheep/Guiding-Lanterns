const Discord = require("discord.js");

function bug(message, client, prefix, lang) {

    if (message.content.startsWith(prefix + 'bug')) {

        const args = message.content.split(" ").slice(1);

        if (args.length < 1) {
            return message.reply(`Usage: \`${prefix}bug <your bug details>\``)
        }

        var args2 = args.join(' ');
        const reportchannel = client.guilds.get('570024448371982373').channels.get('579675887545614341')

        let embed = new Discord.RichEmbed;
            embed.setColor('#A11158')
            .setAuthor("A bug report has been posted !", message.author.displayAvatarURL)
            .setTitle(`Bug Report by ${message.author.tag}`)
            .setDescription('\`\`\`' + args2 + '\`\`\`')
            .setTimestamp()

        reportchannel.send(embed).then(m=>
        message.reply(lang.bug_ok + "\n> https://discord.gg/Nzherng"))
        .catch(err=>{
            message.reply(lang.error);
            console.log(err)
        })
    }
}

module.exports = bug;