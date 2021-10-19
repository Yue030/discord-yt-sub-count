import { NewsChannel, TextChannel } from 'discord.js';
import { Client } from '@typeit/discord';

import { getChannelList } from '@/google/youtube';

import { ytChannelId } from '@/handler/config';
import { getChannelName, getNotifications, removeNotification, setChannelName, setSubCount } from '@/handler/data';

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
    setChannelName(ytChannel.snippet.title);
    if (!ytChannel.statistics) throw 'channel.statistics not available!';
    if (!ytChannel.statistics.subscriberCount)
      throw 'channel.statistics.subscriberCount not available!';
    const subCount = Number(ytChannel.statistics.subscriberCount);

    const notifications = getNotifications();

    for (const notification of notifications) {
      if (Number(notification.targetSubCount) > subCount) continue;

      if (notification.dcServerId.trim() === '') continue;

      const guild = client.guilds.cache.get(notification.dcServerId);
      if (!guild) continue;

      const channel = guild.channels.cache.get(notification.dcChannelId);
      if (
        !channel ||
        !(channel instanceof TextChannel || channel instanceof NewsChannel)
      )
        continue;

      await channel.send(`${getChannelName()} 的訂閱數: ${subCount}`);
      console.log(`Sent to ${notification.dcChannelId}`);
      removeNotification(notification);
    }
    setSubCount(subCount);
  } catch (err) {
    console.error(err);
  }
};

export default checkYoutubeCount;
