const Discord = require("discord.js");

 function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

 function eval_cmd(message, client, prefix, getlogchannel) {

    if (message.author.id === "330030648456642562" || message.author.id === "460348027463401472") {
    if (message.content.startsWith(prefix + "eval")) {
        try {
            const args = message.content.split(" ").slice(1);
            if (args.length < 1) return message.react('❌');
            const code = args.join(" ");
            let evaled = eval(code);

             if (typeof evaled !== "string"){
                evaled = require("util").inspect(evaled);
            }
            message.reply(`EVAL:\n\`\`\`javascript\n${code}\`\`\`\nNode Result: \`${clean(evaled)}\``);
        } catch (err) {
            const args = message.content.split(" ").slice(1);
            const code = args.join(" ");
            message.reply(`EVAL **__ERROR__**\n\`\`\`javascript\n${code}\`\`\`\nNode Result: \`${clean(err)}\``);
        }
    }
    } else return;
 }

 module.exports = eval_cmd;
