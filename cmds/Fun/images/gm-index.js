const Discord = require('discord.js')

function ing_cmds(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, guildPrefix, userLang, lang, langtext, config) {

    const ing_text_cmds = require('./text/img-text-index.js')
    ing_text_cmds(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, guildPrefix, userLang, lang, langtext, config)

}

module.exports = ing_cmds