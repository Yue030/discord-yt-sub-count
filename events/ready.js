const axios = require('axios');

module.exports = (client, Discord) => {
    console.log("Connected");
    console.log("Logged in as: ");
    console.log(`${client.user.username}(${client.user.id})`);

    let checkYTCount = () => {
        axios.get(global.url()).then(response => {
            const servers = require('../server.json');
            let tmp = response.data;

            global.channel_name = tmp.items[0].snippet.title;
            for (const server_info of servers) {
                if (server_info.channel_id.trim() === "") continue;

                const guild = client.guilds.cache.get(server_info.server_id);
                if (!guild) continue;

                const channel = guild.channels.cache.get(server_info.channel_id);
                if (!channel) continue;

                if (tmp.items[0].statistics.subscriberCount > global.current_count) {
                    channel.send(`${global.channel_name} 的訂閱數: ${Number(tmp.items[0].statistics.subscriberCount)}`);
                    console.log(`Send to ${server_info.server_id}`);
                }
            }

            global.current_count = Number(tmp.items[0].statistics.subscriberCount);
        }).catch((err) => {
            console.log('錯誤:', err);
        });
    }

    const global = require('../global');

    checkYTCount();
    setInterval(() => checkYTCount(), 10000);
}
