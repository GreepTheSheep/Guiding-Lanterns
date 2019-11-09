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
        const channel = client.channels.find(channel_id);
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
    frozen2: countdown({
        date : "November 22 2019 00:00:00 EST",
        output: (d,h,m,s) => `❄ Frozen 2: ${d}d ${h}h`,
        end:   "❄ FROZEN 2 IS OUT!",
        timeout: 1 * 60 * 60 * 1000
    }),
    xmas: countdown({
        date : "December 25 2019 00:00:00 EST",
        output: (d,h,m,s) => `🎅 ${d}d ${h}h`,
        end:   "HAPPY CHRISTMAS! 🎅",
        timeout: 1 * 60 * 60 * 1000
    })
}
