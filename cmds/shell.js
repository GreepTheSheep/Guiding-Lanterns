const Discord = require('discord.js');
const shell = require('shelljs');

function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

function command(message, client, prefix) {
    if (message.content.startsWith(prefix + 'shelleval')) {
        if (message.author.id == '330030648456642562'){
        try {
            let args = message.content.split(" ")
            args.shift()
            if (args.length < 1) return message.react('❌');
            message.channel.startTyping()
            shell.exec(args.join(' '), function(code, stdout, stderr) {
                if (stdout.length > 1024 && stdout.length < 1950 || stderr.length > 1024 && stderr.length < 1950) return message.reply(`Output:\n\`\`\`${stdout}${stderr}\`\`\``).then(m=>message.channel.stopTyping(true));
                if (stdout.length > 1950 || stderr.length > 1950) return message.reply(`Output is more than 2000 characters. If you want to see the output, go check in your console.`).then(m=>message.channel.stopTyping(true));
                let embed = new Discord.RichEmbed()
                if (code == '0'){
                    embed.addField("Command:", args.join(' '))
                    .addField('Program output:', `\`\`\`${stdout}\`\`\``)
                    .addField('Exit code:', code)
                } else {
                    embed.addField("Command:", args.join(' '))
                    .addField('Program output:', `\`\`\`${stderr}\`\`\``)
                    .addField('Exit code:', code)
                }
            message.reply(embed)
            .then(m=>message.channel.stopTyping(true));
            });
        } catch (err) {
            const args = message.content.split(" ");
            args.shift();
            message.reply(`EVAL **__ERROR__**\n\`\`\`xl\n${args.join(" ")}\`\`\`\nNode Result: \`${clean(err)}\``);
            message.channel.stopTyping(true)
        }
        }else return;
    }
}

module.exports = command;