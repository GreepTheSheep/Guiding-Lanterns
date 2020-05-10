const Discord = require('discord.js');

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function welcome(message, client, prefix) {
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
    var total = message.guild.members.array().length;
    var bots = message.guild.members.filter(m => m.user.bot).size; 
    var members = total - bots;

    if (message.content.startsWith(prefix + 'accept')){
        let embed = new Discord.RichEmbed()
            embed.setColor("#01B023")
            .setTimestamp()
            .addField(`${welcomemsg}`, `Hey, **say welcome to __${message.author.username}__** 🙌`)
            .setThumbnail('http://www.youloveit.com/uploads/posts/2017-11/1511021094_youloveit_com_tangled_the_series_animated_gifs_emotions03.gif')
            .setFooter(`${message.author.tag} just landed in the Kingdom of Corona! We are now ${members} in the server`, `${message.author.displayAvatarURL}`)
        client.guilds.get('562602234265731080').channels.get('658808055558832132').send(embed);
    }
}

module.exports = welcome;
