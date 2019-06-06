const Discord = require('discord.js');
const fs = require('fs');
const msgcount = require('./messages.json');

//Update number of messages.
function message_count(client,channel_id) {
    const channel = client.channels.get(channel_id);
    if (!channel) {
        console.log(`Channel: ${channel_id} cannot be found`);
        return;
    }

    msgcount.messages++;

    let countwrite = { "messages": `${msgcount.messages}` };
    let data = JSON.stringify(countwrite);
    fs.writeFileSync('./counter/messages.json', data);

    channel.setName(`Messages: ${msgcount.messages}`).catch(err=>console.log(err));

}

module.exports = message_count;
