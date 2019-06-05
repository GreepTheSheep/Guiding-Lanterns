const Discord = require('discord.js');

//Update amount of members.
function num_members(client) {
    const guild = client.guilds.get('570024448371982373');
    const channel = guild.channels.get('585782174012407848');
    channel.setName(`Members: ${guild.memberCount}`).catch(err=>console.log(err));
}

module.exports = num_members;