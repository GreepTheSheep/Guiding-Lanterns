// Screenshot code by Ajam#3536
// Edited for Corona Lanterns by Greep#3022

// require the discord.js module
const { Client, Attachment } = require('discord.js');
const episode = require('./episode.json');
// create a new Discord client
const client = new Client();

const checkTime = i => i < 10 ? "0" + i : i;
const SCR = 'screenshot';

function scr_msg(message){
    console.log('Function screenshot() called');
    const args = message.content.split(" ").slice(1);    
    if (args.length < 2) {
            message.channel.send(`${message.author}\nusage: ${SCRcmd} <S02E__> <seconds>`);
        return;
    }
	//
	//
	//Time to seconds conversion
    var a = args[1].split(':');
    if (a.some(isNaN)){
        message.channel.send('Not time')
        return;
    }
    var runsec=+(a.reduce((acc,time) => (60 * acc) + +time));
	//end
    console.log(runsec);
    var filename;
    switch(args[0].toUpperCase().replace(/S0/,'S').replace(/E0/,'E')) {
        /*
        case 'S2E1':
            filename=episode.S02E01;
            break;
        case 'S2E2':
            filename=episode.S02E02;
            break;
        case 'S2E3':
            filename=episode.S02E03;
            break;
        case 'S2E4':
            filename=episode.S02E04;
            break;
        case 'S2E5':
            filename=episode.S02E05;
            break;
        case 'S2E6':
            filename=episode.S02E06;
            break;
        case 'S2E7':
            filename=episode.S02E07;
            break;
        case 'S2E8':
            filename=episode.S02E08;
            break;
        case 'S2E9':
            filename=episode.S02E09;
            break;
        case 'S2E10':
            filename=episode.S02E10;
            break;
        case 'S2E11':
            filename=episode.S02E11;
            break;
        case 'S2E12':
            filename=episode.S02E12;
            break;
        case 'S2E13':
            filename=episode.S02E13;
            break;
            */
        case 'S2E14':
            filename=episode.S02E14;
            break;
/*
        case 'S2E15':
            filename=episode.S02E15;
            break;
        case 'S2E16':
            filename=episode.S02E16;
            break;
        case 'S2E17':
            filename=episode.S02E17;
            break;
        case 'S2E18':
            filename=episode.S02E18;
            break;
        case 'S2E19':
            filename=episode.S02E19;
            break;
        case 'S2E20':
            filename=episode.S02E20;
            break;
        case 'S02E21':
            filename=episode.S02E21;
            break;
        case 'S02E22':
            filename=episode.S02E21;
            break;
        */
        default:
            message.channel.send(`${message.author}\nusage: ${SCRcmd} <S02E14> <seconds>`);
            return;
        }
    console.log(filename);
    upload_scr(message,filename,runsec);
}
function upload_scr(message,filename,runsec){
    var min_ = Math.floor(runsec / 60);
    var sec = checkTime(Math.floor(runsec - min_ * 60));
    const ffmpeg = require('fluent-ffmpeg');
    ffmpeg(filename)
        .on('end', function() {
            console.log('Screenshots taken');
            const attachment = new Attachment('./screenshots/screenshot.png');
            message.channel.send(`${message.author}\n${min_}:${sec}`,attachment);
        })
        .screenshots({
            timestamps: [runsec],
            filename: 'screenshot.png',
            folder: './cmds/screenshots/taken',
            });
    
}
function screenshot(message, client, prefix) {
    if (message.content.startsWith(prefix+SCR)) {
        scr_msg(message);
        return;
    }
};

module.exports = screenshot;