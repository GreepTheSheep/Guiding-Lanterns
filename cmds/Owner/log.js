const Discord = require('discord.js')
const {Attachment} = require('discord.js')

function claimlog (message, client, prefix, config) {
    if (message.content.startsWith(prefix + 'log')){
        try {
            if (client.user.id == '577477992608038912') var attachment = new Attachment('./logs/bot_nightly.log')
            else var attachment = new Attachment('./logs/bot.log')
            message.channel.send('Log history for ' + client.user.tag, attachment)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = claimlog
