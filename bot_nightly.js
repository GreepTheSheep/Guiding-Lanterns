const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const cooldowns = new Discord.Collection();
const logchannel = '589337521553539102'
const getlogchannel = () => client.channels.get(logchannel)
const inviteTracker = require('./invite-track.js');

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
const countdown = require('./counter/countdown.js');
const num_guilds = require('./counter/guilds.js');

const lant_num_members = () => num_members(client, "570024448371982373", channel_id.nightly_members);
const lant_frozen_II = () => countdown.frozen2(client, channel_id.nightly_frozen2);
const lant_num_guilds = () => num_guilds(client, channel_id.nightly_guilds);


client.on('ready', () => {
    const readylog = `Logged in as ${client.user.tag}!\nOn ${functiondate(0)} at ${functiontime(0)}`
    console.log(readylog);
    getlogchannel().send(readylog);
    client.user.setStatus('dnd');
    lant_num_members();
    lant_num_guilds();
    lant_frozen_II();
    inviteTracker.ready(client);

});
client.on('guildMemberAdd', member => {
    lant_num_members();
    inviteTracker.track(member);
});
client.on('guildMemberRemove', member => {
    lant_num_members();
});

const prefix = config.prefix_nightly
client.on('message', message => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    // const lant_message_count = require('./counter/message.js');
    // lant_message_count(message, client, prefix, channel_id.nightly_messages);

    const SupportCheck = require('./support/support_check.js');
    SupportCheck(message, client, prefix)

    const eval_cmd = require('./cmds/eval.js');
    eval_cmd(message, client, prefix, getlogchannel());

    const wolfram_short = require('./cmds/wolfram_short.js');
    wolfram_short(message, client, prefix);

    const eight_ball = require('./cmds/8ball.js');
    eight_ball(message, client, prefix);

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

    if (message.guild.id == '562602234265731080') {
        const lantern = require('./cmds/lantern.js');
        lantern(message, client, prefix, getlogchannel());
    }
});

client.on('guildCreate', guild => {
    const botjoinguildlog = `${client.user.username} joined __${guild.name}__\n*ID: ${guild.id}*`
    console.log(`[${functiondate(0)} - ${functiontime(0)}]\n${botjoinguildlog}`)
    getlogchannel().send('\n' + botjoinguildlog + '\n')
    lant_num_guilds();
})

client.on('guildDelete', guild => {
    const botleftguildlog = `${client.user.username} left __${guild.name}__\n*ID: ${guild.id}*`
    console.log(`[${functiondate(0)} - ${functiontime(0)}]\n${botleftguildlog}`)
    getlogchannel().send('\n' + botleftguildlog + '\n')
    lant_num_guilds();
})

client.on('debug', (debugevent) => {
    console.log(`[${functiondate(0)} - ${functiontime(0)}] : ${debugevent}`)
})

client.login(config.token_nightly);