import { Command } from '@/types';

import { getNotifications } from '@/handler/data';

const list: Command = {
  name: 'list',
  aliases: [],
  usage: 'list',
  description: 'list',
  execute: (msg) => {
    if (!msg.guild) {
      msg.channel.send('請在 Discord 伺服器內使用指令！');
      return;
    }

    const notifications = getNotifications({
      dcServerId: msg.guild.id,
    });

    const str = notifications.map(
      (n) => `<#${n.dcChannelId}> 目標：${n.targetSubCount}`,
    ).join('\n') || '沒有設置任何通知';

    msg.channel.send(str);
  },
};

export default list;
