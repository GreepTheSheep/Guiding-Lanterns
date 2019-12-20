const Discord = require("discord.js");

function msgCollector(message, client, prefix){
    if (message.content.startsWith(prefix + "awaitmsg")) {
        message.channel.send('Awaiting message...')
        const filter = m => message.author == m.author;
        const collector = message.channel.createMessageCollector(filter, {time: 60000, max: 1});
        collector.on('collect', m => {
            message.reply(`Your message is: ${m.content}`);
            //collector.stop('stop');
        });
        collector.on('end', (collected, reason) => {
            if (reason == 'time'){
                message.reply(`I have nothing...`)
            }
        });
    }
}
module.exports = msgCollector;
