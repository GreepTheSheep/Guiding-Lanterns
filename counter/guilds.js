const Discord = require('discord.js');

function guilds_count(client, channel_id) {
    const channel = client.channels.get(channel_id);
    if (!channel) {
        console.log(`Channel: ${channel_id} cannot be found`);
        return;
    }
    channel.setName(`Servers: ${client.guilds.size}`).catch(err => console.log(err));
}

module.exports = guilds_count