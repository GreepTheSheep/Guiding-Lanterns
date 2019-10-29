const Discord = require('discord.js')

const wait = require('util').promisify(setTimeout);
const min=1000; 
const max=5000;

const responses = [
    'No problems :wink:',
    'You\'re always welcome!',
    'You\'re welcome!',
    'https://tenor.com/view/youre-welcome-gif-15359846',
    'https://tenor.com/view/maui-moana-youre-welcome-gif-9587693',
    'https://tenor.com/view/stevecarrell-gif-7720100'
]

function replyToThanks(message, client, prefix){
    if(message.content.toLowerCase().includes(`thanks <@${client.user.id}>`) || message.content.toLowerCase().includes(`thanks <@!${client.user.id}>`) || message.content.toLowerCase().includes(`thanks lantern`)){
        
        function randomItem(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        var randomwait = Math.random() * (+max - +min) + +min;

        let reponse = randomItem(responses)
        message.channel.startTyping()
        wait(randomwait)
        .then(t=> message.channel.stopTyping(true))
        .then(m=>message.channel.send(reponse)
        )
        .catch(e => console.log(e))
    }
}

module.exports = replyToThanks