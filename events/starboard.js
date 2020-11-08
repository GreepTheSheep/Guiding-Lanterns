const Discord = require('discord.js');
const fs = require('fs');

const reactions = 3

function starboard (client, reaction, logchannel, date, time){
    try{
        if (reaction.emoji.name === '⭐' && reaction.count === reactions) {

            if (reaction.message.channel.name.includes('starboard')) return;

                if (reaction.message.attachments.size > 0){
                    let starboardembed = new Discord.MessageEmbed
                    starboardembed.setAuthor(reaction.message.author.username, reaction.message.author.displayAvatarURL())
                    if (!reaction.message.content) starboardembed.setDescription(`[Link to message](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})`)
                    else starboardembed.setDescription(reaction.message.content + `\n\n[Link to message](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})`)
                    starboardembed.setImage(reaction.message.attachments.array()[0].url)
                    starboardembed.setTimestamp(reaction.message.createdTimestamp)
                    if (reaction.message.guild.channels.cache.find(c => c.name.includes('starboard'))){
                        reaction.message.guild.channels.cache.find(c => c.name.includes('starboard')).send(starboardembed) 
                    }
                } else {
                    let starboardembed = new Discord.MessageEmbed
                    starboardembed.setAuthor(reaction.message.author.username, reaction.message.author.displayAvatarURL())
                    if (!reaction.message.content) starboardembed.setDescription(`[Link to message](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})`)
                    else starboardembed.setDescription(reaction.message.content + `\n\n[Link to message](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})`)
                    starboardembed.setTimestamp(reaction.message.createdTimestamp)
                    if (reaction.message.guild.channels.cache.find(c => c.name.includes('starboard'))){
                        reaction.message.guild.channels.cache.find(c => c.name.includes('starboard')).send(starboardembed) 
                    }
                }
        }
    } catch (err) {
        const errmsg = `Starboard error : ${err}`
        console.log(`[${date} - ${time}] ${errmsg}`)
        logchannel.send(errmsg)
    }
}

module.exports = starboard