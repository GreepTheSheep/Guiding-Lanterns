const Discord = require("discord.js");

const wait = require('util').promisify(setTimeout);
const min=1000; 
const max=10000;

function eight_ball(message, client, prefix, date, time, logchannel, cooldowns){
    var reponses = [
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes - definitely.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
        "Reply hazy, try again",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful."
    ]

    let args = message.content.split(" ")
    args.shift()

    if(message.content.startsWith(prefix + "8ball")){
    try {

        //Implement cooldown
        if (!cooldowns.has(prefix + '8ball')) {
            cooldowns.set(prefix + '8ball', new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(prefix + '8ball');
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
                return message.reply('I need to reload the toy! Please wait again ' + seconds.toFixed(0) + ' seconds if it\'s possible to you!').then(m=>{m.delete(10000) ; message.delete(10000)})
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


        if (message.member.roles.cache.find(r => r.name === "KEY (The Guiding Lanterns)")) { //Override cooldown
            timestamps.delete(message.author.id);
        }
        // End of cooldown implement

        function randomItem(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        var randomwait = Math.random() * (+max - +min) + +min;

        if (args.length < 1) {
            message.channel.send('**Ask me a question**');
        } else {
            let reponse = randomItem(reponses)
            message.channel.send("Let's see...")
            .then(msg => wait(randomwait)
            .then(m=>msg.edit(`**${reponse}**`)
            ))
        }
    } catch (err) {
        message.channel.send('\`\`\`:/ Hmm... Looks like there\'s been a error.\nDon\'t worry! The report was sent at the devs!\`\`\`');
        console.log(`\n[${date(0)} - ${time(0)}] ${prefix}8ball Error: ${err}\n`)
        logchannel.send(`\`\`\`${prefix}8ball Error:\n${err}\`\`\``)
    }
    }
}

module.exports = eight_ball;
