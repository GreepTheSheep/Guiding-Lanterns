// Wolfram|Alpha code by Ajam#3536
// https://www.wolframalpha.com

const { wolfID } = require('../config.json');
const Discord = require('discord.js');
const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI(wolfID);
    function wolfram_short (message, client, prefix, donor, donoronlymsg) {
        if (message.content.startsWith(prefix + 'wolfram'))  {
            (async () => {
            if (!donor) return message.channel.send(donoronlymsg)
            try {
                let args = message.content.split(" ");
                args.shift();
                const queryresult = await waApi.getShort(args.join(" "));
                if (queryresult.success === false) {
                     message.reply('Wolfram|Alpha did not understand your input')
                     return;
                }
                let embed = new Discord.RichEmbed;
                embed.setColor('#008888')
                    .addField('Wolfram|Alpha says:', queryresult)
                    .setFooter('https://www.wolframalpha.com/', "https://images-eu.ssl-images-amazon.com/images/I/41II4YzkFxL.png")
                await message.reply(embed);   
            }
            catch (e) {
                console.log(e);
                message.reply(e.message);
            }
        })();
        };
    };

module.exports = wolfram_short