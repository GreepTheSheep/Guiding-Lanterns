const Discord = require('discord.js');

function help(message, client, prefix, lang, cooldowns) {
    if (message.content.startsWith(prefix + 'help') || message.content.startsWith(prefix + 'commands') || message.content.startsWith(`<@!${client.user.id}> help`) || message.content.startsWith(`<@${client.user.id}> help`) || message.content.startsWith(`<@!${client.user.id}> commands`) || message.content.startsWith(`<@${client.user.id}> commands`)) {
         //Implement cooldown
         if (!cooldowns.has(prefix + 'help')) {
            cooldowns.set(prefix + 'help', new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(prefix + 'help');
        const cooldownAmount = 5000;

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


        if (message.member.roles.cache.find(r => r.name === "KEY (The Guiding Lanterns)")) { //Override cooldown
            timestamps.delete(message.guild.id);
        }
        // End of cooldown implement        

        message.reply('https://guiding-lanterns.greep.cf/cmds.html')
    }
}

module.exports = help;