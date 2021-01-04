const Discord = require('discord.js')

module.exports = async function(message, client, prefix){
    if(message.content.startsWith(prefix + "ping")) {
        const m = await message.channel.send("Pong?");
        let embed = new Discord.MessageEmbed
        embed.setTitle(`Pong!`)
            .setDescription(`${m.createdTimestamp - message.createdTimestamp}ms`)
        m.edit(embed);
      }
}