// All currency commands

module.exports = function(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, guildPrefix, userLang, lang, langtext, config){

    const cur_json = require('./cur.json')

    require('./cur_owner.js')(message, client, prefix, cooldowns, cur_json, lang, config);
    
    require('./claim.js')(message, client, prefix, cooldowns, cur_json, lang);

    require('./loot.js')(message, client, prefix, cooldowns, cur_json, lang);

    require('./balance.js')(message, client, prefix, cooldowns, cur_json, lang);

    require('./market.js')(message, client, prefix, cooldowns, cur_json, lang);

    require('./inventory.js')(message, client, prefix, cooldowns, cur_json, lang);

    require('./use.js')(message, client, prefix, cooldowns, cur_json, lang, langtext);
}