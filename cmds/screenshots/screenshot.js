// Screenshot code by Ajam#3536
// Edited for Corona Lanterns by Greep#3022

// require the discord.js module
const { Attachment } = require('discord.js');

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
    return video_ids.join("\n- ");
}

function scr_msg(message,client,prefix){
    const usage=`\nThe proper usage would be: \n\`${prefix+SCR} <video_id> <timestamp>\`\nThe timestamp may be a number (in seconds), a percentage (eg. \`50%\`) or in a format \`hh:mm:ss.xxx\` (where hours, minutes and milliseconds are optional)`
    console.log('Function screenshot() called');
    const args = message.content.split(/ +/).slice(1);    
    if (args.length < 2) {
        let reply = `You didn't provide enough arguments, ${message.author}!`
        message.channel.send(`${reply}${usage}`);
        return;
    }
    var filename = episode_to_filename(args[0]);
    if (filename === undefined) {
        message.reply(`I don\'t have that video id\nAvailable video ids are:\n- ${video_id_str()}`);
        return;
    }
    console.log(filename);
    if (args[1].split(':').some(isNaN) && !('' + args[1]).match(/^[\d.]+%$/)){
        message.channel.send('That is not a valid duration');
        return "usage";
		}
    console.log(filename);
    upload_scr(message,filename,args[1]);
}
function upload_scr(message,filename,timemark){
    const ffmpeg = require('fluent-ffmpeg');
    ffmpeg(filename)
        .on('end', function() {
            console.log('Screenshots taken');
            const attachment = new Attachment('./cmds/screenshots/screenshot.png');
            message.channel.send(`${message.author}\n${timemark}`,attachment);
        })
        .on('error', function(err) {
            console.log('an error happened: ' + err.message);
            message.channel.send('an error happened: ffmpeg()');
        })
        .screenshots({
            timestamps: [timemark],
            filename: 'screenshot.png',
            folder: './cmds/screenshots',
        });
    
}
function screenshot(message, client, prefix) {
    if (message.content.startsWith(prefix+SCR)) {
        scr_msg(message,client,prefix);
    }
};

module.exports = screenshot;