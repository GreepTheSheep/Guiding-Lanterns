const Discord = require('discord.js');
const fs = require("fs");
const answerfile = './cmds/ping_answers.json'

const wait = require('util').promisify(setTimeout);
const min=1000; 
const max=5000;

function bot_ping(message, client, prefix){
    var reponsesread = fs.readFileSync(answerfile, "utf8");
    var reponses = JSON.parse(reponsesread);

    if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`){

        function randomItem(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        var randomwait = Math.random() * (+max - +min) + +min;

        let reponse = randomItem(reponses)
        message.channel.startTyping()
        wait(randomwait)
        .then(t=> message.channel.stopTyping(true))
        .then(m=>message.channel.send(reponse)
        )
        .catch(e => console.log(e))
        }

    if (message.content.startsWith(prefix + "addpingmsg")){
        if (!message.author.id == '330030648456642562') return;
        let args = message.content.split(" ")
        args.shift()
        if (args.length < 1) return message.react('❌');
        reponses.push(`${args.join(" ")}`);
        reponsesread = JSON.stringify(reponses);
        fs.writeFileSync(answerfile, reponsesread);
        message.react('✅')
    }
}

module.exports = bot_ping;