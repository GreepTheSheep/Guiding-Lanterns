const Discord = require('discord.js');


function about(message, client, prefix) {
    const UpTime =  (Math.round(client.uptime / (1000 * 60 * 60))) + " hours, " + (Math.round(client.uptime / (1000 * 60)) % 60) + " minutes, and " + (Math.round(client.uptime / 1000) % 60) + " seconds";
    if (message.content.startsWith(prefix + 'about')) {
        let embed = new Discord.RichEmbed()
            embed.setColor("#9C01C4")
                .addField("About the bot:", `**${client.user.tag}**\nCreated by Greep#3022\nFor the Kingdom of Corona`)
                .addField("Technical information", `Libary used: Discord.js\nDelay between bot and Discord server: ${Math.round(client.ping)} ms\nRAM used: ${Math.round(process.memoryUsage().rss / 1024 / 1000)} MB\nUptime: ${UpTime}`)
                .setThumbnail(`${client.user.avatarURL}`)
                .setFooter(`${client.user.username} is created by Greep#3022`, `${client.user.avatarURL}`)
            message.channel.send(embed)
            message.channel.send("If you are really interested in bot development, you can see the bot source code on GitHub: https://github.com/GreepTheSheep/CoronaLanterns \nYou can also join the bot development server: https://discord.gg/5QCQpr9")
    }
}

module.exports = about;