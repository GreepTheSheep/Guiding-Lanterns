const Discord = require('discord.js');
const fs = require('fs');
const configfile = '../data/config.json'
const config = JSON.parse(fs.readFileSync(configfile, "utf8"));

const Twitter = require('twitter')
const twitter_tokens = {
    consumer_key:        config.consumer_key,
    consumer_secret:     config.consumer_secret,
    access_token:        config.access_token_key,
    access_token_key:    config.access_token_key,
    access_token_secret: config.access_token_secret
};
const twitter = new Twitter(twitter_tokens)

function twitter_starboard (message, client, getlogchannel){

}

module.exports = twitter_starboard