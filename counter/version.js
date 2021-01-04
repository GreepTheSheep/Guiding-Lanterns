const Discord = require('discord.js');
const fs = require('fs');
const packagefile = "./package.json";
const package = JSON.parse(fs.readFileSync(packagefile, "utf8"));

module.exports = function(client, channel_id) {
    const channel = client.channels.cache.get(channel_id);
    if (!channel) {
        console.log(`Channel: ${channel_id} (Show version in name) cannot be found`);
        return;
    }

    channel.setName(`Version ${package.version}`).catch(err=>console.log(err));

}