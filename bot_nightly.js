const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const cooldowns = new Discord.Collection();
const logchannel = '589337521553539102'
const getlogchannel = () => client.channels.get(logchannel)

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

const channel_id = require('./counter/channel_ids.json');

const num_members = require('./counter/member.js');
const frozen_2_countdown = require('./counter/frozen2.js');

const lant_num_members = () => num_members(client,"570024448371982373", channel_id.nightly_members);
const lant_frozen_II = () => frozen_2_countdown(client, channel_id.nightly_frozen2);

client.on('ready', () => {
    const readylog = `Logged in as ${client.user.tag}!\nOn ${functiondate(0)} at ${functiontime(0)}`
    console.log(readylog);
    getlogchannel().send(readylog);
    client.user.setStatus('dnd');
    lant_num_members();
    lant_frozen_II();
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
    if (message.channel.type === 'dm') return;

    const lant_message_count = require('./counter/message.js');
    lant_message_count(message, client, prefix, channel_id.nightly_messages);

    const PatreonCheck = require('./Patreon/patreon_check.js');
    PatreonCheck(message, client, prefix)
    
    const eval_cmd = require('./cmds/eval.js');
    eval_cmd(message, client, prefix, getlogchannel());
    
    const lantern = require('./cmds/lantern.js');
    lantern(message, client, prefix, getlogchannel());

    const screenshot = require('./cmds/screenshots/screenshot.js');
    screenshot(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel());

    const quotes = require('./cmds/quotes.js');
    quotes(message, client, prefix);

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
