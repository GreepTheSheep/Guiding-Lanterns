const Discord = require('discord.js');
const {Attachment} = require('discord.js')
const client = new Discord.Client();
const fs = require('fs');
const configfile = "./data/config.json";
const config = JSON.parse(fs.readFileSync(configfile, "utf8"));
const cooldowns = new Discord.Collection();
const logchannel = '589337521553539102'
const getlogchannel = () => client.channels.get(logchannel)
const inviteTracker = require('./invite-track.js');
const dbl = undefined
const guildPrefix = undefined

const Enmap = require("enmap");
const userLang = new Enmap({name: "user_languages"});

const getUserLang = (message) => {
    if (!userLang.has(message.author.id)) userLang.set(message.author.id, "en_US")
    return userLang.get(message.author.id);
}
const giveUserLang = (message) => {
    if (!userLang.has(message.author.id)) userLang.set(message.author.id, "en_US")
    return JSON.parse(fs.readFileSync(`./lang/${userLang.get(message.author.id)}.json`, "utf8"));
}

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

const num_members_guild = require('./counter/guild-member.js');
const countdown = require('./counter/countdown.js');
const num_guilds = require('./counter/guilds.js');

const lant_num_members_guild = () => num_members_guild(client, "570024448371982373", channel_id.nightly_members);
const lant_num_guilds = () => num_guilds(client, channel_id.nightly_guilds);


client.on('ready', () => {
    const readylog = `Logged in as ${client.user.tag}!\nOn ${functiondate(0)} at ${functiontime(0)}`
    console.log(readylog);
    getlogchannel().send(readylog);
    client.user.setStatus('dnd');
    lant_num_members_guild();
    lant_num_guilds();
    const interval = new Promise(function() {
        setInterval(function() {
            const attachment = new Attachment('./logs/bot_nightly.log')
            getlogchannel().send('Log file:', attachment)
            .then(m=>fs.writeFileSync('./logs/bot_nightly.log', ''))
            .catch(err=>getlogchannel().send('Error during sending the log file: ' + err + '\nThe file was anyway recreated').then(fs.writeFileSync('./logs/bot_nightly.log', '')))
        }, 3600000);
    }).catch(err=>getlogchannel().send('Error during sending the log file: ' + err + '\nThe file was anyway recreated').then(fs.writeFileSync('./logs/bot_nightly.log', '')))
    interval
    inviteTracker.ready(client);
});

client.on('guildMemberAdd', member => {
    lant_num_members_guild();
    inviteTracker.track(member);
});
client.on('guildMemberRemove', member => {
    lant_num_members_guild();
});

client.on('message', message => {
    const prefix = config.prefix_nightly;
    var langtext = getUserLang(message);
    var lang = giveUserLang(message);

    if (message.author.bot) return;

    console.log(`${message.author.tag}: " ${message.content} " in #${message.channel.name}`)

    message.content.toLowerCase()

    const SupportCheck = require('./support/support_check.js');
    SupportCheck(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl)

    const games_index = require('./games/games_index.js');
    games_index(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext);

    const cmds_index = require('./cmds/cmds_index.js');
    cmds_index(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext);
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
