const Discord = require('discord.js');
const fs = require('fs')
const package = JSON.parse(fs.readFileSync('./package.json', "utf8"));
const os = require('os');
const shell = require('shelljs');
const translate = require('translate')
const configfile = "./data/config.json";
const config = JSON.parse(fs.readFileSync(configfile, "utf8"));
translate.engine = 'yandex'
translate.key = config.translate_key

async function about(message, client, prefix, lang, langtext, cooldowns) {
    if (message.content.startsWith(prefix + 'about')) {
        //Implement cooldown
        if (!cooldowns.has(prefix + 'about')) {
            cooldowns.set(prefix + 'about', new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(prefix + 'about');
        const cooldownAmount = 60000;

        if (timestamps.has(message.guild.id)) {
            const expirationTime = timestamps.get(message.guild.id) + cooldownAmount;

            if (now < expirationTime) {
                let totalSeconds = (expirationTime - now) / 1000;
                let days = Math.floor(totalSeconds / 86400);
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = totalSeconds % 60;
                return;
            }
        }

        timestamps.set(message.guild.id, now);
        setTimeout(() => timestamps.delete(message.guild.id), cooldownAmount);


        if (message.member.roles.find(r => r.name === "KEY (The Guiding Lanterns)")) { //Override cooldown
            timestamps.delete(message.guild.id);
        }
        // End of cooldown implement

        var translatedlang = langtext.charAt(0).toLowerCase() + langtext.charAt(1).toLowerCase()
        var translatedchangelog = await translate(package.changelog, {from: 'en', to: translatedlang})

        message.channel.send('Fetching versions, please wait...').then(m=>{
            var discordjsver = shell.exec('npm view discord.js version', {silent:true}).stdout.replace('\n','')
            if (!discordjsver) var discordjsver = 'not found'
            var nodever = shell.exec('node -v', {silent:true}).stdout.replace('v','').replace('\n','')
            if (!nodever) var nodever = 'not found'
            var sysuptime = shell.exec('uptime --pretty', {silent:true}).stdout.replace('up ','').replace('\n','')
            if (!nodever) var sysuptime = 'not found'

            let totalSeconds = (client.uptime) / 1000;
            let weeks = Math.floor(totalSeconds / 604800)
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;

            let aboutembed = new Discord.RichEmbed()
            aboutembed.setColor("#9C01C4")
            .setTitle('About ' + client.user.tag)
            .addField('Changelog - ' + package.version, translatedchangelog)
            .addField('Uptime:', `🤖: ${weeks} weeks, ${days} days, ${hours} hours, ${minutes} minutes\n💻: ${sysuptime}`)
            .addField("Cast:", lang.about_cast)
            .addField(lang.about_tech, `${lang.about_libary} [Discord.js](https://discord.js.org) (Version ${discordjsver})\n${lang.about_nodeversion} ${nodever}\nShard ${client.shard.id}. Total shards: ${client.shard.count}\n${lang.about_os} ${os.type}: ${os.release}\n${lang.about_ram} ${Math.round(os.freemem() / 1024 / 1000)}/${Math.round(os.totalmem() / 1024 / 1000)} MB [${(Math.round(os.freemem() / 1024 / 1000) * 100 / Math.round(os.totalmem() / 1024 / 1000)).toFixed(0)}%] (${client.user.username} : ${Math.round(process.memoryUsage().rss / 1024 / 1000)} MB [${(Math.round(process.memoryUsage().rss / 1024 / 1000) * 100 / Math.round(os.totalmem() / 1024 / 1000)).toFixed(0)}%])`)
            .addField(lang.about_links, `**__[${lang.about_invitebot}](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=67488968)__**\n[**${lang.about_support}**](https://discord.gg/5QCQpr9)\n[${lang.about_website}](https://guiding-lanterns.greep.cf)\n[${lang.about_statuspage}](https://status.guiding-lanterns.greep.cf)\n[${lang.about_github}](https://github.com/Guiding-Lanterns/Guiding-Lanterns)\n[${lang.about_supportlink}](https://donatebot.io/checkout/570024448371982373?buyer=${message.author.id})`)
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
