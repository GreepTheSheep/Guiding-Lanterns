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
        const collector = message.channel.createMessageCollector(filter, {time: 60000, max: 1});
        collector.on('collect', async m => {
            const pleasewait = await message.channel.send('Please wait...')

            if(m.content.toLowerCase() == 'list'){
                const Parks = {};
                const parkslist = []
                for (const park in Themeparks.Parks) {
                    Parks[park] = new Themeparks.Parks[park]();
                }
                for (const park in Parks) {
                    parkslist.push(Parks[park].Name);
                }
                message.channel.send('List of parks:\```' + parkslist.join('\n') + '\`\`\`')
            } else {
                try{
                const Parks = [];
                const ParksID = []
                for (const park in Themeparks.Parks) {
                    Parks.push(park.Name.toLowerCase())
                    ParksID.push(park.toString())
                }
                if (Parks.includes(m.content.toLowerCase())){
                    var ParkLength = Parks.indexOf(m.content.toLowerCase());
                    const founditmsg = await message.channel.send('Found it! Please send your ride name or type \`list\`')
                    var rides = await ParksID[ParkLength].GetWaitTimes()
                    const collector2 = message.channel.createMessageCollector(filter, {time: 60000, max: 1});
                    collector2.on('collect', async m => {
                        var rideslist = []
                        if (m.content.toLowerCase() == 'list'){
                            rides.forEach(async ride=>{
                                rideslist.push(ride.name);
                            })
                            return message.channel.send('\`\`\`' + rideslist.join('\n') + '\`\`\`')
                        } else {
                            var ridelist = {}
                            rides.forEach(async ride=>{
                                ridelist[ride.name] = {
                                    "name" : ride.name,
                                    "status": ride.status,
                                    "waitTime": ride.waitTime,
                                    "lastUpdated": ride.lastUpdated
                                };
                            })
                            if (ridelist[m.content]){
                                if (ridelist[m.content].status == 'Closed'){
                                    return message.channel.send(`❌ __${ridelist[m.content].name}__ is ${ridelist[m.content].status}`);
                                } else {
                                    return message.channel.send(`__${ridelist[m.content].name}__: ${ridelist[m.content].waitTime} minutes wait *(${ridelist[m.content].status})*`);
                                }
                            } else {
                                return console.log('ride not found')
                            }
                        }   
                    });
                    collector2.on('end', (collected, reason) => {
                        if (reason == 'time'){
                            awaitmsg.react('❌')
                        }
                    });
                    
                } else {
                    return console.log('park not found')
                }
                } catch (err) {
                    message.channel.send(err)
                    console.error(err)
                }
            }
            pleasewait.delete()
        });
        collector.on('end', (collected, reason) => {
            if (reason == 'time'){
                awaitmsg.react('❌')
            }
        });
    }
}

module.exports = parktimes