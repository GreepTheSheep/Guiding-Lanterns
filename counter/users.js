const Discord = require('discord.js');

async function users_count(client, channel_id) {
    const channel = client.channels.find(function(id){return id == channel_id});
    if (!channel) {
        console.log(`Channel: ${channel_id} cannot be found`);
        return;
    }
    setInterval(async function(){
    const total = await client.shard.fetchClientValues('users.size');
    const bots = await client.shard.fetchClientValues('users.filter(m => m.bot).size')
    const members = total.reduce((prev, val) => prev + val, 0) - bots.reduce((prev, val) => prev + val, 0)

    channel.setName(`Users: ${members}`).catch(err => console.log(err));
    }, 1 * 60 * 1000)
    
}

module.exports = users_count
