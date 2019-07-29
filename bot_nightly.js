const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const configfile = "./data/config.json";
const config = JSON.parse(fs.readFileSync(configfile, "utf8"));
const cooldowns = new Discord.Collection();
const logchannel = '589337521553539102'
const getlogchannel = () => client.channels.get(logchannel)
const inviteTracker = require('./invite-track.js');
const dbl = undefined

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

const channel_id = require('./data/channel_ids.json');

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
    const interval = new Promise(function() {
        setInterval(function() {fs.writeFileSync('./logs/bot_nightly.log', '')}, 1000);
    });
    interval
    inviteTracker.ready(client);
});

client.on('guildMemberAdd', member => {
    lant_num_members();
    inviteTracker.track(member);
});
client.on('guildMemberRemove', member => {
    lant_num_members();
});

client.on('message', message => {
    const prefix = config.prefix_nightly;

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    console.log(`${message.author.tag}: " ${message.content} " in #${message.channel.name}`)

    message.content.toLowerCase()

    const SupportCheck = require('./support/support_check.js');
    SupportCheck(message, client, prefix)

    const cmds_index = require('./cmds/cmds_index.js');
    cmds_index(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl);
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
