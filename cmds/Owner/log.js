const Discord = require('discord.js')
const {Attachment} = require('discord.js')

function claimlog (message, client, prefix) {
    if (message.content.startsWith(prefix + 'log')){
        try {
            if (message.author.id === '330030648456642562'  || message.author.id === "460348027463401472"){
                if (client.user.id == '577477992608038912') var attachment = new Attachment('./logs/bot_nightly.log')
                if (client.user.id == '569624646475972608') var attachment = new Attachment('./logs/bot.log')
                message.channel.send('Log history for ' + client.user.tag, attachment)
            } else return;
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = claimlog
