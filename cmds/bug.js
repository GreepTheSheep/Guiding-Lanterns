const Discord = require("discord.js");

function bug(message, client, prefix){

if(message.content.startsWith(prefix + 'bug')){
  if (message.channel.type === 'dm') return;
        
    const args = message.content.split(" ").slice(1);

    if (args.length < 1) {
         return message.reply("Please enter your bug details!")
    }

    var args2 = message.content.split(' ').slice(1).join(' ');

    const suggestchannel = client.users.get('330030648456642562')

    suggestchannel.send('', {
      embed: {
        color: 654456,
        author: {
          name: "Un bug a été posté !",
          icon_url: message.author.avatarURL,
        },
        title: "BUG",

        description: `_Envoyer dans_
        **${message.guild.name}**

_Détails :_
**${args2}**

         _Par_
**${message.author.tag}**`,

}})
message.delete()

message.channel.send("Thank you! I'll try to fix this as soon as possible! <:heureuse:570820764799074335>")

}
}

module.exports = bug;