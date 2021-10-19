import { Command } from '@/types';

import { getChannelName, removeNotification } from '@/handler/data';

const cancel: Command = {
  name: 'cancel',
  aliases: [],
  usage: 'cancel',
  description: 'cancel',
  execute(msg, args) {
    if (args.length < 1) {
      msg.channel.send('請指定一個訂閱數目標！');
      return;
    }

    const notifyCount = Number(args[0]);

    if (isNaN(notifyCount)) {
      msg.channel.send('只可輸入數值');
      return;
    }

    const target = removeNotification({
      dcServerId: msg.guild?.id || '',
      dcChannelId: msg.channel.id,
      targetSubCount: notifyCount,
    });
    if (!target) {
      msg.channel.send('你並沒有在此設置該訂閱數目標！');
      return;
    }

    msg.channel.send(
      `在 ${getChannelName()} 達到 ${notifyCount} 時通知取消成功！`,
    );
  },
};

export default cancel;
