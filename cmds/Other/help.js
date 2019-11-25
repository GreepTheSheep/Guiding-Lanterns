const Discord = require('discord.js');

function help(message, client, prefix, lang, cooldowns) {
    if (message.content.startsWith(prefix + 'help') || message.content.startsWith(prefix + 'commands') || message.content.startsWith(`<@!${client.user.id}> help`) || message.content.startsWith(`<@${client.user.id}> help`) || message.content.startsWith(`<@!${client.user.id}> commands`) || message.content.startsWith(`<@${client.user.id}> commands`)) {
         //Implement cooldown
         if (!cooldowns.has(prefix + 'help')) {
            cooldowns.set(prefix + 'help', new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(prefix + 'help');
        const cooldownAmount = 30000;

        if (timestamps.has(message.guild.id)) {
            const expirationTime = timestamps.get(message.guild.id) + cooldownAmount;

            if (now < expirationTime) {
                let totalSeconds = (expirationTime - now) / 1000;
                let days = Math.floor(totalSeconds / 86400);
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = totalSeconds % 60;
                return;
            }
        }

        timestamps.set(message.guild.id, now);
        setTimeout(() => timestamps.delete(message.guild.id), cooldownAmount);


        if (message.member.roles.find(r => r.name === "KEY (The Guiding Lanterns)")) { //Override cooldown
            timestamps.delete(message.guild.id);
        }
        // End of cooldown implement        

        const modules = [
            "Disney",
            "Util",
            "Fun",
            "Games",
            "Other"
        ]
        
        let embed = new Discord.RichEmbed()

        let args = message.content.split(" ")
        args.shift()
        embed.setTitle(lang.help_title)
            .setColor("#9C01C4")
            .setFooter(lang.help_footer, client.user.displayAvatarURL)
        
        if (args.length < 1 || args[0].toLowerCase() === 'list') {
            if (message.guild.id == '562602234265731080') embed.addField("**__Kingdom of Corona: ☀__**", lang.help_kingdomofcorona.split('${prefix}').join(prefix));
            embed.addField("Modules:", `\`${modules.join("\`\n- \`")}\``)
                .addField("Usage:", `\`${prefix}help <module>\``)
                .addField(lang.help_anyproblems, lang.help_problems2.split('${prefix}').join(prefix), true)
            return message.channel.send(embed)
        } else if (args[0].toLowerCase() == modules[0].toLowerCase()){
            embed.addField("**°o° Disney:**", lang.help_disney.split('${prefix}').join(prefix), true)
            return message.channel.send(embed)
        } else if (args[0].toLowerCase() == modules[1].toLowerCase()){
            embed.addField("Util:", lang.help_util.split('${prefix}').join(prefix), true)
            return message.channel.send(embed)
        } else if (args[0].toLowerCase() == modules[2].toLowerCase()){
            embed.addField("Fun:", lang.help_fun.split('${prefix}').join(prefix), true)
            return message.channel.send(embed)
        } else if (args[0].toLowerCase() == modules[3].toLowerCase()){
            embed.addField("Games:", lang.help_game.split('${prefix}').join(prefix), true)
            return message.channel.send(embed)
        } else if (args[0].toLowerCase() == modules[4].toLowerCase()){
            embed.addField('Other:', lang.help_other.split('${prefix}').join(prefix), true)
            return message.channel.send(embed)
        }
    }
}

module.exports = help;