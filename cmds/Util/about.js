const Discord = require('discord.js');
const fs = require('fs')
const package = JSON.parse(fs.readFileSync('./package.json', "utf8"));
const os = require('os');

function about(message, client, prefix, lang) {     
    if (message.content.startsWith(prefix + 'about')) {
        let embed = new Discord.RichEmbed()
        embed.setColor("#9C01C4")
            .addField(client.user.tag, lang.about_ver.split('${package.version}').join(package.version).split('${package.license}').join(package.license))
            .addField("Cast:", lang.about_cast, true)
            .addField(lang.about_tech, `${lang.about_libary} [Discord.js](https://discord.js.org)\n${lang.about_delay} ${Math.round(client.ping)} ms\n${lang.about_os} ${os.type}: ${os.release}\n${lang.about_ram} ${Math.round(os.freemem() / 1024 / 1000)}/${Math.round(os.totalmem() / 1024 / 1000)} MB [${(Math.round(os.freemem() / 1024 / 1000) * 100 / Math.round(os.totalmem() / 1024 / 1000)).toFixed(0)}%] (${client.user.username} : ${Math.round(process.memoryUsage().rss / 1024 / 1000)} MB [${(Math.round(process.memoryUsage().rss / 1024 / 1000) * 100 / Math.round(os.totalmem() / 1024 / 1000)).toFixed(0)}%])`)
            .addField(lang.about_links, `[**${lang.about_support}**](https://discord.gg/5QCQpr9)\n[${lang.about_github}](https://github.com/Guiding-Lanterns/Guiding-Lanterns)\n[Kingdom of Corona ☀](https://discord.gg/BunQeKh)\n[${lang.about_supportlink}](https://donatebot.io/checkout/570024448371982373?buyer=${message.author.id})`, true)
            .setThumbnail(client.user.avatarURL)
            .setFooter(client.user.username, client.user.displayAvatarURL)
        message.channel.send(embed)
    }
}

module.exports = about;
