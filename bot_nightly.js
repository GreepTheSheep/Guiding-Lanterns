const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const cooldowns = new Discord.Collection();

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

const message_count = require('./counter/message.js');
const num_members = require('./counter/member.js');
const frozen_2_countdown = require('./counter/frozen2.js');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!\nOn ${functiondate(0)} at ${functiontime(0)}`);
    client.user.setStatus('dnd');
    num_members(client);
    message_count(client);
    frozen_2_countdown(client);
});
client.on('guildMemberAdd', member => {
    num_members(member.client);
});
client.on('guildMemberRemove', member => {
    num_members(member.client);
});

const prefix = config.prefix_nightly
client.on('message', message => {

    if (message.author.bot) return;

    message_count(message.client);

    const lantern = require('./cmds/lantern.js');
    lantern(message, client, prefix);

    const screenshot = require('./cmds/screenshots/screenshot.js');
    screenshot(message, client, prefix, functiondate, functiontime,cooldowns);

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
