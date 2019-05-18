const Discord = require('discord.js');

function songs(message, client, prefix) {

    const songslist =[

    ]

    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    if (message.content.startsWith(prefix + 'song')) {
        let rsong = randomItem(songslist);
        message.channel.send(`${rsong}`);
    }

}

module.exports = songs;