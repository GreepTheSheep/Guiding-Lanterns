const Discord = require('discord.js')
const request = require('request')
const moment = require('moment')
const tz = require('moment-timezone')

module.exports = function(message, client, prefix, config){
    if (message.content.toLowerCase().startsWith(prefix + 'reddit')){
        let args = message.content.split(" ");
        args.shift();
        request(`https://www.reddit.com${args.length < 1 ? '' : `/r/${args[0]}`}/random.json`, function (error, response, body) {
            if (error){
                console.error('error:', error);
            } else {
                console.log('statusCode:', response && response.statusCode);
                console.log('body:', body);
                if (Object.prototype.toString.call(body) === '[object Array]'){
                    if (body[0] == undefined) return message.reply('Subreddit not found, check the name')
                    var resData = body[0].data.children[0].data
                }else if (Object.prototype.toString.call(body) === '[object Object]'){
                    if (json.error) return message.reply('Error ' + json.error + ': ' + json.message)
                    else return message.reply('Error :(')
                }
                if (!resData) return message.reply('No post with an image was found in this subreddit')
                let embed = new Discord.MessageEmbed
                embed.setAuthor(`Random post of r/${resData.subreddit}`)
                .setTitle(resData.title)
                .setFooter(`By u/${resData.author}${resData.author_flair_text !== null ? ` - ${resData.author_flair_text}` : ''}`)
                .setImage(resData.url)
                if (args.length < 1) message.channel.send(`Better usage: \`${prefix}reddit [subreddit name]\``, embed)
                else message.channel.send(embed)
            }
        });
    }
}