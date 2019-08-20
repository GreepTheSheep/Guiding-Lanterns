const Discord = require('discord.js')
const Enmap = require('enmap')
const request = require('request')

chatbotdb = new Enmap({name: "chatbot"})

function chatbot(message, client, prefix, donor, date, time, logchannel){
    if (message.channel.type !== 'dm'){
    if (message.content.startsWith(prefix + 'chatbotkey')){
        if (message.author.id == '330030648456642562'){
            let args = message.content.split(" ");
            args.shift();
            if (args.length < 1 ) return message.author.send(chatbotdb.get("KEY")).then(message.delete())
            chatbotdb.set("KEY", args[0])
            chatbotdb.set("Requests", "0")
            message.delete()
            message.channel.send(':+1:').then(m=>m.delete(5000))
        } else return;
    }
    if (message.content.startsWith(prefix + 'chatbotstats')){
        if (message.author.id == '330030648456642562'){
            const requests = chatbotdb.get("Requests")
            const totalrequests = chatbotdb.get("Total_Requests")
            message.channel.send(`__ChatBot Stats:__\`\`\`ChatBot API: SimSimi\n\nRequests since the API key regen: ${requests}\nTotal requests: ${totalrequests}\`\`\``)
        } else return;
    }
    }

    if (message.channel.type === 'dm'){
        try {
        //if (!donor) return;
        if (!chatbotdb.has("KEY")){
            message.channel.send('Error :frowning: The report has been sent')
            console.log(`SimSimi error: NO API KEY`)
            logchannel.send(`SimSimi ChatBot error: NO API KEY, please add a key!`)
        }

        var options = { method: 'POST',
        url: 'https://wsapi.simsimi.com/190410/talk',
        headers: 
        { 'x-api-key': chatbotdb.get("KEY"),
        'Content-Type': 'application/json' },
        body: { utext: message.content, lang: 'en' },
        json: true };

        message.channel.startTyping();
        request(options, function (error, response, body) {
        if (error) {
            message.channel.send('Error :frowning: The report has been sent')
            console.log(`SimSimi error: ${error}`)
            logchannel.send(`SimSimi ChatBot error: ${error}`)
        }

        if (!chatbotdb.has("Requests")) chatbotdb.set("Requests", "0")
        var requests = chatbotdb.get("Requests")
        var requestsplus = requests++
        chatbotdb.set("Requests", requestsplus)
        if (requests == '80') logchannel.send('[SimSimi Chatbot] 80 requests reached, please set a new API KEY\nhttps://workshop.simsimi.com/dashboard\nCommand: \`' + prefix + 'chatbotkey\`')
        if (requests >= '90' && requests < '100') logchannel.send('[SimSimi Chatbot] ' + requests + ' requests reached, please set a new API KEY\nhttps://workshop.simsimi.com/dashboard\nCommand: \`' + prefix + 'chatbotkey\`')
        if (requests == '100') logchannel.send('[SimSimi Chatbot] 100 requests reached, chatbot is unavialble. Please set a new API KEY\nhttps://workshop.simsimi.com/dashboard\nCommand: \`' + prefix + 'chatbotkey\`')

        if (!chatbotdb.has("Total_Requests")) chatbotdb.set("Total_Requests", "0")
        var totalrequests = chatbotdb.get("Total_Requests")
        var totalrequestsplus = totalrequests++
        chatbotdb.set("Total_Requests", totalrequestsplus)
        
        if (body.atext.length < 1) return message.reply('I\'m speechless.').then(message.channel.stopTyping(true))
        message.reply(body.atext).then(message.channel.stopTyping(true))
        })
        } catch(err) {
            message.channel.send('Error :frowning: The report has been sent')
            console.log(`SimSimi error: ${err}`)
            logchannel.send(`SimSimi ChatBot error: ${err}`)
        }
    }
}

module.exports = chatbot;