const Discord = require('discord.js');

function quotes(message, client, prefix) {

    const quotes = [
        '“I want to see the floating lights!“\n\n-Rapunzel',
        '“I knew they weren’t stars!”\n\n-Rapunzel',
        'Rapunzel: “That’s the funny thing about birthdays, they’re kind of an annual thing.”\nMother Gothel: “No, no, no—can’t be. I distinctly remember, your birthday was last year.”',
        '“I CAN’T BELIEVE I DID THIS!”\n\n-Rapunzel',
        '“BEST. DAY. EVER!”\n\n-Rapunzel',
        '“Find your humanity! Haven’t any of you ever had a dream?”\n\n-Rapunzel',
        '“I have magic hair that glows when I sing.”\n\n-Rapunzel',
        '“And the thing is, I’m not scared anymore.”\n\n-Rapunzel',
        '“Eugene!”\n\n-Rapunzel',
        '“No, no, no, no, no, no, no, no, this is bad. This is very, very bad. This is really bad … They just can’t get my nose right!”\n\n-Flynn Rider',
        '“But the walls of that tower could not hide everything. Each year on her birthday the king and queen release thousands of lanterns into the sky, in hope that one day their lost princess would return.”\n\n-Flynn Rider',
        '“I know not who you are, or how I came to find you, but may I just say … hi. How ya doin’? The name’s Flynn Rider. How’s your day goin’, huh?”\n\n-Flynn Rider',
        'Flynn: “Alright, blondie.”\nRapunzel: “Rapunzel.”\nFlynn: “Gesundheit.”',
        '“The only thing I want to do with your hair is to get out of it! … Literally!”\n\n-Flynn Rider',
        '“Alright, listen, I didn’t want to have to do this, but you leave me no choice. Here comes the smolder.”\n\n-Flynn Rider',
        'Rapunzel: “So, I have made the decision to trust you.”\nFlynn: “A horrible decision, really.”',
        '“I’ll spare you the sob story of poor orphan Eugene Fitzherbert, it’s a little bit of a … It’s a little bit of a downer.”\n\n-Flynn Rider',
        'Flynn: “You were my new dream.”\nRapunzel: “And you were mine.”',
        '“I am a man of science. Not magic. Mostly alchemy.“\n\n-Varian',
        `Eugene: “You don't know what "boo" means, do you?“\nRapunzel: “Of course I do! It's a cheer like "hooray" or "yea", right?“`,
        '“FITZHERBERT!“\n\n-Cassandra',
        '“Rapunzel, look in that mirror. You know what I see? I see a strong, confident, beautiful young lady … Oh look, you’re here too!”\n\n-Gothel',
        '“Oh, darling! I’m just teasing.”\n\n-Gothel',
        'Hook Hand: “Go. Live your dream.”\nFlynn: “I will.”\nHook Hand: “Your dream stinks. I was talking to her.”'
    ]

    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    if (message.content.startsWith(prefix + 'quote')) {
        let rquote = randomItem(quotes);

        let embed = new Discord.RichEmbed()
            embed.setColor("#9C01C4")
                .addField("Random Tangled quote :", `${rquote}`)
                .setFooter(`Another? ${prefix}quote`, `${client.user.avatarURL}`)
            message.channel.send({ embed: embed })
    }
}

module.exports = quotes;