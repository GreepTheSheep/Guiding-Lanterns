const Discord = require('discord.js')
const DiscordPlayer = require('discord-player')

module.exports = function(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, guildPrefix, userLang, lang, langtext, config){
    if (message.content.toLowerCase().startsWith(prefix+'play')){
        let args = message.content.split(" ");
        args.shift();
        console.log('[Music] command play called. Args: ' + args.join(' '))
        client.player.play(message, args.join(' '), message.member.user);
    }
}