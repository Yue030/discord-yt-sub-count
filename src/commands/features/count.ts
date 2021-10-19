import { Command } from '@/types';

import store from '@/store';

const count: Command = {
  name: 'count',
  aliases: [],
  usage: 'count',
  description: 'count',
  execute: (msg) => {
    msg.channel.send(
      `${store.channel_name} 的訂閱數: ${store.current_count}`,
    );
  },
};

export default count;
