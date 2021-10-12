const axios = require('axios');
const global = require('../../global')

module.exports = {
    name: 'count',
    aliases: [],
    usage: "count",
    description: "count",
    execute(msg, args, client) {
        axios.get(global.url()).then(response => {
            let tmp = response.data;
            msg.channel.send(`小浠的訂閱數: ${Number(tmp.items[0].statistics.subscriberCount)}`);
        }).catch(err => {
            console.log(err);
        });
    }
}