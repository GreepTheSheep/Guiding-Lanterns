// Wolfram|Alpha code by Ajam#3536
// https://www.wolframalpha.com

const { wolfID } = require('../config.json');
const Discord = require('discord.js');
const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI(wolfID);
    function wolfram_short (message, client, prefix) {
        if (message.content.startsWith(prefix + 'wolf'))  {
            (async () => {
            try {
                let args = message.content.split(" ");
                args.shift();
                if (args.length < 1) {
                message.channel.send(`__Input your message!__\nExample: \`${prefix}wolfram Tangled\``);
                } else {
                const queryresult = await waApi.getShort(args.join(" "));
                if (queryresult.success === false) {
                     message.reply('Wolfram|Alpha did not understand your input')
                     return;
                }
                let embed = new Discord.RichEmbed;
                embed.setColor('#008888')
                    .addField('Wolfram|Alpha says:', queryresult)
                    .setFooter('https://www.wolframalpha.com/ | Type " !full-wolfram <Your Input>" for detailled description', "https://images-eu.ssl-images-amazon.com/images/I/41II4YzkFxL.png")
                await message.reply(embed);  
            } 
            }
            catch (e) {
                if (!e.message == 'No short answer available') return message.reply(e.message);
                message.reply(e.message + `. Try with \`${prefix}full-wolfram\``);
            }
        })();
        };
    };

module.exports = wolfram_short