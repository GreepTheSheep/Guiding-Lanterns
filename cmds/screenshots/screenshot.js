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

function scr_msg(message,client,prefix, functiondate, functiontime, cooldowns){
    const usage=`\nThe proper usage would be: \n\`${prefix+SCR} <video_id> <timestamp>\`\nThe timestamp may be a number (in seconds), a percentage (eg. \`50%\`) or in a format \`hh:mm:ss.xxx\` (where hours, minutes and milliseconds are optional)\nType \`${prefix+SCR} list\` to get a list of Video IDs`
    console.log(`\n[${functiondate(0)} - ${functiontime(0)}] Function screenshot() called by ${message.author.tag}`);
    const args = message.content.split(/ +/).slice(1);
    if (args[0] === 'list'){
        let embed = new Discord.RichEmbed()
        embed.addField("Available video ids are:", `- \`${video_id_str()}\``)
        .setFooter(`The proper usage would be: "${prefix+SCR} <video_id> <timestamp>"`, `${message.author.displayAvatarURL}`)
        message.reply(embed)
        return;
    }
    if (args.length < 2) {
        let reply = `You didn't provide enough arguments, ${message.author}!`
        message.channel.send(`${reply}${usage}`);
        return;
    }
    var filename = episode_to_filename(args[0]);
    if (filename === undefined) {
        console.log(`Invalid video ID: ${args[0]}`)
        let embed = new Discord.RichEmbed()
        embed.setTitle('ERROR!')
        .setColor('#ff0000')
        .addField("I don\'t have that video id!", `Available video ids are:\n- \`${video_id_str()}\``)
        .setThumbnail("https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png")
        .setFooter(`Type "${prefix}bug <details of your bug>" to send at the devs`, `${message.author.displayAvatarURL}`)
        message.reply(embed)
        return;
    }
    if (args[1].split(':').some(isNaN) && !('' + args[1]).match(/^[\d.]+%$/)){
        console.log(`Invalid Timestamp: ${args[1]}`)
        let reply = `That is not a valid timestamp, ${message.author}!`
        message.channel.send(`${reply}${usage}`);
        return;
    }
    console.log(filename);

    //Implement cooldown
	if (!cooldowns.has(prefix+SCR)) {
		cooldowns.set(prefix+SCR, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(prefix+SCR);
	const cooldownAmount = 10 * 1000; //10 seconds cooldown

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(0)} more second(s) before reusing the \`${prefix+SCR}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	
    
    if (message.member.roles.find(r => r.name === "KEY (Corona's Lanterns)")){ //Override cooldown
        timestamps.delete(message.author.id);
    }
	// End of cooldown implement
	
    upload_scr(message,filename,args[1],args[0], prefix);
}
function upload_scr(message,filename,timemark,displayid, prefix){
    const ffmpeg = require('fluent-ffmpeg');
    ffmpeg(filename)
        .on('end', function() {
            console.log('Screenshots taken, sending...');
            const attachment = new Attachment('./cmds/screenshots/screenshot.png');
            message.channel.send(`${message.author}\nScreenshot of ${displayid} taken at ${timemark}`,attachment);
        })
        .on('error', function(err) {
            console.log('an error happened: ' + err.message);
            let embed = new Discord.RichEmbed()
                embed.setTitle('ERROR!')
                .setColor('#ff0000')
                .addField("Screenshot Error :", `Error during screenshot`)
                .setThumbnail("https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png")
                .setFooter(`Type "${prefix}bug <details of your bug>" to send at the devs`, `${message.author.displayAvatarURL}`)
                message.reply(embed)
        })
        .screenshots({
            timestamps: [timemark],
            filename: 'screenshot.png',
            folder: './cmds/screenshots',
        });
    
}
function screenshot(message, client, prefix, functiondate, functiontime, cooldowns) {
    if (message.content.startsWith(prefix+SCR)) {
        scr_msg(message,client,prefix, functiondate, functiontime, cooldowns);
    }
};

module.exports = screenshot;
