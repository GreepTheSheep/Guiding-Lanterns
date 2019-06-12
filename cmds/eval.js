const Discord = require("discord.js");

 function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

 function eval_cmd(message, client, prefix) {

     if(!message.author.id === "330030648456642562") return;
    const args = message.content.split(" ").slice(1);
    if (message.content.startsWith(prefix + "eval")) {
        try {
            const code = args.join(" ");
            let evaled = eval(code);

             if (typeof evaled !== "string"){
                evaled = require("util").inspect(evaled);
            }
            message.author.send(`EVAL COMMAND SUCESS!\n\`${code}\``);
            message.author.send(clean(evaled), {code:"xl"});
        } catch (err) {
            message.author.send(`EVAL COMMAND ERROR\n\`${code}\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }

 }

 module.exports = eval_cmd;