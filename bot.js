const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

function functiondate() {
    const datefu = new Date();
    const months = ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
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


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!\nLe ${functiondate(0)} à ${functiontime(0)}`);
});

const prefix = config.prefix
client.on('message', message => {

    const lantern = require('./cmds/lantern.js');
    lantern(message, client, prefix);

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

client.on('guildMemberAdd', member => {
    if (member.guild.id === 562602234265731080) {
        const welcome = require('./welcome.js');
        welcome(member, client);
    }
    console.log(`\n${member.user.tag} joined ${member.guild.name} at ${functiondate(0)} at ${functiontime(0)}\n`)
})

client.on('guildMemberRemove', member => {
    if (member.guild.id === 562602234265731080) {
        const goodbye = require('./goodbye.js');
        goodbye(member, client);
    }
    console.log(`\n${member.user.tag} left ${member.guild.name} at ${functiondate(0)} at ${functiontime(0)}\n`)
})

client.login(config.token);