const Discord = require('discord.js')
const moment = require('moment-timezone')
moment.tz.setDefault("Etc/GMT");
const Enmap = require('enmap')

module.exports = function(client){
    var actualHour = moment().hour()
    setInterval(function(){
        if (moment().hour() != actualHour){
            actualHour = moment().hour()
            var redditDB = new Enmap({name: "dailyreddit"})
            client.guilds.cache.forEach(guild=>{
                if (!redditDB.has(guild.id)) return
                if (redditDB.get(guild.id) == "") redditDB.set(guild.id, [])
                var guildData = redditDB.get(guild.id)
                if (guildData.length < 1) return
                var tries = 0
                guildData.forEach(guildData=>{
                    checkImage(redditDB, client, tries, guild, guildData)
                })
            })
        }
    }, 1000)
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function checkImage(redditDB, client, tries, guild, guildData){
    if (tries >= 40) return
    request(`https://www.reddit.com/r/${guildData.subreddit}/random.json`, function (error, response, body) {
        if (error){
            return
        } else {
            body = JSON.parse(body)
            if (Object.prototype.toString.call(body) === '[object Array]'){
                if (body[0] == undefined) return
                resData = body[0].data.children[0].data
                if (resData.post_hint !== 'image'){
                    tries++
                    checkImage(redditDB, client, tries)
                } else postEmbed(redditDB, client, resData, guild, guildData)
            } else if (Object.prototype.toString.call(body) === '[object Object]'){
                if (body.error) return
                else {
                    if (!body.data.children[0]) return
                    resData = randomItem(body.data.children).data
                    if (resData.post_hint !== 'image'){
                        tries++
                        checkImage(redditDB, client, tries)
                    } else postEmbed(redditDB, client, resData, guild, guildData)
                }
            }
        }
    });
}
function postEmbed(redditDB, client, resData, guild, guildData){
    let embed = new Discord.MessageEmbed
    embed.setAuthor(`Random daily post of r/${resData.subreddit}`)
    .setTitle(resData.title.substring(0, 250))
    .setDescription(`[Open link](https://reddit.com${resData.permalink})`)
    .setFooter(`By u/${resData.author}${resData.author_flair_text !== null ? ` - ${resData.author_flair_text}` : ''}`)
    .setImage(resData.url)
    if (!guild.channels.some(c=> c.id == guildData.channelID)) return
    return guild.channels.find(c=> c.id == guildData.channelID).send(embed)
}