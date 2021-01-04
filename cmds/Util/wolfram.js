// Wolfram|Alpha code by Ajam#3536
// https://www.wolframalpha.com

const fs = require('fs')
const configfile = "./data/config.json";
const { wolfID } = JSON.parse(fs.readFileSync(configfile, "utf8"));
const Discord = require('discord.js');
const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI(wolfID);
module.exports = function(message, client, prefix, cooldowns) {
        if (message.content.startsWith(prefix + 'wolf'))  {
            (async () => {
            try {
                //Implement cooldown
    if (!cooldowns.has(prefix + 'wolf')) {
        cooldowns.set(prefix + 'wolf', new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(prefix + 'wolf');
    const cooldownAmount = 15000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            let totalSeconds = (expirationTime - now) / 1000;
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            return message.reply('Please wait again ' + seconds.toFixed(0) + ' seconds').then(m=>{m.delete({timeout: 10000}) ; message.delete({timeout: 10000})})
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    if (message.member.roles.cache.find(r => r.name === "KEY (The Guiding Lanterns)")) { //Override cooldown
        timestamps.delete(message.author.id);
    }
    // End of cooldown implement
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
                let embed = new Discord.MessageEmbed;
                embed.setColor('#008888')
                    .addField('Wolfram|Alpha says:', queryresult)
                    .setFooter('https://www.wolframalpha.com/', "https://images-eu.ssl-images-amazon.com/images/I/41II4YzkFxL.png")
                await message.reply(embed);  
            } 
            }
            catch (e) {
                message.reply(e.message);
            }
        })();
        };
    };