const Discord = require('discord.js')
const Enmap = require('enmap')

function getRandom(){
    const min1=1;
    const max1=10;
    const min2=11; 
    const max2=49;
    const min3=50; 
    const max3=100;
    var num = Math.random();
    var output;
    if (num < 0.66) output = 0;  //probability 0.66 (66%) to get 0
    else if (num < 0.86) output = Math.random() * (+max1 - +min1) + +min1; //probability 0.20 (20%) to get between 1 and 10
    else if (num < 0.99) output = Math.random() * (+max2 - +min2) + +min2; // probability 0.13 (13%) to get between 11 and 49
    else output = Math.random() * (+max3 - +min3) + +min3;  //probability 0.01 (1%) to get between 50 and 100
    return output.toFixed(0)
  }

module.exports = function(message, client, prefix, cooldowns, cur_json, lang){
    if (message.content.startsWith(prefix + 'loot')){
        //Implement cooldown
        if (!cooldowns.has(prefix + 'loot')) {
            cooldowns.set(prefix + 'loot', new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(prefix + 'loot');
        const cooldownAmount = 2 * 60 * 60 * 1000; // 2 hours cooldown

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                let totalSeconds = (expirationTime - now) / 1000;
                let days = Math.floor(totalSeconds / 86400);
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = totalSeconds % 60;
                return message.reply(`please wait ${hours.toFixed(0)} hour(s), ${minutes.toFixed(0)} minute(s) and ${seconds.toFixed(0)} second(s) before reusing the \`${prefix+'loot'}\` command.`)
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


        if (message.author.id === '330030648456642562') { //Override cooldown
            timestamps.delete(message.author.id);
        }
        // End of cooldown implement
        const bal = new Enmap({name:"cur_balance"})

        var random = Number(getRandom())

        bal.set(message.author.id, bal.get(message.author.id) + random)

        if (random === 0) return message.reply(lang.loot_nothing)
        else if (random < 20) return message.reply(lang.loot_min.replace('${money}', `${random} ${cur_json.cur.symbol}`))
        else if (random >= 20) return message.reply(lang.loot_max.replace('${money}', `${random} ${cur_json.cur.symbol}`))
    }
}