const global = require('../../global')

module.exports = {
    name: 'count',
    aliases: [],
    usage: "count",
    description: "count",
    execute(msg, args, client) {
        msg.channel.send(`${global.channel_name} 的訂閱數: ${global.current_count}`);
    }
}