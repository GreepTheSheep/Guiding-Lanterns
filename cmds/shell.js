const Discord = require('discord.js');
const shell = require('shelljs');

function command(message, client, prefix) {
    if (message.content.startsWith(prefix + 'shelleval')) {
        if (message.author.id == '330030648456642562'){
        try {
            let args = message.content.split(" ")
            args.shift()
            if (args.length < 1) return message.react('❌');
            shell.exec(args.join(' '), function(code, stdout, stderr) {
                if (stdout.length > 1024 || stderr.length > 1024) return message.reply(`Output:\n\`\`\`${stdout}${stderr}\`\`\``)
                if (stdout.length > 2000 || stderr.length > 2000) return message.reply(`Output is more than 2000 characters. If you want to see the output, go check in your console.`)
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
            });
        } catch (err) {
            const args = message.content.split(" ");
            args.shift();
            message.reply(`EVAL **__ERROR__**\n\`\`\`xl\n${args.join(" ")}\`\`\`\nNode Result: \`${clean(err)}\``);
        }
        }else return;
    }
}

module.exports = command;