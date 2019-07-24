const Discord = require('discord.js');
const fs = require("fs");
const quotesfile = './data/quotes_list.json'

function quotes(message, client, prefix) {
    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    if (message.content.startsWith(prefix + 'quote')) {
        var quotesread = fs.readFileSync(quotesfile, "utf8");
        var quotes = JSON.parse(quotesread); 
        let rquote = randomItem(quotes);

        let embed = new Discord.RichEmbed()
            embed.setColor("#9C01C4")
                .addField("Random Tangled quote :", `${rquote}`)
                .setFooter(`Another? ${prefix}quote`, `${client.user.avatarURL}`)
            message.channel.send(embed)
    }
}

module.exports = quotes;