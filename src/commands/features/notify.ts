import { Command, Notification } from '@/types';

import {
  getChannelName,
  getNotifications,
  getSubCount,
  updateNotification,
} from '@/handler/data';

const notify: Command = {
  name: 'notify',
  aliases: [],
  usage: 'notify',
  description: 'notify',
  execute(msg, args) {
    if (!msg.guild) {
      msg.channel.send('請在 Discord 伺服器內使用指令！');
      return;
    }

    if (args.length < 1) {
      msg.channel.send('請指定一個訂閱數目標！');
      return;
    }

    const targetSubCount = Number(args[0]);

    if (isNaN(targetSubCount)) {
      msg.channel.send('只可輸入數值');
      return;
    }

    if (targetSubCount < getSubCount()) {
      msg.channel.send('不可設置已達成的訂閱數目標！');
      return;
    }

    const newNotif: Notification = {
      dcServerId: msg.guild.id,
      dcChannelId: msg.channel.id,
      targetSubCount,
    };

    const notifications = getNotifications(newNotif);
    if (notifications.length) {
      msg.channel.send('不可設置重複的訂閱數目標！');
      return;
    }

    updateNotification(newNotif);

    msg.channel.send(
      `設置在 ${getChannelName()} 達到 ${targetSubCount} 時通知成功！`,
    );
  },
};

export default notify;
