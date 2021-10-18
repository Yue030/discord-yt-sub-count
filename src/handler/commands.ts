import { Client, Message } from 'discord.js';

import count from '@/commands/features/count';
import set from '@/commands/features/set';
import notify from '../commands/features/notify';

import { prefix } from '~/secret/config.json';

const commands = [count, set, notify];

const commandHandler = (msg: Message, client: Client): void => {
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
