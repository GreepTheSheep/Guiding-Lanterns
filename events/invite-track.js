//Invite tracking
const invites = {};
//Delay without blocking whole script
const wait = require('util').promisify(setTimeout);

module.exports = {
    ready: (client) => {
        //Caching Invites for tracking
        // "ready" isn't really ready. We need to wait a spell.
        wait(1000);

        // Load all invites for all guilds and save them to the cache.
        client.shard.broadcastEval(client.guilds.forEach(async g => {
            try {
                if (g == '562602234265731080'){
                    const guildInvites = await g.fetchInvites();
                    invites[g.id] = guildInvites;
                }
            } catch (e) {
                console.log(`Invite fetch failed for ${g.id}`)
            };
        }))
    },
    track: async (member) => {
	/*
        WARNING: This is error prone and can lead to misinformation
	^^ There is no way to get around this. There is no event for invites (neither creation or change)
	Invite tracker
        When a member joins a guild, the bot compare the current invites with the cached ones
	*/
        try {
            const logchannel = member.client.shard.broadcastEval(member.client.channels.get("562607103337037834"))
            const guildInvites = await member.guild.fetchInvites();

            //Update cached invites
            const ei = invites[member.guild.id];
            invites[member.guild.id] = guildInvites;

            //If number of uses for an invite changed then that's the invite used to join
            const invite = guildInvites.find(i => {
                const checkInvite = ei.get(i.code);
                if (!checkInvite) return false;
                return (checkInvite.uses < i.uses);
            });
            if (invite) {
                const inviter = member.client.shard.broadcastEval(member.client.users.get(invite.inviter.id))
                return logchannel.send(
                    `${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`
                );
            }

            return logchannel.send(
                `${member.user.tag} joined using an unknown invite.`
            );
            
        } catch (e) {
            console.error(e);
        }
    }
};
