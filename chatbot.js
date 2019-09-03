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
            chatbotdb.set("Requests", 0)
            message.delete()
            message.channel.send(':+1:').then(m=>m.delete(5000))
        } else return;
    }
    if (message.content.startsWith(prefix + 'chatbotlang')){
        let args = message.content.split(" ");
        args.shift();
        if (args.length < 1 ||
         args[0] != 'en' ||
         args[0] != 'fr')
          return message.reply(`__Avialble languages__:\n- en\n- fr\n\n*Usage: \`${prefix}chatbotlang <language>\``)
        chatbotdb.set("lang_"+message.author.id, args[0])
        message.channel.send('Your chatbot language is set to: ' + args[0])
    }
    if (message.content.startsWith(prefix + 'chatbotstats')){
        const requests = chatbotdb.get("Requests")
        const totalrequests = chatbotdb.get("Total_Requests")
        const lastrequest = chatbotdb.get("LastRequest_name")
        message.channel.send(`__ChatBot Stats:__\`\`\`ChatBot API: SimSimi\n\nRequests since the API key regen: ${requests}/100\nTotal requests: ${totalrequests}\n\nLast request sent by ${lastrequest}\`\`\``)
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
        if (!chatbotdb.has("lang_"+message.author.id)) chatbotdb.set("lang_"+message.author.id,"en")
        
        var options = { method: 'POST',
        url: 'https://wsapi.simsimi.com/190410/talk',
        headers: 
        { 'x-api-key': chatbotdb.get("KEY"),
        'Content-Type': 'application/json' },
        body: { utext: message.content, lang: chatbotdb.get("lang_"+message.author.id), atext_bad_prob_max: 0.3},
        json: true };

        message.channel.startTyping();
        request(options, function (error, response, body) {
        try {
            if (error) {
            message.channel.send('Error :frowning: The report has been sent')
            console.log(`SimSimi error: ${error}`)
            logchannel.send(`SimSimi ChatBot error: ${error}`)
        }

        if (!chatbotdb.has("Requests")) chatbotdb.set("Requests", 0)
        var requests = chatbotdb.get("Requests")
        chatbotdb.set("Requests", chatbotdb.get("Requests")+1)
        if (requests == 80) logchannel.send('[SimSimi Chatbot] 80 requests reached, please set a new API KEY\nhttps://workshop.simsimi.com/dashboard\nCommand: \`' + prefix + 'chatbotkey\`')
        if (requests >= 90 && requests < 100) logchannel.send('[SimSimi Chatbot] ' + requests + ' requests reached, please set a new API KEY\nhttps://workshop.simsimi.com/dashboard\nCommand: \`' + prefix + 'chatbotkey\`')
        if (requests == 100) logchannel.send('[SimSimi Chatbot] 100 requests reached, chatbot is unavialble. Please set a new API KEY\nhttps://workshop.simsimi.com/dashboard\nCommand: \`' + prefix + 'chatbotkey\`')

        if (!chatbotdb.has("Total_Requests")) chatbotdb.set("Total_Requests", 0)
        chatbotdb.set("Total_Requests", chatbotdb.get("Total_Requests")+1)
        
        chatbotdb.set("LastRequest_name", message.author.username)
        
        if (body.atext.length < 1) return message.reply('I have no words to caption that.').then(message.channel.stopTyping(true))
        message.reply(body.atext).then(message.channel.stopTyping(true))
        }
        catch (err){
            message.channel.send('Error :frowning: The report has been sent')
            console.log(`SimSimi error: ${err}`)
            logchannel.send(`SimSimi ChatBot error: ${err}`)
        }})
        } catch(err) {
            message.channel.send('Error :frowning: The report has been sent')
            console.log(`SimSimi error: ${err}`)
            logchannel.send(`SimSimi ChatBot error: ${err}`)
        }
    }
}

module.exports = chatbot;