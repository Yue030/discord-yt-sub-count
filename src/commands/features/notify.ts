import notify from '~/secret/notify.json';
import server from '~/secret/server.json';
import config from '~/secret/config.json';
import global from '~/src/global';
import fs from 'fs';

const notifyFileName = './secret/notify.json';

export default {
  name: 'notify',
  aliases: [],
  usage: 'notify',
  description: 'notify',
  async execute(msg: any, args: any, client: any) {
    if (args.length < 1) {
      msg.channel.send("請指定一個訂閱數目標！");
      return;
    }

    const notifyCount = Number(args[0]);
    
    if (isNaN(notifyCount)) {
      msg.channel.send("只可輸入數值");
      return;
    }

    if (server.filter((x : any) => x.server_id == msg.guild.id).length < 1) {
      msg.channel.send(`請先使用 ${config.prefix}set 來設置通知頻道！`);
      return;
    }

    if (notifyCount < global.current_count) {
      msg.channel.send("不可設置已達成的訂閱數目標！");
      return;
    }

    const duplicateNotify = 
      notify.filter((x : any) => x.server_id == msg.guild.id && notifyCount == x.notify_count);
    console.log(duplicateNotify);

    if (duplicateNotify.length > 0) {
      msg.channel.send("不可設置重複的訂閱數目標！");
      return;
    }

    const notifyResult = {
      server_id: msg.guild.id,
      notify_count: notifyCount
    };

    (notify as any).push(notifyResult);

    await msg.channel.send(`設置在 ${global.channel_name} 達到 ${notifyCount} 時通知成功！`);

    fs.writeFileSync(notifyFileName, JSON.stringify(notify, null, 2));
  },
};
