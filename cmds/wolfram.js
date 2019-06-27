// Wolfram|Alpha code by Ajam#3536
// https://www.wolframalpha.com

const { wolfID } = require('../config.json');
const { RichEmbed } = require('discord.js');
const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI(wolfID);
    function wolfram (message, client, prefix, donor, donoronlymsg) {
        if (message.content.startsWith(prefix + 'full-wolf'))  {
            if (!donor) return message.channel.send(donoronlymsg)
            (async () => {
            try {
                let args = message.content.split(" ");
                args.shift();
                if (args.length < 1) {
                    message.channel.send(`__Input your message!__\nExample: \`${prefix}full-wolfram Tangled\`\n\nWarning for spam!`);
                } else {
                const queryresult = await waApi.getFull(args.join(" "));
                if (queryresult.success === false) {
                     message.reply('Wolfram|Alpha did not understand your input')
                     return;
                }
                if (queryresult.error !== false) {
                     message.reply(`code: ${queryresult.error.code}, msg: ${queryresult.error.msg}`)
                     return;
                }
                const pods = queryresult.pods;
                const embed = (m,src,alt) => message.channel.send(new RichEmbed().setImage(src)
                                                                                 .setDescription(alt));
                for (i in pods) {
                    await message.channel.send(`${pods[i].title}`);
                    for (j in pods[i].subpods) {
                        await embed(message,pods[i].subpods[j].img.src,pods[i].subpods[j].img.alt);
                    }   
                }
            }
            }
            catch (e) {
                message.reply(e.message);
            }
        })();
        };
    };

module.exports = wolfram