const Discord = require('discord.js')
const Enmap = require('enmap')

function itemList(cur_json){
    const array = [];
    for (var item of cur_json.item){
        array.push(`[ ${item.id} ] ${item.name} - 📥 ${item.cost} ${cur_json.cur.symbol} - 📤 ${item.sell} ${cur_json.cur.symbol}`)
    }
    return array.join('\n')
}

function market(message, client, prefix, cooldowns, cur_json){
    if(message.content.startsWith(prefix + "market") || message.content.startsWith(prefix + "shop")) {

        //Implement cooldown
        if (!cooldowns.has(prefix + 'market')) {
            cooldowns.set(prefix + 'market', new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(prefix + 'market');
        const cooldownAmount = 1 * 60 * 1000; // 1 minute cooldown

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                let totalSeconds = (expirationTime - now) / 1000;
                let days = Math.floor(totalSeconds / 86400);
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = totalSeconds % 60;
                return message.reply(`please wait ${hours.toFixed(0)} hour(s), ${minutes.toFixed(0)} minute(s) and ${seconds.toFixed(0)} second(s) before reusing the \`${prefix+'market'}\` command.`)
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


        if (message.author.id === '330030648456642562') { //Override cooldown
            timestamps.delete(message.author.id);
        }
        // End of cooldown implement
        const bal = new Enmap({name:"cur_balance"})

        if (!bal.has(message.author.id)) bal.set(message.author.id, 0)
       
        let args = message.content.split(" ")
        args.shift()
        if (args.length < 1 || args[0] === 'list') {
            let listembed = new Discord.RichEmbed()
            listembed.setTitle(cur_json.name[2])
                .setColor("#0567DA")
                .addField("Avialble items:", itemList(cur_json))
                .setFooter(`Your balance: ${bal.get(message.author.id)} ${cur_json.cur.symbol}\n📥 is the price of buying, 📤 is the price of selling\nUsage: ${prefix}market <buy|sell> <ID>`)
            return message.channel.send(listembed)
        }
    }
}

module.exports = market;