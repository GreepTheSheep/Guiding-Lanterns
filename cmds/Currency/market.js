const Discord = require('discord.js')
const Enmap = require('enmap')

function itemList(message, cur_json){
    const inv = new Enmap({name:"cur_inventory"})
    const array = [];
    var id = 0
    for (var item of cur_json.item){
        if (!inv.has(`${message.author.id}_${id}`)) inv.set(`${message.author.id}_${id}`, 0)
        array.push(`[ ${id} ] ${item.name} (📦 ${inv.get(`${message.author.id}_${id}`)}) - 📥 ${item.cost} ${cur_json.cur.symbol} - 📤 ${item.sell} ${cur_json.cur.symbol}`)
        id++
    }
    return array.join('\n')
}

function market(message, client, prefix, cooldowns, cur_json, lang){
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
                return message.reply(`please wait ${seconds.toFixed(0)} second(s) before reusing the \`${prefix+'market'}\` command.`)
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
                .addField("Avialble items:", itemList(message, cur_json))
                .setFooter(lang.shop_list_footer.split('${bal}').join(`${bal.get(message.author.id)} ${cur_json.cur.symbol}`) + `\nUsage: ${prefix}market <buy|sell> <ID>`)
            return message.channel.send(listembed)
        } else if (args [0] === 'buy' || args[0] === 'sell'){
            if (!args[1]) return message.reply(`Usage: ${prefix}market <buy|sell> <ID> [count]`)
            if (isNaN(Number(args[1]))) return message.reply(lang.shop_not_correct_id.split('${command}').join(`\`${prefix}market list\``))
            if (!cur_json.item[Number(args[1])]) return message.reply(lang.shop_not_exist)
            const inv = new Enmap({name:"cur_inventory"})
            var count;
            
            if (!args[2]){
                count = 1
            } else if (args[2]) {
                if (isNaN(Number(args[2]))) count = 1
                else if (!isNaN(Number(args[2]))) {
                    if (Number(args[2]) === 0) return message.reply(lang.shop_invalid_args)
                    count = Number(args[2])
                }
            }
            
            if (args[0] === 'buy'){
                if (bal.get(message.author.id) < cur_json.item[args[1]].cost * count) return message.reply(lang.shop_buy_not_enough.split('${item}').join(`${count} ${cur_json.item[args[1]].name}.`))

                if (!inv.has(`${message.author.id}_${args[1]}`)) inv.set(`${message.author.id}_${args[1]}`, count)

                inv.set(`${message.author.id}_${args[1]}`, inv.get(`${message.author.id}_${args[1]}`) + count)
                
                bal.set(message.author.id, bal.get(message.author.id) - cur_json.item[args[1]].cost * count)

                message.reply(lang.shop_buy_sucess.replace('${item}', `${count} ${cur_json.item[args[1]].name}`).replace('${money}', `${cur_json.item[args[1]].cost * count} ${cur_json.cur.symbol}`))

            } else if (args[0] === 'sell'){
                if (!inv.has(`${message.author.id}_${args[1]}`)) inv.set(`${message.author.id}_${args[1]}`, 0)

                if (inv.get(`${message.author.id}_${args[1]}`) <= 0) return message.reply(lang.shop_sell_nothing)
                
                if (count > inv.get(`${message.author.id}_${args[1]}`)) count = inv.get(`${message.author.id}_${args[1]}`)
                
                inv.set(`${message.author.id}_${args[1]}`, inv.get((`${message.author.id}_${args[1]}`) - count))
                bal.set(message.author.id, bal.get(message.author.id) + cur_json.item[args[1]].sell * count)
                message.reply(lang.shop_sell_sucess.replace('${item}', `${count} ${cur_json.item[args[1]].name}`).replace('${money}', `${cur_json.item[args[1]].cost * count} ${cur_json.cur.symbol}`))  
            }
        } else return message.reply(`Usage: ${prefix}market <buy|sell> <ID> [count]`)
    }
}

module.exports = market;