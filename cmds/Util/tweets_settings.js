const Discord = require('discord.js');
const Enmap = require('enmap')
const tweets_setting = new Enmap({name: "twitter"});

function twitter_settings(message, client, prefix, lang, logchannel){
    if (message.content.startsWith(prefix + 'twitter')){
        const args = message.content.split(/ +/).slice(1);

        if (!tweets_setting.has(message.guild.id)) tweets_setting.set(message.guild.id, true)

        if (args[0] != 'set' || args.length < 1) {
            let embed = new Discord.RichEmbed
            embed.setTitle('Twitter Starboard')
            .setDescription(lang.twitter_info.replace('${prefix}', prefix))
            .setColor('#5EA9DD')
            return message.channel.send(embed)
        } else if (args[0] == 'set') {
            if (tweets_setting.get(message.guild.id) === false){
                tweets_setting.set(message.guild.id, true)
                message.channel.send(lang.twitter_send)
            } else if (tweets_setting.get(message.guild.id) === true){
                tweets_setting.set(message.guild.id, false)
                message.channel.send(lang.twitter_no_send)
            } else return;
        }
    }
}

module.exports = twitter_settings