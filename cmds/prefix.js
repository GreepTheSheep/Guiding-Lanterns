const Discord = require("discord.js");

function setPrefix(message, client, prefix){
    if !message.content.startsWith(prefix + "prefix") return;

    message.client.guildPrefix.set(message.guild.id,args[0]);
    message.channel.send(`Prefix ${args[0]} set`);
}
module.exports = setPrefix;
