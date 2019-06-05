const Discord = require('discord.js');

//Frozen II countdown
function frozen_2_countdown(client) {
    var t = Date.parse("November 22 2019 00:00:00 GMT-0400") - Date.parse(new Date());
    var days = Math.floor( t/(1000*60*60*24) );
    const guild = client.guilds.get('570024448371982373');
    const channel = guild.channels.get('585834618910015491');
    channel.setName(`${days} Days until Frozen II`).catch(err=>console.log(err));
}

module.exports = frozen_2_countdown;