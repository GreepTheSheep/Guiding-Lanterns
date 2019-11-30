// All currency commands

function currency_cmds(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext){

    const cur_json = require('./cur.json')

    const cur_owner = require('./cur_owner.js')
    cur_owner(message, client, prefix, cooldowns, cur_json, lang);
    
    const claim = require('./claim.js')
    claim(message, client, prefix, cooldowns, dbl, cur_json, lang);

    const loot = require('./loot.js')
    loot(message, client, prefix, cooldowns, cur_json, lang);

    const balance = require('./balance.js')
    balance(message, client, prefix, cooldowns, cur_json, lang);

    const market = require('./market.js')
    market(message, client, prefix, cooldowns, cur_json, lang);

    const inventory = require('./inventory.js')
    inventory(message, client, prefix, cooldowns, cur_json, lang);

    const use = require('./use.js')
    use(message, client, prefix, cooldowns, cur_json, lang, langtext);
}

module.exports = currency_cmds;