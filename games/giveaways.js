const Discord = require('discord.js')
const DiscordGiveaways = require("discord-giveaways");
const ms = require("ms");

function giveawayCommands(message, client, prefix, functiondate, functiontime, getlogchannel, lang){
    if (message.content.toLowerCase().startsWith(prefix + 'giveaway')){
        var args = message.content.split(" ").slice(1);
        if (args.length < 1 || args[0].toLowerCase() == 'help'){
            let embed = new Discord.MessageEmbed
            embed.setTitle(lang.giveaway_help_title.replace('${username}', client.user.username))
            .addField(prefix + 'giveaway start [channel] [duration] [winners] [name]', lang.giveaway_help_start.replace('${prefix}', prefix))
            .addField(prefix + 'giveaway reroll [message ID]', lang.giveaway_help_reroll)
            .addField(prefix + 'giveaway edit [messageID]', lang.giveaway_help_edit)
            .addField(prefix + 'giveaway delete [messageID]', lang.giveaway_help_delete)
            .addField(prefix + 'giveaway list', lang.giveaway_help_list)
            message.channel.send(embed)
        } else if (args[0].toLowerCase() == 'start') {
            args = args.slice(1)
            if (args.length < 1) {
                // Menu
                message.channel.send(lang.giveaway_start_menu_begin.replace('${user}', message.author.username) + ' ' + lang.giveaway_start_menu_channel)
                const filter = m => message.author == m.author;
                const collector = message.channel.createMessageCollector(filter, {time: 60000, max: 1});
                collector.on('collect', m => {
                    var channel = m.mentions.channels.first()
                    if (!channel) return message.channel.send(lang.giveaway_start_menu_notaChannel)
                    message.channel.send(lang.giveaway_start_menu_duration)
                    const collector2 = message.channel.createMessageCollector(filter, {time: 60000, max: 1});
                    collector2.on('collect', m => {
                        var time = m.content
                        message.channel.send(lang.giveaway_start_menu_winners)
                        const collector3 = message.channel.createMessageCollector(filter, {time: 60000, max: 1});
                        collector3.on('collect', m => {
                            var winners = parseInt(m.content)
                            message.channel.send(lang.giveaway_start_menu_prize)
                            const collector4 = message.channel.createMessageCollector(filter, {time: 60000, max: 1});
                            collector4.on('collect', m => {
                                var prize = m.content
                                client.giveawaysManager.start(channel, {
                                    time: ms(time),
                                    prize: prize,
                                    winnerCount: winners,
                                    hostedBy: message.author,
                                    messages: {
                                        giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
                                        giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
                                        timeRemaining: lang.giveaway_timeRemaining + ": **{duration}**!",
                                        inviteToParticipate: lang.giveaway_inviteToParticipate,
                                        winMessage: lang.giveaway_winMessage,
                                        noWinner: lang.giveaway_noWinner,
                                        hostedBy: lang.giveaway_hostedBy,
                                        winners: lang.giveaway_winners,
                                        endedAt: lang.giveaway_endedAt,
                                        units: {
                                            seconds: lang.seconds,
                                            minutes: lang.minutes,
                                            hours: lang.hours,
                                            days: lang.days,
                                            pluralS: false
                                        }
                                    }
                                });
                                message.channel.send(lang.giveaway_start_menu_done.replace('${name}', `**${prize}**`).replace('${channel}', `<#${channel.id}>`))
                            });
                            collector4.on('end', (collected, reason) => {
                                if (reason == 'time'){
                                    message.channel.send(`Delay expired`)
                                }
                            });
                        });
                        collector3.on('end', (collected, reason) => {
                            if (reason == 'time'){
                                message.channel.send(`Delay expired`)
                            }
                        });
                    });
                    collector2.on('end', (collected, reason) => {
                        if (reason == 'time'){
                            message.channel.send(`Delay expired`)
                        }
                    });
                });
                collector.on('end', (collected, reason) => {
                    if (reason == 'time'){
                        message.channel.send(`Delay expired`)
                    }
                });
            } else {
                // Create instant
                const channel = message.mentions.channels.first()
                if (!channel || !args.length >= 4) return message.channel.send('I don\'t have all arguments!')
                client.giveawaysManager.start(channel, {
                    time: ms(args[1]),
                    prize: args.slice(3).join(" "),
                    winnerCount: parseInt(args[2]),
                    hostedBy: message.author,
                    messages: {
                        giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
                        giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
                        timeRemaining: lang.giveaway_timeRemaining + ": **{duration}**!",
                        inviteToParticipate: lang.giveaway_inviteToParticipate,
                        winMessage: lang.giveaway_winMessage,
                        noWinner: lang.giveaway_noWinner,
                        hostedBy: lang.giveaway_hostedBy,
                        winners: lang.giveaway_winners,
                        endedAt: lang.giveaway_endedAt,
                        units: {
                            seconds: lang.seconds,
                            minutes: lang.minutes,
                            hours: lang.hours,
                            days: lang.days,
                            pluralS: false
                        }
                    }
                });
            }
        } else if (args[0].toLowerCase() == 'reroll'){
            args = args.slice(1)
            let messageID = args[0];
            client.giveawaysManager.reroll(messageID).then(() => {
                //message.channel.send("Success! Giveaway rerolled!");
            }).catch((err) => {
                message.channel.send(lang.giveaway_reroll_notFound.replace('${ID}', messageID));
            });
        } else if (args[0].toLowerCase() == 'edit'){
            args = args.slice(1)
            message.channel.send('WIP')

        } else if (args[0].toLowerCase() == 'delete'){
            args = args.slice(1)
            message.channel.send('WIP')

        } else if (args[0].toLowerCase() == 'list'){
            args = args.slice(1)
            var list = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id)
            var current = []
            list.forEach(g=>{
                if (!g.ended) current.push(`- \`${g.messageID}\` ([Click Me](https://discord.com/channels/${g.guildID}/${g.messageID})) - <#${g.channelID}> - ${g.prize} - ${lang.giveaway_endsIn} ${ms(g.endAt,{long:true})}`)
            })
            let embed = new Discord.MessageEmbed
            embed.setTitle(lang.giveaway_list_title)
            .setDescription(list.join('\n'))
            .setColor('RANDOM')
            message.channel.send(embed)

        }
    }
}

module.exports = giveawayCommands