// Screenshot code by Ajam#3536
// Edited for Corona Lanterns by Greep#3022

// require the discord.js module
const { Attachment } = require('discord.js');
const Discord = require('discord.js');

const checkTime = i => i < 10 ? "0" + i : i;
const SCR = 'screenshot';

function episode_to_filename(epi) {
    const episode = require('./episode.json');
    const epi_comp=epi.toUpperCase().replace(/S0/,'S').replace(/E0/,'E')
    for (epNojson in episode) {
        var epNojson_comp = epNojson.toUpperCase().replace(/S0/,'S').replace(/E0/,'E')
        if (epi_comp === epNojson_comp){
            return episode[epNojson];
        }
    }
}
function video_id_str(){
    const episode = require('./episode.json');
    const video_ids = [];
    for (epNojson in episode) {
        video_ids.push(epNojson);
    }
    return video_ids.join("\`\n- \`");
}

function scr_msg(message,client,prefix, functiondate, functiontime){
    const usage=`\nThe proper usage would be: \n\`${prefix+SCR} <video_id> <timestamp>\`\nThe timestamp may be a number (in seconds), a percentage (eg. \`50%\`) or in a format \`hh:mm:ss.xxx\` (where hours, minutes and milliseconds are optional)`
    console.log(`[${functiondate(0)} - ${functiontime(0)}] Function screenshot() called by ${message.author.tag}`);
    const args = message.content.split(/ +/).slice(1);    
    if (args.length < 2) {
        let reply = `You didn't provide enough arguments, ${message.author}!`
        message.channel.send(`${reply}${usage}`);
        return;
    }
    var filename = episode_to_filename(args[0]);
    if (filename === undefined) {
        let embed = new Discord.RichEmbed()
        embed.setTitle('ERROR!')
        .setColor('#ff0000')
        .addField("I don\'t have that video id!", `Available video ids are:\n- \`${video_id_str()}\``)
        .setFooter(`Type "!bug <details of your bug>" to send at the devs`, `${message.author.avatarURL}`)
        message.reply(embed)
        return;
    }
    if (args[1].split(':').some(isNaN) && !('' + args[1]).match(/^[\d.]+%$/)){
        message.channel.send('That is not a valid duration');
        return "usage";
		}
    console.log(filename);
    upload_scr(message,filename,args[1],args[0]);
}
function upload_scr(message,filename,timemark,displayid){
    const ffmpeg = require('fluent-ffmpeg');
    ffmpeg(filename)
        .on('end', function() {
            console.log('Screenshots taken');
            const attachment = new Attachment('./cmds/screenshots/screenshot.png');
            message.channel.send(`${message.author}\nScreenshot of ${displayid} taken at ${timemark}`,attachment);
        })
        .on('error', function(err) {
            console.log('an error happened: ' + err.message);
            let embed = new Discord.RichEmbed()
                embed.setTitle('ERROR!')
                .setColor('#ff0000')
                .addField("Screenshot Error :", `Error returned an:\n${err.message}`)
                .setFooter(`Type "!bug <details of your bug>" to send at the devs`, `${message.author.avatarURL}`)
                message.reply(embed)
        })
        .screenshots({
            timestamps: [timemark],
            filename: 'screenshot.png',
            folder: './cmds/screenshots',
        });
    
}
function screenshot(message, client, prefix, functiondate, functiontime) {
    if (message.content.startsWith(prefix+SCR)) {
        scr_msg(message,client,prefix, functiondate, functiontime);
    }
};

module.exports = screenshot;