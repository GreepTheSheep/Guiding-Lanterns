const Discord = require('discord.js')
const request = require('request')
const moment = require('moment-timezone')
moment.tz.setDefault("Etc/GMT");
const Enmap = require('enmap')
const redditDB = new Enmap({name: "dailyreddit"})

module.exports = function(message, client, prefix, lang){
    if (message.content.toLowerCase().startsWith(prefix + 'dailyreddit')){
        let args = message.content.split(" ");
        args.shift();
        if (args.length < 1) {
            let embed = new Discord.MessageEmbed
            embed.setTitle(lang.dailyreddit_help_title)
            .setDescription(lang.dailyreddit_help_desc.replace('${prefix}', prefix))
            .addField(`${prefix}dailyreddit sub`, lang.dailyreddit_help_sub.replace('${prefix}', prefix).replace('${link}', 'https://en.wikipedia.org/wiki/List_of_tz_database_time_zones'))
            .addField(`${prefix}dailyreddit unsub`, lang.dailyreddit_help_unsub.replace('${prefix}', prefix))
            .setColor('RANDOM')
            message.channel.send(embed)
        } else if (args[0].toLowerCase() == 'sub') {
            args.shift()
            if (args.length<1){
                let embed = new Discord.MessageEmbed
                embed.setTitle(`${prefix}dailyreddit sub`)
                .setColor('RANDOM')
                .setDescription(lang.dailyreddit_help_sub.replace('${prefix}', prefix).replace('${link}', 'https://en.wikipedia.org/wiki/List_of_tz_database_time_zones'))
                message.channel.send(embed)
            } else {
                var subName = args[0]

                var value_example = [
                    {
                        "subreddit": "name",
                        "hour": 21,
                        "channelID": "143"
                    },
                    {
                        "subreddit": "name2",
                        "hour": 19,
                        "channelID": "144"
                    },
                ]

                var channel = message.mentions.channels.first() || message.guild.channels.find(c=>c.id == args[1])
                if (!channel || args.length < 3) return message.reply('I don\'t have all arguments!')

                var timezone;
                if (!args[3]) timezone = 'Etc/GMT'
                else {
                    if (JSON.parse(moment.tz.names()).includes(args[3])){
                        timezone = args[3]
                    } else return message.reply('Invalid timezone format')
                }
                var hour = parseInt(args[2])
                if (hour < 0 || hour >= 24) return message.channel.send('Invalid hour format, it must be between 0 and 23')
                hour = moment.hour(hour).tz(timezone).format('HH')

                request(`https://www.reddit.com/r/${subName}/random.json`, function (error, response, body) {
                    if (error){
                        return message.channel.send('error:'+ error);
                    } else {
                        body = JSON.parse(body)
                        if (Object.prototype.toString.call(body) === '[object Array]'){
                            if (body[0] == undefined) return message.reply('Subreddit not found, check the name')
                            if (!redditDB.has(message.guild.id)) redditDB.set(message.guild.id, [])
                            var data = redditDB.get(message.guild.id)
                            data.push({
                                "subreddit": subName,
                                "hour": hour,
                                "channelID": channel.id
                            })
                            redditDB.set(message.guild.id, data)

                            message.channel.send('Succesfully added '+subName+' to <#' + channel.id + '> to send random images every day at '+hour+' hours')
                        } else if (Object.prototype.toString.call(body) === '[object Object]'){
                            if (body.error) return message.reply('Error ' + body.error + ': ' + body.message)
                            else {
                                if (!body.data.children[0]) return message.reply('Subreddit not found, check the name')
                                if (!redditDB.has(message.guild.id)) redditDB.set(message.guild.id, [])
                                var data = redditDB.get(message.guild.id)
                                data.push({
                                    "subreddit": subName,
                                    "hour": hour,
                                    "channelID": channel.id
                                })
                                redditDB.set(message.guild.id, data)

                                message.channel.send('Succesfully added '+subName+' to <#' + channel.id + '> to send random images every day at '+hour+' hours')
                            }
                        }
                    }
                });
            }
        } else if (args[0].toLowerCase() == 'unsub') {
            args.shift()
            if (args.length<1){
                let embed = new Discord.MessageEmbed
                embed.setTitle(`${prefix}dailyreddit unsub`)
                .setColor('RANDOM')
                .setDescription(lang.dailyreddit_help_unsub.replace('${prefix}', prefix))
                message.channel.send(embed)
            } else {
                var subName = args[0].toLowerCase()
                // Check value and remove it
                var data = redditDB.get(message.guild.id)
                data = data.splice(data.indexOf(data.find(d=>d.subName.toLowerCase == subName)), 1)
                redditDB.set(message.guild.id, data)
                message.channel.send('Succesfully removed '+ subName)
            }
        } else message.channel.send('Invalid arg')
    }
}