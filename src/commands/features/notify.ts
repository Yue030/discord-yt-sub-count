import { Command } from '@/types';

import { getServerList } from '@/handler/serverList';
import { getNotifyList, updateNotifyList } from '@/handler/notifyList';
import { prefix } from '@/handler/config';

import store from '@/store';

const notify: Command = {
  name: 'notify',
  aliases: [],
  usage: 'notify',
  description: 'notify',
  async execute(msg, args) {
    if (args.length < 1) {
      msg.channel.send('請指定一個訂閱數目標！');
      return;
    }

    const notifyCount = Number(args[0]);

    if (isNaN(notifyCount)) {
      msg.channel.send('只可輸入數值');
      return;
    }

    const serverList = getServerList();
    const guild = msg.guild;
    if (!guild) {
      msg.channel.send('找不到所在伺服器');
      return;
    }
    const guildId = guild.id;
    const server = serverList.find((s) => s.server_id === guildId);
    if (!server) {
      msg.channel.send(`請先使用 ${prefix}set 來設置通知頻道！`);
      return;
    }

    if (notifyCount < store.current_count) {
      msg.channel.send('不可設置已達成的訂閱數目標！');
      return;
    }

    const notifyList = getNotifyList();
    const existingNotify = notifyList.find(
      (n) => n.server_id === guildId && notifyCount === n.notify_count,
    );
    console.log(existingNotify);
    if (existingNotify) {
      msg.channel.send('不可設置重複的訂閱數目標！');
      return;
    }

    updateNotifyList({
      server_id: msg.guild.id,
      notify_count: notifyCount,
    });

    await msg.channel.send(
      `設置在 ${store.channel_name} 達到 ${notifyCount} 時通知成功！`,
    );
  },
};

export default notify;
