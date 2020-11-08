const Discord = require('discord.js')
const fs = require('fs')
const configfile = "./data/config.json";
const config = JSON.parse(fs.readFileSync(configfile, "utf8"));

const GImages = require('google-images');
const GoogleImages = new GImages(config.googleimage_CSEID, config.googleimage_APIKEY);

const min=0; 
const max=9;

function image_search(message, client, prefix, functiondate, functiontime, getlogchannel) {
    try{
    let args = message.content.split(" ");
    args.shift();
    if (args.length < 1) return message.channel.send(`__Input your search!__\nExample: \`${prefix}googleimage Chris Sonnenburg\``);

    var random = Math.random() * (+max - +min) + +min;

    GoogleImages.search(args.join(" "))
    .then(image => {
        var imgurl = image[random.toFixed(0)].url;
        var parentpageurl = image[random.toFixed(0)].parentPage;
        let embed = new Discord.MessageEmbed()
        embed.setAuthor(`Here is a picture of ${args.join(" ")}`, message.author.displayAvatarURL(), parentpageurl)
        .setImage(imgurl)
        .setColor('RANDOM')
        .setFooter(`Picture ${random.toFixed(0)}/10`);
        message.channel.send(embed)
    }, undefined)
    .catch(err=> {
        message.reply('Hmm... Something went wrong. Don\'t worry, the report has been send!');
        const errmsg = `Google Image Search Error: ${err}`;
        console.log(`[${functiondate(0)} - ${functiontime(0)}] ${errmsg}`);
        getlogchannel().send(errmsg);
    }, undefined)

    } catch(err) {
        message.reply('Hmm... Something went wrong. Don\'t worry, the report has been send!');
        const errmsg = `Google Image Search Error: ${err}`;
        console.log(`[${functiondate(0)} - ${functiontime(0)}] ${errmsg}`);
        getlogchannel().send(errmsg);
    }    
}


function image_search_request(message, client, prefix, functiondate, functiontime, getlogchannel, cooldowns) {
    if (message.content.startsWith(prefix + 'googleimage')) {
    //Implement cooldown
    if (!cooldowns.has(prefix + 'googleimage')) {
        cooldowns.set(prefix + 'googleimage', new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(prefix + 'googleimage');
    const cooldownAmount = 10000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            let totalSeconds = (expirationTime - now) / 1000;
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            return message.reply('calm down! You can resume the command in ' + seconds.toFixed(0) + ' seconds')
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    if (message.member.roles.cache.find(r => r.name === "KEY (The Guiding Lanterns)")) { //Override cooldown
        timestamps.delete(message.author.id);
    }
    // End of cooldown implement
    
    
    image_search(message, client, prefix, functiondate, functiontime, getlogchannel);
    }
}

module.exports = image_search_request;