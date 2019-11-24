// All currency commands

function currency_cmds(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext){

    const cur_json = require('./cur.json')

    const cur_owner = require('./cur_owner.js')
    cur_owner(message, client, prefix, cooldowns, cur_json);
    
    const claim = require('./claim.js')
    claim(message, client, prefix, cooldowns, dbl, cur_json);

    const balance = require('./balance.js')
    balance(message, client, prefix, cooldowns, cur_json);

    const market = require('./market.js')
    market(message, client, prefix, cooldowns, cur_json);

    const inventory = require('./inventory.js')
    inventory(message, client, prefix, cooldowns, cur_json);

    const use = require('./use.js')
    use(message, client, prefix, cooldowns, cur_json);
}

module.exports = currency_cmds;