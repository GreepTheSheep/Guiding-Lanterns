const Discord = require('discord.js')
const Themeparks = require('themeparks')
const wait = require('util').promisify(setTimeout);

function searchStringInArray(search, list) {
    var resultats = []
    list.forEach(r=>{
        if (r.toLowerCase().includes(search.toLowerCase())) {
            // console.log(r)
            resultats.push(r)
            multiple++
        }
    })
    if (multiple == 0) return false
    return {
        resultats: resultats,
        multiple: multiple
    }
}

async function triggerPark(message, client, prefix, Parks, embed){

    const awaitmsg = await message.channel.send('Please enter your themepark name. Or enter \`list\`')
        const filter = m => message.author == m.author;
        const collector = message.channel.createMessageCollector(filter, {time: 120000, max: 1});
        collector.on('collect', async m => {
            const pleasewait = await message.channel.send('Please wait...')
            const parkslist = []
            if(m.content.toLowerCase() == 'list'){
                for (const park in Parks) {
                    parkslist.push(Parks[park].Name);
                }
                message.channel.send('List of parks:\```' + parkslist.join('\n') + '\`\`\`')
                triggerPark(message, client, prefix, Parks, embed)
            } else {
                try{
                const ParkID = []
                for (const park in Parks) {
                    parkslist.push(Parks[park].Name.toLowerCase())
                    ParkID.push(park.toString())
                }
                if (parkslist.includes(m.content.toLowerCase())){
                    triggerRide(message, client, prefix, Parks, embed, parkslist, m)
                } else {
                    message.channel.send('Park not found')
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

async function triggerRide(message, client, prefix, Parks, embed, parkslist, m){
    var mOld = m
    var ParkLength = parkslist.indexOf(m.content.toLowerCase());
    var thisPark = Parks[ParkID[ParkLength]]
    console.log(thisPark)
    const founditmsg = await message.channel.send('Found it! Please send your ride name or type \`list\`')
    var rides = await thisPark.GetWaitTimes()
    var ridename = []
    var ridestatus = []
    var ridewaittime = []
    var ridelastupdate = []
    rides.forEach(async ride=>{
        ridename.push(ride.name)
        ridestatus.push(ride.status)
        ridewaittime.push(ride.waitTime)
        ridelastupdate.push(ride.lastUpdated)
    })
    const filter2 = m => message.author == m.author;
    const collector2 = message.channel.createMessageCollector(filter2, {time: 120000, max: 1});
    collector2.on('collect', async m => {
    const pleasewait2 = await message.channel.send('Please wait...')
    if (m.content.toLowerCase() == 'list'){
        message.channel.send('\`\`\`' + ridename.join('\n') + '\`\`\`')
        triggerRide(message, client, prefix, Parks, embed, parkslist, mOld)
    } else {
        if (ridename.includes(m.content)){
            var rideindex = ridename.indexOf(m.content)
            if (ridestatus[rideindex] == 'Closed' ){
                message.channel.send(`❌ __${ridename[rideindex]}__ is ${ridestatus[rideindex]}`);
            } else if (ridestatus[rideindex] == 'Refurbishment') {
                message.channel.send(`❌ __${ridename[rideindex]}__ is in ${ridestatus[rideindex]}`);
            } else {
                if (ridewaittime[rideindex] <= 5){
                    message.channel.send(`🟢 __${ridename[rideindex]}__: ${ridewaittime[rideindex]} minutes wait. *(${ridestatus[rideindex]})*`);
                } else if (ridewaittime[rideindex] <= 15){
                    message.channel.send(`🟠 __${ridename[rideindex]}__: ${ridewaittime[rideindex]} minutes wait. *(${ridestatus[rideindex]})*`);
                } else {
                    message.channel.send(`🔴 __${ridename[rideindex]}__: ${ridewaittime[rideindex]} minutes wait. *(${ridestatus[rideindex]})*`);
                }   
            }
        } else {
            message.channel.send('Ride not found')
            }
        }
        pleasewait2.delete()
    });
    collector2.on('end', (collected, reason) => {
        if (reason == 'time'){
            awaitmsg.react('❌')
        }
    });
}

async function parktimes(message, client, prefix, cooldowns, Parks){
    if (message.content.startsWith(prefix + 'themepark')){

         //Implement cooldown
    if (!cooldowns.has(prefix + 'themepark')) {
        cooldowns.set(prefix + 'themepark', new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(prefix + 'themepark');
    const cooldownAmount = 120000;

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

        let embed = new Discord.RichEmbed
        Themeparks.Settings.Cache = __dirname + "/data/themeparks.sqlite";

        message.channel.send('NOTE: This is work in progress...')
        
        triggerPark(message, client, prefix, Parks, embed)
    }
}

module.exports = parktimes