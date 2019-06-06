const Discord = require('discord.js');

var num_messages = 0; //set num_messages to 0

//Update number of messages.
function message_count(client) {
    const guild = client.guilds.get('570024448371982373');
    const channel = guild.channels.get('585767717387370496');
    ++num_messages
    channel.setName(`Messages: ${num_messages}`).catch(err=>console.log(err));
}

module.exports = message_count;