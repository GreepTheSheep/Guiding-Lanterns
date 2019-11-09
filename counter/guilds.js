const Discord = require('discord.js');

async function guilds_count(client, channel_id) {
    const channel = client.channels.find(function(id){return id == channel_id});
    if (!channel) {
        console.log(`Channel: ${channel_id} cannot be found`);
        return;
    }
    const total = await client.shard.fetchClientValues('guilds.size')
    channel.setName(`Servers: ${total.reduce((prev, val) => prev + val, 0)}`).catch(err => console.log(err));
}

module.exports = guilds_count