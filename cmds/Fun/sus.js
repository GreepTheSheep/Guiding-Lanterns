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
            let rUser = message.guild.member(message.mentions.users.first() || client.users.get(args[0]))
            if (!rUser) return message.channel.send('who is sus?');
            const impmin=0; 
            const impmax=3;
            var impnum = Math.random() * (+impmax - +impmin) + +impmin;
            var isimp = randomItem(['', 'not '])
            var text = `. 　　　。　　　　•　 　ﾟ　　。 　　.

            　　　.　　　 　　.　　　　　。　　 。　. 　
            
            .　　 。　　　ﾟ　　 ඞ  。 . 　　 • 　　　　•
            
            　　ﾟ　　 ${rUser.username} was ${isimp}An Impostor.　 。　•
            
            　.　　　'　　${impnum} Impostors remain.　　。　　ﾟ
            
            　　。　　ﾟ　　　•　　　. 　ﾟ　　　　'　 .`

            message.channel.send(text)
        }
    }
}

module.exports = au_sus