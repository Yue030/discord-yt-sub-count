import { Command } from '@/types';

import { getServerList, updateServerList } from '@/handler/serverList';

const set: Command = {
  name: 'set',
  aliases: [],
  usage: 'set',
  description: 'set',
  async execute(msg, args) {
    if (!args || args.length < 1) {
      msg.channel.send('請指定一個頻道');
      return;
    }

    const guild = msg.guild;
    if (!guild) {
      msg.channel.send('找不到所在伺服器');
      return;
    }
    const guildId = guild.id;
    const channel = guild.channels.cache.get(
      args[0].slice(2, args[0].length - 1),
    );
    if (!channel) {
      msg.channel.send('未知頻道');
      return;
    }

    const serverList = getServerList();
    const server = serverList.find((s) => s.server_id == guildId);
    const new_ch = channel.id;
    updateServerList({ server_id: guildId, channel_id: new_ch });

    const str = server
      ? `已成功將 ${msg.guild.name} 的通知頻道從 <#${server.channel_id}> 設為 <#${new_ch}>`
      : `已成功將 ${msg.guild.name} 的通知頻道設為 <#${new_ch}>`;
    msg.channel.send(str);
    console.log(str);
  },
};

export default set;
