const Discord = require('discord.js');

//Frozen II countdown
function frozen_2_countdown(client) {
    var t = Date.parse("November 22 2019 00:00:00 GMT-0400") - Date.parse(new Date());
    const guild = client.guilds.get('570024448371982373');
    const channel = guild.channels.get('585834618910015491');
    const text = `${days} Days until Frozen II`

    var x = setInterval(function() {
        var days = Math.floor( t/(1000*60*60*24) );
        channel.setName(`${text}`).catch(err=>console.log(err));
        console.log(`Frozen II countdown refreshed!\n${text}`)
    
        if (t < 0) {
            clearInterval(x);
            channel.setName(`FROZEN II IS OUT!!`).catch(err=>console.log(err));
            console.log(`Frozen II countdown refreshed!\nFROZEN II IS OUT!!`)
        }
    }, 1000);
}

module.exports = frozen_2_countdown;