const Discord = require("discord.js");
const fs = require("fs");
const answerfile = './cmds/8ball_answers.json'

const wait = require('util').promisify(setTimeout);
const min=500; 
const max=10000;

function eight_ball(message, client, prefix, date, time, logchannel){
    var reponsesread = fs.readFileSync(answerfile, "utf8");
    var reponses = JSON.parse(reponsesread);

    let args = message.content.split(" ")
    args.shift()

    if(message.content.startsWith(prefix + "tellme")){

        function randomItem(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        var randomwait = Math.random() * (+max - +min) + +min;

        if (args.length < 1) {
            message.channel.send('**Ask me a question**');
        } else {
            let reponse = randomItem(reponses)
            message.channel.send("Let's see...")
            .then(msg => wait(randomwait).then(m=>msg.edit(`**${reponse}**`))
            )
            .catch(e => message.channel.send('\`\`\`:/ Hmm... Looks like there\'s been a error.\nDon\'t worry! The report was sent at the devs!\`\`\`')
            .then(console.log(`\n[${date(0)} - ${time(0)}] ${prefix}tellme Error: ${e}\n`)
            .then(logchannel.send(`\`\`\`${prefix}tellme Error:\n${e}\`\`\``))
            ));
        }
    }

    if (message.content.startsWith(prefix + "addtellme")){
        if (!message.author.id == '330030648456642562') return;
        if (args.length < 1) return message.react('❌');
        reponses.push(`${args.join(" ")}`);
        reponsesread = JSON.stringify(reponses);
        fs.writeFileSync(answerfile, reponsesread);
        message.react('✅')
    }
}

module.exports = eight_ball;
