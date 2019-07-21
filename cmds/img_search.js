const Discord = require('discord.js')
const fs = require('fs')
const configfile = "./data/config.json";
const config = JSON.parse(fs.readFileSync(configfile, "utf8"));

const GImages = require('google-images');
const GoogleImages = new GImages(config.googleimage_CSEID, config.googleimage_APIKEY);

function image_search(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel) {

}


function image_search_request(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl) {
    if (client.user.id == '577477992608038912') return image_search(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel);

    dbl.hasVoted(message.author.id).then(voted => {
        if (voted) {
            image_search(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel);
        } else {
            let embed = new Discord.RichEmbed()
            embed.setTitle('ERROR!')
            .setColor('#ff0000')
            .addField("This command is vote locked!", `Have you voted for the bot?\nVoting for the bot keeps the dev. of the bot alive :wink:\n\nhttps://discordbots.org/bot/569624646475972608/vote \n\n(Synchronization with the vote and bot can take about 5 minutes, you can check if you voted with \`${prefix}didivote\`)`)
            .setFooter(`Type "${prefix}bug <details of your bug>" to send at the devs`, `${message.author.displayAvatarURL}`)
            message.channel.send(embed)
        }
    });
}

module.exports = image_search_request;