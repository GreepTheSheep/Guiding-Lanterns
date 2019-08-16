const Discord = require('discord.js');
const fs = require("fs");

function givelist(){
    const readdb = fs.readdirSync('./data/movies/').filter(file => file.endsWith('quotes.json'))
    const listarray = [];
    for (var file of readdb){
        var movie = file.replace("_quotes.json", "")
        listarray.push(movie.charAt(0).toUpperCase() + movie.slice(1))
    }
    return listarray.join("\`\n- \`")
}

function quotes(message, client, prefix, date, time, logchannel) {
    if (message.content.startsWith(prefix + 'quote')) {
        try{
        const args = message.content.split(/ +/).slice(1);
        if (args.length < 1 || args[0] === 'list') {
            let listembed = new Discord.RichEmbed()
            listembed.setColor("#0567DA")
                .addField("Avialble movies are:", `- \`${givelist()}\``)
                .setFooter(`Usage: ${prefix} <movie>`)
            return message.channel.send(listembed)
        }
        var quotesfile = `./data/movies/${args[0].toLowerCase()}_quotes.json`
        fs.readFile(quotesfile, "utf8",function read(err, data){
            if (err) return message.channel.send("Hmm... I don't found the movie. *Maybe it was eaten, I don't know...*")
            
            var quotes = JSON.parse(data);
            function randomItem(array) {
                return array[Math.floor(Math.random() * array.length)];
            }
            let rquote = randomItem(quotes);
    
            let embed = new Discord.RichEmbed()
                embed.setColor("RANDOM")
                    .addField(`Random ${args[0].charAt(0).toUpperCase() + args[0].slice(1)} quote :`, `${rquote}`)
                    .setFooter(`Another? ${prefix}quote ${args[0]}`, `${client.user.avatarURL}`)
            message.channel.send(embed)
        });
        } catch(err) {
            message.channel.send('\`\`\`:/ Hmm... Looks like there\'s been a error.\nDon\'t worry! The report was sent at the devs!\`\`\`');
            console.log(`\n[${date(0)} - ${time(0)}] ${prefix}8ball Error: ${err}\n`)
            logchannel.send(`\`\`\`${prefix}8ball Error:\n${err}\`\`\``)
        }
    }
}

module.exports = quotes;