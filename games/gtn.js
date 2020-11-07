const Discord = require('discord.js');
const Enmap = require('enmap');
const GTN_db = new Enmap({name: "gtn"})

const min=1; 
const max=100000;

function gtn(message, client, prefix, functiondate, functiontime, getlogchannel, lang) {
    if (message.content == prefix + 'guessthenumber' || message.content == prefix + 'gtnstart'){
        try{
        var randomnum = Math.random() * (+max - +min) + +min;
        GTN_db.set(message.author.id+'_number', Number(randomnum.toFixed(0)))
        GTN_db.set(message.author.id+'_try', 0)
        if (!GTN_db.has(message.author.id+'_wins')) GTN_db.set(message.author.id+'_wins', 0)
        const startembed = new Discord.MessageEmbed
        startembed  .setTitle('Guess The Number')
                    .setDescription(lang.gtn_startdesc.split('${min}').join(min).split('${max}').join(max).split('${prefix}').join(prefix))
                    .setColor('RANDOM')
                    .setThumbnail('https://cdn.discordapp.com/attachments/419211709803134986/627444691352289300/emote.png')
                    .setFooter(`Guess The Number game started by ${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(startembed)
        }catch(err){
            message.channel.send(lang.error_reported)
            const gtnstarterr = 'GTN start error: '+err
            console.log(`[${functiondate()} - ${functiontime()}] ${gtnstarterr}`)
            getlogchannel.send(gtnstarterr)
        }
    }
    if (message.content.startsWith(prefix + 'gtnguess')){
        try{
            if (!GTN_db.has(message.author.id+'_number')) return message.reply(lang.gtn_notstarted.split('${prefix}').join(prefix))
            const args = message.content.split(/ +/).slice(1);
            if (args.length < 1) return message.reply(lang.gtn_please)
            var dbnumber = GTN_db.get(message.author.id+'_number')
            if (args[0] < dbnumber) {
                message.reply(lang.gtn_lower).then(m=>m.delete(5000))
                GTN_db.set(message.author.id+'_try', GTN_db.get(message.author.id+'_try')+1)
            } else
            if (args[0] > dbnumber) {
                message.reply(lang.gtn_higher).then(m=>m.delete(5000))
                GTN_db.set(message.author.id+'_try', GTN_db.get(message.author.id+'_try')+1)
            } else
            if (args[0] = dbnumber) {
                var tryes = GTN_db.get(message.author.id+'_try')
                GTN_db.set(message.author.id+'_wins', GTN_db.get(message.author.id+'_wins')+1)
                const congratsembed = new Discord.MessageEmbed
                congratsembed   .setTitle('Guess The Number')
                                .setDescription(lang.gtn_win.split('${try}').join(tryes))
                                .setColor('RANDOM')
                                .setThumbnail('https://cdn.discordapp.com/attachments/419211709803134986/627473218181005345/emote.png')
                                .setFooter(`${message.author.tag} win a game of Guess The Number. ${GTN_db.get(message.author.id+'_wins')} wins in total`, message.author.displayAvatarURL())
                message.channel.send(congratsembed)
                GTN_db.set(message.author.id+'_try', 0)
                var randomnum = Math.random() * (+max - +min) + +min;
                GTN_db.set(message.author.id+'_number', Number(randomnum.toFixed(0)))
            } else return;
        }catch(err){
            message.channel.send(lang.error_reported)
            const gtnguesserr = 'GTN guess error: '+err
            console.log(`[${functiondate()} - ${functiontime()}] ${gtnguesserr}`)
            getlogchannel.send(gtnguesserr)
        }
    }
    if (message.content.startsWith(prefix + 'gtnstats')){
        if (message.author.id == '330030648456642562'  || message.author.id === "460348027463401472"){
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            let rUser = message.guild.member(message.mentions.users.first() || client.users.get(args[0]))
            if (!rUser) return message.react('❌')
            message.channel.send(`\`\`\`User: ${rUser.user.username} - ${rUser.user.tag} - ${rUser.id}\n\nGenerated number for him: ${GTN_db.get(rUser.id+'_number')}\nAttempts: ${GTN_db.get(rUser.id+'_try')}\nTotal GTN wins: ${GTN_db.get(rUser.id+'_wins')}\`\`\``)
        } else return;
    }
    if (message.content.startsWith(prefix + 'gtnreset')){
        if (message.author.id == '330030648456642562'  || message.author.id === "460348027463401472"){
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            let rUser = message.guild.member(message.mentions.users.first() || client.users.get(args[0]))
            if (!rUser) return message.react('❌')
            var randomnum = Math.random() * (+max - +min) + +min;
            GTN_db.set(rUser.id+'_number', Number(randomnum.toFixed(0)))
            GTN_db.set(rUser.id+'_try', 0)
            GTN_db.set(rUser.id+'_wins', 0)
            client.users.get(rUser.id).send(lang.gtn_statsresetmsg + ': https://discord.gg/Nzherng')
            message.channel.send(`All stats for ${rUser.user.username} has been reseted`)
        } else return;
    }
}

module.exports = gtn;
