const Discord = require('discord.js');
const fs = require('fs');


function versionCheck(client) {
    const channel = client.channels.get('596307060010778665');
    if (!channel) {
        console.log(`Channel: 596307060010778665 cannot be found`);
        return;
    }

    const packagefile = "./package.json";
    const package = JSON.parse(fs.readFileSync(packagefile, "utf8"));
    const verCheckfile = "./data/ver-to-check.txt"
    const verCheck = fs.readFileSync(verCheckfile, 'utf8')

    if (!verCheck) fs.writeFile(verCheckfile, package.version.slice(0, package.version.indexOf('.', package.version.indexOf('.') + 1)), function(){
        console.log(verCheckfile + ' doesn\'t exist, writing...')
    })

    if (package.version == verCheck) return

    if (package.version.slice(0, package.version.indexOf('.', package.version.indexOf('.') + 1)) != verCheck) {
        fs.writeFileSync(verCheckfile, package.version.slice(0, package.version.indexOf('.', package.version.indexOf('.') + 1)))
            channel.send(`<@&627499119153512479> 
            > **__New version: ${package.version}__
            > What's new: *${package.changelog}***
            
            Type \`!botnotif\` to get notified of new features (you can disable by typing \`!disablebotnotif\``)

    }

}

module.exports = versionCheck;