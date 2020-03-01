try{
const Discord = require('discord.js'); // Defines the Discord.js library
const {Attachment} = require('discord.js') // Defines attachment config (for sending files)
const client = new Discord.Client({
    fetchAllMembers: true,
    autoReconnect: true
  });
  const fs = require('fs');
  const configfile = "./data/config.json";
  const config = JSON.parse(fs.readFileSync(configfile, "utf8")); // Retrieves the contents of the configuration file (the prefix and the login token)
const execArgs = process.argv.slice(2);
if (execArgs.includes('shard')) {
    console.log('Started with shard')
    console.log = (text) => client.shard.send(text)
}
else {
    console.log('Started without shard')
}
if (execArgs.includes('nightly')) {
    console.log('Started as nightly')
    client.login(config.token_nightly)
}
else {
    console.log('Started as normal')
    client.login(config.token)
}

const channel_id = require('./data/channel_ids.json');
const num_members_guild = require('./counter/guild-member.js');

var getlogchannel
const cooldowns = new Discord.Collection(); //Stores cooldown info for screenshot()
const nightly = '577477992608038912'
var logchannel

const inviteTracker = require('./events/invite-track.js'); // Define the invite tracker plugin
const shell = require('shelljs'); // Require for executing shell commands (such as git)

var dbl;
if (config.dbl_token){
const DBL = require("dblapi.js");
dbl = new DBL(config.dbl_token);
} else dbl = undefined;

const Enmap = require("enmap"); // Define enmap, a database integrated with the bot
const guildPrefix = new Enmap({name: "guildPrefix"}); // Define a new table for custom prefixes
const userLang = new Enmap({name: "user_languages"}); // Define a new table for user languages

const getGuildPrefix = (message) => {
    if (!guildPrefix.has(message.guild.id)) guildPrefix.set(message.guild.id, config.prefix) // If the server has not a prefix, give the default one
    return guildPrefix.get(message.guild.id); // Gives the prefix for the server
}
const getUserLang = (message) => {
    if (!userLang.has(message.author.id)) userLang.set(message.author.id, "en_US")
    return userLang.get(message.author.id);
}
const giveUserLang = (message) => {
    if (!userLang.has(message.author.id)) userLang.set(message.author.id, "en_US")
    return JSON.parse(fs.readFileSync(`./lang/${userLang.get(message.author.id)}.json`, "utf8"));
}

function functiondate() { // The function it gives a date (here the current date)
    const datefu = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = datefu.getFullYear();
    const month = months[datefu.getMonth()];
    const getdate = datefu.getDate();
    const date = getdate + ' ' + month + ' ' + year;
    return date;
}; // End of the function

function functiontime() { // The function it gives a time (here the current time)
    const datefu = new Date();
    const hour = datefu.getHours();
    const min = datefu.getMinutes();
    const sec = datefu.getSeconds();
    const time = hour + ':' + min + ':' + sec;
    return time
} // End of the function


client.on('ready', async () => { // If bot was connected:

    if (client.user.id == config.public) logchannel = config.log_channel //Set a channel for logging
    else if (client.user.id == nightly) logchannel = '589337521553539102' // if nightly send to log nightly
    getlogchannel = () => client.channels.get(logchannel)
    const countdown = require('./counter/countdown.js');
    const num_guilds = require('./counter/guilds.js');
    const ver = require('./counter/version.js')

    if (!getlogchannel) {
        console.error('Discord log channel not found. Sending log in the console (there might be in double)')
        getlogchannel().send = (text) =>  console.log(text)
    }

    if (!client.shard) {
        console.log(`[Client] connected as ${client.user.tag}`)
        getlogchannel().send(`${client.user.tag} is connected`)
    } else {
        console.log(`[Client] connected as ${client.user.tag} in shard ${client.shard.id}`)
        getlogchannel().send(`${client.user.tag} is connected in shard ${client.shard.id}`) 
    }

    if (client.user.id == config.public){

        const lant_num_members_guild = () => num_members_guild(client, "562602234265731080", channel_id.members);
        const lant_num_guilds = () => num_guilds(client, channel_id.guilds);
        const lant_ver = () => ver(client, channel_id.version);
    
        const totalguildsize = await client.shard.fetchClientValues('guilds.size')
        dbl.postStats(totalguildsize.reduce((prev, val) => prev + val, 0))
        const versionCheck = require('./events/ver-check.js');
        versionCheck(client);
        lant_num_members_guild(); //Set the Member count
        lant_num_guilds(); //Set the guilds count
        lant_ver(); //Set version number in the version number channel
        inviteTracker.ready(client); // Starts the invite tracker plugin

        const loginterval = function() { // send automatic log file
            console.log(`[ ${functiondate()} - ${functiontime()} ] Sending log file...`)
            const attachment = new Attachment('./logs/bot.log') // Defines the log file to send
            getlogchannel().send('Daily log file:', attachment) // Send the file
            .then(function(){
                console.log(`[ ${functiondate()} - ${functiontime()} ] Log file sent, erasing old file...`)
                fs.writeFileSync('./logs/bot.log', '') // Recreates the log file
                console.log(`[ ${functiondate()} - ${functiontime()} ] Old log file succefully erased!`)
            })
            .catch(err=>getlogchannel().send('Error during sending the weekly log file: ' + err + '\nThe file was anyway recreated').then(fs.writeFileSync('./logs/bot.log', '')))
        }
        var dailythings = new Promise(function(resolve, reject) {
            setInterval(function(){
                loginterval()
            }, 8.64e+7); // do this every day    
          });
        dailythings
    } else if (client.user.id == nightly){
        const lant_num_members_guild = () => num_members_guild(client, "570024448371982373", channel_id.nightly_members);
        const lant_num_guilds = () => num_guilds(client, channel_id.nightly_guilds);
        client.user.setStatus('dnd');
        client.user.setActivity('with the fire of the lantern');
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
    }
}); // End


client.on('message', message => { // If any message was recived
    try {
    var prefix
    if (client.user.id != nightly && message.channel.type === 'text') prefix = getGuildPrefix(message); // Gets the server prefix from the database
    else if (client.user.id == nightly && message.channel.type === 'text') prefix = '?'
    if (message.channel.type === 'text') var langtext = getUserLang(message); // Gets the user language from the database
    if (message.channel.type === 'text') var lang = giveUserLang(message); // Gets the user language from the database

    if (client.user.id == nightly) console.log(`${message.author.tag}: " ${message.content} " in #${message.channel.name}`)

    if (message.author.bot) return; // If is a bot, do nothing

    //Check if user has supported
    const SupportCheck = require('./support/support_check.js');
    if (client.user.id == config.public) SupportCheck(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl, config)

    //All commands listed in cmds_index.js
    const cmds_index = require('./cmds/cmds_index.js');
    cmds_index(message, client, prefix, config, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext);

    //Lists of mini-games
    const games_index = require('./games/games_index.js');
    games_index(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext);

    } catch (e) {
        console.log(e)
        getlogchannel().send(`**Message event ERROR** : ${e}`)
    }
});

client.on('guildMemberAdd', member => { // If any member join a server (or guild in Discord language)
    if (member.guild.id === '562602234265731080'|| member.guild.id === '570024448371982373') { // If the member join Kingdom of Corona, do the welcome script
        const welcome = require('./events/welcome.js');
        welcome(member, client);
        if (member.guild.id === '562602234265731080') inviteTracker.track(client, member);
        console.log(`\n${member.user.tag} joined ${member.guild.name} at ${functiondate(0)} at ${functiontime(0)}\n`) // Send at the console who joined
    }
    const lant_num_members_guild = () => num_members_guild(client, "570024448371982373", channel_id.nightly_members);
    if (client.user.id == config.public || client.user.id == nightly) lant_num_members_guild(); //Change the members count (+1)
})

client.on('guildMemberRemove', member => { // If any member leave a server (or guild in Discord language)
    if (member.guild.id === '562602234265731080' || member.guild.id === '570024448371982373') { // If the member leave Kingdom of Corona, do the goodbye script
        const goodbye = require('./events/goodbye.js');
        goodbye(member, client);
        console.log(`\n${member.user.tag} left ${member.guild.name} at ${functiondate(0)} at ${functiontime(0)}\n`) // Send at the console who left
    }
    const lant_num_members_guild = () => num_members_guild(client, "570024448371982373", channel_id.nightly_members);
    if (client.user.id == config.public || client.user.id == nightly) lant_num_members_guild(); //Change the members count (-1)
})

client.on('guildCreate', guild => { // If the bot join a server
    const botjoinguildlog = `${client.user.username} joined __${guild.name}__\n*ID: ${guild.id}*` // Set the text
    console.log(`[${functiondate(0)} - ${functiontime(0)}]\n${botjoinguildlog}`) // Send at the console
    getlogchannel().send(botjoinguildlog) // Send at the Discord log channel
    if (client.user.id == config.public || client.user.id == nightly) lant_num_guilds(); // Change the servers count (+1)
})

client.on('guildDelete', guild => { // If the bot leave a server
    const botleftguildlog = `${client.user.username} left __${guild.name}__\n*ID: ${guild.id}*`
    console.log(`[${functiondate(0)} - ${functiontime(0)}]\n${botleftguildlog}`)
    getlogchannel().send(botleftguildlog)
    if (client.user.id == config.public || client.user.id == nightly) lant_num_guilds(); // Change the servers count (-1)
})

client.on('messageReactionAdd', reaction => {
    const starboard = require('./events/starboard.js')
    starboard(client, reaction, getlogchannel(), functiondate(), functiontime())
})

client.on('disconnect', event => {
    var eventcodemsg = 'Event Code Message not set for this code'
    if (event === '1000') eventcodemsg = 'Normal closure'
    if (event === '1001') eventcodemsg = 'Can\'t connect to WebSocket'
    const eventmsg = `Bot down : code ${event}: "${eventcodemsg}"`
    console.log(`[${functiondate(0)} - ${functiontime(0)}] ` + eventmsg)
    getlogchannel().send(eventmsg)
})

client.on('reconnecting', () => {
    const eventmsg = `[${functiondate(0)} - ${functiontime(0)} -- MAIN] reconnecting to WebSocket`
    console.log(eventmsg)
})

client.on('debug', text => {
    if (execArgs.includes('nightly')) {
        console.log(text)
    }
})

dbl.on('error', e => {
    const errmsg = `DBL error: ${e}`
    console.log(`[${functiondate(0)} - ${functiontime(0)}] ` + errmsg)
    getlogchannel().send(errmsg)
})

}catch(e){
console.log(e)
}
