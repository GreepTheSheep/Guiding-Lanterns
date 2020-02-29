const Discord = require('discord.js');

const countdownTextNow = (output) => {
    return (date) => {
        const ms = msCountdown(date)
        const days = Math.floor( ms/(1000*60*60*24) );
        const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return output(days,hours,minutes,seconds);
    };
}
const msCountdown = date => Date.parse(date) - Date.parse(new Date());

const countdown = (param) => {
    return (client,channel_id) => {
        const channel = client.channels.get(channel_id);
        if (!channel) {
            console.log(`Channel: ${channel_id} cannot be found`);
            return;
        }
        const cd = () => {
            if (msCountdown(param.date) < 0) {
                channel.setName(`${param.end}`).catch(err=>console.log(err));
                return;
            }
            channel.setName(`${(countdownTextNow)(param.output)(param.date)}`)
                .then(a=>setTimeout(cd, param.timeout))
                .catch(err=>console.log(err));
        };
        cd();
    };
};
module.exports = {
    pascal: countdown({
        date : "March 01 2020 07:00:00 EST",
        output: (d,h,m,s) => `🌑 ${h}h ${m}m`,
        end:  "🌚 The End.",
        timeout: 1 * 60 * 1000
    })
}
