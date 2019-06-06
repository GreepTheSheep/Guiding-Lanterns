const Discord = require('discord.js');

//Frozen II countdown
function frozen_2_countdown(client,channel_id) {
    const channel = guild.channels.get(channel_id);
    if (!channel) {
        console.log(`Channel: ${channel_id} cannot be found`);
        return;
    }

    var t = Date.parse("November 22 2019 00:00:00 GMT-0400") - Date.parse(new Date());
    var days = Math.floor( t/(1000*60*60*24) );
    const text = `${days} Days until Frozen II`
    channel.setName(`${text}`).catch(err=>console.log(err));

    const updatecount = new Promise(function(resolve, reject) {
        setInterval(function() {
            channel.setName(`${text}`).catch(err=>console.log(err));
            console.log(`Frozen II countdown refreshed!\n${text}`)
        }, 24 * 60 * 60 * 1000);
    });
    updatecount
}

module.exports = frozen_2_countdown;
