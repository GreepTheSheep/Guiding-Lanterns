const Discord = require('discord.js');

const images = require('./data/tangled_pics.json');

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
        'Ciao!',
        'Bienvenue !',
        'Put down your luggages and enjoy the kingdom! :sunny:'
    ];
    const images = require('./data/movie/tangled_pics.json');

    let welcomemsg = randomItem(messages);
    let welcomeimg = randomItem(images);

    if (member.guild.id === '562602234265731080'){
        let embed = new Discord.RichEmbed()
        embed.setColor("#01B023")
        .setTimestamp()
        .addField(`${welcomemsg}`, `<@${member.user.id}>`)
        .setImage(`${welcomeimg}`)
        .setFooter(`${member.user.username} just landed in the Kingdom of Corona!`, `${member.user.displayAvatarURL}`)
        client.guilds.get('562602234265731080').channels.get('562611657419784202').send(embed);
    }
    if (member.guild.id === '570024448371982373'){
        let embed = new Discord.RichEmbed()
        embed.setColor("#01B023")
        .setTimestamp()
        .addField(`Welcome to the Guiding Lanterns support server!`, `<@${member.user.id}>`)
        .setImage(`${welcomeimg}`)
        .setFooter(`${member.user.username} just landed in the Guiding Lanterns support server!`, `${member.user.displayAvatarURL}`)
        client.guilds.get('570024448371982373').channels.get('591219640315674641').send(embed);
    }
    if (member.guild.id === '264445053596991498'){
        let embed = new Discord.RichEmbed()
        embed.setColor("#01B023")
        .setTimestamp()
        .addField(`${welcomemsg}`, `<@${member.user.id}>`)
        .setImage(`${welcomeimg}`)
        .setFooter(`${member.user.username} just landed in the DBL server!`, `${member.user.displayAvatarURL}`)
        client.guilds.get('264445053596991498').channels.get('265156361791209475').send(embed);
    }
}

module.exports = welcome;