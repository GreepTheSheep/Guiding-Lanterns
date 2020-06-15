const Discord = require('discord.js')

async function dblInfo (message, client, prefix, dbl) {
    if (message.content.startsWith(prefix + 'dblinfo')){
        if (dbl == undefined || !dbl) return message.channel.send('Bot not registed on top.gg')
        let args = message.content.split(" ")
        args.shift()
        if (args.length < 1) return message.channel.send('Args: \`\`\`\ngetBot <ID or mention>\ngetUser <ID or mention>\ngetVotes\nhasVoted <ID or mention>\`\`\`*(case sensitive)*')
        let embed = new Discord.RichEmbed
        if (args[0] == 'getBot'){
            if (!args[1]) return message.channel.send('ID or mention is missing')
            const rUser = message.guild.member(message.mentions.users.first()) || client.users.find(u=> u.id == args[1])
            if (rUser != client.users.find(u=> u.id == args[1])){
                if (!rUser.user.bot) return message.channel.send('This is not a bot.')
            } else {
                if (!rUser.bot) return message.channel.send('This is not a bot.')
            } 
            const result = await dbl.getBot(rUser.id).catch(e=>{return message.channel.send('This bot is not registed on top.gg')})
            const owner = await dbl.getUser(result.owners[0])
            embed.setAuthor(`${result.username}#${result.discriminator}`, `https://cdn.discordapp.com/avatars/${result.id}/${result.avatar}.png`, `https://top.gg/bot/${result.id}`)
            .setColor('RANDOM')
            .setDescription(result.shortdesc)
            .addField('Prefix', '```'+result.prefix+'```', true)
            .addField('Library', result.lib, true)
            .addField('Stats:', `${result.server_count ? result.server_count+` servers \n${result.shard_count ? result.shard_count+' shards' : 'No shards info'}`: 'No stats found'}`, true)
            .addField('Owner:', owner.username+'#'+owner.discriminator+`\nID: ${result.owners[0]}`, true)
            .addField('Verified bot:', result.certifiedBot?'Yes':'No', true)
            .addField('Links', `- [Invite](${result.invite})\n- [top.gg bot page](https://top.gg/bot/${result.id})\n- [Vote for this bot](https://top.gg/bot/${result.id}/vote)\n- ${result.website == "" ? 'No website': `[Website](${result.website})`}\n- ${result.support == ""?'No support server': `[Support server](https://discord.gg/${result.support})`}\n- ${result.github == "" ? 'No github repo': `[Github repo](${result.github})`}`, true)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${result.id}/${result.avatar}.png`)
            .setFooter(`ID: ${result.id} - Added on top.gg on`)
            .setTimestamp(result.date)
            message.channel.send(embed)
        } else if (args[0] == 'getUser'){
            if (!args[1]) return message.channel.send('ID is missing')
            const rUser = message.guild.member(message.mentions.users.first()) || client.users.find(u=> u.id == args[1])
            if (rUser != client.users.find(u=> u.id == args[1])){
                if (rUser.user.bot) return message.channel.send('This is not a user.')
            } else {
                if (rUser.bot) return message.channel.send('This is not a user.')
            } 
            const result = await dbl.getUser(rUser.id).catch(e=>{return message.channel.send('This user is not registed on top.gg')})
            embed.setAuthor(`${result.username}#${result.discriminator}`, `https://cdn.discordapp.com/avatars/${result.id}/${result.avatar}.png`, `https://top.gg/user/${result.id}`)
            .setDescription(result.bio ? result.bio: 'No description found')
            .setColor(result.color==''?'RANDOM':result.color)
            if (result.admin || result.webMod || result.mod || result.certifiedDev || result.supporter) embed.addField('top.gg stats', result.admin?'- Admin\n':'' + result.webMod?'- Web Moderator\n':'' + result.mod?'- Moderator\n':'' + result.certifiedDev?'- Certified developer\n':'' + result.supporter?'- Supporter\n':'')
            embed.setThumbnail(`https://cdn.discordapp.com/avatars/${result.id}/${result.avatar}.png`)
            .setFooter(`ID: ${result.id}`)
            message.channel.send(embed)
        } else if (args[0] == 'getVotes'){
            dbl.getVotes().then(votes => {
                if (votes.error) return message.channel.send('Error: ' + votes.error)
                var voteList = []
                var votecounter = 0
                votes.forEach(voter=>{
                    votecounter++
                    voteList.push(`${votecounter}. ${voter.username}#${voter.discriminator} (${voter.id})`)
                })
                message.channel.send('\`\`\`' + voteList.join('\n') + '\`\`\`')
            });
        } else if (args[0] == 'hasVoted'){
            if (!args[1]) return message.channel.send('ID is missing')
            const rUser = message.guild.member(message.mentions.users.first()) || client.users.find(u=> u.id == args[1])
            if (rUser != client.users.find(u=> u.id == args[1])){
                if (rUser.user.bot) return message.channel.send('This is not a user.')
            } else {
                if (rUser.bot) return message.channel.send('This is not a user.')
            }
            dbl.hasVoted(rUser.id).then(voted => {
                if (voted) message.channel.send(rUser.tag + ' has voted!')
                else message.channel.send('nope!')
            });
        } else if (args[0] == 'getBots' || args[0] == 'search'){
            if (!args[1]) return message.channel.send('query is missing')
            dbl.getBots({sort: args[1], limit: 10}).then(bots => {
                if (!bots.results) return message.channel.send('No results')
                var botList = []
                bots.results.forEach(bot=>{
                    botList.push(`- ${bot.username}#${bot.discriminator} (${bot.id}) [Link](https://top.gg/bot/${bot.id})`)
                })
                embed.setTitle('Results:')
                .setDescription(botList)
                .setColor('RANDOM')
                message.channel.send(embed)
            });
        } else return message.channel.send('Args: \`\`\`\ngetBot <ID or mention>\nsearch <query>\ngetUser <ID or mention>\ngetVotes\nhasVoted <ID or mention>\`\`\`*(case sensitive)*')
    }
}

module.exports = dblInfo
