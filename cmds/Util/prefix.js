const Discord = require("discord.js");

function setPrefix(message, client, prefix, guildPrefix, lang){
    if (message.content.startsWith(prefix + "prefix") || message.content.startsWith(`<@!${client.user.id}> prefix`) || message.content.startsWith(`<@${client.user.id}> prefix`)) {
        let args = message.content.split("set ")
        args.shift()

        if (args.length < 1) return message.reply(lang.prefix_display.split('${prefix}').join(prefix));
        if(message.member.hasPermission("ADMINISTRATOR") || message.author.id == '330030648456642562'){
            guildPrefix.set(message.guild.id,args.join(" "))
            message.channel.send(lang.prefix_set.split('${args.join(\" \")}').join(args.join(" ")))
        } else {
            return message.reply(lang.prefix_impossible);
        }
    }
}
module.exports = setPrefix;
