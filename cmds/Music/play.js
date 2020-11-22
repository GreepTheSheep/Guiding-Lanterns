const Discord = require('discord.js')

module.exports = function(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, guildPrefix, userLang, lang, langtext, config){
    if (message.content.toLowerCase().startsWith(prefix+'play')){
        let args = message.content.split(" ");
        args.shift();
        client.player.play(message, args.join(' '), message.member.user);
    }
}
