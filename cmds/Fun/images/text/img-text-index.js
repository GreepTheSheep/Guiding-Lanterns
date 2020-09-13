const Discord = require('discord.js')

function ing_text_cmds(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext, config) {

    const tangled_raps_book = require('./tangled/tangled-raps-book.js')
    tangled_raps_book(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext, config)

}

module.exports = ing_text_cmds