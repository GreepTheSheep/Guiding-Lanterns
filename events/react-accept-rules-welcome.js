const Discord = require('discord.js');
const Enmap = require('enmap')

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}


async function role_react_accept_rules(client, reaction, user, getlogchannel, functiondate, functiontime){

    if(reaction.message.id === '754365382189514802'){
        console.log(`${user.tag} reacted to the rules accept messages with the emoji ${reaction.emoji.id}`)
        if (reaction.emoji.id == "684487006050320431"){
            if (user.bot) return
            reaction.users.remove(user.id).catch(e=>console.log('Can\'t remove the react for ' + user.tag + ' on rules validation'))
            user.send(`Howdy ! I can help you to better integrate into the kingdom! That's the role of a lady-in-waiting!\n\nWe (mostly the Royal Guard) regularly post announcements about the server. <#563241725133455391>\n\nYou can get more roles and change the colour of your name here: <#643107104504152065>\n\nIf you've joined the subreddit at https://reddit.com/r/tangled , you can type \`!subbed\` to get the Friend of Rapunzel badge!\n\nDon't forget to participate because I count your messages and transform them into experience, and thanks to this experience you can gain levels. The higher you are, the more rewards you will get! (Type \`!rank\` in #bot-commands to see your level!)\n\n**__And above all, don't forget to have fun in the world of Tangled!__**`).catch(e=>console.log(e))
            reaction.message.guild.member(user).roles.add('562608575227363329').catch(console.error)
            const check_db = new Enmap({name : 'Tangled_verification'})
            check_db.set(user.id, true)
        
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
            var total = reaction.message.guild.members.cache.array().length;
            var bots = reaction.message.guild.members.cache.filter(m => m.user.bot).size; 
            var members = total - bots;
        
            let embed = new Discord.MessageEmbed()
            embed.setColor("#01B023")
            .setTimestamp()
            .addField(`${welcomemsg}`, `Hey, **say welcome to __<@${user.id}>__** 🙌`)
            .setThumbnail('http://www.youloveit.com/uploads/posts/2017-11/1511021094_youloveit_com_tangled_the_series_animated_gifs_emotions03.gif')
            .setFooter(`${user.tag} just landed in the Kingdom of Corona! We are now ${members} in the server`, `${user.displayAvatarURL()}`)
            client.guilds.cache.get('562602234265731080').channels.cache.get('658808055558832132').send(embed);
            client.guilds.cache.get('562602234265731080').channels.cache.get('615236807478607921').send(`\`+\` ${user.username}`);
        }
    }

}

module.exports = role_react_accept_rules;