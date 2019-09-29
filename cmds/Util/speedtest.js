const Discord = require('discord.js')
const shell = require('shelljs')

function speedtest(message, client, prefix, logchannel, dbl){
    if (message.content.startsWith(prefix + "speedtest")) {
        try{
            dbl.hasVoted(message.author.id).then(voted => {
                if (voted) {
                    message.channel.send('Running Speedtest. Please wait...').then(m=>{
                        shell.exec('speedtest --simple', {silent:true}, function(code, stdout, stderr) {
                            if (code !== 0 && code == 127 || code == 1) { // command not found
                                logchannel.send('Speedtest error: App is not installed.')
                                m.edit('❌ Speedtest.net is not found in the server. The report has been sent.')
                            }
                            if (code !== 0 && code !== 127){
                                m.edit('Error. The report has been sent')
                                logchannel.send(`Speedtest error: Shell code: ${code}\`\`\`${stdout}${stderr}\`\`\``)
                            }
                            if (code == 0){
                                m.react('✔')
                                m.edit(`\`\`\`${stdout}\`\`\``)
                            }
                        })
                    })
                } else {
                    let embed = new Discord.RichEmbed()
                    embed.setTitle('ERROR!')
                    .setColor('#ff0000')
                    .addField("This command is vote locked!", `Have you voted for the bot?\nVoting for the bot keeps the dev. of the bot alive :wink:\n\nhttps://discordbots.org/bot/569624646475972608/vote \n\n(Synchronization with the vote and bot can take about 5 minutes, you can check if you voted with \`${prefix}didivote\`)`)
                    .setFooter(`Type "${prefix}bug <details of your bug>" to send at the devs`, `${message.author.displayAvatarURL}`)
                    message.channel.send(embed)
                }
            });
        }
        catch(err){
            message.channel.send('Error. The report has been sent.')
            logchannel.send(`Speedtest error: ${err}`)  
        }
    }
}

module.exports = speedtest