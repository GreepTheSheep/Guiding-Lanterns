const Discord = require('discord.js')
const request = require('request');
const download = require('download')
const fs = require('fs');
const configfile = "./data/config.json";
const config = JSON.parse(fs.readFileSync(configfile, "utf8"));

async function removebgscr(message, client, prefix, logchannel, date, time, lang){
    const args = message.content.split(/ +/).slice(1);
    var attachurl
    if (args.length > 0) attachurl = args[0]
    if (message.attachments.size > 0) attachurl = message.attachments.array()[0].url
    if (!attachurl) return message.reply('you have not given a image')
    let valid = attachurl.endsWith('.jpg') || attachurl.endsWith('.png') || attachurl.endsWith('.gif')
    if (!valid) return message.reply('files types must be:\`\`\`.jpg\n.png\n.gif\`\`\`')
    await download(attachurl, `./data/${message.guild.id}/original.${attachurl.substr(attachurl.length - 3)}`)
    request.post({
        url: 'https://api.remove.bg/v1.0/removebg',
        formData: {
            image_file: fs.readFileSync(`./data/${message.guild.id}/original.${attachurl.substr(attachurl.length - 3)}`),
            size: 'auto',
        },
        headers: {
            'X-Api-Key': config.removebg_key
        },
        encoding: null
    }, function(error, response, body) {
        if(error) return function(){
            const errormsg = `Remove.bg Request failed: ${error}`
            console.error(`[${date()} - ${time()}] ${errormsg}`);
            logchannel.send(errormsg)
            message.channel.send(lang.error_reported)
        }
        if(response.statusCode != 200) return function(){$
            const errormsg = `Remove.bg Request failed: Error ${response.statusCode}: ${body.toString('utf8')}`
            console.error(`[${date()} - ${time()}] ${errormsg}`);
            logchannel.send(errormsg)
            message.channel.send(lang.error_reported)
        }
         
        fs.writeFileSync(`./data/${message.guild.id}/no-bg.png`, body);
        const attachment = new Discord.Attachment(`./data/${message.guild.id}/no-bg.png`)
        message.channel.send(attachment).then(m=>fs.unlinkSync(`./data/${message.guild.id}/`))
        });
}

function removebg(message, client, prefix, logchannel, date, time, lang, dbl){
    if (message.content.startsWith(prefix + 'removebg') || message.content.startsWith(prefix + 'nobg') || message.content.startsWith(prefix + 'nobackground')){
        try{
        if (dbl == undefined) return removebgscr(message, client, prefix, logchannel, date, time, lang)
        dbl.hasVoted(message.author.id).then(voted => {
            if (voted) {
                removebgscr(message, client, prefix, logchannel, date, time, lang)
            } else {
                let embed = new Discord.RichEmbed()
                embed.setTitle('ERROR!')
                .setColor('#ff0000')
                .addField("This command is vote locked!", `Have you voted for the bot?\nVoting for the bot keeps the dev. of the bot alive :wink:\n\nhttps://discordbots.org/bot/569624646475972608/vote \n\n(Synchronization with the vote and bot can take about 5 minutes, you can check if you voted with \`${prefix}didivote\`)`)
                .setFooter(`Type "${prefix}bug <details of your bug>" to send at the devs`, `${message.author.displayAvatarURL}`)
                message.channel.send(embed)
            }
        });
    } catch (error) {
        const errormsg = `Remove.bg Request failed: ${error}`
        console.error(`[${date()} - ${time()}] ${errormsg}`);
        logchannel.send(errormsg)
        message.channel.send(lang.error_reported)
    }
    }
}

module.exports = removebg