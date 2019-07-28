const Discord = require("discord.js");

function suggest(message, client, prefix) {

    if (message.content.startsWith(prefix + 'suggest')) {

        const args = message.content.split(" ").slice(1);
        if (args.length < 1) {
            return message.reply(`Usage: \`${prefix}suggest <your suggestion>\``)
        }

        var args2 = args.join(' ');

        const botsuggestchannel = client.guilds.get('570024448371982373').channels.get('579675497970270240')
            
        let embed = new Discord.RichEmbed;
            embed.setColor('#14D0A6')
            .setAuthor("A suggestion has been posted!", message.author.displayAvatarURL)
            .setTitle(`Suggest by ${message.author.tag}`)
            .setDescription('\`\`\`' + args2 + '\`\`\`')
            .setTimestamp()
            
        botsuggestchannel.send(embed).then(m=>
        message.reply('**Your suggestion has been posted!** Thanks for your feedback!\n\n> *If you want to see if your suggestion is accepted or rejected, join the support server in the suggestion channel:*\n> https://discord.gg/BPqvrkY'))
        .catch(err=>{
            message.reply('Uhh... An error occured.\nPlease try again');
            console.log(err)
        })
    }
}

module.exports = suggest;