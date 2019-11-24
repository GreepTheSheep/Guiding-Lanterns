const Discord = require('discord.js')
const Enmap = require('enmap')

function use(message, client, prefix, cooldowns, cur_json){
    if(message.content.startsWith(prefix + "use")) {

        //Implement cooldown
        if (!cooldowns.has(prefix + 'use')) {
            cooldowns.set(prefix + 'use', new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(prefix + 'use');
        const cooldownAmount = 30 * 1000; // 30 second cooldown

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                let totalSeconds = (expirationTime - now) / 1000;
                let days = Math.floor(totalSeconds / 86400);
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = totalSeconds % 60;
                return message.reply(`please wait ${seconds.toFixed(0)} second(s) before reusing the \`${prefix+'use'}\` command.`)
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


        if (message.author.id === '330030648456642562') { //Override cooldown
            timestamps.delete(message.author.id);
        }
        // End of cooldown implement
        const bal = new Enmap({name:"cur_balance"})
        const inv = new Enmap({name:"cur_inventory"})

        if (!bal.has(message.author.id)) bal.set(message.author.id, 0)
       
        let args = message.content.split(" ")
        args.shift()
        if (args.length < 1) return message.reply(`Usage: \`${prefix}use <ID of the item you want to use>\``)
        if (isNaN(args[0])) return message.reply(`Usage: \`${prefix}use <ID of the item you want to use>\``)
        if (!cur_json.item[Number(args[0])].use) return message.channel.send('Hmm... You can\'t do anything with this item, sorry!')
        if (!cur_json.item[Number(args[0])]) return message.reply('This item does not exist')
        if (inv.get(`${message.author.id}_${args[0]}`) <= 0) return message.reply(`you can't use what you don't have, it makes sense to me too.`)
        
        inv.set(`${message.author.id}_${args[0]}`, inv.get(`${message.author.id}_${args[0]}`) - 1)
        message.channel.send(cur_json.item[Number(args[0])].use)
    }
}

module.exports = use;