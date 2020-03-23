const Discord = require('discord.js')
const Themeparks = require('themeparks')
const wait = require('util').promisify(setTimeout);

async function parktimes(message, client, prefix, cooldowns){
    if (message.content.startsWith(prefix + 'ridetime')){

         //Implement cooldown
    if (!cooldowns.has(prefix + 'ridetime')) {
        cooldowns.set(prefix + 'ridetime', new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(prefix + 'ridetime');
    const cooldownAmount = 60000;

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

        let args = message.content.split(" ");
        args.shift();

        let embed = new Discord.RichEmbed

        message.channel.send('NOTE: This is work in progress...')
        
        const awaitmsg = await message.channel.send('Please enter your themepark name')
        const filter = m => message.author == m.author;
        const collectorguild = message.channel.createMessageCollector(filter, {time: 60000, max: 1});
        collectorguild.on('collect', m => {
            const pleasewait = await message.channel.send('Please wait...')
            await wait(5000)
            pleasewait.edit('Working in progress, need some waiting ¯\\_(ツ)_/¯')
        });
        collector4.on('end', (collected, reason) => {
            if (reason == 'time'){
                awaitmsg.react('❌')
            }
        });
    }
}

module.exports = parktimes