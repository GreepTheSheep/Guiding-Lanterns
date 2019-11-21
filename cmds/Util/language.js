const Discord = require("discord.js");
const fs = require('fs')

function givelist(){
    const readdb = fs.readdirSync('./lang/').filter(file => file.endsWith('.json'))
    const listarray = [];
    for (var file of readdb){
        var langs = file.replace(".json", "")
        listarray.push(langs)
    }
    var list = listarray.join("\`\n- \`")
    return list
}

function setLanguage(message, client, prefix, userLang, lang, langtext){
    try{
    if (message.content.startsWith(prefix + "lang")) {
        const args = message.content.split(/ +/).slice(1);

        if (args.length < 1) return message.reply(lang.lang_check.replace('${langtext}', langtext).replace('${prefix}', prefix));
        
        if (args[0] === 'list'){
            let embed = new Discord.RichEmbed;
            embed.setTitle(lang.lang_list_title)
            .setDescription(`- \`${givelist()}\``)
            .setFooter(lang.lang_usage.replace('${prefix}', prefix))
            .setColor('RANDOM')
            return message.channel.send(embed)
        }

        const readdb = fs.readdirSync('./lang/').filter(file => file.endsWith('.json'))
        const listarray = [];
        for (var file of readdb){
            var langs = file.replace(".json", "")
            listarray.push(langs)
        }
        var list = listarray.join("\`\n- \`")        

        if (list.indexOf(args[0]) >= 0){
            userLang.set(message.author.id, args[0])
            message.channel.send(lang.lang_ok.replace('${args[0]}', args[0]))
        } else {
            message.reply(lang.lang_notonlist)
        }
    }
    } catch (err){
        console.log(err)
        message.channel.send('Error')
    }
}
module.exports = setLanguage;
