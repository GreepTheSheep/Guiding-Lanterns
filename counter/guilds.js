const Discord = require('discord.js');

async function guilds_count(client, channel_id) {
    const channel = client.channels.get(channel_id);
    if (!channel) {
        console.log(`Channel: ${channel_id} cannot be found`);
        return;
    }
    var total
    if (!client.shard) total = await client.guilds.size
    else total = await client.shard.fetchClientValues('guilds.size')
    channel.setName(`Servers: ${client.shard ? total.reduce((prev, val) => prev + val, 0) : total}`).catch(err => console.log(err));
}

module.exports = guilds_count