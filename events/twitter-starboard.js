const Discord = require('discord.js');
const fs = require('fs');
const configfile = '../data/config.json'
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

async function twitter_starboard (client, reaction, logchannel, date, time){
    try{
        if (reaction.emoji.name === '⭐' && reaction.count === 1) {

            // We use the this.extension function to see if there is anything attached to the message.
            const image = reaction.message.attachments.size > 0 ? await this.extension(reaction, message.attachments.array()[0].url) : ''; 
  
            // Load your image
            var data = fs.readFileSync(image);

            // Make post request on media endpoint. Pass file data as media parameter
            twitter.post('media/upload', {media: data}, function(error, media, response) {
                if (!error) {
                    // Lets tweet it
                    var status = {
                        status: reaction.message.content,
                        media_ids: media.media_id_string // Pass the media id string
                    }

                    client.post('statuses/update', status, function(error, tweet, response) {
                        if (!error) {
                            console.log(tweet);
                        }
                    });
                } else if (error) {
                    const errmsg = `Twitter Starboard POST error : ${error}`
                    console.log(`[${date} - ${time}] ${errmsg}`)
                    logchannel.send(errmsg)
                }
            });
        }
    } catch (err) {
        const errmsg = `Twitter Starboard POST error : ${err}`
        console.log(`[${date} - ${time}] ${errmsg}`)
        logchannel.send(errmsg)
    }
}

module.exports = twitter_starboard