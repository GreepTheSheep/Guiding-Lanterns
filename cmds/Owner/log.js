const Discord = require('discord.js')
const {MessageAttachment} = require('discord.js')
const fs = require('fs')

module.exports = async function(message, client, prefix, config) {
    if (message.content.startsWith(prefix + 'log')){
        try {
            let args = message.content.split(" ")
            args.shift()
            if (args.length < 1){
                if (client.user.id == '577477992608038912') var attachment = new MessageAttachment('./logs/bot_nightly.log')
                else var attachment = new MessageAttachment('./logs/bot.log')
                return message.channel.send('Log history for ' + client.user.tag, attachment)
            }
            if (args[0].toLowerCase() == 'reset'){
                if (client.user.id == '577477992608038912') var attachment = new MessageAttachment('./logs/bot_nightly.log')
                else var attachment = new MessageAttachment('./logs/bot.log')
                await message.channel.send('Log history for ' + client.user.tag + '\nThe file will be erased', attachment)
                if (client.user.id == '577477992608038912') fs.writeFileSync('./logs/bot_nightly.log', '')
                else fs.writeFileSync('./logs/bot.log', '')
                console.log('Log file erased by command')
            }
                
        } catch (err) {
            console.log(err)
        }
    }
}
