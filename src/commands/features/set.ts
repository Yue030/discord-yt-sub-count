import fs from 'fs';
import server from '~/secret/server.json';

const serverFileName = './secret/server.json';

export default {
  name: 'set',
  aliases: [] as Array<any>,
  usage: 'set',
  description: 'set',
  async execute(msg: any, args: any, client: any) {
    if (args.length < 1) {
      msg.channel.send('請指定一個頻道');
      return;
    }

    const msgGuild = client.guilds.cache.get(msg.guild.id);
    const channel = msgGuild.channels.cache.get(
      args[0].slice(2, args[0].length - 1),
    );

    if (!channel) {
      msg.channel.send('未知頻道');
      return;
    }

    const guild: Array<any> = server.filter((x: any) => x.server_id == msg.guild.id);

    if (guild.length > 0) {
      const temp = guild[0].channel_id;
      guild[0].channel_id = channel.id;
      msg.channel.send(
        `已成功將 ${msg.guild.name} 的通知頻道從 <#${temp}> 設為 ${args[0]}`
      );
      console.log(
        `已成功將 ${msg.guild.name} 的通知頻道從 <#${temp}> 設為 ${args[0]}`
      );
    } else {
      const obj = {
        server_id: msg.guild.id,
        channel_id: channel.id,
      };

      (server as any).push(obj);
      msg.channel.send(`已成功將 ${msg.guild.name} 的通知頻道設為 ${args[0]}`);
      console.log(`已成功將 ${msg.guild.name} 的通知頻道設為 ${args[0]}`);
    }

    fs.writeFile(serverFileName, JSON.stringify(server, null, 2), (err) => {
      if (err) console.error(err);
    });
  },
};
