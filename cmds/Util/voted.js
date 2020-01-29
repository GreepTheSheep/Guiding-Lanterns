const Discord = require('discord.js');

function voted(message, client, prefix, dbl, cooldowns) {
    if (message.content.startsWith(prefix + 'didivote')) {
        //Implement cooldown
    if (!cooldowns.has(prefix + 'didivote')) {
        cooldowns.set(prefix + 'didivote', new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(prefix + 'didivote');
    const cooldownAmount = 30000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            let totalSeconds = (expirationTime - now) / 1000;
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            return message.react('⌚').then(message.delete(5000))
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    if (message.member.roles.find(r => r.name === "KEY (The Guiding Lanterns)")) { //Override cooldown
        timestamps.delete(message.author.id);
    }
    // End of cooldown implement
        if (dbl == undefined || !dbl) return message.react('😢')
        
        dbl.hasVoted(message.author.id).then(voted => {
            if (voted) {
                message.react('👍')
            } else {
                message.react('👎')
            }
        });
    }
};

module.exports = voted;