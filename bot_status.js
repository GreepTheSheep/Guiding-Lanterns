const Discord = require('discord.js');
const shell = require('shelljs');
const client = new Discord.Client();
const config = require('./config.json');
const logchannel = '589337734754336781'
const getlogchannel = () => client.channels.get(logchannel)

function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
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

client.on('ready', () => {
    const readylog = `Logged in as ${client.user.tag}!\nOn ${functiondate(0)} at ${functiontime(0)}`
    console.log(readylog);
    //getlogchannel().send(readylog);

});

client.on('message', message => {
    if (message.channel.type !== 'dm') return;

    if(message.content.startsWith('ping')) {
        message.channel.send(":ping_pong: ?")
        .then(m => m.edit(`:ping_pong: !\nLatency is ${m.createdTimestamp - message.createdTimestamp}ms.\nAPI Latency is ${Math.round(client.ping)}ms`));
      }

    if (message.content.startsWith('rescue start')) {
        if (message.author.id == '330030648456642562'){
            const main_script = require('./bot.js')
            message.reply('Booting The Guiding Lanterns from the rescue server...')
            .then(a=>main_script()
            .then(a.edit(':+1: Started!')))
            .catch(err=>console.log(`[RESCUE : ${functiondate()} - ${functiontime()}] ${err}`))
        }else return;
    }
});

client.login(config.token_status)