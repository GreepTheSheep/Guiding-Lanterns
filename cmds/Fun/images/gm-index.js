const Discord = require('discord.js')

module.exports = function(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, guildPrefix, userLang, lang, langtext, config) {

    require('./text/img-text-index.js')(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, guildPrefix, userLang, lang, langtext, config)

}