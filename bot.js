const Discord = require('discord.js'); // Defines the Discord.js library
const client = new Discord.Client(); // Makes him say it's for a Discord client (the bot)
const config = require('./config.json'); // Retrieves the contents of the configuration file (the prefix and the login token)
const cooldowns = new Discord.Collection(); //Stores cooldown info for screenshot()
const logchannel = '589337734754336781' //Set a channel for logging
const getlogchannel = () => client.channels.get(logchannel)
const inviteTracker = require('./invite-track.js'); // Define the invite tracker plugin

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

const channel_id = require('./counter/channel_ids.json');

const num_members = require('./counter/member.js');

const lant_num_members = () => num_members(client,"562602234265731080", channel_id.members);

client.on('ready', () => { // If bot was connected:
    const readylog = `Logged in as ${client.user.tag}!\nOn ${functiondate(0)} at ${functiontime(0)}` //Set a text who is said I'm connected!
    console.log(readylog); // Send the text in the console
    getlogchannel().send(readylog); // Send the text in the logging channel
    lant_num_members(); //Set the Member count
    inviteTracker.ready(client); // Starts the invite tracker plugin
}); // End

const prefix = config.prefix // Gets the prefix from the config file
client.on('message', message => { // If any message was recived
    if (message.author.bot) return; // If is a bot, do nothing
    if (message.channel.type === 'dm') return; // If commands was send in DMs, do nothing

    //Messages count, aviable in the Dev Server
    const lant_message_count = require('./counter/message.js');
    lant_message_count(message, client, prefix, channel_id.messages);

    //Check if user has supported in Patreon
    const PatreonCheck = require('./Patreon/patreon_check.js');
    PatreonCheck(message, client, prefix)
    
    // Begin of all the commands

    const lantern = require('./cmds/lantern.js');
    lantern(message, client, prefix, getlogchannel());

    const screenshot = require('./cmds/screenshots/screenshot.js');
    screenshot(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel());

    const wolfram_short = require('./cmds/wolfram_short.js');
    wolfram_short(message, client, prefix);

    const wolfram = require('./cmds/wolfram.js');
    wolfram(message, client, prefix);

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

    // End
});

client.on('guildMemberAdd', member => { // If any member join a server (or guild in Discord language)
    if (member.guild.id === '562602234265731080') { // If the member join Kingdom of Corona, do the welcome script
        const welcome = require('./welcome.js');
        welcome(member, client);
        inviteTracker.track(member);
        console.log(`\n${member.user.tag} joined ${member.guild.name} at ${functiondate(0)} at ${functiontime(0)}\n`) // Send at the console who joined
    }
    lant_num_members(); //Change the members count (+1)
})

client.on('guildMemberRemove', member => { // If any member leave a server (or guild in Discord language)
    if (member.guild.id === '562602234265731080') { // If the member leave Kingdom of Corona, do the goodbye script
        const goodbye = require('./goodbye.js');
        goodbye(member, client);
        console.log(`\n${member.user.tag} left ${member.guild.name} at ${functiondate(0)} at ${functiontime(0)}\n`) // Send at the console who left
    }
    lant_num_members(); //Change the members count (-1)
})

client.login(config.token); // Login to Discord using token