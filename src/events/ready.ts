import { Client } from '@typeit/discord';
import { NewsChannel, TextChannel } from 'discord.js';

import global from '@/global';
import fs from 'fs';

import { getChannelList } from '@/google/youtube';

import config from '~/secret/config.json';
import { getServerList } from '../handler/serverList';
import { getNotifyList } from '../handler/notifyList';

const notifyFileName = './secret/notify.json';

const ready = (client: Client): void => {
  console.log('Connected');
  console.log('Logged in as: ');
  console.log(
    `${client.user?.username || 'Unknown username'}(${
      client.user?.id || 'Unknown ID'
    })`,
  );

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

        const serverList = getServerList();
        const notifyList = getNotifyList();

        for (const notify_info of notifyList) {
          if (Number(notify_info.notify_count) > subCount) continue;

          if (notify_info.server_id.trim() === '') continue;

          const server = serverList.find(
            (x) => x.server_id === notify_info.server_id,
          );
          if (!server) continue;

          const guild = client.guilds.cache.get(server.server_id);
          if (!guild) continue;

          const channel = guild.channels.cache.get(server.channel_id);
          if (
            !channel ||
            !(channel instanceof TextChannel || channel instanceof NewsChannel)
          )
            continue;

          await channel.send(`${global.channel_name} 的訂閱數: ${subCount}`);
          removeItemOnce(notifyList, notify_info);
          console.log(`Send to ${server.server_id}`);
          fs.writeFileSync(notifyFileName, JSON.stringify(notifyList, null, 2));
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

function removeItemOnce<T>(arr: Array<T>, value: T) {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export default ready;
