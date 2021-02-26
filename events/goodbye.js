const Discord = require('discord.js');

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

module.exports = function(member, client) {
    const messages = [
        ':cry:',
        'Bye... :cry:',
        'We miss you now :sob:',
        'See you...',
        'We wish you a good trip!'
    ];

    let msg = randomItem(messages);

    let embed = new Discord.MessageEmbed()
    embed.setColor("#910002")
    .setTimestamp()
    .addField(`${msg}`, `Goodbye **${member.user.username}** :sob:`)
    .setThumbnail('http://www.youloveit.com/uploads/posts/2017-11/1511021113_youloveit_com_tangled_the_series_animated_gifs_emotions09.gif')
    .setFooter(`${member.user.tag} left the Kingdom of Corona!`, `${member.user.displayAvatarURL()}`)
    client.guilds.cache.get('562602234265731080').channels.cache.get('658808055558832132').send(embed);
    client.guilds.cache.get('562602234265731080').channels.cache.get('663096647437516810').send(`\`-\` ${member.user.username}`);
}
