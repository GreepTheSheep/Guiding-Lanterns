const Discord = require("discord.js");

async function status(message, client, prefix) {

    if (message.content.startsWith(prefix + 'setstatus')) {
        let args = message.content.split(" ");
        args.shift();
        if (args.length < 1) return client.user.setActivity().then(message.delete())

        const awaitmsg = await message.channel.send('Awaiting your status...')
        const filter = m => message.author == m.author;
        const collector = message.channel.createMessageCollector(filter, {time: 60000, max: 1});
        collector.on('collect', m => {
            
            if (args[0] === "playing" || args[0] === "play") {
                message.channel.send(`The status of the bot has been set to "Playing **${m.content}**" !`).then(mbot=> mbot.delete({timeout: 5000}))
                client.user.setActivity(m.content);
            } else if (args[0] === "watching" || args[0] === "watch") {
                message.channel.send(`The status of the bot has been set to "Watching **${m.content}**" !`).then(mbot=> mbot.delete({timeout: 5000}))
                client.user.setActivity(m.content, { type: 'WATCHING' })
            } else if (args[0] === "listening" || args[0] === "listen") {
                message.channel.send(`The status of the bot has been set to "Listening **${m.content}**" !`).then(mbot=> mbot.delete({timeout: 5000}))
                client.user.setActivity(m.content, { type: 'LISTENING' })
            } else if (args[0] === "streaming" || args[0] === "stream") {
                message.channel.send(`The status of the bot has been set to "Streaming **${m.content}**" !`).then(mbot=> mbot.delete({timeout: 5000}))
                client.user.setActivity(m.content, { type: 'STREAMING', url: 'https://twitch.tv/greeplive' })
            }
            m.delete()
            awaitmsg.delete()
        });
        collector.on('end', (collected, reason) => {
            if (reason == 'time'){
                const nothingsetmsg = `You put nothing? Okay, I set nothing ¯\\_(ツ)_/¯`
                message.channel.send(nothingsetmsg).then(mbot=> mbot.delete({timeout: 5000}))
                client.user.setActivity()
                message.delete()
                awaitmsg.delete()
            }
        });
    }
}

module.exports = status;