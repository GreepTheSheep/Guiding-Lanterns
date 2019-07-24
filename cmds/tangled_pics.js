const Discord = require('discord.js');
const fs = require("fs");
const picsfile = './data/tangled_pics.json'

function tangled_picture(message, client, prefix, functiondate, functiontime, getlogchannel){
    var picsread = fs.readFileSync(picsfile, "utf8");
    var pictures = JSON.parse(picsread);

    if(message.content.startsWith(prefix + "tangledpicture")){
        try {
        function randomItem(array) {
            return array[Math.floor(Math.random() * array.length)];
        }
        let pic = randomItem(pictures)

        let embed = new Discord.RichEmbed;
        embed.setAuthor(`No image? Click here!`, message.author.displayAvatarURL, pic)
            .setImage(pic)
            .setColor('RANDOM')
            .setFooter(`If you want to add your own picture, type ${prefix}addtangledpicture`, message.author.displayAvatarURL)
            
        message.channel.send(embed)
        } catch(err) {
            message.reply('Hmm... Something went wrong. Don\'t worry, the report has been send!');
            const errmsg = `Random Tangled Picture request error: ${err}`;
            console.log(`[${functiondate(0)} - ${functiontime(0)}] ${errmsg}`);
            getlogchannel().send(errmsg);
        }
    }

    if (message.content.startsWith(prefix + "addtangledpicture")){
        try {
        let args = message.content.split(" ")
        args.shift()
        if (args.length < 1) return message.react('❌').then(message.reply(`Usage:\`\`\`${prefix}addtangledpicture <URL>\`\`\`URLs must ends with:\`\`\`.jpg\n.png\n.gif\n.bmp\`\`\``));
        let url = args[0].startsWith("http://") || args[0].startsWith("https://")
        if (url){
        if (message.author.id == '330030648456642562') {
            pictures.push(`${args.join("")}`);
            picsread = JSON.stringify(pictures);
            fs.writeFileSync(picsfile, picsread);
            message.react('✅')
        } else {
            const requestchannel = client.guilds.get('570024448371982373').channels.get('603649742441938944')

            let embed = new Discord.RichEmbed;
            embed.setAuthor(`New request sent by ${message.author.tag}`, message.author.displayAvatarURL, args.join(""))
                .setImage(args.join(""))
                .setColor('RANDOM')
                .setFooter(`User ID: ${message.author.id}`, message.author.displayAvatarURL)

            requestchannel.send('<@330030648456642562>').then(m=>requestchannel.send(embed))
            .then(m=>message.reply('✅ Your picture was requested!'))
            .catch(err=>message.reply('Error ¯\\_(ツ)_/¯\nTry again!'))
        }
        } else message.react('❌').then(message.reply('You must entrer a URL!\nURLs starts with \`http://\` or \`https://\`'));;
        } catch(err) {
            message.reply('Hmm... Something went wrong. Don\'t worry, the report has been send!');
            const errmsg = `New Tangled Picture request error: ${err}`;
            console.log(`[${functiondate(0)} - ${functiontime(0)}] ${errmsg}`);
            getlogchannel().send(errmsg);
        }
    }
}

module.exports = tangled_picture;