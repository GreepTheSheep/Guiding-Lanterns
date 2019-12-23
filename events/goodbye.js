const Discord = require('discord.js');

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function goodbye(member, client) {
    const messages = [
        ':cry:',
        'Bye... :cry:',
        'We miss you now :sob:',
        'See you...',
        'We wish you a good trip!'
    ];

    let msg = randomItem(messages);
    var total = member.guild.members.array().length;
    var bots = member.guild.members.filter(m => m.user.bot).size; 
    var members = total - bots;
    
    if (member.guild.id === '562602234265731080'){
        let embed = new Discord.RichEmbed()
        embed.setColor("#910002")
        .setTimestamp()
        .addField(`${msg}`, `Goodbye **${member.user.username}** :sob:`)
        .setThumbnail('http://www.youloveit.com/uploads/posts/2017-11/1511021113_youloveit_com_tangled_the_series_animated_gifs_emotions09.gif')
        .setFooter(`${member.user.tag} left the Kingdom of Corona! We are now ${members} in the server`, `${member.user.displayAvatarURL}`)
        client.guilds.get('562602234265731080').channels.get('615236807478607921').send(embed);
    }
    if (member.guild.id === '570024448371982373'){
        let embed = new Discord.RichEmbed()
        embed.setColor("#910002")
        .setTimestamp()
        .addField(`${msg}`, `**${member.user.username}**`)
        .setFooter(`${member.user.tag} left the Guiding Lanterns support server! We are now ${members} in the server`, `${member.user.displayAvatarURL}`)
        client.guilds.get('570024448371982373').channels.get('591219640315674641').send(embed);
    }
}

module.exports = goodbye;
