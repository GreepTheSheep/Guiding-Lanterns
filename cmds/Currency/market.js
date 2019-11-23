const Discord = require('discord.js')
const Enmap = require('enmap')

function itemList(cur_json){
    const array = [];
    var id = 0
    for (var item of cur_json.item){
        array.push(`[ ${id} ] ${item.name} - 📥 ${item.cost} ${cur_json.cur.symbol} - 📤 ${item.sell} ${cur_json.cur.symbol}`)
        id++
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
        } else if (args [0] === 'buy' || args[0] === 'sell'){
            if (!args[1]) return message.reply(`Usage: ${prefix}market <buy|sell> <ID> [count]`)
            if (isNaN(args[1])) return message.reply('You have not given a correct ID, check with \`' + prefix + 'market list\`')
            const inv = new Enmap({name:"cur_inventory"})
            var count;
            if (!args[2]){
                count = 1
            } else if (args[2]) {
                if (isNaN(args[1])) count = 1
                else if (!isNaN(args[1])) count = args[2]
            }
            
            if (args[0] === 'buy'){
                if (bal.get(message.author.id) < cur_json.item[args[1]].cost) return message.reply('you don\'t have enough money to buy that.')

                if (!inv.has(`${message.author.id}_${args[1]}`)) inv.set(`${message.author.id}_${args[1]}`, count)
                else if (inv.has(`${message.author.id}_${args[1]}`)) inv.set(`${message.author.id}_${args[1]}`, inv.get(message.author.id) + count)
                
                bal.set(message.author.id, bal.get(message.author.id) - cur_json.item[args[1]].cost)

                message.reply(`You just bought a *__${cur_json.item[args[1]].name}__** for **${cur_json.item[args[1]].cost} ${cur_json.cur.symbol}**, enjoy!`)

            } else if (args[0] === 'sell'){

            }
            

        } else return message.reply(`Usage: ${prefix}market <buy|sell> <ID> [count]`)
    }
}

module.exports = market;