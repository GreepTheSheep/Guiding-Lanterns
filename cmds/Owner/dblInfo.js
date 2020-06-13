const Discord = require('discord.js')

async function dblInfo (message, client, prefix, dbl) {
    if (message.content.startsWith(prefix + 'dblinfo')){
        let args = message.content.split(" ")
        args.shift()
        if (args.length < 1) return message.channel.send('Args: \`\`\`\ngetBot <ID>\ngetUser <ID>\ngetVotes\nhasVoted <ID>\`\`\`*(case sensitive)*')
        if (args[0] == 'getBot'){
            if (!args[1]) return message.channel.send('ID is missing')
            const result = await dbl.getBot(args[1])
            let embed = new Discord.RichEmbed
            embed.setTitle('top.gg result:')
            .setAuthor(`${result.username}#${result.discriminator}`, `https://cdn.discordapp.com/avatars/${result.id}/${result.avatar}.png`, `https://top.gg/bot/${result.id}`)
            .setColor('RANDOM')
            .setDescription(result.shortdesc)
            .addField('Prefix', result.prefix, true)
            .addField('Library', result.lib, true)
            .addField('Stats:', `${result.server_count ? result.server_count+` servers \n${result.shard_count ? result.shard_count+' shards' : 'No shards'}`: 'No stats found'}`, true)
            .addField('Owner:', `${dbl.getUser(result.owners[0]).then(user => {user.username+'#'+user.discriminator})}\nID: ${result.owners[0]}`, true)
            .addField('Certified by Discord', result.certifiedBot?'Yes':'No', true)
            .addField('Links', `- [top.gg bot page](https://top.gg/bot/${result.id})\n- ${result.website == "" ? 'No website': `[Website](${result.website})`}\n- ${result.support == ""?'No support server': `[Support server](https://discord.gg/${result.support})`}\n- ${result.github == "" ? 'No github repo': `[Github repo](${result.github})`}`, true)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${result.id}/${result.avatar}.png`)
            .setFooter(`ID: ${result.id} - Added on top.gg on`)
            .setTimestamp(result.date)
            message.channel.send(embed)
        } else if (args[0] == 'getUser'){
            if (!args[1]) return message.channel.send('ID is missing')
            message.channel.send('WIP')
        } else if (args[0] == 'getVotes'){
            message.channel.send('WIP')
        } else if (args[0] == 'hasVoted'){
            if (!args[1]) return message.channel.send('ID is missing')
            message.channel.send('WIP')
        } else return message.channel.send('Args: \`\`\`\ngetStats <ID>\ngetBot <ID>\ngetUser <ID>\ngetVotes\nhasVoted <ID>\`\`\`*(case sensitive)*')
    }
}

module.exports = dblInfo
