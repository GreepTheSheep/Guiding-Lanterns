const Discord = require('discord.js');

//Update amount of members.
function num_members_guild(client,guild_id,channel_id) {
    const channel = client.channels.find(function(id){return id == channel_id});
    const guild = client.channels.find(function(id){return id == guild_id});
    if (!guild) {
        console.log(`Guild: ${guild_id} cannot be found`);
        return;
    }
    if (!guild.available) {
        console.log(`Guild: ${guild_id} is not available`);
        return;
    }
    if (!channel) {
        console.log(`Channel: ${channel_id} cannot be found`);
        return;
    }

    const total = guild.members.array().length;
    const bots = guild.members.filter(m => m.user.bot).size; 
    const members = total - bots

    channel.setName(`Members: ${members}`).catch(err=>console.log(err));
}

module.exports = num_members_guild;
