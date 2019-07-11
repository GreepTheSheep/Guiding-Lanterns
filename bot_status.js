const Discord = require('discord.js');
const main_script = require('./bot.js')
const client = new Discord.Client();
const config = require('./config.json');
const logchannel = '589337734754336781'
const getlogchannel = () => client.channels.get(logchannel)
const guidinglanternsid = '569624646475972608'
const glid = guidinglanternsid

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
    console.log(`Logged in as ${client.user.tag}!\nOn ${functiondate(0)} at ${functiontime(0)}`);
    getlogchannel().send(`Status and auto-restart bot started`);

    if (client.users.get(glid).presence.status == 'online'){
        console.log('The Guiding Lanterns is online!')
        client.user.setStatus('idle')
        client.user.setActivity('Bot online', { type: 'WATCHING' });
    } else if (client.users.get(glid).presence.status == 'offline'){
        console.log('The Guiding Lanterns is offline...')
    } else if (client.users.get(glid).presence.status == 'dnd'){
        console.log('The Guiding Lanterns is online! Its status is set to Do Not Disturb')
    } else if (client.users.get(glid).presence.status == 'idle'){
        console.log('The Guiding Lanterns is online! Its status is set to idle')
    }
});

client.on('presenceUpdate', member => {
    if (member.id === glid){
        if (member.user.presence.status == 'online'){
            console.log(`${member.user.username} is online!`)
        } else if (member.user.presence.status == 'offline'){
            client.user.setStatus('dnd')
            client.user.setActivity('Bot OFFLINE', { type: 'WATCHING' });
            const offlinemsg = `${member.user.username} is offline...\nTrying to restart the bot from the rescue server`
            console.log(offlinemsg)
            getlogchannel().send(`<@!330030648456642562> ${offlinemsg}\n\`\`\`Starting The Guiding Lanterns from the rescue server...\`\`\``)
            .then(a=>main_script)
            .then(client.user.setActivity('Bot started automatically from the rescue server', { type: 'STREAMING', url:"https://twitch.tv/greeplive" }))
            .catch(err => getlogchannel().send('ERROR: ' + err))
            //client.users.get('330030648456642562').send(`${member.user.username} is offline...`);
        } else if (member.user.presence.status == 'dnd'){
            console.log(`${member.user.username} is online! Its status is set to Do Not Disturb`)
        } else if (member.user.presence.status == 'idle'){
            console.log(`${member.user.username} is online! Its status is set to idle`)
        }
    }
})

client.on('message', message => {
    if (message.channel.type !== 'dm') return;

    if(message.content.startsWith('ping')) {
        message.channel.send(":ping_pong: ?")
        .then(m => m.edit(`:ping_pong: !\nLatency is ${m.createdTimestamp - message.createdTimestamp}ms.\nAPI Latency is ${Math.round(client.ping)}ms`));
      }
    if (message.author.id == '330030648456642562'){
        if (message.content.startsWith('rescue start')) {
            getlogchannel().send(`**Forced by command**\n\`\`\`Starting The Guiding Lanterns from the rescue server...\`\`\``);
            message.reply('Booting The Guiding Lanterns from the rescue server...')
            .then(a=>main_script
            .then(a.edit(':+1: Started!')))
            .then(client.user.setActivity('Bot started by force from the rescue server', { type: 'STREAMING', url:"https://twitch.tv/greeplive" }))
            .catch(err=>console.log(`[RESCUE : ${functiondate()} - ${functiontime()}] ${err}`))
        }

        if (message.content.startsWith('eval')) {
            try {
                const args = message.content.split(" ").slice(1);
                if (args.length < 1) return message.react('❌');
                const code = args.join(" ");
                let evaled = eval(code);
    
                if (typeof evaled !== "string"){
                    evaled = require("util").inspect(evaled);
                }
                message.reply(`EVAL:\n\`\`\`javascript\n${code}\`\`\`\nNode Result: \`${clean(evaled)}\``);
            } catch (err) {
                const args = message.content.split(" ").slice(1);
                const code = args.join(" ");
                message.reply(`EVAL **__ERROR__**\n\`\`\`javascript\n${code}\`\`\`\nNode Result: \`${clean(err)}\``);
            }
        }

    }else return;
});

client.login(config.token_status)