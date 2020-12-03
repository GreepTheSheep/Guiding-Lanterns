const Discord = require('discord.js');
const Enmap = require('enmap')

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

    const check_db = new Enmap({name : 'Tangled_verification'})

    if (check_db.get(member.id) == false) return
    
    let embed = new Discord.MessageEmbed()
    embed.setColor("#910002")
    .setTimestamp()
    .addField(`${msg}`, `Goodbye **${member.user.username}** :sob:`)
    .setThumbnail('http://www.youloveit.com/uploads/posts/2017-11/1511021113_youloveit_com_tangled_the_series_animated_gifs_emotions09.gif')
    .setFooter(`${member.user.tag} left the Kingdom of Corona! We are now ${members} in the server`, `${member.user.displayAvatarURL()}`)
    client.guilds.cache.get('562602234265731080').channels.cache.get('658808055558832132').send(embed);
    client.guilds.cache.get('562602234265731080').channels.cache.get('663096647437516810').send(`\`-\` ${member.user.username}`);
}

module.exports = goodbye;
