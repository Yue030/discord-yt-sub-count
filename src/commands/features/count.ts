import { Command } from '@/types';

import { getChannelName, getSubCount } from '@/handler/data';

const count: Command = {
  name: 'count',
  aliases: [],
  usage: 'count',
  description: 'count',
  execute: (msg) => {
    msg.channel.send(
      `${getChannelName()} 的訂閱數: ${getSubCount()}`,
    );
  },
};

export default count;
