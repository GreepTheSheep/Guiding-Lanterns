const Discord = require('discord.js')
const Enmap = require('enmap')

function cur_owner(message, client, prefix, cooldowns, cur_json){
    if (message.author.id === "330030648456642562" || message.author.id === "460348027463401472") {
        const bal = new Enmap({name:"cur_balance"})
        const inv = new Enmap({name:"cur_inventory"})

        if(message.content.startsWith(prefix + "setmoney")) {
            let args = message.content.split(" ")
            args.shift()
            if (args.length < 1) return message.react('❌')
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!rUser) return message.react('❌')
            if (!args[1]) return message.react('❌')
            if (rUser.user.bot) return message.react('❌')
            bal.set(rUser.id, Number(args[1]))
            message.react('✅')
        }
        if(message.content.startsWith(prefix + "additem")) {
            let args = message.content.split(" ")
            args.shift()
            if (args.length < 1) return message.react('❌')
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!rUser) return message.react('❌')
            if (!args[1]) return message.react('❌')
            if (rUser.user.bot) return message.react('❌')
            var count;
            if (args[2]) count = Number(args[2])
            else if (!args[2]) count = 1
            inv.set(`${rUser.id}_${args[1]}`, inv.get(`${rUser.id}_${args[1]}`) + count)
            message.react('✅')
        }
        if(message.content.startsWith(prefix + "clearinventory")) {
            let args = message.content.split(" ")
            args.shift()
            if (args.length < 1) return message.react('❌')
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!rUser) return message.react('❌')
            if (rUser.user.bot) return message.react('❌')
            var id = 0;
            for (item in cur_json.item){
                inv.set(`${rUser.id}_${id}`, 0)
                id++
            }
            message.react('✅')
        }
    }
}

module.exports = cur_owner;