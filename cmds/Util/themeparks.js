const Discord = require('discord.js')
const Themeparks = require('themeparks')
const wait = require('util').promisify(setTimeout);

async function parktimes(message, client, prefix, cooldowns){
    if (message.content.startsWith(prefix + 'themepark')){

         //Implement cooldown
    if (!cooldowns.has(prefix + 'themepark')) {
        cooldowns.set(prefix + 'themepark', new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(prefix + 'themepark');
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
        
        const awaitmsg = await message.channel.send('Please enter your themepark name. Or enter \`list\`')
        const filter = m => message.author == m.author;
        const collectorguild = message.channel.createMessageCollector(filter, {time: 60000, max: 1});
        collectorguild.on('collect', async m => {
            const pleasewait = await message.channel.send('Please wait...')
            
            if(m.content.toLowerCase() == 'list'){
                const Parks = {};
                for (const park in Themeparks.Parks) {
                    Parks[park] = new Themeparks.Parks[park]();
                }
                const parkslist = []
                for (const park in Parks) {
                    parkslist.push(Parks[park].Name);
                }
                message.channel.send('List of parks:\```css\n- ' + parkslist.join('\n- ') + '\`\`\`')
            } else {
                message.channel.send('Work in progress. Sorry!')
            }
            pleasewait.delete()
        });
        collector4.on('end', (collected, reason) => {
            if (reason == 'time'){
                awaitmsg.react('❌')
            }
        });
    }
}

module.exports = parktimes