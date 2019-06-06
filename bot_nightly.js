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

const num_members = require('./counter/member.js');
const frozen_2_countdown = require('./counter/frozen2.js');
const raps_birthday_countdown = require('./counter/raps_birthday.js')
const channel_id = require('./counter/channel_ids.json');
/*
Dev-testing category channel ids
	585767717387370496 - Messages
	585782174012407848 - Members
	585834618910015491 - Countdown for frozen II
    586086472201797681 - Unused
    586199073292550161 - Raps' Birthday Countdown
*/
const lant_num_members = () => num_members(client,"570024448371982373", channel_id.members);
const lant_frozen_II = () => frozen_2_countdown(client, channel_id.frozen2);
const lant_raps_birth = () => raps_birthday_countdown(client, channel_id.raps_birthday);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!\nOn ${functiondate(0)} at ${functiontime(0)}`);
    client.user.setStatus('dnd');
    lant_num_members();
    lant_frozen_II();
    lant_raps_birth();
});
client.on('guildMemberAdd', member => {
    lant_num_members();
});
client.on('guildMemberRemove', member => {
    lant_num_members();
});

const prefix = config.prefix_nightly
client.on('message', message => {

    if (message.author.bot) return;

    const lant_message_count = require('./counter/message.js');
    lant_message_count(message, client, prefix, channel_id.messages);

    
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
