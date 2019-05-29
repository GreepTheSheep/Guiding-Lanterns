const Discord = require('discord.js'); // Defines the Discord.js library
const client = new Discord.Client(); // Makes him say it's for a Discord client (the bot)
const config = require('./config.json'); // Retrieves the contents of the configuration file (the prefix and the login token)
const cooldowns = new Discord.Collection(); //Stores cooldown info for screenshot()

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


client.on('ready', () => { // If bot was connected:
    console.log(`Logged in as ${client.user.tag}!\nOn ${functiondate(0)} at ${functiontime(0)}`); // Sends at the console 'I am connected!'
    client.user.setStatus('Tangled', { type: 'WATCHING' })
}); // End

const prefix = config.prefix // Gets the prefix from the config file
client.on('message', message => { // If any message was recived
    if (message.author.bot) return; // If is a bot, do nothing

    // Begin of all the commands

    const lantern = require('./cmds/lantern.js');
    lantern(message, client, prefix);

    const screenshot = require('./cmds/screenshots/screenshot.js');
    screenshot(message, client, prefix, functiondate, functiontime, cooldowns);

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

    // End
});

client.on('guildMemberAdd', member => { // If any member join a server (or guild in Discord language)
    if (member.guild.id === '562602234265731080') { // If the member join Kingdom of Corona, do the welcome script
        const welcome = require('./welcome.js');
        welcome(member, client);
    }
    console.log(`\n${member.user.tag} joined ${member.guild.name} at ${functiondate(0)} at ${functiontime(0)}\n`) // Send at the console who joined
})

client.on('guildMemberRemove', member => { // If any member leave a server (or guild in Discord language)
    if (member.guild.id === '562602234265731080') { // If the member leave Kingdom of Corona, do the goodbye script
        const goodbye = require('./goodbye.js');
        goodbye(member, client);
    }
    console.log(`\n${member.user.tag} left ${member.guild.name} at ${functiondate(0)} at ${functiontime(0)}\n`) // Send at the console who left
})

client.login(config.token); // Login to Discord using token
