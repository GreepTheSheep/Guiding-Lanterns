const Discord = require('discord.js')
const request = require('request')
const moment = require('moment')
const tz = require('moment-timezone')

function checkImage(message, args, prefix, tries){
    if (tries >= 40) return message.reply('No post with an image was found in this subreddit')
    request(`https://www.reddit.com${args.length < 1 ? '' : `/r/${args[0]}`}/random.json`, function (error, response, body) {
        if (error){
            return message.channel.send('error:'+ error);
        } else {
            body = JSON.parse(body)
            if (Object.prototype.toString.call(body) === '[object Array]'){
                if (body[0] == undefined) return message.reply('Subreddit not found, check the name')
                resData = body[0].data.children[0].data
                if (resData.post_hint !== 'image'){
                    tries++
                    checkImage(message, args, prefix, tries)
                } else postEmbed(message, args, prefix, resData)
            } else if (Object.prototype.toString.call(body) === '[object Object]'){
                if (json.error) return message.reply('Error ' + json.error + ': ' + json.message)
                else return message.reply('Error :(')
            }
        }
    });
}
function postEmbed(message, args, prefix, resData){
    let embed = new Discord.MessageEmbed
    embed.setAuthor(`Random post of r/${resData.subreddit}`)
    .setTitle(resData.title.substring(0, 250))
    .setDescription(`[Open link](https://reddit.com${resData.permalink})`)
    .setFooter(`By u/${resData.author}${resData.author_flair_text !== null ? ` - ${resData.author_flair_text}` : ''}`)
    .setImage(resData.url)
    if (args.length < 1) return message.channel.send(`Better usage: \`${prefix}reddit [subreddit name]\``, embed)
    else return message.channel.send(embed)
}

module.exports = function(message, prefix){
    if (message.content.toLowerCase().startsWith(prefix + 'reddit')){
        let args = message.content.split(" ");
        args.shift();
        var tries = 0
        checkImage(message, args, prefix, tries)
    }
}