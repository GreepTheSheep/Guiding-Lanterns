const Discord = require('discord.js');

var num_messages = 0; //set num_messages to 0

//Update number of messages.
function message_count(client,channel_id) {
    const channel = client.channels.get(channel_id);
    if (!channel) {
        console.log(`Channel: ${channel_id} cannot be found`);
        return;
    }
    ++num_messages
    channel.setName(`Messages: ${num_messages}`).catch(err=>console.log(err));
}

module.exports = message_count;
