import { Client, NewsChannel, TextChannel } from 'discord.js';
import global from '@/global';

import { getChannelList } from '@/google/youtube';
import { getServerList } from '@/handler/serverList';

import config from '~/secret/config.json';

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
      .then((res) => {
        if (!res?.items) throw 'response.items not available!';
        const ytChannel = res.items[0];
        if (!ytChannel) throw 'No channel found!';
        if (!ytChannel.snippet) throw 'channel.snippet not available!';
        if (!ytChannel.snippet.title)
          throw 'channel.snippet.title not available!';
        global.channel_name = ytChannel.snippet.title;
        const serverList = getServerList();
        for (const server_info of serverList) {
          if (server_info.channel_id.trim() === '') continue;

          const guild = client.guilds.cache.get(server_info.server_id);
          if (!guild) continue;

          const channel = guild.channels.cache.get(server_info.channel_id);
          if (
            !channel ||
            !(channel instanceof TextChannel || channel instanceof NewsChannel)
          )
            continue;

          if (!ytChannel.statistics) throw 'channel.statistics not available!';
          if (!ytChannel.statistics.subscriberCount)
            throw 'channel.statistics.subscriberCount not available!';
          const subCount = Number(ytChannel.statistics.subscriberCount);
          if (subCount > global.current_count) {
            channel.send(
              `${global.channel_name} 的訂閱數: ${Number(
                ytChannel.statistics.subscriberCount,
              )}`,
            );
            console.log(`Send to ${server_info.server_id}`);
          }
        }

        if (!ytChannel.statistics) throw 'channel.statistics not available!';
        global.current_count = Number(ytChannel.statistics.subscriberCount);
      })
      .catch((err) => {
        console.log('錯誤:', err);
      });
  };

  checkYTCount();
  setInterval(() => checkYTCount(), 10000);
};

export default ready;
