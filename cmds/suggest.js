const Discord = require("discord.js");

function suggest(message, client, prefix){

if(message.content.startsWith(prefix + 'suggest')){
  if (message.channel.type === 'dm') return;
        
    const args = message.content.split(" ").slice(1);

    if (args.length < 1) {
         return message.reply("Please enter your suggestion!")
    }

    var args2 = message.content.split(' ').slice(1).join(' ');

    const suggestchannel = client.users.get('330030648456642562')

    suggestchannel.send('', {
      embed: {
        color: 654456,
        author: {
          name: "Une suggestion a été posté !",
          icon_url: message.author.avatarURL,
        },
        title: "Suggestion",

        description: `_Envoyer dans_
        **${message.guild.name}**

_Suggestion_
**${args2}**

         _Par_
**${message.author.tag}**`,

}})
message.delete()

message.channel.send('Your suggestion has been posted! <:heureuse:570820764799074335>')

}
}

module.exports = suggest;