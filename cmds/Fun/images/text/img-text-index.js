const Discord = require('discord.js')

module.exports = function(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, guildPrefix, userLang, lang, langtext, config) {

    require('./tangled/tangled-raps-book.js')(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, guildPrefix, userLang, lang, langtext, config)

    require('./tangled/tangled-cass-paper.js')(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, guildPrefix, userLang, lang, langtext, config)

}