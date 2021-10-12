const fs = require('fs');
const serverFileName = "./server.json";
const server = require('../../server.json');

module.exports = {
    name: 'set',
    aliases: [],
    usage: "set",
    description: "set",
    async execute(msg, args, client) {
        if (args.length < 1) {
            msg.channel.send("請指定一個頻道");
            return;
        }

        let msgGuild = client.guilds.cache.get(msg.guildId);
        let channel = msgGuild.channels.cache.get(args[0].slice(2, args[0].length - 1));

        if (!channel) {
            msg.channel.send("未知頻道");
            return;
        }

        let guild = server.filter(x => x.server_id == msg.guildId);

        if (guild.length > 0) {
            let temp = guild[0].channel_id;
            guild[0].channel_id = channel.id;
            msg.channel.send(`已成功將 ${msg.guild.name} 的通知頻道從 <#${temp}> 設為 ${args[0]}`)
            console.log(`已成功將 ${msg.guild.name} 的通知頻道從 <#${temp}> 設為 ${args[0]}`);
        } else {
            let obj = {
                server_id : msg.guildId,
                channel_id : channel.id,
            }

            server.push(obj);
            msg.channel.send(`已成功將 ${msg.guild.name} 的通知頻道設為 ${args[0]}`)
            console.log(`已成功將 ${msg.guild.name} 的通知頻道設為 ${args[0]}`);
        }

        fs.writeFile(serverFileName, JSON.stringify(server, null, 4), err => {
            if (err) console.log(err);
        });
    }
}