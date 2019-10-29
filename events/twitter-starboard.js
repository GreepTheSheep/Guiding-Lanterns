const Discord = require('discord.js');
const fs = require('fs');
const download = require('download')
const Enmap = require('enmap')
const tweets_setting = new Enmap({name: "twitter"});
const configfile = './data/config.json'
const config = JSON.parse(fs.readFileSync(configfile, "utf8"));

const Twitter = require('twitter')
const twitter_tokens = {
    consumer_key:        config.twitter_consumer_key,
    consumer_secret:     config.twitter_consumer_secret,
    access_token:        config.twitter_access_token_key,
    access_token_key:    config.twitter_access_token_key,
    access_token_secret: config.twitter_access_token_secret
};
const twitter = new Twitter(twitter_tokens)

const reactions = 3

function twitter_starboard (client, reaction, logchannel, date, time){
    try{
        if (reaction.emoji.name === '⭐' && reaction.count === reactions) {

            if (!tweets_setting.has(reaction.message.guild.id)) tweets_setting.set(reaction.message.guild.id, true)

            if (tweets_setting.get(reaction.message.guild.id) === true){
                if (reaction.message.attachments.size > 0){
                    
                    download(reaction.message.attachments.array()[0].url, './data')
                    .then(function(){
                        // Load your image
                        var data = fs.readFileSync('./data'+ reaction.message.attachments.array()[0].url.slice(76));

                        // Make post request on media endpoint. Pass file data as media parameter
                        twitter.post('media/upload', {media: data}, function(error, media, response) {
                            if (!error) {
                                // Lets tweet it
                                var status = {
                                    status: reaction.message.content.slice(0, 280),
                                    media_ids: media.media_id_string // Pass the media id string
                                }

                                twitter.post('statuses/update', status, function(error, tweet, response) {
                                    if (!error) {
                                        logchannel.send(`New tweet posted: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`)
                                        let embed = new Discord.RichEmbed
                                        embed.setTitle('Twitter Starboard')
                                        .setColor('#5EA9DD')
                                        .setDescription(`${reactions} ⭐ on [this message](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.id})`)
                                        .setFooter(`!twitter for more info`)
                                        reaction.message.channel.send(embed)
                                        .then(m=>reaction.message.channel.send(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`)
                                        .then(m2=>fs.unlinkSync('./data'+ reaction.message.attachments.array()[0].url.slice(76))))
                                    }
                                });
                            } else if (error) {
                                const errmsg = `Twitter Starboard POST error : ${error}`
                                console.log(`[${date} - ${time}] ${errmsg}`)
                                logchannel.send(errmsg)
                            }
                        });
                    })    
                } else {
                    twitter.post('statuses/update', {status: reaction.message.content.slice(0, 280)}, function(error, tweet, response) {
                        if (!error) {
                            logchannel.send(`New tweet posted: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`)

                            let embed = new Discord.RichEmbed
                            embed.setTitle('Twitter Starboard')
                            .setColor('#5EA9DD')
                            .setDescription(`${reactions} ⭐ on [this message](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.id})`)
                            .setFooter(`!twitter for more info`)
                            reaction.message.channel.send(embed)
                            .then(m=>reaction.message.channel.send(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`))
                        }
                    });
                }
            }
        }
    } catch (err) {
        const errmsg = `Twitter Starboard POST error : ${err}`
        console.log(`[${date} - ${time}] ${errmsg}`)
        logchannel.send(errmsg)
    }
}

module.exports = twitter_starboard