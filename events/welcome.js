const Discord = require('discord.js');

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function welcome(member, client) {
    const messages = [
        'Welcome and hello to Kingdom of Corona :sunny:',
        'Welcome, welcome to Kingdom Of Corona :sunny:',
        'Hello and welcome :sunny:, we are so happy that you are with us <:RapunzelExcited:570818890259628052>. Have a great time here!',
        ':wave:',
        '<:RapunzelExcited:570818890259628052>',
        'Have a great time here! <:PascalYes:567339119009726474>',
        'Hello! <:heureuse:570820764799074335>',
        'Welcome, welcome to Kingdom of Corona :sunny: Have a good time here <:PascalYes:567339119009726474>',
        'Bienvenue !',
        'Put down your luggages and enjoy the kingdom! :sunny:'
    ];

    let welcomemsg = randomItem(messages);
    var total = member.guild.members.array().length;
    var bots = member.guild.members.filter(m => m.user.bot).size; 
    var members = total - bots;

    if (member.guild.id === '562602234265731080'){
        let embed = new Discord.RichEmbed()
        if (!member.user.bot){
            embed.setColor("#01B023")
            .setTimestamp()
            .addField(`${welcomemsg}`, `Hey, **say welcome to __${member.user.username}__** 🙌`)
            .setThumbnail('https://78.media.tumblr.com/2efc44413cbd084b56d0215eb91ebcfd/tumblr_ouakbtM2WY1vm5s4to1_500.gif')
            .setFooter(`${member.user.tag} just landed in the Kingdom of Corona! We are now ${members} in the server`, `${member.user.displayAvatarURL}`)
        } else if (member.user.bot) return
        client.guilds.get('562602234265731080').channels.get('615236807478607921').send(embed);
    }
    if (member.guild.id === '570024448371982373'){
        let embed = new Discord.RichEmbed()
        if (!member.user.bot){
            embed.setColor("#01B023")
            .setTimestamp()
            .addField(`Welcome to the Guiding Lanterns support server!`, `<@${member.user.id}>`)
            .setFooter(`${member.user.tag} just landed in the Guiding Lanterns support server! We are now ${members} in the server`, `${member.user.displayAvatarURL}`)
        } else if (member.user.bot){
            embed.setColor("#01B023")
            .setTimestamp()
            .addField(`A bot joined the Guiding Lanterns support server!`, `<@${member.user.id}>`)
            .setFooter(`${member.user.tag} just landed in the Guiding Lanterns support server! We are now ${bots} bots in the server`, `${member.user.displayAvatarURL}`)
        }
        client.guilds.get('570024448371982373').channels.get('591219640315674641').send(embed);
    }
}

module.exports = welcome;
