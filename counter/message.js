const Discord = require('discord.js');
const fs = require('fs');
const countfile = "./counter/messages.json";
const msgcount = JSON.parse(fs.readFileSync(countfile, "utf8"));

//Update number of messages.
function message_count(client,channel_id) {
    const channel = client.channels.get(channel_id);
    if (!channel) {
        console.log(`Channel: ${channel_id} cannot be found`);
        return;
    }

    msgcount.messages++;

    let countwrite = { "messages": `${msgcount.messages}` };
    fs.writeFile(countfile, JSON.stringify(countwrite), (x) => {
        if (x) console.error(x)
    });

    channel.setName(`Messages: ${msgcount.messages}`).catch(err=>console.log(err));

}

module.exports = message_count;
