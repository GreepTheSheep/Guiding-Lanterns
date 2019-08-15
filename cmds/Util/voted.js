const Discord = require('discord.js');

function voted(message, client, prefix, dbl) {
    if (message.content.startsWith(prefix + 'didivote')) {
        if (dbl == undefined) return message.react('😢')
        
        dbl.hasVoted(message.author.id).then(voted => {
            if (voted) {
                message.reply('Yes, you did!')
            } else {
                message.reply('No, you didn\'t.\nHere\'s the link: https://discordbots.org/bot/569624646475972608/vote')
            }
        });
    }
};

module.exports = voted;