import { NewsChannel, TextChannel } from 'discord.js';
import { Client } from '@typeit/discord';

import { getChannelList } from '@/google/youtube';

import { getServerList } from '@/handler/serverList';
import { cancelNotify, getNotifyList } from '@/handler/notifyList';
import { ytChannelId } from '@/handler/config';

import store from '@/store';

const checkYoutubeCount = async (client: Client): Promise<void> => {
  try {
    const response = await getChannelList({
      id: [ytChannelId],
      part: ['statistics', 'snippet'],
    });
    if (!response?.items) throw 'response.items not available!';
    const ytChannel = response.items[0];
    if (!ytChannel) throw 'No channel found!';
    if (!ytChannel.snippet) throw 'channel.snippet not available!';
    if (!ytChannel.snippet.title) throw 'channel.snippet.title not available!';
    store.channel_name = ytChannel.snippet.title;
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

      await channel.send(`${store.channel_name} 的訂閱數: ${subCount}`);
      console.log(`Send to ${server.server_id}`);
      cancelNotify(notify_info);
    }
    store.current_count = subCount;
  } catch (err) {
    console.error(err);
  }
};

export default checkYoutubeCount;
