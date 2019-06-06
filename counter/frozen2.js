
const Discord = require('discord.js');
function days_until_frozen_2(){
    var t = Date.parse("November 22 2019 00:00:00 GMT-0400") - Date.parse(new Date());
    var days = Math.floor( t/(1000*60*60*24) );
    return `${days} Days until Frozen II`;
}

//Frozen II countdown
function frozen_2_countdown(client,channel_id) {
    const channel = client.channels.get(channel_id);
    if (!channel) {
        console.log(`Channel: ${channel_id} cannot be found`);
        return;
    }
    channel.setName(`${days_until_frozen_2()}`).catch(err=>console.log(err));

    var x = setInterval(function() {
        const text = `${days_until_frozen_2()}`
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
