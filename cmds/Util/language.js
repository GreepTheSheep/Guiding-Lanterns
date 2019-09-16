const Discord = require("discord.js");
const fs = require('fs')

function givelist(){
    const readdb = fs.readdirSync('./lang/').filter(file => file.endsWith('.json'))
    const listarray = [];
    for (var file of readdb){
        var langs = file.replace(".json", "")
        listarray.push(langs)
    }
    return listarray.join("\`\n- \`")
}

function setLanguage(message, client, prefix, userLang, lang, langtext){
    try{
    if (message.content.startsWith(prefix + "lang")) {
        const args = message.content.split(/ +/).slice(1);

        if (args.length < 1) return message.reply(lang.lang_check);
        
        if (args[0] == 'list'){
            let embed = new Discord.RichEmbed;
            embed.setTitle(lang.lang_list_title)
            .setDescription(`- \`${givelist()}\``)
            .setFooter(lang.lang_usage)
        } else {
            if (args[0] instanceof listarray){
                userLang.set(message.author.id, args[0])
                message.channel.send(lang.lang_ok)
            } else {
                message.reply(lang.lang_notonlist)
            }
        }
    }
    } catch (err){
        console.log(err)
        message.channel.send('Error')
    }
}
module.exports = setLanguage;
