const Discord = require('discord.js')

async function serverping(message, client, prefix){
    if(message.content.startsWith(prefix + "ping")) {
        const m = await message.channel.send("Pong?");
        let embed = new Discord.RichEmbed
        embed.setTitle(`Pong!`)
            .setDescription(`❓: ${m.createdTimestamp - message.createdTimestamp}ms\n\n💓: ${Math.round(client.ping)}ms`)
        m.edit(embed);
      }
}

module.exports = serverping