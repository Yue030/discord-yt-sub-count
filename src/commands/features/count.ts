import global from '@/global';
import { Command } from '@/types';

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
