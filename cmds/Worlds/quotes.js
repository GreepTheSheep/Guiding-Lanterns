const Discord = require('discord.js');
const fs = require("fs");

var totalcount

function givelist(){
    const readdb = fs.readdirSync('./data/movies/').filter(file => file.endsWith('quotes.json'))
    const listarray = [];
    totalcount = 0;
    for (var file of readdb){
        var movie = file.split('-').join(' ').replace("_quotes.json", "")
        var selectedFile = JSON.parse(fs.readFileSync(`./data/movies/${file}`, 'utf8'))
        listarray.push(`- \`${movie.charAt(0).toUpperCase() + movie.slice(1)}\` (${selectedFile.length} quotes)`)
        totalcount = totalcount + selectedFile.length
    }
    listarray.push(`\nTotal quotes found: ${totalcount}`)
    return listarray.join("\n")
}

module.exports = function(message, client, prefix, date, time, logchannel, cooldowns, config) {
    if (message.content.startsWith(prefix + 'quote')) {
        try{
            //Implement cooldown
    if (!cooldowns.has(prefix + 'quote')) {
        cooldowns.set(prefix + 'quote', new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(prefix + 'quote');
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
            return message.reply('Please wait again ' + minutes + ' minutes and ' + seconds + ' seconds before seeing a new quote of your movie.').then(m=>{m.delete({timeout: 10000}) ; message.delete({timeout: 10000})})
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    if (message.member.roles.cache.find(r => r.name === "KEY (The Guiding Lanterns)")) { //Override cooldown
        timestamps.delete(message.author.id);
    }
    // End of cooldown implement
        let args = message.content.split(" ")
        args.shift()
        if (args.length < 1 || args[0] === 'list') {
            let listembed = new Discord.MessageEmbed()
            listembed.setColor("#0567DA")
                .addField("Avialble movies are:", givelist())
                .setFooter(`Usage: ${prefix}quote <movie>`)
            return message.channel.send(listembed)
        }
        var quotesfile = `./data/movies/${args.join("-").toLowerCase()}_quotes.json`
        fs.readFile(quotesfile, "utf8",function read(err, data){
            if (err) return message.channel.send("Hmm... I don't found the movie. *Maybe it was eaten, I don't know...*")
            
            var quotes = JSON.parse(data);
            let random = Math.floor(Math.random() * quotes.length)
    
            let embed = new Discord.MessageEmbed()
                embed.setColor("RANDOM")
                    .addField(`Random ${args[0].charAt(0).toUpperCase() + args[0].slice(1).toLowerCase()} quote :`, `${quotes[random]}`)
                    .setFooter(`Quote ${random + 1}/${quotes.length} | Another? ${prefix}quote ${args[0]}`, `${client.user.avatarURL}`)
            message.channel.send(embed)
        });
        } catch(err) {
            message.channel.send('\`\`\`:/ Hmm... Looks like there\'s been a error.\nDon\'t worry! The report was sent at the devs!\`\`\`');
            console.log(`\n[${date(0)} - ${time(0)}] ${prefix}Quotes Error: ${err}\n`)
            logchannel.send(`\`\`\`${prefix}Quotes Error:\n${err}\`\`\``)
        }
    }
    if (message.content.startsWith(prefix + "addquote")){
        try {      
        if (message.author.id == config.owner) {
            const args = message.content.split(" ");
            args.shift()
            message.delete({timeout: 10000})
            const text = args.join(' ')
            if (args.length < 1) return message.react('❌')
            var quotefile = `./data/movies/${args[0].toLowerCase()}_quotes.json`
            var quotes = JSON.parse(fs.readFileSync(quotefile, 'utf8'))
            quotes.push(text.slice(args[0].length+1));
            quoteread = JSON.stringify(quotes);
            fs.writeFile(quotefile, quoteread, function(err){if (err){
                message.reply('I think the file does not exist').then(m=>m.delete({timeout: 10000}))
            }});
            message.react('✅')
        }
        } catch(err) {
            const args = message.content.split(/ +/).slice(1);
            var quotefile = `./data/movies/${args[0].toLowerCase()}_quotes.json`
            message.reply('Hmm... Something went wrong. Don\'t worry, the report has been send!');
            const errmsg = `Quote write error: ${err}. File: ${quotefile}`;
            console.log(`[${date(0)} - ${time(0)}] ${errmsg}`);
            logchannel.send(errmsg);
        }
    }
}
