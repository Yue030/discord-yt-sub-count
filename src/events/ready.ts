import servers from '~/secret/server.json';
import notify from '~/secret/notify.json';
import global from '@/global';
import fs from 'fs';

import { getChannelList } from '@/google/youtube';

import config from '~/secret/config.json';

const notifyFileName = './secret/notify.json';

const ready = (client: any, Discord: any) => {
  console.log('Connected');
  console.log('Logged in as: ');
  console.log(`${client.user.username}(${client.user.id})`);

  const checkYTCount = () => {
    getChannelList({
      id: [config['yt-channel-id']],
      part: ['statistics', 'snippet'],
    })
      .then(async (res) => {
        if (!res?.items) throw 'response.items not available!';
        const ytChannel = res.items[0];
        if (!ytChannel) throw 'No channel found!';
        if (!ytChannel.snippet) throw 'channel.snippet not available!';
        if (!ytChannel.snippet.title)
          throw 'channel.snippet.title not available!';

        global.channel_name = ytChannel.snippet.title;

        if (!ytChannel.statistics) throw 'channel.statistics not available!';
          if (!ytChannel.statistics.subscriberCount)
            throw 'channel.statistics.subscriberCount not available!';

        const subCount = Number(ytChannel.statistics.subscriberCount);

        for (const notify_info of notify as any) {
          if (Number(notify_info.notify_count) > subCount) continue;

          if (notify_info.server_id.trim() == '') continue;
          
          const server = servers.filter(x => x.server_id == notify_info.server_id);
          if (server.length < 1) continue;

          const server_info = server[0];

          const guild = client.guilds.cache.get(server_info.server_id);
          if (!guild) continue;

          const channel = guild.channels.cache.get(server_info.channel_id);
          if (!channel) continue;

          await channel.send(
            `${global.channel_name} 的訂閱數: ${subCount}`,
          );

          removeItemOnce(notify, notify_info);

          console.log(`Send to ${server_info.server_id}`);

          fs.writeFileSync(notifyFileName, JSON.stringify(notify, null, 2));
        }
        global.current_count = subCount;
      })
      .catch((err) => {
        console.log('錯誤:', err);
      });
  };

  checkYTCount();
  setInterval(() => checkYTCount(), 10000);
};

function removeItemOnce(arr : Array<any>, value : any) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export default ready;
