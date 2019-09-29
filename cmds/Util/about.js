const Discord = require('discord.js');
const fs = require('fs')
const package = JSON.parse(fs.readFileSync('./package.json', "utf8"));
const os = require('os');
const shell = require('shelljs');

function about(message, client, prefix, lang, logchannel) {
    if (message.content.startsWith(prefix + 'about')) {
        message.channel.send('Fetching versions, please wait...').then(m=>{
            var discordjsver = shell.exec('npm view discord.js version', {silent:true}).stdout.replace('\n','')
            if (!discordjsver) var discordjsver = 'not found'
            var nodever = shell.exec('node -v', {silent:true}).stdout.replace('v','').replace('\n','')
            if (!nodever) var discordjsver = 'not found'

            let aboutembed = new Discord.RichEmbed()
            aboutembed.setColor("#9C01C4")
            .setTitle('About ' + client.user.tag)
            .addField('Changelog - ' + package.version, package.changelog, true)
            .addField("Cast:", lang.about_cast, true)
            .addField(lang.about_tech, `${lang.about_libary} [Discord.js](https://discord.js.org) (Version ${discordjsver})\n${lang.about_nodeversion} ${nodever}\n${lang.about_delay} ${Math.round(client.ping)} ms\n${lang.about_os} ${os.type}: ${os.release}\n${lang.about_ram} ${Math.round(os.freemem() / 1024 / 1000)}/${Math.round(os.totalmem() / 1024 / 1000)} MB [${(Math.round(os.freemem() / 1024 / 1000) * 100 / Math.round(os.totalmem() / 1024 / 1000)).toFixed(0)}%] (${client.user.username} : ${Math.round(process.memoryUsage().rss / 1024 / 1000)} MB [${(Math.round(process.memoryUsage().rss / 1024 / 1000) * 100 / Math.round(os.totalmem() / 1024 / 1000)).toFixed(0)}%])`)
            .addField(lang.about_links, `**__[${lang.about_invitebot}](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=67488968)__**\n[**${lang.about_support}**](https://discord.gg/5QCQpr9)\n[${lang.about_github}](https://github.com/Guiding-Lanterns/Guiding-Lanterns)\n[${lang.about_supportlink}](https://donatebot.io/checkout/570024448371982373?buyer=${message.author.id})`, true)
            .setThumbnail(client.user.displayAvatarURL)
            .setFooter(client.user.username, client.user.displayAvatarURL)
            message.channel.send(aboutembed).then(m.delete())
        })
        
    }
    if (message.content.startsWith(prefix + 'invite')){
        let inviteembed = new Discord.RichEmbed()
        inviteembed.setColor("#9C01C4")
                    .setTitle(lang.invite_title)
                    .setDescription(lang.invite_desc + `\n\nhttps://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=67488968`)
                    .setURL(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=67488968`)
                    .setFooter(client.user.username, client.user.displayAvatarURL)
        message.channel.send(inviteembed)
    }
}

module.exports = about;
