const Discord = require('discord.js');

function users_count(client, channel_id) {
    const channel = client.channels.get(channel_id);
    if (!channel) {
        console.log(`Channel: ${channel_id} cannot be found`);
        return;
    }
    setInterval(function(){
    const total = client.users.size;
    const bots = client.users.filter(m => m.bot).size; 
    const members = total - bots

    channel.setName(`Users: ${members}`).catch(err => console.log(err));
    }, 15000)
    
}

module.exports = users_count