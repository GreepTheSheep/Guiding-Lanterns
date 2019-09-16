const Discord = require('discord.js');

function voted(message, client, prefix, dbl, lang) {
    if (message.content.startsWith(prefix + 'didivote')) {
        if (dbl == undefined) return message.react('😢')
        
        dbl.hasVoted(message.author.id).then(voted => {
            if (voted) {
                message.reply(lang.didivote_yes)
            } else {
                message.reply(lang.didivote_no)
            }
        });
    }
};

module.exports = voted;