const Discord = require('discord.js')
const Enmap = require('enmap')

var totalItems;

function itemList(message, cur_json){
    const inv = new Enmap({name:"cur_inventory"})
    const array = [];
    var id = 0
    totalItems = 0
    for (var item of cur_json.item){
        if (!inv.has(`${message.author.id}_${id}`) || inv.get(`${message.author.id}_${id}`) !== Number) inv.set(`${message.author.id}_${id}`, 0)
        if (inv.get(`${message.author.id}_${id}`) > 0) array.push(`${id} - ${item.name} x${inv.get(`${message.author.id}_${id}`)}`)
        totalItems = totalItems + inv.get(`${message.author.id}_${id}`)
        id++
    }
    array.push(`Total number of items you have: ${totalItems}`)
    return array.join('\n')
}

function userItemList(rUser, cur_json){
    const inv = new Enmap({name:"cur_inventory"})
    const array = [];
    var id = 0
    totalItems = 0
    for (var item of cur_json.item){
        if (!inv.has(`${rUser.id}_${id}`) || inv.get(`${rUser.id}_${id}`) !== Number) inv.set(`${rUser.id}_${id}`, 0)
        if (inv.get(`${rUser.id}_${id}`) > 0) array.push(`${id} - ${item.name} x${inv.get(`${rUser.id}_${id}`)}`)
        totalItems = totalItems + inv.get(`${rUser.id}_${id}`)
        id++
    }
    array.push(`Total number of items ${rUser.user.username} have: ${totalItems}`)
    return array.join('\n')
}

function inventory(message, client, prefix, cooldowns, cur_json){
    if(message.content.startsWith(prefix + "inventory") || message.content.startsWith(prefix + "inv")) {

        //Implement cooldown
        if (!cooldowns.has(prefix + 'inventory')) {
            cooldowns.set(prefix + 'inventory', new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(prefix + 'inventory');
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
                return message.reply(`please wait ${seconds.toFixed(0)} second(s) before reusing the \`${prefix+'inventory'}\` command.`)
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

        let listembed = new Discord.RichEmbed()
        let args = message.content.split(" ")
        args.shift()
        const rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
        if (!rUser) {
            if (!bal.has(message.author.id)) bal.set(message.author.id, 0)
            listembed.setTitle(`Inventory of ${message.author.username}`)
                .setColor("#0567DA")
                .setDescription(itemList(message, cur_json))
                .setFooter(`Your balance: ${bal.get(message.author.id)} ${cur_json.cur.symbol}`)
            return message.channel.send(listembed)
        } else {
            if (rUser.user.bot) return message.reply('Bots can\'t have items')
            if (!bal.has(rUser.id)) bal.set(rUser.id, 0)
            listembed.setTitle(`Inventory of ${rUser.user.username}`)
                .setColor("#0567DA")
                .setDescription(userItemList(rUser, cur_json))
                .setFooter(`His/Her balance: ${bal.get(rUser.id)} ${cur_json.cur.symbol}`)
            return message.channel.send(listembed)
        }
    }
}

module.exports = inventory;