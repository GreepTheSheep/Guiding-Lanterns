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
const cooldowns = new Discord.Collection(); //Stores cooldown info for screenshot()
const logchannel = '589337734754336781' //Set a channel for logging
const getlogchannel = () => client.channels.get(logchannel)
const inviteTracker = require('./events/invite-track.js'); // Define the invite tracker plugin
const shell = require('shelljs'); // Require for executing shell commands (such as git)

const DBL = require("dblapi.js");
const dbl = new DBL(config.dbl_token);

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

const channel_id = require('./data/channel_ids.json');

const num_members_guild = require('./counter/guild-member.js');
const countdown = require('./counter/countdown.js');
const num_members = require('./counter/users.js')
const num_guilds = require('./counter/guilds.js');
const ver = require('./counter/version.js')

const lant_num_members_guild = () => num_members_guild(client, "562602234265731080", channel_id.members);
const lant_num_users = () => num_members(client, channel_id.users)
const lant_num_guilds = () => num_guilds(client, channel_id.guilds);
const lant_ver = () => ver(client, channel_id.version);

const lant_frozen_II = () => countdown.frozen2(client, channel_id.frozen2);

client.on('ready', () => { // If bot was connected:
    const readylog = `Logged in as ${client.user.tag}\nOn ${functiondate(0)} at ${functiontime(0)}` //Set a text who is said I'm connected!
    console.log(readylog); // Send the text in the console
    dbl.postStats(client.guilds.size)
    getlogchannel().send(readylog).catch(); // Send the text in the logging channel
    lant_num_members_guild(); //Set the Member count
    lant_num_users();
    lant_num_guilds(); //Set the guilds count
    lant_ver(); //Set version number in the version number channel
    lant_frozen_II(); //Frozen 2 countdown
    inviteTracker.ready(client); // Starts the invite tracker plugin
    const loginterval = new Promise(function() { // Automatic log file recreator function
        setInterval(function() {
            const attachment = new Attachment('./logs/bot.log') // Defines the log file to send
            getlogchannel().send('Daily log file:', attachment) // Send the file
            .then(m=>fs.writeFileSync('./logs/bot.log', '')) // Recreates the log file
        }, 8.64e+7); // do this every day
    }).catch(err=>getlogchannel().send('Error during sending the weekly log file: ' + err + '\nThe file was anyway recreated').then(fs.writeFileSync('./logs/bot.log', '')))
    loginterval

    const autopull = new Promise(function() { // Automatic GitHub pull
        setInterval(function() {
            getlogchannel().send('Pulling changes from GitHub...')
            .then(m=>shell.exec('git pull'), function(code, stdout, stderr){
                if (code != 0) return m.edit(`Error during pulling: \`\`\`${stderr}\`\`\``)
                m.edit(`\`\`\`${stdout}\`\`\` :white_check_mark:`)
            })
        }, 8.64e+7); // Do this every day
    }).catch(err=>getlogchannel().send('Error during auto pull: ' + err))
    autopull
}); // End

client.on('message', message => { // If any message was recived
    try {
    if (message.channel.type === 'text') var prefix = getGuildPrefix(message); // Gets the server prefix from the database
    if (message.channel.type === 'text') var langtext = getUserLang(message); // Gets the user language from the database
    if (message.channel.type === 'text') var lang = giveUserLang(message); // Gets the user language from the database
    if (message.author.bot) return; // If is a bot, do nothing

    //Check if user has supported
    const PatreonCheck = require('./support/support_check.js');
    PatreonCheck(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl)

    //All commands listed in cmds_index.js
    const cmds_index = require('./cmds/cmds_index.js');
    cmds_index(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext);

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
        if (member.guild.id === '562602234265731080') inviteTracker.track(member);
        console.log(`\n${member.user.tag} joined ${member.guild.name} at ${functiondate(0)} at ${functiontime(0)}\n`) // Send at the console who joined
    }
    lant_num_members_guild(); //Change the members count (+1)
})

client.on('guildMemberRemove', member => { // If any member leave a server (or guild in Discord language)
    if (member.guild.id === '562602234265731080' || member.guild.id === '570024448371982373') { // If the member leave Kingdom of Corona, do the goodbye script
        const goodbye = require('./events/goodbye.js');
        goodbye(member, client);
        console.log(`\n${member.user.tag} left ${member.guild.name} at ${functiondate(0)} at ${functiontime(0)}\n`) // Send at the console who left
    }
    lant_num_members_guild(); //Change the members count (-1)
})

client.on('guildCreate', guild => { // If the bot join a server
    const botjoinguildlog = `${client.user.username} joined __${guild.name}__\n*ID: ${guild.id}*` // Set the text
    console.log(`[${functiondate(0)} - ${functiontime(0)}]\n${botjoinguildlog}`) // Send at the console
    getlogchannel().send(botjoinguildlog) // Send at the Discord log channel
    lant_num_guilds(); // Change the servers count (+1)
})

client.on('guildDelete', guild => { // If the bot leave a server
    const botleftguildlog = `${client.user.username} left __${guild.name}__\n*ID: ${guild.id}*`
    console.log(`[${functiondate(0)} - ${functiontime(0)}]\n${botleftguildlog}`)
    getlogchannel().send(botleftguildlog)
    lant_num_guilds(); // Change the servers count (-1)
})

client.on('messageReactionAdd', reaction => {
    const twitter_starboard = require('./events/twitter-starboard.js')
    twitter_starboard(client, reaction, getlogchannel(), functiondate(), functiontime())
})

client.on('disconnect', event => {
    var eventcodemsg = 'Event Code Message not set for this code'
    if (event = '1000') eventcodemsg = 'Normal closure'
    if (event = '1001') eventcodemsg = 'Can\'t connect to WebSocket'
    const eventmsg = `Bot down : code ${event}: "${eventcodemsg}"`
    console.log(`[${functiondate(0)} - ${functiontime(0)}] ` + eventmsg)
    getlogchannel().send(eventmsg)
})

client.on('reconnecting', () => {
    const eventmsg = `reconnecting to WebSocket`
    console.log(`[${functiondate(0)} - ${functiontime(0)}] ` + eventmsg)
})

dbl.on('error', e => {
    const errmsg = `DBL error: ${e}`
    console.log(`[${functiondate(0)} - ${functiontime(0)}] ` + errmsg)
    getlogchannel().send(errmsg)
})

client.login(config.token)

}catch(e){
//console.log(e)
}
