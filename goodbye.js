const Discord = require('discord.js');

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

const images = [
    'http://www.youloveit.com/uploads/posts/2017-11/1511021126_youloveit_com_tangled_the_series_animated_gifs_emotions08.gif',
    'https://66.media.tumblr.com/39d01f174a4f9f6dd8f633c0c71b45f3/tumblr_p2i2w7hGTU1t9x4ovo1_500.gif',
    'https://i.pinimg.com/originals/d8/f5/42/d8f542b47b73b7175685293c66e49542.gif',
    'https://78.media.tumblr.com/db6256e0bb27fd77cbba6d3b5b14313a/tumblr_p6vvixKKZ61v5nb6zo1_400.gif',
    'https://68.media.tumblr.com/5d589ace2296bf25b86aca1a8642f046/tumblr_oodijwqPHE1tv83zuo2_400.gif',
    'https://66.media.tumblr.com/2e9b485c8bb512aae5032c251b7b15ea/tumblr_ozopghxTqI1tlomiho1_500.gif',
    'https://cdn.discordapp.com/attachments/562602234265731082/576361649527586816/43169276_2222846214658575_7910639428306884730_n.jpg',
    'https://media.discordapp.net/attachments/562602234265731082/582818630274777089/Screenshot_20190528-144236_MX_Player01.jpg',
    'https://media.discordapp.net/attachments/562602234265731082/582838793959243794/PicsArt_05-28-04.53.11.png',
    'https://media.discordapp.net/attachments/562602234265731082/582852031388319754/PicsArt_05-28-05.02.37.png'
];

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function goodbye(member, client) {
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