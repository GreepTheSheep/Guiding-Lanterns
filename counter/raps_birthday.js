
const Discord = require('discord.js');
function days_until_raps_birthday(){
    var distance = milliseconds_until_raps_birthday()
    var days = Math.floor( milliseconds_until_raps_birthday()/(1000*60*60*24) );
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
function milliseconds_until_raps_birthday(){
    return Date.parse("September 1 2019 00:00:00 GMT-0000") - Date.parse(new Date());
}

function raps_birthday_countdown(client,channel_id) {
    const channel = client.channels.get(channel_id);
    if (!channel) {
        console.log(`Channel: ${channel_id} cannot be found`);
        return;
    }
    channel.setName(`${days_until_raps_birthday()}`).catch(err=>console.log(err));

    var x = setInterval(function() {
        const text = `${days_until_raps_birthday()}`
        channel.setName(`${text} until Raiponce's birthday`).catch(err=>console.log(err));

        if (milliseconds_until_raps_birthday() < 0) {
            clearInterval(x);
            channel.setName(`HAPPY BIRTHDAY RAIPONCE !`).catch(err=>console.log(err));
        }
    }, 1000);
}

module.exports = raps_birthday_countdown;