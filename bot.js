const Discord = require('discord.js'); // Defines the Discord.js library
const {Attachment} = require('discord.js') // Defines attachment config (for sending files)
const client = new Discord.Client(); // Makes him say it's for a Discord client (the bot)
const fs = require('fs');
const configfile = "./data/config.json";
const config = JSON.parse(fs.readFileSync(configfile, "utf8")); // Retrieves the contents of the configuration file (the prefix and the login token)
const cooldowns = new Discord.Collection(); //Stores cooldown info for screenshot()
const logchannel = '589337734754336781' //Set a channel for logging
const getlogchannel = () => client.channels.get(logchannel)
const inviteTracker = require('./invite-track.js'); // Define the invite tracker plugin
const shell = require('shelljs'); // Require for executing shell commands (such as git)

const DBL = require("dblapi.js");
const dbl = new DBL(config.dbl_token, {webhookPort: 5000, statsInterval: 3600000});

const Enmap = require("enmap"); // Define enmap, a database integrated with the bot
client.guildPrefix = new Enmap({name: "guildPrefix"}); // Define a new table for custom prefixes

const getGuildPrefix = (guild) => {
    if (!guild.client.guildPrefix.has(guild.id)) guild.client.guildPrefix.set(guild.id, config.prefix) // If the server has not a prefix, give the default one
    return guild.client.guildPrefix.get(guild.id); // Gives the prefix for the server
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

const num_members = require('./counter/member.js');
const num_guilds = require('./counter/guilds.js');
const ver = require('./counter/version.js')

const lant_num_members = () => num_members(client, "562602234265731080", channel_id.members);
const lant_num_guilds = () => num_guilds(client, channel_id.guilds);
const lant_ver = () => ver(client, channel_id.version);

client.on('ready', () => { // If bot was connected:
    const readylog = `Logged in as ${client.user.tag}!\nOn ${functiondate(0)} at ${functiontime(0)}` //Set a text who is said I'm connected!
    console.log(readylog); // Send the text in the console
    dbl.postStats(client.guilds.size)
    getlogchannel().send(readylog); // Send the text in the logging channel
    lant_num_members(); //Set the Member count
    lant_num_guilds(); //Set the guilds count
    lant_ver(); //Set version number in the version number channel
    inviteTracker.ready(client); // Starts the invite tracker plugin
    const loginterval = new Promise(function() { // Automatic log file recreator function
        setInterval(function() {
            const attachment = new Attachment('./logs/bot.log') // Defines the log file to send
            getlogchannel().send('<@330030648456642562> weekly log file:', attachment) // Send the file
            .then(m=>fs.writeFileSync('./logs/bot.log', '')) // Recreates the log file
        }, 604800000); // do this every week
    }).catch(err=>getlogchannel().send('Error during sending the weekly log file: ' + err + '\nThe file was anyway recreated').then(fs.writeFileSync('./logs/bot.log', '')))
    loginterval

    const autopull = new Promise(function() { // Automatic GitHub pull
        setInterval(function() {
            getlogchannel().send('Pulling changes from GitHub...')
            .then(shell.exec('git pull'), function(code, stdout, stderr){
                if (code != 0) return getlogchannel().send(`Error during pulling: \`\`\`${stderr}\`\`\``)
                if (stdout == 'Already up-to-date.') return getlogchannel().send(stdout)
                getlogchannel().send(`:white_check_mark: Successfully pulled!\nRestarting the bot... *(if pm2 want it)*`)
            })
        }, 86400000); // do this every day
    }).catch(err=>getlogchannel().send('Error during auto pull: ' + err))
    autopull
}); // End

client.on('message', message => { // If any message was recived
    try {
    var prefix = getGuildPrefix(message.guild); // Gets the server prefix from the database
    if (message.author.bot) return; // If is a bot, do nothing
    if (message.channel.type === 'dm') return; // If commands was send in DMs, do nothing
    message.content.toLowerCase()

    //Check if user has supported
    const PatreonCheck = require('./support/support_check.js');
    PatreonCheck(message, client, prefix)

    //All commands listed in cmds_index.js
    const cmds_index = require('./cmds/cmds_index.js');
    cmds_index(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl);

    } catch (e) {
        console.log(e)
        getlogchannel().send(`**Message event ERROR** : ${e}`)
    }
});

client.on('guildMemberAdd', member => { // If any member join a server (or guild in Discord language)
    if (member.guild.id === '562602234265731080'|| member.guild.id === '570024448371982373' || member.guild.id === '264445053596991498') { // If the member join Kingdom of Corona, do the welcome script
        const welcome = require('./welcome.js');
        welcome(member, client);
        if (member.guild.id === '562602234265731080') inviteTracker.track(member);
        if (member.guild.id === '562602234265731080'|| member.guild.id === '570024448371982373') console.log(`\n${member.user.tag} joined ${member.guild.name} at ${functiondate(0)} at ${functiontime(0)}\n`) // Send at the console who joined
    }
    lant_num_members(); //Change the members count (+1)
})

client.on('guildMemberRemove', member => { // If any member leave a server (or guild in Discord language)
    if (member.guild.id === '562602234265731080' || member.guild.id === '570024448371982373' || member.guild.id === '264445053596991498') { // If the member leave Kingdom of Corona, do the goodbye script
        const goodbye = require('./goodbye.js');
        goodbye(member, client);
        if (member.guild.id === '562602234265731080'|| member.guild.id === '570024448371982373') console.log(`\n${member.user.tag} left ${member.guild.name} at ${functiondate(0)} at ${functiontime(0)}\n`) // Send at the console who left
    }
    lant_num_members(); //Change the members count (-1)
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
    getlogchannel().send(eventmsg)
})

dbl.on('error', e => {
    const errmsg = `DBL error: ${e}`
    console.log(`[${functiondate(0)} - ${functiontime(0)}] ` + errmsg)
    getlogchannel().send(errmsg)
})

dbl.webhook.on('ready', hook => {
    console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});

dbl.webhook.on('vote', vote => {
    const votelog = `:arrow_up_small: User ${vote.user.tag} ID ${vote.user.id} just voted!`
    console.log(votelog);
    getlogchannel().send(votelog)
});

client.login(config.token); // Login to Discord using token