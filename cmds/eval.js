const Discord = require("discord.js");

 function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

 function eval_cmd(message, client, prefix, getlogchannel) {

    if (!message.author.id === "330030648456642562") return;
    if (message.content.startsWith(prefix + "eval")) {
        try {
            const args = message.content.split(" ").slice(1);
            if (args.length < 1) return message.react('❌');
            const code = args.join(" ");
            let evaled = eval(code);

             if (typeof evaled !== "string"){
                evaled = require("util").inspect(evaled);
            }
            getlogchannel.send(`EVAL COMMAND SUCESS!\n\`\`\`xl\n${code}\`\`\`\nNode Result: \`${clean(evaled)}\``);
        } catch (err) {
            const args = message.content.split(" ").slice(1);
            const code = args.join(" ");
            getlogchannel.send(`EVAL COMMAND **ERROR**\n\`\`\`xl\n${code}\`\`\`\nNode Result: \`${clean(err)}\``);
        }
    }

 }

 module.exports = eval_cmd;