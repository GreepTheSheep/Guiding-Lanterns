// All commands listed here

function games_index(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, guildPrefix, userLang, lang, langtext){
    if (message.channel.type === 'dm') return


    const gtn = require('./gtn.js')
    gtn(message, client, prefix, functiondate, functiontime, getlogchannel(), lang)


    /*--------------------------------
    --------- Guild-specific ---------
    --------------------------------*/

    if (message.guild.id == '562602234265731080') { // Kingdom of Corona
        return;
    }

    //-----------------------------------------------------------------------------------------------

}

module.exports = games_index;