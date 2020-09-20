const Discord = require('discord.js')
const { Attachment } = require('discord.js');
const fs = require('fs')
const request = require('request')
const gm = require('gm')

function tangled_cass_paper(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext, config) {
    if (message.content.toLowerCase().startsWith(prefix + 'cassandrapaper') || message.content.toLowerCase().startsWith(prefix + 'casspaper')){
        try{
            //Implement cooldown
        if (!cooldowns.has(prefix + 'cassandrapaper')) {
            cooldowns.set(prefix + 'cassandrapaper', new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(prefix + 'cassandrapaper');
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

        const imgurl = 'https://cdn.discordapp.com/attachments/662735703284908067/757318054802751538/Untitled.png'

        let args = message.content.split(" ")
        args.shift()

        if (args.length < 1) {
            const attachment = new Attachment(request(imgurl));
            message.channel.send(attachment)
        } else {
            text = args.join(' ')
            gm(request(imgurl))
            .font(__dirname + "/Letters_for_Learners.ttf", 35)
            .drawText(250, 530, text)
            .write(process.cwd() + "/data/images/rapsbook.png", function (err) {
                if (err){
                    message.reply(lang.error_reported)
                    console.log(err)
                } else {
                    const attachment = new Attachment('./data/images/rapsbook.png');
                    message.channel.send(attachment)
                }
            });
        }
        } catch (err) {
            console.log(err)
            message.reply(lang.error_reported)
        }  
    }
}

module.exports = tangled_cass_paper