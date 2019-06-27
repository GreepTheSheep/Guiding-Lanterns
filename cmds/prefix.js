const Discord = require("discord.js");

function setPrefix(message, client, prefix){
    if (message.content.startsWith(prefix + "prefix") || message.content.startsWith(`<@!${client.user.id}> prefix`) || message.content.startsWith(`<@${client.user.id}> prefix`)) {
        let args = message.content.split("set ")
        args.shift()

        if (args.length < 1) return message.reply(`The server's prefix is \`${prefix}\`. Type \`${prefix}help\` for a list of commands.\nYou can change the server's prefix with \`${prefix}prefix set <new prefix>\``);
        message.client.guildPrefix.set(message.guild.id,args.join(""));
        message.channel.send(`Prefix \`${args.join("")}\` set`);
    }
}
module.exports = setPrefix;
