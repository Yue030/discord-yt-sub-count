const axios = require('axios');

let currentCount = 0;
module.exports = (client, Discord) => {
    console.log("Connected");
    console.log("Logged in as: ");
    console.log(`${client.user.username}(${client.user.id})`);

    const global = require('../global');

    let timer = setInterval(() => {
        axios.get(global.url()).then((response) => {
            const servers = require('../server.json');

            let tmp = response.data;
            servers.forEach(server_info => {
                if (server_info.channel_id.trim() != "") {
                    let guild = client.guilds.cache.get(server_info.server_id);

                    if (guild) {
                        let channel = guild.channels.cache.get(server_info.channel_id);

                        if (channel) {
                            if (Number(tmp.items[0].statistics.subscriberCount > currentCount)) {
                                channel.send(`小浠的訂閱數: ${Number(tmp.items[0].statistics.subscriberCount)}`);
                                console.log(`Send to ${server_info.server_id}`);
                            }
                        }
                    }
                }
            });

            currentCount = Number(tmp.items[0].statistics.subscriberCount);
        }).catch((err) => {
            console.log('錯誤:', err);
        });
    }, 10000);

}
