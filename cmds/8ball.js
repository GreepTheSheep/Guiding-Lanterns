const Discord = require("discord.js");
const fs = require("fs");
const answerfile = './cmds/8ball_answers.json'

const wait = require('util').promisify(setTimeout);
const min=500; 
const max=10000;

function eight_ball(message, client, prefix){

    if(message.content.startsWith(prefix + "tellme")){
        const reponses = JSON.parse(fs.readFileSync(answerfile, "utf8"));

        let args = message.content.split(" ")
        args.shift()

        function randomItem(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        let reponse = randomItem(reponses);

        var randomwait = Math.random() * (+max - +min) + +min;

        if (args.length < 1) {
            message.channel.send('**Ask me a question**');
        } else {
            message.channel.send("Let's see...")
            .then(msg => wait(randomwait).then(m=>msg.edit(`**${reponse}**`))
            )
            .catch(e => message.channel.send(':/ Hmm... Looks like there\'s been a error.\nDon\'t worry! The report was sent at the devs!').then(console.log(e)));
        }
    }
}

module.exports = eight_ball;
