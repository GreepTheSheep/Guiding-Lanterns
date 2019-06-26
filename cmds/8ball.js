const Discord = require("discord.js");
const fs = require("fs");
const answerfile = './cmds/8ball_answers.json'

function eight_ball(message, client, prefix){

    if(message.content.startsWith(prefix + "tellme")){
        const reponses = JSON.parse(fs.readFileSync(answerfile, "utf8"));

        let args = message.content.split(" ")
        args.shift()

        function randomItem(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        let reponse = randomItem(reponses);

        if (args.length < 1) {
            message.channel.send('**Ask me a question**');
        } else {
            message.channel.send("Let's see...")
            .then(msg => msg.delete(3000).then(m=>message.channel.send(`**${reponse}**`))
            )
            .catch(e => message.channel.send(':/ Hmm... Looks like there\'s been a error.\nDon\'t worry! The report was sent at the devs!').then(console.log(e)));
        }
    }
    
    /* Put aside for waiting
    if(message.content.startsWith(prefix + "addtellme")){
        if (!message.author.id == '330030648456642562') return;
        const reponses = JSON.parse(fs.readFileSync(answerfile, "utf8"));
        let args = message.content.split(" ")
        args.shift()
        const cachearray = [];
        for (answers in reponses) {
            cachearray.push(answers.content.split(" "));
        }
        cachearray.push(args.join(" "));
        fs.writeFile(answerfile, cachearray);

        function video_id_str() {
            const reponses = JSON.parse(fs.readFileSync(answerfile, "utf8"));
            const ids = [];
            for (epNojson in reponses) {
                ids.push(epNojson);
            }
        }

        message.channel.send(`Sucessfuly added, I think...`).then(m=>m.delete(2000))
    }
    */
}

module.exports = eight_ball;