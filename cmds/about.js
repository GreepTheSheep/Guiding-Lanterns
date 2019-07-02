const Discord = require('discord.js');
const package = require('../package.json');
const os = require('os');

function about(message, client, prefix) {
    var clientUpTime = (Math.round(client.uptime / (1000 * 60 * 60 * 24))) + " days, " + (Math.round(client.uptime / (1000 * 60 * 60)) % 24) + " hours, " + (Math.round(client.uptime / (1000 * 60)) % 60) + " minutes, and " + (Math.round(client.uptime / 1000) % 60) + " seconds";
    if (message.content.startsWith(prefix + 'about')) {
        let embed = new Discord.RichEmbed()
        embed.setColor("#9C01C4")
            .addField(client.user.tag, `Version ${package.version}\nLicense: ${package.license}`)
            .addField("Cast:", `- **Greep#3022** : Original idea\n- **Ajam#3536** : Contributor`, true)
            .addField("Technical information:", `Libary used: [Discord.js](https://discord.js.org)\nDelay between bot and Discord server: ${Math.round(client.ping)} ms\nType of operating System: ${os.type}: ${os.release}\nRAM used: ${Math.round(os.freemem() / 1024 / 1000)}/${Math.round(os.totalmem() / 1024 / 1000)} MB (${client.user.username} uses ${Math.round(process.memoryUsage().rss / 1024 / 1000)} MB)\nBot uptime: ${clientUpTime}`)
            .addField("Useful links:", `[**Kingdom of Corona ☀**](https://discord.gg/BunQeKh)\n[Bot source code on GitHub](https://github.com/GreepTheSheep/Guiding-Lanterns)\n[Developement server](https://discord.gg/5QCQpr9)\n[Support the bot](https://donatebot.io/checkout/570024448371982373?buyer=${message.author.id})`, true)
            .setThumbnail(`${client.user.avatarURL}`)
            .setFooter(`${client.user.username}`, `${client.user.avatarURL}`)
        message.channel.send(embed)
    }
}

module.exports = about;