const Discord = require("discord.js");
const fs = require('fs')

function givelist(){
    const readdb = fs.readdirSync('./lang').filter(file => file.endsWith('.json'))
    const listarray = [];
    for (var file of readdb){
        var langs = file.replace(".json", "")
        listarray.push(langs)
    }
    return listarray.join("\`\n- \`")
}

function setLanguage(message, client, prefix, userLang, lang){
    if (message.content.startsWith(prefix + "lang")) {
        const args = message.content.split(/ +/).slice(1);

        if (args.length < 1) return message.reply(`Your language is set to \`${lang}\`.\nYou can change your language with \`${prefix}language list\``);
        
        if (args[0] == 'list'){
            let embed = new Discord.RichEmbed;
            embed.setTitle('List of languages')
            .setDescription(`- \`${givelist()}\``)
            .setFooter(`Use ${prefix}language <Your language> to set your language`)
        } else {
            if (args[0] instanceof listarray){
                userLang.set(message.author.id, args[0])
                message.channel.send(`Language \`${args.join("")}\` set.`)
            } else {
                message.reply('This lang is not on the list. Please check!')
            }
        }
    }
}
module.exports = setLanguage;
