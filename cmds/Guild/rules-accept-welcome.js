const Discord = require('discord.js');
const Enmap = require('enmap')

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

async function welcome(message, client, prefix, cooldowns) {
    const command_name = prefix + 'accept'

    if (message.content.startsWith(command_name)){
        if (message.channel.id != '708850459061780540') retuen

        //Implement cooldown
    if (!cooldowns.has(command_name)) {
        cooldowns.set(command_name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command_name);
    const cooldownAmount = 90 * 1000; // 90 seconds cooldown

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(0)} more second(s) before reusing the \`${command_name}\` command.`)
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    if (message.member.roles.find(r => r.name === "KEY (The Guiding Lanterns)")) { //Override cooldown
        timestamps.delete(message.author.id);
    }
    // End of cooldown implement

        const calc_min=1; 
        const calc_max=9;
        var randomnum1 = (Math.random() * (+calc_max - +calc_min) + +calc_min).toFixed(0);
        var randomnum2 = (Math.random() * (+calc_max - +calc_min) + +calc_min).toFixed(0);
        const firstmessage = await message.channel.send(`**__To verify that you are human, please do this math.__** We do this to protect our server from raids or malicious people who may retrieve information.\n\`\`\`${randomnum1} + ${randomnum2}\`\`\``)

        const filter = m => message.author == m.author;
        const collector = message.channel.createMessageCollector(filter, {time: 30000, max: 1});
        collector.on('collect', m => {
            validate(client, m, message, firstmessage, randomnum1, randomnum2)
        });
        collector.on('end', (collected, reason) => {
            if (reason == 'time'){
                message.channel.send(`Time's up! Try again!`)
            }
        });


        
    }
}

function validate(client, m, message, firstmessage, randomnum1, randomnum2){

    if (!Number(m.content) || Number(m.content) == NaN) return message.channel.send('That\'s not a valid number! Please try again')
    else if (Number(Number(randomnum1) + Number(randomnum2)) != Number(m.content)) return message.channel.send(`You miscalculated, the correct answer was ${Number(Number(randomnum1) + Number(randomnum2))}. Please try again!`)
    else if (Number(Number(randomnum1) + Number(randomnum2)) == Number(m.content)){
        message.author.send(`Howdy ! I can help you to better integrate into the kingdom! That's the role of a lady-in-waiting!\n\nWe (mostly the Royal Guard) regularly post announcements about the server. <#563241725133455391>\n\nYou can get more roles and change the colour of your name here: <#643107104504152065>\n\nIf you've joined the subreddit at https://reddit.com/r/tangled , you can type \`!subbed\` to get the Friend of Rapunzel badge!\n\nDon't forget to participate because I count your messages and transform them into experience, and thanks to this experience you can gain levels. The higher you are, the more rewards you will get! (Type \`!rank\` in #bot-commands to see your level!)\n\n**__And above all, don't forget to have fun in the world of Tangled!__**`).catch(e=>console.log(e))
        message.member.roles.add('562608575227363329')
        message.member.removeRole('675436155453308959')
        const check_db = new Enmap({name : 'Tangled_verification'})
        check_db.set(message.author.id, true)

        const messages = [
            'Welcome and hello to Kingdom of Corona :sunny:',
            'Welcome, welcome to Kingdom Of Corona :sunny:',
            'Hello and welcome :sunny:, we are so happy that you are with us <:RapunzelExcited:570818890259628052>. Have a great time here!',
            ':wave:',
            '<:RapunzelExcited:570818890259628052>',
            'Have a great time here! <:PascalYes:567339119009726474>',
            'Hello! <:heureuse:570820764799074335>',
            'Welcome, welcome to Kingdom of Corona :sunny: Have a good time here <:PascalYes:567339119009726474>',
            'Bienvenue !',
            'Put down your luggages and enjoy the kingdom! :sunny:'
        ];
    
        let welcomemsg = randomItem(messages);
        var total = message.guild.members.array().length;
        var bots = message.guild.members.filter(m => m.user.bot).size; 
        var members = total - bots;
    
        let embed = new Discord.RichEmbed()
        embed.setColor("#01B023")
        .setTimestamp()
        .addField(`${welcomemsg}`, `Hey, **say welcome to __${message.author.username}__** 🙌`)
        .setThumbnail('http://www.youloveit.com/uploads/posts/2017-11/1511021094_youloveit_com_tangled_the_series_animated_gifs_emotions03.gif')
        .setFooter(`${message.author.tag} just landed in the Kingdom of Corona! We are now ${members} in the server`, `${message.author.displayAvatarURL()}`)
        client.guilds.get('562602234265731080').channels.get('658808055558832132').send(embed);
    }
    
}

module.exports = welcome;
