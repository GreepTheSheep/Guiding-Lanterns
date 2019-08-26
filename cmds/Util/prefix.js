const Discord = require("discord.js");

function setPrefix(message, client, prefix, guildPrefix){
    if (message.content.startsWith(prefix + "prefix") || message.content.startsWith(`<@!${client.user.id}> prefix`) || message.content.startsWith(`<@${client.user.id}> prefix`)) {
        let args = message.content.split(" ")
        args.shift()

        if (args.length < 1) return message.reply(`The server's prefix is \`${prefix}\`. Type \`${prefix}help\` for a list of commands.\nYou can change the server's prefix with \`${prefix}prefix <new prefix>\``);
        if(message.member.hasPermission("ADMINISTRATOR") || message.author.id == '330030648456642562'){
            message.client.guildPrefix.set(message.guild.id,args.join(" "))
            message.channel.send(`Prefix \`${args.join("")}\` set\n:warning: If you can't remember the prefix, mention the bot followed by \`prefix\``)
        } else {
            return message.reply('Sorry, you can\'t do that!');
        }
    }
}
module.exports = setPrefix;
