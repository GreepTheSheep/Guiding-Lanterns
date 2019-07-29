const Discord = require("discord.js");

function bug(message, client, prefix) {

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
        message.reply("**Thank you for your bug report!** I'll try to fix this as soon as possible!\n\n> *If you want to see if your bug has been fixed, visit the support server and make a request, we will of course answer you!*\n> https://discord.gg/Nzherng"))
        .catch(err=>{
            message.reply('Uhh... An error occured.\nPlease try again');
            console.log(err)
        })
    }
}

module.exports = bug;