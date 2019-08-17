const Discord = require('discord.js');

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function goodbye(member, client) {
    const messages = [
        ':cry:',
        '<:RapunzelSad:562798982179586074>',
        '<:RapunzelAngry:569597548243714059>',
        '<:PascalNo:567339168246530061>',
        'Nous te souhaitons un bon voyage !',
        '<:FlynnCmon:562800031263096834>',
        '<:FryingPan:566860535082123264>',
        ':sob:',
        'We wish you a good trip!'
    ];
    
    const images = require('./data/movies/tangled_pics.json');

    let msg = randomItem(messages);
    let img = randomItem(images);
    
    if (member.guild.id === '562602234265731080'){
        let embed = new Discord.RichEmbed()
        embed.setColor("#910002")
        .setTimestamp()
        .addField(`${msg}`, `**${member.user.username}**`)
        .setImage(`${img}`)
        .setFooter(`${member.user.username} left the Kingdom of Corona!`, `${member.user.displayAvatarURL}`)
        client.guilds.get('562602234265731080').channels.get('562611657419784202').send(embed);
    }
    if (member.guild.id === '570024448371982373'){
        let embed = new Discord.RichEmbed()
        embed.setColor("#01B023")
        .setTimestamp()
        .addField(`${msg}`, `**${member.user.username}**`)
        .setImage(`${img}`)
        .setFooter(`${member.user.username} left the Guiding Lanterns support server!`, `${member.user.displayAvatarURL}`)
        client.guilds.get('570024448371982373').channels.get('591219640315674641').send(embed);
    }
    if (member.guild.id === '264445053596991498'){
        let embed = new Discord.RichEmbed()
        embed.setColor("#01B023")
        .setTimestamp()
        .addField(`${msg}`, `<@${member.user.id}>`)
        .setImage(`${img}`)
        .setFooter(`${member.user.username} left the DBL server!`, `${member.user.displayAvatarURL}`)
        client.guilds.get('264445053596991498').channels.get('265156361791209475').send(embed);
    }
}

module.exports = goodbye;