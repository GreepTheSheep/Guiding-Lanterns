const Discord = require('discord.js')
const fs = require('fs')
const configfile = "./data/config.json";
const config = JSON.parse(fs.readFileSync(configfile, "utf8"));

const GImages = require('google-images');
const GoogleImages = new GImages(config.googleimage_CSEID, config.googleimage_APIKEY);

function image_search(message, client, prefix, dbl) {

}


function image_search_request(message, client, prefix, dbl) {

}

module.exports = image_search_request;