const Discord = require("discord.js");

function bug(message, client, prefix, lang, logchannel) {

    if (message.content.startsWith(prefix + 'bug')) {
        message.reply(lang.bug_text + '\n> https://github.com/Guiding-Lanterns/Guiding-Lanterns/issues/new').then(
        message.channel.send(lang.bug_discord + '\n> https://discord.gg/Nzherng')
        .catch(err=>{
            message.reply(lang.error);
            console.log(err)
        }))
    }
}

module.exports = bug;