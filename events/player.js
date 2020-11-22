module.exports = function(client){
    client.player.on('trackStart', (message, track) =>{
        message.channel.send(`Now playing ${track.title}...`)
    })
}