import { Command } from '@/types';

import { getPrefix, setPrefix } from '@/handler/data';

const setprefix: Command = {
  name: 'setprefix',
  aliases: [],
  usage: 'setprefix',
  description: 'setprefix',
  execute(msg, args) {
    if (args.length < 1) {
      msg.channel.send('請指定前綴！');
      return;
    }

    const prefix = args[0].trim();

    if (!prefix) {
      msg.channel.send('無效前綴！');
      return;
    }

    const oldPrefix = getPrefix().trim();
    setPrefix(prefix);

    msg.channel.send(`成功將指令前綴由 \`${oldPrefix}\` 改為 \`${prefix}\` ！`);
  },
};

export default setprefix;
