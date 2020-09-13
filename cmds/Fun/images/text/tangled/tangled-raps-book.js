const Discord = require('discord.js')
const fs = require('fs')
const request = require('request')
const gm = require('gm')

function tangled_raps_book(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext, config) {
    if (message.content.toLowerCase().startsWith(prefix + 'rapunzelbook' || prefix + 'rapsbook')){
        //Implement cooldown
        if (!cooldowns.has(prefix + 'rapunzelbook')) {
            cooldowns.set(prefix + 'rapunzelbook', new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(prefix + 'rapunzelbook');
        const cooldownAmount = 10 * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                let totalSeconds = (expirationTime - now) / 1000;
                let days = Math.floor(totalSeconds / 86400);
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = totalSeconds % 60;
                return message.react('⌛')
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


        if (message.member.roles.find(r => r.name === "KEY (The Guiding Lanterns)")) { //Override cooldown
            timestamps.delete(message.author.id);
        }
        // End of cooldown implement
        let args = message.content.split(" ")
        args.shift()

        gm(request('https://cdn.discordapp.com/attachments/662735703284908067/754638959233204254/Rapunzel_Book_Template.png'))
        .font("Letters_for_Learners.ttf", 12)
        .drawText(30, 20, args.join(' '))
        .write("/rapsbook.png", function (err) {
            if (err){
                message.reply(lang.error)
            } console.log('done');
        });
    }
}

module.exports = tangled_raps_book