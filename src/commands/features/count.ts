import { Command } from '@/types';

import global from '@/global';

const count: Command = {
  name: 'count',
  aliases: [],
  usage: 'count',
  description: 'count',
  execute: (msg) => {
    msg.channel.send(
      `${global.channel_name} 的訂閱數: ${global.current_count}`,
    );
  },
};

export default count;
