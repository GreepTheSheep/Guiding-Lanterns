const Discord = require("discord.js")

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function au_sus(message, client, prefix){
    if (message.content.toLowerCase().startsWith(prefix + 'sus')){
        let args = message.content.split(" ")
        args.shift()

        if (args.length < 1) {
            message.channel.send('who is sus?');
        } else {
            const impmin=0; 
            const impmax=3;
            var impnum = Math.random() * (+impmax - +impmin) + +impmin;
            var isimp = randomItem(['', 'not '])
            impnum = impnum.toFixed(0)
            if (impnum == 0 && isimp == 'not ') isimp = ''
            if (impnum == 3 && isimp == '') isimp = 'not '
            var text = `. 　　　。　　　　•　 　ﾟ　　。 　　.

　　　.　　　 　　.　　　　　。　　 。　. 　

.　　 。　　　ﾟ　　 ඞ  。 . 　　 • 　　　　•
            
　　ﾟ　　 ${args.join(' ')} was ${isimp}An Impostor.　 。　•

.　　　'　　${impnum} Impostor${impnum == 1? '' : 's'} remain.　　。　　ﾟ

　　。　　ﾟ　　　•　　　. 　ﾟ　　　　'　 .`

            message.channel.send(text)
        }
    }
}

module.exports = au_sus
