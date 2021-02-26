const Discord = require('discord.js')
const Enmap = require('enmap')

// All commands listed here

module.exports = function(message, client, prefix, config, functiondate, functiontime, cooldowns, getlogchannel, guildPrefix, userLang, lang, langtext, ThemeparksList){
    if (message.channel.type === 'dm') return
    /*--------------------------------
    -------------- Owner -------------
    --------------------------------*/
    if (message.author.id === config.owner){
        require('./Owner/eval.js')(message, client, prefix, getlogchannel());

        require('./Owner/update.js')(message, client, prefix);

        require('./Owner/shell.js')(message, client, prefix);

        require('./Owner/test-cmds.js')(message, client, prefix, functiondate, functiontime, getlogchannel(), cooldowns);

        require('./Owner/status.js')(message, client, prefix);

        require('./Owner/log.js')(message, client, prefix, config);

        require('./Owner/worlds.js')(message, client, prefix, functiondate, functiontime, getlogchannel())
    }
    /*--------------------------------
    ------------ Currency ------------
    --------------------------------*/
    
    require('./Currency/cur_index.js')(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, guildPrefix, userLang, lang, langtext, config);
    
    /*--------------------------------
    ------------- Worlds -------------
    --------------------------------*/

    require('./Worlds/quotes.js')(message, client, prefix, functiondate, functiontime, getlogchannel(), cooldowns, config);

    require('./Worlds/pics.js')(message, client, prefix, functiondate, functiontime, getlogchannel(), cooldowns, config)

    /*--------------------------------
    --------------- Fun --------------
    --------------------------------*/

    require('./Fun/images/gm-index.js')(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel(), guildPrefix, userLang, lang, langtext, config)

    require('./Fun/8ball.js')(message, client, prefix, functiondate, functiontime, getlogchannel(), cooldowns);

    require('./Fun/ping.js')(message, client, prefix, config);

    require('./Fun/reddit.js')(message, prefix);

    require('./Fun/sus.js')(message, client, prefix);

    /*--------------------------------
    --------------- Util -------------
    --------------------------------*/

    /*  Ded function
    require('./Util/themeparks.js')(message, client, prefix, cooldowns, ThemeparksList);
    */

    require('./Util/wolfram.js')(message, client, prefix, cooldowns);

    require('./Util/img_search.js')(message, client, prefix, functiondate, functiontime, getlogchannel(), cooldowns)

    require('./Util/about.js')(message, client, prefix, lang, langtext, cooldowns);

    require('./Util/prefix.js')(message, client, prefix, guildPrefix, lang, config);

    require('./Util/language.js')(message, client, prefix, userLang, lang, langtext);

    require('./Util/daily-reddit.js')(message, client, prefix, lang);

    require('./Util/geturlofattach.js')(message, client, prefix, lang);
    
    /*--------------------------------
    -------------- Other -------------
    --------------------------------*/

    require('./Other/help.js')(message, client, prefix, lang, cooldowns);

    require('./Other/serverping.js')(message, client, prefix)

    require('./Other/bug.js')(message, client, prefix, lang, getlogchannel());

    require('./Other/thanks.js')(message, client, prefix)


    /*--------------------------------
    --------- Guild-specific ---------
    --------------------------------*/

    require('./Guild/screenshot.js')(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel());

    require('./Guild/lantern.js')(message, client, prefix, getlogchannel(), cooldowns);

    //-----------------------------------------------------------------------------------------------

}