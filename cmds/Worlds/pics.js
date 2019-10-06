const Discord = require('discord.js');
const fs = require("fs");

function givelist(){
    const readdb = fs.readdirSync('./data/movies/').filter(file => file.endsWith('pics.json'))
    const listarray = [];
    for (var file of readdb){
        var movie = file.split('-').join(' ').replace("_pics.json", "")
        listarray.push(movie.charAt(0).toUpperCase() + movie.slice(1))
    }
    return listarray.join("\`\n- \`")
}

function picture(message, client, prefix, functiondate, functiontime, getlogchannel){
    if(message.content.startsWith(prefix + "picture")){
        try {
        let args = message.content.split(" ")
        args.shift()
        if (args.length < 1 || args[0] === 'list') {
            let listembed = new Discord.RichEmbed()
            listembed.setColor("#0567DA")
                .addField("Avialble movies are:", `- \`${givelist()}\``)
                .setFooter(`Usage: ${prefix}picture <movie>`)
            return message.channel.send(listembed)
        }
        var picsfile = `./data/movies/${args.join("-").toLowerCase()}_pics.json`
        fs.readFile(picsfile, "utf8",function read(err, data){
            if (err) return message.channel.send("Hmm... I don't found the movie. *Maybe it was eaten, I don't know...*")
            
            var pics = JSON.parse(data);
            function randomItem(array) {
                return array[Math.floor(Math.random() * array.length)];
            }
            let pic = randomItem(pics)

            let embed = new Discord.RichEmbed;
            embed.setAuthor(`No image? Click here!`, message.author.displayAvatarURL, pic)
            .setImage(pic)
            .setColor('RANDOM')
            .setFooter(`If you want to add your own picture, type ${prefix}addpicture`, message.author.displayAvatarURL)
            
             message.channel.send(embed)
        })
        } catch(err) {
            message.reply('Hmm... Something went wrong. Don\'t worry, the report has been send!');
            const errmsg = `Random Tangled Picture request error: ${err}`;
            console.log(`[${functiondate(0)} - ${functiontime(0)}] ${errmsg}`);
            getlogchannel.send(errmsg);
        }
    }

    
    if (message.content.startsWith(prefix + "addpicture")){
        try {
        const args = message.content.split(/ +/).slice(1);
        
        if (args.length < 1) return message.react('❌').then(message.reply(`Usage:\`\`\`${prefix}addpicture <movie> <URL>\`\`\`URLs must ends with:\`\`\`.jpg\n.jpeg\.png\n.gif\`\`\`If you have a picture on your device, use \`${prefix}geturl\` and follow the instructions for get your URL of your image`));
        
        let url = args[1].endsWith('.jpg') || args[1].endsWith('.png') || args[1].endsWith('.gif') ||  args[1].endsWith('.jpeg')
        
        if (url){
        if (message.member.roles.find(r=>r.id === '611908442944176140')) {
            var picsfile = `./data/movies/${args[0].toLowerCase()}_pics.json`
            var pictures = JSON.parse(fs.readFileSync(picsfile, 'utf8'))
            pictures.push(args[1]);
            picsread = JSON.stringify(pictures);
            fs.writeFileSync(picsfile, picsread);
            message.react('✅')
        } else {
            const requestchannel = client.guilds.get('570024448371982373').channels.get('603649742441938944')

            let embed = new Discord.RichEmbed;
            embed.setAuthor(`New request sent by ${message.author.tag}.\nMovie: ${args[0].charAt(0).toUpperCase() + args[0].slice(1)}`, message.author.displayAvatarURL, args[1])
                .setImage(args[1])
                .setColor('RANDOM')
                .setFooter(`User ID: ${message.author.id}`)

            requestchannel.send('<@&611908442944176140>').then(m=>requestchannel.send(embed))
            .then(m=>message.reply('✅ Your picture was requested!'))
            .catch(err=>message.reply('Error ¯\\_(ツ)_/¯\nTry again!'))
        }
        } else message.react('❌').then(message.reply('Sorry, URLs must ends with:\`\`\`.jpg\n.jpeg\n.png\n.gif\`\`\`'));;
        } catch(err) {
            message.reply('Hmm... Something went wrong. Don\'t worry, the report has been send!');
            const errmsg = `New Tangled Picture request error: ${err}`;
            console.log(`[${functiondate(0)} - ${functiontime(0)}] ${errmsg}`);
            getlogchannel.send(errmsg);
        }
    }
}

module.exports = picture;
