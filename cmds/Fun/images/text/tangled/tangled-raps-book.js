const Discord = require('discord.js')
const { Attachment } = require('discord.js');
const fs = require('fs')
const request = require('request')
const gm = require('gm')

function tangled_raps_book(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext, config) {
    if (message.content.toLowerCase().startsWith(prefix + 'rapunzelbook') || message.content.toLowerCase().startsWith(prefix + 'rapsbook')){
        try{
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

        const imgurl = 'https://cdn.discordapp.com/attachments/662735703284908067/754638959233204254/Rapunzel_Book_Template.png'

        let args = message.content.split(" ")
        args.shift()

        if (args.length < 1) {
            const attachment = new Attachment(request(imgurl));
            message.channel.send(attachment)
        } else {
            text = args.join(' ')
            var lines = []

            const lengthLine = 15
            // https://www.w3schools.com/js/js_string_methods.asp
            
            if (text.length > lengthLine){
                lines.push(text)
                var i = 0
                while (text.length - (lengthLine * (i+1)) <= 0) {
                    if (lines[i].length > lengthLine){
                        if (lines[i].charAt(lengthLine-1) == ' '){
                            // Crée une ligne
                            lines.push(lines[i].slice(0, lengthLine-1))
                        } else {
                            if (lines[i].charAt(lengthLine) == ' '){
                                // Crée une ligne
                                lines.push(lines[i].slice(0, lengthLine-1))
                            } else {
                                // Crée un tiret puis une ligne
                                lines.push(lines[i].concat('-').slice(0, lengthLine))
                            }
                        }
                    }
                    i++
                }
                lines.shift()
                text = lines.join('\n')
            }
            

            gm(request(imgurl))
            .font(__dirname + "/Letters_for_Learners.ttf", 35)
            .drawText(200, 230, text)
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

module.exports = tangled_raps_book