const { Attachment } = require('discord.js');
const Discord = require('discord.js');
const shell = require('shelljs');
const fs = require('fs');

function update(message, client, prefix) {
    if (message.content.startsWith(prefix + 'update')) {
        if (message.author.id === '330030648456642562'  || message.author.id === "460348027463401472"){
        try {
            message.channel.startTyping()
            shell.exec('pm2 stop GL && git pull && npm install && pm2 start GL', {silent:true}, function(code, stdout, stderr) {
                if (stdout.length > 1024 && stdout.length < 1950 || stderr.length > 1024 && stderr.length < 1950) return message.reply(`Output:\n\`\`\`${stdout}${stderr}\`\`\``).then(m=>message.channel.stopTyping(true));
                
                if (stdout.length > 1950 || stderr.length > 1950) return fs.writeFile('./logs/update.log', `Command: update routine\nExit code: ${code}\n\n\nOutput:\n\n${stdout}${stderr}`, 'utf8', (err) => {
                        if (err) return function(){
                            console.log(err);
                            message.reply(`FS error: ${err}`)
                        }
                        const attachment = new Attachment('./logs/update.log')
                        message.reply('Output is more than 2000 characters, see attachment', attachment)
                        .then(m=>message.channel.stopTyping(true))
                    })
                
                let embed = new Discord.RichEmbed()
                    embed.addField("Command:", 'pm2 stop GL && git pull && npm install && pm2 start GL')
                    .addField('Program output:', `\`\`\`${stdout}${stderr}\`\`\``)
                    .setFooter('Exit code: ' + code)
            message.reply(embed)
            .then(m=>message.channel.stopTyping(true));
            });
        } catch (err) {
            message.reply(`EVAL **__ERROR__**\n\`\`\`xl\n'pm2 stop GL && git pull && npm install && pm2 start GL'\`\`\``);
            message.channel.stopTyping(true)
        }
        }else return;
    }
}

module.exports = update;
