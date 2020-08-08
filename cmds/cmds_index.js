const Discord = require('discord.js')
const Enmap = require('enmap')

// All commands listed here

function cmds_index(message, client, prefix, config, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext, ThemeparksList){
    if (message.channel.type === 'dm') return
    /*--------------------------------
    -------------- Owner -------------
    --------------------------------*/
    if (message.author.id === config.owner){
    const eval_cmd = require('./Owner/eval.js');
    eval_cmd(message, client, prefix, getlogchannel());

    const update = require('./Owner/update.js');
    update(message, client, prefix);

    const command = require('./Owner/shell.js');
    command(message, client, prefix);

    const dblInfo = require('./Owner/dblInfo.js');
    dblInfo(message, client, prefix, dbl)

    const testCommands = require('./Owner/test-cmds.js');
    testCommands(message, client, prefix, functiondate, functiontime, getlogchannel(), cooldowns);

    const status = require('./Owner/status.js');
    status(message, client, prefix);

    const claimlog = require('./Owner/log.js');
    claimlog(message, client, prefix, config);

    const worldsmanager = require('./Owner/worlds.js')
    worldsmanager(message, client, prefix, functiondate, functiontime, getlogchannel())
    }
    /*--------------------------------
    ------------ Currency ------------
    --------------------------------*/
    
    const currency_cmds = require('./Currency/cur_index.js');
    currency_cmds(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext, config);
    
    /*--------------------------------
    ------------- Worlds -------------
    --------------------------------*/

    const quotes = require('./Worlds/quotes.js');
    quotes(message, client, prefix, functiondate, functiontime, getlogchannel(), cooldowns, config);

    const picture = require('./Worlds/pics.js')
    picture(message, client, prefix, functiondate, functiontime, getlogchannel(), cooldowns, config)

    /*--------------------------------
    --------------- Fun --------------
    --------------------------------*/

    const eight_ball = require('./Fun/8ball.js');
    eight_ball(message, client, prefix, functiondate, functiontime, getlogchannel(), cooldowns);

    const bot_ping = require('./Fun/ping.js');
    bot_ping(message, client, prefix, config);

    /*--------------------------------
    --------------- Util -------------
    --------------------------------*/

    const parktimes = require('./Util/themeparks.js')
    parktimes(message, client, prefix, cooldowns, ThemeparksList);

    const wolfram = require('./Util/wolfram.js');
    wolfram(message, client, prefix, cooldowns);

    const voted = require('./Util/voted.js');
    voted(message, client, prefix, dbl, cooldowns);

    const dblBotInfo = require('./Util/dbl-botinfo.js');
    dblBotInfo(message, client, prefix, dbl, cooldowns);

    const image_search_request = require('./Util/img_search.js')
    image_search_request(message, client, prefix, functiondate, functiontime, getlogchannel(), dbl, cooldowns)

    const about = require('./Util/about.js');
    about(message, client, prefix, lang, langtext, cooldowns);

    const setPrefix = require('./Util/prefix.js')
    setPrefix(message, client, prefix, guildPrefix, lang, config);

    const setLanguage = require('./Util/language.js')
    setLanguage(message, client, prefix, userLang, lang, langtext);

    const geturlofattachment = require('./Util/geturlofattach.js')
    geturlofattachment(message, client, prefix, lang);

    const speedtest = require('./Util/speedtest.js')
    speedtest(message, client, prefix, getlogchannel(), dbl)
    
    /*--------------------------------
    -------------- Other -------------
    --------------------------------*/

    const help = require('./Other/help.js');
    help(message, client, prefix, lang, cooldowns);

    const serverping = require('./Other/serverping.js');
    serverping(message, client, prefix)

    const bug = require('./Other/bug.js');
    bug(message, client, prefix, lang, getlogchannel());

    const replyToThanks = require('./Other/thanks.js')
    replyToThanks(message, client, prefix)


    /*--------------------------------
    --------- Guild-specific ---------
    --------------------------------*/

    if (message.guild.id == '562602234265731080') { // r/Tangled
        const check_db = new Enmap({name : 'Tangled_verification'})
        if (!check_db.has(message.author.id) && message.member.roles.some(r => r.id === "562608575227363329")) check_db.set(message.author.id, true)
        if (check_db.get(message.author.id) == false) {
            message.member.addRole('675436155453308959')
            message.member.removeRole('562608575227363329')
        }
        
        const welcome = require('./Guild/rules-accept-welcome.js');
        welcome(message, client, prefix, cooldowns);

        const screenshot = require('./Guild/screenshot.js');
        screenshot(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel(), dbl);

    }

    if (message.guild.id == '562602234265731080' || message.guild.id == '600355162279641108'){  // r/Tangled & DisneyFRdiscord 

        const lantern = require('./Guild/lantern.js');
        lantern(message, client, prefix, getlogchannel(), cooldowns);

        const cross_lantern = require('./Guild/cross-lantern.js');
        cross_lantern(message, client, prefix, getlogchannel(), cooldowns);
    
        
    }
    

    //-----------------------------------------------------------------------------------------------

}

module.exports = cmds_index;