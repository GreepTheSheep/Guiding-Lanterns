const Discord = require('discord.js');

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

const images = [
    'https://33.media.tumblr.com/066f8253a3d4ca6d71874b1635dfbb70/tumblr_n3pqzbd7z61sv70dvo1_500.gif',
    'http://media.tumblr.com/tumblr_mc0em0UTiu1rrpsd7.gif',
    'https://media.giphy.com/media/L0mK6P5eYf6Ug/giphy.gif',
    'https://media.giphy.com/media/JS2YlygH2zxEA/giphy.gif',
    'https://media1.tenor.com/images/ca53870091f48f62078ace583e8300f3/tenor.gif',
    'http://media.tumblr.com/tumblr_lrubq5GGpe1qgbfe7.gif',
    'http://www.youloveit.com/uploads/posts/2017-11/1511021101_youloveit_com_tangled_the_series_animated_gifs_emotions01.gif',
    'http://www.youloveit.com/uploads/posts/2017-11/1511021122_youloveit_com_tangled_the_series_animated_gifs_emotions02.gif',
    'http://www.youloveit.com/uploads/posts/2017-11/1511021094_youloveit_com_tangled_the_series_animated_gifs_emotions03.gif',
    'http://www.youloveit.com/uploads/posts/2017-11/1511021100_youloveit_com_tangled_the_series_animated_gifs_emotions06.gif',
    'https://cdn.discordapp.com/attachments/562602234265731082/574481344441352233/XKShbcp1lDJ8A.gif',
    'https://cdn.discordapp.com/attachments/573609067289772032/575148267894079488/ezgif-2-80aa2012917b.gif',
    'https://cdn.discordapp.com/attachments/562602234265731082/575283526686081024/32432.gif',
    'https://cdn.discordapp.com/attachments/562602234265731082/575142999705780234/1557187507360.gif',
    'https://cdn.discordapp.com/attachments/562602234265731082/575139288153587712/1557115041264.jpg',
    'https://66.media.tumblr.com/45d7af9acd63612013699f006a3f48fd/tumblr_pbsd0wh7Uk1r6424jo1_500.gif',
    'https://cdn.discordapp.com/attachments/562612494640873483/576750451136004106/c0e85ffaf3cee383f551ad25edb1675d.gif',
    'https://i.ytimg.com/vi/OcFj0IlM32Y/maxresdefault.jpg',
    'https://cdn.discordapp.com/attachments/573609067289772032/576343400060813315/1557465852325.png',
    'https://cdn.discordapp.com/attachments/562602234265731082/577754931155566603/1557816464452.png',
    'https://cdn.discordapp.com/attachments/562602234265731082/580088878992719897/1558324778686.gif',
    'http://is2.4chan.org/co/1558373572716.gif',
    'https://cdn.discordapp.com/attachments/562602234265731082/591856120822497280/rapunzel-20190622-103652-002.gif'
];

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function welcome(member, client) {
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