import { Client, Message } from 'discord.js';

import count from '@/commands/features/count';
import notify from '@/commands/features/notify';
import cancel from '@/commands/features/cancel';
import list from '@/commands/features/list';
import listhere from '@/commands/features/listhere';
import setprefix from '@/commands/features/setprefix';

import { getPrefix } from '@/handler/data';

const commands = [count, notify, cancel, list, listhere, setprefix];

const commandHandler = (msg: Message, client: Client): void => {
  const prefix = getPrefix();

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift()?.toLowerCase();
  if (!cmd) {
    msg.channel.send('Command Not Found!');
    return;
  }

  const command = commands.find((c) => c.name === cmd);
  if (command) {
    try {
      command.execute(msg, args, client);
    } catch (error) {
      console.error(error);
      msg.channel.send(`Error: ${error}`);
    }
  } else {
    msg.channel.send('Command not found!');
  }
};

export default commandHandler;
