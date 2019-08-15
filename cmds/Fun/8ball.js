const Discord = require("discord.js");

const wait = require('util').promisify(setTimeout);
const min=1000; 
const max=10000;

function eight_ball(message, client, prefix, date, time, logchannel){
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
