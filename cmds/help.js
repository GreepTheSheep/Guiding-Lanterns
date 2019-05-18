const Discord = require('discord.js');

function help(message, client, prefix) {
    const images = [
        'http://www.youloveit.com/uploads/posts/2017-11/1511021122_youloveit_com_tangled_the_series_animated_gifs_emotions02.gif',
        'http://www.youloveit.com/uploads/posts/2017-11/1511021101_youloveit_com_tangled_the_series_animated_gifs_emotions01.gif',
        'http://www.youloveit.com/uploads/posts/2017-11/1511021100_youloveit_com_tangled_the_series_animated_gifs_emotions06.gif',
        'http://www.youloveit.com/uploads/posts/2017-11/1511021104_youloveit_com_tangled_the_series_animated_gifs_emotions05.gif',
        'http://www.youloveit.com/uploads/posts/2017-11/1511021126_youloveit_com_tangled_the_series_animated_gifs_emotions08.gif',
        'https://68.media.tumblr.com/327d494214393c216036fecb33b26c8e/tumblr_ok9q60z0q01qhk1e5o1_500.gif',
        'https://i.pinimg.com/originals/e8/1f/c8/e81fc827bfc29de53de65be0c80c5638.gif',
        'https://78.media.tumblr.com/2efc44413cbd084b56d0215eb91ebcfd/tumblr_ouakbtM2WY1vm5s4to1_500.gif',
        'http://www.youloveit.com/uploads/posts/2017-11/1511021094_youloveit_com_tangled_the_series_animated_gifs_emotions03.gif',
        'https://i.pinimg.com/originals/ed/d8/1f/edd81f0f8cd57690777f917a514ae840.gif',
        'https://68.media.tumblr.com/5bd1bd88eb1241cf47c4a8ed4d4c2c8e/tumblr_onebgeZkcF1tv83zuo1_500.gif',
        'https://78.media.tumblr.com/2f649cf332f82981365f19719ca8783e/tumblr_oncm3cNn4O1vgj4qso2_400.jpg',
        'http://www.youloveit.com/uploads/posts/2017-11/1511021113_youloveit_com_tangled_the_series_animated_gifs_emotions09.gif',
        'https://78.media.tumblr.com/db6256e0bb27fd77cbba6d3b5b14313a/tumblr_p6vvixKKZ61v5nb6zo1_400.gif',
        'https://66.media.tumblr.com/a2ab84dc9606cad23ac2920219025e53/tumblr_p6fc26LcjA1rd3qeco2_500.gif',
        'https://68.media.tumblr.com/5d589ace2296bf25b86aca1a8642f046/tumblr_oodijwqPHE1tv83zuo2_400.gif',
        `${client.user.avatarURL}`
    ]
    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    if (message.content.startsWith(prefix + 'help') || message.content.startsWith(prefix + 'commands')) {
        let thumb = randomItem(images);
        let embed = new Discord.RichEmbed()
            embed.setColor("#9C01C4")
                .addField("You feel lost? Don't worry :wink:", '`!quote` : Send a random quote from Tangled (and the series also)\n`!lanterns` : see how much lanterns are thown (launch your lantern using this emoji : <:Lantern:570822664789426186>)')
                .addField("If you have any problems :", '`!bug`: Report any bug to owner\nor\n`!suggest`: Suggest an improvement')
                .setThumbnail(`${thumb}`)
                .setFooter(`You can type !about for credits!`, `${client.user.avatarURL}`)
            message.channel.send({ embed: embed })
    }
}

module.exports = help;