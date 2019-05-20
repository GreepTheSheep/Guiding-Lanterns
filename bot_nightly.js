const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

function functiondate() {
    const datefu = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = datefu.getFullYear();
    const month = months[datefu.getMonth()];
    const getdate = datefu.getDate();
    const date = getdate + ' ' + month + ' ' + year;
    return date;
};

function functiontime() {
    const datefu = new Date();
    const hour = datefu.getHours();
    const min = datefu.getMinutes();
    const sec = datefu.getSeconds();
    const time = hour + ':' + min + ':' + sec;
    return time
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!\nOn ${functiondate(0)} at ${functiontime(0)}`);
});

const prefix = config.prefix
client.on('message', message => {
    if (message.author.user.bot()) return;

    const lantern = require('./cmds/lantern.js');
    lantern(message, client, prefix);

    const pan = require('./cmds/pan.js');
    pan(message, client, prefix);

    const songs = require('./cmds/songs.js');
    songs(message, client, prefix);

    const quotes = require('./cmds/quotes.js');
    quotes(message, client, prefix);

    const say = require('./cmds/say.js');
    say(message, client, prefix);

    const about = require('./cmds/about.js');
    about(message, client, prefix);

    const help = require('./cmds/help.js');
    help(message, client, prefix);

    const bug = require('./cmds/bug.js');
    bug(message, client, prefix);

    const suggest = require('./cmds/suggest.js');
    suggest(message, client, prefix);
});

client.on('debug', (debugevent) => {
    console.log(`[${functiondate(0)} - ${functiontime(0)}] : ${debugevent}`)
})

client.login(config.token_nightly);